const IMMUTABLE_ROOTS = Object.freeze(["Permission Root", "Audit Root", "Promotion Root", "Rollback Root"]);
export function createSkillRegistry({ autoPromotion = false } = {}) {
  const skills = new Map();
  return {
    register(candidate) { if (!candidate?.id) throw new Error("Skill id is required"); const value = { ...candidate, status: "candidate", localOnly: true }; skills.set(candidate.id, value); return { ...value }; },
    get(id) { const value = skills.get(id); return value ? { ...value } : null; },
    list() { return [...skills.values()].map((value) => ({ ...value })); },
    validate(id, result) { const value = skills.get(id); if (!value) throw new Error("Skill not found"); const next = { ...value, status: result?.passed === true ? "validated" : "candidate", lastSandbox: { ...result, localOnly: true } }; skills.set(id, next); return { ...next }; },
    promote(id, { userConfirmed = false, actor = "" } = {}) { if (userConfirmed !== true || actor !== "user-confirmation") throw new Error("User confirmation required"); const value = skills.get(id); if (!value || value.status !== "validated") throw new Error("Only validated Skill can be promoted"); const next = { ...value, status: "approved", approvedBy: actor, autoPromotion: Boolean(autoPromotion) }; skills.set(id, next); return { ...next }; },
    rollback(id, { userConfirmed = false, actor = "" } = {}) { if (userConfirmed !== true || actor !== "user-confirmation") throw new Error("User confirmation required"); const value = skills.get(id); if (!value) throw new Error("Skill not found"); const next = { ...value, status: "rolled_back" }; skills.set(id, next); return { ...next }; },
    policy: { autoPromotion: false, immutableRoots: [...IMMUTABLE_ROOTS], selfGrantCount: 0 },
  };
}
