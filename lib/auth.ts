// lib/auth.ts
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";

// 👇 Export this separately so it can be imported by getServerSession()
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Record<string, string> | undefined) {
        if (!credentials) return null;

        const email = credentials.email;
        const password = credentials.password;

        // You can also add type checks here
        if (email === "demo@demo.com" && password === "demo123") {
          return {
            id: "1",
            name: "Demo User",
            email: "demo@demo.com",
          };
        }

        return null;
      }

    }),
  ],
  session: {
    strategy: "jwt",
    
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
    async session({ session, token }) {
      if (token?.user) session.user = token.user;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};