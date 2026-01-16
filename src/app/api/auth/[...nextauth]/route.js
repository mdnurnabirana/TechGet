import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { getUserByEmail, createUser } from "@/lib/db/users";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await getUserByEmail(credentials.email);
        if (!user || user.provider !== "email")
          throw new Error("Invalid credentials");

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValid) throw new Error("Invalid credentials");

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google") {
        const existingUser = await getUserByEmail(user.email);
        if (!existingUser) {
          await createUser({
            name: user.name,
            email: user.email,
            password: null,
            photoURL: user.image || null,
            provider: "google",
          });
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) token.sub = user.id || user.email;
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.sub;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login", 
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };