describe("Try Login with Cutom and Data Driven", () => {
  it("Login test cases with Cutom command", () => {
    cy.visit("https://staging.topdriverdev.com/login"), cy.wait(2000);
    cy.loginapp("topdrivera@yopmail.com", "Password@123aa");
    // cy.get("._pageTitle_c2   qci_3").should("have.text", "Contacts ");
  });

  it("Login test cases with Cutom and single data driven", () => {
    cy.fixture("singleuser.json").then((data) => {
      cy.visit("https://staging.topdriverdev.com/login"), cy.wait(2000);
      cy.loginapp(data.email, data.password);
      // cy.get("._pageTitle_c2   qci_3").should("have.text", "Contacts ");
    });
  });

  it.only("Login test cases with Cutom and multiple data driven", () => {
    cy.fixture("multiuser.json").then((data) => {
      cy.visit("https://staging.topdriverdev.com/login"), cy.wait(2000);
      cy.loginapp(data.email, data.password);
      // cy.get("._pageTitle_c2   qci_3").should("have.text", "Contacts ");
    });
  });
});
