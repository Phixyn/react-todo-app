import { useContext, useRef, useEffect, useState } from "react";
import { FaEdit, FaSave, FaTimes, FaTrashAlt } from "react-icons/fa";

import { GlobalContext } from "../context/GlobalState";
import type { TodoItemType } from "./TodosList";

interface TodoItemProps {
  todo: TodoItemType;
}

export default function TodoItem({ todo }: TodoItemProps) {
  const [editValue, setEditValue] = useState(todo.title);
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    toggleTodoComplete,
    deleteTodo,
    editingId,
    setEditingId,
    updateTodo,
  } = useContext(GlobalContext);

  const isEditing = editingId === todo.id;

  const textDecorationClass = todo.completed ? "line-through" : "no-underline";
  const textColorClass = todo.completed ? "text-pink-600" : "text-gray-800";

  const handleEditClick = () => {
    if (editingId !== null) {
      // Another todo is already being edited, ignore
      return;
    }
    setEditingId(todo.id);
    setEditValue(todo.title);
  };

  const handleSave = () => {
    const trimmedValue = editValue.trim();
    if (!trimmedValue) {
      // Prevent empty save, keep focus on input
      return;
    }
    updateTodo(todo.id, trimmedValue);
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditValue(todo.title);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  // Auto-focus input when entering edit mode
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

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
        disabled={isEditing}
      />
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 px-2 min-w-0 bg-white border border-pink-600 rounded focus:outline-none focus:ring-2 focus:ring-pink-600"
          aria-label="Edit todo title"
        />
      ) : (
        <span className="flex-1 px-2 min-w-0 break-words">{todo.title}</span>
      )}
      <div className="flex items-center space-x-1">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="transition duration-200 ease-in-out text-gray-400 hover:text-green-500 focus:outline-none text-sm px-1"
              data-testid="save-task-btn"
              aria-label="Save todo"
            >
              <FaSave />
            </button>
            <button
              onClick={handleCancel}
              className="transition duration-200 ease-in-out text-gray-400 hover:text-red-500 focus:outline-none text-sm px-1"
              data-testid="cancel-task-btn"
              aria-label="Cancel editing"
            >
              <FaTimes />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleEditClick}
              className="transition duration-200 ease-in-out text-gray-400 hover:text-pink-500 focus:outline-none px-1"
              data-testid="edit-task-btn"
              aria-label="Edit todo"
            >
              <FaEdit />
            </button>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="transition duration-200 ease-in-out text-gray-400 hover:text-pink-500 focus:outline-none px-1"
              data-testid="delete-task-btn"
              aria-label="Delete todo"
            >
              <FaTrashAlt />
            </button>
          </>
        )}
      </div>
    </li>
  );
}
