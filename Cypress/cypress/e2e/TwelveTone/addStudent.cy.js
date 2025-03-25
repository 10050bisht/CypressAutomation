import LoginPage from "../../PageObject/LoginPage";
import AddStudentPage from "../../PageObject/AddStudentPage";
describe("Add Student file", () => {
  const loginPage = new LoginPage();
  const AddStudentPage = new AddStudentPage();

  it("Create Contact", function () {
    // Login
    cy.visit("https://stage.schedulehub.io");
    loginPage.setUsername("test@gmail.com");
    loginPage.setPassword("123456");
    loginPage.clickSubmit();
    cy.get(".Toastify__toast-body > :nth-child(2)").click();

    // Add Client
    AddStudentPage.clickAddClientButton();
    AddStudentPage.setFirstName("aman");
    AddStudentPage.setLastName("sharma");
    cy.wait(4000);
    AddStudentPage.setPhoneNumber("7896542355");
    AddStudentPage.selectPhoneType("cell");
    AddStudentPage.setEmail("john2341@yopmail.com");
    AddStudentPage.selectLeadType("Online");
    AddStudentPage.selectMedium("Facebook");
    AddStudentPage.ClickButton();

    // Verify error message
    cy.wait(4000);
    AddStudentPage.verifyEmailAlreadyExistsMessage();
  });
});
