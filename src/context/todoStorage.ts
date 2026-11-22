import type { TodoItemType } from "../components/TodosList";

const STORAGE_KEY = "todos";

/**
 * Load todo items from browser storage.
 *
 * Returns null when no saved value exists or when storage cannot be read.
 * JSON shape validation is intentionally handled as a separate mitigation.
 */
export function loadTodos(): TodoItemType[] | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored !== null) {
      return JSON.parse(stored) as TodoItemType[];
    }
  } catch (err) {
    console.warn("Failed to load todos from localStorage:", err);
  }

  return null;
}

/**
 * Persist todo items using the existing storage key and JSON format.
 * Storage and serialization errors are caught to preserve in-memory state.
 */
export function saveTodos(todoItems: TodoItemType[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todoItems));
  } catch (err) {
    console.warn("Failed to save todos to localStorage:", err);
  }
}
