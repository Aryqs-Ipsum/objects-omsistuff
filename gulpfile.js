const {src, dest, series, parallel} = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const htmlmin = require('gulp-htmlmin');
const minifyInline = require('gulp-minify-inline');
const clean = require('gulp-clean');
const inlinesource = require('gulp-inline-source-html');
const del = require('del');

function clearDist() {
    return del('dist');
}

function convertSass() {
    return src('src/style.scss')
        .pipe(sass())
        .pipe(dest('tmp'));
}

function clearTmp() {
    return del('tmp');
}

function minifyHTML() {
    return src('src/index.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(inlinesource({ compress: true }))
        .pipe(dest('dist'));
}

module.exports = {
    build: series(clearDist, convertSass, minifyHTML, clearTmp)
}