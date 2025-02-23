import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Topic } from "@/types/types";
import { backendURL } from "@/data/data";

type Difficulty = "Easy" | "Medium" | "Hard" | 'easy' | 'medium' | 'hard' ;

const InterviewPrepPage = () => {
  const { categoryPathId, topicPathId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<
    "all" | Difficulty
  >("all");
  const [openQuestions, setOpenQuestions] = useState<string[]>([]);
  const [topic, setTopic] = useState<Topic | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const selectedCategory = location.state?.selectedCategory || categoryPathId;
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const response = await fetch(
          `${backendURL}/categories/${categoryPathId}/topics/${topicPathId}`
        );
        if (!response.ok) {
          throw new Error("Topic not found");
        }
        const data = await response.json();
        setTopic(data.topics[0]);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching topic:", error);
        setError("Failed to load topic due to a network error.");
        setIsLoading(false);
      }
    };

    if (categoryPathId && topicPathId) {
      fetchTopic();
    }
  }, [categoryPathId, topicPathId]);

  if (error) {
  return (
    <Card className="max-w-lg mx-auto mt-8 p-6">
      <CardContent className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Error</h2>
        <p className="text-muted-foreground mb-6">{error}</p>
        <Button onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </CardContent>
    </Card>
  );
}

  if (isLoading) {
    return (
      <div className="text-center mt-8">
        Loading...
      </div>
    );
  }

  if (!topic) {
    return (
      <Card className="max-w-lg mx-auto mt-8 p-6">
        <CardContent className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Topic Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The requested topic could not be found.
          </p>
          <Button
            onClick={() =>
              navigate("/interview", { state: { selectedCategory } })
            }
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Return to Topics
          </Button>
        </CardContent>
      </Card>
    );
  }

  const filteredQuestions = topic.questions.filter((question) => {
    const matchesSearch = question.question
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesDifficulty =
      selectedDifficulty === "all" ||
      question.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();
    return matchesSearch && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: Difficulty): string => {
    const colors: Record<Difficulty, string> = {
      Easy: "bg-green-100 text-green-800",
      Medium: "bg-yellow-100 text-yellow-800",
      Hard: "bg-red-100 text-red-800",
      easy: "bg-green-100 text-green-800",
      medium: "bg-yellow-100 text-yellow-800",
      hard: "bg-red-100 text-red-800",
    };
    return colors[difficulty] || "bg-gray-100 text-gray-800";
  };

  const toggleAllQuestions = () => {
    if (openQuestions.length === filteredQuestions.length) {
      setOpenQuestions([]);
    } else {
      setOpenQuestions(
        filteredQuestions.map((_, index) => `question-${index}`)
      );
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                navigate("/interview", { state: { selectedCategory } })
              }
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-3xl font-bold">{topic.title}</h1>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchQuery(e.target.value)
                }
                className="pl-8"
              />
            </div>
            <Select
              value={selectedDifficulty}
              onValueChange={(value: "all" | Difficulty) =>
                setSelectedDifficulty(value)
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Difficulties</SelectItem>
                <SelectItem value="Easy">Easy</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-end mb-4">
        <Button onClick={toggleAllQuestions} variant="outline">
          {openQuestions.length === filteredQuestions.length
            ? "Collapse All"
            : "Expand All"}
        </Button>
      </div>
      {filteredQuestions.length === 0 ? (
        <div className="text-center text-gray-500 mt-6">
          No questions found matching your criteria.
        </div>
      ) : (
        <Accordion
          type="multiple"
          value={openQuestions}
          onValueChange={setOpenQuestions}
          className="space-y-4"
        >
          {filteredQuestions.map((question, index) => (
            <AccordionItem key={question.id} value={`question-${index}`}>
              <AccordionTrigger className="flex justify-between items-center">
                <div className="flex justify-between w-full mr-5 text-lg font-semibold">
                  {index + 1}. {question.question}
                  <Badge className={getDifficultyColor(question.difficulty)}>
                    {question.difficulty}
                  </Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4">
                <p className="mb-4">{question.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
};

export default InterviewPrepPage;
