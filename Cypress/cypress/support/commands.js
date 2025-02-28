// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add("clickevent", (label) => {
  cy.get("a").contains(label).click();
});
/*
// Cypress.Commands.overwrite(
//   "contains",
//   (originalFn, subject, filter, text, options = {}) => {
//     if (typeof text == "object") {
//       options = text;
//       text = filter;
//       filter = undefined;
//     }
//     options.matchCase = false;
//     return originalFn(subject, filter, text, options);
//   }
// );
*/
// Cypress.Commands.overwrite(
//   "contains",
//   (originalFn, subject, filter, text, options = {}) => {
//     if (typeof text == "object") {
//       options = text;
//       text = filter;
//       filter = undefined;
//     }
//     options.matchCase = false;

//     return originalFn(subject, filter, text, options);
//   }
// );

Cypress.Commands.add("loginapp", (email, password) => {
  cy.get("input[name='email']").type(email);
  cy.get("input[name='password']").type(password);
  cy.get("._submitBtn_8rox6_99").click();
});
