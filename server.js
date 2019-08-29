'use strict'

const Boom = require('@hapi/boom');
const Hapi = require('@hapi/hapi');
const Basic = require('@hapi/basic');

const validate = (request, username, password) => {
    const unauthorized = Boom.unauthorized();

    if (!username) {
        return {
            response: unauthorized
        };
    }

    return {
        isValid: true,
        credentials: {
            username
        }
    }
};

const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    await server.register(Basic);
    server.auth.strategy('basic', 'basic', {validate});

    server.route({
        method: 'GET',
        path:'/',
        options: {
            auth: 'basic'
        },
        handler: (request, h) => {
            return 'Hello World!';
        }
    });

    await server.start();
    return server;
}

module.exports = init;