import { supabase } from '@/lib/supabaseClient';

interface UserData {
  data: User | null;
}

export async function getUserData(user_private_id: string): Promise<UserData> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('user_private_id', user_private_id)
    .single(); // 単一のレコードを取得する

  if (error) {
    console.error('Error fetching user data:', error.message);
    return { data: null }; // 型に従った形式で返す
  }

  return { data };
}