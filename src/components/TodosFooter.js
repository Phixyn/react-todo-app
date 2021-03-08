function TodosFooter() {
  return (
    <div className="px-4 py-3 h-14 bg-gray-300 border-t border-gray-400 flex flex-row flex-wrap text-gray-600">
      <p className="flex-1 order-1">{0} tasks</p>
      <p className="flex-1 order-last text-right">
        <a
          className="transition duration-500 ease-in-out hover:text-pink-500"
          href="https://phixyn.com/"
          target="_blank"
        >
          Phixyn
        </a>
      </p>
    </div>
  );
}

export default TodosFooter;
