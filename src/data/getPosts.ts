// app/utils/getPosts.ts
import { supabase } from '@/lib/supabaseClient';

interface PostData {
  data: Post[] | null;
}

export default async function getPosts(id?: string): Promise<PostData> {
  let data: Post[] | null = null;

  if (id) {
    ({ data } = await supabase
      .from('posts')
      .select('*')
      .eq('user_id', id));
  } else {
    ({ data } = await supabase
      .from('posts')
      .select('*')
      .order('user_id', { ascending: false }));
  }
  
  return { data };
}
