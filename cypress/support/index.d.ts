/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
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
    getByTestId(
      testId: string,
      options?: Partial<TypeOptions>,
    ): Chainable<JQuery<HTMLElement>>;

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
    findByTestId(
      testId: string,
      options?: Partial<TypeOptions>,
    ): Chainable<JQuery<HTMLElement>>;

    /**
     * Adds a new task to the to-do list via UI interactions, optionally marking
     * it as complete.
     *
     * @param {string} task The task's description.
     * @param {boolean} isComplete Whether to mark the task as complete after
     *    adding it to the list.
     */
    addTask(task: string, isComplete?: boolean): Chainable<void>;
  }
}
