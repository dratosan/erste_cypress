const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const {
  addCucumberPreprocessorPlugin,
} = require("@badeball/cypress-cucumber-preprocessor");
const {
  createEsbuildPlugin,
} = require("@badeball/cypress-cucumber-preprocessor/esbuild");

// Načtení dotenv (volitelné, pokud nepoužíváš jen shell exporty)
// require('dotenv').config()

module.exports = defineConfig({
  e2e: {
    // Cypress automaticky mapuje CYPRESS_BASE_URL na baseUrl,
    // ale pro jistotu to můžeme pojistit takto:
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
