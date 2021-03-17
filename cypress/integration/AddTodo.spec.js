/// <reference types="cypress" />

import { random } from "faker";

describe("add todo item form", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.waitForReact(5000, "#root");
  });

  it("should display a text input for the task", () => {
    cy.get('[data-testid="taskInputField"]').should("be.visible");
  });

  it("should display a plus button for adding a new task", () => {
    cy.get('[data-testid="taskSubmitBtn"]').should("be.visible");
  });

  // placeholder : "Add task..."
  it("should display a placeholder text in the text input", () => {
    cy.get('[data-testid="taskInputField"]').should(
      "have.attr",
      "placeholder",
      "Add task..."
    );
  });

  it("should allow text to be entered in the text input", () => {
    let task = random.words();

    cy.get('[data-testid="taskInputField"]')
      .type(task)
      .should("have.value", task);
  });

  it("can be used to add new tasks to the to-do list", () => {
    let task = random.words();

    cy.get('[data-testid="taskInputField"]').type(task)
    cy.get('[data-testid="taskSubmitBtn"]').click();

    cy.get("#todos-list").find("li").contains(task).should("be.visible");
  });
});
