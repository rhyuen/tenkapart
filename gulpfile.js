var gulp = require("gulp");
var htmlmin = require("gulp-htmlmin");
var cssmin = require("gulp-cssmin");
var rename = require("gulp-rename");
var browserSync = require("browser-sync").create();

gulp.task("html-minify", function(){
  return gulp.src("src/**/*.html")
    .pipe(htmlmin({collapseWhitespace:true}))
    .pipe(rename({suffic: ".min"}))
    .pipe(gulp.dest("dist"));
});

gulp.task("css-minify", function(){
  return gulp.src("src/**/*.css")
    .pipe(cssmin())
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


gulp.task("watch", ["browser-sync"], function(){
  gulp.watch("./**/*.html", browserSync.reload);
  gulp.watch("./**/*.css", browserSync.reload);
  gulp.watch("./**/*.js", browserSync.reload);
});
