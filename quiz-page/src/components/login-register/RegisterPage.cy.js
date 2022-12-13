/// <reference types="cypress" />
import RegisterPage from "./RegisterPage";

describe("should mount", () => {
  beforeEach(() => {
    cy.mount(<RegisterPage />);
  });

  it("mounted and confirm correct component", () => {
    cy.get("h1").should("have.text", "Create Account");
  });

  it("confirm that password is shown when checkbox is clicked", () => {
    cy.get('[placeholder="Name"]').type("Barbara");
    cy.get('[placeholder="example@email.com"]').type("barbara@gmail.com");
    cy.get("#password1").type("12345678");
    cy.get("#password2").type("12345678");
    cy.get("input.checkbox").check();
    cy.get("#password1").should("have.property", "text");
    cy.get("#password2").should("have.property", "text");
  });

  it("Successful submission", () => {
    cy.get('[placeholder="Name"]').type("Barbara");
    cy.get('[placeholder="example@email.com"]').type("barbara@gmail.com");
    cy.get("#password1").type("12345678");
    cy.get("#password2").type("12345678");
    cy.get(".button-container > :nth-child(1)").click();
    cy.on("window:alert", (str) => {
      expect(str).to.equal(`You hav been registered!`);
    });
  });

  it("Unsuccsessful Registration due to too invalid email", () => {
    cy.mount(<RegisterPage />);
    cy.get('[placeholder="Name"]').type("Barbara");
    cy.get('[placeholder="example@email.com"]').type("barbaragmail.com");
    cy.get("#password1").type("12345678");
    cy.get("#password2").type("12345678");
    cy.get(".button-container > :nth-child(1)").click();
    cy.on("window:alert", (str) => {
      expect(str).to.equal(`"user_email" must be a valid email`);
    });
  });

  it("Unsuccsessful Registration due to too short password", () => {
    cy.mount(<RegisterPage />);
    cy.get('[placeholder="Name"]').type("Barbara");
    cy.get('[placeholder="example@email.com"]').type("barbara@gmail.com");
    cy.get("#password1").type("1234567");
    cy.get("#password2").type("1234567");
    cy.get(".button-container > :nth-child(1)").click();
    cy.on("window:alert", (str) => {
      expect(str).to.equal(
        `"password" length must be at least 8 characters long`
      );
    });
  });
});
