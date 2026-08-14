import type { OperatingSystemQuestion } from "@/content/interview-questions/types";

export const operatingSystemInterviewQuestions: OperatingSystemQuestion[] = [
  {
    id: "what-is-operating-system",
    category: "OS fundamentals",
    question:
      "Let us start with the basics. What does an operating system actually do?",
    answer:
      "An operating system sits between applications and the hardware. It manages resources such as the CPU, memory, storage, and devices, while giving programs simpler abstractions like processes, files, and sockets. It also provides isolation so one program cannot freely interfere with another.",
  },
  {
    id: "kernel-and-user-mode",
    category: "OS fundamentals",
    question: "Why do operating systems separate kernel mode from user mode?",
    answer:
      "The separation protects the machine from faulty or malicious applications. User programs run with limited privileges, while the kernel can access hardware and protected memory. When an application needs a privileged operation, it asks the kernel through a system call.",
  },
  {
    id: "system-call",
    category: "OS fundamentals",
    question: "What happens when a program makes a system call?",
    answer:
      "The program places the system call number and arguments where the calling convention expects them, then executes a special instruction. The CPU switches to kernel mode and runs the kernel handler. After the kernel completes or rejects the request, control returns to the program in user mode.",
  },
  {
    id: "interrupt-trap-exception",
    category: "OS fundamentals",
    question:
      "How would you distinguish an interrupt, a trap, and an exception?",
    answer:
      "An interrupt is usually an asynchronous signal from hardware, such as a timer or network device. An exception is caused by the current instruction, for example a divide-by-zero or page fault. A trap is commonly used for an intentional transfer to the kernel, such as a system call, although terminology varies by architecture.",
  },
  {
    id: "monolithic-and-microkernel",
    category: "OS fundamentals",
    question:
      "What is the main trade-off between a monolithic kernel and a microkernel?",
    answer:
      "A monolithic kernel keeps many services in kernel space, which makes communication fast but increases the amount of privileged code. A microkernel keeps only essential mechanisms in the kernel and moves more services to user space. That improves isolation and modularity, but communication between services can add overhead.",
  },
  {
    id: "boot-process",
    category: "OS fundamentals",
    question: "Can you walk me through what happens when a computer boots?",
    answer:
      "Firmware initializes the hardware and chooses a boot device. A bootloader then loads the operating-system kernel into memory and transfers control to it. The kernel initializes memory, devices, and scheduling, mounts a root file system, and starts the first user-space process, which launches the remaining services.",
  },

  {
    id: "program-and-process",
    category: "Processes and threads",
    question: "What is the difference between a program and a process?",
    answer:
      "A program is a passive file containing instructions and data. A process is a running instance of that program, with its own address space, execution state, open files, and other resources. The same program can have several independent processes running at once.",
  },
  {
    id: "process-state",
    category: "Processes and threads",
    question: "What states can a process move through during its lifetime?",
    answer:
      "A process is typically created, ready to run, running, waiting for an event, and finally terminated. A running process moves back to ready when it is preempted. It moves to waiting when it needs something such as disk I/O, then becomes ready again when that event completes.",
  },
  {
    id: "process-control-block",
    category: "Processes and threads",
    question:
      "What information does the operating system keep in a process control block?",
    answer:
      "It keeps the information needed to stop and later resume the process. That includes its identifier, state, CPU registers, scheduling data, memory-management information, open resources, and accounting details. The exact fields depend on the operating system.",
  },
  {
    id: "process-and-thread",
    category: "Processes and threads",
    question:
      "Suppose I ask you to compare a process with a thread. How would you explain it?",
    answer:
      "A process has its own address space and provides strong isolation. Threads are execution units inside a process, so they share code, heap memory, and open resources, while each thread keeps its own stack and registers. Threads are cheaper to create and communicate through shared memory, but a bad thread can affect the entire process.",
  },
  {
    id: "context-switch",
    category: "Processes and threads",
    question:
      "What exactly is saved during a context switch, and why is the switch not free?",
    answer:
      "The operating system saves the current execution state, including registers, the program counter, and stack information, then restores another task's state. Switching between processes can also disturb caches and address-translation state. The kernel work and the lost cache locality make context switching an overhead.",
  },
  {
    id: "fork-and-exec",
    category: "Processes and threads",
    question: "Why do Unix-like systems have both fork and exec?",
    answer:
      "fork creates a new process based on the caller, while exec replaces the current process image with a new program. Keeping them separate lets the child adjust file descriptors, environment variables, or permissions before loading the new program. Shells use this pattern to implement redirection and pipelines.",
  },

  {
    id: "cpu-scheduling-goal",
    category: "CPU scheduling",
    question: "What is a CPU scheduler trying to optimize?",
    answer:
      "There is no single metric that is best for every workload. A scheduler may try to improve CPU utilization, throughput, response time, turnaround time, and fairness. The important part is choosing a policy that matches the system, because improving one metric can hurt another.",
  },
  {
    id: "preemptive-scheduling",
    category: "CPU scheduling",
    question:
      "What is the practical difference between preemptive and non-preemptive scheduling?",
    answer:
      "With preemptive scheduling, the operating system can interrupt a running task and give the CPU to another task. With non-preemptive scheduling, a task keeps the CPU until it blocks or finishes. Preemption improves responsiveness, but it requires timer interrupts and careful synchronization around shared state.",
  },
  {
    id: "fcfs-sjf-round-robin",
    category: "CPU scheduling",
    question:
      "When would Round Robin be a better choice than FCFS or Shortest Job First?",
    answer:
      "Round Robin is a good fit for interactive systems because every ready task gets CPU time within a bounded period. FCFS is simple but a long job can delay everything behind it. Shortest Job First can reduce average waiting time, but it needs a reliable estimate of each job's CPU burst and may starve long jobs.",
  },
  {
    id: "time-quantum",
    category: "CPU scheduling",
    question:
      "What happens if the time quantum in Round Robin is too small or too large?",
    answer:
      "If it is too small, the system spends too much time context switching. If it is too large, Round Robin starts behaving like FCFS and interactive response gets worse. A useful quantum balances responsiveness against switching overhead.",
  },
  {
    id: "starvation-and-aging",
    category: "CPU scheduling",
    question:
      "Can a scheduling policy cause starvation? How would you prevent it?",
    answer:
      "Yes. Strict priority scheduling can keep a low-priority task waiting indefinitely if higher-priority work keeps arriving. Aging prevents this by gradually increasing the priority of a task the longer it waits.",
  },
  {
    id: "multilevel-feedback-queue",
    category: "CPU scheduling",
    question:
      "How does a multilevel feedback queue respond to different kinds of workloads?",
    answer:
      "It uses multiple priority queues and changes a task's priority based on observed behavior. Interactive or I/O-bound tasks usually keep higher priority because they use short CPU bursts, while CPU-heavy tasks move down. Periodic priority boosts are used to reduce starvation and adapt when a task's behavior changes.",
  },

  {
    id: "race-condition",
    category: "Synchronization",
    question: "What makes a race condition possible?",
    answer:
      "A race condition occurs when multiple execution flows access shared state and the result depends on their timing. It becomes a bug when at least one access modifies that state without correct coordination. Because the timing changes between runs, these bugs can be difficult to reproduce.",
  },
  {
    id: "critical-section",
    category: "Synchronization",
    question:
      "What properties should a correct critical-section solution provide?",
    answer:
      "It should guarantee mutual exclusion, so only one participant enters the critical section at a time. It should also make progress when the section is free and avoid making a waiting participant wait forever. Those requirements protect correctness without introducing unnecessary blocking.",
  },
  {
    id: "mutex-and-semaphore",
    category: "Synchronization",
    question:
      "I often hear mutex and semaphore used interchangeably. Are they actually the same?",
    answer:
      "No. A mutex represents ownership of a lock, so the thread that locks it is expected to unlock it. A semaphore is a counter used for signalling or controlling access to a limited number of resources, and it does not require the same ownership rule.",
  },
  {
    id: "binary-and-counting-semaphore",
    category: "Synchronization",
    question:
      "When would you use a counting semaphore instead of a binary semaphore?",
    answer:
      "A binary semaphore represents one available permit and is often used for signalling or mutual exclusion. A counting semaphore represents several identical permits. For example, a connection pool with ten available connections can use a counting semaphore initialized to ten.",
  },
  {
    id: "spinlock-and-mutex",
    category: "Synchronization",
    question: "When can a spinlock make more sense than a mutex?",
    answer:
      "A spinlock can make sense when the expected wait is extremely short and sleeping would cost more than busy-waiting. It is mainly useful in low-level or multiprocessor kernel code. For longer waits, a blocking mutex is better because a spinning thread wastes CPU time.",
  },
  {
    id: "condition-variable",
    category: "Synchronization",
    question: "Why do we need condition variables if we already have mutexes?",
    answer:
      "A mutex protects shared state, but it does not let a thread efficiently wait for that state to change. A condition variable lets the thread sleep and be notified later. The thread checks the condition in a loop while holding the mutex because wakeups can be spurious or another thread may change the state first.",
  },

  {
    id: "deadlock-definition",
    category: "Deadlocks",
    question: "What is a deadlock, in your own words?",
    answer:
      "A deadlock is a state where a group of tasks cannot make progress because each one is waiting for a resource held by another task in the group. None of them can release what the others need because they are all blocked. Without outside action, the wait continues indefinitely.",
  },
  {
    id: "deadlock-conditions",
    category: "Deadlocks",
    question: "Which conditions must hold for a deadlock to be possible?",
    answer:
      "The four conditions are mutual exclusion, hold and wait, no preemption, and circular wait. All four must be present at the same time. Breaking any one of them prevents that particular deadlock from forming.",
  },
  {
    id: "prevention-avoidance-detection",
    category: "Deadlocks",
    question: "How do deadlock prevention, avoidance, and detection differ?",
    answer:
      "Prevention designs the system so at least one necessary deadlock condition cannot occur. Avoidance checks each allocation and proceeds only if the system remains in a safe state. Detection allows deadlocks to occur, finds them later, and then recovers by terminating work or reclaiming resources.",
  },
  {
    id: "bankers-algorithm",
    category: "Deadlocks",
    question:
      "What does Banker's algorithm check before granting a resource request?",
    answer:
      "It temporarily assumes the request is granted and checks whether a safe sequence still exists. A safe sequence is an order in which every process can obtain its remaining maximum need and finish. The algorithm requires advance knowledge of maximum resource demands, which limits its practical use.",
  },
  {
    id: "deadlock-and-starvation",
    category: "Deadlocks",
    question: "How is starvation different from deadlock?",
    answer:
      "In deadlock, a set of tasks is stuck because they are waiting on one another. In starvation, a task keeps waiting because resources or CPU time repeatedly go to others, even though the system as a whole continues making progress. Fair scheduling or aging can address starvation.",
  },
  {
    id: "lock-ordering",
    category: "Deadlocks",
    question:
      "A service occasionally freezes when two locks are involved. What would you inspect first?",
    answer:
      "I would check whether different code paths acquire the two locks in different orders. That can create a circular wait when each thread holds one lock and asks for the other. Defining one global lock order and following it consistently is a common fix.",
  },

  {
    id: "virtual-memory",
    category: "Memory management",
    question: "Why do modern operating systems use virtual memory?",
    answer:
      "Virtual memory gives each process a private, consistent address space instead of exposing physical memory directly. It provides isolation, simplifies relocation, and lets the system use techniques such as demand paging and shared mappings. A process can also have an address space larger than the physical memory currently available.",
  },
  {
    id: "paging-and-segmentation",
    category: "Memory management",
    question: "How would you compare paging with segmentation?",
    answer:
      "Paging divides memory into fixed-size blocks, which simplifies allocation and avoids external fragmentation. Segmentation divides memory into variable-size logical regions such as code, stack, and data, but it can create external fragmentation. Modern systems mainly use paging, sometimes with limited segmentation support from the architecture.",
  },
  {
    id: "page-table",
    category: "Memory management",
    question: "What role does a page table play in address translation?",
    answer:
      "A page table maps a process's virtual page numbers to physical frames. Each entry can also store permissions and status bits such as present, dirty, or accessed. The memory-management unit uses this information while translating addresses and enforcing protection.",
  },
  {
    id: "tlb",
    category: "Memory management",
    question: "Why is a TLB important if we already have page tables?",
    answer:
      "Reading the page table from memory for every address would be expensive. The TLB is a small hardware cache that stores recent virtual-to-physical translations. A TLB hit makes translation fast, while a miss requires a page-table walk before the result can be cached.",
  },
  {
    id: "page-fault",
    category: "Memory management",
    question: "Does every page fault mean the program has crashed?",
    answer:
      "No. A page fault only means the current virtual address cannot be handled by the existing translation. The operating system may load a valid page from storage, create a demand-zero page, or handle copy-on-write and then resume the instruction. It terminates the process only when the access is invalid or violates permissions.",
  },
  {
    id: "copy-on-write",
    category: "Memory management",
    question: "How does copy-on-write make fork more efficient?",
    answer:
      "Instead of copying every memory page immediately, the parent and child initially share the same physical pages as read-only. If either process writes to a shared page, a fault occurs and the kernel creates a private copy for that process. Pages that are never modified are never copied.",
  },

  {
    id: "file-and-directory",
    category: "File systems",
    question: "What abstractions does a file system provide?",
    answer:
      "It provides named files for storing byte sequences and directories for organizing those names. It also tracks metadata such as ownership, permissions, size, and timestamps. Underneath, it maps these abstractions to blocks on a storage device and manages free space and consistency.",
  },
  {
    id: "inode",
    category: "File systems",
    question: "What is an inode, and what information is not stored in it?",
    answer:
      "An inode stores a file's metadata and references to its data blocks. It normally includes the file type, permissions, owner, size, timestamps, and link count. The file name is not stored in the inode; directories map names to inode numbers.",
  },
  {
    id: "hard-and-symbolic-link",
    category: "File systems",
    question: "What is the difference between a hard link and a symbolic link?",
    answer:
      "A hard link is another directory entry pointing to the same inode, so the underlying file remains until its last hard link is removed. A symbolic link is a separate file containing a path to another file. It can cross file systems and point to directories, but it can become broken if the target path disappears.",
  },
  {
    id: "file-descriptor",
    category: "File systems",
    question: "What does a file descriptor represent inside a process?",
    answer:
      "A file descriptor is a small integer that indexes an entry in the process's descriptor table. That entry refers to an open-file description maintained by the kernel, including the current offset and access mode. Descriptors can represent files, pipes, sockets, and devices.",
  },
  {
    id: "journaling",
    category: "File systems",
    question: "How does journaling help a file system recover from a crash?",
    answer:
      "The file system records intended updates in a journal before applying them to their final locations. After a crash, it can replay completed journal entries or ignore incomplete ones. This avoids scanning and reconstructing the entire file system, although the exact guarantee depends on what the journal records.",
  },
  {
    id: "mounting",
    category: "File systems",
    question: "What does it mean to mount a file system?",
    answer:
      "Mounting attaches a file system to a directory in the existing directory tree. After that, applications reach its files through normal paths below that mount point. The operating system keeps track of which file system should handle each part of the path.",
  },

  {
    id: "device-driver",
    category: "I/O and storage",
    question: "What problem does a device driver solve?",
    answer:
      "A device driver knows how to control a specific device or device class. It translates the operating system's standard I/O requests into hardware-specific commands and handles interrupts or data transfer. This keeps most of the kernel and applications independent of device details.",
  },
  {
    id: "polling-and-interrupts",
    category: "I/O and storage",
    question: "When would polling be preferable to interrupts for I/O?",
    answer:
      "Polling can be better when events arrive very frequently and the expected wait is extremely short, because interrupt handling would add more overhead. Interrupts are better when events are less frequent because the CPU can do other work or sleep. High-performance systems often combine both approaches.",
  },
  {
    id: "dma",
    category: "I/O and storage",
    question: "How does DMA reduce CPU involvement in I/O?",
    answer:
      "The CPU configures the transfer, but the DMA controller moves a block of data directly between the device and main memory. The CPU is then notified when the transfer completes or needs attention. This avoids making the CPU copy each byte or word itself.",
  },
  {
    id: "buffering-caching-spooling",
    category: "I/O and storage",
    question: "Can you distinguish buffering, caching, and spooling?",
    answer:
      "Buffering temporarily holds data while it moves between components with different speeds or transfer sizes. Caching keeps a copy of data that is likely to be reused, mainly to reduce future access time. Spooling queues complete jobs for a device that handles them sequentially, such as a printer.",
  },
  {
    id: "hdd-and-ssd",
    category: "I/O and storage",
    question:
      "Why do disk-scheduling algorithms matter more for HDDs than SSDs?",
    answer:
      "An HDD has mechanical seek and rotational delays, so the order of requests strongly affects access time. An SSD has no moving head, which makes random access much faster and more uniform. SSDs still need scheduling and internal management, but minimizing physical head movement is no longer the concern.",
  },
  {
    id: "raid",
    category: "I/O and storage",
    question: "What are we trading when we choose a RAID level?",
    answer:
      "We trade usable capacity, performance, and fault tolerance. Striping can improve throughput, mirroring provides simple redundancy, and parity uses less extra space but adds update and recovery work. RAID improves availability against drive failure, but it is not a replacement for backups.",
  },

  {
    id: "protection-and-security",
    category: "Protection and security",
    question: "How do protection and security differ in an operating system?",
    answer:
      "Protection is about controlling how processes and users access system resources. Security is broader and includes defending the system against unauthorized access, misuse, and attacks. Protection mechanisms such as permissions and isolation are part of the overall security design.",
  },
  {
    id: "authentication-authorization",
    category: "Protection and security",
    question:
      "What is the difference between authentication and authorization?",
    answer:
      "Authentication establishes who the user or process is. Authorization decides what that identity is allowed to do. A user may authenticate successfully but still be denied access to a file because the authorization policy does not permit it.",
  },
  {
    id: "least-privilege",
    category: "Protection and security",
    question:
      "Why is the principle of least privilege important at the OS level?",
    answer:
      "A process should receive only the permissions and resources needed for its job. If it is compromised or contains a bug, the damage is then limited by those permissions. Running every service with administrator or root access creates a much larger failure boundary.",
  },
  {
    id: "access-control-list",
    category: "Protection and security",
    question: "When are basic owner-group-other permissions not enough?",
    answer:
      "They are not enough when different named users or groups need different permissions on the same object. An access control list can express those additional entries without changing the file's main owner or group. The trade-off is a more flexible but more complex policy to inspect and maintain.",
  },
  {
    id: "aslr-dep",
    category: "Protection and security",
    question: "What do ASLR and non-executable memory protect against?",
    answer:
      "ASLR makes important memory locations less predictable by randomizing where code and data are placed. Non-executable memory prevents regions such as the stack from being executed as code. They make exploitation harder, but neither one removes the underlying memory-safety bug.",
  },
  {
    id: "isolation-boundary",
    category: "Protection and security",
    question: "Why is process isolation considered a security boundary?",
    answer:
      "Each process normally gets its own virtual address space and cannot directly read or modify another process's memory. Access to shared resources must go through controlled kernel mechanisms. If the kernel or a privileged interface breaks that isolation, data and control can cross between processes unexpectedly.",
  },

  {
    id: "high-cpu-debugging",
    category: "Practical scenarios",
    question:
      "A production process is using almost 100 percent CPU. How would you investigate it?",
    answer:
      "I would first confirm whether the load belongs to one thread or many and whether it is expected traffic. Then I would inspect thread stacks, profiles, logs, and system metrics to look for a busy loop, excessive retries, lock contention, or heavy computation. I would compare the timing with recent releases before deciding whether to limit, restart, roll back, or fix the process.",
  },
  {
    id: "memory-keeps-growing",
    category: "Practical scenarios",
    question:
      "An application's memory usage keeps growing. Is that automatically a memory leak?",
    answer:
      "Not automatically. It could be a real leak, an intentionally growing cache, queued work, fragmentation, or memory that the allocator has not returned to the operating system. I would compare live allocations over time, inspect heap profiles, and check whether memory stabilizes when the workload becomes steady.",
  },
  {
    id: "many-page-faults",
    category: "Practical scenarios",
    question:
      "The system is spending most of its time handling page faults. What might be happening?",
    answer:
      "The active working sets may be larger than available physical memory, causing pages to be repeatedly evicted and loaded again. That behavior is called thrashing and it can make useful progress very slow. I would inspect memory pressure, swap activity, per-process working sets, and recent workload changes.",
  },
  {
    id: "uninterruptible-io-wait",
    category: "Practical scenarios",
    question: "A process appears stuck in I/O wait. What would you check?",
    answer:
      "I would identify the file, socket, or device operation it is waiting on using process and system tracing tools. Then I would check device latency, file-system errors, network health, queue depth, and whether another process holds a required resource. The process may be healthy but blocked behind a slow or failed dependency.",
  },
  {
    id: "too-many-context-switches",
    category: "Practical scenarios",
    question: "What could cause an unusually high number of context switches?",
    answer:
      "Possible causes include too many runnable threads, a very small scheduling quantum, frequent blocking, heavy lock contention, or excessive communication between tasks. I would measure voluntary and involuntary switches and inspect which threads are waking one another. High switching is a symptom, so I would relate it to latency and CPU profiles before changing anything.",
  },
  {
    id: "server-under-load",
    category: "Practical scenarios",
    question:
      "A server becomes slow only under heavy load. Which OS-level limits would you consider?",
    answer:
      "I would check CPU saturation, memory pressure, disk and network queues, open-file limits, socket backlogs, and the number of runnable or blocked threads. I would also look for lock contention and excessive context switching. The goal is to find which resource reaches its limit first instead of treating every slowdown as a CPU problem.",
  },
];
