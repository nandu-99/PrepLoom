import type { SubjectTopic } from "@/lib/subject-content";

export const cpuLimitationsAndPerformance: SubjectTopic = {
  slug: "cpu-limitations-and-performance",
  title: "CPU Limitations and Performance",
  description:
    "Understand why simple CPUs become bottlenecks and calculate CPU time, CPI, latency, throughput, and speedup.",
  readTime: "44 min",
  difficulty: "Intermediate",
  tags: ["CPU Performance", "CPI", "Throughput"],
  learn: {
    opening:
      "The Hack CPU is excellent for learning because every instruction follows a small, visible path. Modern processors need more features because real programs, memory systems, and I/O devices create much heavier workloads.",
    sections: [
      {
        title: "Where a Simple CPU Reaches Its Limits",
        paragraphs: [
          "Hack completes one instruction before moving to the next. It has only the A and D registers, no hardware stack, no interrupt mechanism, and no direct multiply or divide instruction.",
          "These choices make the design easy to understand, but they create extra instructions and make it difficult to overlap useful work. Modern CPUs add more registers, faster memory levels, interrupt support, parallel execution, and more capable instruction sets.",
        ],
        dataTable: {
          headers: ["Simple Hack design", "Why modern CPUs add more"],
          rows: [
            ["A and D registers", "More registers reduce repeated memory access"],
            ["One instruction at a time", "Overlapping or parallel work improves throughput"],
            ["No hardware interrupt support", "Interrupts avoid constant device checking"],
            ["No hardware stack instruction", "Calling conventions support functions and recursion"],
            ["Separate slow memory access", "Caches keep frequent data closer to the CPU"],
          ],
        },
      },
      {
        title: "Performance Measurements",
        paragraphs: [
          "Latency is the time required to complete one task. Throughput is the number of tasks completed in a unit of time. Improving one does not always improve the other by the same amount.",
          "Clock rate tells us how many cycles occur per second, but it does not tell the complete performance story. We must also know the instruction count and the average cycles per instruction, called CPI.",
        ],
        visual: {
          src: "/notes/modern-computer-architecture/cpu-performance.png",
          alt: "CPU performance diagram showing instruction count, CPI, and clock cycle time feeding the CPU-time equation, with latency and throughput below.",
          width: 1536,
          height: 1024,
          caption: "CPU time depends on work, cycles per instruction, and the duration of each cycle.",
        },
        formulas: [
          { label: "Clock cycle time", expression: "Clock cycle time = 1 ÷ clock rate" },
          { label: "Latency", expression: "Latency = completion time - start time" },
          { label: "Throughput", expression: "Throughput = completed tasks ÷ elapsed time" },
        ],
      },
      {
        title: "The CPU-Time Equation",
        paragraphs: [
          "Instruction count depends mainly on the program, compiler, and instruction set. CPI depends on the instruction mix and processor design. Clock cycle time depends on the hardware clock.",
          "A higher clock rate can still lose to a lower clock rate if it needs many more instructions or cycles per instruction. Compare complete CPU time, not clock rate alone.",
          "CPU time measures time spent executing the program on the CPU. Elapsed time, also called wall-clock time, also includes I/O waits, operating-system delays, and time waiting for other work.",
        ],
        formulas: [
          { label: "CPU cycles", expression: "CPU cycles = Instruction count × Average CPI" },
          { label: "CPU time", expression: "CPU time = Instruction count × CPI × Clock cycle time" },
          { label: "Using clock rate", expression: "CPU time = (Instruction count × CPI) ÷ Clock rate" },
          { label: "Speedup", expression: "Speedup = Old execution time ÷ New execution time" },
        ],
      },
      {
        title: "Average CPI for an Instruction Mix",
        paragraphs: [
          "Different instruction classes may use different numbers of cycles. Average CPI is a weighted average, so frequent instructions affect it more than rare instructions.",
        ],
        formulas: [
          { label: "Total cycles", expression: "Total cycles = Σ(ICᵢ × CPIᵢ)" },
          { label: "Average CPI", expression: "Average CPI = Σ(ICᵢ × CPIᵢ) ÷ Total instruction count" },
        ],
      },
      {
        title: "Memory Stalls and Effective CPI",
        paragraphs: [
          "The ideal CPI of the execution hardware is not always the observed CPI. Cache misses, slow memory, and branch delays add stall cycles.",
          "A program with fewer instructions can still be slow if those instructions frequently wait for memory. This is why cache behaviour must be included in a serious performance comparison.",
        ],
        formulas: [
          { label: "Effective CPI", expression: "Effective CPI = Base CPI + Memory stall cycles per instruction + Other stalls" },
          { label: "Memory stalls", expression: "Stall cycles per instruction = Misses per instruction × Miss penalty" },
        ],
      },
      {
        title: "Amdahl's Law, Benchmarks, and Power",
        paragraphs: [
          "Amdahl's Law limits the total speedup when only part of a program is improved. Making one small part extremely fast cannot remove the time spent in the unchanged part.",
          "A fair comparison uses the same real workload, input, compiler conditions, and measurement boundary. One small benchmark cannot represent every application.",
          "Modern designs also consider performance per watt. A faster processor may be a poor choice for a phone or data centre if it requires much more power for a small speed gain. More cores mainly improve throughput when enough work can run in parallel; they do not automatically reduce one task's latency.",
        ],
        formulas: [
          { label: "Amdahl's Law", expression: "Overall speedup = 1 ÷ ((1 - f) + f ÷ s)" },
          { label: "Performance per watt", expression: "Performance per watt = Work completed per second ÷ Power in watts" },
        ],
      },
      {
        title: "Single-Core, Multicore, ILP, and TLP",
        paragraphs: [
          "A single-core processor has one main instruction-processing core. A multicore processor places two or more cores on one chip, so independent tasks or threads can run at the same time when the software has parallel work.",
          "Instruction-level parallelism, or ILP, overlaps independent instructions from one instruction stream using ideas such as pipelining or multiple issue. Thread-level parallelism, or TLP, runs independent threads on different cores or hardware thread contexts. More cores improve throughput only when the program can supply enough parallel work.",
        ],
        dataTable: {
          headers: ["Idea", "Meaning", "Main limit"],
          rows: [
            ["Single core", "One main processing core", "One thread cannot use several cores"],
            ["Multicore", "Several cores execute work concurrently", "Needs parallel threads or tasks"],
            ["ILP", "Overlap independent instructions", "Instruction dependencies"],
            ["TLP", "Run independent threads concurrently", "Serial parts and coordination"],
          ],
        },
      },
      {
        title: "Worked Problems",
        paragraphs: [],
        problems: [
          {
            title: "Calculate CPU execution time",
            prompt: "A program executes 2 million instructions with an average CPI of 1.5 on a 2 GHz CPU. Find CPU time.",
            steps: [
              "CPU cycles = 2 × 10⁶ × 1.5 = 3 × 10⁶ cycles.",
              "Clock rate = 2 × 10⁹ cycles per second.",
              "CPU time = 3 × 10⁶ ÷ 2 × 10⁹ seconds.",
              "CPU time = 1.5 × 10⁻³ seconds.",
            ],
            answer: "CPU time = 1.5 ms.",
          },
          {
            title: "Find average CPI",
            prompt: "A program has 60% instructions with CPI 1, 30% with CPI 2, and 10% with CPI 4. Find average CPI.",
            steps: [
              "Weighted CPI = 0.60 × 1 + 0.30 × 2 + 0.10 × 4.",
              "Weighted CPI = 0.60 + 0.60 + 0.40.",
            ],
            answer: "Average CPI = 1.6 cycles per instruction.",
          },
          {
            title: "Calculate speedup",
            prompt: "An old processor completes a program in 12 ms. A new processor completes it in 8 ms. Find speedup.",
            steps: [
              "Speedup = old time ÷ new time.",
              "Speedup = 12 ÷ 8 = 1.5.",
            ],
            answer: "The new processor is 1.5 times as fast for this program.",
          },
          {
            title: "Calculate throughput",
            prompt: "A system completes 4 tasks in 20 ms. Find its throughput in tasks per second.",
            steps: [
              "20 ms = 0.020 seconds.",
              "Throughput = 4 ÷ 0.020.",
            ],
            answer: "Throughput = 200 tasks per second.",
          },
          {
            title: "Use Amdahl's Law",
            prompt: "Forty percent of a program is improved by a factor of 4. Find the overall speedup.",
            steps: [
              "The improved fraction is f = 0.40 and its speedup is s = 4.",
              "Unchanged time = 1 - 0.40 = 0.60.",
              "New normalized time = 0.60 + 0.40 ÷ 4 = 0.70.",
              "Overall speedup = 1 ÷ 0.70.",
            ],
            answer: "Overall speedup ≈ 1.43 times.",
          },
          {
            title: "Include memory stalls in CPI",
            prompt: "A CPU has base CPI 1.2. A program has 0.05 cache misses per instruction, and each miss costs 20 cycles. Find effective CPI.",
            steps: [
              "Memory stalls per instruction = 0.05 × 20 = 1 cycle.",
              "Effective CPI = base CPI + stall CPI.",
              "Effective CPI = 1.2 + 1.0.",
            ],
            answer: "Effective CPI = 2.2.",
          },
          {
            title: "Compare performance per watt",
            prompt: "CPU A completes 240 tasks per second using 60 W. CPU B completes 300 tasks per second using 100 W. Which is more energy efficient?",
            steps: [
              "CPU A: 240 ÷ 60 = 4 tasks per second per watt.",
              "CPU B: 300 ÷ 100 = 3 tasks per second per watt.",
            ],
            answer: "CPU A has better performance per watt: 4 instead of 3.",
          },
        ],
      },
    ],
    mechanism: {
      title: "How to compare two processors fairly",
      steps: [
        "Use the same workload and define what time is being measured.",
        "Find the instruction count for each machine or compiled program.",
        "Calculate average CPI from the instruction mix.",
        "Convert clock rate into cycles per second.",
        "Calculate complete CPU time for both processors.",
        "Use old time divided by new time to report speedup.",
      ],
    },
    example: {
      title: "Why GHz alone can mislead",
      body: "A 3 GHz CPU with CPI 3 needs one nanosecond per instruction on average. A 2 GHz CPU with CPI 1 needs only half a nanosecond per instruction. For the same instruction count, the 2 GHz CPU is faster.",
    },
    misconception:
      "A higher clock rate does not automatically mean a faster program. Instruction count and CPI matter too.",
  },
  revise: {
    definition:
      "CPU performance depends on instruction count, cycles per instruction, and clock cycle time.",
    sections: [
      {
        title: "Core Formulas",
        formulas: [
          { expression: "CPU time = IC × CPI ÷ Clock rate" },
          { expression: "Average CPI = Total cycles ÷ Total instructions" },
          { expression: "Speedup = Old time ÷ New time" },
          { expression: "Throughput = Tasks ÷ Time" },
        ],
      },
      {
        title: "Metric Difference",
        table: {
          headers: ["Latency", "Throughput"],
          rows: [
            ["Time for one task", "Tasks completed per unit time"],
            ["Lower is better", "Higher is better"],
          ],
        },
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Clock cycle time is the inverse of clock rate.",
      "CPI means average cycles per instruction.",
      "Use a weighted average when instruction classes have different CPIs.",
      "Compare execution time for the same workload.",
      "CPU time excludes many waits that are included in wall-clock time.",
      "More cores mainly help parallel throughput, not every task's latency.",
      "ILP overlaps instructions; TLP runs independent threads.",
      "GHz alone is not a complete performance measure.",
    ],
    followUp: "Why can a processor with a lower clock rate still finish a program sooner?",
  },
  lastMinute: {
    definition: "CPU time = instructions × cycles per instruction × time per cycle.",
    sections: [
      {
        title: "Formula Recall",
        points: [
          "Time = IC × CPI ÷ clock rate.",
          "Average CPI is weighted by instruction frequency.",
          "Speedup = old time ÷ new time.",
          "Latency is time; throughput is work per time.",
          "ILP works within an instruction stream; TLP works across threads.",
        ],
      },
    ],
    memoryLine: "Count the work, count its cycles, then divide by cycles per second.",
    cues: ["IC", "CPI", "Clock rate", "Latency", "Throughput"],
    trap: "Do not compare processors using clock rate alone.",
  },
};

export const pollingAndInterrupts: SubjectTopic = {
  slug: "polling-and-interrupts",
  title: "Polling, Interrupts, and I/O Handling",
  description:
    "Compare repeated device checking with interrupt-driven I/O and trace the complete interrupt-service cycle.",
  readTime: "43 min",
  difficulty: "Intermediate",
  tags: ["Polling", "Interrupts", "ISR"],
  learn: {
    opening:
      "A CPU and an I/O device work at very different speeds. Polling makes the CPU repeatedly ask whether the device is ready. Interrupts let the device request attention only when an event occurs.",
    sections: [
      {
        title: "Polling",
        paragraphs: [
          "In polling, software reads a device status register again and again. If the device is not ready, the program either checks again immediately or waits before the next check.",
          "Polling is simple and predictable. It works well when events are frequent, response time must be tightly controlled, or the CPU has no useful work to perform. Frequent polling wastes cycles when events are rare.",
        ],
        flow: ["Read status", "Ready?", "No: check again", "Yes: transfer data", "Continue"],
      },
      {
        title: "Interrupt-Driven I/O",
        paragraphs: [
          "An interrupt is an asynchronous event that may transfer control away from the current program. The CPU finishes a safe instruction boundary, records where it should return, and enters an interrupt service routine, or ISR.",
          "After the ISR handles the device, the saved state is restored and the interrupted program resumes. Hardware normally saves a small architectural state such as the return PC and status, while handler software saves any additional registers it may change. The exact split depends on the architecture.",
          "An interrupt does not automatically mean a process context switch. The handler may return directly to the same interrupted process. The operating system may separately decide to schedule another process.",
        ],
        visual: {
          src: "/notes/modern-computer-architecture/polling-vs-interrupts.svg",
          alt: "Two-lane comparison: polling repeatedly checks device readiness, while an interrupt saves context, runs an ISR, restores context, and resumes the main program.",
          width: 1536,
          height: 1024,
          caption: "Polling asks repeatedly; an interrupt lets the device request service.",
        },
      },
      {
        title: "Complete Interrupt Sequence",
        paragraphs: [],
        dataTable: {
          headers: ["Step", "Action"],
          rows: [
            ["1", "A device raises an interrupt request"],
            ["2", "The CPU checks that the interrupt is enabled and accepted"],
            ["3", "The current PC and required processor state are preserved"],
            ["4", "The CPU loads the interrupt-handler address"],
            ["5", "The ISR identifies and services the cause"],
            ["6", "The ISR clears or acknowledges the request"],
            ["7", "Saved state is restored and execution returns"],
          ],
        },
      },
      {
        title: "Interrupt Terms and Safety",
        paragraphs: [
          "An interrupt comes from an asynchronous event such as a timer or device. An exception is caused synchronously by the current instruction, such as an illegal instruction or divide error. Both may cause a transfer to a handler, often called a trap.",
          "Interrupts can be masked, assigned priorities, or temporarily disabled around critical work. An ISR should usually be short because long handlers delay other work and may increase interrupt latency.",
          "The correct point for acknowledging or clearing a request is device-dependent. Some controllers are acknowledged early, while others must be serviced before their request can be cleared.",
        ],
        dataTable: {
          headers: ["Term", "Meaning"],
          rows: [
            ["Interrupt latency", "Time from the request until its handler begins"],
            ["Mask", "Control that temporarily blocks selected interrupts"],
            ["Priority", "Rule for choosing among simultaneous requests"],
            ["Vector", "Address or table entry used to locate a handler"],
            ["ISR", "Short routine that services an interrupt"],
          ],
        },
      },
      {
        title: "Important Interrupt Types",
        paragraphs: [],
        dataTable: {
          headers: ["Type", "Meaning", "Typical use"],
          rows: [
            ["Maskable", "Can be temporarily disabled", "Normal devices and timers"],
            ["Non-maskable", "Cannot be blocked by the normal mask", "Critical hardware failure"],
            ["Vectored", "Hardware selects a handler entry or vector", "Fast cause-specific dispatch"],
            ["Non-vectored", "Control enters a common handler", "Software identifies the cause"],
            ["Edge-triggered", "Request is signalled by a transition", "Short event pulse"],
            ["Level-triggered", "Request stays active while a level is asserted", "Device waits until serviced"],
          ],
        },
      },
      {
        title: "Nested Interrupts and ISR Safety",
        paragraphs: [
          "A higher-priority interrupt may be allowed to interrupt a lower-priority ISR. This reduces urgent-event latency but requires another saved context and careful stack use.",
          "The main program and ISR may share data. The program must protect multi-step updates using atomic operations, short critical sections, or another safe synchronization method. Language features such as volatile can force a fresh read, but they do not make a multi-step operation atomic.",
        ],
        dataTable: {
          headers: ["Risk", "Safe response"],
          rows: [
            ["ISR runs too long", "Defer large work outside the ISR"],
            ["Shared value changes halfway", "Use atomic access or a protected critical section"],
            ["Lower-priority request waits", "Keep handlers short and design priorities carefully"],
            ["Nested handler corrupts state", "Use a valid stack and save every required register"],
          ],
        },
      },
      {
        title: "Polling versus Interrupts",
        paragraphs: [],
        dataTable: {
          headers: ["Factor", "Polling", "Interrupts"],
          rows: [
            ["CPU activity", "Checks status repeatedly", "Runs normal work until requested"],
            ["Best for", "Frequent or predictable events", "Rare or unpredictable events"],
            ["Overhead", "Every status check", "Context and handler work per event"],
            ["Response", "Limited by poll interval", "Limited by interrupt latency"],
            ["Complexity", "Usually simpler", "Needs handler, priority, and safe shared state"],
          ],
        },
      },
      {
        title: "Direct Memory Access",
        paragraphs: [
          "Direct memory access, or DMA, lets a controller transfer a block between a device and memory without one CPU instruction for every byte or word. The CPU configures the transfer, continues other work, and is usually interrupted when the block completes.",
        ],
        dataTable: {
          headers: ["Method", "CPU role", "Best fit"],
          rows: [
            ["Polling", "Checks device repeatedly", "Simple or frequent events"],
            ["Interrupt per event", "Runs an ISR for each event", "Occasional small transfers"],
            ["DMA", "Sets up a block and handles completion", "Large or high-rate data blocks"],
          ],
        },
      },
      {
        title: "Worked Problems",
        paragraphs: [],
        problems: [
          {
            title: "Find polling CPU cost",
            prompt: "A 1 MHz CPU polls a device 10,000 times per second. Each poll uses 50 cycles. What percentage of CPU cycles are spent polling?",
            steps: [
              "Polling cycles per second = 10,000 × 50 = 500,000 cycles.",
              "The CPU provides 1,000,000 cycles per second.",
              "Percentage = 500,000 ÷ 1,000,000 × 100.",
            ],
            answer: "Polling uses 50% of the CPU cycles.",
          },
          {
            title: "Find interrupt CPU cost",
            prompt: "The same device creates 100 events per second. Each ISR, including save and restore work, uses 200 cycles on the 1 MHz CPU. Find the CPU percentage.",
            steps: [
              "Interrupt cycles per second = 100 × 200 = 20,000 cycles.",
              "Percentage = 20,000 ÷ 1,000,000 × 100.",
            ],
            answer: "Interrupt handling uses 2% of the CPU cycles.",
          },
          {
            title: "Find worst-case polling delay",
            prompt: "A device is polled once every 100 microseconds. What is the worst-case detection delay and the average delay for uniformly timed events?",
            steps: [
              "An event just after a poll waits almost one complete interval.",
              "Worst-case delay is therefore approximately 100 microseconds.",
              "A uniformly timed event waits half an interval on average.",
            ],
            answer: "Worst case ≈ 100 µs; average ≈ 50 µs.",
          },
          {
            title: "Choose an I/O method",
            prompt: "A temperature sensor reports once each minute while the CPU performs other work. Should the system use continuous fast polling or interrupts?",
            steps: [
              "The event is rare and its exact arrival time is not known.",
              "Continuous fast polling would perform many empty checks.",
              "An interrupt lets the CPU continue useful work until data arrives.",
            ],
            answer: "Interrupt-driven I/O is normally the better choice.",
          },
          {
            title: "Compare interrupt transfer with DMA",
            prompt: "Moving a 4096-byte block with one interrupt per byte costs 50 CPU cycles per byte. DMA setup and completion together cost 700 CPU cycles. Compare CPU work.",
            steps: [
              "Interrupt-per-byte work = 4096 × 50 = 204,800 CPU cycles.",
              "DMA CPU work = 700 cycles; the controller performs the block transfer.",
              "CPU cycles saved = 204,800 - 700 = 204,100.",
            ],
            answer: "DMA uses 700 CPU cycles instead of 204,800, saving 204,100 CPU cycles.",
          },
          {
            title: "Reason about nested priority",
            prompt: "A low-priority disk ISR is running when a critical timer request arrives. What happens if nesting is enabled and the timer has higher priority?",
            steps: [
              "The processor preserves the disk handler's current state.",
              "Control transfers to the higher-priority timer ISR.",
              "After the timer ISR returns, the disk ISR continues.",
            ],
            answer: "The timer ISR pre-empts the disk ISR, then the disk ISR resumes.",
          },
        ],
      },
    ],
    mechanism: {
      title: "How an interrupt safely pauses and resumes work",
      steps: [
        "A device asserts an enabled interrupt request.",
        "The processor reaches an allowed interruption point.",
        "The return PC and required context are saved.",
        "Control transfers through an interrupt vector to the ISR.",
        "The ISR services and acknowledges the device in the order required by that device.",
        "The processor restores context and executes an interrupt-return operation.",
        "The earlier program continues from its saved PC.",
      ],
    },
    example: {
      title: "Keyboard input",
      body: "A polling program repeatedly checks a keyboard status register. An interrupt-driven system runs other code and transfers to the keyboard ISR only when the keyboard controller reports a key event.",
    },
    misconception:
      "Interrupts are not free. They save polling work, but context changes and ISR execution still consume time.",
  },
  revise: {
    definition:
      "Polling repeatedly checks a device; an interrupt lets an event transfer control to a handler.",
    sections: [
      {
        title: "Interrupt Flow",
        flow: ["Request", "Accept", "Save context", "Run ISR", "Acknowledge", "Restore", "Resume"],
      },
      {
        title: "Fast Comparison",
        table: {
          headers: ["Polling", "Interrupt"],
          rows: [
            ["CPU asks the device", "Device requests the CPU"],
            ["Cost per check", "Cost per event"],
            ["Simple control", "Better CPU use for rare events"],
          ],
        },
      },
      {
        title: "Type Recall",
        table: {
          headers: ["Pair", "Difference"],
          rows: [
            ["Maskable / non-maskable", "Normal control / critical request"],
            ["Vectored / non-vectored", "Direct handler entry / common entry"],
            ["Interrupt / DMA", "CPU handles event / controller moves block"],
          ],
        },
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Polling response time depends on the poll interval.",
      "An interrupt is asynchronous; an exception is linked to the current instruction.",
      "The return PC and required context must be preserved.",
      "An ISR must acknowledge or clear its interrupt source.",
      "An interrupt may return to the same process; it is not automatically a process switch.",
    ],
    followUp: "Why can an interrupt be more efficient than polling for a device that rarely becomes ready?",
  },
  lastMinute: {
    definition: "Polling asks repeatedly; interrupts notify only when service is needed.",
    sections: [
      {
        title: "ISR Checklist",
        points: [
          "Save return state.",
          "Identify and service the cause.",
          "Acknowledge the device.",
          "Restore state and return.",
          "Keep the ISR short and protect shared data.",
        ],
      },
    ],
    memoryLine: "Request, save, service, clear, restore, resume.",
    cues: ["Polling", "Interrupt request", "Save state", "ISR", "Resume"],
    trap: "Do not call every trap an interrupt. Exceptions are synchronous; interrupts are asynchronous.",
  },
};

export const stackFunctionCallsAndRecursion: SubjectTopic = {
  slug: "stack-function-calls-and-recursion",
  title: "Stack, Function Calls, and Recursion",
  description:
    "Use stack frames and register conventions to preserve function arguments, local values, and return addresses.",
  readTime: "52 min",
  difficulty: "Intermediate",
  tags: ["Call Stack", "Functions", "Recursion"],
  learn: {
    opening:
      "A function must return to the correct instruction and must not destroy values that its caller still needs. A call stack gives each active function a private area for saved registers, local variables, and return information.",
    sections: [
      {
        title: "Stack Fundamentals",
        paragraphs: [
          "A stack follows last in, first out order. Push adds an item at the top, and pop removes the most recently added item. The stack pointer identifies the current top or boundary of the active stack.",
          "In the common MIPS convention, the stack grows toward lower memory addresses. Allocating a frame subtracts from $sp, and releasing the frame adds the same size back. Stack conventions can vary, so the exact frame layout is a software agreement rather than a universal hardware rule.",
        ],
        formulas: [
          { label: "Allocate N bytes", expression: "$sp = $sp - N" },
          { label: "Release N bytes", expression: "$sp = $sp + N" },
        ],
      },
      {
        title: "ISA, ABI, and Calling Convention",
        paragraphs: [
          "The ISA defines instructions and visible registers. An application binary interface, or ABI, adds software rules such as register use, stack alignment, argument passing, return values, and object-file format. A calling convention is the function-call part of the ABI.",
          "Stack alignment depends on the selected ABI. Classic classroom MIPS o32 code commonly keeps $sp at least 8-byte aligned at call boundaries, while other ABIs may require a stronger alignment. Follow the ABI used by the compiler and operating environment.",
        ],
        dataTable: {
          headers: ["Layer", "Example responsibility"],
          rows: [
            ["ISA", "jal, jr, registers, loads, and stores"],
            ["ABI", "Stack alignment, register roles, object format"],
            ["Calling convention", "Arguments, return values, saved registers"],
          ],
        },
      },
      {
        title: "A Function Call",
        paragraphs: [
          "In classic MIPS assembly, jal target jumps to a function and places the return address in $ra. The function returns with jr $ra.",
          "A leaf function calls no other function and may not need to save $ra. A non-leaf function normally saves $ra before another jal overwrites it.",
        ],
        flow: ["Place arguments", "jal function", "Save required state", "Run function body", "Place return value", "Restore state", "jr $ra"],
      },
      {
        title: "A Typical Stack Frame",
        paragraphs: [
          "A stack frame is the area belonging to one active call. It may contain the saved return address, saved registers, local variables, and arguments that do not fit in argument registers.",
          "The diagram is an illustrative layout. A real compiler may change the order, add alignment space, omit an unused field, or use a frame pointer.",
        ],
        visual: {
          src: "/notes/modern-computer-architecture/mips-call-stack.png",
          alt: "Downward-growing MIPS call stack with a caller frame above arguments, saved return address, saved registers, local variables, and the stack pointer.",
          width: 1536,
          height: 1024,
          caption: "Each active call owns a frame; the common MIPS stack grows toward lower addresses.",
        },
      },
      {
        title: "Classic MIPS Register Convention",
        paragraphs: [
          "A calling convention tells separately compiled functions how to exchange values. Caller-saved registers may be changed by a called function, so the caller saves any value it still needs. Callee-saved registers must be restored by the function that changes them.",
        ],
        dataTable: {
          headers: ["Registers", "Usual role", "Preservation rule"],
          rows: [
            ["$a0-$a3", "First four arguments", "Caller-saved"],
            ["$v0-$v1", "Return values", "Caller-saved"],
            ["$t0-$t9", "Temporary values", "Caller-saved"],
            ["$s0-$s7", "Saved values", "Callee-saved"],
            ["$sp", "Stack pointer", "Restored before return"],
            ["$ra", "Return address", "Save when another call may overwrite it"],
          ],
        },
      },
      {
        title: "Extra Arguments and Large Return Values",
        paragraphs: [
          "The first four integer arguments normally use $a0 through $a3 in the classic o32 convention. Additional arguments are passed through an argument area on the stack.",
          "Small results normally use $v0 and $v1. A large structure is commonly returned through memory, with the caller providing a hidden pointer according to the ABI.",
        ],
      },
      {
        title: "Simple MIPS Function",
        paragraphs: [
          "This leaf function adds two arguments. It needs no stack frame because it does not call another function and uses no callee-saved register. The nop fills the return delay slot in the classic MIPS model used throughout these notes.",
        ],
        dataTable: {
          headers: ["Instruction", "Meaning"],
          rows: [
            ["addTwo: add $v0, $a0, $a1", "Return the sum in $v0"],
            ["jr $ra", "Return to the caller"],
            ["nop", "Classic MIPS delay-slot instruction"],
          ],
        },
      },
      {
        title: "Complete Non-Leaf Prologue and Epilogue",
        paragraphs: [
          "This pattern allocates an aligned frame, preserves $ra and $s0, makes another call, and restores every saved value before returning.",
        ],
        dataTable: {
          headers: ["Instruction", "Purpose"],
          rows: [
            ["addiu $sp, $sp, -8", "Allocate an 8-byte frame"],
            ["sw $ra, 4($sp)", "Save the return address"],
            ["sw $s0, 0($sp)", "Save a callee-saved register"],
            ["jal helper", "Call another function"],
            ["nop", "Classic call delay slot"],
            ["lw $s0, 0($sp)", "Restore $s0"],
            ["lw $ra, 4($sp)", "Restore the caller's return address"],
            ["addiu $sp, $sp, 8", "Release the frame"],
            ["jr $ra", "Return"],
            ["nop", "Classic return delay slot"],
          ],
        },
      },
      {
        title: "Recursion and Stack Depth",
        paragraphs: [
          "A recursive function calls itself. Every unfinished call needs its own return address and local state, so each call creates another stack frame.",
          "Recursion must have a base case. Deep or unbounded recursion may use all available stack memory and cause stack overflow.",
        ],
        flow: ["factorial(3)", "factorial(2)", "factorial(1): base case", "return 1", "return 2", "return 6"],
      },
      {
        title: "Recursive Factorial Pattern",
        paragraphs: [
          "This classic MIPS pattern returns factorial(n) in $v0 for non-negative n. Every call saves its own $ra and n. mult writes the product to HI and LO, and mflo reads the low 32 result bits.",
        ],
        flow: [
          "fact: addiu $sp,$sp,-8", "sw $ra,4($sp)", "sw $a0,0($sp)", "slti $t0,$a0,2",
          "bne $t0,$zero,BASE", "nop", "addiu $a0,$a0,-1", "jal fact", "nop", "lw $a0,0($sp)",
          "mult $v0,$a0", "mflo $v0", "j DONE", "nop", "BASE: addiu $v0,$zero,1",
          "DONE: lw $ra,4($sp)", "addiu $sp,$sp,8", "jr $ra", "nop",
        ],
      },
      {
        title: "Stack Overflow",
        paragraphs: [
          "Every frame consumes memory. Very deep recursion, very large local arrays, or a missing base case can move $sp beyond the valid stack region.",
          "Operating systems may place an unmapped guard page near the stack so an invalid access causes a fault instead of silently corrupting another region. Embedded systems often use a fixed stack limit that must be checked by design or analysis.",
        ],
      },
      {
        title: "Worked Problems",
        paragraphs: [],
        problems: [
          {
            title: "Allocate a stack frame",
            prompt: "The stack pointer is 0x7FFFEFFC. A function allocates a 12-byte frame. Find the new $sp.",
            steps: [
              "The MIPS stack grows toward lower addresses.",
              "12 decimal = 0xC.",
              "New $sp = 0x7FFFEFFC - 0xC.",
            ],
            answer: "New $sp = 0x7FFFEFF0.",
          },
          {
            title: "Restore the stack pointer",
            prompt: "A function used addiu $sp, $sp, -16 in its prologue. What must it do before returning?",
            steps: [
              "The prologue reserved 16 bytes by subtracting 16.",
              "The epilogue must release exactly the same space.",
            ],
            answer: "Execute addiu $sp, $sp, 16 after restoring saved values.",
          },
          {
            title: "Choose which register to save",
            prompt: "A caller needs the value in $t0 after jal calculate. Can it assume $t0 is unchanged?",
            steps: [
              "$t0 is a caller-saved temporary register.",
              "The called function is allowed to overwrite it.",
              "The caller must save $t0 before jal if the value is still needed.",
            ],
            answer: "No. Save $t0 before the call and restore it afterward.",
          },
          {
            title: "Count recursive frames",
            prompt: "factorial(4) calls factorial(3), factorial(2), and factorial(1), where factorial(1) is the base case. How many active frames exist at maximum depth?",
            steps: [
              "The unfinished calls are factorial(4), factorial(3), and factorial(2).",
              "The base-case call factorial(1) also has an active frame.",
            ],
            answer: "Maximum depth = 4 active stack frames.",
          },
          {
            title: "Find total stack use",
            prompt: "If each of the four active recursive frames uses 24 bytes, how much stack memory is used?",
            steps: [
              "Stack use = number of frames × bytes per frame.",
              "Stack use = 4 × 24.",
            ],
            answer: "The active calls use 96 bytes of stack memory.",
          },
          {
            title: "Pass a fifth argument",
            prompt: "A function using the classic o32 convention already uses $a0-$a3 for four integer arguments. Where is a fifth integer argument passed?",
            steps: [
              "The four dedicated integer argument registers are already occupied.",
              "The calling convention uses the caller's stack argument area for additional arguments.",
            ],
            answer: "The fifth argument is passed in the stack argument area according to the ABI.",
          },
          {
            title: "Check frame alignment",
            prompt: "$sp is 0x1000 and an o32 classroom example requires 8-byte alignment. Is a 12-byte frame valid without padding?",
            steps: [
              "After subtracting 12, $sp would be 0x0FF4.",
              "0x0FF4 is divisible by 4 but not by 8.",
              "Rounding the frame to 16 bytes gives new $sp = 0x0FF0, which is divisible by 8.",
            ],
            answer: "No. Use padding; a 16-byte frame preserves 8-byte alignment.",
          },
        ],
      },
    ],
    mechanism: {
      title: "How a non-leaf function protects its caller",
      steps: [
        "Use addiu to subtract an ABI-aligned frame size from $sp.",
        "Save $ra and every callee-saved register that will be changed.",
        "Store local values and any saved registers in the frame.",
        "Call another function with jal.",
        "After it returns, restore the saved registers and $ra.",
        "Add the frame size back to $sp.",
        "Return with jr $ra and handle the classic delay slot when applicable.",
      ],
    },
    example: {
      title: "Why recursion needs separate frames",
      body: "When factorial(4) calls factorial(3), both calls need their own value of n and their own return point. Reusing one shared location would destroy the older call's information.",
    },
    misconception:
      "A stack frame does not have one mandatory layout for every MIPS program. The calling convention defines required behaviour, while compilers choose a valid layout.",
  },
  revise: {
    definition:
      "The call stack keeps the private state and return information of active functions in last-in, first-out order.",
    sections: [
      {
        title: "Call Flow",
        flow: ["Arguments", "jal", "Prologue", "Body", "Return value", "Epilogue", "jr $ra"],
      },
      {
        title: "Register Recall",
        table: {
          headers: ["Caller-saved", "Callee-saved"],
          rows: [
            ["$a, $v, $t", "$s registers"],
            ["Save if needed after call", "Restore if the callee changes them"],
          ],
        },
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "The common MIPS stack grows toward lower addresses.",
      "The ABI, not the ISA alone, defines stack alignment and register roles.",
      "jal writes the return address into $ra; jr $ra returns.",
      "A non-leaf function normally saves $ra.",
      "Use addiu rather than addi for normal stack-pointer adjustment.",
      "Each recursive call needs a separate frame.",
      "The stack pointer must be restored before return.",
    ],
    followUp: "Why must a non-leaf function usually save $ra before executing another jal?",
  },
  lastMinute: {
    definition: "A frame protects one active call's return address, saved registers, and local state.",
    sections: [
      {
        title: "Prologue and Epilogue",
        points: [
          "Prologue: lower $sp and save required state.",
          "Epilogue: restore state and raise $sp.",
          "jal calls; jr $ra returns.",
          "Use addiu for $sp and preserve ABI alignment.",
          "$t is caller-saved; $s is callee-saved.",
        ],
      },
    ],
    memoryLine: "Every unfinished call keeps its own frame.",
    cues: ["LIFO", "$sp", "$ra", "ABI", "addiu", "Delay slot", "Recursion"],
    trap: "Do not subtract from $sp in the prologue and forget to add the same frame size back.",
  },
};

export const riscCiscAndIsa: SubjectTopic = {
  slug: "risc-cisc-and-isa",
  title: "Instruction Set Architecture: RISC and CISC",
  description:
    "Understand the software-hardware contract and compare typical RISC and CISC instruction-set choices without common myths.",
  readTime: "41 min",
  difficulty: "Intermediate",
  tags: ["ISA", "RISC", "CISC"],
  learn: {
    opening:
      "An instruction set architecture, or ISA, is the visible contract between software and a processor. Programs target the ISA; processor designers may build very different internal hardware that obeys the same contract.",
    sections: [
      {
        title: "What an ISA Defines",
        paragraphs: [
          "An ISA defines machine instructions and the programmer-visible state they operate on. It is different from microarchitecture, which describes the internal implementation used to execute those instructions.",
          "Depending on the architecture, the ISA also specifies byte order, privilege levels, exceptions, atomic operations, and rules about how memory operations become visible to other processors.",
        ],
        dataTable: {
          headers: ["ISA usually defines", "Microarchitecture decides"],
          rows: [
            ["Instruction encodings", "Pipeline depth and execution units"],
            ["Visible registers", "Internal physical registers"],
            ["Data types and addressing modes", "Cache sizes and predictors"],
            ["Memory and exception behaviour", "How instructions are scheduled internally"],
            ["Endianness and atomic operations", "Cache coherence implementation"],
          ],
        },
      },
      {
        title: "ISA, ABI, and Microarchitecture",
        paragraphs: [
          "The ISA is the machine-code contract. The ABI is a software compatibility contract built on top of an ISA. Microarchitecture is the hardware design that implements the ISA.",
        ],
        dataTable: {
          headers: ["Layer", "Examples"],
          rows: [
            ["ISA", "Opcodes, visible registers, memory and exception behaviour"],
            ["ABI", "Calling convention, stack alignment, binary and object-file rules"],
            ["Microarchitecture", "Pipeline, cache sizes, predictors, execution units"],
          ],
        },
      },
      {
        title: "Typical RISC and CISC Choices",
        paragraphs: [
          "RISC means reduced instruction set computer. RISC designs usually use regular encodings, many registers, and a load-store approach in which arithmetic works on registers.",
          "CISC means complex instruction set computer. CISC designs often provide richer operations, more addressing modes, and variable-length encodings. These are typical tendencies, not strict laws.",
        ],
        visual: {
          src: "/notes/modern-computer-architecture/risc-vs-cisc-isa.png",
          alt: "ISA shown between software and hardware, with typical RISC traits on one side and typical CISC traits on the other.",
          width: 1536,
          height: 1024,
          caption: "RISC and CISC describe common design directions, not absolute rules about every processor.",
        },
        dataTable: {
          headers: ["Feature", "Typical RISC", "Typical CISC"],
          rows: [
            ["Operations", "Small and regular", "Richer and more varied"],
            ["Memory access", "Explicit load and store", "Some operations can use memory operands"],
            ["Encoding", "Often fixed or regular", "Variable length is common"],
            ["Addressing modes", "Usually fewer", "Usually more"],
            ["Code size", "May need more instructions", "May encode work in fewer bytes"],
            ["Decode", "Usually simpler", "Usually more complex"],
          ],
        },
      },
      {
        title: "Load-Store Design",
        paragraphs: [
          "In a load-store ISA, arithmetic instructions normally read registers and write a register. Separate load and store instructions move values between registers and memory.",
          "For c = a + b, a processor may load a and b, add their register values, and store the result. Regular operations make instruction decoding and pipelining easier, but a program may need more instructions.",
        ],
        flow: ["Load a", "Load b", "Add registers", "Store c"],
      },
      {
        title: "Examples and Important Nuance",
        paragraphs: [
          "MIPS and the base RISC-V integer ISA are clear RISC examples. The base RV32I instruction set uses 32-bit instructions and a load-store design. Optional RISC-V extensions can add 16-bit compressed encodings and more operations.",
          "x86 is commonly classified as CISC, but modern x86 processors may decode instructions into simpler internal operations. ISA category does not directly reveal the complete microarchitecture.",
          "Some CISC implementations use microcode for selected complex operations. Other instructions may decode directly into one or more internal operations. This changes implementation, not the visible x86 ISA.",
        ],
        dataTable: {
          headers: ["ISA", "Useful description"],
          rows: [
            ["Hack", "Very small 16-bit educational ISA"],
            ["MIPS", "Regular 32-bit load-store RISC ISA"],
            ["RISC-V", "Open modular RISC ISA with base plus extensions"],
            ["x86", "Long-lived CISC ISA with variable-length instructions"],
          ],
        },
      },
      {
        title: "Performance and Code Density",
        paragraphs: [
          "Neither RISC nor CISC is automatically faster. Real performance depends on instruction count, CPI, clock rate, memory behaviour, compiler quality, and the implementation.",
          "A shorter program in instructions may still be slower if its instructions take more cycles. A program using more simple instructions may still run quickly when the hardware overlaps them efficiently.",
          "Dense code can fit more instructions in an instruction-cache line and reduce instruction-memory traffic. Regular encodings can simplify decode and make it easier for hardware to find instruction boundaries.",
        ],
        formulas: [
          { label: "Code size", expression: "Code bytes = Σ(instruction countᵢ × bytesᵢ)" },
        ],
      },
      {
        title: "Compiler and ISA Interaction",
        paragraphs: [
          "A compiler chooses instructions, registers, and memory operations for a program. Good register allocation reduces loads and stores, while instruction selection affects code size and instruction count.",
          "The same source code can therefore produce different performance with another compiler, optimization level, or target ISA. RISC-versus-CISC comparisons must include compiler quality and the actual workload.",
        ],
      },
      {
        title: "Worked Problems",
        paragraphs: [],
        problems: [
          {
            title: "Separate ISA from microarchitecture",
            prompt: "Is cache size part of the ISA or the microarchitecture? Is the visible register set part of the ISA or microarchitecture?",
            steps: [
              "Software normally does not require one exact cache size to execute the ISA.",
              "Machine instructions directly name programmer-visible registers.",
            ],
            answer: "Cache size is microarchitecture; the visible register set is ISA.",
          },
          {
            title: "Recognize load-store code",
            prompt: "A machine requires LOAD R1,[A], LOAD R2,[B], ADD R3,R1,R2, STORE [C],R3. Which design idea does this show?",
            steps: [
              "Memory is accessed only by LOAD and STORE.",
              "ADD uses register operands and produces a register result.",
            ],
            answer: "It shows a load-store design typical of RISC ISAs.",
          },
          {
            title: "Compare code size",
            prompt: "A RISC sequence uses five 4-byte instructions. A CISC sequence for the same task uses three instructions averaging 3 bytes. Find both code sizes.",
            steps: [
              "RISC size = 5 × 4 = 20 bytes.",
              "CISC size = 3 × 3 = 9 bytes.",
            ],
            answer: "RISC sequence = 20 bytes; CISC sequence = 9 bytes.",
          },
          {
            title: "Avoid the clock-rate myth",
            prompt: "Machine R uses 10 instructions at CPI 1. Machine C uses 6 instructions at CPI 2. Both have the same clock rate. Which uses fewer cycles?",
            steps: [
              "R cycles = 10 × 1 = 10.",
              "C cycles = 6 × 2 = 12.",
              "The smaller instruction count does not compensate for the larger CPI here.",
            ],
            answer: "Machine R uses fewer cycles: 10 instead of 12.",
          },
          {
            title: "Classify an ABI rule",
            prompt: "A platform requires function arguments in selected registers and requires a 16-byte-aligned stack. Are these ISA or ABI rules?",
            steps: [
              "The machine instructions and registers come from the ISA.",
              "The software agreement about argument registers and stack alignment belongs to binary compatibility.",
            ],
            answer: "They are ABI and calling-convention rules built on top of the ISA.",
          },
          {
            title: "Relate code density to an instruction cache",
            prompt: "A 64-byte instruction-cache line holds fixed 4-byte instructions. How many complete instructions fit? What if each instruction were exactly 2 bytes?",
            steps: [
              "At 4 bytes each: 64 ÷ 4 = 16 instructions.",
              "At 2 bytes each: 64 ÷ 2 = 32 instructions.",
            ],
            answer: "The line holds 16 four-byte instructions or 32 two-byte instructions.",
          },
        ],
      },
    ],
    mechanism: {
      title: "How software reaches hardware through an ISA",
      steps: [
        "A compiler translates source operations into ISA instructions.",
        "An assembler encodes those instructions as machine words.",
        "The processor fetches and decodes the machine words.",
        "Its microarchitecture schedules internal hardware actions.",
        "The visible result must follow the ISA specification.",
        "A different processor may execute the same ISA with a different internal design.",
      ],
    },
    example: {
      title: "Same ISA, different processors",
      body: "Two processors can run the same machine-code program while using different cache sizes, pipeline depths, or execution units. Compatibility comes from the shared ISA, not identical internal hardware.",
    },
    misconception:
      "RISC does not mean every instruction takes one cycle, and CISC does not mean a processor must be slow.",
  },
  revise: {
    definition:
      "An ISA is the programmer-visible contract for instructions, registers, data, memory behaviour, and control flow.",
    sections: [
      {
        title: "Typical Comparison",
        table: {
          headers: ["Typical RISC", "Typical CISC"],
          rows: [
            ["Regular operations and encoding", "Richer operations and addressing"],
            ["Load-store memory access", "Memory operands may be supported"],
            ["Simpler decode", "More complex decode"],
          ],
        },
      },
      {
        title: "Layer Recall",
        flow: ["Source", "Compiler + ABI", "ISA instructions", "Microarchitecture", "Hardware result"],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "ISA is not the same as microarchitecture.",
      "ABI defines calling, stack, and binary compatibility rules above the ISA.",
      "RISC and CISC features are tendencies, not absolute rules.",
      "Load-store arithmetic uses registers, with separate memory instructions.",
      "MIPS and RISC-V are RISC examples; x86 is a CISC example.",
      "Use CPU time, not the RISC or CISC label, to compare performance.",
    ],
    followUp: "How can two processors with different pipelines execute the same machine-code program?",
  },
  lastMinute: {
    definition: "ISA tells software what the processor does; microarchitecture decides how the hardware does it.",
    sections: [
      {
        title: "RISC and CISC Recall",
        points: [
          "RISC: regular, load-store, many registers.",
          "CISC: richer operations, more modes, variable length common.",
          "These are typical traits, not strict rules.",
          "Neither label guarantees performance.",
          "ISA, ABI, and microarchitecture are different layers.",
        ],
      },
    ],
    memoryLine: "The ISA is the bridge between software and hardware.",
    cues: ["ISA", "ABI", "Microarchitecture", "Load-store", "Microcode", "Code density"],
    trap: "Do not say RISC is always faster or that every RISC instruction takes one cycle.",
  },
};

export const mipsArchitectureAndAssembly: SubjectTopic = {
  slug: "mips-architecture-and-assembly",
  title: "MIPS Architecture and Basic Assembly",
  description:
    "Use MIPS registers, instruction formats, load-store addressing, branches, calls, and exact 32-bit encodings.",
  readTime: "70 min",
  difficulty: "Advanced",
  tags: ["MIPS", "Instruction Formats", "Assembly"],
  learn: {
    opening:
      "Classic MIPS is a 32-bit load-store RISC architecture with 32 general-purpose integer registers. These notes consistently use the classic teaching model with branch delay slots and the o32 register convention; each delay slot is shown as nop unless useful work is placed there.",
    sections: [
      {
        title: "Hack versus Classic MIPS",
        paragraphs: [
          "Hack has two main CPU registers and 16-bit instructions. Classic MIPS uses 32-bit instructions and 32 integer registers. MIPS arithmetic names register operands directly, while load and store instructions move values between registers and byte-addressed memory.",
        ],
        dataTable: {
          headers: ["Feature", "Hack", "Classic MIPS"],
          rows: [
            ["Instruction width", "16 bits", "32 bits"],
            ["General data registers", "A and D", "32 integer registers"],
            ["Memory model", "M means RAM[A]", "Explicit load and store"],
            ["Function call", "Built from software patterns", "jal and jr support calls and returns"],
            ["Instruction formats", "A and C", "R, I, and J"],
          ],
        },
      },
      {
        title: "Important Integer Registers",
        paragraphs: [
          "Every register also has a number from 0 through 31. Names such as $t0 and $sp describe conventional uses. Register $zero always reads as 0.",
        ],
        dataTable: {
          headers: ["Name", "Number", "Usual role"],
          rows: [
            ["$zero", "0", "Constant zero"],
            ["$at", "1", "Reserved for assembler-generated code"],
            ["$v0-$v1", "2-3", "Return values"],
            ["$a0-$a3", "4-7", "Function arguments"],
            ["$t0-$t7", "8-15", "Caller-saved temporaries"],
            ["$s0-$s7", "16-23", "Callee-saved values"],
            ["$t8-$t9", "24-25", "More temporaries"],
            ["$k0-$k1", "26-27", "Reserved for operating-system kernel"],
            ["$gp", "28", "Global pointer"],
            ["$sp", "29", "Stack pointer"],
            ["$fp or $s8", "30", "Frame pointer when used, otherwise saved register"],
            ["$ra", "31", "Return address"],
          ],
        },
      },
      {
        title: "Three 32-Bit Instruction Formats",
        paragraphs: [
          "R-type instructions use register operands and a funct field. I-type instructions use two register fields plus a 16-bit immediate or offset. J-type instructions use a 26-bit target field.",
        ],
        visual: {
          src: "/notes/modern-computer-architecture/mips-instruction-formats.png",
          alt: "Exact classic MIPS 32-bit R-type, I-type, and J-type field layouts with field widths.",
          width: 1536,
          height: 1024,
          caption: "The opcode starts every format; the remaining fields depend on the instruction class.",
        },
        formulas: [
          { label: "R-type", expression: "opcode[6] | rs[5] | rt[5] | rd[5] | shamt[5] | funct[6]" },
          { label: "I-type", expression: "opcode[6] | rs[5] | rt[5] | immediate[16]" },
          { label: "J-type", expression: "opcode[6] | target[26]" },
        ],
      },
      {
        title: "Core MIPS Instructions",
        paragraphs: [
          "MIPS normally uses destination-first assembly syntax. Arithmetic instructions use registers, and memory instructions calculate an address from a base register plus an offset.",
        ],
        dataTable: {
          headers: ["Instruction", "Meaning"],
          rows: [
            ["add $t0, $t1, $t2", "$t0 = $t1 + $t2"],
            ["sub $t0, $t1, $t2", "$t0 = $t1 - $t2"],
            ["addu $t0, $t1, $t2", "Add without a signed-overflow trap"],
            ["addi $t0, $t1, 5", "$t0 = $t1 + 5"],
            ["lui $t0, 0x1234", "$t0 = 0x12340000"],
            ["ori $t0, $t0, 0x5678", "OR with a zero-extended immediate"],
            ["sll $t0, $t1, 2", "Shift $t1 left by 2 bits"],
            ["lw $t0, 12($sp)", "$t0 = Memory[$sp + 12]"],
            ["sw $t0, 12($sp)", "Memory[$sp + 12] = $t0"],
            ["beq $t0, $t1, L", "Branch to L when the registers are equal"],
            ["slt $t0, $t1, $t2", "$t0 = 1 when $t1 < $t2, otherwise 0"],
            ["j L", "Jump to L"],
            ["jal F", "Call F and write the return address to $ra"],
            ["jr $ra", "Return to the address in $ra"],
          ],
        },
      },
      {
        title: "Immediate Extension Rules",
        paragraphs: [
          "The same 16-bit field is interpreted differently by different instructions. addiu does not trap on signed overflow, but its immediate is still sign-extended; the u in its name does not mean a zero-extended immediate.",
        ],
        dataTable: {
          headers: ["Instructions", "16-bit immediate treatment"],
          rows: [
            ["addi, addiu, slti", "Sign-extend to 32 bits"],
            ["lw, sw", "Sign-extend the address offset"],
            ["beq, bne", "Sign-extend, then shift left by 2"],
            ["andi, ori, xori", "Zero-extend to 32 bits"],
            ["lui", "Place immediate in upper 16 bits; lower 16 become zero"],
          ],
        },
      },
      {
        title: "Addressing, Immediates, and Control Flow",
        paragraphs: [
          "MIPS memory is byte addressed. A normal 32-bit lw or sw requires an address divisible by four; a misaligned address can raise an address exception. lw and sw add a signed 16-bit offset to a base register.",
          "A branch stores a signed word offset relative to PC + 4. The hardware shifts the offset left by two because instructions are four bytes. A classic J-type jump combines the 26-bit target field, two zero bits, and the upper four bits of PC + 4.",
          "In the classic teaching model used here, the instruction immediately after a branch or jump is a delay slot and executes before control transfers. Therefore jal saves PC + 8 in $ra. The examples place nop in the slot unless they explicitly show useful work there.",
        ],
        formulas: [
          { label: "Effective address", expression: "EA = Register[rs] + signExtend(immediate₁₆)" },
          { label: "Branch target", expression: "Target = PC + 4 + (signExtend(offset₁₆) << 2)" },
          { label: "Branch offset", expression: "offset = (Target - (PC + 4)) ÷ 4" },
          { label: "Jump target", expression: "{(PC + 4)[31:28], target₂₆, 00}" },
          { label: "Signed immediate range", expression: "-32768 to 32767" },
        ],
      },
      {
        title: "Endianness and Aligned Memory",
        paragraphs: [
          "MIPS implementations can support big-endian or little-endian byte order. Endianness changes the byte order inside a multi-byte value, not the numeric value held in a register.",
        ],
        dataTable: {
          headers: ["Order", "Lowest address stores"],
          rows: [
            ["Little-endian", "Least-significant byte"],
            ["Big-endian", "Most-significant byte"],
          ],
        },
      },
      {
        title: "Multiplication, Division, HI, and LO",
        paragraphs: [
          "In classic MIPS, mult produces a 64-bit product in two special registers: HI contains the upper 32 bits and LO contains the lower 32 bits. mfhi and mflo move those values into a general-purpose register.",
          "Classic div places the quotient in LO and the remainder in HI. Later MIPS revisions may provide different forms, so always follow the architecture version being studied.",
        ],
        dataTable: {
          headers: ["Sequence", "Result"],
          rows: [
            ["mult $t0, $t1", "HI:LO = signed 64-bit product"],
            ["mflo $s0", "$s0 = low 32 product bits"],
            ["mfhi $s1", "$s1 = high 32 product bits"],
            ["div $t0, $t1", "LO = quotient; HI = remainder"],
          ],
        },
      },
      {
        title: "Assembler Pseudoinstructions and SPIM",
        paragraphs: [
          "An assembler may accept convenient pseudoinstructions such as li, la, move, and blt. It translates them into one or more real MIPS instructions, so one assembly line does not always equal one machine instruction.",
          "SPIM also offers syscall services for classroom programs. Loading a service number into $v0 and executing syscall is a simulator convention, not a normal arithmetic instruction built into every MIPS operating environment.",
        ],
        dataTable: {
          headers: ["Source form", "Important note"],
          rows: [
            ["move $t0, $t1", "Pseudo: can become addu $t0, $t1, $zero"],
            ["li $t0, 5", "Pseudo: small values can use addiu or ori"],
            ["la $a0, msg", "Pseudo: assembler builds the address"],
            ["syscall", "Environment service selected through registers"],
          ],
        },
      },
      {
        title: "Small Branching Program",
        paragraphs: [
          "Assume $t0 and $t1 contain two signed integers. This sequence places the larger value in $v0.",
        ],
        flow: [
          "slt $t2, $t0, $t1", "bne $t2, $zero, SECOND", "nop", "add $v0, $t0, $zero", "j DONE", "nop",
          "SECOND: add $v0, $t1, $zero", "DONE",
        ],
      },
      {
        title: "Complete SPIM Hello Program",
        paragraphs: [
          "This runnable SPIM-style program prints a string and exits. li and la are assembler pseudoinstructions, while the service numbers are SPIM conventions rather than MIPS ISA rules.",
        ],
        flow: [
          ".data", "msg: .asciiz \"Hello\"", ".text", ".globl main", "main:", "li $v0, 4", "la $a0, msg",
          "syscall", "li $v0, 10", "syscall",
        ],
      },
      {
        title: "Worked Problems",
        paragraphs: [],
        problems: [
          {
            title: "Encode an R-type add",
            prompt: "Encode add $t0, $t1, $t2. Use $t0=8, $t1=9, $t2=10, opcode=0, shamt=0, and add funct=32.",
            steps: [
              "rs = $t1 = 9 = 01001 and rt = $t2 = 10 = 01010.",
              "rd = $t0 = 8 = 01000 and shamt = 00000.",
              "funct 32 = 100000.",
              "Join: 000000 | 01001 | 01010 | 01000 | 00000 | 100000.",
            ],
            answer: "Binary = 00000001001010100100000000100000; hexadecimal = 0x012A4020.",
          },
          {
            title: "Encode an I-type addi",
            prompt: "Encode addi $t0, $t1, 5. The addi opcode is 8.",
            steps: [
              "Opcode 8 = 001000.",
              "rs = $t1 = 9 = 01001; rt = $t0 = 8 = 01000.",
              "Immediate 5 in 16 bits is 0000000000000101.",
              "Join the four fields in I-type order.",
            ],
            answer: "Binary = 00100001001010000000000000000101; hexadecimal = 0x21280005.",
          },
          {
            title: "Calculate a load address",
            prompt: "$sp = 0x7FFFEFF0. What effective address is used by lw $t0, 12($sp)?",
            steps: [
              "The base register is $sp.",
              "12 decimal = 0xC.",
              "Effective address = 0x7FFFEFF0 + 0xC.",
            ],
            answer: "Effective address = 0x7FFFEFFC.",
          },
          {
            title: "Calculate a branch offset",
            prompt: "A beq instruction is at PC 0x00400020 and its target is 0x00400030. Find the 16-bit branch offset in words.",
            steps: [
              "PC + 4 = 0x00400024.",
              "Byte difference = 0x00400030 - 0x00400024 = 0xC = 12 bytes.",
              "Each instruction word is 4 bytes, so offset = 12 ÷ 4.",
            ],
            answer: "Branch offset = 3.",
          },
          {
            title: "Trace a short program",
            prompt: "$t0 = 7 and $t1 = 11. Trace slt $t2,$t0,$t1 followed by beq $t2,$zero,SKIP.",
            steps: [
              "7 is less than 11, so slt writes 1 into $t2.",
              "beq compares $t2 = 1 with $zero = 0.",
              "The values are not equal.",
            ],
            answer: "$t2 = 1 and the branch is not taken.",
          },
          {
            title: "Encode a negative immediate",
            prompt: "Encode addi $t0, $zero, -3. The addi opcode is 8 and $t0 is register 8.",
            steps: [
              "Opcode 8 = 001000; rs = $zero = 00000; rt = $t0 = 01000.",
              "-3 in 16-bit two's complement is 1111111111111101.",
              "Join: 001000 | 00000 | 01000 | 1111111111111101.",
            ],
            answer: "Binary = 00100000000010001111111111111101; hexadecimal = 0x2008FFFD.",
          },
          {
            title: "Compare sign and zero extension",
            prompt: "The immediate field is 0xFFFF. What 32-bit value is used by addi and by ori?",
            steps: [
              "addi sign-extends bit 15, which is 1, producing 0xFFFFFFFF.",
              "ori fills the upper 16 bits with zeros, producing 0x0000FFFF.",
            ],
            answer: "addi uses 0xFFFFFFFF (-1); ori uses 0x0000FFFF (65535).",
          },
          {
            title: "Encode a J-type target",
            prompt: "A j instruction at PC 0x00400020 targets 0x00401000. Find the 26-bit target field and complete hexadecimal instruction. The j opcode is 2.",
            steps: [
              "The target is word aligned, so remove the two low zero bits: 0x00401000 ÷ 4 = 0x00100400.",
              "This value fits in the 26-bit target field and shares the required upper PC region.",
              "Opcode 2 occupies the upper six bits: 2 << 26 = 0x08000000.",
              "Instruction = 0x08000000 + 0x00100400.",
            ],
            answer: "Target field = 0x00100400; instruction = 0x08100400.",
          },
          {
            title: "Detect a misaligned load",
            prompt: "Can lw $t0, 2($s0) perform a normal aligned word load when $s0 = 0x1000?",
            steps: [
              "Effective address = 0x1000 + 2 = 0x1002.",
              "A 32-bit word address must be divisible by 4.",
              "0x1002 is not divisible by 4.",
            ],
            answer: "No. A normal lw is misaligned and can raise an address exception.",
          },
          {
            title: "Read a classic multiplication result",
            prompt: "After mult $t0,$t1, where are the 64 product bits stored and how is the low half copied to $s0?",
            steps: [
              "mult writes the high 32 product bits to HI.",
              "It writes the low 32 product bits to LO.",
              "mflo moves LO into a general-purpose register.",
            ],
            answer: "The product is in HI:LO; execute mflo $s0 for the low 32 bits.",
          },
        ],
      },
    ],
    mechanism: {
      title: "How to encode a classic MIPS instruction",
      steps: [
        "Identify whether the instruction is R-type, I-type, or J-type.",
        "Look up the opcode and, for R-type, the funct value.",
        "Replace every register name with its 5-bit number.",
        "Encode the shift amount, immediate, offset, or target field.",
        "Join fields in the exact format order.",
        "Confirm the result contains 32 bits and optionally group it into hexadecimal.",
      ],
    },
    example: {
      title: "Why MIPS has 5-bit register fields",
      body: "Five bits represent 2⁵ = 32 choices, so a 5-bit field can select any one of the 32 integer registers.",
    },
    misconception:
      "Do not place register numbers into the wrong fields. R-type usually writes rd, while many I-type instructions write rt.",
  },
  revise: {
    definition:
      "Classic MIPS is a 32-bit load-store RISC ISA with 32 integer registers and regular R, I, and J formats.",
    sections: [
      {
        title: "Format Map",
        formulas: [
          { expression: "R: op | rs | rt | rd | shamt | funct" },
          { expression: "I: op | rs | rt | immediate" },
          { expression: "J: op | target" },
        ],
      },
      {
        title: "Register Recall",
        table: {
          headers: ["Registers", "Role"],
          rows: [
            ["$a0-$a3 / $v0-$v1", "Arguments / return values"],
            ["$t / $s", "Caller-saved / callee-saved"],
            ["$sp / $ra", "Stack pointer / return address"],
          ],
        },
      },
      {
        title: "Immediate Recall",
        table: {
          headers: ["Sign-extend", "Zero-extend"],
          rows: [
            ["addi/addiu, lw/sw, branches", "andi, ori, xori"],
            ["Negative offsets supported", "Upper bits become zero"],
          ],
        },
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "All three classic MIPS formats are 32 bits.",
      "R-type uses rd as destination; many I-type instructions use rt as destination.",
      "lw and sw use base plus signed offset addressing.",
      "A normal lw or sw word address must be divisible by four.",
      "A branch offset is measured from PC + 4 in instruction words.",
      "Classic MIPS delay slots execute the instruction immediately after a branch or jump.",
      "Classic jal with a delay slot commonly saves PC + 8 in $ra.",
      "jal calls a function and jr $ra returns.",
      "Classic mult/div use HI and LO.",
      "MIPS may be little-endian or big-endian.",
      "Pseudoinstructions may expand into multiple real instructions.",
    ],
    followUp: "Why does every MIPS register field need exactly five bits?",
  },
  lastMinute: {
    definition: "MIPS uses 32 registers, 32-bit instructions, and explicit load-store memory access.",
    sections: [
      {
        title: "Encoding Checklist",
        points: [
          "Choose R, I, or J format.",
          "Convert registers to 5-bit numbers.",
          "Write opcode and funct where required.",
          "Branch offset = (target - (PC + 4)) ÷ 4.",
          "addi/lw/sw sign-extend; andi/ori/xori zero-extend.",
          "Word addresses for normal lw/sw must be divisible by four.",
          "Count exactly 32 bits.",
        ],
      },
    ],
    memoryLine: "R computes, I uses an immediate or offset, J carries a target.",
    cues: ["R I J", "Sign extension", "Alignment", "Branch offset", "jal / jr"],
    trap: "Do not use the byte difference directly as a branch offset; divide it by four.",
  },
};
