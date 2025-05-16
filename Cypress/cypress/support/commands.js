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
import "cypress-xpath";

Cypress.Commands.add("loginapp", (email, password) => {
  cy.visit("https://stage.schedulehub.io");
  cy.get("._userInput1_8rox6_74").clear().type(email); // Enter email
  cy.get("._userInput_8rox6_65").clear().type(password); // Enter password
  cy.get("._submitBtn_8rox6_99").click(); // Click submit
});

//................................API Commands to resuse the code for login .............................
Cypress.Commands.add("loginApi", (email, password) => {
  return cy.request({
    method: "POST",
    url: "https://api-stage.schedulehub.io/api/v1/auth/admin/login",
    failOnStatusCode: false,
    body: {
      email,
      password,
    },
  });
});

//................................API Commands to resuse the Fetech for contacts Details ............................

Cypress.Commands.add("fetchContactList", (authToken, queryParams = {}) => {
  return cy.request({
    method: "GET",
    url: "https://api-stage.schedulehub.io/api/v1/admin/contacts/leads?search=&page=1&status=All",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    qs: queryParams, // Pass query parameters dynamically
    failOnStatusCode: false,
  });
});

//................................API Commands to resuse the create User .............................

Cypress.Commands.add("createUser", (authToken, userData) => {
  return cy.request({
    method: "POST",
    url: "https://api-stage.schedulehub.io/api/v1/admin/settings/user-access/create",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: userData,
    failOnStatusCode: false, // Prevent Cypress from failing on non-2xx status codes
  });
});

//................................API Commands to resuse the Create Client  .............................

Cypress.Commands.add("addClient", (authToken, clientData) => {
  return cy.request({
    method: "POST",
    url: "https://api-stage.schedulehub.io/api/v1/admin/contacts/leads/create",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`, // Use the passed authToken
    },
    body: clientData,
    failOnStatusCode: false, // Prevent Cypress from failing on non-2xx status codes
  });
});

//................................API Commands to resuse the User List   .............................

Cypress.Commands.add("getUserList", (authToken, params = {}) => {
  return cy.request({
    method: "GET",
    url: "https://api-stage.schedulehub.io/api/v1/admin/settings/user-access/user?search=&status=all&page=1",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`, // Use the passed authToken
    },
    body: userlistData,
    failOnStatusCode: false, // Prevent Cypress from failing on non-2xx status codes
  });
});

//................................API Commands to resuse the Add Room   .............................

Cypress.Commands.add("addRoom", (authToken, roomData) => {
  return cy.request({
    method: "POST",
    url: "https://api-stage.schedulehub.io/api/v1/admin/settings/location/room/create",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: roomData,
    failOnStatusCode: false,
  });
});

//................................API Commands to resuse the Room  List  .............................

Cypress.Commands.add("getRoomList", (authToken, queryParams = {}) => {
  return cy.request({
    method: "GET",
    url: "https://api-stage.schedulehub.io/api/v1/admin/settings/location/room/list?search=&locations=all&sortBy=count&sortType=desc", // Use your actual endpoint
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
    qs: queryParams,
    failOnStatusCode: false,
  });
});
