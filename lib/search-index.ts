import "server-only";

import { dsaSheets } from "@/content/dsa";
import { behavioralInterviewQuestions } from "@/content/interview-questions/behavioral";
import { computerNetworksInterviewQuestions } from "@/content/interview-questions/computer-networks";
import { cssInterviewQuestions } from "@/content/interview-questions/css";
import { dbmsInterviewQuestions } from "@/content/interview-questions/dbms";
import { htmlInterviewQuestions } from "@/content/interview-questions/html";
import { javascriptInterviewQuestions } from "@/content/interview-questions/javascript";
import { oopInterviewQuestions } from "@/content/interview-questions/oop";
import { operatingSystemInterviewQuestions } from "@/content/interview-questions/operating-systems";
import { reactInterviewQuestions } from "@/content/interview-questions/react";
import { computerNetworksContent } from "@/content/subjects/computer-networks";
import { dbmsContent } from "@/content/subjects/dbms";
import { deepLearningContent } from "@/content/subjects/deep-learning";
import { machineLearningContent } from "@/content/subjects/machine-learning";
import { modernComputerArchitectureContent } from "@/content/subjects/modern-computer-architecture";
import { oopContent } from "@/content/subjects/oop";
import { operatingSystemsContent } from "@/content/subjects/operating-systems";
import {
  componentLibraries,
  practicalGuides,
  projectIdeas,
  skillTemplates,
  websiteResources,
} from "@/content/webdev";
import type { SubjectContent } from "@/lib/subject-content";
import type {
  SearchCatalog,
  SearchGroup,
  SearchItem,
} from "@/lib/search-types";
import { subjects } from "@/lib/subjects";

const subjectContents: SubjectContent[] = [
  operatingSystemsContent,
  modernComputerArchitectureContent,
  oopContent,
  dbmsContent,
  computerNetworksContent,
  machineLearningContent,
  deepLearningContent,
];

const subjectAliases: Record<string, string[]> = {
  "operating-systems": ["os"],
  "modern-computer-architecture": ["mca", "computer organization", "coa"],
  oop: ["oops", "object oriented programming"],
  dbms: ["database management system", "database systems"],
  "computer-networks": ["cn", "networking"],
  "machine-learning": ["ml"],
  "deep-learning": ["dl", "neural networks"],
  "dsa-theory": ["dsa", "data structures", "algorithms"],
};

function subjectItems(): SearchItem[] {
  return subjects.map((subject) => ({
    title: subject.name,
    description:
      subject.availability === "available"
        ? subject.description
        : `${subject.name} notes are coming soon`,
    href: `/subjects/${subject.slug}`,
    keywords: [
      subject.slug.replaceAll("-", " "),
      ...subject.topics,
      ...(subjectAliases[subject.slug] ?? []),
    ],
    icon: "book",
    type: "subject",
    aliases: subjectAliases[subject.slug],
  }));
}

function subjectTopicGroups(): SearchGroup[] {
  return subjectContents.map((subject) => ({
    label: subject.title,
    items: subject.modules.flatMap((module) => {
      const firstTopic = module.topics[0];
      const moduleItem: SearchItem = {
        title: module.title,
        description: `${subject.title} / ${module.topics.length} topics`,
        href: firstTopic
          ? `/subjects/${subject.slug}?topic=${encodeURIComponent(firstTopic.slug)}#reading-preview-note`
          : `/subjects/${subject.slug}`,
        keywords: [
          subject.title,
          subject.shortTitle,
          module.description,
          ...module.topics.flatMap((topic) => [topic.title, ...topic.tags]),
        ],
        icon: "book",
        type: "module",
      };

      const topicItems: SearchItem[] = module.topics.map((topic) => ({
        title: topic.title,
        description: `${subject.title} / ${module.title}`,
        href: `/subjects/${subject.slug}?topic=${encodeURIComponent(topic.slug)}#reading-preview-note`,
        keywords: [
          subject.title,
          subject.shortTitle,
          module.title,
          topic.slug.replaceAll("-", " "),
          ...topic.tags,
        ],
        icon: "book",
        type: "topic",
      }));

      return [moduleItem, ...topicItems];
    }),
  }));
}

type SearchableInterviewQuestion = {
  id: string;
  question: string;
  category?: string;
};

