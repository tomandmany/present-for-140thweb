// @/components/auth/sign-in-button
'use client'

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export default function SignInButton() {
    return (
        <Button
            className="block px-4 rounded-md w-fit mx-auto text-white"
            onClick={() => signIn('line', { callbackUrl: '/' })}
        >
            WeBeRealな生活を始める
        </Button>
    )
}