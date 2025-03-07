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

  // it.only("should open client details when clicking on a client name", () => {
  //   cy.wait(5000);
  //   cy.get("tbody tr td ") // Adjust selector for the client details link
  //     .eq(9) // Select the first client entry
  //     .then(($link) => {
  //       const dynamicUrl = $link.attr("contacts/view-client?id="); // Extract the dynamic URL
  //       cy.visit(dynamicUrl); // Manually visit the new tab's URL
  //     });

  //   // Verify that the new page loaded correctly
  //   cy.url().should("include", "/contacts/view-client?id="); // Check if it's a client details page
  //   cy.get("h1").should("contain.text", "Client Profile");
  // });
  it("should display all status tabs", () => {
    cy.wait(5000);

    const expectedTabs = [
      "All",
      "Leads",
      "Scheduled Trials",
      "Missed Trials",
      "Attended Trials",
      "Active Customers",
      "Dropped",
      "Cold Lead",
      "Dead Lead",
    ]; // Adjust based on actual tabs

    expectedTabs.forEach((tab) => {
      cy.contains(".MuiStack-root._tab_11xqe_3.css-uj3fkh", tab).should(
        "be.visible"
      ); // Ensure each tab exists
    });
  });

  it.only("should update the client list when switching tabs", () => {
    cy.wait(5000);
    // cy.get(".MuiStack-root._tab_11xqe_3.css-uj3fkh>p:nth-child(6)").click(); // Click 'Active' tab

    // cy.contains("Active Customers");

    cy.get(".MuiStack-root._tab_11xqe_3.css-uj3fkh p") // Select all tabs
      .contains("Active") // Find the tab that contains 'Active'
      .should("be.visible") // Ensure the tab is visible
      .click(); // Click the 'Active' tab

    cy.wait(5000);

    // Verify that the page updates after clicking
    cy.contains("Active Customers").should("be.visible");

    cy.get("td")
      .eq(3)
      .invoke("text")
      .should("match", /Active/);
  });
});

// 3️⃣ Verify Default Tab Selection
// 📌 Ensure the correct tab is selected by default on page load.

// javascript
// Copy
// Edit
// it("should load with the correct default tab selected", () => {
//   cy.visit("/dashboard");

//   cy.get(".tab-selector.active").should("contain.text", "Lead"); // Adjust default tab if needed
// });
// ✅ Passes If: The correct tab is highlighted by default.
// ❌ Fails If: A different tab is selected initially.

// 4️⃣ Verify Pagination Works in Each Tab
// 📌 Ensure pagination correctly updates data per tab.

// javascript
// Copy
// Edit
// it("should navigate through pages within a tab", () => {
//   cy.visit("/dashboard");

//   cy.contains(".tab-selector", "MSD Trial").click(); // Switch to MSD Trial tab

//   cy.get('button[aria-label="Go to next page"]').click(); // Click Next Page

//   cy.get(".tab-selector.active").should("contain.text", "MSD Trial"); // Verify tab remains selected
// });
// ✅ Passes If: Clicking pagination keeps the user within the same tab.
// ❌ Fails If: Page navigation resets the tab selection.

// 5️⃣ Verify No Data Message for Empty Tabs
// 📌 If a tab has no clients, show a "No Data Found" message.

// javascript
// Copy
// Edit
// it("should display 'No Data Found' when a tab has no clients", () => {
//   cy.visit("/dashboard");

//   cy.contains(".tab-selector", "Completed").click(); // Switch to Completed tab

//   cy.get("tbody tr").should("have.length", 0); // Ensure no clients are listed
//   cy.contains("No Data Found").should("be.visible"); // Check for empty state message
// });
// ✅ Passes If: "No Data Found" appears when no clients exist.
// ❌ Fails If: The message is missing when the list is empty.

// 6️⃣ Verify Status Count Updates Correctly
// 📌 Ensure the number of clients in each tab matches the displayed count.

// javascript
// Copy
// Edit
// it("should match the displayed count for each tab", () => {
//   cy.visit("/dashboard");

//   cy.contains(".tab-selector", "Active").then(($tab) => {
//     const expectedCount = parseInt($tab.find(".count").text(), 10); // Extract count from tab
//     cy.wrap($tab).click(); // Click the tab

//     cy.get("tbody tr").should("have.length", expectedCount); // Compare count with actual list
//   });
// });
