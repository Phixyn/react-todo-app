import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AppFooter from "./components/AppFooter";
import TodosList from "./components/TodosList";
import About from "./pages/About";

function App() {
  return (
    <div id="app" className="flex flex-col container max-w-md mx-auto md:pt-8">
      <Router>
          <section>
            <Switch>
              <Route exact path="/" component={TodosList} />
              <Route path="/about" component={About} />
            </Switch>
          </section>

          <AppFooter />
      </Router>
    </div>
  );
}

export default App;
