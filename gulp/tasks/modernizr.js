var gulp = require('gulp');
var modernizr = require('gulp-modernizr');


//依照設定、建立對應的瀏覽器相容JS檔案
gulp.task('modernizr', function(){
    return gulp.src(['./app/assets/styles/**/*.css','./app/assets/scripts/**/*.js'])
        .pipe(modernizr({
            "options": [
                "setClasses"
            ]
        }))
        .pipe(gulp.dest('./app/temp/scripts/'));
});