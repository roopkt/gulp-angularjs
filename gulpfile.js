var
    gulp = require('gulp'),
    config = require('./gulp.conf'),
    $ = require('gulp-load-plugins')({ lazy: true });

var tasks = {
    hello: function () {
        $.util.log('hello');
    }
}

gulp.task('default', tasks.hello);