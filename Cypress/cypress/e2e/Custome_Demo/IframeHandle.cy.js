describe("Handling Iframes", () => {
  it("approach-1", () => {
    cy.visit("https://practice-automation.com/iframes/");
    cy.viewport(1280, 720);

    cy.wait(3000);

    const iframe = cy
      .get("#iframe-1")
      .its("0.contentDocument.body")
      .should("be.visible")
      .then(cy.wrap);
    iframe.clear()
  });
});
