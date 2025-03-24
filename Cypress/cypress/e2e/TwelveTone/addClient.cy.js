describe("Add Contact Test cases", () => {
  beforeEach(() => {
    cy.visit("https://stage.schedulehub.io"); // Runs before each test
    cy.loginapp("test@gmail.com", "123456"); // Custom login command
    cy.wait(5000);
    cy.contains("button", "Add Contact").click();
  });

  it("add Contact with inaldi email format", () => {
    cy.wait(3000);
    cy.get('input[name="email"]').type("johnyopmail.com");

    cy.contains("button", "Add Client").click();
    cy.contains("p", "Please enter a valid email address").should(
      "have.text",
      "Please enter a valid email address"
    );
  });

  it("Verify error message for the blank fields", () => {
    cy.wait(3000);
    cy.contains("button", "Add Client").click();
    cy.contains("p", "This is required field").should(
      "have.text",
      "This is required field"
    ); // Error message verification for the First and last name

    cy.contains("p", "Please enter a valid phone number").should(
      "have.text",
      "Please enter a valid phone number"
    ); //Verify error message for the Phone no. field
    cy.contains("p", "Please enter a valid email address").should(
      "have.text",
      "Please enter a valid email address"
    ); // Verify error message for the Email field
  });
  it("add Contact with Allready added email", () => {
    cy.wait(5000);

    cy.get('input[name="firstName"]').type("John");
    cy.get('input[name="lastName"]').type("Doe");
    cy.get('input[name="phoneNo"]').type("9876789876");

    cy.get(".MuiInputBase-root > #phoneType").click();
    cy.get('li[data-value="cell"]').click();
    cy.get('input[name="email"]').type("john@yopmail.com");
    cy.get(".MuiInputBase-root > #leadType").click();
    cy.get('li[data-value="Online"]').click();
    cy.get(".MuiInputBase-root > #medium").click();
    cy.get('[data-value="Youtube"]').click();

    cy.contains("button", "Add Client").click();
    cy.get(".Toastify__toast-body > :nth-child(2)").should(
      "have.text",
      "Email already exists"
    );
  });

  it("add Contact with Invalid Phone No. ", () => {
    cy.wait(5000);

    cy.get('input[name="firstName"]').type("John");
    cy.get('input[name="lastName"]').type("Doe");
    cy.get('input[name="phoneNo"]').type("(987) 678-9876"); // we have to enter invalid Phone no.

    cy.get(".MuiInputBase-root > #phoneType").click();
    cy.get('li[data-value="cell"]').click();
    cy.get('input[name="email"]').type("john231@yopmail.com"); // Every time we have to enter unique email
    cy.get(".MuiInputBase-root > #leadType").click();
    cy.get('li[data-value="Online"]').click();
    cy.get(".MuiInputBase-root > #medium").click();
    cy.get('[data-value="Youtube"]').click();
    cy.contains("button", "Add Client").click();
    cy.get(".Toastify__toast-body > :nth-child(2)").should(
      "have.text",
      "Please enter a valid phone number,A contact already exists for this number."
    ); // Verify error message for the Phone no. field with invalid Phone No. , for this we have to uopdate email every time
  });

  it.skip("add Contact with Valid Data ", () => {
    cy.wait(5000);

    cy.get('input[name="firstName"]').type("John");
    cy.get('input[name="lastName"]').type("Doe");
    cy.get('input[name="phoneNo"]').type("3132108690"); // we have to enter valid phone no.

    cy.get(".MuiInputBase-root > #phoneType").click();
    cy.get('li[data-value="cell"]').click();
    cy.get('input[name="email"]').type("test4Johan@yopmail.com"); // We have to Update email every time for the Add contact with valid data
    cy.get(".MuiInputBase-root > #leadType").click();
    cy.get('li[data-value="Online"]').click();
    cy.get(".MuiInputBase-root > #medium").click();
    cy.get('[data-value="Youtube"]').click();
    cy.contains("button", "Add Client").click();
    cy.get(".Toastify__toast-body > :nth-child(2)").should(
      "have.text",
      "Lead Created Successfully"
    );
  });
});
