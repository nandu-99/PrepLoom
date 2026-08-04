import type { SubjectTopic } from "@/lib/subject-content";

const deadlockFundamentalsDetailed: SubjectTopic = {
  slug: "deadlock-fundamentals",
  title: "Deadlock Fundamentals",
  description:
    "Understand why processes become permanently blocked, how resource cycles form, and which four conditions make deadlock possible.",
  readTime: "Detailed note",
  difficulty: "Intermediate",
  tags: ["Deadlock", "Coffman Conditions", "Resource Allocation Graph"],
  learn: {
    opening:
      "A Deadlock happens when a group of processes cannot continue because each process is waiting for a resource held by another process in the same group.",
    sections: [
      {
        title: "Overview",
        paragraphs: [
          "Each process keeps the resources it already holds while waiting for another resource. This creates a waiting cycle.",
          "No process in the cycle can continue, so none of them releases its resources. They remain blocked until the system or a user takes action.",
          "Formally, a set of processes is deadlocked when every process is waiting for an event that only another process in the same set can cause.",
        ],
      },
      {
        title: "Why it Matters",
        paragraphs: [
          "Suppose one process holds a Printer and waits for a Scanner. At the same time, another process holds the Scanner and waits for the Printer.",
          "Neither process can finish. Both resources remain occupied even though no useful work is happening.",
        ],
        points: [
          "Applications may stop responding.",
          "Resources may remain locked.",
          "Other tasks may be forced to wait.",
          "Recovery may require stopping or restarting a process.",
        ],
      },
      {
        title: "Core Concept",
        paragraphs: [
          "A Deadlock is not simply a slow process. It is a group of processes that cannot make progress because their resource requests depend on one another.",
        ],
        flow: [
          "P1 holds R1",
          "P1 waits for R2",
          "P2 holds R2",
          "P2 waits for R1",
          "Neither process can continue",
        ],
        visual: {
          src: "/notes/operating-systems/deadlock-resource-allocation-cycle.png",
          alt: "Resource Allocation Graph showing P1 and P2 in a circular wait for the single-instance resources R1 and R2.",
          width: 1536,
          height: 1024,
          caption:
            "With one instance of each resource, this request and assignment cycle is a Deadlock.",
        },
      },
      {
        title: "Process Example",
        paragraphs: [
          "Process P1 has the Printer and needs the Scanner. Process P2 has the Scanner and needs the Printer.",
        ],
        dataTable: {
          headers: ["Process", "Resource held", "Resource requested"],
          rows: [
            ["P1", "Printer", "Scanner"],
            ["P2", "Scanner", "Printer"],
          ],
        },
      },
      {
        title: "Real-World Analogy",
        paragraphs: [
          "Imagine two people entering a narrow bridge from opposite sides. The bridge is too narrow for them to pass each other.",
          "Each person waits for the other person to move back. If neither moves, both remain stuck. This is similar to a Deadlock.",
        ],
      },
      {
        title: "How a Process Uses a Resource",
        paragraphs: [
          "A process normally follows three steps when using a resource.",
        ],
        flow: ["Request", "Use", "Release"],
        points: [
          "The process waits if the requested resource is unavailable.",
          "After finishing, it should release the resource for another process.",
          "Not releasing a resource causes a resource leak. A Deadlock forms only when the waiting relationships create a cycle or another unsatisfied dependency.",
        ],
      },
      {
        title: "Resources and Resource Types",
        paragraphs: [
          "A resource is something a process needs to continue its work. Examples include a CPU, memory, a file, a lock, a Printer, or a database connection.",
          "Whether a resource can be safely taken away affects how the Operating System can handle a Deadlock.",
        ],
        table: {
          headers: ["Preemptable Resource", "Non-Preemptable Resource"],
          rows: [
            [
              "Can be taken away and restored later without breaking the task",
              "Cannot normally be taken away safely while it is being used",
            ],
            [
              "Examples: CPU time and memory pages that can be moved to storage",
              "Examples: a lock or a Printer during an active operation",
            ],
            [
              "The OS can reassign it",
              "The process normally releases it by itself",
            ],
          ],
        },
      },
      {
        title: "Reusable and Consumable Resources",
        paragraphs: [
          "Resources can also be grouped by whether they are reused or consumed.",
        ],
        table: {
          headers: ["Reusable Resource", "Consumable Resource"],
          rows: [
            ["Used and released for another process", "Created and consumed once"],
            ["Examples: locks, files, Printers", "Examples: messages, signals, events"],
          ],
        },
      },
      {
        title: "Resource Instances",
        paragraphs: [
          "A resource type may have one or more instances. A system with three Printers has three instances of the Printer resource type.",
          "Three processes may each use one Printer at the same time. A fourth process must wait until an instance becomes free.",
          "In a Resource Allocation Graph, dots inside a resource rectangle represent its individual instances.",
        ],
      },
      {
        title: "Resource Allocation Graph (RAG)",
        paragraphs: [
          "A Resource Allocation Graph shows which resources are held and which resources are being requested.",
        ],
        dataTable: {
          headers: ["Part", "Meaning"],
          rows: [
            ["Circle", "A process, such as P1"],
            ["Rectangle", "A resource type, such as R1"],
            ["Dot inside a rectangle", "One instance of that resource type"],
            ["P1 → R1", "P1 is requesting R1"],
            ["R1 → P1", "An instance of R1 is assigned to P1"],
          ],
        },
      },
      {
        title: "What a Cycle Means in a RAG",
        paragraphs: [
          "A cycle means that resource requests return to the process where the chain started.",
        ],
        points: [
          "If every resource type has one instance, a cycle means Deadlock.",
          "If a resource type has multiple instances, a cycle means Deadlock is possible, but it does not prove that Deadlock exists.",
          "No cycle means there is no resource Deadlock in the graph.",
        ],
      },
      {
        title: "Cycle Without Deadlock - Multiple Instances",
        paragraphs: [
          "Suppose R1 has two instances and R2 has one instance. P1 holds one R1 instance and waits for R2. P2 holds R2 and waits for R1. This creates a cycle.",
          "However, P3 holds the second R1 instance and is not waiting for anything. P3 can finish and release R1. P2 can then finish and release R2, allowing P1 to continue.",
          "The cycle shows a risk, but the extra instance and the process that can finish mean the system is not deadlocked.",
        ],
      },
      {
        title: "The Four Coffman Conditions",
        paragraphs: [
          "A resource Deadlock can occur only when all four conditions exist at the same time. If the system prevents even one condition, this type of Deadlock cannot form.",
        ],
        dataTable: {
          headers: ["Condition", "Simple meaning"],
          rows: [
            ["Mutual Exclusion", "At least one resource can be used by only one process at a time."],
            ["Hold and Wait", "A process holds a resource while waiting for another resource."],
            ["No Preemption", "A held resource cannot be safely taken away by force."],
            ["Circular Wait", "A circular chain exists in which every process waits for the next process."],
          ],
        },
        visual: {
          src: "/notes/operating-systems/deadlock-coffman-conditions.png",
          alt: "Four-panel diagram explaining Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait.",
          width: 1536,
          height: 1024,
          caption:
            "All four Coffman conditions must exist together for a resource Deadlock to occur.",
        },
      },
      {
        title: "Deadlock vs Starvation vs Livelock",
        paragraphs: [
          "These problems can all stop a process from finishing, but they happen for different reasons.",
        ],
        dataTable: {
          headers: ["Problem", "What happens", "Is the system active?"],
          rows: [
            ["Deadlock", "Processes wait for one another in a cycle", "The affected processes are blocked"],
            ["Starvation", "A process keeps losing access to a needed resource", "Other processes continue working"],
            ["Livelock", "Processes keep reacting to one another but make no progress", "Processes remain active"],
          ],
        },
      },
      {
        title: "Impact of a Deadlock",
        paragraphs: [
          "A Deadlock wastes resources and stops the affected work from completing.",
        ],
        points: [
          "Affected processes cannot finish their work.",
          "Held resources are not available to other processes.",
          "The system may need to stop a process, take back a resource, or restart part of the work.",
          "Deadlock detection can add extra work to the system.",
        ],
      },
    ],
    mechanism: {
      title: "How a two-process Deadlock forms",
      steps: [
        "P1 acquires R1.",
        "P2 acquires R2.",
        "P1 requests R2 while still holding R1.",
        "P2 requests R1 while still holding R2.",
        "P1 and P2 wait for each other and cannot continue.",
      ],
    },
    example: {
      title: "Printer and Scanner",
      body: "P1 holds the Printer and waits for the Scanner. P2 holds the Scanner and waits for the Printer. Because neither process releases what it holds, both remain blocked.",
    },
    misconception:
      "The four Coffman conditions are necessary for a resource Deadlock, but their presence does not always prove that a Deadlock is happening. For example, a cycle with multiple resource instances may still allow a process to finish.",
  },
  revise: {
    definitionLabel: "Overview",
    compactDefinition: true,
    definition:
      "A set of processes is deadlocked when every process is waiting for an event that only another process in the same set can cause.",
    sections: [
      {
        title: "Core Concept",
        paragraphs: [
          "Each process holds a resource while waiting for another resource held by another process. This creates a circular dependency.",
        ],
        flow: [
          "P1 holds R1",
          "P1 waits for R2",
          "P2 holds R2",
          "P2 waits for R1",
          "Deadlock",
        ],
      },
      {
        title: "Resource Types",
        table: {
          headers: ["Preemptable", "Non-Preemptable"],
          rows: [
            ["Can be safely taken away", "Cannot normally be safely taken away"],
            ["Example: CPU time", "Example: Printer during an active operation"],
          ],
        },
      },
      {
        title: "Resource Lifecycle",
        flow: ["Request", "Use", "Release"],
        points: [
          "Reusable resources are used and released.",
          "Consumable resources are created and consumed once.",
        ],
      },
      {
        title: "Resource Instances",
        paragraphs: [
          "A resource type may have one or more instances. More instances can reduce waiting, but they do not always prevent Deadlock.",
        ],
      },
      {
        title: "Resource Allocation Graph (RAG)",
        points: [
          "Circle → Process",
          "Rectangle → Resource",
          "Dot inside a rectangle → One resource instance.",
          "Process → Resource means a Request Edge.",
          "Resource → Process means an Assignment Edge.",
        ],
      },
      {
        title: "Cycle in a RAG",
        table: {
          headers: ["Single instance", "Multiple instances"],
          rows: [
            ["A cycle means Deadlock", "A cycle means Deadlock may exist"],
          ],
        },
      },
      {
        title: "Coffman Conditions",
        points: [
          "Mutual Exclusion",
          "Hold and Wait",
          "No Preemption",
          "Circular Wait",
        ],
        paragraphs: [
          "All four conditions must exist together for a resource Deadlock to occur.",
        ],
      },
      {
        title: "Deadlock vs Starvation vs Livelock",
        dataTable: {
          headers: ["Deadlock", "Starvation", "Livelock"],
          rows: [
            [
              "Processes wait for one another",
              "One process keeps losing access",
              "Processes stay active but make no progress",
            ],
            [
              "Circular resource waiting",
              "Unfair resource allocation",
              "Continuous state changes without useful work",
            ],
          ],
        },
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Deadlock = Processes wait indefinitely for resources held by one another.",
      "One resource instance + cycle = Deadlock.",
      "Multiple resource instances + cycle = Deadlock may exist.",
      "All four Coffman conditions are required for a resource Deadlock.",
    ],
    followUp: "Why does a cycle prove Deadlock only when every resource type has one instance?",
  },
  lastMinute: {
    definition:
      "A set of processes is deadlocked when every process waits for an event that only another process in the same set can cause.",
    sections: [
      {
        title: "Deadlock Flow",
        flow: [
          "P1 holds R1",
          "P1 waits for R2",
          "P2 holds R2",
          "P2 waits for R1",
          "Deadlock",
        ],
        wide: true,
      },
      {
        title: "Resource Types",
        points: [
          "Preemptable → Can be safely taken away.",
          "Non-Preemptable → Cannot normally be safely taken away.",
        ],
      },
      {
        title: "Resource Allocation Graph (RAG)",
        points: [
          "Circle → Process",
          "Rectangle → Resource",
          "Dot → One resource instance",
          "P → R → Request Edge",
          "R → P → Assignment Edge",
        ],
      },
      {
        title: "Coffman Conditions",
        points: [
          "Mutual Exclusion",
          "Hold and Wait",
          "No Preemption",
          "Circular Wait",
          "All four conditions must exist together for a resource Deadlock to occur.",
        ],
        wide: true,
      },
    ],
    cuesLabel: "Key Points",
    cues: [
      "Deadlock = Processes wait indefinitely because of a circular resource dependency.",
      "A resource type may have one or more instances.",
      "Resource use normally follows Request → Use → Release.",
      "RAG shows resource requests and assignments.",
      "One resource instance + cycle = Deadlock.",
      "Multiple resource instances + cycle = Deadlock may exist.",
      "Deadlock → Processes are blocked and cannot continue.",
      "Starvation → A process never receives a needed resource.",
      "Livelock → Processes remain active but make no progress.",
    ],
    memoryLineLabel: "Remember This",
    memoryLine: "ME + HW + NP + CW = Deadlock can occur.",
    memoryLineAtEnd: true,
    trap: "The Coffman conditions are necessary conditions, not proof that a Deadlock currently exists.",
  },
};

const deadlockPreventionAvoidanceDetailed: SubjectTopic = {
  slug: "deadlock-prevention-and-avoidance",
  title: "Deadlock Prevention and Avoidance",
  description:
    "Compare two ways of stopping deadlocks before they happen: breaking a required condition or granting only safe requests.",
  readTime: "Detailed note",
  difficulty: "Advanced",
  tags: ["Prevention", "Avoidance", "Banker's Algorithm"],
  learn: {
    opening:
      "Deadlock Prevention and Deadlock Avoidance stop resource deadlocks before they happen, but they make allocation decisions in different ways.",
    sections: [
      {
        title: "Overview",
        paragraphs: [
          "Prevention uses fixed rules that make at least one Coffman condition impossible.",
          "Avoidance checks every resource request and grants it only when the system can remain in a Safe State.",
        ],
      },
      {
        title: "Why it Matters",
        paragraphs: [
          "When several processes compete for limited resources, a careless allocation may create a circular dependency.",
          "Prevention and Avoidance check the rules or the system state before granting resources, so processes do not enter a Deadlock.",
        ],
        points: [
          "Stops processes from becoming permanently blocked.",
          "Keeps resources available for useful work.",
          "Reduces the need to terminate processes after a Deadlock.",
        ],
      },
      {
        title: "Core Concept",
        paragraphs: [
          "Both methods act before Deadlock occurs. The difference is what they check.",
        ],
        table: {
          headers: ["Deadlock Prevention", "Deadlock Avoidance"],
          rows: [
            ["Breaks at least one Coffman condition", "Keeps the system in a Safe State"],
            ["Uses fixed allocation rules", "Checks each resource request"],
            ["Does not need future maximum requests", "Needs each process's maximum resource claim"],
          ],
        },
        visual: {
          src: "/notes/operating-systems/deadlock-prevention-vs-avoidance.png",
          alt: "Comparison diagram showing Prevention breaking a Coffman condition and Avoidance checking whether each new state is safe.",
          width: 1536,
          height: 1024,
          caption:
            "Prevention uses fixed rules; Avoidance checks each resource request.",
        },
      },
      {
        title: "Deadlock Prevention",
        paragraphs: [
          "Deadlock Prevention makes at least one Coffman condition impossible. Because all four conditions are required, breaking one condition prevents a resource Deadlock.",
        ],
      },
      {
        title: "Breaking Mutual Exclusion",
        paragraphs: [
          "Make a resource shareable when that is safe. Some resources, such as read-only files, can be shared by many processes.",
          "For a Printer, a print spooler lets processes submit jobs without directly holding the physical Printer. The spooler controls the Printer one job at a time.",
          "This method cannot be used for resources that are naturally non-shareable, such as a lock protecting shared data.",
        ],
      },
      {
        title: "Breaking Hold and Wait - Request Everything Together",
        paragraphs: [
          "Require a process to request every resource it may need before it begins.",
          "A process that cannot receive everything waits without holding any resource.",
          "This is simple, but the process may hold resources long before it uses them. It may also be unable to predict everything it will need.",
        ],
      },
      {
        title: "Breaking Hold and Wait - Release Before Requesting",
        paragraphs: [
          "If a process needs another resource, require it to release everything it currently holds. It then requests the complete set again.",
          "This removes Hold and Wait, but releasing and reacquiring resources adds overhead. The process may also repeatedly lose the resources it needs and starve.",
        ],
      },
      {
        title: "Breaking No Preemption",
        paragraphs: [
          "If a process cannot receive a requested resource, make it release suitable resources that it already holds. It can try again later.",
          "This works only when a resource can be safely saved, taken away, and restored. It is not practical for every resource or operation.",
        ],
      },
      {
        title: "Breaking Circular Wait",
        paragraphs: [
          "Give every resource type a fixed number and require processes to request resources only in increasing order.",
        ],
        flow: ["R1", "R2", "R3", "R4"],
        points: [
          "A process may request R2 after R1.",
          "It may not hold R2 and then request R1.",
          "Because requests cannot return to a lower resource number, a circular chain cannot form.",
        ],
      },
      {
        title: "Limits of Deadlock Prevention",
        paragraphs: [
          "Prevention guarantees that the blocked Coffman condition cannot form, but the strict rules may waste resources and reduce concurrency.",
        ],
        points: [
          "A process may request resources long before it needs them.",
          "Resources may stay unused while other processes wait.",
          "Some resources cannot be shared or safely taken away.",
          "Strict ordering may make program design harder.",
        ],
      },
      {
        title: "Deadlock Avoidance",
        paragraphs: [
          "Deadlock Avoidance does not permanently break a Coffman condition. Instead, the OS checks whether granting a request would leave a safe way for every process to finish.",
          "Avoidance needs advance information about the maximum resources each process may request.",
        ],
      },
      {
        title: "Safe State",
        paragraphs: [
          "A system is in a Safe State when at least one Safe Sequence exists.",
          "In that sequence, each process can receive its remaining resources, finish, and return its resources for the next process.",
          "A Safe State guarantees that the declared maximum needs can be completed without Deadlock.",
        ],
        visual: {
          src: "/notes/operating-systems/deadlock-safe-vs-unsafe-state.png",
          alt: "Comparison of a Safe State with a complete process sequence and an Unsafe State with no guaranteed completion order.",
          width: 1536,
          height: 1024,
          caption:
            "A Safe State has a completion order. An Unsafe State does not guarantee one, but it is not always a Deadlock.",
        },
      },
      {
        title: "Unsafe State",
        paragraphs: [
          "An Unsafe State means the OS cannot find a sequence that guarantees every process can finish.",
          "Unsafe does not mean the system is already deadlocked. It means future requests could cause a Deadlock, so an avoidance algorithm does not enter that state.",
        ],
      },
      {
        title: "Safe Sequence",
        paragraphs: [
          "A Safe Sequence is one possible order in which every process can complete.",
        ],
        flow: ["P2", "P4", "P1", "P3", "P5"],
        points: [
          "P2 can finish with the currently available resources.",
          "P2 returns its resources, allowing another process to finish.",
          "The returned resources continue to support the remaining processes.",
        ],
      },
      {
        title: "Banker's Algorithm",
        paragraphs: [
          "Banker's Algorithm is a Deadlock Avoidance algorithm for resource types that may have multiple instances.",
          "Its name comes from a bank that grants a loan only when it can still satisfy its other customers later.",
          "In the same way, the OS grants a resource request only when the resulting state remains safe.",
          "It is mainly used for learning and controlled systems. General-purpose systems rarely use it for every resource because processes must declare their maximum needs in advance and every request needs a safety check.",
        ],
      },
      {
        title: "Information Used by Banker's Algorithm",
        dataTable: {
          headers: ["Name", "Meaning"],
          rows: [
            ["Available", "Instances of each resource type currently free"],
            ["Maximum", "Maximum instances each process may need"],
            ["Allocated", "Instances currently held by each process"],
            ["Need", "Instances each process may still request"],
          ],
        },
        paragraphs: ["Need = Maximum - Allocated"],
      },
      {
        title: "Resource Request Algorithm",
        paragraphs: [
          "When process Pi makes a request, the OS checks it before changing the real allocation.",
        ],
        points: [
          "Check Request ≤ Need. A larger request is beyond the process's declared maximum.",
          "Check Request ≤ Available. If not enough resources are free, the process waits.",
          "Temporarily allocate the requested resources.",
          "Run the Safety Algorithm on the temporary state.",
          "If the state is safe, keep the allocation. Otherwise, roll it back and make the process wait.",
        ],
      },
      {
        title: "Safety Algorithm",
        paragraphs: [
          "The Safety Algorithm tries to build a Safe Sequence.",
        ],
        points: [
          "Start with Work = Available.",
          "Find an unfinished process whose Need is less than or equal to Work.",
          "Assume that process finishes and add its Allocated resources to Work.",
          "Repeat until every process finishes or no suitable process can be found.",
          "If every process can finish, the state is safe. Otherwise, it is unsafe.",
        ],
      },
      {
        title: "Where to Practise the Algorithms",
        paragraphs: [
          "The Deadlock Numericals topic contains complete matrix examples for the Safety Algorithm, Resource Request Algorithm, RAG analysis, and Detection Algorithm.",
        ],
      },
      {
        title: "Prevention vs Avoidance",
        paragraphs: [
          "The correct method depends on how much the system knows and how strictly it can control resource requests.",
        ],
        dataTable: {
          headers: ["Feature", "Prevention", "Avoidance"],
          rows: [
            ["Main idea", "Break a Coffman condition", "Remain in a Safe State"],
            ["Allocation", "Restricted by fixed rules", "Checked for every request"],
            ["Future maximum need", "Not required", "Required"],
            ["Resource use", "Usually lower", "Usually better"],
            ["Complexity", "Lower", "Higher"],
            ["Common method", "Resource ordering", "Banker's Algorithm"],
          ],
        },
      },
      {
        title: "Trade-Offs",
        paragraphs: [
          "Both methods prevent Deadlock, but they trade simplicity, flexibility, and resource use differently.",
        ],
        table: {
          headers: ["Deadlock Prevention", "Deadlock Avoidance"],
          rows: [
            ["Guarantees Deadlock cannot form under the chosen rule", "Allows more flexible resource allocation"],
            ["May waste resources and reduce concurrency", "Adds safety-checking overhead"],
            ["Does not need maximum future claims", "Needs accurate maximum claims in advance"],
          ],
        },
      },
    ],
    mechanism: {
      title: "How an avoidance decision is made",
      steps: [
        "A process requests one or more resources.",
        "The OS checks the request against Need and Available.",
        "The OS temporarily allocates the resources.",
        "The Safety Algorithm searches for a Safe Sequence.",
        "The OS grants the request only when the temporary state is safe.",
      ],
    },
    example: {
      title: "A bank checking a loan",
      body: "A bank does not lend every available rupee immediately. It checks whether enough money will remain to meet its other commitments. Banker's Algorithm uses the same idea for system resources.",
    },
    misconception:
      "An Unsafe State is not automatically a Deadlock. It means the OS can no longer guarantee that every process will finish if future requests arrive.",
  },
  revise: {
    definitionLabel: "Overview",
    compactDefinition: true,
    definition:
      "Deadlock Prevention and Deadlock Avoidance stop resource deadlocks before they occur. Prevention breaks a Coffman condition, while Avoidance grants resources only when the system remains in a Safe State.",
    sections: [
      {
        title: "Core Concept",
        points: [
          "Prevention uses fixed rules that make at least one Coffman condition impossible.",
          "Avoidance checks whether each request leaves the system in a Safe State.",
        ],
        visual: {
          src: "/notes/operating-systems/deadlock-prevention-vs-avoidance.png",
          alt: "Comparison diagram showing Prevention breaking a Coffman condition and Avoidance checking whether each new state is safe.",
          width: 1536,
          height: 1024,
          caption:
            "Prevention uses fixed rules; Avoidance checks each resource request.",
        },
      },
      {
        title: "Prevention - Breaking the Conditions",
        points: [
          "Mutual Exclusion → Share resources where possible.",
          "Hold and Wait → Request all resources together, or release held resources before requesting more.",
          "No Preemption → Allow suitable resources to be taken back safely.",
          "Circular Wait → Request resources in a fixed order.",
        ],
      },
      {
        title: "Avoidance - Safe-State Check",
        points: [
          "Safe State → At least one Safe Sequence exists.",
          "Unsafe State → Deadlock is possible but not certain.",
          "Safe Sequence → An order in which every process can complete.",
        ],
      },
      {
        title: "Banker's Algorithm",
        points: [
          "The most common Deadlock Avoidance algorithm.",
          "Uses Available, Maximum, Allocated, and Need.",
          "Need = Maximum - Allocated.",
          "Mostly educational or useful in controlled systems because maximum needs must be known in advance.",
        ],
      },
      {
        title: "Resource Request Algorithm",
        steps: [
          "Check Request ≤ Need.",
          "Check Request ≤ Available.",
          "Temporarily allocate the resources.",
          "Run the Safety Algorithm.",
          "Grant the request only if the resulting state is safe.",
        ],
      },
      {
        title: "Prevention vs Avoidance",
        table: {
          headers: ["Prevention", "Avoidance"],
          rows: [
            ["Breaks a Coffman condition", "Maintains a Safe State"],
            ["Uses fixed restrictions", "Checks each request"],
            ["Usually lower resource use", "Usually better resource use"],
            ["Simpler", "More flexible but more complex"],
          ],
        },
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Prevention = Break a Coffman condition.",
      "Avoidance = Stay in a Safe State.",
      "Safe State means at least one Safe Sequence exists.",
      "Unsafe State means Deadlock is possible, not certain.",
      "Banker's Algorithm grants a request only when the new state is safe.",
    ],
    followUp: "Why is an Unsafe State not always a Deadlock?",
  },
  lastMinute: {
    definition:
      "Deadlock Prevention and Deadlock Avoidance stop resource deadlocks before they occur. Prevention breaks a Coffman condition, while Avoidance allocates resources only when the system remains in a Safe State.",
    sections: [
      {
        title: "Approach",
        flow: [
          "Prevent Deadlock",
          "Prevention → Break a Coffman condition",
          "Avoidance → Maintain a Safe State",
        ],
        wide: true,
      },
      {
        title: "Deadlock Prevention",
        points: [
          "Break Mutual Exclusion",
          "Break Hold and Wait",
          "Break No Preemption",
          "Break Circular Wait",
        ],
      },
      {
        title: "Deadlock Avoidance",
        points: [
          "Grant resources only if the system remains safe.",
          "Uses Banker's Algorithm.",
          "Safe State → At least one Safe Sequence exists.",
        ],
      },
    ],
    cuesLabel: "Key Points",
    cues: [
      "Prevention → Makes resource Deadlock impossible by breaking a Coffman condition.",
      "Avoidance → Checks for a Safe State before granting resources.",
      "Safe State → At least one Safe Sequence exists.",
      "Unsafe State → Deadlock is possible but not guaranteed.",
      "Need = Maximum - Allocated.",
      "Banker's Algorithm checks whether granting a request keeps the system safe.",
      "Resource Request Algorithm grants resources only if the resulting state is safe.",
      "Prevention → Simpler, but usually lower resource use.",
      "Avoidance → More flexible, with usually better resource use.",
    ],
    memoryLineLabel: "Remember This",
    memoryLine: "Prevention breaks a condition. Avoidance checks the state.",
    memoryLineAtEnd: true,
    trap: "Unsafe does not mean Deadlocked; it means safe completion is not guaranteed.",
  },
};

const deadlockDetectionRecoveryDetailed: SubjectTopic = {
  slug: "deadlock-detection-and-recovery",
  title: "Deadlock Detection and Recovery",
  description:
    "Learn how a system finds an existing Deadlock and breaks it through termination, resource preemption, or rollback.",
  readTime: "Detailed note",
  difficulty: "Advanced",
  tags: ["Detection", "Wait-for Graph", "Recovery"],
  learn: {
    opening:
      "Deadlock Detection allows a Deadlock to occur, finds the blocked processes, and then uses Recovery to let the system continue.",
    sections: [
      {
        title: "Overview",
        paragraphs: [
          "Prevention and Avoidance act before a Deadlock occurs. Detection and Recovery use a different approach.",
          "The system allows normal resource requests, checks whether a Deadlock has formed, and takes action only when one is found.",
        ],
        points: [
          "Deadlock Detection finds an existing Deadlock.",
          "Deadlock Recovery breaks the Deadlock and releases resources.",
        ],
      },
      {
        title: "Why it Matters",
        paragraphs: [
          "Prevention can restrict resource requests, while Avoidance needs advance information and checks every request.",
          "In a system where Deadlocks are uncommon, allowing normal allocation and checking later may provide better resource use.",
        ],
        points: [
          "Processes follow fewer allocation restrictions.",
          "The system pays the recovery cost only when a Deadlock occurs.",
          "Detection frequency can be adjusted to balance overhead and recovery time.",
        ],
      },
      {
        title: "Core Concept",
        paragraphs: [
          "Detection does not stop a Deadlock from forming. It checks the current waiting relationships or resource requests, identifies the affected processes, and then starts Recovery.",
        ],
        visual: {
          src: "/notes/operating-systems/deadlock-detection-recovery-flow.png",
          alt: "Flow showing normal resource allocation, Deadlock detection, a Deadlock decision, Recovery, and continued execution.",
          width: 1536,
          height: 1024,
          caption:
            "Detection finds an existing Deadlock. Recovery breaks it so the system can continue.",
        },
      },
      {
        title: "When Detection and Recovery Are Used",
        paragraphs: [
          "A system may choose this method when preventing every possible Deadlock would be too restrictive or checking every request would be too expensive.",
        ],
        points: [
          "Deadlocks are expected to be uncommon.",
          "Processes need flexible resource allocation.",
          "The system can accept the cost of detection and possible lost work.",
          "Some form of Recovery is available.",
        ],
      },
      {
        title: "Wait-for Graph - Single Resource Instance",
        paragraphs: [
          "When every resource type has only one instance, a Resource Allocation Graph can be simplified into a Wait-for Graph (WFG).",
          "A Wait-for Graph contains only process nodes. An edge Pi → Pj means Pi is waiting for a resource currently held by Pj.",
          "A cycle in this graph proves that the processes in the cycle are deadlocked.",
        ],
        visual: {
          src: "/notes/operating-systems/deadlock-wait-for-graph.png",
          alt: "Wait-for Graph with P1 waiting for P2, P2 waiting for P3, and P3 waiting for P1, forming a Deadlock cycle.",
          width: 1536,
          height: 1024,
          caption:
            "For single-instance resources, a cycle in the Wait-for Graph means Deadlock.",
        },
      },
      {
        title: "How a Wait-for Graph Is Built",
        paragraphs: [
          "Start with the Resource Allocation Graph and remove each resource node.",
        ],
        points: [
          "If Pi requests a resource held by Pj, add Pi → Pj.",
          "Repeat for every waiting process.",
          "Search the resulting process graph for a directed cycle.",
          "Cycle present → Deadlock.",
          "No cycle → No Deadlock among these single-instance resources.",
        ],
      },
      {
        title: "Detection with Multiple Resource Instances",
        paragraphs: [
          "A Wait-for Graph is not enough when a resource type has several instances. A cycle may exist even though another free instance lets a process finish.",
          "The system instead runs a Detection Algorithm that checks which processes can finish with the currently available resources.",
        ],
        dataTable: {
          headers: ["Information", "Meaning"],
          rows: [
            ["Available", "Free instances of each resource type"],
            ["Allocation", "Instances currently held by each process"],
            ["Request", "Outstanding instances each process is waiting for"],
          ],
        },
      },
      {
        title: "Multiple-Instance Detection Algorithm",
        paragraphs: [
          "The algorithm tries to find an order in which processes can finish and return their resources.",
        ],
        points: [
          "Set Work = Available.",
          "Mark a process as unfinished when it currently holds resources. A process holding nothing cannot be part of the resource-holding cycle checked by this algorithm, because it has nothing to release.",
          "Find an unfinished process Pi whose Requesti ≤ Work.",
          "Assume Pi finishes. Set Work = Work + Allocationi and mark Pi finished.",
          "Repeat until no more unfinished processes can satisfy their requests.",
          "Any process still marked unfinished is deadlocked.",
        ],
        visual: {
          src: "/notes/operating-systems/deadlock-multiple-instance-detection.png",
          alt: "Flowchart of the multiple-instance Deadlock Detection Algorithm using Work, Available, Request, and Allocation.",
          width: 1536,
          height: 1024,
          caption:
            "Processes that remain unfinished after the algorithm stops are deadlocked.",
        },
      },
      {
        title: "Detection vs Safety Algorithm",
        paragraphs: [
          "The Detection Algorithm looks similar to the Safety Algorithm used in Banker's Algorithm, but the information and goal are different.",
        ],
        table: {
          headers: ["Detection Algorithm", "Safety Algorithm"],
          rows: [
            ["Uses current outstanding Request", "Uses maximum remaining Need"],
            ["Finds a Deadlock that already exists", "Checks whether a future allocation is safe"],
            ["Used after normal allocation", "Used before granting a request"],
          ],
        },
      },
      {
        title: "How Often Should Detection Run?",
        paragraphs: [
          "Running detection too often wastes CPU time. Running it too rarely lets a Deadlock hold resources for longer and may involve more processes.",
          "The correct frequency depends on how often Deadlocks occur, how many processes exist, and how expensive Recovery would be.",
        ],
        points: [
          "Run at fixed time intervals.",
          "Run when a resource request has waited unusually long.",
          "Run when system activity or CPU use drops unexpectedly.",
          "Run when a request cannot be granted and the system suspects circular waiting.",
        ],
      },
      {
        title: "Deadlock Recovery",
        paragraphs: [
          "After detection identifies the deadlocked processes, Recovery must break at least one waiting relationship.",
          "The system can terminate work, take back a suitable resource, or restore a process to an earlier state.",
        ],
        visual: {
          src: "/notes/operating-systems/deadlock-recovery-methods.png",
          alt: "Four-panel comparison of terminating all processes, terminating one process, resource preemption, and rollback.",
          width: 1536,
          height: 1024,
          caption:
            "Recovery breaks the Deadlock while trying to lose as little work as possible.",
        },
      },
      {
        title: "Method 1 - Terminate All Deadlocked Processes",
        paragraphs: [
          "Stop every process involved in the Deadlock. Their resources are released immediately.",
        ],
        table: {
          headers: ["Useful because", "Cost"],
          rows: [
            ["Simple and removes the Deadlock immediately", "All unfinished work from those processes is lost"],
          ],
        },
      },
      {
        title: "Method 2 - Terminate One Process at a Time",
        paragraphs: [
          "Stop one selected process, run detection again, and repeat until the Deadlock cycle is broken.",
        ],
        table: {
          headers: ["Useful because", "Cost"],
          rows: [
            ["May preserve more completed work", "May require several victim selections and detection runs"],
          ],
        },
      },
      {
        title: "Method 3 - Resource Preemption",
        paragraphs: [
          "Take a suitable resource from one process and give it to another process so the waiting cycle can break.",
          "This works only when the resource and process state can be safely restored later. A Printer in the middle of printing, for example, may not be safely preempted.",
        ],
        points: [
          "Select a victim process or resource.",
          "Take back the resource safely.",
          "Roll back the affected process if required.",
          "Restart it later when resources are available.",
        ],
      },
      {
        title: "Method 4 - Rollback",
        paragraphs: [
          "Return a process to an earlier saved checkpoint. Work completed after that checkpoint is removed, and the process releases resources acquired after it.",
          "Rollback preserves more work than restarting from the beginning, but checkpoints require storage and management overhead.",
        ],
        table: {
          headers: ["Total Rollback", "Partial Rollback"],
          rows: [
            ["Restart the process from the beginning", "Return to the latest safe checkpoint"],
            ["Simple but loses all completed work", "Preserves more work but needs checkpoint support"],
          ],
        },
        points: [
          "Memory and CPU state may be restored from a checkpoint.",
          "External changes such as completed file writes, sent network data, or physical device actions may be difficult or impossible to undo safely.",
        ],
      },
      {
        title: "Victim Selection",
        paragraphs: [
          "When the system terminates, preempts, or rolls back a process, it should choose the victim with the lowest expected recovery cost.",
        ],
        points: [
          "Process priority.",
          "How much work the process has completed.",
          "How much longer it may need to run.",
          "Number and type of resources it holds.",
          "Resources it still needs.",
          "How many other processes would be affected.",
          "Whether the process is interactive or a background task.",
        ],
      },
      {
        title: "Avoiding Starvation During Recovery",
        paragraphs: [
          "If the system repeatedly selects the same process as the victim, that process may never finish.",
          "Include the number of previous rollbacks or terminations in the victim cost. A process that has already lost work should become less likely to be selected again.",
        ],
      },
      {
        title: "Trade-Offs",
        paragraphs: [
          "Detection and Recovery can allow flexible allocation, but a Deadlock may block work before the next check and Recovery may lose completed work.",
        ],
        table: {
          headers: ["Benefits", "Costs"],
          rows: [
            ["Fewer restrictions on normal allocation", "Deadlocks exist until they are detected"],
            ["Potentially better resource use", "Detection consumes CPU time"],
            ["Recovery runs only after a Deadlock is found", "Termination or rollback may lose work"],
          ],
        },
      },
    ],
    mechanism: {
      title: "How detection and recovery work",
      steps: [
        "Processes receive and request resources normally.",
        "The system runs a suitable detection algorithm.",
        "The algorithm identifies the processes that cannot finish.",
        "The system selects a recovery method and victim.",
        "A process is terminated, preempted, or rolled back.",
        "The waiting cycle breaks and the remaining processes continue.",
      ],
    },
    example: {
      title: "Breaking a two-process Deadlock",
      body: "P1 holds R1 and waits for R2. P2 holds R2 and waits for R1. Detection finds the cycle. If the system rolls P2 back and releases R2, P1 can finish and return R1. P2 can restart later.",
    },
    misconception:
      "A cycle proves Deadlock in a Wait-for Graph for single-instance resources. With multiple instances, the system must run the Detection Algorithm instead of relying only on a cycle.",
  },
  revise: {
    definitionLabel: "Overview",
    compactDefinition: true,
    definition:
      "Deadlock Detection identifies Deadlocks after they occur, and Deadlock Recovery removes them so the system can continue. Unlike Prevention and Avoidance, this approach allows a Deadlock to occur and handles it when necessary.",
    sections: [
      {
        title: "Core Concept",
        points: [
          "Detection → Find whether a Deadlock exists.",
          "Recovery → Break the Deadlock using a suitable recovery method.",
        ],
        visual: {
          src: "/notes/operating-systems/deadlock-detection-recovery-flow.png",
          alt: "Flow showing normal resource allocation, Deadlock detection, a Deadlock decision, Recovery, and continued execution.",
          width: 1536,
          height: 1024,
          caption:
            "Detection finds an existing Deadlock. Recovery breaks it so the system can continue.",
        },
      },
      {
        title: "Wait-for Graph - Single Resource Instance",
        points: [
          "Contains only process nodes.",
          "Pi → Pj means Pi is waiting for a resource held by Pj.",
          "Cycle present → Deadlock.",
          "No cycle → No Deadlock among those single-instance resources.",
        ],
      },
      {
        title: "Multiple Resource Instances",
        points: [
          "A Wait-for Graph is not enough.",
          "Use a Detection Algorithm with Available, Allocation, and outstanding Request.",
          "The algorithm checks whether processes can eventually finish and return resources.",
          "Processes left unfinished are deadlocked.",
        ],
      },
      {
        title: "Detection Frequency",
        table: {
          headers: ["Too frequent", "Too rare"],
          rows: [
            ["High detection overhead", "Deadlocks hold resources for longer"],
            ["May reduce performance", "More processes may become involved"],
          ],
        },
      },
      {
        title: "Recovery Methods",
        points: [
          "Terminate all deadlocked processes.",
          "Terminate one process at a time.",
          "Take back a suitable resource through Resource Preemption.",
          "Use Total Rollback to restart from the beginning.",
          "Use Partial Rollback to return to a saved checkpoint.",
          "Choose the victim with the lowest expected recovery cost.",
          "Avoid repeatedly choosing the same victim, because it may starve.",
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Detection finds a Deadlock after it occurs.",
      "Wait-for Graph cycle → Deadlock for single-instance resources.",
      "Multiple instances require the Detection Algorithm.",
      "Recovery uses termination, Resource Preemption, or Rollback.",
      "Victim Selection should minimize lost work and avoid Starvation.",
    ],
    followUp: "Why is a Wait-for Graph not enough for multiple resource instances?",
  },
  lastMinute: {
    definition:
      "Deadlock Detection finds Deadlocks after they occur, and Deadlock Recovery removes them so the remaining or restarted processes can continue.",
    sections: [
      {
        title: "Flow",
        flow: [
          "Processes execute",
          "Run Deadlock Detection",
          "No Deadlock → Continue",
          "Deadlock found → Recover",
        ],
        wide: true,
      },
      {
        title: "Wait-for Graph (WFG)",
        points: [
          "Used when each resource type has one instance.",
          "Cycle present → Deadlock.",
          "No cycle → No Deadlock among those resources.",
        ],
      },
      {
        title: "Multiple Resource Instances",
        points: [
          "Uses a Detection Algorithm.",
          "Checks whether all processes can eventually finish.",
          "Processes left unfinished are deadlocked.",
        ],
      },
      {
        title: "Recovery Methods",
        points: [
          "Terminate all deadlocked processes.",
          "Terminate one process at a time.",
          "Use Resource Preemption.",
          "Total Rollback → Restart from the beginning.",
          "Partial Rollback → Return to a checkpoint.",
        ],
      },
    ],
    cuesLabel: "Key Points",
    cues: [
      "Detection identifies an existing Deadlock.",
      "Recovery breaks the Deadlock.",
      "Too-frequent detection adds overhead.",
      "Too-rare detection lets Deadlocks hold resources longer.",
      "Victim Selection chooses the process with the lowest expected recovery cost.",
      "Avoid repeatedly selecting the same victim, because it may starve.",
      "Detection and Recovery may improve resource use compared with strict Prevention, but detection and recovery add overhead.",
    ],
    memoryLineLabel: "Remember This",
    memoryLine: "Detect the Deadlock. Break the waiting cycle.",
    memoryLineAtEnd: true,
    trap: "A Wait-for Graph cycle rule applies to single-instance resources.",
  },
};

export {
  deadlockFundamentalsDetailed,
  deadlockPreventionAvoidanceDetailed,
  deadlockDetectionRecoveryDetailed,
};
