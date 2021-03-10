import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AppFooter from "./components/AppFooter";
import TodosList from "./components/TodosList";
import About from "./pages/About";

function App() {
  return (
    <div id="app" className="bg-gray-300 h-screen md:pt-8">
      <Router>
        <div className="max-w-md mx-auto">
          <section>
            <Switch>
              <Route exact path="/" component={TodosList} />
              <Route path="/about" component={About} />
            </Switch>
          </section>

          <AppFooter />
        </div>
      </Router>
    </div>
  );
}

export default App;
