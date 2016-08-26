// 引入 gulp
var gulp = require('gulp');

// 引入组件
//var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var minify = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var connect = require('gulp-connect');


// 编译Sass
gulp.task('sass', function() {
    var stream=gulp.src('./sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./gulp-css'))
        .pipe(connect.reload())
    return stream;
});


// 合并，压缩文件
gulp.task('minscss',['sass'], function() {
    gulp.src('./gulp-css/*.css')
        .pipe(concat('all.css'))    
        .pipe(gulp.dest('./gulp-css-min'))  
        .pipe(rename('all.min.css'))  
        .pipe(minify())
        .pipe(gulp.dest('./gulp-css-min'))     
        .pipe(connect.reload())
              
});

gulp.task('html',function(){
    gulp.src('./html/*.html')
        .pipe(connect.reload())
})

//watch任务
/*gulp.task('watch',function(){
    gulp.watch('./sass/*.scss', function(){
        gulp.run('sass','minscss');
    });
    gulp.watch('./html/*.html', function(){
        gulp.run('html');
    });
})*/

//watch任务
gulp.task('watch',function(){
    gulp.watch('./sass/*.scss',["sass","less"]);
    gulp.watch('./html/*.html',["html"]);
})


//服务器任务
gulp.task('connect',function(){
    connect.server({
        livereload: true
    })
})



// 默认任务
gulp.task('default',['sass','minscss','watch','connect']);