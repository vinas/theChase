var gulp = require('gulp');
var del = require('del');
var concat = require('gulp-concat');
var uglifycss = require('gulp-uglifycss');
var uglify = require('gulp-uglify');
var pump = require('pump');
var htmlreplace = require('gulp-html-replace');

gulp.task('clean', function() {
    return del(['./build']);
});

gulp.task('scripts', function() {
    return gulp
            .src('./src/js/**/*.js')
            .pipe(concat('scripts.min.js'))
            .pipe(gulp.dest('./build/js'));
});

gulp.task('css', function() {
    return gulp
            .src('./src/css/*.css')
            .pipe(
                uglifycss({
                    "maxLineLen": 80,
                    "uglyComments": true
                })
            )
            .pipe(gulp.dest('./build/css'));
});

gulp.task('uglify-js', function(cb) {
    pump([
            gulp.src('./build/js/*.js'),
            uglify(),
            gulp.dest('./build/js')
        ],
        cb
    );
});

gulp.task('audio',function() {
    return gulp.src('./src/audio/**/*')
            .pipe(gulp.dest('./build/audio'));
});

gulp.task('images',function() {
    return gulp.src('./src/img/**/*')
            .pipe(gulp.dest('./build/img'));
});

gulp.task('fonts',function() {
    return gulp.src('./src/font/**/*')
            .pipe(gulp.dest('./build/font'));
});

gulp.task('html', function() {
    return gulp.src('./src/*.html')
        .pipe(htmlreplace({
                'css': 'css/styles.css',
                'js': 'js/scripts.min.js'
            })
        )
        .pipe(gulp.dest('./build'));
});

gulp.task('build',
    gulp.series(
        'clean',
        'scripts',
        'css',
        'uglify-js',
        'audio',
        'images',
        'fonts',
        'html'
    )
);
