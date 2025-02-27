describe("Twelve Tone Login -- Daa Driven", () => {
  it("Login", () => {
    cy.fixture("TwelveTone_login.json").then((data) => {
      cy.visit("https://stage.schedulehub.io");

      data.forEach((userdata) => {
        cy.get("._userInput1_8rox6_74").clear();
        cy.get("._userInput1_8rox6_74").type(userdata.email); // get locators with classname. type the text

        cy.get("._userInput_8rox6_65").clear();
        cy.get("._userInput_8rox6_65").type(userdata.password);

        cy.get("._submitBtn_8rox6_99").click();

        cy.wait(5000);

        if (
          userdata.email === "test@gmail.com" &&
          userdata.password === "123456"
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
