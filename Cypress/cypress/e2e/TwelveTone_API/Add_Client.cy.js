describe("Create User API Tests", () => {
  const apiUrl =
    "https://api-stage.schedulehub.io/api/v1/admin/settings/user-access/create";
  // Replace with your API endpoint
  const loginUrl = "https://api-stage.schedulehub.io/api/v1/auth/admin/login";
  let authToken = null; // Declare authToken at the top of the suite

  before("Login and get token", () => {
    cy.request({
      method: "POST",
      url: loginUrl,
      headers: {
        "content-type": "application/json",
      },
      body: {
        email: "dev.12tone@yopmail.com",
        password: "jXfNQ9g2o5sa",
      },
    }).then((response) => {
      expect(response.status).to.eq(200); // Ensure the request was successful
      authToken = response.body.data.token; // Store the token for later use
    });
  });

  it("Negative Test - Should fail to create a user when first name is empty", () => {
    cy.request({
      method: "POST",
      url: apiUrl,
      body: {
        firstname: "",
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      //   failOnStatusCode: false,
    }).then((response) => {
      //   expect(response.body).to.have.property("success");
      expect(response.body).to.have.property(
        "message",
        '"firstname" is not allowed to be empty'
      );
      expect(response.status).to.eq(409); // Assuming 409 Conflict is the error status
    });
  });

  it("Negative Test - Should fail to create a user when first name is invalid Chracter", () => {
    cy.request({
      method: "POST",
      url: apiUrl,
      body: {
        firstname: "qwq1231",
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      //   failOnStatusCode: false,
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
    cy.request({
      method: "POST",
      url: apiUrl,
      body: {
        firstname: "Aman",
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      //   failOnStatusCode: false,
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
    cy.request({
      method: "POST",
      url: apiUrl,
      body: {
        firstname: "aman",
        lastname: "",
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      //   failOnStatusCode: false,
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
    cy.request({
      method: "POST",
      url: apiUrl,
      body: {
        firstname: "aman",
        lastname: "qwq1231",
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      //   failOnStatusCode: false,
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
    cy.request({
      method: "POST",
      url: apiUrl,
      body: {
        firstname: "Aman",
        lastname: "sharma",
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      //   failOnStatusCode: false,
    }).then((response) => {
      //   expect(response.body).to.have.property("success");
      expect(response.body).to.have.property("message", '"gender" is required');
      expect(response.status).to.eq(409); // Assuming 409 Conflict is the error status
    });
  });

  it("Negative Test - Should fail to create a user when Gender name is empty", () => {
    cy.request({
      method: "POST",
      url: apiUrl,
      body: {
        firstname: "aman",
        lastname: "sharma",
        gender: "",
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      //   failOnStatusCode: false,
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
    cy.request({
      method: "POST",
      url: apiUrl,
      body: {
        firstname: "aman",
        lastname: "sharma",
        gender: "qwqq",
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      //   failOnStatusCode: false,
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
    cy.request({
      method: "POST",
      url: apiUrl,
      body: {
        firstname: "Aman",
        lastname: "sharma",
        gender: "Male",
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      //   failOnStatusCode: false,
    }).then((response) => {
      //   expect(response.body).to.have.property("success");
      expect(response.body).to.have.property(
        "message",
        '"accessLevelId" is required'
      );
      expect(response.status).to.eq(409); // Assuming 409 Conflict is the error status
    });
  });
  //   accessLevelId;

  it("Negative Test - Should fail to create a user when Access level id  is empty", () => {
    cy.request({
      method: "POST",
      url: apiUrl,
      body: {
        firstname: "aman",
        lastname: "sharma",
        gender: "Male",
        accessLevelId: "",
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      //   failOnStatusCode: false,
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
    cy.request({
      method: "POST",
      url: apiUrl,
      body: {
        firstname: "aman",
        lastname: "sharma",
        gender: "qwqq",
        accessLevelId: "sdasdsadsadew4r23",
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      //   failOnStatusCode: false,
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
    cy.request({
      method: "POST",
      url: apiUrl,
      body: {
        firstname: "Aman",
        lastname: "sharma",
        gender: "Male",
        accessLevelId: "666ae00680d5f3f0ae95e51d",
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      //   failOnStatusCode: false,
    }).then((response) => {
      //   expect(response.body).to.have.property("success");
      expect(response.body).to.have.property("message", "Email is required");
      expect(response.status).to.eq(409); // Assuming 409 Conflict is the error status
    });
  });

  it("Negative Test - Should fail to create a user when Email is empty", () => {
    cy.request({
      method: "POST",
      url: apiUrl,
      body: {
        firstname: "aman",
        lastname: "sharma",
        gender: "Male",
        accessLevelId: "666ae00680d5f3f0ae95e51d",
        email: "",
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      //   failOnStatusCode: false,
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
    cy.request({
      method: "POST",
      url: apiUrl,
      body: {
        firstname: "aman",
        lastname: "sharma",
        gender: "Male",
        accessLevelId: "sdasdsadsadew4r23",
        email: "aman@123",
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      //   failOnStatusCode: false,
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
    cy.request({
      method: "POST",
      url: apiUrl,
      body: {
        firstname: "aman",
        lastname: "sharma",
        gender: "Male",
        accessLevelId: "sdasdsadsadew4r23",
        email: "hb047809@gmail.com",
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      //   failOnStatusCode: false,
    }).then((response) => {
      //   expect(response.body).to.have.property("success");
      expect(response.body).to.have.property(
        "message",
        "Email Already Existed"
      );
      expect(response.status).to.eq(409); // Assuming 409 Conflict is the error status
    });
  });

  it.only("Positive Test - Email is added successfully with valid email", () => {
    cy.request({
      method: "POST",
      url: apiUrl,
      body: {
        firstname: "Aman",
        lastname: "sharma",
        gender: "Male",
        accessLevelId: "666ae00680d5f3f0ae95e51d",
        email: "hb047809@gmail.com",
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      //   failOnStatusCode: false,
    }).then((response) => {
      //   expect(response.body).to.have.property("success");
      expect(response.body).to.have.property(
        "message",
        '"instruments" is required'
      );
      expect(response.status).to.eq(409); // Assuming 409 Conflict is the error status
    });
  });






  
  //   it("Positive Test - Should create a user successfully", () => {
  //     cy.request({
  //       method: "POST",
  //       url: apiUrl,
  //       body: {
  //         name: "John Doe",
  //         email: "johndoe@example.com",
  //         password: "Password123!",
  //       },
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }).then((response) => {
  //       expect(response.status).to.eq(201); // Assuming 201 Created is the success status
  //       expect(response.body).to.have.property("id");
  //       expect(response.body.name).to.eq("John Doe");
  //       expect(response.body.email).to.eq("johndoe@example.com");
  //     });
  //   });

  //   it("Negative Test - Should fail to create a user with invalid data", () => {
  //     cy.request({
  //       method: "POST",
  //       url: apiUrl,
  //       body: {
  //         firstname: "",
  //         lastname: "mathew",
  //         email: "kannik111a00@yopmail.com",
  //         address: "illinois",
  //         bussinessphoneNo: "9966788656",
  //         gender: "male",
  //         phoneNo: "8778876877",
  //         accessLevelId: "666ae00680d5f3f0ae95e51d",
  //         instruments: ["66669e7f83c6ec5a88dbe89c"],
  //         exitedUserId: "null",
  //       },
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${authToken}`,
  //       },
  //       failOnStatusCode: false, // Prevent Cypress from failing the test on non-2xx status
  //     }).then((response) => {
  //       expect(response.body).to.have.property("success");
  //       expect(response.body).to.have.property(
  //         "message",
  //         '"firstname" is not allowed to be empty'
  //       );
  //       expect(response.status).to.eq(400); // Assuming 400 Bad Request is the error status
  //     });
  //   });

  //   it("Negative Test - Should fail to create a user with a duplicate email", () => {
  //     cy.request({
  //       method: "POST",
  //       url: apiUrl,
  //       body: {
  //         firstname: "kannika",
  //         lastname: "mathew",
  //         email: "kannika00@yopmail.com",
  //         address: "illinois",
  //         bussinessphoneNo: "9966788656",
  //         gender: "male",
  //         phoneNo: "8778876877",
  //         accessLevelId: "666ae00680d5f3f0ae95e51d",
  //         instruments: ["66669e7f83c6ec5a88dbe89c"],
  //         exitedUserId: "null",
  //       },
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${authToken}`,
  //       },
  //       //   failOnStatusCode: false,
  //     }).then((response) => {
  //       //   expect(response.body).to.have.property("success");
  //       expect(response.body).to.have.property(
  //         "message",
  //         "Email Already Existed"
  //       );
  //       expect(response.status).to.eq(409); // Assuming 409 Conflict is the error status
  //     });
  //   });
});
