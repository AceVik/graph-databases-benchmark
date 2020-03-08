module.exports = function(config) {
  config.set({
    mutator: "typescript",
    packageManager: "yarn",
    reporters: ["html", "clear-text", "progress"],
    testRunner: "jest",
    transpilers: [],
    coverageAnalysis: "off",
    tsconfigFile: "tsconfig.json",
    mutate: ["src/**/!(*.spec|index|Server).ts"],
    timeoutMS: 120000
  });
};
