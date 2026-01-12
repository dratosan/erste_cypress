/// <reference types="cypress" />

/**
 * Page Object representing the George Dashboard / Transactions Overview.
 * * DESIGN RATIONALE:
 * - We use 'data-cy' attributes as primary selectors because they are
 * decoupled from CSS/layout changes, providing high test stability.
 * - Long timeouts (30s) are implemented to account for asynchronous
 * loading of account data and search indices in FAT environments.
 */
export class TransactionsPage {
  // Selectors mapped directly from the George HTML structure
  private searchInput = '[data-cy="search-keyword"]';
  private transactionItem = '[data-cy^="transaction-list-item-"]';
  private noResultsMessage = '[data-cy="no-search-results"]';
  private overviewPage = '[data-cy="overview-page"]';

  /**
   * Ensures the dashboard is rendered before starting interactions.
   * Banking dashboards often wait for multiple background API calls (accounts, balances).
   */
  public waitForDashboard(): void {
    cy.get(this.overviewPage, { timeout: 30000 }).should("be.visible");
  }

  /**
   * Executes the search operation.
   * @param keyword String to search (e.g., 'Fashion' or 'Fashion.')
   */
  public performSearch(keyword: string): void {
    // Increased timeout for the search bar as it's often the last element to become interactive
    cy.get(this.searchInput, { timeout: 30000 })
      .should("be.visible")
      .focus()
      .clear()
      .type(`${keyword}{enter}`); // Triggering search via keyboard 'Enter'
  }

  /**
   * Validates the outcome of the search.
   * * EDGE CASE HANDLING:
   * The requirement specifies "Fashion." (with a dot). Since George treats
   * punctuation literally, this keyword returns 0 results.
   * This method verifies the "No results" message if a dot is present,
   * or verifies transaction rows if the keyword is a standard string.
   */
  public verifySearchResults(keyword: string): void {
    if (keyword.includes(".") || keyword === "Fashion.") {
      cy.log(
        'Requirement Ambiguity Check: Keyword contains punctuation. Expecting "No results".'
      );

      cy.get(this.noResultsMessage, { timeout: 10000 })
        .should("be.visible")
        .and("contain.text", "I'm sorry"); // Verification of the friendly error message
    } else {
      // Standard positive scenario: Validating that matching transactions appear
      cy.get(this.transactionItem, { timeout: 15000 })
        .should("have.length.at.least", 1)
        .each(($el) => {
          // Confirming the keyword exists within the row (e.g., in a category badge)
          cy.wrap($el).should("contain.text", keyword);
        });
    }
  }
}
