import del from 'del';

import {paths, description,} from '../config.js';

function deleteBuildFolder() {
  return del(paths.destination.root);
}

const task_clean = (cb) => {
  setTimeout(deleteBuildFolder, 0);
  cb();
};

task_clean.description = `${description.begin}delete all files in${description.end}`;
task_clean.displayName = 'clean';

export {
  task_clean
};
