var gulp = require('gulp');
// var concat = require('gulp-concat');
// var uglify = require('gulp-uglify');
// var minifyCSS = require('gulp-minify-css');
// var less = require('gulp-less');
// var sourcemaps = require('gulp-sourcemaps');
var del = require('del');

var paths = {
    backend: 'backend/**',
    scripts: 'frontend/js/**/*.js',
    asis: 'frontend/**/*.{html,json}',
    css: 'frontend/css/**/*.less'
};

// Clean public folder
gulp.task('clean', function() {
    return del(['www']);
});

gulp.task('backend', ['clean'], function() {
    return gulp.src(paths.backend)
        .pipe(gulp.dest('www'));
});

gulp.task('build', ['backend']);
