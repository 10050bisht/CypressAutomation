describe("Create Student POST  API", () => {
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

  it("TC001:- should fail to  go to next step create a student with missing fields", () => {
    //  Test case passed
    cy.createStudent(authToken, {}).then((response) => {
      expect(response.status).to.eq(400); // Assuming 201 Created
      expect(response.body).to.have.property("message", "Lead ID Required");
    });
  });

  it("TC002:- should fail to  go to next step create a student with Blank Lead id ", () => {
    // Test case passed
    cy.createStudent(authToken, {
      leadId: "",
    }).then((response) => {
      expect(response.status).to.eq(400); // Assuming 400 Bad Request
      expect(response.body).to.have.property("message", "Lead ID Required");
    });
  });

  it("TC003:- should fail to  go to next step create a student with Blank Lead id ", () => {
    // Test case passed
    cy.createStudent(authToken, {
      leadId: "",
    }).then((response) => {
      expect(response.status).to.eq(400); // Assuming 400 Bad Request
      expect(response.body).to.have.property("message", "Lead ID Required");
    });
  });

  it("TC004:- should fail to  go to next step create a student with invalid Lead id ", () => {
    // Test case Passed
    cy.createStudent(authToken, {
      leadId: "681b18a312021697791be55b22",
    }).then((response) => {
      expect(response.status).to.eq(400); // Assuming 400 Bad Request
      expect(response.body).to.have.property(
        "message",
        "Lead ID should be a valid ObjectId"
      );
    });
  });

  it("TC005:- should go to next stp  to create a student with valid Lead id ", () => {
    // Test case Passed
    cy.createStudent(authToken, {
      leadId: "681b18a312021697791be55b",
    }).then((response) => {
      expect(response.status).to.eq(400); // Assuming 400 Bad Request
      expect(response.body).to.have.property(
        "message",
        "First Name is required"
      );
    });
  });

  it("TC006:- should fail to  go to next step  to create a student with Blank first name ", () => {
    // Test case Passed
    cy.createStudent(authToken, {
      leadId: "681b18a312021697791be55b",
      firstName: "",
    }).then((response) => {
      expect(response.status).to.eq(400); // Assuming 400 Bad Request
      expect(response.body).to.have.property(
        "message",
        "First Name is required"
      );
    });
  });

  it("TC007:- should fail to  go to next step  to create a student with invalid first name", () => {
    // Test case failed beacuse message is mismatched
    cy.createStudent(authToken, {
      leadId: "681b18a312021697791be55b",
      firstName: "aman2323",
    }).then((response) => {
      expect(response.status).to.eq(400); // Assuming 400 Bad Request
      expect(response.body).to.have.property(
        "message",
        "First Name must be a string"
      );
    });
  });

  it("TC008:- should go to next step to create a student with Valid first name ", () => {
    // Test case Passed
    cy.createStudent(authToken, {
      leadId: "681b18a312021697791be55b",
      firstName: "aman",
    }).then((response) => {
      expect(response.status).to.eq(400); // Assuming 400 Bad Request
      expect(response.body).to.have.property(
        "message",
        "Last Name is required"
      );
    });
  });

  it("TC009:- should fail to  go to next step  to create a student with Blank Last name ", () => {
    // Test case Passed
    cy.createStudent(authToken, {
      leadId: "681b18a312021697791be55b",
      firstName: "aman",
      lastName: "",
    }).then((response) => {
      expect(response.status).to.eq(400); // Assuming 400 Bad Request
      expect(response.body).to.have.property(
        "message",
        "Last Name is required"
      );
    });
  });

  it("TC0010:- should fail to  go to next step  to create a student with Invalid Last name ", () => {
    // Test case failed beacuse message is mismatched
    cy.createStudent(authToken, {
      leadId: "681b18a312021697791be55b",
      firstName: "aman",
      lastName: "123rewr@@",
    }).then((response) => {
      expect(response.status).to.eq(400); // Assuming 400 Bad Request
      expect(response.body).to.have.property(
        "message",
        "Last Name is required"
      );
    });
  });

  it("TC0011:- should go to next step to create a student with Valid Last name ", () => {
    // Test case Passed
    cy.createStudent(authToken, {
      leadId: "681b18a312021697791be55b",
      firstName: "aman",
      lastName: "kumar",
    }).then((response) => {
      expect(response.status).to.eq(400); // Assuming 400 Bad Request
      expect(response.body).to.have.property(
        "message",
        "Birth Date is required"
      );
    });
  });

  it("TC0012:- should go to next step to create a student with blank birth date ", () => {
    // Test case failed beacuse message is mismatched
    cy.createStudent(authToken, {
      leadId: "681b18a312021697791be55b",
      firstName: "aman",
      lastName: "kumar",
      birthDate: "",
    }).then((response) => {
      expect(response.status).to.eq(400); // Assuming 400 Bad Request
      expect(response.body).to.have.property(
        "message",
        "Birth Date is required"
      );
    });
  });

  it("TC0013:- should go to next step to create a student with invalid birth date ", () => {
    // Test case failed beacuse message is mismatched
    cy.createStudent(authToken, {
      leadId: "681b18a312021697791be55b",
      firstName: "aman",
      lastName: "kumar",
      birthDate: "2023-10-12T06:30:00.000Z",
    }).then((response) => {
      expect(response.status).to.eq(400); // Assuming 400 Bad Request
      expect(response.body).to.have.property(
        "message",
        "Birth Date should be a valid date"
      );
    });
  });

  it.only("TC0014:- should go to next step to create a student with valid birth date ", () => {
    // Test case Passed
    cy.createStudent(authToken, {
      leadId: "681b18a312021697791be55b",
      firstName: "aman",
      lastName: "kumar",
      birthDate: "2023-10-12T06:30:00.000Z",
    }).then((response) => {
      expect(response.status).to.eq(200); // Assuming 400 Bad Request
      expect(response.body).to.have.property(
        "message",
        "Student Created Successfully"
      );
    });
  });
});
