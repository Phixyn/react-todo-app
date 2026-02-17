import type { TodoItemType } from "../components/TodosList";
import type { TodoListState } from "./GlobalState";

type AddTodoAction = {
  type: "ADD_TODO";
  payload: TodoItemType;
};

type ToggleTodoCompleteAction = {
  type: "TOGGLE_TODO_COMPLETE";
  payload: string;
};

type DeleteTodoAction = {
  type: "DELETE_TODO";
  payload: string;
};

type Action = AddTodoAction | ToggleTodoCompleteAction | DeleteTodoAction;

export default (state: TodoListState, action: Action): TodoListState => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todoItems: [action.payload, ...state.todoItems],
      };
    case "TOGGLE_TODO_COMPLETE":
      return {
        ...state,
        todoItems: state.todoItems.map((todoItem) =>
          todoItem.id === action.payload
            ? { ...todoItem, completed: !todoItem.completed }
            : todoItem,
        ),
      };
    case "DELETE_TODO":
      return {
        ...state,
        todoItems: state.todoItems.filter(
          (todoItem) => todoItem.id !== action.payload,
        ),
      };
    default:
      return state;
  }
};
