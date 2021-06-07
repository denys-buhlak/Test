import gulp from 'gulp';
import {task_clean} from './gulp/tasks/clean.js';
import {task_html, watch_html,} from './gulp/tasks/html.js';
import {task_fonts, watch_fonts,} from './gulp/tasks/fonts.js';
import {task_images, watch_images,} from './gulp/tasks/images.js';
// import { task_scripts, watch_scripts } from './gulp/tasks/scripts.js';
import {task_scripts_webpack, watch_scripts_webpack} from './gulp/tasks/scripts_webpack.js';
import {task_styles, watch_styles,} from './gulp/tasks/styles.js';
import {task_bs} from './gulp/tasks/server.js';
import {task_deploy} from './gulp/tasks/deploy.js';
import {task_sprite_png, watch_sprite_png,} from './gulp/tasks/sprite_png.js';
import {task_sprite_svg, watch_sprite_svg,} from './gulp/tasks/sprite_svg.js';

import {environment, description,} from './gulp/config.js';
environment.setEnvironment();

/* GULP tasks */
export {
    task_clean
};
export {
    task_html
};
export {
    task_fonts
};
export {
    task_images
};
// export { task_scripts };
export {
    task_scripts_webpack
};
export {
    task_styles
};
export {
    task_bs
};
export {
    task_deploy
};
export {
    task_sprite_png
};
export {
    task_sprite_svg
};

export const task_build = (cb) => {
    setTimeout(
        gulp.parallel(task_sprite_png, task_sprite_svg, task_html, task_fonts, task_images,
            // task_scripts,
            task_scripts_webpack, task_styles),
        0
    );
    cb();
};

task_build.description = `${description.begin}copy all source to${description.end}`;
task_build.displayName = 'build';

export const task_development = () => {
    setTimeout(
        gulp.series(
            task_bs,
            task_build,
            gulp.parallel(watch_sprite_png, watch_sprite_svg, watch_html, watch_fonts, watch_images,
                // watch_scripts,
                watch_scripts_webpack, watch_styles)
        ),
        0
    );
};

task_development.description = `${description.begin}\x1b[1;3;35mmain task\x1b[0;32m for create ${description.end}`;
task_development.displayName = 'dev';

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- /* Default task */
export default(cb) => {
    task_development();
    cb();
};

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- /* TEST */
