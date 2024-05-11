import GitHub from "@auth/core/providers/github"
import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import { db } from "./db"

const clientId = process.env.GITHUB_CLIENT_ID
const clientSecret = process.env.GITHUB_CLIENT_SECRET

if (!clientId || !clientSecret) {
    throw new Error('Missing github oath credentials')
}

export const { handlers: { GET, POST }, auth, signOut, signIn } = NextAuth({
    adapter: PrismaAdapter(db),
    providers: [
        GitHub({ clientId, clientSecret })
    ],
    callbacks: {
        // To fix a current bug in nextauth (should be removed eventually)
        async session({ session, user }: any) {
            if (session && user) {
                session.user.id = user.id
            }
            return session
        }
    }
})