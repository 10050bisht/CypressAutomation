describe("MyTestSuite", () => {
  it("Data Driven Test", () => {
    cy.fixture("multiUserdata.json").then((data) => {
      cy.visit(
        "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
      );

      data.forEach((userdata) => {
        cy.get("input[placeholder='Username']").type(userdata.username);
        cy.get("input[placeholder='Password']").type(userdata.password);
        cy.get("button[type='submit']").click();
        cy.wait(3000);

        if (userdata.username === "Admin" && userdata.password === "admin123") {
          cy.get(
            ".oxd-text.oxd-text--h6.oxd-topbar-header-breadcrumb-module"
          ).should("have.text", userdata.expected);

          cy.get(".oxd-userdropdown-tab > .oxd-icon").click();
          cy.get(":nth-child(4) > .oxd-userdropdown-link").click();
          cy.wait(3000);
        } else {
          cy.get(".oxd-text.oxd-text--p.oxd-alert-content-text").should(
            "have.text",
            userdata.expected
          );
        }
      });
    });
  });
});
