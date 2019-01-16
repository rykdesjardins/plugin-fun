const pathlib = require('path');

const endpoints = require( pathlib.join(liliumroot, 'endpoints') );
const { 
    handleGetFun, 
    handleRandomPost, 
    handleReadMyPost, 
    handleSearchWordInTitle 
} = require('./handlers');

function sendApp(cli) {
    cli.sendHTML(require('./frontend'));
}

class FunPlugin {
    unregister(done) { done(); }

    register(_c, info, done) {
        log('FunPlugin', 'Registering a fun plugin', 'info');

        endpoints.register('*', 'dataviewer', 'GET', sendApp);

        endpoints.register('*', 'fun', 'GET', handleGetFun);
        endpoints.register('*', 'randompost', 'GET', handleRandomPost);
        endpoints.register('*', 'readmypost', 'POST', handleReadMyPost);
        endpoints.register('*', 'searchwordintitle', 'GET', handleSearchWordInTitle);

        done();
    }
}

module.exports = new FunPlugin();
