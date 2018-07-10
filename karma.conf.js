var gulpConfig = require('./gulp.conf')();
module.exports = function (config) {
    config.set({
        browsers: ['PhantomJS'],
        frameworks: ['jasmine'],
        files: [].concat(
            gulpConfig.libs,
            gulpConfig.devDeps,
            gulpConfig.js,
            gulpConfig.tmp + gulpConfig.templateCache.file
        ),
        reporters: ['kjhtml','progress', 'coverage'],
        colors: true,
        logLevel: config.LOG_INFO,
        client: {
            clearContext: false    // will show the results in browser once all the testcases are loaded
        },
    });
};