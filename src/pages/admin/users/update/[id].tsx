import {useEffect, useState} from 'react'
import {BiSave} from 'react-icons/bi'
import {Button, Col, Row} from 'react-bootstrap'
import {useRouter} from 'next/router'
import Layout from '../../../../components/Layout'
import {default as UserForm} from '../../../../components/forms/User'
import CrudBackButton from '../../../../components/CrudBackButton'
import {sprintf} from 'sprintf-js'
import ROUTE from '../../../../enums/Route'

export default function Update() {
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

    const handleNameChange = (event) => {
        event.preventDefault()

        if (user === null) return

        const newUser: User = {...user}

        newUser.name = event.target.value

        setUser(newUser)
    }

    const handleEmailChange = (event) => {
        event.preventDefault()

        if (user === null) return

        const newUser: User = {...user}

        newUser.email = event.target.value

        setUser(newUser)
    }

    const handleImageChange = (event) => {
        event.preventDefault()

        if (user === null) return

        const newUser: User = {...user}

        newUser.image = event.target.value

        setUser(newUser)
    }

    const handleRoleChange = (event) => {
        event.preventDefault()

        if (user === null) return

        const newUser: User = {...user}

        newUser.role = event.target.value

        setUser(newUser)
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
        <Layout isLoading={isLoading}>
            <Row>
                <Col sm="12">
                    <h1>User</h1>
                </Col>
            </Row>
            {user !== null ? <UserForm user={user}
                                       userNameChangeCallback={handleNameChange}
                                       userEmailChangeCallback={handleEmailChange}
                                       userImageChangeCallback={handleImageChange}
                                       userRoleChangeCallback={handleRoleChange}
                                       disabled={false}/> : null}
            <Row>
                <Col sm="6"
                     className="text-start">
                    <CrudBackButton/>
                </Col>
                <Col sm="6"
                     className="text-end">
                    <Button disabled={user === null}
                            onClick={handleSaveClick}>
                        <BiSave/> Save
                    </Button>
                </Col>
            </Row>
        </Layout>
    )
}