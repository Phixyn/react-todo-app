/// <reference types="cypress" />

import { random } from "faker";

describe("add todo item form", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.waitForReact(5000, "#root");
  });

  it("should display a text input for the task", () => {
    cy.get('[data-testid="task-input-field"]').should("be.visible");
  });

  it("should display a plus button for adding a new task", () => {
    cy.get('[data-testid="task-submit-btn"]').should("be.visible");
  });

  // placeholder : "Add task..."
  it("should display a placeholder text in the text input", () => {
    cy.get('[data-testid="task-input-field"]').should(
      "have.attr",
      "placeholder",
      "Add task..."
    );
  });

  it("should allow text to be entered in the text input", () => {
    let task = random.words();

    cy.get('[data-testid="task-input-field"]')
      .type(task)
      .should("have.value", task);
  });

  it("can be used to add new tasks to the to-do list", () => {
    let task = random.words();

    cy.get('[data-testid="task-input-field"]').type(task)
    cy.get('[data-testid="task-submit-btn"]').click();

    cy.get('[data-testid="todos-list"]').find("li").contains(task).should("be.visible");
  });
});
