import { useContext, useRef, useState } from "react";
import { FaRegPlusSquare } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

import { TodoContext } from "../context/TodoContext";

const TASK_TITLE_MAX_LENGTH = 500;

export default function AddTodo() {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const { addTodo } = useContext(TodoContext);

  const onSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    // Stop form being submitted to same file and reloading the page
    evt.preventDefault();

    // Validate todo text
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      setError("Please add a task description.");
      inputRef.current?.focus();
      return;
    }

    if (title.length > TASK_TITLE_MAX_LENGTH) {
      setError(`Task must be ${TASK_TITLE_MAX_LENGTH} characters or fewer.`);
      inputRef.current?.focus();
      return;
    }

    const newTodo = {
      id: uuidv4(),
      title: trimmedTitle,
      completed: false,
    };

    addTodo(newTodo);

    // Clear task text and any previous error in component state
    setTitle("");
    setError("");
  };

  return (
    <div className="mx-4 mt-6 md:mx-6 lg:mx-8">
      <form
        onSubmit={onSubmit}
        className="flex items-center transition duration-500 ease-in-out py-2 border-b-2 border-gray-300 focus-within:border-b-2 focus-within:border-pink-600"
        data-testid="task-form"
      >
        <input
          ref={inputRef}
          name="task-title"
          type="text"
          placeholder="Add task..."
          value={title}
          onChange={(evt) => {
            const newValue = evt.target.value;
            setTitle(newValue);
            if (newValue.length > TASK_TITLE_MAX_LENGTH) {
              setError(
                `Task must be ${TASK_TITLE_MAX_LENGTH} characters or fewer.`,
              );
            } else if (error) {
              setError("");
            }
          }}
          className="flex-1 px-2.5 text-base md:text-lg bg-gray-200 placeholder-gray-500 focus:outline-none"
          data-testid="task-input-field"
        />
        <button
          type="submit"
          className="transition duration-200 ease-in-out text-gray-400 focus:outline-none hover:text-pink-500 text-xl p-2.5 md:text-2xl md:p-3 cursor-pointer"
          data-testid="task-submit-btn"
        >
          <FaRegPlusSquare />
        </button>
      </form>
      <div className="flex items-start justify-between mt-1">
        {error ? (
          <p className="text-red-500 text-sm" role="alert">
            {error}
          </p>
        ) : (
          <span />
        )}
        <span
          className={`text-sm ml-2 shrink-0 ${
            title.length > TASK_TITLE_MAX_LENGTH
              ? "text-red-500"
              : "text-gray-400"
          }`}
          aria-live="polite"
        >
          {title.length}/{TASK_TITLE_MAX_LENGTH}
        </span>
      </div>
    </div>
  );
}
