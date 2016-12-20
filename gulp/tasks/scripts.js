/**
 * Created by iyudin on 20.12.2016.
 */
var gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	paths = require('../config').paths;

function scripts() {
	return gulp.src(paths.scripts)
		.pipe(concat('main.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('www/js'));
}

module.exports = scripts;