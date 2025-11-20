module.exports = {
  singleQuote: true,
  semi: true,
  tabWidth: 2,
  printWidth: 160,
  trailingComma: "es5",
  bracketSpacing: true,
  htmlWhitespaceSensitivity: "ignore",
  overrides: [
    {
      files: "*.html",
      options: {
        parser: "angular"
      }
    }
  ]
};
