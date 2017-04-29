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
const proxyOptions = url.parse(
    'http://xmark-dev1.xtime.com/xmark'  // DEV1
    // 'http://xmark-qa1.xtime.com/xmark'      // QA1
    // 'http://xmark-uat1.xtime.com/xmark'  // UAT1
    // 'http://10.100.0.106:9090/xmark'     // LOCAL
);
proxyOptions.route = '/xmark';

@Gulpclass()
export class Gulpfile {    
    @Task()
    compile_sass() {
        return gulp.src('scss/**/*.scss')
            .pipe(sass())
            .on("error", errorFn)
            .pipe(gulp.dest('./css/'))           
            .pipe(browserSync.stream());
    }
    @Task()
    default() {        
        browserSync.init({
            port: 5000,
            open: false,
            server: {
                baseDir: "./",
                middleware: [proxy(proxyOptions)]
            }
        });
        gulp.watch('scss/**/*.scss', ['compile_sass']);        
    }     
}