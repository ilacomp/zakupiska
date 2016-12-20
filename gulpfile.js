var gulp = require('gulp'),
	tasks = require('./gulp/index');

// Clean public folder
gulp.task('clean', tasks.clean);
// Copy backend files
gulp.task('backend', ['clean'], tasks.backend);
gulp.task('asis', ['clean'], tasks.asIs);
gulp.task('templates', ['clean'], tasks.templates);
// Concat JS
gulp.task('scripts-dev', ['clean'], tasks.scriptsDev);
gulp.task('css-dev', ['clean'], tasks.cssDev);
// Concat and minify vendor JS AND CSS
gulp.task('vendor', ['clean'], tasks.vendor);
// Concat vendor JS AND CSS
gulp.task('vendor-dev', ['clean'], tasks.vendorDev);
// Concat and minify JS
gulp.task('scripts', ['clean'], tasks.scripts);
gulp.task('css', ['clean'], tasks.css);
gulp.task('watch-dev', tasks.watch);
gulp.task('build-dev', ['backend', 'vendor-dev', 'asis', 'templates', 'css-dev', 'scripts-dev'], tasks.watch);
gulp.task('build', ['backend', 'vendor', 'asis', 'templates', 'css', 'scripts']);
