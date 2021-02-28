function About() {
  return (
    <>
      <h1 className="text-xl font-bold">About</h1>

      <p className="mt-4">
        This is a simple to-do list app to demonstrate my <a className="underline font-medium text-blue-500" href="https://reactjs.org/" target="_blank">React</a> knowledge.
      </p>

      <p className="mt-4">
        <a
          className="border-b border-blue-500 font-medium text-blue-500"
          href="https://github.com/Phixyn/react-todo-app"
          target="_blank"
        >
          View the code on GitHub →
        </a>
      </p>
    </>
  );
};

export default About;
