import del from 'del';
import gulp from 'gulp';
import {paths, description,} from '../config.js';
import gulpSpritesmith from 'gulp.spritesmith';

function deleteSpritePNG() {
  // delete old sprite
  del.sync(
    [`${paths.source.images}/sprites/sprite_png*.*`, `${paths.destination.images}/sprites/sprite_png*.*`,]
  );
}

function createSpritePNG() {
  const fileName = 'sprite_png_' + Math
    .random()
    .toString(16)
    .substring(2, 10) + '.png';

  const spriteData = gulp
    .src(`${paths.source.iconsPNG}/*.png`)
    .pipe(gulpSpritesmith({
      imgName  : fileName,
      imgPath  : '../../images/sprites/' + fileName,

      cssFormat: 'scss',
      cssName  : '_sprite_png_scss.scss',
      algorithm: 'top-down',
      padding  : 10,

      cssVarMap: function (sprite) {
        sprite.name = 'icon-' + sprite
          .name
          .replace(/ /g, '_____');
      }
    }));

  spriteData
    .css
    .pipe(gulp.dest(`${paths.source.styles}/sprites`));
  spriteData
    .img
    .pipe(gulp.dest(`${paths.source.images}/sprites`));

  return spriteData;
}

const task_sprite_png = (cb) => {
  setTimeout(deleteSpritePNG, 0);
  setTimeout(createSpritePNG, 100);
  cb();
};

task_sprite_png.description = `${description.begin}create sprite from PNG to${description.end}`;
task_sprite_png.displayName = 'sprite-png';

const watch_sprite_png = () => {
  gulp.watch(`${paths.source.iconsPNG}/*.png`, task_sprite_png);
};

export {
  task_sprite_png,
  watch_sprite_png,
};
