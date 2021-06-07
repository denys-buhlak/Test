import gulp from 'gulp';
import webpackStream from 'webpack-stream';
import webpack from 'webpack';
import gulpDebug from 'gulp-debug';
import gulpPlumber from 'gulp-plumber';
import gulpNotify from 'gulp-notify';
import {paths, description, environment,} from '../config.js';

let webpackConfig = {
    output: {
        filename: 'script.js'
    },
    module: {
        rules: [
            {
                test   : /\.js$/,
                exclude: /node_modules/,
                use    : {
                    loader : 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env']
                        ]
                    }
                }
            },
        ]
    }
};

let setConfig = () => {
    webpackConfig.mode          = process.env.NODE_ENV;
    webpackConfig.devtool       = environment.isDevelopment
        ? 'cheap-module-source-map'
        : false;
    webpackConfig.optimization = {
        minimize: environment.isDevelopment
            ? false
            : true
    };
};

function createScriptsWebpack() {
    setConfig();

    return gulp
        .src(paths.source.scripts + '/script.js', {allowEmpty: true})
        .pipe(gulpPlumber({
            errorHandler: gulpNotify.onError(
                {title: 'Error running createScripts', message: 'Error: <%= error.message %>'}
            )
        }))
        .pipe(gulpDebug({title: '\t\t\t\t\t scripts'}))
        .pipe(webpackStream(webpackConfig, webpack))
        .pipe(gulp.dest(paths.destination.scripts));
}

const task_scripts_webpack = (cb) => {
    createScriptsWebpack();
    cb();
};

task_scripts_webpack.description = `${description.begin}use webpack for scripts into${description.end}`;
task_scripts_webpack.displayName = 'scripts-webpack';

const watch_scripts_webpack = () => {
    gulp.watch(paths.source.scripts + '/**/*.js', task_scripts_webpack);
};

export {
    task_scripts_webpack,
    watch_scripts_webpack,
};
