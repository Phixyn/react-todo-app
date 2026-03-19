import { useContext, useRef, useEffect, useState } from "react";
import { FaEdit, FaSave, FaTimes, FaTrashAlt } from "react-icons/fa";

import { TodoContext } from "../context/TodoContext";
import type { TodoItemType } from "./TodosList";

const TASK_TITLE_MAX_LENGTH = 500;
const TASK_TITLE_WARN_THRESHOLD = 450;

interface TodoItemProps {
  todo: TodoItemType;
}

export default function TodoItem({ todo }: TodoItemProps) {
  const [editValue, setEditValue] = useState(todo.title);
  const [editError, setEditError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    toggleTodoComplete,
    deleteTodo,
    editingId,
    setEditingId,
    updateTodo,
  } = useContext(TodoContext);

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
      setEditError("Please add a task description.");
      inputRef.current?.focus();
      return;
    }

    if (editValue.length > TASK_TITLE_MAX_LENGTH) {
      setEditError(
        `Task must be ${TASK_TITLE_MAX_LENGTH} characters or fewer.`,
      );
      inputRef.current?.focus();
      return;
    }

    updateTodo(todo.id, trimmedValue);
    setEditingId(null);
    setEditError("");
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditValue(todo.title);
    setEditError("");
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
      className={`flex items-center space-x-1 py-2.5 px-2.5 md:py-3 md:px-4 text-base md:text-lg border-b border-gray-300 transition duration-300 ease-in ${textDecorationClass} ${textColorClass}`}
      data-testid="todo-item"
    >
      <input
        name="completed-checkbox"
        type="checkbox"
        className="form-checkbox w-5 h-5 md:w-6 md:h-6 rounded text-pink-600 shadow-none focus:shadow-none focus:ring-0 focus:ring-offset-0 focus:outline-none shrink-0"
        checked={todo.completed}
        onChange={() => toggleTodoComplete(todo.id)}
        data-testid="task-completed-checkbox"
        disabled={isEditing}
      />
      {isEditing ? (
        <div className="flex-1 min-w-0">
          <input
            ref={inputRef}
            type="text"
            value={editValue}
            onChange={(e) => {
              const newValue = e.target.value;
              setEditValue(newValue);
              if (newValue.length > TASK_TITLE_MAX_LENGTH) {
                setEditError(
                  `Task must be ${TASK_TITLE_MAX_LENGTH} characters or fewer.`,
                );
              } else if (editError) {
                setEditError("");
              }
            }}
            onKeyDown={handleKeyDown}
            className="w-full px-2 py-1 text-base md:text-lg bg-gray-100 border-b-2 border-pink-600 rounded-t focus:outline-none focus:bg-white transition duration-200 ease-in-out"
            aria-label="Edit todo title"
          />
          {(editError || editValue.length >= TASK_TITLE_WARN_THRESHOLD) && (
            <div className="flex items-start justify-between mt-1">
              {editError ? (
                <p className="text-red-500 text-sm" role="alert">
                  {editError}
                </p>
              ) : (
                <span />
              )}
              {editValue.length >= TASK_TITLE_WARN_THRESHOLD && (
                <span
                  className={`text-sm ml-2 shrink-0 ${
                    editValue.length > TASK_TITLE_MAX_LENGTH
                      ? "text-red-500"
                      : "text-gray-400"
                  }`}
                  aria-live="polite"
                >
                  {editValue.length}/{TASK_TITLE_MAX_LENGTH}
                </span>
              )}
            </div>
          )}
        </div>
      ) : (
        <span className="flex-1 px-2 min-w-0 break-words">{todo.title}</span>
      )}
      <div className="flex items-center space-x-1">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="transition duration-200 ease-in-out text-gray-400 hover:text-green-500 focus:outline-none text-base p-2 md:text-lg md:p-2.5 rounded-full bg-gray-300 hover:bg-gray-400"
              data-testid="save-task-btn"
              aria-label="Save todo"
            >
              <FaSave />
            </button>
            <button
              onClick={handleCancel}
              className="transition duration-200 ease-in-out text-gray-400 hover:text-red-500 focus:outline-none text-base p-2 md:text-lg md:p-2.5 rounded-full bg-gray-300 hover:bg-gray-400"
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
              className="transition duration-200 ease-in-out text-gray-400 hover:text-pink-500 focus:outline-none text-base p-2 md:text-lg md:p-2.5 rounded-full bg-gray-300 hover:bg-gray-400"
              data-testid="edit-task-btn"
              aria-label="Edit todo"
            >
              <FaEdit />
            </button>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="transition duration-200 ease-in-out text-gray-400 hover:text-pink-500 focus:outline-none text-base p-2 md:text-lg md:p-2.5 rounded-full bg-gray-300 hover:bg-gray-400"
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
