import {BiSave} from 'react-icons/bi'
import {Button, Col, Row} from 'react-bootstrap'
import Layout from '../../../components/Layout'
import CrudBackButton from '../../../components/CrudBackButton'
import UserForm from '../../../components/forms/User'
import {useState} from 'react'
import ROUTE from '../../../enums/Route'

export default function Create() {
    const [user, setUser] = useState<User>({
        id: 0,
        email: '',
        name: '',
        image: '',
        role: '',
    })

    const handleNameChange = (event) => {
        event.preventDefault()

        const newUser: User = {...user}

        newUser.name = event.target.value

        setUser(newUser)
    }

    const handleEmailChange = (event) => {
        event.preventDefault()

        const newUser: User = {...user}

        newUser.email = event.target.value

        setUser(newUser)
    }

    const handleImageChange = (event) => {
        event.preventDefault()

        const newUser: User = {...user}

        newUser.image = event.target.value

        setUser(newUser)
    }

    const handleRoleChange = (event) => {
        event.preventDefault()

        const newUser: User = {...user}

        newUser.role = event.target.value

        setUser(newUser)
    }

    const handleSaveClick = () => {
        fetch(
            ROUTE.API.USERS.CREATE,
            {
                method: 'POST',
                body: JSON.stringify(user)
            }
        )
            .then((res) => res.json())
            .then((response) => {
                console.log('users', response)
            })
    }

    return (
        <Layout isLoading={false}>
            <Row>
                <Col sm="12">
                    <h1>Create user</h1>
                </Col>
            </Row>
            <UserForm
                user={user}
                userNameChangeCallback={handleNameChange}
                userEmailChangeCallback={handleEmailChange}
                userImageChangeCallback={handleImageChange}
                userRoleChangeCallback={handleRoleChange}
            />
            <Row className="mb-2">
                <Col sm="6"
                     className="text-start">
                    <CrudBackButton/>
                </Col>
                <Col sm="6"
                     className="text-end">
                    <Button onClick={handleSaveClick}
                            variant="primary">
                        <BiSave/> Save
                    </Button>
                </Col>
            </Row>
        </Layout>
    )
}