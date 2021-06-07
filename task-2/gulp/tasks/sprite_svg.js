import gulp from 'gulp';
import {paths, description,} from '../config.js';
import gulpSvgSprite from 'gulp-svg-sprite';
import gulpDebug from 'gulp-debug';
import gulpPlumber from 'gulp-plumber';
import gulpNotify from 'gulp-notify';
import svgo from 'gulp-svgo';

function createSpriteSVG() {
    return gulp
        .src(`${paths.source.iconsSVG}/*.svg`)

        .pipe(gulpPlumber({
            errorHandler: gulpNotify.onError(
                {title: 'Error running sprite-svg', message: 'Error: <%= error.message %>'}
            )
        }))
        .pipe(gulpDebug({title: '\t\t\t\t\t svg-sprite'}))
        .pipe(svgo())
        .pipe(gulpSvgSprite({
            mode: {
                stack: {
                    sprite: `../../../../${paths.destination.images}/sprites/sprite_svg_stack.svg`
                },
                shape: {
                    transform: [
                        {
                            svgo: {
                                plugins: [
                                    {
                                        removeAttrs: {
                                            attrs: ['class', 'data-name'],
                                        },
                                    },
                                    {
                                        removeUselessStrokeAndFill: false,
                                    },
                                    {
                                        inlineStyles: true,
                                    },
                                ],
                            },
                        },
                    ],
                },
            }
        }))
        .pipe(gulp.dest(`${paths.source.images}/sprites`));
}

const task_sprite_svg = (cb) => {
    setTimeout(createSpriteSVG, 0);
    cb();
};

task_sprite_svg.description = `${description.begin}create sprite from SVG to${description.end}`;
task_sprite_svg.displayName = 'sprite-svg';

const watch_sprite_svg = () => {
    gulp.watch(`${paths.source.iconsSVG}/*.svg`, task_sprite_svg);
};

export {
    task_sprite_svg,
    watch_sprite_svg,
};
