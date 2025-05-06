describe('The add city page', () => {
  it('should only be for logged in users', () => {
    cy.login('tony@stark.com', 'tony@1234')
    cy.url().should('be.equal',`${Cypress.config("baseUrl")}/`)
    cy.contains('ADD CITY').click()
    cy.get('#capital').type('Luanda')
    cy.get('#country').type('Angola')
    cy.get('#image').type('Luanda.png')
    cy.get('#add-city').click()
    cy.visit('/')
    cy.contains('Luanda - Angola')
  })
})