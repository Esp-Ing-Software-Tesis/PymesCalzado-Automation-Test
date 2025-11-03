const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    retries: { runMode: 2, openMode: 0 },
    baseUrl: "https://d2v4agf21sn514.cloudfront.net/",
    setupNodeEvents(on, config) {
      require("cypress-grep/src/plugin")(config);
      return config;
    },
  },
  reporter: "junit",
  video: true,
});
