/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  plugins: ["prettier-plugin-tailwindcss"],
  singleQuote: false,
  arrowParens: "avoid",
  useTabs: false,
  trailingComma: "none",
  semi: true,
  printWidth: 80,
};

export default config;
