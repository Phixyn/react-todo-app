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
    cy.getByTestId("total-tasks-count").should("have.text", "0 tasks");
    cy.addTask(random.words());
    cy.getByTestId("total-tasks-count").should("have.text", "1 tasks");

    // Delete one task
    cy.getByTestId("todos-list")
      .find("li")
      .last()
      .findByTestId("delete-task-btn")
      .click();

    cy.getByTestId("total-tasks-count").should("have.text", "0 tasks");
  });

  it("should update number of complete tasks", () => {
    cy.getByTestId("completed-tasks-count").should("have.text", "0 complete");
    cy.addTask(random.words(), true);
    cy.getByTestId("completed-tasks-count").should("have.text", "1 complete");
  });

  it("should update number of open tasks", () => {
    cy.getByTestId("open-tasks-count").should("have.text", "0 open");
    cy.addTask(random.words());
    cy.getByTestId("open-tasks-count").should("have.text", "1 open");

    // Mark task as complete
    cy.getByTestId("todos-list")
      .find("li")
      .last()
      .findByTestId("task-completed-checkbox")
      .click();

    cy.getByTestId("open-tasks-count").should("have.text", "0 open");
  });
});
