import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcrypt";

import { db } from "./prisma";
import { getEnvString } from "./siteConfig";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const { email, password } = credentials ?? {};
        if (!email || !password) {
          throw new Error("Invalid username or password");
        }

        const user = await db.user.findUnique({
          where: {
            email,
          },
        });

        if (!user) {
          throw new Error("Invalid username or password");
        }

        const isPasswordValid = await compare(password, user.password);

        if (!isPasswordValid) {
          throw new Error("Invalid username or password");
        }

        return {
          id: user.id + "",
          email: user.email,
          name: user.name,
          image: user.image,
        };
      },
    }),
    GoogleProvider({
      clientId: getEnvString("GOOGLE_CLIENT_ID"),
      clientSecret: getEnvString("GOOGLE_CLIENT_SECRET"),
    }),
  ],
  secret: getEnvString("NEXTAUTH_SECRET"),
  callbacks: {
    async signIn({ account, user, credentials, email, profile }) {
      // Sent on a successful sign in. Add signIn related events.
      return true;
    },
    async session({ token, session }) {
      if (token && session?.user) {
        session.user.id = token.sub;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
        };
      }
      return token;
    },
  },
};
