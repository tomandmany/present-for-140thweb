import { Ellipsis } from "lucide-react";
import Image from "next/image";

interface PostProps {
    user_name: string;
    user_icon: string;
    posted_place: string;
    posted_time: string;
    post_image: string;
}

export default function Post({ user_name, user_icon, posted_place, posted_time, post_image }: PostProps) {
    return (
        <div className="w-[370px]">
            <div className="flex items-center gap-3 w-full mb-2 px-4">
                {/* <div className="rounded-full w-8 aspect-square bg-gray-400" /> */}
                <img
                    src={`/icons/${user_icon}.jpg`}
                    alt="ユーザーアイコン"
                    width={32}
                    height={32}
                    className="rounded-full object-cover w-8 min-w-8 max-w-8 h-8 min-h-8 max-h-8"
                />
                <div className="text-xs">
                    <span className="font-black text-white">{user_name}</span>
                    <div className="text-gray-400">
                        <span>{posted_place}</span>
                        ・
                        <span>{posted_time}</span>
                    </div>
                </div>
                <Ellipsis className="ml-auto" />
            </div>
            {/* <div className="rounded-xl bg-white w-full h-[520px]" /> */}
            <img
                src={`/icons/${user_icon}.jpg`}
                alt="ユーザーアイコン"
                width={370}
                height={520}
                className="rounded-xl bg-white w-full h-[520px]"
            />
        </div>
    )
}