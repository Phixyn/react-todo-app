import { createContext } from "react";

import type { TodoItemType } from "../components/TodosList";

export interface TodoListState {
  todoItems: TodoItemType[];
  editingId: string | null;
  addTodo: (todoItem: TodoItemType) => void;
  toggleTodoComplete: (id: string) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (id: string, title: string) => void;
  setEditingId: (id: string | null) => void;
}

export const initialState: TodoListState = {
  todoItems: [],
  editingId: null,
  addTodo: () => {},
  toggleTodoComplete: () => {},
  deleteTodo: () => {},
  updateTodo: () => {},
  setEditingId: () => {},
} satisfies TodoListState;

export const TodoContext = createContext<TodoListState>(initialState);
