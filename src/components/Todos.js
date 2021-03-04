import PropTypes from "prop-types";
import TodoItem from "./TodoItem";

function Todos(props) {
  return (
    <div className="px-4 mt-6">
      {props.todos.length > 0 ? (
        // If there are todo items, show them in a list
        <ul className="mt-8">
          {props.todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              markComplete={props.markComplete}
              delTodo={props.delTodo}
            />
          ))}
        </ul>
      ) : (
        // No todo items, all caught up
        <p
          className="px-3 mt-16 text-lg text-center text-gray-500"
          data-testid="empty-todos"
        >
          You're all caught up!
        </p>
      )}
    </div>
  )
}

Todos.propTypes = {
  todos: PropTypes.array.isRequired,
  markComplete: PropTypes.func.isRequired,
  delTodo: PropTypes.func.isRequired,
};

export default Todos;
