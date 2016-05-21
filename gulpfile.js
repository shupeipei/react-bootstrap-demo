var gulp = require('gulp'),
    connect = require('gulp-connect'),
    browserify = require('gulp-browserify'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    babel = require('gulp-babel'),
    sass = require('gulp-sass'),
    port = process.env.port || 2000;

gulp.task('browserify', function(){
    gulp.src('./dist/js/main.js')
        .pipe(browserify({
            transform: 'reactify'
        }))
        .pipe(gulp.dest('./dist/js'))
});

// open http service on the port that has been set up.
gulp.task('connect', function(){
    connect.server({
        port: port
    })
});

// build scss files.
gulp.task('scss', function () {
    gulp.src('./app/styles/main.scss')
        .pipe(sass())
        .pipe(gulp.dest('./dist/css/'));
});

// build js and jsx files.
gulp.task('js', function() {
    gulp.src(['./app/js/**/*.js', './app/js/**/*.jsx'])
        .pipe(babel())
        .pipe(gulp.dest('./dist/js/'));
});

// min js file.
gulp.task('minjs', function() {
    gulp.src('./dist/js/main.js')
        .pipe(uglify({
            preserveComments: 'all', //save all the comments.
        }))
        .pipe(rename({
            extname: '.min.js',
        }))
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('build', ['js', 'scss']);

gulp.task('serve', ['browserify', 'connect']);
