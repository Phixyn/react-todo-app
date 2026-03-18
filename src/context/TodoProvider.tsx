import { useReducer } from "react";
import type { ReactNode } from "react";

import type { TodoItemType } from "../components/TodosList";
import { TodoContext, initialState } from "./TodoContext";
import TodoReducer from "./TodoReducer";

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(TodoReducer, initialState);

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
    <TodoContext.Provider
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
    </TodoContext.Provider>
  );
};
