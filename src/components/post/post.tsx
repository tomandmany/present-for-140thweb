// components/post/post.tsx
import { Ellipsis } from "lucide-react";
import PostImageContainer from "./image/post-image-container";
import PostUserIcon from "@/components/post/post-user-icon";

interface PostProps {
    user_id: string;
    user_public_id: string;
    user_icon: string;
    // post_id: string;
    posted_place: string | null;
    posted_time: string;
    post_big_image: string;
    post_small_image: string;
}

export default function Post({ user_id, user_public_id, user_icon, posted_place, posted_time, post_big_image, post_small_image }: PostProps) {
    // const deletePhoto = async () => {
    //     const response = await deletePhoto();
    //     if (response.error) {
    //         console.error('画像の削除に失敗しました:', response.error);
    //         return;
    //     }
    // };

    return (
        <div className="w-[100svw] max-w-[390px]">
            <div className="flex items-center gap-3 w-full mb-2 px-4">
                <PostUserIcon user_id={user_id} user_icon={user_icon} />
                <div className="h-fit">
                    <div className="font-black text-white text-sm">{user_public_id}</div>
                    <div className="text-gray-300/80 text-xs">
                        <span>{posted_place}</span>
                        ・
                        <span>{posted_time}</span>
                    </div>
                </div>
                <Ellipsis className="ml-auto text-white" />
                {/* <X className="ml-auto text-white" onClick={deletePhoto} /> */}
            </div>
            <PostImageContainer post_big_image={post_big_image} post_small_image={post_small_image} />
        </div>
    );
}
