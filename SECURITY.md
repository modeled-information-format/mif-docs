# Security

## Verifying Release Artifacts

Every `mif-docs` release ships a reproducible source tarball
(`mif-docs-<version>.tar.gz`) carrying a **SLSA build-provenance attestation**.
The attestation is keyless (Sigstore/Fulcio) and its signer identity is this
repository's release workflow. Publication is **fail-closed**: the release job
re-verifies the attestation before uploading, so a tag publishes nothing
unattested.

To verify a downloaded artifact yourself:

```sh
# 1. Download the artifact from the GitHub Release.
gh release download <tag> --repo modeled-information-format/mif-docs \
  --pattern 'mif-docs-*.tar.gz'

# 2. Verify SLSA build provenance. --repo scopes trust to this repository;
#    --signer-workflow pins the certificate identity to the release workflow,
#    so an attestation from any other workflow would not pass.
gh attestation verify mif-docs-<version>.tar.gz \
  --repo modeled-information-format/mif-docs \
  --signer-workflow modeled-information-format/mif-docs/.github/workflows/release.yml
```

A non-zero exit means the artifact is not the attested bytes — do not use it.

## Supply-chain posture

- Every GitHub Action is pinned to a full 40-char commit SHA; the central
  `pin-check` reusable enforces this on every push and PR.
- Workflows are linted via the central `reusable-actionlint`.
- The release artifact is built with `git archive` (deterministic from the
  commit tree) and attested with `actions/attest-build-provenance`.

## Reporting a vulnerability

Open a private security advisory on the repository, or contact the
`modeled-information-format` maintainers.
