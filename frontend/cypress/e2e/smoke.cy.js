describe("Frontend smoke test", () => {
  it("loads the app", () => {
    cy.visit("/");
    cy.get("#root").should("exist");
  });
});
