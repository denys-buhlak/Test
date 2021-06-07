import gulp from 'gulp';

import gulpChanged from 'gulp-changed';
import gulpDebug from 'gulp-debug';
import gulpIf from 'gulp-if';

import gulpImagemin from 'gulp-imagemin';
import imageminPng from 'imagemin-pngquant';
import imageminJpg from 'imagemin-jpeg-recompress';
import imageminWebp from 'imagemin-webp';
import imageminSVGO from 'imagemin-svgo';
import gulpWebp from 'gulp-webp';

import {paths, environment, description,} from '../config.js';

let imageminConfig = {
    jpg: {quality: 'low', min: 35, max: 70,},
    png: { quality: [0.35, 0.7,]},
    webp: {quality: 50},
    svg: {
        plugins: [{
            cleanupAttrs: true,
        }, {
            removeDoctype: true,
        },{
            removeXMLProcInst: true,
        },{
            removeComments: true,
        },{
            removeMetadata: true,
        },{
            removeTitle: true,
        },{
            removeDesc: true,
        },{
            removeUselessDefs: true,
        },{
            removeEditorsNSData: true,
        },{
            removeEmptyAttrs: true,
        },{
            removeHiddenElems: true,
        },{
            removeEmptyText: true,
        },{
            removeEmptyContainers: true,
        },{
            removeViewBox: false,
        },{
            cleanUpEnableBackground: true,
        },{
            convertStyleToAttrs: true,
        },{
            convertColors: true,
        },{
            convertPathData: true,
        },{
            convertTransform: true,
        },{
            removeUnknownsAndDefaults: true,
        },{
            removeNonInheritableGroupAttrs: true,
        },{
            removeUselessStrokeAndFill: true,
        },{
            removeUnusedNS: true,
        },{
            cleanupIDs: true,
        },{
            cleanupNumericValues: true,
        },{
            moveElemsAttrsToGroup: true,
        },{
            moveGroupAttrsToElems: true,
        },{
            collapseGroups: true,
        },{
            removeRasterImages: false,
        },{
            mergePaths: true,
        },{
            convertShapeToPath: true,
        },{
            sortAttrs: true,
        },{
            transformsWithOnePath: false,
        },{
            removeDimensions: true,
        },{
            removeAttrs: {attrs: '(stroke|fill)'},
        }]
    },
};

function copyImages() {
    return gulp
        .src(
            [`${paths.source.images}/**/*.{jpg,png,webp,svg}`, `!${paths.source.images}/icons/**/*`,]
        )
        .pipe(gulpChanged(`${paths.destination.images}`))
        .pipe(gulpDebug({title: '\t\t\t\t\t copy images'}))
        .pipe(gulpIf(environment.isProduction, gulpImagemin([
            imageminPng(imageminConfig.png),
            imageminJpg(imageminConfig.jpg), 
            imageminWebp(imageminConfig.webp),
            imageminSVGO(imageminConfig.svg),
        ], {verbose: true})))
        .pipe(gulp.dest(`${paths.destination.images}`));
}

function convertImagesToWebp() {
    return gulp
        .src(
            [`${paths.source.images}/**/*.{jpg,png}`, `!${paths.source.images}/favicon/**/*`, `!${paths.source.images}/icons/**/*`,]
        )
        .pipe(gulpChanged(`${paths.destination.images}`, {extension: '.webp'}))
        .pipe(gulpDebug({title: '\t\t\t\t\t convert images {jpg, png} to webp'}))
        .pipe(gulpIf(environment.isDevelopment, gulpWebp()))
        .pipe(gulpIf(environment.isProduction, gulpWebp({quality: 50})))
        .pipe(gulp.dest(`${paths.destination.images}`));
}

// ? How to replace without setTimeout? const build_images = gulp.series(
// copyImages,   gulp.parallel(convertImagesToWebp), ); ! FIX need promise?
const task_images = (cb) => {
    setTimeout(copyImages, 0);
    setTimeout(convertImagesToWebp, 5000);
    cb();
};

task_images.description = `${description.begin}copy and convert images to${description.end}`;
task_images.displayName = 'images';

const watch_images = () => {
    gulp.watch(`${paths.source.images}/**/*.{jpg,png,webp}`, task_images);
};

export {
    task_images,
    watch_images,
};
