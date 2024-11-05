// ファイルパス: app/options.ts
import { supabase } from '@/lib/supabaseClient';
import generateRandomString from '@/utils/randomString';
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
        const user_id = user.id; // LINEから返されたユーザーIDを取得
        try {
          await supabase.from('users').insert({
            user_name: user.name || '名無しさん',
            user_icon_url: user.image || '',
            user_private_id: user_id,
            user_public_id: generateRandomString(8),
          });
        } catch (error) {
          console.error("ユーザーの保存中にエラーが発生しました:", error);
          return false; // ログインをキャンセル
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
        (session.user as { user_id?: string }).user_id = token.id as string; // セッションのユーザーにIDを追加
      }
      return session;
    },
  },
};

export default authOptions;