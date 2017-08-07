var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var del = require('del');
var usemin = require('gulp-usemin');
var rev = require('gulp-rev');
var cssnano = require('gulp-cssnano');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();

gulp.task('previewDist', function(){
     browserSync.init({
        notify:false,
        //where the website live
        server:{
            baseDir: "docs" //folderName
        }
    })
});


//每次build之前都將dist資料夾清空
gulp.task('deleteDistFolder',['icons'], function(){
    return del("./docs");
});

//將其他重要檔案複製到dist,並排除img css js temp的檔案
gulp.task('copyGeneralFiles',['deleteDistFolder'],function(){

    var pathsToCopy = [
        './app/**/*',
        '!./app/index.html',
        '!./app/assets/images/**',
        '!./app/assets/styles/**',
        '!./app/assets/scripts/**',
        '!./app/temp',
        '!./app/temp/**'
    ];


    return gulp.src(pathsToCopy)
        .pipe(gulp.dest('./docs'));
});

//壓縮圖片檔
gulp.task('optimizeImages',['deleteDistFolder'], function(){
    //將除了前面有"!"外的圖片檔案複製到指定路徑
    return gulp.src(['./app/assets/images/**/*', '!./app/assets/images/icons', '!./app/assets/images/icons/**/*'])
        .pipe(imagemin({
            //jpg 最佳化
            progressive: true,
            //gif 最佳化
            interlaced: true,
            //svg 最佳化
            multipass: true
        }))
        .pipe(gulp.dest("./docs/assets/images"));
});

gulp.task('useminTrigger',['deleteDistFolder'],function(){
    gulp.start("usemin");
});

//用usemin套件壓縮css js 記得在html下好註解指令
gulp.task('usemin',['styles', 'scripts'],function(){
    return gulp.src("./app/index.html")
        .pipe(usemin({
            css: [function(){return rev()},function(){return cssnano()}],
            js: [function(){return rev()}, function(){return uglify()}]
        }))
        .pipe(gulp.dest('./docs'));
});

gulp.task('build',['deleteDistFolder', 'copyGeneralFiles','optimizeImages', 'usemin', 'useminTrigger']);