import { useState } from "react";
import { FaEdit } from "react-icons/fa";

interface AddTodoProps {
  addTodo: (title: string) => void;
}

export default function AddTodo({ addTodo }: AddTodoProps) {
  const [title, setTitle] = useState("");

  const onSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    // Stop form being submitted to same file and reloading the page
    evt.preventDefault();

    // Validate todo text
    if (!title) {
      // TODO Replace with toast
      alert("Please add a task description.");
      return;
    }

    addTodo(title);

    // Clear task text in component state
    setTitle("");
  };

  return (
    <div className="mx-4 mt-6">
      <form
        onSubmit={onSubmit}
        className="flex items-center transition duration-500 ease-in-out py-2 border-b-2 border-gray-300 focus-within:border-b-2 focus-within:border-pink-600"
        data-testid="task-form">
        <input
          name="task-title"
          type="text"
          placeholder="Add task..."
          value={title}
          onChange={(evt) => setTitle(evt.target.value)}
          className="flex-1 px-2.5 bg-gray-200 placeholder-gray-500 focus:outline-none"
          data-testid="task-input-field"
        />
        <button
          type="submit"
          className="transition duration-200 ease-in-out text-gray-400 focus:outline-none hover:text-pink-500 text-lg px-2 cursor-pointer"
          data-testid="task-submit-btn">
          <FaEdit />
        </button>
      </form>
    </div>
  );
}