const interviewCollections: Array<{
  label: string;
  href: string;
  questions: SearchableInterviewQuestion[];
}> = [
  {
    label: "Behavioral",
    href: "/interview-questions/behavioral",
    questions: behavioralInterviewQuestions,
  },
  {
    label: "Operating Systems",
    href: "/interview-questions/operating-systems",
    questions: operatingSystemInterviewQuestions,
  },
  {
    label: "Computer Networks",
    href: "/interview-questions/computer-networks",
    questions: computerNetworksInterviewQuestions,
  },
  {
    label: "Object-Oriented Programming",
    href: "/interview-questions/oop",
    questions: oopInterviewQuestions,
  },
  {
    label: "Database Systems",
    href: "/interview-questions/dbms",
    questions: dbmsInterviewQuestions,
  },
  {
    label: "HTML",
    href: "/interview-questions/html",
    questions: htmlInterviewQuestions,
  },
  {
    label: "CSS",
    href: "/interview-questions/css",
    questions: cssInterviewQuestions,
  },
  {
    label: "JavaScript",
    href: "/interview-questions/javascript",
    questions: javascriptInterviewQuestions,
  },
  {
    label: "React",
    href: "/interview-questions/react",
    questions: reactInterviewQuestions,
  },
];

function interviewItems(): SearchItem[] {
  return interviewCollections.flatMap((collection) =>
    collection.questions.map((question) => ({
      title: question.question,
      description: question.category
        ? `${collection.label} - ${question.category}`
        : `${collection.label} interview question`,
      href: `${collection.href}#${question.id}`,
      keywords: [collection.label, question.id.replaceAll("-", " ")],
      icon: collection.label === "Behavioral" ? "book" : "code",
      type: "interview-question",
    })),
  );
}

function webdevItems(): SearchItem[] {
  return [
    ...websiteResources.map((resource) => ({
      title: resource.name,
      description: resource.description,
      href: "/webdev?tab=websites",
      keywords: ["webdev", "website", "tool", resource.category],
      icon: "code" as const,
      type: "resource" as const,
    })),
    ...projectIdeas.map((project) => ({
      title: project.title,
      description: project.description,
      href: "/webdev?tab=projects",
      keywords: [
        "webdev",
        "project",
        project.level,
        project.stack,
        ...project.features,
        ...project.skills,
      ],
      icon: "code" as const,
      type: "resource" as const,
    })),
    ...componentLibraries.map((library) => ({
      title: library.name,
      description: library.description,
      href: "/webdev?tab=libraries",
      keywords: ["webdev", "components", "ui", library.category],
      icon: "code" as const,
      type: "resource" as const,
    })),
    ...practicalGuides.map((guide) => ({
      title: guide.title,
      description: guide.summary,
      href: `/webdev?tab=guides&guide=${encodeURIComponent(guide.id)}`,
      keywords: ["webdev", "guide", guide.environment, ...guide.prerequisites],
      icon: "code" as const,
      type: "resource" as const,
    })),
    ...skillTemplates.map((skill) => ({
      title: skill.title,
      description: skill.description,
      href: "/webdev?tab=skills",
      keywords: ["webdev", "skill", skill.category],
      icon: "code" as const,
      type: "resource" as const,
    })),
  ];
}

function dsaItems(): SearchItem[] {
  return dsaSheets.map((sheet) => ({
    title: sheet.name,
    description: `${sheet.provider} - ${sheet.bestFor}`,
    href: "/dsa#dsa-sheets",
    keywords: [
      "dsa",
      "data structures",
      "algorithms",
      sheet.provider,
      ...sheet.goals,
      sheet.experience,
      sheet.scope,
      ...sheet.topics,
    ],
    icon: "braces",
    type: "resource",
  }));
}

const exploreItems: SearchItem[] = [
  {
    title: "Interview Questions",
    description: "Practice behavioral and technical interview questions",
    href: "/interview-questions",
    keywords: ["interview", "questions", "practice"],
    icon: "code",
    type: "resource",
  },
  {
    title: "Web development resources",
    description: "Tools, projects, component libraries, guides, and skills",
    href: "/webdev",
    keywords: ["webdev", "resources", "tools", "projects"],
    icon: "code",
    type: "resource",
  },
  {
    title: "DSA preparation",
    description: "Compare trusted sheets for learning and revision",
    href: "/dsa",
    keywords: ["dsa", "algorithms", "data structures", "sheets"],
    icon: "braces",
    type: "resource",
  },
  {
    title: "Learning roadmaps",
    description: "Choose a structured frontend, backend, or DSA path",
    href: "/roadmaps",
    keywords: ["roadmap", "frontend", "backend", "dsa"],
    icon: "route",
    type: "roadmap",
  },
];

export function buildSearchCatalog(): SearchCatalog {
  const subjectsGroup = { label: "Subjects", items: subjectItems() };

  return {
    initialGroups: [subjectsGroup, { label: "Explore", items: exploreItems }],
    searchGroups: [
      subjectsGroup,
      ...subjectTopicGroups(),
      { label: "Interview Questions", items: interviewItems() },
      { label: "WebDev", items: webdevItems() },
      { label: "DSA", items: dsaItems() },
      { label: "Roadmaps", items: [exploreItems[3]] },
    ],
  };
}
