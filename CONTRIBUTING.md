# Contributing

Contributions should preserve the local-first and permission-gated design.

## Before opening a change

Run from `xiaoya-framework`:

```bash
npm run check
```

This runs the public smoke test, XiaoyaBench, the release-boundary scan and a dry-run package manifest. Changes that add credentials, model weights, private media, machine paths, network uploads or automatic Skill promotion are out of scope.

Keep provider integrations behind the interfaces in `providers/`. Keep character assets and deployment configuration in the private Xiaoya instance, never in this public package.
