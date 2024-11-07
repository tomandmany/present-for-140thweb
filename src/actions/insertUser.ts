import { supabase } from '@/lib/supabaseClient';
import generateRandomString from '@/utils/randomString';

interface UserData {
  data: User | null;
}

export default async function InsertUser(signInUser: any): Promise<UserData> {
  const { data, error } = await supabase.from('users').insert({
    id: signInUser.id,
    user_name: signInUser.name || '名無しさん',
    user_icon_url: signInUser.image || '',
    user_public_id: generateRandomString(8),
  });

  if (error) {
    console.error('Error inserting user:', error.message);
    throw error;
  }
    
  return { data };
}
