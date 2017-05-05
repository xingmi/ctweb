var gulp = require('gulp');
// var cheerio  = require('gulp-cheerio');
var getTime = new Date().getTime();
var replace = require('gulp-replace');
var gulpWebpack = require('webpack-stream');
// var config = require('./webpack.config');
const shell = require('gulp-shell')

gulp.task('default',['moveJs'], function() {
    return gulp.src('./*.html')
        .pipe(replace(/.js/g, '.js?v='+getTime))
        .pipe(replace(/.css/g, '.css?v='+getTime))
        .pipe(gulp.dest('./dist'));
});

gulp.task('moveRes', function(){
  return gulp.src('./static/**/*')
    .pipe(gulp.dest('./dist/static'))
})

gulp.task('moveJs',function(){
  shell([
    'npm run dev'
  ])
//gulpWebpack(require('./webpack.config'))
  // return gulp.src('./res/controllers/*.js')
  //   .pipe(gulpWebpack(config))
  //   .pipe(gulp.dest('./dist'))
})