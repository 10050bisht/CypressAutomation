describe("Active Student Count - Lesson Schedule", () => {
  let totalSum = 0;
  const maxDays = 30;
  const totalWeeks = 4;
  let weekCount = 0; // Tracks weeks with students

  before(() => {
    cy.visit("https://stage.schedulehub.io/");
    cy.viewport(1280, 720);

    // Login
    cy.get('input[name="email"]').type("test@gmail.com");
    cy.get('input[name="password"]').type("123456");
    cy.get("button._submitBtn_8rox6_99").click();

    cy.wait(6000);

    // Navigate to Lesson Schedule
    cy.contains("Schedule").click();
    cy.contains("Lesson Schedule").click();

    cy.wait(6000);
  });

  it("Counts unique active students per week", () => {
    for (let week = 0; week < totalWeeks; week++) {
      let weeklySum = 0;
      let weeklyUniqueStudents = new Set(); // Store unique students per week

      for (
        let day = 1 + week * 7;
        day <= Math.min((week + 1) * 7, maxDays);
        day++
      ) {
        // Open calendar and select the day
        cy.get("button[class*='MuiIconButton-root']").click();
        cy.wait(3000);

        cy.get("button.MuiPickersDay-root")
          .contains(day)
          .click({ multiple: true });
        cy.wait(3000);

        // Extract unique student names
        cy.get("p:contains('yrs')").then(($elements) => {
          if ($elements.length > 0) {
            $elements.each((index, el) => {
              weeklyUniqueStudents.add(Cypress.$(el).text().trim());
            });
            cy.log(
              `Unique Student Count on Day ${day}: ${weeklyUniqueStudents.size}`
            );
          } else {
            cy.log(`No students found on Day ${day}. Skipping...`);
          }
        });
      }

      weeklySum = weeklyUniqueStudents.size;
      if (weeklySum > 0) {
        weekCount++;
      }
      totalSum += weeklySum;

      cy.log(`Total Unique Active Students in Week ${week + 1}: ${weeklySum}`);
    }
  });

  after(() => {
    const averageWeeklyStudents =
      weekCount > 0 ? (totalSum / weekCount).toFixed(2) : 0;
    cy.log(`Total Unique Active Students in the Month: ${totalSum}`);
    cy.log(`Average Unique Students Per Week: ${averageWeeklyStudents}`);
  });
});
