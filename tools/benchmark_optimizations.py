#!/usr/bin/env python3
"""Synthetic SQLite and optional loopback HTTP benchmarks; never uses live data."""
import argparse
import base64
import datetime as dt
import hashlib
import gzip
import json
import os
from pathlib import Path
import re
import socket
import sqlite3
import statistics
import subprocess
import tempfile
import time
import urllib.request

ROOT = Path(__file__).resolve().parents[1]
MIGRATIONS = ROOT / 'crates/clipline-cloud-db/migrations/sqlite'
SELECT = re.search(r'const CLIP_SELECT_SQL: &str = "(.*?)";',
                   (ROOT / 'crates/clipline-cloud-db/src/repositories.rs').read_text(), re.S).group(1)
PUBLIC = " WHERE visibility = 'public' AND status = 'ready' AND deleted_at IS NULL AND public_share_id IS NOT NULL"
OWNER = " WHERE owner_user_id = ? AND deleted_at IS NULL AND status <> 'deleted'"
ORDER = ' ORDER BY uploaded_at IS NULL ASC, uploaded_at DESC, id DESC'
SEARCH = r" AND (LOWER(title) LIKE ? ESCAPE '\' OR LOWER(COALESCE(game_name, '')) LIKE ? ESCAPE '\' OR LOWER(COALESCE(game_id, '')) LIKE ? ESCAPE '\' OR EXISTS (SELECT 1 FROM game_category_names n JOIN game_categories c ON c.id = n.category_id WHERE LOWER(n.reported_name) = LOWER(game_name) AND LOWER(c.display_name) LIKE ? ESCAPE '\'))"
CANDIDATES = r" AND clips.id IN (SELECT document.clip_id FROM clip_search JOIN clip_search_documents document ON document.id = clip_search.rowid WHERE clip_search MATCH ? UNION SELECT category_clip.id FROM game_categories c JOIN game_category_names n ON n.category_id = c.id JOIN clips category_clip ON LOWER(category_clip.game_name) = LOWER(n.reported_name) WHERE LOWER(c.display_name) LIKE ? ESCAPE '\')"
INSERT = 'INSERT INTO clips(id,owner_user_id,title,game_name,game_id,uploaded_at,file_size_bytes,visibility,status,storage_backend,storage_key,public_share_id,created_at,updated_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)'
STAMP = '2026-01-01T00:00:00+00:00'


def rows(start=0, count=100000):
    base = dt.datetime(2026, 1, 1, tzinfo=dt.timezone.utc)
    for i in range(start, start + count):
        stamp = (base + dt.timedelta(seconds=i)).isoformat()
        yield (f'{i:026d}', f'owner-{i % 10}', f'Clip number {i:08d}', f'Game {i % 20}', str(i % 20),
               None if i % 101 == 0 else stamp, 1000000, 'private' if i % 4 == 0 else 'public',
               'ready', 'local', f'objects/media/token-{i}/source.mp4', f'share-{i}', stamp, stamp)


def seed(db):
    for i in range(10):
        db.execute("INSERT INTO users(id,username,password_hash,role,created_at,updated_at) VALUES(?,?,?,'user',?,?)",
                   (f'owner-{i}', f'user-{i}', 'fixture', STAMP, STAMP))
    for i in range(20):
        db.execute('INSERT INTO game_categories(id,display_name,created_at,updated_at) VALUES(?,?,?,?)',
                   (f'category-{i}', f'Game {i}', STAMP, STAMP))
        db.execute('INSERT INTO game_category_names(id,category_id,reported_name,created_at,updated_at) VALUES(?,?,?,?,?)',
                   (f'name-{i}', f'category-{i}', f'Game {i}', STAMP, STAMP))
    db.executemany(INSERT, rows())
    db.commit()
    db.execute('ANALYZE')


def measure(db, sql, args):
    result = db.execute(sql, args).fetchall()
    samples = []
    for _ in range(7):
        started = time.perf_counter()
        assert db.execute(sql, args).fetchall() == result
        samples.append((time.perf_counter() - started) * 1000)
    plan = [row[3] for row in db.execute('EXPLAIN QUERY PLAN ' + sql, args)]
    return result, {'median_ms': statistics.median(samples), 'rows': len(result), 'plan': plan}


def write_cost(db):
    fixture = list(rows(100000, 1000))
    samples = []
    for _ in range(7):
        started = time.perf_counter()
        db.executemany(INSERT, fixture)
        samples.append((time.perf_counter() - started) * 1000)
        db.rollback()
    return statistics.median(samples)


