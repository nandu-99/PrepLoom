import type { SubjectTopic } from "@/lib/subject-content";

const ioSystemsDetailed: SubjectTopic = {
  slug: "io-systems-polling-interrupts-dma",
  title: "I/O Systems, Polling, Interrupts, and DMA",
  description:
    "Understand how the OS communicates with devices and moves data using Polling, Interrupts, and DMA.",
  readTime: "Detailed note",
  difficulty: "Intermediate",
  tags: ["I/O Systems", "Programmed I/O", "Interrupts", "DMA"],
  learn: {
    opening:
      "An I/O System manages safe and efficient communication between applications and hardware devices.",
    sections: [
      {
        title: "Overview",
        paragraphs: [
          "Computers communicate with devices such as keyboards, mice, displays, printers, storage devices, and network cards.",
          "Applications normally do not control these devices directly. They request an operation from the Operating System, which uses a Device Driver and Device Controller to communicate with the hardware.",
        ],
      },
      {
        title: "Why It Matters",
        paragraphs: [
          "Different devices use different commands and operate at very different speeds. The I/O System hides those hardware details and gives applications a safer, more consistent way to use devices.",
          "For example, saving a file follows a path similar to: Application → Operating System → Device Driver → Device Controller → Storage Device.",
        ],
      },
      {
        title: "Core Concept",
        paragraphs: [
          "The Operating System receives an I/O request, selects the correct Device Driver, sends commands through the Device Controller, and later returns the result to the application.",
        ],
        visual: {
          src: "/notes/operating-systems/io-request-path.png",
          alt: "Forward I/O request path from an Application through the Operating System, Device Driver, and Device Controller to an I/O Device.",
          width: 1536,
          height: 1024,
          caption:
            "The driver is software; the controller is hardware that operates the device.",
        },
      },
      {
        title: "What Is an I/O System?",
        paragraphs: [
          "The I/O System is the part of the Operating System that manages communication with hardware devices.",
        ],
        points: [
          "Accept I/O requests from applications.",
          "Control devices through Device Drivers.",
          "Move data between devices and memory.",
          "Handle completion notifications and errors.",
          "Protect devices from unauthorized access.",
        ],
      },
      {
        title: "Basic I/O Flow",
        paragraphs: [
          "A normal I/O request crosses several software and hardware layers.",
        ],
        points: [
          "The application requests an I/O operation using a System Call.",
          "The OS checks the request and calls the correct Device Driver.",
          "The driver writes commands and data to the Device Controller.",
          "The controller operates the physical device.",
          "The controller reports completion or an error.",
          "The OS returns the result to the application.",
        ],
      },
      {
        title: "Device, Controller, and Driver",
        paragraphs: [
          "These three terms describe different parts of the I/O path.",
        ],
        dataTable: {
          headers: ["Part", "What it is", "Example"],
          rows: [
            ["I/O Device", "Physical hardware that performs input or output", "Keyboard, SSD, printer"],
            ["Device Controller", "Hardware that controls the device and exposes registers", "USB or storage controller"],
            ["Device Driver", "OS software that knows how to operate that controller", "Printer or network driver"],
          ],
        },
      },
      {
        title: "Device Registers and I/O Addressing",
        paragraphs: [
          "A Device Controller normally exposes registers that the Device Driver can read or write.",
        ],
        dataTable: {
          headers: ["Register", "Purpose", "Example"],
          rows: [
            ["Control", "Starts or configures an operation", "Begin a disk read"],
            ["Status", "Reports ready, busy, complete, or error", "Check whether a device is ready"],
            ["Data", "Carries a small piece of input or output data", "Read one received byte"],
          ],
        },
        table: {
          headers: ["Memory-Mapped I/O", "Port-Mapped I/O"],
          rows: [
            ["Device registers use normal memory addresses", "Device registers use a separate I/O address space"],
            ["Normal load and store instructions can access them", "Special I/O instructions are used"],
            ["Common on many modern architectures", "Commonly associated with x86-style I/O ports"],
          ],
        },
      },
      {
        title: "Programmed I/O and Polling",
        paragraphs: [
          "In Programmed I/O, the CPU executes instructions that move data between a Device Controller register and memory. The CPU is directly involved in the transfer.",
          "Polling is one way the CPU checks device progress: it repeatedly reads a status register until the device becomes ready or finishes.",
          "Simple busy Polling keeps checking in a loop and consumes CPU time. It can still be useful when the expected wait is extremely short and interrupt overhead would cost more than waiting.",
        ],
        points: [
          "The CPU sends an I/O command.",
          "The CPU repeatedly checks the device status.",
          "When the status changes to ready or complete, the CPU handles the result.",
        ],
      },
      {
        title: "Interrupt-Driven I/O",
        paragraphs: [
          "With Interrupt-Driven I/O, the CPU starts the operation and continues other work. The device controller sends an Interrupt when it needs attention or finishes the operation.",
          "The CPU saves enough of its current state, runs an Interrupt Service Routine (ISR), and then resumes the interrupted work. Interrupts avoid constant checking, but handling each Interrupt has a cost.",
        ],
        points: [
          "The CPU starts the I/O operation.",
          "The CPU continues other useful work.",
          "The controller sends an Interrupt.",
          "The ISR handles the event or completion.",
          "The CPU resumes its previous work.",
        ],
      },
      {
        title: "Direct Memory Access - DMA",
        paragraphs: [
          "For a large transfer, making the CPU copy every byte or word is inefficient. DMA allows a DMA-capable controller to transfer a block of data directly between an I/O device and RAM.",
          "The CPU sets the memory address, transfer size, direction, and device information. It can then perform other work. When the transfer completes, the controller commonly sends an Interrupt.",
        ],
        visual: {
          src: "/notes/operating-systems/dma-transfer.png",
          alt: "CPU configuring a DMA Controller, the DMA Controller transferring a block directly between an I/O device and RAM, and an Interrupt notifying the CPU after completion.",
          width: 1536,
          height: 1024,
          caption:
            "The CPU sets up the transfer; DMA moves the block and reports completion.",
        },
        points: [
          "The CPU configures the DMA transfer.",
          "The DMA Controller transfers data between the device and RAM.",
          "The CPU performs other work during the transfer.",
          "The controller sends an Interrupt when the transfer finishes.",
        ],
      },
      {
        title: "Cycle Stealing and Bus Contention",
        paragraphs: [
          "The CPU and DMA Controller may both need the memory bus. The DMA Controller must receive bus access before it can read or write RAM.",
          "In Cycle Stealing, DMA uses the bus for one or more transfer cycles and temporarily delays CPU memory access. This reduces CPU copying, but DMA can still slow the CPU when both need memory heavily.",
        ],
        points: [
          "DMA does not make memory access free.",
          "The DMA Controller and CPU may compete for the memory bus.",
          "Bus arbitration decides which requester gets access.",
          "Large transfers benefit from DMA despite setup and bus costs.",
        ],
      },
      {
        title: "Polling vs Interrupts vs DMA",
        paragraphs: [
          "These methods solve related but different problems. Polling and Interrupts mainly decide how the CPU learns the device state. DMA decides who moves a block of data. A DMA transfer commonly ends with an Interrupt.",
        ],
        visual: {
          src: "/notes/operating-systems/io-methods-comparison.png",
          alt: "Comparison of Polling where the CPU repeatedly checks a device, Interrupt-Driven I/O where the device notifies the CPU, and DMA where a controller transfers data between a device and RAM before interrupting the CPU.",
          width: 1536,
          height: 1024,
          caption:
            "Polling checks, Interrupts notify, and DMA moves blocks with limited CPU involvement.",
        },
        dataTable: {
          headers: ["Method", "CPU involvement", "Good fit"],
          rows: [
            ["Polling", "Repeatedly checks status", "Very short or simple waits"],
            ["Interrupt-Driven I/O", "Starts work and handles an Interrupt later", "Unpredictable or slower events"],
            ["DMA", "Sets up the block transfer and handles completion", "Large, high-speed data transfers"],
          ],
        },
      },
      {
        title: "When to Use Each Method",
        paragraphs: [
          "The best choice depends on transfer size, expected waiting time, device speed, and hardware support.",
        ],
        points: [
          "Use Polling when the expected wait is extremely short or the system is very simple.",
          "Use Interrupts when events are occasional or unpredictable and the CPU should continue other work.",
          "Use DMA for large blocks from devices such as storage, network, and graphics hardware.",
          "For small transfers, DMA setup may cost more than a simpler method.",
        ],
      },
      {
        title: "Main Trade-Offs",
        paragraphs: [
          "The I/O System improves safety and efficiency, but every layer and notification adds some work.",
        ],
        table: {
          headers: ["Benefits", "Costs"],
          rows: [
            ["Applications do not need device-specific hardware logic", "Drivers and controllers add complexity"],
            ["Interrupts reduce constant status checking", "Too many Interrupts can reduce performance"],
            ["DMA reduces CPU copying for large transfers", "DMA requires setup and can compete with the CPU for the memory bus"],
            ["The OS protects and coordinates device access", "A faulty driver can affect the whole system"],
          ],
        },
      },
      {
        title: "Key Points",
        paragraphs: [
          "Remember the role of each layer and the main job of each I/O method.",
        ],
        points: [
          "Application → OS → Device Driver → Device Controller → I/O Device.",
          "Device Driver = Software; Device Controller = Hardware.",
          "Polling = CPU repeatedly checks device status.",
          "Programmed I/O = CPU instructions move the data; Polling = CPU repeatedly checks status.",
          "Interrupt = Device notifies the CPU when attention is needed.",
          "DMA = Controller transfers a block between a device and RAM.",
          "DMA commonly uses an Interrupt to report completion.",
          "Memory-Mapped I/O uses memory addresses; Port-Mapped I/O uses a separate I/O address space.",
          "Cycle Stealing lets DMA use memory-bus cycles and may briefly delay the CPU.",
        ],
      },
    ],
    mechanism: {
      title: "Completing an I/O request",
      steps: [
        "The application makes an I/O System Call.",
        "The OS validates the request and calls the Device Driver.",
        "The driver programs the Device Controller.",
        "The controller performs or coordinates the transfer.",
        "Polling or an Interrupt reports the device state.",
        "The OS returns the result to the application.",
      ],
    },
    example: {
      title: "Reading a large file",
      body: "The application asks the OS to read data. The storage driver configures the controller and a DMA transfer moves a block into RAM. The CPU does other work until an Interrupt reports completion.",
    },
    misconception:
      "DMA does not remove Interrupts. DMA moves the data block with limited CPU involvement and commonly uses an Interrupt to report completion.",
  },
  revise: {
    definitionLabel: "Overview",
    compactDefinition: true,
    definition:
      "The I/O System manages communication between applications and hardware devices through the Operating System. Main flow: Application → OS → Device Driver → Device Controller → I/O Device.",
    sections: [
      {
        title: "I/O Path",
        visual: {
          src: "/notes/operating-systems/io-request-path.png",
          alt: "I/O request moving from an Application through the Operating System, Device Driver, and Device Controller to an I/O Device.",
          width: 1536,
          height: 1024,
          caption:
            "The OS and driver hide device-specific hardware details from the application.",
        },
        points: [
          "Device Driver: OS software that operates a controller.",
          "Device Controller: Hardware that controls the device.",
          "Controller registers: Control, Status, and Data.",
        ],
      },
      {
        title: "Programmed I/O, Polling, Interrupts, and DMA",
        dataTable: {
          headers: ["Concept", "Main job", "Main cost"],
          rows: [
            ["Programmed I/O", "CPU instructions move data", "High CPU involvement"],
            ["Polling", "CPU repeatedly checks status", "Busy waiting"],
            ["Interrupts", "Device notifies the CPU", "Interrupt-handling overhead"],
            ["DMA", "Controller moves a large block", "Setup and memory-bus contention"],
          ],
        },
      },
      {
        title: "I/O Addressing and DMA",
        table: {
          headers: ["Memory-Mapped I/O", "Port-Mapped I/O"],
          rows: [
            ["Registers use memory addresses", "Registers use a separate I/O address space"],
            ["Uses load and store instructions", "Uses special I/O instructions"],
          ],
        },
        paragraphs: [
          "Cycle Stealing means DMA temporarily uses memory-bus cycles and may delay CPU memory access.",
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Application → OS → Device Driver → Device Controller → I/O Device.",
      "Device Driver = Software; Device Controller = Hardware.",
      "Programmed I/O moves data with CPU instructions; Polling checks status.",
      "Interrupts notify; DMA moves large data blocks.",
      "DMA commonly uses an Interrupt to report completion.",
      "MMIO uses memory addresses; Port-Mapped I/O uses separate I/O addresses.",
    ],
    followUp: "Why can DMA still use an Interrupt?",
  },
  lastMinute: {
    definition:
      "The I/O System manages communication between applications and hardware devices through the Operating System.",
    sections: [
      {
        title: "I/O Flow",
        flow: [
          "Application",
          "Operating System",
          "Device Driver",
          "Device Controller",
          "I/O Device",
        ],
        wide: true,
      },
      {
        title: "Components",
        points: [
          "I/O Device: Actual hardware, such as a Keyboard, SSD, or Printer.",
          "Device Controller: Hardware that controls the device.",
          "Device Driver: Software that allows the OS to communicate with the controller.",
        ],
        wide: true,
      },
      {
        title: "Polling",
        points: [
          "The CPU repeatedly checks device status.",
          "Busy Polling keeps the CPU waiting and is inefficient for long waits.",
          "Useful for very short waits or simple devices.",
        ],
      },
      {
        title: "Interrupt-Driven I/O",
        points: [
          "The device sends an Interrupt when it needs attention or completes its work.",
          "The CPU can perform other work while waiting.",
          "Avoids continuous status checking.",
        ],
      },
      {
        title: "Direct Memory Access - DMA",
        points: [
          "A DMA-capable controller transfers a block between RAM and the I/O Device.",
          "The CPU mainly starts the transfer and handles completion.",
          "Best suited to large data transfers.",
        ],
      },
    ],
    cuesLabel: "Key Points",
    cues: [
      "Basic flow: Application → OS → Device Driver → Device Controller → I/O Device.",
      "Polling: CPU repeatedly checks the device.",
      "Interrupts: Device notifies the CPU when attention is needed.",
      "DMA: Controller transfers a block with limited CPU involvement.",
      "Polling suits very short waits; Interrupts suit unpredictable events; DMA suits large transfers.",
      "Memory-Mapped I/O uses memory addresses; Port-Mapped I/O uses a separate I/O address space.",
      "Cycle Stealing means DMA may briefly delay the CPU while using the memory bus.",
    ],
    memoryLineLabel: "Remember This",
    memoryLine: "Polling checks. Interrupts notify. DMA moves blocks.",
    memoryLineAtEnd: true,
    trap:
      "Polling, Interrupts, and DMA do not form one universal performance ranking. DMA commonly uses an Interrupt to report completion.",
  },
};

export { ioSystemsDetailed };
