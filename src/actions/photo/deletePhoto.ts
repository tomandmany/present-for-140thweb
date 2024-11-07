// // actions/photo/deletePhoto.ts
// 'use server';

// import { supabase } from '@/lib/supabaseClient';
// import { revalidatePath } from 'next/cache';

// export default async function deletePhoto(photo_id: string, post_big_photo: string, post_small_photo: string) {
//     try {
//         const timestamp = new Date().toISOString().replace(/[:.]/g, '-'); // :や.を-に置換
//         const fileName = `${user_id}/${timestamp}.png`;

//         const { error: baseImageError } = await supabase.storage
//             .from('posts')
//             .upload(`big/${fileName}`, big_photo_blob, {
//                 cacheControl: '3600',
//                 upsert: false,
//                 contentType: 'image/png',
//             });

//         if (baseImageError) {
//             throw baseImageError;
//         }

//         const { error: smallImageError } = await supabase.storage
//             .from('posts')
//             .upload(`small/${fileName}`, small_photo_blob, {
//                 cacheControl: '3600',
//                 upsert: false,
//                 contentType: 'image/png',
//             });

//         if (smallImageError) {
//             throw smallImageError;
//         }

//         const { error: insertError } = await supabase.from('posts').insert({
//             post_big_image: `big/${fileName}`,
//             post_small_image: `small/${fileName}`,
//             user_id: user_id,
//         });

//         if (insertError) {
//             throw insertError;
//         }

//         revalidatePath('/');

//         console.log('画像が保存されました');
//     } catch (error) {
//         console.error('画像のアップロードに失敗しました:', error);
//     }
// }
