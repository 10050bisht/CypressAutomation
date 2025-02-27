describe("Custom Commands", () => {
  it.only("Handling Links", () => {
    cy.visit("https://www.twelvetonemusicschool.com/");
    cy.get(".copyright-text").scrollIntoView({
      duration: 2000,
    });
    cy.wait(3000);

    //Direct --without using custom commands
    // cy.get("#menu-item-1170").click();

    // using custom command
    cy.clickevent("Blog"); // cy.clickLink("Blog");
    cy.wait(2000);
    cy.get("div[class='banner-content'] h1").should("have.text", "Blog");
  });

  it.skip("Over writing existing contains commands", () => {});
});
