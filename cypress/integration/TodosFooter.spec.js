/// <reference types="cypress" />

import { random } from "faker";

describe("todo list footer", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.waitForReact(5000, "#root");
  });

  it("should display number of total tasks", () => {
    cy.getByTestId("total-tasks-count")
      .should("be.visible")
      .and("have.text", "0 tasks");
  });

  it("should display number of complete tasks", () => {
    cy.getByTestId("completed-tasks-count")
      .should("be.visible")
      .and("have.text", "0 complete");
  });

  it("should display number of open tasks", () => {
    cy.getByTestId("open-tasks-count")
      .should("be.visible")
      .and("have.text", "0 open");
  });

  it("should update number of total tasks", () => {
    let task = random.words();

    // Check number of total tasks
    cy.getByTestId("total-tasks-count").should("have.text", "0 tasks");

    // Add new task
    cy.getByTestId("task-input-field").type(task);
    cy.getByTestId("task-submit-btn").click();

    // Check number of total tasks again
    cy.getByTestId("total-tasks-count").should("have.text", "1 tasks");

    // Delete task
    cy.getByTestId("todos-list")
      .find("li")
      .contains(task)
      .getByTestId("delete-task-btn")
      .click();

    cy.getByTestId("total-tasks-count").should("have.text", "0 tasks");
  });

  it("should update number of complete tasks", () => {
    let task = random.words();

    cy.getByTestId("completed-tasks-count").should(
      "have.text",
      "0 complete"
    );

    cy.getByTestId("task-input-field").type(task);
    cy.getByTestId("task-submit-btn").click();

    // Mark task as complete
    cy.getByTestId("todos-list")
      .find("li")
      .contains(task)
      .getByTestId("task-completed-checkbox")
      .click();

    cy.getByTestId("completed-tasks-count").should(
      "have.text",
      "1 complete"
    );
  });

  it("should update number of open tasks", () => {
    let task = random.words();

    cy.getByTestId("open-tasks-count").should("have.text", "0 open");

    cy.getByTestId("task-input-field").type(task);
    cy.getByTestId("task-submit-btn").click();

    cy.getByTestId("open-tasks-count").should("have.text", "1 open");

    // Mark task as complete
    cy.getByTestId("todos-list")
      .find("li")
      .contains(task)
      .getByTestId("task-completed-checkbox")
      .click();

    cy.getByTestId("open-tasks-count").should("have.text", "0 open");
  });
});
