import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import CrudPagination from './CrudPagination'
import ROUTE from '../enums/Route'
import ROLE from '../enums/Role'

describe('Pagination', () => {
    test('Have Previous and Next named elements', () => {
        const testUsers: User[] = [
            {
                id: 1,
                email: 'roberto@gmail.com',
                name: 'Roberto',
                image: 'sfksfksdfsdf',
                role: ROLE.USER,
                createdAt: '2022-01-01',
            },
            {
                id: 2,
                email: 'carlos@gmail.com',
                name: 'Carlos',
                image: 'sfksfksdfsdf',
                role: ROLE.USER,
                createdAt: '2022-01-01',
            }
        ]

        render(<CrudPagination baseRoute={ROUTE.USERS.LIST}
                               numberOfItems={testUsers.length}
                               currentPage={1}
                               numberOfItemsPerPage={10}/>)

        expect(screen.getByText(/previous/i)).toBeInTheDocument()
        expect(screen.getByText(/next/i)).toBeInTheDocument()
    })
})
