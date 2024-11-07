// ファイルパス: app/options.ts
import InsertUser from '@/actions/insertUser';
import getUser from '@/data/getUser';
import { NextAuthOptions } from 'next-auth';
import LineProvider from 'next-auth/providers/line';

const authOptions: NextAuthOptions = {
  debug: true,
  session: { strategy: 'jwt' },
  providers: [
    LineProvider({
      clientId: process.env.LINE_CLIENT_ID!,
      clientSecret: process.env.LINE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (user.id) {
        await InsertUser(user);
        // 
      }
      return true; // サインインを許可
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.id = profile.sub; // profile.subにはユーザーIDが含まれている
      }
      return token;
    },
    async session({ session, token }) {
      if (token.id) {
        (session.user as { id?: string }).id = token.id as string; // セッションのユーザーにIDを追加
      }
      // console.log('セッション情報:', session);
      return session;
    },
  },
};

export default authOptions;
