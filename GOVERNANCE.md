# Governance

Xiaoya Framework uses maintainer review with transparent, auditable changes.
Small bug fixes and documentation changes may be merged after one maintainer
review. Changes to permissions, provider boundaries, Skill promotion/rollback,
privacy guarantees or release checks require explicit maintainer approval and a
passing `npm run check` result.

The repository owner acts as release maintainer for the `0.x` series. A release
candidate is created only after the local release gate, package manifest and
license audit pass. Product-specific media and runtime configuration remain
outside the public repository.
