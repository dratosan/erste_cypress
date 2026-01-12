/// <reference types="cypress" />

export class LoginPage {
  private usernameInput: string = "#user";
  private secretInput: string = "#secret";
  private submitButton: string = "#submitButton";
  private descriptionText: string = "#description";

  public visit(): void {
    const fullAuthUrl =
      "https://login.fat.sparkasse.at/sts/oauth/authorize?client_id=georgeclient&response_type=token&redirect_uri=https%3A%2F%2Fgeorge.fat3.sparkasse.at%2Findex.html";
    // Nastavíme velké rozlišení, aby byl vyhledávač hned vidět
    cy.viewport(1920, 1080);
    // Jdeme přímo na login, bez cy.origin
    cy.visit(fullAuthUrl);

    // Počkáme, až se objeví input
    cy.get(this.usernameInput, { timeout: 20000 }).should("be.visible");
  }

  public enterUsernameFromEnv(): void {
    const user = Cypress.env("USERNAME");
    if (!user) throw new Error("USERNAME is not defined in cypress.env.json");

    cy.get(this.usernameInput).should("be.visible").clear().type(user);
    cy.get(this.submitButton).click({ force: true });
  }

  public verifyOtpStep(): void {
    cy.get(this.descriptionText, { timeout: 15000 })
      .should("be.visible")
      .and("contain.text", "personal");

    cy.get(this.secretInput).should("be.visible").and("be.enabled");
  }

  public enterOtpFromEnv(): void {
    const otp = Cypress.env("OTP");
    if (!otp) throw new Error("OTP is not defined in cypress.env.json");

    cy.get(this.secretInput).should("be.visible").type(otp, { log: false });
  }

  public submit(): void {
    cy.get(this.submitButton).should("be.visible").click({ force: true });
  }
}
