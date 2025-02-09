import { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { Route, Blocks, ExternalLink, Library, Search, Layout } from 'lucide-react';
import { Input } from '../components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import HTML5UP from "../assets/html5up.png"
import COREUIREACT from "../assets/coreuireact.png"
import NEXTECOMMERCE from "../assets/next-ecommerce.png"

export function WebDevPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [templateFilter, setTemplateFilter] = useState<string>('all');

  const roadmap = [
    {
      phase: "Fundamentals",
      skills: ["HTML", "CSS", "JavaScript", "Git", "Command Line"],
      resources: "https://roadmap.sh/frontend"
    },
    {
      phase: "Frontend Development",
      skills: ["React", "TypeScript", "Tailwind CSS", "State Management"],
      resources: "https://roadmap.sh/react"
    },
    {
      phase: "Backend Development",
      skills: ["Node.js", "Express", "Databases", "API Design"],
      resources: "https://roadmap.sh/backend"
    }
  ];

  const componentLibraries = [
    {
      name: "Shadcn/UI",
      description: "A collection of beautifully designed components built with Radix UI and Tailwind CSS.",
      url: "https://ui.shadcn.com",
      tags: ["React", "Tailwind CSS", "Radix UI"],
      type: "Utility-first"
    },
    {
      name: "Material-UI (MUI)",
      description: "A comprehensive library of components that implements Google's Material Design.",
      url: "https://mui.com",
      tags: ["React", "Material Design"],
      type: "Full-featured"
    },
    {
      name: "Chakra UI",
      description: "A simple, modular and accessible component library that gives you building blocks to build React applications.",
      url: "https://chakra-ui.com",
      tags: ["React", "Accessible", "Themeable"],
      type: "Full-featured"
    },
    {
      name: "Headless UI",
      description: "Completely unstyled, fully accessible UI components, designed to integrate with Tailwind CSS.",
      url: "https://headlessui.dev",
      tags: ["React", "Vue", "Tailwind CSS"],
      type: "Headless"
    },
    {
      name: "Radix UI",
      description: "Low-level UI component library with a focus on accessibility, customization and developer experience.",
      url: "https://www.radix-ui.com",
      tags: ["React", "Accessible", "Headless"],
      type: "Headless"
    },
    {
      name: "Ant Design",
      description: "An enterprise-class UI design language and React UI library with a set of high-quality components.",
      url: "https://ant.design",
      tags: ["React", "Enterprise", "Full-featured"],
      type: "Full-featured"
    },
    {
      name: "Next UI",
      description: "Beautiful, fast and modern React UI library that works with Next.js and Tailwind CSS.",
      url: "https://nextui.org",
      tags: ["React", "Next.js", "Tailwind CSS"],
      type: "Full-featured"
    },
    {
      name: "Mantine",
      description: "A fully featured React components library with 100+ customizable components and hooks.",
      url: "https://mantine.dev",
      tags: ["React", "Typescript", "Themeable"],
      type: "Full-featured"
    },
    {
      name: "Daisy UI",
      description: "Clean and modular components plugin for Tailwind CSS with semantic class names.",
      url: "https://daisyui.com",
      tags: ["Tailwind CSS", "Themeable"],
      type: "Utility-first"
    },
    {
      name: "PrimeReact",
      description: "Rich set of open source UI components for React with multiple themes and templates.",
      url: "https://primereact.org",
      tags: ["React", "Enterprise", "Themeable"],
      type: "Full-featured"
    }
  ];

  const projects = [
    {
      title: "E-commerce Platform",
      description: "Build a full-featured online store with shopping cart, payment processing, and inventory management.",
      tags: ["React", "Node.js", "PostgreSQL", "Redis"],
      difficulty: "Advanced",
      features: [
        "Product catalog with filters",
        "Shopping cart",
        "User authentication",
        "Order management",
        "Admin dashboard"
      ]
    },
    {
      title: "Real-time Chat Application",
      description: "Create a modern chat application with real-time messaging, file sharing, and group conversations.",
      tags: ["React", "Socket.io", "Node.js", "MongoDB"],
      difficulty: "Intermediate",
      features: [
        "Real-time messaging",
        "File sharing",
        "Group chats",
        "User presence",
        "Message history"
      ]
    },
    {
      title: "Project Management Tool",
      description: "Develop a project management system with task tracking, team collaboration, and reporting features.",
      tags: ["React", "TypeScript", "Node.js", "PostgreSQL"],
      difficulty: "Advanced",
      features: [
        "Task management",
        "Team collaboration",
        "File sharing",
        "Progress tracking",
        "Reporting dashboard"
      ]
    },
    {
      title: "Social Media Dashboard",
      description: "Build a dashboard to manage and analyze social media accounts across multiple platforms.",
      tags: ["React", "Redux", "Node.js", "Chart.js"],
      difficulty: "Intermediate",
      features: [
        "Multi-platform integration",
        "Analytics dashboard",
        "Content scheduling",
        "Engagement tracking",
        "Report generation"
      ]
    },
    {
      title: "Weather Application",
      description: "Create a weather app with location-based forecasts, alerts, and interactive maps.",
      tags: ["HTML", "CSS", "JavaScript", "APIs"],
      difficulty: "Beginner",
      features: [
        "Location-based weather",
        "5-day forecast",
        "Weather alerts",
        "Interactive maps",
        "Unit conversion"
      ]
    }
  ];

  const templates = [
    {
      name: "HTML5 UP",
      description: "Makes spiffy HTML5 site templates",
      category: "HTML",
      image: HTML5UP,
      url: "https://html5up.net/",
      tags: ["HTML5","CSS3","Minimal","Responsive"]
    },
    {
      name: "CoreUI React",
      description: "Free React Admin Dashboard Template",
      category: "React",
      image: COREUIREACT,
      url: "https://coreui.io/product/free-react-admin-template/#live-preview",
      tags: ["Dashboard", "React", "Modern"]
    },
    {
      name: "Evolo",
      description: "Startup website template with animated sections",
      category: "Next.js",
      image: NEXTECOMMERCE,
      url: "https://github.com/lucaspulliese/next-ecommerce",
      tags: ["Ecommerce", "NextJs"]
    }
  ];


  const [libraryTypeFilter, setLibraryTypeFilter] = useState<string>('all');

  const allTags = Array.from(new Set(projects.flatMap(project => project.tags)));

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.every(tag => project.tags.includes(tag));
    const matchesDifficulty = difficultyFilter === 'all' || 
                             project.difficulty.toLowerCase() === difficultyFilter.toLowerCase();
    
    return matchesSearch && matchesTags && matchesDifficulty;
  });

  const libraryTypes = Array.from(new Set(componentLibraries.map(lib => lib.type)));
  const libraryTags = Array.from(new Set(componentLibraries.flatMap(lib => lib.tags)));

  const filteredLibraries = componentLibraries.filter(library => {
    const matchesSearch = library.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         library.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.some(tag => library.tags.includes(tag));
    const matchesType = libraryTypeFilter === 'all' || 
                       library.type === libraryTypeFilter;
    
    return matchesSearch && matchesTags && matchesType;
  });


  const templateCategories = Array.from(new Set(templates.map(template => template.category)));
  const templateTags = Array.from(new Set(templates.flatMap(template => template.tags)));

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.some(tag => template.tags.includes(tag));
    const matchesCategory = templateFilter === 'all' || 
                          template.category === templateFilter;
    
    return matchesSearch && matchesTags && matchesCategory;
  });

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">Web Development</h1>
      
      <Tabs defaultValue="roadmap">
        <TabsList className="mb-6">
          <TabsTrigger value="roadmap">
            <Route className="w-4 h-4 mr-2" />
            Learning Roadmap
          </TabsTrigger>
          <TabsTrigger value="projects">
            <Blocks className="w-4 h-4 mr-2" />
            Project Ideas
          </TabsTrigger>
          <TabsTrigger value="libraries">
            <Library className="w-4 h-4 mr-2" />
            Component Libraries
          </TabsTrigger>
          <TabsTrigger value="templates">
            <Layout className="w-4 h-4 mr-2" />
            Templates
          </TabsTrigger>
        </TabsList>

        <TabsContent value="roadmap">
          <div className="grid gap-6">
            {roadmap.map((phase) => (
              <Card key={phase.phase} className="p-6">
                <h2 className="text-2xl font-semibold mb-4">{phase.phase}</h2>
                <div className="flex flex-wrap gap-2 mb-4">
                  {phase.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">{skill}</Badge>
                  ))}
                </div>
                <Button variant="outline" asChild>
                  <a href={phase.resources} target="_blank" rel="noopener noreferrer">
                    View Detailed Roadmap
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="projects">
          <div className="mb-6 space-y-4">
            <div className="flex gap-4 items-center">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search projects..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <Select
                value={difficultyFilter}
                onValueChange={setDifficultyFilter}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-wrap gap-2">
              {allTags.map(tag => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => {
                    setSelectedTags(prev =>
                      prev.includes(tag)
                        ? prev.filter(t => t !== tag)
                        : [...prev, tag]
                    );
                  }}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid gap-6">
            {filteredProjects.map((project) => (
              <Card key={project.title} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  <Badge className={
                    project.difficulty === "Advanced" ? "bg-red-100 text-red-800" :
                    project.difficulty === "Intermediate" ? "bg-yellow-100 text-yellow-800" :
                    "bg-green-100 text-green-800"
                  }>{project.difficulty}</Badge>
                </div>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Key Features:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {project.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="outline">{tag}</Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="libraries">
        <div className="mb-6 space-y-4">
          <div className="flex gap-4 items-center">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search libraries..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <Select
              value={libraryTypeFilter}
              onValueChange={setLibraryTypeFilter}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {libraryTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-wrap gap-2">
            {libraryTags.map(tag => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => {
                  setSelectedTags(prev =>
                    prev.includes(tag)
                      ? prev.filter(t => t !== tag)
                      : [...prev, tag]
                  );
                }}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLibraries.map((library) => (
            <Card key={library.name} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-semibold">{library.name}</h3>
                <Badge>{library.type}</Badge>
              </div>
              <p className="text-muted-foreground mb-4">{library.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {library.tags.map((tag) => (
                  <Badge key={tag} variant="outline">{tag}</Badge>
                ))}
              </div>
              <Button variant="outline" asChild className="w-full">
                <a href={library.url} target="_blank" rel="noopener noreferrer">
                  View Documentation
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </Card>
          ))}
        </div>
        </TabsContent>

        <TabsContent value="templates">
          <div className="mb-6 space-y-4">
            <div className="flex gap-4 items-center">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search templates..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <Select
                value={templateFilter}
                onValueChange={setTemplateFilter}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {templateCategories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-wrap gap-2">
              {templateTags.map(tag => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => {
                    setSelectedTags(prev =>
                      prev.includes(tag)
                        ? prev.filter(t => t !== tag)
                        : [...prev, tag]
                    );
                  }}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <Card key={template.name} className="overflow-hidden">
                <div className="aspect-video w-full overflow-hidden">
                  <img 
                    src={template.image} 
                    alt={template.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-semibold">{template.name}</h3>
                    <Badge>{template.category}</Badge>
                  </div>
                  <p className="text-muted-foreground mb-4">{template.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {template.tags.map((tag) => (
                      <Badge key={tag} variant="outline">{tag}</Badge>
                    ))}
                  </div>
                  <Button variant="outline" asChild className="w-full">
                    <a href={template.url} target="_blank" rel="noopener noreferrer">
                      View Template
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default WebDevPage;
