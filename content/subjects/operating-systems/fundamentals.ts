import { operatingSystemsContent as baseOperatingSystemsContent } from "@/content/subjects/operating-systems-base";
import type { SubjectTopic } from "@/lib/subject-content";

const introductionToOperatingSystems: SubjectTopic = {
  slug: "introduction-to-operating-systems",
  title: "Introduction to Operating Systems",
  description:
    "Understand how an operating system connects users and applications to hardware while managing every shared resource.",
  readTime: "Detailed note",
  difficulty: "Foundation",
  tags: ["OS Basics", "Resources", "Hardware"],
  learn: {
    opening:
      "An Operating System (OS) is system software that manages computer hardware and helps applications use it safely.",
    sections: [
      {
        title: "Overview",
        paragraphs: [
          "The Operating System is the main manager of a computer. It manages the CPU, memory, files, storage, and connected devices.",
          "When you open an app, save a file, play music, or browse the internet, the OS handles many tasks in the background.",
          "Without an Operating System, every application would need to understand and control the hardware by itself. Computers would be difficult and unsafe to use.",
        ],
      },
      {
        title: "Why it Matters",
        paragraphs: [
          "Imagine that Chrome, Spotify, VS Code, and Discord are running at the same time. They all need CPU time, memory, storage, internet access, and connected devices.",
          "If every application tried to control these resources directly, they could interfere with each other and damage important data.",
          "The OS shares resources between applications and keeps them separate. This allows many applications to run safely at the same time.",
        ],
        points: [
          "Shares CPU time between running tasks.",
          "Gives memory to applications and protects it.",
          "Organizes files and storage.",
          "Manages the internet and connected devices.",
          "Stops applications from interfering with each other.",
          "Checks whether users and applications have permission.",
        ],
      },
      {
        title: "The Three Main Jobs of an OS",
        paragraphs: [
          "Most work done by an Operating System fits into three main jobs.",
        ],
        points: [
          "Resource Manager: Shares the CPU, memory, storage, and devices between applications.",
          "Protection Layer: Stops applications from accessing resources without permission.",
          "Hardware Helper: Hides difficult hardware details and gives applications simple ways to use files, memory, and devices.",
        ],
      },
      {
        title: "Core Concept",
        paragraphs: [
          "The Operating System works between applications and computer hardware.",
          "Applications cannot directly access protected hardware resources. They ask the OS to use those resources safely.",
          "For example, when VS Code saves a file, it asks the OS to handle the storage operation. VS Code does not need to know how the SSD works.",
        ],
        points: [
          "The OS checks whether the application has permission.",
          "The OS decides where the file should be stored.",
          "The OS asks the storage system to save the data.",
          "The OS returns a result to the application.",
        ],
        visual: {
          src: "/notes/operating-systems/os-middle-layer.png",
          alt: "Diagram showing applications passing through the Operating System to access the CPU, RAM, storage, and input and output devices.",
          width: 1536,
          height: 1024,
          caption:
            "Applications use the Operating System as the managed path to hardware resources.",
        },
      },
      {
        title: "Main Functions of an Operating System",
        paragraphs: [
          "The OS provides the main services that applications need to work.",
        ],
        points: [
          "Process Management: Starts, runs, and stops programs.",
          "Memory Management: Gives memory to applications and keeps their memory separate. Each process receives its own virtual memory space.",
          "File Management: Creates, reads, writes, deletes, and organizes files and folders.",
          "Device Management: Uses device drivers to communicate with hardware such as keyboards, printers, and storage devices.",
          "Security and Protection: Checks permissions and protects applications from each other.",
          "Resource Management: Shares the CPU, memory, storage, and devices between running applications.",
        ],
      },
      {
        title: "Types of Operating Systems (High-Level)",
        paragraphs: [
          "Operating systems can be grouped in different ways. One Operating System may belong to more than one group.",
          "You do not need to memorize every type. Understand the main idea behind each one.",
        ],
        points: [
          "Batch OS: Runs a group of jobs without regular user interaction.",
          "Time-Sharing OS: Quickly shares CPU time between users or programs.",
          "Real-Time OS (RTOS): Completes important work within a fixed time. It is used in systems such as medical devices and aircraft controls.",
          "Distributed OS: Manages multiple connected computers as one system.",
          "Network OS: Provides services such as file and printer sharing over a network.",
          "Mobile OS: Designed for phones and tablets, such as Android and iOS.",
        ],
      },
      {
        title: "Real-World Analogy",
        paragraphs: [
          "Think of a restaurant. The customer is the application, the waiter is the Operating System, and the kitchen is the hardware.",
          "The customer asks the waiter for something. The waiter sends the request to the kitchen and returns the result.",
          "In the same way, an application asks the OS for a service, and the OS works with the hardware to complete it.",
        ],
      },
      {
        title: "An Important Trade-Off",
        paragraphs: [
          "The OS makes a computer safer and easier to use, but managing and checking every resource adds some extra work.",
          "This small cost is necessary because it prevents applications from freely changing hardware, system files, or another application's memory.",
        ],
      },
    ],
    mechanism: {
      title: "What happens when you open Google Chrome",
      steps: [
        "You click the Chrome icon.",
        "The OS finds the Chrome program in storage.",
        "The OS creates a process for Chrome.",
        "The OS gives Chrome memory and loads the program.",
        "The CPU Scheduler gives Chrome a chance to run. More exactly, the CPU runs one of Chrome's threads.",
        "Chrome asks the OS to send and receive data through the network.",
        "The OS uses the network driver to communicate with the network hardware.",
        "Chrome receives the data and displays the webpage.",
      ],
    },
    example: {
      title: "Saving a file in VS Code",
      body: "VS Code asks the Operating System to save the file. The OS checks permission, sends the request to the file and storage systems, and returns a result to VS Code. VS Code does not need to understand how the storage device works.",
    },
    misconception:
      "The Operating System is not only the desktop, icons, or settings screen. Its main work happens in the background while it manages resources, protects applications, and controls access to hardware.",
  },
  revise: {
    definitionLabel: "Overview",
    compactDefinition: true,
    definition:
      "An Operating System (OS) is system software that manages computer hardware and helps applications use it safely. It manages the CPU, memory, files, storage, and connected devices.",
    sections: [
      {
        title: "Why it Matters",
        paragraphs: ["Without an Operating System:"],
        points: [
          "Every application would need to understand the hardware.",
          "Applications could interfere with each other.",
          "Sharing CPU time and memory would be difficult.",
          "Files, devices, and permissions would be difficult to manage.",
        ],
      },
      {
        title: "The Three Main Jobs",
        points: [
          "Resource Manager: Shares the CPU, memory, storage, and devices.",
          "Protection Layer: Stops access without permission.",
          "Hardware Helper: Gives applications a simple way to use hardware.",
        ],
      },
      {
        title: "Core Concept",
        paragraphs: [
          "Applications cannot directly access protected hardware resources.",
          "They ask the OS to use those resources safely.",
        ],
        visual: {
          src: "/notes/operating-systems/os-middle-layer.png",
          alt: "Diagram showing applications passing through the Operating System to access the CPU, RAM, storage, and input and output devices.",
          width: 1536,
          height: 1024,
          caption:
            "Applications use the Operating System as the managed path to hardware resources.",
        },
      },
      {
        title: "Common Types",
        points: [
          "Batch OS: Runs jobs in groups.",
          "Time-Sharing OS: Shares CPU time between users or programs.",
          "Real-Time OS: Completes important work within a fixed time.",
          "Distributed OS: Manages multiple connected computers as one system.",
          "Network OS: Provides services over a network.",
          "Mobile OS: Designed for phones and tablets.",
        ],
      },
      {
        title: "Step-by-Step Working",
        points: [
          "User opens an application.",
          "The OS creates a process and gives it memory.",
          "The CPU Scheduler gives the application a chance to run.",
          "The application asks the OS for a service.",
          "The OS works with the required hardware and returns the result.",
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Manages the CPU, memory, files, storage, and devices.",
      "Allows many applications to run at the same time.",
      "Keeps application memory separate and protected.",
      "Uses device drivers to communicate with hardware.",
      "Checks permissions before allowing access.",
      "Gives every process its own virtual memory space.",
      "OS = Resource Manager + Protection Layer + Hardware Helper",
    ],
    followUp: "",
  },
  lastMinute: {
    definition:
      "An Operating System (OS) is system software that manages computer hardware and helps applications use it safely.",
    sections: [
      {
        title: "Three Main Jobs",
        points: [
          "Resource Manager: Shares computer resources.",
          "Protection Layer: Stops access without permission.",
          "Hardware Helper: Gives applications a simple way to use hardware.",
        ],
      },
      {
        title: "Manages",
        points: [
          "CPU and running tasks",
          "Memory",
          "Files and storage",
          "Connected devices",
          "Permissions and security",
        ],
      },
      {
        title: "How it Works",
        flow: ["Application", "Operating System", "Hardware"],
        paragraphs: [
          "Applications ask the OS to use protected hardware resources safely.",
        ],
        wide: true,
      },
    ],
    cuesLabel: "Key Points",
    cues: [
      "Allows many applications to run at the same time.",
      "Keeps application memory separate and protected.",
      "Uses device drivers to communicate with hardware.",
      "Checks permissions before allowing access.",
    ],
    memoryLineLabel: "Remember This",
    memoryLineAtEnd: true,
    memoryLine:
      "OS = Resource Manager + Protection Layer + Hardware Helper.",
    trap: "",
  },
};

const kernelModesAndInterrupts: SubjectTopic = {
  slug: "kernel-modes-and-interrupts",
  title: "Kernel, Modes & Interrupts",
  description:
    "Understand the kernel, the two CPU modes, and the events that safely move control into the Operating System.",
  readTime: "Detailed note",
  difficulty: "Foundation",
  tags: ["Kernel", "CPU Modes", "Interrupts"],
  learn: {
    opening:
      "The Kernel is the main part of the Operating System. It manages protected resources and helps applications use the computer safely.",
    sections: [
      {
        title: "Operating System vs Kernel",
        paragraphs: [
          "The Operating System is the complete system software. It includes the Kernel, system services, and the parts that users and applications work with.",
          "The Kernel is the core part of the Operating System. It manages the CPU, memory, devices, and access to protected resources.",
        ],
        table: {
          headers: ["Operating System", "Kernel"],
          rows: [
            ["The complete system software", "The core part of the OS"],
            ["Includes services and user tools", "Manages protected resources"],
            ["Provides the full working environment", "Runs with full system access"],
          ],
        },
      },
      {
        title: "Why the CPU Uses Two Modes",
        paragraphs: [
          "Applications should not be allowed to freely change system memory, control hardware, or access another application's data.",
          "To keep the computer safe, the CPU uses User Mode and Kernel Mode.",
        ],
        points: [
          "User Mode limits what an application can do.",
          "Kernel Mode allows the OS to manage protected resources.",
          "The CPU changes modes only through controlled events.",
        ],
      },
      {
        title: "User Mode vs Kernel Mode",
        paragraphs: [
          "Most application code runs in User Mode. The Kernel runs in Kernel Mode.",
        ],
        table: {
          headers: ["User Mode", "Kernel Mode"],
          rows: [
            ["Runs applications", "Runs the Kernel"],
            ["Has limited access", "Has full hardware access"],
            ["Cannot run protected instructions", "Can run protected instructions"],
            ["Cannot access another process freely", "Can manage process memory"],
            ["Requests OS services", "Checks and performs requests"],
          ],
        },
      },
      {
        title: "How Control Enters the Kernel",
        paragraphs: [
          "The CPU can enter Kernel Mode because of a System Call, an Interrupt, or an Exception.",
          "In each case, the CPU pauses the current work, saves the required information, and runs the correct Kernel code.",
        ],
        points: [
          "System Call: An application asks the Kernel for a service.",
          "Interrupt: A hardware device needs CPU attention.",
          "Exception: The CPU finds a problem while running an instruction.",
        ],
      },
      {
        title: "System Call vs Interrupt vs Exception",
        paragraphs: [
          "All three can move control into the Kernel, but they start for different reasons.",
        ],
        table: {
          headers: ["Event", "Simple Meaning"],
          rows: [
            ["System Call", "A program asks for an OS service"],
            ["Interrupt", "Hardware needs CPU attention"],
            ["Exception", "The CPU finds a problem"],
          ],
        },
        points: [
          "System Call example: Opening a file.",
          "Interrupt example: Keyboard input or completed disk work.",
          "Exception example: Divide by zero or page fault.",
        ],
      },
      {
        title: "Mode Transition",
        paragraphs: [
          "A mode transition is the safe movement between application code and Kernel code.",
        ],
        flow: [
          "User Mode",
          "System Call, Interrupt, or Exception",
          "Kernel Mode",
          "Handle the Event",
          "Return to User Mode",
        ],
      },
      {
        title: "Common Kernel Designs",
        paragraphs: [
          "Operating Systems can arrange their Kernel services in different ways.",
        ],
        table: {
          headers: ["Kernel Design", "Simple Meaning"],
          rows: [
            ["Monolithic", "Most OS services run inside the Kernel"],
            ["Microkernel", "Only the most important services stay inside the Kernel"],
            ["Hybrid", "Uses ideas from both designs"],
          ],
        },
        points: [
          "Monolithic example: Linux.",
          "Microkernel examples: MINIX and QNX.",
          "Hybrid examples: Windows and macOS.",
        ],
      },
    ],
    mechanism: {
      title: "What happens when you press a keyboard key",
      steps: [
        "You press a key on the keyboard.",
        "The keyboard sends an Interrupt to the CPU.",
        "The CPU pauses the current work and saves the required information.",
        "The CPU enters Kernel Mode.",
        "The Kernel and keyboard driver read the key information.",
        "The OS makes the input available to the correct application.",
        "The CPU restores the previous work and returns to User Mode.",
      ],
    },
    example: {
      title: "A divide-by-zero exception",
      body: "If a program tries to divide a number by zero, the CPU detects the problem and enters the Kernel. The Kernel decides how to handle it, such as stopping the program or sending it an error signal.",
    },
    misconception:
      "An Interrupt is not always an error. Hardware uses Interrupts during normal work, such as when keyboard input arrives or a storage operation finishes.",
  },
  revise: {
    definitionLabel: "Overview",
    compactDefinition: true,
    definition:
      "The Kernel is the main part of the Operating System. User Mode limits applications, while Kernel Mode allows the OS to manage protected resources.",
    sections: [
      {
        title: "Operating System vs Kernel",
        table: {
          headers: ["Operating System", "Kernel"],
          rows: [
            ["The complete system software", "The core part of the OS"],
            ["Includes services and user tools", "Manages protected resources"],
          ],
        },
      },
      {
        title: "User Mode vs Kernel Mode",
        table: {
          headers: ["User Mode", "Kernel Mode"],
          rows: [
            ["Runs applications", "Runs the Kernel"],
            ["Has limited access", "Has full hardware access"],
            ["Requests OS services", "Checks and performs requests"],
          ],
        },
      },
      {
        title: "Three Ways to Enter the Kernel",
        table: {
          headers: ["Event", "Simple Meaning"],
          rows: [
            ["System Call", "A program asks for an OS service"],
            ["Interrupt", "Hardware needs CPU attention"],
            ["Exception", "The CPU finds a problem"],
          ],
        },
      },
      {
        title: "Mode Transition",
        flow: [
          "User Mode",
          "System Call, Interrupt, or Exception",
          "Kernel Mode",
          "Handle the Event",
          "Return to User Mode",
        ],
      },
      {
        title: "Common Kernel Designs",
        points: [
          "Monolithic: Most OS services run inside the Kernel.",
          "Microkernel: Only the most important services stay inside the Kernel.",
          "Hybrid: Uses ideas from both designs.",
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Kernel = Core part of the Operating System",
      "User Mode limits application access.",
      "Kernel Mode allows full system access.",
      "System Call: A program asks for an OS service.",
      "Interrupt: Hardware needs CPU attention.",
      "Exception: The CPU finds a problem.",
      "The CPU returns to User Mode after the Kernel finishes its work.",
    ],
    followUp: "",
  },
  lastMinute: {
    definition:
      "The Kernel is the core part of the Operating System that manages protected resources.",
    sections: [
      {
        title: "Modes",
        points: [
          "User Mode: Limited application access",
          "Kernel Mode: Full system access",
        ],
      },
      {
        title: "Events",
        points: [
          "System Call: Program asks for an OS service",
          "Interrupt: Hardware needs CPU attention",
          "Exception: CPU finds a problem",
        ],
      },
      {
        title: "Mode Transition",
        flow: [
          "User Mode",
          "Controlled Event",
          "Kernel Mode",
          "Return to User Mode",
        ],
        wide: true,
      },
    ],
    cuesLabel: "Key Points",
    cues: [
      "The Operating System is the complete system software.",
      "The Kernel is the protected core of the OS.",
      "Applications normally run in User Mode.",
      "The Kernel runs in Kernel Mode.",
      "The CPU enters Kernel Mode only through a controlled event.",
      "The CPU returns to User Mode after the event is handled.",
    ],
    memoryLineLabel: "Remember This",
    memoryLine: "User Mode limits. Kernel Mode controls.",
    memoryLineAtEnd: true,
    trap: "",
  },
};

const existingSystemCalls = baseOperatingSystemsContent.modules
  .flatMap((module) => module.topics)
  .find((topic) => topic.slug === "system-calls");

if (!existingSystemCalls) {
  throw new Error("System Calls topic is missing from Operating Systems content.");
}

const systemCallsDetailed: SubjectTopic = {
  ...existingSystemCalls,
  description:
    "Understand how applications request protected Operating System services through the system call interface.",
  learn: {
    opening:
      "A System Call is a safe way for an application to ask the Operating System Kernel for a protected service.",
    sections: [
      {
        title: "Overview",
        paragraphs: [
          "When an application needs to open a file, create a process, use memory, or communicate over a network, it sends a request to the kernel through a System Call.",
          "The kernel checks the request, performs the allowed work, and returns a result or an error.",
        ],
      },
      {
        title: "Why it Matters",
        paragraphs: [
          "System Calls give applications controlled access to important OS services.",
          "Without this control, one application could change another application's memory, damage files, or use hardware without permission.",
        ],
        points: [
          "Open, read, write, or close a file.",
          "Create or stop a process.",
          "Request or release memory.",
          "Send or receive data through a network.",
          "Communicate with a hardware device.",
        ],
      },
      {
        title: "Core Concept",
        paragraphs: [
          "A System Call is a safe entry point into the kernel.",
          "An application often calls a library function such as open() or write(). The library prepares the request and uses a special system-call instruction, often described as a trap, to enter the kernel.",
          "This instruction moves control from User Mode to Kernel Mode. The kernel checks the request, performs the work, and returns control to the application.",
        ],
        flow: [
          "Application",
          "Library Function",
          "System Call",
          "Kernel",
          "Result or Error",
        ],
      },
      {
        title: "Visual Diagram",
        paragraphs: [
          "The System Call Interface connects an application request to the correct kernel service.",
        ],
        visual: {
          src: "/notes/operating-systems/system-call-flow.png",
          alt: "Diagram showing a user application passing through the System Call Interface and Operating System Kernel to the file system, memory manager, device drivers, and hardware.",
          width: 1536,
          height: 1024,
          caption:
            "System calls provide the controlled path from a user application into Operating System services and hardware.",
        },
      },
      {
        title: "Common System Calls",
        paragraphs: [
          "The exact names can be different on each Operating System. These are common Unix and POSIX examples.",
        ],
        points: [
          "File Operations: open(), read(), write(), close(), unlink()",
          "Process Operations: fork(), execve(), wait(), _exit()",
          "Memory Operations: mmap(), munmap()",
          "Device Operations: read(), write(), ioctl()",
          "Information Management: getpid(), gettimeofday()",
          "Communication: pipe(), socket(), send(), recv()",
        ],
      },
      {
        title: "Normal Function vs System Call",
        paragraphs: [
          "A normal function call stays inside the application and usually remains in User Mode.",
          "A System Call enters Kernel Mode because the application needs a protected OS service.",
        ],
        table: {
          headers: ["Normal Function Call", "System Call"],
          rows: [
            ["Usually stays in User Mode", "Enters Kernel Mode"],
            ["Runs application code", "Runs a kernel service"],
            ["Lower cost", "Has extra checking and switching cost"],
          ],
        },
      },
      {
        title: "Return Values and Errors",
        paragraphs: [
          "A System Call returns a result when it succeeds. If it fails, it returns an error that tells the application what went wrong.",
        ],
        points: [
          "open() returns a file descriptor or an error.",
          "read() returns the number of bytes read, zero at the end of a file, or an error.",
          "write() returns the number of bytes accepted or an error.",
          "fork() returns the child PID to the parent, zero to the child, or an error if creation fails.",
          "execve() replaces the current program while keeping the same process and PID when it succeeds.",
        ],
      },
      {
        title: "System Call Cost",
        paragraphs: [
          "A System Call is slower than a normal function call because the CPU enters Kernel Mode, the kernel checks the request, and execution later returns to User Mode.",
          "The exact cost depends on the requested operation and the computer. There is no single fixed time for every System Call.",
        ],
      },
      {
        title: "Simple Analogy",
        paragraphs: [
          "Think of a System Call as a security gate.",
          "An application sends a request through the gate. The kernel checks the request before allowing access to a protected service.",
        ],
      },
    ],
    mechanism: {
      title: "What happens when an application opens a file",
      steps: [
        "The application calls the open() library function with a file path.",
        "The library prepares the System Call request.",
        "A system-call instruction transfers control from User Mode to Kernel Mode.",
        "The kernel checks the file path, options, and permissions.",
        "If the request is valid, the kernel opens the file and creates an internal file entry.",
        "The kernel returns a file descriptor. If the request fails, it returns an error.",
        "The application later uses read() to request data from the open file.",
        "Control returns to User Mode and the application continues.",
      ],
    },
    example: {
      title: "Saving a file in VS Code",
      body: "VS Code uses write() to ask the kernel to save bytes to an open file. The kernel checks the file descriptor and memory, accepts the data, and returns the number of bytes written or an error. The file system and storage system handle the remaining work.",
    },
    misconception:
      "A library function is not always a System Call. Some library functions finish completely in User Mode. A true System Call enters the kernel to request a protected service.",
  },
  revise: {
    definitionLabel: "Overview",
    compactDefinition: true,
    definition:
      "A System Call is a safe request from an application to the Operating System Kernel for a protected service.",
    sections: [
      {
        title: "Why it Matters",
        paragraphs: [
          "Applications normally run in User Mode and cannot directly access protected system resources.",
          "They use System Calls to work with files, processes, memory, devices, and networks.",
        ],
      },
      {
        title: "Core Concept",
        paragraphs: [
          "An application often calls a library function. The library prepares the System Call request.",
          "A system-call instruction safely moves control into the kernel. The kernel checks the request and returns a result or an error.",
        ],
        flow: [
          "Application",
          "Library Function",
          "System Call",
          "Kernel",
          "Result or Error",
        ],
      },
      {
        title: "Visual Diagram",
        visual: {
          src: "/notes/operating-systems/system-call-flow.png",
          alt: "Diagram showing a user application passing through the System Call Interface and Operating System Kernel to the file system, memory manager, device drivers, and hardware.",
          width: 1536,
          height: 1024,
          caption:
            "A System Call carries an application request into the kernel before a protected service is used.",
        },
      },
      {
        title: "Normal Function vs System Call",
        table: {
          headers: ["Normal Function", "System Call"],
          rows: [
            ["Usually stays in User Mode", "Enters Kernel Mode"],
            ["Runs application code", "Runs a kernel service"],
            ["Lower cost", "Has extra checking and switching cost"],
          ],
        },
      },
      {
        title: "Opening a File",
        steps: [
          "Application calls open() with a file path.",
          "The library prepares the System Call.",
          "A system-call instruction transfers control to Kernel Mode.",
          "The kernel checks the path and permission.",
          "open() returns a file descriptor or an error.",
          "The application later uses read() to request file data.",
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "System Call = Safe request to the kernel",
      "A system-call instruction transfers control from User Mode to Kernel Mode.",
      "The kernel checks every request before performing it.",
      "A System Call returns a result or an error.",
      "open() returns a file descriptor, not file data.",
      "Common examples: open(), read(), write(), close(), fork(), and execve().",
      "A library function is not always a System Call.",
      "System Calls cost more than normal function calls.",
    ],
    followUp: "",
  },
  lastMinute: {
    definition:
      "A System Call is a safe request from an application to the Operating System Kernel for a protected service.",
    sections: [
      {
        title: "Flow",
        flow: [
          "Application",
          "Library Function",
          "System Call",
          "Kernel",
          "Result or Error",
        ],
        wide: true,
      },
      {
        title: "Common Uses",
        points: [
          "File Operations",
          "Process Operations",
          "Memory Operations",
          "Device Access",
          "Network and Process Communication",
        ],
      },
      {
        title: "Important Returns",
        points: [
          "open() returns a file descriptor or an error.",
          "read() returns bytes read, zero, or an error.",
          "write() returns bytes accepted or an error.",
          "fork() returns the child PID to the parent and zero to the child.",
          "execve() replaces the current program but keeps the same process and PID.",
        ],
      },
    ],
    cuesLabel: "Key Points",
    cues: [
      "A system-call instruction moves the request from User Mode into the Kernel.",
      "The kernel checks every request before performing it.",
      "A library function is not always a System Call.",
      "A System Call costs more than a normal function call.",
    ],
    memoryLineLabel: "Remember This",
    memoryLine: "System Call = Safe request to the Kernel.",
    memoryLineAtEnd: true,
    trap: "",
  },
};

export {
  introductionToOperatingSystems,
  kernelModesAndInterrupts,
  systemCallsDetailed,
};
