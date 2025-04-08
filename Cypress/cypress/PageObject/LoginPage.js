class LoginPage {
  setUsername(username) {
    cy.get("input[name='email']").type(username);
  }
  setPassword(password) {
    cy.get("input[placeholder='****************']").type(password);
  }
  clickSubmit() {
    cy.get("._submitBtn_8rox6_99").click();
  }

  verifylogin() {
    cy.get("._pageTitle_c2qci_3").should("have.text", "Contacts ");
  }
}
export default LoginPage;
