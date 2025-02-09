import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ExternalLink, BookOpen, Code2, Brain } from 'lucide-react';

export function DSAPage() {
  const mainResource = {
    title: "Striver's A2Z DSA Sheet",
    description: "Comprehensive DSA preparation sheet covering all important topics",
    link: "https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/",
    icon: BookOpen
  };

  const practiceResources = [
    {
      title: "LeetCode",
      description: "Practice coding problems and prepare for technical interviews",
      link: "https://leetcode.com",
      icon: Code2
    },
    {
      title: "Codeforces",
      description: "Competitive programming platform with regular contests",
      link: "https://codeforces.com",
      icon: Brain
    },
    {
      title: "HackerRank",
      description: "Practice coding challenges and prepare for interviews",
      link: "https://hackerrank.com",
      icon: Brain
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Data Structures & Algorithms</h1>

      {/* Main Resource Card */}
      <Card className="p-6 mb-6">
        <div className="flex items-start gap-4">
          <mainResource.icon className="w-8 h-8 mt-1" />
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-2">{mainResource.title}</h2>
            <p className="text-muted-foreground mb-4">{mainResource.description}</p>
            <Button asChild>
              <a href={mainResource.link} target="_blank" rel="noopener noreferrer">
                Visit Resource
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </div>
        </div>
      </Card>

      {/* Practice Resources Card */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Practice Resources</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {practiceResources.map((resource) => (
            <Card key={resource.title} className="p-4">
              <div className="flex items-start gap-4">
                <resource.icon className="w-6 h-6 mt-1" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">{resource.title}</h3>
                  <p className="text-muted-foreground mb-4">{resource.description}</p>
                  <Button asChild>
                    <a href={resource.link} target="_blank" rel="noopener noreferrer">
                      Visit Resource
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
}
