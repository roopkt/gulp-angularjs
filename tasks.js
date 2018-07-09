var
    config = require('./gulp.conf'),
    del = require('del'),
    gulp = require('gulp'),
    minifyCss = require('gulp-clean-css'),
    $ = require('gulp-load-plugins')({ lazy: true });

module.exports = {
    cleanCode: function (done) {
        var files = [].concat(
            config.tmp + '**/*.{js,html,css}',
            config.build + '**/*.{html,css,js}',
        );

        clean(files, done);
    },
    injectJs: function () {
        log('injecting app js');

        return gulp
            .src(config.index)
            .pipe($.inject(gulp.src(config.js, { read: false })))
            .pipe(gulp.dest(config.client));
    },
    injectLib: function () {
        log('injecting lib js');

        return gulp
            .src(config.index)
            .pipe($.inject(gulp.src(config.libs, { read: false }), { name: 'inject:lib' }))
            .pipe(gulp.dest(config.client));
    },
    injectCss: function () {
        log('injecting css');

        return gulp
            .src(config.index)
            .pipe($.inject(gulp.src(config.css, { read: false })))
            .pipe(gulp.dest(config.client));
    },
    injectTemplate: function () {
        log('injecting template');
        var templateCache = config.tmp + config.templateCache.file;

        return gulp
            .src(config.index)
            .pipe($.inject(gulp.src(templateCache, { read: false }), { name: 'inject:templates' }))
            .pipe(gulp.dest(config.client));
    },
    optimize: function () {
        log('optimizing the javascript, css, html');

        return gulp
            .src(config.index)
            .pipe($.plumber())
            .pipe($.useref({ allowEmpty: true, searchPath: './' }))
            .pipe($.if('*.js', $.uglify()))
            .pipe($.if('*.css', minifyCss()))
            .pipe(gulp.dest(config.build));
    },
    styles: function () {
        log('compiling less --> css');

        return gulp.src(config.less)
            .pipe($.less())
            .pipe($.autoprefixer({ browsers: ['last 2 version', '> 5%'] }))
            .pipe(gulp.dest(config.tmp));
    },
    templateCache: function () {
        log('creating templatecache');

        return gulp
            .src(config.htmltemplates)
            .pipe($.minifyHtml({ empty: true }))
            .pipe($.angularTemplatecache(
                config.templateCache.file,
                config.templateCache.options
            ))
            .pipe(gulp.dest(config.tmp));
    }
};

function clean(path, done) {
    log('cleaning: ' + $.util.colors.blue(path))

    del(path).then(() => done());
}

function log(msg) {
    if (typeof msg === 'object') {
        $.util.log($.util.colors.blue(msg.message));
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}