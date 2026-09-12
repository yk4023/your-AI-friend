export const WORKSPACE_LIMITS = Object.freeze({ currentGoals: 1, activeSubgoals: 3, retrievedMemories: 8, salientEvents: 6, activeSkills: 5, candidateActions: 6 });
const clamp = (value) => Math.max(0, Math.min(1, Number.isFinite(Number(value)) ? Number(value) : 0));
export function scoreEvent(event = {}, { goalText = "", known = [] } = {}) {
  const text = [event.type, event.summary, event.source].filter(Boolean).join(" ").toLowerCase();
  const novelty = known.some((item) => String(item).toLowerCase() === text) ? 0.18 : 0.72;
  const goalRelevance = goalText ? clamp(text.includes(String(goalText).slice(0, 16).toLowerCase()) ? 0.9 : 0.25) : 0.25;
  const salience = clamp((/error|failure|blocked|超时|失败/iu.test(text) ? 0.72 : 0.28) + novelty * 0.25 + goalRelevance * 0.35);
  return { ...event, novelty, goalRelevance, salience, action: salience >= 0.7 ? "consider" : "defer", localOnly: true };
}
export function buildWorkspace({ currentGoal = null, subgoals = [], memories = [], events = [], actions = [], constraints = [], gateEnabled = true } = {}) {
  const scored = events.map((item) => item.salience === undefined ? scoreEvent(item) : item);
  const salientEvents = (gateEnabled ? scored.sort((a, b) => b.salience - a.salience) : scored).slice(0, WORKSPACE_LIMITS.salientEvents);
  return { schemaVersion: 1, capturedAt: new Date().toISOString(), attentionGate: { enabled: Boolean(gateEnabled), limits: { ...WORKSPACE_LIMITS } }, currentGoal, activeSubgoals: subgoals.slice(-3), retrievedMemory: memories.slice(-8), salientEvents, candidateActions: actions.slice(-6), currentConstraints: constraints.slice(-8), localOnly: true };
}
export function arbitrate({ drive = 0, feasibility = 0, goalRelevance = 0, safetyPermission = 0, cost = 0, interruptionCost = 0, permissionVeto = false } = {}) {
  const score = Number(drive) * Number(feasibility) * Number(goalRelevance) * Number(safetyPermission) - Number(cost) - Number(interruptionCost);
  return { score, allowed: !permissionVeto && Number(safetyPermission) > 0 && score > 0, veto: permissionVeto || Number(safetyPermission) <= 0, localOnly: true };
}
