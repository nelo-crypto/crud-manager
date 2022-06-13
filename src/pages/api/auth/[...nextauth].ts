import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import prisma from '../../../lib/prisma'
import ERROR from '../../../enums/Error'

export default NextAuth({
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
    ],
    theme: {
        colorScheme: 'light',
    },
    debug: process.env.NODE_ENV === 'development',
    callbacks: {
        async jwt({token}) {
            token.userRole = 'admin'
            return token
        },
        async signIn({user, account, profile, email, credentials}) {
            console.debug('SignIn', user, account, profile, email, credentials)

            prisma.user
                .findUnique({
                    where: {
                        email: user.email,
                    }
                })
                .then((data: any) => {
                    if (data !== null) return

                    console.debug('New user: ' + user.name)

                    const userWithRole: any = user

                    userWithRole.role = 'ADMIN'

                    delete userWithRole.id

                    prisma.user
                        .create({
                            data: userWithRole,
                        })
                        .then((data: any) => {
                            console.log('New user', data)
                        })
                        .catch((e) => {
                            console.error('Error creating user for the first time: ' + e.toString())
                        })
                })

            return true
        },
        async session({session, user, token}) {
            const crudUser: User = await prisma.user
                .findUnique({
                    where: {
                        email: session.user.email,
                    }
                })

            session.user.role = crudUser.role

            return session
        },
    },
    secret: process.env.JWT_SECRET,
    logger: {
        error(code, metadata) {
            console.error(code, metadata)
        },
        warn(code) {
            console.warn(code)
        },
        debug(code, metadata) {
            console.debug(code, metadata)
        }
    }
})