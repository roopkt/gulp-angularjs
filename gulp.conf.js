module.exports = function createConfig() {
    var client = './src/client/';
    var clientApp = client + 'app/';
    var report = './report';
    var tmp = './.tmp/';


    var config = {
        tmp: tmp,
        build: './build/',
        client: client,
        css: tmp + '/styles.css',
        htmltemplates: clientApp + '**/*.html',
        index: client + 'index.html',
        js: [
            clientApp + '**/*.module.js',
            clientApp + '**/*.js',
        ],
        less: client + 'styles/styles.less',
        libs: [
            './src/lib/angular/angular.js',
            './src/lib/angular/angular-resource.js',
            './src/lib/angular/angular-sanitize.js'
        ],
        devDeps: [
            './src/lib/jasmine/jasmine.js',
            './src/lib/jasmine/jasmine-html.js',
            './src/lib/sinon/sinon-1.7.3.js',
            './src/lib/jquery/jquery-1.8.2.js',
            './src/lib/angular/angular-mocks.js',
        ],
        report: report,
        templateCache: {
            file: 'template.js',
            options: {
                module: 'app',
                standAlone: false,
                root: 'app/'

            }
        },
        /**
         * Karma and testing Settings
         */
        serverIntegrationSpecs: [client + 'tests/server-integration/**/*.spec.js'],
        specHelpers: [client + 'test-helpers/*.js']

    };

    config.karma = getKarmaOptions();

    return config;


    function getKarmaOptions() {
        var options = {
            files: [].concat(
                config.libs,
                config.devDeps,
                config.specHelpers,
                clientApp + '**/*.module.js',
                clientApp + '**/*.js',
                tmp + config.templateCache.file,
                config.serverIntegrationSpecs
            ),
            exclude: [],
            coverage: {
                dir: report + 'coverage',
                reporters: [
                    { type: 'html', subdir: 'report-html' },
                    { type: 'lcov', subdir: 'report-lcov' },
                    { type: 'text-summary' }
                ]
            },
            preprocessors: {}
        };
        options.preprocessors[clientApp + '**/!(*.spec)+(.js)'] = ['coverage'];

        return options;
    }
}
