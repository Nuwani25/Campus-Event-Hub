describe('Event Creation Form', () => {
  it('Should create event successfully', () => {
    cy.visit('http://127.0.0.1:5500/frontend/events.html');
    cy.get('#eventName').type('AI Tech Fair 2025');
    cy.get('#eventDate').type('2025-12-01');
    cy.get('#eventTime').type('10:30');
    cy.get('#location').type('Auditorium A');
    cy.get('#organizer').type('Tech Club');
    cy.get('#description').type('Annual fair showcasing student AI projects.');
    cy.get('#capacity').type('100');
    cy.get('form').submit();

    cy.on('window:alert', (alertText) => {
      expect(alertText).to.include('Event created successfully');
    });
  });

  it('Should prevent submission if Event Name is missing', () => {
    cy.visit('http://127.0.0.1:5500/frontend/events.html');
    cy.get('#eventDate').type('2025-12-01');
    cy.get('#eventTime').type('10:30');
    cy.get('#location').type('Auditorium');
    cy.get('#organizer').type('Dept');
    cy.get('#description').type('Missing event name test');
    cy.get('form').submit();

    cy.get('#eventName:invalid').should('exist');
  });
});
