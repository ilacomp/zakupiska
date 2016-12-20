/**
 * Created by iyudin on 20.12.2016.
 */
var gulp = require('gulp'),
	concat = require('gulp-concat'),
	paths = require('./config').paths;

function scriptsDev() {
	return gulp.src(paths.scripts)
		.pipe(concat('main.min.js'))
		.pipe(gulp.dest('www/js'));
}

module.exports = scriptsDev;