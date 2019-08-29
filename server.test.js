const init = require('./server');

describe('The server', () => {
    let server;

    beforeAll(async () => {
        server = await init();
    });

    afterAll(() => {
        server.stop();
    });

    describe('when a request without authentication is issued', () => {
        let response;

        beforeAll(async () => {
            response = await server.inject({
                url: '/',
                method: 'GET'
            });
        });

        it('throws a 401 status code', () => {
            expect(response.statusCode).toEqual(401);
        });
    });

    describe('when an authenticated request is issued', () => {
        let response;
        const basicAuthHeader = 'Basic ' + new Buffer('user:pass').toString('base64');

        beforeAll(async () => {
            response = await server.inject({
                url: '/',
                method: 'GET',
                headers: {
                    authorization: basicAuthHeader
                }
            });
        });

        it('throws a 200 status code', () => {
            expect(response.statusCode).toEqual(200);
        });
    });
});