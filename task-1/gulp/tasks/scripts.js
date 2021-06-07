import gulp from 'gulp';

import gulpDebug from 'gulp-debug';
import gulpIf from 'gulp-if';
import gulpNotify from 'gulp-notify';
import gulpPlumber from 'gulp-plumber';
import gulpFileInclude from 'gulp-file-include';
import gulpSourcemaps from 'gulp-sourcemaps';
import gulpTerser from 'gulp-terser';

import {paths, environment, description,} from '../config.js';

function createScripts() {
    return gulp
        .src(paths.source.scripts + '/*.js',  {allowEmpty: true})
        .pipe(gulpPlumber({
            errorHandler: gulpNotify.onError(
                {title: 'Error running createScripts', message: 'Error: <%= error.message %>'}
            )
        }))
        .pipe(gulpDebug({title: '\t\t\t\t\t scripts'}))
        .pipe(gulpFileInclude({prefix: '//--'}))
        .pipe(gulpIf(environment.isDevelopment, gulpSourcemaps.init()))
        .pipe(gulpIf(environment.isProduction, gulpTerser()))
        .pipe(gulpIf(environment.isDevelopment, gulpSourcemaps.write()))
        .pipe(gulp.dest(paths.destination.scripts));
}

const task_scripts = (cb) => {
    createScripts();
    cb();
};

task_scripts.description = `${description.begin}copy and convert scripts to${description.end}`;
task_scripts.displayName = 'scripts';

const watch_scripts = () => {
    gulp.watch(paths.source.scripts + '/**/*.js', task_scripts);
};

export {
    task_scripts,
    watch_scripts,
};
