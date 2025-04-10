import SkeletonLoader from "@/components/SkeletonLoader";
import {
  ChevronLeft,
  Edit,
  ExternalLink,
  Github,
  Heart,
  MoreVertical,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "../components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Textarea } from "../components/ui/textarea";

interface User {
  id: string;
  name: string;
  email: string;
}
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
  isApproved: boolean;
}

export function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false)
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

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No authentication token found");
      const userResponse = await fetch("https://preploom-users-server.vercel.app/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!userResponse.ok) throw new Error("Failed to fetch user data");
      const userData = await userResponse.json();
      setUser(userData);
      const projectsResponse = await fetch("https://preploom-users-server.vercel.app/projects", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!projectsResponse.ok) throw new Error("Failed to fetch projects");
      const projectsData = await projectsResponse.json();
      setProjects(projectsData.map((p: Project) => ({ ...p })));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
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
      setIsSubmitting(true);
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
      const url = editingProject
        ? `https://preploom-users-server.vercel.app/projects/${editingProject.id}`
        : "https://preploom-users-server.vercel.app/projects";
      const method = editingProject ? "PUT" : "POST";
      const response = await fetch(url, {
        method,
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
        likes: editingProject ? editingProject.likes : 0,
        liked: editingProject ? editingProject.liked : false,
      };
      if (editingProject) {
        setProjects((prev) =>
          prev.map((p) => (p.id === editingProject.id ? updatedProject : p))
        );
        toast.success("Project updated successfully!");
      } else {
        setProjects((prev) => [...prev, updatedProject]);
        toast.success("Project created successfully!");
      }
      setIsSuccessPopupOpen(true);
      resetForm();
      setIsSubmitting(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
      setIsSubmitting(false);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setNewProject({
      title: project.title,
      description: project.description,
      image: null,
      imagePreview: project.image,
      techStacks: project.techStacks,
      tags: project.tags,
      liveLink: project.liveLink || "",
      projectLink: project.projectLink || "",
      currentTechInput: "",
      currentTagInput: "",
    });
    setIsDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!projectToDelete) return;
    try {
      setIsDeleting(true)
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No authentication token found");
      const response = await fetch(
        `http://localhost:3005/projects/${projectToDelete}`,
        { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
      );
      if (!response.ok) throw new Error("Failed to delete project");
      setProjects((prev) => prev.filter((p) => p.id !== projectToDelete));
      toast.success("Project deleted successfully!");
      setIsDeleteDialogOpen(false);
      setProjectToDelete(null);
      setIsDeleting(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    }
  };

  const handleDelete = (projectId: string) => {
    setProjectToDelete(projectId);
    setIsDeleteDialogOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    toast.success("Logged out successfully!");
  };

  const handleLike = async (projectId: string) => {
    setProjects((prev) =>
    prev.map((p) =>
      p.id === projectId
        ? {
            ...p,
            likes: p.liked ? p.likes - 1 : p.likes + 1,
            liked: !p.liked,
          }
        : p
    )
  );
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
    setEditingProject(null);
    setIsDialogOpen(false);
  };

  if (!user && !isLoading)
    return (
      <div className="text-center py-10">
        Please log in to view your profile
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto py-4 sm:py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 sm:gap-0">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <Button
            variant="ghost"
            onClick={() => window.history.back()}
            className="p-2"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold truncate">
            Hello, {user?.name}!
          </h1>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto">
                <Plus className="w-4 h-4 mr-2" />
                Add Project
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[90vw] sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>
                  {editingProject ? "Edit Project" : "Add New Project"}
                </DialogTitle>
              </DialogHeader>
              <form
                onSubmit={handleSubmit}
                className="space-y-4 max-h-[70vh] overflow-y-auto px-1"
              >
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
                {isSubmitting
                  ? editingProject
                    ? "Updating..."
                    : "Creating..."
                  : editingProject
                  ? "Update Project"
                  : "Create Project"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
          <Button
            variant="secondary"
            className="w-full sm:w-auto"
            onClick={() => {
              handleLogout();
            }}
          >
            Logout
          </Button>
        </div>
      </div>

      <Tabs defaultValue="projects" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="projects">Projects</TabsTrigger>
        </TabsList>
        <TabsContent value="projects">
          {isLoading ? (
            <SkeletonLoader />
          ) : projects.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-muted-foreground text-sm sm:text-base">
                No projects found. Start by adding your first project!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {projects.map((project) => (
                <Card
                  key={project.id}
                  className="flex flex-col justify-between overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div>
                    <CardHeader className="p-0 relative">
                      <div className="aspect-video">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute top-2 right-2 bg-secondary border rounded-full p-0 w-8 h-8"
                          >
                            <MoreVertical className="w-5 h-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(project)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(project.id)}
                          >
                            <Trash2 className="w-4 h-4 mr-2 text-red-500" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between gap-4 flex-wrap">
                        <h3 className="text-lg font-semibold line-clamp-1">
                          {project.title}
                        </h3>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                          {project.techStacks.map((tech) => (
                            <span
                              key={tech}
                              className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {project.tags.map((tag) => (
                          <span key={tag} className="text-sm">
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <div className="mt-2">
                        <span
                          className={`inline-block px-2 py-1 text-xs font-semibold rounded-full 
                            ${project.isApproved 
                              ? "bg-green-100 text-green-700" 
                              : "bg-yellow-100 text-yellow-700"}`}
                        >
                          {project.isApproved ? "Approved" : "Pending Approval"}
                        </span>
                      </div>
                    </CardContent>
                  </div>
                  <CardFooter className="p-4 pt-0 flex justify-between items-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(project.id)}
                      className="p-1"
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          project.liked ? "fill-red-500 text-red-500" : ""
                        }`}
                      />
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
                          <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
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
                          <a
                            href={project.projectLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
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
        </TabsContent>
      </Tabs>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-[90vw] sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p className="text-sm sm:text-base">
            Are you sure you want to delete this project? This action is
            irreversible.
          </p>
          <DialogFooter className="mt-4 flex flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteConfirm}
              className="w-full sm:w-auto"
            >
              {
                isDeleting ? (
                  "Deleting..."
                ) : (
                  "Delete"
                )
              }
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
    </div>
  );
}
