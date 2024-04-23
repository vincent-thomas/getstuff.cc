import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: ".",
});

const config = createJestConfig({
  testEnvironment: "jsdom",
  reporters: [
    "default",
    ["jest-junit", { outputDirectory: "reports", outputName: "report.xml" }],
  ],
});
export default config;
