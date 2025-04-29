describe("HTTP Requests", () => {
  const baseUrl = "https://jsonplaceholder.typicode.com";

  it("GET Request", () => {
    cy.request("GET", `${baseUrl}/posts/1`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("id", 1);
    });
  });

  it("POST Request", () => {
    cy.request("POST", `${baseUrl}/posts`, {
      title: "foo",
      body: "bar",
      userId: 1,
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property("title", "foo");
    });
  });

  it("PUT Request", () => {
    cy.request("PUT", `${baseUrl}/posts/1`, {
      id: 1,
      title: "updated title",
      body: "updated body",
      userId: 1,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("title", "updated title");
    });
  });

  it("DELETE Request", () => {
    cy.request("DELETE", `${baseUrl}/posts/1`).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
