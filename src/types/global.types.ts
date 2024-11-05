import { Tables } from '@/types/supabase.types';

declare global {
  type User = Tables<'users'>;
  // type Post = Tables<'posts'>;
}
