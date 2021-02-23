import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
// import axios from "axios";

import Header from "./layouts/Header";
import Todos from "./components/Todos";
import AddTodo from "./components/AddTodo";
import About from "./pages/About";

class App extends React.Component {
  state = {
    todos: [],
  };

  // Use if testing against the JSON Placeholder API
  // componentDidMount() {
  //   axios
  //     .get("https://jsonplaceholder.typicode.com/todos?_limit=10")
  //     .then((res) => this.setState({ todos: res.data }));
  // }

  // Add a new todo item
  addTodo = (title) => {
    let newTodo = {
      id: uuidv4(),
      title, // new in ES6: same as title: title
      completed: false,
    };

    this.setState({ todos: [...this.state.todos, newTodo] });

    // Use if testing against the JSON Placeholder API
    // axios
    //   .post("https://jsonplaceholder.typicode.com/todos", {
    //     title,
    //     completed: false,
    //   })
    //   .then((res) => this.setState({ todos: [...this.state.todos, res.data] }));
  };

  // Delete a todo item
  delTodo = (id) => {
    // [...] = spread operator (copy items)
    // Used because we can't (and shouldn't) change state values directly
    this.setState({
      todos: [...this.state.todos.filter((todo) => todo.id !== id)],
    });

    // Use if testing against the JSON Placeholder API
    // axios
    //   .delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
    //   .then((res) =>
    //     this.setState({
    //       todos: [...this.state.todos.filter((todo) => todo.id !== id)],
    //     })
    //   );
  };

  // Toggle completed state of todo item
  markComplete = (id) => {
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      }),
    });
  };

  render() {
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
                    <React.Fragment>
                      <AddTodo addTodo={this.addTodo} />

                      <Todos
                        todos={this.state.todos}
                        markComplete={this.markComplete}
                        delTodo={this.delTodo}
                      />
                    </React.Fragment>
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
}

export default App;
