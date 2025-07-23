import { FaTrashAlt } from "react-icons/fa";

import type { TodoItemType } from "./TodosList";

interface TodoItemProps {
  todo: TodoItemType;
  markComplete: (id: string) => void;
  delTodo: (id: string) => void;
}

export default function TodoItem({ todo, markComplete, delTodo }: TodoItemProps) {
  let textDecorationClass = todo.completed
    ? "line-through"
    : "no-underline";
  let textColorClass = todo.completed
    ? "text-pink-600"
    : "text-gray-800";

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
        onChange={() => markComplete(todo.id)}
        data-testid="task-completed-checkbox"
      />
      <span className="flex-1 px-2 min-w-0 break-words">
        {todo.title}
      </span>
      <button
        onClick={() => delTodo(todo.id)}
        className="transition duration-200 ease-in-out text-gray-400 hover:text-pink-500 focus:outline-none"
        data-testid="delete-task-btn"
      >
        <FaTrashAlt />
      </button>
    </li>
  );
}

