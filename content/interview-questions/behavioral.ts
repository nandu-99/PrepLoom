import type { BehavioralQuestion } from "@/content/interview-questions/types";

export const behavioralInterviewQuestions: BehavioralQuestion[] = [
  {
    id: "tell-me-about-yourself",
    category: "Introduction and motivation",
    question: "Tell me about yourself.",
    howToAnswer:
      "Connect your current background, strongest relevant experience, and what you want next. Keep it relevant to the role instead of repeating your complete resume.",
    example:
      "I am a final-year Computer Science and AI student at Newton School of Technology. Over the last two years, I have worked in startup environments across software development, growth engineering, and AI-agent reliability. At Zuvees, I helped build internal systems and improve storefront performance, and at Emergent, I debugged AI-generated applications and platform issues. I also built PrepLoom independently to bring my technical notes and interview resources into one place. I am now looking for a software engineering role where I can take ownership and keep building products with measurable impact.",
  },
  {
    id: "why-software-engineering",
    category: "Introduction and motivation",
    question: "Why do you want to become a software engineer?",
    howToAnswer:
      "Give a personal reason, then support it with something you have built. Focus on the kind of problems and working environment that keep you interested.",
    example:
      "I have been interested in computers for a long time, so studying Computer Science and AI felt like a natural choice. What made software engineering meaningful for me was seeing an idea become something people could actually use. That happened through my startup internships and projects such as PrepLoom and the Telangana Champions League platform. I enjoy understanding a problem, making technical decisions, and shipping a working solution. That combination of problem-solving, ownership, and visible impact is why I want to continue as a software engineer.",
  },
  {
    id: "why-startups",
    category: "Introduction and motivation",
    question: "What kind of work environment helps you perform at your best?",
    howToAnswer:
      "Describe the environment honestly and explain why it suits how you work. Show that you can still collaborate, accept feedback, and handle structure.",
    example:
      "I perform best in startup environments where ownership is clear and the impact of the work is visible. In my internships, I was often close to both the business problem and the implementation, so I could understand why a feature mattered and then help ship it. I like having room to make decisions, but I also value direct feedback and clear priorities. That environment pushes me to learn quickly and take responsibility for the outcome instead of limiting myself to a narrow task.",
  },
  {
    id: "why-hire-you",
    category: "Introduction and motivation",
    question: "Why should we hire you?",
    howToAnswer:
      "Choose two or three strengths that match the role and prove them with results. Avoid unsupported claims such as being passionate or hardworking.",
    example:
      "I can contribute as someone who has already worked across different parts of real startup products. I have built frontend experiences, backend systems, analytics tracking, and AI reliability fixes, so I am comfortable learning outside one narrow stack. At Zuvees, my work contributed to better storefront performance, internal operations, and growth tracking. At Emergent, I debugged unfamiliar full-stack codebases and platform issues. I also build independently, as I did with PrepLoom. The common thread is that I take a problem seriously, learn what is needed, and stay with it until there is a working result.",
  },
  {
    id: "career-goals",
    category: "Introduction and motivation",
    question: "Where do you see yourself in the next three to five years?",
    howToAnswer:
      "Describe the skills and responsibility you want to grow into. Keep the answer connected to the role while being honest about your longer-term ambition.",
    example:
      "Over the next few years, I want to become a dependable software engineer who can own a feature from understanding the requirement through production. I want deeper experience in system design, backend reliability, and building products at scale while continuing to strengthen my frontend skills. I learn best in teams that ship quickly and expect ownership. Long term, I would like to build something meaningful of my own, so my immediate goal is to learn how strong engineering and product teams make decisions and deliver consistently.",
  },
  {
    id: "greatest-achievement",
    category: "Introduction and motivation",
    question: "What achievement are you most proud of?",
    howToAnswer:
      "Pick one achievement with personal meaning, not just the largest number. Explain your responsibility, the result, and why it matters to you.",
    example:
      "I am most proud of building the platform for the Telangana Champions League because it was a real system with real consequences. I built the tournament lifecycle myself, including registration, selection, auctions, matches, and results. It supported more than 45,000 live users, 12,000 logins, over 20,000 transactional emails, and ₹16 lakh in registrations. The launch also exposed a serious OTP delivery limit, so I had to diagnose it and replace the email provider. I value the project because it tested both my engineering ownership and my ability to recover when production did not behave as expected.",
  },
  {
    id: "preploom-ownership",
    category: "Ownership and problem-solving",
    question: "Tell me about a project you took complete ownership of.",
    howToAnswer:
      "Choose a project where you made the important decisions yourself. Cover the problem, what you personally built, and what ownership taught you.",
    example:
      "I built PrepLoom completely by myself after noticing that my course notes, PDFs, and revision resources were spread across too many places. Whenever I wanted to revise, I had to search through files or ask an LLM again. I designed PrepLoom as one structured place for subject notes, roadmaps, quizzes, DSA resources, WebDev resources, and interview questions. I handled the product structure, content organization, interface, and implementation. Owning the whole product taught me that building features is only one part of the work. The information architecture and revision experience matter just as much.",
  },
  {
    id: "zero-to-one-system",
    category: "Ownership and problem-solving",
    question: "Tell me about something you built from zero to one.",
    howToAnswer:
      "Explain the original gap, the decisions you owned, and how the finished system changed the work. Keep the emphasis on your individual contribution.",
    example:
      "At Zuvees, I joined as the first technical team member and worked on internal systems that did not exist before. One important project was the ZIST admin dashboard, which needed role-based access and support for orders from multiple marketplaces. I worked across the interface, backend requirements, database design, image uploads, and operational workflows. The system gave the team one place to manage work that was previously more fragmented and contributed to reducing order-tracking time by 40%. It was valuable because I had to understand the business process before deciding how the software should work.",
  },
  {
    id: "complex-debugging",
    category: "Ownership and problem-solving",
    question: "Tell me about a difficult technical problem you solved.",
    howToAnswer:
      "Describe the symptoms, how you narrowed down the cause, and the actual fix. Let the investigation demonstrate your problem-solving instead of calling the problem complex.",
    example:
      "At Emergent, users could connect an AI-generated application to GitHub. In one issue, the interface showed a successful push, but the code was silently not reaching GitHub. I traced the flow beyond the success message and found that pre-commit hooks inside some generated repositories were failing and stopping the push. The platform was treating the earlier step as success instead of checking the final Git result. I worked on correcting the failure handling so the real status could be surfaced. The experience reinforced that a success message is not proof that the underlying operation completed.",
  },
  {
    id: "production-traffic",
    category: "Ownership and problem-solving",
    question: "Tell me about a system you built that handled real users at scale.",
    howToAnswer:
      "Give the scale only after explaining what the system did and what you owned. Include one real production lesson so the answer is more than a list of metrics.",
    example:
      "I independently built the platform used for the Telangana Champions League, a real cricket tournament. It covered registration, player selection, auctions, match management, and winners. During the live event, it served more than 45,000 users and 12,000 logins, collected over ₹16 lakh in registrations, and sent more than 20,000 transactional emails on AWS. The launch taught me that production scale exposes assumptions that local testing does not, especially around third-party service limits. It gave me practical experience in monitoring a live system and making a fast reliability fix.",
  },
  {
    id: "performance-improvement",
    category: "Ownership and problem-solving",
    question: "Tell me about a time you improved application performance.",
    howToAnswer:
      "State how performance was measured, what areas you changed, and the before-and-after result. Do not quote a score without naming the measurement method.",
    example:
      "At Zuvees, I worked on Shopify storefronts and landing pages where mobile performance was a major concern. I used Lighthouse and PageSpeed Insights to measure the starting point and identify the main bottlenecks. I then improved the frontend implementation and page delivery based on those findings rather than making visual changes blindly. The mobile performance score improved from around 40% to 85%. The main lesson for me was to make performance work measurable, because a page feeling faster during development is not enough evidence.",
  },
  {
    id: "data-driven-impact",
    category: "Ownership and problem-solving",
    question: "Tell me about a time you used data to improve a business result.",
    howToAnswer:
      "Connect the technical change to the business decision it improved. Be precise about shared results and avoid claiming sole credit for a team outcome.",
    example:
      "In my Tech and Growth role at Zuvees, I worked on GTM, GA4, and Google Ads tracking across more than 15 conversion and engagement events. The external agency measured purchase-tracking accuracy, and the improved event setup helped raise it from 60% to 90%. Better signals also helped campaigns reach more relevant audiences and contributed to a 40% reduction in customer acquisition cost. My contribution was making the underlying data more reliable through event design and server-side tracking. That experience showed me how engineering quality can directly affect marketing decisions.",
  },
  {
    id: "technical-disagreement",
    category: "Teamwork and communication",
    question: "Tell me about a technical disagreement you had with your team.",
    howToAnswer:
      "Explain the design issue and the reasoning behind your view without making the other side look careless. Focus on how you evaluated the options together.",
    example:
      "During a database architecture discussion at Zuvees, one proposal connected products directly to broad categories. I disagreed because the actual catalog required products to sit under subcategories, with each subcategory belonging to a category. I explained the issue using the business hierarchy rather than arguing only from personal preference. My concern was that skipping the subcategory level would make the model less accurate and harder to extend. The discussion taught me to ground technical disagreements in real data and future use cases, not in who has the stronger opinion.",
  },
  {
    id: "explain-technical-work",
    category: "Teamwork and communication",
    question: "Tell me about a time you explained a technical issue to a non-technical stakeholder.",
    howToAnswer:
      "Start from the stakeholder's goal, not the implementation. Explain the consequence, the proposed change, and what they needed to decide.",
    example:
      "While working on growth engineering at Zuvees, tracking problems had to be discussed in terms that marketing teams and an external agency could use. Instead of focusing on tag configuration, I explained which customer actions were being recorded incorrectly and how that affected campaign attribution and audience quality. I then connected the server-side tracking changes to the expected improvement in purchase data. This made it easier to validate the right events together. I learned that communication works better when technical details are translated into the decision or business result they affect.",
  },
  {
    id: "external-company-demo",
    category: "Teamwork and communication",
    question: "Tell me about a time you worked directly with an external company or customer.",
    howToAnswer:
      "Explain what the external party needed, how you translated it into a solution, and what you learned about understanding users. Do not overstate sales or onboarding responsibility.",
    example:
      "At Emergent, I built full-stack demonstration applications for external companies to show what the agentic platform could create. My role was to understand the kind of application that would make the platform's value clear and then turn that into a working demo. This required more than prompting. I had to check the generated result, debug issues across the stack, and make sure the final flow was convincing. The experience improved my ability to translate a loosely described business problem into a concrete product experience.",
  },
  {
    id: "mentor-interns",
    category: "Teamwork and communication",
    question: "Tell me about a time you helped a teammate succeed.",
    howToAnswer:
      "Show the support you provided without taking credit for the other person's work. Mention how you clarified expectations, reviewed progress, or removed blockers.",
    example:
      "At Zuvees, I guided interns working on internal projects such as the NPS module and delivery-tracking application. I divided the work into clear tasks, explained the business requirement behind each task, and reviewed both their progress and code. When something was blocked, I helped them understand the expected flow rather than simply rewriting it myself. I also kept track of deadlines so integration did not become a last-minute problem. That experience taught me that useful mentoring combines context, clear ownership, and timely feedback.",
  },
  {
    id: "cross-functional-collaboration",
    category: "Teamwork and communication",
    question: "Tell me about a time you worked across different functions.",
    howToAnswer:
      "Identify the groups involved and the shared outcome. Explain how you connected technical implementation with their different priorities.",
    example:
      "My Tech and Growth role at Zuvees required working across engineering, marketing, and an external analytics agency. Marketing needed reliable campaign data, the agency had its measurement approach, and the website needed accurate event implementation. I worked on more than 15 conversion and engagement events and added server-side tracking so the data remained useful across those groups. Purchase-tracking accuracy improved from 60% to 90%, and the work contributed to lower acquisition costs. I learned to confirm the meaning of an event with every stakeholder before treating the technical setup as complete.",
  },
  {
    id: "team-contribution",
    category: "Teamwork and communication",
    question: "How do you describe your contribution when a result belongs to a team?",
    howToAnswer:
      "Separate your actions from the shared result. Use 'I' for your work and 'we' for outcomes that depended on multiple people.",
    example:
      "I try to be specific about the boundary between my work and the team's result. For example, at Zuvees I implemented event tracking and server-side tracking that improved the quality of campaign data. Purchase accuracy increased from 60% to 90%, and the broader campaign work contributed to a 40% CAC reduction. I would not claim that I reduced CAC alone because marketing decisions and the external agency also influenced it. I can confidently explain the technical contribution I owned and how it supported the shared outcome.",
  },
  {
    id: "take-initiative",
    category: "Leadership and initiative",
    question: "Tell me about a time you took initiative without being asked.",
    howToAnswer:
      "Choose a problem you noticed yourself and explain why you acted on it. Show the work required to move from observation to a useful result.",
    example:
      "PrepLoom started from a problem I was facing personally. My course notes, PDFs, roadmaps, and revision material were scattered, and I kept returning to search or LLMs for information I had already studied. No one assigned me to solve that. I decided to organize the material into one product and built the platform independently. It now brings together structured notes, roadmaps, quizzes, DSA and WebDev resources, and interview practice. The project reflects how I like to work: notice a repeated problem, define a practical version, and keep improving it through implementation.",
  },
  {
    id: "lead-without-title",
    category: "Leadership and initiative",
    question: "Tell me about a time you led without having a formal leadership title.",
    howToAnswer:
      "Leadership can mean giving clarity and helping work move forward. Describe the responsibility you accepted and how it helped other people deliver.",
    example:
      "At Zuvees, I was not a formal manager, but I took responsibility for guiding interns on internal projects. I broke business requirements into tasks, explained why each part mattered, reviewed their implementations, and helped manage deadlines. I tried to give enough context for them to make decisions instead of turning every task into a list of instructions. The work showed me that leadership is often about creating clarity and following through, even when the organization has not given you a management title.",
  },
  {
    id: "fast-production-decision",
    category: "Leadership and initiative",
    question: "Tell me about an important decision you had to make quickly.",
    howToAnswer:
      "Explain the immediate risk, the information you had, and why the chosen option was reasonable. Include how you verified the decision afterward.",
    example:
      "During the Telangana Champions League launch, OTP emails began failing because the Nodemailer SMTP setup had a limit of only 500 messages, which I had not known before the traffic arrived. Login was a critical path, so waiting was not an option. I confirmed that the application flow was working and isolated delivery capacity as the problem. I then moved the transactional email flow to Resend so it could support the live demand. The decision restored the login path and taught me to verify third-party limits before a high-traffic launch.",
  },
  {
    id: "prioritize-work",
    category: "Leadership and initiative",
    question: "How do you prioritize when several tasks are competing for your attention?",
    howToAnswer:
      "Describe the system you actually use and how you identify the most important work. Acknowledge how your approach has improved over time.",
    example:
      "I first separate tasks by deadline, dependency, and impact, then convert them into a daily to-do list with a realistic amount of work. This has helped me balance a strong CGPA, internships, projects, placement preparation, and freelance commitments. I have learned that writing every task down is not enough if I accept more than the available time. I now try to complete critical functionality and dependent work first, then use the remaining time for improvements that are useful but not blocking anyone.",
  },
  {
    id: "beyond-role",
    category: "Leadership and initiative",
    question: "Tell me about a time you took responsibility beyond your original role.",
    howToAnswer:
      "Show how the additional responsibility served the company rather than only expanding your title. Connect the new area to a skill you developed.",
    example:
      "I initially worked at Zuvees as a software development engineer, building storefronts and internal systems. I later moved into a Tech and Growth role, where the problems included analytics, attribution, order forms, email automation, and campaign efficiency. That work was outside a traditional frontend scope, but it was important to how the business acquired and retained customers. I learned GTM, GA4, Google Ads tracking, and server-side attribution because the product needed reliable data. The transition made me more comfortable connecting engineering decisions to business outcomes.",
  },
  {
    id: "improve-process",
    category: "Leadership and initiative",
    question: "Tell me about a process you improved.",
    howToAnswer:
      "Describe the old friction, the system or workflow you changed, and the measurable improvement. Keep the answer focused on how people worked differently afterward.",
    example:
      "At Zuvees, order information came from multiple marketplaces, which made operational tracking slower. I helped build the ZIST admin dashboard with role-based access and multi-marketplace support so the team could manage the workflow in one internal system. I also worked on the supporting database and application flows needed for that process. The new setup contributed to reducing order-tracking time by 40%. The project taught me that internal software creates value when it reflects the actual workflow instead of forcing operations into a technically convenient structure.",
  },
  {
    id: "production-failure",
    category: "Failure and growth",
    question: "Tell me about a time something you built failed.",
    howToAnswer:
      "Own the mistake directly, explain the recovery, and finish with the concrete check you would add next time. Do not spend the answer defending why it happened.",
    example:
      "The login flow for the Telangana Champions League platform failed when live traffic increased. I had implemented OTP delivery with Nodemailer and SMTP, but I had not checked that the provider allowed only 500 messages. Once that limit was reached, users could not receive OTPs. I isolated the issue and migrated the email flow to Resend so login could recover. The mistake was mine because the service limit should have been part of launch preparation. Since then, I treat provider quotas, failure states, and load expectations as part of the design, not as deployment details.",
  },
  {
    id: "difficult-feedback",
    category: "Failure and growth",
    question: "Tell me about difficult feedback you received.",
    howToAnswer:
      "State the feedback without weakening it, then explain what changed in your behavior. Choose feedback that is genuine but actively being addressed.",
    example:
      "I received feedback that I sometimes spent too much time on small UI improvements that were not the most important work at that moment. My intention was to improve quality, but the feedback helped me see that polish has less value when critical functionality or a deadline needs attention first. I now separate required functionality from optional refinement and complete the highest-impact flow before returning to smaller visual details. It has made my work more aligned with business priorities while still leaving room for quality when the important work is secure.",
  },
  {
    id: "weakness-overcommitting",
    category: "Failure and growth",
    question: "What is one weakness you are working to improve?",
    howToAnswer:
      "Choose a real behavior, show its consequence, and explain the system you use to improve it. Avoid weaknesses disguised as compliments.",
    example:
      "I have a tendency to overcommit because I am interested in taking ownership of useful work. At one point, I was handling two freelance projects while preparing for placements and continuing other responsibilities. The risk is that accepting everything can reduce the attention each task receives. I am improving by estimating the work before agreeing, dividing commitments into smaller tasks, and maintaining a priority-based to-do list. I am also learning that being dependable sometimes means saying not now instead of immediately saying yes.",
  },
  {
    id: "learn-quickly",
    category: "Failure and growth",
    question: "Tell me about a time you had to learn something quickly.",
    howToAnswer:
      "Explain what was unfamiliar, how you learned only what the problem required, and how you applied it. The outcome should demonstrate the learning.",
    example:
      "At Emergent, AI-generated applications could use different frontend and backend stacks, so I often had to debug codebases I had not seen before. I learned to avoid trying to understand every file first. I would reproduce the issue, trace the affected flow, read the relevant framework or library behavior, and test a focused fix. This approach helped me resolve user-code and platform problems within a fast-moving environment. It taught me that learning quickly is less about rushing through documentation and more about asking the right technical question.",
  },
  {
    id: "cricket-setback",
    category: "Failure and growth",
    question: "Tell me about a setback that tested your resilience.",
    howToAnswer:
      "Use a setback that genuinely affected you and focus on how you responded over time. Avoid turning the answer into an instant success story.",
    example:
      "While playing competitive cricket, I went through a period of poor form that lasted more than three months. I continued practising, but the results did not improve immediately, which made it a real test of patience. I stayed consistent instead of changing everything after every bad performance or giving up. That period taught me that disciplined work does not always produce visible results on the same schedule. I carry that lesson into engineering when debugging or learning takes longer than expected. I keep working methodically without treating a slow result as proof that the effort is wasted.",
  },
  {
    id: "change-past-project",
    category: "Failure and growth",
    question: "What would you do differently if you could restart one project?",
    howToAnswer:
      "Pick a concrete technical or process change based on what actually happened. Show improved judgment rather than claiming you would make everything perfect.",
    example:
      "If I restarted the Telangana Champions League platform, I would treat transactional email capacity as a first-class reliability requirement. I built the login flow with Nodemailer and SMTP but did not verify the 500-message limit before the live launch. Knowing the expected traffic, I should have reviewed provider quotas, tested failure behavior, and selected a service designed for the volume earlier. I would also add clearer delivery monitoring around OTPs. The project succeeded after the migration to Resend, but preparing for that dependency would have prevented the most serious launch problem.",
  },
  {
    id: "tight-deadline",
    category: "Pressure and adaptability",
    question: "Tell me about a time you worked under a tight deadline.",
    howToAnswer:
      "Explain what made the deadline fixed, how you protected the critical path, and what you postponed. Show calm prioritization rather than glorifying long hours.",
    example:
      "The Telangana Champions League platform had a fixed live-tournament schedule, so registration and login problems could not be moved to a later sprint. When OTP delivery failed under traffic, I focused first on restoring the login path because every other feature depended on users entering the system. I isolated the provider limit and migrated the flow to Resend before returning to less critical work. The situation reinforced that under pressure I need to identify the blocked user journey, solve that first, and avoid spending time on improvements that do not restore the service.",
  },
  {
    id: "balance-responsibilities",
    category: "Pressure and adaptability",
    question: "How have you balanced several demanding responsibilities?",
    howToAnswer:
      "Give a realistic picture of the responsibilities and the routine that kept them manageable. Mention the limit you learned instead of suggesting you can do everything at once.",
    example:
      "During my B.Tech, I maintained a 9.65 CGPA while completing startup internships, building projects, and preparing for software engineering placements. I manage this by dividing larger goals into concrete tasks and planning them through a daily to-do list. I try to make deadlines and dependencies visible so I know what cannot slip. I have also learned that organization does not create unlimited capacity. Because I tend to overcommit, I am becoming more careful about what I accept and how much focused time it will actually require.",
  },
  {
    id: "adapt-new-domain",
    category: "Pressure and adaptability",
    question: "Tell me about a time you adapted to a new domain or responsibility.",
    howToAnswer:
      "Describe what changed, how you closed the knowledge gap, and how your previous skills still helped. Focus on a successful transition, not just willingness.",
    example:
      "At Zuvees, I moved from a software development role into Tech and Growth. The new responsibility required understanding attribution, customer acquisition, lifecycle email, and analytics rather than only application features. I learned GTM, GA4, Google Ads events, and server-side tracking around the specific problems the company needed to solve. My engineering background helped me reason about data flow and implementation accuracy. The work improved purchase-tracking accuracy from 60% to 90% and contributed to a 40% CAC reduction, showing me that I can adapt technical skills to a new business domain.",
  },
  {
    id: "speed-and-quality",
    category: "Pressure and adaptability",
    question: "How do you balance speed and quality in a startup?",
    howToAnswer:
      "Explain how risk changes the amount of validation required. Use an example that shows you can move quickly without treating every detail as equally important.",
    example:
      "I separate quality into what protects the core user journey and what is optional refinement. A login flow, order workflow, or data-integrity issue needs stronger validation because failure blocks users or damages trust. A small visual improvement can wait if the deadline is tight. The feedback I received about spending too much time on minor UI details helped me make this distinction more consciously. I still care about polish, but I now secure the important functionality, failure handling, and measurement first, then improve the interface with the time that remains.",
  },
  {
    id: "ambiguous-requirement",
    category: "Pressure and adaptability",
    question: "Tell me about a time the requirement was unclear or incomplete.",
    howToAnswer:
      "Show how you uncovered the real workflow before implementing. Explain the questions or model you used to turn ambiguity into a decision.",
    example:
      "Database design at Zuvees required understanding how the business actually organized its catalog. A simplified proposal placed products directly under categories, but that did not represent the subcategories used in the real product structure. I raised the issue and explained the hierarchy as category, subcategory, then product. Instead of treating the database as an isolated engineering task, I used the business relationship to evaluate the model. The experience taught me to clarify the domain structure early because an incomplete requirement can become an expensive schema problem later.",
  },
  {
    id: "handle-pressure",
    category: "Pressure and adaptability",
    question: "How do you handle pressure when progress is slower than expected?",
    howToAnswer:
      "Describe the habits that keep you useful under pressure. Support them with an experience where patience and consistency mattered.",
    example:
      "Competitive cricket taught me not to confuse a difficult period with permanent failure. I once remained out of form for more than three months even though I was practising consistently. I focused on the routine, stayed patient, and did not give up because the result was taking longer. In engineering, I use the same mindset while debugging: reduce the problem, test one assumption at a time, and keep notes on what has already been ruled out. Pressure becomes more manageable when I return to the next concrete action instead of reacting to the whole problem at once.",
  },
];
