export const AVATAR_STATES = Object.freeze(["idle", "listening", "thinking", "working", "speaking", "interrupted", "error"]);
export function createAvatarProvider({ id, play, stop } = {}) {
  if (!id || typeof play !== "function") throw new Error("Avatar provider requires id and play()");
  return { id, play, stop: typeof stop === "function" ? stop : async () => {}, states: [...AVATAR_STATES], localOnly: true };
}
