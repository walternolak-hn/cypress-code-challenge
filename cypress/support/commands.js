// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add('verifyCartIsEmpty', () => {
    cy.get('.shopping_cart')
        .should('be.visible')
    cy.get('.shopping_cart > a')
        .find('b')
        .should('have.text', 'Cart')
    cy.get('.shopping_cart > a')
        .find('.ajax_cart_no_product')
        .should('have.text', '(empty)')
})
Cypress.Commands.add('addToCartTheFirstPopularItem', () => {
    let firstPopularItem = cy.get('ul#homefeatured > li:first > .product-container > .right-block > .button-container > a:first.button.ajax_add_to_cart_button')
    firstPopularItem.contains('Add to cart')
    firstPopularItem.click()
})
Cypress.Commands.add('verifyItemAddedConfirmationMessage', () => {
    let itemAddedMessage = 'Product successfully added to your shopping cart'
    cy.get('#layer_cart > .clearfix > .layer_cart_product')
        .find('h2')
        .should('include.text', itemAddedMessage)
    cy.wait(2000)
})
Cypress.Commands.add('openTheShoppingCart', () => {
    cy.get('.shopping_cart').scrollIntoView()
    cy.get('.shopping_cart > a').find('.ajax_cart_product_txt').should('have.text', 'Product')
    cy.get('.shopping_cart').find('a').first().click()
    cy.url().should('include', 'order')
})
Cypress.Commands.add('assertItemAddedToShopingCart', () => {
    cy.get('#cart_title > .heading-counter')
        .should('include.text', 'Your shopping cart contains:')
    cy.get('#summary_products_quantity')
        .should('include.text', '1 Product')
})
Cypress.Commands.add('deleteItemFromTheShopingCart', () => {
    cy.get('#cart_summary > tbody')
        .find('tr:first > .cart_delete')
        .click()
    cy.get('p.alert.alert-warning')
        .should('be.visible')
        .and('have.text', 'Your shopping cart is empty.')
})
Cypress.Commands.add('closeItemAddedConfirmationWindow', () => {
    cy.get('#layer_cart > .clearfix > .layer_cart_product')
        .find('.cross')
        .click()
})
Cypress.Commands.add('enteringSearchTermInSearchbox', (searchTerm) => {
    cy.get('#searchbox')
        .find('#search_query_top')
        .should('be.visible')
        .and('have.attr', 'type', 'text')
        .type(searchTerm)
})
Cypress.Commands.add('performSearch', () => {
    cy.get('#searchbox')
        .find('button')
        .should('have.attr', 'type', 'submit')
        .click()
})
Cypress.Commands.add('verifySuccessfulSearch', (validSearchTerm, foundItems) => {
    // Header search info assertions
    cy.get('#center_column > .page-heading')
        .find('.lighter')
        .should('include.text', validSearchTerm)

    cy.get('#center_column > .page-heading')
        .find('.heading-counter')
        .should('include.text', foundItems + ' results have been found')

    // Items listing assertion
    cy.get('.product_list li.ajax_block_product')
        .should('have.length', foundItems)
})
Cypress.Commands.add('verifyUnsuccessfulSearch', (invalidSearchTerm, foundItems) => {
    cy.get('#center_column')
        .find('p.alert')
        .should('include.text', `No results were found for your search\u00a0"${invalidSearchTerm}"`)

    cy.get('#center_column > .page-heading')
        .find('.heading-counter')
        .should('include.text', foundItems + ' results have been found')
})
