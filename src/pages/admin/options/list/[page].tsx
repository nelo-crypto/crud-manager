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
    const [options, setOptions] = useState<Option[]>([])
    const [total, setTotal] = useState<number>(0)
    const [isLoading, setLoading] = useState<boolean>(false)
    const [alerts, setAlerts] = useState<CrudAlert[]>([])
    const page: number = parseInt(router.query.page)

    const deleteOption = (user: User) => {
        fetch('/api/v1/user/' + user.id, {method: 'DELETE'})
            .then((res) => res.json())
            .then((response) => {
                setOptions(response.data)
                setLoading(false)
            })
    }

    useEffect(() => {
        if (!router.isReady) return

        setLoading(true)
        fetch(sprintf(ROUTE.API.PAGINATION, 'option', page))
            .then((res) => res.json())
            .then((response: CrudPaginationResponse) => {
                setOptions(response.data)
                setTotal(response.pagination.total)
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
    }, [router])

    const paginationAndCreateButton = () => {
        return (
            <Row>
                <Col sm="10">
                    <CrudPagination
                        baseRoute={ROUTE.OPTIONS.LIST}
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
                alerts={alerts}>
            <h1>Options</h1>
            {paginationAndCreateButton()}
            <Row>
                <Col sm="12">
                    <table className="table table-hover links">
                        <thead>
                        <tr>
                            <th scope="col">#ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Value</th>
                            <th scope="col"
                                className="text-end">Actions
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {options.map((option: Option, optionIndex) => {
                                return (
                                    <tr key={optionIndex}>
                                        <td>{option.id}</td>
                                        <td>{option.name}</td>
                                        <td>{option.value}</td>
                                        <td className="text-end">
                                            <a href="#"
                                               onClick={(e) => {
                                                   e.preventDefault()

                                                   router.push(sprintf(ROUTE.OPTIONS.READ, option.id))
                                               }}
                                               title="Show user"><BiShow/></a>
                                            <a href="#"
                                               onClick={(e) => {
                                                   e.preventDefault()

                                                   router.push(sprintf(ROUTE.OPTIONS.UPDATE, option.id))
                                               }}
                                               title="Edit"><BiEdit/></a>
                                            <a href="#"
                                               title="Delete"
                                               onClick={(e) => {
                                                   e.preventDefault()

                                                   deleteOption(option)
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