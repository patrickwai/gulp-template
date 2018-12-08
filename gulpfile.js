var gulp = require('gulp')
var sass = require('gulp-sass')
var browserSync = require('browser-sync').create()
var uglify = require('gulp-uglify')
var gulpIf = require('gulp-if')
var imagemin = require('gulp-imagemin')
var cache = require('gulp-cache')
var del = require('del')
var browserify = require('browserify')
var runSequence = require('run-sequence')
var useref = require('gulp-useref')
var cssnano = require('gulp-cssnano')
var sourcemaps = require('gulp-sourcemaps')
var log = require('gulplog')
var watchify = require('watchify')
var source = require('vinyl-source-stream')
var buffer = require('vinyl-buffer')
var assign = require('lodash.assign')
var tap = require('gulp-tap')

// copy css
gulp.task('css', function () {
    return gulp.src('app/css/*.css')
        // .pipe(sass())
        .pipe(cssnano())
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream())
})

// js for each page
gulp.task('js', function () {

    return gulp.src(['app/js/*.js', '!app/js/common.js'], {
            read: false
        })
        // no need of reading file because browserify does.
        // transform file objects using gulp-tap plugin
        .pipe(tap(function (file) {
            log.info('bundling ' + file.path)
            // replace file contents with browserify's bundle stream
            file.contents = browserify(file.path, {
                debug: true
            }).external('jquery').bundle()
        }))
        // transform streaming contents into buffer contents (because gulp-sourcemaps does not support streaming contents)
        .pipe(buffer())
        // load and init sourcemaps
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        .pipe(uglify())
        // write sourcemaps
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/js'))
})

// build common script into one js file
gulp.task('common', function () {
    // add custom browserify options here
    var customOpts = {
        entries: ['./app/js/common.js'],
        debug: true
    }
    var opts = assign({}, watchify.args, customOpts)
    var b = browserify(opts).require('jquery')

    b.on('update', bundle) // on any dep update, runs the bundler
    b.on('log', log.info) // output build logs to terminal

    function bundle() {
        return b.bundle()
            // log errors if they happen
            .on('error', log.error.bind(log, 'Browserify Error'))
            .pipe(source('common-bundle.js'))
            // optional, remove if you don't need to buffer file contents
            .pipe(buffer())
            // optional, remove if you dont want sourcemaps
            .pipe(sourcemaps.init({
                loadMaps: true
            })) // loads map from browserify file
            // Add transformation tasks to the pipeline here.
            .pipe(uglify())
            .pipe(sourcemaps.write('./')) // writes .map file
            .pipe(gulp.dest('./dist/js'))
    };
    bundle();
})

gulp.task('images', function () {
    return gulp.src('app/images/**/*.+(png|jpg|gif|svg)')
        .pipe(cache(imagemin({
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images'))
})

gulp.task('fonts', function () {
    return gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'))
})

gulp.task('clean', function () {
    return del.sync('dist')
})

gulp.task('build', function () {
    runSequence('clean', ['css', 'fonts', 'images', 'common', 'js'])
})

gulp.task('default', ['build'])