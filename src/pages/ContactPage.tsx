import { Mail, Github, Linkedin, ExternalLink } from 'lucide-react';
import { Button } from '../components/ui/button';

export function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Contact Me</h1>
      
      <div className="bg-card rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">About Me</h2>
        <p className="text-muted-foreground mb-6">
          Hi! I'm a passionate full-stack developer with expertise in modern web technologies.
          I specialize in building scalable applications using React, Node.js, and TypeScript.
          With a strong foundation in computer science and years of industry experience,
          I love creating intuitive and performant web applications.
        </p>
        
        <div className="flex flex-wrap gap-4">
          <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="gap-2">
              <Github className="w-4 h-4" />
              GitHub
            </Button>
          </a>
          <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="gap-2">
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </Button>
          </a>
          <a href="https://yourportfolio.com" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="gap-2">
              <ExternalLink className="w-4 h-4" />
              Portfolio
            </Button>
          </a>
        </div>
      </div>

      <div className="bg-card rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
        <p className="text-muted-foreground mb-6">
          Feel free to reach out for collaborations, opportunities, or just to say hello!
        </p>
        
        <a href="mailto:your.email@example.com">
          <Button className="gap-2">
            <Mail className="w-4 h-4" />
            Contact via Email
          </Button>
        </a>
      </div>
    </div>
  );
}
