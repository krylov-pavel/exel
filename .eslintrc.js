module.exports = {
  parser: '@babel/eslint-parser',
  parserOptions: {
    babelOptions: {
      configFile: './babel.config.json',
    }
  },
  env: {
    'jest/globals': true,
    'browser': true,
    'es6': true,
    'node': true,
  },
  plugins: ['jest'],
  extends: ['eslint:recommended', 'google'],
  rules: {
    'semi': 'off',
    'arrow-parens': 'off',
    'comma-dangle': 'off',
    'require-jsdoc': 'off',
    'operator-linebreak': 'off',
    'no-debugger': 'off',
    'no-unused-vars': 'off',
    'linebreak-style': 'off',
    'max-len': 'off',
    'guard-for-in': 'off'
  }
}
