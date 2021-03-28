import { FaTrashAlt } from "react-icons/fa";
import PropTypes from "prop-types";

function TodoItem(props) {
  let textDecorationClass = props.todo.completed
    ? "line-through"
    : "no-underline";
  let textColorClass = props.todo.completed
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
        checked={props.todo.completed}
        value={props.todo.completed}
        onChange={() => props.markComplete(props.todo.id)}
        data-testid="task-completed-checkbox"
      />
      <span className="flex-1 px-2 min-w-0 break-words">
        {props.todo.title}
      </span>
      <button
        onClick={() => props.delTodo(props.todo.id)}
        className="transition duration-200 ease-in-out text-gray-400 hover:text-pink-500 focus:outline-none"
        data-testid="delete-task-btn"
      >
        <FaTrashAlt />
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
