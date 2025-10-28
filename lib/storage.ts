// lib/storage.ts
export type Message = {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  ts: string;
};

export function saveConversation(id: string, messages: Message[]) {
  try {
    localStorage.setItem(`feelgood:conv:${id}`, JSON.stringify(messages));
    // Also keep index
    const idx = loadIndex();
    if (!idx.includes(id)) idx.unshift(id);
    localStorage.setItem("feelgood:convs", JSON.stringify(idx));
  } catch (e) {
    console.warn("saveConversation error", e);
  }
}

export function loadConversations(): Record<string, Message[]> {
  try {
    const rawIdx = localStorage.getItem("feelgood:convs");
    const idx: string[] = rawIdx ? JSON.parse(rawIdx) : [];
    const out: Record<string, Message[]> = {};
    for (const id of idx) {
      const raw = localStorage.getItem(`feelgood:conv:${id}`);
      if (raw) {
        out[id] = JSON.parse(raw);
      } else {
        out[id] = [];
      }
    }
    return out;
  } catch (e) {
    console.warn("loadConversations error", e);
    return {};
  }
}

function loadIndex(): string[] {
  try {
    const rawIdx = localStorage.getItem("feelgood:convs");
    return rawIdx ? JSON.parse(rawIdx) : [];
  } catch {
    return [];
  }
}
