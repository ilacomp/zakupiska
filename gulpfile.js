var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    gulpFilter = require('gulp-filter'),
    mainBowerFiles = require('main-bower-files'),
    minifyCSS = require('gulp-minify-css'),
    gulpif = require('gulp-if'),
    del = require('del'),
    replace = require('gulp-replace'),
    debug = require('gulp-debug'),
	gutil = require('gulp-util');

var paths = {
    backend: ['backend/**', 'backend/.htaccess'],
    scripts: 'frontend/js/**/*.js',
    asis: ['frontend/**/*.{html,json,jpg,png,gif,svg}'],
    css: 'frontend/css/**/*.css'
};
var filterJS = gulpFilter(['**/*.js'], {restore:true});
var filterCSS = gulpFilter(['**/*.css'], {restore:true});


function asIs() {
	var timestamp = Date.now();
	return gulp.src(paths.asis)
		.pipe(gulpif(/index\.html/ , replace(/(script src="|link href=")([^"]+)"/g,
			'$1$2?t=' + timestamp + '"')))
		.pipe(gulp.dest('www'));
}

function scriptsDev() {
	return gulp.src(paths.scripts)
		.pipe(concat('main.min.js'))
		.pipe(gulp.dest('www/js'));
}

function cssDev() {
	return gulp.src(paths.css)
		.pipe(concat('main.min.css'))
		.pipe(gulp.dest('www/css'));
}

function backend() {
	return gulp.src(paths.backend)
		.pipe(gulp.dest('www'));
}

// Clean public folder
gulp.task('clean', function() {
    return del(['www']);
});

// Copy backend files
gulp.task('backend', ['clean'], backend);
gulp.task('asis', ['clean'], asIs);
// Concat JS
gulp.task('scripts-dev', ['clean'], scriptsDev);
gulp.task('css-dev', ['clean'], cssDev);


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

gulp.task('watch-dev', watch);

function watch() {
	gutil.log('Watch is in progress.');
	gulp.watch(paths.scripts, function() {
		scriptsDev().on('end', function(){gutil.log('Scripts rebuilded.')});
	});
	gulp.watch(paths.asis, function() {
		asIs().on('end', function(){gutil.log('Assests copied.')});
	});
	gulp.watch(paths.css, function() {
		cssDev().on('end', function(){gutil.log('CSS copied.')});
	});
	gulp.watch(paths.backend, function() {
		backend().on('end', function(){gutil.log('Backend copied.')});
	});
}

gulp.task('build-dev', ['backend', 'vendor-dev', 'asis', 'css-dev', 'scripts-dev'], watch);
gulp.task('build', ['backend', 'vendor', 'asis', 'css', 'scripts']);
