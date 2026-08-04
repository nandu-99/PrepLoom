import type { SubjectTopic } from "@/lib/subject-content";

const processSynchronizationDetailed: SubjectTopic = {
  slug: "process-synchronization-race-conditions-critical-sections",
  title: "Race Conditions & Critical Sections",
  description:
    "Understand how concurrent tasks share data, how race conditions happen, and what a correct critical-section solution must guarantee.",
  readTime: "Detailed note",
  difficulty: "Intermediate",
  tags: ["Synchronization", "Race Condition", "Critical Section"],
  learn: {
    opening:
      "Process Synchronization coordinates concurrent processes or threads so they can share data and resources safely.",
    sections: [
      {
        title: "Overview",
        paragraphs: [
          "A multitasking Operating System can run many processes and threads during the same period. Some of them need to use the same data or resource.",
          "Examples include a bank balance, shared counter, file, printer, memory area, or database record.",
          "If concurrent tasks change the same data without coordination, the final result may be incorrect. Synchronization provides rules that keep shared data correct and consistent.",
        ],
      },
      {
        title: "Why it Matters",
        paragraphs: [
          "Imagine that two customers try to buy the final item in an online store. Both requests read that one item is available before either request updates the inventory.",
          "Without synchronization, both purchases may succeed even though only one item existed.",
        ],
        points: [
          "Incorrect or lost data",
          "Different results from the same input",
          "Inconsistent system state",
          "Bugs that are difficult to reproduce",
        ],
      },
      {
        title: "Concurrent Execution and Interleaving",
        paragraphs: [
          "Concurrency means multiple tasks make progress during the same period.",
          "On a single-core CPU, only one task runs at an instant. The CPU switches between tasks, and their instructions become interleaved.",
          "On a multi-core CPU, tasks may also run in parallel. Race conditions can happen with either interleaving or true parallel execution.",
        ],
        visual: {
          src: "/notes/operating-systems/synchronization-interleaving-v2.png",
          alt: "Diagram showing Process A and Process B taking alternating execution slices on a single-core CPU timeline.",
          width: 1536,
          height: 1024,
          caption:
            "A single CPU runs one task at a time but switches between tasks so that both make progress.",
        },
      },
      {
        title: "Shared Data and Shared Resources",
        paragraphs: [
          "Shared data is data that more than one process or thread can access. A shared resource is something that multiple tasks need to use.",
          "Inside one process, threads naturally share data and heap memory. Separate processes need an explicit sharing method such as shared memory, a file, or another IPC mechanism.",
        ],
        points: [
          "Shared variable or memory area",
          "Shared file or database record",
          "Shared printer or device",
          "Shared queue, cache, or counter",
        ],
      },
      {
        title: "Race Condition",
        paragraphs: [
          "A Race Condition happens when concurrent tasks access shared mutable data without enough coordination and the result depends on timing or instruction interleaving.",
          "The result may be correct in one execution and wrong in another. This makes race conditions difficult to reproduce and debug.",
        ],
      },
      {
        title: "Lost Update Example",
        paragraphs: [
          "Suppose counter starts at 5 and two threads both execute counter++.",
          "The increment looks like one statement, but it normally involves three steps: read the current value, add one, and write the new value.",
          "Both threads can read 5 before either writes. They both calculate 6 and both write 6. One increment disappears, so the actual result is 6 instead of 7.",
        ],
        visual: {
          src: "/notes/operating-systems/lost-update-race-v2.png",
          alt: "Lost update timeline where two threads read counter 5, both calculate 6, and both write 6, producing 6 instead of the expected 7.",
          width: 1536,
          height: 1024,
          caption:
            "The second write overwrites the effect of the first update, so one increment is lost.",
        },
      },
      {
        title: "Critical Section",
        paragraphs: [
          "A Critical Section is the part of a program that accesses shared data or a shared resource and therefore needs protection.",
          "For one protected resource, only one participating process or thread should execute the conflicting critical section at a time.",
          "Different tasks can still run other code, and critical sections protecting different independent resources may run at the same time.",
        ],
        points: [
          "Entry Section: Requests permission to enter.",
          "Critical Section: Reads or changes the shared resource.",
          "Exit Section: Releases access.",
          "Remainder Section: Runs code that does not need this protected resource.",
        ],
        visual: {
          src: "/notes/operating-systems/critical-section-structure-v2.png",
          alt: "Flow diagram showing Entry Section, Critical Section, Exit Section, and Remainder Section in order.",
          width: 1536,
          height: 1024,
          caption:
            "A task requests access, uses the shared resource, releases access, and continues with other work.",
        },
      },
      {
        title: "Requirements of a Correct Solution",
        paragraphs: [
          "A correct solution to the critical-section problem should satisfy three requirements.",
        ],
        points: [
          "Mutual Exclusion: At most one participant executes the protected critical section at a time.",
          "Progress: If the critical section is free and tasks want to enter, the choice of the next task cannot be delayed forever.",
          "Bounded Waiting: After a task requests entry, there is a limit on how many times other tasks may enter before it gets its turn.",
        ],
        visual: {
          src: "/notes/operating-systems/critical-section-requirements-v2.png",
          alt: "Diagram showing Mutual Exclusion, Progress, and Bounded Waiting as the three requirements of correct synchronization.",
          width: 1536,
          height: 1024,
          caption:
            "A correct solution protects the resource, keeps the system moving, and prevents unlimited waiting.",
        },
      },
      {
        title: "Atomic Operation",
        paragraphs: [
          "An Atomic Operation appears as one indivisible step to other concurrent tasks. They cannot observe it in a half-completed state.",
          "For example, an atomic read-modify-write operation completes as one protected action. Another task cannot place a conflicting operation between its read and write parts.",
          "Atomic operations are the foundation used to build locks and other synchronization tools.",
        ],
        table: {
          headers: ["Non-Atomic Update", "Atomic Update"],
          rows: [
            ["Read, modify, and write can interleave", "Appears as one indivisible action"],
            ["Another task may change the value in between", "No partial update is visible"],
            ["Can cause a lost update", "Can protect the update from that race"],
          ],
        },
      },
      {
        title: "Important Trade-Offs",
        paragraphs: [
          "Synchronization makes concurrent programs correct, but it also adds coordination work.",
        ],
        points: [
          "Benefit: Prevents race conditions and protects shared data.",
          "Benefit: Makes concurrent results reliable and consistent.",
          "Cost: Waiting and synchronization operations add overhead.",
          "Cost: Protecting too much code can reduce parallelism.",
          "Risk: Incorrect locking can cause deadlock or starvation.",
        ],
      },
    ],
    mechanism: {
      title: "How two increments lose one update",
      steps: [
        "The shared counter starts at 5.",
        "Thread 1 reads the value 5.",
        "Before Thread 1 writes, Thread 2 also reads 5.",
        "Both threads calculate the new value 6.",
        "Thread 1 writes 6.",
        "Thread 2 also writes 6.",
        "The final value is 6 instead of 7, so one update is lost.",
      ],
    },
    example: {
      title: "Two withdrawals from one account",
      body: "Two requests read the same ₹1000 balance and both try to withdraw ₹500. Without synchronization, both can approve the withdrawal using the old balance. A protected critical section makes one withdrawal finish before the other checks and updates the balance.",
    },
    misconception:
      "A race condition does not require two tasks to run at the exact same instant. Unsafe instruction interleaving on a single-core CPU is enough.",
  },
  revise: {
    definitionLabel: "Overview",
    compactDefinition: true,
    definition:
      "Process Synchronization coordinates processes or threads so they can safely use shared data and resources without producing incorrect results.",
    sections: [
      {
        title: "Why it Matters",
        paragraphs: [
          "When concurrent tasks access and change the same data without coordination, the data may become inconsistent.",
        ],
        points: [
          "Produces correct results.",
          "Maintains data consistency.",
          "Allows safe resource sharing.",
          "Improves system reliability.",
        ],
      },
      {
        title: "Core Concept",
        paragraphs: [
          "Multiple tasks may access the same shared data while their instructions are interleaved. Without proper coordination, this can cause a Race Condition.",
        ],
        visual: {
          src: "/notes/operating-systems/lost-update-race-v2.png",
          alt: "Lost update timeline where two threads produce 6 instead of the expected value 7.",
          width: 1536,
          height: 1024,
          caption:
            "Two threads read the same old value, so one increment is lost.",
        },
      },
      {
        title: "Step-by-Step Working",
        steps: [
          "Multiple processes or threads execute concurrently.",
          "Two tasks access the same shared data.",
          "Their read and write steps become interleaved.",
          "Unsafe interleaving may produce an incorrect result.",
          "Synchronization protects the critical section and coordinates access.",
        ],
      },
      {
        title: "Concurrent Execution and Shared Data",
        paragraphs: [
          "On one CPU core, tasks make progress through interleaving. On multiple cores, they may also run in parallel.",
        ],
        points: [
          "Shared variable or counter",
          "Shared file or memory area",
          "Shared database record",
          "Shared device or resource",
        ],
      },
      {
        title: "Race Condition and Lost Update",
        paragraphs: [
          "A Race Condition makes the result depend on timing or instruction interleaving.",
          "If two threads increment a counter from 5, both may read 5 and write 6. The expected value is 7, but the actual value becomes 6. One update is lost.",
        ],
      },
      {
        title: "Critical Section",
        paragraphs: [
          "A Critical Section is the part of a program that accesses protected shared data or a shared resource.",
        ],
        flow: [
          "Entry Section",
          "Critical Section",
          "Exit Section",
          "Remainder Section",
        ],
      },
      {
        title: "Correct Synchronization Requirements",
        points: [
          "Mutual Exclusion: Only one participant enters the protected critical section at a time.",
          "Progress: If entry is requested while the critical section is free, the next choice cannot be delayed forever.",
          "Bounded Waiting: There is a limit on how many times other participants may enter before a waiting task gets its turn.",
        ],
      },
      {
        title: "Atomic Operation",
        paragraphs: [
          "An Atomic Operation appears as one indivisible action to other tasks. They cannot observe it in a half-completed state.",
        ],
      },
      {
        title: "Benefits and Costs",
        table: {
          headers: ["Benefits", "Costs"],
          rows: [
            ["Prevents race conditions", "Adds synchronization overhead"],
            ["Maintains consistent data", "Poor locking can cause deadlock"],
            ["Allows safe resource sharing", "Too much locking reduces parallelism"],
          ],
        },
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Synchronization coordinates concurrent access to shared resources.",
      "A Race Condition makes the result depend on timing or interleaving.",
      "A Lost Update happens when one write overwrites another update.",
      "Critical-section structure: Entry, Critical Section, Exit, Remainder.",
      "Correct solutions provide Mutual Exclusion, Progress, and Bounded Waiting.",
      "Atomic operations appear indivisible to other concurrent tasks.",
    ],
    followUp: "",
  },
  lastMinute: {
    definition:
      "Process Synchronization ensures that concurrent processes or threads safely access shared resources without producing incorrect results.",
    sections: [
      {
        title: "Main Flow",
        flow: [
          "Concurrent Tasks",
          "Shared Data",
          "Critical Section",
          "Synchronization",
          "Correct Result",
        ],
        wide: true,
      },
      {
        title: "Critical-Section Structure",
        flow: [
          "Entry Section",
          "Critical Section",
          "Exit Section",
          "Remainder Section",
        ],
        wide: true,
      },
      {
        title: "Remember This",
        points: [
          "Shared data can be accessed by multiple processes or threads.",
          "A Race Condition happens when unsafe timing or interleaving changes the result.",
          "A Lost Update happens when one update overwrites another.",
          "A Critical Section contains code that accesses a protected shared resource.",
          "An Atomic Operation appears as one indivisible action to other tasks.",
        ],
        wide: true,
      },
    ],
    cuesLabel: "Key Points",
    cues: [
      "Concurrent Execution = Multiple tasks make progress through interleaving or parallel execution.",
      "Race Condition = Result depends on unsafe timing or interleaving.",
      "Lost Update = One write overwrites another update.",
      "Critical Section = Code that accesses protected shared data or resources.",
      "Correct Synchronization = Mutual Exclusion + Progress + Bounded Waiting.",
      "Atomic Operation = Appears as one indivisible operation to other tasks.",
      "Classic Example = Two threads increment the same counter but one increment is lost.",
    ],
    memoryLineLabel: "Remember This",
    memoryLine:
      "Shared Data + Unsafe Interleaving = Race Condition.",
    memoryLineAtEnd: true,
    trap:
      "A race condition can happen through interleaving on one CPU. True parallel execution is not required.",
  },
};

const softwareBasedSynchronizationDetailed: SubjectTopic = {
  slug: "software-based-synchronization-solutions",
  title: "Software-Based Solutions",
  description:
    "Learn how lock variables, strict alternation, interest flags, Dekker's Algorithm, and Peterson's Algorithm try to protect a critical section.",
  readTime: "Detailed note",
  difficulty: "Intermediate",
  tags: ["Lock Variable", "Dekker", "Peterson"],
  learn: {
    opening:
      "Software-based synchronization solutions use shared variables and program logic to control entry into a critical section.",
    sections: [
      {
        title: "Overview",
        paragraphs: [
          "After finding a critical section, the next problem is deciding which process may enter it.",
          "Software-based solutions try to make this decision using only shared variables and instructions in the program. They help explain why synchronization is difficult and how correct solutions were developed.",
          "The main solutions studied here are the Lock Variable, Strict Alternation, Individual Interest Flags, Dekker's Algorithm, and Peterson's Algorithm.",
        ],
      },
      {
        title: "Core Concept",
        paragraphs: [
          "For two processes, P0 and P1, each solution defines an entry rule and an exit rule.",
          "The entry rule decides whether a process may enter. The exit rule updates shared information so another process can enter.",
        ],
        flow: [
          "Request Entry",
          "Check Shared State",
          "Critical Section",
          "Release Access",
        ],
      },
      {
        title: "Lock Variable",
        paragraphs: [
          "The simplest idea uses one shared variable named lock.",
          "lock = 0 means the critical section is free. lock = 1 means it is occupied.",
          "A process checks whether lock is 0. If it is free, the process sets lock to 1 and enters. When it leaves, it sets lock back to 0.",
        ],
        table: {
          headers: ["Lock Value", "Meaning"],
          rows: [
            ["0", "Critical section is free"],
            ["1", "Critical section is occupied"],
          ],
        },
      },
      {
        title: "Why the Lock Variable Fails",
        paragraphs: [
          "Checking lock == 0 and setting lock = 1 are two separate operations. The CPU can switch processes between them.",
          "Suppose both processes read lock while it is 0. Each process believes the critical section is free. Both then set lock to 1 and enter.",
          "This is the Check-Then-Set Problem. The plain lock variable does not guarantee Mutual Exclusion.",
        ],
        points: [
          "P0 reads lock = 0.",
          "The CPU switches to P1 before P0 changes the lock.",
          "P1 also reads lock = 0, sets it to 1, and enters.",
          "P0 continues, sets lock to 1, and also enters.",
          "Both processes are now inside the critical section.",
        ],
        visual: {
          src: "/notes/operating-systems/lock-variable-check-then-set.png",
          alt: "Timeline showing P0 and P1 both reading a free lock before setting it, which lets both processes enter the critical section.",
          width: 1536,
          height: 1024,
          caption:
            "Checking and setting the lock are separate steps, so a context switch can let both processes enter.",
        },
      },
      {
        title: "Strict Alternation",
        paragraphs: [
          "Strict Alternation uses one shared variable named turn. turn = 0 allows P0 to enter, and turn = 1 allows P1 to enter.",
          "After leaving the critical section, each process gives the turn to the other process.",
          "Only the process whose turn matches its number may enter, so Mutual Exclusion is maintained.",
        ],
        table: {
          headers: ["Turn Value", "Process Allowed to Enter"],
          rows: [
            ["0", "P0"],
            ["1", "P1"],
          ],
        },
      },
      {
        title: "Why Strict Alternation Fails",
        paragraphs: [
          "Strict Alternation forces the processes to take turns even when only one process wants to enter.",
          "Suppose P0 leaves and gives the turn to P1. If P1 is not interested, P0 still cannot enter again because P1 never changes the turn.",
          "Mutual Exclusion is satisfied, but Progress is violated. A free critical section can remain unused even while P0 wants to enter.",
        ],
        visual: {
          src: "/notes/operating-systems/strict-alternation-progress.png",
          alt: "Strict alternation flow where P0 gives the turn to P1, but P1 is not interested, so P0 remains blocked while the critical section is free.",
          width: 1536,
          height: 1024,
          caption:
            "P0 cannot enter again until P1 changes the turn, even though P1 does not want the critical section.",
        },
      },
      {
        title: "Individual Interest Flags",
        paragraphs: [
          "The next idea gives each process its own flag. flag[0] shows whether P0 wants to enter, and flag[1] shows whether P1 wants to enter.",
          "Before entering, a process raises its own flag and waits while the other process's flag is true. After leaving, it lowers its flag.",
          "This removes forced alternation, but a new problem appears when both processes raise their flags at nearly the same time.",
        ],
        points: [
          "P0 raises flag[0].",
          "P1 raises flag[1].",
          "P0 sees flag[1] and waits.",
          "P1 sees flag[0] and waits.",
          "Neither process lowers its flag because neither enters the Critical Section.",
        ],
        visual: {
          src: "/notes/operating-systems/interest-flags-progress-failure.png",
          alt: "P0 and P1 both raise their interest flags, see the other flag is true, and wait while the critical section remains free.",
          width: 1536,
          height: 1024,
          caption:
            "Both processes wait forever even though the Critical Section is free, so Progress fails.",
        },
      },
      {
        title: "Why Interest Flags Fail",
        paragraphs: [
          "If both processes show interest before either checks the other flag, both wait forever.",
          "Mutual Exclusion is not broken because neither process enters. The failure is Progress: the Critical Section is free, but no process can continue.",
          "Dekker's and Peterson's algorithms add a turn variable to resolve this tie.",
        ],
      },
      {
        title: "Dekker's Algorithm",
        paragraphs: [
          "Dekker's Algorithm is an early correct two-process solution. It combines interest flags with a turn variable to resolve simultaneous requests.",
          "Under its required assumptions, it provides Mutual Exclusion, Progress, and Bounded Waiting. It is historically important, but Peterson's Algorithm is simpler and more useful for interviews.",
        ],
        points: [
          "Uses flag[2] and turn.",
          "Correct for two processes, but difficult to implement.",
        ],
      },
      {
        title: "Peterson's Algorithm",
        paragraphs: [
          "Peterson's Algorithm is a simpler classical solution for two processes. It also uses flag[2] and turn.",
          "Each process first shows interest by setting its own flag to true. It then gives the other process priority by setting turn to the other process.",
          "A process waits only when the other process is interested and the turn currently favours the other process.",
        ],
        points: [
          "For process Pi, let j be the other process.",
          "Set flag[i] = true to show interest.",
          "Set turn = j to let the other process win a tie.",
          "Wait while flag[j] is true and turn equals j.",
          "Enter the critical section when the wait condition becomes false.",
          "Set flag[i] = false after leaving.",
        ],
        visual: {
          src: "/notes/operating-systems/peterson-algorithm-flow.png",
          alt: "Peterson's Algorithm for P0 and P1 using two interest flags and a shared turn variable before one process enters the critical section.",
          width: 1536,
          height: 1024,
          caption:
            "The flags show interest, and turn resolves the case where both processes request entry together.",
        },
      },
      {
        title: "How Peterson's Algorithm Resolves a Tie",
        paragraphs: [
          "If only one process wants to enter, the other flag is false, so the interested process enters without waiting.",
          "If both processes want to enter, both flags become true. The final value written to turn decides which process waits.",
          "The process that does not get the turn enters first. When it leaves and clears its flag, the waiting process can enter.",
        ],
        flow: [
          "Raise Own Flag",
          "Give Other Process the Turn",
          "Wait Only if Both Conditions Hold",
          "Enter Critical Section",
          "Lower Own Flag",
        ],
      },
      {
        title: "Why Peterson's Algorithm is Correct",
        paragraphs: [
          "Peterson's entry rules handle both the single-process case and the case where both processes request entry together.",
        ],
        points: [
          "Mutual Exclusion: If both processes compete, the shared turn value allows only one of them to pass the wait condition.",
          "Progress: A process that is not interested does not block the other process.",
          "Bounded Waiting: After a process raises its flag, the other process cannot repeatedly enter forever before it gets a turn.",
        ],
      },
      {
        title: "Assumptions and Modern Limitation",
        paragraphs: [
          "Peterson's and Dekker's algorithms assume atomic reads and writes and a sequentially consistent order of memory operations.",
          "Modern compilers and CPUs may reorder ordinary memory operations. Because of this, directly using normal shared variables may not make these algorithms correct in real programs.",
          "Real systems use language-level atomic variables, memory barriers, or OS and hardware-supported synchronization tools. Peterson's Algorithm remains important for learning and interviews.",
        ],
      },
      {
        title: "Busy Waiting",
        paragraphs: [
          "These solutions repeatedly check a shared condition while waiting. This is called Busy Waiting.",
          "The waiting process remains active and may consume CPU time. Later synchronization tools can block a waiting task so the CPU can do other work.",
        ],
      },
      {
        title: "Comparison",
        paragraphs: [
          "The table assumes two processes and the memory-order rules required by each algorithm.",
        ],
        dataTable: {
          headers: [
            "Solution",
            "Mutual Exclusion",
            "Progress",
            "Bounded Waiting",
          ],
          rows: [
            ["Plain Lock Variable", "No", "Not guaranteed", "Not guaranteed"],
            ["Strict Alternation", "Yes", "No", "Yes"],
            ["Individual Interest Flags", "Yes", "No", "Not guaranteed"],
            ["Dekker's Algorithm", "Yes", "Yes", "Yes"],
            ["Peterson's Algorithm", "Yes", "Yes", "Yes"],
          ],
        },
      },
    ],
    mechanism: {
      title: "Peterson's Algorithm for process Pi",
      steps: [
        "Set flag[i] to true.",
        "Set turn to the other process j.",
        "Wait while flag[j] is true and turn equals j.",
        "Enter and execute the critical section.",
        "Set flag[i] to false when leaving.",
      ],
    },
    example: {
      title: "Two processes request entry together",
      body: "P0 and P1 both raise their flags. Each writes the other process number to turn. The final write to turn breaks the tie, so one process waits while the other enters. When the first process leaves and lowers its flag, the waiting process continues.",
    },
    misconception:
      "Peterson's Algorithm is not safe with ordinary shared variables on every modern compiler and CPU. Its proof depends on atomic reads and writes with the required memory ordering.",
  },
  revise: {
    definitionLabel: "Overview",
    compactDefinition: true,
    definition:
      "Early software-based solutions used shared variables and program rules to solve the Critical Section Problem.",
    sections: [
      {
        title: "Main Approaches",
        paragraphs: [
          "These solutions show why synchronization is difficult and how correct algorithms developed from failed ideas.",
        ],
        points: [
          "Lock Variable",
          "Strict Alternation",
          "Individual Interest Flags",
          "Dekker's Algorithm",
          "Peterson's Algorithm",
        ],
      },
      {
        title: "Why Early Solutions Fail",
        dataTable: {
          headers: ["Solution", "Main problem"],
          rows: [
            ["Plain Lock Variable", "Check and set are separate, so Mutual Exclusion can fail"],
            ["Strict Alternation", "A process waits for its turn even when the other process is not interested"],
            ["Interest Flags", "Both processes can raise their flags and wait forever"],
          ],
        },
      },
      {
        title: "Dekker's Algorithm",
        paragraphs: [
          "Dekker's Algorithm uses flag[2] and turn to handle two processes, including the case where both request entry together.",
        ],
        points: [
          "Provides Mutual Exclusion, Progress, and Bounded Waiting under its assumptions.",
          "Correct but difficult to understand and implement.",
        ],
      },
      {
        title: "Peterson's Algorithm",
        paragraphs: [
          "Peterson's Algorithm is a simpler two-process solution that uses flag[2] and turn.",
        ],
        steps: [
          "Raise your own flag.",
          "Give the other process the turn.",
          "Wait only while the other process is interested and has the turn.",
          "Enter the Critical Section.",
          "Lower your flag after leaving.",
        ],
        points: [
          "Provides Mutual Exclusion, Progress, and Bounded Waiting under its assumptions.",
          "Works for two processes only.",
          "Commonly asked in Operating Systems interviews.",
        ],
        visual: {
          src: "/notes/operating-systems/peterson-algorithm-flow.png",
          alt: "Peterson's Algorithm for two processes using flag values and the turn variable to protect a critical section.",
          width: 1536,
          height: 1024,
          caption:
            "Each process raises its flag and gives the other process the turn before checking whether it must wait.",
        },
      },
      {
        title: "Comparison",
        dataTable: {
          headers: [
            "Solution",
            "Mutual Exclusion",
            "Progress",
            "Bounded Waiting",
          ],
          rows: [
            ["Plain Lock Variable", "No", "Not guaranteed", "Not guaranteed"],
            ["Strict Alternation", "Yes", "No", "Yes"],
            ["Individual Interest Flags", "Yes", "No", "Not guaranteed"],
            ["Dekker's Algorithm", "Yes", "Yes", "Yes"],
            ["Peterson's Algorithm", "Yes", "Yes", "Yes"],
          ],
        },
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Lock Variable: Check and set are not atomic, so Mutual Exclusion can fail.",
      "Strict Alternation: Mutual Exclusion is satisfied, but Progress fails.",
      "Individual Interest Flags: Both processes can raise their flags and wait forever, so Progress fails.",
      "Dekker: flag[2] + turn; correct for two processes but complex.",
      "Peterson: flag[2] + turn; simpler and interview-important.",
      "Dekker and Peterson satisfy Mutual Exclusion, Progress, and Bounded Waiting under their assumptions.",
      "Peterson and Dekker use busy waiting and require proper atomic operations and memory ordering on modern systems.",
    ],
    followUp: "",
  },
  lastMinute: {
    definition:
      "Early software-based solutions tried to solve the Critical Section Problem using shared variables instead of special hardware atomic instructions.",
    sections: [
      {
        title: "Main Solutions",
        points: [
          "Lock Variable",
          "Strict Alternation",
          "Interest Flags",
          "Dekker's Algorithm",
          "Peterson's Algorithm",
        ],
      },
      {
        title: "Evolution",
        flow: [
          "Lock Variable",
          "Strict Alternation",
          "Interest Flags",
          "Dekker's Algorithm",
          "Peterson's Algorithm",
        ],
        wide: true,
      },
      {
        title: "Remember This",
        points: [
          "Lock Variable: Uses one shared lock. Check and set are separate, so Mutual Exclusion can fail.",
          "Strict Alternation: Uses turn. Mutual Exclusion works, but Progress fails when the other process is not interested.",
          "Interest Flags: Each process shows interest, but both can raise their flags and wait forever.",
          "Dekker's Algorithm: Uses flag[2] and turn. It is the first correct software solution for two processes, but it is complex.",
          "Peterson's Algorithm: Uses flag[2] and turn. It is simpler than Dekker's Algorithm and works for two processes.",
        ],
        wide: true,
      },
    ],
    cuesLabel: "Key Points",
    cues: [
      "Lock Variable = Fails because checking and setting the lock are separate operations.",
      "Strict Alternation = Guarantees Mutual Exclusion but violates Progress.",
      "Interest Flags = Mutual Exclusion holds, but both processes can wait forever.",
      "Dekker's Algorithm = Mutual Exclusion + Progress + Bounded Waiting.",
      "Peterson's Algorithm = Mutual Exclusion + Progress + Bounded Waiting.",
      "Dekker's and Peterson's algorithms work for two processes.",
      "Peterson's Algorithm is the most common software synchronization algorithm in interviews.",
    ],
    memoryLineLabel: "Remember This",
    memoryLine:
      "Lock races. Alternation blocks. Flags can deadlock. Turn resolves the tie.",
    memoryLineAtEnd: true,
    trap:
      "On modern systems, Peterson's Algorithm needs proper atomic operations and memory ordering. Ordinary shared variables may not be enough.",
  },
};

const hardwareBasedSynchronizationDetailed: SubjectTopic = {
  slug: "hardware-based-synchronization-solutions",
  title: "Hardware-Based Solutions",
  description:
    "Understand how Test-and-Set and Compare-and-Swap use atomic CPU operations to build safe locks and concurrent algorithms.",
  readTime: "Detailed note",
  difficulty: "Intermediate",
  tags: ["Test-and-Set", "Compare-and-Swap", "Atomic Operations"],
  learn: {
    opening:
      "Hardware-based synchronization uses atomic CPU instructions to coordinate concurrent processes and threads safely.",
    sections: [
      {
        title: "Overview",
        paragraphs: [
          "Software-based solutions show that protecting a Critical Section with ordinary shared variables is difficult.",
          "Modern processors provide atomic read-modify-write instructions. These instructions read a value, test or change it, and make the complete operation appear as one indivisible action to other processors and threads.",
          "The two main instructions studied here are Test-and-Set (TAS) and Compare-and-Swap (CAS).",
        ],
      },
      {
        title: "Core Concept",
        paragraphs: [
          "An Atomic Operation appears indivisible to other concurrent tasks. They cannot observe or perform a conflicting update in the middle of it.",
          "Test-and-Set and Compare-and-Swap are atomic read-modify-write operations. The check and update happen as one protected hardware action.",
        ],
        visual: {
          src: "/notes/operating-systems/hardware-atomic-operation.png",
          alt: "Comparison showing a non-atomic check followed by an update and an atomic CPU instruction that performs both as one indivisible action.",
          width: 1536,
          height: 1024,
          caption:
            "A hardware atomic instruction closes the gap between checking a value and updating it.",
        },
      },
      {
        title: "Test-and-Set (TAS)",
        paragraphs: [
          "Test-and-Set is an atomic CPU instruction commonly used to build a simple lock.",
          "It reads the old lock value, sets the lock to 1, and returns the old value. The read and write happen atomically.",
        ],
        table: {
          headers: ["Lock Value", "Meaning"],
          rows: [
            ["0", "Lock is free"],
            ["1", "Lock is occupied"],
          ],
        },
      },
      {
        title: "How Test-and-Set Works",
        paragraphs: [
          "Suppose lock starts at 0. Thread 1 runs TestAndSet(lock), receives the old value 0, and atomically changes lock to 1. Because the old value was 0, Thread 1 acquired the lock.",
          "Thread 2 then runs TestAndSet(lock). It receives the old value 1, while lock remains 1. Thread 2 knows the lock is already occupied and must wait.",
        ],
        points: [
          "Read the old lock value.",
          "Set the lock to 1.",
          "Return the old value.",
          "Enter only when the returned old value is 0.",
        ],
        visual: {
          src: "/notes/operating-systems/test-and-set-flow.png",
          alt: "Test-and-Set timeline where Thread 1 receives old value 0 and acquires the lock while Thread 2 receives old value 1 and waits.",
          width: 1536,
          height: 1024,
          caption:
            "Only the first thread receives the old free value and acquires the lock.",
        },
      },
      {
        title: "Building a Lock with Test-and-Set",
        paragraphs: [
          "A thread repeatedly runs TestAndSet(lock) while the returned old value is 1. When it receives 0, it owns the lock and enters the Critical Section.",
          "After leaving, the owner sets lock back to 0 so another thread can acquire it.",
        ],
        flow: [
          "Run Test-and-Set",
          "Old Value is 1: Retry",
          "Old Value is 0: Enter",
          "Release Lock",
        ],
      },
      {
        title: "Busy Waiting and Spin Waiting",
        paragraphs: [
          "If a thread repeatedly checks a busy lock instead of sleeping, it is Busy Waiting. A lock that waits this way is commonly called a Spinlock.",
          "Spinning consumes CPU time. It can be useful when the wait is expected to be very short, but it is wasteful for long waits.",
        ],
      },
      {
        title: "Mutual Exclusion and Starvation",
        paragraphs: [
          "Because Test-and-Set is atomic, only one thread can change the lock from 0 to 1. A correctly implemented TAS lock therefore provides Mutual Exclusion.",
          "A basic TAS lock does not choose waiting threads fairly. One thread may repeatedly lose while other threads acquire the lock, which can cause Starvation.",
          "Test-and-Set alone does not guarantee Bounded Waiting.",
        ],
      },
      {
        title: "Compare-and-Swap (CAS)",
        paragraphs: [
          "Compare-and-Swap is a more flexible atomic read-modify-write instruction.",
          "CAS compares the current value at a memory location with an expected value. It writes a new value only when the comparison matches.",
          "The comparison and possible update happen atomically. Different APIs may return a success value or return the old value, but the main idea is the same.",
        ],
        points: [
          "Memory location: The value to inspect.",
          "Expected value: The value that must currently be present.",
          "New value: The replacement written after a match.",
        ],
      },
      {
        title: "How Compare-and-Swap Works",
        paragraphs: [
          "Suppose lock starts at 0. Thread 1 runs CAS(lock, 0, 1). The current value matches the expected value, so CAS changes lock to 1 and reports success.",
          "Thread 2 then runs CAS(lock, 0, 1). The current value is now 1, so it does not match 0. CAS leaves the lock unchanged and reports failure.",
        ],
        visual: {
          src: "/notes/operating-systems/compare-and-swap-flow.png",
          alt: "Compare-and-Swap flow where a matching expected value updates the lock and a non-matching value leaves it unchanged.",
          width: 1536,
          height: 1024,
          caption:
            "CAS updates the value only when the current value still matches the expected value.",
        },
      },
      {
        title: "Building a Lock with CAS",
        paragraphs: [
          "A simple CAS lock repeatedly tries CAS(lock, 0, 1). Success means the thread changed the lock from free to occupied and may enter.",
          "Failure means another thread changed the value first. A retry loop may try again, wait, or use a more advanced backoff strategy.",
          "CAS itself does not busy-wait. Busy waiting happens when the program repeatedly calls CAS in a loop.",
        ],
      },
      {
        title: "Advanced Interview Note - ABA Problem",
        paragraphs: [
          "CAS checks whether a value is the same as the expected value. It does not automatically know what happened to that value earlier.",
          "A value may change from A to B and then back to A. CAS sees A and may assume that nothing changed. This is called the ABA Problem.",
          "It mainly matters in lock-free data structures. For a beginner interview, knowing the problem is enough; version counters or tagged values are common solutions.",
        ],
        flow: ["A", "B", "A Again", "CAS Sees A"],
      },
      {
        title: "Test-and-Set vs Compare-and-Swap",
        paragraphs: [
          "Both instructions perform an atomic read-modify-write operation, but they update values in different ways.",
        ],
        dataTable: {
          headers: ["Feature", "Test-and-Set", "Compare-and-Swap"],
          rows: [
            ["Operation", "Sets a value and returns the old value", "Updates only after an expected-value match"],
            ["Atomic", "Yes", "Yes"],
            ["Simple lock", "Very simple", "Flexible"],
            ["Busy waiting", "When used in a retry loop", "When used in a retry loop"],
            ["Common use", "Spinlocks and basic locks", "Locks and lock-free algorithms"],
          ],
        },
      },
      {
        title: "Advanced Note - Memory Ordering",
        paragraphs: [
          "Atomic updates protect the lock value, but correctly protected data also needs proper memory ordering.",
          "Lock acquisition normally uses acquire ordering, and lock release uses release ordering. These rules stop protected reads and writes from being moved outside the Critical Section.",
          "Operating-system and language lock libraries provide these rules. Applications should use supported atomic and lock APIs instead of inventing their own.",
        ],
      },
    ],
    mechanism: {
      title: "CAS lock acquisition",
      steps: [
        "Read the current lock value as part of CAS.",
        "Compare it with the expected free value 0.",
        "If it matches, atomically write 1 and report success.",
        "If it does not match, leave the value unchanged and report failure.",
        "Enter the Critical Section only after success.",
      ],
    },
    example: {
      title: "Two threads compete for one lock",
      body: "Both threads try to change lock from 0 to 1. The CPU makes each atomic attempt appear indivisible. One attempt succeeds first; the other sees that the lock is already 1 and waits or retries.",
    },
    misconception:
      "Atomic does not mean that all interrupts are disabled. It means other concurrent tasks cannot observe or interleave with the read-modify-write operation halfway through.",
  },
  revise: {
    definitionLabel: "Overview",
    compactDefinition: true,
    definition:
      "Hardware-Based Solutions provide atomic CPU instructions such as Test-and-Set and Compare-and-Swap. Correct lock algorithms use these instructions to synchronize processes and threads safely.",
    sections: [
      {
        title: "Main Instructions",
        paragraphs: [
          "These instructions solve the Check-Then-Set problem found in early software-based solutions.",
        ],
        points: [
          "Test-and-Set (TAS)",
          "Compare-and-Swap (CAS)",
        ],
      },
      {
        title: "Why it Matters",
        paragraphs: [
          "Checking and updating a lock as separate operations can cause a race condition. Hardware instructions combine them into one atomic read-modify-write operation.",
        ],
      },
      {
        title: "Core Concept",
        paragraphs: [
          "An Atomic Operation appears as one indivisible operation to other concurrent tasks. They cannot observe or perform a conflicting update halfway through it.",
        ],
        visual: {
          src: "/notes/operating-systems/hardware-atomic-operation.png",
          alt: "Comparison between separate non-atomic lock operations and one atomic hardware check-and-update operation.",
          width: 1536,
          height: 1024,
          caption:
            "Atomic hardware instructions remove the gap between checking and updating the lock.",
        },
      },
      {
        title: "Test-and-Set (TAS)",
        steps: [
          "Read the old lock value.",
          "Set the lock to 1 atomically.",
          "Return the old value.",
          "If the old value was 0, enter the Critical Section.",
          "If the old value was 1, wait or retry.",
        ],
        points: [
          "Atomic read + set.",
          "Builds a simple lock.",
          "A correct TAS lock provides Mutual Exclusion.",
          "A retry loop causes Busy Waiting.",
          "Starvation is possible.",
        ],
      },
      {
        title: "Compare-and-Swap (CAS)",
        steps: [
          "Compare the current value with the expected value.",
          "If they match, atomically write the new value.",
          "If they do not match, leave the value unchanged.",
          "A lock implementation may retry CAS until it succeeds.",
        ],
        points: [
          "Atomic compare + possible update.",
          "Updates only after an expected-value match.",
          "Used to build locks.",
          "Common in lock-free algorithms.",
        ],
      },
      {
        title: "Benefits and Limitations",
        table: {
          headers: ["Benefits", "Limitations"],
          rows: [
            ["Removes the Check-Then-Set race", "Retry loops can waste CPU time"],
            ["Fast hardware-supported synchronization", "Starvation is possible"],
            ["Builds locks across CPU cores", "Fairness is not guaranteed"],
            ["CAS supports lock-free algorithms", "CAS is more complex than TAS"],
          ],
        },
      },
      {
        title: "Test-and-Set vs Compare-and-Swap",
        dataTable: {
          headers: ["Test-and-Set", "Compare-and-Swap"],
          rows: [
            ["Reads and sets the value atomically", "Updates only when the expected value matches"],
            ["Simple lock implementation", "More flexible operation"],
            ["Often used for spinlocks", "Common in lock-free algorithms"],
          ],
        },
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "TAS = Atomic Read + Set.",
      "CAS = Atomic Compare + Possible Update.",
      "A correct TAS or CAS lock provides Mutual Exclusion.",
      "Busy Waiting comes from repeatedly retrying the atomic instruction.",
      "Basic hardware locks do not guarantee fairness or Bounded Waiting.",
    ],
    followUp: "",
  },
  lastMinute: {
    definition:
      "Hardware-Based Solutions provide atomic CPU instructions used to build locks and other synchronization mechanisms.",
    sections: [
      {
        title: "Main Instructions",
        points: [
          "Test-and-Set (TAS)",
          "Compare-and-Swap (CAS)",
        ],
      },
      {
        title: "Working",
        flow: [
          "Thread",
          "Atomic Instruction (TAS / CAS)",
          "Lock Acquired?",
        ],
        points: [
          "Yes: Enter the Critical Section.",
          "No: Wait or retry.",
        ],
        wide: true,
      },
      {
        title: "Remember This",
        points: [
          "Test-and-Set: Atomic Read + Set. Builds a simple lock, uses Busy Waiting when retried, and may cause Starvation.",
          "Compare-and-Swap: Compares the current value with an expected value and updates only after a match.",
          "CAS is used to build locks and lock-free algorithms.",
        ],
        wide: true,
      },
    ],
    cuesLabel: "Key Points",
    cues: [
      "Atomic Operation = Appears as one indivisible operation to other concurrent tasks.",
      "Test-and-Set = Atomically returns the old value and sets the lock.",
      "A correct Test-and-Set lock provides Mutual Exclusion.",
      "Repeated TAS attempts create Busy Waiting or Spin Waiting.",
      "Compare-and-Swap = Updates only when the current value matches the expected value.",
      "CAS is more flexible than TAS and is common in lock-free algorithms.",
    ],
    memoryLineLabel: "Remember This",
    memoryLine:
      "TAS always sets. CAS compares before updating. Retry loops spin.",
    memoryLineAtEnd: true,
    trap:
      "Atomic hardware instructions provide the building block, but correct locks also need release logic and proper memory ordering.",
  },
};

const locksMutexesSpinlocksDetailed: SubjectTopic = {
  slug: "locks-mutexes-spinlocks",
  title: "Locks, Mutexes, and Spinlocks",
  description:
    "Learn how practical locks protect critical sections and when to choose a sleeping mutex or a busy-waiting spinlock.",
  readTime: "Detailed note",
  difficulty: "Intermediate",
  tags: ["Lock", "Mutex", "Spinlock"],
  learn: {
    opening:
      "Locks provide practical, higher-level ways to protect critical sections in concurrent programs.",
    sections: [
      {
        title: "Overview",
        paragraphs: [
          "After software algorithms and atomic hardware instructions, Operating Systems provide synchronization tools that are easier and safer to use.",
          "Lock is the broad idea. A Mutex and a Spinlock are two common lock types that differ mainly in how a waiting thread behaves.",
          "Their implementations usually rely on atomic instructions such as Test-and-Set or Compare-and-Swap.",
        ],
        points: [
          "Lock: General mechanism for controlling access to a Critical Section.",
          "Mutex: An ownership-based lock that usually blocks a waiting thread.",
          "Spinlock: A lock that keeps checking while it waits.",
        ],
      },
      {
        title: "Core Concept",
        paragraphs: [
          "A synchronization lock protects a Critical Section and the shared data or invariant inside it.",
          "A thread acquires the lock before entering. Other threads must wait while the lock is held. The owner releases the lock after leaving, allowing another thread to enter.",
        ],
        visual: {
          src: "/notes/operating-systems/lock-critical-section-flow.png",
          alt: "Flow showing a thread acquiring a lock, entering the critical section, leaving it, and releasing the lock while another thread waits.",
          width: 1536,
          height: 1024,
          caption:
            "Every thread must use the same lock before accessing the protected shared resource.",
        },
      },
      {
        title: "Lock",
        paragraphs: [
          "A Lock is a general synchronization mechanism that controls entry into a Critical Section.",
          "The two basic operations are acquire, which requests ownership, and release, which gives ownership up.",
        ],
        table: {
          headers: ["Operation", "Purpose"],
          rows: [
            ["Acquire or Lock", "Request permission to enter"],
            ["Release or Unlock", "Leave and allow another waiter to enter"],
          ],
        },
      },
      {
        title: "How a Lock Works",
        points: [
          "A thread requests the lock.",
          "If the lock is free, the thread acquires it.",
          "The thread enters and executes the Critical Section.",
          "The thread leaves and releases the lock.",
          "Another waiting thread may now acquire it.",
        ],
        paragraphs: [
          "The lock works only when every task that accesses the protected data follows the same acquire-and-release rule.",
        ],
      },
      {
        title: "Lock Ownership",
        paragraphs: [
          "An ownership-based lock records or logically identifies the thread that acquired it. That thread is the owner and should release it.",
          "A Mutex has strict ownership semantics. Spinlock implementations may not always track an owner, but the code that acquired the spinlock must still release it correctly.",
          "Unlocking a lock from the wrong thread can expose shared data while the real owner is still using it.",
        ],
      },
      {
        title: "Lock Granularity",
        paragraphs: [
          "Lock Granularity describes how much data or code one lock protects.",
          "The right choice balances simple code against the amount of work that can run concurrently.",
        ],
        table: {
          headers: ["Coarse-Grained Locking", "Fine-Grained Locking"],
          rows: [
            ["One lock protects a large area", "Several locks protect smaller independent areas"],
            ["Simpler to understand", "Allows more concurrency"],
            ["Lower deadlock risk", "Higher deadlock and ordering risk"],
            ["Threads may wait more often", "Harder to implement and maintain"],
          ],
        },
      },
      {
        title: "Mutex",
        paragraphs: [
          "A Mutex, short for Mutual Exclusion, is an ownership-based lock that allows one thread to own it at a time.",
          "When a Mutex is busy, the implementation usually blocks or sleeps the waiting thread instead of letting it consume CPU time continuously.",
          "Some implementations spin briefly before sleeping, so the exact waiting strategy can vary.",
        ],
      },
      {
        title: "How a Mutex Works",
        points: [
          "Thread A acquires the Mutex.",
          "Thread B requests the same Mutex.",
          "Because it is busy, Thread B is placed in a waiting state.",
          "Thread A completes the Critical Section and unlocks the Mutex.",
          "The Operating System wakes a waiter.",
          "Thread B acquires the Mutex and continues.",
        ],
        paragraphs: [
          "Sleeping avoids wasting CPU time but adds scheduler work for blocking and waking the thread.",
        ],
        visual: {
          src: "/notes/operating-systems/mutex-sleep-wakeup.png",
          alt: "Mutex flow where Thread A owns the mutex, Thread B sleeps while waiting, and the Operating System wakes Thread B after Thread A releases it.",
          width: 1536,
          height: 1024,
          caption:
            "A contended Mutex usually blocks the waiter so another runnable thread can use the CPU.",
        },
      },
      {
        title: "Why the Mutex Owner Must Unlock",
        paragraphs: [
          "A Mutex has ownership. Only the thread that successfully locked it should unlock it.",
          "This rule prevents a different thread from opening the protected region while the owner is still working inside it.",
          "Programs should release a Mutex on every exit path. Structured cleanup such as try-finally or RAII helps prevent forgotten unlocks.",
        ],
      },
      {
        title: "Mutex Fast Path and Slow Path",
        paragraphs: [
          "A modern Mutex commonly has two paths depending on whether another thread already owns it.",
          "Fast path: If the Mutex is free, an atomic instruction can acquire it without putting the thread to sleep.",
          "Slow path: If the Mutex is busy, the runtime or Operating System may place the thread in a wait queue and block it until the Mutex becomes available.",
          "Some implementations spin briefly before blocking. This is an adaptive strategy, not a fixed rule for every Mutex.",
        ],
        dataTable: {
          headers: ["Path", "When Used", "What Happens"],
          rows: [
            ["Fast path", "Mutex is free", "Acquire with an atomic operation"],
            ["Slow path", "Mutex is busy", "Join a wait queue and usually sleep"],
          ],
        },
      },
      {
        title: "Advanced Note - Adaptive Waiting and Futex",
        paragraphs: [
          "Some Mutex implementations spin briefly and then block if the lock remains busy. This is called adaptive waiting or spin-then-block.",
          "Linux can support this design with a futex: the fast path stays in user space, while the kernel helps a thread sleep or wake. Futex is Linux-specific, not a general name for every Mutex.",
        ],
      },
      {
        title: "Priority Inversion",
        paragraphs: [
          "Priority Inversion happens when a high-priority thread must wait for a lock held by a low-priority thread.",
          "The problem becomes worse if medium-priority threads keep running and prevent the low-priority lock owner from finishing. The high-priority thread then waits indirectly for lower-priority work.",
        ],
        flow: [
          "Low-Priority Thread Holds Lock",
          "High-Priority Thread Requests Lock",
          "Medium-Priority Work Delays Lock Owner",
          "High-Priority Thread Keeps Waiting",
        ],
        visual: {
          src: "/notes/operating-systems/priority-inversion-inheritance.png",
          alt: "Priority Inversion timeline where a high-priority thread waits for a low-priority lock owner while medium-priority work runs, followed by Priority Inheritance allowing the owner to release the lock sooner.",
          width: 1536,
          height: 1024,
          caption:
            "Priority Inheritance temporarily raises the lock owner's priority so it can finish and release the needed lock.",
        },
      },
      {
        title: "Priority Inheritance",
        paragraphs: [
          "Priority Inheritance is a common solution to Priority Inversion.",
          "The low-priority thread that owns the needed lock temporarily receives the waiting thread's higher priority. It can finish the Critical Section sooner, release the lock, and then return to its normal priority.",
          "Priority Inheritance reduces this delay, but lock design and scheduling rules still need to be correct.",
        ],
      },
      {
        title: "Spinlock",
        paragraphs: [
          "A Spinlock is a lock where a waiting thread repeatedly checks whether the lock has become free.",
          "This repeated checking is called Busy Waiting or Spinning. The waiting thread remains active and continues using CPU time.",
          "Efficient implementations may use a CPU pause instruction or backoff strategy to reduce pressure while spinning.",
        ],
      },
      {
        title: "How a Spinlock Works",
        points: [
          "Thread A acquires the Spinlock.",
          "Thread B tries to acquire the same Spinlock.",
          "Thread B finds it busy and repeatedly checks it.",
          "Thread A finishes and releases the Spinlock.",
          "Thread B succeeds on a later atomic attempt and enters.",
        ],
        paragraphs: [
          "A Spinlock avoids sleep and wake-up overhead, but the waiting CPU does no useful work while spinning.",
        ],
        visual: {
          src: "/notes/operating-systems/spinlock-busy-wait.png",
          alt: "Spinlock timeline where Thread B repeatedly checks a busy lock until Thread A releases it, after which Thread B acquires it.",
          width: 1536,
          height: 1024,
          caption:
            "Spinning can be faster than sleeping only when the expected wait is extremely short.",
        },
      },
      {
        title: "When to Use a Spinlock",
        points: [
          "The Critical Section is extremely short.",
          "The expected wait is shorter than the cost of sleeping and waking.",
          "The lock holder can continue running on another CPU core.",
          "The current kernel context does not allow sleeping.",
        ],
        paragraphs: [
          "A small kernel data structure updated in a few instructions is a common example.",
        ],
      },
      {
        title: "When Not to Use a Spinlock",
        points: [
          "The Critical Section may take a long time.",
          "The protected code performs blocking I/O or may sleep.",
          "The lock holder cannot run while the waiter is spinning.",
          "Contention is high or many threads may wait.",
        ],
        paragraphs: [
          "In these cases, a Mutex is usually better because waiting threads can sleep and free the CPU for useful work.",
        ],
      },
      {
        title: "Spinlocks in Operating System Kernels",
        paragraphs: [
          "Kernels commonly use Spinlocks for very short Critical Sections and in contexts where sleeping is not allowed.",
          "Kernel rules may also require disabling preemption or interrupts while holding a particular Spinlock. The exact rule depends on the kernel and lock type.",
          "A thread must never sleep while holding a Spinlock unless the system explicitly supports that behavior.",
        ],
      },
      {
        title: "Mutex vs Spinlock",
        paragraphs: [
          "The main difference is what a waiting thread does under contention.",
        ],
        dataTable: {
          headers: ["Feature", "Mutex", "Spinlock"],
          rows: [
            ["Waiting behavior", "Usually sleeps or blocks", "Keeps checking"],
            ["CPU use while waiting", "Low", "High"],
            ["Best for", "Longer or unknown waits", "Extremely short waits"],
            ["Waiting overhead", "Sleep and wake-up work", "Repeated atomic checks"],
            ["Common use", "Applications and kernels", "Kernel and low-level code"],
            ["Ownership", "Strict owner", "May not be tracked, but holder releases"],
          ],
        },
      },
      {
        title: "Relationship with Hardware Instructions",
        paragraphs: [
          "Mutexes and Spinlocks are higher-level tools, but their fast paths normally use atomic hardware instructions such as Test-and-Set or Compare-and-Swap.",
          "A Mutex also needs a waiting queue and help from the scheduler when contention requires a thread to sleep.",
          "The atomic instruction protects the lock state. The higher-level lock adds ownership, waiting policy, wake-up behavior, and memory-order rules.",
        ],
      },
      {
        title: "Common Locking Mistakes",
        points: [
          "Forgetting to release a lock on an error or early-return path.",
          "Holding a lock while performing slow or blocking work.",
          "Using different locks for the same shared data.",
          "Acquiring multiple locks in inconsistent orders, which can cause Deadlock.",
          "Protecting too much code and reducing concurrency.",
          "Using a Spinlock when the lock holder cannot run.",
        ],
        paragraphs: [
          "A lock should protect the complete shared-data invariant, but the Critical Section should remain as short as correctness allows.",
        ],
      },
    ],
    mechanism: {
      title: "Choosing the waiting strategy",
      steps: [
        "Estimate how long the protected work may take.",
        "Check whether the current context is allowed to sleep.",
        "Use a Mutex when the wait may be longer or unpredictable.",
        "Use a Spinlock only when the wait is extremely short and the holder can run.",
        "Measure contention and change the design if many threads keep waiting.",
      ],
    },
    example: {
      title: "Protecting a shared bank balance",
      body: "Every thread acquires the same lock before reading and updating the balance. One thread completes the full update and releases the lock before another thread can read or modify that balance.",
    },
    misconception:
      "A Spinlock is not automatically faster than a Mutex. It is useful only when spinning costs less than putting the thread to sleep and waking it later.",
  },
  revise: {
    definitionLabel: "Overview",
    compactDefinition: true,
    definition:
      "Lock is a general term for a synchronization mechanism. Mutexes and Spinlocks are two kinds of locks used to protect Critical Sections.",
    sections: [
      {
        title: "Core Flow",
        paragraphs: [
          "Every thread using the protected resource must follow the same rule.",
        ],
        flow: [
          "Acquire Lock",
          "Execute Critical Section",
          "Release Lock",
        ],
        visual: {
          src: "/notes/operating-systems/lock-critical-section-flow.png",
          alt: "Two threads using the same lock so only one thread accesses the protected shared resource at a time.",
          width: 1536,
          height: 1024,
          caption:
            "A waiting thread enters only after the current owner releases the lock.",
        },
      },
      {
        title: "Lock",
        steps: [
          "Request the lock.",
          "Acquire it when it becomes free.",
          "Execute the Critical Section.",
          "Release the lock after leaving.",
        ],
        points: [
          "Provides basic Lock and Unlock operations.",
          "An ownership-based lock should be released by its owner.",
        ],
      },
      {
        title: "Mutex",
        steps: [
          "Thread A acquires the Mutex.",
          "Thread B requests the busy Mutex and usually sleeps.",
          "Thread A releases the Mutex.",
          "Thread B wakes and acquires it.",
        ],
        points: [
          "Has one owner at a time.",
          "Avoids continuous CPU use while waiting.",
          "Best for longer or unknown waiting periods.",
        ],
      },
      {
        title: "Priority Inversion and Inheritance",
        paragraphs: [
          "Priority Inversion happens when a high-priority thread waits for a Mutex held by a low-priority thread.",
          "Priority Inheritance temporarily raises the owner's priority so it can finish and release the Mutex sooner.",
        ],
      },
      {
        title: "Spinlock",
        steps: [
          "Thread A acquires the Spinlock.",
          "Thread B finds it busy and repeatedly checks it.",
          "Thread A releases the Spinlock.",
          "Thread B succeeds on a later attempt.",
        ],
        points: [
          "Uses Busy Waiting or Spinning.",
          "Best only for extremely short Critical Sections.",
          "Common in kernels and low-level code.",
        ],
      },
      {
        title: "Lock Granularity",
        table: {
          headers: ["Coarse-Grained", "Fine-Grained"],
          rows: [
            ["One lock protects a large section", "Several locks protect smaller sections"],
            ["Simpler to manage", "Allows more concurrency"],
            ["Threads wait more often", "More complex and easier to deadlock"],
          ],
        },
      },
      {
        title: "Mutex vs Spinlock",
        dataTable: {
          headers: ["Feature", "Mutex", "Spinlock"],
          rows: [
            ["Waiting thread", "Usually sleeps", "Keeps checking"],
            ["Best for", "Longer or unknown waits", "Extremely short waits"],
            ["Waiting cost", "Scheduling overhead", "CPU time"],
            ["Common use", "Applications and kernels", "Kernel and low-level code"],
          ],
        },
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Lock = Acquire, execute the Critical Section, then release.",
      "Mutex = One owner; waiting threads usually sleep.",
      "Priority Inversion = High-priority thread waits for a lock held by a lower-priority thread.",
      "Priority Inheritance = Temporarily raise the lock owner's priority.",
      "Spinlock = Waiting threads keep checking and consume CPU time.",
      "Coarse lock = Simpler but less concurrency.",
      "Fine-grained locks = More concurrency but more complexity.",
      "Use a Mutex for longer waits and a Spinlock only for extremely short waits.",
      "Always release the lock on every exit path.",
      "Mutexes and Spinlocks are normally built with atomic hardware operations.",
    ],
    followUp: "",
  },
  lastMinute: {
    definition:
      "Locks, Mutexes, and Spinlocks protect a Critical Section so only one participating thread accesses the shared resource at a time.",
    sections: [
      {
        title: "Working",
        flow: [
          "Acquire Lock",
          "Critical Section",
          "Release Lock",
        ],
        wide: true,
      },
    ],
    cuesLabel: "Key Points",
    cues: [
      "Lock = General synchronization mechanism for protecting a Critical Section.",
      "Mutex = Ownership-based lock; a waiting thread usually sleeps.",
      "Priority Inversion = A high-priority thread waits for a lower-priority lock owner.",
      "Priority Inheritance = Temporarily raises the owner's priority so it can release the lock sooner.",
      "Spinlock = Waiting thread continuously checks the lock and consumes CPU time.",
      "Mutex = Better for longer or unknown waits; Spinlock = Better only for extremely short waits.",
      "Coarse locks are simpler; fine-grained locks allow more concurrency but add complexity.",
      "Mutexes and Spinlocks usually use Test-and-Set, Compare-and-Swap, or another atomic instruction internally.",
    ],
    memoryLineLabel: "Remember This",
    memoryLine:
      "Mutex sleeps. Spinlock spins. Both protect a Critical Section.",
    memoryLineAtEnd: true,
    trap:
      "Never choose a Spinlock for a long wait or when the lock holder cannot run.",
  },
};

export {
  processSynchronizationDetailed,
  softwareBasedSynchronizationDetailed,
  hardwareBasedSynchronizationDetailed,
  locksMutexesSpinlocksDetailed,
};
