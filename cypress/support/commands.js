/// <reference types="cypress" />
// ***********************************************
// This file can be used to create various
// custom commands and overwrite existing ones.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

/**
 * Queries the entire DOM for an element with the given data-testid value.
 *
 * @example
 * cy.getByTestId("task-input-field");
 *
 * @param {string} testId The value of the data-testid attribute.
 *
 * @yields {Object} The DOM element(s) found.
 */
Cypress.Commands.add("getByTestId", (testId, ...args) => {
  return cy.get(`[data-testid=${testId}]`, ...args);
});

/**
 * Queries the DOM subject for an element with the given data-testid value.
 * Unlike any "get" commands, "find" commands are child commands that perform
 * actions on a "subject" yielded by their parent command. In this case,
 * findByTestId() will look for child elements in the specified DOM subject,
 * rather than the entire DOM.
 *
 * @example
 * cy.getByTestId("todos-list")
 *   .find("li")
 *   .last()
 *   .findByTestId("delete-task-btn")
 *   .click();
 *
 * @param {Object} subject The DOM subject yielded by a parent command like get().
 * @param {string} testId The value of the data-testid attribute.
 *
 * @yields {Object} The DOM element(s) found.
 */
Cypress.Commands.add(
  "findByTestId",
  { prevSubject: true },
  (subject, testId, ...args) => {
    return subject.find(`[data-testid=${testId}]`, ...args);
  }
);

/**
 * Adds a new task to the to-do list via UI interactions, optionally marking
 * it as complete.
 *
 * @param {string} task The task's description.
 * @param {boolean} isComplete Whether to mark the task as complete after
 *    adding it to the list.
 */
Cypress.Commands.add("addTask", (task, isComplete = false) => {
  cy.getByTestId("task-input-field").type(task);
  cy.getByTestId("task-submit-btn").click();

  if (isComplete) {
    // Mark task as complete, assuming it's the latest one on the list
    cy.getByTestId("todos-list")
      .find("li")
      .last()
      .findByTestId("task-completed-checkbox")
      .click();
  }
});
