function createConfig() {
    var client = './src/client/';
    var clientApp = client + 'app/';
    var tmp = './.tmp/';


    var config = {
        tmp: tmp,
        build: './build/',
        allJs: [
            './src/**/*.js'
        ],
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
            './src/lib/angular/angular.js'
        ],
        templateCache: {
            file: 'template.js',
            options: {
                module: 'app',
                standAlone: false,
                root: 'app/'

            }
        }
    };

    return config;
}

module.exports = createConfig();