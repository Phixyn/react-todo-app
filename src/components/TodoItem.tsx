import { useContext } from "react";
import { FaTrashAlt } from "react-icons/fa";

import { GlobalContext } from "../context/GlobalState";
import type { TodoItemType } from "./TodosList";

interface TodoItemProps {
  todo: TodoItemType;
}

export default function TodoItem({ todo }: TodoItemProps) {
  const { toggleTodoComplete, deleteTodo } = useContext(GlobalContext);

  const textDecorationClass = todo.completed ? "line-through" : "no-underline";
  const textColorClass = todo.completed ? "text-pink-600" : "text-gray-800";

  return (
    <li
      className={`flex items-center space-x-1 py-2.5 px-2.5 border-b border-gray-300 transition duration-300 ease-in ${textDecorationClass} ${textColorClass}`}
      data-testid="todo-item"
    >
      <input
        name="completed-checkbox"
        type="checkbox"
        className="form-checkbox rounded text-pink-600 shadow-none focus:shadow-none focus:ring-0 focus:ring-offset-0 focus:outline-none"
        checked={todo.completed}
        onChange={() => toggleTodoComplete(todo.id)}
        data-testid="task-completed-checkbox"
      />
      <span className="flex-1 px-2 min-w-0 break-words">{todo.title}</span>
      <button
        onClick={() => deleteTodo(todo.id)}
        className="transition duration-200 ease-in-out text-gray-400 hover:text-pink-500 focus:outline-none"
        data-testid="delete-task-btn"
      >
        <FaTrashAlt />
      </button>
    </li>
  );
}
