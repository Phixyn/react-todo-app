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

  it("keeps the header content visible after switching themes", () => {
    cy.getByTestId("theme-switcher").click();

    cy.get("html").should("have.class", "dark");
    cy.getByTestId("todos-header-bg").should("be.visible");
    cy.getByTestId("calendar-date").should("be.visible");
    cy.getByTestId("calendar-month").should("be.visible");
  });
});
