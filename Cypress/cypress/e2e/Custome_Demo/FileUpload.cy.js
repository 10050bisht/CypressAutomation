import "cypress-file-upload";
describe("File Uplaod", () => {
  // Single File Uplaod
  it("Single File Upload", () => {
    cy.visit("https://the-internet.herokuapp.com/upload");

    cy.get("#file-upload").attachFile("dummy.pdf");
    cy.wait(2000);

    cy.get("#file-submit").click();
    cy.wait(3000);

    cy.get("div[class='example'] h3").should("have.text", "File Uploaded!");
  });

  //Rename the File
  it("File uplaod Rename", () => {
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

  it("File Uplaod - Drag & Drop", () => {
    cy.visit("https://the-internet.herokuapp.com/upload");

    cy.get("#drag-drop-upload").attachFile("dummy.pdf", {
      subjectType: "drag-n-drop",
    });
    cy.wait(5000);
    cy.get(
      "#drag-drop-upload > .dz-preview > .dz-details > .dz-filename > span"
    ).contains("dummy.pdf");
  });

  it("Multiple file Upload", () => {
    cy.visit("https://davidwalsh.name/demo/multiple-file-upload.php");
    cy.get("#filesToUpload").attachFile([
      "dummy.pdf",
      "Seven-Basic-Guitar-Chords-Maj-Minor-7th_600_72",
    ]);

    cy.get("ul[id='fileList'] li").should(
      "not.contain.text",
      "No Files Selected"
    );
  });

  it.only("File Uplaod - Shadow Don", () => {
    cy.visit("https://www.htmlelements.com/demos/fileupload/shadow-dom");
  });
});
