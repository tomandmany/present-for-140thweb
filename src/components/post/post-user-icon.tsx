// @/components/post/post-user-icon
'use client'

import Link from "next/link";

interface PostUserIconProps {
    user_id: string;
    user_icon: string;
}

export default function PostUserIcon({ user_id, user_icon }: PostUserIconProps) {
    return (
        <Link
            href={`/profile/${user_id}`}
        >
            <img
                src={`${user_icon}`}
                alt="ユーザーアイコン"
                width={32}
                height={32}
                className="rounded-full object-cover w-8 min-w-8 max-w-8 h-8 min-h-8 max-h-8 select-none"
            />
        </Link>
    )
}