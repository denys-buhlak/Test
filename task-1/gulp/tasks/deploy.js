import {paths, description,} from '../config.js';
import ghPages from 'gh-pages';

function deployToGitHubPages() {
  return ghPages.publish(paths.destination.root, {
    message: 'Update at: ' + new Date().toUTCString()
  });
}

const task_deploy = (cb) => {
  setTimeout(deployToGitHubPages, 0);
  cb();
};

task_deploy.description = `${description.begin}deploy to gh-pages from${description.end}`;
task_deploy.displayName = 'deploy';

export {
  task_deploy
};
