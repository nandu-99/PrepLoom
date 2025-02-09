import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ChevronRight,
  Download,
  Search,
  Code,
  MessageSquare,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

type TabType = "interview" | "challenges";
type TopicKey = "javascript" | "react";

interface Question {
  q: string;
  a: string;
  tags: string[];
}

interface Challenge {
  title: string;
  difficulty: string;
  description: string;
  starterCode: string;
  solution: string;
}

interface Topic {
  title: string;
  pdfUrl: string;
  difficulty: string;
  questionsCount: number;
  questions: Question[];
  challenges: Challenge[];
}

interface Topics {
  [key: string]: Topic;
}

export function InterviewPrepPage(): JSX.Element {
  const [selectedTab, setSelectedTab] = useState<TabType>("interview");
  const [selectedTopic, setSelectedTopic] = useState<TopicKey | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const topics: Topics = {
    javascript: {
      title: "JavaScript",
      pdfUrl: "https://drive.google.com/file/d/1234/view",
      difficulty: "Intermediate",
      questionsCount: 50,
      questions: [
        {
          q: "Explain event delegation in JavaScript",
          a: "Event delegation is a technique where you attach an event listener to a parent element to handle events on its children, even those added dynamically. It's based on event bubbling and can improve performance by reducing the number of event listeners.",
          tags: ["Events", "DOM", "Performance"],
        },
      ],
      challenges: [
        {
          title: "Implement Debounce",
          difficulty: "Medium",
          description:
            "Create a debounce function that delays invoking a function until after wait milliseconds have elapsed since the last time the debounced function was invoked.",
          starterCode:
            "function debounce(func: Function, wait: number) {\n  // Your code here\n}",
          solution:
            "function debounce(func: Function, wait: number) {\n  let timeout: NodeJS.Timeout;\n  return function executedFunction(...args: any[]) {\n    const later = () => {\n      clearTimeout(timeout);\n      func(...args);\n    };\n    clearTimeout(timeout);\n    timeout = setTimeout(later, wait);\n  };\n}",
        },
      ],
    },
    react: {
      title: "React",
      pdfUrl: "https://drive.google.com/file/d/5678/view",
      difficulty: "Advanced",
      questionsCount: 40,
      questions: [
        {
          q: "Explain the Virtual DOM and its benefits",
          a: "Virtual DOM is a lightweight copy of the actual DOM. React uses it to improve performance by minimizing direct manipulation of the DOM. It compares the virtual DOM with the actual DOM and updates only the necessary parts.",
          tags: ["Performance", "Core Concepts", "DOM"],
        },
      ],
      challenges: [
        {
          title: "Build a Custom Hook",
          difficulty: "Hard",
          description:
            "Create a custom hook useLocalStorage that syncs state with localStorage and handles JSON serialization/deserialization automatically.",
          starterCode:
            "function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {\n  // Your code here\n}",
          solution:
            "function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {\n  const [storedValue, setStoredValue] = useState<T>(() => {\n    try {\n      const item = window.localStorage.getItem(key);\n      return item ? JSON.parse(item) : initialValue;\n    } catch (error) {\n      return initialValue;\n    }\n  });\n\n  const setValue = (value: T | ((val: T) => T)) => {\n    try {\n      const valueToStore = value instanceof Function ? value(storedValue) : value;\n      setStoredValue(valueToStore);\n      window.localStorage.setItem(key, JSON.stringify(valueToStore));\n    } catch (error) {\n      console.log(error);\n    }\n  };\n\n  return [storedValue, setValue];\n}",
        },
      ],
    },
  };

  const handleDownloadPDF = (topic: TopicKey): void => {
    alert(`Downloading ${topics[topic].title} materials...`);
  };

  const getFilteredQuestions = (): Question[] => {
    if (!selectedTopic || !topics[selectedTopic]?.questions) return [];

    return topics[selectedTopic].questions.filter((question) => {
      const searchString = searchQuery.toLowerCase();
      return (
        question.q.toLowerCase().includes(searchString) ||
        question.a.toLowerCase().includes(searchString) ||
        question.tags.some((tag) => tag.toLowerCase().includes(searchString))
      );
    });
  };

  const getFilteredChallenges = (): Challenge[] => {
    if (!selectedTopic || !topics[selectedTopic]?.challenges) return [];

    return topics[selectedTopic].challenges.filter((challenge) => {
      const searchString = searchQuery.toLowerCase();
      return (
        challenge.title.toLowerCase().includes(searchString) ||
        challenge.description.toLowerCase().includes(searchString) ||
        challenge.difficulty.toLowerCase().includes(searchString)
      );
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Technical Practice Hub</h1>

      <Tabs
        defaultValue="interview"
        className="mb-6"
        onValueChange={(value: string) => setSelectedTab(value as TabType)}
      >
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="interview">
            <MessageSquare className="w-4 h-4 mr-2" />
            Interview Questions
          </TabsTrigger>
          <TabsTrigger value="challenges">
            <Code className="w-4 h-4 mr-2" />
            Coding Challenges
          </TabsTrigger>
        </TabsList>

        <div className="grid md:grid-cols-[300px,1fr] gap-6">
          <div className="space-y-4">
            <div className="sticky top-4">
              {(Object.entries(topics) as [TopicKey, Topic][]).map(
                ([key, topic]) => (
                  <Card key={key} className="mb-4 overflow-hidden">
                    <div className="flex flex-col">
                      <Button
                        variant={selectedTopic === key ? "default" : "ghost"}
                        className="w-full justify-start rounded-none h-auto py-4"
                        onClick={() => setSelectedTopic(key)}
                      >
                        <ChevronRight className="w-4 h-4 mr-2" />
                        <div className="flex flex-col items-start">
                          <span className="font-semibold">{topic.title}</span>
                          <span className="text-xs text-muted-foreground">
                            {selectedTab === "interview"
                              ? `${topic.questionsCount} questions`
                              : `${topic.challenges.length} challenges`}
                          </span>
                        </div>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start rounded-none border-t"
                        onClick={() => handleDownloadPDF(key)}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download PDF
                      </Button>
                    </div>
                  </Card>
                )
              )}
            </div>
          </div>

          <div className="space-y-4">
            <TabsContent value="interview">
              {selectedTopic ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Search className="w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search questions..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="max-w-lg"
                    />
                    <Button
                      variant={"outline"}
                      size="sm"
                      className="justify-start rounded border-t"
                      onClick={() => handleDownloadPDF(selectedTopic)}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                  </div>

                  <Card className="p-6">
                    <Accordion type="single" collapsible className="w-full">
                      {getFilteredQuestions().map((question, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                          <AccordionTrigger className="text-left">
                            <div className="flex flex-col gap-2">
                              {question.q}
                              <div className="flex gap-2">
                                {question.tags.map((tag) => (
                                  <Badge
                                    key={tag}
                                    variant="outline"
                                    className="text-xs"
                                  >
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground">
                            {question.a}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </Card>
                </div>
              ) : (
                <Card className="p-8 text-center">
                  <h3 className="text-lg font-semibold mb-2">Select a Topic</h3>
                  <p className="text-muted-foreground">
                    Choose a technology to view interview questions.
                  </p>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="challenges">
              {selectedTopic ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Search className="w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search challenges..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="max-w-sm"
                    />
                  </div>
                  <Card className="p-6">
                    <Accordion type="single" collapsible className="w-full">
                      {getFilteredChallenges().map((challenge, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                          <AccordionTrigger className="text-left">
                            <div className="flex flex-col gap-2">
                              {challenge.title}
                              <Badge
                                variant="outline"
                                className="text-xs w-fit"
                              >
                                {challenge.difficulty}
                              </Badge>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <p className="text-muted-foreground">
                              {challenge.description}
                            </p>
                            <pre className="text-sm bg-muted p-4 rounded-md">
                              <code>{challenge.starterCode}</code>
                            </pre>
                            <Accordion
                              type="single"
                              collapsible
                              className="w-full"
                            >
                              <AccordionItem value="solution">
                                <AccordionTrigger>
                                  View Solution
                                </AccordionTrigger>
                                <AccordionContent>
                                  <pre className="text-sm bg-muted p-4 rounded-md">
                                    <code>{challenge.solution}</code>
                                  </pre>
                                </AccordionContent>
                              </AccordionItem>
                            </Accordion>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </Card>
                </div>
              ) : (
                <Card className="p-8 text-center">
                  <h3 className="text-lg font-semibold mb-2">Select a Topic</h3>
                  <p className="text-muted-foreground">
                    Choose a technology to view coding challenges.
                  </p>
                </Card>
              )}
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  );
}

export default InterviewPrepPage;
