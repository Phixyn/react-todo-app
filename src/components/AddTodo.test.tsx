import { render, screen, fireEvent } from "@testing-library/react";

import AddTodo from "./AddTodo";

describe("AddTodo", () => {
  const inputTestId = "task-input-field";

  test("should have placeholder text", () => {
    render(<AddTodo />);
    const input = screen.getByTestId(inputTestId);
    expect(input).toHaveAttribute("placeholder", "Add task...");
  });

  test("should allow text to be entered", () => {
    render(<AddTodo />);
    const input = screen.getByTestId(inputTestId);
    fireEvent.change(input, { target: { value: "SampleTodoTask" } });
    expect(input).toHaveValue("SampleTodoTask");
  });

  test("should show an inline error when form is submitted with empty input", () => {
    render(<AddTodo />);
    const form = screen.getByTestId("task-form");

    fireEvent.submit(form);

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Please add a task description.",
    );
  });

  test("should clear the inline error when user starts typing", () => {
    render(<AddTodo />);
    const form = screen.getByTestId("task-form");
    const input = screen.getByTestId(inputTestId);

    fireEvent.submit(form);
    expect(screen.getByRole("alert")).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "S" } });
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  test("should show an inline error when task exceeds the character limit", () => {
    render(<AddTodo />);
    const input = screen.getByTestId(inputTestId);
    const form = screen.getByTestId("task-form");

    fireEvent.change(input, { target: { value: "a".repeat(501) } });
    fireEvent.submit(form);

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Task must be 500 characters or fewer.",
    );
  });
});
