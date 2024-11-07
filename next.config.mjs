/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['profile.line-scdn.net'], // 許可したい画像のホスト名を追加
    },
    experimental: {
        serverActions: {
            bodySizeLimit: '5mb', // 必要なサイズに変更してください
        },
    },
};

export default nextConfig;
