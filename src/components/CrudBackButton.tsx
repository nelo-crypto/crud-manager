import {Button} from 'react-bootstrap'
import {BiArrowBack} from 'react-icons/bi'
import {useRouter} from 'next/router'

export default function CrudPagination() {
    const router = useRouter()

    return (
        <Button variant="secondary"
                onClick={(e) => {
                    e.preventDefault()

                    router.back()
                }}>
            <BiArrowBack/> Back
        </Button>
    )
}
