import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from "./layouts/Header";
import About from './pages/About';

import "./App.css";

class App extends React.Component {
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
                  <p>Sup</p>
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
