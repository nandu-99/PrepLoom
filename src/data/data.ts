import { MainRoadmapPhase, Roadmap } from '../types/types';
import HTML5UP from "../assets/html5up.png";
import COREUIREACT from "../assets/coreuireact.png";
import NEXTECOMMERCE from "../assets/next-ecommerce.png";

export const backendURL = "https://prep-loom-server.vercel.app"

export const roadmap:Roadmap = {
  frontend: [
    {
      phase: "Foundations (Beginner Level)",
      skills: ["HTML", "CSS", "Git", "Command Line", "Deployment"],
      description: "Master the core building blocks of web interfaces",
    },
    {
      phase: "JavaScript (Making Web Pages Interactive)",
      skills: ["JavaScript", "ES6+", "DOM Manipulation", "APIs"],
      description: "Learn to make web pages interactive",
    },
    {
      phase: "Modern CSS & Frameworks",
      skills: ["Tailwind CSS", "Component-Based Styling"],
      description: "Build responsive and maintainable user interfaces",
    },
    {
      phase: "Frontend Frameworks (React.js)",
      skills: ["React", "Hooks", "React Router", "API Integration"],
      description: "Create dynamic single-page applications",
    },
  ],
  backend: [
    {
      phase: "Backend Foundations",
      skills: ["Node.js", "Express.js", "REST APIs"],
      description: "Understand the fundamentals of backend development and server-side programming.",
    },
    {
      phase: "Databases",
      skills: ["MongoDB", "SQL", "ORMs (Mongoose, Prisma)"],
      description: "Learn how to store, retrieve, and manage data efficiently.",
    },
    {
      phase: "Backend Architecture",
      skills: ["MVC", "Microservices", "Authentication"],
      description: "Understand scalable backend design patterns and best practices.",
    },
    {
      phase:"Advanced Backend Topics",
      skills: ["GraphQL", "WebSockets", "Message Queues"],
      description: "Learn advanced backend concepts for building high-performance systems.",
    },
  ],
};

export const componentLibraries = [
  {
    name: "Shadcn/UI",
    description:
      "A collection of beautifully designed components built with Radix UI and Tailwind CSS.",
    url: "https://ui.shadcn.com",
    tags: ["React", "Tailwind CSS", "Radix UI"],
    type: "Utility-first",
  },
  {
    name: "Material-UI (MUI)",
    description:
      "A comprehensive library of components that implements Google's Material Design.",
    url: "https://mui.com",
    tags: ["React", "Material Design"],
    type: "Full-featured",
  },
  {
    name: "Chakra UI",
    description:
      "A simple, modular and accessible component library that gives you building blocks to build React applications.",
    url: "https://chakra-ui.com",
    tags: ["React", "Accessible", "Themeable"],
    type: "Full-featured",
  },
  {
    name: "Headless UI",
    description:
      "Completely unstyled, fully accessible UI components, designed to integrate with Tailwind CSS.",
    url: "https://headlessui.dev",
    tags: ["React", "Vue", "Tailwind CSS"],
    type: "Headless",
  },
  {
    name: "Radix UI",
    description:
      "Low-level UI component library with a focus on accessibility, customization and developer experience.",
    url: "https://www.radix-ui.com",
    tags: ["React", "Accessible", "Headless"],
    type: "Headless",
  },
  {
    name: "Ant Design",
    description:
      "An enterprise-class UI design language and React UI library with a set of high-quality components.",
    url: "https://ant.design",
    tags: ["React", "Enterprise", "Full-featured"],
    type: "Full-featured",
  },
  {
    name: "Next UI",
    description:
      "Beautiful, fast and modern React UI library that works with Next.js and Tailwind CSS.",
    url: "https://nextui.org",
    tags: ["React", "Next.js", "Tailwind CSS"],
    type: "Full-featured",
  },
  {
    name: "Mantine",
    description:
      "A fully featured React components library with 100+ customizable components and hooks.",
    url: "https://mantine.dev",
    tags: ["React", "Typescript", "Themeable"],
    type: "Full-featured",
  },
  {
    name: "Daisy UI",
    description:
      "Clean and modular components plugin for Tailwind CSS with semantic class names.",
    url: "https://daisyui.com",
    tags: ["Tailwind CSS", "Themeable"],
    type: "Utility-first",
  },
  {
    name: "PrimeReact",
    description:
      "Rich set of open source UI components for React with multiple themes and templates.",
    url: "https://primereact.org",
    tags: ["React", "Enterprise", "Themeable"],
    type: "Full-featured",
  },
];

