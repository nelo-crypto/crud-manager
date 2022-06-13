import type {NextApiRequest, NextApiResponse} from 'next'
import ERROR from '../../../../enums/Error'
import prisma from '../../../../lib/prisma'

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ApiUserRead | ApiUserCreate | ApiUserRead | ApiUserUpdate | ApiUserDelete | ApiError>
) {
    const id:number = parseInt(req.query.id)

    switch (req.method) {
        case 'GET':
            prisma.option
                .findUnique({
                    where: {
                        id: id,
                    }
                })
                .then((option: Option) => {
                    const apiUsers: ApiUserRead = {
                        data: option,
                    }

                    res.status(200).json(apiUsers)
                })
                .catch((e) => {
                    console.error(ERROR.E0004.code, ERROR.E0004.reason, e)

                    res.status(500).json({
                        error_code: ERROR.E0004.code,
                        message: 'Please contact support',
                    })
                })

            break
        case 'PUT':
            const data: any = JSON.parse(req.body)

            prisma.option
                .update({
                    where: {
                        id: id,
                    },
                    data: data,
                })
                .then((option: Option) => {
                    const apiResponse: ApiEntityUpdateResponse = {
                        data: option
                    }

                    res.status(200).json(apiResponse)
                })
                .catch((e) => {
                    console.error(ERROR.E0001.code, ERROR.E0001.reason, e)

                    res.status(500).json({
                        error_code: ERROR.E0001.code,
                        message: 'Please contact support',
                    })
                })
            break
        case 'DELETE':
            prisma.user
                .delete({
                    where: {
                        id: id,
                    },
                })
                .then((result) => {
                    console.debug('Delete result', result)

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
