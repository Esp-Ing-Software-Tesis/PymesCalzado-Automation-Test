const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    retries: { runMode: 2, openMode: 0 },
    baseUrl: "https://d2v4agf21sn514.cloudfront.net/",
    setupNodeEvents(on, config) {
      return config;
    },
  },
  reporter: "junit",
  video: true,
  env: {
    grepFilterSpecs: true,
    grepTags: "@smoke",
  },
});
