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
        className="flex flex-col w-full max-w-md sm:max-w-xl md:max-w-2xl mx-auto sm:pt-6 md:pt-10 lg:pt-16"
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
