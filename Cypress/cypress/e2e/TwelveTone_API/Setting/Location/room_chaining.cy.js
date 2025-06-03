describe("Add Room and Verify in Room List, and delete it", () => {
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

  it("should add a room, verify it in the list, then delete it", () => {
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

      // Step 2: Get Room List and find the created room's _id
      cy.getRoomList(authToken).then((listResponse) => {
        expect(listResponse.body).to.have.property("data").that.is.an("array");
        const createdRoom = listResponse.body.data.find(
          (room) => room.name === uniqueRoomName
        );
        expect(createdRoom, "Created room is in the room list").to.exist;

        // Step 3: Delete the room using its _id
        cy.deleteRoom(authToken, createdRoom._id).then((deleteResponse) => {
          expect(deleteResponse.status).to.eq(200);
          expect(deleteResponse.body).to.have.property(
            "message",
            "Deleted Successfully"
          );
        });
      });
    });
  });
});
