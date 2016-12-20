/**
 * Created by iyudin on 20.12.2016.
 */
var gulp = require('gulp'),
	mainBowerFiles = require('main-bower-files'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	minifyCSS = require('gulp-minify-css'),
	config = require('./config');

function vendor() {
	return gulp.src(mainBowerFiles())
		.pipe(config.filterJS)
		.pipe(concat('vendor.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('www/js'))
		.pipe(config.filterJS.restore)
		.pipe(config.filterCSS)
		.pipe(concat('vendor.min.css'))
		.pipe(minifyCSS())
		.pipe(gulp.dest('www/css'));
}

module.exports = vendor;