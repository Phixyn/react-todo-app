import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import AddTodo from "./AddTodo";
import TodosFooter from "./TodosFooter";
import TodosHeader from "./TodosHeader";
import TodoItem from "./TodoItem";

function TodosList() {
  // const [todos, setTodos] = useState([
  //   {
  //     id: 1,
  //     title: "Feed the cat",
  //     day: "Feb 5th at 2:30pm",
  //     completed: true,
  //   },
  //   {
  //     id: 2,
  //     title: "Meeting at school",
  //     completed: false,
  //   },
  //   {
  //     id: 3,
  //     title: "Grocery shopping",
  //     completed: false,
  //   },
  // ]);
  const [todos, setTodos] = useState([]);

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
    <div className="flex flex-col bg-gray-200 rounded shadow-lg">
      <TodosHeader />

      <AddTodo addTodo={addTodo} />

      <div className="mx-4 my-6 h-96 overflow-auto">
        {todos.length > 0 ? (
          // If there are todo items, show them in a list
          <ul className="mt-4" data-testid="todos-list">
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
            className="my-16 text-lg text-center text-gray-500"
            data-testid="empty-todos-message"
          >
            You're all caught up!
          </p>
        )}
      </div>

      <TodosFooter
        totalTasks={todos.length}
        doneTasks={todos.filter((todo) => todo.completed).length}
      />
    </div>
  );
}

export default TodosList;
