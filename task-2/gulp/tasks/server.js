import {paths, description,} from '../config.js';
import bs from 'browser-sync';

function startServerBrowserSync() {
  bs.create;
  bs.init({
    server : `${paths.destination.root}`,
    files  : [
      `${paths.destination.html}/*.html`,
      `${paths.destination.styles}/*.css`,
      `${paths.destination.scripts}/*.js`,
      `${paths.destination.fonts}/*.{ttf,woff,woff2}`,
      `${paths.destination.images}/**/*.{jpg,png,webp,svg,bmp,giff}`,
    ],
    port   : 9999,
    // tunnel: true,
    browser: ['Firefox'],
    notify : false
  });
  // bs.watch(`${paths.destination.root}`);
}

const task_bs = (cb) => {
  setTimeout(startServerBrowserSync, 0);
  cb();
};

task_bs.description = `${description.begin}start server in${description.end}`;
task_bs.displayName = 'bs';

export {
  task_bs
};
