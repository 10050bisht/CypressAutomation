describe("Header and Cookies", () => {
  let authToken = null;

  before("Passing Headers", () => {
    cy.request({
      method: "POST",
      url: "https://simple-books-api.glitch.me/api-clients",
      headers: {
        "content-type": "application/json",
      },
      body: {
        clientName: "ABC",
        email: `test${Date.now()}@example.com`, // Generate a valid email
      },
    }).then((response) => {
      expect(response.status).to.eq(201); // Ensure the request was successful
      authToken = response.body.accessToken; // Store the token for later use
    });
  });

  before("Creating New Order", () => {
    // Ensure the authToken is available before making the request
    cy.wrap(null).then(() => {
      expect(authToken).to.not.be.null; // Assert that the token is not null
      cy.request({
        method: "POST",
        url: "https://simple-books-api.glitch.me/orders",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${authToken}`, // Use the stored token
        },
        body: {
          bookId: "1",
          customerName: "John",
        },
      }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body.created).to.eq(true);
      });
    });
  });

  it("Fetching the Orders", () => {
    // Set a cookie before making the request
    cy.setCookie("Mycookie", "cookieValue");

    cy.request({
      method: "GET",
      url: "https://simple-books-api.glitch.me/orders/",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`, // Use the stored token
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.length(1); // Ensure one order is fetched
    });
  });
});
