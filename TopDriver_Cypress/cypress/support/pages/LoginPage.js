class LoginPage {
  visit(url) {
    cy.visit(url, {
      waitUntil: "domcontentloaded",
    });
  }

  clickToggleButton() {
    cy.get("button[value='on']").click();
  }

  enterEmail(email) {
    if (email) {
      cy.get('input[name="email"]').type(email);
    }
  }

  enterPassword(password) {
    if (password) {
      cy.get('input[name="password"]').type(password);
    }
  }

  clickLoginButton() {
    cy.xpath("//button[.//span[text()='Login']]").click();
  }

  verifyErrorMessage(message) {
    cy.contains("p", message).should("be.visible");
  }

  verifyLoginFailed() {
    cy.contains("Login failed").should("be.visible");
  }

  verifySuccessfulLogin() {
    cy.url().should("include", "/settings/users");
  }
}

export default LoginPage;
