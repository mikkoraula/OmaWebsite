module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb'],
  env: {
    browser: true,
    node: true
  },
  rules: {
    'no-console': 'off',
    //"comma-dangle": "off",
    'react/jsx-filename-extension': 'off',
    //"linebreak-style": [2, "windows"]
    'linebreak-style': 'off'
  }
};
