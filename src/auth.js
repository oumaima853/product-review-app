import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

import { CredentialsSignin } from "next-auth";

class PendingApprovalError extends CredentialsSignin {
  code = "pending-approval";
}

const prisma = new PrismaClient();

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        // case 1 : if email or password are wrong authentification fails
        if (
          !user ||
          !(await bcrypt.compare(credentials.password, user.password))
        ) {
          return null; // NextAuth v5 expects null if auth fails
        }

        // case 2 : if user not allowed yet to login from admin  -> authentification fails
        if (!user.isApproved) {
          throw new PendingApprovalError();
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.isApproved = user.isApproved;
        token.id = user.id;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.img = user.img;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
        session.user.isApproved = token.isApproved;
        session.user.id = token.id;
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
        session.user.img = token.img;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: { signIn: "/login" },
});
