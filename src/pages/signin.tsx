import {useState} from 'react'
import {signIn, getCsrfToken} from 'next-auth/react'
import {Formik, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import {useRouter} from 'next/router'
import Layout from '../components/Layout'
import {Button, Col, Row} from 'react-bootstrap'

export default function SignIn({csrfToken}) {
    const router = useRouter()
    const [error, setError] = useState(null)

    return (
        <Layout isLoading={false}
                pageTitle={'Signin'}>
            <Row>
                <Col sm="12">
                    <h1>Sign in</h1>
                </Col>
            </Row>
            <Formik
                initialValues={{email: '', password: '', tenantKey: ''}}
                validationSchema={Yup.object({
                    email: Yup.string()
                        .max(30, 'Must be 30 characters or less')
                        .email('Invalid email address')
                        .required('Please enter your email'),
                    password: Yup.string().required('Please enter your password'),
                    tenantKey: Yup.string()
                        .max(20, 'Must be 20 characters or less')
                        .required('Please enter your organization name'),
                })}
                onSubmit={async (values, {setSubmitting}) => {
                    const res = await signIn('credentials', {
                        redirect: false,
                        email: values.email,
                        password: values.password,
                        tenantKey: values.tenantKey,
                        callbackUrl: `${window.location.origin}`,
                    })
                    // @ts-ignore
                    if (res?.error) {
                        // @ts-ignore
                        setError(res.error)
                    } else {
                        setError(null)
                    }
                    // @ts-ignore
                    if (res.url) router.push(res.url)
                    setSubmitting(false)
                }}
            >
                {(formik) => (
                    <form onSubmit={formik.handleSubmit}>
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
                            <Col sm="12">
                                <fieldset className="form-group">
                                    <legend className="mt-1">Email</legend>
                                    <Field
                                        name="email"
                                        aria-label="enter your email"
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
                            <Col sm="12">
                                <fieldset className="form-group">
                                    <legend className="mt-1">Password</legend>
                                    <Field
                                        name="password"
                                        aria-label="enter your password"
                                        aria-required="true"
                                        type="password"
                                        className="w-full bg-gray-300 text-gray-900 mt-2 p-1"
                                    />
                                </fieldset>
                                <div className="text-red-600 text-sm">
                                    <ErrorMessage name="password"/>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="12">
                                <fieldset className="form-group">
                                    <legend className="mt-1">Tenant</legend>
                                    <Field
                                        name="tenantKey"
                                        aria-label="enter your Tenant"
                                        aria-required="true"
                                        type="text"
                                        className="w-full bg-gray-300 text-gray-900 mt-2 p-1"
                                    />
                                </fieldset>
                                <div className="text-red-600 text-sm">
                                    <ErrorMessage name="tenantKey"/>
                                </div>
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col sm="12">
                                <Button variant="primary"
                                        type="submit">
                                    {formik.isSubmitting ? 'Please wait...' : 'Sign In'}
                                </Button>
                            </Col>
                        </Row>
                    </form>
                )}
            </Formik>
        </Layout>
    )
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
    return {
        props: {
            csrfToken: await getCsrfToken(context),
        },
    }
}