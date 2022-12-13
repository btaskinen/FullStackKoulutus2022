import Footer from "./Footer";

describe("Confirm footer text", () => {
  it("check footer text", () => {
    cy.mount(<Footer />);
    cy.get(".footer").should("contain.text", "2022 Barbara Taskinen");
  });
});
