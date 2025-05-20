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

// Api Command to handle API requests and API Testing --------------------------------------
// This is a custom command to handle API requests ------------------------------------------
Cypress.Commands.add(
  "apiRequest",
  ({ method, url, authToken, body = {}, qs = {} }) => {
    const headers = {
      "Content-Type": "application/json",
      ...(authToken && { Authorization: `Bearer ${authToken}` }),
    };
    return cy.request({
      method,
      url,
      headers,
      body,
      qs,
      failOnStatusCode: false,
    });
  }
);

//................................API Commands to resuse the code for login .............................
Cypress.Commands.add("loginApi", (email, password) => {
  return cy.apiRequest({
    method: "POST",
    url: "https://api-stage.schedulehub.io/api/v1/auth/admin/login",
    body: { email, password },
  });
});

//................................API Commands to resuse the Fetech for contacts Details ............................

Cypress.Commands.add("fetchContactList", (authToken, queryParams = {}) => {
  return cy.apiRequest({
    method: "GET",
    url: "https://api-stage.schedulehub.io/api/v1/admin/contacts/leads?search=&page=1&status=All",
    authToken,
    qs: queryParams,
  });
});

//................................API Commands to resuse the create User .............................

Cypress.Commands.add("createUser", (authToken, userData) => {
  return cy.apiRequest({
    method: "POST",
    url: "https://api-stage.schedulehub.io/api/v1/admin/settings/user-access/create",
    authToken,
    body: userData,
  });
});

//................................API Commands to resuse the Create Client  .............................

Cypress.Commands.add("addClient", (authToken, clientData) => {
  return cy.apiRequest({
    method: "POST",
    url: "https://api-stage.schedulehub.io/api/v1/admin/contacts/leads/create",
    authToken,
    body: clientData,
  });
});

//................................API Commands to resuse the User List   .............................

Cypress.Commands.add("getUserList", (authToken, queryParams = {}) => {
  return cy.apiRequest({
    method: "GET",
    url: "https://api-stage.schedulehub.io/api/v1/admin/settings/user-access/user?search=&status=all&page=1",
    authToken,
    qs: queryParams,
  });
});

//................................API Commands to resuse the Add Room   .............................

Cypress.Commands.add("addRoom", (authToken, roomData) => {
  return cy.apiRequest({
    method: "POST",
    url: "https://api-stage.schedulehub.io/api/v1/admin/settings/location/room/create",
    authToken,
    body: roomData,
  });
});

//................................API Commands to resuse the Room  List  .............................

Cypress.Commands.add("getRoomList", (authToken, queryParams = {}) => {
  return cy.apiRequest({
    method: "GET",
    url: "https://api-stage.schedulehub.io/api/v1/admin/settings/location/room/listsearch=&locations=all&sortBy=count&sortType=desc",
    authToken,
    qs: queryParams,
  });
});

//................................API Commands to resuse the Add Holiday  .............................

Cypress.Commands.add("apiCreateHoliday", (authToken, holidayData) => {
  return cy.apiRequest({
    method: "POST",
    url: "https://api-stage.schedulehub.io/api/v1/admin/settings/location/holiday/create",
    authToken,
    body: holidayData,
  });
});

//................................API Commands to resuse the Get Holiday List  .............................
Cypress.Commands.add("getHolidayList", (authToken, queryParams = {}) => {
  return cy.apiRequest({
    method: "GET",
    url: "https://api-stage.schedulehub.io/api/v1/admin/settings/location/holiday/list?search=&locations=all",
    authToken,
    qs: queryParams,
  });
});

//................................API Commands to resuse the Create Student  .............................

Cypress.Commands.add("createStudent", (authToken, studentData = {}) => {
  return cy.apiRequest({
    method: "POST",
    url: "https://api-stage.schedulehub.io/api/v1/admin/contacts/students/create",
    authToken,
    body: studentData,
  });
});

//................................API Commands to resuse the Get Student list  .............................

Cypress.Commands.add("getStudentLead", (authToken, studentId) => {
  return cy.apiRequest({
    method: "GET",
    url: `https://api-stage.schedulehub.io/api/v1/admin/contacts/students/leads/${studentId}`,
    authToken,
  });
});
