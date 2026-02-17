import { NavLink } from "react-router-dom";

function About() {
  return (
    <div className="px-8 pt-6 pb-2 md:p-0">
      <h1 className="text-xl font-bold" data-testid="about-page-header">
        About
      </h1>

      <p className="mt-4">
        This is a simple to-do list app to demonstrate my React knowledge.
      </p>

      <p className="mt-4">
        <a
          className="transition duration-500 ease-in-out border-b border-pink-600 font-medium text-pink-600 hover:text-pink-500"
          href="https://github.com/Phixyn/react-todo-app"
          target="_blank"
        >
          View the code on GitHub &rarr;
        </a>
      </p>

      <p className="mt-4">
        <NavLink
          to="/"
          className="transition duration-500 ease-in-out border-b border-pink-600 font-medium text-pink-600 hover:text-pink-500"
        >
          &larr; Back to Todo List
        </NavLink>
      </p>
    </div>
  );
}

export default About;
