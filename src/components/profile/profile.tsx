// @/components/profile/profile.tsx
interface ProfileProps {
    user: User;
};

export default function Profile({ user }: ProfileProps) {
    return (
        <main className="p-4">
            <h1 className="text-2xl font-bold">{user.user_name}</h1>
        </main>
    );
}
