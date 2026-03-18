import type { TodoItemType } from "../components/TodosList";
import type { TodoListState } from "./TodoContext";

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

type UpdateTodoAction = {
  type: "UPDATE_TODO";
  payload: { id: string; title: string };
};

type SetEditingIdAction = {
  type: "SET_EDITING_ID";
  payload: string | null;
};

type LoadTodosAction = {
  type: "LOAD_TODOS";
  payload: TodoItemType[];
};

type Action =
  | AddTodoAction
  | ToggleTodoCompleteAction
  | DeleteTodoAction
  | UpdateTodoAction
  | SetEditingIdAction
  | LoadTodosAction;

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
    case "UPDATE_TODO":
      return {
        ...state,
        todoItems: state.todoItems.map((todoItem) =>
          todoItem.id === action.payload.id
            ? { ...todoItem, title: action.payload.title }
            : todoItem,
        ),
      };
    case "SET_EDITING_ID":
      return {
        ...state,
        editingId: action.payload,
      };
    case "LOAD_TODOS":
      return {
        ...state,
        todoItems: action.payload,
      };
    default:
      return state;
  }
};
