import {Gulpclass, Task} from "gulpclass/Decorators";

let url = require('url');
let gulp = require("gulp");
let sass = require('gulp-sass');
let proxy = require('proxy-middleware');
let browserSync = require("browser-sync");
let errorFn = function(error) {
    this.emit('end');
    console.error(error + '\nError detected, but server not stopped');    
};

@Gulpclass()
export class Gulpfile {    
    @Task()
    compile_sass() {
        return gulp.src('public/scss/**/*.scss')
            .pipe(sass())
            .on("error", errorFn)
            .pipe(gulp.dest('./public/css/'))           
            .pipe(browserSync.stream());
    }
    @Task()
    default() {        
        browserSync.init({
            port: 5000,
            open: false,
            server: {
                baseDir: "./public",
                middleware: [proxy('54.164.49.88:8080')]
            }
        });
        gulp.watch('public/scss/**/*.scss', ['compile_sass']);        
    }     
}