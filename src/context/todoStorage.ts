import type { TodoItemType } from "../components/TodosList";

const STORAGE_KEY = "todos";

function isTodoItem(value: unknown): value is TodoItemType {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return false;
  }

  const todoItem = value as Record<string, unknown>;

  return (
    typeof todoItem.id === "string" &&
    todoItem.id.length > 0 &&
    typeof todoItem.title === "string" &&
    todoItem.title.trim().length > 0 &&
    typeof todoItem.completed === "boolean"
  );
}

/**
 * Load and validate todo items from browser storage.
 *
 * Returns null when no saved value exists, JSON is malformed, the stored
 * shape is invalid, or browser storage cannot be read.
 */
export function loadTodos(): TodoItemType[] | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored !== null) {
      const parsed: unknown = JSON.parse(stored);

      if (!Array.isArray(parsed)) {
        console.warn(
          "Failed to load todos from localStorage: invalid data format",
        );
        return null;
      }

      const validItems = parsed.filter(isTodoItem);

      if (validItems.length !== parsed.length) {
        console.warn(
          "Failed to load todos from localStorage: invalid data format",
        );
        return null;
      }

      return validItems;
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
