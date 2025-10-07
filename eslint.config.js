import neostandard from "neostandard";
import eslintConfigPrettier from "eslint-config-prettier/flat";

export default [
  ...neostandard({
    env: ["node", "mocha"],
    ignores: ["allure-report/*", "allure-results/*"],
  }),
  eslintConfigPrettier,
];
