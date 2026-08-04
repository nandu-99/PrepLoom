import type { SubjectTopic } from "@/lib/subject-content";

const deadlockNumericals: SubjectTopic = {
  slug: "deadlock-numericals",
  title: "Deadlock Numericals",
  description:
    "Practise RAG analysis, Banker's Algorithm, resource requests, and multiple-instance Deadlock Detection with complete examples.",
  readTime: "Detailed note",
  difficulty: "Advanced",
  tags: ["Numericals", "Banker's Algorithm", "Detection"],
  learn: {
    opening:
      "Deadlock numericals test whether you can apply the rules to a Resource Allocation Graph or a resource matrix.",
    sections: [
      {
        title: "Overview",
        paragraphs: [
          "The theory tells us what a Safe State or Deadlock means. A numerical question asks us to prove it using the given resources and processes.",
          "This topic covers the four common interview question types.",
        ],
        points: [
          "Find a cycle in a Resource Allocation Graph.",
          "Run Banker's Safety Algorithm.",
          "Check whether a new resource request can be granted.",
          "Run the multiple-instance Detection Algorithm.",
        ],
      },
      {
        title: "1. RAG Cycle Analysis",
        paragraphs: [
          "First check whether every resource type has one instance or multiple instances.",
        ],
        table: {
          headers: ["Single instance", "Multiple instances"],
          rows: [
            ["A cycle proves Deadlock", "A cycle shows possible Deadlock"],
            ["No cycle means no current Deadlock", "Run a completion or Detection check"],
          ],
        },
      },
      {
        title: "RAG Example - Cycle but No Deadlock",
        paragraphs: [
          "R1 has two instances and R2 has one instance.",
        ],
        dataTable: {
          headers: ["Process", "Currently holds", "Currently requests"],
          rows: [
            ["P1", "One R1 instance", "R2"],
            ["P2", "R2", "One R1 instance"],
            ["P3", "Second R1 instance", "Nothing"],
          ],
        },
        points: [
          "P1 and P2 form a cycle.",
          "P3 is not waiting, so it can finish and release its R1 instance.",
          "P2 receives R1, finishes, and releases R2.",
          "P1 receives R2 and finishes.",
          "A cycle exists, but the processes are not deadlocked.",
        ],
      },
      {
        title: "2. Banker's Algorithm - Given Data",
        paragraphs: [
          "The following example has three resource types: A, B, and C.",
          "Available = [3, 3, 2]",
        ],
        dataTable: {
          headers: ["Process", "Allocation", "Maximum", "Need"],
          rows: [
            ["P0", "0 1 0", "7 5 3", "7 4 3"],
            ["P1", "2 0 0", "3 2 2", "1 2 2"],
            ["P2", "3 0 2", "9 0 2", "6 0 0"],
            ["P3", "2 1 1", "2 2 2", "0 1 1"],
            ["P4", "0 0 2", "4 3 3", "4 3 1"],
          ],
        },
      },
      {
        title: "Calculate Need",
        paragraphs: ["Need = Maximum - Allocation"],
        points: [
          "P0: [7, 5, 3] - [0, 1, 0] = [7, 4, 3]",
          "P1: [3, 2, 2] - [2, 0, 0] = [1, 2, 2]",
          "Calculate every row before searching for a Safe Sequence.",
        ],
      },
      {
        title: "Run the Safety Algorithm",
        paragraphs: [
          "Start with Work = Available = [3, 3, 2]. Select any unfinished process whose Need is less than or equal to Work.",
        ],
        dataTable: {
          headers: ["Step", "Process", "Need", "Work after completion"],
          rows: [
            ["1", "P1", "1 2 2", "5 3 2"],
            ["2", "P3", "0 1 1", "7 4 3"],
            ["3", "P4", "4 3 1", "7 4 5"],
            ["4", "P0", "7 4 3", "7 5 5"],
            ["5", "P2", "6 0 0", "10 5 7"],
          ],
        },
        points: [
          "Safe Sequence: P1 → P3 → P4 → P0 → P2.",
          "Every process can finish, so the system is in a Safe State.",
          "A different correct Safe Sequence may also exist.",
        ],
      },
      {
        title: "3. Safe Resource Request",
        paragraphs: [
          "Suppose P1 requests [1, 0, 2].",
        ],
        points: [
          "Request ≤ Need: [1, 0, 2] ≤ [1, 2, 2].",
          "Request ≤ Available: [1, 0, 2] ≤ [3, 3, 2].",
          "Temporarily set Available = [2, 3, 0].",
          "P1's new Allocation becomes [3, 0, 2].",
          "P1's new Need becomes [0, 2, 0].",
          "The Safety Algorithm still finds a Safe Sequence, so the request can be granted.",
        ],
      },
      {
        title: "Unsafe Resource Request",
        paragraphs: [
          "Suppose P4 requests [3, 3, 0] from the original state.",
        ],
        points: [
          "The request is within P4's Need and the current Available vector.",
          "Temporary Available becomes [0, 0, 2].",
          "No unfinished process has Need less than or equal to [0, 0, 2].",
          "The temporary state is Unsafe, so the OS rolls back the allocation and makes P4 wait.",
          "The request is rejected even though the resources were currently available.",
        ],
      },
      {
        title: "4. Multiple-Instance Detection Example",
        paragraphs: [
          "Detection uses the current outstanding Request, not the declared Maximum or remaining Need.",
          "Available = [0, 0]",
        ],
        dataTable: {
          headers: ["Process", "Allocation A B", "Request A B"],
          rows: [
            ["P0", "1 0", "0 1"],
            ["P1", "0 1", "1 0"],
            ["P2", "1 0", "0 1"],
          ],
        },
        points: [
          "Start with Work = [0, 0].",
          "P0 and P2 both need one B instance, but none is available.",
          "P1 needs one A instance, but none is available.",
          "No process can finish and release its Allocation.",
          "P0, P1, and P2 remain unfinished, so all three are deadlocked.",
        ],
      },
      {
        title: "Common Mistakes",
        paragraphs: [
          "Most wrong answers come from mixing the algorithms or updating Work incorrectly.",
        ],
        points: [
          "Use Need = Maximum - Allocation for Banker's Algorithm.",
          "Use the current Request matrix for Detection.",
          "Add Allocation to Work only after assuming that process finishes.",
          "Unsafe does not mean a Deadlock already exists.",
          "A RAG cycle proves Deadlock only for single-instance resources.",
          "Always run the Safety Algorithm after a temporary resource allocation.",
        ],
      },
    ],
    mechanism: {
      title: "How to solve a Deadlock numerical",
      steps: [
        "Identify whether the question uses a RAG, Banker's Algorithm, or Detection Algorithm.",
        "Write the given Available, Allocation, Maximum, Need, or Request values clearly.",
        "Use the correct rule for that algorithm.",
        "Update Work only after a process can finish.",
        "Stop when every process finishes or no unfinished process can continue.",
        "State the Safe Sequence or list the deadlocked processes.",
      ],
    },
    example: {
      title: "Why an available request may be rejected",
      body: "P4's request [3, 3, 0] is currently available, but granting it leaves no process able to finish. Banker's Algorithm rejects it because the resulting state is Unsafe.",
    },
    misconception:
      "Available resources are not enough to approve a request. Banker's Algorithm must also confirm that the resulting state has a Safe Sequence.",
  },
  revise: {
    definitionLabel: "Overview",
    compactDefinition: true,
    definition:
      "Deadlock numericals apply RAG cycle rules, Banker's Algorithm, and the Detection Algorithm to process and resource data.",
    sections: [
      {
        title: "RAG Rule",
        table: {
          headers: ["Single instance", "Multiple instances"],
          rows: [
            ["Cycle means Deadlock", "Cycle means Deadlock may exist"],
          ],
        },
      },
      {
        title: "Banker's Algorithm",
        points: [
          "Need = Maximum - Allocation.",
          "Start Work = Available.",
          "Find Need ≤ Work.",
          "After completion: Work = Work + Allocation.",
          "All processes finish → Safe State.",
        ],
      },
      {
        title: "Resource Request Check",
        steps: [
          "Check Request ≤ Need.",
          "Check Request ≤ Available.",
          "Allocate temporarily.",
          "Run the Safety Algorithm.",
          "Grant only if the new state is safe.",
        ],
      },
      {
        title: "Detection Algorithm",
        points: [
          "Uses Available, Allocation, and current Request.",
          "Start Work = Available.",
          "Find Request ≤ Work.",
          "Processes left unfinished are deadlocked.",
        ],
      },
      {
        title: "Important Difference",
        table: {
          headers: ["Banker's Algorithm", "Detection Algorithm"],
          rows: [
            ["Uses remaining Need", "Uses current outstanding Request"],
            ["Checks future safety", "Finds a current Deadlock"],
          ],
        },
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Safe Sequence → Every process can finish in some order.",
      "Unsafe State → Safe completion is not guaranteed.",
      "A request is granted only after the temporary state passes the Safety Algorithm.",
      "Detection lists processes that remain unfinished.",
    ],
    followUp: "Why can an available resource request still be rejected?",
  },
  lastMinute: {
    definition:
      "Deadlock numericals check whether a state is safe, unsafe, or already deadlocked.",
    sections: [
      {
        title: "Banker's Checklist",
        points: [
          "Need = Maximum - Allocation",
          "Work = Available",
          "Find Need ≤ Work",
          "Work = Work + Allocation",
          "All Finish = true → Safe",
        ],
      },
      {
        title: "Request Checklist",
        points: [
          "Request ≤ Need",
          "Request ≤ Available",
          "Temporarily allocate",
          "Run Safety Algorithm",
        ],
      },
      {
        title: "Detection Checklist",
        points: [
          "Use current Request, not Maximum Need.",
          "Processes left unfinished are deadlocked.",
        ],
      },
    ],
    cuesLabel: "Key Points",
    cues: [
      "Single-instance RAG cycle → Deadlock.",
      "Multiple-instance RAG cycle → Deadlock may exist.",
      "Unsafe does not mean Deadlocked.",
      "Available does not automatically mean a request is safe.",
      "A different Safe Sequence may also be correct.",
    ],
    memoryLineLabel: "Remember This",
    memoryLine: "Calculate, test completion, then state the result.",
    memoryLineAtEnd: true,
    trap: "Do not use Need in Detection; use the current Request matrix.",
  },
};

export { deadlockNumericals };
