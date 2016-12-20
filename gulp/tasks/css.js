/**
 * Created by iyudin on 20.12.2016.
 */
var gulp = require('gulp'),
	concat = require('gulp-concat'),
	minifyCSS = require('gulp-minify-css'),
	paths = require('../config').paths;

function css() {
	return gulp.src(paths.css)
		.pipe(concat('main.min.css'))
		.pipe(minifyCSS())
		.pipe(gulp.dest('www/css'));
}

module.exports = css;