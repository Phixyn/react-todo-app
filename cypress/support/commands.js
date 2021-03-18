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
