describe("Twelve Tone Login -- Data Driven", () => {
  it("Login", () => {
    cy.fixture("TwelveTone_login.json").then((data) => {
      data.forEach((userdata) => {
        cy.loginapp(userdata.email, userdata.password); // Use the custom login command

        cy.wait(5000);

        if (
          userdata.email === "dev.12tone@yopmail.com" &&
          userdata.password === "jXfNQ9g2o5sa"
        ) {
          cy.get(".Toastify__toast-body > :nth-child(2)").should(
            "have.text",
            userdata.expected
          );
          cy.wait(4000);

          cy.get("._arrowIcon_1oz59_121").click();
          cy.get("li[role='menuitem']").click();
        } else {
          cy.get("div[role='alert'] div:nth-child(2)").should(
            "have.text",
            userdata.expected
          );
        }
      });
    });
  });
});
