/**
 * Created by iyudin on 20.12.2016.
 */
var gulp = require('gulp'),
	gutil = require('gulp-util'),
	paths = require('./config').paths,
	scriptsDev = require('./scriptsDev'),
	asIs = require('./asis'),
	templates = require('./templates'),
	cssDev = require('./cssDev'),
	backend = require('./backend');

function watch() {
	gutil.log('Big brother is watching for you...');
	gulp.watch(paths.scripts, function() {
		scriptsDev().on('end', function(){gutil.log('Scripts rebuilded.')});
	});
	gulp.watch(paths.asis, function() {
		asIs().on('end', function(){gutil.log('Assests copied.')});
	});
	gulp.watch(paths.templates, function() {
		templates().on('end', function(){gutil.log('Templates copied.')});
	});
	gulp.watch(paths.css, function() {
		cssDev().on('end', function(){gutil.log('CSS copied.')});
	});
	gulp.watch(paths.backend, function() {
		backend().on('end', function(){gutil.log('Backend copied.')});
	});
}

module.exports = watch;