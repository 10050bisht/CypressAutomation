describe("Create User API Tests", () => {
  const email = "dev.12tone@yopmail.com";
  const password = "jXfNQ9g2o5sa";
  let authToken = null;
  const endpoint =
    "https://api-stage.schedulehub.io/api/v1/admin/settings/user-access/user";
  before("Login and get token", () => {
    cy.loginApi(email, password).then((response) => {
      expect(response.status).to.eq(200);
      authToken = response.body.data.token; // Store the token for later use
      expect(authToken).to.be.a("string").and.not.be.empty;
    });
  });

  it("Fetch all users (status=all)", () => {
    cy.getUserList(authToken, { search: "", status: "all", page: 1 }).then(
      (response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("success", true);
        expect(response.body.data).to.not.be.null;
        expect(response.body.data.data)
          .to.be.an("array")
          .and.have.length.greaterThan(0);

        const user = response.body.data.data[0];
        expect(user).to.have.property("email").and.to.include("@");
      }
    );
  });

  it("TC02 - Fetch only active users", () => {
    cy.getUserList(authToken, { search: "", status: "active", page: 1 }).then(
      (response) => {
        expect(response.status).to.eq(200);
        const users = response.body.data.data;

        // Check if at least one user has status "inactive"
        const hasInactive = users.some((user) => user.status === "active");

        expect(hasInactive).to.be.true; // Test passes only if at least one is inactive
      }
    );
  });

  it("TC03 - Fetch only inactive users", () => {
    cy.getUserList(authToken, { search: "", status: "inactive", page: 1 }).then(
      (response) => {
        expect(response.status).to.eq(200);
        const users = response.body.data.data;

        // Check if at least one user has status "inactive"
        const hasInactive = users.some((user) => user.status === "inactive");

        expect(hasInactive).to.be.true; // Test passes only if at least one is inactive
      }
    );
  });

  it("TC04 - Search for user by name", () => {
    cy.getUserList(authToken, { search: "", status: "all", page: 1 }).then(
      (response) => {
        expect(response.status).to.eq(200);
        const users = response.body.data.data;

        const hasJohn = users.some(
          (user) => user.firstName.toLowerCase() === "john"
        );
        expect(hasJohn).to.be.true; // ✅ Test passes if at least one user has firstName "john"
      }
    );
  });

  it("TC05 - Search with no matching responseult", () => {
    cy.getUserList(authToken, { search: "", status: "all", page: 1 }).then(
      (response) => {
        expect(response.status).to.eq(200);
        const users = response.body.data.data;

        const hasJohn = users.some(
          (user) => user.firstName.toLowerCase() === "adssad"
        );
        expect(hasJohn).to.be.true;
      }
    );
  });

  it("TC09 - Fetch without token should return 401", () => {
    cy.request({
      method: "GET",
      url: `${endpoint}?status=all&page=1`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body.message).to.include("Access Denied, Token Required");
    });
  });

  it("TC10 - Fetch with invalid token should return 401", () => {
    cy.request({
      method: "GET",
      url: `${endpoint}?status=all&page=1`,
      headers: {
        Authorization: `Bearer invalid_token`,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body.message).to.include("Invalid Authentication Token");
    });
  });
});
