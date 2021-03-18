/// <reference types="cypress" />

import { random } from "faker";

describe("add todo item form", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.waitForReact(5000, "#root");
  });

  it("should display a text input for the task", () => {
    cy.getByTestId("task-input-field").should("be.visible");
  });

  it("should display a plus button for adding a new task", () => {
    cy.getByTestId("task-submit-btn").should("be.visible");
  });

  it("should display a placeholder text in the text input", () => {
    cy.getByTestId("task-input-field").should(
      "have.attr",
      "placeholder",
      "Add task..."
    );
  });

  it("should allow text to be entered in the text input", () => {
    let task = random.words();

    cy.getByTestId("task-input-field")
      .type(task)
      .should("have.value", task);
  });

  it("can be used to add new tasks to the to-do list", () => {
    let task = random.words();

    cy.getByTestId("task-input-field").type(task);
    cy.getByTestId("task-submit-btn").click();

    // Check that the new task was added to the bottom of the list
    cy.getByTestId("todos-list")
      .get("li")
      .last()
      .should("be.visible")
      .and("have.text", task);
  });
});
