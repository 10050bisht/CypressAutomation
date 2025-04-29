import AddClientPage from "../../PageObject/AddClientPage";

describe("Add Contact Test cases", () => {
  const addClientPage = new AddClientPage();

  beforeEach(() => {
    // Use the custom login command
    cy.loginapp("dev.12tone@yopmail.com", "jXfNQ9g2o5sa");
    cy.wait(5000);
    // addClientPage.clickAddContactButton();
  });

  it("Add Contact with invalid email format", () => {
    addClientPage.clickAddContactButton();
    addClientPage.setEmail("johnyopmail.com");
    addClientPage.clickAddClientButton();
    addClientPage.verifyErrorMessage("p", "Please enter a valid email address");
  });

  it("Verify error message for blank fields", () => {
    addClientPage.clickAddContactButton();
    addClientPage.clickAddClientButton();
    addClientPage.verifyErrorMessage("p", "This is required field"); // First and Last Name
    addClientPage.verifyErrorMessage("p", "Please enter a valid phone number"); // Phone Number
    addClientPage.verifyErrorMessage("p", "Please enter a valid email address"); // Email
  });

  it("Add Contact with already added email", () => {
    addClientPage.clickAddContactButton();
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
    addClientPage.clickAddContactButton();
    addClientPage.setFirstName("John");
    addClientPage.setLastName("Doe");
    addClientPage.setPhoneNumber("987 678-9"); // Invalid phone number
    addClientPage.selectPhoneType("cell");
    addClientPage.setEmail("john231@yopmail.com"); // Unique email
    addClientPage.selectLeadType("Online");
    addClientPage.selectMedium("Youtube");
    addClientPage.clickAddClientButton();
    addClientPage.verifyToastMessage("Please enter a valid phone number");
  });

  it.only("Add Contact with valid data", () => {
    addClientPage.clickAddContactButton();
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
