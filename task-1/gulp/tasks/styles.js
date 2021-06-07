import gulp from 'gulp';

import bs from 'browser-sync';

import gulpDebug from 'gulp-debug';
import gulpIf from 'gulp-if';
import gulpReplace from 'gulp-replace';
import gulpPlumber from 'gulp-plumber';
import gulpNotify from 'gulp-notify';
import gulpSourcemaps from 'gulp-sourcemaps';

import gulpDartSass from 'gulp-dart-sass';
import gulpPostcss from 'gulp-postcss';

import autoprefixer from 'autoprefixer';
import mqpacker from 'mqpacker';
import cssnano from 'cssnano';

import {paths, environment, description,} from '../config.js';

function createStyles() {
  return gulp
    .src(`${paths.source.styles}/*.scss`)
    .pipe(gulpPlumber({
      errorHandler: gulpNotify.onError({
        title  : 'Error running ' + this.name,
        message: 'Error: <%= error.message %>'
      })
    }))
    .pipe(gulpDebug({title: '\t\t\t\t\t sass'}))
    .pipe(gulpIf(environment.isDevelopment, gulpSourcemaps.init()))
    .pipe(gulpDartSass().on('error', function (err) {
      bs.notify(err.message, 10000);

      this.emit('end');
    }))
    .pipe(gulpDartSass())
    .pipe(gulpReplace('../../', '../'))
    .pipe(gulpIf(
      environment.isProduction,
      gulpPostcss([autoprefixer({}), mqpacker({}), cssnano({}),])
    ))
    .pipe(gulpIf(environment.isDevelopment, gulpSourcemaps.write()))
    .pipe(gulp.dest(`${paths.destination.styles}`));
}

const task_styles = (cb) => {
  setTimeout(createStyles, 0);
  cb();
};

task_styles.description = `${description.begin}copy and convert styles to${description.end}`;
task_styles.displayName = 'styles';

const watch_styles = () => {
  gulp.watch(`${paths.source.styles}/**/*.scss`, task_styles);
};

export {
  task_styles,
  watch_styles,
};
