describe("Create User API Tests", () => {
  const email = "dev.12tone@yopmail.com";
  const password = "jXfNQ9g2o5sa";
  let authToken = null;
  const uniqueEmail = `user${Math.random()
    .toString(36)
    .substring(2, 10)}@example.com`; // Generate a unique email
    
  before("Login and get token", () => {
    cy.loginApi(email, password).then((response) => {
      expect(response.status).to.eq(200);
      authToken = response.body.data.token; // Store the token for later use
      expect(authToken).to.be.a("string").and.not.be.empty;
    });
  });

  it("Negative Test - Should fail to create a user when first name is empty", () => {
    // Test case failed becasue of the status code is mismatched
    cy.createUser(authToken, {
      firstname: "",
    }).then((response) => {
      expect(response.body).to.have.property(
        "message",
        '"firstname" is not allowed to be empty'
      );
      expect(response.status).to.eq(409); // Assuming 409 Conflict is the error status
    });
  });

  it("Negative Test - Should fail to create a user when first name is invalid Chracter", () => {
    // Test case failed becasue of the status code is mismatched and the message is mismatched

    cy.createUser(authToken, {
      firstname: "qwq1231",
    }).then((response) => {
      //   expect(response.body).to.have.property("success");
      expect(response.body).to.have.property(
        "message",
        '"firstname" should be valid'
      );
      expect(response.status).to.eq(409); // Assuming 409 Conflict is the error status
    });
  });

  it("Positive Test - Should first name is added in field with valid data", () => {
    // Test case failed becasue of the status code is mismatched

    cy.createUser(authToken, {
      firstname: "Aman",
    }).then((response) => {
      //   expect(response.body).to.have.property("success");
      expect(response.body).to.have.property(
        "message",
        '"lastname" is required'
      );
      expect(response.status).to.eq(409); // Assuming 409 Conflict is the error status
    });
  });

  it("Negative Test - Should fail to create a user when last name is empty", () => {
    // Test case failed becasue of the status code is mismatched

    cy.createUser(authToken, {
      firstname: "aman",
      lastname: "",
    }).then((response) => {
      //   expect(response.body).to.have.property("success");
      expect(response.body).to.have.property(
        "message",
        '"lastname" is not allowed to be empty'
      );
      expect(response.status).to.eq(409); // Assuming 409 Conflict is the error status
    });
  });

  it("Negative Test - Should fail to create a user when last name is invalid Chracter", () => {
    // Test case failed becasue of the status code is mismatched and the message is mismatched

    cy.createUser(authToken, {
      firstname: "aman",
      lastname: "qwq1231",
    }).then((response) => {
      //   expect(response.body).to.have.property("success");
      expect(response.body).to.have.property(
        "message",
        '"lastname" should be valid'
      );
      expect(response.status).to.eq(409); // Assuming 409 Conflict is the error status
    });
  });

  it("Positive Test - Should Last name is added in field with valid data", () => {
    // Test case failed becasue of the status code is mismatched

    cy.createUser(authToken, {
      firstname: "Aman",
      lastname: "sharma",
    }).then((response) => {
      //   expect(response.body).to.have.property("success");
      expect(response.body).to.have.property("message", '"gender" is required');
      expect(response.status).to.eq(409); // Assuming 409 Conflict is the error status
    });
  });

  it("Negative Test - Should fail to create a user when Gender name is empty", () => {
    // Test case failed becasue of the status code is mismatched

    cy.createUser(authToken, {
      firstname: "aman",
      lastname: "sharma",
      gender: "",
    }).then((response) => {
      //   expect(response.body).to.have.property("success");
      expect(response.body).to.have.property(
        "message",
        '"gender" is not allowed to be empty'
      );
      expect(response.status).to.eq(409); // Assuming 409 Conflict is the error status
    });
  });

  it("Negative Test - Should fail to create a user when gender is invalid Chracter", () => {
    // Test case failed becasue of the status code is mismatched and the message is mismatched

    cy.createUser(authToken, {
      firstname: "aman",
      lastname: "sharma",
      gender: "qwqq",
    }).then((response) => {
      //   expect(response.body).to.have.property("success");
      expect(response.body).to.have.property(
        "message",
        '"gender" should be valid'
      );
      expect(response.status).to.eq(409); // Assuming 409 Conflict is the error status
    });
  });

  it("Positive Test - Should gender is added in field with valid data", () => {
    // Test case failed becasue of the status code is mismatched

    cy.createUser(authToken, {
      firstname: "Aman",
      lastname: "sharma",
      gender: "Male",
    }).then((response) => {
      //   expect(response.body).to.have.property("success");
      expect(response.body).to.have.property(
        "message",
        '"accessLevelId" is required'
      );
      expect(response.status).to.eq(409); // Assuming 409 Conflict is the error status
    });
  });

  it("Negative Test - Should fail to create a user when Access level id  is empty", () => {
    // Test case failed becasue of the status code is mismatched

    cy.createUser(authToken, {
      firstname: "aman",
      lastname: "sharma",
      gender: "Male",
      accessLevelId: "",
    }).then((response) => {
      //   expect(response.body).to.have.property("success");
      expect(response.body).to.have.property(
        "message",
        '"accessLevelId" is not allowed to be empty'
      );
      expect(response.status).to.eq(409); // Assuming 409 Conflict is the error status
    });
  });

  it("Negative Test - Should fail to create a user when Access level id is invalid Chracter", () => {
    // Test case failed becasue of the status code is mismatched and the message is mismatched

    cy.createUser(authToken, {
      firstname: "aman",
      lastname: "sharma",
      gender: "qwqq",
      accessLevelId: "sdasdsadsadew4r23",
    }).then((response) => {
      //   expect(response.body).to.have.property("success");
      expect(response.body).to.have.property(
        "message",
        '"accessLevelId" should be valid'
      );
      expect(response.status).to.eq(409); // Assuming 409 Conflict is the error status
    });
  });

  it("Positive Test - Should Access level id is added in field with valid data", () => {
    // Test case failed becasue of the status code is mismatched

    cy.createUser(authToken, {
      firstname: "Aman",
      lastname: "sharma",
      gender: "Male",
      accessLevelId: "666ae00680d5f3f0ae95e51d",
    }).then((response) => {
      //   expect(response.body).to.have.property("success");
      expect(response.body).to.have.property("message", "Email is required");
      expect(response.status).to.eq(409); // Assuming 409 Conflict is the error status
    });
  });

  it("Negative Test - Should fail to create a user when Email is empty", () => {
    // Test case failed becasue of the status code is mismatched

    cy.createUser(authToken, {
      firstname: "aman",
      lastname: "sharma",
      gender: "Male",
      accessLevelId: "666ae00680d5f3f0ae95e51d",
      email: "",
    }).then((response) => {
      //   expect(response.body).to.have.property("success");
      expect(response.body).to.have.property(
        "message",
        '"email" is not allowed to be empty'
      );
      expect(response.status).to.eq(409); // Assuming 409 Conflict is the error status
    });
  });

  it("Negative Test - Should fail to create a user when Email is invalid format", () => {
    // Test case failed becasue of the status code is mismatched

    cy.createUser(authToken, {
      firstname: "aman",
      lastname: "sharma",
      gender: "Male",
      accessLevelId: "sdasdsadsadew4r23",
      email: "aman@123",
    }).then((response) => {
      //   expect(response.body).to.have.property("success");
      expect(response.body).to.have.property(
        "message",
        "Please provide a valid email address"
      );
      expect(response.status).to.eq(409); // Assuming 409 Conflict is the error status
    });
  });

  it("Negative Test - Should fail to create a user when Duplicate Email is used ", () => {
    // Test case failed becasue of the status code is mismatched and the message is mismatched
    cy.createUser(authToken, {
      firstname: "aman",
      lastname: "sharma",
      gender: "Male",
      accessLevelId: "sdasdsadsadew4r23",
      email: "hb047809@gmail.com",
    }).then((response) => {
      //   expect(response.body).to.have.property("success");
      expect(response.body).to.have.property("message", "Email already exists");
      expect(response.status).to.eq(409); // Assuming 409 Conflict is the error status
    });
  });

  it("Positive Test - Email is added successfully with valid email", () => {
    // Test case failed becasue of the status code is mismatched

    cy.createUser(authToken, {
      firstname: "Aman",
      lastname: "sharma",
      gender: "Male",
      accessLevelId: "666ae00680d5f3f0ae95e51d",
      email: "hb047809@gmail.com",
    }).then((response) => {
      //   expect(response.body).to.have.property("success");
      expect(response.body).to.have.property(
        "message",
        '"instruments" is required'
      );
      expect(response.status).to.eq(409); // Assuming 409 Conflict is the error status
    });
  });

  it("Negative Test - Should fail to create a user when instruments is empty", () => {
    // Test case failed becasue of the status code is mismatched and the message is mismatched

    cy.createUser(authToken, {
      firstname: "kannika",
      lastname: "mathew",
      gender: "male",
      accessLevelId: "666ae00680d5f3f0ae95e51d",
      email: "hb04780999@gmail.com",
      instruments: [""],
      exitedUserId: "null",
    }).then((response) => {
      //   expect(response.body).to.have.property("success");
      expect(response.body).to.have.property(
        "message",
        '"instruments" is not allowed to be empty'
      );
      expect(response.status).to.eq(409); // Assuming 409 Conflict is the error status
    });
  });

  it("Positive Test - Should Pass to create a user when instruments is Valid ", () => {
    // Test Case Passed successfully
    cy.createUser(authToken, {
      firstname: "kannika",
      lastname: "mathew",
      gender: "male",
      accessLevelId: "666ae00680d5f3f0ae95e51d",
      email: uniqueEmail, //update email every time
      instruments: ["67dd517adc860814f620e4a4"],
      exitedUserId: "null",
    }).then((response) => {
      //   expect(response.body).to.have.property("success");
      expect(response.body).to.have.property(
        "message",
        "User created successfuly"
      );
      expect(response.status).to.eq(200); // Assuming 409 Conflict is the error status
    });
  });

  it("Negative Test - Should fail to create a user when Email is existed after fill full form", () => {
    // Test case failed becasue of the status code is mismatched

    cy.createUser(authToken, {
      firstname: "kannika",
      lastname: "mathew",
      gender: "male",
      accessLevelId: "666ae00680d5f3f0ae95e51d",
      email: "hb04780999@gmail.com",
      instruments: [""],
      exitedUserId: "null",
    }).then((response) => {
      //   expect(response.body).to.have.property("success");
      expect(response.body).to.have.property(
        "message",
        "Email Already Existed"
      );
      expect(response.status).to.eq(409); // Assuming 409 Conflict is the error status
    });
  });

  it("Positive Test - Should create a user successfully", () => {
    // Test case failed becasue of the status code is mismatched

    cy.createUser(authToken, {
      firstname: "kannika",
      lastname: "mathew",
      gender: "male",
      accessLevelId: "666ae00680d5f3f0ae95e51d",
      email: uniqueEmail, //update email every time
      instruments: ["67dd517adc860814f620e4a4"],
      exitedUserId: "null",
    }).then((response) => {
      expect(response.status).to.eq(201); // Assuming 201 Created is the success status
      expect(response.body).to.have.property("id");
      expect(response.body.name).to.eq("John Doe");
      expect(response.body.email).to.eq("johndoe@example.com");
    });
  });

  it("Negative Test - Should fail to create a user with Blank data", () => {
    // Test case failed becasue of the status code is mismatched

    cy.createUser(authToken, {
      firstname: "",
      lastname: "",
      email: "",
      gender: "",
      accessLevelId: "",
      instruments: [""],
      exitedUserId: "null",
    }).then((response) => {
      expect(response.body).to.have.property("success");
      expect(response.body).to.have.property(
        "message",
        '"firstname" is not allowed to be empty'
      );
      expect(response.status).to.eq(400); // Assuming 400 Bad Request is the error status
    });
  });
});
