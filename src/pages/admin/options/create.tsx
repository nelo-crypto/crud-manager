import {BiSave} from 'react-icons/bi'
import {Button, Col, Row} from 'react-bootstrap'
import Layout from '../../../components/Layout'
import CrudBackButton from '../../../components/CrudBackButton'
import OptionForm from '../../../components/forms/Option'
import {getCsrfToken} from 'next-auth/react'

export default function Create({csrfToken}) {
    return (
        <Layout isLoading={false}
                pageTitle="Create user">
            <Row>
                <Col sm="12">
                    <h1>Create option</h1>
                </Col>
            </Row>
            <OptionForm
                disabled={false}
                csrfToken={csrfToken}
            />
            <Row className="mb-2">
                <Col sm="6"
                     className="text-start">
                    <CrudBackButton/>
                </Col>
                <Col sm="6"
                     className="text-end">
                    <Button form="currentform"
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