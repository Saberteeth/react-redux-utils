var gulp = require("gulp");
gulp.task('default',function(){
    gulp.src("./public/**/*.*")
    .pipe(gulp.dest("./dist/"));

    gulp.src("./views/**/*.*")
    .pipe(gulp.dest("./dist/"));
})

