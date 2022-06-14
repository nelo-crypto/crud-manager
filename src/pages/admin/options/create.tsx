import {BiSave} from 'react-icons/bi'
import {Button, Col, Row} from 'react-bootstrap'
import Layout from '../../../components/Layout'
import CrudBackButton from '../../../components/CrudBackButton'
import OptionForm from '../../../components/forms/Option'
import {useState} from 'react'
import ROUTE from '../../../enums/Route'

export default function Create() {
    const [option, setOption] = useState<Option>({
        id: 0,
        name: '',
        value: 0,
        createdAt: '',
    })

    const handleNameChange = (event) => {
        event.preventDefault()

        const newOption: Option = {...option}

        newOption.name = event.target.value

        setOption(newOption)
    }

    const handleValueChange = (event) => {
        event.preventDefault()

        const newOption: Option = {...option}

        newOption.value = event.target.value

        setOption(newOption)
    }

    const handleSaveClick = () => {
        fetch(
            ROUTE.API.OPTIONS,
            {
                method: 'POST',
                body: JSON.stringify(option)
            }
        )
            .then((res) => res.json())
            .then((response) => {
                console.log('response', response)
            })
    }

    return (
        <Layout isLoading={false}>
            <Row>
                <Col sm="12">
                    <h1>Create option</h1>
                </Col>
            </Row>
            <OptionForm
                option={option}
                nameChangeCallback={handleNameChange}
                valueChangeCallback={handleValueChange}
                disabled={false}
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