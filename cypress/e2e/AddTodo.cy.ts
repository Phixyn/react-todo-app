/// <reference types="cypress" />

import { faker } from "@faker-js/faker";

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
      "Add task...",
    );
  });

  it("should allow text to be entered in the text input", () => {
    const task = faker.word.words();

    cy.getByTestId("task-input-field").type(task).should("have.value", task);
  });

  it("can be used to add new tasks to the to-do list", () => {
    const task = faker.word.words();

    cy.getByTestId("task-input-field").type(task);
    cy.getByTestId("task-submit-btn").click();

    // Check that the new task was added to the bottom of the list
    cy.getByTestId("todos-list")
      .find("li")
      .last()
      .should("be.visible")
      .and("have.text", task);
  });

  it("should show an inline error when submitted with an empty input", () => {
    cy.getByTestId("task-submit-btn").click();

    cy.get("[role='alert']").should(
      "have.text",
      "Please add a task description.",
    );
  });

  it("should show an inline error when submitted with only whitespace", () => {
    cy.getByTestId("task-input-field").type("   ");
    cy.getByTestId("task-submit-btn").click();

    cy.get("[role='alert']").should(
      "have.text",
      "Please add a task description.",
    );
  });

  it("should clear the inline error when the user starts typing", () => {
    cy.getByTestId("task-submit-btn").click();
    cy.get("[role='alert']").should("exist");

    cy.getByTestId("task-input-field").type("S");

    cy.get("[role='alert']").should("not.exist");
  });

  it("should show an inline error when the task exceeds 500 characters", () => {
    const longTask = "a".repeat(501);

    cy.getByTestId("task-input-field").type(longTask, { timeout: 15000 });
    cy.getByTestId("task-submit-btn").click();

    cy.get("[role='alert']").should(
      "have.text",
      "Task must be 500 characters or fewer.",
    );
  });

  it("should display the character counter at all times", () => {
    // Assert counter is visible on empty input
    cy.contains("0/500").should("be.visible");

    cy.getByTestId("task-input-field").type("Hello");

    // Assert counter updates as the user types
    cy.contains("5/500").should("be.visible");
  });

  it("should not add a whitespace-only task to the list", () => {
    cy.getByTestId("task-input-field").type("   ");
    cy.getByTestId("task-submit-btn").click();

    cy.getByTestId("todos-list", {
      timeout: 0,
    }).should("not.exist");
  });
});
