const {src, dest, series, parallel} = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const htmlmin = require('gulp-htmlmin');
const inlinesource = require('gulp-inline-source-html');
const del = require('del');
const terser = require('gulp-terser');
const replace = require('gulp-replace');

function clearDist() {
    return del('dist');
}

function convertSass() {
    return src('src/styles/*.scss')
        .pipe(sass())
        .pipe(dest('dist/styles'));
}

function minifyMjs() {
    return src('src/scripts/*.mjs')
        .pipe(terser())
        .pipe(dest('dist'));
}

function minifyHTML() {
    return src('src/index.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(inlinesource({ compress: true }))
        .pipe(dest('dist'));
}

function addHashFileName() {
    version =  (Math.random() + 1).toString(36).substring(7);

    return src('dist/index.html')
        .pipe(replace(/(\.(css)|(mjs))/g, '$1?_=' + version))
        .pipe(dest('dist'));
}

module.exports = {
    build: series(clearDist, parallel(convertSass, minifyMjs), minifyHTML, addHashFileName)
}