export const projects = [
  {
    "title": "Weather Application",
    "description": "A simple weather app that fetches real-time weather data based on user input.",
    "tags": ["HTML", "CSS", "JavaScript", "API"],
    "difficulty": "Beginner",
    "features": [
      "Fetch weather data from OpenWeather API",
      "Display temperature, humidity, and weather conditions",
      "Search for different cities",
      "Responsive UI for mobile and desktop",
      "Dark mode toggle"
    ]
  },
  {
    "title": "Alarm Clock",
    "description": "A functional alarm clock where users can set alarms and receive notifications.",
    "tags": ["HTML", "CSS", "JavaScript", "LocalStorage"],
    "difficulty": "Beginner",
    "features": [
      "Set multiple alarms",
      "Sound notifications for alarms",
      "Snooze and dismiss options",
      "Save alarms using LocalStorage",
      "Simple UI with a digital clock display"
    ]
  },
  {
    "title": "Typing Speed & Accuracy Trainer",
    "description": "A typing test that tracks users' typing speed and accuracy.",
    "tags": ["HTML", "CSS", "JavaScript"],
    "difficulty": "Beginner",
    "features": [
      "Real-time speed and accuracy calculation",
      "Multiple difficulty levels",
      "Leaderboard to track best scores",
      "Randomized text for each test",
      "Dark mode support"
    ]
  },
  {
    "title": "Customizable Pomodoro Timer",
    "description": "A productivity timer that follows the Pomodoro technique for focused work sessions.",
    "tags": ["HTML", "CSS", "JavaScript", "LocalStorage"],
    "difficulty": "Beginner",
    "features": [
      "Set custom work and break durations",
      "Audio alerts when a session ends",
      "Task tracking feature",
      "Dark mode support",
      "Data persistence using LocalStorage"
    ]
  },
  {
    "title": "AI-Free Code Snippet Manager",
    "description": "A lightweight app for saving and managing frequently used code snippets.",
    "tags": ["HTML", "CSS", "JavaScript", "LocalStorage"],
    "difficulty": "Beginner",
    "features": [
      "Save, edit, and delete code snippets",
      "Copy snippets to clipboard",
      "Categorize snippets by language",
      "LocalStorage for persistent storage",
      "Responsive and minimal UI"
    ]
  },
  {
    "title": "Expense Splitter (Bill-Split App)",
    "description": "An app to split expenses among a group of people and track payments.",
    "tags": ["HTML", "CSS", "JavaScript"],
    "difficulty": "Beginner",
    "features": [
      "Add participants and expense details",
      "Calculate who owes whom",
      "Save and view past transactions",
      "Simple and clean UI",
      "Export expense report as a text file"
    ]
  },
  {
    "title": "Real-Time Chat Application",
    "description": "A real-time chat application that allows multiple users to communicate instantly.",
    "tags": ["React", "Firebase", "WebSockets"],
    "difficulty": "Intermediate",
    "features": [
      "Real-time messaging using Firebase or WebSockets",
      "User authentication with Google Sign-In",
      "Support for group chats",
      "Message history and storage",
      "Typing indicator for real-time feedback"
    ]
  },
  {
    "title": "Budget Manager & Expense Tracker",
    "description": "A financial tracking app that helps users manage their income and expenses.",
    "tags": ["React", "LocalStorage", "Charts"],
    "difficulty": "Intermediate",
    "features": [
      "Add and categorize income and expenses",
      "Visualize data using charts",
      "Set monthly budget goals",
      "Dark mode support",
      "Data persistence using LocalStorage"
    ]
  },
  {
    "title": "Issue Tracker & Task Board (Trello Lite)",
    "description": "A kanban-style task management board with drag-and-drop functionality.",
    "tags": ["React", "Redux", "Drag-and-Drop"],
    "difficulty": "Intermediate",
    "features": [
      "Create, edit, and delete tasks",
      "Drag-and-drop tasks between columns",
      "Save task state using LocalStorage",
      "Customizable board with categories",
      "Simple and clean UI"
    ]
  },
  {
    "title": "Dev Community Q&A Forum (Stack Overflow Lite)",
    "description": "A Q&A platform where developers can post and answer questions.",
    "tags": ["React", "Firebase"],
    "difficulty": "Intermediate",
    "features": [
      "Users can post questions and answers",
      "Upvote/downvote system",
      "User authentication",
      "Tag-based filtering",
      "Responsive and minimal UI"
    ]
  },
  {
    "title": "Recipe Sharing Platform",
    "description": "A recipe management app where users can share and discover cooking recipes.",
    "tags": ["React", "LocalStorage", "API"],
    "difficulty": "Intermediate",
    "features": [
      "Add and save custom recipes",
      "Fetch recipes from an API",
      "Filter recipes by ingredients or category",
      "Bookmark favorite recipes",
      "Dark mode support"
    ]
  },
  {
    "title": "E-Learning Course Dashboard",
    "description": "A student dashboard where users can track their progress in online courses.",
    "tags": ["React", "Redux", "LocalStorage"],
    "difficulty": "Intermediate",
    "features": [
      "Track lesson progress",
      "Mark completed lessons",
      "Dark mode support",
      "Simple and responsive UI",
      "Save progress using LocalStorage"
    ]
  },
  {
    "title": "Full E-Commerce Store with Admin Dashboard",
    "description": "A complete e-commerce platform with an admin panel for managing products and orders.",
    "tags": ["MERN", "Stripe", "Authentication"],
    "difficulty": "Advanced",
    "features": [
      "User authentication and authorization",
      "Product management dashboard",
      "Order tracking and checkout system",
      "Stripe integration for payments",
      "Admin panel for managing sales and inventory"
    ]
  },
  {
    "title": "Collaborative Note-Taking App (Google Docs Lite)",
    "description": "A real-time document editor with collaboration features.",
    "tags": ["MERN", "WebSockets", "Quill.js"],
    "difficulty": "Advanced",
    "features": [
      "Real-time editing with multiple users",
      "Autosave feature",
      "User authentication",
      "Document sharing via links",
      "Minimalist UI for focus mode"
    ]
  },
  {
    "title": "Delivery Route Optimization System",
    "description": "An app that calculates the best delivery routes based on distance and traffic.",
    "tags": ["MERN", "Google Maps API"],
    "difficulty": "Advanced",
    "features": [
      "Calculate shortest route for deliveries",
      "Google Maps API for real-time traffic",
      "Admin dashboard for managing deliveries",
      "Live tracking of delivery vehicles",
      "Optimized for mobile and desktop"
    ]
  },
  {
    "title": "Custom URL Shortener & Analytics Tool",
    "description": "A backend-powered URL shortener with click analytics.",
    "tags": ["MERN", "Redis", "Prisma"],
    "difficulty": "Advanced",
    "features": [
      "Generate short links",
      "Track number of clicks per link",
      "Admin panel for managing links",
      "User authentication",
      "Custom branding for short URLs"
    ]
  },
  {
    "title": "Dynamic Event Ticket Booking System",
    "description": "A ticket booking system for managing events with real-time seat availability.",
    "tags": ["MERN", "Stripe"],
    "difficulty": "Advanced",
    "features": [
      "Real-time seat booking",
      "Payment integration with Stripe",
      "Event dashboard for organizers",
      "User authentication",
      "QR code ticket generation"
    ]
  }
]

