// components/Post.tsx
'use client'

import { DndContext, DragEndEvent, DragMoveEvent, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { Ellipsis } from "lucide-react";
import { useRef, useState } from "react";
import ImageDroppableAreaInPost from "./image-droppable-area-in-post";
import InnerImage from "./inner-image";

interface PostProps {
    user_name: string;
    user_icon: string;
    posted_place: string;
    posted_time: string;
    post_base_image: string;
    post_inner_image: string;
}

export default function Post({ user_name, user_icon, posted_place, posted_time, post_base_image, post_inner_image }: PostProps) {
    const [isBaseImage, setIsBaseImage] = useState(true);
    const [imagePosition, setImagePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const cumulativePosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
    const [dropSide, setDropSide] = useState<'left' | 'right'>('left');
    const postRef = useRef<HTMLDivElement>(null);

    const toggleBaseImage = () => {
        setIsBaseImage(!isBaseImage);
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
        <div className="w-[100svw] max-w-[390px]">
            <div className="flex items-center gap-3 w-full mb-2 px-4">
                <img
                    src={`/icons/${user_icon}.jpg`}
                    alt="ユーザーアイコン"
                    width={32}
                    height={32}
                    className="rounded-full object-cover w-8 min-w-8 max-w-8 h-8 min-h-8 max-h-8 select-none pointer-events-none"
                />
                <div className="h-fit">
                    <div className="font-black text-white text-sm">{user_name}</div>
                    <div className="text-gray-300/80 text-xs">
                        <span>{posted_place}</span>
                        ・
                        <span>{posted_time}</span>
                    </div>
                </div>
                <Ellipsis className="ml-auto" />
            </div>
            <div className="relative" ref={postRef}>
                <DndContext
                    onDragMove={handleDragMove}
                    onDragEnd={handleDragEnd}
                    sensors={sensors}
                >
                    <img
                        src={isBaseImage ? `/posts/${post_base_image}.jpg` : `/posts/${post_inner_image}.jpg`}
                        alt="ベース画像"
                        width={390}
                        height={520}
                        className="rounded-xl w-full h-[520px] object-cover absolute inset-0"
                    />
                    <ImageDroppableAreaInPost />
                    <InnerImage dropSide={dropSide} toggleBaseImage={toggleBaseImage} imagePosition={imagePosition} isBaseImage={isBaseImage} post_base_image={post_base_image} post_inner_image={post_inner_image} />
                </DndContext>
            </div>
        </div>
    );
}
