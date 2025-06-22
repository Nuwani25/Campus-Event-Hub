describe('Student Registration Form', () => {
  it('Should register student with valid input', () => {
    cy.visit('http://127.0.0.1:5500/frontend/index.html');
    cy.get('#name').type('Shashika Dinuwan');
    cy.get('#email').type('shashika@example.com');
    cy.get('#password').type('Test123!');
    cy.get('#confirmPassword').type('Test123!');
    cy.get('#department').select('IT');
    cy.get('#year').select('2nd');
    cy.get('form').submit();

    cy.on('window:alert', (alertText) => {
      expect(alertText).to.include('Registration successful');
    });
  });

  it('Should show password mismatch alert', () => {
    cy.visit('http://127.0.0.1:5500/frontend/index.html');
    cy.get('#name').type('Mismatch Student');
    cy.get('#email').type('wrongpass@example.com');
    cy.get('#password').type('pass123');
    cy.get('#confirmPassword').type('different123');
    cy.get('#department').select('Business');
    cy.get('#year').select('3rd');
    cy.get('form').submit();

    cy.on('window:alert', (alertText) => {
      expect(alertText).to.include('Passwords do not match');
    });
  });
});
