describe("POST Requests", () => {
  it("Approach 1 -- Hard Coded json object", () => {
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
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("name", "Apple MacBook Pro 16");
      expect(response.body.data).to.deep.equal(requestbody.data);
    });
  });

  it("Approach 2 -- Dynamically generating json object", () => {
    const requestbody = {
      name: Math.random().toString(36).substring(7), // Random string for name
      data: {
        year: Math.random() * 2023, // Random year between 0 and 2023
        price: Math.random() * 2000, // Random price between 0 and 2000
        "CPU model": Math.random().toString(36).substring(7), // Random string for CPU model
        "Hard disk size": Math.floor(Math.random() * 1000) + " GB", // Random size between 0 and 1000 GB
      },
    };

    cy.request({
      method: "POST",
      url: "https://api.restful-api.dev/objects",
      body: requestbody,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.name).to.eq(requestbody.name);
      expect(response.body.data).to.deep.equal(requestbody.data);
    });
  });

  it.only("Approach 3 -- Using Fixture", () => {
    cy.fixture("PostCall").then((data) => {
      const requestbody = data; // Assuming the fixture file contains the JSON object directly{

      cy.request({
        method: "POST",
        url: "https://api.restful-api.dev/objects",
        body: requestbody,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.name).to.eq(requestbody.name);
        expect(response.body.data).to.deep.equal(requestbody.data);
      });
    });
  });
});
