import type { MetadataRoute } from "next";

import { quizzes } from "@/content/quizzes";
import { isAvailable, quizAvailability } from "@/lib/release-status";
import { siteUrl } from "@/lib/site-url";
import { subjects } from "@/lib/subjects";

const staticRoutes = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/subjects", changeFrequency: "weekly", priority: 0.9 },
  { path: "/roadmaps", changeFrequency: "monthly", priority: 0.8 },
  { path: "/dsa", changeFrequency: "monthly", priority: 0.8 },
  { path: "/interview-questions", changeFrequency: "weekly", priority: 0.9 },
  { path: "/interview-questions/html", changeFrequency: "monthly", priority: 0.8 },
  { path: "/interview-questions/css", changeFrequency: "monthly", priority: 0.8 },
  { path: "/interview-questions/javascript", changeFrequency: "monthly", priority: 0.8 },
  { path: "/interview-questions/react", changeFrequency: "monthly", priority: 0.8 },
  { path: "/webdev", changeFrequency: "monthly", priority: 0.8 },
  { path: "/about", changeFrequency: "yearly", priority: 0.5 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.4 },
  { path: "/feedback", changeFrequency: "yearly", priority: 0.4 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const subjectRoutes: MetadataRoute.Sitemap = subjects
    .filter((subject) => isAvailable(subject.availability))
    .map((subject) => ({
      url: `${siteUrl}/subjects/${subject.slug}`,
      changeFrequency: "weekly",
      priority: 0.9,
    }));

  const quizRoutes: MetadataRoute.Sitemap = isAvailable(quizAvailability)
    ? quizzes.map((quiz) => ({
        url: `${siteUrl}/quizzes/${quiz.slug}`,
        changeFrequency: "monthly",
        priority: 0.7,
      }))
    : [];

  return [
    ...staticRoutes.map(({ path, changeFrequency, priority }) => ({
      url: `${siteUrl}${path}`,
      changeFrequency,
      priority,
    })),
    ...subjectRoutes,
    ...quizRoutes,
  ];
}
