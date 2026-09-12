export function createEventBus({ maxEvents = 200 } = {}) {
  const listeners = new Set();
  const history = [];
  return {
    on(listener) { listeners.add(listener); return () => listeners.delete(listener); },
    emit(event) { const value = { ...event, at: event.at || new Date().toISOString(), localOnly: true }; history.push(value); while (history.length > maxEvents) history.shift(); for (const listener of listeners) listener(value); return value; },
    recent(limit = 20) { return history.slice(-Math.max(1, Math.min(maxEvents, limit))); },
  };
}
