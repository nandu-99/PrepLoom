import SkeletonLoader from "@/components/SkeletonLoader";
import { ChevronLeft, ExternalLink, Github, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "../components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "../components/ui/card";

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
}

interface UserProfile {
  name: string;
  email: string;
  projects: Project[];
}

function UserProfilePage() {
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { userId } = useParams();

  useEffect(() => {
    fetchUserData();
  }, [userId]);

  const fetchUserData = async () => {
    try {
      const response = await fetch(
        `https://preploom-users-server.vercel.app/projects/user/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch user data");
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLike = async (projectId: string) => {
    setUserData((prev) =>
        prev
          ? {
              ...prev,
              projects: prev.projects.map((p) =>
                p.id === projectId
                  ? {
                      ...p,
                      likes: p.liked ? p.likes - 1 : p.likes + 1,
                      liked: !p.liked,
                    }
                  : p
              ),
            }
          : null
      );
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No authentication token found");
      const project = userData?.projects.find((p) => p.id === projectId);
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

  if (isLoading) return <SkeletonLoader />;

  if (!userData) return <div className="text-center py-10">User not found</div>;

  return (
    <div className="max-w-6xl mx-auto py-8 px-6 lg:px-8">
      <div className="flex flex-col md:flex-row items-center gap-6 mb-8 border p-4 shadow-md rounded-lg">
        <Button
          variant="ghost"
          onClick={() => window.history.back()}
          className="p-2"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
          <span className="text-gray-600 text-2xl">
            {userData.name?.charAt(0).toUpperCase()}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">{userData.name}</h1>
          <p className="text-muted-foreground">{userData.email}</p>
          <p className="text-muted-foreground">
            {userData.projects?.length} Project
            {userData.projects.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {userData.projects.map((project) => (
          <Card key={project.id} className="flex flex-col overflow-hidden">
            <CardHeader className="p-0">
              <div className="aspect-video">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
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
            </CardContent>
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
    </div>
  );
}

export default UserProfilePage;
