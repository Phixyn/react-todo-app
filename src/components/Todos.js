import React from "react";
import TodoItem from "./TodoItem";
import PropTypes from "prop-types";

class Todos extends React.Component {
  render() {
    return this.props.todos.map((todo) => (
      <TodoItem
        key={todo.id}
        todo={todo}
        markComplete={this.props.markComplete}
        delTodo={this.props.delTodo}
      />
    ));
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
