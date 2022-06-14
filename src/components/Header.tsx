import {signOut, useSession} from 'next-auth/react'
import {Container, Nav, Navbar, NavDropdown} from 'react-bootstrap'
import {BiLogIn, BiLogOut} from 'react-icons/bi'
import ROUTE from '../enums/Route'
import {sprintf} from 'sprintf-js'
import {useRouter} from 'next/router'
import PriceFeed from './PriceFeed'
import Image from 'next/image'

type HeaderProps = {
    pageTitle?: string,
}

export default function Header({pageTitle}: HeaderProps) {
    const router = useRouter()
    const {data: session} = useSession()

    return (
        <header>
            <title>{pageTitle ? pageTitle : 'No title'}</title>
            <noscript>
                <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
            </noscript>
            <Navbar bg="light"
                    className="my-3 mt-0 mb-1 bg-body rounded-bottom shadow-sm"
                    expand="lg">
                <Container>
                    <Navbar.Brand href="#"
                                  onClick={(e) => {
                                      e.preventDefault()
                                      router.push(ROUTE.HOME)
                                  }}>NextJS CRUD</Navbar.Brand>
                    <Navbar.Collapse id="file-navbar">
                        <Nav variant="pills">
                            <NavDropdown.Item
                                onClick={(e) => {
                                    e.preventDefault()
                                    router.push(ROUTE.HOME)
                                }}>Home</NavDropdown.Item>
                        </Nav>
                        <NavDropdown title="Admin"
                                     className="me-auto"
                                     id="admin-menu">
                            <NavDropdown.Item onClick={(e) => {
                                e.preventDefault()
                                router.push(sprintf(ROUTE.USERS.LIST, 1))
                            }}>Users</NavDropdown.Item>
                            <NavDropdown.Item onClick={(e) => {
                                e.preventDefault()
                                router.push(sprintf(ROUTE.OPTIONS.LIST, 1))
                            }}>Options</NavDropdown.Item>
                        </NavDropdown>
                        <PriceFeed/>
                        <NavDropdown title="Debug"
                                     id="debug-menu">
                            <NavDropdown.Item onClick={(e) => {
                                e.preventDefault()
                                router.push('/debug/server')
                            }}>Server</NavDropdown.Item>
                            <NavDropdown.Item onClick={(e) => {
                                e.preventDefault()
                                router.push('/debug/protected')
                            }}>Protected</NavDropdown.Item>
                            <NavDropdown.Item onClick={(e) => {
                                e.preventDefault()
                                router.push('/debug/api-example')
                            }}>API</NavDropdown.Item>
                        </NavDropdown>
                        <Nav className="dropdown-menu-end"
                             variant="pills">
                            {!session && (
                                <NavDropdown.Item
                                    onClick={(e) => {
                                        e.preventDefault()

                                        router.push('/api/auth/signin')
                                    }}><BiLogIn/> Sign in</NavDropdown.Item>
                            )}
                            {session?.user && (
                                <NavDropdown title={session.user.name}
                                             id="debug-menu">
                                    <NavDropdown.Item onClick={(e) => {
                                        e.preventDefault()
                                        router.push('/profile')
                                    }}>
                                        {session?.user?.image && (
                                            <Image
                                                src={session.user.image}
                                                width={30}
                                                height={30}
                                            />
                                        )}
                                    </NavDropdown.Item>
                                    <NavDropdown.Item onClick={(e) => {
                                        e.preventDefault()
                                        signOut()
                                    }}><BiLogOut/> Sign out</NavDropdown.Item>
                                </NavDropdown>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}