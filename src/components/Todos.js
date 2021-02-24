import React from "react";
import TodoItem from "./TodoItem";
import PropTypes from "prop-types";

class Todos extends React.Component {
  render() {
    return (
      <div className="mt-6">
        {this.props.todos.length > 0 ? (
          <ul className="mt-8">
            {this.props.todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                markComplete={this.props.markComplete}
                delTodo={this.props.delTodo}
              />
            ))}
          </ul>
        ) : (
          <p
            className="px-3 mt-16 text-lg text-center text-gray-500"
            data-testid="empty-todos"
          >
            Everything's done!
          </p>
        )}
      </div>
    )
  }
}

/* Validation for properties that a component should have. Kind of like defining a
 * protocol for the component that it should conform to. So by defining PropTypes on a
 * component, we're saying that the component should have those props, and the props
 * should have those types. If they don't, the compiler throws a warning. It's not
 * mandatory, but it's good practice to do.
 */
Todos.propTypes = {
  todos: PropTypes.array.isRequired,
  markComplete: PropTypes.func.isRequired,
  delTodo: PropTypes.func.isRequired,
};

export default Todos;
