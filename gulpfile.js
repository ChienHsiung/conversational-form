var gulp = require('gulp');
var fs = require('fs');
var livereload = require('./gulp-tasks/node_modules/gulp-livereload');

var package = JSON.parse(fs.readFileSync('gulp-tasks/package.json'));

// include task files
require("./gulp-tasks/styles");
require("./gulp-tasks/scripts");
require("./gulp-tasks/images");
require("./gulp-tasks/bower");


//options
var srcFolder = './src/';
global.srcFolder = srcFolder;

var buildFolder = './build/';
global.buildFolder = buildFolder;

// Watch Files For Changes
gulp.task('watch', ['bower', 'typescript', 'stylus', 'copy-images'], function() {
	livereload.listen();

	console.log("Watch task started");

	gulp.watch(srcFolder + '/scripts/**/*.ts', ['typescript']);
	
	gulp.watch(srcFolder + '/scripts/**/*.js', ['scripts']);

	gulp.watch(srcFolder + '/images/**/*', ['copy-images']);

	gulp.watch(srcFolder + '/styles/**/*.styl', ['stylus']);
});

// Default Task
gulp.task('default', ['watch']);
gulp.task('build', ['bower', 'scripts-build', 'styles-build', 'copy-images']);