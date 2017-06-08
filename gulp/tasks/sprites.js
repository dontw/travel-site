var gulp = require('gulp');
var svgSprite = require('gulp-svg-sprite');
var rename = require('gulp-rename');
var del = require('del');

var config = {
  mode: {
    css: {
      sprite:'sprite.svg',
      render:{
        css:{
          template: './gulp/templates/sprite.css'
        }
      }
    }
  }
}

gulp.task('beginClean', function(){
  return del(['./app/temp/sprite', './app/assets/images/sprites'])
});

gulp.task("createSprite",['beginClean'] ,function(){
  //where you icons source
  return gulp.src('./app/assets/images/icons/**/*.svg')
    .pipe(svgSprite(config))
    //where you put icons
    .pipe(gulp.dest('./app/temp/sprite/'));
});

gulp.task('copySpriteGraphic',['createSprite'], function(){
  return gulp.src('./app/temp/sprite/css/**/*.svg')
    .pipe(gulp.dest('./app/assets/images/sprites'));
});

gulp.task('copySpriteCSS', ['createSprite'],function(){
  return gulp.src('./app/temp/sprite/css/*.css')
    .pipe(rename('_sprite.css'))
    .pipe(gulp.dest('./app/assets/styles/modules'));
});

gulp.task('endClean',['copySpriteGraphic', 'copySpriteCSS'],function(){
  return del('./app/temp/sprite');
});

gulp.task('icons', ['beginClean','createSprite', 'copySpriteGraphic', 'copySpriteCSS', 'endClean']);
