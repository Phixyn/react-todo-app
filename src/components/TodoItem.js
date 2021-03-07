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
        className="form-checkbox mr-1 rounded text-pink-600 focus:ring-0 focus:outline-none"
        checked={props.todo.completed}
        value={props.todo.completed}
        onChange={() => props.markComplete(props.todo.id)}
      />
      &nbsp;
      <span className="flex-1">{props.todo.title}</span>
      <button
        onClick={() => props.delTodo(props.todo.id)}
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
