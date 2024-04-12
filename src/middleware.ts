import { withAuth } from "next-auth/middleware";

export default withAuth({
    pages: {
        signIn: '/',
    }
})

export const config = {
    matcher: [
        '/users/:path*', // match all routes that start with /users
    ]
}