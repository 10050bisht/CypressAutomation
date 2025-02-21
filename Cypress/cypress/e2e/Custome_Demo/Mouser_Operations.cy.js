import "cypress-iframe";
require("@4tw/cypress-drag-drop");
describe("Handle Tables", () => {
  it("MouseHover ", () => {
    //Mouse Hover action
    cy.visit("https://demo.opencart.com/");

    cy.get(
      "ul[class='nav navbar-nav']>li:first-child>div>div>ul>li:last-child"
    ).should("not.be.visible");

    cy.get("ul[class='nav navbar-nav']>li:first-child")
      .trigger("mouseover")
      .click();

    cy.get(
      "ul[class='nav navbar-nav']>li:first-child>div>div>ul>li:last-child"
    ).should("be.visible");
  });

  it("Right Click", () => {
    //Right click by mouse
    cy.visit("https://swisnl.github.io/jQuery-contextMenu/demo.html");

    // Approach 1
    // cy.get(".context-menu-one").trigger("contextmenu");
    // cy.get(".context-menu-icon-copy").should("be.visible");

    // Approach 2
    cy.get(".context-menu-one").rightclick();
    cy.get(".context-menu-icon-copy").should("be.visible");
  });

  it("Double Click", () => {
    // Double click
    cy.visit(
      "https://www.w3schools.com/Tags/tryit.asp?filename=tryhtml5_ev_ondblclick"
    );
    cy.frameLoaded("#iframeResult");
    cy.wait(2000);
    // Approach 1- Trigger
    // cy.iframe("#iframeResult")
    //   .find("button[ondblclick='myFunction()']")
    //   .trigger("dblclick");
    // cy.iframe("#iframeResult")
    //   .contains("p", "Hello World")
    //   .should("be.visible");

    // Approach 2- dbclick
    cy.iframe("#iframeResult")
      .find("button[ondblclick='myFunction()']")
      .dblclick();
    cy.iframe("#iframeResult")
      .contains("p", "Hello World")
      .should("be.visible");
  });

  it("Drag and Drop using Plugin", () => {
    // Drag & Drop using plug in
    cy.visit(
      "http://www.dhtmlgoodies.com/scripts/drag-drop-custom/demo-drag-drop-3.html"
    );

    cy.get("#box7").should("be.visible");
    cy.get("#box106").should("be.visible");
    cy.wait(3000);
    cy.get("#box7").drag("#box106", { force: true });
  });

  it.only("Scrolling Page", () => {
    cy.visit("https://www.worldometers.info/geography/flags-of-the-world");
    cy.get("img[src='/img/flags/small/tn_in-flag.gif']").scrollIntoView({
      duration: 2000,
    });
    cy.get("img[src='/img/flags/small/tn_in-flag.gif']").should("be.visible");

    cy.get(".footerlinks").scrollIntoView({
      duration: 2000,
      
    });
  });
});
