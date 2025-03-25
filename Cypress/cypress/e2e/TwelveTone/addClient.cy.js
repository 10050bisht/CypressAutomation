import LoginPage from "../../PageObject/LoginPage";
import AddClientPage from "../../PageObject/AddClientPage";

describe("Add Contact Test cases", () => {
  const loginPage = new LoginPage();
  const addClientPage = new AddClientPage();

  beforeEach(() => {
    // Login before each test
    cy.visit("https://stage.schedulehub.io");
    loginPage.setUsername("test@gmail.com");
    loginPage.setPassword("123456");
    loginPage.clickSubmit();
    cy.wait(5000);
    addClientPage.clickAddContactButton();
  });

  it("Add Contact with invalid email format", () => {
    cy.wait(3000);
    addClientPage.setEmail("johnyopmail.com");
    addClientPage.clickAddClientButton();
    addClientPage.verifyErrorMessage("p", "Please enter a valid email address");
  });

  it("Verify error message for blank fields", () => {
    cy.wait(5000);
    addClientPage.clickAddClientButton();
    addClientPage.verifyErrorMessage("p", "This is required field"); // First and Last Name
    addClientPage.verifyErrorMessage("p", "Please enter a valid phone number"); // Phone Number
    addClientPage.verifyErrorMessage("p", "Please enter a valid email address"); // Email
  });

  it("Add Contact with already added email", () => {
    cy.wait(5000);
    addClientPage.setFirstName("John");
    addClientPage.setLastName("Doe");
    addClientPage.setPhoneNumber("9876789876");
    addClientPage.selectPhoneType("cell");
    addClientPage.setEmail("john@yopmail.com");
    addClientPage.selectLeadType("Online");
    addClientPage.selectMedium("Youtube");
    addClientPage.clickAddClientButton();
    addClientPage.verifyToastMessage("Email already exists");
  });

  it("Add Contact with invalid phone number", () => {
    cy.wait(5000);
    addClientPage.setFirstName("John");
    addClientPage.setLastName("Doe");
    addClientPage.setPhoneNumber("(987) 678-9876"); // Invalid phone number
    addClientPage.selectPhoneType("cell");
    addClientPage.setEmail("john231@yopmail.com"); // Unique email
    addClientPage.selectLeadType("Online");
    addClientPage.selectMedium("Youtube");
    addClientPage.clickAddClientButton();
    addClientPage.verifyToastMessage(
      "Please enter a valid phone number,A contact already exists for this number."
    );
  });

  it.skip("Add Contact with valid data", () => {
    cy.wait(5000);
    addClientPage.setFirstName("John");
    addClientPage.setLastName("Doe");
    addClientPage.setPhoneNumber("3132108690"); // Valid phone number
    addClientPage.selectPhoneType("cell");
    addClientPage.setEmail("test4Johan@yopmail.com"); // Unique email
    addClientPage.selectLeadType("Online");
    addClientPage.selectMedium("Youtube");
    addClientPage.clickAddClientButton();
    addClientPage.verifyToastMessage("Lead Created Successfully");
  });
});
