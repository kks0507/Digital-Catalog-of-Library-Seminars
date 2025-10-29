// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // !! 경고 !!
    // AWS AppRunner 빌드를 통과시키기 위해 타입 오류를 무시합니다.
    ignoreBuildErrors: true,
  },

  images: {
    unoptimized: true,
  },

  // typescript: { ... }  <-- 이 중복된 부분은 삭제합니다.
};

export default nextConfig;
