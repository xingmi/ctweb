var gulp = require('gulp');
var getTime = new Date().getTime();
var replace = require('gulp-replace');
var webpack = require('webpack');
var config = require('./webpack.config');
var htmlmin = require('gulp-htmlmin');
var autoprefixer = require('gulp-autoprefixer');

var staticResourcePath = "./dist/static"

gulp.task('default',['moveJs','moveImage','moveCss'], function() {
    return gulp.src('./*.html')
        .pipe(replace(/\.js/g, '.js?v='+getTime))
        .pipe(replace(/\.css/g, '.css?v='+getTime))
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('./dist'));
});

gulp.task('moveImage', function(){
  return gulp.src('./static/images/**/*')
    .pipe(gulp.dest(staticResourcePath + "/images"))
})

gulp.task('moveJs',function(){
  webpack(config,function(){})
})

gulp.task('moveCss', function(){
  return gulp.src('./static/style/**/*')
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(gulp.dest(staticResourcePath + "/style"))
})