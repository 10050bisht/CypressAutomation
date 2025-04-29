import LoginPage from "../../PageObject/LoginPage";
import AddStudentPage from "../../PageObject/AddStudentPage";
describe("Add Student file", () => {
  const loginPage = new LoginPage();
  const StudentPage = new AddStudentPage();
  beforeEach(() => {
    // Use the custom login command
    cy.loginapp("dev.12tone@yopmail.com", "jXfNQ9g2o5sa");
    cy.wait(5000);
  });

  it("Create Contact", function () {
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
