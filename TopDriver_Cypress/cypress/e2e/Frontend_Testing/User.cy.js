import { login } from "./SimpleLogin.cy.js"; // Adjust the path if necessary
import UserPage from "../../support/pages/UserPage.js";
import userData from "../../fixtures/userData.json";

describe("TopDriver User Management Test Cases", () => {
  const userPage = new UserPage();

  beforeEach(() => {
    // Use the login function from SimpleLogin.cy.js
    login();
    cy.viewport(1920, 1080);
    cy.url().should("include", "/settings/users"); // Ensure the user is on the correct page
  });

  it.only("Test Case 2: Duplicate user validation", () => {
    userPage.clickAddUserButton();
    cy.wait(2000);

    // Use valid user data to simulate a duplicate user
    userPage.fillUserDetails(userData.DuplicatedUser);
    userPage.submitUserForm();
    userPage.verifyErrorMessage(userData.errorMessages.userExists);
  });

  it("Test Case 3: Add a valid user", () => {
    userPage.clickAddUserButton();
    cy.wait(2000);

    // Use valid user data from userData.json
    userPage.fillUserDetails(userData.validUser);
    userPage.submitUserForm();
    userPage.verifyUserAddedSuccessMessage();
  });

  it("Test Case 4: Add an invalid user", () => {
    userPage.clickAddUserButton();
    cy.wait(2000);

    // Use invalid user data from userData.json
    userPage.fillUserDetails(userData.invalidUser);
    userPage.submitUserForm();
    userPage.verifyErrorMessage(userData.errorMessages.invalidEmail); // Adjust based on expected behavior
  });

  it("Test Case 1: Missing fields validation", () => {
    userPage.clickAddUserButton();
    cy.wait(2000);

    // Submit the form without filling any details
    userPage.submitUserForm();
    userPage.verifyErrorMessage(userData.errorMessages.missingFirstname);
    // userPage.verifyErrorMessage(userData.errorMessages.missingLastName);
    // userPage.verifyErrorMessage(userData.errorMessages.missingEmail);
    // userPage.verifyErrorMessage(userData.errorMessages.missingPhoneNumber);
  });
});
