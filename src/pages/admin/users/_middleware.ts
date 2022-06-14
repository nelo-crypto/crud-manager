import {withAuth} from 'next-auth/middleware'
import { getToken } from "next-auth/jwt"

const secret = process.env.JWT_SECRET

export default withAuth({
    callbacks: {
        //authorized: ({token}) => token?.role === 'admin',
        authorized: (data) => {
            /*
            const token = await getToken({ req, secret })
            console.log('withAuth', data)

            if (token){
                return true
            } else {
                return false
            }*/

            return true
        },
    },
})