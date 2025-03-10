describe("Wordpress form testing", () => {
  it("Test honyport", () => {
    cy.visit("https://www.twelvetonemusicschool.com/littletones");
    cy.wait(2000);
    cy.get("#parent_fname").type("Himanshu");
    cy.wait(2000);

    cy.get("#parent_lname").type("Bisht");
    cy.wait(2000);

    cy.get("#your_email").type("himanshu@yopmail.com");
    cy.wait(2000);

    cy.get(
      "#wpcf7-f1424-o1 > .wpcf7-form > .row > :nth-child(4) > .form-group > p > .wpcf7-form-control-wrap > .intl-tel-input > .wpcf7-form-control"
    ).type("+19879878987");
    cy.wait(2000);
    cy.get("input[value='Secure Your Spot']").click();
  });
});
