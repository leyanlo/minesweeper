const config = require('./stylelint.config.js');

config.processors = ['stylelint-processor-styled-components'];
config.extends.push('stylelint-config-styled-components');
config.rules['selector-type-no-unknown'] = [
  true,
  {
    ignoreTypes: [/-styled-mixin\d+/]
  }
];
config.rules['no-descending-specificity'] = null;
module.exports = config;
