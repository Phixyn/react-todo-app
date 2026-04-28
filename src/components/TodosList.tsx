import { useContext } from "react";

import { TodoContext } from "../context/TodoContext";

import AddTodo from "./AddTodo";
import TodosFooter from "./TodosFooter";
import TodosHeader from "./TodosHeader";
import TodoItem from "./TodoItem";

// TODO Move to a types file?
export interface TodoItemType {
  id: string;
  title: string;
  completed: boolean;
}

export default function TodosList() {
  const { todoItems } = useContext(TodoContext);

  return (
    <div className="ui-panel flex flex-col overflow-hidden">
      <TodosHeader />

      <AddTodo />

      <div className="mx-4 my-5 h-96 overflow-auto md:mx-6 md:my-6 lg:mx-8 lg:my-7 lg:h-[32rem] md:h-[28rem]">
        {todoItems.length > 0 ? (
          // If there are todo items, show them in a list
          <ul className="mt-3" data-testid="todos-list">
            {todoItems.map((todoItem) => (
              <TodoItem key={todoItem.id} todo={todoItem} />
            ))}
          </ul>
        ) : (
          // No todo items, all caught up
          <p
            className="ui-text-muted mx-auto my-16 max-w-xs text-center text-base leading-7 sm:text-lg"
            data-testid="empty-todos-message"
          >
            You're all caught up!
          </p>
        )}
      </div>

      <TodosFooter
        totalTasks={todoItems.length}
        doneTasks={todoItems.filter((todoItem) => todoItem.completed).length}
      />
    </div>
  );
}
