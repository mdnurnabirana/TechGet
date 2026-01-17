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
      // On initial sign in, attach email and role to token.
      if (user) {
        // prefer email as stable identifier
        token.sub = user.email;
        token.email = user.email;
        if (user.role) {
          token.role = user.role;
        } else {
          // try to load role from DB for providers like Google
          const dbUser = await getUserByEmail(user.email);
          if (dbUser) token.role = dbUser.role;
        }
      } else if (!token.role && token.sub) {
        // subsequent requests: ensure token has role
        const dbUser = await getUserByEmail(token.sub);
        if (dbUser) {
          token.role = dbUser.role;
          token.email = dbUser.email || token.sub;
        }
      }

      return token;
    },
    async session({ session, token }) {
      // expose id (email) and role to the client session
      session.user.id = token.sub;
      session.user.email = token.email || token.sub || session.user.email;
      session.user.role = token.role || null;
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