import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders caught up message", () => {
  render(<App />);
  expect(screen.getByText(/You're all caught up!/i)).toBeInTheDocument();
});
