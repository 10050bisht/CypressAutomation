describe("POST Requests", () => {
  it.only("Approach 1 -- Hard Coded json object", () => {
    const requestbody = {
      name: "Apple MacBook Pro 16",
      data: {
        year: 2019,
        price: 1849.99,
        "CPU model": "Intel Core i9",
        "Hard disk size": "1 TB",
      },
    };

    cy.request({
      method: "POST",
      url: "https://api.restful-api.dev/objects",
      body: requestbody,
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property("name", "Apple MacBook Pro 16");
      expect(response.body.data).to.deep.equal(requestbody.data);
    });
  });
});
