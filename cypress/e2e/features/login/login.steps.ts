import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
// Corrected relative paths based on your project structure
import { LoginPage } from "../../../pages/LoginPage";
import { TransactionsPage } from "../../../pages/TransactionsPage";

const loginPage = new LoginPage();
const transactionsPage = new TransactionsPage();

Given("I am on the George login page", () => {
  // Enforcing desktop viewport to ensure search UI elements are not hidden by responsive design
  cy.viewport(1920, 1080);
  loginPage.visit();
});

When("I log in with valid credentials", () => {
  loginPage.enterUsernameFromEnv();
  loginPage.enterOtpFromEnv();
  loginPage.submit();
  // Critical: Wait for the dashboard load before proceeding to search
  transactionsPage.waitForDashboard();
});

When("I search for {string} in the transactions", (keyword: string) => {
  transactionsPage.performSearch(keyword);
});

Then(
  "I should see a list of transactions related to {string}",
  (keyword: string) => {
    transactionsPage.verifySearchResults(keyword);
  }
);
