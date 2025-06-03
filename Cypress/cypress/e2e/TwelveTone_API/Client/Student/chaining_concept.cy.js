describe("Demo API - Reuse and Chaining with Commands", () => {
  it("should create a student and verify it appears in the student list, after delete student and verify it remove from the student list ", () => {
    const uniqueEmail = `student${Date.now()}@yopmail.com`;

    // Step 1: Login and get the token using custom command
    cy.loginApi("dev.12tone@yopmail.com", "jXfNQ9g2o5sa").then(
      (loginResponse) => {
        const token = loginResponse.body.data.token;

        // Step 2: Create a student using custom command
        cy.createStudent(token, {
          leadId: "681b18a312021697791be55b",
          firstName: "aman",
          lastName: "kumar",
          birthDate: "1998-10-12T06:30:00.000Z",
        }).then((createResponse) => {
          cy.log(JSON.stringify(createResponse.body)); // Debug log

          const student_id = createResponse.body.data._id;
          const studentLeadId = createResponse.body.data.leadId;

          // Step 3: Verify the created student the get api

          cy.getStudentLead(token, studentLeadId).then((getResponse) => {
            expect(getResponse.body.data).to.be.an("array");
            const found = getResponse.body.data.some(
              (student) => student._id === student_id
            );
            expect(found, "Created student is in the student list").to.be.true;
          });

          // Step 4: Delete the created student
          cy.deletStudent(token, student_id).then((deleteResponse) => {
            // expect(deleteResponse.status).to.eq(200);
            expect(deleteResponse.body.message).to.eq("Deleted Successfully");
          });

          // Step 5: Verify the student is deleted
          cy.getStudentLead(token, studentLeadId).then((getResponse) => {
            expect(getResponse.body.data).to.be.an("array");
            const found = getResponse.body.data.some(
              (student) => student._id === student_id
            );
            expect(found, "Created student is in the student list").to.be.false;
          });
        });
      }
    );
  });
});
