import Layout from '../../components/Layout'

export default function ApiExamplePage() {
    return (
        <Layout pageTitle="API Example">
            <h1>API Example</h1>
            <p>The examples below show responses from the example API endpoints.</p>
            <p>
                <em>You must be signed in to see responses.</em>
            </p>
            <h2>Session</h2>
            <p>/api/examples/session</p>
            <iframe src="/api/examples/session" />
        </Layout>
    )
}