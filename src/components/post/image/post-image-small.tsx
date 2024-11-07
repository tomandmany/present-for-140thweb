// @/components/post/image/post-image-small.tsx
'use client'

import { useDraggable } from "@dnd-kit/core";
import { CSSProperties } from "react";

interface PostImageSmallProps {
    toggleBigImage: () => void;
    imagePosition: { x: number; y: number };
    isBigImage: boolean;
    post_big_image: string;
    post_small_image: string;
    dropSide: 'left' | 'right';
}

export default function PostImageSmall({ dropSide, toggleBigImage, imagePosition, isBigImage, post_big_image, post_small_image }: PostImageSmallProps) {
    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
        id: 'draggable-inner-image',
    });

    const style: CSSProperties = {
        left: isDragging ?
            dropSide === 'left' ? imagePosition.x + 10 : imagePosition.x - 6 :
            dropSide === 'left' ? 10 : imagePosition.x - 6,
        top: isDragging ? imagePosition.y + 8 :
            dropSide === 'left' ? 10 : 8,
        transition: isDragging ? 'none' : 'left 0.2s ease, top 0.2s ease',
        touchAction: 'none',
    };

    return (
        <img
            src={isBigImage ? `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}/posts/${post_small_image}` : `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}/posts/${post_big_image}`}
            alt="小窓の画像"
            width={120}
            height={165}
            className='rounded-xl w-[120px] h-[165px] object-cover absolute top-2 left-2 border-2 border-black cursor-pointer focus:outline-none select-none'
            onClick={toggleBigImage}
            onCopy={(e) => e.preventDefault()}
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
        />
    )
}