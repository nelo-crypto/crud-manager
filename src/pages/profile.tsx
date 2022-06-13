import {useSession} from 'next-auth/react'
import {Col, Row} from 'react-bootstrap'
import Layout from '../components/Layout'

export default function Profile() {
    const {data} = useSession()

    return (
        <Layout pageTitle="Session">
            <Row>
                <Col sm="12">
                    <h1>Profile</h1>
                </Col>
            </Row>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </Layout>
    )
}