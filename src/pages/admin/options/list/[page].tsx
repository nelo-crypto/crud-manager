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
    const [page, setPage] = useState<number>(0)

    const handleDeleteEntity = (option: Option) => {
        if (options === []) return

        setLoading(true)
        fetch(sprintf(ROUTE.API.OPTIONS, option.id), {method: 'DELETE'})
            .then((res) => res.json())
            .then((response) => {
                setOptions(response.data)
                setLoading(false)

                setOptions(options.filter((tempOption: Option) => {
                    return option != tempOption
                }))

                const newAlerts: CrudAlert[] = [...alerts]
                newAlerts.push({
                    variant: 'success',
                    message: 'Option successfully deleted',
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
    }, [page])

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
                alerts={alerts}
                pageTitle={'Options (' + page.toString() + ')'}>
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

                                                   handleDeleteEntity(option)
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