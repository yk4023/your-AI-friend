export function createSTTProvider({ id, transcribe } = {}) {
  if (!id || typeof transcribe !== "function") throw new Error("STT provider requires id and transcribe()");
  return { id, transcribe, localOnly: true };
}
