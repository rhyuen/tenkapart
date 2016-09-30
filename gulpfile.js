var gulp = require("gulp");
var htmlmin = require("gulp-htmlmin");
var cssmin = require("gulp-cssmin");
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");
var imagemin = require("gulp-imagemin");
var browserSync = require("browser-sync").create();

gulp.task("html-minify", function(){
  return gulp.src("src/**/*.html")
    .pipe(htmlmin({collapseWhitespace:true}))
    .pipe(rename({suffix: ".min"}))
    .pipe(gulp.dest("dist"));
});

gulp.task("css-minify", function(){
  return gulp.src("src/**/*.css")
    .pipe(cssmin())
    .pipe(rename({suffix: ".min"}))
    .pipe(gulp.dest("dist"));
});

gulp.task("js-minify", function(){
  return gulp.src("src/**/*.js")
    .pipe(uglify())
    .pipe(rename({suffix: ".min"}))
    .pipe(gulp.dest("dist"));
});

gulp.task("image-minify", function(){
  return gulp.src("src/**/*.png")
    .pipe(imagemin())
    .pipe(rename({suffix: ".min"}))
    .pipe(gulp.dest("dist"));
});

gulp.task("browser-sync", function(){
  browserSync.init({
    server: {
      baseDir: "./src"
    }
  });
});

gulp.task("build", ["html-minify", "css-minify", "js-minify", "image-minify"], function(){
});


gulp.task("watch", ["browser-sync"], function(){
  gulp.watch("./**/*.html", browserSync.reload);
  gulp.watch("./**/*.css", browserSync.reload);
  gulp.watch("./**/*.js", browserSync.reload);
});
