import type {NextApiRequest, NextApiResponse} from 'next'
import ERROR from '../../../../enums/Error'
import prisma from '../../../../lib/prisma'
import {getSession} from 'next-auth/react'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ApiEntityResponse | ApiCrudErrorResponse>
) {
    const session = await getSession({req})

    if (!session) {
        res.status(401)
        res.end()

        return
    }

    console.debug('Request', req.query, req.body)

    if (req.query.params === undefined) {
        res.status(400).json({
            error_code: ERROR.E0007.code,
            message: 'Please contact support',
        })

        return
    }

    if (req.query.params.length !== 2) {
        res.status(400).json({
            error_code: ERROR.E0008.code,
            message: 'Please contact support',
        })

        return
    }

    const entityName: string = req.query.params[0]
    const id: string = req.query.params[1]
    const requestData: any = req.body ? JSON.parse(req.body) : {}
    const apiEntityResponseGenerator = (data: any) => {
        const apiEntityResponse: ApiEntityResponse = {
            data: data
        }

        if (data === null) {
            res.status(404).json({
                data: null
            })

            return
        }

        res.status(200).json(apiEntityResponse)
    }

    if (req.method !== 'POST' && isNaN(Number(id))) {
        res.status(400).json({
            error_code: ERROR.E0005.code,
            message: 'Please contact support',
        })

        return
    }

    // @ts-ignore
    if (prisma[entityName] === undefined) {
        res.status(400).json({
            error_code: ERROR.E0009.code,
            message: 'Please contact support',
        })
    }

    const entityId: number = parseInt(id)

    switch (req.method) {
        case 'POST':
            // @ts-ignore
            prisma[entityName]
                .create({
                    data: requestData,
                })
                .then(apiEntityResponseGenerator)
                .catch((e) => {
                    console.error(ERROR.E0001.code, ERROR.E0001.reason, e)

                    res.status(500).json({
                        error_code: ERROR.E0006.code,
                        message: 'Please contact support',
                    })
                })

            break
        case 'GET':
            // @ts-ignore
            prisma[entityName]
                .findUnique({
                    where: {
                        id: entityId,
                    }
                })
                .then(apiEntityResponseGenerator)
                .catch((e) => {
                    console.error(ERROR.E0004.code, ERROR.E0004.reason, e)

                    res.status(500).json({
                        error_code: ERROR.E0004.code,
                        message: 'Please contact support',
                    })
                })

            break
        case 'PATCH':
        case 'PUT':
            // @ts-ignore
            prisma[entityName]
                .update({
                    where: {
                        id: entityId,
                    },
                    data: requestData,
                })
                .then(apiEntityResponseGenerator)
                .catch((e) => {
                    console.error(ERROR.E0001.code, ERROR.E0001.reason, e)

                    res.status(500).json({
                        error_code: ERROR.E0001.code,
                        message: 'Please contact support',
                    })
                })
            break
        case 'DELETE':
            // @ts-ignore
            prisma[entityName]
                .delete({
                    where: {
                        id: entityId,
                    },
                })
                .then(() => {
                    res.status(200).json({data: null})
                })
                .catch((e) => {
                    console.error(ERROR.E0003.code, ERROR.E0003.reason, e)

                    res.status(500).json({
                        error_code: ERROR.E0003.code,
                        message: 'Please contact support',
                    })
                })

            break
        default:
            console.error(ERROR.E0002.code, ERROR.E0002.reason)

            res.status(500).json({
                error_code: ERROR.E0002.code,
                message: 'Please contact support',
            })

            break
    }
}
