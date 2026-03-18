import { createContext, useReducer } from "react";
import type { ReactNode } from "react";

import AppReducer from "./AppReducer";
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

// TODO Fix ESLint errors
const initialState: TodoListState = {
  todoItems: [],
  editingId: null,
  addTodo: () => {},
  toggleTodoComplete: () => {},
  deleteTodo: () => {},
  updateTodo: () => {},
  setEditingId: () => {},
} satisfies TodoListState;

export const GlobalContext = createContext<TodoListState>(initialState);

type GlobalProviderProps = {
  children: ReactNode;
};

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  function addTodo(todoItem: TodoItemType) {
    dispatch({
      type: "ADD_TODO",
      payload: todoItem,
    });
  }

  // Toggle completed state of todo item
  function toggleTodoComplete(id: string) {
    dispatch({
      type: "TOGGLE_TODO_COMPLETE",
      payload: id,
    });
  }

  function deleteTodo(id: string) {
    dispatch({
      type: "DELETE_TODO",
      payload: id,
    });
  }

  function updateTodo(id: string, title: string) {
    dispatch({
      type: "UPDATE_TODO",
      payload: { id, title },
    });
  }

  function setEditingId(id: string | null) {
    dispatch({
      type: "SET_EDITING_ID",
      payload: id,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        todoItems: state.todoItems,
        editingId: state.editingId,
        addTodo,
        toggleTodoComplete,
        deleteTodo,
        updateTodo,
        setEditingId,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
