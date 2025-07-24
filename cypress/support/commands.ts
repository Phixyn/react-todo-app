/// <reference types="cypress" />

Cypress.Commands.add("getByTestId", (testId, options?) => {
  return cy.get(`[data-testid=${testId}]`, options);
});

Cypress.Commands.add(
  "findByTestId",
  { prevSubject: true },
  (subject, testId, options?) => {
    return subject.find(`[data-testid=${testId}]`, options);
  }
);

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
