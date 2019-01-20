const config = require('./stylelint.config.js');

config.processors = ['stylelint-processor-styled-components'];
config.extends.push('stylelint-config-styled-components');
module.exports = config;
