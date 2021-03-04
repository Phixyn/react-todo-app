import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import PropTypes from "prop-types";

function AddTodo(props) {
  const [title, setTitle] = useState("");

  const onSubmit = (evt) => {
    // Stop form being submmited to same file and reloading the page
    evt.preventDefault();

    // Validate todo text
    if (!title) {
      alert("Please add a task description.");
      return;
    }

    props.addTodo(title);

    // Clear task text in component state
    setTitle("");
  };

  return (
    <div className="px-4 mt-6">
      <form onSubmit={onSubmit} style={{ display: "flex" }}>
        <input
          name="task-title"
          type="text"
          placeholder="Add task..."
          value={title}
          onChange={(evt) => setTitle(evt.target.value)}
          className="transition duration-500 ease-in-out block w-full px-3 py-2 placeholder-gray-500 bg-gray-50 shadow focus:outline-none border-2 focus:border-blue-500 focus:border-pink-600"
        />
        <button
          type="submit"
          className="bg-pink-600 text-gray-100 px-4 shadow cursor-pointer">
          <FaPlus />
        </button>
      </form>
    </div>
  );
}

AddTodo.propTypes = {
  addTodo: PropTypes.func.isRequired,
};

export default AddTodo;