def sqlite_benchmark():
    db = sqlite3.connect(':memory:')
    migrations = sorted(MIGRATIONS.glob('*.sql'))
    for migration in migrations:
        if migration.name < '20261001':
            db.executescript(migration.read_text())
    seed(db)
    queries = {
        'public_first_page': (SELECT + PUBLIC + ORDER + ' LIMIT ? OFFSET ?', (61, 0)),
        'owner_first_page': (SELECT + OWNER + ORDER + ' LIMIT ? OFFSET ?', ('owner-1', 61, 0)),
        'public_deep_page': (SELECT + PUBLIC + ORDER + ' LIMIT ? OFFSET ?', (61, 30000)),
        'public_rare_search': (SELECT + PUBLIC + SEARCH + ORDER + ' LIMIT ? OFFSET ?', ('%99999%',) * 4 + (61, 0)),
        'owner_totals': ("SELECT COUNT(*), COALESCE(SUM(file_size_bytes),0) FROM clips" + OWNER, ('owner-1',)),
    }
    expected = {}
    results = {'sqlite_version': sqlite3.sqlite_version, 'fixture': {'clips': 100000, 'users': 10, 'public': 75000, 'null_uploaded': 991}, 'stages': {}}
    for stage in ['existing', 'sort_indexes', 'maintenance_indexes', 'search_indexes']:
        if stage != 'existing':
            number = {'sort_indexes': '001', 'maintenance_indexes': '002', 'search_indexes': '003'}[stage]
            migration = next(m for m in migrations if m.name.startswith('202610010' + number))
            started = time.perf_counter()
            db.executescript(migration.read_text())
            build_ms = (time.perf_counter() - started) * 1000
            db.execute('ANALYZE')
        else:
            build_ms = 0
        output = {'migration_ms': build_ms, 'database_bytes': db.execute('PRAGMA page_count').fetchone()[0] * db.execute('PRAGMA page_size').fetchone()[0], 'insert_1000_median_ms': write_cost(db), 'queries': {}}
        for name, (sql, args) in queries.items():
            if stage == 'search_indexes' and name == 'public_rare_search':
                sql = SELECT + PUBLIC + CANDIDATES + SEARCH + ORDER + ' LIMIT ? OFFSET ?'
                args = ('"99999"', '%99999%') + args
            result, output['queries'][name] = measure(db, sql, args)
            if stage == 'existing': expected[name] = result
            assert result == expected[name], name
        results['stages'][stage] = output
    anchor = db.execute('SELECT uploaded_at,id FROM clips' + PUBLIC + ORDER + ' LIMIT 1 OFFSET 29999').fetchone()
    sql = SELECT + PUBLIC + ' AND (uploaded_at IS NULL) = 0 AND (uploaded_at,id) < (?,?) ORDER BY uploaded_at DESC, id DESC LIMIT 61'
    result, results['cursor_at_30000'] = measure(db, sql, anchor)
    assert result == expected['public_deep_page']
    results['object_bytes'] = dict(db.execute('SELECT name,SUM(pgsize) FROM dbstat GROUP BY name'))
    return results


