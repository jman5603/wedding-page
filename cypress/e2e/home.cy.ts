describe('Home Page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })

    it('Page loads successfully', () => {
        cy.contains('Juliette and Jacob')
        cy.contains('RSVP')
        cy.contains('Our Story')
        cy.contains('Wedding')
        cy.contains('Registry')
        cy.contains('Travel')
        cy.get('img')
    })

    it('RSVP navigation', () => {
        cy.contains('RSVP').click();
        cy.url().should('include', '/rsvp');
    })

    it('Our Story navigation', () => {
        cy.contains('Our Story').click();
        cy.url().should('include', '/ourstory');
    })

    it('Wedding navigation', () => {
        cy.contains('Wedding').click();
        cy.url().should('include', '/wedding');
    })

    it('Registry navigation', () => {
        cy.contains('Registry').click();
        cy.url().should('include', '/registry');
    })

    it('Travel navigation', () => {
        cy.contains('Travel').click();
        cy.url().should('include', '/travel');
    })
})