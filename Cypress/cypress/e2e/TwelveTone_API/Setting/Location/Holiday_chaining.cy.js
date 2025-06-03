describe("Holiday Chaining Concept: Add, Verify, Delete", () => {
  const email = "dev.12tone@yopmail.com";
  const password = "jXfNQ9g2o5sa";
  const uniqueHolidayName = `Holiday${Date.now()}`;
  const locationId = "6666a0b083c6ec5a88dbe997";
  const startDate = new Date().toISOString();
  let authToken = null;

  before("Login and get token", () => {
    cy.loginApi(email, password).then((response) => {
      expect(response.status).to.eq(200);
      authToken = response.body.data.token;
      expect(authToken).to.be.a("string").and.not.be.empty;
    });
  });

  it("should add a holiday, verify it in the list, then delete it", () => {
    // Step 1: Add Holiday
    cy.apiCreateHoliday(authToken, {
      name: uniqueHolidayName,
      location_id: locationId,
      start: startDate,
      end: startDate, // Add end if required by your API
    }).then((addResponse) => {
      expect(addResponse.status).to.eq(200);
      expect(addResponse.body).to.have.property(
        "data",
        "Holiday created successfully"
      );

      // Step 2: Get Holiday List and find the created holiday's _id
      cy.getHolidayList(authToken).then((listResponse) => {
        expect(listResponse.body).to.have.property("data").that.is.an("array");
        const createdHoliday = listResponse.body.data.find(
          (holiday) => holiday.name === uniqueHolidayName
        );
        expect(createdHoliday, "Created holiday is in the holiday list").to
          .exist;

        // Step 3: Delete the holiday using its _id
        cy.deleteHoliday(authToken, createdHoliday._id).then(
          (deleteResponse) => {
            expect(deleteResponse.status).to.eq(200);
            expect(deleteResponse.body).to.have.property(
              "message",
              "Deleted Successfully"
            );
          }
        );
      });
    });
  });
});
