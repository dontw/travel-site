var gulp = require('gulp');
var svgSprite = require('gulp-svg-sprite');
var rename = require('gulp-rename');
var del = require('del');
var svg2png = require('gulp-svg2png');

var config = {
  shape:{
    spacing: {
      padding: 1
    }
  },
  mode: {
    css: {
      variables:{
        replaceSvgWithPng: function(){
          return function(sprite, render){
            return render(sprite).split('.svg').join('.png');
          }
        }
      },
      sprite:'sprite.svg',
      render:{
        css:{
          template: './gulp/templates/sprite.css'
        }
      }
    }
  }
}

//將來源與目的地的資料夾全部清空
gulp.task('beginClean', function(){
  return del(['./app/temp/sprite', './app/assets/images/sprites'])
});

//將來源地資料夾內全部svg檔案 依照config的設定  儲存至目的地暫存資料夾中
gulp.task('createSprite',['beginClean'] ,function(){
  //where you icons source
  return gulp.src('./app/assets/images/icons/**/*.svg')
    .pipe(svgSprite(config))
    //where you put icons
    .pipe(gulp.dest('./app/temp/sprite/'));
});

//將轉到暫存資料夾的組合svg轉成png檔
gulp.task('createPngCopy', ['createSprite'], function(){
  return gulp.src('./app/temp/sprite/css/*.svg')
    .pipe(svg2png())
    .pipe(gulp.dest('./app/temp/sprite/css'));
});


//將暫存資料夾組合好的svg及png複製並放到指定的資料夾
gulp.task('copySpriteGraphic',['createPngCopy'], function(){
  return gulp.src('./app/temp/sprite/css/**/*.{svg,png}')
    .pipe(gulp.dest('./app/assets/images/sprites'));
});

//將暫存資料夾產出的css檔案重新命名並放到指定的資料夾
gulp.task('copySpriteCSS', ['createSprite'],function(){
  return gulp.src('./app/temp/sprite/css/*.css')
    .pipe(rename('_sprite.css'))
    .pipe(gulp.dest('./app/assets/styles/modules'));
});

//上面兩個複製動作完成後，清除暫存資料夾內的檔案
gulp.task('endClean',['copySpriteGraphic', 'copySpriteCSS'],function(){
  return del('./app/temp/sprite');
});

gulp.task('icons', ['beginClean','createSprite', 'createPngCopy','copySpriteGraphic', 'copySpriteCSS', 'endClean']);
