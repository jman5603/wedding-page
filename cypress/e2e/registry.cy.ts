describe('Registry Page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/registry')
    })

    it('Page loads successfully', () => {
        cy.contains('Our Wedding Registry')
        cy.get('a').should('have.length.at.least', 1)
    })

    it('Honeymoon Fund navigation', () => {
        cy.contains('Contribute').click();
        cy.url().should('include', '/honeymoon-fund');
    })
})