def http_benchmark():
    binary = ROOT / 'target/debug/clipline-cloud-server'
    with tempfile.TemporaryDirectory(prefix='clipline-http-benchmark-') as temporary:
        directory = Path(temporary)
        with socket.socket() as listener:
            listener.bind(('127.0.0.1', 0))
            port = listener.getsockname()[1]
        origin = f'http://127.0.0.1:{port}'
        database = directory / 'db.sqlite'
        env = {key: value for key, value in os.environ.items() if not key.startswith('CLIPLINE_')}
        env.update(CLIPLINE_PUBLIC_URL=origin, CLIPLINE_BIND_ADDR=f'127.0.0.1:{port}', CLIPLINE_PROCESS_ROLE='web', CLIPLINE_STORAGE_BACKEND='local', CLIPLINE_DATA_DIR=str(directory / 'data'), CLIPLINE_DATABASE_URL=f'sqlite://{database}', CLIPLINE_LOG_LEVEL='warn')
        with (directory / 'server.log').open('w') as log:
            process = subprocess.Popen([str(binary)], env=env, cwd=ROOT, stdout=log, stderr=log)
            try:
                for _ in range(100):
                    if process.poll() is not None: raise RuntimeError((directory / 'server.log').read_text())
                    try:
                        urllib.request.urlopen(origin + '/readyz', timeout=1).read()
                        break
                    except OSError: time.sleep(.1)
                else: raise RuntimeError('server did not become ready')
                db = sqlite3.connect(database)
                seed(db)
                token = 'optimization-benchmark-token'
                db.execute("INSERT INTO device_tokens(id,user_id,name,token_hash,created_at) VALUES('benchmark-token','owner-1','benchmark',?,?)", (hashlib.sha256(token.encode()).hexdigest(), STAMP))
                db.commit()
                anchor = db.execute('SELECT uploaded_at,id FROM clips' + PUBLIC + ORDER + ' LIMIT 1 OFFSET 29999').fetchone()
                cursor = base64.urlsafe_b64encode(json.dumps({'sort': 'UploadedAtDesc', 'value': {'Timestamp': anchor[0]}, 'id': anchor[1]}).encode()).decode().rstrip('=')
                paths = {'public_first_page': '/api/v1/public/clips?page_size=60', 'owner_page_without_totals': '/api/v1/clips/page?page_size=60', 'owner_legacy_page_with_totals': '/api/v1/clips?page_size=60', 'owner_totals': '/api/v1/clips/totals', 'public_rare_search': '/api/v1/public/clips?q=99999&page_size=60', 'public_offset_30000': '/api/v1/public/clips?page_size=60&page=501', 'public_cursor_30000': '/api/v1/public/clips?page_size=60&page=501&cursor=' + cursor, 'auth_me': '/api/v1/auth/me'}
                results = {}
                bodies = {}
                for name, path in paths.items():
                    request = urllib.request.Request(origin + path, headers={'Authorization': 'Bearer ' + token})
                    samples = []
                    expected = None
                    for _ in range(8):
                        started = time.perf_counter()
                        body = urllib.request.urlopen(request, timeout=10).read()
                        elapsed = (time.perf_counter() - started) * 1000
                        if expected is not None:
                            assert body == expected
                            samples.append(elapsed)
                        expected = body
                    results[name] = {'median_ms': statistics.median(samples), 'response_bytes': len(expected)}
                    bodies[name] = json.loads(expected)
                assert bodies['public_cursor_30000']['clips'] == bodies['public_offset_30000']['clips']
                gzip_request = urllib.request.Request(origin + paths['public_first_page'], headers={'Accept-Encoding': 'gzip', 'Authorization': 'Bearer ' + token})
                compressed = urllib.request.urlopen(gzip_request, timeout=10)
                assert compressed.headers.get('Content-Encoding') == 'gzip'
                decoded = gzip.decompress(compressed.read())
                identity = urllib.request.urlopen(urllib.request.Request(origin + paths['public_first_page'], headers={'Authorization': 'Bearer ' + token}), timeout=10).read()
                assert decoded == identity
                source = directory / 'data/objects/media/token-1/source.mp4'
                source.parent.mkdir(parents=True, exist_ok=True)
                video = bytes(range(256)) * 16
                source.write_bytes(video)
                media_path = origin + f'/api/v1/clips/{1:026d}/media'
                ranged = urllib.request.urlopen(urllib.request.Request(media_path, headers={'Authorization': 'Bearer ' + token, 'Range': 'bytes=10-19', 'Accept-Encoding': 'gzip'}), timeout=10)
                assert ranged.status == 206
                assert ranged.headers['Content-Range'] == 'bytes 10-19/4096'
                assert ranged.headers.get('Content-Encoding') is None
                assert ranged.read() == bytes(range(10, 20))
                full = urllib.request.urlopen(urllib.request.Request(media_path, headers={'Authorization': 'Bearer ' + token, 'Accept-Encoding': 'gzip'}), timeout=10)
                assert full.headers.get('Content-Encoding') is None
                assert full.read() == video
                return {'backend': 'disk-backed SQLite, loopback HTTP, debug build', 'baseline_comparison': False, 'endpoints': results, 'response_checks': ['JSON gzip equals identity response', 'video range bytes and headers preserved', 'full video remains uncompressed']}
            finally:
                process.terminate()
                process.wait(timeout=10)


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--http', action='store_true', help='also start a disposable server; build the server first')
    parser.add_argument('--output', type=Path)
    args = parser.parse_args()
    result = {'scope': 'synthetic fixture; not a production load profile', 'sqlite': sqlite_benchmark()}
    if args.http: result['http'] = http_benchmark()
    serialized = json.dumps(result, indent=2)
    if args.output: args.output.write_text(serialized + '\n')
    print(serialized)
