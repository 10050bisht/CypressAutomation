describe("Login API - Positive Test Cases", () => {
  const apiUrl = "https://reqres.in/api/login"; // Replace with your actual API URL

  it("Positive Test Case - Valid Credentials", () => {
    cy.request({
      method: "POST",
      url: apiUrl,
      body: {
        email: "eve.holt@reqres.in",
        password: "cityslicka",
      },
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "reqres-free-v1",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("token"); // Assuming the API returns a token
      expect(response.body.token).to.be.a("string");
    });
  });

  it("Positive Test Case - Case-Insensitive Username", () => {
    cy.request({
      method: "POST",
      url: apiUrl,
      body: {
        email: "eve.holt@reqres.in",
        password: "cityslicka",
      },
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "reqres-free-v1",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("token");
    });
  });

  it("Positive Test Case - Username with Leading/Trailing Spaces", () => {
    cy.request({
      method: "POST",
      url: apiUrl,
      body: {
        email: "eve.holt@reqres.in",
        password: "cityslicka",
      },
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "reqres-free-v1",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("token");
    });
  });

  it("Negative Test Case - Invalid Email  Format", () => {
    cy.request({
      method: "POST",
      url: apiUrl,
      failOnStatusCode: false,
      body: {
        email: "eve.holt@reqre",
        password: "cityslicka",
      },
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "reqres-free-v1",
      },
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property("error");
      expect(response.body.error).to.eq("user not found");
    });
  });

  it("Negative Test Case - Password Too Short", () => {
    cy.request({
      method: "POST",
      url: apiUrl,
      failOnStatusCode: false,
      body: {
        email: "eve.holt@reqres.in",
        password: "city",
      },
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "reqres-free-v1",
      },
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property("error");
      expect(response.body.error).to.eq("user not found");
    });
  });

  it("Negative Test Case - Missing Username", () => {
    cy.request({
      method: "POST",
      url: apiUrl,
      failOnStatusCode: false,
      body: {
        password: "cityslicka",
      },
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "reqres-free-v1",
      },
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property("error");
      expect(response.body.error).to.eq("Missing email or usernam");
    });
  });

  it("Negative Test Case - Missing Password", () => {
    cy.request({
      method: "POST",
      url: apiUrl,
      failOnStatusCode: false,
      body: {
        username: "validUser",
      },
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "reqres-free-v1",
      },
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property("error");
      expect(response.body.error).to.eq("Missing password");
    });
  });

  it("Negative Test Case - Excessively Long Username", () => {
    cy.request({
      method: "POST",
      url: apiUrl,
      failOnStatusCode: false,
      body: {
        username: "a".repeat(256), // Excessively long username
        password: "cityslicka",
      },
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "reqres-free-v1",
      },
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property("error");
      expect(response.body.error).to.eq("user not found");
    });
  });

  // it("Negative Test Case - Unsupported HTTP Method", () => {
  //   cy.request({
  //     method: "GET", // Using GET instead of POST
  //     url: apiUrl,
  //     failOnStatusCode: false,
  //   }).then((response) => {
  //     expect(response.status).to.eq(405);
  //     expect(response.body).to.have.property("error");
  //     expect(response.body.error).to.eq("Method not allowed");
  //   });
  // });

  // it.only("Negative Test Case - Invalid Content-Type Header", () => {
  //   cy.request({
  //     method: "POST",
  //     url: apiUrl,
  //     failOnStatusCode: false,
  //     headers: {
  //       "Content-Type": "text/plain",
  //       "x-api-key": "reqres-free-v1",
  //       // Invalid content type
  //     },
  //     body: JSON.stringify({
  //       email: "eve.holt@reqres.in",
  //       password: "cityslicka",
  //     }),
  //   }).then((response) => {
  //     expect(response.status).to.eq(415);
  //     expect(response.body).to.have.property("error");
  //     expect(response.body.error).to.eq("Unsupported Media Type");
  //   });
  // });

  // it("Negative Test Case - SQL Injection Attempt", () => {
  //   cy.request({
  //     method: "POST",
  //     url: apiUrl,
  //     failOnStatusCode: false,
  //     body: {
  //       username: "' OR 1=1; --",
  //       password: "anyPassword",
  //     },
  //     headers: {
  //       "Content-Type": "application/json",
  //       "x-api-key": "reqres-free-v1",
  //     },
  //   }).then((response) => {
  //     expect(response.status).to.eq(400);
  //     expect(response.body).to.have.property("error");
  //     expect(response.body.error).to.eq("Invalid input");
  //   });
  // });
});
