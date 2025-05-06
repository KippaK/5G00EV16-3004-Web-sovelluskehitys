describe('The cities page', () => {
  it('should show some cities', () => {
    cy.visit('/')
    cy.get('h1').should('contain', 'Capital Cities')
  })

  it('should open the Login view when clicking Authenticate', () => {
    cy.visit('/')
    cy.contains('AUTHENTICATE').click()
    cy.url().should('include', 'auth')
    cy.contains('SignUp instead?').click()
    cy.get('button').should('not.contain', 'SignUp instead?')
    cy.contains('Login instead?').click()
    cy.get('button').should('not.contain', 'Login instead?')
  })

  it('should sign up a user with valid credentials', () => {
    cy.visit('/auth')
    //Toggle to signup mode
    cy.contains('SignUp instead?').click()
    cy.get('button').should('not.contain', 'SignUp instead?')
    cy.get('#name').type("Tony Stark")
    cy.get('#email').type('tony@stark.com')
    cy.get('#password').type('tony@1234')
    cy.get('form > .button').click()
  })


  it('should login up a user with valid credentials', () => {
    cy.visit('/auth')
    //Toggle to signup mode
    cy.get('#email').type('tony@stark.com')
    cy.get('#password').type('tony@1234')
    cy.get('form > .button').click()
    cy.url().should('be.equal',`${Cypress.config("baseUrl")}/`)
  })

})