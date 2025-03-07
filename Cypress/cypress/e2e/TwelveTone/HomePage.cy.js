describe("Clients Count", () => {
  beforeEach(() => {
    cy.visit("https://stage.schedulehub.io"); // Runs before each test
    cy.loginapp("test@gmail.com", "123456"); // Custom login command
  });
  it("should display the client list", () => {
    cy.wait(5000);
    cy.get("table").should("be.visible");

    // Ensure at least one row exists in the table
    cy.get("tbody tr").should("have.length.greaterThan", 0);
  });

  it("should verify each client row contains all required details", () => {
    cy.wait(5000);

    cy.get("tbody tr").each(($row) => {
      cy.wrap($row).within(() => {
        cy.get("td").eq(0).should("not.be.empty"); // Client Name
        cy.get("td")
          .eq(1)
          .invoke("text")
          .should("match", /^[\d()\-\s+]+$/); // Phone Number is numeric
        cy.get("td").eq(3).should("not.be.empty"); // Status is present
        cy.get("td")
          .eq(4)
          .invoke("text")
          .should("match", /^[\w.-]+@[a-zA-Z_-]+?\.[a-zA-Z]{2,}$/); // Valid Email
        cy.get("td").eq(8).should("not.be.empty"); // Creation Date is present
      });
    });
  });

  it("should navigate through client pages", () => {
    cy.get('button[aria-label="Go to next page"]').should("be.visible").click();

    // Verify that Page 2 is now highlighted
    cy.get(".MuiPaginationItem-root.Mui-selected") // Adjust selector if needed
      .should("contain.text", "2");
  });

  it("should search for a client by name", () => {
    cy.get("input[placeholder='Search']").type("Uiux Test{enter}");

    cy.get("tbody tr").should("have.length", 1); // Expect only 1 result
    cy.contains("td", "Uiux Test").should("be.visible"); // Verify name appears
  });

  it("Status Visiblity ", () => {
    cy.wait(4000);

    cy.get("td")
      .eq(3)
      .invoke("text")
      .should(
        "match",
        /Lead|Active|MSD Trial|SCH Trial|Att Trial|Dropped|Cold|Dead/
      );
  });

  it.only("should open client details when clicking on a client name", () => {
    cy.wait(5000);
    cy.get("tbody tr td") // Ensure the selector targets the correct link
      .first()
      .invoke("removeAttr", "target") // Remove target="_blank" to open in the same tab
      .click();
    cy.wait(5000);

    // Verify the new page loads correctly
    // cy.url().should("include", "/contacts/view-client?id="); // Check URL contains client ID
    cy.get("h6").should("contain.text", "Schedule"); // Verify page content
  });
});
