describe("TopDriver Login Test Cases", () => {
  it.only("Test case:- invlid email format", () => {
    cy.visit("https://staging.topdriverdev.com/login", {
      waitUntil: "domcontentloaded",
    });

    cy.get('input[name="email"]').type("himanshu@$##yopmail.com"); // get locators with classname. type the text
    cy.get("button[value='on']").click();
    cy.get(".login-button").click(); // get locators with classname and click the button

    cy.get(".error-message", { timeout: 5000 }) // Replace with actual selector (e.g., .tooltip, [data-cy="password-error"])
      .should("be.visible")
      .and(
        "contain.text",
        "A part following ‘@’ should not contain the symbol ‘#’"
      );
    // cy.get(".tooltip").should("be.visible").and("have.css", "display", "none");
  });

  // Login with Blank Fields and verify the error message
  it("Test Case 1:- Login Blank fields", () => {
    cy.visit("https://staging.topdriverdev.com/login", {
      waitUntil: "domcontentloaded",
    });

    // // cy.get('input[name="email"]').type("  "); // get locators with classname. type the text

    // // cy.get('input[name="password"]').type("  ");
    cy.wait(2000);
    cy.get("button[value='on']").click();

    cy.get(".login-button").click(); // get locators with classname and click the button
    cy.contains(
      "p",
      "Something went wrong! Please check your email or password."
    ).should("be.visible");
  });

  // Login with valid email and blank password and verify the error message
  it("Test Case 2:- Login valid email blank password", () => {
    cy.visit("https://staging.topdriverdev.com/login", {
      waitUntil: "domcontentloaded",
    });

    cy.get('input[name="email"]').type("topdrivera@yopmail.com"); // get locators with classname. type the text

    // // cy.get('input[name="password"]').type("  ");
    cy.wait(2000);
    cy.get("button[value='on']").click();

    cy.get(".login-button").click(); // get locators with classname and click the button

    cy.contains(
      "p",
      "Something went wrong! Please check your email or password."
    ).should("be.visible");
  });

  // Login with blank email valid password and verify the error message
  it("Test Case 3:- Login blank email valid password", () => {
    cy.visit("https://staging.topdriverdev.com/login", {
      waitUntil: "domcontentloaded",
    });

    // cy.get('input[name="email"]').type("topdrivera@yopmail.com"); // get locators with classname. type the text

    cy.get('input[name="password"]').type("Password@123admin");
    cy.wait(2000);
    cy.get("button[value='on']").click();

    cy.get(".login-button").click(); // get locators with classname and click the button

    cy.contains(
      "p",
      "Something went wrong! Please check your email or password."
    ).should("be.visible");
  });

  // Login with invalid email and valid paddword and verify the error message
  it("Test Case 4:- Login invalid Email", () => {
    cy.visit("https://staging.topdriverdev.com/login", {
      waitUntil: "domcontentloaded",
    });

    cy.get('input[name="email"]').type("test1@gmail.com"); // get locators with classname. type the text

    cy.get('input[name="password"]').type("Password@123admin");
    cy.get("button[value='on']").click();

    cy.wait(2000);
    cy.get(".login-button").click(); // Click the login button

    cy.contains("Login failed").should("be.visible");
  });

  // Login with invalid email and invalid password and verify the error message
  it("Test Case 5:- Login invalid Email and valid password", () => {
    cy.visit("https://staging.topdriverdev.com/login", {
      waitUntil: "domcontentloaded",
    });

    cy.get('input[name="email"]').type("test123@gmail.com"); // get locators with classname. type the text

    cy.get('input[name="password"]').type("Password@123admin");
    cy.get("button[value='on']").click();

    cy.wait(2000);
    cy.get(".login-button").click(); // Click the login button

    cy.contains("Login failed").should("be.visible");
  });

  // Login with valid Creditionals and verify the error message
  it("Test Case 6:- Login valid-Cred", () => {
    cy.visit("https://staging.topdriverdev.com/login", {
      waitUntil: "domcontentloaded",
    });

    cy.get('input[name="email"]').type("topdrivera@yopmail.com"); // get locators with classname. type the text

    cy.get('input[name="password"]').type("Password@123aa");
    cy.get("button[value='on']").click();

    cy.wait(2000);

    cy.get(".login-button").click(); // get locators with classname and click the button

    cy.wait(7000);

    cy.url().should("include", "/settings/users");
  });
});
