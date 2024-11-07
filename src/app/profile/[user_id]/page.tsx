// app/profile/[user_id]/page.tsx

import Profile from '@/components/profile/profile';
import getUser from '@/data/getUser';

type UserProfilePageProps = {
    params: {
        user_id: string;
    };
};

export default async function UserProfilePage({ params }: UserProfilePageProps) {
    const { user_id } = params;

    const response = await getUser(user_id);

    if (!response.data) {
        return <div>Loading...</div>;
    }

    const user = response.data;

    return <Profile user={user} />;
}
