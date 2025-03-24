const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "smf6pa",
  e2e: {
    baseUrl: "https://stage.schedulehub.io",
    experimentalStudio: true,

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
    },
  },
});
/// <reference types="cypress" />
