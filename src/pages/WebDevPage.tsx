import { useEffect, useState } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";
import {
  Route,
  Blocks,
  ExternalLink,
  Library,
  Search,
  Layout,
  Bookmark,
} from "lucide-react";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { useLocation, useNavigate } from "react-router-dom";
import { backendURL } from "@/data/data";
import { ClipLoader } from "react-spinners";
import { usefulWebsites } from "@/data/data";
import SkeletonLoader from "@/components/SkeletonLoader";

// Define types
interface Phase {
  phase: string;
  description: string;
  skills: string[];
  pathId: string;
}

interface Roadmap {
  [key: string]: Phase[];
}

interface Project {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  features: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

interface ComponentLibrary {
  id: string;
  name: string;
  description: string;
  type: string;
  tags: string[];
  url: string;
  createdAt: string;
  updatedAt: string;
}

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  image: string;
  url: string;
  createdAt: string;
  updatedAt: string;
}

interface UsefulWebsite {
  name: string;
  description: string;
  url: string;
  image: string;
}

export function WebDevPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  const [templateFilter, setTemplateFilter] = useState<string>("all");
  const [libraryTypeFilter, setLibraryTypeFilter] = useState<string>("all");
  const [selectedTab, setSelectedTab] = useState<string>(""); // Initially empty, set by effect
  const [roadmapData, setRoadmapData] = useState<Roadmap>({});
  const [componentLibraries, setComponentLibraries] = useState<ComponentLibrary[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [librariesLoading, setLibrariesLoading] = useState<boolean>(true);
  const [librariesError, setLibrariesError] = useState<string | null>(null);
  const [projectsLoading, setProjectsLoading] = useState<boolean>(true);
  const [projectsError, setProjectsError] = useState<string | null>(null);
  const [templatesLoading, setTemplatesLoading] = useState<boolean>(true);
  const [templatesError, setTemplatesError] = useState<string | null>(null);
  const [availableTabs, setAvailableTabs] = useState<string[]>([]);
  const [tabsLoading, setTabsLoading] = useState<boolean>(true);

  // Fetch available tabs and set selectedTab based on location.state
  useEffect(() => {
    const fetchTabs = async () => {
      try {
        setTabsLoading(true);
        const response = await fetch(`${backendURL}/roadmap/tabs`);
        if (!response.ok) throw new Error("Failed to fetch tabs");
        const tabsData: string[] = await response.json();
        setAvailableTabs(tabsData);

        // Use location.state.selectedTab if it exists and is valid, otherwise fallback
        const stateTab = location.state?.selectedCategory;
        const initialTab = stateTab && tabsData.includes(stateTab) ? stateTab : tabsData[0] || "frontend";
        setSelectedTab(initialTab);
      } catch (err) {
        console.error("Error fetching tabs:", err);
        setAvailableTabs(["frontend"]);
        setSelectedTab("frontend");
        setError("Failed to load roadmap tabs. Showing default option.");
      } finally {
        setTabsLoading(false);
      }
    };

    fetchTabs();
  }, [location.state]); // Re-run if location.state changes

  // Fetch roadmap data
  useEffect(() => {
    if (!selectedTab || tabsLoading) return;

    const fetchRoadmapData = async () => {
      try {
        setLoading(true);
        const roadmapResponse = await fetch(`${backendURL}/roadmap/${selectedTab}`);
        if (!roadmapResponse.ok) throw new Error("Roadmap not found");
        const roadmapData = await roadmapResponse.json();
        const phasesData: { phase: string; description: string; skills: { skill: { name: string } }[]; pathId: string }[] = roadmapData.phases;
        const formattedPhases: Phase[] = phasesData.map((phase) => ({
          phase: phase.phase,
          description: phase.description,
          skills: phase.skills.map((ps) => ps.skill.name),
          pathId: phase.pathId,
        }));
        setRoadmapData((prev) => ({
          ...prev,
          [selectedTab]: formattedPhases,
        }));
        setError(null);
      } catch (err) {
        setError("Failed to fetch roadmap data. Please try again later.");
        console.error("Error fetching roadmap data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmapData();
  }, [selectedTab, tabsLoading]);

  // Fetch component libraries
  useEffect(() => {
    const fetchComponentLibraries = async () => {
      try {
        setLibrariesLoading(true);
        const response = await fetch(`${backendURL}/component-libraries`);
        if (!response.ok) throw new Error("Failed to fetch component libraries");
        const data: ComponentLibrary[] = await response.json();
        setComponentLibraries(data);
        setLibrariesError(null);
      } catch (err) {
        setLibrariesError("Failed to fetch component libraries. Please try again later.");
        console.error("Error fetching component libraries:", err);
      } finally {
        setLibrariesLoading(false);
      }
    };

    fetchComponentLibraries();
  }, []);

  // Fetch projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setProjectsLoading(true);
        const response = await fetch(`${backendURL}/projects`);
        if (!response.ok) throw new Error("Failed to fetch projects");
        const data: Project[] = await response.json();
        setProjects(data);
        setProjectsError(null);
      } catch (err) {
        setProjectsError("Failed to fetch projects. Please try again later.");
        console.error("Error fetching projects:", err);
      } finally {
        setProjectsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Fetch templates
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        setTemplatesLoading(true);
        const response = await fetch(`${backendURL}/templates`);
        if (!response.ok) throw new Error("Failed to fetch templates");
        const data: Template[] = await response.json();
        setTemplates(data);
        setTemplatesError(null);
      } catch (err) {
        setTemplatesError("Failed to fetch templates. Please try again later.");
        console.error("Error fetching templates:", err);
      } finally {
        setTemplatesLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  const allTags: string[] = Array.from(new Set(projects.flatMap((project: Project) => project.tags)));
  const filteredProjects: Project[] = projects.filter((project: Project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTags =
      selectedTags.length === 0 || selectedTags.every((tag) => project.tags.includes(tag));
    const matchesDifficulty =
      difficultyFilter === "all" || project.difficulty.toLowerCase() === difficultyFilter.toLowerCase();

    return matchesSearch && matchesTags && matchesDifficulty;
  });

  const libraryTypes: string[] = Array.from(new Set(componentLibraries.map((lib: ComponentLibrary) => lib.type)));
  const libraryTags: string[] = Array.from(new Set(componentLibraries.flatMap((lib: ComponentLibrary) => lib.tags)));
  const filteredLibraries: ComponentLibrary[] = componentLibraries.filter((library: ComponentLibrary) => {
    const matchesSearch =
      library.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      library.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTags =
      selectedTags.length === 0 || selectedTags.some((tag) => library.tags.includes(tag));
    const matchesType = libraryTypeFilter === "all" || library.type === libraryTypeFilter;

    return matchesSearch && matchesTags && matchesType;
  });

  const templateCategories: string[] = Array.from(new Set(templates.map((template: Template) => template.category)));
  const templateTags: string[] = Array.from(new Set(templates.flatMap((template: Template) => template.tags)));
  const filteredTemplates: Template[] = templates.filter((template: Template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTags =
      selectedTags.length === 0 || selectedTags.some((tag) => template.tags.includes(tag));
    const matchesCategory = templateFilter === "all" || template.category === templateFilter;

    return matchesSearch && matchesTags && matchesCategory;
  });

  const renderRoadmap = () => {
    if (tabsLoading || loading) {
        return <SkeletonLoader variant="roadmap" />;
    }

    if (error) {
      return <div className="text-center text-red-600">{error}</div>;
    }

    if (!roadmapData[selectedTab] || roadmapData[selectedTab].length === 0) {
      return <div className="text-center">No roadmap data available for {selectedTab}.</div>;
    }

    return (
      <div className="space-y-6">
        <div className="grid gap-6">
          {roadmapData[selectedTab].map((phase: Phase) => (
            <Card key={phase.phase} className="p-6">
              <h3 className="text-2xl font-semibold mb-2">{phase.phase}</h3>
              <p className="text-muted-foreground mb-4">{phase.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {phase.skills.map((skill: string) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
              <Button
                variant="outline"
                className="mt-2"
                onClick={() =>
                  navigate(`/webdev/learning-path/${phase.pathId}`, {
                    state: { selectedTab },
                  })
                }
              >
                <span>View Detailed Roadmap</span>
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  const renderSidebar = (): JSX.Element => {
    if (tabsLoading || availableTabs.length === 0 || loading) {
      return (
        <SkeletonLoader variant="sidebar"/>
      );
    }

    return (
      <>
        {/* Mobile Dropdown */}
        <div className="md:hidden mb-6">
          <Select value={selectedTab} onValueChange={setSelectedTab}>
            <SelectTrigger>
              <SelectValue placeholder="Select Roadmap" />
            </SelectTrigger>
            <SelectContent>
              {availableTabs.map((tab) => (
                <SelectItem key={tab} value={tab} className="capitalize">
                  {tab}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Desktop Sidebar */}
        <div className="hidden md:flex md:flex-col w-full h-fit mb-6">
          {availableTabs.map((tab) => (
            <Button
              key={tab}
              variant={selectedTab === tab ? "default" : "outline"}
              className="text-lg flex items-center mb-2 capitalize"
              onClick={() => setSelectedTab(tab)}
            >
              {tab}
            </Button>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="mx-auto p-4 sm:p-6 w-full max-w-[100vw] overflow-x-hidden relative">
      <h1 className="text-2xl sm:text-4xl font-bold mb-6 sm:mb-8">Web Development</h1>

      <Tabs defaultValue="roadmap" className="w-full">
        <TabsList className="mb-6 flex flex-col justify-start sm:flex-row h-auto gap-2 sm:gap-0">
          <TabsTrigger value="roadmap" className="flex-1 sm:flex-none justify-start">
            <Route className="w-4 h-4 mr-2" />
            Learning Roadmap
          </TabsTrigger>
          <TabsTrigger value="projects" className="flex-1 sm:flex-none justify-start">
            <Blocks className="w-4 h-4 mr-2" />
            Project Ideas
          </TabsTrigger>
          <TabsTrigger value="libraries" className="flex-1 sm:flex-none justify-start">
            <Library className="w-4 h-4 mr-2" />
            Component Libraries
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex-1 sm:flex-none justify-start">
            <Layout className="w-4 h-4 mr-2" />
            Templates
          </TabsTrigger>
          <TabsTrigger value="websites" className="flex-1 sm:flex-none justify-start">
            <Bookmark className="w-4 h-4 mr-2" />
            Useful Websites
          </TabsTrigger>
        </TabsList>

        <TabsContent value="roadmap" className="w-full">
          <div className="flex flex-col md:grid md:grid-cols-[200px_1fr] gap-6">
            {renderSidebar()}
            <div>{renderRoadmap()}</div>
          </div>
        </TabsContent>

        <TabsContent value="projects" className="w-full">
          {projectsLoading ? (
            <div className="flex mt-20 h-[70vh] w-[80vw] justify-center z-50">
              <ClipLoader color="#3498db" size={50} />
            </div>
          ) : projectsError ? (
            <div className="text-center text-red-600">{projectsError}</div>
          ) : (
            <>
              <div className="mb-6 space-y-4">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <div className="flex-1 w-full">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search projects..."
                        className="pl-8 w-full"
                        value={searchTerm}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                    <SelectTrigger className="w-full sm:w-[180px]">
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
                  {allTags.map((tag: string) => (
                    <Badge
                      key={tag}
                      variant={selectedTags.includes(tag) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() =>
                        setSelectedTags((prev: string[]) =>
                          prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
                        )
                      }
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {filteredProjects.length === 0 ? (
                <div className="text-center">No projects match your filters.</div>
              ) : (
                <div className="grid grid-cols-1 gap-6">
                  {filteredProjects.map((project: Project) => (
                    <Card key={project.id} className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-xl font-semibold">{project.title}</h3>
                        <Badge
                          className={
                            project.difficulty === "Advanced"
                              ? "bg-red-100 text-red-800"
                              : project.difficulty === "Intermediate"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                          }
                        >
                          {project.difficulty}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-4">{project.description}</p>
                      <div className="mb-4">
                        <h4 className="font-semibold mb-2">Key Features:</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          {project.features.map((feature: string, index: number) => (
                            <li key={index}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag: string) => (
                          <Badge key={tag} variant="outline">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </>
          )}
        </TabsContent>

        <TabsContent value="libraries" className="w-full">
          {librariesLoading ? (
            <div className="flex mt-20 h-[70vh] w-[80vw] justify-center z-50">
              <ClipLoader color="#3498db" size={50} />
            </div>
          ) : librariesError ? (
            <div className="text-center text-red-600">{librariesError}</div>
          ) : (
            <>
              <div className="mb-6 space-y-4">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <div className="flex-1 w-full">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search libraries..."
                        className="pl-8 w-full"
                        value={searchTerm}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  <Select value={libraryTypeFilter} onValueChange={setLibraryTypeFilter}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      {libraryTypes.map((type: string) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-wrap gap-2">
                  {libraryTags.map((tag: string) => (
                    <Badge
                      key={tag}
                      variant={selectedTags.includes(tag) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() =>
                        setSelectedTags((prev: string[]) =>
                          prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
                        )
                      }
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {filteredLibraries.length === 0 ? (
                <div className="text-center">No libraries match your filters.</div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredLibraries.map((library: ComponentLibrary) => (
                    <Card key={library.id} className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-xl font-semibold">{library.name}</h3>
                        <Badge>{library.type}</Badge>
                      </div>
                      <p className="text-muted-foreground mb-4">{library.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {library.tags.map((tag: string) => (
                          <Badge key={tag} variant="outline">
                            {tag}
                          </Badge>
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
              )}
            </>
          )}
        </TabsContent>

        <TabsContent value="templates" className="w-full">
          {templatesLoading ? (
            <div className="flex mt-20 h-[70vh] w-[80vw] justify-center z-50">
              <ClipLoader color="#3498db" size={50} />
            </div>
          ) : templatesError ? (
            <div className="text-center text-red-600">{templatesError}</div>
          ) : (
            <>
              <div className="mb-6 space-y-4">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <div className="flex-1 w-full">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search templates..."
                        className="pl-8 w-full"
                        value={searchTerm}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  <Select value={templateFilter} onValueChange={setTemplateFilter}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {templateCategories.map((category: string) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-wrap gap-2">
                  {templateTags.map((tag: string) => (
                    <Badge
                      key={tag}
                      variant={selectedTags.includes(tag) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() =>
                        setSelectedTags((prev: string[]) =>
                          prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
                        )
                      }
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {filteredTemplates.length === 0 ? (
                <div className="text-center">No templates match your filters.</div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTemplates.map((template: Template) => (
                    <Card key={template.id} className="overflow-hidden">
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
                          {template.tags.map((tag: string) => (
                            <Badge key={tag} variant="outline">
                              {tag}
                            </Badge>
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
              )}
            </>
          )}
        </TabsContent>

        <TabsContent value="websites" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {usefulWebsites.map((website: UsefulWebsite) => (
              <Card key={website.name} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={website.image}
                    alt={website.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{website.name}</h3>
                  <p className="text-muted-foreground mb-4">{website.description}</p>
                  <Button variant="outline" asChild className="w-full">
                    <a href={website.url} target="_blank" rel="noopener noreferrer">
                      Visit Website
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
