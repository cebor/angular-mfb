var gulp = require('gulp');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var git = require('gulp-git');
var bump = require('gulp-bump');
var tag_version = require('gulp-tag-version');

gulp.task('styles', function() {
  gulp.src('./src/styles/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'))
    .pipe(minifyCss())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('scripts', function () {
  gulp.src('./src/*.js')
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./dist'));
});

gulp.task('build', ['styles', 'scripts']);

function inc(importance) {
  // get all the files to bump version in
  gulp.src('./bower.json')
    // bump the version number in those files
    .pipe(bump({type: importance}))
    // save it back to filesystem
    .pipe(gulp.dest('./'))
    // commit the changed version number
    .pipe(git.commit('Bump bower version'))
    // **tag it in the repository**
    .pipe(tag_version());
}

gulp.task('bump:patch', function() { return inc('patch'); });
gulp.task('bump:minor', function() { return inc('minor'); });
gulp.task('bump:major', function() { return inc('major'); });
