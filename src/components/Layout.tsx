import Header from './Header'
import Footer from './Footer'
import {Alert, Col, Container, Row, Spinner} from 'react-bootstrap'

type LayoutProps = {
    children: React.ReactNode,
    isLoading?: boolean,
    alerts?: CrudAlert[],
    pageTitle?:string,
}

export default function Layout({children, isLoading, alerts, pageTitle}: LayoutProps) {
    const isItLoadingSomething = () => {
        if (isLoading === undefined || !isLoading) return null

        return (
            <Row>
                <Col sm="12">
                    <Spinner animation="border"
                             role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </Col>
            </Row>
        )
    }

    const displayAlerts = () => {
        if (alerts === undefined || alerts.length === 0) return null

        return (
            <Row>
                <Col sm="12">
                    {alerts.map((alert: CrudAlert, alertIndex: number) => {
                        if (!alert.visible) return

                        return (
                            <Alert key={alertIndex}
                                   dismissible
                                   variant={alert.variant}>
                                {alert.message}
                            </Alert>
                        )
                    })}
                </Col>
            </Row>
        )
    }

    return (
        <>
            <Header pageTitle={pageTitle}/>
            <main>
                <Container>
                    {isItLoadingSomething()}
                    {displayAlerts()}
                    <Row className="mt-4">
                        <Col sm="12">
                            {children}
                        </Col>
                    </Row>
                </Container>
            </main>
            <Footer/>
        </>
    )
}
