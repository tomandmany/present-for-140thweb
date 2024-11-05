import Post from "@/components/post";
// import { getServerSession } from "next-auth";
// import authOptions from "./options";
// import { redirect } from "next/navigation";

export default async function Home() {
  // const session = await getServerSession(authOptions);

  // if (!session) {
  //   redirect("/sign-in");
  // }

  // const user = session.user;

  return (
    <main className="flex min-h-[calc(100svh-(84px+20px))] flex-col items-center justify-center pt-[calc(84px+20px)]">
      <div className="flex flex-col gap-8">
        <Post user_name="mahohonk" user_icon="maho" posted_place="食堂2階" posted_time="19:12:00" post_base_image="maho_01" post_inner_image="maho_02" />
        <Post user_name="onichan" user_icon="oni" posted_place="食堂2階" posted_time="19:12:00" post_base_image="oni_01" post_inner_image="oni_02" />
        <Post user_name="rin0310" user_icon="rin" posted_place="食堂2階" posted_time="19:12:00" post_base_image="rin_01" post_inner_image="rin_02" />
        <Post user_name="sasisushoiya" user_icon="shoya" posted_place="食堂2階" posted_time="19:12:00" post_base_image="shoya_01" post_inner_image="shoya_02" />
        {/* <Post user_name="yuyuyuuuu7" user_icon="shoya" posted_place="食堂2階" posted_time="19:12:00" post_base_image="shoya_01" post_inner_image="shoya_02" />
        <Post user_name="min3uu" user_icon="shoya" posted_place="食堂2階" posted_time="19:12:00" post_base_image="shoya_01" post_inner_image="shoya_02" />
        <Post user_name="umym_og3" user_icon="shoya" posted_place="食堂2階" posted_time="19:12:00" post_base_image="shoya_01" post_inner_image="shoya_02" />
        <Post user_name="irohakawaii" user_icon="shoya" posted_place="食堂2階" posted_time="19:12:00" post_base_image="shoya_01" post_inner_image="shoya_02" />
        <Post user_name="taiga10_12" user_icon="shoya" posted_place="食堂2階" posted_time="19:12:00" post_base_image="shoya_01" post_inner_image="shoya_02" />
        <Post user_name="mi2__.kt" user_icon="shoya" posted_place="食堂2階" posted_time="19:12:00" post_base_image="shoya_01" post_inner_image="shoya_02" />
        <Post user_name="atsuko" user_icon="shoya" posted_place="食堂2階" posted_time="19:12:00" post_base_image="shoya_01" post_inner_image="shoya_02" />
        <Post user_name="tatsuya" user_icon="shoya" posted_place="食堂2階" posted_time="19:12:00" post_base_image="shoya_01" post_inner_image="shoya_02" />
        <Post user_name="hitomi" user_icon="shoya" posted_place="食堂2階" posted_time="19:12:00" post_base_image="shoya_01" post_inner_image="shoya_02" /> */}
      </div>
    </main>
  );
}
