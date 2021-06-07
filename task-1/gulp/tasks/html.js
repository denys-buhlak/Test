import gulp from 'gulp';

import gulpDebug from 'gulp-debug';
import gulpIf from 'gulp-if';
import gulpNotify from 'gulp-notify';
import gulpPlumber from 'gulp-plumber';
import gulpReplace from 'gulp-replace';
import gulpFileInclude from 'gulp-file-include';

import gulpHtmlmin from 'gulp-htmlmin';

import {paths, environment, description,} from '../config.js';

function copyHtml() {
    return gulp
        .src(`${paths.source.html}/*.html`)
        .pipe(gulpPlumber({
            errorHandler: gulpNotify.onError(
                {title: 'Error running createHtml', message: 'Error: <%= error.message %>'}
            )
        }))
        .pipe(gulpDebug({title: '\t\t\t\t\t html'}))
        .pipe(gulpFileInclude({prefix: '//--'}))
        .pipe(gulpReplace('../', ''))
        .pipe(gulpIf(
            environment.isProduction,
            gulpHtmlmin({collapseWhitespace: true, removeComments: true,})
        ))
        .pipe(gulp.dest(`${paths.destination.html}`));
}

const task_html = (cb) => {
    setTimeout(copyHtml, 0);
    cb();
};

task_html.description = `${description.begin}copy and convert html to${description.end}`;
task_html.displayName = 'html';

const watch_html = () => {
    gulp.watch(`${paths.source.html}/**/*.html`, task_html);
};

export {
    task_html,
    watch_html,
};
