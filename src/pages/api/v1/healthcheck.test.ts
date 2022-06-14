import handler from './healthcheck'
import {createMocks} from 'node-mocks-http'

describe('/api/healthcheck', () => {
    test('should return 200 and a string', async () => {
        const { req, res } = createMocks({
            method: 'GET'
        });

        await handler(req, res);
        expect(res._getStatusCode()).toBe(
            200
        );
        expect(
            JSON.parse(res._getData())
        ).toHaveProperty('message');
    });
});