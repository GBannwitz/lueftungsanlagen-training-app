describe('Critical path', () => {
  it('plays avatar & shows control check & marks quiz done', () => {
    cy.visit('http://localhost:5173/')
    cy.contains('Lektionen')
    cy.contains('Start').first().click()
    cy.contains('Kontrollfragen')
    cy.contains('Quiz als bestanden markieren').click()
  })
})
