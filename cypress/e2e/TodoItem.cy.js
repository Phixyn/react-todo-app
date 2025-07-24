/// <reference types="cypress" />

import { faker } from '@faker-js/faker';

describe("todo list", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.waitForReact(5000, "#root");
  });

  it("displays the correct task description", () => {
    let task = faker.word.words();

    cy.addTask(task);
    cy.getByTestId("todos-list")
      .find("li")
      .first()
      .should("have.text", task);
  });

  it("can be marked as complete", () => {
    cy.addTask(faker.word.words());

    // "Simple" way
    // cy.getByTestId("todos-list")
    //   .find("li")
    //   .first()
    //   .findByTestId("task-completed-checkbox")
    //   .click()
    //   .should("be.checked");

    // "Fancy" way with closure and alias
    cy.getByTestId("todos-list")
      .find("li")
      .first()
      .findByTestId("task-completed-checkbox")
      .then(($checkbox) => {
        $checkbox.click();
        expect($checkbox).to.be.checked;
      });
  });

  it("can be deleted", () => {
    let task = faker.word.words();

    // Add a couple of tasks to work with and make test a bit "realistic"
    cy.addTask(task);
    cy.addTask(faker.word.words());

    // All of the below can use closures, but at the cost of readability
    cy.getByTestId("todos-list")
      .contains(task)
      .should("exist");

    // Delete the first task
    cy.getByTestId("todos-list")
      .find("li")
      .contains(task)
      .next()
      .should("have.attr", "data-testid", "delete-task-btn")
      .click();

    // Assert deletion
    cy.getByTestId("todos-list", {
      timeout: 0,
    }).contains(task)
      .should("not.exist");
  });
});
