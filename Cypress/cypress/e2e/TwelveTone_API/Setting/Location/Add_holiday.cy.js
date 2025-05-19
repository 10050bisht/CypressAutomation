describe("Add Holiday API - Positive and Negative Cases", () => {
  const email = "dev.12tone@yopmail.com";
  const password = "jXfNQ9g2o5sa";
  let authToken = null;

  before("Login and get token", () => {
    cy.loginApi(email, password).then((response) => {
      expect(response.status).to.eq(200);
      authToken = response.body.data.token; // Store the token for later use
      expect(authToken).to.be.a("string").and.not.be.empty;
    });
  });

  it("TC001;- should fail go to next step to with missing required field", () => {
    //Test case Passed

    cy.apiCreateHoliday(authToken, {}).then((response) => {
      expect(response.body).to.have.property(
        "message",
        "name is required field"
      );
      expect(response.status).to.eq(400);
    });
  });
  it("TC002:- should fail go to next step to with blank name", () => {
    //Test case Passes

    cy.apiCreateHoliday(authToken, {
      name: "",
    }).then((response) => {
      expect(response.body).to.have.property(
        "message",
        '"name" is not allowed to be empty'
      );
      expect(response.status).to.eq(400);
    });
  });

  it("TC003:- should fail go to next step to with invalid name", () => {
    //Test case failed beacause of the message is mismatched

    cy.apiCreateHoliday(authToken, {
      name: "holiday@123",
    }).then((response) => {
      expect(response.body).to.have.property(
        "message",
        '"name" must be a valid string'
      );
      expect(response.status).to.eq(400);
    });
  });

  it("TC004:- should go to next step to create holiday with Valid name ", () =>
    //Test case Failed beacause of the Status code is mismatched

    cy
      .apiCreateHoliday(authToken, {
        name: "holiday",
      })
      .then((response) => {
        expect(response.body).to.have.property(
          "message",
          "location_id is required field"
        );
        expect(response.status).to.eq(400);
      }));

  it("TC005:- should failed to go to next step to create holiday with Blank start Date ", () =>
    //Test case Passed
    cy
      .apiCreateHoliday(authToken, {
        name: "holiday",
        location_id: "",
      })
      .then((response) => {
        expect(response.body).to.have.property(
          "message",
          '"location_id" is not allowed to be empty'
        );
        expect(response.status).to.eq(400);
      }));

  it("TC006:- should failed to go to next step to create holiday with Blank location id  ", () =>
    //Test case Passed
    cy
      .apiCreateHoliday(authToken, {
        name: "holiday",
        location_id: "",
      })
      .then((response) => {
        expect(response.body).to.have.property(
          "message",
          '"location_id" is not allowed to be empty'
        );
        expect(response.status).to.eq(400);
      }));

  it("TC007:- should failed to go to next step to create holiday with invalid location id ", () =>
    //Test case Passed
    cy
      .apiCreateHoliday(authToken, {
        name: "holiday",
        location_id: "12345678wqe90",
      })
      .then((response) => {
        expect(response.body).to.have.property(
          "message",
          "Invalid format for location_id"
        );
        expect(response.status).to.eq(400);
      }));

  it("TC008:- should go to next step to create holiday with valid location id ", () =>
    //Test case Passed
    cy
      .apiCreateHoliday(authToken, {
        name: "holiday",
        location_id: "64f1a0b2c4d3e4f5a6b7c8d9",
      })
      .then((response) => {
        expect(response.body).to.have.property(
          "message",
          "start is required field"
        );
        expect(response.status).to.eq(400);
      }));

  it("TC009:- should failed to go to next step to create holiday with blank start date ", () =>
    //Test case Passed
    cy
      .apiCreateHoliday(authToken, {
        name: "holiday",
        location_id: "64f1a0b2c4d3e4f5a6b7c8d9",
        start: "",
      })
      .then((response) => {
        expect(response.body).to.have.property(
          "message",
          '"start" must be a valid date'
        );
        expect(response.status).to.eq(400);
      }));

  it("TC010:- should failed to go to next step to create holiday with invalid start date ", () =>
    //Test case Passed
    cy
      .apiCreateHoliday(authToken, {
        name: "holiday",
        location_id: "64f1a0b2c4d3e4f5a6b7c8d9",
        start: "2025-10-10sdfsd",
      })
      .then((response) => {
        expect(response.body).to.have.property(
          "message",
          '"start" must be a valid date'
        );
        expect(response.status).to.eq(400);
      }));

  it("TC011:- should go to next step to create holiday with invalid start date format", () =>
    //Test case failed beacuse of the message is mismatched
    cy
      .apiCreateHoliday(authToken, {
        name: "holiday",
        location_id: "64f1a0b2c4d3e4f5a6b7c8d9",
        start: "2025-10-10",
      })
      .then((response) => {
        expect(response.body).to.have.property(
          "message",
          "end is required field"
        );
        expect(response.status).to.eq(400);
      }));

  it.only("TC012:- should go to next step to create holiday with valid start date format", () => {
    //Test case Passed

    cy.apiCreateHoliday(authToken, {
      name: "holiday122",
      location_id: "6666a0b083c6ec5a88dbe997",
      start: "2025-05-23T05:00:00.000Z",
    }).then((response) => {
      expect(response.body).to.have.property(
        "data",
        "Holiday created successfully"
      );
      expect(response.status).to.eq(200);
    });
  });
});
