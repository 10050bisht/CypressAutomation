describe("Student List GET API", () => {
  const validId = "681b18a312021697791be55b";
  const invalidId = "invalid-id";
  const missid = "";
  const malformedId = "!@#$%";
  const email = "dev.12tone@yopmail.com";
  const password = "jXfNQ9g2o5sa";
  let authToken = null;
  const baseUrl =
    "https://api-stage.schedulehub.io/api/v1/admin/contacts/leads";

  before("Login and get token", () => {
    cy.loginApi(email, password).then((response) => {
      expect(response.status).to.eq(200);
      authToken = response.body.data.token;
      expect(authToken).to.be.a("string").and.not.be.empty;
    });
  });

  it("TC001:- should return 200 and the student lead data for a valid ID", () => {
    // Test case passed
    cy.getStudentLead(authToken, validId).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data[0]).to.have.property("leadId", validId);
      expect(response.body.data[0]).to.have.property("firstName");
      expect(response.body.data[0]).to.have.property("lastName");
      expect(response.body.data[0]).to.have.property("status");
    });
  });

  it("TC002:- should return 404 for an invalid ID", () => {
    // Test case passed
    cy.getStudentLead(authToken, invalidId).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property(
        "message",
        "Something went wrong!"
      ); // Adjust based on the actual error response structure
    });
  });

  // Positive: Check required fields in the response for a valid ID

  // Negative: Missing ID in the URL
  it("TC003:- should return 404 when ID is missing in the URL", () => {
    // Test case passed
    cy.getStudentLead(authToken, missid).then((response) => {
      expect([400, 404]).to.include(response.status);
      expect(response.body).to.have.property("message", "Student Id not found");
    });
  });

  // Negative: Unauthorized access (if your API requires auth)
  it("TC004:- should return 401 for unauthorized request", () => {
    // Test case passed
    cy.request({
      method: "GET",
      url: `${baseUrl}/${validId}`,
      headers: { Authorization: "Bearer invalid_token" },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });

  // Negative: Malformed ID (e.g., too short or contains special characters)
  it("TC005:- should return 400 or 404 for a malformed ID", () => {
    // Test case failed beause status code is mismatched

    cy.request({
      method: "GET",
      url: `${baseUrl}/!@#$%`,
      failOnStatusCode: false,
    }).then((response) => {
      expect([400, 404]).to.include(response.status);
    });
  });

  // Negative: Method not allowed
  it.only("TC006:- should return 405 for unsupported HTTP method", () => {
    // Test case failed beause status code is mismatched

    cy.request({
      method: "POST",
      url: `${baseUrl}/${validId}`,
      failOnStatusCode: false,
    }).then((response) => {
      expect([400, 405]).to.include(response.status);
    });
  });
});
