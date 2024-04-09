
import bcryptjs from 'bcryptjs';
import NextAuth, {AuthOptions} from 'next-auth';
 
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

import {z} from 'zod';

import prisma from './libs/prismadb';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { debug } from 'console';


const authenticatedRoutes = [
  "/checkout",
  "/profile",
  "/orders",
  "/admin",
  "/checkout/address",
];

const adminRoutes = [
  "/admin",
  "/admin/products",
  "/admin/orders",
  "/admin/users",
];


const isOnAuthenticatedRoutes = (onRoute: string) => {
  return authenticatedRoutes.some((authRoutes) =>
    onRoute.startsWith(authRoutes)
  );
};

const isOnAdminRoutes = (onRoute: string) => {
  return adminRoutes.some((authRoutes) => onRoute.startsWith(authRoutes));
}


export const authOptions:AuthOptions = {
    adapter: PrismaAdapter(prisma),
    pages: {
      signIn: '/',
      newUser: '/'
    },
    providers: [
      GithubProvider({
        clientId: process.env.GITHUB_ID as string,
        clientSecret: process.env.GITHUB_SECRET as string
      }),
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
      }),
      CredentialsProvider({
          name:'credentials',
          credentials: {
            email: {label:'email', type:'email'},
            password: {label:'password', type:'password'}
          },
          async authorize (credentials) {
            if(!credentials?.email || !credentials?.password){
              throw new Error('Invalid Credentials')
            }

            const userExits = await prisma.user.findUnique({
              where:{
                email: credentials.email
              }
            })

            if(!userExits){
              throw new Error('User does not exists')
            }

            const isTheSamePassword = bcryptjs.compareSync(userExits.password!, credentials.password)

            if(!isTheSamePassword){
              throw new Error('Invalid Credentials')
            }
            

            return userExits

          }
      }), 
    ],
    debug: process.env.NODE_ENV === 'development',
    session: {
      strategy:'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET
    

}
export const {signIn,signOut,auth, handlers} = NextAuth(authOptions);