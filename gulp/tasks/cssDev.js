/**
 * Created by iyudin on 20.12.2016.
 */
var gulp = require('gulp'),
	concat = require('gulp-concat'),
	paths = require('../config').paths;

function cssDev() {
	return gulp.src(paths.css)
		.pipe(concat('main.min.css'))
		.pipe(gulp.dest('www/css'));
}

module.exports = cssDev;