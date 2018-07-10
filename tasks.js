var
    config = require('./gulp.conf')(),
    del = require('del'),
    gulp = require('gulp'),
    minifyCss = require('gulp-clean-css'),
    $ = require('gulp-load-plugins')({ lazy: true });

module.exports = function () {
    var tasks = {
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
                .pipe($.if('*.js', $.ngAnnotate()))
                .pipe($.if('*.js', $.uglify()))
                .pipe($.if('*.css', minifyCss()))
                .pipe(gulp.dest(config.build));
        },
        startSingleRunTests: function (done) {
            log('Karma: started single run tests');

            tasks.startTests(true, done);
        },
        startAutoTests: function (done) {
            log('Karma: started auto tests');

            tasks.startTests(false, done);
        },
        startTests: function (singleRun, done) {
            var Server = require('karma').Server;
            new Server({
                configFile: __dirname + '/karma.conf.js',
                singleRun: false
            }, karmaCompleted).start();

            function karmaCompleted(karmaResult) {
                log('karma completed!');

                if (karmaResult === 1) {
                    done('karma: tests failed with code ' + karmaResult);
                } else {
                    done();
                }
            }
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

    return tasks;
}

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