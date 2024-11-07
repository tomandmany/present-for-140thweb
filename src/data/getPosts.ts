// app/utils/getPosts.ts
import { supabase } from '@/lib/supabaseClient';

interface PostData {
  data: Post[] | null;
}

export default async function getPosts(id?: string): Promise<PostData> {
  let data: Post[] | null = null;
  let error: any;

  if (id) {
    ({ data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('user_id', id));
  } else {
    ({ data, error } = await supabase
      .from('posts')
      .select('*')
      .order('user_id', { ascending: false }));
  }

  if (error) {
    console.error('Error fetching posts:', error.message);
    return { data: null };
  }

  return { data };
}
