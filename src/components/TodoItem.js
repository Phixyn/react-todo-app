import { FaTrashAlt } from "react-icons/fa";
import PropTypes from "prop-types";

function TodoItem(props) {
  const getStyle = () => {
    return {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      padding: "10px",
      borderBottom: "1px #cccccc solid",
      textDecoration: props.todo.completed ? "line-through" : "none",
      color: props.todo.completed ? "rgb(219, 39, 119)" : "#121212"
    };
  };

  return (
    <li style={getStyle()}>
      <input
        name="completed-checkbox"
        type="checkbox"
        className="form-checkbox rounded text-pink-600 shadow-none focus:shadow-none focus:ring-0 focus:outline-none"
        checked={props.todo.completed}
        value={props.todo.completed}
        onChange={() => props.markComplete(props.todo.id)}
        data-testid="task-completed-checkbox"
      />
      <span className="flex-1 px-2">{props.todo.title}</span>
      <button
        onClick={() => props.delTodo(props.todo.id)}
        data-testid="delete-task-btn"
      >
        <FaTrashAlt style={{ color: "#dd0000" }} />
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
