import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { TodoProvider } from "./context/TodoProvider";
import { ThemeProvider } from "./context/ThemeProvider";

import AppFooter from "./components/AppFooter";
import TodosList from "./components/TodosList";
import About from "./pages/About";

import "./App.css";

function App() {
  return (
    <ThemeProvider>
      <TodoProvider>
        <div className="ui-app-shell min-h-screen px-4 py-4 transition-colors duration-300 sm:px-6 sm:py-6 md:px-8 md:py-10 lg:py-14">
          <div
            id="app"
            className="ui-text-primary mx-auto flex w-full max-w-md flex-col sm:max-w-xl md:max-w-2xl"
          >
            <Router>
              <section className="w-full">
                <Routes>
                  <Route path="/" element={<TodosList />} />
                  <Route path="/about" element={<About />} />
                </Routes>
              </section>

              <AppFooter />
            </Router>
          </div>
        </div>
      </TodoProvider>
    </ThemeProvider>
  );
}

export default App;
