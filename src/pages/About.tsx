import { NavLink } from "react-router-dom";

function About() {
  return (
    <div className="ui-panel ui-text-secondary px-6 py-6 sm:px-8 sm:py-8">
      <h1
        className="ui-text-primary text-2xl font-semibold tracking-tight sm:text-3xl"
        data-testid="about-page-header"
      >
        About
      </h1>

      <p className="mt-5 text-base leading-7 sm:text-lg">
        This is a simple to-do list app to demonstrate my React knowledge.
      </p>

      <p className="mt-5">
        <a
          className="ui-link-accent border-b border-current font-medium"
          href="https://github.com/Phixyn/react-todo-app"
          target="_blank"
          rel="noreferrer"
        >
          View the code on GitHub &rarr;
        </a>
      </p>

      <p className="mt-5">
        <NavLink
          to="/"
          className="ui-link-accent border-b border-current font-medium"
        >
          &larr; Back to Todo List
        </NavLink>
      </p>
    </div>
  );
}

export default About;
