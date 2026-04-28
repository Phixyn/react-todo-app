/// <reference types="cypress" />

describe("theme switcher", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit("/");
    cy.waitForReact(5000, "#root");
  });

  it("should display the theme switcher button in the header", () => {
    cy.getByTestId("theme-switcher").should("be.visible");
  });

  it("should have an accessible aria-label", () => {
    cy.getByTestId("theme-switcher").should("have.attr", "aria-label");
  });

  it("should add the 'dark' class to <html> when switching to dark theme", () => {
    // Ensure we start in light mode
    cy.get("html").should("not.have.class", "dark");

    cy.getByTestId("theme-switcher").click();

    cy.get("html").should("have.class", "dark");
  });

  it("should remove the 'dark' class from <html> when switching back to light theme", () => {
    // Switch to dark first
    cy.getByTestId("theme-switcher").click();
    cy.get("html").should("have.class", "dark");

    // Switch back to light
    cy.getByTestId("theme-switcher").click();
    cy.get("html").should("not.have.class", "dark");
  });

  it("should persist the dark theme preference to localStorage", () => {
    cy.getByTestId("theme-switcher").click();

    cy.getAllLocalStorage().then((storage) => {
      // TODO Maybe not so good to hardcode URL. Investigate alternatives
      const appStorage = storage["http://localhost:5173"];
      expect(appStorage?.theme).to.equal("dark");
    });
  });

  it("should persist the light theme preference to localStorage after toggling back", () => {
    cy.getByTestId("theme-switcher").click();
    cy.getByTestId("theme-switcher").click();

    cy.getAllLocalStorage().then((storage) => {
      const appStorage = storage["http://localhost:5173"];
      expect(appStorage?.theme).to.equal("light");
    });
  });

  it("should restore dark theme from localStorage on page reload", () => {
    cy.getByTestId("theme-switcher").click();
    cy.get("html").should("have.class", "dark");

    cy.reload();
    cy.waitForReact(5000, "#root");

    cy.get("html").should("have.class", "dark");
  });

  it("should restore light theme from localStorage on page reload", () => {
    // Switch to dark then back to light to ensure localStorage has 'light'
    cy.getByTestId("theme-switcher").click();
    cy.getByTestId("theme-switcher").click();

    cy.reload();
    cy.waitForReact(5000, "#root");

    cy.get("html").should("not.have.class", "dark");
  });

  it("should update the aria-label to reflect the active theme", () => {
    // In light mode the label should prompt switching to dark
    cy.getByTestId("theme-switcher").should(
      "have.attr",
      "aria-label",
      "Switch to dark theme",
    );

    cy.getByTestId("theme-switcher").click();

    // In dark mode the label should prompt switching to light
    cy.getByTestId("theme-switcher").should(
      "have.attr",
      "aria-label",
      "Switch to light theme",
    );
  });
});
