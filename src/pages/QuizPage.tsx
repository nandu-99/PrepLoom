import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Timer, RefreshCw, Flag, AlertCircle, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { CardHeader } from '@/components/ui/card';
import { Topic } from '@/types/types';
import { backendURL } from '@/data/data';

const Quiz = () => {
  const { categoryPathId, topicPathId } = useParams<{ categoryPathId: string; topicPathId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [topic, setTopic] = useState<Topic | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(600);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set());
  const [showTimeWarning, setShowTimeWarning] = useState(false);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await fetch(`${backendURL}/categories/${categoryPathId}/topics/${topicPathId}`);
        const data = await response.json();
        setTopic(data.topics[0]);
      } catch (err) {
        setError('Failed to load quiz. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchQuizData();
  }, [categoryPathId, topicPathId]);

  useEffect(() => {
    if (quizStarted && !quizCompleted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      if (timeLeft === 120) {
        setShowTimeWarning(true);
      }

      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setQuizCompleted(true);
    }
  }, [timeLeft, quizCompleted, quizStarted]);

  if (loading) return <p className="text-center mt-8">Loading quiz...</p>;
  if (error) return <p className="text-center mt-8">{error}</p>;
  if (!topic || !topic.quizQuestions|| topic.quizQuestions.length === 0){
    return (
      <div className="flex items-center justify-center">
        <div className="p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">No Questions Available</h2>
          <p className="mb-4">Sorry, there are no questions available for this quiz at the moment.</p>
          <Button onClick={() => navigate('/interview', { state: { selectedCategory: location.state?.selectedCategory } })}>Return Home</Button>
        </div>
      </div>
    );
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answer: any) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIndex]: answer.text,
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < topic.quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const hasUnansweredQuestions = topic.quizQuestions.some((_, index) => !selectedAnswers[index]);
      if (hasUnansweredQuestions) {
        if (confirm('You have unanswered questions. Are you sure you want to finish?')) {
          setQuizCompleted(true);
        }
      } else {
        setQuizCompleted(true);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleQuestionSelect = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  const toggleFlagQuestion = (index: number) => {
    const newFlagged = new Set(flaggedQuestions);
    if (newFlagged.has(index)) {
      newFlagged.delete(index);
    } else {
      newFlagged.add(index);
    }
    setFlaggedQuestions(newFlagged);
  };

  const calculateScore = () => {
    let correct = 0;
    topic.quizQuestions.forEach((question, index) => {
      if (selectedAnswers[index] === question.options[question.correctAnswer].text) {
        correct++;
      }
    });
    return correct;
  };

  const resetQuiz = () => {
    if (confirm('Are you sure you want to restart the quiz? All progress will be lost.')) {
      setCurrentQuestionIndex(0);
      setSelectedAnswers({});
      setTimeLeft(600);
      setQuizCompleted(false);
      setFlaggedQuestions(new Set());
      setShowTimeWarning(false);
    }
  };

  const startQuiz = () => {
    setQuizStarted(true);
  };

  const progressPercentage = (Object.keys(selectedAnswers).length / topic.quizQuestions.length) * 100;

  if (!quizStarted) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="rounded-lg border shadow-lg p-8 max-w-md w-full mx-4">
          <h2 className="text-2xl font-bold mb-4">Welcome to {topic.title} Quiz</h2>
          <p className="mb-6">
            This quiz contains {topic.quizQuestions.length} questions. You will have 10 minutes to complete it. 
            You can flag questions to review later and navigate between questions freely.
          </p>
          <div className="flex gap-4">
            <Button onClick={startQuiz}>Start Quiz</Button>
            <Button onClick={() => navigate('/interview', { state: { selectedCategory: location.state?.selectedCategory } })} variant="outline">Cancel</Button>
          </div>
        </div>
      </div>
    );
  }

  if (quizCompleted) {
    const score = calculateScore();
    const percentage = (score / topic.quizQuestions.length) * 100;
    
    return (
      <div className="p-6">
        <div className="max-w-2xl mx-auto rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold text-center mb-8">Quiz Results</h2>
          <div className="text-center mb-8">
            <p className="text-6xl font-bold mb-2">
              {score} / {topic.quizQuestions.length}
            </p>
            <p className="text-xl">({percentage.toFixed(1)}%)</p>
            <Progress value={percentage} className="mt-4" />
            <p className="mt-4 text-lg">
              {percentage >= 80 ? '🎉 Excellent work!' : 
               percentage >= 60 ? '👍 Good effort!' : 
               'Keep practicing! You will do better next time.'}
            </p>
          </div>
          
          <div className="space-y-6 mb-8">
            {topic.quizQuestions.map((question, index) => (
              <div key={index} className="border-b pb-4 border-gray-200">
                <div className="flex justify-between items-start mb-2">
                  <p className="font-medium">Question {index + 1}: {question.question}</p>
                  {flaggedQuestions.has(index) && (
                    <span>
                      <Flag className="w-4 h-4" />
                    </span>
                  )}
                </div>
                <p className="text-sm">Your answer: {selectedAnswers[index] || 'Not answered'}</p>
                <p className="text-sm">
                  Correct answer: {question.options[question.correctAnswer].text}
                </p>
              </div>
            ))}
          </div>

          <div className="flex gap-4">
            <Button onClick={resetQuiz} className="flex-1 flex items-center justify-center gap-2">
              <RefreshCw className="w-5 h-5" />
              Retry Quiz
            </Button>
            <Button onClick={() => navigate('/interview', { state: { selectedCategory: location.state?.selectedCategory } })} variant="outline" className="flex-1">
              Return to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = topic.quizQuestions[currentQuestionIndex];

  return (
    <div className="p-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-0">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/interview', { state: { selectedCategory: location.state?.selectedCategory } })}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold">{topic.title}</h1>
        </div>
      </CardHeader>
      <div className="max-w-2xl mx-auto">
        {showTimeWarning && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              2 minutes remaining! Please finish your quiz soon.
            </AlertDescription>
          </Alert>
        )}

        <div className="rounded-lg shadow-md p-8">
          <div className="flex justify-between items-center mb-6">
            <p className="text-lg font-medium">
              Question {currentQuestionIndex + 1} of {topic.quizQuestions.length}
            </p>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleFlagQuestion(currentQuestionIndex)}
                className={flaggedQuestions.has(currentQuestionIndex) ? 'text-yellow-500' : ''}
              >
                <Flag className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-2 text-lg font-medium">
                <Timer className="w-5 h-5" />
                <span className={timeLeft < 60 ? 'text-red-600' : ''}>
                  {formatTime(timeLeft)}
                </span>
              </div>
            </div>
          </div>

          <Progress value={progressPercentage} className="mb-6" />

          <div className="mb-8">
            <h2 className="text-xl font-bold mb-6">{currentQuestion.question}</h2>
            <div className="space-y-4">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(option)}
                  className={`w-full text-left p-4 rounded-lg border transition-colors ${
                    selectedAnswers[currentQuestionIndex] === option.text
                      ? 'bg-primary/10 border-primary'
                      : 'hover:bg-gray-50 border-gray-200 hover:text-black'
                  }`}
                  aria-pressed={selectedAnswers[currentQuestionIndex] === option.text}
                >
                  {option.text}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            <Button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              variant="outline"
            >
              <ArrowLeft className="w-5 h-5" />
              Previous
            </Button>
            <Button onClick={handleNext}>
              {currentQuestionIndex === topic.quizQuestions.length - 1 ? 'Finish' : 'Next'}
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="mt-6 rounded-lg shadow-md p-4">
          <div className="flex flex-wrap gap-2">
            {topic.quizQuestions.map((_, index) => (
              <button
                key={index}
                onClick={() => handleQuestionSelect(index)}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors relative
                  ${selectedAnswers[index]
                    ? 'bg-secondary'
                    : 'hover:bg-gray-200'
                  } ${currentQuestionIndex === index ? 'ring-2 ring-primary' : ''}`}
                aria-label={`Go to question ${index + 1}`}
              >
                {index + 1}
                {flaggedQuestions.has(index) && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-500 rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
