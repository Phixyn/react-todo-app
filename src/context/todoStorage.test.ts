import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import type { TodoItemType } from "../components/TodosList";
import { loadTodos, saveTodos } from "./todoStorage";

const STORAGE_KEY = "todos";

const sampleTodos: TodoItemType[] = [
  { id: "task-1", title: "Review assignment", completed: false },
  { id: "task-2", title: "Run tests", completed: true },
];

describe("todoStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("loadTodos", () => {
    it("returns null when no saved todo data exists", () => {
      expect(loadTodos()).toBeNull();
    });

    it("returns todo items parsed from valid saved JSON", () => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleTodos));

      expect(loadTodos()).toEqual(sampleTodos);
    });

    it("returns null and warns when saved JSON is malformed", () => {
      localStorage.setItem(STORAGE_KEY, "{not valid JSON");
      const warning = vi.spyOn(console, "warn").mockImplementation(() => {});

      expect(loadTodos()).toBeNull();
      expect(warning).toHaveBeenCalledWith(
        "Failed to load todos from localStorage:",
        expect.any(SyntaxError),
      );
    });

    it("returns null and warns when localStorage cannot be read", () => {
      vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
        throw new Error("Storage unavailable");
      });
      const warning = vi.spyOn(console, "warn").mockImplementation(() => {});

      expect(loadTodos()).toBeNull();
      expect(warning).toHaveBeenCalledWith(
        "Failed to load todos from localStorage:",
        expect.any(Error),
      );
    });
  });

  describe("saveTodos", () => {
    it("stores todo items as JSON under the existing todos key", () => {
      saveTodos(sampleTodos);

      expect(localStorage.getItem(STORAGE_KEY)).toBe(
        JSON.stringify(sampleTodos),
      );
    });

    it("does not throw and warns when localStorage cannot be written", () => {
      vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
        throw new Error("Storage unavailable");
      });
      const warning = vi.spyOn(console, "warn").mockImplementation(() => {});

      expect(() => saveTodos(sampleTodos)).not.toThrow();
      expect(warning).toHaveBeenCalledWith(
        "Failed to save todos to localStorage:",
        expect.any(Error),
      );
    });
  });
});
