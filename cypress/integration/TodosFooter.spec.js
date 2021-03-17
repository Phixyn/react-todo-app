/// <reference types="cypress" />

import { random } from "faker";

describe("todo list footer", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.waitForReact(5000, "#root");
  });

  it("should display number of total tasks", () => {
    cy.get('[data-testid="total-tasks-count"]')
      .should("be.visible")
      .and("have.text", "0 tasks");
  });

  it("should display number of complete tasks", () => {
    cy.get('[data-testid="completed-tasks-count"]')
      .should("be.visible")
      .and("have.text", "0 complete");
  });

  it("should display number of open tasks", () => {
    cy.get('[data-testid="open-tasks-count"]')
      .should("be.visible")
      .and("have.text", "0 open");
  });

  it("should update number of total tasks", () => {
    let task = random.words();

    // Check number of total tasks
    cy.get('[data-testid="total-tasks-count"]').should("have.text", "0 tasks");

    // Add new task
    cy.get('[data-testid="task-input-field"]').type(task);
    cy.get('[data-testid="task-submit-btn"]').click();

    // Check number of total tasks again
    cy.get('[data-testid="total-tasks-count"]').should("have.text", "1 tasks");

    // Delete task
    cy.get('[data-testid="todos-list"]')
      .find("li")
      .contains(task)
      .get('[data-testid="delete-task-btn"]')
      .click();

    cy.get('[data-testid="total-tasks-count"]').should("have.text", "0 tasks");
  });

  it("should update number of complete tasks", () => {
    let task = random.words();

    cy.get('[data-testid="completed-tasks-count"]').should(
      "have.text",
      "0 complete"
    );

    cy.get('[data-testid="task-input-field"]').type(task);
    cy.get('[data-testid="task-submit-btn"]').click();

    // Mark task as complete
    cy.get('[data-testid="todos-list"]')
      .find("li")
      .contains(task)
      .get('[data-testid="task-completed-checkbox"]')
      .click();

    cy.get('[data-testid="completed-tasks-count"]').should(
      "have.text",
      "1 complete"
    );
  });

  it("should update number of open tasks", () => {
    let task = random.words();

    cy.get('[data-testid="open-tasks-count"]').should("have.text", "0 open");

    cy.get('[data-testid="task-input-field"]').type(task);
    cy.get('[data-testid="task-submit-btn"]').click();

    cy.get('[data-testid="open-tasks-count"]').should("have.text", "1 open");

    // Mark task as complete
    cy.get('[data-testid="todos-list"]')
      .find("li")
      .contains(task)
      .get('[data-testid="task-completed-checkbox"]')
      .click();

    cy.get('[data-testid="open-tasks-count"]').should("have.text", "0 open");
  });
});
