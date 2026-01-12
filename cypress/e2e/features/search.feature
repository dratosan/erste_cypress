Feature: Transaction Search

  Background:
    Given I am on the George login page
    And I log in with valid credentials

  Scenario Outline: Search for transactions with various keywords
    When I search for "<keyword>" in the transactions
    Then I should see a list of transactions related to "<keyword>"

    Examples:
      | keyword  |
      | Fashion  |
      | Fashion. |