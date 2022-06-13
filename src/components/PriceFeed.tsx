import {Nav, NavDropdown} from 'react-bootstrap'
import {io} from 'socket.io-client'
import {useEffect, useState} from 'react'

export default function PriceFeed() {
    const [price, setPrice] = useState<string>('----')

    useEffect(() => {
        fetch('/api/v1/socketio')
            .finally(() => {
                const socket = io()

                socket.on('connect', () => {
                    console.log('SocketIO Connect!')
                })

                socket.on('price-change', data => {
                    const newPrice = Number(data).toFixed(2)

                    setPrice(newPrice)
                })

                socket.on('disconnect', () => {
                    console.log('SocketIO Disconnect!')
                })
            })
    }, [])

    return (
        <Nav variant="pills">
            <NavDropdown.Item>{price} BTC/USD</NavDropdown.Item>
        </Nav>
    )
}