import {Col, Row} from 'react-bootstrap'
import * as Yup from 'yup'
import {ErrorMessage, Field, Formik} from 'formik'
import {useState} from 'react'
import ROUTE from '../../enums/Route'
import {useRouter} from 'next/router'

interface UserProps {
    user?: User,
    disabled: boolean,
    csrfToken?: string,
}

export default function User({
                                 user,
                                 disabled,
                                 csrfToken,
                             }: UserProps) {
    const router = useRouter()
    const [error, setError] = useState(null)

    return (
        <>
            <Row className="mb-5">
                <Col sm="12">
                    <Formik
                        initialValues={{name: user?.name, email: user?.email, image: user?.image, role: user?.role}}
                        validationSchema={Yup.object({
                            name: Yup.string()
                                .max(20, 'Must be 20 characters or less')
                                .required('Enter user name'),
                            email: Yup.string()
                                .max(30, 'Must be 30 characters or less')
                                .email('Invalid email address')
                                .required('Enter user email'),
                            image: Yup.string()
                                .max(30, 'Image URL Must be 5 characters or less')
                                .required('Enter user image'),
                            role: Yup.string()
                                .required('Enter user role'),
                        })}
                        onSubmit={async (values, {setSubmitting}) => {
                            const replaceValue = user ? user.id : 'create'
                            const method = user ? 'PUT' : 'POST'

                            const rawResponse = await fetch(
                                ROUTE.API.USERS.replace('%d', replaceValue),
                                {
                                    method: method,
                                    body: JSON.stringify({
                                        name: values.name,
                                        email: values.email,
                                        image: values.image,
                                        role: values.role,
                                    })
                                }
                            )

                            const response = await rawResponse.json()

                            if (method === 'POST') {
                                router.push(ROUTE.USERS.UPDATE.replace('%d', response.data.id))
                            }

                            setSubmitting(false)
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
                                                   aria-label="Enter user name"
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
                                            <legend className="mt-1">Email</legend>
                                            <Field disabled={disabled}
                                                   name="email"
                                                   aria-label="Enter user email"
                                                   aria-required="true"
                                                   type="text"
                                                   className="w-full bg-gray-300 text-gray-900 mt-2 p-1"
                                            />
                                        </fieldset>
                                        <div className="text-red-600 text-sm">
                                            <ErrorMessage name="email"/>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="6">
                                        <fieldset className="form-group">
                                            <legend className="mt-1">Image</legend>
                                            <Field disabled={disabled}
                                                   name="image"
                                                   aria-label="Enter user image url"
                                                   aria-required="true"
                                                   type="text"
                                                   className="w-full bg-gray-300 text-gray-900 mt-2 p-1"
                                            />
                                        </fieldset>
                                        <div className="text-red-600 text-sm">
                                            <ErrorMessage name="image"/>
                                        </div>
                                    </Col>
                                    <Col sm="6">
                                        <fieldset className="form-group">
                                            <legend className="mt-1">Role</legend>
                                            <Field disabled={disabled}
                                                   as="select"
                                                   name="role"
                                                   className="w-full bg-gray-300 text-gray-900 mt-2 p-1">
                                                <option value="">...</option>
                                                <option value="USER">USER</option>
                                                <option value="ADMIN">ADMIN</option>
                                            </Field>
                                        </fieldset>
                                        <div className="text-red-600 text-sm">
                                            <ErrorMessage name="role"/>
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
