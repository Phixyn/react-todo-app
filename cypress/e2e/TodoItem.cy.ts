/// <reference types="cypress" />

import { faker } from "@faker-js/faker";

describe("todo list", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.waitForReact(5000, "#root");
  });

  it("displays the correct task description", () => {
    const task = faker.word.words();

    cy.addTask(task);
    cy.getByTestId("todos-list").find("li").first().should("have.text", task);
  });

  it("can be marked as complete", () => {
    cy.addTask(faker.word.words());

    cy.getByTestId("todos-list")
      .find("li")
      .first()
      .findByTestId("task-completed-checkbox")
      .click()
      .should("be.checked");
  });

  it("can be edited", () => {
    const originalTask = faker.word.words();
    const editedTask = faker.word.words();

    cy.addTask(originalTask);

    // Click the edit button
    cy.contains("li", originalTask).findByTestId("edit-task-btn").click();

    // The input should be visible and focused
    // Showing a different way to use .filter() here
    cy.getByTestId("todo-item")
      .find("input[type='text']")
      .filter((_, el) => (el as HTMLInputElement).value === originalTask)
      .should("have.value", originalTask);

    // Clear and type new value
    cy.getByTestId("todo-item")
      .find("input[type='text']")
      .filter(`[value="${originalTask}"]`)
      .clear()
      .type(editedTask);

    // Click save
    cy.getByTestId("todo-item")
      .find("input[type='text']")
      .filter(`[value="${editedTask}"]`)
      .getByTestId("save-task-btn")
      .click();

    // Assert the task was updated
    cy.getByTestId("todos-list").contains(editedTask).should("exist");
    cy.getByTestId("todos-list").contains(originalTask).should("not.exist");
  });

  it("can be deleted", () => {
    const task = faker.word.words();

    // Add a couple of tasks to work with and make test a bit "realistic"
    cy.addTask(task);
    cy.addTask(faker.word.words());

    cy.getByTestId("todos-list").contains(task).should("exist");

    // Delete the task
    cy.contains("li", task).findByTestId("delete-task-btn").click();

    // Assert deletion
    cy.getByTestId("todos-list", {
      timeout: 0,
    })
      .contains(task)
      .should("not.exist");
  });

  it("should show an inline error in edit mode when saved with an empty input", () => {
    cy.addTask(faker.word.words());
    cy.getByTestId("todos-list")
      .find("li")
      .first()
      .findByTestId("edit-task-btn")
      .click();

    // Clear the input and attempt to save
    cy.getByTestId("todo-item").find("input[type='text']").clear();
    cy.getByTestId("save-task-btn").click();

    cy.get("[role='alert']").should(
      "have.text",
      "Please add a task description.",
    );
  });

  it("should show an inline error in edit mode when saved with only whitespace", () => {
    cy.addTask(faker.word.words());
    cy.getByTestId("todos-list")
      .find("li")
      .first()
      .findByTestId("edit-task-btn")
      .click();

    // Replace with whitespace and attempt to save
    cy.getByTestId("todo-item").find("input[type='text']").clear().type("   ");
    cy.getByTestId("save-task-btn").click();

    cy.get("[role='alert']").should(
      "have.text",
      "Please add a task description.",
    );
  });

  it("should clear the inline error in edit mode when the user starts typing", () => {
    cy.addTask(faker.word.words());
    cy.getByTestId("todos-list")
      .find("li")
      .first()
      .findByTestId("edit-task-btn")
      .click();
    cy.getByTestId("todo-item").find("input[type='text']").clear();
    cy.getByTestId("save-task-btn").click();
    cy.get("[role='alert']").should("exist");

    // Type a character to clear the error
    cy.getByTestId("todo-item").find("input[type='text']").type("S");

    cy.get("[role='alert']").should("not.exist");
  });

  it("should show the character counter in edit mode when near the character limit", () => {
    const originalTask = "Hello";
    const nearLimitTask = "a".repeat(450);

    cy.addTask(originalTask);

    cy.contains("li", originalTask).findByTestId("edit-task-btn").click();

    // The character counter should not be visible yet
    cy.contains("5/500", { timeout: 0 }).should("not.exist");

    // Clear and type a value at the warn threshold (450 characters)
    cy.getByTestId("todo-item")
      .find("input[type='text']")
      .filter(`[value="${originalTask}"]`)
      .clear()
      .type(nearLimitTask, { timeout: 15000 });

    // Assert that the character counter is visible with the correct count
    cy.contains("450/500").should("be.visible");
  });

  it("should show an inline error in edit mode when the task exceeds 500 characters", () => {
    const originalTask = faker.word.words();
    const longTask = "a".repeat(501);

    cy.addTask(originalTask);

    cy.contains("li", originalTask).findByTestId("edit-task-btn").click();

    // Set a value exceeding the character limit and attempt to save
    cy.getByTestId("todo-item")
      .find("input[type='text']")
      .filter(`[value="${originalTask}"]`)
      .clear()
      .type(longTask, { timeout: 15000 });

    cy.getByTestId("todo-item")
      .find("input[type='text']")
      .filter(`[value="${longTask}"]`)
      .getByTestId("save-task-btn")
      .click();

    cy.get("[role='alert']").should(
      "have.text",
      "Task must be 500 characters or fewer.",
    );
  });

  it("should not save an empty task in edit mode", () => {
    const originalTask = faker.word.words();
    cy.addTask(originalTask);
    cy.getByTestId("todos-list")
      .find("li")
      .first()
      .findByTestId("edit-task-btn")
      .click();

    // Clear the input and attempt to save
    cy.getByTestId("todo-item").find("input[type='text']").clear();
    cy.getByTestId("save-task-btn").click();

    // Assert that original task text is preserved after cancel
    cy.getByTestId("cancel-task-btn").click();
    cy.getByTestId("todos-list").contains(originalTask).should("exist");
  });
});
