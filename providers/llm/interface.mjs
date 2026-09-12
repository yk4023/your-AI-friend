// Provider-neutral contract. Concrete adapters own credentials and endpoints.
export function createLLMProvider({ id, complete, stream } = {}) {
  if (!id || typeof complete !== "function") throw new Error("LLM provider requires id and complete()");
  return { id, async complete(request) { return complete({ ...request, input: String(request?.input || "") }); }, ...(typeof stream === "function" ? { stream: (request) => stream(request) } : {}), localOnly: true };
}
