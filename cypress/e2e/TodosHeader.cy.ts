/// <reference types="cypress" />

describe("todo list header", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.waitForReact(5000, "#root");
  });

  it("should display background image", () => {
    cy.getByTestId("todos-header-bg").should("be.visible");
  });

  it("should display day of week and calendar day", () => {
    cy.getByTestId("calendar-date").should("be.visible");
  });

  it("should display month name", () => {
    cy.getByTestId("calendar-month").should("be.visible");
  });
});
