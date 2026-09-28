import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "64aa-115-244-141-202.ngrok-free.app",
    "3e55-115-244-141-202.ngrok-free.app",
  ],
  async redirects() {
    return [
      {
        source: "/hybrid",
        destination: "/",
        permanent: true,
      },
      {
        source: "/hybrid/subjects/:path*",
        destination: "/subjects/:path*",
        permanent: true,
      },
      {
        source: "/hybrid/roadmaps",
        destination: "/roadmaps",
        permanent: true,
      },
      {
        source: "/hybrid/webdev",
        destination: "/webdev",
        permanent: true,
      },
      {
        source: "/hybrid/dsa",
        destination: "/dsa",
        permanent: true,
      },
      {
        source: "/hybrid/quizzes/:path*",
        destination: "/quizzes/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
