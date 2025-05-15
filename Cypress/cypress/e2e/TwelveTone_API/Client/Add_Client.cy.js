describe("Create User API Tests", () => {
  const email = "dev.12tone@yopmail.com";
  const password = "jXfNQ9g2o5sa";
  let authToken = null;
  const uniqueEmail = `user${Math.random()
    .toString(36)
    .substring(2, 10)}@example.com`; // Generate a unique email
  const phone = `999${Date.now().toString().slice(-7)}`;

  before("Login and get token", () => {
    cy.loginApi(email, password).then((response) => {
      expect(response.status).to.eq(200);
      authToken = response.body.data.token; // Store the token for later use
      expect(authToken).to.be.a("string").and.not.be.empty;
    });
  });

  it("Negative Testcase: Should fail to create a client when first name is empty ", () => {
    // Test case failed becasue of the status code is mismatched

    cy.addClient(authToken, {}).then((response) => {
      expect(response.body).to.have.property(
        "message",
        "First Name is required"
      );
      expect(response.status).to.eq(409); // Assuming 409 Conflict is the error status
    });
  });

  it("Negative Testcase: Should fail to create a client when first name is empty ", () => {
    // Test case failed becasue of the status code is mismatched

    cy.addClient(authToken, {
      firstName: "",
    }).then((response) => {
      expect(response.body).to.have.property(
        "message",
        "First Name cannot be empty"
      );
      expect(response.status).to.eq(409); // Assuming 409 Conflict is the error status
    });
  });

  it("Negative Testcase: Should fail to create a client when first name is Invalid ", () => {
    // Test case failed becasue of the status code is mismatched and the message is also mismatched

    cy.addClient(authToken, {
      firstName: "asddas12212",
    }).then((response) => {
      expect(response.body).to.have.property(
        "message",
        "First Name must be valid "
      );
      expect(response.status).to.eq(409); // Assuming 409 Conflict is the error status
    });
  });

  it("Negative Testcase: Should fail to create a client when first name is Valid  ", () => {
    // Test case failed becasue of the status code is mismatched

    cy.addClient(authToken, {
      firstName: "aman",
    }).then((response) => {
      expect(response.body).to.have.property(
        "message",
        "Last Name is required"
      );
      expect(response.status).to.eq(409); // Assuming 409 Conflict is the error status
    });
  });

  it("Negative Testcase: Should fail to create a client when Last name is empty ", () => {
    // Test case failed becasue of the status code is mismatched

    cy.addClient(authToken, {
      firstName: "aman",
      lastName: "",
    }).then((response) => {
      expect(response.body).to.have.property(
        "message",
        "Last Name cannot be empty"
      );
      expect(response.status).to.eq(409); // Assuming 409 Conflict is the error status
    });
  });

  it("Negative Testcase: Should fail to create a client when Last name is Invalid ", () => {
    // Test case failed becasue of the status code is mismatched and the message is also mismatched

    cy.addClient(authToken, {
      firstName: "aman",
      lastName: "asddas12212",
    }).then((response) => {
      expect(response.body).to.have.property(
        "message",
        "Last Name must be valid "
      );
      expect(response.status).to.eq(409); // Assuming 409 Conflict is the error status
    });
  });

  it("Negative Testcase: Should fail to create a client when Last name is Valid  ", () => {
    // Test case failed becasue of the status code is mismatched

    cy.addClient(authToken, {
      firstName: "aman",
      lastName: "sharma",
    }).then((response) => {
      expect(response.body).to.have.property(
        "message",
        "Phone Type is required"
      );
      expect(response.status).to.eq(409); // Assuming 409 Conflict is the error status
    });
  });

  it("Negative Testcase: Should fail to create a client when Phone type name is empty ", () => {
    // Test case failed becasue of the status code is mismatched

    cy.addClient(authToken, {
      firstName: "aman",
      lastName: "sharma",
      phoneType: "",
    }).then((response) => {
      expect(response.body).to.have.property(
        "message",
        '"phoneType" must be one of [cell, landline]'
      );
      expect(response.status).to.eq(409); // Assuming 409 Conflict is the error status
    });
  });

  it("Negative Testcase: Should fail to create a client when Phone type is Invalid ", () => {
    // Test case failed becasue of the status code is mismatched

    cy.addClient(authToken, {
      firstName: "aman",
      lastName: "sharma",
      phoneType: "aaaqes",
    }).then((response) => {
      expect(response.body).to.have.property(
        "message",
        '"phoneType" must be one of [cell, landline]'
      );
      expect(response.status).to.eq(409); // Assuming 409 Conflict is the error status
    });
  });

  it("Negative Testcase: Should fail to create a client when Phone type is Valid  ", () => {
    // Test case failed becasue of the status code is mismatched

    cy.addClient(authToken, {
      firstName: "aman",
      lastName: "sharma",
      phoneType: "cell",
    }).then((response) => {
      expect(response.body).to.have.property("message", "Email is required");
      expect(response.status).to.eq(409); // Assuming 409 Conflict is the error status
    });
  });

  it("Negative Testcase: Should fail to create a client when Email is empty ", () => {
    // Test case failed becasue of the status code is mismatched

    cy.addClient(authToken, {
      firstName: "aman",
      lastName: "sharma",
      phoneType: "cell",
      email: "",
    }).then((response) => {
      expect(response.body).to.have.property(
        "message",
        '"email" is not allowed to be empty'
      );
      expect(response.status).to.eq(409); // Assuming 409 Conflict is the error status
    });
  });

  it("Negative Testcase: Should fail to create a client when Email is Invalid format", () => {
    // Test case failed becasue of the status code is mismatched

    cy.addClient(authToken, {
      firstName: "aman",
      lastName: "sharma",
      phoneType: "cell",
      email: "aman1234567890",
    }).then((response) => {
      expect(response.body).to.have.property(
        "message",
        "Please provide a valid email address"
      );
      expect(response.status).to.eq(409); // Assuming 409 Conflict is the error status
    });
  });

  it("Negative Test - Should fail to create a user when Duplicate Email is used ", () => {
    // Test case failed becasue of the status code is mismatched and the message is mismatched
    cy.addClient(authToken, {
      firstName: "aman",
      lastName: "sharma",
      phoneType: "cell",
      email: "dace@yopmail.com",
    }).then((response) => {
      //   expect(response.body).to.have.property("success");
      expect(response.body).to.have.property("message", "Email already exists");
      expect(response.status).to.eq(409); // Assuming 409 Conflict is the error status
    });
  });

  it("Positive Test - Email is added successfully with valid email", () => {
    // Test case failed becasue of the status code is mismatched

    cy.addClient(authToken, {
      firstName: "aman",
      lastName: "sharma",
      phoneType: "cell",
      email: uniqueEmail,
    }).then((response) => {
      //   expect(response.body).to.have.property("success");
      expect(response.body).to.have.property(
        "message",
        "The number field is required."
      );
      expect(response.status).to.eq(409); // Assuming 409 Conflict is the error status
    });
  });

  it("Negative Testcase: Should fail to create a client when Phone number is empty ", () => {
    // Test case failed becasue of the status code is mismatched

    cy.addClient(authToken, {
      firstName: "aman",
      lastName: "sharma",
      phoneType: "cell",
      email: uniqueEmail,
      phoneNo: "",
    }).then((response) => {
      expect(response.body).to.have.property(
        "message",
        '"phoneNo" is not allowed to be empty'
      );
      expect(response.status).to.eq(409); // Assuming 409 Conflict is the error status
    });
  });

  it("Negative Testcase: Should fail to create a client when Phone number is Invalid ", () => {
    // Test case failed becasue of the status code is mismatched and the message is also mismatched

    cy.addClient(authToken, {
      firstName: "aman",
      lastName: "sharma",
      phoneType: "cell",
      email: uniqueEmail,
      phoneNo: "aasaa",
    }).then((response) => {
      expect(response.body).to.have.property(
        "message",
        "Please enter a valid phone number"
      );
      expect(response.status).to.eq(409); // Assuming 409 Conflict is the error status
    });
  });

  it("Negative Testcase: Should fail to create a client when Phone number is Duplicate  ", () => {
    // Test case failed becasue of the status code is mismatched and the message is also mismatched

    cy.addClient(authToken, {
      firstName: "aman",
      lastName: "sharma",
      phoneType: "cell",
      email: uniqueEmail,
      phoneNo: "929272266",
    }).then((response) => {
      expect(response.body).to.have.property(
        "message",
        "Phone number is already exists"
      );
      expect(response.status).to.eq(409); // Assuming 409 Conflict is the error status
    });
  });

  it.only("Negative Testcase: Should fail to create a client when Phone number is Valid  ", () => {
    // Test case failed becasue of the status code is mismatched

    cy.addClient(authToken, {
      firstName: "aman",
      lastName: "sharma",
      phoneType: "cell",
      email: uniqueEmail,
      phoneNo: phone,
      //   "9292727771",
    }).then((response) => {
      expect(response.body).to.have.property(
        "message",
        "Lead Created Successfully"
      );
      expect(response.status).to.eq(200); // Assuming 409 Conflict is the error status
    });
  });
});
