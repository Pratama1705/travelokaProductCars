import { carsProduct } from './../component/functionCars';

const carsProductFunction = new carsProduct();

describe('Traveloka Cars Product', () => {
  beforeEach(() => {
    cy.viewport(1280, 720);

    // Open traveloka website
    cy.visit('https://traveloka.com');
    cy.wait(5000);

    // Assertion success to open Traveloka website
    cy.get('div').contains('Log In').should('be.visible');
  });

  it('Users want to order car rental in Traveloka', () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false;
    });

    // Click Car Rental hyperlink
    cy.get('a[href="/en-en/car-rental"]').eq(0).click();
    cy.url().should('include', '/car-rental');

    // Search car
    carsProductFunction.searchCarsProduct();

    // Select car based on first row
    carsProductFunction.selectCarAndProvider();

    // Input detail location pickup and dropoff
    carsProductFunction.inputPickUpDropLocation();

    /*
      After this step, captcha is shown to prevent automation
      take over the payment processes. Automation is generated
      to make it easier for testing not for process payment.
      Because this is production and not development server, 
      automation can't bypass this captcha and is forbidden 
      to do that.
    */

    // CAPTCHA Detected
    cy.get('h2')
      .contains("Let's solve the puzzle!")
      .then(($el) => {
        if ($el.length > 0) {
          cy.log('CAPTCHA DETECTED');
        } else {
          // Input user details
          carsProductFunction.inputUserDetails();

          // Checking detail booking requirements data
          carsProductFunction.checkDetailsBooking();

          /*
            Continue Payment function is commented because
            if we continue, it generate bookingID and this is production.
            This comment to prevent unexpected possibility.
          */

          // Continue to payment method and pay
          // carsProductFunction.continuePayment();
        }
      });
  });
});
