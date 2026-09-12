export function createTTSProvider({ id, synthesize } = {}) {
  if (!id || typeof synthesize !== "function") throw new Error("TTS provider requires id and synthesize()");
  return { id, synthesize: (text, options = {}) => synthesize(String(text), options), localOnly: true };
}
