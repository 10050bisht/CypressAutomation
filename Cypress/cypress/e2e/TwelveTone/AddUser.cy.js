import LoginPage from "../../PageObject/LoginPage";
import AddUserPage from "../../PageObject/AddUserPage";

describe("Add User Test Cases", () => {
  const loginPage = new LoginPage();
  const addUserPage = new AddUserPage();

  beforeEach(() => {
    // Login before each test
    cy.viewport(1920, 1080); // Set viewport size
    cy.visit("https://stage.schedulehub.io");
    loginPage.setUsername("test@gmail.com");
    loginPage.setPassword("123456");
    loginPage.clickSubmit();
    cy.wait(5000);

    // Open Add User form
    cy.get("img[alt='setting-icon']").click();
    cy.contains("span", "Users").click();
    cy.wait(3000);
    cy.contains("button", "Add User").click();
  });

  it("Add User with minimum required fields", () => {
    addUserPage.setFirstName("John");
    addUserPage.setLastName("Doe");
    addUserPage.setEmail("john.doe@example.com");
    addUserPage.clickCreateUserButton();

    // Verify success message
    addUserPage.verifyToastMessage("All Fields Are Required");
  });

  it.skip("Add User with excessive input length", () => {
    addUserPage.setFirstName("A".repeat(51)); // Exceeds max length
    addUserPage.setLastName("B".repeat(51)); // Exceeds max length
    addUserPage.setEmail("john.doe@example.com");
    addUserPage.clickCreateUserButton();

    // Verify error message for excessive input length
    cy.contains("p", "First Name cannot exceed 50 characters").should(
      "be.visible"
    );
    cy.contains("p", "Last Name cannot exceed 50 characters").should(
      "be.visible"
    );
  });

  it.only("Add User with invalid business phone number", () => {
    addUserPage.setFirstName("John");
    addUserPage.setLastName("Doe");
    addUserPage.setPhoneNumber("1234567890");
    addUserPage.setBusinessPhoneNumber("invalid-phone"); // Invalid business phone number
    addUserPage.setEmail("john.doe@example.com");
    addUserPage.clickCreateUserButton();

    // Verify error message for invalid business phone number
    cy.contains("p", "Please enter a valid business phone number").should(
      "be.visible"
    );
  });

  it("Add User with optional fields left blank", () => {
    addUserPage.setFirstName("John");
    addUserPage.setLastName("Doe");
    addUserPage.setPhoneNumber("1234567890");
    addUserPage.setEmail("john.doe@example.com");
    addUserPage.clickCreateUserButton();

    // Verify success message
    addUserPage.verifyToastMessage("User Created Successfully");
  });

  it("Add User with invalid access level", () => {
    addUserPage.setFirstName("John");
    addUserPage.setLastName("Doe");
    addUserPage.setPhoneNumber("1234567890");
    addUserPage.setEmail("john.doe@example.com");
    addUserPage.selectAccessLevel(""); // Invalid or missing access level
    addUserPage.clickCreateUserButton();

    // Verify error message for invalid access level
    cy.contains("p", "Please select a valid access level").should("be.visible");
  });

  it("Add User with multiple instruments", () => {
    addUserPage.setFirstName("John");
    addUserPage.setLastName("Doe");
    addUserPage.setPhoneNumber("1234567890");
    addUserPage.setEmail("john.doe@example.com");
    addUserPage.selectInstruments("Piano");
    addUserPage.selectInstruments("Guitar");
    addUserPage.clickCreateUserButton();

    // Verify success message
    addUserPage.verifyToastMessage("User Created Successfully");
  });

  it("Add User with invalid gender selection", () => {
    addUserPage.setFirstName("John");
    addUserPage.setLastName("Doe");
    addUserPage.setPhoneNumber("1234567890");
    addUserPage.setEmail("john.doe@example.com");
    addUserPage.selectGender(""); // Invalid or missing gender
    addUserPage.clickCreateUserButton();

    // Verify error message for invalid gender selection
    cy.contains("p", "Please select a valid gender").should("be.visible");
  });

  it("Add User with all fields empty", () => {
    addUserPage.clickCreateUserButton();

    // Verify error messages for all required fields
    cy.contains("p", "First Name is required").should("be.visible");
    cy.contains("p", "Last Name is required").should("be.visible");
    cy.contains("p", "Email is required").should("be.visible");
    cy.contains("p", "Phone Number is required").should("be.visible");
  });

  it("Add User with invalid location", () => {
    addUserPage.setFirstName("John");
    addUserPage.setLastName("Doe");
    addUserPage.setPhoneNumber("1234567890");
    addUserPage.setEmail("john.doe@example.com");
    addUserPage.setLocation("Invalid@Location"); // Invalid location
    addUserPage.clickCreateUserButton();

    // Verify error message for invalid location
    cy.contains("p", "Please enter a valid location").should("be.visible");
  });

  it("Add User with international phone number", () => {
    addUserPage.setFirstName("John");
    addUserPage.setLastName("Doe");
    addUserPage.setPhoneNumber("+447911123456"); // International phone number
    addUserPage.setEmail("john.doe@example.com");
    addUserPage.clickCreateUserButton();

    // Verify success message
    addUserPage.verifyToastMessage("User Created Successfully");
  });

  it("Add User with all fields empty", () => {
    addUserPage.clickCreateUserButton();

    // Verify error messages for all required fields
    cy.contains("p", "First Name is required").should("be.visible");
    cy.contains("p", "Last Name is required").should("be.visible");
    cy.contains("p", "Email is required").should("be.visible");
    cy.contains("p", "Phone Number is required").should("be.visible");
  });
});
