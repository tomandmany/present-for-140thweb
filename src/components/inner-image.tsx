'use client'

import { useDraggable } from "@dnd-kit/core";
import { CSSProperties } from "react";

interface InnerImageProps {
    toggleBaseImage: () => void;
    imagePosition: { x: number; y: number };
    isBaseImage: boolean;
    post_base_image: string;
    post_inner_image: string;
    dropSide: 'left' | 'right';
}

export default function InnerImage({ dropSide, toggleBaseImage, imagePosition, isBaseImage, post_base_image, post_inner_image }: InnerImageProps) {
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
            src={isBaseImage ? `/posts/${post_inner_image}.jpg` : `/posts/${post_base_image}.jpg`}
            alt="小窓の画像"
            width={120}
            height={165}
            className='rounded-xl w-[120px] h-[165px] object-cover absolute top-2 left-2 border-2 border-black cursor-pointer focus:outline-none select-none'
            onClick={toggleBaseImage}
            onCopy={(e) => e.preventDefault()}
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
        />
    )
}