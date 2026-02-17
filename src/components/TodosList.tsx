import { useContext } from "react";

import { GlobalContext } from "../context/GlobalState";

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
  const { todoItems } = useContext(GlobalContext);

  return (
    <div className="flex flex-col bg-gray-200 rounded shadow-lg">
      <TodosHeader />

      <AddTodo />

      <div className="mx-4 my-6 h-96 overflow-auto">
        {todoItems.length > 0 ? (
          // If there are todo items, show them in a list
          <ul className="mt-4" data-testid="todos-list">
            {todoItems.map((todoItem) => (
              <TodoItem key={todoItem.id} todo={todoItem} />
            ))}
          </ul>
        ) : (
          // No todo items, all caught up
          <p
            className="my-16 text-lg text-center text-gray-500"
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
