import type { TodoItemType } from "../components/TodosList";
import type { TodoState } from "./GlobalState";

type AddTodoAction = {
  type: "ADD_TODO";
  payload: TodoItemType;
};

type ToggleCompleteTodoAction = {
  type: "TOGGLE_COMPLETE_TODO";
  payload: string;
};

type DeleteTodoAction = {
  type: "DELETE_TODO";
  payload: string;
};

type Action = AddTodoAction | ToggleCompleteTodoAction | DeleteTodoAction;

export default (state: TodoState, action: Action): TodoState => {

  switch(action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todoItems: [action.payload, ...state.todoItems]
      }
    case 'TOGGLE_COMPLETE_TODO':
      return {
        ...state,
        todoItems: state.todoItems.map((todoItem) =>
          todoItem.id === action.payload ? { ...todoItem, completed: !todoItem.completed } : todoItem
        )
      }
    case 'DELETE_TODO':
      return {
        ...state,
        todoItems: state.todoItems.filter(todoItem => todoItem.id !== action.payload)
      }
    default:
      return state;
  }
}

