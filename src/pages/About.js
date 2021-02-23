import React from "react";

function About() {
  return (
    /* React.Fragment does not create any element in the DOM.
     * Since all components need to return only a single element, this is
     * useful for cases where we don't want to polute the DOM with an extra
     * div just for the component. */
    <React.Fragment>
      <h1 className="text-xl font-bold">About</h1>

      <p className="mt-4">This is a simple to-do list app to demonstrate my <a className="underline font-medium text-blue-500" href="https://reactjs.org/" target="_blank">React</a> knowledge.</p>

      <p className="mt-4">
        <a
          className="border-b border-blue-500 font-medium text-blue-500"
          href="https://github.com/Phixyn/react-todo-app"
          target="_blank"
        >
          View the code on GitHub →
        </a>
      </p>
    </React.Fragment>
  );
}

export default About;
