describe("GET Requests", () => {
  it("Passing Queery parameters", () => {
    cy.request({
      method: "GET",
      url: "https://reqres.in/api/users",
      qs: { page: 2 },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.page).to.eq(2);
      expect(response.body.data.length).to.be.greaterThan(0);
      expect(response.body.data).have.length(6);
    });
  });
});
