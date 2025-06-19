import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { findUserByEmail } from "@/features/auth/services/user.services";
import { comparePassword } from "@/features/auth/lib/utils";
import { loginSchema } from "@/features/auth/lib/zod/schema";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);

        if (!parsed.success) return null;
        const { email, password } = parsed.data;

        const user = await findUserByEmail(email);
        if (!user || !user.password || !user.salt) return null;

        const isValid = await comparePassword({
          password,
          hashedPassword: user.password,
          salt: user.salt,
        });

        if (!isValid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name ?? undefined,
          image: user.image ?? undefined,
        };
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/sign-in",
    error: "/auth/error",
  },

  callbacks: {
    async session({ session, token }) {
      if (session.user && token?.sub) {
        session.user.id = token.sub;
        session.user.email = token.email;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) token.sub = user.id;
      return token;
    },
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") {
        if (!user.email) {
          throw new Error("User email is missing");
        }
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
          include: { accounts: true },
        });

        if (
          existingUser &&
          account &&
          !existingUser.accounts?.some((a) => a.provider === account.provider)
        ) {
          throw new Error("Account already exists with a different sign-in method");
        }
      }

      return true;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
