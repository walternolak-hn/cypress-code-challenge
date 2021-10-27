/// <reference types="cypress" />

describe('Homepage footer validation', () => {
  beforeEach(() => {
    // Accessing the site and verifying we are in the Homepage
    cy.visit('http://automationpractice.com')
    cy.url().should('include', '/index.php')
  })

  it('Validates the homepage store footer info', () => {

    // Array of the store footer info
    let storeInformation = [
      '\tSelenium Framework, Research Triangle Park,\nNorth Carolina,\nUSA',
      '(347) 466-7432',
      'support@seleniumframework.com'
    ]

    // Scroll down to the footer area
    cy.get('#block_contact_infos')
      .scrollIntoView()

    // Storage section should have 3 li elements where info is displayed
    // Asserting the store information
    cy.get('#block_contact_infos > div > ul.toggle-footer li')
      .should('have.length', 3)
      .each(($item, index, $list) => {
        cy.wrap($item)
          .should('include.text', storeInformation[index])
      })

  })

})
