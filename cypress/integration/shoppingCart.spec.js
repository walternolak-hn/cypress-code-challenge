/// <reference types="cypress" />

describe('adding and deleting items to the shopping cart', () => {
  beforeEach(() => {
    // Accessing the site and verifying we are in the Homepage
    cy.visit('http://automationpractice.com')
    cy.url().should('include', '/index.php')
  })

  it('adds an item to the shopping cart', () => {

    // Verifying cart is empty before adding items to it
    cy.verifyCartIsEmpty()

    // Scrolling down into view to the Products list
    // "Popular" items tab should be selected as default
    cy.get('ul#home-page-tabs').scrollIntoView()
    cy.get('ul#home-page-tabs li')
      .first()
      .should('have.class', 'active')
      .and('have.text', 'Popular')

    // 
    // Adding the first "Popular" item to the shopping cart
    cy.get('ul#homefeatured')
      .should('have.class', 'active')
    cy.get('ul#homefeatured')
      .find('li')
      .should('have.length', 7)
    cy.addToCartTheFirstPopularItem()

    // Verifying addition confirmation page is presented
    cy.get('#layer_cart')
      .find('.clearfix')
      .should('be.visible')

    //Verifying item added confirmation message is displayed correctly 
    cy.verifyItemAddedConfirmationMessage()

    // Closing the current window and validating an item has been added to the Cart info
    cy.closeItemAddedConfirmationWindow()
    cy.openTheShoppingCart()    
    cy.assertItemAddedToShopingCart()
    cy.wait(2000)
  })

  it('removes an item from the shopping cart', () => {

    // Verifying cart is empty before adding items to it
    cy.verifyCartIsEmpty()

    // Adding item to shopping cart
    cy.addToCartTheFirstPopularItem()

    // Open the shopping cart
    cy.closeItemAddedConfirmationWindow()
    cy.openTheShoppingCart()

    // assert we have included 1 item in the cart
    cy.assertItemAddedToShopingCart()

    // Verifying a list of products is presented in the Cart
    cy.get('#cart_summary')
      .should('be.visible')

    // Deleting the item displayed in the Cart
    cy.deleteItemFromTheShopingCart()

  })
})
