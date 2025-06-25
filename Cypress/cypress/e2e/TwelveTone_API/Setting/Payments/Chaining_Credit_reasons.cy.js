describe("Credit Reason Chaining: Add and Verify", () => {
  const email = "dev.12tone@yopmail.com";
  const password = "jXfNQ9g2o5sa";
  let authToken = null;
  const uniqueTitle = `Test Reason ${Date.now()}`;

  before("Login and get token", () => {
    cy.loginApi(email, password).then((response) => {
      expect(response.status).to.eq(200);
      authToken = response.body.data.token;
      expect(authToken).to.be.a("string").and.not.be.empty;
    });
  });

  it("should create a credit reason and verify it appears in the list", () => {
    // Step 1: Create Credit Reason
    cy.createCreditReason(authToken, {
      title: uniqueTitle,
      description: "Chaining test description",
      hexCode: "#08AC67",
      status: "active",
      existedId: null,
    }).then((createResponse) => {
      expect([200, 201]).to.include(createResponse.status);
      expect(createResponse.body).to.have.property("message");

      // Step 2: Get Credit Reason List and verify the new reason is present
      cy.getCreditReson(authToken, { search: uniqueTitle }).then(
        (listResponse) => {
          expect(listResponse.body)
            .to.have.property("data")
            .that.is.an("array");
          const createdCreditReason = listResponse.body.data.find(
            (reason) => reason.title === uniqueTitle
          );
          expect(createdCreditReason, "Created credit reason is in the list").to
            .exist;
          const creditReasonId = createdCreditReason._id;

          // Step 3: Delete the credit reason using its _id
          cy.deleteCreditReason(authToken, creditReasonId).then(
            (deleteResponse) => {
              expect([200, 204]).to.include(deleteResponse.status);
              expect(deleteResponse.body).to.have.property(
                "message",
                "Deleted Successfully"
              );
            }
          );
        }
      );
    });
  });
});
