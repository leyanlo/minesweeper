module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-rational-order', 'stylelint-config-prettier'],
  rules: {
    'length-zero-no-unit': [
      true,
      {
        ignore: ['custom-properties']
      }
    ]
  }
};
