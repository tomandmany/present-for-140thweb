// ファイルパス: types/next-auth.d.ts
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { NextAuth } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string; // ユーザーIDを追加
      name?: string | null;
      // email?: string | null;
      image?: string | null;
    };
  }
}
