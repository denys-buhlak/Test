import gulp from 'gulp';
import gulpChanged from 'gulp-changed';
import gulpDebug from 'gulp-debug';
import ttf2woff from 'gulp-ttf2woff';
import ttf2woff2 from 'gulp-ttf2woff2';

import {paths, description,} from '../config.js';

function copyFonts() {
  return gulp
    .src([`${paths.source.fonts}/**/*.{ttf,woff,woff2}`])
    .pipe(gulpChanged(`${paths.destination.fonts}`))
    .pipe(gulpDebug({title: '\t\t\t\t\t copy fonts'}))
    .pipe(gulp.dest(`${paths.destination.fonts}`));
}

function conver_ttf_fonts_to_woff() {
  return gulp
    .src([`${paths.source.fonts}/**/*.ttf`])
    .pipe(gulpChanged(`${paths.destination.fonts}`, {extension: '.woff'}))
    .pipe(gulpDebug({title: '\t\t\t\t\t convert fonts (ttf => woff)'}))
    .pipe(ttf2woff())
    .pipe(gulp.dest(`${paths.destination.fonts}`));
}

function conver_ttf_fonts_to_woff_2() {
  return gulp
    .src([`${paths.source.fonts}/**/*.ttf`])
    .pipe(gulpChanged(`${paths.destination.fonts}`, {extension: '.woff2'}))
    .pipe(gulpDebug({title: '\t\t\t\t\t conver fonts (ttf => woff2)'}))
    .pipe(ttf2woff2())
    .pipe(gulp.dest(`${paths.destination.fonts}`));
}

// ? How to replace without setTimeout? const task_fonts = gulp.series(
// copyFonts,   gulp.parallel(conver_ttf_fonts_to_woff,
// conver_ttf_fonts_to_woff_2), ); ! FIX need promise?
const task_fonts = (cb) => {
  setTimeout(copyFonts, 0);
  setTimeout(conver_ttf_fonts_to_woff, 5000);
  setTimeout(conver_ttf_fonts_to_woff_2, 5000);
  cb();
};

task_fonts.description = `${description.begin}copy and convert fonts to${description.end}`;
task_fonts.displayName = 'fonts';

const watch_fonts = () => {
  gulp.watch(`${paths.source.fonts}/**/*.{ttf,woff,woff2}`, task_fonts);
};

export {
  task_fonts,
  watch_fonts,
};
