/**
 * Global client-side store using localStorage + custom events
 * This makes Admin changes instantly visible on the website
 * without requiring a page reload.
 */

export type StoreKey = "menu_items" | "menu_offers" | "order_links" | "settings" | "reviews";

const EVENT_NAME = "arabesque:store:update";

// Save data and broadcast update
export function storeSet<T>(key: StoreKey, data: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(`arabesque_${key}`, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: { key } }));
  } catch {}
}

// Get data from localStorage
export function storeGet<T>(key: StoreKey, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(`arabesque_${key}`);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

// Subscribe to store changes
export function storeSubscribe(key: StoreKey, callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const handler = (e: Event) => {
    const ev = e as CustomEvent<{ key: StoreKey }>;
    if (ev.detail?.key === key) callback();
  };
  window.addEventListener(EVENT_NAME, handler);
  return () => window.removeEventListener(EVENT_NAME, handler);
}
