// @/app/sign-in

import { getServerSession } from "next-auth";
import authOptions from "@/app/options";
import { redirect } from "next/navigation";
import SignInButton from "@/components/auth/sign-in-button";
import getUser from "@/data/getUser";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    const sessionUserId = session.user.id;
    const response = await getUser(sessionUserId);

    if (response.data) {
      redirect("/");
    }
  }

  return (
    <main className="flex min-h-[100svh] items-center justify-center">
      <SignInButton />
    </main>
  )
}