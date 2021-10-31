const {src, dest} = require("gulp");
const gulpMinifyCssNames = require('gulp-minify-css-names');

function minifyClassNames() {
    return src(['dist/index.html', 'dist/*.css'])
        .pipe(gulpMinifyCssNames({
            prefix: 'os-',
            postfix: ''
        }))
        .pipe(dest('dist'))
}

module.exports = {
    build: minifyClassNames
}