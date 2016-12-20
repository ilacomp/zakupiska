/**
 * Created by iyudin on 20.12.2016.
 */
var gulpFilter = require('gulp-filter');

var config = {
	paths: {
		backend: ['backend/**', 'backend/.htaccess'],
		scripts: 'frontend/js/**/*.js',
		asis: ['frontend/**/*.{json,jpg,png,gif,svg}', 'frontend/**/index.html'],
		templates: ['frontend/views/*.html'],
		css: 'frontend/css/**/*.css',
		del: ['www/**', '!www', '!www/img', '!www/img/photos', '!www/img/photos/**']
	},
	filterJS: gulpFilter(['**/*.js'], {restore:true}),
	filterCSS: gulpFilter(['**/*.css'], {restore:true})
};

module.exports = config;