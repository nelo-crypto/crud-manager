import type {NextApiRequest, NextApiResponse} from 'next'
import {PAGINATION} from '../../../../enums/Pagination'
import prisma from '../../../../lib/prisma'
import ERROR from '../../../../enums/Error'
import {getSession} from 'next-auth/react'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<CrudPaginationResponse | ApiCrudErrorResponse>
) {
    const session = await getSession({req})

    if (!session) {
        res.status(401)
        res.end()

        return
    }

    console.log('Request', req.method, req.query)

    const {params} = req.query

    const entity:string = params[0]
    const page:number = parseInt(params[1])

    Promise.all([
        // @ts-ignore
        prisma[entity].findMany({
            skip: (page - 1) * PAGINATION.DEFAULT_NUMBER_OF_ITEMS_PER_PAGE,
            take: PAGINATION.DEFAULT_NUMBER_OF_ITEMS_PER_PAGE,
            orderBy: {
                name: 'asc',
            },
        }),
        // @ts-ignore
        prisma[entity].count(),
    ])
        .then((values) => {
            const data = values[0]
            const total = values[1]

            const apiUserListResponse: CrudPaginationResponse = {
                data: data,
                pagination: {
                    total: total,
                }
            }

            res.status(200).json(apiUserListResponse)
        })
        .catch((e) => {
            console.error(ERROR.E0001.code, ERROR.E0001.reason, e)

            res.status(500).json({
                error_code: ERROR.E0001.code,
                message: 'Please contact support',
            })
        })
}
