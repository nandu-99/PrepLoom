import { FileText, Link as LinkIcon, ExternalLink } from "lucide-react";
import { Button } from "../components/ui/button";

export function ResumePortfolioTipsPage() {
  return (
    <div 
      className="max-w-3xl mx-auto"
    >
      <h1 className="text-3xl font-bold mb-6">Resume & Portfolio Basics</h1>

      <div className="bg-card rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Tell Your Story</h2>
        <p className="text-muted-foreground mb-6">
          Hey, your resume and portfolio? They’re your ticket to stand out in tech. They’re not just papers or a website—they show off your skills and who you are. Here’s the simple stuff to nail it, plus some traps to dodge.
        </p>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">What to Put In</h3>
            <ul className="list-disc pl-5 text-muted-foreground">
              <li><strong>The Basics:</strong> Your name, email, LinkedIn, and a quick line like, “I love coding apps with React.”</li>
              <li><strong>Projects:</strong> Pick 2-3 cool things you’ve built. Say what you used (like JavaScript), what problem you fixed, and what happened (e.g., “Made a shop site that got more clicks”).</li>
              <li><strong>Skills:</strong> List stuff you’re good at—like Python or teamwork.</li>
              <li><strong>Wins:</strong> Got a certificate? Won a hackathon? Add it! Like, “Placed top 10 in a coding contest.”</li>
              <li><strong>Portfolio Link:</strong> Share a site with your work. Keep it clean and easy to check out.</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">What to Skip</h3>
            <ul className="list-disc pl-5 text-muted-foreground">
              <li><strong>Too Much Stuff:</strong> Don’t list everything—just the best bits.</li>
              <li><strong>Boring Words:</strong> Don’t say “team player” unless you’ve got a story to prove it.</li>
              <li><strong>Mistakes:</strong> Spelling errors? Nope. Double-check it.</li>
              <li><strong>Old Junk:</strong> Skip that random job from years ago unless it’s relevant.</li>
              <li><strong>Messy Portfolio:</strong> Don’t make it slow or confusing with weird effects.</li>
            </ul>
          </div>

          <div className="flex flex-wrap gap-4">
            <a
              href="https://drive.google.com/file/d/170hn9bph9B9tGPN7HPmGcPGIZFmu0fMl/view"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" className="gap-2">
                <ExternalLink className="w-4 h-4" />
                Example Resume
              </Button>
            </a>
            <a
              href="https://vivekananda-portfolio.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" className="gap-2">
                <ExternalLink className="w-4 h-4" />
                Example Portfolio
              </Button>
            </a>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Quick Tips from Me</h2>
        <p className="text-muted-foreground mb-6">
          Your resume’s like a cheat sheet—make it fast to read. Your portfolio? Let your projects do the talking. Here’s how to make them pop:
        </p>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <FileText className="w-5 h-5 mt-1" />
            <p><strong>Resume:</strong> Keep it one page, clean, and tweak it for each job—use their words.</p>
          </div>
          <div className="flex items-start gap-3">
            <LinkIcon className="w-5 h-5 mt-1" />
            <p><strong>Portfolio:</strong> Put it on GitHub Pages or Netlify. Add a little note for each project—say what you did and link it.</p>
          </div>
        </div>
      </div>
    </div>
  );
}


