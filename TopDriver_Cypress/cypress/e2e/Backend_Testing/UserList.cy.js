describe("Users Listing API Tests", () => {
  const apiUrl = "https://reqres.in/api/users?page=2"; // Replace with your actual API endpoint

  // Positive Test Case: Verify successful retrieval of users
  it("should successfully retrieve the list of users", () => {
    cy.request({
      method: "GET",
      url: apiUrl,
    }).then((response) => {
      expect(response.status).to.eq(200);

      // Assert the response structure
      expect(response.body).to.have.property("data"); // Ensure 'data' exists
      expect(response.body.data).to.be.an("array"); // Ensure 'data' is an array

      // Find a specific user in the 'data' array and assert their properties
      const user = response.body.data.find((user) => user.id === 10); // Find user with id 10
      expect(user).to.exist; // Ensure the user exists
      expect(user).to.have.property("id", 10);
      expect(user).to.have.property("first_name", "Byron");
      expect(user).to.have.property("email", "byron.fields@reqres.in");
    });
  });

  //   // Negative Test Case: Verify unauthorized access
  //   it("should return 401 for unauthorized access", () => {
  //     cy.request({
  //       method: "GET",
  //       url: apiUrl,
  //       failOnStatusCode: false, // Prevent Cypress from failing the test
  //       headers: {
  //         Authorization: "asdasdasdas",
  //         headers: {
  //           "Content-Type": "application/json",
  //           "x-api-key": "reqres-free-v1",
  //         },
  //       },
  //     }).then((response) => {
  //       expect(response.status).to.eq(401);
  //       expect(response.body).to.have.property("error");
  //     });
  //   });

  // Negative Test Case: Verify invalid endpoint
  //   it.only("should return 404 for an invalid endpoint", () => {
  //     cy.request({
  //       method: "GET",
  //       url: `${apiUrl}/invalid`,
  //       failOnStatusCode: false,
  //     }).then((response) => {
  //       expect(response.status).to.eq(404);
  //       expect(response.body).to.have.property("error");
  //     });
  //   });

  // Negative Test Case: Verify server error handling
  //   it.only("should handle server errors gracefully", () => {
  //     cy.request({
  //       method: "GET",
  //       url: `${apiUrl}?causeServerError=true`, // Simulate server error
  //       failOnStatusCode: false,
  //     }).then((response) => {
  //       expect(response.status).to.be.oneOf([500, 503]);
  //       expect(response.body).to.have.property("error");
  //     });
  //   });

  it("should verify pagination properties", () => {
    cy.request({
      method: "GET",
      url: `${apiUrl}`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("page", 2);
      expect(response.body).to.have.property("per_page");
      expect(response.body).to.have.property("total_pages");
    });
  });

  //   it.only("should return empty data for non-existent page", () => {
  //     cy.request({
  //       method: "GET",
  //       url: `${apiUrl}?page=999`,
  //     }).then((response) => {
  //       expect(response.status).to.eq(200);
  //       expect(response.body.data).to.be.an("array").that.is.empty;
  //     });
  //   });

  //   it.only("should handle invalid query parameters gracefully", () => {
  //     cy.request({
  //       method: "GET",
  //       url: `${apiUrl}?page=abc`,
  //       failOnStatusCode: false,
  //     }).then((response) => {
  //       expect(response.status).to.eq(400); // Adjust based on API behavior
  //     });
  //   });

  //   it.only("should verify SQL injection prevention", () => {
  //     cy.request({
  //       method: "GET",
  //       url: `${apiUrl}?page=1; DROP TABLE users;`,
  //       failOnStatusCode: false,
  //       headers: {
  //         "Content-Type": "application/json",
  //         "x-api-key": "reqres-free-v1",
  //       },
  //     }).then((response) => {
  //       expect(response.status).to.eq(400); // Adjust based on API behavior
  //     });
  //   });
});
