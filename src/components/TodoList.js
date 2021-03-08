import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";
import TodosHeader from "./TodosHeader";
import AddTodo from "./AddTodo";
import TodoItem from "./TodoItem";

function TodoList() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: "Feed the cat",
      day: "Feb 5th at 2:30pm",
      completed: true,
    },
    {
      id: 2,
      title: "Meeting at school",
      completed: false,
    },
    {
      id: 3,
      title: "Grocery shopping",
      completed: false,
    },
  ]);
  // const [todos, setTodos] = useState([]);

  // Add a new todo item
  const addTodo = (title) => {
    let newTodo = {
      id: uuidv4(),
      title, // new in ES6: same as title: title
      completed: false,
    };

    // [...] = spread operator (copy items)
    // Used because we can't (and shouldn't) change state values directly
    setTodos([...todos, newTodo]);
  };

  // Delete a todo item
  const delTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Toggle completed state of todo item
  const markComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="max-w-md mx-auto bg-gray-200 rounded shadow-lg">
      <TodosHeader />

      <AddTodo addTodo={addTodo} />

      <div className="px-4 pb-6 mt-6 mb-4 h-96 overflow-auto">
        {todos.length > 0 ? (
          // If there are todo items, show them in a list
          <ul className="mt-4">
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                markComplete={markComplete}
                delTodo={delTodo}
              />
            ))}
          </ul>
        ) : (
          // No todo items, all caught up
          <p
            className="px-3 pb-6 mt-16 text-lg text-center text-gray-500"
            data-testid="empty-todos"
          >
            You're all caught up!
          </p>
        )}
      </div>

      <div className="px-4 py-3 h-14 bg-gray-300 border-t border-gray-400 flex flex-row flex-wrap text-gray-600">
        <p className="flex-1 order-1">{0} tasks</p>
        <p className="flex-1 order-last text-right"><a className="transition duration-500 ease-in-out hover:text-pink-500" href="https://phixyn.com/" target="_blank">Phixyn</a></p>
      </div>
    </div>
  )
}

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  markComplete: PropTypes.func.isRequired,
  delTodo: PropTypes.func.isRequired,
};

export default TodoList;
