import {useEffect, useState} from 'react'
import {BiEdit} from 'react-icons/bi'
import {Button, Col, Row} from 'react-bootstrap'
import {useRouter} from 'next/router'
import Layout from '../../../../components/Layout'
import CrudBackButton from '../../../../components/CrudBackButton'
import ROUTE from '../../../../enums/Route'
import {sprintf} from 'sprintf-js'
import UserForm from '../../../../components/forms/User'

export default function Read() {
    const router = useRouter()
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setLoading] = useState<boolean>(false)
    const [alerts, setAlerts] = useState<CrudAlert[]>([])
    const [id, setId] = useState<number>(0)

    useEffect(() => {
        if (!router.isReady) return
        if (router.query.id === undefined) return

        const idParam: string = (typeof router.query.id == 'string') ? router.query.id : router.query.id[0]

        setId(parseInt(idParam))
    }, [router])

    useEffect(() => {
        if (id === 0) return

        setLoading(true)
        fetch(sprintf(ROUTE.API.USERS, id))
            .then((res) => res.json())
            .then((response) => {
                console.log('response', response)

                setUser(response.data)
                setLoading(false)
            })
    }, [id])

    return (
        <Layout isLoading={isLoading}
                alerts={alerts}
                pageTitle={user?.name}>
            <Row>
                <Col sm="12">
                    <h1>User</h1>
                </Col>
            </Row>
            {user !== null ? <UserForm user={user}
                                       disabled={true}/> : null}
            <Row>
                <Col sm="6"
                     className="text-start">
                    <CrudBackButton/>
                </Col>
                <Col sm="6"
                     className="text-end">
                    <Button disabled={user === null}
                            onClick={(e) => {
                                e.preventDefault()

                                if (user === null) return

                                router.push(sprintf(ROUTE.USERS.UPDATE, user.id))
                            }}>
                        <BiEdit/> Edit
                    </Button>
                </Col>
            </Row>
        </Layout>
    )
}