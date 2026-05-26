describe("Workflow Editor E2E", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should load the application", () => {
    cy.contains("Структура рабочего процесса").should("be.visible");
  });

  it("should load workflow steps from backend", () => {
    cy.get("table").should("be.visible");
  });
});
