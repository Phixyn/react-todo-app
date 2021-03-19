/// <reference types="cypress" />

describe("app footer", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.waitForReact(5000, "#root");
  });

  it("should display link to About page", () => {
    cy.getByTestId("footer-about-link").should("be.visible");
  });

  it("should navigate to About page when clicking on About link", () => {
    cy.getByTestId("footer-about-link").click();
    cy.location("pathname").should("equal", "/about");
    cy.getByTestId("about-page-header").should("be.visible");
  });
});
