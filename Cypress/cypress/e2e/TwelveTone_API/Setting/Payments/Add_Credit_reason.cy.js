describe("Create Credit Reason API", () => {
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

  it("TC001:- Negative Test - Should fail to create a credit reason with empty fields", () => {
    // Test case passed - checking for empty fields
    cy.createCreditReason(authToken, {}).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property(
        "message",
        "Title is required field"
      );
    });
  });

  it("TC002:-Negative Test - Should fail to create a credit reason with empty title ", () => {
    // Test case passed - checking for empty title
    cy.createCreditReason(authToken, {
      title: "",
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property(
        "message",
        '"title" is not allowed to be empty'
      );
    });
  });

  it("TC003:-Negative Test - Should fail to create a credit reason with invalid title ", () => {
    // Test case failed beacuse expected message is not matching- for invalid title
    cy.createCreditReason(authToken, {
      title: "12test@",
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property(
        "message",
        '"title" must be characters only'
      );
    });
  });

  it("TC004:-Negative Test - Should fail to create a credit reason with Valid title ", () => {
    // Test case Passed--for Valid title
    cy.createCreditReason(authToken, {
      title: "This is new title",
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property(
        "message",
        "Description is a required field"
      );
    });
  });

  it("TC005:-Negative Test - Should fail to create a credit reason with empty Description ", () => {
    // Test case passed - checking for empty title
    cy.createCreditReason(authToken, {
      title: "This is new title",
      description: "",
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property(
        "message",
        '"description" is not allowed to be empty'
      );
    });
  });

  it("TC006:-Negative Test - Should fail to create a credit reason with invalid description ", () => {
    // Test case failed beacuse expected message is not matching- for invalid description
    cy.createCreditReason(authToken, {
      title: "This is new title",
      description: "12test",
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property(
        "message",
        '"title" must be characters only'
      );
    });
  });

  it("TC007:-Negative Test - Should fail to create a credit reason with Valid description ", () => {
    // Test case Passed--for Valid title
    cy.createCreditReason(authToken, {
      title: "This is new title",
      description: "This is new title",
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property(
        "message",
        "code is required field"
      );
    });
  });

  it("TC008:-Negative Test - Should fail to create a credit reason with empty code ", () => {
    // Test case passed - checking for empty code
    cy.createCreditReason(authToken, {
      title: "This is new title",
      description: "This is new title",
      hexCode: "",
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property(
        "message",
        '"hexCode" is not allowed to be empty'
      );
    });
  });

  it("TC009:-Negative Test - Should fail to create a credit reason with invalid code ", () => {
    // Test case failed beacuse expected message is not matching- for invalid code
    cy.createCreditReason(authToken, {
      title: "This is new title",
      description: "12test",
      hexCode: "563r3333",
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property(
        "message",
        '"hexCode" must be valid'
      );
    });
  });

  it("TC0010:-Negative Test - Should fail to create a credit reason with Valid code ", () => {
    // Test case Passed--for Valid code
    cy.createCreditReason(authToken, {
      title: "This is new title",
      description: "This is new title",
      hexCode: "#08AC67",
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property(
        "message",
        "status is required field"
      );
    });
  });

  it("TC0011:-Negative Test - Should fail to create a credit reason with empty Status ", () => {
    // Test case passed - checking for empty stauts
    cy.createCreditReason(authToken, {
      title: "This is new title",
      description: "This is new title",
      hexCode: "#08AC67",
      status: "",
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property(
        "message",
        "status must be either active or inactive"
      );
    });
  });

  it("TC0012:-Negative Test - Should fail to create a credit reason with invalid status ", () => {
    // Test case passed for invalid status
    cy.createCreditReason(authToken, {
      title: "This is new title",
      description: "This is new title",
      hexCode: "563r3333",
      status: "test",
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property(
        "message",
        "status must be either active or inactive"
      );
    });
  });

  it.only("TC0013:-Negative Test - Should fail to create a credit reason with Valid code ", () => {
    // Test case Passed--for Valid code
    cy.createCreditReason(authToken, {
      title: "This is new title",
      description: "12test",
      hexCode: "#08AC67",
      status: "active",
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property(
        "message",
        "Reason created successfuly"
      );
    });
  });

  it("should create a credit reason successfully", () => {
    // Test case passed - skipping for now
    cy.createCreditReason(authToken, {
      title: `Test Reason ${Date.now()}`,
      description: "Test description",
      hexCode: "#08AC67",
      status: "active",
      existedId: null,
    }).then((response) => {
      expect([200, 201]).to.include(response.status);
      expect(response.body).to.have.property("message");
    });
  });
});
