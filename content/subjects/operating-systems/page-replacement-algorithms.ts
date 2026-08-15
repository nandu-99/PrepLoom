import type { SubjectTopic } from "@/lib/subject-content";

const pageReplacementAlgorithms: SubjectTopic = {
  slug: "page-replacement-algorithms",
  title: "Page Replacement Algorithms",
  description: "Choose a Page to remove when RAM has no usable free Frame.",
  readTime: "Detailed note",
  difficulty: "Advanced",
  tags: ["FIFO", "Optimal", "LRU", "Second Chance"],
  learn: {
    opening:
      "When a valid missing Page needs RAM and no usable free Frame is available, the Operating System must choose a resident Page to remove.",
    sections: [
      {
        title: "How Page Replacement Works",
        paragraphs: [
          "The selected Page is called the victim Page. Its Frame is reused for the required Page.",
          "If the victim is dirty, it may need to be written back first. A clean Page can usually be discarded because its data can be obtained again.",
        ],
        visual: {
          src: "/notes/operating-systems/page-replacement-flow.svg",
          alt: "Page replacement flow from a Page Fault through victim selection, optional dirty Page write-back, loading the required Page, and restarting the instruction.",
          width: 1536,
          height: 1024,
          caption:
            "A dirty victim may need a write-back before its Frame is reused.",
        },
      },
      {
        title: "The Four Main Algorithms",
        paragraphs: [
          "Each algorithm uses a different clue to decide which resident Page is least useful.",
        ],
        dataTable: {
          headers: ["Algorithm", "Victim rule", "Main point"],
          rows: [
            [
              "FIFO",
              "Oldest resident Page",
              "Simple, but may remove a useful Page",
            ],
            [
              "Optimal (OPT)",
              "Next use is farthest in the future",
              "Minimum faults, but future use is unknown",
            ],
            [
              "LRU",
              "Least recently used Page",
              "Uses the past to predict the near future",
            ],
            [
              "Second Chance",
              "First FIFO Page found with R = 0",
              "Practical approximation using a Reference Bit",
            ],
          ],
        },
      },
      {
        title: "FIFO - First-In, First-Out",
        paragraphs: [
          "FIFO removes the Page that entered RAM first. A queue keeps the arrival order.",
          "It is easy to implement, but age does not show usefulness. An old Page may still be used often.",
        ],
      },
      {
        title: "Optimal Page Replacement - OPT",
        paragraphs: [
          "OPT removes the Page whose next use is farthest in the future. A Page that will never be used again is the best victim.",
          "It gives the minimum possible Page Faults for a reference string. Real systems cannot implement it exactly because they do not know future references, so it is used as a benchmark.",
        ],
      },
      {
        title: "Least Recently Used - LRU",
        paragraphs: [
          "LRU removes the Page that has not been accessed for the longest time in the past. It uses Temporal Locality: a recently used Page is likely to be used again soon.",
          "Exact LRU needs full access-order tracking, which is expensive. Real systems usually use an approximation.",
        ],
      },
      {
        title: "Second Chance - Clock",
        paragraphs: [
          "Second Chance keeps Pages in a circular list. Hardware sets a Page's Reference Bit when that Page is used.",
          "If the Clock hand finds R = 1, it clears the bit and skips the Page. If it finds R = 0, it selects that Page as the victim.",
        ],
        visual: {
          src: "/notes/operating-systems/second-chance-clock.svg",
          alt: "Second Chance Clock with a circular group of Frames, Reference Bits, and a Clock hand selecting a Page whose Reference Bit is zero.",
          width: 1536,
          height: 1024,
          caption:
            "Recently used Pages receive one extra chance before replacement.",
        },
      },
      {
        title: "Belady's Anomaly",
        paragraphs: [
          "Belady's Anomaly means that adding more Frames can sometimes increase Page Faults.",
          "FIFO can show this anomaly. LRU and OPT do not. Second Chance is not guaranteed to avoid it.",
        ],
      },
      {
        title: "Worked Numerical - Compare All Four",
        paragraphs: [
          "Use three Frames and this reference string: 7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2.",
          "Each cell shows the Frame contents after the reference. F means Page Fault and H means Hit. For Clock, the table follows the usual circular-hand implementation with every loaded or accessed Page given R = 1.",
        ],
        dataTable: {
          headers: ["Ref", "FIFO", "LRU", "OPT", "Clock"],
          rows: [
            ["7", "7 - - · F", "7 - - · F", "7 - - · F", "7 - - · F"],
            ["0", "7 0 - · F", "7 0 - · F", "7 0 - · F", "7 0 - · F"],
            ["1", "7 0 1 · F", "7 0 1 · F", "7 0 1 · F", "7 0 1 · F"],
            ["2", "2 0 1 · F", "2 0 1 · F", "7 0 2 · F", "2 0 1 · F"],
            ["0", "2 0 1 · H", "2 0 1 · H", "7 0 2 · H", "2 0 1 · H"],
            ["3", "2 3 1 · F", "2 0 3 · F", "3 0 2 · F", "2 0 3 · F"],
            ["0", "2 3 0 · F", "2 0 3 · H", "3 0 2 · H", "2 0 3 · H"],
            ["4", "4 3 0 · F", "4 0 3 · F", "3 4 2 · F", "4 0 3 · F"],
            ["2", "4 2 0 · F", "4 0 2 · F", "3 4 2 · H", "4 2 3 · F"],
            ["3", "4 2 3 · F", "4 3 2 · F", "3 4 2 · H", "4 2 3 · H"],
            ["0", "0 2 3 · F", "0 3 2 · F", "3 0 2 · F", "4 2 0 · F"],
            ["3", "0 2 3 · H", "0 3 2 · H", "3 0 2 · H", "3 2 0 · F"],
            ["2", "0 2 3 · H", "0 3 2 · H", "3 0 2 · H", "3 2 0 · H"],
          ],
        },
        points: [
          "FIFO = 10 Page Faults.",
          "LRU = 9 Page Faults.",
          "OPT = 7 Page Faults.",
          "Second Chance = 9 Page Faults for the stated Clock rules.",
          "Always write the Clock-hand rule and initial Reference Bits because classroom conventions can differ.",
        ],
      },
      {
        title: "Fast Numerical Method",
        paragraphs: [
          "Use the same steps for every question, then apply the selected algorithm's victim rule.",
        ],
        points: [
          "Check for a Hit before replacing anything.",
          "Count the first loads into empty Frames as Page Faults.",
          "FIFO tracks arrival order; a Hit does not change that order.",
          "LRU updates recent-use order on every Hit and Fault.",
          "OPT looks only at future references.",
          "Clock updates Reference Bits and moves its hand after replacement.",
        ],
      },
    ],
    mechanism: {
      title: "Replacing a resident Page",
      steps: [
        "A valid missing Page causes a Page Fault.",
        "The OS finds no usable free Frame.",
        "The selected algorithm chooses a victim Page.",
        "A dirty victim is written back when required.",
        "The required Page is placed in the reclaimed Frame.",
        "The Page Table is updated and the instruction restarts.",
      ],
    },
    example: {
      title: "The same reference string gives different results",
      body: "With three Frames, the worked example gives 10 FIFO faults, 9 LRU faults, 7 OPT faults, and 9 Second Chance faults. The rule used to choose a victim changes the result.",
    },
    misconception:
      "More Frames do not always reduce Page Faults under FIFO. This is Belady's Anomaly.",
  },
  revise: {
    definitionLabel: "Overview",
    compactDefinition: true,
    definition:
      "When no usable free Frame exists, a Page Replacement algorithm selects a resident Page to remove.",
    sections: [
      {
        title: "Replacement Flow",
        steps: [
          "Select a victim Page.",
          "Write it back if it is dirty and must be preserved.",
          "Load the required Page into the reclaimed Frame.",
          "Update the Page Table and restart the instruction.",
        ],
      },
      {
        title: "Algorithm Memory Aid",
        dataTable: {
          headers: ["Algorithm", "Remember", "Tracking"],
          rows: [
            ["FIFO", "Oldest arrival", "Queue"],
            ["OPT", "Farthest future use", "Future references"],
            ["LRU", "Oldest past use", "Recent-use order"],
            ["Clock", "FIFO + second chance", "Reference Bit + hand"],
          ],
        },
      },
      {
        title: "Numerical Rules",
        points: [
          "Hit: Do not count a fault; update LRU or Reference-Bit state when needed.",
          "Miss: Count a fault, then use a free Frame or replace the correct victim.",
          "Worked example totals with three Frames: FIFO 10, LRU 9, OPT 7, Clock 9.",
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "FIFO can show Belady's Anomaly; LRU and OPT do not.",
      "OPT is the theoretical minimum-fault benchmark.",
      "Exact LRU is expensive, so real systems use approximations.",
      "A dirty victim may need a write-back.",
    ],
    followUp: "Why can a practical OS not implement exact OPT?",
  },
  lastMinute: {
    definition:
      "Page Replacement chooses a victim Page when a required Page needs RAM and no usable free Frame exists.",
    sections: [
      {
        title: "Four Rules",
        points: [
          "FIFO: Oldest arrival.",
          "OPT: Farthest next use.",
          "LRU: Oldest past use.",
          "Clock: FIFO order + Reference Bit.",
        ],
        wide: true,
      },
    ],
    cuesLabel: "Key Points",
    cues: [
      "Hit → No Page Fault.",
      "Miss → Count a Page Fault and load or replace.",
      "FIFO can show Belady's Anomaly; LRU and OPT do not.",
      "OPT is best in theory; exact LRU is costly in practice.",
      "Dirty victim → May require write-back.",
    ],
    memoryLineLabel: "Remember This",
    memoryLine: "FIFO = arrival, OPT = future, LRU = past, Clock = R bit.",
    memoryLineAtEnd: true,
    trap: "A Hit can still change LRU order or set a Clock Reference Bit.",
  },
};

export { pageReplacementAlgorithms };
