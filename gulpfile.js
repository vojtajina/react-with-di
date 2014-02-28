var gulp = require('gulp');
var traceur = require('gulp-traceur');
var connect = require('gulp-connect');


var path = {
  src: './src/**/*.js'
};


// TRANSPILE ES6
gulp.task('build_source_amd', function() {
  gulp.src(path.src)
      .pipe(traceur({modules: 'amd', annotations: true, types: true}))
      .pipe(gulp.dest('transpiled'));
});

gulp.task('build', ['build_source_amd']);


// WATCH FILES FOR CHANGES
gulp.task('watch', function() {
  gulp.watch(path.src, ['build']);
});


// WEB SERVER
gulp.task('serve', connect.server({
  root: [__dirname],
  port: 8000,
  open: {
    browser: 'Google Chrome'
  }
}));
