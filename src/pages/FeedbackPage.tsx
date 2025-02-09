import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { MessageSquare } from 'lucide-react';

export function FeedbackPage() {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle feedback submission here
    console.log('Feedback submitted:', feedback);
    setFeedback('');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <MessageSquare className="w-6 h-6" />
        <h1 className="text-3xl font-bold">Feedback</h1>
      </div>
      
      <p className="text-muted-foreground mb-8">
        We value your feedback! Let us know how we can improve your experience.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="feedback" className="block text-sm font-medium mb-2">
            Your Feedback
          </label>
          <textarea
            id="feedback"
            rows={6}
            className="w-full p-3 border rounded-md bg-background"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Share your thoughts, suggestions, or report issues..."
            required
          />
        </div>
        <Button type="submit">Submit Feedback</Button>
      </form>
    </div>
  );
}
