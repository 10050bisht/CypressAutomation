describe("Create Contact API Testing", () => {
  const ClientListUrl =
    "https://api-stage.schedulehub.io/api/v1/admin/contacts/leads?search=&page=1&status=All";

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

  it("should successfully fetch the contact list with a valid token and validate response properties", () => {
    cy.request({
      method: "GET",
      url: ClientListUrl,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`, // Use the stored token
      },
    }).then((response) => {
      // Validate status code
      expect(response.status).to.eq(200);

      // Validate response structure
      expect(response.body).to.have.property("success", true);
      expect(response.body).to.have.property("totalPages").that.is.a("number");
      expect(response.body).to.have.property("data").that.is.an("array");

      // Validate the first item in the data array
      const firstItem = response.body.data[0];
      expect(firstItem).to.have.property("firstName").that.is.a("string");
      expect(firstItem).to.have.property("lastName").that.is.a("string");
      expect(firstItem).to.have.property("email").that.is.a("string");
      expect(firstItem).to.have.property("phoneNo").that.is.a("string");
      expect(firstItem).to.have.property("typeGuardian").that.is.a("string");
      expect(firstItem).to.have.property("_id").that.is.a("string");
      expect(firstItem).to.have.property("name").that.is.a("string");
      expect(firstItem).to.have.property("leadType").that.is.a("string");
      expect(firstItem).to.have.property("awareness").that.is.a("string");
      expect(firstItem).to.have.property("phoneType").that.is.a("string");
      expect(firstItem).to.have.property("createdAt").that.is.a("string");
      expect(firstItem).to.have.property("lead_status").that.is.a("string");
      expect(firstItem).to.have.property("status").that.is.a("string");
      expect(firstItem).to.have.property("studentsList").that.is.an("array");

      // Validate the studentsList array
      firstItem.studentsList.forEach((student) => {
        expect(student).to.be.a("string");
      });

      // Validate pagination
      expect(response.body).to.have.property("totalPages").that.is.a("number");
      expect(response.body.totalPages).to.be.greaterThan(0);
    });
  });

  it("should fail to fetch the contact list with an invalid token", () => {
    cy.request({
      method: "GET",
      url: ClientListUrl,
      headers: {
        Authorization: `Bearer invalid_token`, // Invalid token
        "Content-Type": "application/json",
      },
      failOnStatusCode: false,
    }).then((response) => {
      // Validate status code
      expect(response.status).to.eq(401);

      // Validate error message
      expect(response.body).to.have.property(
        "message",
        "Invalid Authentication Token"
      );
    });
  });

  it("should fail to fetch the contact list with invalid query parameters", () => {
    cy.request({
      method: "GET",
      url: ClientListUrl,
      headers: {
        Authorization: `Bearer ${authToken}`, // Replace with a valid token
        "Content-Type": "application/json",
      },
      qs: { page: abc },
      failOnStatusCode: false,
    }).then((response) => {
      // Validate error message
      expect(response.body).to.have.property(
        "message",
        "Something went wrong!"
      );
      // Validate status code
      expect(response.status).to.eq(400);
    });
  });

  it("should fail to fetch the contact list with excessively large page number", () => {
    cy.request({
      method: "GET",
      url: ClientListUrl,
      headers: {
        Authorization: `Bearer ${authToken}`, // Replace with a valid token
        "Content-Type": "application/json",
      },
      qs: { page: 2222 },

      failOnStatusCode: false,
    }).then((response) => {
      // Validate error message
      expect(response.body).to.have.property("message", "No contacts found");

      // Validate status code
      expect(response.status).to.eq(404);
    });
  });

  it.only("should fail to fetch the contact list with invalid status", () => {
    cy.request({
      method: "GET",
      url: ClientListUrl,
      headers: {
        Authorization: `Bearer ${authToken}`, // Replace with a valid token
        "Content-Type": "application/json",
      },
      failOnStatusCode: false,
    }).then((response) => {
      // Validate status code
      expect(response.status).to.eq(400);

      // Validate error message
      expect(response.body).to.have.property("message", "Invalid status value");
    });
  });
});
