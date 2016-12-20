/**
 * Created by iyudin on 20.12.2016.
 */
var tasks = {
	asIs: require('./asis'),
	backend: require('./backend'),
	clean: require('./clean'),
	css: require('./css'),
	cssDev: require('./cssDev'),
	scripts: require('./scripts'),
	scriptsDev: require('./scriptsDev'),
	templates: require('./templates'),
	vendor: require('./vendor'),
	vendorDev: require('./vendor-dev'),
	watch: require('./watch')
};

module.exports = tasks;
