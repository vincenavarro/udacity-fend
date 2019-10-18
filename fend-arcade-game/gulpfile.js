/* global require */

/*
Install packages:
install will install the npm package to your node_modules folder and not be added to the package.json
install --save - package(s) required by the application to run
install --save-dev - package(s) required for development purpose.
npm i
npm i -D gulp@next gulp-eslint browser-sync gulp-concat gulp-sass gulp-autoprefixer gulp-htmlmin gulp-minify del gulp-cache gulp-imagemin imagemin-pngquant imagemin-zopfli imagemin-mozjpeg imagemin-giflossy gulp-fluent-ffmpeg
usr/local => https://www.ffmpeg.org/download.html
*/

const gulp = require('gulp'),
	// General Use Commands
	del = require('del'),
	concat = require('gulp-concat'),
	browserSync = require('browser-sync').create(),
	// HTML Related
	htmlmin = require('gulp-htmlmin'),
	// CSS Related
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	// JavaScript Related
	minify = require('gulp-minify'),
	eslint = require('gulp-eslint'),
	// Image Stuff
	cache = require('gulp-cache'),
	imagemin = require('gulp-imagemin'),
	imageminPngquant = require('imagemin-pngquant'),
	imageminZopfli = require('imagemin-zopfli'),
	imageminMozjpeg = require('imagemin-mozjpeg'), //need to run 'brew install libpng,
	imageminGiflossy = require('imagemin-giflossy'),
	// Sound stuff
	ffmpeg = require('gulp-fluent-ffmpeg');
//sourcemaps = require('gulp-sourcemaps'),

const input = 'source/',
	output = 'www/',
	htmlSrc = input + '*.{html,htm}',
	htmlDest = output,
	cssSrc = input + 'sass/**/*.{scss,sass}',
	cssDest = output + 'css/',
	jsSrc = [input + 'js/resources.js', input + 'js/app.js', input + 'js/engine.js', '!node_modules/**'], //'js/**/*.js',
	jsDest = output + 'js/',
	imgSrc = input + 'img/**/*.{gif,png,jpg,svg}',
	imgDest = output + 'img/',
	sndSrc = input + 'snd/**/*.{wav,ogg,flac}',
	sndDest = output + 'snd/';
//jsMap = './maps/',

gulp.task('html', done => {
	gulp
		.src(htmlSrc)
		.pipe(gulp.dest(htmlDest));
	done();
});

gulp.task('html-build', done => {
	gulp
		.src(htmlSrc)
		.pipe(htmlmin({
			collapseWhitespace: true,
			removeComments: true
		}))
		.pipe(gulp.dest(htmlDest));
	done();
});


gulp.task('styles', done => {
	gulp
		.src(cssSrc)
		.pipe(sass().on('error', sass.logError))
		.pipe(concat('style.css'))
		.pipe(gulp.dest(cssDest));
	done();
});

gulp.task('styles-build', done => {
	gulp
		.src(cssSrc)
		.pipe(sass({
			outputStyle: 'compressed'
		}).on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(({
			compatibility: 'ie8',
			level: 2
		}))
		.pipe(concat('style.css'))
		.pipe(gulp.dest(cssDest));
	done();
});

gulp.task('js', done => {
	gulp
		.src(jsSrc)
		.pipe(eslint({
			fix: true
		}))
		.pipe(concat('all.js'))
		.pipe(gulp.dest(jsDest));
	done();
});

gulp.task('js-build', done => {
	gulp
		.src(jsSrc)
		//.pipe(eslint({fix: true}))
		.pipe(minify({
			ext: {
				//src:'-debug.js',
				min: '.js'
			}
		}))
		//.pipe(concat('all.js'))
		.pipe(gulp.dest(jsDest));
	done();
});

gulp.task('image', done => {
	gulp
		.src(imgSrc)
		.pipe(gulp.dest(imgDest));
	done();
});

gulp.task('image-compress', done => {
	gulp.src(imgSrc)
		.pipe(cache(imagemin([
			//png
			imageminPngquant({
				speed: 1,
				quality: 98 //lossy settings
			}),
			imageminZopfli({
				more: true
				// iterations: 50 // very slow but more effective
			}),
			//gif
			// imagemin.gifsicle({
			//     interlaced: true,
			//     optimizationLevel: 3
			// }),
			//gif very light lossy, use only one of gifsicle or Giflossy
			imageminGiflossy({
				optimizationLevel: 3,
				optimize: 3, //keep-empty: Preserve empty transparent frames
				lossy: 2
			}),
			//svg
			imagemin.svgo({
				plugins: [{
					removeViewBox: false
				}]
			}),
			//jpg lossless
			imagemin.jpegtran({
				progressive: true
			}),
			//jpg very light lossy, use vs jpegtran
			imageminMozjpeg({
				quality: 90
			})
		])))
		.pipe(gulp.dest(imgDest));
	done();
});

gulp.task('sound', done => {
	gulp.src(sndSrc)
		.pipe(cache(ffmpeg('mp3', function (cmd) {
			return cmd
				.audioBitrate('320k')
				.audioChannels(2)
				.audioCodec('libmp3lame');
		})))
		.pipe(gulp.dest(sndDest));
	done();
});

gulp.task('sound-compress', done => {
	gulp.src(sndSrc)
		.pipe(cache(ffmpeg('mp3', function (cmd) {
			return cmd
				.audioBitrate('128k')
				.audioChannels(2)
				.audioCodec('libmp3lame');
		})))
		.pipe(gulp.dest(sndDest));
	done();
});

gulp.task('watch', done => {
	browserSync.init({
		server: output,
		//open: false
	});
	browserSync.stream();

	gulp.watch(cssSrc, gulp.series('styles'));
	gulp.watch(jsSrc, gulp.series('js'));
	gulp.watch(htmlSrc, gulp.series('html'));
	gulp.watch(imgSrc, gulp.series('image'));
	gulp.watch(sndSrc, gulp.series('sound'));

	gulp.watch(output + '**/*').on('change', browserSync.reload);
	done();
});

gulp.task('dev', gulp.parallel('html', 'styles', 'js', 'image', 'sound'));

gulp.task('build', gulp.parallel('html-build', 'styles-build', 'js-build', 'image-compress', 'sound-compress'));

gulp.task('build-purge', done => {
	del(output);
	done();
});

gulp.task('default', done => done());