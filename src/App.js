import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
// import axios from "axios"; // TODO remove from package.json
import Header from "./layouts/Header";
import TodosHeader from "./components/TodosHeader";
import Todos from "./components/Todos";
import AddTodo from "./components/AddTodo";
import About from "./pages/About";

function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: "Doctors Appointment",
      day: "Feb 5th at 2:30pm",
      completed: true,
    },
    {
      id: 2,
      title: "Meeting at School",
      completed: false,
    },
    {
      id: 3,
      title: "Food Shopping",
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
    <div id="app" className="bg-gray-300 h-screen pt-8">
      <Router>
        <div className="max-w-md mx-auto">
          <Header />

          <section>
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => (
                  <div className="max-w-md pb-6 mx-auto bg-gray-200 rounded shadow-lg">
                    <TodosHeader />

                    <AddTodo addTodo={addTodo} />

                    <Todos
                      todos={todos}
                      markComplete={markComplete}
                      delTodo={delTodo}
                    />
                  </div>
                )}
              />

              <Route path="/about" component={About} />
            </Switch>
          </section>
        </div>
      </Router>
    </div>
  );
}

export default App;
