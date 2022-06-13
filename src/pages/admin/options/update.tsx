import Layout from '../../components/Layout'
import {User} from 'next-auth'
import {useEffect, useState} from 'react'
import {BiTrash, BiEdit, BiPlus} from 'react-icons/bi'
import UserPagination from '../../components/pagination/UserPagination'
import {Button} from 'react-bootstrap'

export default function Update() {
    const [users, setUsers] = useState<User[] | null>([])
    const [isLoading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        setLoading(true)
        fetch('/api/v1/users')
            .then((res) => res.json())
            .then((users) => {
                setUsers(users)
                setLoading(false)
            })
    }, [])

    if (isLoading) return <p>Loading...</p>
    if (users === null) return <p>No profile data</p>

    return (
        <Layout>
            <h1>Admin</h1>
            <UserPagination numberOfUsersPerPage={10}
                            users={users}/>
            <table className="table table-hover links">
                <thead>
                <tr>
                    <th scope="col">#ID</th>
                    <th scope="col">User</th>
                    <th scope="col">Email</th>
                    <th scope="col">Image</th>
                    <th scope="col">Actions</th>
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
                                    <a href="#"><BiTrash/></a>
                                    <a href="#"><BiEdit/></a>
                                </td>
                            </tr>
                        )
                    }
                )}
                </tbody>
            </table>
            <Button>
                <BiPlus/> Add
            </Button>
        </Layout>
    )
}