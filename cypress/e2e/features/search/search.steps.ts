import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { TransactionsPage } from "../../../pages/TransactionsPage";

const transactionsPage = new TransactionsPage();

When("the user searches for {string}", (keyword: string) => {
  transactionsPage.verifySearchIsVisible();
  transactionsPage.searchFor(keyword);
});

Then("the search input contains {string}", (value: string) => {
  transactionsPage.verifySearchInputValue(value);
});
