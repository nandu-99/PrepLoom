import type { SubjectTopic } from "@/lib/subject-content";

const pageTableStructures: SubjectTopic = {
  slug: "page-table-structures",
  title: "Page Table Structures",
  description:
    "Learn how single-level, multilevel, hashed, and inverted Page Tables organize address mappings.",
  readTime: "Detailed note",
  difficulty: "Intermediate",
  tags: ["Page Tables", "Address Translation", "Virtual Memory"],
  learn: {
    opening:
      "Page Table Structures are different ways to store Page-to-Frame mappings while controlling memory use and lookup cost.",
    sections: [
      {
        title: "Overview",
        paragraphs: [
          "Every process needs mappings from its Virtual Pages to physical Frames. A simple Page Table can store these mappings directly, but the table can become very large when the virtual address space is large.",
          "Operating Systems use different Page Table structures to balance memory usage, lookup work, and implementation complexity.",
        ],
      },
      {
        title: "Why Page Table Size Matters",
        paragraphs: [
          "A Page Table also occupies RAM. If every possible Virtual Page has an entry, a process may need a large table even when it uses only a small part of its address space.",
          "For example, a 32-bit address space with 4 KB Pages contains 2^20 Virtual Pages. If one Page Table Entry uses 4 bytes, a full single-level Page Table needs about 4 MB for one process.",
          "The exact size depends on the address size, Page size, and Page Table Entry size. The example only shows why the cost can grow quickly.",
        ],
      },
      {
        title: "Core Concept",
        paragraphs: [
          "All Page Table structures answer the same question: which physical Frame holds this Virtual Page?",
          "They differ in how they store and find the mapping.",
        ],
        dataTable: {
          headers: ["Structure", "Main idea", "Main benefit", "Main cost"],
          rows: [
            ["Single-Level", "One direct table", "Simple lookup", "Large table for a large address space"],
            ["Multilevel", "Split the table into levels", "Create lower levels only when needed", "More lookup steps on a TLB Miss"],
            ["Hashed", "Hash the Virtual Page key", "Works well with large sparse spaces", "Collisions must be handled"],
            ["Inverted", "One entry per physical Frame", "Entry count follows physical memory", "Lookup and sharing are more complex"],
          ],
        },
      },
      {
        title: "Single-Level Page Table",
        paragraphs: [
          "A Single-Level Page Table is one array of Page Table Entries for a process. The Virtual Page Number is used directly as the array index.",
          "If Virtual Page 5 maps to Frame 18, Page Table entry 5 stores 18.",
        ],
        visual: {
          src: "/notes/operating-systems/page-table-single-level.png",
          alt: "Virtual Page 5 directly indexes entry 5 in a single-level Page Table and returns physical Frame 18.",
          width: 1536,
          height: 1024,
          caption:
            "A Single-Level Page Table uses the Virtual Page Number as a direct index.",
        },
      },
      {
        title: "How a Single-Level Page Table Works",
        paragraphs: [
          "The CPU produces a Virtual Page Number and an Offset. The Virtual Page Number selects one Page Table Entry. That entry gives the Frame Number, which is combined with the unchanged Offset.",
          "The structure is simple, but a large or mostly unused virtual address space can make the table waste memory.",
        ],
        table: {
          headers: ["Advantages", "Disadvantages"],
          rows: [
            ["Simple to understand and implement", "Can require many entries"],
            ["Direct indexing", "Poor memory use for sparse address spaces"],
          ],
        },
      },
      {
        title: "Multilevel Page Table",
        paragraphs: [
          "A Multilevel Page Table divides one large Page Table into smaller tables. The Virtual Page Number is also split into two or more indexes.",
          "The first index selects an entry in the outer table. That entry points to a lower-level table. The next index selects the final Page Table Entry.",
          "A lower-level table is created only for a virtual address region that the process actually uses. This can save a large amount of memory when the address space is sparse.",
        ],
        visual: {
          src: "/notes/operating-systems/page-table-multilevel.png",
          alt: "A virtual address split into Level 1 Index, Level 2 Index, and Offset, followed through an outer table and an inner Page Table to Frame 18.",
          width: 1536,
          height: 1024,
          caption:
            "Unused address regions do not need their own lower-level Page Tables.",
        },
      },
      {
        title: "Multilevel Lookup",
        paragraphs: [
          "On a TLB Miss, hardware performs a Page Table walk through the required levels. More levels mean more lookup steps before RAM can be accessed.",
          "The TLB reduces this cost by caching recent final Page-to-Frame mappings. Modern processors commonly use hierarchical Page Tables with several levels.",
        ],
        table: {
          headers: ["Advantages", "Disadvantages"],
          rows: [
            ["Saves table memory for unused regions", "A Page Table walk may need several memory accesses"],
            ["Scales to large address spaces", "More complex than a Single-Level table"],
          ],
        },
      },
      {
        title: "Two-Level Paging Example",
        paragraphs: [
          "Consider a 32-bit Virtual Address and a 4 KB Page size. A 4 KB Page needs a 12-bit Offset, leaving 20 bits for the Virtual Page Number.",
          "In a common teaching example, those 20 bits are split into a 10-bit Level 1 index and a 10-bit Level 2 index.",
        ],
        dataTable: {
          headers: ["Address part", "Bits", "Purpose"],
          rows: [
            ["Level 1 index", "10", "Select an outer-table entry"],
            ["Level 2 index", "10", "Select an inner Page Table Entry"],
            ["Offset", "12", "Select the byte inside the Page"],
          ],
        },
        points: [
          "Use Level 1 to find the required lower-level Page Table.",
          "Use Level 2 to find the final Page Table Entry.",
          "Combine the returned Frame Number with the unchanged 12-bit Offset.",
          "This is a teaching layout; real systems may use more levels or different index sizes.",
        ],
      },
      {
        title: "Hashed Page Table",
        paragraphs: [
          "A Hashed Page Table applies a hash function to a lookup key. The key normally includes the Virtual Page Number and a Process ID or address-space identifier.",
          "The hash selects a bucket. The system then compares the full key with entries in that bucket until it finds the correct mapping.",
          "Two different keys may select the same bucket. This is a hash collision, so a bucket may contain a chain of entries.",
        ],
        visual: {
          src: "/notes/operating-systems/page-table-hashed.png",
          alt: "PID 7 and Virtual Page 42 pass through a hash function to Bucket 3, where the key is compared with chained entries before Frame 18 is found.",
          width: 1536,
          height: 1024,
          caption:
            "Hashing narrows the search, while the full key confirms the correct mapping.",
        },
      },
      {
        title: "Hashed Table Trade-Offs",
        paragraphs: [
          "Hashed Page Tables can work well for large, sparse virtual address spaces because they focus on existing mappings instead of reserving a direct entry for every possible Page.",
          "Lookup time depends on the hash function, table size, and number of collisions. A Hashed Page Table is not automatically faster than every other structure.",
        ],
        table: {
          headers: ["Advantages", "Disadvantages"],
          rows: [
            ["Suitable for large sparse address spaces", "Collisions add extra comparisons"],
            ["Does not need one direct slot for every possible Page", "Hashing and bucket management add complexity"],
          ],
        },
      },
      {
        title: "Inverted Page Table",
        paragraphs: [
          "An Inverted Page Table has one main entry for each physical Frame, rather than one entry for every Virtual Page of every process.",
          "Each entry stores the process or address-space identifier and the Virtual Page currently held in that Frame. The Frame Number is the row index of the matching entry.",
          "Because the number of entries follows the number of physical Frames, the table can use much less memory than per-process tables when virtual address spaces are very large.",
        ],
        visual: {
          src: "/notes/operating-systems/page-table-inverted.png",
          alt: "One system-wide Inverted Page Table maps PID 2 and Virtual Page 5 to the row for physical Frame 3.",
          width: 1536,
          height: 1024,
          caption:
            "Each row represents one physical Frame, and the row index gives the Frame Number.",
        },
      },
      {
        title: "Inverted Table Trade-Offs",
        paragraphs: [
          "A direct Virtual Page index cannot be used because the table is organized by physical Frame. The system usually uses hashing or another search structure to find a matching Process ID and Virtual Page.",
          "Shared Pages and multiple Virtual Addresses pointing to the same physical Frame also need extra handling.",
        ],
        table: {
          headers: ["Advantages", "Disadvantages"],
          rows: [
            ["One main entry per physical Frame", "Lookup is more complex"],
            ["Entry count does not grow with every virtual address space", "Shared and aliased mappings need extra support"],
          ],
        },
      },
      {
        title: "Relationship with the TLB",
        paragraphs: [
          "The TLB can cache final Page-to-Frame mappings for all these structures.",
          "On a TLB Hit, the processor can use the cached mapping without walking or searching the main Page Table structure. The underlying structure matters most on a TLB Miss.",
          "A TLB Miss still does not mean a Page Fault. The Page mapping may exist in the Page Table and the Page may already be in RAM.",
        ],
      },
      {
        title: "Choosing a Structure",
        paragraphs: [
          "There is no single best structure for every system. The choice depends on address-space size, how sparse the mappings are, available hardware support, and acceptable lookup cost.",
        ],
        dataTable: {
          headers: ["Structure", "Entry organization", "Lookup", "Good fit"],
          rows: [
            ["Single-Level", "One entry for each indexed Virtual Page", "Direct index", "Small address spaces"],
            ["Multilevel", "Tables created by used address regions", "Walk through levels", "Large sparse address spaces and modern hierarchical paging"],
            ["Hashed", "Mappings stored in hash buckets", "Hash and compare keys", "Very large sparse address spaces"],
            ["Inverted", "One main entry per physical Frame", "Hash or search", "Limiting table entry count across large virtual spaces"],
          ],
        },
      },
    ],
    mechanism: {
      title: "Finding a Frame",
      steps: [
        "The CPU produces a Virtual Page Number and Offset.",
        "The TLB is checked for a cached mapping.",
        "On a TLB Miss, the active Page Table structure is walked or searched.",
        "The matching Page Table Entry provides the Frame Number and access information.",
        "The Frame Number is combined with the unchanged Offset.",
        "RAM is accessed using the resulting Physical Address.",
      ],
    },
    example: {
      title: "Finding Virtual Page 5",
      body: "A Single-Level table reads entry 5 directly. A Multilevel table follows the indexes through its levels. A Hashed table hashes the Page key and compares bucket entries. An Inverted table finds the row containing the matching Process ID and Virtual Page. Every method finally returns a physical Frame.",
    },
    misconception:
      "An Inverted Page Table is not indexed directly by Virtual Page Number. Its rows represent physical Frames, so a hash or search is normally needed.",
  },
  revise: {
    definitionLabel: "Overview",
    compactDefinition: true,
    definition:
      "As address spaces become larger, a Single-Level Page Table can consume a lot of memory. Operating Systems use different Page Table structures to reduce this overhead.",
    sections: [
      {
        title: "Structure Summary",
        dataTable: {
          headers: ["Structure", "Organization", "Main point"],
          rows: [
            ["Single-Level", "One Page Table per process", "Simple and direct, but may use a lot of memory"],
            ["Multilevel", "One large table split into levels", "Creates lower-level tables only when needed"],
            ["Hashed", "Mappings stored in hash buckets", "Works well for large sparse address spaces; collisions are possible"],
            ["Inverted", "One main table for the system", "One entry per physical Frame; lookup is more complex"],
          ],
        },
      },
      {
        title: "Two-Level Address Split",
        paragraphs: [
          "Common teaching example: 32-bit address + 4 KB Pages = 10-bit Level 1 index + 10-bit Level 2 index + 12-bit Offset.",
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Single-Level: One direct Page Table per process.",
      "Multilevel: Split into smaller tables and create lower levels only when needed.",
      "Two-level teaching example: 10-bit Level 1 + 10-bit Level 2 + 12-bit Offset.",
      "Hashed: Use a hash function, then compare the full Process ID and Page Number key.",
      "Inverted: One main system table with one entry per physical Frame.",
      "The TLB reduces repeated Page Table lookups.",
    ],
    followUp: "Why does a Multilevel Page Table save memory for a sparse address space?",
  },
  lastMinute: {
    definition:
      "Page Table Structures are different ways of organizing Page Tables to reduce memory usage while mapping Pages → Frames.",
    sections: [
      {
        title: "Structure",
        flow: [
          "Page Table Structures",
          "Single-Level / Multilevel / Hashed / Inverted",
          "Page Number → Frame Number",
        ],
        wide: true,
      },
      {
        title: "Remember This",
        points: [
          "Single-Level: One Page Table per process. Simple and direct, but may use a lot of memory.",
          "Multilevel: Splits one large Page Table into smaller levels. Lower-level tables are created only when needed.",
          "Hashed: Uses a hash function to locate a bucket. Hash collisions are possible.",
          "Inverted: Uses one main table for the system. It has one entry per physical Frame.",
        ],
        wide: true,
      },
    ],
    cuesLabel: "Key Points",
    cues: [
      "Single-Level → Simple lookup, but high memory cost for large address spaces.",
      "Multilevel → Better memory use for sparse address spaces, but requires extra lookup steps.",
      "A common 32-bit, 4 KB two-level example uses 10 + 10 + 12 address bits.",
      "Hashed → Uses buckets; collisions may slow lookup.",
      "Inverted → One main system table with one entry per physical Frame.",
    ],
    memoryLineLabel: "Remember This",
    memoryLine:
      "Single-Level is direct, Multilevel uses levels, Hashed uses buckets, and Inverted uses physical Frame entries.",
    memoryLineAtEnd: true,
    trap:
      "A Hashed Page Table is not always faster, and an Inverted Page Table is not directly indexed by Virtual Page Number.",
  },
};

export { pageTableStructures };
