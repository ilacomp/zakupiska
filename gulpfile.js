var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    gulpFilter = require('gulp-filter'),
    mainBowerFiles = require('main-bower-files'),
    minifyCSS = require('gulp-minify-css'),
    gulpif = require('gulp-if'),
    del = require('del'),
    replace = require('gulp-replace'),
    debug = require('gulp-debug');
// var less = require('gulp-less');
// var sourcemaps = require('gulp-sourcemaps');

var paths = {
    backend: ['backend/**', 'backend/.htaccess'],
    scripts: 'frontend/js/**/*.js',
    asis: ['frontend/**/*.{html,json,jpg,png,gif,svg}'],
    css: 'frontend/css/**/*.css'
};
var filterJS = gulpFilter(['**/*.js'], {restore:true});
var filterCSS = gulpFilter(['**/*.css'], {restore:true});

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
    var timestamp = Date.now();
    return gulp.src(paths.asis)
        .pipe(gulpif(/index\.html/ , replace(/(script src="|link href=")([^"]+)"/g,
            '$1$2?t=' + timestamp + '"')))
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

// Concat and minify JS
gulp.task('scripts', ['clean'], function() {
    return gulp.src(paths.scripts)
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('www/js'));
});

// Concat JS
gulp.task('scripts-dev', ['clean'], function() {
    return gulp.src(paths.scripts)
        .pipe(concat('main.min.js'))
        .pipe(gulp.dest('www/js'));
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

gulp.task('bower', function() {
    return gulp.src(mainBowerFiles())
        //.pipe(debug())
        .pipe(filterJS)
        .pipe(debug());
});
gulp.task('build-dev', ['backend', 'vendor-dev', 'asis', 'css-dev', 'scripts-dev']);
gulp.task('build', ['backend', 'vendor', 'asis', 'css', 'scripts']);
