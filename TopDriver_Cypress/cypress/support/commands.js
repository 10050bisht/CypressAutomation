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
///<refrence types="Cypress" />;
///<refrence types="Cypress-xpath" />;

Cypress.Commands.add("loginAndStoreToken", () => {
  cy.request("POST", "https://staging.topdriverdev.com/login", {
    email: "topdrivera@yopmail.com",
    password: "Password@123aa",
  }).then((res) => {
    Cypress.env("accessToken", res.body.accessToken);
    Cypress.env("refreshToken", res.body.refreshToken);
  });
});

Cypress.Commands.add("refreshToken", () => {
  cy.request("POST", "/api/refresh-token", {
    refreshToken: Cypress.env("refreshToken"),
  }).then((res) => {
    Cypress.env("accessToken", res.body.accessToken);
  });
});
