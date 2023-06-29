/// <reference types="cypress" />

describe("login to quiz app", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("successful login to quiz page", () => {
    // cy.visit("http://localhost:3000/");
    cy.get("#user-email").type("andrea@gmail.com");
    cy.get("#password").type("andrea85");
    cy.get('[data-cy="login-page-login-button"]').click();
    cy.get(".display-loggedin-user").should(
      "have.text",
      "You are logged in as andrea@gmail.com"
    );
  });

  it("unsuccessful login to quiz page: wrong password", () => {
    cy.get("#user-email").type("andrea@gmail.com");
    cy.get("#password").type("andrea");
    cy.get('[data-cy="login-page-login-button"]').click();
    cy.on("window:alert", (str) => {
      expect(str).to.equal(
        `"password" length must be at least 8 characters long`
      );
    });
  });

  it("unsuccessful login to quiz page: wrong email", () => {
    cy.get("#user-email").type("andrea85@gmail.com");
    cy.get("#password").type("andrea85");
    cy.get('[data-cy="login-page-login-button"]').click();
    cy.on("window:alert", (str) => {
      expect(str).to.equal(`User with this email does not exist`);
    });
  });

  it("getting to register page from login page", () => {
    cy.get('[data-cy="login-page-register-button"]').click();
    cy.get("h1").should("have.text", "Create Account");
  });
});
