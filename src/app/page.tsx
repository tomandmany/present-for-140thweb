import Post from "@/components/post/post";
import { getServerSession } from "next-auth";
import authOptions from "./options";
import { redirect } from "next/navigation";
import getUser from "@/data/getUser";
import getPosts from "@/data/getPosts";
import Link from "next/link";
import { Camera } from "lucide-react";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/sign-in");
  }

  const sessionUserId = session.user.id;
  const user = (await getUser(sessionUserId)).data;

  if (!user) {
    redirect("/sign-in");
  }

  const posts = (await getPosts()).data;
  if (!posts) {
    throw new Error("Failed to fetch posts");
  }

  return (
    <>
      <main className="flex min-h-[100svh] flex-col items-center justify-center pt-[calc(84px+20px)]">
        <div className="flex flex-col gap-8 pb-10">
          {
            posts.map((post) => {
              return <Post key={post.id} user_id={post.user_id} user_public_id={user.user_public_id} user_icon={user.user_icon_url} post_id={post.id} posted_place={post.posted_place} posted_time={post.posted_time} post_big_image={post.post_big_image} post_small_image={post.post_small_image} />
            })
          }
        </div>
      </main>
      <footer className="w-full bg-transparent h-[70px] fixed bottom-0 left-0 flex justify-center items-center">
        <Link href="/camera" className="text-white border-2 rounded-full p-3">
          <Camera />
        </Link>
      </footer>
    </>
  );
}
