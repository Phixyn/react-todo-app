import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import { v4 as uuidv4 } from 'uuid';
import axios from "axios";

import Header from "./layouts/Header";
import Todos from "./components/Todos";
// import AddTodo from "./components/AddTodo";
import About from "./pages/About";

import "./App.css";

class App extends React.Component {
  state = {
    todos: [],
  };

  componentDidMount() {
    axios
      .get("https://jsonplaceholder.typicode.com/todos?_limit=10")
      .then((res) => this.setState({ todos: res.data }));
  }

  // Toggle completed state of todo object
  markComplete = (id) => {
    return true;
  };

  // Delete todo item
  delTodo = (id) => {
    return true;
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />

            <Route
              exact
              path="/"
              render={(props) => (
                <React.Fragment>
                  <Todos
                    todos={this.state.todos}
                    markComplete={this.markComplete}
                    delTodo={this.delTodo}
                  />
                </React.Fragment>
              )}
            />

            <Route path="/about" component={About} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
