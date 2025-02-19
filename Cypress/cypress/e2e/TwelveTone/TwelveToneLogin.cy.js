describe("TwelveTone Login Test Cases", () => {
  // Login with Blank Fields and verify the error message
  it("Test Case 1:- Login Blank fields", () => {
    cy.visit("https://stage.schedulehub.io", { waitUntil: "domcontentloaded" });

    // // cy.get("._userInput1_8rox6_74").type("  "); // get locators with classname. type the text

    // // cy.get("._userInput_8rox6_65").type("  ");

    cy.get("._submitBtn_8rox6_99").click(); // get locators with classname and click the button

    cy.get(".Toastify__toast-body").contains("Email Required"); // get element, and varify the error text
  });

  // Login with valid email and blank password and verify the error message
  it("Test Case 2:- Login valid email blank password", () => {
    cy.visit("https://stage.schedulehub.io", { waitUntil: "domcontentloaded" });

    cy.get("._userInput1_8rox6_74").type("test@gmail.com"); // get locators with classname. type the text

    // // cy.get("._userInput_8rox6_65").type("  ");

    cy.get("._submitBtn_8rox6_99").click(); // get locators with classname and click the button

    cy.get(".Toastify__toast-body").contains("Password Required"); // get element, and varify the error text
  });

  // Login with blank email valid password and verify the error message
  it("Test Case 3:- Login blank email valid password", () => {
    cy.visit("https://stage.schedulehub.io", { waitUntil: "domcontentloaded" });

    cy.get("._userInput1_8rox6_74").type("test@gmail.com"); // get locators with classname. type the text

    // //cy.get("._userInput_8rox6_65").type("  ");

    cy.get("._submitBtn_8rox6_99").click(); // get locators with classname and click the button

    cy.get(".Toastify__toast-body").contains("Password Required"); // get element, and varify the error text
  });

  // Login with invalid email and valid paddword and verify the error message
  it("Test Case 4:- Login invalid Email", () => {
    cy.visit("https://stage.schedulehub.io", { waitUntil: "domcontentloaded" });

    cy.get("._userInput1_8rox6_74").type("test1@gmail.com"); // get locators with classname. type the text

    cy.get("._userInput_8rox6_65").type("123456");

    cy.get("._submitBtn_8rox6_99").click(); // get locators with classname and click the button

    cy.get(".Toastify__toast-body").contains("Invalid Email Address."); // get element, and varify the error text
  });

  // Login with invalid email and invalid password and verify the error message
  it("Test Case 5:- Login invalid Email and valid password", () => {
    cy.visit("https://stage.schedulehub.io", { waitUntil: "domcontentloaded" });

    cy.get("._userInput1_8rox6_74").type("test123@gmail.com"); // get locators with classname. type the text

    cy.get("._userInput_8rox6_65").type("12345678");

    cy.get("._submitBtn_8rox6_99").click(); // get locators with classname and click the button

    cy.get(".Toastify__toast-body").contains("Invalid Email Address."); // get element, and varify the error text
  });

  // Login with valid Creditionals and verify the error message
  it.only("Test Case 6:- Login valid-Cred", () => {
    cy.visit("https://stage.schedulehub.io", { waitUntil: "domcontentloaded" });

    cy.get("._userInput1_8rox6_74").type("test@gmail.com"); // get locators with classname. type the text

    cy.get("._userInput_8rox6_65").type("123456");

    cy.get("._submitBtn_8rox6_99").click(); // get locators with classname and click the button
  });
});
