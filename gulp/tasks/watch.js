var gulp = require('gulp');
var watch = require('gulp-watch');
var browserSync = require('browser-sync').create();

gulp.task('watch',function(){

    browserSync.init({
        notify:false,
        //where the website live
        server:{
            baseDir: "app" //folderName
        }
    })

    //設定監看對象
    watch('./app/index.html', function(){
        //監看對象變動執行
        browserSync.reload();
    });

    watch('./app/assets/styles/**/*.css', function(){
        gulp.start('cssInject');
    });

});

          //taskName  //dependency 先執行指定task才執行目前這個task  //callback
gulp.task('cssInject',['styles'],function(){
    return gulp.src('./app/temp/styles/main.css')
    .pipe(browserSync.stream());
});