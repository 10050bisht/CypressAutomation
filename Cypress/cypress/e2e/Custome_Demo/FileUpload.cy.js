import "cypress-file-upload";
describe("File Uplaod", () => {
  it("Single File Upload", () => {
    // Single file Upload
    cy.visit("https://the-internet.herokuapp.com/upload");

    cy.get("#file-upload").attachFile("dummy.pdf");
    cy.wait(2000);

    cy.get("#file-submit").click();
    cy.wait(3000);

    cy.get("div[class='example'] h3").should("have.text", "File Uploaded!");
  });

  it.only("File uplaod Rename", () => {
    //Rename the File
    cy.visit("https://the-internet.herokuapp.com/upload");

    cy.get("#file-upload").attachFile({
      filePath: "dummy.pdf",
      fileName: "newdummy.pdf",
    });
    cy.wait(2000);

    cy.get("#file-submit").click();
    cy.wait(3000);

    cy.get("div[class='example'] h3").should("have.text", "File Uploaded!");
  });

  it("File Uplaod - Drag & Drop", () => {});

  it("Multiple file Upload", () => {});

  it("File Uplaod - Shadow Don", () => {});
});
