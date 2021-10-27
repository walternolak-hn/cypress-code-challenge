/// <reference types="cypress" />

describe('Searches for valid and invalid search terms', () => {
  beforeEach(() => {
    // Accessing the site and verifying we are in the Homepage
    cy.visit('http://automationpractice.com')
    cy.url().should('include', '/index.php')
  })

  it('performs a search using a valid search term', () => {

    let validSearchTerm = 'Dress'
    let foundItems = 7

    // Asserting the search box at the top of the page and entering a valid search term
    cy.enteringSearchTermInSearchbox(validSearchTerm)

    // Click the submit search button to perform search
    cy.performSearch()

    // Verifying search is performed successfully
    cy.verifySuccessfulSearch(validSearchTerm, foundItems)

  })

  it('performs a search using an invalid search term', () => {
    let invalidSearchTerm = 'test'
    let foundItems = 0

    // Asserting the search box at the top of the page and entering an invalid search term
    cy.enteringSearchTermInSearchbox(invalidSearchTerm)

    // Click the submit search button to perform search
    cy.performSearch()

    // Verifying search is unsuccessful due to an invalid search term
    cy.verifyUnsuccessfulSearch(invalidSearchTerm, foundItems)
  })
})
