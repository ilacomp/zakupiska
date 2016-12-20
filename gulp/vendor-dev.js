/**
 * Created by iyudin on 20.12.2016.
 */
var gulp = require('gulp'),
	mainBowerFiles = require('main-bower-files'),
	concat = require('gulp-concat'),
	config = require('./config');

function vendorDev() {
	return gulp.src(mainBowerFiles())
		.pipe(config.filterJS)
		.pipe(concat('vendor.min.js'))
		.pipe(gulp.dest('www/js'))
		.pipe(config.filterJS.restore)
		.pipe(config.filterCSS)
		.pipe(concat('vendor.min.css'))
		.pipe(gulp.dest('www/css'));

}

module.exports = vendorDev;