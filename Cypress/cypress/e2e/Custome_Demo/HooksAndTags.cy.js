// This is Hooks
// before
// after
// beforeEach
// afterEach

// This is Tags
// skip
// only

describe("My test suite", () => {
  before(() => {
    cy.log("*****Launch App *****");
  });

  after(() => {
    cy.log("*****Close App *****");
  });

  beforeEach(() => {
    cy.log("*****Login****");
  });

  afterEach(() => {
    cy.log("***** Logout *****");
  });

  it("saarch", () => {
    cy.log("*****Searching*****");
  });

  it("advance search", () => {
    cy.log("*****Advance Searching*****");
  });

  it("listing product", () => {
    cy.log("*****Listing Product *****");
  });
});
