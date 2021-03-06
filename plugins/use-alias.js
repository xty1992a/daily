const {root} = require('./utils');

module.exports = config => {
  config.resolve.alias
	  .set('@', root('src'))
	  .set('api', root('src/api'))
	  .set('assets', root('src/assets'))
	  .set('components', root('src/components'))
	  .set('store', root('src/store'))
	  .set('utils', root('src/utils'));
};
