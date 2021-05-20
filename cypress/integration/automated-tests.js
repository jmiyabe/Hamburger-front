 describe('Opens the app', () => {
    it('Opens the app', () => {   
        cy.visit('http://localhost:3000') 
        cy.get('a').contains('Hamburguer Challenge')
    })
 })

describe('Buy X-Bacon', () => {   
    it('Add X-Bacon in the cart and buy it', () => {
        cy.get(':nth-child(1) > .product-price > .button').click()
        cy.get('.modal-total > :nth-child(2)').click()
        cy.get('.cart-total > div').contains('6.50')
        cy.get('.cart-total > .button').click()
        expect(cy.get('.modal-complete').contains('You have completed the order'))
        cy.get('.ReactModal__Content > .button').click()
    })
})

describe('Buy X-Burger', () => {   
    it('Add X-Bacon in the cart and buy it', () => {
        cy.get(':nth-child(2) > .product-price > .button').click()
        cy.get('.modal-total > :nth-child(2)').click()
        cy.get('.cart-total > div').contains('4.50')
        cy.get('.cart-total > .button').click()
        expect(cy.get('.modal-complete').contains('You have completed the order'))
        cy.get('.ReactModal__Content > .button').click()
    })
})

describe('Buy X-Egg', () => {   
    it('Add X-Egg in the cart and buy it', () => {
        cy.get(':nth-child(3) > .product-price > .button').click()
        cy.get('.modal-total > :nth-child(2)').click()
        cy.get('.cart-total > div').contains('5.30')
        cy.get('.cart-total > .button').click()
        expect(cy.get('.modal-complete').contains('You have completed the order'))
        cy.get('.ReactModal__Content > .button').click()
    })
})

describe('Buy X-Egg-Bacon', () => {   
    it('Add X-Bacon in the cart and buy it', () => {
        cy.get(':nth-child(4) > .product-price > .button').click()
        cy.get('.modal-total > :nth-child(2)').click()
        cy.get('.cart-total > div').contains('7.30')
        cy.get('.cart-total > .button').click()
        expect(cy.get('.modal-complete').contains('You have completed the order'))
        cy.get('.ReactModal__Content > .button').click()
    })
})

describe('Buy X-Bacon with LIGHT sale', () => {   
    it('Add X-Bacon LIGHT in the cart and buy it with discount', () => {
        cy.get(':nth-child(1) > .product-price > .button').click()
        cy.get(':nth-child(1) > .modal-quantity > :nth-child(2)').click()
        for(let x = 0; x < 9; x++){
            cy.get(':nth-child(1) > .modal-quantity > :nth-child(2)').click()    
        }
        cy.get(':nth-child(2) > .modal-quantity > :nth-child(1)').click()    
        cy.get('.modal-total > :nth-child(2)').click()
        cy.get('.cart-total > div').contains('7.65')
        cy.get('.cart-total > .button').click()
        expect(cy.get('.modal-complete').contains('You have completed the order'))
        cy.get('.ReactModal__Content > .button').click()
    })
})

describe('Buy X-Burger with MUITA_CARNE sale', () => {   
    it('Add X-Bacon MUITA_CARNE in the cart and buy it', () => {
        cy.get(':nth-child(2) > .product-price > .button').click()
        for(let x = 0; x < 4; x++){
            cy.get(':nth-child(3) > .modal-quantity > :nth-child(2)').click()    
        }
        cy.get('.modal-total > :nth-child(2)').click()
        cy.get('.cart-total > div').contains('13.50')
        cy.get('.cart-total > .button').click()
        expect(cy.get('.modal-complete').contains('You have completed the order'))
        cy.get('.ReactModal__Content > .button').click()
    })
})


describe('Buy X-Egg with MUITO_QUEIJO sale', () => {   
    it('Add X-Egg MUITO_QUEIJO in the cart and buy it', () => {
        cy.get(':nth-child(3) > .product-price > .button').click()
        for(let x = 0; x < 4; x++){
            cy.get(':nth-child(5) > .modal-quantity > :nth-child(2)').click()
        }
        cy.get('.modal-total > :nth-child(2)').click()
        cy.get('.cart-total > div').contains('9.80')
        cy.get('.cart-total > .button').click()
        expect(cy.get('.modal-complete').contains('You have completed the order'))
        cy.get('.ReactModal__Content > .button').click()
    })
})

describe('Put X-Egg-Bacon in the cart with several ingredients and remove it from the cart', () => {   
    it('Add X-Bacon in the cart and remove from the cart', () => {
        cy.get(':nth-child(4) > .product-price > .button').click()
        cy.get(':nth-child(1) > .modal-quantity > :nth-child(2)').click()
        cy.get(':nth-child(2) > .modal-quantity > :nth-child(2)').click()
        cy.get(':nth-child(3) > .modal-quantity > :nth-child(2)').click()
        cy.get(':nth-child(4) > .modal-quantity > :nth-child(2)').click()
        cy.get(':nth-child(5) > .modal-quantity > :nth-child(2)').click()
        cy.get('.modal-total > :nth-child(2)').click()
        cy.get('.cart-total > div').contains('15.00')
        cy.get('.cart-right > .button').click()
        cy.get('a').contains('Hamburguer Challenge')
    })
})

describe('Put two items in the cart and remove both', () => {   
    it('Put two items in the cart and remove both', () => {
        cy.get(':nth-child(4) > .product-price > .button').click()
        cy.get(':nth-child(2) > .modal-quantity > :nth-child(1)').click()
        cy.get('.modal-total > :nth-child(2)').click()
        cy.get('.cart-total > div').contains('5.30')
        cy.get(':nth-child(2) > .product-price > .button').click()
        cy.get('.modal-total > :nth-child(2)').click()
        cy.get('.cart-total > div').contains('9.80')
        cy.get(':nth-child(2) > :nth-child(1) > .cart-right > .button').click()
        cy.get('.cart-total > div').contains('5.30')
        cy.get('.cart-right > .button').click()
        cy.get('.cart-header').contains('Cart is Empty')
    })
})


