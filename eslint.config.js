import js from "@eslint/js";

export default [
  { ignores: ["coverage/**", "node_modules/**"] },
  js.configs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest", sourceType: "module",
      globals: { console: "readonly", process: "readonly", crypto: "readonly" }
    },
    rules: { "complexity": ["error", 6], "eqeqeq": "error" }
  }
];
