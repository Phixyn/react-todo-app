import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { TodoProvider } from "./context/TodoProvider";

import AppFooter from "./components/AppFooter";
import TodosList from "./components/TodosList";
import About from "./pages/About";

import "./App.css";

function App() {
  return (
    <TodoProvider>
      <div
        id="app"
        className="flex flex-col container max-w-md mx-auto md:pt-8"
      >
        <Router>
          <section>
            <Routes>
              <Route path="/" element={<TodosList />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </section>

          <AppFooter />
        </Router>
      </div>
    </TodoProvider>
  );
}

export default App;
