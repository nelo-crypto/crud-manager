import {useEffect, useState} from 'react'
import {BiSave} from 'react-icons/bi'
import {Button, Col, Row} from 'react-bootstrap'
import {useRouter} from 'next/router'
import Layout from '../../../../components/Layout'
import {default as UserForm} from '../../../../components/forms/User'
import CrudBackButton from '../../../../components/CrudBackButton'
import {sprintf} from 'sprintf-js'
import ROUTE from '../../../../enums/Route'
import {getCsrfToken} from 'next-auth/react'

export default function Update({csrfToken}) {
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

    const handleSaveClick = (event) => {
        event.preventDefault()

        if (id === 0) return
        if (user === null) return

        setLoading(true)
        fetch(
            sprintf(ROUTE.API.USERS, user.id),
            {
                method: 'PUT',
                body: JSON.stringify(user)
            }
        )
            .then((res) => res.json())
            .then((response) => {
                console.log('users', response)

                setLoading(false)
            })
            .catch((response: ApiCrudErrorResponse) => {
                const newAlerts: CrudAlert[] = [...alerts]

                newAlerts.push({
                    variant: 'danger',
                    message: response.error_code + ': ' + response.message,
                    visible: true,
                })

                setAlerts(newAlerts)
                setLoading(false)
            })
    }

    useEffect(() => {
        if (id === 0) return

        setLoading(true)
        fetch(sprintf(ROUTE.API.USERS, id))
            .then((res) => res.json())
            .then((response) => {
                setUser(response.data)
                setLoading(false)
            })
    }, [id])

    return (
        <Layout isLoading={isLoading}
                pageTitle={'Edit ' + user?.name}>
            <Row>
                <Col sm="12">
                    <h1>User</h1>
                </Col>
            </Row>
            {user !== null ? <UserForm user={user}
                                       disabled={false}
                                       csrfToken={csrfToken}
            /> : null}
            <Row>
                <Col sm="6"
                     className="text-start">
                    <CrudBackButton/>
                </Col>
                <Col sm="6"
                     className="text-end">
                    <Button disabled={user === null}
                            form="currentform"
                            variant="primary"
                            type="submit">
                        <BiSave/> Save
                    </Button>
                </Col>
            </Row>
        </Layout>
    )
}

export async function getServerSideProps(context) {
    return {
        props: {
            csrfToken: await getCsrfToken(context),
        },
    }
}