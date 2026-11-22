import { describe, expect, it } from "vitest";

import type { TodoItemType } from "../components/TodosList";
import { initialState } from "./TodoContext";
import type { TodoListState } from "./TodoContext";
import TodoReducer from "./TodoReducer";

const firstTodo: TodoItemType = {
  id: "task-1",
  title: "First task",
  completed: false,
};

const secondTodo: TodoItemType = {
  id: "task-2",
  title: "Second task",
  completed: false,
};

function createState(
  todoItems: TodoItemType[] = [],
  editingId: string | null = null,
): TodoListState {
  return {
    ...initialState,
    todoItems,
    editingId,
  };
}

describe("TodoReducer", () => {
  it("adds a new todo to the beginning without mutating the previous state", () => {
    const state = createState([firstTodo]);
    const newTodo: TodoItemType = {
      id: "task-3",
      title: "New task",
      completed: false,
    };

    const nextState = TodoReducer(state, {
      type: "ADD_TODO",
      payload: newTodo,
    });

    expect(nextState.todoItems).toEqual([newTodo, firstTodo]);
    expect(nextState.todoItems).not.toBe(state.todoItems);
    expect(state.todoItems).toEqual([firstTodo]);
  });

  it("toggles only the targeted todo completion state", () => {
    const state = createState([firstTodo, secondTodo]);

    const nextState = TodoReducer(state, {
      type: "TOGGLE_TODO_COMPLETE",
      payload: firstTodo.id,
    });

    expect(nextState.todoItems).toEqual([
      { ...firstTodo, completed: true },
      secondTodo,
    ]);
    expect(nextState.todoItems[1]).toBe(secondTodo);
    expect(state.todoItems[0].completed).toBe(false);
  });

  it("deletes only the todo with the requested id", () => {
    const state = createState([firstTodo, secondTodo]);

    const nextState = TodoReducer(state, {
      type: "DELETE_TODO",
      payload: firstTodo.id,
    });

    expect(nextState.todoItems).toEqual([secondTodo]);
    expect(state.todoItems).toEqual([firstTodo, secondTodo]);
  });

  it("updates the title of only the targeted todo", () => {
    const state = createState([firstTodo, secondTodo]);

    const nextState = TodoReducer(state, {
      type: "UPDATE_TODO",
      payload: { id: secondTodo.id, title: "Updated task" },
    });

    expect(nextState.todoItems).toEqual([
      firstTodo,
      { ...secondTodo, title: "Updated task" },
    ]);
    expect(state.todoItems[1].title).toBe("Second task");
  });

  it("sets the current editing id", () => {
    const state = createState([firstTodo]);

    const nextState = TodoReducer(state, {
      type: "SET_EDITING_ID",
      payload: firstTodo.id,
    });

    expect(nextState.editingId).toBe(firstTodo.id);
    expect(nextState.todoItems).toBe(state.todoItems);
  });

  it("replaces the current todo list when loading saved todos", () => {
    const state = createState([firstTodo]);
    const loadedTodos = [secondTodo];

    const nextState = TodoReducer(state, {
      type: "LOAD_TODOS",
      payload: loadedTodos,
    });

    expect(nextState.todoItems).toEqual(loadedTodos);
    expect(nextState.todoItems).toBe(loadedTodos);
    expect(state.todoItems).toEqual([firstTodo]);
  });
});
