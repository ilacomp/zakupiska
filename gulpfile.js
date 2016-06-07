var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var gulpFilter = require('gulp-filter');
var mainBowerFiles = require('main-bower-files');
var minifyCSS = require('gulp-minify-css');
// var less = require('gulp-less');
// var sourcemaps = require('gulp-sourcemaps');
var del = require('del');

var paths = {
    backend: ['backend/**', 'backend/.htaccess'],
    scripts: 'frontend/js/**/*.js',
    asis: ['frontend/**/*.{html,json,jpg,png,gif,svg}'],
    css: 'frontend/css/**/*.css'
};
var filterJS = gulpFilter(['**/*.js', '!**/*.min.js'], {restore:true});
var filterCSS = gulpFilter(['**/*.css', '!**/*.min.css'], {restore:true});

// Clean public folder
gulp.task('clean', function() {
    return del(['www']);
});

// Copy backend files
gulp.task('backend', ['clean'], function() {
    return gulp.src(paths.backend)
        .pipe(gulp.dest('www'));
});

gulp.task('asis', ['clean'], function() {
    return gulp.src(paths.asis)
        .pipe(gulp.dest('www'));
});

// Concat and minify vendor JS AND CSS
gulp.task('vendor', ['clean'], function() {
    return gulp.src(mainBowerFiles())
        .pipe(filterJS)
        .pipe(concat('vendor.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('www/js'))
        .pipe(filterJS.restore)
        .pipe(filterCSS)
        .pipe(concat('vendor.min.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('www/css'));
});

// Concat vendor JS AND CSS
gulp.task('vendor-dev', ['clean'], function() {
    return gulp.src(mainBowerFiles())
        .pipe(filterJS)
        .pipe(concat('vendor.min.js'))
        .pipe(gulp.dest('www/js'))
        .pipe(filterJS.restore)
        .pipe(filterCSS)
        .pipe(concat('vendor.min.css'))
        .pipe(gulp.dest('www/css'));
});

gulp.task('css-dev', ['clean'], function() {
    return gulp.src(paths.css)
        .pipe(concat('main.min.css'))
        .pipe(gulp.dest('www/css'));
});

gulp.task('css', ['clean'], function() {
    return gulp.src(paths.css)
        .pipe(concat('main.min.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('www/css'));
});

gulp.task('build-dev', ['backend', 'vendor-dev', 'asis', 'css-dev']);
gulp.task('build', ['backend', 'vendor', 'asis', 'css']);
