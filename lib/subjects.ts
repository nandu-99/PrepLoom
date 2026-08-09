import type { ReleaseAvailability } from "@/lib/release-status";

export type Subject = {
  order: string;
  slug: string;
  name: string;
  description: string;
  topics: string[];
  availability: ReleaseAvailability;
};

export const subjects: Subject[] = [
  {
    order: "01",
    slug: "operating-systems",
    name: "Operating Systems",
    description:
      "Understand how processes, memory, scheduling, and concurrency work.",
    topics: ["Processes", "Memory", "Deadlocks"],
    availability: "available",
  },
  {
    order: "02",
    slug: "oop",
    name: "OOP",
    description:
      "Master object-oriented principles and explain design choices clearly.",
    topics: ["Classes", "Encapsulation", "Abstraction"],
    availability: "available",
  },
  {
    order: "03",
    slug: "dbms",
    name: "DBMS",
    description:
      "Build strong foundations in databases, transactions, SQL, and indexing.",
    topics: ["Transactions", "SQL", "Indexes"],
    availability: "coming-soon",
  },
  {
    order: "04",
    slug: "computer-networks",
    name: "Computer Networks",
    description:
      "Learn how systems communicate through protocols, layers, and the web.",
    topics: ["TCP/IP", "HTTP", "DNS"],
    availability: "coming-soon",
  },
  {
    order: "05",
    slug: "dsa-theory",
    name: "DSA Theory",
    description:
      "Strengthen the theory behind complexity, data structures, and algorithms.",
    topics: ["Complexity", "Trees", "Graphs"],
    availability: "coming-soon",
  },
  {
    order: "06",
    slug: "system-design",
    name: "System Design",
    description:
      "Reason about scalable systems, trade-offs, data, and reliability.",
    topics: ["Scaling", "Caching", "Databases"],
    availability: "coming-soon",
  },
  {
    order: "07",
    slug: "web-fundamentals",
    name: "Web Fundamentals",
    description:
      "Understand browsers, JavaScript, APIs, and the foundations of the web.",
    topics: ["Browser", "JavaScript", "Web APIs"],
    availability: "coming-soon",
  },
  {
    order: "08",
    slug: "aiml",
    name: "AI & Machine Learning",
    description:
      "Learn how intelligent systems use data, models, and algorithms to make predictions.",
    topics: ["Machine Learning", "Neural Networks", "Generative AI"],
    availability: "coming-soon",
  },
];
