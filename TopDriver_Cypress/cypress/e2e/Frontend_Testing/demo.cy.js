import { login } from "./SimpleLogin.cy.js"; // Adjust the path if necessary

// Import the login function or commands from Login.cy.js

describe("Demo Test", () => {
  it("Should login successfully", () => {
    // Call the login function
    login();

    // Add assertions or further actions after login
    // cy.url().should("include", "/settings/users"); // Example assertion
    cy.viewport(1920, 1080);
    cy.wait(1000);
    cy.get(".pageContainer > .justify-between > .gap-4 > .blueBtn").click();
    cy.contains("button", "Add User").click;
  });
});
