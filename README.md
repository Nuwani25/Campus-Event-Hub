# Campus Event Hub

Campus Event Hub is a web application developed to practise automated testing using Cypress. It helps students create campus events, register for events and submit feedback.

The project combines application development with automated testing using Cypress.

## Features

- Student registration and login
- Event creation
- Event registration
- Feedback submission
- Viewing events created by the logged-in student
- Updating event details

## Technologies

- Frontend: HTML, CSS and JavaScript
- Backend: Node.js and Express.js
- Database: MongoDB with Mongoose
- Authentication: JSON Web Tokens (JWT) and bcrypt
- Automated testing: Cypress

## Automated Tests

The project contains eight test cases across four Cypress test files.

| Test file | Scenarios |
|---|---|
| studentRegistration.cy.js | Valid registration and password mismatch |
| eventCreation.cy.js | Event creation and missing event name |
| eventRegistration.cy.js | Event registration and missing email |
| feedbackSubmission.cy.js | Feedback submission and missing rating |

These tests cover successful submissions and invalid inputs.

## Project Structure

- `backend/` — API server, authentication and database models
- `frontend/` — Web pages and styles
- `cypress/e2e/` — Automated test specifications
- `cypress.config.js` — Cypress configuration

