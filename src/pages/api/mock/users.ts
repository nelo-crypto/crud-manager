import type {NextApiRequest, NextApiResponse} from 'next'
import ERROR from '../../../enums/Error'
import prisma from '../../../lib/prisma'
import {PAGINATION} from '../../../enums/Pagination'

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ApiUserRead | ApiUserCreate | ApiUserRead | ApiUserUpdate | ApiUserDelete | ApiError>
) {
    console.debug('req.method', req.method)

    switch (req.method) {
        case 'POST':
            const userData: any = JSON.parse(req.body)

            prisma.user
                .create({
                    data: {
                        name: userData.name,
                        email: userData.email,
                        image: userData.image,
                        role: userData.role,
                    },
                })
                .then((users: User[]) => {
                    const apiUsers: ApiUserRead = {
                        data: users,
                        pagination: {
                            total: 0,
                            pageCount: 0,
                            currentPage: 0,
                            perPage: 0,
                            from: 0,
                            to: 0,
                        }
                    }

                    res.status(200).json(apiUsers)
                })
                .catch((e) => {
                    console.error(ERROR.E0001.code, ERROR.E0001.reason, e)

                    res.status(500).json({
                        error_code: ERROR.E0001.code,
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
