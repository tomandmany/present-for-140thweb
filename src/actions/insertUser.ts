import { supabase } from '@/lib/supabaseClient';
import generateRandomString from '@/utils/randomString';

interface UserData {
  data: User | null;
}

interface SignInUser {
  user_id: string;
  user_name?: string | null;
  user_icon_url?: string | null;
}

export default async function InsertUser({user_id, user_name, user_icon_url}: SignInUser): Promise<UserData> {
  const { data, error } = await supabase.from('users').insert({
    id: user_id,
    user_name: user_name || '名無しさん',
    user_icon_url: user_icon_url || '',
    user_public_id: generateRandomString(8),
  });

  if (error) {
    console.error('Error inserting user:', error.message);
    throw error;
  }
    
  return { data };
}
