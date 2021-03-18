// ***********************************************
// This file can be used to create various
// custom commands and overwrite existing ones.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add("getByTestId", (testid, ...args) => {
  return cy.get(`[data-testid=${testid}]`, ...args);
});

Cypress.Commands.add("addTask", (task, isComplete = false) => {
  cy.getByTestId("task-input-field").type(task);
  cy.getByTestId("task-submit-btn").click();

  if (isComplete) {
    // Mark task as complete, assuming it's the latest one on the list
    cy.getByTestId("todos-list")
      .get("li")
      .last()
      .getByTestId("task-completed-checkbox")
      .click();
  }
});
