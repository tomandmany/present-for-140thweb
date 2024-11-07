// @/components/post/image/post-image-container.tsx
'use client'

import { DndContext, DragEndEvent, DragMoveEvent, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import PostImageDroppableArea from "@/components/post/image/post-image-droppable-area";
import PostImageSmall from "@/components/post/image/post-image-small";
import { useRef, useState } from "react";

interface PostImageContainerProps {
    post_big_image: string;
    post_small_image: string;
}

export default function PostImageContainer({ post_big_image, post_small_image }: PostImageContainerProps) {
    const [isBigImage, setIsBigImage] = useState(true);
    const [imagePosition, setImagePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const cumulativePosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
    const [dropSide, setDropSide] = useState<'left' | 'right'>('left');
    const postRef = useRef<HTMLDivElement>(null);

    const toggleBigImage = () => {
        setIsBigImage(!isBigImage);
    };

    const handleDragMove = (event: DragMoveEvent) => {
        const { delta } = event;

        const newX = cumulativePosition.current.x + delta.x;
        const newY = cumulativePosition.current.y + delta.y;

        setImagePosition({ x: newX, y: newY });
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { over } = event;

        if (over) {
            const postRect = postRef.current?.getBoundingClientRect();

            if (over.id === 'left-droppable-area') {
                setImagePosition({ x: 0, y: 0 });
                cumulativePosition.current = { x: 0, y: 0 };
                setDropSide('left');
            } else if (over.id === 'right-droppable-area') {
                if (postRect) {
                    setImagePosition({ x: postRect.width - 124, y: 0 });
                    cumulativePosition.current = { x: postRect.width - 124, y: 0 };
                    setDropSide('right');
                }
            }
        } else {
            setImagePosition({ x: 0, y: 0 });
            cumulativePosition.current = { x: 0, y: 0 };
            setDropSide('left');
        }
    };

    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            distance: 1,
        },
    });

    const touchSensor = useSensor(TouchSensor, {
        activationConstraint: { delay: 80, tolerance: 0 },
    });

    const sensors = useSensors(
        mouseSensor,
        touchSensor,
    );

    return (
        <div className="relative" ref={postRef}>
            <img
                src={isBigImage ? `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}/posts/${post_big_image}` : `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}/posts/${post_small_image}`}
                alt="ベース画像"
                width={390}
                height={520}
                className="rounded-xl w-full h-[520px] object-cover absolute inset-0"
            />
            <DndContext
                onDragMove={handleDragMove}
                onDragEnd={handleDragEnd}
                sensors={sensors}
            >
                <PostImageDroppableArea />
                <PostImageSmall dropSide={dropSide} toggleBigImage={toggleBigImage} imagePosition={imagePosition} isBigImage={isBigImage} post_big_image={post_big_image} post_small_image={post_small_image} />
            </DndContext>
        </div>
    )
}