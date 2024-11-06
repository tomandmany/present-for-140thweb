'use client'

import { useDraggable } from "@dnd-kit/core";
import { CSSProperties } from "react";

interface InnerImageProps {
    toggleBaseImage: () => void;
    imagePosition: { x: number; y: number };
    isBaseImage: boolean;
    post_base_image: string;
    post_inner_image: string;
}

export default function InnerImage({ toggleBaseImage, imagePosition, isBaseImage, post_base_image, post_inner_image }: InnerImageProps) {
    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
        id: 'draggable-inner-image',
    });

    const style: CSSProperties = {
        transform: `translate3d(${imagePosition?.x || 0}px, ${imagePosition?.y || 0}px, 0)`,
        transition: isDragging ? 'none' : 'transform 0.2s ease',
        touchAction: 'none',
    };

    return (
        <img
            src={isBaseImage ? `/posts/${post_inner_image}.jpg` : `/posts/${post_base_image}.jpg`}
            alt="投稿画像"
            width={110}
            height={150}
            className="rounded-xl w-[110px] h-[150px] object-cover absolute top-2 left-2 border-2 border-black cursor-pointer"
            onClick={toggleBaseImage}
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
        />
    )
}