module.exports = {
  parser: '@babel/eslint-parser',
  parserOptions: {
    babelOptions: {
      configFile: './babel.config.json',
    }
  },
  env: {
    browser: true,
    es6: true,
    node: true
  },
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
