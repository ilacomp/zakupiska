/**
 * Created by iyudin on 20.12.2016.
 */
var gulp = require('gulp'),
	templateCache = require('gulp-angular-templatecache'),
	paths = require('./config').paths;


function templates() {
	return gulp.src(paths.templates)
		.pipe(templateCache({standalone: true}))
		.pipe(gulp.dest('www/js'));
}

module.exports = templates;