import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ExternalLink, Github, Edit, Trash2 } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  techStack: string[];
  tags: string[];
  liveLink?: string;
  projectLink?: string;
}

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (projectId: string) => void;
}

export function ProjectCard({ project, onEdit, onDelete }: ProjectCardProps) {
  return (
    <Card className="p-4 flex flex-col gap-4">
      <div className="aspect-video">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">{project.title}</h3>
        <p className="text-sm text-muted-foreground">{project.description}</p>
        <div className="flex gap-2 mt-2">
          {project.liveLink && (
            <Button variant="outline" size="sm" asChild>
              <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Live Demo
              </a>
            </Button>
          )}
          {project.projectLink && (
            <Button variant="outline" size="sm" asChild>
              <a href={project.projectLink} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" />
                Repository
              </a>
            </Button>
          )}
        </div>
        <div className="flex gap-2 mt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(project)}
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(project.id)}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>
    </Card>
  );
}
