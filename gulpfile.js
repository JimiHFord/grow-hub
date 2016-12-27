var gulp    = require('gulp');
var shell   = require('gulp-shell');
var runseq  = require('run-sequence');
var tslint  = require('gulp-tslint');
var webpack = require('webpack-stream');

var webpackConfig = require('./webpack.config.js');

// var tsConfig = require('./tsconfig.json');

// var paths = {
//   tscripts : { src : ['app/src/**/*.ts'],
//         dest : 'app/dist' }
// };
var paths = {
  tscripts: { src: 'app/src/index.tsx',
        dest: 'app/dist' }
};

gulp.task('default', ['lint', 'build']);

// ** Running ** //

// gulp.task('run', shell.task([
//   'node app/dist/bundle.js'
// ]));

// gulp.task('buildrun', function (cb) {
//   runseq('build', 'run', cb);
// });

// ** Watching ** //

gulp.task('watch', function () {
  gulp.watch(paths.tscripts.src, ['compile:typescript']);
});

// gulp.task('watchrun', function () {
//   gulp.watch(paths.tscripts.src, runseq('compile:typescript', 'run'));
// });

// ** Compilation ** //

gulp.task('build', ['compile:typescript']);
gulp.task('compile:typescript', function () {
  return gulp
  .src(paths.tscripts.src)
  .pipe(webpack(webpackConfig))
  .pipe(gulp.dest(paths.tscripts.dest));
});

// ** Linting ** //

gulp.task('lint', ['lint:default']);
gulp.task('lint:default', function(){
      return gulp.src(paths.tscripts.src)
        .pipe(tslint( require('./tslint.json') ))
        .pipe(tslint.report());
});
