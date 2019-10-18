/* global require */
/* Just a simple watcher. */

const gulp = require('gulp'),
	browserSync = require('browser-sync').create(),
	fileLocations = [
		'**/*.{html,js,css}',
		'!node_modules/**',
		'!./*.js'
	];

gulp.task('default', () => {
	browserSync.init({
		server: '.',
		port: 8000,
		open: true,
		injectChanges: false // browserSync.stream seems to be broken...
	});
	gulp.watch(fileLocations).on('change', browserSync.reload);
});