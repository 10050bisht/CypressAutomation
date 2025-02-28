// import LoginPage from "../../PageObject/LoginPage.js";
import LoginPage from "../../PageObject/Loginpage2.js";
describe("Login with Page Object", () => {
  it("Login Test ", () => {
    // General Approach
    cy.visit("https://stage.schedulehub.io", { waitUntil: "domcontentloaded" });
    cy.get("._userInput1_8rox6_74").type("test@gmail.com"); // get locators with classname. type the text
    cy.get("._userInput_8rox6_65").type("123456");
    cy.get("._submitBtn_8rox6_99").click();
    cy.wait(5000);
    cy.get("._pageTitle_c2qci_3").should("have.text", "Contacts ");
  });

  //Page object model

  it("Login Test by normal POM", () => {
    cy.visit("https://stage.schedulehub.io", { waitUntil: "domcontentloaded" });

    const ln = new LoginPage();
    ln.setEmail("test@gmail.com");
    ln.setPassword("123456");
    ln.clickSubmit();
    ln.verifylogin();
  });

  //   Using POM and Fixture
  it.only("Login Test by POM and fixture", () => {
    cy.visit("https://stage.schedulehub.io", { waitUntil: "domcontentloaded" });

    cy.fixture("twelveTonelogin.json").then((data) => {
      const ln = new LoginPage();
      ln.setEmail(data.email);
      ln.setPassword(data.password);
      ln.clickSubmit();
      cy.wait(5000);
      ln.verifylogin();
    });
  });
});
