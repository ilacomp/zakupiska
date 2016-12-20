/**
 * Created by iyudin on 20.12.2016.
 */
var gulp = require('gulp'),
	gulpif = require('gulp-if'),
	replace = require('gulp-replace'),
	paths = require('../config').paths;

function asIs() {
	var timestamp = Date.now();
	return gulp.src(paths.asis)
		.pipe(gulpif(/index\.html/ , replace(/(script src="|link href=")([^"]+)"/g,
			'$1$2?t=' + timestamp + '"')))
		.pipe(gulp.dest('www'));
}

module.exports = asIs;