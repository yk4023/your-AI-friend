export const STATE_ACTIVITIES = Object.freeze(["idle", "listening", "thinking", "working", "speaking", "interrupted", "error"]);
export function createCharacterState({ characterId = "demo-character", timeZone = "UTC" } = {}) {
  const timestamp = new Date().toISOString();
  return { schemaVersion: 1, characterId, revision: 0, updatedAt: timestamp, timeZone, provenance: "local-only", state: { activity: "idle", emotion: { label: "calm", intensity: 0.2 }, energy: 0.85, goals: [] }, events: [] };
}
export function applyStatePatch(current, patch = {}, event = {}) {
  const base = current || createCharacterState();
  const activity = STATE_ACTIVITIES.includes(patch.activity) ? patch.activity : base.state.activity;
  const timestamp = new Date().toISOString();
  const eventRecord = { id: `${timestamp}-${Math.random().toString(16).slice(2)}`, type: String(event.type || "state.updated"), source: String(event.source || "framework"), summary: String(event.summary || "state updated").slice(0, 500), at: timestamp, localOnly: true };
  return { ...base, revision: Number(base.revision || 0) + 1, updatedAt: timestamp, provenance: "local-only", state: { ...base.state, ...patch, activity, emotion: { ...base.state.emotion, ...(patch.emotion || {}) } }, events: [...(base.events || []), eventRecord].slice(-200) };
}
