import type { SubjectTopic } from "@/lib/subject-content";

const deadlockHandlingDetailed: SubjectTopic = {
  slug: "deadlock-handling",
  title: "Deadlock Handling",
  description:
    "Compare the four Deadlock strategies and learn how a system chooses the right approach for each resource.",
  readTime: "Detailed note",
  difficulty: "Intermediate",
  tags: ["Handling Strategies", "Ostrich Approach", "Comparison"],
  learn: {
    opening:
      "Deadlock Handling is the overall strategy a system uses to prevent, avoid, detect, recover from, or accept a Deadlock risk.",
    sections: [
      {
        title: "Overview",
        paragraphs: [
          "There is no single strategy that is best for every system or resource.",
          "The choice depends on how likely a Deadlock is, how serious it would be, and how much checking or Recovery cost the system can accept.",
        ],
      },
      {
        title: "The Four Strategies",
        paragraphs: [
          "Prevention and Avoidance act before a Deadlock forms. Detection and Recovery act after it forms. Ignore accepts the risk for selected resources.",
        ],
        visual: {
          src: "/notes/operating-systems/deadlock-handling-strategies.png",
          alt: "Deadlock Handling divided into Ignore, Prevention, Avoidance, and Detection plus Recovery.",
          width: 1536,
          height: 1024,
          caption:
            "Real systems may use different strategies for different resources and subsystems.",
        },
      },
      {
        title: "Ignore Deadlocks - Ostrich Approach",
        paragraphs: [
          "The Ostrich Approach means the system does not run a general Deadlock prevention or detection method for a selected class of resources.",
          "It is useful when Deadlocks are rare and continuous checking would cost more than occasional Recovery.",
          "If a Deadlock occurs, a timeout, watchdog, application restart, process termination, or user action may be used.",
        ],
        table: {
          headers: ["Benefit", "Risk"],
          rows: [
            ["No continuous checking overhead", "A Deadlock may remain until something is restarted"],
            ["Simple for rare, low-impact cases", "The user or application may lose work"],
          ],
        },
      },
      {
        title: "What Ignore Really Means",
        paragraphs: [
          "A general-purpose Operating System does not ignore every possible Deadlock.",
          "Different kernels, drivers, databases, and applications may use lock ordering, timeouts, detection, watchdogs, or restart rules even when there is no universal system-wide Deadlock algorithm.",
        ],
      },
      {
        title: "Strategy Comparison",
        paragraphs: [
          "Each strategy chooses a different balance between guarantees, flexibility, and overhead.",
        ],
        dataTable: {
          headers: ["Approach", "Main idea", "Information needed", "Main cost"],
          rows: [
            ["Ignore", "Accept the risk for selected resources", "No special resource data", "Manual Recovery or lost work"],
            ["Prevention", "Break a Coffman Condition", "Fixed allocation rules", "Lower concurrency or resource use"],
            ["Avoidance", "Remain in a Safe State", "Maximum resource claims", "Safety check for each request"],
            ["Detection and Recovery", "Find and break an existing Deadlock", "Current Allocation and Request", "Detection cost and possible lost work"],
          ],
        },
      },
      {
        title: "How a System Chooses",
        paragraphs: [
          "A real system may combine several strategies instead of choosing one method for the entire Operating System.",
        ],
        points: [
          "How often a Deadlock is expected.",
          "How serious the result would be.",
          "Whether maximum resource needs are known in advance.",
          "Whether resources can be shared or safely preempted.",
          "Whether work can be restarted or rolled back.",
          "How much checking and waiting overhead is acceptable.",
        ],
      },
      {
        title: "Practical System Choices",
        paragraphs: [
          "The best strategy depends on the type of work and the available Recovery method.",
        ],
        dataTable: {
          headers: ["System or resource", "Common choice", "Reason"],
          rows: [
            ["Kernel locks", "Prevention through lock ordering", "Circular Wait can be blocked with a clear rule"],
            ["Database transactions", "Detection or timeout with rollback", "A victim transaction can be restarted"],
            ["Safety-critical system", "Strict Prevention and bounded waits", "The system cannot accept indefinite blocking"],
            ["Low-risk application resource", "Timeout, watchdog, or restart", "Continuous detection may cost more than occasional Recovery"],
          ],
        },
      },
    ],
    mechanism: {
      title: "Choosing a Deadlock strategy",
      steps: [
        "Identify the resources and possible waiting relationships.",
        "Estimate how likely and costly a Deadlock would be.",
        "Check what information is available before allocation.",
        "Check whether resources or work can be safely recovered.",
        "Choose one strategy or a safe combination for that subsystem.",
      ],
    },
    example: {
      title: "Database transaction handling",
      body: "A database can detect a cycle between transactions, select one transaction as the victim, roll it back, and let the other transaction finish. It uses Detection and Recovery because transaction work can be restarted.",
    },
    misconception:
      "A system does not need to use one Deadlock strategy everywhere. Different resources and subsystems may use different strategies.",
  },
  revise: {
    definitionLabel: "Overview",
    compactDefinition: true,
    definition:
      "Deadlock Handling is the overall strategy a system uses to Ignore, Prevent, Avoid, Detect, or Recover from Deadlocks.",
    sections: [
      {
        title: "The Four Strategies",
        visual: {
          src: "/notes/operating-systems/deadlock-handling-strategies.png",
          alt: "Deadlock Handling divided into Ignore, Prevention, Avoidance, and Detection plus Recovery.",
          width: 1536,
          height: 1024,
          caption: "Different resources may use different strategies.",
        },
      },
      {
        title: "Ostrich Approach",
        points: [
          "Accept the risk for selected resources.",
          "Useful when Deadlocks are rare and checking costs too much.",
          "Recovery may use a timeout, watchdog, restart, or user action.",
          "It does not mean that every kind of Deadlock is ignored.",
        ],
      },
      {
        title: "Strategy Comparison",
        dataTable: {
          headers: ["Approach", "Main idea", "Main cost"],
          rows: [
            ["Ignore", "Accept selected risks", "Manual Recovery or lost work"],
            ["Prevention", "Break a Coffman Condition", "Lower concurrency"],
            ["Avoidance", "Maintain a Safe State", "Maximum claims and safety checks"],
            ["Detection and Recovery", "Find and break a Deadlock", "Detection and Recovery overhead"],
          ],
        },
      },
      {
        title: "Choosing an Approach",
        points: [
          "Consider how often a Deadlock may occur.",
          "Consider how serious it would be.",
          "Check whether maximum resource needs are known.",
          "Check whether work can be restarted or rolled back.",
          "Real systems may combine strategies.",
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Ignore → Accept the risk for selected resources.",
      "Prevention → Break a Coffman Condition.",
      "Avoidance → Maintain a Safe State.",
      "Detection and Recovery → Find and break an existing Deadlock.",
      "No single strategy is best for every system.",
    ],
    followUp: "Why might one system use more than one Deadlock strategy?",
  },
  lastMinute: {
    definition:
      "Deadlock Handling is the strategy a system uses to deal with Deadlocks.",
    sections: [
      {
        title: "Approaches",
        flow: [
          "Deadlock Handling",
          "Ignore | Prevention | Avoidance | Detection and Recovery",
        ],
        wide: true,
      },
      {
        title: "Choose Using",
        points: [
          "Deadlock frequency and impact",
          "Available resource information",
          "Preemption and Rollback support",
          "Acceptable checking overhead",
        ],
      },
    ],
    cuesLabel: "Key Points",
    cues: [
      "Ignore → Accept selected risks.",
      "Prevention → Break a Coffman Condition.",
      "Avoidance → Maintain a Safe State.",
      "Detection and Recovery → Find and break an existing Deadlock.",
      "Real systems may combine strategies.",
    ],
    memoryLineLabel: "Remember This",
    memoryLine: "Prevent, avoid, detect, or accept the risk.",
    memoryLineAtEnd: true,
    trap: "General-purpose systems do not ignore every kind of Deadlock.",
  },
};

export { deadlockHandlingDetailed };
