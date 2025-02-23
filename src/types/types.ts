export type TopicType = 'html' | 'css' | 'javascript' | 'advanced-javascript' | 'nodejs' | 'communication' | 'react';

export interface Question {
  id: string;
  question: string;
  answer: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
}

export interface Topic {
  id: TopicType;
  title: string;
  category: string;
  description: string;
  pdfUrl: string;
  pathId: string;
  questions: Question[];
  codingQuestions: CodingQuestion[];
  quizQuestions: QuizQuestion[];
}

export interface CodingQuestion {
  id: string;
  question: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Options{
  id: string;
  text: string
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: Options[];
  correctAnswer: number;
}

export interface Category {
  id: string;
  title: string;
  icon: string;
  topics: Topic[];
  pathId: string;
}

export interface RoadmapPhase {
  phase: string;
  skills: string[];
  description: string;
}

export interface Roadmap {
  frontend: RoadmapPhase[];
  backend: RoadmapPhase[];
}

export interface RoadmapTopic {
  name: string;
  resources: RoadmapResource[];
  keyTopics: string[];
  practiceTask: string;
}

export interface RoadmapResource {
  title: string;
  link: string;
}

export interface MainRoadmapPhase {
  phase: string;
  goal: string;
  skills: string[];
  topics: RoadmapTopic[];
}
