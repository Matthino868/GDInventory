// app/api/auth/[...nextauth]/route.ts
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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

// 👇 Use the exported options in NextAuth handler
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
