import Navbar from "./Navbar";

describe("testing QuizButton component", () => {
  it("buttons should contain correct text", () => {
    cy.mount(<Navbar />);
    cy.get('[data-cy="nav-login-button"]').should("have.text", "Login");
    cy.get('[data-cy="nav-register-button"]').should("have.text", "Register");
    cy.get('[data-cy="nav-help-button"]').should("have.text", "Help");
  });
});
