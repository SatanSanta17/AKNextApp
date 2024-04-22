import CredentialsProvider from "next-auth/providers/credentials";
providers: [
  CredentialsProvider({
    secrete: process.env.SECRETE,
    // The name to display on the sign in form (e.g. 'Sign in with...')
    name: "Credentials",
    id: 'credentials',
    credentials: {
      username: {
        label: "Email",
        type: "email",
        placeholder: "burhan@gmail.com",
      },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials, req) {
      console.log({ credentials });
      return null;
    },
  }),
];
