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
    <div className="mx-4 mt-4 md:mx-6 md:mt-5 lg:mx-8 lg:mt-6">
      <form
        onSubmit={onSubmit}
        className="ui-line-input-wrap flex items-center gap-2 border-b-2 px-0 py-2 transition duration-300 ease-in-out sm:py-2.5"
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
          className="ui-line-input flex-1 px-2 text-base text-inherit focus:outline-none sm:text-lg"
          data-testid="task-input-field"
        />
        <button
          type="submit"
          className="ui-plain-icon-button h-10 w-10 shrink-0 cursor-pointer text-xl sm:h-11 sm:w-11 sm:text-2xl"
          data-testid="task-submit-btn"
        >
          <FaRegPlusSquare />
        </button>
      </form>
      <div className="mt-2 flex items-start justify-between gap-3 px-1">
        {error ? (
          <p className="text-sm text-[color:var(--ui-danger)]" role="alert">
            {error}
          </p>
        ) : (
          <span />
        )}
        <span
          className={`ui-text-muted ml-2 shrink-0 text-sm ${
            title.length > TASK_TITLE_MAX_LENGTH
              ? "text-[color:var(--ui-danger)]"
              : ""
          }`}
          aria-live="polite"
        >
          {title.length}/{TASK_TITLE_MAX_LENGTH}
        </span>
      </div>
    </div>
  );
}
