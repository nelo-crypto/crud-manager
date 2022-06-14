import {useEffect, useState} from 'react'
import {BiArrowBack, BiEdit} from 'react-icons/bi'
import {Button, Col, Row} from 'react-bootstrap'
import {useRouter} from 'next/router'
import Layout from '../../../../components/Layout'
import CrudBackButton from '../../../../components/CrudBackButton'
import ROUTE from '../../../../enums/Route'
import {sprintf} from 'sprintf-js'

export default function Read() {
    const router = useRouter()
    const [option, setOption] = useState<Option | null>(null)
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
        fetch(sprintf(ROUTE.API.OPTIONS, id))
            .then((res) => res.json())
            .then((response) => {
                console.log('response', response)

                setOption(response.data)
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
    }, [id])

    return (
        <Layout isLoading={isLoading}
                alerts={alerts}
                pageTitle={option?.name}>
            <Row>
                <Col sm="12">
                    <h1>Option</h1>
                </Col>
            </Row>
            <Row>
                <Col sm="12">
                    <table className="table table-hover links">
                        <thead>
                        <tr>
                            <th scope="col">Field</th>
                            <th scope="col">Value</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>#ID</td>
                            <td>{option ? option.id : ''}</td>
                        </tr>
                        <tr>
                            <td>Name</td>
                            <td>{option ? option.name : ''}</td>
                        </tr>
                        <tr>
                            <td>Value</td>
                            <td>{option ? option.value : ''}</td>
                        </tr>
                        </tbody>
                    </table>
                </Col>
            </Row>
            <Row>
                <Col sm="6"
                     className="text-start">
                    <CrudBackButton/>
                </Col>
                <Col sm="6"
                     className="text-end">
                    <Button disabled={option === null}
                            onClick={(e) => {
                                e.preventDefault()

                                if (option === null) return

                                router.push(sprintf(ROUTE.OPTIONS.UPDATE, option.id))
                            }}>
                        <BiEdit/> Edit
                    </Button>
                </Col>
            </Row>
        </Layout>
    )
}