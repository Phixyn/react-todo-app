/// <reference types="cypress" />

import { random } from "faker";

describe("todo list", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.waitForReact(5000, "#root");
  });
  
  it("starts with no items", () => {
    cy.getByTestId("todos-list", {
      timeout: 0,
    }).should("not.exist");
  });

  it("displays 'caught up' message when empty", () => {
    cy.getByTestId("empty-todos-message")
      .should("be.visible")
      .and("have.text", "You're all caught up!");
  });

  it("displays todo items", () => {
    cy.addTask(random.words());

    cy.getByTestId("todos-list")
      .find("li")
      .first()
      .should("have.attr", "data-testid", "todo-item")
      .and("be.visible");
  });

  // it("is scrollable when overflowed", () => {
  //   // TODO
  // });
});
