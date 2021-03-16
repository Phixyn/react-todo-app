/// <reference types="cypress" />

import { random } from "faker";

describe("with todo list", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("can create new tasks", () => {
    let task = random.words();

    cy.get('[data-testid="taskInputField"]')
      .type(task)
      .should("have.value", task);

    cy.get('[data-testid="taskSubmitBtn"]').click();
  });
});
