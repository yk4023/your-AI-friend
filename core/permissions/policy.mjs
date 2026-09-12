export const CAPABILITY_LEVELS = Object.freeze({ "public.web.read": "L2", "private.files.read": "L3", "screen.snapshot": "L3", "camera.snapshot": "L3", "files.write": "L4", "apps.control": "L4", "payments.delete": "L4" });
export function createPermissionRequest({ capability, scope = "", duration = "once", reason = "" } = {}) {
  if (!CAPABILITY_LEVELS[capability]) throw new Error(`Unsupported capability: ${capability}`);
  if (!["once", "session", "scoped"].includes(duration)) throw new Error("Unsupported permission duration");
  return { id: `perm-${Date.now().toString(36)}-${Math.random().toString(16).slice(2)}`, capability, scope: String(scope).slice(0, 500), duration, reason: String(reason).slice(0, 800), status: "pending_user_confirmation", createdAt: new Date().toISOString(), localOnly: true };
}
export function permissionAllows({ grant, capability, scope = "" } = {}) {
  if (!grant || grant.capability !== capability || grant.status !== "approved") return false;
  if (grant.expiresAt && Date.parse(grant.expiresAt) <= Date.now()) return false;
  return !grant.scope || String(scope).startsWith(String(grant.scope));
}
