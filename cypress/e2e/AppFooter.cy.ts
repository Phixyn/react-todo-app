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

  it("should show the About page footer content after navigation", () => {
    cy.getByTestId("footer-about-link").click();

    cy.contains("Made by").should("be.visible");
    cy.contains("Phixyn")
      .should("be.visible")
      .and("have.attr", "href", "https://phixyn.com/");
  });
});
