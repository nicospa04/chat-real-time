
import bcryptjs from 'bcryptjs';
import NextAuth, {AuthOptions} from 'next-auth';
 
import Credentials from 'next-auth/providers/credentials';
import { CredentialsProvider } from 'next-auth/providers/credentials';
import Github from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

import {z} from 'zod';

import prisma from './libs/prismadb';
import { PrismaAdapter } from '@next-auth/prisma-adapter';


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
    

}
export const {signIn,signOut,auth, handlers} = NextAuth(authOptions);