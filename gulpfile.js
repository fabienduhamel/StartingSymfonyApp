'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var browserSync = require('browser-sync').create();
var less = require('gulp-less');
var plumber = require('gulp-plumber');

var config = {
    localServerUrl: "127.0.0.1:8000/app_dev.php",
};

gulp.task('less', function () {
    return gulp.src('app/Resources/less/app.less')
        .pipe(plumber())
        .pipe(less())
        .pipe(gulp.dest('web/dist/css'));
});

gulp.task('css', ['less'], function () {
    return gulp.src([
            'node_modules/bootstrap/dist/css/bootstrap.min.css',
            'app/Resources/css/**/*.css'
        ])
        .pipe(plumber())
        .pipe(concat('all.css'))
        .pipe(gulp.dest('web/dist/css'))
        .pipe(browserSync.stream());
});

gulp.task('minCss', ['less', 'css'], function () {
    return gulp.src([
            'web/dist/css/all.css'
        ])
        .pipe(plumber())
        .pipe(cssmin())
        .pipe(gulp.dest('web/dist/min'));
});

gulp.task('watch', function () {
    browserSync.init({
        proxy: config.localServerUrl
    });
    gulp.watch([
        'app/Resources/less/**/*.less',
        'app/Resources/css/**/*.css'
    ], ['less', 'css']);
    gulp.watch([
        "app/Resources/views/**/*.html.twig",
        "web/dist/js/app.js",
        "app/Resources/translations/**/*.yml"
    ]).on('change', browserSync.reload);
});

gulp.task('default', ['less', 'css', 'watch']);
gulp.task('min', ['less', 'css', 'minCss']);
