describe("Handle Tables", () => {
  beforeEach("Login", () => {
    cy.visit("https://stage.schedulehub.io", { waitUntil: "domcontentloaded" });

    cy.get("._userInput1_8rox6_74").type("test@gmail.com"); // get locators with classname. type the text

    cy.get("._userInput_8rox6_65").type("123456");

    cy.get("._submitBtn_8rox6_99").click();
    cy.wait(5000);
  });

  it("Check no: Rows and column", () => {
    cy.get(
      "table[class='MuiTable-root MuiTable-stickyHeader css-lkld8c']>tbody>tr"
    ).should("have.length", "10");

    cy.get(
      "table[class='MuiTable-root MuiTable-stickyHeader css-lkld8c']>thead>tr>th"
    ).should("have.length", "9");
  });

  it.skip("Check cell Data from specfic row & column", () => {
    cy.wait(5000);
    cy.get(
      "table[class='MuiTable-root MuiTable-stickyHeader css-lkld8c']>tbody>tr:nth-child(2)>td:nth-child(5)"
    ).contains("ch.lkk@yopmail.com");
  });

  it.skip("Read all the rows & columns data in the first page", () => {
    cy.get(
      "table[class='MuiTable-root MuiTable-stickyHeader css-lkld8c']>tbody>tr"
    ).each(($row, index, $rows) => {
      cy.wrap($row).within(() => {
        cy.get("td").each(($col, index, $cols) => {
          cy.log($col.text());
        });
      });
    });
  });

  it.only("Pagination", () => {
    let totalPages = 20;
    for (let p = 1; p <= totalPages; p++) {
      if (totalPages > 1) {
        cy.log("Active Page:-" + p);
        cy.get(
          "ul[class='MuiPagination-ul css-nhb8h9']>li:nth-child(" + p + ")"
        ).click();
      }
    }
  });
});
