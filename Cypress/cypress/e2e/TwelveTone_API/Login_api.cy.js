describe("Login API Testing", () => {
  const apiUrl = "https://api-stage.schedulehub.io/api/v1/auth/admin/login";
  it("should successfully log in with valid credentials and validate response data", () => {
    cy.request({
      method: "POST",
      url: apiUrl,
      body: {
        email: "dev.12tone@yopmail.com",
        password: "jXfNQ9g2o5sa",
      },
    }).then((response) => {
      // Validate status code
      expect(response.status).to.eq(200);

      // Validate response structure
      expect(response.body).to.have.property("success", true);
      expect(response.body).to.have.property("message", "Login success");
      expect(response.body).to.have.property("data");

      // Validate user data
      const user = response.body.data.user;
      expect(user).to.have.property("firstName", "Admin");
      expect(user).to.have.property("lastName", "test");
      expect(user).to.have.property("email", "dev.12tone@yopmail.com");
      expect(user).to.have.property("profileImage").that.is.an("object");
      expect(user).to.have.property("accessLevel", "Administrator");

      // Validate token
      const token = response.body.data.token;
      expect(token).to.be.a("string").and.not.be.empty;
    });
  });

  it("should fail to log in with invalid credentials (Negative Test)", () => {
    cy.request({
      method: "POST",
      url: apiUrl,
      failOnStatusCode: false,
      body: {
        email: "dev.12tonesdfsd@yopmail.com",
        password: "jXfNQ9g2o5sdsfdsfa",
      },
    }).then((response) => {
      expect(response.body).to.have.property(
        "message",
        "Invalid Email Address."
      );
      expect(response.status).to.eq(401);
    });
  });

  it("should fail to log in with missing blank email (Negative Test)", () => {
    cy.request({
      method: "POST",
      url: apiUrl,
      failOnStatusCode: false,
      body: {
        email: "",
      },
    }).then((response) => {
      expect(response.body).to.have.property(
        "message",
        '"email" is not allowed to be empty'
      );
      expect(response.status).to.eq(400);
    });
  });

  it("should fail to log in with missing password", () => {
    cy.request({
      method: "POST",
      url: apiUrl,
      failOnStatusCode: false,
      body: {
        email: "dev.12tone@yopmail.com",
      },
    }).then((response) => {
      // Validate error message
      expect(response.body).to.have.property("message", "Password is required");
      // Validate status code
      expect(response.status).to.eq(400);
    });
  });
  it("should fail to log in with missing email", () => {
    cy.request({
      method: "POST",
      url: apiUrl,
      failOnStatusCode: false,
      body: {
        password: "jXfNQ9g2o5sa",
      },
    }).then((response) => {
      // Validate error message
      expect(response.body).to.have.property("message", "Email is required");
      // Validate status code
      expect(response.status).to.eq(400);
    });
  });

  it("should fail to log in with empty request body", () => {
    cy.request({
      method: "POST",
      url: apiUrl,
      failOnStatusCode: false,
      body: {},
    }).then((response) => {
      // Validate error message
      expect(response.body).to.have.property("message", "Email is required");
      // Validate status code
      expect(response.status).to.eq(400);
    });
  });

  it("should fail to log in with invalid email format", () => {
    cy.request({
      method: "POST",
      url: apiUrl,
      failOnStatusCode: false,
      body: {
        email: "invalid-email-format",
        password: "jXfNQ9g2o5sa",
      },
    }).then((response) => {
      // Validate error message
      expect(response.body).to.have.property(
        "message",
        "Please provide a valid email address"
      ); // Validate status code
      expect(response.status).to.eq(400);
    });
  });

  it("should fail to log in with excessively long email and password", () => {
    cy.request({
      method: "POST",
      url: apiUrl,
      failOnStatusCode: false,
      body: {
        email: "a".repeat(256) + "@example.com", // Excessively long email
        password: "b".repeat(256), // Excessively long password
      },
    }).then((response) => {
      // Validate error message
      expect(response.body).to.have.property(
        "message",
        "Please provide a valid email address"
      ); // Validate status code
      expect(response.status).to.eq(400);
    });
  });

  it("should fail to log in with SQL injection in email", () => {
    cy.request({
      method: "POST",
      url: apiUrl,
      failOnStatusCode: false,
      body: {
        email: "' OR 1=1; --",
        password: "jXfNQ9g2o5sa",
      },
    }).then((response) => {
      // Validate error message
      expect(response.body).to.have.property(
        "message",
        "Please provide a valid email address"
      ); // Validate status code
      expect(response.status).to.eq(401);
    });
  });

  it("should fail to log in with XSS attack in email", () => {
    cy.request({
      method: "POST",
      url: apiUrl,
      failOnStatusCode: false,
      body: {
        email: "<script>alert('XSS')</script>",
        password: "jXfNQ9g2o5sa",
      },
    }).then((response) => {
      // Validate error message
      expect(response.body).to.have.property(
        "message",
        "Please provide a valid email address"
      ); // Validate status code
      expect(response.status).to.eq(401);
    });
  });

  it("should fail to log in with invalid HTTP method", () => {
    cy.request({
      method: "GET", // Invalid method for login
      url: apiUrl,
      failOnStatusCode: false,
    }).then((response) => {
      // Validate error message
      expect(response.body).to.have.property("message", "Method Not Allowed.");
      // Validate status code
      expect(response.status).to.eq(405); // Method Not Allowed
    });
  });
});
