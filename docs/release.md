# Release checklist

This repository is released from a clean checkout. Before tagging a release:

1. Run `npm run check` in `xiaoya-framework`.
2. Run the repository-level local release gate and license audit.
3. Review the generated package manifest for private files.
4. Confirm that no model weights, private media, credentials or runtime logs are
   tracked by Git.
5. Update `CHANGELOG.md`, create a signed or reviewed tag and publish only after
   the repository owner explicitly authorizes the remote write.

The public package is intentionally separate from the private Xiaoya deployment.
Do not copy the private `data/`, `assets/`, service configuration or acceptance
logs into this repository.
