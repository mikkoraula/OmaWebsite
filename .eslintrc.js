module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb'],
  env: {
    browser: true,
    node: true,
  },
  // for webpack aliases
  settings: {
    'import/resolver': {
      'eslint-import-resolver-custom-alias': {
        alias: {
          root: './src/client',
        },
      },
    },
  },
  rules: {
    'no-console': 'off',
    //"comma-dangle": "off",
    'react/jsx-filename-extension': 'off',
    //"linebreak-style": [2, "windows"]
    'linebreak-style': 'off',
    'arrow-parens': 'always',
  },
};
