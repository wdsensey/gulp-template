var gulp = require('gulp');
var sass = require('gulp-sass');
var bs = require('browser-sync').create();
var imgmin = require('gulp-imagemin');
var del = require('del');
var runSequence = require('run-sequence');

gulp.task ('sass', function () {
	return gulp.src('app/scss/**/*.scss')
	.pipe(sass())
	.pipe(gulp.dest('app/css'))
	.pipe(bs.reload({
		stream: true
	}));
});

gulp.task ('watch', function () {
	gulp.watch('app/scss/**/*.scss', ['sass']);
	gulp.watch('app/*.html', function (){
		bs.reload();
	});
});

gulp.task ('bs', function () {
	bs.init({
		server: {
			baseDir: 'app'
		}
	})
});

gulp.task ('use', function () {
	gulp.src(['app/**/*', '!app/{scss,scss/**}'])
	.pipe(gulp.dest('dist'));
});

gulp.task ('imgmin', function () {
	return gulp.src('app/img/**/*.+(png|jpg|svg|gif)')
	.pipe(imgmin())
	.pipe(gulp.dest('dist/img'));
});

gulp.task ('clean:dist', function () {
	return del.sync('dist');
});

gulp.task ('default', function () {
	runSequence('bs', 'sass', 'watch')
});

gulp.task ('build', function (callback) {
	runSequence('clean:dist', 'sass', ['use', 'imgmin'])
});