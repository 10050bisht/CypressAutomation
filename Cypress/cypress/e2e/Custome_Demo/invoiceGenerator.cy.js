describe("Invoice Generator", () => {
  it("create invoice", () => {
    cy.visit("https://www.invoicesimple.com/invoice-generator");
    cy.get(".pb-6 > .px-5").click();
    cy.wait(5000);

    cy.get("#company-name").type("UIUX");

    cy.get("#client-name").type("Top Driver");

    cy.get("#company-name").type("uiuxstudio.com");
  });

  
});
