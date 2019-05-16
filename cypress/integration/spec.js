// cypress/integration/spec.js
describe('bxtHome', () => {
  it('loads', () => {
    cy.visit('http://localhost:7878/')
    cy.contains('Tarzan')
  })
  it('contains rows > 5', () => {
    cy.get('#app .pure-table > tbody > tr').should('have.length.gt', 5)
  })

  it('clicks Edit', () => {
    cy.get('a[href="/edit"]').contains('Create').click()
    cy.url().should('contain', '/edit')
  })

})

