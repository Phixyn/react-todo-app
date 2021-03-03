import { useState } from "react";
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
    <div className="mt-6">
      <form onSubmit={onSubmit} style={{ display: "flex" }}>
        <input
          name="task-title"
          type="text"
          placeholder="Add task..."
          value={title}
          onChange={(evt) => setTitle(evt.target.value)}
          className="block w-full px-3 py-2 placeholder-gray-500 bg-white rounded shadow focus:outline-none border focus:border-blue-500 focus:border-blue-600"
        />
        <input
          type="submit"
          value="Add"
          className="bg-blue-600 text-gray-100 px-4 shadow"
        />
      </form>
    </div>
  );
}

AddTodo.propTypes = {
  addTodo: PropTypes.func.isRequired,
};

export default AddTodo;
