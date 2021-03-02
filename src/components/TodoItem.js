import PropTypes from "prop-types";

function TodoItem(props) {
  const getStyle = () => {
    return {
      background: "#ccc",
      padding: "10px",
      borderBottom: "1px #777 dotted",
      textDecoration: props.todo.completed ? "line-through" : "none",
    };
  };

  return (
    <div style={getStyle()}>
      <p>
        <input
          type="checkbox"
          checked={props.todo.completed}
          value={props.todo.completed}
          onChange={() => props.markComplete(props.todo.id)}
        />
        &nbsp;
        {props.todo.title}
        <button
          style={deleteBtnStyle}
          onClick={() => props.delTodo(props.todo.id)}
        >
          X
        </button>
      </p>
    </div>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  markComplete: PropTypes.func.isRequired,
  delTodo: PropTypes.func.isRequired,
};

const deleteBtnStyle = {
  background: "#dd0000",
  color: "#eee",
  border: "none",
  padding: "5px 10px",
  borderRadius: "50%",
  cursor: "pointer",
  float: "right",
};

export default TodoItem;
