import {NextApiRequest, NextApiResponse} from 'next'
import {Server} from 'socket.io'
import {Kraken} from 'node-kraken-api'
import prisma from '../../../lib/prisma'
import ERROR from '../../../enums/Error'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    prisma.option
        .findUnique({
            where: {
                name: 'Spread',
            }
        })
        .then(async (option: Option) => {
            const kraken = new Kraken()
            const io = new Server(res.socket.server)

            let priceSpread: number = 0

            if (res.socket.server.io) {
                console.debug('Socket is already running')
            } else {
                console.debug('Socket is initializing')

                res.socket.server.io = io

                io.on('connect', socket => {
                    console.debug('Socket connected!')
                })
            }

            setInterval(() => {
                if (!io) return

                io.sockets.emit('price-change', priceSpread)
            }, 10000)

            const book100 = await kraken.ws.book({depth: 10})
                // live book construction from "snapshot", "ask", and "bid" events.
                .on('mirror', (mirror, pair) => {
                    const betterAsk: number = parseFloat(mirror.as[0][0])
                    const betterBid: number = parseFloat(mirror.bs[0][0])
                    const price: number = (betterAsk + betterBid) / 2

                    priceSpread = (1 + option.value / 100) * price
                })
                .subscribe('XBT/USD') // subscribe to multiple pairs at once

            res.end()
        })
        .catch((e) => {
            console.error(ERROR.E0004.code, ERROR.E0004.reason, e)

            res.status(500).json({
                error_code: ERROR.E0004.code,
                message: 'Please contact support',
            })
        })
}