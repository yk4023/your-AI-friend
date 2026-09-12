export const MEMORY_LAYERS = Object.freeze(["working", "episodic", "semantic", "procedural", "social", "self"]);
export function createMemoryRecord({ layer, content, source = "local-user", importance = 2, tags = [] } = {}) {
  if (!MEMORY_LAYERS.includes(layer)) throw new Error(`Unsupported memory layer: ${layer}`);
  if (!String(content || "").trim()) throw new Error("Memory content is required");
  const timestamp = new Date().toISOString();
  return { id: `memory-${Date.now().toString(36)}-${Math.random().toString(16).slice(2)}`, layer, content: String(content).slice(0, 4000), source: String(source).slice(0, 240), importance: Math.max(0, Math.min(5, Number(importance) || 0)), tags: Array.isArray(tags) ? tags.map(String).slice(0, 12) : [], createdAt: timestamp, updatedAt: timestamp, localOnly: true };
}
