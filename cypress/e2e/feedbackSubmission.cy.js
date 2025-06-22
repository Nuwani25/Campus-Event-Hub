describe('Feedback Submission Form', () => {
  it('Should submit feedback successfully', () => {
    cy.visit('http://127.0.0.1:5500/frontend/feedback.html');
    cy.get('#studentEmail').type('feedback@example.com');
    cy.wait(1000);
    cy.get('#eventName').select(1); // Assumes event names are loaded
    cy.get('#star4').check({ force: true }); // Select 4-star rating
    cy.get('#comments').type('Very informative and engaging!');
    cy.get('#improvements').type('Add more Q&A time.');
    cy.get('form').submit();

    cy.on('window:alert', (alertText) => {
      expect(alertText).to.include('Thank you for your feedback');
    });
  });

  it('Should alert if rating is not selected', () => {
    cy.visit('http://127.0.0.1:5500/frontend/feedback.html');
    cy.get('#studentEmail').type('norating@example.com');
    cy.wait(1000);
    cy.get('#eventName').select(1);
    cy.get('#comments').type('Missing rating');
    cy.get('form').submit();

    cy.on('window:alert', (text) => {
      expect(text).to.include('Please select a rating');
    });
  });
});
