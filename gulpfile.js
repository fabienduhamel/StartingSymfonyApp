'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var browserSync = require('browser-sync').create();

var config = {
    localServerUrl: "127.0.0.1:8000/app_dev.php",
};

gulp.task('css', function () {
    return gulp.src([
            'node_modules/bootstrap/dist/css/bootstrap.min.css',
            'app/Resources/css/**/*.css'
        ])
        .pipe(concat('all.css'))
        .pipe(gulp.dest('web/dist/css'))
        .pipe(browserSync.stream());
});

gulp.task('minCss', function () {
    return gulp.src([
            'web/dist/css/all.css'
        ])
        .pipe(cssmin())
        .pipe(gulp.dest('web/dist/css'));
});

gulp.task('watch', function () {
    browserSync.init({
        proxy: config.localServerUrl
    });
    gulp.watch('app/Resources/css/*.css', ['css']);
    gulp.watch("app/Resources/views/**/*.html.twig").on('change', browserSync.reload);
});

gulp.task('default', ['css', 'watch']);
gulp.task('min', ['css', 'minCss']);
