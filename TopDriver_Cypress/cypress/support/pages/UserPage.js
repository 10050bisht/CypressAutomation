class UserPage {
  // navigateToUsersPage() {
  //   cy.get("a[href='/settings/users']").click(); // Adjust the selector based on your application's navigation
  // }

  clickAddUserButton() {
    cy.get(".pageContainer > .justify-between > .gap-4 > .blueBtn").click(); // Replace with the actual selector for the "Add User" button
  }

  fillUserDetails(user) {
    cy.get('input[name="firstName"]').type(user.firstName);
    cy.get('input[name="lastName"]').type(user.lastName);
    cy.get("#«rh»-form-item").type(user.phone);
    cy.get('input[name="email"]').type(user.email);

    // cy.contains("button", "Admin").click();
    // cy.contains("div", user.role).click(); // Select the role dynamically
    // // cy.get("#«r3t»-form-item").select(user.role); // Assuming a dropdown for roles
  }

  submitUserForm() {
    cy.get("button[type='submit']").click(); // Replace with the actual selector for the "Submit" button
  }

  verifyUserAddedSuccessMessage() {
    cy.contains("User Created Successfully").should("be.visible"); // Replace with the actual success message
  }

  verifyErrorMessage(message) {
    cy.contains(message).should("be.visible"); // Verify error messages
  }
  VerifyToasterMessage() {
    cy.get(".text-sm.opacity-90").should("be.visible"); // Adjust the selector based on your application's toaster message
  }
}
export default UserPage;
