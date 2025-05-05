// import "./commands";

// describe("User List API with Token Management", () => {
//   before(() => {
//     // Login and store token
//     cy.request({
//       method: "POST",
//       url: "https://staging.topdriverdev.com/login",
//       body: {
//         email: "topdrivera@yopmail.com",
//         password: "Password@123aa",
//       },
//     }).then((res) => {
//       expect(res.status).to.eq(200);
//       Cypress.env("accessToken", res.body.accessToken); // Store token
//     });
//   });

//   it("should fetch user list with stored token", () => {
//     cy.request({
//       method: "GET",
//       url: "https://uat.topdriverdev.com/api/v1/admin/settings/users",
//       headers: {
//         Authorization: `Bearer ${Cypress.env("accessToken")}`,
//       },
//     }).then((res) => {
//       expect(res.status).to.eq(200);
//       expect(res.body).to.be.an("array");
//     });
//   });

//   it("should refresh token if expired", () => {
//     // Simulate token expiration
//     Cypress.env("accessToken", "expiredToken");

//     // Refresh token
//     cy.request({
//       method: "POST",
//       url: "https://uat.topdriverdev.com/api/v1/auth/refresh",
//       headers: {
//         Authorization: `Bearer ${Cypress.env("accessToken")}`,
//       },
//     }).then((res) => {
//       expect(res.status).to.eq(200);
//       Cypress.env("accessToken", res.body.accessToken); // Update token
//     });

//     // Retry fetching user list with refreshed token
//     cy.request({
//       method: "GET",
//       url: "https://uat.topdriverdev.com/api/v1/admin/settings/users",
//       headers: {
//         Authorization: `Bearer ${Cypress.env("accessToken")}`,
//       },
//     }).then((res) => {
//       expect(res.status).to.eq(200);
//       expect(res.body).to.be.an("array");
//     });
//   });
// });

// describe("Users Listing API Tests", () => {
//   const apiUrl = "https://uat.topdriverdev.com/api/v1/admin/settings/users"; // Replace with your actual API endpoint

//   // Positive Test Case: Verify successful retrieval of users
//   it("should successfully retrieve the list of users", () => {
//     cy.request({
//       method: "GET",
//       url: apiUrl,
//     }).then((response) => {
//       expect(response.status).to.eq(200);

//       // Assert the response structure
//       expect(response.body).to.have.property("data"); // Ensure 'data' exists
//       expect(response.body.data).to.be.an("array"); // Ensure 'data' is an array

//       // Find a specific user in the 'data' array and assert their properties
//       const user = response.body.data.find((user) => user.id === 10); // Find user with id 10
//       expect(user).to.exist; // Ensure the user exists
//       expect(user).to.have.property("createdAt");
//       //   expect(user).to.have.property("first_name", "Byron");
//       //   expect(user).to.have.property("email", "byron.fields@reqres.in");
//     });
//   });
// });

// describe("Mocking User List API", () => {
//   beforeEach(() => {
//     cy.intercept(
//       "GET",
//       "https://uat.topdriverdev.com/api/v1/admin/settings/users",
//       {
//         statusCode: 200,
//         body: [
//           { id: 1, name: "John Doe" },
//           { id: 2, name: "Jane Smith" },
//         ],
//       }
//     ).as("getUserList");
//   });

//   it("should fetch mocked user list", () => {
//     cy.request(
//       "GET",
//       "https://uat.topdriverdev.com/api/v1/admin/settings/users"
//     ).then((res) => {
//       expect(res.status).to.eq(200);
//       expect(res.body).to.be.an("array");
//       expect(res.body[0]).to.have.property("name", "John Doe");
//     });
//   });
// });
import "cypress-plugin-api";
describe("User List API with Cypress Plugin", () => {
  it("should fetch user list using cypress-plugin-api", () => {
    cy.api({
      method: "GET",
      url: "https://uat.topdriverdev.com/api/v1/admin/settings/users",
      headers: {
        Authorization: `Bearer ${Cypress.env("accessToken")}`,
      },
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.be.an("array");
    });
  });
});
