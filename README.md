# Xiaoya Framework / 小雅框架

Xiaoya Framework is a local-first cognitive-agent framework for building an
embodied assistant with explicit permissions, auditable memory and pluggable
LLM/TTS/STT/avatar providers. The public repository contains reusable code and
contracts only; private character media, model weights, credentials and host
configuration stay in the deployment layer.

[![CI](https://github.com/yk4023/your-AI-friend/actions/workflows/ci.yml/badge.svg)](https://github.com/yk4023/your-AI-friend/actions/workflows/ci.yml)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](LICENSE)

## What is included

- State, event, memory and permission contracts.
- Bounded cognition: attention gate, conscious workspace and value/feasibility arbitration.
- Persistent Self Model, reflection, curiosity and budgeted goals.
- Declarative Skill candidates with sandbox validation, human promotion and rollback.
- Provider-neutral LLM, TTS, STT and avatar interfaces.
- Deterministic smoke tests, XiaoyaBench and a local-only release audit.

## What is deliberately excluded

The repository does not ship model weights, private photos/videos/audio,
conversation history, API keys, machine-specific paths or an unrestricted shell
agent. An adapter may connect a local model such as Qwen/vLLM, but network
access and external writes remain explicit, observable and permission-gated.

## Release map

| Version | Scope | Status |
| --- | --- | --- |
| v0.1 | State, memory, permissions, events and provider contracts | Stable baseline |
| v0.2 | Skill candidate, validation, promotion and rollback | Stable baseline |
| v0.3 | Cognition, Self Model, reflection and persistent goals | `XIAOYA_V3_0_FRAMEWORK_RC1` |
| v0.4 | Optional embodied adapters and deployment integrations | Planned |

The framework RC1 gate is a code and safety gate. Visual naturalness, complex
motion semantics, microphone reliability and long-running UX remain product-level
manual acceptance for the private Xiaoya deployment and are not represented as
completed by this package.

## Quick start

Requires Node.js 20 or newer.

```bash
npm install
npm run check
```

The check is offline and local-only: it runs the smoke test, XiaoyaBench,
release-boundary checks and an npm package manifest preview. It does not download
models, upload data or publish a package.

```js
import {
  createCharacterState,
  createEventBus,
  buildWorkspace,
  arbitrate,
} from "xiaoya-framework";

const state = createCharacterState({ characterId: "demo-character" });
const bus = createEventBus();
const workspace = buildWorkspace({
  currentGoal: { id: "demo", title: "observe" },
  events: [bus.emit({ type: "observation", summary: "local service healthy" })],
});
console.log(state.characterId, workspace.attentionGate);
console.log(arbitrate({ drive: 0.8, feasibility: 1, goalRelevance: 0.8, safetyPermission: 1 }));
```

## Architecture

```text
event → subconscious score → attention gate → conscious workspace
      → drive/reality/value arbitration → goal/skill/provider/avatar
      → observation → verification → reflection → candidate → user gate
```

The Permission Engine is the final veto. See [docs/architecture.md](docs/architecture.md)
and [docs/v3-roadmap.md](docs/v3-roadmap.md).

## Contributing and security

Please read [CONTRIBUTING.md](CONTRIBUTING.md), [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)
and [SECURITY.md](SECURITY.md) before opening an issue or pull request. Apache-2.0
applies to framework code; third-party models and adapters retain their own
licenses as described in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

## Project status

The public framework is maintained as a small, reviewable release candidate.
Private deployment progress and manual product acceptance are tracked separately
from this repository so that private media and operational logs are never
accidentally published.
