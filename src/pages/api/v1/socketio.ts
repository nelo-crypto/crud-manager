import {NextApiRequest, NextApiResponse} from 'next'
import {Server} from 'socket.io'
import {Kraken} from 'node-kraken-api'
import prisma from '../../../lib/prisma'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const option = await prisma.option
        .findUnique({
            where: {
                name: 'Spread',
            }
        })

    if (option === null) {
        res.end()

        return
    }

    const kraken = new Kraken()
    // @ts-ignore
    const io = new Server(res.socket.server)

    let priceSpread: number = 0

    // @ts-ignore
    if (res.socket.server.io) {
        console.debug('Socket is already running')
    } else {
        console.debug('Socket is initializing')

        // @ts-ignore
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
        .subscribe('XBT/USD')

    res.end()
}