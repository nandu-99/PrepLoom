import type { SubjectTopic } from "@/lib/subject-content";

const pagingAndAddressTranslation: SubjectTopic = {
  slug: "paging",
  title: "Paging and Address Translation",
  description:
    "Map fixed-size logical pages to physical frames using page tables, the MMU, and the TLB.",
  readTime: "Detailed note",
  difficulty: "Intermediate",
  tags: ["Paging", "Page Table", "TLB"],
  learn: {
    opening:
      "Paging divides logical memory into Pages and physical memory into equal-sized Frames, allowing a process to use non-contiguous locations in RAM.",
    sections: [
      {
        title: "Overview",
        paragraphs: [
          "Contiguous allocation requires one large physical-memory block for each process. Paging removes that requirement by splitting a process into fixed-size Pages.",
          "Each Page may be placed in any free Frame in RAM. The program still sees one continuous logical address space because address translation hides the physical placement.",
          "Paging removes External Fragmentation between allocated frames, but it may still waste space inside the final allocated Page.",
        ],
      },
      {
        title: "Why It Matters",
        paragraphs: [
          "Suppose a process needs 16 KB and the system uses 4 KB Pages. The process needs four Frames, but those Frames do not need to be next to one another.",
          "The OS can use four free Frames from different parts of RAM instead of searching for one continuous 16 KB block.",
        ],
        points: [
          "Allows non-contiguous physical allocation.",
          "Removes External Fragmentation for process Pages.",
          "Makes physical-memory allocation simpler.",
          "Provides the foundation for Virtual Memory.",
        ],
      },
      {
        title: "Core Concept",
        paragraphs: [
          "Logical memory is divided into Pages. Physical memory is divided into Frames of exactly the same size.",
          "A Page Table records the Frame that currently holds each Page.",
        ],
        visual: {
          src: "/notes/operating-systems/paging-pages-to-frames.png",
          alt: "Logical Pages 0 through 3 mapped through a Page Table to non-contiguous physical Frames 5, 2, 8, and 1.",
          width: 1536,
          height: 1024,
          caption:
            "Pages from one process can occupy non-adjacent Frames because the Page Table stores every mapping.",
        },
      },
      {
        title: "Pages and Frames",
        paragraphs: [
          "A Page is a fixed-size block of a process's logical address space. A Frame is a fixed-size block of physical RAM.",
          "Page size and Frame size must be equal, so any Page can fit into any available Frame.",
          "Page sizes are normally powers of two, such as 4 KB, because this lets hardware split an address using bits.",
        ],
        table: {
          headers: ["Page", "Frame"],
          rows: [
            ["Part of logical memory", "Part of physical RAM"],
            ["Belongs to a process", "Can hold any Page of the same size"],
            ["Identified by Page Number", "Identified by Frame Number"],
          ],
        },
      },
      {
        title: "Page Number and Offset",
        paragraphs: [
          "A Logical Address has two parts: a Page Number and an Offset.",
          "The Page Number selects an entry in the Page Table. The Offset selects the exact byte inside that Page.",
          "Address translation changes the Page Number into a Frame Number. The Offset remains unchanged because Pages and Frames have the same size.",
        ],
        dataTable: {
          headers: ["Address part", "Purpose", "During translation"],
          rows: [
            [
              "Page Number",
              "Finds the process Page",
              "Replaced by Frame Number",
            ],
            ["Offset", "Finds the byte inside the Page", "Stays unchanged"],
          ],
        },
      },
      {
        title: "Page Table",
        paragraphs: [
          "A Page Table stores Page Number to Frame Number mappings. Each process normally has its own Page Table because each process has a separate logical address space.",
          "The OS creates and updates Page Tables, while the MMU uses them during translation. A hardware register, often called the Page Table Base Register, identifies the current process's Page Table.",
          "During a context switch, the system changes the active address-space information so the next process uses its own mappings.",
        ],
        dataTable: {
          headers: ["Page", "Frame"],
          rows: [
            ["0", "5"],
            ["1", "2"],
            ["2", "8"],
            ["3", "1"],
          ],
        },
      },
      {
        title: "Frame Table vs Page Table",
        paragraphs: [
          "A Page Table describes one process's Virtual Pages. A Frame Table describes physical RAM for the whole system.",
          "The OS uses the Frame Table to find free Frames and track which process or kernel use owns each allocated Frame. Exact fields depend on the Operating System.",
        ],
        table: {
          headers: ["Page Table", "Frame Table"],
          rows: [
            [
              "Normally one per process",
              "One system-wide physical-memory record",
            ],
            ["Maps Virtual Pages to Frames", "Tracks every physical Frame"],
            [
              "Used for address translation",
              "Used for physical-memory allocation and ownership",
            ],
          ],
        },
      },
      {
        title: "Address Translation",
        paragraphs: [
          "The MMU converts a Logical Address into a Physical Address using the Page Table or a cached TLB entry.",
          "If Page 3 maps to Frame 8 and the Offset is 120, the Physical Address uses Frame 8 with the same Offset 120.",
        ],
        visual: {
          src: "/notes/operating-systems/paging-address-translation.png",
          alt: "Logical Address Page 3 and Offset 120 translated through the Page Table into Physical Address Frame 8 and unchanged Offset 120.",
          width: 1536,
          height: 1024,
          caption:
            "The Page Number is translated into a Frame Number; the Offset does not change.",
        },
      },
      {
        title: "Step-by-Step Address Translation",
        paragraphs: [
          "The same sequence is performed for every translated memory access.",
        ],
        points: [
          "The CPU generates a Logical Address.",
          "Hardware separates the Page Number and Offset.",
          "The Page Number is looked up in the TLB or Page Table.",
          "The matching Frame Number is obtained.",
          "The Frame Number is combined with the unchanged Offset.",
          "RAM is accessed using the Physical Address.",
        ],
      },
      {
        title: "Address Translation Formula",
        paragraphs: [
          "The numerical form is useful for interview questions.",
          "Page Number = Logical Address ÷ Page Size. Offset = Logical Address mod Page Size.",
          "Physical Address = Frame Number × Page Size + Offset.",
        ],
        points: [
          "For a 4 KB Page, the Offset range is 0 to 4095.",
          "A 4 KB Page needs 12 Offset bits because 4 KB = 2^12 bytes.",
          "The remaining address bits form the Page Number.",
        ],
      },
      {
        title: "Address Translation Example",
        paragraphs: [
          "Suppose the Logical Address is 13, the Page size is 8 bytes, and Page 1 maps to Frame 9.",
          "Page Number = 13 ÷ 8 = 1. Offset = 13 mod 8 = 5.",
          "Frame 9 starts at Physical Address 9 × 8 = 72. Final Physical Address = 72 + 5 = 77.",
        ],
        dataTable: {
          headers: ["Value", "Calculation", "Result"],
          rows: [
            ["Page Number", "13 ÷ 8", "1"],
            ["Offset", "13 mod 8", "5"],
            ["Frame Number", "Page Table[1]", "9"],
            ["Physical Address", "9 × 8 + 5", "77"],
          ],
        },
      },
      {
        title: "Page Table Entry (PTE)",
        paragraphs: [
          "Each Page Table row is a Page Table Entry. A PTE stores the Frame Number and control information used for protection, residency, and replacement decisions.",
        ],
        visual: {
          src: "/notes/operating-systems/paging-pte-fields.png",
          alt: "Page Table Entry divided into Frame Number, Present or Valid, Protection, Dirty, and Reference fields.",
          width: 1536,
          height: 1024,
          caption:
            "A PTE stores both the Frame mapping and the status bits needed to manage the Page.",
        },
      },
      {
        title: "Common PTE Fields",
        paragraphs: [
          "Exact field names differ between processor architectures, but these fields are common.",
        ],
        dataTable: {
          headers: ["Field", "Meaning", "Used for"],
          rows: [
            [
              "Frame Number",
              "Physical Frame holding the Page",
              "Address translation",
            ],
            [
              "Present / Valid",
              "Whether the mapping or Page state permits access",
              "Detecting invalid or non-resident access",
            ],
            [
              "Protection",
              "Read, Write, and Execute permissions",
              "Memory protection",
            ],
            [
              "Dirty",
              "Page has been modified",
              "Deciding whether it must be written back",
            ],
            [
              "Reference",
              "Page has been accessed recently",
              "Page-replacement decisions",
            ],
          ],
        },
        points: [
          "Some systems separate Valid and Present into different bits.",
          "A non-present Page may belong to the process but currently be outside RAM.",
          "An invalid address may not belong to the process at all.",
        ],
      },
      {
        title: "Translation Lookaside Buffer (TLB)",
        paragraphs: [
          "A Page Table is normally stored in memory. Reading it before every data access would add extra memory work.",
          "The TLB is a small, fast cache inside the processor's address-translation hardware. It stores recently used Page-to-Frame mappings.",
        ],
        visual: {
          src: "/notes/operating-systems/paging-tlb-lookup.png",
          alt: "TLB lookup flow with a short TLB Hit path and a TLB Miss path that checks the Page Table before either updating the TLB or raising a Page Fault.",
          width: 1536,
          height: 1024,
          caption:
            "A TLB Miss requires another lookup, but it becomes a Page Fault only when the Page is not present.",
        },
      },
      {
        title: "TLB Hit and TLB Miss",
        paragraphs: [
          "A TLB Hit means the required mapping is already cached. The MMU obtains the Frame Number without reading the Page Table from memory.",
          "A TLB Miss means the mapping is not cached. The system checks the Page Table. If the mapping is present, it updates the TLB and continues. If the Page is not present, a Page Fault may occur.",
        ],
        table: {
          headers: ["TLB Hit", "TLB Miss"],
          rows: [
            ["Mapping found in the TLB", "Mapping not found in the TLB"],
            ["No Page Table lookup needed", "Page Table lookup required"],
            ["Faster translation", "Slower than a hit"],
          ],
        },
      },
      {
        title: "TLB During a Context Switch",
        paragraphs: [
          "Different processes can use the same Virtual Page Number for different physical Frames. After a context switch, an old TLB entry must not be used for the new process.",
          "A simple system flushes old TLB entries. Many processors instead tag entries with an Address Space Identifier (ASID), so mappings from different processes can remain in the TLB safely.",
        ],
        table: {
          headers: ["TLB Flush", "ASID"],
          rows: [
            [
              "Invalidate old entries during a switch",
              "Tag each entry with its address space",
            ],
            [
              "Simple but causes new TLB Misses",
              "Keeps safe entries across switches",
            ],
          ],
        },
      },
      {
        title: "TLB Replacement Policies",
        paragraphs: [
          "When the TLB is full, hardware must choose an entry to replace. Common choices include Random, FIFO, and an approximation of LRU.",
          "The exact policy is processor-specific. Hardware often prefers a simple, fast policy over expensive exact tracking.",
        ],
      },
      {
        title: "Effective Access Time (EAT)",
        paragraphs: [
          "Effective Access Time is the average time for address translation and memory access after considering TLB Hits and Misses.",
          "A higher TLB Hit Ratio normally lowers EAT because fewer accesses need a Page Table lookup.",
          "For a simple single-level Page Table with serial TLB lookup: EAT = h(t + m) + (1 - h)(t + 2m), where h is the hit ratio, t is TLB lookup time, and m is one memory-access time.",
          "This formula is a teaching model. Real processors may overlap lookups or use multi-level Page Tables, so their exact timing can differ.",
        ],
        dataTable: {
          headers: ["Given", "Calculation", "Result"],
          rows: [
            [
              "TLB = 10 ns, RAM = 100 ns, hit ratio = 95%",
              "Hit time = 10 + 100",
              "110 ns",
            ],
            [
              "TLB Miss uses one Page Table access",
              "Miss time = 10 + 100 + 100",
              "210 ns",
            ],
            ["Weighted average", "0.95 × 110 + 0.05 × 210", "115 ns"],
          ],
        },
      },
      {
        title: "Page Size Trade-Off",
        paragraphs: [
          "Page size affects both wasted space and Page Table size.",
        ],
        table: {
          headers: ["Smaller Pages", "Larger Pages"],
          rows: [
            [
              "Less average waste in the final Page",
              "More possible waste in the final Page",
            ],
            ["More Page Table entries", "Fewer Page Table entries"],
            [
              "Finer allocation and protection",
              "Can make bulk transfer more efficient",
            ],
          ],
        },
      },
      {
        title: "Main Trade-Offs",
        paragraphs: [
          "Paging improves allocation flexibility, but translation data and lookups add cost.",
        ],
        table: {
          headers: ["Advantages", "Disadvantages"],
          rows: [
            [
              "No External Fragmentation between allocated Frames",
              "Possible Internal Fragmentation in the final Page",
            ],
            [
              "Pages may use non-contiguous Frames",
              "Page Tables consume memory",
            ],
            [
              "Supports protection and Virtual Memory",
              "TLB Misses and translation add overhead",
            ],
          ],
        },
      },
    ],
    mechanism: {
      title: "Translating a logical address",
      steps: [
        "Split the Logical Address into Page Number and Offset.",
        "Search the TLB for the Page mapping.",
        "On a TLB Miss, read the Page Table Entry.",
        "Check that the mapping and requested access are valid.",
        "Replace the Page Number with the Frame Number.",
        "Keep the Offset unchanged and access RAM.",
      ],
    },
    example: {
      title: "Page 3 maps to Frame 8",
      body: "The CPU generates Page 3 with Offset 120. The Page Table says Page 3 is in Frame 8. The MMU forms the Physical Address using Frame 8 and the same Offset 120.",
    },
    misconception:
      "A TLB Miss is not automatically a Page Fault. The mapping may be absent from the TLB but still present in the Page Table and RAM.",
  },
  revise: {
    definitionLabel: "Overview",
    compactDefinition: true,
    definition:
      "Paging divides Logical Memory into Pages and Physical Memory into equal-sized Frames. It allows a process to use non-contiguous physical memory and removes External Fragmentation.",
    sections: [
      {
        title: "Core Concept",
        paragraphs: [
          "The Page Table maps Pages to Frames. The MMU uses that mapping to translate Logical Addresses into Physical Addresses.",
        ],
        visual: {
          src: "/notes/operating-systems/paging-pages-to-frames.png",
          alt: "Logical Pages 0 through 3 mapped through a Page Table to non-contiguous physical Frames 5, 2, 8, and 1.",
          width: 1536,
          height: 1024,
          caption:
            "Pages from one process may occupy non-adjacent Frames in RAM.",
        },
      },
      {
        title: "Step-by-Step Address Translation",
        flow: [
          "CPU generates a Logical Address",
          "Split it into Page Number + Offset",
          "Find the Page in the Page Table or TLB",
          "Obtain the Frame Number",
          "Combine Frame Number + unchanged Offset",
          "Access RAM",
        ],
      },
      {
        title: "Pages, Frames, and Logical Address",
        points: [
          "Page: Fixed-size block of Logical Memory.",
          "Frame: Fixed-size block of Physical Memory.",
          "Page size = Frame size.",
          "Logical Address = Page Number + Offset.",
          "The Offset remains unchanged during translation.",
        ],
      },
      {
        title: "Page Table and PTE",
        points: [
          "The Page Table maps Page Number → Frame Number.",
          "Each process normally has its own Page Table.",
          "A Page Table Entry stores the Frame Number, Present / Valid state, Protection bits, Dirty bit, and Reference bit.",
          "The system-wide Frame Table tracks free, allocated, and owned physical Frames.",
        ],
      },
      {
        title: "TLB Hit vs TLB Miss",
        table: {
          headers: ["TLB Hit", "TLB Miss"],
          rows: [
            ["Mapping found in the TLB", "Mapping not found in the TLB"],
            ["No Page Table lookup needed", "Page Table lookup required"],
            ["Lower access time", "Higher access time than a hit"],
          ],
        },
        paragraphs: [
          "A TLB Miss is not automatically a Page Fault. The required Page may still be present in RAM.",
        ],
      },
      {
        title: "Context Switch and the TLB",
        points: [
          "A process must not use another process's cached translation.",
          "TLB Flush: Remove old mappings during a context switch.",
          "ASID: Tag mappings by address space so safe entries can remain cached.",
        ],
      },
      {
        title: "Effective Access Time (EAT)",
        paragraphs: [
          "For a serial TLB lookup and one-level Page Table: EAT = h(t + m) + (1 - h)(t + 2m).",
          "Example: h = 0.95, t = 10 ns, m = 100 ns → EAT = 115 ns.",
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Page size equals Frame size.",
      "Page Number changes to Frame Number; Offset stays unchanged.",
      "Page Table maps Page Number → Frame Number.",
      "Frame Table tracks physical Frames for the whole system.",
      "TLB caches recently used Page mappings.",
      "Paging removes External Fragmentation but may cause Internal Fragmentation.",
    ],
    followUp: "Why is a TLB Miss not always a Page Fault?",
  },
  lastMinute: {
    definition:
      "Paging divides Logical Memory into Pages and Physical Memory into equal-sized Frames, allowing a process to use non-contiguous physical memory.",
    sections: [
      {
        title: "Address Translation",
        flow: [
          "CPU",
          "Logical Address: Page Number + Offset",
          "Page Table or TLB",
          "Frame Number + unchanged Offset",
          "Physical Address",
          "RAM",
        ],
        wide: true,
      },
      {
        title: "Remember This",
        points: [
          "Page: Fixed-size block of Logical Memory.",
          "Frame: Fixed-size block of Physical Memory.",
          "Page size = Frame size.",
          "Page Table: Maps Page Number → Frame Number; each process normally has its own.",
          "Frame Table: Tracks physical Frames, their status, and ownership for the whole system.",
          "MMU: Translates Logical Address → Physical Address.",
          "TLB: Caches recently used Page → Frame mappings.",
        ],
        wide: true,
      },
    ],
    cuesLabel: "Key Points",
    cues: [
      "Paging removes External Fragmentation but may leave Internal Fragmentation in the final Page.",
      "Page Number → Page Table or TLB → Frame Number; Offset stays unchanged.",
      "Physical Address = Frame Number × Page Size + Offset.",
      "PTE stores Frame Number, Present / Valid state, Protection, Dirty, and Reference bits.",
      "TLB Hit → Mapping found → Faster translation.",
      "TLB Miss → Page Table lookup required → Slower than a hit.",
      "Context switch → Flush old TLB mappings or separate them using an ASID.",
      "EAT = h(t + m) + (1 - h)(t + 2m) for the simple one-level serial-lookup model.",
    ],
    memoryLineLabel: "Remember This",
    memoryLine: "Page changes to Frame. Offset stays the same.",
    memoryLineAtEnd: true,
    trap: "A TLB Miss is not automatically a Page Fault.",
  },
};

export { pagingAndAddressTranslation };
