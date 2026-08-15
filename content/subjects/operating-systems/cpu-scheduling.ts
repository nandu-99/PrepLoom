import { operatingSystemsContent as baseOperatingSystemsContent } from "@/content/subjects/operating-systems-base";
import type { SubjectTopic } from "@/lib/subject-content";

const existingCpuScheduling = baseOperatingSystemsContent.modules
  .flatMap((module) => module.topics)
  .find((topic) => topic.slug === "cpu-scheduling");

if (!existingCpuScheduling) {
  throw new Error(
    "CPU Scheduling topic is missing from Operating Systems content.",
  );
}

const cpuSchedulingDetailed: SubjectTopic = {
  ...existingCpuScheduling,
  title: "CPU Scheduling Fundamentals",
  description:
    "Understand how the OS chooses the next task for the CPU, when scheduling happens, and how scheduling quality is measured.",
  readTime: "Detailed note",
  tags: ["Scheduler", "Ready Queue", "Dispatcher"],
  learn: {
    opening:
      "CPU Scheduling is the process of deciding which ready task gets the CPU next and how long it can run.",
    sections: [
      {
        title: "Overview",
        paragraphs: [
          "A computer may have many processes and threads, but only a limited number can run at the same moment. The Operating System shares CPU time between them.",
          "For simple explanation, these notes use the word process. In many modern systems, the scheduler actually schedules threads.",
          "In simple terms, CPU Scheduling decides who gets the CPU next and for how long.",
        ],
      },
      {
        title: "Why it Matters",
        paragraphs: [
          "Imagine that a browser, code editor, music player, compiler, and background backup are running together. They all need CPU time, but they do not all need the same response speed.",
          "Without scheduling, one long task could keep the CPU and make the rest of the system feel frozen.",
        ],
        points: [
          "Keeps the CPU busy.",
          "Lets many tasks make progress.",
          "Keeps interactive applications responsive.",
          "Shares CPU time fairly.",
          "Supports different system goals.",
        ],
      },
      {
        title: "Core Concept",
        paragraphs: [
          "A process that is ready to run waits in the Ready Queue.",
          "The CPU Scheduler chooses one ready process. The Dispatcher then gives CPU control to that process.",
          "The running process may finish, wait for I/O, or return to the Ready Queue after its time slice ends.",
        ],
        visual: {
          src: "/notes/operating-systems/cpu-scheduling-flow.png",
          alt: "CPU Scheduling diagram showing processes moving from the Ready Queue through the CPU Scheduler to the CPU, then completing, waiting for input and output, or returning after their time slice expires.",
          width: 1692,
          height: 929,
          caption:
            "The scheduler selects a process from the Ready Queue. The process then completes, waits for I/O, or returns when its time slice expires.",
        },
      },
      {
        title: "Scheduling Queues",
        paragraphs: ["Processes move between queues as their state changes."],
        points: [
          "Job Queue: Contains processes that have entered the system.",
          "Ready Queue: Contains processes waiting for CPU time.",
          "Waiting Queue: Contains processes waiting for I/O or another event.",
        ],
      },
      {
        title: "When Scheduling Happens",
        paragraphs: [
          "The OS may need to choose the next process at these moments:",
        ],
        points: [
          "The running process finishes.",
          "The running process waits for I/O or another event.",
          "The running process's time quantum expires.",
          "An I/O operation finishes and a process becomes Ready.",
          "A higher-priority process becomes Ready.",
        ],
      },
      {
        title: "CPU Burst and I/O Burst",
        paragraphs: [
          "A process usually does not use the CPU continuously. It moves between CPU work and waiting for I/O.",
          "A CPU Burst is the time spent doing work on the CPU. An I/O Burst is the time spent waiting for a file, network, keyboard, or another device.",
        ],
        flow: ["CPU Burst", "I/O Wait", "CPU Burst", "I/O Wait"],
      },
      {
        title: "CPU-Bound vs I/O-Bound Processes",
        paragraphs: ["Different workloads need different scheduling behavior."],
        table: {
          headers: ["CPU-Bound", "I/O-Bound"],
          rows: [
            ["Long CPU bursts", "Short CPU bursts"],
            ["Less frequent I/O", "Frequent I/O waits"],
            [
              "Examples: compiling, rendering, simulation",
              "Examples: browser, editor, terminal",
            ],
            ["Usually values throughput", "Usually values quick response"],
          ],
        },
      },
      {
        title: "Scheduler vs Dispatcher",
        paragraphs: ["The Scheduler and Dispatcher perform different jobs."],
        table: {
          headers: ["Scheduler", "Dispatcher"],
          rows: [
            [
              "Decides which task runs next",
              "Gives CPU control to the selected task",
            ],
            [
              "Checks the Ready Queue and scheduling policy",
              "Performs the context switch",
            ],
            ["Makes the decision", "Applies the decision"],
          ],
        },
      },
      {
        title: "What the Dispatcher Does",
        paragraphs: [
          "The time needed to stop one task and start another is called Dispatch Latency.",
        ],
        points: [
          "Saves the current task's CPU information.",
          "Loads the selected task's CPU information.",
          "Switches to user mode when needed.",
          "Continues from the selected task's next instruction.",
        ],
      },
      {
        title: "Preemptive vs Non-Preemptive Scheduling",
        paragraphs: [],
        table: {
          headers: ["Non-Preemptive", "Preemptive"],
          rows: [
            [
              "The running process keeps the CPU",
              "The OS can interrupt the running process",
            ],
            [
              "It runs until it finishes or waits",
              "It may return to the Ready Queue",
            ],
            ["Less switching overhead", "Usually better response and fairness"],
            [
              "A long task can delay others",
              "More context switches can add overhead",
            ],
          ],
        },
      },
      {
        title: "Scheduling Criteria",
        paragraphs: [
          "A scheduler is judged using several measurements. Improving one measurement can make another one worse.",
        ],
        points: [
          "CPU Utilization: How much time the CPU is busy. Goal: Increase it.",
          "Throughput: Number of processes completed in a period. Goal: Increase it.",
          "Turnaround Time: Total time from arrival to completion. Turnaround Time = Completion Time - Arrival Time. Goal: Reduce it.",
          "Waiting Time: Total time spent in the Ready Queue. Waiting Time = Turnaround Time - Burst Time. Goal: Reduce it.",
          "Response Time: Time from arrival until the process first gets the CPU. Response Time = First CPU Time - Arrival Time. Goal: Reduce it.",
          "Fairness: Every process should eventually receive CPU time.",
          "Predictability: Similar workloads should receive stable results.",
          "Overhead: Time spent scheduling and switching instead of running useful work. Goal: Reduce it.",
        ],
      },
      {
        title: "Different Systems Have Different Goals",
        paragraphs: [],
        table: {
          headers: ["System Type", "Main Goal"],
          rows: [
            ["Batch System", "High throughput and CPU utilization"],
            ["Interactive System", "Fast response and fairness"],
            ["Real-Time System", "Complete work before its deadline"],
          ],
        },
      },
      {
        title: "Time Quantum Trade-Off",
        paragraphs: [
          "A Time Quantum is the amount of CPU time given to a task before the OS may preempt it.",
        ],
        table: {
          headers: ["Small Time Quantum", "Large Time Quantum"],
          rows: [
            ["Faster response", "Less frequent switching"],
            ["More context switches", "Lower switching overhead"],
            [
              "Lower delay for interactive work",
              "Longer delay for waiting tasks",
            ],
            [
              "Can reduce throughput",
              "Can behave like non-preemptive scheduling",
            ],
          ],
        },
      },
      {
        title: "Context Switching Cost",
        paragraphs: [
          "A Context Switch lets the CPU stop one task and continue another. It enables multitasking, but the switch itself does not run application work.",
          "The OS saves CPU information such as registers and the Program Counter, selects another task, and restores that task's information.",
          "A process switch may also change memory mappings. Useful cache and address-translation data may need to be rebuilt, which adds hidden cost.",
          "Switching between threads in the same process is often lighter because those threads share the same address space.",
        ],
      },
      {
        title: "Starvation and Aging",
        paragraphs: [
          "Starvation happens when a process keeps waiting because other processes are always selected first.",
          "Aging reduces starvation by slowly increasing the priority of a process while it waits.",
        ],
      },
      {
        title: "The Scheduling Trade-Off",
        paragraphs: [
          "No scheduling policy is best for every workload.",
          "A system may improve response time by switching more often, but this adds overhead. A system may improve throughput by running tasks longer, but interactive work may respond more slowly.",
          "The OS must balance response, throughput, fairness, predictability, and overhead.",
        ],
      },
    ],
    mechanism: {
      title: "How a scheduling decision works",
      steps: [
        "Runnable processes wait in the Ready Queue.",
        "A scheduling event occurs, such as completion, blocking, or an expired time quantum.",
        "The Scheduler applies its policy and selects a process.",
        "The Dispatcher saves the current CPU information and loads the selected process's information.",
        "The selected process starts or continues running.",
        "The OS makes another decision when the next scheduling event occurs.",
      ],
    },
    example: {
      title: "Interactive work and background work",
      body: "A video call needs short and frequent CPU service so that audio and video remain smooth. A background compiler can use longer CPU bursts. Scheduling helps both make progress without making the interface feel frozen.",
    },
    misconception:
      "CPU Scheduling does not make every task run at the same moment. It decides which ready task should run on each available CPU.",
  },
  revise: {
    definitionLabel: "Overview",
    compactDefinition: true,
    definition:
      "CPU Scheduling decides which ready task gets the CPU next and how long it can run. Its goal is to balance performance, response, fairness, and overhead.",
    sections: [
      {
        title: "Why it Matters",
        paragraphs: [
          "Many tasks need the CPU, but only a limited number can run at the same moment.",
        ],
        points: [
          "Keep the CPU busy.",
          "Keep interactive work responsive.",
          "Share CPU time fairly.",
          "Allow many tasks to make progress.",
        ],
      },
      {
        title: "Core Concept",
        paragraphs: [
          "Ready tasks wait in the Ready Queue. The Scheduler selects a task, and the Dispatcher gives it CPU control.",
        ],
        flow: ["Ready Queue", "CPU Scheduler", "CPU"],
        visual: {
          src: "/notes/operating-systems/cpu-scheduling-flow.png",
          alt: "CPU Scheduling diagram showing processes moving from the Ready Queue through the CPU Scheduler to the CPU, then completing, waiting for input and output, or returning after their time slice expires.",
          width: 1692,
          height: 929,
          caption:
            "The scheduler repeatedly selects the next process from the Ready Queue.",
        },
      },
      {
        title: "When Scheduling Happens",
        points: [
          "A process finishes.",
          "A process waits for I/O.",
          "A time quantum expires.",
          "I/O completes and a process becomes Ready.",
          "A higher-priority process becomes Ready.",
        ],
      },
      {
        title: "CPU-Bound vs I/O-Bound",
        table: {
          headers: ["CPU-Bound", "I/O-Bound"],
          rows: [
            ["Long CPU bursts", "Short CPU bursts"],
            ["Less frequent I/O", "Frequent I/O waits"],
            ["Usually values throughput", "Usually values quick response"],
          ],
        },
      },
      {
        title: "Scheduler vs Dispatcher",
        table: {
          headers: ["Scheduler", "Dispatcher"],
          rows: [
            ["Chooses the next task", "Gives that task the CPU"],
            ["Makes the decision", "Performs the context switch"],
          ],
        },
      },
      {
        title: "Preemptive vs Non-Preemptive",
        table: {
          headers: ["Non-Preemptive", "Preemptive"],
          rows: [
            [
              "A running task keeps the CPU",
              "The OS can interrupt a running task",
            ],
            ["Less switching overhead", "Usually better response and fairness"],
          ],
        },
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "CPU Burst = Time doing CPU work. I/O Burst = Time waiting for I/O.",
      "Starvation = A task keeps waiting. Aging slowly increases its priority.",
      "No scheduling policy is best for every workload.",
    ],
    comparisonTitle: "Time Quantum Trade-Off",
    comparison: {
      left: {
        label: "Small Quantum",
        points: [
          "Faster response",
          "More context switches",
          "Higher switching overhead",
        ],
      },
      right: {
        label: "Large Quantum",
        points: [
          "Fewer context switches",
          "Lower switching overhead",
          "Slower response for waiting tasks",
        ],
      },
    },
    followUp: "",
  },
  lastMinute: {
    definition:
      "CPU Scheduling decides which ready task gets the CPU next and how long it can run.",
    sections: [
      {
        title: "Flow",
        flow: ["Ready Queue", "Scheduler", "Dispatcher", "CPU"],
        wide: true,
      },
      {
        title: "When It Happens",
        points: [
          "Process finishes",
          "Process waits for I/O",
          "Time quantum expires",
          "I/O completes",
          "Higher-priority process becomes Ready",
        ],
      },
      {
        title: "Main Goals",
        points: [
          "CPU Utilization ↑",
          "Throughput ↑",
          "Turnaround Time ↓",
          "Waiting Time ↓",
          "Response Time ↓",
        ],
      },
      {
        title: "Types",
        points: [
          "Preemptive: The OS can interrupt a running task.",
          "Non-Preemptive: The task keeps the CPU until it finishes or waits.",
        ],
      },
      {
        title: "Remember This",
        points: [
          "Scheduler decides. Dispatcher performs the switch.",
          "CPU-Bound = Long CPU bursts.",
          "I/O-Bound = Short CPU bursts and frequent waits.",
          "Small quantum improves response but adds more switching.",
          "Large quantum reduces switching but can hurt response.",
        ],
        wide: true,
      },
    ],
    cuesLabel: "Key Points",
    cues: [
      "Ready Queue = Tasks waiting for CPU time.",
      "Scheduler = Chooses the next task.",
      "Dispatcher = Gives CPU control to that task.",
      "Starvation = A task keeps waiting. Aging raises its priority.",
      "No scheduling policy is best for every workload.",
    ],
    memoryLineLabel: "Remember This",
    memoryLine:
      "Scheduling balances response, throughput, fairness, and overhead.",
    memoryLineAtEnd: true,
    trap: "",
  },
};

const existingAdvancedScheduling = baseOperatingSystemsContent.modules
  .flatMap((module) => module.topics)
  .find((topic) => topic.slug === "scheduling-algorithms");

if (!existingAdvancedScheduling) {
  throw new Error(
    "Scheduling Algorithms topic is missing from Operating Systems content.",
  );
}

const schedulingAlgorithmsDetailed: SubjectTopic = {
  ...existingAdvancedScheduling,
  title: "Scheduling Algorithms",
  description:
    "Compare the main CPU scheduling algorithms, understand their trade-offs, and learn how to solve scheduling questions.",
  readTime: "Detailed note",
  tags: ["FCFS", "SJF", "Round Robin"],
  learn: {
    opening:
      "A Scheduling Algorithm is a rule used by the Operating System to choose the next task from the Ready Queue.",
    sections: [
      {
        title: "Overview",
        paragraphs: [
          "Different scheduling algorithms choose tasks in different ways. Some use arrival time, some use CPU burst time, some use priority, and some share CPU time in turns.",
          "No algorithm is best for every workload. Each one balances waiting time, response time, fairness, and switching overhead differently.",
        ],
      },
      {
        title: "Terms Used in Scheduling Questions",
        paragraphs: [
          "These short forms are commonly used in numerical questions.",
        ],
        points: [
          "Arrival Time (AT): The time when a process enters the Ready Queue.",
          "Burst Time (BT): The CPU time needed by the process.",
          "Completion Time (CT): The time when the process finishes.",
          "Turnaround Time (TAT): Total time from arrival to completion.",
          "Waiting Time (WT): Total time spent waiting in the Ready Queue.",
          "Response Time (RT): Time from arrival until the process first gets the CPU.",
        ],
      },
      {
        title: "Important Formulas",
        paragraphs: [],
        points: [
          "Turnaround Time = Completion Time - Arrival Time",
          "Waiting Time = Turnaround Time - Burst Time",
          "Response Time = First CPU Time - Arrival Time",
          "Average Waiting Time = Total Waiting Time / Number of Processes",
        ],
      },
      {
        title: "How to Solve a Scheduling Question",
        paragraphs: [
          "A Gantt chart shows which process runs during each part of the timeline.",
        ],
        points: [
          "Write the Arrival Time and Burst Time of every process.",
          "Check which processes are available at the current time.",
          "Apply the selected scheduling rule.",
          "Draw the execution order on a Gantt chart.",
          "Find Completion Time for every process.",
          "Use the formulas to calculate Turnaround, Waiting, and Response Time.",
        ],
      },
      {
        title: "First Come First Served (FCFS)",
        paragraphs: [
          "FCFS runs processes in the order they arrive. It uses a FIFO Ready Queue and is Non-Preemptive.",
          "Once a process starts, it keeps the CPU until it finishes or waits for I/O.",
        ],
        points: [
          "Selection rule: Earliest Arrival Time.",
          "Strength: Very simple and predictable.",
          "Weakness: A long process can delay many short processes.",
          "Starvation: Normally does not occur.",
        ],
        flow: ["P1", "P2", "P3"],
      },
      {
        title: "Convoy Effect",
        paragraphs: [
          "The Convoy Effect happens when one long process makes many short processes wait behind it.",
          "Example: P1 needs 10 ms, while P2 and P3 need 1 ms each. If P1 arrives first, both short processes must wait for it to finish.",
          "FCFS is simple, but the Convoy Effect can produce a poor average waiting time.",
        ],
        flow: ["P1 - 10 ms", "P2 - 1 ms", "P3 - 1 ms"],
      },
      {
        title: "Shortest Job First (SJF)",
        paragraphs: [
          "SJF selects the ready process with the shortest CPU burst. It is Non-Preemptive.",
          "SJF gives the minimum average waiting time when CPU burst times are known correctly.",
        ],
        points: [
          "Selection rule: Smallest Burst Time.",
          "Strength: Low average waiting time.",
          "Weakness: The OS usually does not know the next CPU burst exactly.",
          "Weakness: Long processes may starve if short processes keep arriving.",
        ],
        flow: ["P2 - 2 ms", "P3 - 4 ms", "P1 - 6 ms"],
      },
      {
        title: "Burst-Time Prediction",
        paragraphs: [
          "SJF needs the length of the next CPU burst, but future burst time is not known exactly.",
          "An OS can estimate it from the process's earlier CPU bursts. Because it is only an estimate, the selected process may not always be the true shortest job.",
        ],
      },
      {
        title: "Shortest Remaining Time First (SRTF)",
        paragraphs: [
          "SRTF is the Preemptive version of SJF. It always runs the ready process with the shortest remaining CPU time.",
          "If a new process arrives with a shorter remaining time, the OS can interrupt the current process.",
        ],
        points: [
          "Selection rule: Smallest Remaining Time.",
          "Strength: Short processes receive a fast response.",
          "Strength: Can reduce average waiting time.",
          "Weakness: More preemption means more context switches.",
          "Weakness: Long processes may starve.",
        ],
      },
      {
        title: "SJF vs SRTF",
        paragraphs: [],
        table: {
          headers: ["SJF", "SRTF"],
          rows: [
            ["Non-Preemptive", "Preemptive"],
            ["Uses total Burst Time", "Uses Remaining Time"],
            [
              "Decision after finish or wait",
              "Decision when a shorter task arrives",
            ],
            ["Fewer context switches", "More context switches"],
          ],
        },
      },
      {
        title: "Priority Scheduling",
        paragraphs: [
          "Priority Scheduling gives the CPU to the ready process with the highest priority.",
          "It can be Preemptive or Non-Preemptive. The meaning of a priority number depends on the system, so a question must state whether a smaller or larger number means higher priority.",
        ],
        points: [
          "Strength: Important work receives CPU time first.",
          "Weakness: Low-priority processes may starve.",
          "Solution: Aging slowly increases the priority of waiting processes.",
        ],
      },
      {
        title: "Round Robin (RR)",
        paragraphs: [
          "Round Robin gives every ready process a fixed Time Quantum and uses a circular FIFO Ready Queue.",
          "If a process does not finish during its quantum, the OS preempts it and places it at the back of the Ready Queue.",
        ],
        points: [
          "Strength: Fair CPU sharing.",
          "Strength: Good response for interactive work.",
          "Strength: A ready process receives another turn.",
          "Weakness: Frequent context switches add overhead.",
          "Weakness: Average turnaround time may be higher.",
        ],
        flow: ["P1", "P2", "P3", "P1", "P2"],
      },
      {
        title: "The Time Quantum Effect",
        paragraphs: [
          "The result of Round Robin depends heavily on its Time Quantum.",
        ],
        table: {
          headers: ["Quantum Too Small", "Quantum Too Large"],
          rows: [
            ["Fast response", "Fewer context switches"],
            ["Too many context switches", "Longer response time"],
            ["Higher overhead", "Starts behaving like FCFS"],
          ],
        },
      },
      {
        title: "Algorithm Comparison",
        paragraphs: [],
        table: {
          headers: ["Algorithm", "Main Idea and Main Problem"],
          rows: [
            ["FCFS", "Arrival order; Convoy Effect"],
            [
              "SJF",
              "Shortest burst; needs prediction and may starve long jobs",
            ],
            [
              "SRTF",
              "Shortest remaining time; more switching and starvation risk",
            ],
            [
              "Priority",
              "Highest priority first; low-priority tasks may starve",
            ],
            [
              "Round Robin",
              "Fixed time slices; quantum controls overhead and response",
            ],
          ],
        },
      },
    ],
    mechanism: {
      title: "How Round Robin schedules a process",
      steps: [
        "Take the first process from the Ready Queue.",
        "Run it for one Time Quantum or until it finishes or waits.",
        "If it finishes or waits, remove it from the CPU.",
        "If it still needs CPU time, move it to the back of the Ready Queue.",
        "Select the next process and repeat.",
      ],
    },
    example: {
      title: "The same workload can produce different results",
      body: "FCFS may make a short task wait behind a long task. SJF moves the short task earlier. Round Robin gives every ready task a turn. The best result depends on whether the system values simplicity, average waiting time, or quick response.",
    },
    misconception:
      "The algorithm with the lowest average waiting time is not automatically best. Interactive systems may care more about response and fairness.",
  },
  revise: {
    definitionLabel: "Overview",
    compactDefinition: true,
    definition:
      "A Scheduling Algorithm is a rule used by the OS to select the next task from the Ready Queue. Each algorithm optimizes different goals.",
    sections: [
      {
        title: "Main Algorithms",
        table: {
          headers: ["Algorithm", "Main Rule"],
          rows: [
            ["FCFS", "Run in arrival order"],
            ["SJF", "Run the shortest CPU burst"],
            ["SRTF", "Run the shortest remaining time"],
            ["Priority", "Run the highest-priority task"],
            ["Round Robin", "Give each task a fixed Time Quantum"],
          ],
        },
      },
      {
        title: "Important Problems",
        points: [
          "Convoy Effect: A long FCFS process delays short processes.",
          "Starvation: A process keeps waiting because others are selected first.",
          "Aging: Slowly increases the priority of a waiting process.",
          "Burst Prediction: SJF cannot know the next CPU burst exactly.",
        ],
      },
      {
        title: "Time Quantum",
        paragraphs: [
          "A small quantum improves response but causes more context switches. A large quantum reduces switching but makes Round Robin behave more like FCFS.",
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "FCFS: Non-Preemptive and uses arrival order.",
      "SJF: Non-Preemptive and uses the shortest Burst Time.",
      "SRTF: Preemptive and uses the shortest Remaining Time.",
      "Priority: Can be Preemptive or Non-Preemptive.",
      "Round Robin: Preemptive and uses a fixed Time Quantum.",
      "SJF is optimal for average waiting time only when burst times are known.",
      "No algorithm is best for every workload.",
    ],
    comparisonTitle: "SJF vs SRTF",
    comparison: {
      left: {
        label: "SJF",
        points: [
          "Non-Preemptive",
          "Uses total Burst Time",
          "Fewer context switches",
        ],
      },
      right: {
        label: "SRTF",
        points: ["Preemptive", "Uses Remaining Time", "More context switches"],
      },
    },
    followUp: "",
  },
  lastMinute: {
    definition:
      "A Scheduling Algorithm decides which ready task should get the CPU next.",
    sections: [
      {
        title: "Algorithms",
        points: [
          "FCFS: Arrival order.",
          "SJF: Shortest Burst Time.",
          "SRTF: Shortest Remaining Time.",
          "Priority: Highest priority first.",
          "Round Robin: Fixed Time Quantum.",
        ],
      },
      {
        title: "Remember This",
        points: [
          "FCFS can cause the Convoy Effect.",
          "SJF and SRTF may starve long tasks.",
          "Priority Scheduling may starve low-priority tasks.",
          "Aging reduces starvation.",
          "A small quantum means more context switches.",
          "A large quantum makes Round Robin behave like FCFS.",
        ],
      },
    ],
    cuesLabel: "Key Points",
    cues: [
      "FCFS and SJF are Non-Preemptive.",
      "SRTF and Round Robin are Preemptive.",
      "Priority Scheduling can use either mode.",
      "SJF = Shortest total burst. SRTF = Shortest remaining time.",
      "Round Robin is fair and responsive but adds switching overhead.",
      "No algorithm is best for every workload.",
    ],
    memoryLineLabel: "Remember This",
    memoryLine:
      "FCFS = Arrival, SJF = Shortest, Priority = Importance, RR = Turns.",
    memoryLineAtEnd: true,
    trap: "",
  },
};

const schedulingNumerical: SubjectTopic = {
  slug: "scheduling-numerical",
  title: "Numerical",
  description:
    "Learn how to draw Gantt charts and calculate Completion, Turnaround, Waiting, and Response Time.",
  readTime: "Detailed note",
  difficulty: "Intermediate",
  tags: ["Gantt Chart", "Waiting Time", "Turnaround Time"],
  learn: {
    opening:
      "CPU Scheduling numericals become simple when you follow the same steps for every algorithm.",
    sections: [
      {
        title: "Process Data Used Below",
        paragraphs: [
          "We use the same three processes for every algorithm. A smaller priority number means a higher priority.",
        ],
        dataTable: {
          headers: ["Process", "Arrival Time", "Burst Time", "Priority"],
          rows: [
            ["P1", "0", "5", "2"],
            ["P2", "1", "3", "1"],
            ["P3", "2", "1", "3"],
          ],
        },
      },
      {
        title: "Formulas",
        paragraphs: [
          "First find Completion Time from the Gantt chart. Then use these formulas.",
        ],
        points: [
          "Turnaround Time (TAT) = Completion Time - Arrival Time",
          "Waiting Time (WT) = Turnaround Time - Burst Time",
          "Response Time (RT) = First CPU Start Time - Arrival Time",
          "Average = Total value / Number of processes",
        ],
      },
      {
        title: "FCFS Solution",
        paragraphs: ["FCFS runs processes in arrival order: P1, P2, then P3."],
        gantt: {
          segments: [
            { label: "P1", start: 0, end: 5 },
            { label: "P2", start: 5, end: 8 },
            { label: "P3", start: 8, end: 9 },
          ],
        },
        dataTable: {
          headers: ["Process", "CT", "TAT", "WT", "RT"],
          rows: [
            ["P1", "5", "5", "0", "0"],
            ["P2", "8", "7", "4", "4"],
            ["P3", "9", "7", "6", "6"],
          ],
        },
        points: ["Average Waiting Time = (0 + 4 + 6) / 3 = 3.33"],
      },
      {
        title: "SJF Solution (Non-Preemptive)",
        paragraphs: [
          "At time 0, only P1 is ready, so it runs first. At time 5, P2 and P3 are ready. P3 has the shorter Burst Time.",
        ],
        gantt: {
          segments: [
            { label: "P1", start: 0, end: 5 },
            { label: "P3", start: 5, end: 6 },
            { label: "P2", start: 6, end: 9 },
          ],
        },
        dataTable: {
          headers: ["Process", "CT", "TAT", "WT", "RT"],
          rows: [
            ["P1", "5", "5", "0", "0"],
            ["P2", "9", "8", "5", "5"],
            ["P3", "6", "4", "3", "3"],
          ],
        },
        points: ["Average Waiting Time = (0 + 5 + 3) / 3 = 2.67"],
      },
      {
        title: "SRTF Solution",
        paragraphs: [
          "SRTF checks the shortest remaining time whenever a process arrives. A shorter new process can stop the running process.",
        ],
        gantt: {
          segments: [
            { label: "P1", start: 0, end: 1 },
            { label: "P2", start: 1, end: 2 },
            { label: "P3", start: 2, end: 3 },
            { label: "P2", start: 3, end: 5 },
            { label: "P1", start: 5, end: 9 },
          ],
        },
        dataTable: {
          headers: ["Process", "CT", "TAT", "WT", "RT"],
          rows: [
            ["P1", "9", "9", "4", "0"],
            ["P2", "5", "4", "1", "0"],
            ["P3", "3", "1", "0", "0"],
          ],
        },
        points: ["Average Waiting Time = (4 + 1 + 0) / 3 = 1.67"],
      },
      {
        title: "Preemptive Priority Solution",
        paragraphs: [
          "Here, a smaller number means a higher priority. P2 stops P1 at time 1 because P2 has the higher priority.",
        ],
        gantt: {
          segments: [
            { label: "P1", start: 0, end: 1 },
            { label: "P2", start: 1, end: 4 },
            { label: "P1", start: 4, end: 8 },
            { label: "P3", start: 8, end: 9 },
          ],
        },
        dataTable: {
          headers: ["Process", "CT", "TAT", "WT", "RT"],
          rows: [
            ["P1", "8", "8", "3", "0"],
            ["P2", "4", "3", "0", "0"],
            ["P3", "9", "7", "6", "6"],
          ],
        },
        points: ["Average Waiting Time = (3 + 0 + 6) / 3 = 3.00"],
      },
      {
        title: "Round Robin Solution (Time Quantum = 2)",
        paragraphs: [
          "Each ready process can run for at most 2 time units. If it is not finished, it returns to the back of the Ready Queue.",
          "For this example, a process arriving exactly when a quantum ends is added before the expired process is placed back in the queue.",
        ],
        gantt: {
          segments: [
            { label: "P1", start: 0, end: 2 },
            { label: "P2", start: 2, end: 4 },
            { label: "P3", start: 4, end: 5 },
            { label: "P1", start: 5, end: 7 },
            { label: "P2", start: 7, end: 8 },
            { label: "P1", start: 8, end: 9 },
          ],
        },
        dataTable: {
          headers: ["Process", "CT", "TAT", "WT", "RT"],
          rows: [
            ["P1", "9", "9", "4", "0"],
            ["P2", "8", "7", "4", "1"],
            ["P3", "5", "3", "2", "2"],
          ],
        },
        points: ["Average Waiting Time = (4 + 4 + 2) / 3 = 3.33"],
      },
      {
        title: "Compare the Results",
        paragraphs: [
          "The same process data gives different answers because each algorithm makes a different choice.",
        ],
        dataTable: {
          headers: ["Algorithm", "Average WT", "Main Reason"],
          rows: [
            ["FCFS", "3.33", "Uses arrival order"],
            ["SJF", "2.67", "Runs the shortest ready job"],
            ["SRTF", "1.67", "Can stop a longer job"],
            ["Priority", "3.00", "Runs the highest priority"],
            ["Round Robin", "3.33", "Shares fixed turns"],
          ],
        },
      },
      {
        title: "Common Mistakes",
        paragraphs: [],
        points: [
          "Choosing a process that has not arrived yet.",
          "Using total Burst Time instead of remaining time in SRTF.",
          "Forgetting to state whether a smaller priority number is higher.",
          "Using Completion Time as Turnaround Time when Arrival Time is not zero.",
          "Calculating Response Time from the last start instead of the first start.",
          "Changing the Round Robin queue order at an arrival boundary without stating the rule.",
        ],
      },
    ],
    mechanism: {
      title: "How to solve any scheduling numerical",
      steps: [
        "Write the process data and the algorithm rule.",
        "Start at the earliest Arrival Time.",
        "At every decision point, list only the processes that have arrived.",
        "Choose the next process using the algorithm rule.",
        "Draw the Gantt chart and record every finish time.",
        "Calculate TAT, WT, and RT with the formulas.",
        "Check that no Waiting Time or Response Time is negative.",
      ],
    },
    example: {
      title: "Why the Gantt chart comes first",
      body: "The Gantt chart gives each process's first start and Completion Time. Once those values are correct, Turnaround, Waiting, and Response Time follow directly from the formulas.",
    },
    misconception:
      "Do not choose from every process in the table. At each time, choose only from processes that have already arrived.",
  },
  revise: {
    definitionLabel: "Overview",
    compactDefinition: true,
    definition:
      "A scheduling numerical uses a Gantt chart to find Completion, Turnaround, Waiting, and Response Time.",
    sections: [
      {
        title: "Formulas",
        points: [
          "TAT = CT - AT",
          "WT = TAT - BT",
          "RT = First Start Time - AT",
          "Average = Total / Number of Processes",
        ],
      },
      {
        title: "Order of Work",
        steps: [
          "Write AT, BT, Priority, and Time Quantum if given.",
          "Draw the Gantt chart.",
          "Find CT from the chart.",
          "Calculate TAT, WT, and RT.",
          "Find the required average.",
        ],
      },
      {
        title: "FCFS Mini Example",
        paragraphs: ["For P1(AT 0, BT 5), P2(AT 1, BT 3), and P3(AT 2, BT 1):"],
        gantt: {
          segments: [
            { label: "P1", start: 0, end: 5 },
            { label: "P2", start: 5, end: 8 },
            { label: "P3", start: 8, end: 9 },
          ],
        },
        points: [
          "Completion Times: P1 = 5, P2 = 8, P3 = 9",
          "Average Waiting Time = 3.33",
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Check arrivals before choosing the next process.",
      "SJF uses Burst Time. SRTF uses Remaining Time.",
      "Response Time uses only the first CPU start.",
      "State the Priority direction and Round Robin boundary rule.",
      "Use the Gantt chart to verify Completion Time.",
    ],
    followUp: "",
  },
  lastMinute: {
    definition:
      "Draw the Gantt chart first. Then calculate CT, TAT, WT, and RT.",
    sections: [
      {
        title: "Formulas",
        points: [
          "TAT = CT - AT",
          "WT = TAT - BT",
          "RT = First Start - AT",
          "Average = Total / Number of Processes",
        ],
      },
      {
        title: "Check Before Finishing",
        points: [
          "Only choose a process that has arrived.",
          "Use Remaining Time for SRTF.",
          "Use the first start for Response Time.",
          "State the Priority direction.",
          "Check the Round Robin queue order.",
        ],
      },
    ],
    cuesLabel: "Algorithm Rules",
    cues: [
      "FCFS = Earliest arrival.",
      "SJF = Shortest Burst Time.",
      "SRTF = Shortest Remaining Time.",
      "Priority = Highest priority.",
      "Round Robin = Fixed Time Quantum.",
    ],
    memoryLineLabel: "Remember This",
    memoryLine: "Gantt Chart -> CT -> TAT -> WT and RT.",
    memoryLineAtEnd: true,
    trap: "",
  },
};

const advancedSchedulingDetailed: SubjectTopic = {
  ...existingAdvancedScheduling,
  slug: "advanced-scheduling",
  title: "Advanced Scheduling",
  description:
    "Understand fixed and adaptive queues, fair scheduling, and how scheduling works across multiple CPUs.",
  readTime: "Detailed note",
  tags: ["MLQ", "MLFQ", "Multiple Queues"],
  learn: {
    opening:
      "Advanced Scheduling combines queues, priorities, feedback, and fairness rules to handle different kinds of work.",
    sections: [
      {
        title: "Overview",
        paragraphs: [
          "As computer systems became more complex, basic scheduling algorithms like FCFS, SJF, and Round Robin were not always sufficient.",
          "Some systems need to prioritize system processes, interactive applications, and background jobs differently.",
          "Multilevel Queue (MLQ) separates tasks into fixed groups. Multilevel Feedback Queue (MLFQ) changes a task's priority by observing how it behaves.",
          "Modern schedulers may also track fairness and balance work between multiple CPUs.",
        ],
      },
      {
        title: "Core Concept",
        paragraphs: [
          "Instead of placing every process in a single Ready Queue, advanced scheduling divides processes into multiple queues based on their priority or behavior.",
          "Each queue can have its own scheduling algorithm.",
          "This helps the OS treat interactive, CPU-heavy, background, and important system work differently.",
        ],
        visual: {
          src: "/notes/operating-systems/advanced-scheduling-queues-v2.png",
          alt: "Comparison of Multilevel Queue scheduling with fixed queue assignment and Multilevel Feedback Queue scheduling with movement between high, medium, and low priority queues.",
          width: 1692,
          height: 930,
          caption:
            "MLQ keeps each process in one fixed queue. MLFQ can move processes between queues based on CPU use and waiting time.",
        },
      },
      {
        title: "Multilevel Queue (MLQ) Scheduling",
        paragraphs: [
          "In Multilevel Queue Scheduling, the Ready Queue is permanently divided into multiple queues.",
          "Each queue contains a specific type of process, such as System Processes, Interactive Processes, Background Processes, or Batch Processes.",
          "Once a process is assigned to a queue, it cannot move to another queue.",
        ],
      },
      {
        title: "How MLQ Works",
        paragraphs: [
          "MLQ makes two decisions: which queue should run and which process inside that queue should run.",
          "For example, the OS may give the Interactive Queue higher priority than the Batch Queue. Inside those queues, Interactive work may use Round Robin while Batch work uses FCFS.",
          "Some systems always run the highest non-empty queue. Others divide CPU time between queues.",
        ],
        points: [
          "A process enters the system.",
          "The OS classifies the process.",
          "The process is placed into the correct queue.",
          "Each queue uses its own scheduling algorithm.",
          "The scheduler applies a rule between queues and another rule inside each queue.",
        ],
        flow: [
          "Interactive Apps - High Priority - Round Robin",
          "User Programs - Medium Priority - SJF",
          "Background Jobs - Low Priority - FCFS",
        ],
      },
      {
        title: "Multilevel Feedback Queue (MLFQ) Scheduling",
        paragraphs: [
          "Multilevel Feedback Queue Scheduling improves MLQ by allowing processes to move between queues.",
          "The Operating System observes a process's behavior and changes its priority dynamically.",
        ],
      },
      {
        title: "How MLFQ Works",
        paragraphs: [
          "MLFQ learns from behavior instead of permanently trusting the process type given at arrival.",
        ],
        points: [
          "Every new process starts in the highest-priority queue.",
          "If it gives up the CPU early to wait for I/O, it usually stays at a higher priority.",
          "If it uses its full CPU allotment, it moves to a lower-priority queue.",
          "Lower queues often use larger Time Quanta for CPU-heavy work.",
          "The scheduler always chooses from the highest non-empty queue.",
          "A periodic Priority Boost moves waiting processes upward and reduces starvation.",
        ],
        flow: [
          "High Priority Queue",
          "Medium Priority Queue",
          "Low Priority Queue",
        ],
      },
      {
        title: "MLQ vs MLFQ",
        paragraphs: [],
        table: {
          headers: ["MLQ", "MLFQ"],
          rows: [
            ["Queue assignment is fixed", "Queue assignment is dynamic"],
            ["Process movement is not allowed", "Process movement is allowed"],
            ["Low flexibility", "High flexibility"],
            ["Starvation is possible", "Starvation is less likely"],
            ["Simple", "More complex"],
            ["Does not adapt", "Adapts to process behavior"],
          ],
        },
      },
      {
        title: "Completely Fair Scheduler (CFS) - High Level",
        paragraphs: [
          "CFS is a well-known Linux scheduler design that focuses on fair CPU sharing instead of fixed queues.",
          "Its main teaching idea is Virtual Runtime, which tracks how much weighted CPU time each runnable task has received.",
          "The task with the smallest Virtual Runtime has received less of its fair share, so it is selected next.",
          "A task's priority or weight changes how quickly its Virtual Runtime grows. Higher-weight tasks receive a larger share of CPU time.",
        ],
        points: [
          "Less Virtual Runtime means the task has received less CPU time.",
          "The scheduler chooses the runnable task with the smallest Virtual Runtime.",
          "Weights allow proportional CPU sharing instead of equal sharing.",
        ],
      },
      {
        title: "Multi-Core Scheduling",
        paragraphs: [
          "A system with multiple CPUs or cores must decide both which task runs next and where it should run.",
          "Moving tasks can balance the work, but moving a task may also make it lose useful cache data from its previous CPU.",
        ],
        points: [
          "Load Balancing: Shares runnable tasks between CPUs.",
          "Push Migration: A busy CPU moves work to another CPU.",
          "Pull Migration: An idle CPU takes work from a busy CPU.",
          "CPU Affinity: Tries to keep a task on the same CPU.",
          "Soft Affinity: The OS prefers a CPU but may move the task.",
          "Hard Affinity: The task is restricted to selected CPUs.",
        ],
      },
      {
        title: "Load Balancing vs CPU Affinity",
        paragraphs: [],
        table: {
          headers: ["Load Balancing", "CPU Affinity"],
          rows: [
            ["Moves work away from busy CPUs", "Keeps work on a preferred CPU"],
            [
              "Improves CPU usage across the system",
              "Helps reuse warm cache data",
            ],
            ["May increase task movement", "May leave some CPUs less balanced"],
          ],
        },
      },
    ],
    mechanism: {
      title: "How MLFQ learns from process behavior",
      steps: [
        "A new process starts in the highest-priority queue.",
        "The scheduler gives it a short Time Quantum.",
        "If it waits for I/O early, it stays at a higher priority.",
        "If it uses its full CPU allotment, it moves down.",
        "Lower queues give CPU-heavy work longer Time Quanta.",
        "A periodic Priority Boost moves waiting work upward.",
      ],
    },
    example: {
      title: "Interactive work and background work",
      body: "A video call often uses short CPU bursts and waits for input, so MLFQ keeps it at a higher priority. A long compilation repeatedly uses its full CPU allotment, so it moves to a lower queue with a longer Time Quantum.",
    },
    misconception:
      "MLFQ does not automatically remove starvation. It needs a rule such as periodic Priority Boosting to make sure low-priority work receives another chance.",
  },
  revise: {
    definitionLabel: "Overview",
    compactDefinition: true,
    definition:
      "Advanced Scheduling uses multiple queues, changing priorities, and fairness rules to handle different types of work.",
    sections: [
      {
        title: "Core Concept",
        paragraphs: [
          "Instead of using a single Ready Queue, processes are divided into multiple queues.",
          "Each queue can use a different scheduling algorithm.",
        ],
        visual: {
          src: "/notes/operating-systems/advanced-scheduling-queues-v2.png",
          alt: "Comparison of Multilevel Queue scheduling with fixed queue assignment and Multilevel Feedback Queue scheduling with movement between high, medium, and low priority queues.",
          width: 1692,
          height: 930,
          caption:
            "MLQ uses fixed queue assignment. MLFQ changes queue priority based on process behavior.",
        },
      },
      {
        title: "MLQ vs MLFQ",
        table: {
          headers: ["MLQ", "MLFQ"],
          rows: [
            ["Fixed Queue", "Dynamic Queue"],
            ["No Process Movement", "Process Movement Allowed"],
            ["Less Flexible", "More Flexible"],
            ["Starvation Possible", "Starvation Reduced"],
            ["Simpler", "More Complex"],
          ],
        },
      },
      {
        title: "Important MLFQ Rules",
        points: [
          "In MLFQ, full CPU use usually moves a task down.",
          "A Priority Boost moves waiting tasks up and reduces starvation.",
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "MLQ uses fixed queues.",
      "Processes cannot move between MLQ queues.",
      "MLFQ uses dynamic queues.",
      "Processes can move between MLFQ queues.",
      "Priority Boosts reduce starvation.",
    ],
    followUp: "",
  },
  lastMinute: {
    definition:
      "Advanced Scheduling uses multiple queues, changing priorities, and fairness rules to schedule different workloads.",
    sections: [
      {
        title: "MLQ",
        points: [
          "Uses fixed queues.",
          "A process cannot change queues.",
          "Each queue can use a different algorithm.",
          "Lower queues may starve.",
        ],
      },
      {
        title: "MLFQ",
        points: [
          "Uses dynamic queues.",
          "A process can move between queues.",
          "Full CPU use usually moves it down.",
          "Waiting for I/O usually keeps it high.",
          "Priority Boosts reduce starvation.",
        ],
      },
    ],
    cuesLabel: "Key Points",
    cues: [
      "MLQ = Fixed Queue Assignment.",
      "MLFQ = Dynamic Queue Assignment.",
      "MLQ: No process movement.",
      "MLFQ: Process movement allowed.",
      "Priority Boosts move waiting tasks upward.",
    ],
    memoryLineLabel: "Remember This",
    memoryLine:
      "MLQ is fixed. MLFQ learns. Virtual Runtime shares. Affinity remembers.",
    memoryLineAtEnd: true,
    trap: "",
  },
};

export {
  cpuSchedulingDetailed,
  schedulingAlgorithmsDetailed,
  schedulingNumerical,
  advancedSchedulingDetailed,
};
