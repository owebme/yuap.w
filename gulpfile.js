var gulp = require('gulp');
var sass = require('gulp-sass');
var csso = require('gulp-csso');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var base64 = require('gulp-base64');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

browserSync.init({
	open: false,
	notify: false,
	// proxy: "http://localhost:8080/"
	server: {
		baseDir: "./"
	}
});

gulp.task('css', function() {
	gulp.src('public/css/style.scss')
		.pipe(sass())
		.pipe(csso())
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))	
        .pipe(base64({
            baseDir: './public/images',
            extensions: ['svg', 'png', 'jpg'],
            maxImageSize: 16*1024, // bytes 
            debug: false
        }))
		.pipe(rename("style.min.css"))
		.pipe(gulp.dest('./public/css'))
		.pipe(browserSync.stream());
});

gulp.task('watch', function() {	
	gulp.watch(['public/css/style.scss',
				'public/css/**/*.scss'], ['css']);		
				
    gulp.watch([
	"index.html",
	"public/**/*.js"]).on("change", reload);				
});

gulp.task('default', ['css', 'watch']);
