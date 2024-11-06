// app/components/image-droppable-area-in-post.tsx
import { useDroppable } from '@dnd-kit/core';

export default function ImageDroppableAreaInPost() {
  const { setNodeRef } = useDroppable({
    id: 'droppable-area',
  });

  return <div ref={setNodeRef} className="w-full h-full pointer-events-none bg-red-300" />;
}