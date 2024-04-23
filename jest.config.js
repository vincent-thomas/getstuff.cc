import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: ".",
});

const esModules = ["jose"];

const customConfig = {
  transformIgnorePatterns: [`/node_modules/(?!(${esModules.join("|")})/)`],
  testEnvironment: "jsdom",
  reporters: [
    "default",
    ["jest-junit", { outputDirectory: "reports", outputName: "report.xml" }],
  ],
};

export default async () => {
  const config = await createJestConfig(customConfig)();

  return {
    ...config,
    transformIgnorePatterns: config.transformIgnorePatterns.filter(
      ptn => ptn !== "/node_modules/",
    ),
  };
};
