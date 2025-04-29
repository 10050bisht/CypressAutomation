import LoginPage from "../../PageObject/LoginPage";
import AddStudentPage from "../../PageObject/AddStudentPage";
describe("Add Student file", () => {
  const loginPage = new LoginPage();
  const StudentPage = new AddStudentPage();

  it("Create Contact", function () {
    // Login
    cy.visit("https://stage.schedulehub.io");
    loginPage.setUsername("test@gmail.com");
    loginPage.setPassword("123456");
    loginPage.clickSubmit();
    cy.get(".Toastify__toast-body > :nth-child(2)").click();

    // Add Client
    StudentPage.clickAddClientButton();
    StudentPage.setFirstName("aman");
    StudentPage.setLastName("sharma");
    cy.wait(4000);
    StudentPage.setPhoneNumber("7896542355");
    StudentPage.selectPhoneType("cell");
    StudentPage.setEmail("john2341@yopmail.com");
    StudentPage.selectLeadType("Online");
    StudentPage.selectMedium("Facebook");
    StudentPage.ClickButton();

    // Verify error message
    cy.wait(4000);
    StudentPage.verifyEmailAlreadyExistsMessage();
  });
});
