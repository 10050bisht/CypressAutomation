describe("Title verify ", () => {
  it("Verify Title Positive", () => {
    cy.visit("https://stage.schedulehub.io");
    cy.title().should("eq", "Twelve Tone");
  });

  it("Verify Title Negative", () => {
    cy.visit("https://stage.schedulehub.io");
    cy.title().should("eq", "Twelve Tone12");
  });
});
