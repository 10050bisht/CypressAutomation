describe("Custom Commands", () => {
  it("Handling Links", () => {
    cy.visit("https://www.twelvetonemusicschool.com/");
    cy.get(".copyright-text").scrollIntoView({
      duration: 2000,
    });
    cy.wait(3000);

    //Direct --without using custom commands
    // cy.get("#menu-item-1170").click();

    // using custom command
    cy.clickevent("Blog");
    cy.wait(2000);
    cy.get("div[class='banner-content'] h1").should("have.text", "Blog");
  });

  it.only("Over writing existing contains commands", () => {
    cy.visit("https://www.twelvetonemusicschool.com/");
    cy.get(".copyright-text").scrollIntoView({
      duration: 2000,
    });
    cy.wait(3000);

    //Direct --without using custom commands
    // cy.get("#menu-item-1170").click();

    // using custom command
    cy.clickevent("BLOG");
    cy.wait(2000);
    cy.get("div[class='banner-content'] h1").should("have.text", "Blog");
  });

  it("Log Command", () => {
    cy.visit("https://stage.schedulehub.io/#/");

    cy.loginapp("test@gmail.com", "123456");
    cy.get("._pageTitle_c2qci_3").should("have.text", "Contacts ");
  });
});
