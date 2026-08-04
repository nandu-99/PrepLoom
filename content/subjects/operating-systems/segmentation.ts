import type { SubjectTopic } from "@/lib/subject-content";

const segmentationDetailed: SubjectTopic = {
  slug: "segmentation",
  title: "Segmentation",
  description:
    "Organize a program into variable-sized logical Segments and translate addresses using Base and Limit.",
  readTime: "Detailed note",
  difficulty: "Intermediate",
  tags: ["Segmentation", "Segment Table", "Address Translation"],
  learn: {
    opening:
      "Segmentation divides a program into variable-sized logical units such as Code, Data, Heap, and Stack.",
    sections: [
      {
        title: "Overview",
        paragraphs: [
          "Paging divides memory into fixed-size Pages without considering the logical parts of a program.",
          "Programs are naturally made of different parts, such as Code, Data, Heap, and Stack. Segmentation keeps these parts as separate variable-sized Segments.",
        ],
      },
      {
        title: "Why It Matters",
        paragraphs: [
          "Each part of a program has a different purpose and size. Code may need Execute permission, Data may need Read and Write permission, and the Stack may grow while the program runs.",
          "Keeping these parts as separate Segments makes logical protection and sharing easier. For example, two processes may share a read-only Code Segment while keeping their Data Segments separate.",
        ],
      },
      {
        title: "Core Concept",
        paragraphs: [
          "A Segment is a variable-sized logical part of a program. Different Segments may have different sizes and may be placed in different physical-memory locations.",
          "In pure Segmentation, each Segment occupies one continuous physical-memory region. The Segments of the same process do not need to be next to one another.",
        ],
        visual: {
          src: "/notes/operating-systems/segmentation-logical-to-physical.png",
          alt: "A logical program divided into variable-sized Code, Data, Heap, and Stack Segments mapped to separate non-adjacent regions of physical memory.",
          width: 1536,
          height: 1024,
          caption:
            "Segments follow the program's logical structure and may occupy separate physical-memory regions.",
        },
      },
      {
        title: "Segments",
        paragraphs: [
          "A Segment stores one logical part of a program. Its size depends on what that part needs, so Segments are not required to have equal sizes.",
        ],
        dataTable: {
          headers: ["Segment", "Purpose", "Example size"],
          rows: [
            ["Code", "Program instructions", "40 KB"],
            ["Data", "Global and static data", "20 KB"],
            ["Heap", "Dynamically allocated memory", "30 KB"],
            ["Stack", "Function calls and local variables", "10 KB"],
          ],
        },
      },
      {
        title: "Segment Table",
        paragraphs: [
          "Each process has a Segment Table. The Segment Number is used as an index to select a Segment Table Entry.",
          "A Segment Table Entry normally stores the Base Address, Limit, and protection information for that Segment.",
        ],
        dataTable: {
          headers: ["Field", "Meaning", "Use"],
          rows: [
            ["Base", "Starting physical address of the Segment", "Finds where the Segment begins"],
            ["Limit", "Length of the Segment", "Checks whether the Offset is valid"],
            ["Protection", "Read, Write, and Execute permissions", "Controls allowed access"],
          ],
        },
      },
      {
        title: "Base and Limit",
        paragraphs: [
          "Base is the starting physical address of a Segment. Limit is the Segment's size, not its final address.",
          "If Base is 4000 and Limit is 1000 bytes, valid Offsets are 0 through 999. The valid physical addresses are 4000 through 4999.",
        ],
        visual: {
          src: "/notes/operating-systems/segmentation-base-limit.png",
          alt: "Segment 1 with Base 4000 and Limit 1000 bytes, showing valid Offsets 0 to 999 and valid physical addresses 4000 to 4999.",
          width: 1536,
          height: 1024,
          caption:
            "Base gives the starting address; Limit gives the Segment size.",
        },
      },
      {
        title: "Logical Address",
        paragraphs: [
          "A logical address in Segmentation has two parts: Segment Number and Offset.",
          "The Segment Number selects the Segment Table Entry. The Offset identifies a location inside that Segment.",
        ],
        table: {
          headers: ["Segment Number", "Offset"],
          rows: [
            ["Selects a Segment Table Entry", "Selects a byte inside the Segment"],
            ["Finds Base and Limit", "Must be smaller than Limit"],
          ],
        },
      },
      {
        title: "Address Translation",
        paragraphs: [
          "The hardware first checks that the Segment Number refers to a valid Segment Table Entry. It then compares the Offset with the Segment Limit.",
          "If Offset is smaller than Limit, the physical address is Base + Offset. If the Offset is outside the Segment, the access is rejected.",
        ],
        visual: {
          src: "/notes/operating-systems/segmentation-address-translation.png",
          alt: "A logical address split into Segment Number and Offset, followed through a Segment Table and an Offset less than Limit check to either Base plus Offset or Invalid Memory Access.",
          width: 1536,
          height: 1024,
          caption:
            "The Limit check happens before Base and Offset are added.",
        },
      },
      {
        title: "Step-by-Step Address Translation",
        paragraphs: [
          "The Segment Table provides both the location and the valid size of the selected Segment.",
        ],
        points: [
          "The CPU generates a Segment Number and Offset.",
          "The Segment Number selects an entry in the Segment Table.",
          "The entry provides Base, Limit, and protection information.",
          "Hardware checks that Offset < Limit and that the requested access is allowed.",
          "If valid, Physical Address = Base + Offset.",
          "If invalid, the hardware raises a memory-protection exception.",
        ],
      },
      {
        title: "Translation Example",
        paragraphs: [
          "Suppose Segment 2 has Base = 8000 and Limit = 500 bytes.",
        ],
        dataTable: {
          headers: ["Logical address", "Limit check", "Result"],
          rows: [
            ["(2, 120)", "120 < 500", "Physical Address = 8000 + 120 = 8120"],
            ["(2, 700)", "700 is not < 500", "Invalid memory access"],
          ],
        },
      },
      {
        title: "Segmentation Fault",
        paragraphs: [
          "A process may try to use an Offset outside a Segment, use an invalid Segment, or perform an action that its permissions do not allow. The hardware then raises an exception so the Operating System can stop or handle the access.",
          "On Unix-like systems, an invalid memory access may cause the process to receive SIGSEGV, commonly called a segmentation fault.",
          "The name can be misleading: on modern systems, SIGSEGV may also come from paging or protection checks. It does not always mean that hardware Segmentation caused the problem.",
        ],
      },
      {
        title: "Protection and Sharing",
        paragraphs: [
          "Segmentation allows permissions to be set for each logical part of a program.",
        ],
        points: [
          "Code Segment: Read and Execute, but normally not Write.",
          "Data and Heap Segments: Read and Write.",
          "Shared Code Segment: Several processes may use the same read-only code.",
          "Private Data Segment: Each process keeps its own writable data.",
        ],
      },
      {
        title: "External Fragmentation",
        paragraphs: [
          "Pure Segmentation places variable-sized Segments into continuous physical-memory blocks. As Segments are created and removed, free memory can become split into small gaps.",
          "This is External Fragmentation. Compaction can combine the gaps, but moving Segments costs time and requires address relocation support.",
        ],
      },
      {
        title: "Paging vs Segmentation",
        paragraphs: [
          "Paging and Segmentation divide memory for different reasons.",
        ],
        dataTable: {
          headers: ["Feature", "Paging", "Segmentation"],
          rows: [
            ["Unit size", "Fixed-size Pages", "Variable-sized Segments"],
            ["View", "Memory-management blocks", "Logical program parts"],
            ["Logical address", "Page Number + Offset", "Segment Number + Offset"],
            ["Mapping data", "Page Table stores Frame Number", "Segment Table stores Base and Limit"],
            ["Fragmentation", "No External Fragmentation between Frames; possible Internal Fragmentation", "Possible External Fragmentation"],
            ["Protection and sharing", "Possible per Page", "Natural per logical Segment"],
          ],
        },
      },
      {
        title: "Segmentation with Paging",
        paragraphs: [
          "Segmentation with Paging keeps the program's logical Segments, but divides each Segment into fixed-size Pages.",
          "The Segment Number selects the Segment's Page Table. A Page Number selects a Page Table Entry, and that entry gives the physical Frame. The Offset selects the byte inside the Frame.",
          "Because the Pages of a Segment can use non-adjacent Frames, the entire Segment no longer needs one continuous physical-memory block. This removes the External Fragmentation caused by pure Segmentation, although the final Page of a Segment may contain Internal Fragmentation.",
        ],
        visual: {
          src: "/notes/operating-systems/segmentation-with-paging.png",
          alt: "A program divided into Code, Data, and Stack Segments, each split into Pages that map through Page Tables to non-adjacent physical Frames.",
          width: 1536,
          height: 1024,
          caption:
            "Segmentation provides logical structure; Paging provides non-contiguous physical allocation.",
        },
      },
      {
        title: "Modern Systems Note",
        paragraphs: [
          "Segmentation is important for understanding memory protection and older or specialized architectures.",
          "Many modern 64-bit general-purpose systems mainly use Paging with a flat virtual address space. For example, x86-64 keeps only limited uses of hardware Segmentation and relies mainly on Paging for normal memory translation and protection.",
          "Therefore, do not assume that every modern Operating System uses full logical Segmentation together with Paging.",
        ],
      },
      {
        title: "Main Trade-Offs",
        paragraphs: [
          "Segmentation matches the logical structure of a program, but variable-sized physical allocation adds management cost.",
        ],
        table: {
          headers: ["Advantages", "Disadvantages"],
          rows: [
            ["Natural logical organization", "Pure Segmentation can cause External Fragmentation"],
            ["Per-Segment protection", "Allocation and compaction are more complex"],
            ["Easy sharing of logical parts such as Code", "Segment Tables and bounds checks add overhead"],
            ["Segments can grow independently", "Segmentation with Paging adds another translation stage"],
          ],
        },
      },
    ],
    mechanism: {
      title: "Translating a Segmented address",
      steps: [
        "Split the logical address into Segment Number and Offset.",
        "Use the Segment Number to select a Segment Table Entry.",
        "Read the Segment's Base, Limit, and permissions.",
        "Check that the Offset is smaller than the Limit and the access is allowed.",
        "Add Base and Offset to form the Physical Address.",
        "Reject the access if a check fails.",
      ],
    },
    example: {
      title: "Segment 2 with Offset 120",
      body: "Segment 2 has Base 8000 and Limit 500. Offset 120 is valid because 120 < 500. The Physical Address is 8000 + 120 = 8120.",
    },
    misconception:
      "A Unix segmentation fault is not proof that hardware Segmentation caused the error. Invalid paging or permission checks can also produce SIGSEGV.",
  },
  revise: {
    definitionLabel: "Overview",
    compactDefinition: true,
    definition:
      "Segmentation divides a program into variable-sized logical units such as Code, Data, Heap, and Stack.",
    sections: [
      {
        title: "Core Concept",
        paragraphs: [
          "A program is divided into logical Segments. Each Segment has its own Base Address, Limit, and protection information.",
        ],
        visual: {
          src: "/notes/operating-systems/segmentation-logical-to-physical.png",
          alt: "A logical program divided into variable-sized Code, Data, Heap, and Stack Segments mapped to separate regions of physical memory.",
          width: 1536,
          height: 1024,
          caption:
            "Each Segment represents one logical part of the program.",
        },
      },
      {
        title: "Step-by-Step Working",
        flow: [
          "CPU generates Segment Number + Offset",
          "Segment Number indexes the Segment Table",
          "Obtain Base, Limit, and permissions",
          "Check Offset < Limit",
          "Physical Address = Base + Offset",
          "Access RAM",
        ],
      },
      {
        title: "Segments and Segment Table",
        points: [
          "Segments are variable-sized logical units.",
          "Common Segments: Code, Data, Heap, and Stack.",
          "Each process has its own Segment Table.",
          "Each Segment Table Entry stores Base, Limit, and protection information.",
        ],
      },
      {
        title: "Base, Limit, and Address Translation",
        points: [
          "Base: Starting physical address of the Segment.",
          "Limit: Size of the Segment.",
          "Logical Address = Segment Number + Offset.",
          "Valid access requires Offset < Limit.",
          "Physical Address = Base + Offset.",
        ],
      },
      {
        title: "Invalid Memory Access",
        paragraphs: [
          "If Offset is greater than or equal to Limit, the hardware rejects the access and raises an exception.",
          "On Unix-like systems, an invalid access may produce SIGSEGV. The OS may deliver the signal to the process; the process normally ends if it does not handle the signal.",
        ],
      },
      {
        title: "Paging vs Segmentation",
        table: {
          headers: ["Paging", "Segmentation"],
          rows: [
            ["Fixed-size Pages", "Variable-sized logical Segments"],
            ["Memory-management division", "Logical program division"],
            ["Removes External Fragmentation between Frames", "Pure Segmentation may cause External Fragmentation"],
            ["Page Number + Offset", "Segment Number + Offset"],
          ],
        },
      },
      {
        title: "Segmentation with Paging",
        paragraphs: [
          "The program is divided into Segments, and each Segment is divided into Pages. This keeps logical organization while allowing non-contiguous physical allocation.",
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Segment = Variable-sized logical program unit.",
      "Segment Table Entry = Base + Limit + Protection.",
      "Offset must be smaller than Limit.",
      "Pure Segmentation may cause External Fragmentation.",
      "SIGSEGV does not always mean hardware Segmentation caused the error.",
    ],
    followUp: "Why must the Offset be checked before adding it to the Base?",
  },
  lastMinute: {
    definition:
      "Segmentation divides a program into variable-sized logical Segments such as Code, Data, Heap, and Stack.",
    sections: [
      {
        title: "Address Translation",
        flow: [
          "CPU generates Segment Number + Offset",
          "Segment Table: Base + Limit",
          "Hardware checks Offset < Limit",
          "Physical Address = Base + Offset",
          "RAM",
        ],
        wide: true,
      },
      {
        title: "Remember This",
        points: [
          "Segments: Code, Data, Heap, and Stack.",
          "Each process has its own Segment Table.",
          "A Segment Table Entry stores Base, Limit, and protection information.",
          "Base: Starting physical address of the Segment.",
          "Limit: Size of the Segment.",
        ],
        wide: true,
      },
    ],
    cuesLabel: "Key Points",
    cues: [
      "Segmentation uses variable-sized logical Segments.",
      "Logical Address = Segment Number + Offset.",
      "Physical Address = Base + Offset, only after checking Offset < Limit.",
      "If Offset ≥ Limit, hardware rejects the access. On Unix-like systems, this may lead to SIGSEGV.",
      "Paging uses fixed-size Pages; Segmentation uses variable-sized logical Segments.",
    ],
    memoryLineLabel: "Remember This",
    memoryLine: "Check Limit first, then calculate Base + Offset.",
    memoryLineAtEnd: true,
    trap:
      "Limit is the Segment size, not the last physical address.",
  },
};

export { segmentationDetailed };
