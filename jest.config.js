/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  // transform: {
  //   // '^.+\\.[tj]sx?$' to process js/ts with `ts-jest`
  //   // '^.+\\.m?[tj]sx?$' to process js/ts/mjs/mts with `ts-jest`
  //   '^.+\\.js$': [
  //     'ts-jest',
  //     {
  //       // ts-jest configuration goes here
  //       useESM: true,
  //     isolatedModules: true,

  //     },
  //   ],
  // },
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  
};