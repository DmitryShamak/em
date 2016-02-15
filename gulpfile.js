var gulp = require("gulp");

var concat = require("gulp-concat");
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");
var notify = require('gulp-notify');
var del = require('del');
var livereload = require('gulp-livereload');
var path = require("path");
var minifyCSS = require('gulp-minify-css');
var less = require("gulp-less");
var util = require("gulp-util");

var stylesSrc = [
    '/public/styles/*.less'
];
gulp.task("styles", function() {
    return gulp.src(stylesSrc)
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .on('error', util.log)
        .pipe(gulp.dest('./dist/css'));
});

var scriptsSrc = [
    'public/scripts/app.js',
    'public/scripts/config.js',
    'public/scripts/**/*js'
];
gulp.task("scripts", function() {
    return gulp.src(scriptsSrc)
        .pipe(concat('ng-script.js'))
        .pipe(gulp.dest('dist/js'))
        .on('error', util.log)
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('clean', function() {
    return del(['dist/**']);
});

gulp.task('watch', function() {
    // Create LiveReload server
    //livereload.listen();

    //// Watch any files in dist/, reload on change
    //gulp.watch(['dist/**']).on('change', livereload.changed);

    // Watch .less files
    //gulp.watch('public/styles/**/*.less', ['styles']);
    // Watch .js files
    gulp.watch('public/scripts/**/*.js', ['scripts']);
    // Watch image files
    //gulp.watch('src/images/**/*', ['images']);
});


// Default task
gulp.task('default', ['clean'], function() {
    gulp.start('scripts');
});