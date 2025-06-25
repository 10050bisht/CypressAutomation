describe("Add Songs API Tests", () => {
  const email = "dev.12tone@yopmail.com";
  const password = "jXfNQ9g2o5sa";
  let authToken = null;
  const uniqueSongName = Math.random()
    .toString(36)
    .replace(/[^a-zA-Z]+/g, "")
    .substring(0, 8);
  const uniqueArtistName = Math.random()
    .toString(36)
    .replace(/[^a-zA-Z]+/g, "")
    .substring(0, 8);
  before("Login and get token", () => {
    cy.loginApi(email, password).then((response) => {
      expect(response.status).to.eq(200);
      authToken = response.body.data.token;
      expect(authToken).to.be.a("string").and.not.be.empty;
    });
  });

  it("Test001 : Should fails to create songs with blank fields", () => {
    // Test case Passed - status code and error message are verified
    cy.createSong(authToken, {}).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property("success", false);
      expect(response.body.message).to.include("Song name is required field");
    });
  });

  it("Test002 : Should fails to create songs with blank song name", () => {
    // Test case Passed - status code and error message are verified
    cy.createSong(authToken, {
      song_name: "",
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property("success", false);
      expect(response.body.message).to.include(
        '"song_name" is not allowed to be empty'
      );
    });
  });

  it("Test003 : Should fails to create songs with inalvid and special character song name", () => {
    // Test case failed -  error message are mismatched
    cy.createSong(authToken, {
      song_name: "song@123",
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property("success", false);
      expect(response.body.message).to.include(
        "Songs name must only contain letters"
      );
    });
  });

  it("Test004 : Should fails to create songs with Valid song name", () => {
    // Test case Passed - status code and error message are verified
    cy.createSong(authToken, {
      song_name: uniqueSongName,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property("success", false);
      expect(response.body.message).to.include("Artist is required field");
    });
  });

  it("Test005 : Should fails to create songs with blank Artist name", () => {
    // Test case Passed - status code and error message are verified
    cy.createSong(authToken, {
      song_name: uniqueSongName,
      artist_name: "",
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property("success", false);
      expect(response.body.message).to.include(
        '"artist_name" is not allowed to be empty'
      );
    });
  });

  it("Test006 : Should fails to create songs with invalid Artist name", () => {
    // Test case failed -  error message are mismatched
    cy.createSong(authToken, {
      song_name: uniqueSongName,
      artist_name: "test@123",
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property("success", false);
      expect(response.body.message).to.include(
        "Artish name must only contain letters"
      );
    });
  });

  it("Test007 : Should fails to create songs with Valid Artist name", () => {
    // Test case Passed - status code and error message are verified
    cy.createSong(authToken, {
      song_name: uniqueSongName,
      artist_name: uniqueArtistName,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property("success", false);
      expect(response.body.message).to.include(
        "Embed iframe link is required field"
      );
    });
  });

  it("Test008 : Should fails to create songs with Blank embded iframe", () => {
    // Test case Passed - status code and error message are verified
    cy.createSong(authToken, {
      song_name: uniqueSongName,
      artist_name: uniqueArtistName,
      embed_iframe_link: "",
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property("success", false);
      expect(response.body.message).to.include(
        '"embed_iframe_link" is not allowed to be empty'
      );
    });
  });

  it("Test009: Should fails to create songs with invalid embded iframe", () => {
    // Test case Passed - status code and error message are verified
    cy.createSong(authToken, {
      song_name: uniqueSongName,
      artist_name: uniqueArtistName,
      embed_iframe_link: "test@123",
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property("success", false);
      expect(response.body.message).to.include(
        '"embed_iframe_link" is not allowed to be empty'
      );
    });
  });

  it.only("Test00: Should fails to create songs with invalid embded iframe", () => {
    // Test case Passed - status code and error message are verified
    cy.createSong(authToken, {
      song_name: uniqueSongName,
      artist_name: uniqueArtistName,
      embed_iframe_link: "test@123",
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property("success", false);
      expect(response.body.message).to.include(
        '"embed_iframe_link" is not allowed to be empty'
      );
    });
  });

  it("Test00 : should create a song successfully", () => {
    //  Test case Passed - creating a song with valid data
    cy.createSong(authToken, {
      instrument_id: "67dd517adc860814f620e4a4",
      song_name: uniqueSongName,
      artist_name: uniqueArtistName,
      embed_iframe_link: "Quia aute sunt aute",
      difficulty: "beginner",
      existedSongId: "",
    }).then((response) => {
      expect([200, 201]).to.include(response.status);
      expect(response.body).to.have.property("success", true);
      expect(response.body).to.have.property("message", "Created Successfully");
    });
  });
});
