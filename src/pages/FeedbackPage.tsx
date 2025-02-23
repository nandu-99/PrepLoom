import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';
import { backendURL } from '@/data/data';

export function FeedbackPage() {
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('general');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const maxCharacters = 500;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirm('Are you sure you want to submit this feedback?')) return;

    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch(`${backendURL}/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          feedback,
          type: feedbackType,
          timestamp: new Date().toISOString()
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit feedback');
      }

      setSuccess(true);
      setFeedback('');
      setFeedbackType('general');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="flex items-center gap-3 mb-6">
        <MessageSquare className="w-6 h-6" />
        <h1 className="text-3xl font-bold">Feedback</h1>
      </div>
      
      <p className="text-muted-foreground mb-8">
        We value your feedback! Let us know how we can improve your experience.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Feedback Type
            </label>
            <select
              value={feedbackType}
              onChange={(e) => setFeedbackType(e.target.value)}
              className="w-full p-3 border rounded-md bg-background focus:ring-2 focus:ring-primary"
              disabled={isSubmitting}
            >
              <option value="general">General Feedback</option>
              <option value="bug">Bug Report</option>
              <option value="feature">Feature Request</option>
              <option value="suggestion">Suggestion</option>
            </select>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="feedback" className="block text-sm font-medium">
                Your Feedback
              </label>
              <span className="text-sm text-muted-foreground">
                {feedback.length}/{maxCharacters}
              </span>
            </div>
            <textarea
              id="feedback"
              rows={6}
              className="w-full p-3 border rounded-md bg-background focus:ring-2 focus:ring-primary"
              value={feedback}
              onChange={(e) => {
                if (e.target.value.length <= maxCharacters) {
                  setFeedback(e.target.value);
                }
              }}
              placeholder="Share your thoughts, suggestions, or report issues..."
              required
              disabled={isSubmitting}
            />
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-red-500 text-sm">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}
        
        {success && (
          <div className="flex items-center gap-2 text-green-500 text-sm">
            <CheckCircle className="w-4 h-4" />
            Thank you! Your feedback has been submitted successfully.
          </div>
        )}

        <div className="flex gap-4">
          <Button 
            type="submit" 
            disabled={isSubmitting || !feedback.trim()}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setFeedback('');
              setFeedbackType('general');
            }}
            disabled={isSubmitting}
          >
            Clear
          </Button>
        </div>
      </form>
    </div>
  );
}
