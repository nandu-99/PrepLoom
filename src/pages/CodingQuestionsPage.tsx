import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Topic } from '@/types/types';
import { backendURL } from '@/data/data';

type Difficulty = "Easy" | "Medium" | "Hard" | 'easy' | 'medium' | 'hard' ;

const CodingQuestionsPage = () => {
  const { categoryPathId, topicPathId } = useParams<{ categoryPathId: string; topicPathId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | Difficulty>('all');
  const [topic, setTopic] = useState<Topic | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`${backendURL}/categories/${categoryPathId}/topics/${topicPathId}`);
        const data = await response.json();
        setTopic(data.topics[0]);
      } catch (err) {
        setError('Failed to load questions. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [categoryPathId, topicPathId]);
  
  if (loading) return <p className="text-center mt-8">Loading questions...</p>;
  if (error) return <p className="text-center mt-8 text-red-500">{error}</p>;
  if (!topic) {
    return (
      <Card className="max-w-lg mx-auto mt-8 p-6">
        <CardContent className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Topic Not Found</h2>
          <Button onClick={() => navigate('/interview', { state: { selectedCategory: location.state?.selectedCategory } })}>
            <ChevronLeft className="w-4 h-4 mr-2" />
            Return to Topics
          </Button>
        </CardContent>
      </Card>
    );
  }
  
  const filteredQuestions = topic.codingQuestions.filter(q => {
    const matchesSearch = q.question.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = selectedDifficulty === 'all' || q.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();
    return matchesSearch && matchesDifficulty;
  });
  
  const getDifficultyColor = (difficulty: Difficulty): string => {
    const colors = {
      easy: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      hard: 'bg-red-100 text-red-800',
      Easy: "bg-green-100 text-green-800",
      Medium: "bg-yellow-100 text-yellow-800",
      Hard: "bg-red-100 text-red-800",
    };
    return colors[difficulty] || 'bg-gray-100 text-gray-800';
  };
  
  return (
    <div className="max-w-5xl mx-auto p-6">
      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/interview', { state: { selectedCategory: location.state?.selectedCategory } })}>
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
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={selectedDifficulty} onValueChange={(value: 'all' | Difficulty) => setSelectedDifficulty(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Difficulties</SelectItem>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((question, index) => (
            <Card key={question.id} className="p-4">
              <div className='flex justify-between'>
                <h3 className="text-lg font-semibold">
                  {index + 1}. {question.question}
                </h3>
                <Badge className={`mt-2 ${getDifficultyColor(question.difficulty)}`}>
                  {question.difficulty}
                </Badge>
              </div>
              <p className="text-muted-foreground text-sm mt-2">{question.description}</p>
            </Card>
          ))
        ) : (
          <p className="text-muted-foreground text-center mt-4">No questions found.</p>
        )}
      </div>
    </div>
  );
};

export default CodingQuestionsPage;