export const templates = [
  {
    name: "HTML5 UP",
    description: "Makes spiffy HTML5 site templates",
    category: "HTML",
    image: HTML5UP,
    url: "https://html5up.net/",
    tags: ["HTML5", "CSS3", "Minimal", "Responsive"],
  },
  {
    name: "CoreUI React",
    description: "Free React Admin Dashboard Template",
    category: "React",
    image: COREUIREACT,
    url: "https://coreui.io/product/free-react-admin-template/#live-preview",
    tags: ["Dashboard", "React", "Modern"],
  },
  {
    name: "Evolo",
    description: "Startup website template with animated sections",
    category: "Next.js",
    image: NEXTECOMMERCE,
    url: "https://github.com/lucaspulliese/next-ecommerce",
    tags: ["Ecommerce", "NextJs"],
  },
];

export const mainRoadmap: MainRoadmapPhase[] = [
  {
    phase: "Foundations (Beginner Level)",
    goal: "Understand the basics of web development, version control, and deployment.",
    skills: ["HTML", "CSS", "Git", "Command Line", "Deployment"],
    topics: [
      {
        name: "Learn HTML (Structure of Web Pages)",
        resources: [
          {
            title: "MDN HTML Guide",
            link: "https://developer.mozilla.org/en-US/docs/Web/HTML",
          },
          {
            title: "HTML Full Course – FreeCodeCamp",
            link: "https://youtu.be/kUMe1FH4CHE",
          },
          {
            title: "HTML Crash Course – Traversy Media",
            link: "https://youtu.be/qz0aGYrrlhU",
          },
          {
            title: "HTML cheatsheet", 
            link: "https://quickref.me/html.html"
          }
        ],
        keyTopics: [
          "Basic Structure (<!DOCTYPE html>, <html>, <head>, <body>)",
          "Semantic Tags (<header>, <nav>, <main>, <section>, <article>, <footer>)",
          "Forms & Inputs (<form>, <input>, <select>, <textarea>, <button>)",
          "Tables (<table>, <thead>, <tbody>, <tr>, <td>, <th>)",
          "Links & Media (<a>, <img>, <video>, <audio>)",
        ],
        practiceTask:
          "Create a Personal Portfolio Page with a navbar, bio section, skills table, and contact form.",
      },
      {
        name: "Learn CSS (Styling the Web)",
        resources: [
          {
            title: "MDN CSS Guide",
            link: "https://developer.mozilla.org/en-US/docs/Web/CSS",
          },
          {
            title: "CSS Crash Course – Traversy Media",
            link: "https://youtu.be/yfoY53QXEnI",
          },
          {
            title: "CSS Grid & Flexbox – Kevin Powell",
            link: "https://www.youtube.com/watch?v=3elGSZSWTbM",
          },
        ],
        keyTopics: [
          "Box Model (margin, padding, border, width, height)",
          "CSS Selectors (class, id, nth-child)",
          "Flexbox & Grid (Layouts & Positioning)",
          "Responsive Design (media queries, vw, vh, rem, em)",
          "Animations & Transitions (keyframes, transform)",
        ],
        practiceTask: "Recreate the Netflix Homepage using only HTML & CSS.",
      },
      {
        name: "Introduction to Git & Deployment (Version Control & Hosting)",
        resources: [
          {
            title: "Git & GitHub Crash Course – Traversy Media",
            link: "https://youtu.be/RGOj5yH7evk",
          },
          {
            title: "GitHub Docs",
            link: "https://docs.github.com/en/get-started",
          },
          {
            title: "Deploy Github Project on Netlify", 
            link: "https://www.youtube.com/watch?v=J-DNqmhi2eg"
          },
          {
            title: "Deploy Websites with Vercel",
            link: "https://vercel.com/docs",
          },
        ],
        keyTopics: [
          "Git Basics (git init, git add, git commit, git push)",
          "Branching (git branch, git checkout, git merge)",
          "GitHub Basics (Creating Repositories, Pull Requests, Issues)",
          "Deployment (Hosting websites on Vercel or Netlify)",
        ],
        practiceTask:
          "Push your Portfolio Page & Netflix Clone to GitHub and deploy them on Vercel/Netlify.",
      },
    ],
  },
  {
    phase: "JavaScript (Making Web Pages Interactive)",
    goal: "Learn JavaScript fundamentals and DOM manipulation.",
    skills: ["JavaScript", "ES6+", "DOM Manipulation", "APIs"],
    topics: [
      {
        name: "Learn JavaScript (Fundamentals)",
        resources: [
          {
            title: "MDN Docs JavaScript",
            link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
          },
          {
            title: "JavaScript Crash Course – Traversy Media",
            link: "https://youtu.be/hdI2bqOjy3c",
          },
        ],
        keyTopics: [
          "Variables (let, const, var)",
          "Data Types (string, number, boolean, array, object)",
          "Functions (function, arrow functions, callback functions)",
          "Loops (for, while, do while)",
          "Conditional Statements (if-else, switch)",
          "Events & DOM Manipulation (getElementById, querySelector, addEventListener)",
        ],
        practiceTask:
          "Build a To-Do List App where users can add & remove tasks, stored in local storage.",
      },
      {
        name: "Advanced JavaScript (Deep Dive into JS)",
        resources: [
          {
            title: "JavaScript.info (Advanced)",
            link: "https://javascript.info/",
          },
          {
            title: "Asynchronous JavaScript Course",
            link: "https://youtu.be/ZYb_ZU8LNxs",
          },
        ],
        keyTopics: [
          "Higher-Order Functions (map, filter, reduce)",
          "Closures & Hoisting",
          "Promises & Async/Await",
          "Event Loop & Callback Queue",
          "Fetch API & API Calls",
        ],
        practiceTask:
          "Build a Weather App using OpenWeather API to fetch live weather data.",
      },
    ],
  },
  {
    phase: "Modern CSS & Frameworks",
    goal: "Learn modern styling frameworks to improve UI/UX.",
    skills: ["Tailwind CSS", "Component-Based Styling"],
    topics: [
      {
        name: "Learn Tailwind CSS (Utility-First CSS Framework)",
        resources: [
          { title: "Tailwind CSS Docs", link: "https://tailwindcss.com/docs" },
          {
            title: "Tailwind CSS Crash Course – Traversy Media",
            link: "https://youtu.be/dFgzHOX84xQ",
          },
        ],
        keyTopics: [
          "Utility-First Approach (flex, grid, text-xl, bg-gray-500)",
          "Responsive Design with Tailwind",
          "Dark Mode & Theming",
          "Tailwind Components (Buttons, Cards, Forms)",
        ],
        practiceTask:
          "Recreate a Pricing Page using Tailwind with dark mode support.",
      },
    ],
  },
  {
    phase: "Frontend Frameworks (React.js)",
    goal: "Learn React.js to build scalable frontend applications.",
    skills: ["React", "Hooks", "React Router", "API Integration"],
    topics: [
      {
        name: "Learn React.js (Component-Based UI Framework)",
        resources: [
          { title: "React Docs", link: "https://react.dev/" },
          {
            title: "React Crash Course – Traversy Media",
            link: "https://www.youtube.com/watch?v=LDB4uaJ87e0&t=2465s",
          },
        ],
        keyTopics: [
          "JSX & Components",
          "Props & State",
          "React Hooks (useState, useEffect, useContext)",
          "React Router (Navigation)",
          "API Calls with Axios/Fetch",
        ],
        practiceTask:
          "Build a Movie Search App using React & API where users can search for movies.",
      },
    ],
  },
  {
    phase: "Backend Foundations",
    goal: "Understand the fundamentals of backend development and server-side programming.",
    skills: ["Node.js", "Express.js", "REST APIs"],
    topics: [
      {
        name: "Introduction to Backend Development",
        resources: [
          { title: "Node.js Docs", link: "https://nodejs.org/en/docs/" },
          { title: "Express.js Docs", link: "https://expressjs.com/en/guide/routing.html" },
          { title: "Node.js Crash Course – Traversy Media", link: "https://youtu.be/f2EqECiTBL8" },
        ],
        keyTopics: [
          "What is a Backend?",
          "Setting up a Node.js server",
          "Express.js Basics (Middleware, Routing, Request Handling)",
          "Working with REST APIs",
        ],
        practiceTask: "Create a basic Express server with routes for users and products.",
      },
    ],
  },
  {
    phase: "Databases",
    goal: "Learn how to store, retrieve, and manage data efficiently.",
    skills: ["MongoDB", "SQL", "ORMs (Mongoose, Prisma)"],
    topics: [
      {
        name: "Database Fundamentals",
        resources: [
          { title: "MongoDB Docs", link: "https://www.mongodb.com/docs/" },
          { title: "SQL Basics", link: "https://sqlzoo.net/" },
          { title: "MongoDB Crash Course – Traversy Media", link: "https://youtu.be/ExcRbA7fy_A" },
        ],
        keyTopics: [
          "SQL vs NoSQL (Differences & Use Cases)",
          "CRUD Operations (Create, Read, Update, Delete)",
          "Mongoose (ODM for MongoDB)",
          "Prisma (ORM for SQL Databases)",
        ],
        practiceTask: "Build a Notes API with CRUD functionality using MongoDB and Mongoose.",
      },
    ],
  },
  {
    phase: "Backend Architecture",
    goal: "Understand scalable backend design patterns and best practices.",
    skills: ["MVC", "Microservices", "Authentication"],
    topics: [
      {
        name: "Backend Architecture & Design Patterns",
        resources: [
          { title: "The Twelve-Factor App", link: "https://12factor.net/" },
          { title: "Microservices – Martin Fowler", link: "https://martinfowler.com/articles/microservices.html" },
          { title: "JWT Authentication – Fireship", link: "https://youtu.be/7Q17ubqLfaM" },
        ],
        keyTopics: [
          "MVC (Model-View-Controller)",
          "Microservices vs Monoliths",
          "Authentication & Authorization (JWT, OAuth)",
          "Caching & Performance Optimization",
        ],
        practiceTask: "Refactor a REST API into an MVC architecture and add JWT authentication.",
      },
    ],
  },
  {
    phase: "Advanced Backend Topics",
    goal: "Learn advanced backend concepts for building high-performance systems.",
    skills: ["GraphQL", "WebSockets", "Message Queues"],
    topics: [
      {
        name: "Optimizing Backend Performance",
        resources: [
          { title: "GraphQL Docs", link: "https://graphql.org/" },
          { title: "WebSockets Guide", link: "https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API" },
          { title: "Message Queues (RabbitMQ, Kafka)", link: "https://www.rabbitmq.com/getstarted.html" },
        ],
        keyTopics: [
          "GraphQL vs REST",
          "Real-time Communication with WebSockets",
          "Message Queues & Background Jobs",
          "Scaling Databases (Sharding, Replication, Indexing)",
        ],
        practiceTask: "Build a real-time chat app using WebSockets and a GraphQL API.",
      },
    ],
  },
];
