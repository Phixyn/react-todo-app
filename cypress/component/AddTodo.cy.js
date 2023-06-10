import AddTodo from '../../src/components/AddTodo'

const inputFieldLocator = "[data-testid='task-input-field']"

describe('AddTodo.cy.js', () => {
  beforeEach(function (){
    cy.mount(<AddTodo/>)
  })
  it('should have place holder text', () => {
    cy.get(inputFieldLocator).should('have.attr', 'placeholder', 'Add task...')

  })
  it('should allow text to be entered', function () {
    cy.get(inputFieldLocator).type("SampleTodoTask")
    cy.get(inputFieldLocator).should('have.value', 'SampleTodoTask')
  });
  it('should show an alert', function () {
    cy.get(inputFieldLocator).type('{enter}')
    cy.on('window:alert', function (message){
      expect(message).eq('Please add a task description.')
    })
  });
})