var
    gulp = require('gulp'),
    tasks = require('./tasks')();

gulp.task('clean-code', tasks.cleanCode);
gulp.task('inject-lib', tasks.injectLib);
gulp.task('inject-js', tasks.injectJs);
gulp.task('inject-css', tasks.injectCss);
gulp.task('inject-template', tasks.injectTemplate);
gulp.task('optimize', tasks.optimize);
gulp.task('styles', tasks.styles);
gulp.task('template-cache', tasks.templateCache);
gulp.task('test', tasks.startAutoTests);
gulp.task('auto-test', tasks.startAutoTests);
gulp.task('build', gulp.series('template-cache', 'styles', 'inject-css', 'inject-js', 'inject-lib', 'inject-template', 'optimize'));

