describe("Add Room and Verify in Room List", () => {
  const email = "dev.12tone@yopmail.com";
  const password = "jXfNQ9g2o5sa";
  const uniqueRoomName = `Room${Date.now()}`;
  const roomNumber = Math.floor(Math.random() * 10000);
  const locationId = "6666a0b083c6ec5a88dbe997";

  let authToken = null;

  before("Login and get token", () => {
    cy.loginApi(email, password).then((response) => {
      expect(response.status).to.eq(200);
      authToken = response.body.data.token;
      expect(authToken).to.be.a("string").and.not.be.empty;
    });
  });

  it("should add a room and verify it appears in the room list", () => {
    // Step 1: Add Room
    cy.addRoom(authToken, {
      data: {
        name: uniqueRoomName,
        number: roomNumber,
        location_id: locationId,
      },
    }).then((addResponse) => {
      expect(addResponse.status).to.eq(200);
      expect(addResponse.body).to.have.property(
        "message",
        "Room created successfully"
      );

      // Step 2: Get Room List and verify the new room is present
      cy.getRoomList(authToken).then((listResponse) => {
        cy.log(JSON.stringify(listResponse.body)); // Debug log
        expect(listResponse.body).to.have.property("data").that.is.an("array");
        const found = listResponse.body.data.some(
          (room) => room.name === uniqueRoomName
          // room.number === roomNumber &&
          // room.location_id === locationId
        );
        expect(found, "Created room is in the room list").to.be.true;
      });
    });
  });
});
