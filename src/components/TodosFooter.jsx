import PropTypes from "prop-types";

function TodosFooter(props) {
  return (
    <div className="px-4 h-12 text-sm bg-gray-300 border-t border-gray-400 flex flex-wrap items-center text-gray-600">
      <p className="flex-1 order-1" data-testid="total-tasks-count">
        {props.totalTasks} {props.totalTasks === 1 ? "task" : "tasks"}
      </p>
      <p
        className="flex-1 order-2 text-center"
        data-testid="completed-tasks-count"
      >
        {props.doneTasks} complete
      </p>
      <p
        className="flex-1 order-last text-right"
        data-testid="open-tasks-count"
      >
        {props.totalTasks - props.doneTasks} open
      </p>
    </div>
  );
}

TodosFooter.propTypes = {
  totalTasks: PropTypes.number.isRequired,
  doneTasks: PropTypes.number.isRequired,
};

export default TodosFooter;
