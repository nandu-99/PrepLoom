import type { SubjectTopic } from "@/lib/subject-content";

const frameAllocationThrashing: SubjectTopic = {
  slug: "frame-allocation-thrashing",
  title: "Frame Allocation and Thrashing",
  description:
    "Distribute Frames between processes and control excessive Page Faults.",
  readTime: "Detailed note",
  difficulty: "Advanced",
  tags: ["Frame Allocation", "Working Set", "PFF", "Thrashing"],
  learn: {
    opening:
      "Page replacement decides which Page leaves RAM. Frame allocation decides how many Frames each process can use.",
    sections: [
      {
        title: "Frame Allocation",
        paragraphs: [
          "A process needs enough Frames to hold the Pages used by its current work. Too few Frames cause frequent Page Faults. Giving one process too many leaves fewer Frames for other processes.",
        ],
        dataTable: {
          headers: ["Method", "Rule", "Main trade-off"],
          rows: [
            [
              "Equal",
              "Give each process the same number of Frames",
              "Simple, but ignores process size",
            ],
            [
              "Proportional",
              "Give larger processes more Frames",
              "Uses size, but not current behavior",
            ],
            [
              "Priority",
              "Give more Frames to higher-priority processes",
              "Can hurt lower-priority work",
            ],
          ],
        },
      },
      {
        title: "Local vs Global Replacement",
        paragraphs: [
          "The replacement scope decides which resident Pages are allowed to become victims.",
        ],
        table: {
          headers: ["Local Replacement", "Global Replacement"],
          rows: [
            [
              "Replace only the process's own Pages",
              "May take a Frame from another eligible process",
            ],
            [
              "More predictable Page Fault behavior",
              "More flexible memory use",
            ],
            [
              "Less direct process interference",
              "Processes can affect one another",
            ],
          ],
        },
      },
      {
        title: "Thrashing",
        paragraphs: [
          "Thrashing happens when the active Pages of running processes do not fit in their available Frames. Useful Pages are removed and requested again, causing a very high Page Fault rate.",
          "The system spends more time handling faults and moving Pages than running useful code. CPU utilization may fall while processes wait for storage operations.",
        ],
        visual: {
          src: "/notes/operating-systems/thrashing-cycle.svg",
          alt: "Thrashing cycle where too few Frames cause more Page Faults, more storage input and output, less useful CPU work, and slower processes.",
          width: 1536,
          height: 1024,
          caption: "Repeatedly removing active Pages creates a costly cycle.",
        },
        points: [
          "Too many active processes compete for RAM.",
          "A process receives too few Frames for its current locality.",
          "Global replacement lets processes take useful Frames from one another.",
          "The combined active working sets are larger than available RAM.",
        ],
      },
      {
        title: "Working Set",
        paragraphs: [
          "A Working Set is the group of Pages a process has used during a recent time window. It estimates the Pages needed for the process's current phase of work.",
          "Keeping the Working Set in RAM usually keeps Page Faults low. If the system cannot hold the active working sets, it may suspend a process or reduce the number of active processes.",
        ],
      },
      {
        title: "Page Fault Frequency - PFF",
        paragraphs: [
          "PFF controls allocation by watching how often a process faults instead of tracking a time-window set directly.",
        ],
        visual: {
          src: "/notes/operating-systems/page-fault-frequency.svg",
          alt: "Page Fault Frequency control with high and low thresholds used to add Frames, keep allocation stable, reclaim Frames, or suspend a process when memory is unavailable.",
          width: 1536,
          height: 1024,
          caption: "PFF keeps the Page Fault rate inside a useful range.",
        },
        dataTable: {
          headers: ["Observed PFF", "Meaning", "Action"],
          rows: [
            [
              "Above high limit",
              "Too few Frames",
              "Give more Frames if available; otherwise suspend work",
            ],
            [
              "Between limits",
              "Allocation is acceptable",
              "Keep the current allocation",
            ],
            [
              "Below low limit",
              "More Frames than currently needed",
              "Reclaim some Frames",
            ],
          ],
        },
      },
      {
        title: "How to Control Thrashing",
        paragraphs: [
          "The OS must match active memory demand to the Frames that are actually available.",
        ],
        points: [
          "Give each process enough Frames for its current locality.",
          "Use Working Set or PFF to estimate memory demand.",
          "Reduce the degree of multiprogramming when RAM cannot hold active working sets.",
          "Prefer local control when strong isolation between processes is needed.",
        ],
      },
    ],
    mechanism: {
      title: "Responding to a high Page Fault rate",
      steps: [
        "Measure the process's Page Fault rate or Working Set.",
        "Check whether more Frames are available.",
        "Give the process more Frames when possible.",
        "If memory is still insufficient, suspend a process or reduce active work.",
        "Resume when enough Frames become available.",
      ],
    },
    example: {
      title: "Too many active processes",
      body: "Several processes each need ten active Pages, but each receives only four Frames. They repeatedly remove Pages they soon need again. Reducing active processes lets the remaining working sets fit and lowers the Page Fault rate.",
    },
    misconception:
      "A high Page Fault rate does not always mean the replacement algorithm is poor. The process may simply have too few Frames for its Working Set.",
  },
  revise: {
    definitionLabel: "Overview",
    compactDefinition: true,
    definition:
      "Frame Allocation distributes Frames between processes. Thrashing occurs when active Pages do not fit, so Page Fault handling replaces useful execution.",
    sections: [
      {
        title: "Allocation and Replacement",
        dataTable: {
          headers: ["Concept", "Rule", "Main effect"],
          rows: [
            ["Equal", "Same Frames per process", "Simple"],
            [
              "Proportional",
              "Frames based on process size",
              "Accounts for size",
            ],
            ["Local", "Replace own Pages only", "More predictable"],
            [
              "Global",
              "May take another eligible process's Frame",
              "More flexible, more interference",
            ],
          ],
        },
      },
      {
        title: "Working Set and PFF",
        table: {
          headers: ["Working Set", "Page Fault Frequency"],
          rows: [
            [
              "Pages used in a recent time window",
              "How often a process faults",
            ],
            [
              "Estimates current memory demand",
              "High PFF → More Frames if possible",
            ],
            [
              "Keep it resident to reduce faults",
              "Low PFF → Reclaim extra Frames",
            ],
          ],
        },
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Thrashing = More time handling Page Faults than doing useful work.",
      "Too few Frames for the active Working Set is the main cause.",
      "If more Frames are unavailable, reduce active processes.",
      "Local is predictable; Global is flexible but creates interference.",
    ],
    followUp:
      "Why can adding another active process make CPU utilization fall?",
  },
  lastMinute: {
    definition:
      "Frame Allocation decides how many Frames each process gets. Thrashing happens when active Pages do not fit and Page Faults dominate execution.",
    sections: [
      {
        title: "Control",
        points: [
          "Working Set: Pages used recently.",
          "High PFF: Give more Frames if possible.",
          "Low PFF: Reclaim extra Frames.",
          "Not enough RAM: Reduce active processes.",
        ],
        wide: true,
      },
    ],
    cuesLabel: "Key Points",
    cues: [
      "Equal = Same Frames; Proportional = Frames based on size.",
      "Local = Own Pages; Global = Other eligible process Pages too.",
      "Thrashing = Fault work is greater than useful work.",
      "Working Set and PFF help control Frame Allocation.",
    ],
    memoryLineLabel: "Remember This",
    memoryLine: "High faults → More Frames. No Frames → Less active work.",
    memoryLineAtEnd: true,
    trap: "Global Replacement considers only eligible process Frames, not every Page in the system.",
  },
};

export { frameAllocationThrashing };
