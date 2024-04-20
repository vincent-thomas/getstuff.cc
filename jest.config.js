/** @type {import('ts-jest').JestConfigWithTsJest} */
const config = {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
  reporters: [
    "default",
    ["jest-junit", { outputDirectory: "reports", outputName: "report.xml" }],
  ],
  extensionsToTreatAsEsm: [".ts"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
};
export default config;
