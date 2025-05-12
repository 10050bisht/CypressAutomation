import LoginPage from "../../support/pages/LoginPage";
import loginData from "../../fixtures/loginData.json";

export function login() {
  const loginPage = new LoginPage();

  cy.viewport(1920, 1080);
  loginPage.visit(loginData.url);
  loginPage.enterEmail(loginData.validEmail);
  loginPage.enterPassword(loginData.validPassword);
  cy.wait(5000);

  loginPage.clickLoginButton();
  cy.wait(5000);
  loginPage.verifySuccessfulLogin();
}
