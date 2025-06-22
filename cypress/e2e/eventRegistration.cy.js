describe('Event Registration Form', () => {

  it('Should register for an event successfully', () => {
    cy.visit('http://127.0.0.1:5500/frontend/register.html');
    cy.get('#studentEmail').type('student@example.com');

    // Wait until options are populated
    cy.get('#eventId option')
      .should('have.length.greaterThan', 1)
      .then(() => {
        cy.get('#eventId').select(1); // Select 2nd option
      });

    cy.get('#registrationType').select('Participant');
    cy.get('form').submit();

    cy.on('window:alert', (text) => {
      expect(text).to.include('Registration successful');
    });
  });

  it('Should prevent registration if email is empty', () => {
    cy.visit('http://127.0.0.1:5500/frontend/register.html');

    cy.get('#eventId option')
      .should('have.length.greaterThan', 1)
      .then(() => {
        cy.get('#eventId').select(1);
      });

    cy.get('#registrationType').select('Guest');
    cy.get('form').submit();

    cy.get('#studentEmail:invalid').should('exist');
  });

});
