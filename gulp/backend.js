/**
 * Created by iyudin on 20.12.2016.
 */
var gulp = require('gulp'),
	paths = require('./config').paths;

function backend() {
	return gulp.src(paths.backend)
		.pipe(gulp.dest('www'));
}

module.exports = backend;