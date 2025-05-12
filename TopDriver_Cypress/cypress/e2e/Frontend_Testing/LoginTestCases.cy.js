import LoginPage from "../../support/pages/LoginPage";
import loginData from "../../fixtures/loginData.json";

describe("TopDriver Login Test Cases", () => {
  const loginPage = new LoginPage();

  it("Test Case 1:- Login Blank fields", () => {
    loginPage.visit(loginData.url);
    cy.wait(2000);
    loginPage.clickToggleButton();
    loginPage.clickLoginButton();
    loginPage.verifyErrorMessage(loginData.errorMessages.blankFields);
  });

  it("Test Case 2:- Login valid email blank password", () => {
    loginPage.visit(loginData.url);
    loginPage.enterEmail(loginData.validEmail);
    cy.wait(2000);
    loginPage.clickToggleButton();
    loginPage.clickLoginButton();
    loginPage.verifyErrorMessage(loginData.errorMessages.blankFields);
  });

  it("Test Case 3:- Login blank email valid password", () => {
    loginPage.visit(loginData.url);
    loginPage.enterPassword(loginData.invalidPassword);
    cy.wait(2000);
    loginPage.clickToggleButton();
    loginPage.clickLoginButton();
    loginPage.verifyErrorMessage(loginData.errorMessages.blankFields);
  });

  it("Test Case 4:- Login invalid Email", () => {
    loginPage.visit(loginData.url);
    loginPage.enterEmail(loginData.invalidEmail);
    loginPage.enterPassword(loginData.invalidPassword);
    loginPage.clickToggleButton();
    cy.wait(2000);
    loginPage.clickLoginButton();
    loginPage.verifyLoginFailed();
  });

  it("Test Case 5:- Login invalid Email and valid password", () => {
    loginPage.visit(loginData.url);
    loginPage.enterEmail(loginData.invalidEmail);
    loginPage.enterPassword(loginData.invalidPassword);
    loginPage.clickToggleButton();
    cy.wait(2000);
    loginPage.clickLoginButton();
    loginPage.verifyLoginFailed();
  });

  it("Test Case 6:- Login valid-Cred", () => {
    cy.viewport(1920, 1080);

    loginPage.visit(loginData.url);
    loginPage.enterEmail(loginData.validEmail);
    loginPage.enterPassword(loginData.validPassword);
    // loginPage.clickToggleButton();
    // cy.wait(2000);
    loginPage.clickLoginButton();
    cy.wait(10000);
    loginPage.verifySuccessfulLogin();
  });
});
