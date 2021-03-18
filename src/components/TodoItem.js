import { FaTrashAlt } from "react-icons/fa";
import PropTypes from "prop-types";

function TodoItem(props) {
  // TODO: convert to TailwindCSS classnames?
  const getStyle = () => {
    return {
      textDecoration: props.todo.completed ? "line-through" : "none",
      color: props.todo.completed ? "rgb(219, 39, 119)" : "#121212"
    };
  };

  return (
    <li style={getStyle()} className="flex items-center space-x-1 py-2.5 px-2.5 border-b border-gray-300 transition duration-500 ease-in">
      <input
        name="completed-checkbox"
        type="checkbox"
        className="form-checkbox rounded text-pink-600 shadow-none focus:shadow-none focus:ring-0 focus:outline-none"
        checked={props.todo.completed}
        value={props.todo.completed}
        onChange={() => props.markComplete(props.todo.id)}
        data-testid="task-completed-checkbox"
      />
      <span className="flex-1 px-2 min-w-0 max-w-full break-words">{props.todo.title}</span>
      <button
        onClick={() => props.delTodo(props.todo.id)}
        data-testid="delete-task-btn"
      >
        <FaTrashAlt className="text-red-600" />
      </button>
    </li>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  markComplete: PropTypes.func.isRequired,
  delTodo: PropTypes.func.isRequired,
};

export default TodoItem;
