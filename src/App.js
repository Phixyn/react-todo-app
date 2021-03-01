import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
// import axios from "axios"; // TODO remove from package.json
import Header from "./layouts/Header";
import Todos from "./components/Todos";
import AddTodo from "./components/AddTodo";
import About from "./pages/About";

function App() {
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
    setTodos([...todos, newTodo])
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
        <div className="max-w-sm mx-auto">
          <Header />

          <section className="container">
            <Switch>

              <Route
                exact
                path="/"
                render={(props) => (
                  <div className="max-w-sm px-4 py-6 mx-auto bg-gray-200 rounded shadow-lg">
                    <h1 className="text-2xl font-bold px-3">Todos</h1>

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
