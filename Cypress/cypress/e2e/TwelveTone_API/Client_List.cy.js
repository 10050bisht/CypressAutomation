describe("Create Contact API Testing", () => {
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

  it("should successfully fetch the contact list with a valid token and validate response properties", () => {
    cy.fetchContactList(authToken).then((response) => {
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
    cy.fetchContactList("invalid_token").then((response) => {
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
    cy.fetchContactList(authToken, { page: "abc" }).then((response) => {
      // Validate status code
      expect(response.status).to.eq(400);

      // Validate error message
      expect(response.body).to.have.property(
        "message",
        "Something went wrong!"
      );
    });
  });

  it("should fail to fetch the contact list with excessively large page number", () => {
    cy.fetchContactList(authToken, { page: 2222 }).then((response) => {
      // Validate status code
      expect(response.status).to.eq(404);

      // Validate error message
      expect(response.body).to.have.property("message", "No contacts found");
    });
  });

  it.only("should fail to fetch the contact list with invalid status", () => {
    cy.fetchContactList(authToken, { status: "InvalidStatus" }).then(
      (response) => {
        // Validate status code
        expect(response.status).to.eq(400);

        // Validate error message
        expect(response.body).to.have.property(
          "message",
          "Invalid status value"
        );
      }
    );
  });
});
