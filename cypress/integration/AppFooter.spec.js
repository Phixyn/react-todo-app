/// <reference types="cypress" />

describe("app footer", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.waitForReact(5000, "#root");
  });

  it("should display link to About page", () => {
    cy.get('[data-testid="footer-about-link"]').should("be.visible");
  });

  it("should navigate to About page when clicking on About link", () => {
    cy.get('[data-testid="footer-about-link"]').click();
    cy.get('[data-testid="about-page-header"]').should("be.visible");
    // TODO assert location as well?
  });
});
