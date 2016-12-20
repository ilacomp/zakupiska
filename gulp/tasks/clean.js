/**
 * Created by iyudin on 20.12.2016.
 */
var del = require('del'),
	paths = require('../config').paths;

function clean() {
	return del(paths.del);
}

module.exports = clean;