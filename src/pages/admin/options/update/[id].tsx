import {useEffect, useState} from 'react'
import {BiSave} from 'react-icons/bi'
import {Button, Col, Row} from 'react-bootstrap'
import {useRouter} from 'next/router'
import Layout from '../../../../components/Layout'
import {default as OptionForm} from '../../../../components/forms/Option'
import CrudBackButton from '../../../../components/CrudBackButton'
import {sprintf} from 'sprintf-js'
import ROUTE from '../../../../enums/Route'

export default function Update() {
    const router = useRouter()
    const [option, setOption] = useState<Option | undefined>(undefined)
    const [isLoading, setLoading] = useState<boolean>(false)
    const [alerts, setAlerts] = useState<CrudAlert[]>([])
    const id: number = parseInt(router.query.id)

    const handleNameChange = (event) => {
        event.preventDefault()

        const newOption: Option = {...option}

        newOption.name = event.target.value

        setOption(newOption)
    }

    const handleValueChange = (event) => {
        event.preventDefault()

        const newOption: Option = {...option}

        newOption.value = parseFloat(event.target.value)

        setOption(newOption)
    }

    const handleSaveClick = (event) => {
        event.preventDefault()

        setLoading(true)
        fetch(
            sprintf(ROUTE.API.OPTIONS, option.id),
            {
                method: 'PUT',
                body: JSON.stringify(option)
            }
        )
            .then((res) => res.json())
            .then((response) => {
                const newAlerts: CrudAlert[] = [...alerts]

                newAlerts.push({
                    variant: 'success',
                    message: 'Entity saved successfully',
                    visible: true,
                })

                setAlerts(newAlerts)
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
        if (!router.isReady) return

        setLoading(true)
        fetch(sprintf(ROUTE.API.OPTIONS, id))
            .then((res) => res.json())
            .then((response) => {
                setOption(response.data)
                setLoading(false)
            })
    }, [router])

    return (
        <Layout isLoading={isLoading}
                alerts={alerts}>
            <Row>
                <Col sm="12">
                    <h1>Option</h1>
                </Col>
            </Row>
            {option !== undefined ? <OptionForm option={option}
                                                nameChangeCallback={handleNameChange}
                                                valueChangeCallback={handleValueChange}
                                                disabled={false}/> : null}
            <Row>
                <Col sm="6"
                     className="text-start">
                    <CrudBackButton/>
                </Col>
                <Col sm="6"
                     className="text-end">
                    <Button disabled={option === undefined}
                            onClick={handleSaveClick}>
                        <BiSave/> Save
                    </Button>
                </Col>
            </Row>
        </Layout>
    )
}