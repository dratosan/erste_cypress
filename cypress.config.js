const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const {
  addCucumberPreprocessorPlugin,
} = require("@badeball/cypress-cucumber-preprocessor");
const {
  createEsbuildPlugin,
} = require("@badeball/cypress-cucumber-preprocessor/esbuild");

// Load dotenv (optional, unless you're just using shell exports)
// require('dotenv').config()

module.exports = defineConfig({
  e2e: {
    // Cypress automatically maps CYPRESS_BASE_URL to baseUrl,
    // but to be safe we ​​can do this:
    baseUrl:
      process.env.CYPRESS_BASE_URL || "https://george.fat3.sparkasse.at/",
    experimentalModifyObstructiveThirdPartyCode: true,
    chromeWebSecurity: false,
    specPattern: "cypress/e2e/features/**/*.feature",
    supportFile: false,
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);
      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );
      return config;
    },
  },
});
