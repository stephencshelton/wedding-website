'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var connect = require('gulp-connect');

// Start a local web server
gulp.task('connect', function() {
    connect.server({
      root: '.',  // the root directory for your website. Adjust if needed.
      livereload: true
    });
});

// compile scss to css
gulp.task('sass', function () {
    return gulp.src('./sass/styles.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({basename: 'styles.min'}))
        .pipe(gulp.dest('./css'))
        .pipe(connect.reload());
});

// minify js
gulp.task('minify-js', function () {
    return gulp.src('./js/scripts.js')
        .pipe(uglify())
        .pipe(rename({basename: 'scripts.min'}))
        .pipe(gulp.dest('./js'))
        .pipe(connect.reload());
});

// watch changes in scss files and run sass task
gulp.task('sass:watch', function () {
    gulp.watch('./sass/**/*.scss', gulp.series('sass'));
    gulp.watch('./js/scripts.js', gulp.series('minify-js'));
    gulp.watch('./*.html').on('change', function() {
        gulp.src('.')
            .pipe(connect.reload());
    });
});

// default task
gulp.task('default', gulp.series('sass', 'minify-js'));
gulp.task('serve', gulp.series('default', 'connect', 'sass:watch'));

