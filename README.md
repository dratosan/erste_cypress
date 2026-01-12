# George AT - Transaction Search Automation

This project automates the login and transaction search functionality within the **George AT Test Environment**. It is built using **Cypress.io** with a **Cucumber (BDD)** integration and follows the **Page Object Model (POM)** design pattern.

## 🚀 Key Features

- **Behavior Driven Development:** Scenarios are defined in Gherkin for clarity and stakeholder collaboration.
- **Smart Search Validation:** The framework handles both positive matches (listing transactions) and negative matches (handling the "I'm sorry" empty state) caused by literal string matching (e.g., "Fashion.").
- **Stability Focused:** Implements custom timeouts and viewport management to handle the heavy-load nature of the banking test environment.

## 📁 Project Structure

The project is organized to separate business logic from technical implementation:

- `cypress/e2e/features/`: Contains Gherkin `.feature` files.
- `cypress/e2e/features/search/`: Contains step definitions mapping Gherkin to TypeScript logic.
- `cypress/pages/`: Contains Page Objects (LoginPage, TransactionsPage) to encapsulate UI selectors and interactions.
- `cypress.config.js`: Configuration for the Cucumber preprocessor and environment settings.

## 🛠 Technical Choices & Approach

1. **Scenario Outline:** Used to test multiple keywords (with/without punctuation) in a single test flow, ensuring DRY (Don't Repeat Yourself) code.
2. **Page Object Model (POM):** Decoupled UI selectors from test logic. This ensures that if the George UI changes, we only need to update the selector in one place.
3. **Resilience:** - Forced `1920x1080` viewport to prevent the UI from collapsing into mobile views.
   - Implemented a `30s` timeout for the dashboard and search bar to account for asynchronous API responses in the FAT environment.

## 🏗 Framework Architecture

- **Support Files:** Standard Cypress support structure is maintained. `cypress/support/e2e.ts` serves as the entry point, ensuring global configurations and `commands.ts` are loaded before each test.

- **Custom Commands:** The `commands.ts` file is kept for structural integrity, though core business logic (Login, Search) is handled via **Page Objects** to ensure better type safety and maintainability.

## 🔍 Search Logic Explanation

During the test, it was observed that the keyword **"Fashion."** (with a period) results in an empty state in George.

- My test logic in `TransactionsPage.ts` dynamically checks if the keyword contains a period.
- If it does, it asserts that the `no-search-results` element is visible.
- Otherwise, it validates the presence of transaction rows.

## 🏃 How to Run

1. Install dependencies: `npm install`
2. Open Cypress: `npx cypress open`
3. Select `search.feature` to execute the tests.
