export class carsProduct {
  searchCarsProduct() {
    // Click radio button without driver
    cy.get('div')
      .contains('Without Driver')
      .parent()
      .parent()
      .then(($el) => {
        cy.get($el)
          .invoke('attr', 'aria-checked')
          .then((attrValue) => {
            // Condition if without drivet button is not clicked (false), click it
            if (attrValue != 'true') {
              cy.get('div').contains('Without Driver').parent().click({ force: true });
            }
          });
      });

    // Input pickup rental location
    cy.get('input[data-testid="rental-search-form-location-input"]').type('Jakarta', { force: true }).should('have.value', 'Jakarta');
    cy.wait(5000);
    cy.get('div[data-testid="rental-search-form-location-container"]').should('be.visible');
    cy.get('div[data-testid="rental-search-form-location-item"]').eq(0).click({ force: true }); // Click first item location in container

    // Input pickup date (today)
    cy.get('input[data-testid="rental-search-form-date-input-start"]').parent().click({ force: true });
    cy.wait(2000);
    cy.get('div').contains('Today').parent().parent().parent().click({ force: true });

    // Input date time today
    cy.get('input[data-testid="rental-search-form-time-input-start"]').parent().click({ force: true });
    cy.wait(2000);
    cy.get('div').contains('22').parent().click({ force: true });

    // Input dropoff date (time dropoff set to default 09.00)
    cy.get('input[data-testid="rental-search-form-date-input-end"]').parent().click({ force: true });
    cy.wait(2000);
    cy.get('div[data-month="2"]').find('div').contains('15').click({ force: true });

    // Click search car button
    cy.get('div').contains('Search Car').click({ force: true });
    cy.wait(5000);
    cy.get('h2').contains('Car Rental Without Driver').should('be.visible');
  }

  selectCarAndProvider() {
    // Select car (choose the first car in a row) and click continue
    cy.get('div').contains('Continue').eq(0).click({ force: true });
    cy.wait(5000);

    // Select provider (choose the first provider in a row) and click continue
    cy.get('div').contains('Continue').eq(0).click({ force: true });
    cy.wait(5000);
  }

  inputPickUpDropLocation() {
    // Input Pick Up Location (Rental Office)
    cy.get('div').contains('Rental Office').click({ force: true });
    cy.wait(2000);
    cy.get('h4').contains('Pick-up Location').parent().find('div').contains('Rental Office').click({ force: true });
    cy.wait(2000);
    cy.get('h4').contains('SEE MAP').parent().parent().parent().click({ force: true }); // Click rental office location
    cy.wait(5000);

    // Input Drop Off Location
    cy.get('div[id="RENTAL_DROPOFF_LOCATION"]').click({ force: true });
    cy.wait(2000);
    cy.get('div[id="RENTAL_DROPOFF_LOCATION"]').find('div').contains('Other Locations').click({ force: true });
    cy.wait(2000);
    cy.get('input[placeholder="Search location or address"]').eq(1).type('Soekarno Hatta International Airport', { force: true }); // Drop off other location
    cy.wait(5000);
    cy.get('span').contains('Soekarno Hatta International Airport').click({ force: true });
    cy.wait(5000);
    cy.get('textarea[placeholder="Additional notes (optional)"]').type('Notes Optional Plus'); // INput additional notes

    // Click continue on product detail page
    cy.get('div[role="button"] > div').contains('Continue').click({ force: true });
    cy.wait(8000);
  }

  inputUserDetails() {
    // Input user data contact details
    cy.get('input[aria-labelledby="name.full"]').type('John Doe').should('have.value', 'Akbar Pratama'); // Name
    cy.wait(1000);
    cy.get('select[aria-label="Country Number"]').select('Indonesia (+62)'); // Country code phone
    cy.wait(1000);
    cy.get('input[aria-label="Phone Number"]').eq(0).type(80945621590).should('have.value', 80945621590); // Phone number
    cy.wait(1000);
    cy.get('input[aria-labelledby="emailAddress"]').type('email@example.com').should('have.value', 'email@example.com'); // Email
    cy.wait(1000);

    // Input driver contact details
    cy.get('div[aria-labelledby="title"] > select').select('Mr.');
    cy.wait(1000);
    cy.get('h2').contains('Driver Details').parents().find('input[aria-labelledby="name.full"]').type('John Doe').should('have.value', 'John Doe');
    cy.get(1000);
    cy.get('select[aria-label="Country Number"]').select('Indonesia (+62)'); // Country code phone
    cy.wait(1000);
    cy.get('input[aria-label="Phone Number"]').eq(1).type(80945621590).should('have.value', 80945621590); // Phone number
    cy.wait(1000);

    // Click Continue button
    cy.get('div').contains('Continue').click({ force: true });
    cy.wait(8000);
  }

  checkDetailsBooking() {
    cy.get('h3').contains('John Doe').should('be.visible'); // Check name data input
    cy.get('div').contains('email@example.com').should('be.visible'); // Check email data input

    // Input special request
    cy.get('textarea[placeholder="Odd or even license plates, car charger, baby car seat, etc."]').type('Special Request').should('have.value', 'Special Request');
    cy.wait(2000);

    // Check all rental requirements
    cy.get('div').contains('Tap to check the requirements.').click({ force: true });
    cy.wait(2000);
    cy.get('div').contains('Check All').click({ force: true });
    cy.wait(2000);
    cy.get('div').contains('Save').click({ force: true });
    cy.wait(2000);
  }

  continuePayment() {
    // Continue to payment
    cy.get('div').contains('Continue to Payment').click({ force: true });
    cy.wait(5000);
    cy.get('h2').contains('Are your booking details correct?').should('be.visible');
    cy.get('div').contains('Continue').click({ force: true });
    cy.wait(10000);
    cy.get('h1').contains('Payment').should('be.visible'); // Assert payment page is shown
  }
}
