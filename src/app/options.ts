// ファイルパス: app/options.ts
import InsertUser from '@/actions/insertUser';
import getUser from '@/data/getUser';
import { NextAuthOptions } from 'next-auth';
import LineProvider from 'next-auth/providers/line';

const clientId = process.env.LINE_CLIENT_ID;
const clientSecret = process.env.LINE_CLIENT_SECRET;

if (!clientId || !clientSecret) {
  throw new Error("LINE_CLIENT_ID or LINE_CLIENT_SECRET is not defined");
}

const authOptions: NextAuthOptions = {
  debug: true,
  session: { strategy: 'jwt' },
  providers: [
    LineProvider({
      clientId: clientId,
      clientSecret: clientSecret,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (user.id) {
        if (!(await getUser(user.id))) {
          await InsertUser({
            user_id: user.id,
            user_name: user.name,
            user_icon_url: user.image,
          }); // ユーザー情報をDBに保存
        }
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
