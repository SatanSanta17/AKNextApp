import { User } from "@/models/User";
import bcrypt from "bcrypt";
import * as mongoose from "mongoose";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
const handler = NextAuth({
  secret: process.env.SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: `Credentials`,
      id: `credentials`,
      credentials: {
        username: {
          label: "Email",
          type: "email",
          placeholder: "burhan@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const email = credentials?.email;
        const password = credentials?.password;

        mongoose.connect(process.env.MONGO_URL);
        const user = await User.findOne({ email });
        const passwordOk = user && bcrypt.compareSync(password, user.password);

        console.log({ passwordOk });

        if (passwordOk) {
          return user;
        }

        return null;
      },
    }),
  ],
});
export { handler as GET, handler as POST };
