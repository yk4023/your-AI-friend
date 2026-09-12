# V3 roadmap and DoD

## V3.0 Skill baseline — PASS

The local-system-health reference Skill records Goal, Plan, Execute, Verify, Reflection, Candidate, repeated Validation, human Promotion, Reuse and rollback. `autoPromotion=false` and `selfGrantCount=0` are invariants.

## V3.1 Cognitive Core — PASS (safe baseline)

The model-free subconscious scorer feeds an Attention Gate and bounded Conscious Workspace. Gate ON/OFF is testable; Drive/Reality/Value arbitration gives Permission veto the final decision.

## V3.2 Self Model — PASS (safe baseline)

Identity and permission roots are immutable. Changes require evidence, validation, an independent user confirmation, an audit revision and a rollback snapshot.

## V3.3 Curiosity — PASS (candidate-only)

Research priority produces LearningCandidate records only. Sources are limited to localhost, approved private-file adapters and public-web staging; no candidate silently performs network I/O.

## V3.4 Reflection — PASS (gated consolidation)

Observations become evidence-backed Lesson Candidates. Validation and independent confirmation are required before writing a classified memory.

## V3.5 Persistent Goals — PASS (bounded runtime)

Each goal has owner, priority, dependencies, permissions, token/time budget, retry limit, stop condition, verification and deadline fields. Exhausted goals abandon rather than retry forever.

## V3.6 Self-evolving Skills — PASS (declarative sandbox)

Candidates expose declarative steps and fixed checks. Sandbox results are auditable; promotion and rollback require user confirmation. Arbitrary shell, silent code writes and modifications to Permission/Audit/Promotion/Rollback roots are intentionally unsupported.

## Release invariants

```text
unauthorized_private_access = 0
self_permission_grant = 0
unapproved_production_skill = 0
silent_external_write = 0
unlogged_autonomous_action = 0
```

Run `npm test`, `npm run bench` and the repository-level `python scripts/open_source_audit.py` before publishing.
