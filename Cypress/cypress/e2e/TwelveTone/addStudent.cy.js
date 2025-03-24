import LoginPage from "../../PageObject/LoginPage";
import AddClientPage from "../../PageObject/AddClientPage";

describe("Add Student file", () => {
  const loginPage = new LoginPage();
  const addClientPage = new AddClientPage();

  it("Create Contact", function () {
    // Login
    cy.visit("https://stage.schedulehub.io");
    loginPage.setUsername("test@gmail.com");
    loginPage.setPassword("123456");
    loginPage.clickSubmit();
    cy.get(".Toastify__toast-body > :nth-child(2)").click();

    // Add Client
    addClientPage.clickAddClientButton();
    addClientPage.setFirstName("aman");
    addClientPage.setLastName("sharma");
    cy.wait(4000);
    addClientPage.setPhoneNumber("7896542355");
    addClientPage.selectPhoneType("cell");
    addClientPage.setEmail("john2341@yopmail.com");
    addClientPage.selectLeadType("Online");
    addClientPage.selectMedium("Facebook");
    addClientPage.ClickButton();

    // Verify error message
    cy.wait(4000);
    addClientPage.verifyEmailAlreadyExistsMessage();
  });
});
