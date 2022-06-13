import {Col, Row} from 'react-bootstrap'

interface OptionProps {
    option: Option,
    nameChangeCallback: (event) => void,
    valueChangeCallback: (event) => void,
    disabled: boolean,
}

export default function Option({
                                   option,
                                   nameChangeCallback,
                                   valueChangeCallback,
                                   disabled,
                               }: OptionProps) {
    return (
        <>
            <Row>
                <Col sm="12">
                    <fieldset className="form-group">
                        <legend className="mt-1">Name</legend>
                        <input className="form-control"
                               value={option.name}
                               placeholder="Name"
                               disabled={disabled}
                               onChange={nameChangeCallback}
                               type="text"/>
                    </fieldset>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col sm="12">
                    <fieldset className="form-group">
                        <legend className="mt-1">Value</legend>
                        <input className="form-control"
                               value={option.value}
                               placeholder="Value"
                               onChange={valueChangeCallback}
                               disabled={disabled}
                               type="text"/>
                    </fieldset>
                </Col>
            </Row>
        </>
    )
}
