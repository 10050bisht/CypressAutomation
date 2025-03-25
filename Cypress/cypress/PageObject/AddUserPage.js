class AddUserPage {
  setFirstName(firstName) {
    cy.get('input[name="firstname"]').type(firstName);
  }

  setLastName(lastName) {
    cy.get('input[name="lastname"]').type(lastName);
  }

  setPhoneNumber(phoneNo) {
    cy.get('input[name="phoneNo"]').type(phoneNo);
  }

  setBusinessPhoneNumber(businessPhoneNo) {
    cy.get('input[name="bussinessphoneNo"]').type(businessPhoneNo);
  }

  setEmail(email) {
    cy.get('input[name="email"]').type(email);
  }

  selectAccessLevel(accessLevel) {
    cy.get("#mui-component-select-accessLevelId").click();
    cy.contains("li", accessLevel).click();
  }

  selectMatchUser(matchUser) {
    cy.get('div[aria-labelledby="mui-component-select-accessLevelId"]').click();
    cy.contains("li", matchUser).click();
  }

  setLocation(location) {
    cy.get('input[name="address"]').type(location);
  }

  selectGender(gender) {
    cy.get("#mui-component-select-gender").click();
    cy.contains("li", gender).click();
  }

  selectInstruments(instruments) {
    cy.get("#demo-multiple-checkbox").click();
    cy.contains("li", instruments).click();
  }

  clickCreateUserButton() {
    cy.contains("button", "Create User").click();
  }

  clickCancelButton() {
    cy.contains("button", "Cancel").click();
  }

  verifyToastMessage(expectedMessage) {
    cy.get(".Toastify__toast-body").should("have.text", expectedMessage);
  }
}

export default AddUserPage;
