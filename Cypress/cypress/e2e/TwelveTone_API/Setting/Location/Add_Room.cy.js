describe("Create Room API Tests", () => {
  const email = "dev.12tone@yopmail.com";
  const password = "jXfNQ9g2o5sa";
  let authToken = null;

  before("Login and get token", () => {
    cy.loginApi(email, password).then((response) => {
      expect(response.status).to.eq(200);
      authToken = response.body.data.token;
      expect(authToken).to.be.a("string").and.not.be.empty;
    });
  });

  it("TC001:- should fail when required fields are missing", () => {
    // Test case failed becasue of the status code is mismatched

    cy.addRoom(authToken, {
      data: {},
      // Missing name, number, and location_id
    }).then((response) => {
      expect(response.body).to.have.property(
        "message",
        "name is required field"
      );
      expect(response.status).to.be.eq(400);
    });
  });

  it("TC002:-  test room name with blank name", () => {
    // Test case failed becasue of the status code is mismatched

    cy.addRoom(authToken, {
      data: {
        name: "",
      },
      // Missing name, number, and location_id
    }).then((response) => {
      expect(response.body).to.have.property(
        "message",
        '"name" is not allowed to be empty'
      );
      expect(response.status).to.eq(400);
    });
  });
  it("TC003:-  test room name with random name or chracter", () => {
    // Test case Passed

    cy.addRoom(authToken, {
      data: {
        name: "Room12322",
      },
      // Missing name, number, and location_id
    }).then((response) => {
      expect(response.body).to.have.property(
        "message",
        "number is required field"
      );
      expect(response.status).to.eq(200);
    });
  });

  it("TC004:-  test room with blank room number", () => {
    // Test case failed becasue of the status code is mismatched and the message is also mismatched

    cy.addRoom(authToken, {
      data: {
        name: "Room12322",
        number: "",
      },
    }).then((response) => {
      expect(response.body).to.have.property(
        "message",
        "number is required field"
      );
      expect(response.status).to.eq(400);
    });
  });

  it("TC005:-  test room with invalid room number", () => {
    // Test case failed becasue of the status code is mismatched

    cy.addRoom(authToken, {
      data: {
        name: "Room12322",
        number: "234werw",
      },
    }).then((response) => {
      expect(response.body).to.have.property(
        "message",
        "number must be a number"
      );
      expect(response.status).to.eq(400);
    });
  });

  it("TC006:-  test room with valid room number", () => {
    // Test case failed becasue of the status code is mismatched

    cy.addRoom(authToken, {
      data: {
        name: "Room12322",
        number: "123",
      },
    }).then((response) => {
      expect(response.body).to.have.property(
        "message",
        "location_id is required field"
      );
      expect(response.status).to.eq(400);
    });
  });

  it("TC007:-  test room with blank location id", () => {
    // Test case failed becasue of the status code is mismatched

    cy.addRoom(authToken, {
      data: {
        name: "Room12322",
        number: "123",
        location_id: "",
      },
    }).then((response) => {
      expect(response.body).to.have.property(
        "message",
        '"location_id" is not allowed to be empty'
      );
      expect(response.status).to.eq(400);
    });
  });

  it("TC008:-  test room with invalid location id", () => {
    // Test case failed becasue of the status code is mismatched and the message is also mismatched

    cy.addRoom(authToken, {
      data: {
        name: "Room12322",
        number: "123",
        location_id: "2132112321werewr",
      },
    }).then((response) => {
      expect(response.body).to.have.property(
        "message",
        '"location_id" is invlaid'
      );
      expect(response.status).to.eq(400);
    });
  });

  it("TC009:-  test room with valid location id and all data is new", () => {
    // Test case Passed

    cy.addRoom(authToken, {
      data: {
        name: "Room12322",
        number: 123,
        location_id: "6666a0b083c6ec5a88dbe997",
      },
    }).then((response) => {
      expect(response.body).to.have.property(
        "message",
        "Room created successfully"
      );
      expect(response.status).to.eq(200);
    });
  });

  it.only("TC0010:-  test room with duplicate room name and number", () => {
    // Test case failed becasue of the status code is mismatched

    cy.addRoom(authToken, {
      data: {
        name: "Room12322",
        number: 123,
        location_id: "6666a0b083c6ec5a88dbe997",
      },
    }).then((response) => {
      expect(response.body).to.have.property(
        "message",
        "Please choose a different room number."
      );
      expect(response.status).to.eq(400);
    });
  });
});
