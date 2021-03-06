import {useEffect, useState} from 'react'
import {BiTrash, BiEdit, BiPlus, BiShow} from 'react-icons/bi'
import {Button, Col, Row} from 'react-bootstrap'
import Layout from '../../../../components/Layout'
import CrudPagination from '../../../../components/CrudPagination'
import {useRouter} from 'next/router'
import ROUTE from '../../../../enums/Route'
import {PAGINATION} from '../../../../enums/Pagination'
import {sprintf} from 'sprintf-js'

export default function List() {
    const router = useRouter()
    const [users, setUsers] = useState<User[]>([])
    const [total, setTotal] = useState<number>(0)
    const [isLoading, setLoading] = useState<boolean>(false)
    const [alerts, setAlerts] = useState<CrudAlert[]>([])
    const [page, setPage] = useState<number>(0)

    const handleDeleteEntity = (user: User) => {
        if (users === []) return

        setLoading(true)
        fetch(sprintf(ROUTE.API.USERS, user.id), {method: 'DELETE'})
            .then((res) => res.json())
            .then((response) => {
                setUsers(response.data)
                setLoading(false)

                setUsers(users.filter((tempUser: User) => {
                    return user != tempUser
                }))

                const newAlerts: CrudAlert[] = [...alerts]
                newAlerts.push({
                    variant: 'success',
                    message: 'User successfully deleted',
                    visible: true,
                })
                setAlerts(newAlerts)
            })
    }

    useEffect(() => {
        if (!router.isReady) return
        if (router.query.page === undefined) return

        const pageParam: string = (typeof router.query.page == 'string') ? router.query.page : router.query.page[0]

        setPage(parseInt(pageParam))
    }, [router])

    useEffect(() => {
        if (page === 0) return

        setLoading(true)
        fetch(sprintf(ROUTE.API.PAGINATION, 'user', page))
            .then((res) => res.json())
            .then((response: CrudPaginationResponse) => {
                setUsers(response.data)
                setTotal(response.pagination.total)
                setLoading(false)
            })
    }, [page])

    const paginationAndCreateButton = () => {
        return (
            <Row>
                <Col sm="10">
                    <CrudPagination
                        baseRoute={ROUTE.USERS.LIST}
                        numberOfItemsPerPage={PAGINATION.DEFAULT_NUMBER_OF_ITEMS_PER_PAGE}
                        numberOfItems={total}
                        currentPage={page}/>
                </Col>
                <Col sm="2"
                     className="text-end">
                    <Button href={ROUTE.USERS.CREATE}>
                        <BiPlus/> Create
                    </Button>
                </Col>
            </Row>
        )
    }

    return (
        <Layout isLoading={isLoading}
                alerts={alerts}
                pageTitle={'Users (' + page.toString() + ')'}>
            <h1>Users</h1>
            {paginationAndCreateButton()}
            <Row>
                <Col sm="12">
                    <table className="table table-hover links">
                        <thead>
                        <tr>
                            <th scope="col">#ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Image</th>
                            <th scope="col"
                                className="text-end">Actions
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map((user: User, userIndex) => {
                                return (
                                    <tr key={userIndex}>
                                        <td>{user.id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.image}</td>
                                        <td className="text-end">
                                            <a href="#"
                                               onClick={(e) => {
                                                   e.preventDefault()

                                                   router.push(sprintf(ROUTE.USERS.READ, user.id))
                                               }}
                                               title="Show user"><BiShow/></a>
                                            <a href="#"
                                               onClick={(e) => {
                                                   e.preventDefault()

                                                   router.push(sprintf(ROUTE.USERS.UPDATE, user.id))
                                               }}
                                               title="Edit user"><BiEdit/></a>
                                            <a href="#"
                                               title="Delete user"
                                               onClick={(e) => {
                                                   e.preventDefault()

                                                   handleDeleteEntity(user)
                                               }}
                                            ><BiTrash/></a>
                                        </td>
                                    </tr>
                                )
                            }
                        )}
                        </tbody>
                    </table>
                </Col>
            </Row>
            {paginationAndCreateButton()}
        </Layout>
    )
}