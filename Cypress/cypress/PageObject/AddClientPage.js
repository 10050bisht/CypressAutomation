class AddCStudentPage {
  clickAddClientButton() {
    cy.get(".css-1e35650 > .MuiButtonBase-root").click();
  }

  setFirstName(firstName) {
    cy.get("#\\:r1\\:").type(firstName);
  }

  setLastName(lastName) {
    cy.get("#\\:r2\\:").type(lastName);
  }

  setPhoneNumber(phoneNo) {
    cy.get('input[name="phoneNo"]').type(phoneNo);
  }

  selectPhoneType(phoneType) {
    cy.get(".MuiInputBase-root > #phoneType").click();
    cy.get(`li[data-value="${phoneType}"]`).click();
  }

  setEmail(email) {
    cy.get('input[name="email"]').type(email);
  }

  selectLeadType(leadType) {
    cy.get(".MuiInputBase-root > #leadType").click();
    cy.get(`[data-value="${leadType}"]`).click();
  }

  selectMedium(medium) {
    cy.get(".MuiInputBase-root > #medium").click();
    cy.get(`[data-value="${medium}"]`).click();
  }
  ClickButton(AddButton) {
    cy.get(
      "._modelFooter_n8wpi_91 > .MuiStack-root > .MuiButton-contained"
    ).click();
  }
  verifyEmailAlreadyExistsMessage() {
    cy.get(".Toastify__toast-body").should("have.text", "Email already exists");
  }
}

export default AddClientPage;
