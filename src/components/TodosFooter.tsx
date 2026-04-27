interface TodosFooterProps {
  totalTasks: number;
  doneTasks: number;
}

export default function TodosFooter({
  totalTasks,
  doneTasks,
}: TodosFooterProps) {
  return (
    <div className="ui-surface-inset ui-divider flex min-h-14 flex-wrap items-center gap-y-2 border-t px-4 py-3 text-sm md:px-6 md:text-base lg:px-8">
      <p className="ui-text-muted order-1 flex-1" data-testid="total-tasks-count">
        {totalTasks} {totalTasks === 1 ? "task" : "tasks"}
      </p>
      <p
        className="ui-text-secondary order-2 flex-1 text-center"
        data-testid="completed-tasks-count"
      >
        {doneTasks} complete
      </p>
      <p
        className="ui-text-muted order-last flex-1 text-right"
        data-testid="open-tasks-count"
      >
        {totalTasks - doneTasks} open
      </p>
    </div>
  );
}
