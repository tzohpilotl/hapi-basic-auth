const init = require('./server');

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

console.log('Server running on %s', server.info.uri);

const server = init();