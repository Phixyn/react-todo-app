import { createContext, useReducer } from 'react'
import type { ReactNode } from 'react'

import AppReducer from './AppReducer'
import type { TodoItemType } from '../components/TodosList'

// Rename to TodoListState ?
export interface TodoState {
  todoItems: TodoItemType[];
  addTodo: (todoItem: TodoItemType) => void;
  toggleCompleteTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
}

// TODO Improve?
const initialState: TodoState = {
  todoItems: [],
  addTodo: (_todoItem: TodoItemType) => {},
  toggleCompleteTodo: (_id: string) => {},
  deleteTodo: (_id: string) => {}
}

export const GlobalContext = createContext<TodoState>(initialState);

type GlobalProviderProps = {
  children: ReactNode;
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  function addTodo(todoItem: TodoItemType) {
    dispatch({
      type: 'ADD_TODO',
      payload: todoItem
    });
  }

  // Toggle completed state of todo item
  function toggleCompleteTodo(id: string) {
    dispatch({
      type: 'TOGGLE_COMPLETE_TODO',
      payload: id
    });
  }

  function deleteTodo(id: string) {
    dispatch({
      type: 'DELETE_TODO',
      payload: id
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        todoItems: state.todoItems,
        addTodo,
        toggleCompleteTodo,
        deleteTodo
    }}>
      {children}
    </GlobalContext.Provider>
  );
}

