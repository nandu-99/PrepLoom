import SkeletonLoader from "@/components/SkeletonLoader";
import { ExternalLink, Github, Heart, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Textarea } from "../components/ui/textarea";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  techStacks: string[];
  tags: string[];
  liveLink?: string;
  projectLink?: string;
  likes: number;
  liked?: boolean;
  user: {
    name: string;
    email: string;
    id?: string;
  };
  createdAt: string;
  isApproved?: boolean;
}

function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"top" | "recent">("recent");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    image: null as File | null,
    imagePreview: "",
    techStacks: [] as string[],
    tags: [] as string[],
    liveLink: "",
    projectLink: "",
    currentTechInput: "",
    currentTagInput: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to access this page.");
      navigate("/auth"); 
    } else {
      fetchProjects(true); 
    }
  }, [filter, navigate]);

  useEffect(() => {
    fetchProjects(true);
  }, [filter]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100 && page < totalPages && !isLoading) {
        fetchProjects(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page, totalPages, isLoading]);

  const fetchProjects = async (reset = false) => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://preploom-users-server.vercel.app/projects/paginated?page=${reset ? 1 : page + 1}&sort=${filter}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch projects");
      const { projects: projectsData, totalPages: total } = await response.json();
      setProjects(prev => reset ? projectsData : [...prev, ...projectsData]);
      setTotalPages(total);
      if (!reset) setPage(prev => prev + 1);
      else setPage(1);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLike = async (projectId: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No authentication token found");
      const project = projects.find((p) => p.id === projectId);
      const method = project?.liked ? "DELETE" : "POST";
      const response = await fetch(
        `https://preploom-users-server.vercel.app/projects/${projectId}/like`,
        { method, headers: { Authorization: `Bearer ${token}` } }
      );
      if (!response.ok) throw new Error("Failed to update like");
      setProjects((prev) =>
        prev.map((p) =>
          p.id === projectId
            ? { ...p, likes: p.liked ? p.likes - 1 : p.likes + 1, liked: !p.liked }
            : p
        )
      );
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    }
  };

  const handleUserClick = (userId?: string) => {
    if (userId) {
      navigate(`/user/${userId}`);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "description" && value.length > 250) return;
    setNewProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const previewUrl = URL.createObjectURL(file);
      setNewProject((prev) => ({
        ...prev,
        image: file,
        imagePreview: previewUrl,
      }));
    }
  };

  const handleTechKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === "Enter" &&
      newProject.currentTechInput.trim() &&
      newProject.techStacks.length < 3
    ) {
      e.preventDefault();
      setNewProject((prev) => ({
        ...prev,
        techStacks: [...prev.techStacks, prev.currentTechInput.trim()],
        currentTechInput: "",
      }));
    }
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === "Enter" &&
      newProject.currentTagInput.trim() &&
      newProject.tags.length < 3
    ) {
      e.preventDefault();
      setNewProject((prev) => ({
        ...prev,
        tags: [...prev.tags, prev.currentTagInput.trim()],
        currentTagInput: "",
      }));
    }
  };

  const removeTech = (techToRemove: string) => {
    setNewProject((prev) => ({
      ...prev,
      techStacks: prev.techStacks.filter((tech) => tech !== techToRemove),
    }));
  };

  const removeTag = (tagToRemove: string) => {
    setNewProject((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No authentication token found");
      const formData = new FormData();
      formData.append("title", newProject.title);
      formData.append("description", newProject.description);
      if (newProject.image) formData.append("image", newProject.image);
      formData.append("techStacks", JSON.stringify(newProject.techStacks));
      formData.append("tags", JSON.stringify(newProject.tags));
      formData.append("liveLink", newProject.liveLink);
      formData.append("githubLink", newProject.projectLink);
      const response = await fetch("https://preploom-users-server.vercel.app/projects", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (!response.ok) throw new Error("Failed to save project");
      const projectData = await response.json();
      const updatedProject = {
        ...projectData,
        techStacks: newProject.techStacks,
        tags: newProject.tags,
        image: projectData.imageUrl || newProject.imagePreview,
        likes: 0,
        liked: false,
      };
      setProjects((prev) => [...prev, updatedProject]);
      toast.success("Project created successfully!");
      setIsSuccessPopupOpen(true);
      resetForm();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    }
  };

  const resetForm = () => {
    setNewProject({
      title: "",
      description: "",
      image: null,
      imagePreview: "",
      techStacks: [],
      tags: [],
      liveLink: "",
      projectLink: "",
      currentTechInput: "",
      currentTagInput: "",
    });
    setIsDialogOpen(false);
  };

  const filteredProjects = projects.filter((project) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      project.title.toLowerCase().includes(searchLower) ||
      project.description.toLowerCase().includes(searchLower) ||
      project.techStacks.some((tech) => tech.toLowerCase().includes(searchLower)) ||
      project.tags.some((tag) => tag.toLowerCase().includes(searchLower)) ||
      project.user.name.toLowerCase().includes(searchLower)
    );
  });

  const approveProject = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`https://preploom-users-server.vercel.app/projects/${id}/approve`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        }
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      await response.json();
      toast.success("Project approved successfully!");
    } catch (error) {
      toast.error("Project approved successfully!");
      console.error("Error approving project:", error);
    }
  };
  return (
    <div className="max-w-6xl mx-auto py-8 px-6 lg:px-8In">
      <div className="flex flex-col items-center gap-4 mb-8">
        <div className="w-full flex flex-col gap-5 md:flex-row justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Community Projects</h1>
            <p className="text-lg text-muted-foreground">Discover and support projects created by others!</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Project
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[90vw] sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Add New Project</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto px-1">
                <div>
                  <Label htmlFor="image">Project Image</Label>
                  {newProject.imagePreview && (
                    <div className="w-full h-32 sm:h-40 mb-2">
                      <img
                        src={newProject.imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                  )}
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={newProject.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="description">
                    Description ({newProject.description.length}/250)
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={newProject.description}
                    onChange={handleInputChange}
                    required
                    className="min-h-[100px]"
                  />
                </div>
                <div>
                  <Label>Tech Stack ({newProject.techStacks.length}/3)</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {newProject.techStacks.map((tech) => (
                      <div
                        key={tech}
                        className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded text-black text-sm"
                      >
                        {tech}
                        <button type="button" onClick={() => removeTech(tech)}>
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <Input
                    name="currentTechInput"
                    value={newProject.currentTechInput}
                    onChange={handleInputChange}
                    onKeyDown={handleTechKeyDown}
                    placeholder="Type tech and press Enter"
                    disabled={newProject.techStacks.length >= 3}
                  />
                </div>
                <div>
                  <Label>Tags ({newProject.tags.length}/3)</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {newProject.tags.map((tag) => (
                      <div
                        key={tag}
                        className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded text-black text-sm"
                      >
                        {tag}
                        <button type="button" onClick={() => removeTag(tag)}>
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <Input
                    name="currentTagInput"
                    value={newProject.currentTagInput}
                    onChange={handleInputChange}
                    onKeyDown={handleTagKeyDown}
                    placeholder="Type tag and press Enter"
                    disabled={newProject.tags.length >= 3}
                  />
                </div>
                <div>
                  <Label htmlFor="liveLink">Live Link</Label>
                  <Input
                    id="liveLink"
                    name="liveLink"
                    value={newProject.liveLink}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="projectLink">GitHub Link (optional)</Label>
                  <Input
                    id="projectLink"
                    name="projectLink"
                    value={newProject.projectLink}
                    onChange={handleInputChange}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Create Project
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <div className="w-full flex gap-4">
          <Input
            placeholder="Search by title, tech, tags, or username..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
          <Select value={filter} onValueChange={(value: "top" | "recent") => setFilter(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Recent</SelectItem>
              <SelectItem value="top">Top</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {isLoading && page === 1 ? (
        <SkeletonLoader />
      ) : filteredProjects.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-muted-foreground text-base">No projects found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className="flex flex-col justify-between overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div>
                <CardHeader className="p-0">
                  <div className="aspect-video">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-600 text-sm">
                        {project.user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <button
                      onClick={() => handleUserClick(project.user.id)}
                      className="text-sm font-medium hover:underline"
                    >
                      {project.user.name}
                    </button>
                  </div>
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <h3 className="text-lg font-semibold line-clamp-1">{project.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                      {project.techStacks.map((tech) => (
                        <span key={tech} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  <p className="text-sm text-muted-foreground mt-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-sm">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  {project.isApproved==false &&
                      <Button onClick={()=>approveProject(project.id)}>
                        Approve
                      </Button>
                  }
                </CardContent>
              </div>
              <CardFooter className="p-4 pt-0 flex justify-between items-center">
                <Button variant="ghost" size="sm" onClick={() => handleLike(project.id)} className="p-1">
                  <Heart className={`w-5 h-5 ${project.liked ? "fill-red-500 text-red-500" : ""}`} />
                  <span className="ml-1 text-sm">{project.likes}</span>
                </Button>
                <div className="flex gap-2">
                  {project.liveLink && (
                    <Button
                      variant="ghost"
                      size="sm"
                      asChild
                      className="rounded-full bg-secondary p-1 w-8 h-8"
                    >
                      <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  )}
                  {project.projectLink && (
                    <Button
                      variant="ghost"
                      size="sm"
                      asChild
                      className="rounded-full bg-secondary p-1 w-8 h-8"
                    >
                      <a href={project.projectLink} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4" />
                      </a>
                    </Button>
                  )}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isSuccessPopupOpen} onOpenChange={setIsSuccessPopupOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Project Added Successfully</DialogTitle>
          </DialogHeader>
          <div className="text-center py-4">
            <p className="text-sm text-muted-foreground">
              Your project has been added successfully! It will be approved within <span className="font-semibold text-primary">12 hours</span> and then visible to all users.
            </p>
          </div>
          <Button onClick={() => setIsSuccessPopupOpen(false)} className="w-full">
            Close
          </Button>
        </DialogContent>
      </Dialog>

      {isLoading && page > 1 && <SkeletonLoader />}
    </div>
  );
}

export default ProjectsPage;
