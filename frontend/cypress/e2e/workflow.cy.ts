describe('Workflow Editor E2E', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should load the application', () => {
    cy.contains('Workflow Editor').should('be.visible')
  })

  it('should load workflow steps from backend', () => {
    cy.contains('Количество шагов').should('be.visible')
  })
})
