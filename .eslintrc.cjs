module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["airbnb-base", "prettier", "eslint:recommended"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    camelcase: "off",
    "no-underscore-dangle": ["error", { allow: ["_id"] }],
    "global-require": "off",
    "no-use-before-define": [
      "error",
      {
        functions: true,
        classes: true,
        variables: true,
      },
    ],
    "no-unused-vars": "error",
    "no-console": "warn",
    "func-names": "error",
    "no-plusplus": "error",
    "no-process-exit": "error",
    "class-methods-use-this": "error",
    "import/no-named-as-default": "off",
    "import/extensions": [0, { js: "always" }],
  },
};
