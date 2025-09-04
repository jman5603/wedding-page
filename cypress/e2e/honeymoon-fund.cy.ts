describe('Honeymoon Fund Page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/honeymoon-fund')
    })

    it('Page loads successfully', () => {
        cy.contains('Honeymoon Fund')
        cy.contains('Choose Your Contribution Amount')
        cy.contains('Continue to Payment')
    })

    it('Can change contribution amount', () => {
        cy.get('input[name=contribution-amount]').should('have.value', '50')
        cy.get('input[name=contribution-amount]').clear().type('100')
        cy.get('input[name=contribution-amount]').should('have.value', '100')
    })

    it('Preset amounts can be selected', () => {
        cy.get('button.preset-button').contains('$25').click()
        cy.get('input[name=contribution-amount]').should('have.value', '25')

        cy.get('button.preset-button').contains('$50').click()
        cy.get('input[name=contribution-amount]').should('have.value', '50')

        cy.get('button.preset-button').contains('$100').click()
        cy.get('input[name=contribution-amount]').should('have.value', '100')

        cy.get('button.preset-button').contains('$200').click()
        cy.get('input[name=contribution-amount]').should('have.value', '200')
    })

    it('Selecting give anonymous option', () => {
        // Share my name selected by default
        cy.get('input[placeholder="First Name"]').should('exist')
        cy.get('input[placeholder="Last Name"]').should('exist')
        
        cy.get('input[placeholder="First Name"]').type('John')
        cy.get('input[placeholder="Last Name"]').type('Doe')

        // Select give anonymously option
        cy.get('input[name=donorType]').eq(0).check().should('be.checked')
        cy.get('input[placeholder="First Name"]').should('not.exist')
        cy.get('input[placeholder="Last Name"]').should('not.exist')

        // Move back to share my name
        cy.get('input[name=donorType]').eq(1).check().should('be.checked')
        cy.get('input[placeholder="First Name"]').should('exist')
        cy.get('input[placeholder="Last Name"]').should('exist')
    })
})