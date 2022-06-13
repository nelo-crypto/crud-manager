import handler from './healthcheck'
import {createMocks, RequestMethod} from 'node-mocks-http'
import type {NextApiRequest, NextApiResponse} from 'next'

describe('Healthcheck', () => {
    function mockRequestResponse(method: RequestMethod = 'GET') {
        const {
            req,
            res,
        }: { req: NextApiRequest; res: NextApiResponse } = createMocks({method})

        req.headers = {
            'Content-Type': 'application/json',
            //'X-SESSION-TOKEN': authToken,
        }
        //req.query = {gatewayID: `${gatewayID}`}

        return {req, res}
    }

    test('that the application is live with a status of 200', () => {
        const { req, res } = mockRequestResponse();
        const resMock = {status: jest.fn()} // Mocks `res`
        const resStatusMock = {json: jest.fn()} // Mock `res.status`

        resMock.status.mockReturnValue(resStatusMock) // Makes `res.status` return `resStatusMock`

        handler(req, resMock)

        expect(resMock.status).toHaveBeenCalledWith(200)
        expect(resStatusMock.json).toHaveBeenCalledWith({
            message: 'Hello from Next.js!'
        })
    })
})