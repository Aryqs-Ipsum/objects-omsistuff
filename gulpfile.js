const {src, dest, watch, series, parallel} = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const htmlmin = require('gulp-htmlmin');
const inlinesource = require('gulp-inline-source-html');
const del = require('del');
const terser = require('gulp-terser');
const replace = require('gulp-replace');
const include = require('gulp-html-tag-include');
const gulpMinifyCssNames = require('gulp-minify-css-names');

function clearDist() {
    return del('dist');
}

function convertSass() {
    return src('src/styles/*.scss')
        .pipe(sass())
        .pipe(dest('dist'));
}

function minifyMjs() {
    return src('src/scripts/*.mjs')
        .pipe(terser())
        .pipe(dest('dist'));
}

function minifyHTML() {
    return src('src/index.html')
        .pipe(include())
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(inlinesource({ compress: true }))
        .pipe(dest('dist'));
}

function minifyClassNames() {
    return src(['dist/index.html', 'dist/*.css'])
        .pipe(gulpMinifyCssNames({
            prefix: 'os-',
            postfix: ''
        }))
        .pipe(dest('dist'))
}

function addHashFileName() {
    version =  (Math.random() + 1).toString(36).substring(7);

    return src('dist/index.html')
        .pipe(replace(/(\.(css)|(mjs))/g, '$1?_=' + version))
        .pipe(dest('dist'));
}

function watcher() {
    watch('src/**/*', series(parallel(convertSass, minifyMjs), minifyHTML));
}

const build = series(clearDist, parallel(convertSass, minifyMjs), minifyHTML, minifyClassNames, addHashFileName);

module.exports = {
    build: build,
    watch: watcher
}