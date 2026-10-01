# MinIO withdrew its community images and binaries. Build the upstream releases
# from immutable commits instead, using Go's module checksum verification.
FROM golang:1.25-alpine@sha256:1ae0735f00daffa3aaf1363a5184c0d2dc55c78e3db4ec70241cdac97bf84b59 AS build
ENV CGO_ENABLED=0 GOBIN=/out

FROM build AS minio-build
# RELEASE.2025-10-15T17-29-55Z
RUN go install -trimpath -ldflags="-s -w" github.com/minio/minio@9e49d5e7a648f00e26f2246f4dc28e6b07f8c84a

FROM build AS mc-build
# RELEASE.2025-08-13T08-35-41Z
RUN go install -trimpath -ldflags="-s -w" github.com/minio/mc@7394ce0dd2a80935aded936b09fa12cbb3cb8096

FROM alpine:3.22@sha256:5291449c3df73caf6ed85e649dec1b9e818b39a5d8c871e97afc13e9cd5e8fa8 AS runtime
RUN apk add --no-cache ca-certificates

FROM runtime AS minio
COPY --from=minio-build /out/minio /usr/local/bin/minio
EXPOSE 9000 9001
ENTRYPOINT ["minio"]
CMD ["server", "/data", "--console-address", ":9001"]

FROM runtime AS mc
COPY --from=mc-build /out/mc /usr/local/bin/mc
ENTRYPOINT ["mc"]
