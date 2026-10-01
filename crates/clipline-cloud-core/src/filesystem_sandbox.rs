//! Unprivileged, fail-closed filesystem confinement for media subprocesses.
use std::{
    ffi::CString,
    io,
    os::fd::{AsRawFd, FromRawFd, OwnedFd},
    os::unix::ffi::OsStrExt,
    path::Path,
};

const READ: u64 = (1 << 0) | (1 << 2) | (1 << 3);
const ALL: u64 = (1 << 15) - 1;
#[repr(C)]
struct Ruleset {
    handled_access_fs: u64,
}
#[repr(C, packed)]
struct PathRule {
    allowed_access: u64,
    parent_fd: i32,
}

pub(crate) fn check_support() -> io::Result<()> {
    let abi = unsafe {
        libc::syscall(
            libc::SYS_landlock_create_ruleset,
            std::ptr::null::<u8>(),
            0,
            1,
        )
    };
    if abi < 3 {
        return Err(io::Error::new(
            io::ErrorKind::Unsupported,
            "media sandbox requires Landlock ABI 3 (Linux 6.2+)",
        ));
    }
    Ok(())
}

pub(crate) fn prepare(program: &str, scratch: Option<&Path>) -> io::Result<OwnedFd> {
    check_support()?;
    let attr = Ruleset {
        handled_access_fs: ALL,
    };
    let raw = unsafe {
        libc::syscall(
            libc::SYS_landlock_create_ruleset,
            &attr,
            std::mem::size_of::<Ruleset>(),
            0,
        )
    };
    if raw < 0 {
        return Err(io::Error::last_os_error());
    }
    let ruleset = unsafe { OwnedFd::from_raw_fd(raw as i32) };
    for path in [
        "/usr",
        "/lib",
        "/lib64",
        "/bin",
        "/etc/ld.so.cache",
        "/etc/fonts",
        "/etc/localtime",
    ] {
        if Path::new(path).exists() {
            allow(&ruleset, Path::new(path), READ)?;
        }
    }
    for path in ["/dev/null", "/dev/urandom", "/dev/random"] {
        if Path::new(path).exists() {
            allow(&ruleset, Path::new(path), (1 << 1) | (1 << 2) | (1 << 14))?;
        }
    }
    if program.contains('/') {
        allow(&ruleset, Path::new(program), READ)?;
    }
    if let Some(path) = scratch {
        allow(&ruleset, path, ALL & !(1 << 0))?;
    }
    Ok(ruleset)
}

fn allow(ruleset: &OwnedFd, path: &Path, mut access: u64) -> io::Result<()> {
    let path_string = CString::new(path.as_os_str().as_bytes())?;
    let raw = unsafe { libc::open(path_string.as_ptr(), libc::O_PATH | libc::O_CLOEXEC) };
    if raw < 0 {
        return Err(io::Error::last_os_error());
    }
    let fd = unsafe { OwnedFd::from_raw_fd(raw) };
    if !path.is_dir() {
        access &= (1 << 0) | (1 << 1) | (1 << 2) | (1 << 14);
    }
    let rule = PathRule {
        allowed_access: access,
        parent_fd: fd.as_raw_fd(),
    };
    if unsafe {
        libc::syscall(
            libc::SYS_landlock_add_rule,
            ruleset.as_raw_fd(),
            1,
            &rule,
            0,
        )
    } != 0
    {
        return Err(io::Error::last_os_error());
    }
    Ok(())
}

pub(crate) fn restrict(ruleset: &OwnedFd) -> io::Result<()> {
    if unsafe { libc::prctl(libc::PR_SET_NO_NEW_PRIVS, 1, 0, 0, 0) } != 0 {
        return Err(io::Error::last_os_error());
    }
    if unsafe { libc::syscall(libc::SYS_landlock_restrict_self, ruleset.as_raw_fd(), 0) } != 0 {
        return Err(io::Error::last_os_error());
    }
    Ok(())
}
