import type { SubjectContent, SubjectTopic } from "@/lib/subject-content";

const topic = (value: SubjectTopic) => value;

export const operatingSystemsContent: SubjectContent = {
  order: "01",
  slug: "operating-systems",
  title: "Operating Systems",
  shortTitle: "OS",
  eyebrow: "CS Core",
  description:
    "Understand how processes, memory, scheduling, and concurrency work - and explain their trade-offs clearly in technical interviews.",
  estimatedTime: "8–10 hours",
  modules: [
    {
      order: "01",
      title: "Foundations",
      description: "The role, structure, and interface of an operating system.",
      topics: [
        topic({
          slug: "what-is-an-operating-system",
          title: "What is an Operating System?",
          description:
            "Understand the OS as a resource manager and the abstraction layer between applications and hardware.",
          readTime: "7 min",
          difficulty: "Foundation",
          tags: ["Kernel", "Resources", "Abstraction"],
          learn: {
            opening:
              "An operating system coordinates hardware resources and gives applications a stable, safe environment in which to run. It hides device-specific complexity behind useful abstractions such as processes, files, and virtual memory.",
            sections: [
              {
                title: "Why an operating system exists",
                paragraphs: [
                  "Without an operating system, every program would need to control the processor, memory, storage, and devices directly. Programs would also need to coordinate with one another to avoid corrupting shared resources.",
                  "The OS centralises that coordination. It decides who uses a resource, for how long, and under what protection rules.",
                ],
                points: [
                  "Abstract hardware through processes, files, sockets, and virtual memory.",
                  "Allocate CPU time, memory, storage, and I/O devices.",
                  "Isolate programs so one failure does not freely damage another.",
                  "Provide common services through system calls.",
                ],
              },
              {
                title: "Kernel and user space",
                paragraphs: [
                  "The kernel runs with privileged access to hardware. Applications normally run in user mode with restricted permissions and request protected operations through system calls.",
                ],
                points: [
                  "Kernel mode can execute privileged instructions.",
                  "User mode limits direct hardware and memory access.",
                  "A mode switch transfers controlled execution into the kernel.",
                ],
              },
            ],
            mechanism: {
              title: "From application request to hardware",
              steps: [
                "An application calls a library function such as read().",
                "The library issues a system call and execution enters kernel mode.",
                "The kernel validates the request and coordinates the device.",
                "The result returns to the application in user mode.",
              ],
            },
            example: {
              title: "Opening a file",
              body: "A text editor does not directly locate sectors on a disk. It asks the OS to open a path. The OS checks permissions, resolves the file-system metadata, communicates with storage, and returns a file descriptor.",
            },
            misconception:
              "The operating system is not only the visible desktop interface. The kernel, system services, drivers, and resource-management policies are the core of the OS.",
          },
          revise: {
            definition:
              "An operating system is system software that manages hardware resources and provides protected abstractions and services to applications.",
            essentials: [
              "Resource manager: allocates CPU, memory, storage, and devices.",
              "Abstraction provider: exposes processes, files, and virtual memory.",
              "Protection layer: isolates applications and controls access.",
              "Service interface: applications enter the kernel through system calls.",
            ],
            comparison: {
              left: {
                label: "User mode",
                points: [
                  "Restricted privileges",
                  "Runs application code",
                  "Cannot access hardware directly",
                ],
              },
              right: {
                label: "Kernel mode",
                points: [
                  "Full privileges",
                  "Runs OS core",
                  "Controls protected resources",
                ],
              },
            },
            followUp:
              "Why do modern operating systems separate user mode and kernel mode?",
          },
          lastMinute: {
            memoryLine: "OS = abstraction + allocation + protection.",
            cues: [
              "Abstraction: convenient view of hardware.",
              "Allocation: decides who receives each resource.",
              "Protection: prevents unsafe access between programs.",
              "System calls: controlled entry into kernel services.",
            ],
            trap:
              "Do not define an OS only as an interface between the user and hardware; resource management and protection are equally important.",
          },
        }),
        topic({
          slug: "system-calls",
          title: "System Calls",
          description:
            "Learn how applications safely request privileged services from the kernel.",
          readTime: "6 min",
          difficulty: "Foundation",
          tags: ["Kernel", "User mode", "API"],
          learn: {
            opening:
              "A system call is the controlled boundary through which a user program asks the kernel to perform a privileged operation.",
            sections: [
              {
                title: "The protected interface",
                paragraphs: [
                  "Applications use familiar library APIs, while the system-call interface performs the actual transition into the kernel. The kernel validates arguments before acting on the request.",
                ],
                points: [
                  "Process control: fork, exec, exit, wait.",
                  "File operations: open, read, write, close.",
                  "Device and communication operations.",
                  "Protection and information queries.",
                ],
              },
            ],
            mechanism: {
              title: "A system-call transition",
              steps: [
                "Place the call number and arguments where the ABI expects them.",
                "Execute a trap instruction.",
                "Run the matching kernel handler after validation.",
                "Return a result or error code to user space.",
              ],
            },
            example: {
              title: "Reading bytes",
              body: "read(fd, buffer, size) asks the kernel to validate the descriptor and buffer, obtain data from the file or device, and copy the permitted bytes into the process.",
            },
            misconception:
              "A normal function call stays within the process. A system call crosses a protection boundary and is therefore more expensive.",
          },
          revise: {
            definition:
              "A system call is a controlled request from a user process to the kernel for a privileged OS service.",
            essentials: [
              "Usually reached through a language or C library wrapper.",
              "Uses a trap to enter kernel mode.",
              "Kernel validates permissions and arguments.",
              "Returns a value or an error to the caller.",
            ],
            followUp:
              "Why are system calls slower than ordinary function calls?",
          },
          lastMinute: {
            memoryLine: "Library API → trap → kernel handler → return.",
            cues: [
              "Controlled privilege transition.",
              "Arguments must be validated.",
              "Examples: open, read, fork, exec.",
            ],
            trap:
              "A library call is not always a system call; some library functions complete entirely in user space.",
          },
        }),
      ],
    },
    {
      order: "02",
      title: "Processes & Threads",
      description: "Execution units, lifecycle, context, and communication.",
      topics: [
        topic({
          slug: "program-vs-process",
          title: "Program vs Process",
          description:
            "Separate passive executable code from a running instance with state and resources.",
          readTime: "5 min",
          difficulty: "Foundation",
          tags: ["Process", "PCB", "Execution"],
          learn: {
            opening:
              "A program is a passive file containing instructions. A process is an active execution of a program together with its current state and allocated resources.",
            sections: [
              {
                title: "What a process contains",
                paragraphs: [
                  "Two processes may run the same program while maintaining independent address spaces, registers, stacks, open files, and scheduling state.",
                ],
                points: [
                  "Code, data, heap, and stack.",
                  "CPU registers and program counter.",
                  "Open resources and security credentials.",
                  "A process control block maintained by the OS.",
                ],
              },
            ],
            mechanism: {
              title: "Creating an execution instance",
              steps: [
                "Load or map the program into an address space.",
                "Create the process control block.",
                "Initialise registers, stack, and resources.",
                "Place the process in the ready queue.",
              ],
            },
            example: {
              title: "Two editor windows",
              body: "Launching the same editor twice usually creates two processes. They share the same executable file but keep separate memory, open documents, and execution state.",
            },
            misconception:
              "A process is not the same thing as the program file; a single program can produce many concurrent processes.",
          },
          revise: {
            definition:
              "A program is passive code on storage; a process is a running program plus execution state and resources.",
            essentials: [
              "Program: static and passive.",
              "Process: dynamic and scheduled.",
              "PCB records the process state for the OS.",
              "Multiple processes can execute the same program.",
            ],
            followUp: "What information is typically stored in a PCB?",
          },
          lastMinute: {
            memoryLine: "Program is the recipe; process is the cooking.",
            cues: [
              "Program lives on storage.",
              "Process owns execution state.",
              "PCB lets the OS manage it.",
            ],
            trap:
              "Do not say a process contains only code; it also includes memory, CPU state, and OS-managed resources.",
          },
        }),
        topic({
          slug: "process-vs-thread",
          title: "Process vs Thread",
          description:
            "Compare isolation, resource sharing, communication, and switching cost.",
          readTime: "8 min",
          difficulty: "Foundation",
          tags: ["Threads", "Isolation", "Concurrency"],
          learn: {
            opening:
              "A process is a protected resource container. A thread is an execution path inside that container. Threads in the same process share most resources but keep their own execution stacks and registers.",
            sections: [
              {
                title: "The practical trade-off",
                paragraphs: [
                  "Processes provide stronger isolation. Threads make communication and shared-state work cheaper, but they also make synchronization errors easier to introduce.",
                ],
                points: [
                  "Processes have separate virtual address spaces.",
                  "Threads share code, heap, and open process resources.",
                  "Each thread keeps its own stack, registers, and program counter.",
                  "A faulty thread can corrupt its entire process.",
                ],
              },
            ],
            mechanism: {
              title: "Switching execution",
              steps: [
                "Save the current execution context.",
                "Choose another runnable process or thread.",
                "Switch memory context when required.",
                "Restore registers and continue execution.",
              ],
            },
            example: {
              title: "Web browser architecture",
              body: "A browser may isolate tabs in separate processes for resilience, while each tab uses several threads for rendering, networking, and background tasks.",
            },
            misconception:
              "Threads are not always faster. Their advantage depends on the workload, synchronization overhead, and available CPU cores.",
          },
          revise: {
            definition:
              "Processes isolate resources; threads share a process while maintaining independent execution state.",
            essentials: [
              "Process switch can require changing the address-space context.",
              "Thread communication is easy through shared memory.",
              "Process communication needs explicit IPC.",
              "Threads trade isolation for lower coordination cost.",
            ],
            comparison: {
              left: {
                label: "Process",
                points: [
                  "Separate address space",
                  "Stronger isolation",
                  "Costlier communication",
                ],
              },
              right: {
                label: "Thread",
                points: [
                  "Shared address space",
                  "Cheaper communication",
                  "Needs synchronization",
                ],
              },
            },
            followUp:
              "Why is a thread context switch usually cheaper than a process context switch?",
          },
          lastMinute: {
            memoryLine: "Process owns resources; thread owns execution.",
            cues: [
              "Shared: code, heap, files.",
              "Private per thread: stack, registers, program counter.",
              "Processes isolate; threads collaborate.",
            ],
            trap:
              "Threads do not share their stacks. Each thread requires a private stack for function calls and local variables.",
          },
        }),
        topic({
          slug: "process-states",
          title: "Process States",
          description:
            "Follow a process through new, ready, running, waiting, and terminated states.",
          readTime: "6 min",
          difficulty: "Foundation",
          tags: ["Lifecycle", "Queues", "Scheduler"],
          learn: {
            opening:
              "Process states describe whether a process is being created, able to run, currently executing, waiting for an event, or finished.",
            sections: [
              {
                title: "The five-state model",
                paragraphs: [
                  "The scheduler moves processes between ready and running. I/O or another event moves a running process into waiting until that event completes.",
                ],
                points: [
                  "New: OS is creating the process.",
                  "Ready: waiting for CPU time.",
                  "Running: executing on a CPU.",
                  "Waiting: blocked for an event or I/O.",
                  "Terminated: execution has finished.",
                ],
              },
            ],
            mechanism: {
              title: "A typical lifecycle",
              steps: [
                "Admit a new process to the ready queue.",
                "Dispatch it to a CPU.",
                "Preempt it or block it for I/O.",
                "Return it to ready when the event completes.",
              ],
            },
            example: {
              title: "Waiting for disk",
              body: "A process that requests uncached file data cannot usefully continue. It enters a waiting state, allowing the CPU to run another ready process.",
            },
            misconception:
              "A waiting process is not waiting for the CPU. A ready process waits for the CPU; a blocked process waits for an external event.",
          },
          revise: {
            definition:
              "Process states let the OS track whether a process can execute and what event should move it next.",
            essentials: [
              "Ready means eligible for CPU.",
              "Running means currently on CPU.",
              "Waiting means blocked on an event.",
              "Preemption moves running back to ready.",
            ],
            followUp:
              "What is the difference between the ready and waiting states?",
          },
          lastMinute: {
            memoryLine: "New → Ready ⇄ Running → Waiting → Ready → Exit.",
            cues: [
              "Dispatch: ready to running.",
              "Preempt: running to ready.",
              "I/O request: running to waiting.",
              "I/O completion: waiting to ready.",
            ],
            trap:
              "Waiting and ready are not interchangeable: only a ready process can be selected immediately by the CPU scheduler.",
          },
        }),
      ],
    },
    {
      order: "03",
      title: "CPU Scheduling",
      description: "How the OS chooses work and evaluates scheduling policy.",
      topics: [
        topic({
          slug: "cpu-scheduling",
          title: "CPU Scheduling",
          description:
            "Understand scheduling decisions, preemption, and performance metrics.",
          readTime: "7 min",
          difficulty: "Intermediate",
          tags: ["Scheduler", "Latency", "Throughput"],
          learn: {
            opening:
              "CPU scheduling chooses which ready task should run next. The best policy depends on whether the system values throughput, response time, fairness, or predictable deadlines.",
            sections: [
              {
                title: "Metrics interviewers expect",
                paragraphs: [
                  "Scheduling goals conflict. A policy that minimises average waiting time may not be fair, while frequent preemption can improve responsiveness but increase switching overhead.",
                ],
                points: [
                  "Turnaround time: completion minus arrival.",
                  "Waiting time: time spent in the ready queue.",
                  "Response time: first run minus arrival.",
                  "Throughput and CPU utilisation.",
                ],
              },
            ],
            mechanism: {
              title: "A scheduling decision",
              steps: [
                "Track runnable work in one or more ready queues.",
                "Apply the policy to select a candidate.",
                "Context-switch the CPU to that task.",
                "Reconsider after completion, blocking, or preemption.",
              ],
            },
            example: {
              title: "Interactive workload",
              body: "A terminal benefits from low response time, so the scheduler may quickly preempt a long background task when the user produces new input.",
            },
            misconception:
              "Scheduling is not about maximising a single universal metric. Policies express trade-offs for different workload goals.",
          },
          revise: {
            definition:
              "CPU scheduling selects a ready process or thread to execute according to a system policy.",
            essentials: [
              "Preemptive scheduling can interrupt a running task.",
              "Non-preemptive scheduling waits for a yield, block, or completion.",
              "Response time matters for interactive systems.",
              "Turnaround and throughput matter for batch work.",
            ],
            followUp:
              "Why can improving response time reduce overall efficiency?",
          },
          lastMinute: {
            memoryLine: "Scheduling balances response, waiting, throughput, and fairness.",
            cues: [
              "Ready queue supplies candidates.",
              "Dispatcher performs the switch.",
              "Preemption improves responsiveness at a cost.",
            ],
            trap:
              "Turnaround time and response time are different: response ends at the first CPU service, not process completion.",
          },
        }),
        topic({
          slug: "scheduling-algorithms",
          title: "Scheduling Algorithms",
          description:
            "Compare FCFS, SJF, SRTF, priority scheduling, and round robin.",
          readTime: "10 min",
          difficulty: "Intermediate",
          tags: ["FCFS", "SJF", "Round Robin"],
          learn: {
            opening:
              "Scheduling algorithms encode different priorities. Interviews usually test whether you can calculate their metrics and explain starvation, fairness, and preemption.",
            sections: [
              {
                title: "Core algorithms",
                paragraphs: [
                  "FCFS is simple but can suffer the convoy effect. SJF minimises average waiting time when burst lengths are known. Round robin improves fairness and responsiveness through a time quantum.",
                ],
                points: [
                  "FCFS: arrival order, non-preemptive.",
                  "SJF/SRTF: shortest predicted burst first.",
                  "Priority: highest-priority task first.",
                  "Round robin: rotating time slices.",
                ],
              },
            ],
            mechanism: {
              title: "Round-robin execution",
              steps: [
                "Remove the first process from the ready queue.",
                "Run it for at most one time quantum.",
                "Finish or block it if the burst ends early.",
                "Otherwise append it to the back of the queue.",
              ],
            },
            example: {
              title: "Choosing the quantum",
              body: "A tiny quantum feels responsive but causes frequent context switches. A very large quantum makes round robin behave increasingly like FCFS.",
            },
            misconception:
              "SJF is theoretically optimal for average waiting time only when future CPU bursts are accurately known or predicted.",
          },
          revise: {
            definition:
              "Scheduling algorithms order ready work to optimise different system goals.",
            essentials: [
              "FCFS: simple, convoy effect.",
              "SJF: lowest average wait, burst estimate required.",
              "Priority: flexible, starvation needs aging.",
              "Round robin: fair and responsive, quantum-sensitive.",
            ],
            comparison: {
              left: {
                label: "SJF",
                points: [
                  "Optimises average waiting",
                  "Can starve long jobs",
                  "Needs burst prediction",
                ],
              },
              right: {
                label: "Round robin",
                points: [
                  "Shares CPU by quantum",
                  "Responsive and fair",
                  "Adds switch overhead",
                ],
              },
            },
            followUp:
              "What happens when the round-robin time quantum becomes very large?",
          },
          lastMinute: {
            memoryLine: "FCFS = order, SJF = shortest, RR = slices, Priority = importance.",
            cues: [
              "Convoy effect: FCFS.",
              "Minimum average wait: SJF.",
              "Aging prevents starvation.",
              "Quantum controls round-robin behaviour.",
            ],
            trap:
              "Round robin does not guarantee the minimum average waiting time; its strength is fairness and response time.",
          },
        }),
      ],
    },
    {
      order: "04",
      title: "Concurrency",
      description: "Shared state, coordination, and progress guarantees.",
      topics: [
        topic({
          slug: "race-conditions",
          title: "Race Conditions",
          description:
            "See how interleavings make shared-state results depend on timing.",
          readTime: "7 min",
          difficulty: "Intermediate",
          tags: ["Shared state", "Atomicity", "Interleaving"],
          learn: {
            opening:
              "A race condition occurs when a program's correctness depends on the unpredictable ordering of concurrent operations on shared state.",
            sections: [
              {
                title: "Why one line is not one operation",
                paragraphs: [
                  "An increment may compile into read, modify, and write steps. Two threads can interleave those steps and overwrite one another's updates.",
                ],
                points: [
                  "Concurrency creates multiple valid instruction interleavings.",
                  "Critical sections access shared mutable state.",
                  "Atomic operations appear indivisible to competitors.",
                  "Correctness must hold under every permitted interleaving.",
                ],
              },
            ],
            mechanism: {
              title: "A lost update",
              steps: [
                "Thread A reads counter = 10.",
                "Thread B also reads counter = 10.",
                "Both compute 11 independently.",
                "Both write 11, losing one increment.",
              ],
            },
            example: {
              title: "Inventory checkout",
              body: "Two requests can both see one item available and both complete a sale unless checking and decrementing stock are coordinated atomically.",
            },
            misconception:
              "A race condition can remain hidden during testing. Its absence in a few executions does not prove the code is safe.",
          },
          revise: {
            definition:
              "A race condition makes program correctness depend on nondeterministic timing between concurrent operations.",
            essentials: [
              "Usually involves shared mutable state.",
              "Read-modify-write sequences are common hazards.",
              "Protect critical sections or use atomic operations.",
              "Test outcomes alone cannot prove race freedom.",
            ],
            followUp:
              "How can an increment operation cause a lost update?",
          },
          lastMinute: {
            memoryLine: "Shared state + unsafe interleaving = race condition.",
            cues: [
              "Find the critical section.",
              "Ask whether the operation is truly atomic.",
              "Protect invariants, not merely individual lines.",
            ],
            trap:
              "Concurrency bugs do not require simultaneous physical execution; interleaving on one CPU is enough.",
          },
        }),
        topic({
          slug: "synchronization",
          title: "Synchronization Primitives",
          description:
            "Use mutexes, semaphores, and condition variables for safe coordination.",
          readTime: "10 min",
          difficulty: "Intermediate",
          tags: ["Mutex", "Semaphore", "Condition"],
          learn: {
            opening:
              "Synchronization primitives protect invariants and coordinate when concurrent work may proceed. Choosing the right primitive is as important as using it correctly.",
            sections: [
              {
                title: "Different tools, different intent",
                paragraphs: [
                  "A mutex provides ownership-based mutual exclusion. A semaphore represents available permits. A condition variable allows threads to sleep until a protected predicate may have changed.",
                ],
                points: [
                  "Mutex: one owner enters a critical section.",
                  "Counting semaphore: permits up to N concurrent users.",
                  "Binary semaphore: signalling or exclusion without mutex ownership semantics.",
                  "Condition variable: wait for a state predicate while releasing a lock.",
                ],
              },
            ],
            mechanism: {
              title: "Waiting on a condition",
              steps: [
                "Lock the mutex protecting the shared state.",
                "Check the predicate in a loop.",
                "Wait, atomically releasing the mutex.",
                "Wake, reacquire the mutex, and check again.",
              ],
            },
            example: {
              title: "Bounded work queue",
              body: "Producers wait while the queue is full; consumers wait while it is empty. A mutex protects the queue and condition variables signal state changes.",
            },
            misconception:
              "A condition variable does not store the condition. The program owns a predicate over shared state and must recheck it after waking.",
          },
          revise: {
            definition:
              "Synchronization primitives enforce safe access and coordinate progress among concurrent tasks.",
            essentials: [
              "Mutex = ownership and mutual exclusion.",
              "Semaphore = a counter of permits.",
              "Condition variable = sleep until state may have changed.",
              "Keep critical sections small but complete.",
            ],
            comparison: {
              left: {
                label: "Mutex",
                points: [
                  "Has an owner",
                  "Protects a critical section",
                  "Typically unlocked by owner",
                ],
              },
              right: {
                label: "Semaphore",
                points: [
                  "Counts permits",
                  "Controls capacity or signals",
                  "No equivalent ownership rule",
                ],
              },
            },
            followUp:
              "When would you choose a semaphore instead of a mutex?",
          },
          lastMinute: {
            memoryLine: "Mutex protects; semaphore permits; condition variable waits.",
            cues: [
              "Guard shared state with the same mutex.",
              "Wait in a loop, not an if statement.",
              "Notify after changing the predicate.",
            ],
            trap:
              "A binary semaphore and a mutex can look similar, but mutex ownership semantics make them conceptually different.",
          },
        }),
        topic({
          slug: "deadlocks",
          title: "Deadlocks",
          description:
            "Recognise deadlock conditions and compare prevention, avoidance, and detection.",
          readTime: "11 min",
          difficulty: "Advanced",
          tags: ["Coffman", "Banker", "Locks"],
          learn: {
            opening:
              "A deadlock is a state in which a set of processes cannot progress because each is waiting for a resource held by another member of the set.",
            sections: [
              {
                title: "Four necessary conditions",
                paragraphs: [
                  "All four Coffman conditions must hold for a resource deadlock to be possible. Breaking any one of them prevents that class of deadlock.",
                ],
                points: [
                  "Mutual exclusion: a resource cannot be shared.",
                  "Hold and wait: a process holds resources while requesting more.",
                  "No preemption: resources cannot be forcibly reclaimed.",
                  "Circular wait: a cycle of processes waits on one another.",
                ],
              },
              {
                title: "Handling strategies",
                paragraphs: [
                  "Prevention structurally breaks a necessary condition. Avoidance grants requests only when the state remains safe. Detection permits deadlocks and later recovers.",
                ],
              },
            ],
            mechanism: {
              title: "A two-lock deadlock",
              steps: [
                "Thread A acquires lock X.",
                "Thread B acquires lock Y.",
                "A waits for Y while still holding X.",
                "B waits for X while still holding Y.",
              ],
            },
            example: {
              title: "Consistent lock ordering",
              body: "If every thread must acquire X before Y, the circular-wait condition is removed and this two-lock deadlock cannot form.",
            },
            misconception:
              "Deadlock is not the same as starvation. In deadlock, members of a cycle block one another; starvation can occur while the system as a whole keeps progressing.",
          },
          revise: {
            definition:
              "Deadlock is permanent mutual waiting among processes in a resource-dependency cycle.",
            essentials: [
              "Conditions: mutual exclusion, hold and wait, no preemption, circular wait.",
              "Prevention breaks a necessary condition.",
              "Avoidance stays within safe states.",
              "Detection finds cycles and recovery removes them.",
            ],
            comparison: {
              left: {
                label: "Deadlock",
                points: [
                  "Circular dependency",
                  "Participants cannot progress",
                  "Needs external recovery",
                ],
              },
              right: {
                label: "Starvation",
                points: [
                  "Indefinite postponement",
                  "Other work progresses",
                  "Fairness can resolve it",
                ],
              },
            },
            followUp:
              "How does imposing a global lock order prevent deadlock?",
          },
          lastMinute: {
            memoryLine: "ME + HW + NP + CW = deadlock can occur.",
            cues: [
              "Mutual exclusion.",
              "Hold and wait.",
              "No preemption.",
              "Circular wait.",
            ],
            trap:
              "The four conditions are necessary, not a guarantee that a deadlock is currently present.",
          },
        }),
      ],
    },
    {
      order: "05",
      title: "Memory",
      description: "Address translation, allocation, and the virtual-memory model.",
      topics: [
        topic({
          slug: "paging",
          title: "Paging",
          description:
            "Map fixed-size virtual pages to physical frames through page tables.",
          readTime: "9 min",
          difficulty: "Intermediate",
          tags: ["Pages", "Frames", "TLB"],
          learn: {
            opening:
              "Paging divides virtual memory into fixed-size pages and physical memory into equal-size frames. A page table records where each virtual page currently resides.",
            sections: [
              {
                title: "Address translation",
                paragraphs: [
                  "The CPU splits a virtual address into a virtual page number and an offset. Translation replaces the page number with a physical frame number while preserving the offset.",
                ],
                points: [
                  "Fixed sizes remove external fragmentation.",
                  "Page tables add storage and lookup overhead.",
                  "The TLB caches recent translations.",
                  "Page permissions support isolation and sharing.",
                ],
              },
            ],
            mechanism: {
              title: "Translating an address",
              steps: [
                "Extract the virtual page number and page offset.",
                "Look for the page translation in the TLB.",
                "On a miss, walk the page table.",
                "Combine the frame number with the unchanged offset.",
              ],
            },
            example: {
              title: "Shared library code",
              body: "Different processes can map their virtual pages to the same read-only physical frames containing shared library code.",
            },
            misconception:
              "Paging avoids external fragmentation, but it can still create internal fragmentation within the final allocated page.",
          },
          revise: {
            definition:
              "Paging maps fixed-size virtual pages to fixed-size physical frames using page tables.",
            essentials: [
              "Virtual address = page number + offset.",
              "Physical address = frame number + same offset.",
              "TLB accelerates common translations.",
              "Page tables also store protection and status bits.",
            ],
            followUp:
              "What happens during a TLB miss, and why is it expensive?",
          },
          lastMinute: {
            memoryLine: "VPN → page table/TLB → PFN; offset stays unchanged.",
            cues: [
              "Page and frame sizes match.",
              "No external fragmentation.",
              "TLB caches translations.",
            ],
            trap:
              "A TLB miss is not automatically a page fault; the mapping may still be present in the page table.",
          },
        }),
        topic({
          slug: "virtual-memory",
          title: "Virtual Memory",
          description:
            "Give each process a large protected address space backed on demand.",
          readTime: "10 min",
          difficulty: "Advanced",
          tags: ["Demand paging", "Page fault", "Working set"],
          learn: {
            opening:
              "Virtual memory separates the addresses used by a process from the physical memory installed in the machine. Only actively needed pages must remain in RAM.",
            sections: [
              {
                title: "Why the abstraction matters",
                paragraphs: [
                  "Each process receives a private, contiguous-looking address space even when its pages are scattered across frames or temporarily stored on disk.",
                ],
                points: [
                  "Isolation through separate page tables.",
                  "Demand paging loads pages when first accessed.",
                  "Replacement frees frames when memory is pressured.",
                  "Locality makes the abstraction practical.",
                ],
              },
            ],
            mechanism: {
              title: "Handling a page fault",
              steps: [
                "Hardware finds the page-table entry not present.",
                "The kernel validates that the access is legal.",
                "Load the page into a free or reclaimed frame.",
                "Update translation state and restart the instruction.",
              ],
            },
            example: {
              title: "Starting a large application",
              body: "The OS does not need to read the entire executable into RAM before it starts. Code and data pages arrive on demand as execution touches them.",
            },
            misconception:
              "Virtual memory is not simply disk used as extra RAM. It is an address-space abstraction; disk backing is one mechanism used to support it.",
          },
          revise: {
            definition:
              "Virtual memory gives processes protected logical address spaces whose pages are mapped to physical frames on demand.",
            essentials: [
              "Demand paging delays loading until access.",
              "A valid page fault can be resolved and retried.",
              "Replacement chooses a victim when no frame is free.",
              "Too many faults can cause thrashing.",
            ],
            comparison: {
              left: {
                label: "TLB miss",
                points: [
                  "Translation not cached",
                  "Page may be in RAM",
                  "Page-table walk required",
                ],
              },
              right: {
                label: "Page fault",
                points: [
                  "Mapping not currently present",
                  "Kernel handles exception",
                  "May require disk I/O",
                ],
              },
            },
            followUp:
              "Why can increasing the number of active processes cause thrashing?",
          },
          lastMinute: {
            memoryLine: "Virtual address space is the view; pages and frames are the mapping.",
            cues: [
              "Fault → validate → load → map → retry.",
              "Locality keeps fault rates manageable.",
              "Thrashing means excessive paging.",
            ],
            trap:
              "Not every page fault is an error. Demand paging intentionally uses valid page faults to load data lazily.",
          },
        }),
      ],
    },
  ],
};
