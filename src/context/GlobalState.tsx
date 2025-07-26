import { createContext, useReducer } from 'react'
import type { ReactNode } from 'react'

import AppReducer from './AppReducer'
import type { TodoItemType } from '../components/TodosList'

export interface TodoListState {
  todoItems: TodoItemType[];
  addTodo: (todoItem: TodoItemType) => void;
  toggleTodoComplete: (id: string) => void;
  deleteTodo: (id: string) => void;
}

// TODO Fix ESLint errors
const initialState: TodoListState = {
  todoItems: [],
  addTodo: (_todoItem: TodoItemType) => { },
  toggleTodoComplete: (_id: string) => { },
  deleteTodo: (_id: string) => { }
}

export const GlobalContext = createContext<TodoListState>(initialState);

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
  function toggleTodoComplete(id: string) {
    dispatch({
      type: 'TOGGLE_TODO_COMPLETE',
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
        toggleTodoComplete,
        deleteTodo
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

