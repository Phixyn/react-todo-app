import PropTypes from "prop-types";

function TodosFooter(props) {
  return (
    <div className="px-4 py-3 h-14 bg-gray-300 border-t border-gray-400 flex flex-row flex-wrap text-gray-600">
      <p className="flex-1 order-1">{props.totalTasks} tasks</p>
      <p className="flex-1 order-2 text-center">{props.doneTasks} complete</p>
      <p className="flex-1 order-last text-right">
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
