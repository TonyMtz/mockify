var gulp = require('gulp'),
    mocha = require('gulp-mocha-co'),
    exit = require('gulp-exit');

gulp.task('test-all', function () {
    gulp.src(['test/*.js'])
        .pipe(mocha({
            reporter: 'spec'
        }))
        .pipe(exit());
});
