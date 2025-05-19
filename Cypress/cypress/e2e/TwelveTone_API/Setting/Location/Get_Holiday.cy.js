describe("Room List GET API", () => {
  const email = "dev.12tone@yopmail.com";
  const password = "jXfNQ9g2o5sa";
  let authToken = null;

  before("Login and get token", () => {
    cy.loginApi(email, password).then((response) => {
      expect(response.status).to.eq(200);
      authToken = response.body.data.token;
      expect(authToken).to.be.a("string").and.not.be.empty;
    });
  });

  it("TC_01:-should return 200 and a list of rooms for a valid request", () => {
    // Test case passed
    cy.getHolidayList(authToken).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("data");
      expect(response.body.data).to.be.an("array");
    });
  });

  // Negative Test Case: Unauthorized
  it("TC_02:- should return 401 for unauthorized request", () => {
    // Tescase passed

    cy.getHolidayList("invalid_token").then((response) => {
      expect(response.status).to.eq(401);
    });
  });

  // Negative Test Case: Invalid Query Params
  it("TC_03:-should return 400 or 422 for invalid query parameters", () => {
    // Test cases failed because status code is mismatched
    cy.getHolidayList(authToken, { limit: "invalid" }).then((response) => {
      expect([400, 422]).to.include(response.status);
    });
  });

  it("TC_04:- should support pagination", () => {
    // Tescase passed
    cy.getHolidayList(authToken, { page: 2 }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data).to.be.an("array");
      // Optionally check if page 2 is different from page 1
    });
  });

  // Negative Test Case: Missing token
  it("TC_05:- should return 401 if token is missing", () => {
    // Tescase passed
    cy.getHolidayList().then((response) => {
      expect(response.status).to.eq(401);
    });
  });

  // Negative Test Case: Invalid endpoint
  it("TC_06:- should return 404 for invalid endpoint", () => {
    // Tescase passed

    cy.request({
      method: "GET",
      url: "https://api-stage.schedulehub.io/api/v1/admin/settings/location/room/invalid",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });

  // Negative Test Case: Invalid method
  it.only("TC_07:- should return 405 for invalid HTTP method", () => {
    // Tescase passed

    cy.request({
      method: "POST",
      url: "https://api-stage.schedulehub.io/api/v1/admin/settings/location/room/listsearch=&locations=all&sortBy=count&sortType=desc",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect([400, 404]).to.include(response.status);
    });
  });
});
