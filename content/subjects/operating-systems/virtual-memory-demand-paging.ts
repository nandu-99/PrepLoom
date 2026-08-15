import type { SubjectTopic } from "@/lib/subject-content";

const virtualMemoryDemandPagingDetailed: SubjectTopic = {
  slug: "virtual-memory",
  title: "Virtual Memory and Demand Paging",
  description:
    "Use virtual address spaces and load Pages into RAM only when they are needed.",
  readTime: "Detailed note",
  difficulty: "Intermediate",
  tags: ["Virtual Memory", "Demand Paging", "Page Fault"],
  learn: {
    opening:
      "Virtual Memory gives each process its own large address space, while Demand Paging loads a Page into RAM only when the process needs it.",
    sections: [
      {
        title: "Overview",
        paragraphs: [
          "A program does not need every part of its address space in RAM at the same time. Some code may never run, and some data may not be used until much later.",
          "Virtual Memory lets the Operating System keep the currently needed Pages in RAM and obtain other valid Pages when they are accessed.",
          "Demand Paging is the common technique of loading a Page only when a process first tries to use it.",
        ],
      },
      {
        title: "Why It Matters",
        paragraphs: [
          "Suppose a game contains 8 GB of code and assets, but the player is only using the main menu. Loading everything immediately would waste RAM.",
          "Demand Paging can load the Pages needed for the menu first. Pages for settings, later levels, or multiplayer can be loaded when the user opens those parts.",
        ],
        points: [
          "Uses RAM for Pages that are currently useful.",
          "Lets more processes keep active Pages in memory.",
          "Can reduce initial loading work.",
          "Provides a separate protected address space for each process.",
        ],
      },
      {
        title: "Core Concept",
        paragraphs: [
          "A process uses Virtual Addresses. The MMU and Page Tables translate those addresses to physical Frames in RAM.",
          "A Page Table Entry records whether a Page is currently present in RAM. A valid Page that is not present may be obtained from a file, swap space, or another source managed by the OS.",
          "Not every Virtual Page must already have a permanent copy on disk. Some Pages come from executable files, some use swap, and some can be created as zero-filled memory when first used.",
        ],
        visual: {
          src: "/notes/operating-systems/virtual-memory-pages.png",
          alt: "Four Virtual Pages with Page Table entries showing Pages 0 and 2 present in RAM Frames 5 and 12, while Pages 1 and 3 are not present and remain in backing store.",
          width: 1536,
          height: 1024,
          caption: "Only the required Pages need to be resident in RAM.",
        },
      },
      {
        title: "Virtual Memory",
        paragraphs: [
          "Virtual Memory is the address space seen by a process. It is separate from the actual arrangement and amount of physical RAM.",
          "The OS maps Virtual Pages to physical Frames, protects one process from another, and may map files or shared libraries into the address space.",
          "A program can have a virtual address space larger than RAM, but it still needs enough RAM for its active working set and enough available backing resources to run well.",
        ],
        dataTable: {
          headers: ["Virtual Memory", "Physical Memory"],
          rows: [
            [
              "Address space seen by a process",
              "Actual RAM installed in the computer",
            ],
            ["May be larger than RAM", "Limited by available hardware"],
            ["Uses Virtual Addresses", "Uses Physical Addresses"],
            [
              "Managed through mappings and Page Tables",
              "Holds resident Pages in Frames",
            ],
          ],
        },
      },
      {
        title: "Demand Paging",
        paragraphs: [
          "Demand Paging keeps a valid Page outside RAM until the process accesses it.",
          "If the Page is already present, the memory access continues normally. If the Page is valid but not present, hardware raises a Page Fault so the OS can make it available.",
        ],
        visual: {
          src: "/notes/operating-systems/demand-paging-flow.png",
          alt: "CPU requests Page 5, checks its Page Table entry, accesses RAM when present, or raises a Page Fault and loads Page 5 from backing store when absent.",
          width: 1536,
          height: 1024,
          caption:
            "A non-present Page is loaded only when the process requests it.",
        },
      },
      {
        title: "How Demand Paging Works",
        paragraphs: [
          "The Present bit in the Page Table Entry tells hardware whether the mapping currently points to a Frame in RAM.",
        ],
        points: [
          "The process starts with only the required Pages resident in RAM.",
          "The CPU generates an address for another Page.",
          "Hardware checks the TLB and Page Table entry.",
          "If the Page is present, the CPU accesses its Frame.",
          "If a valid Page is not present, a Page Fault transfers control to the OS.",
          "The OS makes the Page resident, updates the mapping, and restarts the interrupted instruction.",
        ],
      },
      {
        title: "Page Fault",
        paragraphs: [
          "A Page Fault is an exception raised during a memory access. It does not automatically mean the program has crashed.",
          "A normal Demand Paging fault happens when the address is valid but the Page is not currently resident. The OS can load or create the Page and continue the process.",
          "A fault may also happen because an address is invalid, a write is made to a read-only Page, or Copy-on-Write needs to create a private Page. The OS handles each cause differently.",
        ],
        dataTable: {
          headers: ["Fault reason", "OS action", "Can execution continue?"],
          rows: [
            [
              "Valid Page is not resident",
              "Load or create the Page",
              "Usually yes",
            ],
            ["Copy-on-Write", "Create a private writable copy", "Usually yes"],
            [
              "Invalid address",
              "Reject the access and notify the process",
              "Usually no",
            ],
            [
              "Forbidden access",
              "Reject or handle according to the mapping",
              "Depends on the cause",
            ],
          ],
        },
      },
      {
        title: "Page Fault Handling",
        paragraphs: [
          "When a valid non-present Page is accessed, the OS performs these steps.",
        ],
        points: [
          "Hardware detects that the Page is not present and raises a Page Fault.",
          "The OS checks whether the address and requested access are valid.",
          "The OS finds the Page's source, such as an executable file, mapped file, or swap space.",
          "It obtains a free Frame. If none is available, a Page Replacement algorithm chooses a victim Page.",
          "A dirty victim Page is written back if required.",
          "The required Page is read or created in the selected Frame.",
          "The OS updates the Page Table and any affected TLB entry.",
          "The interrupted instruction is restarted and the process continues.",
        ],
      },
      {
        title: "Minor and Major Page Faults",
        paragraphs: [
          "Operating Systems often separate Page Faults by whether storage input/output is required. Exact names and accounting can differ between systems.",
        ],
        table: {
          headers: ["Minor Page Fault", "Major Page Fault"],
          rows: [
            ["No storage read is required", "Storage input/output is required"],
            [
              "Page may already exist elsewhere in RAM or be created without reading storage",
              "Page must be read from a file or swap",
            ],
            ["Usually much faster", "Usually much slower"],
          ],
        },
      },
      {
        title: "Locality of Reference",
        paragraphs: [
          "Programs usually use a small group of Pages repeatedly for some period. This active group is often called the working set.",
          "Locality lets the OS keep useful Pages in RAM instead of loading the entire address space.",
        ],
        visual: {
          src: "/notes/operating-systems/virtual-memory-locality.png",
          alt: "Temporal Locality shown by repeated access to the same address A over time, and Spatial Locality shown by sequential access to nearby addresses 100 through 103.",
          width: 1536,
          height: 1024,
          caption:
            "Programs tend to reuse recent addresses and access nearby addresses.",
        },
      },
      {
        title: "Types of Locality",
        paragraphs: [
          "Two forms of Locality are especially important for Virtual Memory and caches.",
        ],
        table: {
          headers: ["Temporal Locality", "Spatial Locality"],
          rows: [
            [
              "Recently used data is likely to be used again",
              "Nearby addresses are likely to be used soon",
            ],
            [
              "Example: a loop repeatedly reads the same variable",
              "Example: an array is read in order",
            ],
          ],
        },
      },
      {
        title: "Copy-on-Write (COW)",
        paragraphs: [
          "Copy-on-Write lets processes temporarily share the same physical Pages instead of copying them immediately.",
          "The shared Pages are marked read-only. When one process tries to write, a Page Fault lets the OS create a private writable copy for that process. Pages that are never modified remain shared.",
          "Unix-like systems commonly use Copy-on-Write with fork(), making process creation faster and reducing unnecessary memory copying.",
        ],
        visual: {
          src: "/notes/operating-systems/virtual-memory-copy-on-write.png",
          alt: "Before a write, Parent and Child share one read-only Page. After the Child writes, the Parent keeps the original Page and the Child receives a private writable Page copy.",
          width: 1536,
          height: 1024,
          caption:
            "A private copy is created only for the Page that is written.",
        },
      },
      {
        title: "Benefits and Costs",
        paragraphs: [
          "Virtual Memory improves flexibility and isolation, but a missing Page can be expensive to retrieve.",
        ],
        table: {
          headers: ["Benefits", "Costs"],
          rows: [
            [
              "Processes get separate protected address spaces",
              "Page Tables and translation use memory and CPU time",
            ],
            ["Only needed Pages must occupy RAM", "Major Page Faults are slow"],
            [
              "Large programs can run when their active working set fits",
              "Too many active Pages can create memory pressure",
            ],
            [
              "Copy-on-Write avoids immediate copying",
              "Fault handling pauses the process",
            ],
          ],
        },
      },
    ],
    mechanism: {
      title: "Handling a valid missing Page",
      steps: [
        "The CPU accesses a Virtual Address.",
        "Hardware finds that the Page is not present and raises a Page Fault.",
        "The OS validates the address and access type.",
        "The OS obtains a Frame and loads or creates the Page.",
        "The Page Table and TLB state are updated.",
        "The interrupted instruction restarts.",
      ],
    },
    example: {
      title: "Opening a game menu",
      body: "The process starts with Pages needed for the main menu. When the player opens multiplayer, the first access to a required non-resident Page causes a Page Fault. The OS loads that Page, updates its mapping, and restarts the instruction.",
    },
    misconception:
      "A Page Fault is not automatically an error. Valid non-present Pages and Copy-on-Write both use Page Faults as part of normal execution.",
  },
  revise: {
    definitionLabel: "Overview",
    compactDefinition: true,
    definition:
      "Virtual Memory allows a process to use an address space that can be larger than physical memory. Demand Paging loads a Page into RAM only when it is needed.",
    sections: [
      {
        title: "Core Concept",
        points: [
          "Frequently used Pages remain in RAM.",
          "Other valid Pages may come from an executable file, a mapped file, swap space, or zero-filled memory.",
          "A Page is made available in RAM when the process needs it.",
        ],
        visual: {
          src: "/notes/operating-systems/demand-paging-flow.png",
          alt: "CPU requests Page 5, checks its Page Table entry, accesses RAM when present, or raises a Page Fault and loads the Page from backing storage when absent.",
          width: 1536,
          height: 1024,
          caption:
            "Demand Paging loads a valid missing Page when it is requested.",
        },
      },
      {
        title: "When the CPU Requests a Page",
        table: {
          headers: ["Page is present", "Page is not present"],
          rows: [
            ["Access RAM normally", "Raise a Page Fault"],
            ["Continue execution", "Validate the access"],
            [
              "No OS fault handling",
              "Load or create the Page, update the Page Table, and restart",
            ],
          ],
        },
      },
      {
        title: "Virtual Memory and Demand Paging",
        points: [
          "Virtual Memory gives each process its own protected address space.",
          "Its Pages may be mapped to RAM, files, swap space, or created when first used.",
          "Demand Paging makes a Page resident only when it is needed.",
        ],
      },
      {
        title: "Page Fault Handling",
        flow: [
          "Detect the Page Fault",
          "Validate the address and access type",
          "Find the Page source",
          "Get a free Frame or replace another Page",
          "Load or create the Page",
          "Update the Page Table",
          "Restart the interrupted instruction",
        ],
      },
      {
        title: "Locality of Reference",
        table: {
          headers: ["Temporal Locality", "Spatial Locality"],
          rows: [
            [
              "Recently used data is likely to be used again.",
              "Nearby memory locations are likely to be used soon.",
            ],
          ],
        },
      },
      {
        title: "Copy-on-Write (COW)",
        points: [
          "Parent and Child initially share the same read-only Pages.",
          "The OS creates a private copy only when one process writes to a shared Page.",
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Virtual Memory can provide an address space larger than physical RAM.",
      "Demand Paging loads Pages only when they are needed.",
      "A normal Page Fault can load or create a valid missing Page and continue execution.",
      "An invalid address or forbidden access may end the process instead.",
      "Temporal Locality means reusing recent data; Spatial Locality means using nearby data.",
      "Copy-on-Write creates a private Page only when a shared Page is modified.",
      "Too many Page Faults can cause Thrashing.",
    ],
    followUp:
      "Why can the OS restart an instruction after handling a Page Fault?",
  },
  lastMinute: {
    definition:
      "Virtual Memory allows a process to use an address space that can be larger than RAM. Demand Paging loads Pages only when they are needed.",
    sections: [
      {
        title: "Working",
        points: [
          "Present Page → Access RAM and continue.",
          "Valid missing Page → Page Fault → Load or create Page → Update Page Table → Restart.",
          "Invalid address or forbidden access → The OS may terminate the process.",
        ],
        wide: true,
      },
      {
        title: "Remember This",
        points: [
          "Virtual Memory: Gives a process a large protected address space and may use RAM plus backing storage.",
          "Demand Paging: Makes a Page resident only when required.",
          "Page Fault: Happens when a memory access needs OS handling. A valid missing Page can be made available and execution can continue.",
          "Temporal Locality: Recently used data is likely to be used again.",
          "Spatial Locality: Nearby memory locations are likely to be accessed soon.",
          "Copy-on-Write: Parent and Child share Pages until one process writes, then the OS creates a private copy.",
        ],
        wide: true,
      },
    ],
    cuesLabel: "Key Points",
    cues: [
      "Demand Paging improves memory use by loading Pages on demand.",
      "Page Fault handling: Detect → Validate → Load or create Page → Update Page Table → Restart instruction.",
      "Locality of Reference makes Virtual Memory efficient.",
      "Copy-on-Write avoids unnecessary memory copying.",
      "A valid missing Page can continue after handling; an invalid access may end the process.",
    ],
    memoryLineLabel: "Remember This",
    memoryLine:
      "Page present → Execute. Valid Page missing → Page Fault, make it resident, restart.",
    memoryLineAtEnd: true,
    trap: "A Page Fault is not automatically a crash, and a missing Page does not always need to be read from disk.",
  },
};

export { virtualMemoryDemandPagingDetailed };
