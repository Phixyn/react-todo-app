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
  const itemBackgroundStyle = isEditing
    ? {
        backgroundColor:
          "color-mix(in srgb, var(--ui-surface-elevated) 72%, transparent)",
      }
    : undefined;
  const actionButtonClassName =
    "ui-icon-button h-10 w-10 shrink-0 text-sm md:h-11 md:w-11 md:text-base";

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
      className="ui-divider ui-text-primary flex items-center gap-2 border-b px-3 py-3 text-base transition-colors duration-200 ease-in-out md:gap-3 md:px-4 md:py-3.5 md:text-lg"
      data-testid="todo-item"
      style={itemBackgroundStyle}
    >
      <input
        name="completed-checkbox"
        type="checkbox"
        className="ui-checkbox ui-focus-ring h-5 w-5 shrink-0 shadow-none focus:ring-0 focus:ring-offset-0 md:h-6 md:w-6"
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
            className="ui-input-shell w-full px-3 py-2 text-base md:text-lg"
            aria-label="Edit todo title"
          />
          {(editError || editValue.length >= TASK_TITLE_WARN_THRESHOLD) && (
            <div className="mt-2 flex items-start justify-between gap-3 px-1">
              {editError ? (
                <p
                  className="text-sm text-[color:var(--ui-danger)]"
                  role="alert"
                >
                  {editError}
                </p>
              ) : (
                <span />
              )}
              {editValue.length >= TASK_TITLE_WARN_THRESHOLD && (
                <span
                  className={`ui-text-muted ml-2 shrink-0 text-sm ${
                    editValue.length > TASK_TITLE_MAX_LENGTH
                      ? "text-[color:var(--ui-danger)]"
                      : ""
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
        <span
          className={`min-w-0 flex-1 break-words px-1.5 leading-7 md:px-2 ${
            todo.completed ? "ui-task-completed" : ""
          }`}
        >
          {todo.title}
        </span>
      )}
      <div className="flex items-center gap-2">
        {isEditing ? (
          <>
            <button
              type="button"
              onClick={handleSave}
              className={`${actionButtonClassName} ui-icon-button--success`}
              data-testid="save-task-btn"
              aria-label="Save todo"
            >
              <FaSave />
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className={`${actionButtonClassName} ui-icon-button--danger`}
              data-testid="cancel-task-btn"
              aria-label="Cancel editing"
            >
              <FaTimes />
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={handleEditClick}
              className={`${actionButtonClassName} ui-icon-button--accent`}
              data-testid="edit-task-btn"
              aria-label="Edit todo"
            >
              <FaEdit />
            </button>
            <button
              type="button"
              onClick={() => deleteTodo(todo.id)}
              className={`${actionButtonClassName} ui-icon-button--danger`}
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
