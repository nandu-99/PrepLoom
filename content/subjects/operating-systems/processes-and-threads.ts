import { operatingSystemsContent as baseOperatingSystemsContent } from "@/content/subjects/operating-systems-base";
import type { SubjectTopic } from "@/lib/subject-content";

const existingProcesses = baseOperatingSystemsContent.modules
  .flatMap((module) => module.topics)
  .find((topic) => topic.slug === "program-vs-process");

if (!existingProcesses) {
  throw new Error("Processes topic is missing from Operating Systems content.");
}

const processesDetailed: SubjectTopic = {
  ...existingProcesses,
  title: "Processes",
  description:
    "Understand how a running program is represented, managed, scheduled, and moved through its lifecycle by the Operating System.",
  readTime: "Detailed note",
  tags: ["Process", "PCB", "States"],
  learn: {
    opening:
      "A Process is an executing instance of a program that the Operating System manages. It includes an address space, execution state, and resources, even while it is Ready or Waiting rather than currently using a CPU.",
    sections: [
      {
        title: "Overview",
        paragraphs: [
          "In simple terms, a program is passive code and data, while a process is the OS-managed execution instance created from that program.",
          "When you open an application, the Operating System loads the program and creates a process for it.",
          "Running the same calculator program twice creates two separate processes. Each process has its own PID, memory, and current state.",
        ],
        points: [
          "Program = Passive (stored on disk)",
          "Process = Active execution instance with state and resources",
        ],
        visual: {
          src: "/notes/operating-systems/program-to-process-dark.png",
          alt: "Diagram showing the Operating System creating an OS-managed execution instance with an address space, CPU state, and resources from passive program code and data.",
          width: 1536,
          height: 1024,
          caption:
            "The Operating System creates a process with an address space, execution state, and resources from a stored program.",
        },
      },
      {
        title: "Why it Matters",
        paragraphs: [
          "Modern computers run many applications at the same time. The OS manages each running application as a separate process.",
          "This helps the OS share resources, track every running program, and stop one application from freely changing another application's memory.",
        ],
        points: [
          "Keep each application independent.",
          "Allocate CPU and memory.",
          "Switch between running applications.",
          "Track the execution of every application.",
        ],
      },
      {
        title: "Core Concept",
        paragraphs: [
          "A process is more than program code. It also contains the memory, CPU information, and open resources needed to continue running.",
          "Each process normally has its own virtual memory space. This keeps process memory separate and protected.",
        ],
        points: [
          "Program Code",
          "Data",
          "Heap",
          "Stack",
          "CPU Registers",
          "Program Counter",
          "Process State",
          "Open Resources",
        ],
      },
      {
        title: "Process States",
        paragraphs: [
          "A process does not stay in one state throughout its lifetime. It moves between states depending on whether it is being created, waiting for CPU time, executing, waiting for an event, or finished.",
          "A Waiting process returns to the Ready state when its event finishes. It does not normally move directly from Waiting to Running because the scheduler must select it again.",
        ],
        points: [
          "New: The process is being created.",
          "Ready: The process is ready to execute and is waiting for CPU time.",
          "Running: The CPU is currently executing the process.",
          "Waiting (Blocked): The process is waiting for an event such as a file read, keyboard input, or network response.",
          "Terminated: The process has finished and its resources are released.",
        ],
        table: {
          headers: ["State Change", "Why it Happens"],
          rows: [
            ["New → Ready", "Process creation is complete"],
            ["Ready → Running", "Scheduler selects the process"],
            ["Running → Ready", "The time slice ends"],
            ["Running → Waiting", "The process waits for I/O or an event"],
            ["Waiting → Ready", "The I/O or event finishes"],
            ["Running → Terminated", "The process finishes"],
          ],
        },
        visual: {
          src: "/notes/operating-systems/process-state-diagram-dark.png",
          alt: "Process state diagram showing transitions between New, Ready, Running, Waiting, and Terminated states.",
          width: 1536,
          height: 1024,
          caption:
            "The scheduler and system events move a process between ready, running, waiting, and terminated states.",
        },
      },
      {
        title: "Process Control Block (PCB)",
        paragraphs: [
          "The Operating System stores information about every process in a Process Control Block. Think of the PCB as the OS record for a process.",
          "The PCB gives the OS the information it needs to stop, manage, and later continue the process.",
        ],
        points: [
          "Process ID (PID)",
          "Current State",
          "Program Counter",
          "CPU Registers",
          "Scheduling Priority",
          "CPU Time Used",
          "Page Table or Memory Information",
          "Open File Descriptors",
        ],
      },
      {
        title: "Context Switching",
        paragraphs: [
          "A CPU can run only a limited number of tasks at the same moment. The OS creates multitasking by quickly switching between running tasks.",
          "During a Context Switch, the OS saves information such as the Program Counter and CPU Registers. It then restores another task's information and continues that task.",
          "A Context Switch takes time because the CPU is saving and restoring information instead of running application work.",
        ],
        points: [
          "The current time slice ends.",
          "The running task waits for I/O.",
          "A hardware Interrupt occurs.",
          "A higher-priority task becomes ready.",
        ],
      },
      {
        title: "Process Creation",
        paragraphs: [
          "A process may be created when a user opens an application, the OS starts a background service, or a running process creates a child process.",
          "On Unix-like systems, fork() creates a child process with a new PID. The parent receives the child PID, while the child receives zero.",
          "exec() replaces the program inside the current process. If it succeeds, the process keeps the same PID. wait() lets the parent collect the child's exit status.",
        ],
        flow: [
          "Parent Process",
          "fork()",
          "Child Process",
          "exec()",
          "New Program",
        ],
        points: [
          "fork(): Creates a child process with a new PID.",
          "exec(): Replaces the current program but keeps the same process and PID.",
          "wait(): Waits for a child and collects its exit status.",
        ],
      },
      {
        title: "Copy-on-Write",
        paragraphs: [
          "After fork(), the OS does not immediately copy all the parent's memory.",
          "The parent and child first share the same memory pages. If either process changes a page, the OS creates a separate copy of that page.",
          "This is called Copy-on-Write. It saves memory and makes fork() faster.",
        ],
      },
      {
        title: "Inter-Process Communication (IPC)",
        paragraphs: [
          "Processes normally have separate virtual memory, so one process cannot directly read or change another process's data.",
          "Inter-Process Communication (IPC) provides controlled ways for processes to exchange data and coordinate their work.",
        ],
        dataTable: {
          headers: ["IPC Method", "How It Works", "Common Use"],
          rows: [
            [
              "Pipe",
              "Moves a stream of data between processes",
              "Parent-child commands and shell pipelines",
            ],
            [
              "Message Queue",
              "Sends separate messages through an OS-managed queue",
              "Structured task or event communication",
            ],
            [
              "Shared Memory",
              "Maps the same memory area into multiple processes",
              "Fast exchange of large amounts of data",
            ],
            [
              "Socket",
              "Sends data between processes on one computer or across a network",
              "Client-server communication",
            ],
          ],
        },
        points: [
          "Pipes and Message Queues copy or pass data through an OS-managed channel.",
          "Shared Memory is usually faster for large data because processes access the same mapped pages.",
          "Shared Memory needs synchronization such as a Mutex or Semaphore to prevent race conditions.",
          "Sockets can connect processes on the same machine or on different machines.",
        ],
      },
      {
        title: "Process Termination",
        paragraphs: [
          "A process can end after finishing its work, when the user closes it, or when the OS stops it because of an error or a signal.",
          "The OS releases most resources and keeps the exit status until the parent collects it.",
        ],
      },
      {
        title: "Zombie Process",
        paragraphs: [
          "On Unix-like systems, a Zombie Process is a finished child process whose parent has not collected its exit status using wait().",
          "It is not running and does not keep normal process memory, but it still has a small entry in the process table.",
          "Remember: Zombie = Finished but not collected.",
        ],
      },
      {
        title: "Orphan Process",
        paragraphs: [
          "On Unix-like systems, an Orphan Process is a child process whose parent has already ended.",
          "Another system process adopts the orphan and later collects its exit status.",
          "Remember: Orphan = Still running without its original parent.",
        ],
      },
      {
        title: "Important Trade-Offs",
        paragraphs: [
          "Processes provide strong separation, but that separation requires more memory and more OS work.",
        ],
        points: [
          "Benefit: One process cannot freely change another process's memory.",
          "Benefit: A failure is usually limited to one process.",
          "Cost: Creating a process requires memory and OS information.",
          "Cost: Switching between separate processes can add overhead.",
        ],
      },
    ],
    mechanism: {
      title: "What happens when you open a calculator app",
      steps: [
        "The calculator program is stored on disk.",
        "You open the calculator application.",
        "The Operating System creates a new process.",
        "The OS gives the process virtual memory and loads the program.",
        "A unique Process ID (PID) is assigned.",
        "The process moves from New to Ready.",
        "The scheduler selects it and it moves to Running.",
        "When the calculator finishes, the process moves to Terminated.",
      ],
    },
    example: {
      title: "Running the calculator twice",
      body: "Opening the calculator twice creates two separate processes. Both use the same program file, but each process has its own PID, virtual memory, current state, and resources.",
    },
    misconception:
      "A process is not only program code. It is an OS-managed execution instance with an address space, CPU state, open resources, and an OS record called the PCB.",
  },
  revise: {
    definitionLabel: "Overview",
    compactDefinition: true,
    definition:
      "A Process is an OS-managed execution instance of a program. It has its own virtual memory, current state, CPU information, and open resources.",
    sections: [
      {
        title: "Program vs Process",
        table: {
          headers: ["Program", "Process"],
          rows: [
            ["Passive code and data", "OS-managed execution instance"],
            ["Passive", "Active"],
            ["Has no current CPU state", "Has a current CPU state"],
            ["One program file", "Can create many separate processes"],
          ],
        },
      },
      {
        title: "Process States",
        paragraphs: [
          "Ready means the process is waiting for CPU time. Waiting means it is waiting for an event such as file or network input.",
        ],
        visual: {
          src: "/notes/operating-systems/process-state-diagram-dark.png",
          alt: "Process state diagram showing transitions between New, Ready, Running, Waiting, and Terminated states.",
          width: 1536,
          height: 1024,
          caption:
            "A process moves between states as it receives CPU time, waits for events, and completes execution.",
        },
      },
      {
        title: "PCB, Context Switch, and Creation",
        paragraphs: [
          "The Process Control Block (PCB) is the OS record for a process.",
        ],
        points: [
          "The PCB stores the PID, state, Program Counter, CPU Registers, memory information, and open files.",
          "During a Context Switch, the OS saves the current task's CPU information and restores another task's information.",
          "fork() creates a child with a new PID. The parent gets the child PID, while the child gets zero.",
          "exec() replaces the current program but keeps the same process and PID. wait() collects a child's exit status.",
          "Copy-on-Write copies a shared memory page only when the parent or child changes it.",
        ],
      },
      {
        title: "Inter-Process Communication",
        table: {
          headers: ["Method", "Main Idea"],
          rows: [
            ["Pipe", "Stream of data between processes"],
            ["Message Queue", "Separate messages through an OS-managed queue"],
            ["Shared Memory", "Processes access the same mapped memory"],
            ["Socket", "Communication on one machine or across a network"],
          ],
        },
        paragraphs: [
          "Shared Memory is fast, but access must be synchronized to prevent race conditions.",
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Process = An OS-managed execution instance of a program.",
      "PID = A unique number for a process.",
      "Ready waits for CPU time. Waiting waits for an event.",
      "PCB = The OS record that stores process information.",
      "Context Switch = Save one task's CPU information and restore another's.",
      "fork() creates a child. exec() replaces its program. wait() collects its exit status.",
      "IPC lets separate processes exchange data using Pipes, Message Queues, Shared Memory, or Sockets.",
      "Zombie = Finished but not collected. Orphan = Still running after its parent ends.",
    ],
    followUp: "",
  },
  lastMinute: {
    definition: "A Process is an OS-managed execution instance of a program.",
    sections: [
      {
        title: "Program vs Process",
        points: [
          "Program: Stored on disk and passive.",
          "Process: Active execution instance with state and resources.",
        ],
      },
      {
        title: "Process States",
        points: [
          "New: Being created.",
          "Ready: Waiting for CPU time.",
          "Running: Currently executing.",
          "Waiting: Waiting for I/O or another event.",
          "Terminated: Finished.",
        ],
      },
      {
        title: "Process Creation",
        flow: [
          "Parent Process",
          "fork()",
          "Child Process",
          "exec()",
          "New Program",
        ],
        wide: true,
      },
      {
        title: "Remember This",
        points: [
          "PID uniquely identifies a process.",
          "PCB is the OS record for a process.",
          "Context Switch saves one task's CPU information and restores another's.",
          "wait() collects the result of a finished child.",
          "Copy-on-Write copies a memory page only after a change.",
        ],
        wide: true,
      },
      {
        title: "IPC",
        points: [
          "Pipe: Data stream between processes.",
          "Message Queue: Separate OS-managed messages.",
          "Shared Memory: Fast shared data; needs synchronization.",
          "Socket: Local or network communication.",
        ],
      },
    ],
    cuesLabel: "Key Points",
    cues: [
      "Process = An OS-managed execution instance of a program.",
      "Ready waits for CPU time. Waiting waits for an event.",
      "PCB stores the PID, State, Program Counter, Registers, Memory Information, and Open Files.",
      "Zombie = Finished but not collected.",
      "Orphan = Still running after its parent ends.",
      "Context switches let many processes share CPU time.",
    ],
    memoryLineLabel: "Remember This",
    memoryLine: "Process = Running Program + Memory + CPU State + Resources.",
    memoryLineAtEnd: true,
    trap: "",
  },
};

const existingThreads = baseOperatingSystemsContent.modules
  .flatMap((module) => module.topics)
  .find((topic) => topic.slug === "process-vs-thread");

if (!existingThreads) {
  throw new Error("Threads topic is missing from Operating Systems content.");
}

const threadsDetailed: SubjectTopic = {
  ...existingThreads,
  title: "Threads",
  description:
    "Understand how multiple execution paths work inside one process by sharing resources while keeping separate execution contexts.",
  readTime: "Detailed note",
  tags: ["Threads", "Shared Memory", "Multithreading"],
  learn: {
    opening:
      "A Thread is the smallest unit of execution inside a process. One process can have one or more threads.",
    sections: [
      {
        title: "Overview",
        paragraphs: [
          "In simple terms, a process is the container and a thread is a worker inside that container.",
          "Threads in the same process share memory and resources. Each thread also keeps its own execution information, so its scheduler can pause and continue it separately.",
          "The Operating System directly schedules Kernel-Level Threads. A runtime or thread library may schedule User-Level Threads before mapping them to Kernel-Level Threads.",
        ],
        points: ["Process = Container", "Thread = Worker inside the process"],
      },
      {
        title: "Why it Matters",
        paragraphs: [
          "An application often needs to do more than one job. For example, a code editor can respond to typing, check code, and save a file in the background.",
          "Separate threads let these jobs make progress without making the whole application wait for one slow task.",
        ],
      },
      {
        title: "Core Concept",
        paragraphs: [
          "A thread always belongs to a process. Threads communicate quickly because they can use the same data and heap.",
          "Each thread needs its own execution context. This tells the CPU where that thread stopped and how to continue it.",
        ],
        points: [
          "Shared by threads: Code",
          "Shared by threads: Data",
          "Shared by threads: Heap",
          "Shared by threads: Open Files",
          "Private to each thread: Stack",
          "Private to each thread: Program Counter (PC)",
          "Private to each thread: CPU Registers",
        ],
        visual: {
          src: "/notes/operating-systems/threads-shared-resources-dark.png",
          alt: "Diagram showing three threads sharing process code, data, heap, and open files while each thread keeps its own stack, program counter, and CPU registers.",
          width: 1536,
          height: 1024,
          caption:
            "Threads share process resources but keep separate execution contexts so they can be scheduled independently.",
        },
      },
      {
        title: "Thread Control Block (TCB)",
        paragraphs: [
          "The OS or thread library keeps a Thread Control Block for each thread. The TCB is the record used to manage and resume that thread.",
        ],
        points: [
          "Thread ID (TID)",
          "Thread State",
          "Program Counter",
          "CPU Registers",
          "Stack Pointer",
          "Scheduling Information",
        ],
      },
      {
        title: "Process vs Thread",
        paragraphs: [
          "Processes provide stronger separation. Threads are lighter and make communication inside one process faster.",
        ],
        table: {
          headers: ["Process", "Thread"],
          rows: [
            ["Has its own virtual memory", "Shares the process memory"],
            ["Has a Process ID (PID)", "Has a Thread ID (TID)"],
            [
              "Usually takes more work to create",
              "Usually takes less work to create",
            ],
            [
              "Uses IPC to communicate",
              "Can communicate through shared memory",
            ],
            [
              "A failure is usually limited to that process",
              "A serious thread error can affect the whole process",
            ],
          ],
        },
      },
      {
        title: "Concurrency and Parallelism",
        paragraphs: [
          "Concurrency means several tasks make progress during the same period. The CPU may switch between them quickly.",
          "Parallelism means tasks actually run at the same moment on different CPU cores or logical CPUs.",
          "Threads can provide concurrency on one CPU and parallelism when more CPU capacity is available.",
        ],
      },
      {
        title: "Thread Lifecycle",
        paragraphs: [
          "A thread moves through states similar to a process. Ready means it is waiting for CPU time. Waiting means it is waiting for an event such as I/O or a lock.",
        ],
        points: [
          "New: The thread is being created.",
          "Ready: The thread can run and is waiting for CPU time.",
          "Running: The CPU is executing the thread.",
          "Waiting: The thread is waiting for I/O, a lock, or another event.",
          "Terminated: The thread has finished.",
        ],
      },
      {
        title: "Thread Creation, Completion, and join()",
        paragraphs: [
          "A program creates a thread and gives it a function or task to execute. The thread becomes Ready and runs when its scheduler selects it.",
          "A thread completes when its function returns or it explicitly exits. Its execution has ended, but another thread may still need to collect its result or wait for its completion.",
          "join() makes the calling thread wait until the target thread finishes. After the target completes, join() returns and may provide its result, depending on the threading API.",
          "A detached thread is not joined. Its runtime releases the remaining thread resources automatically after it finishes.",
        ],
        flow: [
          "Create Thread",
          "Ready",
          "Run Task",
          "Complete",
          "join() Returns",
        ],
        points: [
          "join() waits for another thread to finish.",
          "join() does not make the target thread run; it only waits for completion.",
          "A thread should normally be joined or detached so its remaining resources can be cleaned up correctly.",
        ],
      },
      {
        title: "User-Level and Kernel-Level Threads",
        paragraphs: [
          "User-Level Threads are managed by a thread library or runtime. Kernel-Level Threads are managed and scheduled by the Operating System.",
        ],
        table: {
          headers: ["User-Level Threads", "Kernel-Level Threads"],
          rows: [
            ["Managed in user space", "Managed by the OS kernel"],
            [
              "Can be faster to create and switch",
              "Usually needs more OS work",
            ],
            ["The runtime schedules them", "The OS schedules them"],
            [
              "Parallelism depends on their mapping",
              "Can run in parallel on available CPUs",
            ],
          ],
        },
      },
      {
        title: "Multithreading Models",
        paragraphs: [
          "A threading model describes how user threads are connected to kernel threads.",
        ],
        table: {
          headers: ["Model", "How it Works"],
          rows: [
            [
              "Many-to-One",
              "Many user threads use one kernel thread. It has no true parallelism, and one blocking kernel call can block them all.",
            ],
            [
              "One-to-One",
              "Each user thread uses one kernel thread. It supports parallelism but needs more OS resources.",
            ],
            [
              "Many-to-Many",
              "Many user threads use several kernel threads. It balances flexibility and parallelism.",
            ],
          ],
        },
      },
      {
        title: "Race Conditions and Synchronization",
        paragraphs: [
          "Shared memory makes communication fast, but it also creates risk. If two threads change the same data at the same time, the result may be wrong. This is called a Race Condition.",
          "Synchronization tools control access to shared data. Common tools include mutexes, locks, semaphores, and condition variables.",
        ],
        points: [
          "Critical Section: Code that uses shared data.",
          "Mutex or Lock: Allows controlled access to a critical section.",
          "Race Condition: The result depends on which thread runs first.",
          "Deadlock: Threads wait forever for resources held by each other.",
        ],
      },
      {
        title: "Important Trade-Offs",
        paragraphs: [
          "Threads use fewer resources than separate processes, but shared memory makes them harder to manage safely.",
        ],
        points: [
          "Benefit: Better responsiveness.",
          "Benefit: Fast communication through shared memory.",
          "Benefit: Lower creation and switching cost than separate processes.",
          "Cost: Race conditions can change shared data incorrectly.",
          "Cost: Thread bugs can be difficult to reproduce and debug.",
          "Cost: A serious error in one thread can affect the whole process.",
        ],
      },
    ],
    mechanism: {
      title: "How a code editor uses multiple threads",
      steps: [
        "The Operating System creates the editor process.",
        "The editor creates threads for different jobs.",
        "Each thread receives its own Stack, Program Counter, and CPU Registers.",
        "The threads share the process Code, Data, Heap, and Open Files.",
        "The scheduler gives CPU time to the threads.",
        "Typing, code checking, and background saving can make progress together.",
      ],
    },
    example: {
      title: "Multiple jobs inside a code editor",
      body: "One thread can handle typing, another can check the code, and another can save changes. They share the editor's process memory but keep separate execution information.",
    },
    misconception:
      "Threads do not always run at the exact same moment. They may run concurrently by taking turns, or in parallel when the system has available CPU capacity.",
  },
  revise: {
    definitionLabel: "Overview",
    compactDefinition: true,
    definition:
      "A Thread is the smallest unit of execution inside a process. Threads share process resources but keep their own execution information.",
    sections: [
      {
        title: "Why it Matters",
        paragraphs: [
          "Threads let one application handle several jobs without making the whole application wait for one slow task.",
        ],
        points: [
          "Keep the application responsive.",
          "Use shared memory for fast communication.",
          "Use less memory than separate processes.",
          "Use available CPU capacity more effectively.",
        ],
      },
      {
        title: "Shared vs Private Resources",
        table: {
          headers: ["Shared by Threads", "Private to Each Thread"],
          rows: [
            ["Code", "Stack"],
            ["Data", "Program Counter (PC)"],
            ["Heap", "CPU Registers"],
            ["Open Files", "Thread ID (TID)"],
          ],
        },
      },
      {
        title: "How Threads Share a Process",
        visual: {
          src: "/notes/operating-systems/threads-shared-resources-dark.png",
          alt: "Diagram showing three threads sharing process code, data, heap, and open files while each thread keeps its own stack, program counter, and CPU registers.",
          width: 1536,
          height: 1024,
          caption:
            "Threads share process resources while keeping the private execution context needed for independent scheduling.",
        },
      },
      {
        title: "Concurrency vs Parallelism",
        table: {
          headers: ["Concurrency", "Parallelism"],
          rows: [
            [
              "Tasks make progress during the same period",
              "Tasks run at the same moment",
            ],
            [
              "Can happen by quickly switching tasks",
              "Needs more than one available CPU execution unit",
            ],
          ],
        },
      },
      {
        title: "Thread Lifecycle",
        points: [
          "New: Being created.",
          "Ready: Waiting for CPU time.",
          "Running: Currently executing.",
          "Waiting: Waiting for I/O, a lock, or another event.",
          "Terminated: Finished.",
        ],
      },
      {
        title: "Completion and join()",
        points: [
          "A thread completes when its task returns or exits.",
          "join() waits for another thread to finish.",
          "A detached thread is cleaned up automatically after completion.",
          "A thread should normally be joined or detached.",
        ],
      },
      {
        title: "Race Conditions",
        paragraphs: [
          "A Race Condition can happen when threads change the same data at the same time. Locks, mutexes, and other synchronization tools protect shared data.",
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Thread = Smallest unit of execution inside a process.",
      "Shared: Code, Data, Heap, and Open Files.",
      "Private: Stack, Program Counter, CPU Registers, and TID.",
      "TCB = The record used to manage a thread.",
      "Threads are usually lighter than processes.",
      "Concurrency is not the same as parallelism.",
      "join() waits for a thread to complete; a detached thread is cleaned up automatically.",
      "Shared data needs synchronization.",
      "Models: Many-to-One, One-to-One, and Many-to-Many.",
    ],
    comparisonTitle: "Process vs Thread",
    comparison: {
      left: {
        label: "Process",
        points: [
          "Has its own virtual memory.",
          "Provides stronger isolation.",
          "Usually costs more to create and switch.",
          "Uses IPC to communicate.",
        ],
      },
      right: {
        label: "Thread",
        points: [
          "Shares its process memory.",
          "Provides less isolation.",
          "Usually costs less to create and switch.",
          "Uses shared memory to communicate.",
        ],
      },
    },
    followUp: "",
  },
  lastMinute: {
    definition: "A Thread is the smallest unit of execution inside a process.",
    sections: [
      {
        title: "Shared by Threads",
        points: ["Code", "Data", "Heap", "Open Files"],
      },
      {
        title: "Private to Each Thread",
        points: [
          "Stack",
          "Program Counter (PC)",
          "CPU Registers",
          "Thread ID (TID)",
        ],
      },
      {
        title: "Remember This",
        points: [
          "Threads belong to a process.",
          "TCB stores the information needed to manage a thread.",
          "Concurrency means tasks make progress together.",
          "Parallelism means tasks run at the same moment.",
          "Shared data needs synchronization to prevent race conditions.",
          "join() waits for another thread to finish.",
        ],
        wide: true,
      },
    ],
    cuesLabel: "Key Points",
    cues: [
      "Thread = Smallest unit of execution inside a process.",
      "Shared: Code, Data, Heap, and Open Files.",
      "Private: Stack, Program Counter, CPU Registers, and TID.",
      "Threads are usually lighter than processes.",
      "User-Level Threads are managed by a runtime. Kernel-Level Threads are managed by the OS.",
      "Models: Many-to-One, One-to-One, and Many-to-Many.",
      "Race Condition = The result depends on which thread runs first.",
      "Kernel-Level Threads are scheduled by the OS; User-Level Threads may be scheduled by a runtime.",
    ],
    memoryLineLabel: "Remember This",
    memoryLine:
      "Thread = Shared Process Resources + Private Execution Context.",
    memoryLineAtEnd: true,
    trap: "",
  },
};

export { processesDetailed, threadsDetailed };
