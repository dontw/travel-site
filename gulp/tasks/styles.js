var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssvars = require('postcss-simple-vars');
var nested = require('postcss-nested');
var cssImport = require('postcss-import');
var mixins = require('postcss-mixins');

gulp.task('styles', function(){
    //設定檔案來源
    return gulp.src('./app/assets/styles/main.css')

    //設定來源檔案變化的filter
    .pipe(postcss([cssImport, mixins,cssvars, nested, autoprefixer]))

    //當遇到錯誤
    .on('error', function(errorInfo){
        console.log(errorInfo.toString());
        //結束這個task
        this.emit('end');
    })

    //指定目的地資料夾
    .pipe(gulp.dest('./app/temp/styles'));
});

// gulp.task('html',function(){
//     return gulp.src('./app/index.html')
//     .pipe(gulp.dest('./app/temp'));
// });
