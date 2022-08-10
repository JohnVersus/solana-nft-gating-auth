import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "MoralisAuth",
      credentials: {
        address: {
          label: "Address",
          type: "text",
          placeholder: "0x0",
        },
        chain: {
          label: "ChainName",
          type: "text",
          placeholder: "0x0",
        },
        message: {
          label: "Message",
          type: "text",
          placeholder: "0x0",
        },
        signature: {
          label: "Signature",
          type: "text",
          placeholder: "0x0",
        },
      },
      async authorize(credentials) {
        try {
          const { address, chain, message, signature } = credentials;

          const user = {
            address,
            chain,
            message,
            signature,
          };

          return user;
        } catch (e) {
          console.error(e);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      user && (token.user = user);
      return token;
    },
    async session({ session, token }) {
      session.expires = token.user.expirationTime;
      session.user = token.user;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
  },
});
