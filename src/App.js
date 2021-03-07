import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AppHeader from "./components/AppHeader";
import TodoList from "./components/TodoList";
import About from "./pages/About";

function App() {
  return (
    <div id="app" className="bg-gray-300 h-screen pt-8">
      <Router>
        <div className="max-w-md mx-auto">
          <AppHeader />
          <section>
            <Switch>
              <Route exact path="/" component={TodoList} />
              <Route path="/about" component={About} />
            </Switch>
          </section>
        </div>
      </Router>
    </div>
  );
}

export default App;
