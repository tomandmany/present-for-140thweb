// @/app/camera/page.tsx
import { getServerSession } from 'next-auth';
import authOptions from '@/app/options';
import { redirect } from 'next/navigation';
import getUser from '@/data/getUser';
import Camera from '@/components/camera/camera';

export default async function CameraPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/sign-in");
    }

    const sessionUserId = session.user.id;
    const user = (await getUser(sessionUserId)).data;

    if (!user) {
        redirect("/sign-in");
    }

    return (
        <main className="flex flex-col items-center justify-center min-h-[100svh] space-y-8">
            <Camera user_id={user.id} />
        </main>
    );
}
