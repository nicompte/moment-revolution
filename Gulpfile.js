'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglifyjs');
var mocha = require('gulp-mocha');
var rename = require('gulp-rename');
var browserify = require('gulp-browserify');

gulp.task('jshint', function () {
  gulp.src(['**/*.js', '!node_modules/**/*.js', '!dist/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('test', function () {
  gulp.src('test/node/main.js')
    .pipe(mocha({reporter: 'list'}));
});

gulp.task('uglify', function () {
  gulp.src('dist/moment-revolution.js')
    .pipe(uglify('moment-revolution.min.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('browserify', function () {
  gulp.src('index.js')
    .pipe(browserify({ignore: ['moment']}))
    .pipe(rename('moment-revolution.js'))
    .pipe(gulp.dest('dist'));
});

// Tasks
gulp.task('default', ['jshint', 'test']);
gulp.task('build', ['default', 'browserify', 'uglify']);
