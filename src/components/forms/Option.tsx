import {Col, Row} from 'react-bootstrap'
import * as Yup from 'yup'
import {ErrorMessage, Field, Formik} from 'formik'
import {useState} from 'react'
import ROUTE from '../../enums/Route'
import {useRouter} from 'next/router'

interface OptionProps {
    option?: Option,
    disabled: boolean,
    csrfToken?: string,
}

export default function Option({
                                 option,
                                 disabled,
                                 csrfToken,
                             }: OptionProps) {
    const router = useRouter()
    const [error, setError] = useState(null)

    return (
        <>
            <Row className="mb-5">
                <Col sm="12">
                    <Formik
                        initialValues={{name: option?.name, value: option?.value}}
                        validationSchema={Yup.object({
                            name: Yup.string()
                                .max(20, 'Must be 20 characters or less')
                                .required('Enter option name'),
                            value: Yup.number()
                                .required('Enter option value'),
                        })}
                        onSubmit={async (values, {setSubmitting}) => {
                            const replaceValue = option ? option.id : 'create'
                            const method = user ? 'PUT' : 'POST'

                            const restResponse = await fetch(
                                ROUTE.API.OPTIONS.replace('%d', replaceValue),
                                {
                                    method: method,
                                    body: JSON.stringify({
                                        name: values.name,
                                        value: values.value,
                                    })
                                }
                            )

                            console.log('restResponse', restResponse)

                            // @ts-ignore
                            if (fetchResult?.error) {
                                // @ts-ignore
                                setError(fetchResult.error)
                            } else {
                                setError(null)
                            }

                            setSubmitting(false)

                            router.push( ROUTE.USERS.READ.replace('%d', replaceValue))
                        }}
                    >
                        {(formik) => (
                            <form onSubmit={formik.handleSubmit}
                                  id="currentform">
                                <input
                                    name="csrfToken"
                                    type="hidden"
                                    defaultValue={csrfToken}
                                />
                                <Row>
                                    <Col sm="12">
                                        {error}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="6">
                                        <fieldset className="form-group">
                                            <legend className="mt-1">Name</legend>
                                            <Field disabled={disabled}
                                                   name="name"
                                                   aria-label="Enter option name"
                                                   aria-required="true"
                                                   type="text"
                                                   className="w-full bg-gray-300 text-gray-900 mt-2 p-1"
                                            />
                                        </fieldset>
                                        <div className="text-red-600 text-sm">
                                            <ErrorMessage name="name"/>
                                        </div>
                                    </Col>
                                    <Col sm="6">
                                        <fieldset className="form-group">
                                            <legend className="mt-1">Value</legend>
                                            <Field disabled={disabled}
                                                   name="email"
                                                   aria-label="Enter option value"
                                                   aria-required="true"
                                                   type="text"
                                                   className="w-full bg-gray-300 text-gray-900 mt-2 p-1"
                                            />
                                        </fieldset>
                                        <div className="text-red-600 text-sm">
                                            <ErrorMessage name="value"/>
                                        </div>
                                    </Col>
                                </Row>
                            </form>
                        )}
                    </Formik>
                </Col>
            </Row>
        </>
    )
}
