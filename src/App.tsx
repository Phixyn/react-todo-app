import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AppFooter from "./components/AppFooter.jsx";
import TodosList from "./components/TodosList.jsx";
import About from "./pages/About.jsx";

import './App.css';

function App() {
  return (
    <div id="app" className="flex flex-col container max-w-md mx-auto md:pt-8">
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
  );
}

export default App;
