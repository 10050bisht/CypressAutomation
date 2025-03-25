class AddClientPage {
  clickAddContactButton() {
    cy.contains("button", "Add Contact").click();
  }

  setFirstName(firstName) {
    cy.get('input[name="firstName"]').type(firstName);
  }

  setLastName(lastName) {
    cy.get('input[name="lastName"]').type(lastName);
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

  clickAddClientButton() {
    cy.contains("button", "Add Client").click();
  }

  verifyErrorMessage(selector, expectedMessage) {
    cy.contains(selector, expectedMessage).should("have.text", expectedMessage);
  }

  verifyToastMessage(expectedMessage) {
    cy.get(".Toastify__toast-body > :nth-child(2)").should(
      "have.text",
      expectedMessage
    );
  }
}

export default AddClientPage;
