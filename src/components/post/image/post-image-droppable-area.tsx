// @/components/post/image/post-image-droppable-area.tsx
'use client'

import { useDroppable } from '@dnd-kit/core';

export default function ImageDroppableAreaInPost() {
  return (
    <div className='w-full h-[520px] relative'>
      <LeftDroppableArea />
      <RightDroppableArea />
    </div>
  );
}

function LeftDroppableArea() {
  const { setNodeRef } = useDroppable({
    id: 'left-droppable-area',
  });

  return (
    <div
      ref={setNodeRef}
      className='absolute top-0 left-0 w-1/2 h-full'
    />
  );
}

function RightDroppableArea() {
  const { setNodeRef } = useDroppable({
    id: 'right-droppable-area',
  });

  return (
    <div
      ref={setNodeRef}
      className='absolute top-0 right-0 w-1/2 h-full'
    />
  );
}
