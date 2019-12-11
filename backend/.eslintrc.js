module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: ["airbnb-base", "eslint:recommended"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
    use: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  },
  rules: {
  }
};
