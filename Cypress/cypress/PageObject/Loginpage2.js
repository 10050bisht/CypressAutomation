class LoginPage {
  txtEmail = "input[placeholder='e.g. abc@xyz.com']";
  txtPassword = "input[placeholder='****************']";
  btnSubmit = "._submitBtn_8rox6_99";
  txtVerify = "._pageTitle_c2qci_3";

  setEmail(email) {
    cy.get(this.txtEmail).type(email);
  }
  setPassword(password) {
    cy.get(this.txtPassword).type(password);
  }
  clickSubmit() {
    cy.get(this.btnSubmit).click();
  }

  verifylogin() {
    cy.get(this.txtVerify);
  }
}
// .should("have.text", "Contacts ")
export default LoginPage;
