var gulp = require('gulp');
var sass = require('gulp-sass');
var csso = require('gulp-csso');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var base64 = require('gulp-base64');
var px2rem = require('gulp-px2rem');
var template = require('gulp-template-compile');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

browserSync.init({
	open: false,
	notify: false,
	// proxy: "http://localhost:8080/"
	server: {
		baseDir: "../"
	}
});

gulp.task('css', function() {
	gulp.src('css/style.scss')
		.pipe(sass())
		.pipe(csso())
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
        .pipe(base64({
            baseDir: '../',
            extensions: ['svg', 'png', 'jpg'],
            maxImageSize: 16*1024, // bytes
            debug: false
        }))
		//.pipe(px2rem())
		.pipe(rename("style.min.css"))
		.pipe(gulp.dest('css'))
		.pipe(browserSync.stream());
});

gulp.task('templates', function() {
	gulp.src('templates/*.html')
		.pipe(template({
			namespace: "yuapApp.templates",
			name: function (file) {
				return file.relative.replace(/\.html/, "");
			}
		}))
		.pipe(concat('templates.js'))
		.pipe(gulp.dest('js'))
		.pipe(browserSync.stream());
});

gulp.task('watch', function() {
	gulp.watch([
		'css/style.scss',
		'css/**/*.scss'
	], ['css']);

	gulp.watch('templates/*.html', ['templates']);

    gulp.watch([
		'../index.html',
		'../promo.html',
		'js/*.js',
		'js/**/*.js'
	]).on('change', reload);
});

gulp.task('default', ['css', 'templates', 'watch']);
