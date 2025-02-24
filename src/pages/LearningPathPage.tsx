import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, BookOpen, Link as LinkIcon, Code } from "lucide-react";
import { useEffect, useState } from "react";
import { backendURL } from "@/data/data";
import { ClipLoader } from "react-spinners";

interface Resource {
  id: string;
  title: string;
  link: string;
  lessonId: string;
  createdAt: string;
  updatedAt: string;
}

interface KeyTopic {
  id: string;
  content: string;
  lessonId: string;
  createdAt: string;
  updatedAt: string;
}

interface Lesson {
  id: string;
  name: string;
  phaseId: string;
  practiceTask: string;
  createdAt: string;
  updatedAt: string;
  resources: Resource[];
  keyTopics: KeyTopic[];
}

interface PhaseData {
  id: string;
  phase: string;
  description: string;
  roadmapId: string;
  pathId: string;
  createdAt: string;
  updatedAt: string;
  lessons: Lesson[];
}

interface Topic {
  name: string;
  keyTopics: string[];
  resources: Resource[];
  practiceTask: string;
}

export function LearningPathPage() {
  const { pathId } = useParams<{ pathId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [phaseData, setPhaseData] = useState<PhaseData | null>(null);
  const selectedCategory = location.state?.selectedTab;

  
  useEffect(() => {
    const fetchLessonsData = async () => {
      try {
        const response = await fetch(`${backendURL}/lesson/${pathId}`);
        const data = await response.json() as PhaseData[];
        // Take the first element of the response array
        setPhaseData(data[0]);
      } catch (error) {
        console.error('Error fetching lessons:', error);
      }
    };
    fetchLessonsData();
  }, [pathId]);

  if (!phaseData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-center text-muted-foreground">
        <ClipLoader color="#3498db" size={50} />
        </p>
      </div>
    );
  }

  const topics: Topic[] = phaseData.lessons.map(lesson => ({
    name: lesson.name,
    keyTopics: lesson.keyTopics.map(kt => kt.content),
    resources: lesson.resources,
    practiceTask: lesson.practiceTask
  }));

  return (
    <div className="bg-gradient-to-b from-background to-secondary/20">
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex flex-col gap-10 md:flex-row items-center justify-between mb-8 bg-card p-6 rounded-lg shadow-lg">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              {phaseData.phase}
            </h1>
            <p className="text-muted-foreground mt-2">{phaseData.description}</p>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate("/webdev", {
              state: {selectedCategory}
            })}
            className="gap-2"
          >
            Back to WebDev
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-col gap-5">
          {topics.map((topic, index) => (
            <Card
              key={index}
              className="p-8 transition-all duration-300 hover:shadow-lg"
            >
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                {topic.name}
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3 flex items-center gap-2">
                    <Code className="h-4 w-4" />
                    Key Topics
                  </h4>
                  <ul className="space-y-2">
                    {topic.keyTopics.map((keyTopic, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-medium">{idx + 1}</span>
                        </div>
                        <span className="text-muted-foreground">
                          {keyTopic}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3 flex items-center gap-2">
                    <LinkIcon className="h-4 w-4" />
                    Learning Resources
                  </h4>
                  <ul className="space-y-2">
                    {topic.resources.map((resource, idx) => (
                      <li key={idx}>
                        <a
                          href={resource.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline flex items-center gap-2"
                        >
                          {resource.title}
                          <ChevronRight className="h-4 w-4" />
                        </a>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 p-4 bg-secondary/50 rounded-lg border border-border">
                    <h4 className="font-semibold mb-2">Practice Task:</h4>
                    <p className="text-muted-foreground">
                      {topic.practiceTask}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LearningPathPage;
