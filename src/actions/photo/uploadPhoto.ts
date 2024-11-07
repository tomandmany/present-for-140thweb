// actions/photo/uploadPhoto.ts
'use server';

import { supabase } from '@/lib/supabaseClient';

export default async function uploadPhoto(big_photo: string, small_photo: string, user_id: string) {
    try {
        const big_photo_response = await fetch(big_photo);
        const small_photo_response = await fetch(small_photo);
        if (!big_photo_response.ok || !small_photo_response.ok) {
            throw new Error('画像データの変換に失敗しました');
        }
        const big_photo_blob = await big_photo_response.blob();
        const small_photo_blob = await small_photo_response.blob();
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-'); // :や.を-に置換
        const fileName = `${user_id}/${timestamp}.png`;

        const { data: bigImageData, error: baseImageError } = await supabase.storage
            .from('posts')
            .upload(`big/${fileName}`, big_photo_blob, {
                cacheControl: '3600',
                upsert: false,
                contentType: 'image/png',
            });

        if (baseImageError) {
            throw baseImageError;
        }

        const { data: smallImageData, error: smallImageError } = await supabase.storage
            .from('posts')
            .upload(`small/${fileName}`, small_photo_blob, {
                cacheControl: '3600',
                upsert: false,
                contentType: 'image/png',
            });

        if (smallImageError) {
            throw smallImageError;
        }

        const { error: insertError } = await supabase.from('posts').insert({
            post_big_image: `big/${fileName}`,
            post_small_image: `small/${fileName}`,
            user_id: user_id,
        });

        if (insertError) {
            throw insertError;
        }

        console.log('画像が保存されました');
    } catch (error) {
        console.error('画像のアップロードに失敗しました:', error);
    }
}
