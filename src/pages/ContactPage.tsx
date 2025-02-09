import { Mail, Github, Linkedin, ExternalLink, Phone } from "lucide-react";
import { Button } from "../components/ui/button";

export function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Contact Me</h1>

      <div className="bg-card rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">About Me</h2>
        <p className="text-muted-foreground mb-6">
          Hi! I'm a passionate developer and a quick learner, currently
          interning as an SDE at Zuvees and previously a frontend intern at
          Moveinsync. With expertise in frontend (React, JS) and backend
          (Node.js, Express, MySQL), I’ve built projects like a Student
          Management System and contributed to open-source. I’ve also excelled
          in hackathons, including a winning project at Sleathfire and a top-5
          finish in the Google Cloud Gen AI Hackathon. Beyond coding, my journey
          as a competitive cricketer instilled discipline and teamwork, shaping
          my problem-solving approach in tech.
        </p>

        <div className="flex flex-wrap gap-4">
          <a
            href="https://github.com/nandu-99"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" className="gap-2">
              <Github className="w-4 h-4" />
              GitHub
            </Button>
          </a>
          <a
            href="https://linkedin.com/in/vivekananda-pottabathini"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" className="gap-2">
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </Button>
          </a>
          <a
            href="https://vivekananda-portfolio.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
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
          Feel free to reach out for collaborations, opportunities, or just to
          say hello!
        </p>
        <div className="flex align-center gap-3">
        <a href="mailto:vivekananda.99666@gmail.com">
          <Button className="gap-2">
            <Mail className="w-4 h-4" />
            Contact via Email
          </Button>
        </a>

        <a>
            <Button className="gap-2">
              <Phone className="w-4 h-4" />
              6309199666
            </Button>
        </a>
        </div>
      </div>
    </div>
  );
}
