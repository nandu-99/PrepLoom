import type { SubjectTopic } from "@/lib/subject-content";

export const storageAndFileOrganization: SubjectTopic = {
  slug: "storage-and-file-organization",
  title: "Storage and File Organization",
  description: "Understand pages, records, buffers, and the main ways a DBMS stores table files.",
  readTime: "32 min",
  difficulty: "Foundation",
  tags: ["Pages", "Records", "File Organization"],
  learn: {
    opening:
      "A table looks like rows and columns to a user, but the DBMS stores those rows inside fixed-size pages. File organization decides how those pages and records are arranged.",
    sections: [
      {
        title: "Storage Hierarchy",
        paragraphs: [
          "Main memory is fast but usually loses its contents after power failure. SSDs and disks are slower but keep database files permanently.",
          "The DBMS normally transfers a page, also called a block, between permanent storage and memory. It does not fetch one field at a time from disk.",
        ],
        flow: ["Database file", "Page or block", "Record", "Field"],
      },
      {
        title: "Pages, Records, and Record IDs",
        dataTable: {
          headers: ["Term", "Meaning", "Why it matters"],
          rows: [
            ["Page", "Fixed-size unit of storage transfer", "Most I/O costs are counted in page reads and writes"],
            ["Record", "Stored form of one table row", "Contains fixed-length or variable-length fields"],
            ["Record ID (RID)", "Usually a page number and slot number", "Lets an index locate a record"],
            ["Page header", "Metadata about the page", "Tracks slots, free space, and page type"],
          ],
        },
        paragraphs: [
          "A slotted page is useful for variable-length records. Its slot directory can point to records even when the records move inside the same page.",
        ],
      },
      {
        title: "Spanned and Unspanned Records",
        table: {
          headers: ["Unspanned", "Spanned"],
          rows: [
            ["One record must fit completely inside one page", "A record may continue on another page"],
            ["Simpler to read", "Uses leftover space better for large records"],
          ],
        },
        paragraphs: [
          "Unless a numerical says otherwise, blocking-factor questions commonly assume fixed-length, unspanned records and ignore page-header space.",
        ],
      },
      {
        title: "Main File Organizations",
        dataTable: {
          headers: ["Organization", "Good for", "Main weakness"],
          rows: [
            ["Heap", "Fast insertion and full scans", "Searching without an index may scan every page"],
            ["Sorted or sequential", "Ordered output and range access", "Insertion may require movement or overflow pages"],
            ["Hashed", "Equality search using a hash key", "Poor for ranges and may create overflow buckets"],
          ],
        },
        paragraphs: [
          "File organization describes the table's physical arrangement. An index is a separate access structure, so a heap file can still have several indexes.",
        ],
      },
      {
        title: "Buffer Manager",
        paragraphs: [
          "The buffer manager keeps recently used pages in memory. A buffer hit avoids a storage read; a miss requires the page to be loaded.",
          "A dirty page contains a change that has not yet reached permanent storage. The replacement policy decides which buffered page can leave memory, while recovery rules decide when a dirty page may safely be written.",
        ],
      },
      {
        title: "Blocking-Factor Numerical",
        paragraphs: [
          "A file has 10,000 fixed records. Each record is 100 bytes and each page is 4,096 bytes. Assume unspanned records and ignore page headers.",
        ],
        formulas: [
          {
            label: "Blocking factor",
            expression: "bfr = floor(page size / record size) = floor(4096 / 100) = 40 records",
          },
          {
            label: "Pages required",
            expression: "b = ceil(number of records / bfr) = ceil(10000 / 40) = 250 pages",
          },
        ],
        points: [
          "Each page has 96 unused bytes under these assumptions.",
          "Do not calculate 10,000 × 100 / 4,096 for an unspanned file; unused space cannot be shared across pages.",
        ],
      },
      {
        title: "Practice: Storage Cost",
        paragraphs: [
          "A heap file contains 4,500 unspanned records. Page size is 1,024 bytes and record size is 100 bytes.",
        ],
        points: [
          "bfr = floor(1024 / 100) = 10 records per page.",
          "Pages = ceil(4500 / 10) = 450.",
          "If the wanted record exists and records are spread uniformly, a successful unordered search needs about half the pages on average and up to 450 pages in the worst case.",
          "An unsuccessful search normally examines all 450 pages when no index is used.",
        ],
      },
      {
        title: "Practice: Spanned Records",
        paragraphs: [
          "Store the earlier 10,000 records of 100 bytes in 4,096-byte pages, but now allow records to span pages. Ignore page headers and continuation-pointer space.",
        ],
        formulas: [
          { label: "Total record bytes", expression: "10000 × 100 = 1,000,000 bytes" },
          { label: "Pages required", expression: "ceil(1000000 / 4096) = 245 pages" },
        ],
        points: [
          "The unspanned version required 250 pages; spanning uses leftover page space more fully.",
          "A real DBMS needs some metadata for a continued record, so an exam question must state whether to include that overhead.",
        ],
      },
    ],
    mechanism: {
      title: "How to solve a file-storage numerical",
      steps: [
        "Write the page size, record size, and number of records.",
        "Check whether records are spanned or unspanned.",
        "For unspanned records, calculate floor(page size / record size).",
        "Divide the record count by the blocking factor and round pages upward.",
        "State any ignored header space or other assumption.",
      ],
    },
    example: {
      title: "Library shelf analogy",
      body: "A page is like one shelf tray and a record is like one book. Even if a tray has a small gap, an unspanned book cannot be cut so that the remaining part continues on the next tray.",
    },
    misconception:
      "A table is not normally read from storage one row at a time. The DBMS moves pages and then finds records inside them.",
  },
  revise: {
    definition:
      "A DBMS stores records inside pages and uses file organization plus buffering to control how those pages are found and moved.",
    sections: [
      {
        title: "Organization Recall",
        dataTable: {
          headers: ["Heap", "Sorted", "Hashed"],
          rows: [
            ["Fast insert", "Good range access", "Good equality access"],
            ["Slow search without index", "Costly insert", "Poor range access"],
          ],
        },
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Page I/O is the main unit used in storage-cost questions.",
      "RID commonly identifies a page and slot.",
      "Unspanned blocking factor uses floor(page size / record size).",
      "A dirty buffer page has not yet been written to permanent storage.",
    ],
    followUp: "Why can an unspanned file need more pages than total bytes divided by page size?",
  },
  lastMinute: {
    definition: "Files contain pages; pages contain records; buffers hold pages in memory.",
    sections: [
      {
        title: "Formula",
        points: ["bfr = floor(B/R)", "pages = ceil(records/bfr)"],
      },
    ],
    memoryLine: "Heap for easy insert • sorted for range • hash for equality",
    cues: ["Page", "RID", "Buffer"],
    trap: "For unspanned records, calculate records per page before calculating the page count.",
  },
};

export const indexingFundamentals: SubjectTopic = {
  slug: "indexing-fundamentals",
  title: "Indexing Fundamentals",
  description: "Learn index entries, dense and sparse indexes, clustering, selectivity, and index cost.",
  readTime: "34 min",
  difficulty: "Intermediate",
  tags: ["Indexes", "Dense and Sparse", "Clustered Index"],
  learn: {
    opening:
      "An index is an extra structure that maps search-key values to records or pages. It speeds up selected reads but uses storage and adds work to inserts, updates, and deletes.",
    sections: [
      {
        title: "Index Entry and Search Key",
        paragraphs: [
          "An index entry contains a search-key value and a pointer. The search key may be a candidate key, but it does not have to be unique.",
          "The pointer may lead directly to a record, to a list of matching record IDs, or to a data page depending on the index design.",
        ],
      },
      {
        title: "Dense and Sparse Indexes",
        table: {
          headers: ["Dense index", "Sparse index"],
          rows: [
            ["Has an entry for every search-key value or record", "Has entries for only some search-key values"],
            ["Can point close to the exact record", "Finds a nearby page, then searches within the ordered data"],
            ["Uses more index space", "Uses less index space"],
          ],
        },
        paragraphs: [
          "A sparse index needs the data file to be ordered on the indexed field. A common sparse design stores one entry for the first key of each data page.",
        ],
      },
      {
        title: "Primary, Clustering, and Secondary Indexes",
        dataTable: {
          headers: ["Traditional term", "File ordering", "Search field"],
          rows: [
            ["Primary index", "Ordered on the field", "Unique ordering key"],
            ["Clustering index", "Ordered on the field", "Non-unique ordering field"],
            ["Secondary index", "Not the file-ordering field", "Key or non-key field"],
          ],
        },
        paragraphs: [
          "Only one physical order is possible for a file, but the file can have many secondary indexes. Modern products may use the word clustered differently, so state the textbook convention in exam answers.",
        ],
      },
      {
        title: "Single-Level and Multilevel Indexes",
        paragraphs: [
          "If one index is too large, the DBMS can build an index over its index pages. Repeating this idea creates a small hierarchy and reduces page reads.",
          "Balanced tree indexes automate this multilevel idea while supporting insertion and deletion. B+ trees are the common database form.",
        ],
      },
      {
        title: "Selectivity and Composite Indexes",
        paragraphs: [
          "A highly selective condition returns very few rows. Its selectivity fraction, matching rows divided by total rows, is therefore small. An equality condition on a unique ID is highly selective; status = 'active' may match much of the table.",
          "For an index on (A, B), a search beginning with A can normally use the ordered index efficiently. A condition only on B usually cannot use the leading order in the same way. This is the leftmost-prefix idea.",
        ],
      },
      {
        title: "Creating an Index",
        paragraphs: [
          "A common SQL form is CREATE INDEX idx_employee_dept_salary ON EMPLOYEE(DeptId, Salary);. This composite index is naturally ordered by DeptId first and then Salary within each department.",
          "It can support a condition beginning with DeptId, such as WHERE DeptId = 10 AND Salary > 60000. A condition only on Salary usually cannot use the same leading order as effectively. Exact optimizer behaviour is product-specific.",
        ],
      },
      {
        title: "Duplicate Values and Covering Indexes",
        paragraphs: [
          "A non-unique secondary index must reach every matching record. One entry may point to a list or bucket of record IDs, or the index may store several entries with the same search key.",
          "A covering index contains every column needed by a query. The DBMS may answer from the index alone, avoiding table-page reads; this is also called an index-only scan.",
        ],
      },
      {
        title: "When an Index Helps",
        dataTable: {
          headers: ["Often helpful", "May not help"],
          rows: [
            ["Equality on a selective value", "A query returning most table rows"],
            ["Range on an ordered tree index", "A very small table"],
            ["Join, filter, or order columns used often", "A frequently updated, low-cardinality column whose common value matches many rows"],
          ],
        },
        paragraphs: [
          "An index lookup can still require random data-page reads. When many rows match, a sequential table scan may be cheaper.",
        ],
      },
      {
        title: "Index-Entry Numerical",
        paragraphs: [
          "A sorted data file has 100,000 records, 100 records per page, and one sparse primary-index entry per data page. Each index page holds 200 entries.",
        ],
        formulas: [
          { label: "Data pages", expression: "100000 / 100 = 1,000 pages" },
          { label: "First-level entries", expression: "1 entry per data page = 1,000 entries" },
          { label: "First-level pages", expression: "ceil(1000 / 200) = 5 pages" },
          { label: "Second-level entries", expression: "1 per first-level page = 5 entries, so it fits in 1 page" },
        ],
        points: [
          "With the top page in storage, locating a data page needs one top-index read, one first-level-index read, and one data-page read: 3 page reads.",
          "If the top page remains buffered, its storage read can be avoided.",
        ],
      },
      {
        title: "Practice: Dense vs Sparse Size",
        paragraphs: [
          "A file contains 50,000 records in 500 data pages. Compare entry counts.",
        ],
        points: [
          "A record-level dense index has about 50,000 entries.",
          "A page-level sparse index has about 500 entries.",
          "The sparse index is smaller, but it requires the file to remain ordered on the search field.",
        ],
      },
    ],
    mechanism: {
      title: "How to evaluate an index",
      steps: [
        "Identify the query's search, join, and ordering columns.",
        "Check whether the index order begins with the required columns.",
        "Estimate how many rows and data pages will match.",
        "Count index-level reads plus data-page reads.",
        "Compare the read benefit with index space and update cost.",
      ],
    },
    example: {
      title: "Book index",
      body: "A book index does not copy every chapter. It stores a sorted term and a page pointer. A database index follows the same basic idea, but it must also remain correct while data changes.",
    },
    misconception:
      "An index does not make every query faster. Reading a large part of a table through scattered index pointers can cost more than a sequential scan.",
  },
  revise: {
    definition: "An index stores search keys with pointers to reduce the pages examined by a query.",
    sections: [
      {
        title: "Fast Comparison",
        points: [
          "Dense: many entries, direct access.",
          "Sparse: fewer entries, ordered data required.",
          "Clustered: data follows the index order.",
          "Secondary: separate order from the data file.",
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "A search key need not be unique.",
      "One file can have only one physical order.",
      "Composite-index order matters.",
      "A highly selective condition has a small matching fraction and often benefits from index access.",
    ],
    followUp: "Why might a DBMS ignore an available index when a condition matches 80% of a table?",
  },
  lastMinute: {
    definition: "Index = search key plus pointer, arranged for faster access.",
    sections: [
      {
        title: "Choose Carefully",
        points: ["Selective lookup → index often wins", "Most rows → scan often wins", "More indexes → slower writes"],
      },
    ],
    memoryLine: "Fewer searched pages, but extra space and write work",
    cues: ["Dense", "Sparse", "Selectivity"],
    trap: "Primary key and primary index are not the same concept.",
  },
};

export const bTreesBPlusTreesAndHashing: SubjectTopic = {
  slug: "b-trees-b-plus-trees-and-hashing",
  title: "B-Trees, B+ Trees, and Hashing",
  description: "Compare balanced tree indexes with hash indexes and solve basic order and search problems.",
  readTime: "34 min",
  difficulty: "Advanced",
  tags: ["B-Tree", "B+ Tree", "Hashing"],
  learn: {
    opening:
      "Balanced tree indexes keep search paths short as data grows. Hash indexes instead calculate a bucket and are strongest for equality searches.",
    sections: [
      {
        title: "B-Tree Basics",
        paragraphs: [
          "A B-tree is a height-balanced multiway search tree. Each node stores sorted keys, and every leaf is at the same depth.",
          "Search follows key ranges from the root to a matching key or leaf. Insertions split full nodes; deletions may borrow from a sibling or merge nodes.",
        ],
      },
      {
        title: "B+ Tree Structure",
        paragraphs: [
          "In a B+ tree, internal nodes guide searches, while all data-record pointers are stored at the leaf level. Leaf nodes are linked in key order.",
          "A point search follows one root-to-leaf path. A range search finds the first leaf and then follows leaf links, which is why B+ trees suit database indexes.",
        ],
        visual: {
          src: "/notes/dbms/b-plus-tree-index-v2.png",
          alt: "A correct B+ tree with separator keys in internal nodes, record pointers in leaves, and linked leaf nodes.",
          width: 1536,
          height: 1024,
          caption: "Internal nodes guide the search; linked leaves hold the searchable entries and record pointers.",
        },
      },
      {
        title: "B-Tree vs B+ Tree",
        table: {
          headers: ["B-tree", "B+ tree"],
          rows: [
            ["Record pointers may appear in internal and leaf nodes", "Record pointers are kept at leaf level"],
            ["A successful search may stop at an internal node", "Search reaches a leaf"],
            ["Leaves need not form one linked sequence", "Leaves are linked for ordered scans"],
          ],
        },
        paragraphs: [
          "B+ tree internal nodes can often hold more separator keys because they do not store full record pointers there. This usually gives a large fan-out and small height.",
        ],
      },
      {
        title: "Order and Occupancy Convention",
        paragraphs: [
          "Textbooks use different meanings for order, so always write the convention. Here, order m means at most m children and m − 1 keys in an internal node.",
        ],
        points: [
          "A non-root internal node has at least ceil(m/2) children and ceil(m/2) − 1 keys.",
          "A root that is not a leaf has at least two children.",
          "All leaves are at the same depth.",
          "Leaf capacity rules can differ by textbook or implementation; use the rule given in the question.",
        ],
      },
      {
        title: "Order Numerical",
        paragraphs: ["For a B+ tree of order 5 under the convention above:"],
        formulas: [
          { label: "Maximum internal children", expression: "m = 5" },
          { label: "Maximum internal keys", expression: "m − 1 = 4" },
          { label: "Minimum non-root children", expression: "ceil(5/2) = 3" },
          { label: "Minimum non-root internal keys", expression: "3 − 1 = 2" },
        ],
      },
      {
        title: "Insertion Practice",
        paragraphs: [
          "Assume a B+ tree leaf can hold at most three keys. Insert 10, 20, 5, and then 6 into an initially empty tree.",
        ],
        points: [
          "After 10, 20, 5, the leaf is [5, 10, 20].",
          "Inserting 6 temporarily gives [5, 6, 10, 20], so the leaf overflows.",
          "Split it into [5, 6] and [10, 20].",
          "Copy the first key of the right leaf, 10, into the new root as a separator.",
          "The two leaves remain linked.",
        ],
      },
      {
        title: "Fan-Out and Height Numerical",
        paragraphs: [
          "Assume internal fan-out is at most 100, each leaf holds at most 99 entries, and height 3 counts the root, one internal level, and the leaf level.",
        ],
        formulas: [
          { label: "Maximum leaves", expression: "100 × 100 = 10,000 leaves" },
          { label: "Maximum indexed entries", expression: "10000 × 99 = 990,000 entries" },
          { label: "Point-search path", expression: "3 index pages from root through leaf" },
        ],
      },
      {
        title: "Promotion and Copy-Up",
        table: {
          headers: ["B-tree internal split", "B+ tree leaf split"],
          rows: [
            ["The separator key is promoted to the parent and leaves the split node", "The first key of the right leaf is copied to the parent and remains in the leaf"],
          ],
        },
        paragraphs: [
          "Internal B+ tree splits may promote a separator, while leaf splits keep all searchable data entries at leaf level.",
        ],
      },
      {
        title: "Static Hashing",
        paragraphs: [
          "A hash function maps a search key to a bucket, for example h(k) = k mod N. Different keys can map to the same bucket; this is a collision.",
          "If a bucket becomes full, overflow pages or another collision method is needed. Too many overflow pages make access slower.",
        ],
        dataTable: {
          headers: ["Query", "Hash index", "B+ tree"],
          rows: [
            ["ID = 42", "Excellent expected access", "Good"],
            ["ID between 40 and 60", "Poor because bucket order is not key order", "Excellent through linked leaves"],
            ["ORDER BY ID", "Does not naturally provide order", "Can scan leaves in order"],
          ],
        },
      },
      {
        title: "Hash Numerical",
        paragraphs: ["Use h(k) = k mod 5 for keys 12, 17, 23, 28, and 31."],
        dataTable: {
          headers: ["Key", "Hash value", "Bucket"],
          rows: [
            ["12", "12 mod 5 = 2", "2"],
            ["17", "17 mod 5 = 2", "2; collision with 12"],
            ["23", "23 mod 5 = 3", "3"],
            ["28", "28 mod 5 = 3", "3; collision with 23"],
            ["31", "31 mod 5 = 1", "1"],
          ],
        },
      },
      {
        title: "Dynamic Hashing",
        paragraphs: [
          "Dynamic hashing grows without rebuilding the whole fixed bucket set. Extendible hashing uses a directory of bit prefixes and splits buckets when needed.",
          "It is useful for changing equality-search workloads, but it still does not provide the ordered leaf scan of a B+ tree.",
        ],
      },
    ],
    mechanism: {
      title: "How to solve a B+ tree insertion",
      steps: [
        "Write the exact order or capacity convention from the question.",
        "Follow separator keys to the correct leaf.",
        "Insert the key in sorted order.",
        "If the node overflows, split it and update its parent.",
        "Continue splitting upward if the parent overflows.",
        "Check equal leaf depth and leaf links at the end.",
      ],
    },
    example: {
      title: "Point search and range search",
      body: "A hash table acts like numbered lockers: a formula chooses one locker. A B+ tree acts like a sorted directory: it takes a few steps to the first value, then neighbouring values are easy to read in order.",
    },
    misconception:
      "Hashing is not generally faster for every query. It is designed for equality access, while a B+ tree also supports ordered and range access.",
  },
  revise: {
    definition:
      "B+ trees give balanced ordered access through linked leaves; hashing maps a key directly to an unordered bucket.",
    sections: [
      {
        title: "Tree Rules",
        points: [
          "All leaves have the same depth.",
          "Internal nodes guide searches.",
          "B+ tree record pointers are at leaf level.",
          "Splits preserve balance.",
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "State the order convention before a numerical.",
      "Linked leaves make range scans efficient.",
      "Collisions place different keys in the same hash bucket.",
      "B+ tree insertion may split a node and propagate a separator upward.",
      "Dynamic hashing grows its bucket structure as data grows.",
    ],
    followUp: "Why does a B+ tree normally perform range queries better than a hash index?",
  },
  lastMinute: {
    definition: "B+ tree = balanced order; hash index = calculated bucket.",
    sections: [
      {
        title: "Choose",
        points: ["Equality only → hash can fit", "Equality plus ranges/order → B+ tree", "Overflow → split and propagate"],
      },
    ],
    memoryLine: "Tree keeps order • hash chooses bucket",
    cues: ["Fan-out", "Leaf links", "Collision"],
    trap: "Do not solve an order numerical without stating what order means.",
  },
};

export const logBasedRecoveryAndWal: SubjectTopic = {
  slug: "log-based-recovery-and-wal",
  title: "Log-Based Recovery and WAL",
  description: "Use logs, write-ahead logging, undo, and redo to recover transactions after failure.",
  readTime: "32 min",
  difficulty: "Advanced",
  tags: ["Recovery Log", "WAL", "Undo and Redo"],
  learn: {
    opening:
      "Recovery restores a correct database state after failure. A recovery log records enough information to repeat committed work and remove incomplete work.",
    sections: [
      {
        title: "Types of Failure",
        paragraphs: [],
        dataTable: {
          headers: ["Failure", "Example", "Typical response"],
          rows: [
            ["Transaction failure", "Constraint error or deadlock victim", "Roll back that transaction"],
            ["System crash", "Power or operating-system failure", "Use the log after restart"],
            ["Media failure", "Damaged storage device", "Restore a backup and apply later log records"],
          ],
        },
      },
      {
        title: "Log Records",
        paragraphs: [
          "A log is an ordered history kept on stable storage. A common immediate-update log stores the transaction, item, old value, and new value for every change.",
        ],
        points: [
          "<T1, START> begins T1's log history.",
          "<T1, X, 100, 80> says T1 changed X from 100 to 80.",
          "<T1, COMMIT> says T1 completed successfully.",
          "The old value supports UNDO; the new value supports REDO.",
        ],
      },
      {
        title: "Write-Ahead Logging",
        paragraphs: [
          "Write-ahead logging (WAL) requires the relevant log record to reach stable storage before the changed data page is written. A transaction's commit record must also be stable before the DBMS reports a successful commit.",
          "Therefore, even if a dirty page reaches storage before commit, the log still contains the old value needed to undo it after a crash.",
        ],
        visual: {
          src: "/notes/dbms/write-ahead-logging-v2.png",
          alt: "Write-ahead logging rules: flush an update log record before its data page and flush required log records including commit before reporting success.",
          width: 1536,
          height: 1024,
          caption: "WAL makes update and commit information durable before the related database action is considered safe.",
        },
      },
      {
        title: "UNDO and REDO",
        paragraphs: [],
        table: {
          headers: ["UNDO", "REDO"],
          rows: [
            ["Restores old values", "Reapplies new values"],
            ["Used for incomplete transactions whose changes may be on disk", "Used for committed transactions whose changes may not be on disk"],
            ["Usually follows log records backward", "Usually follows log records forward"],
          ],
        },
      },
      {
        title: "Buffer Policies and Recovery Need",
        dataTable: {
          headers: ["Policy", "Meaning", "Recovery effect"],
          rows: [
            ["Steal", "An uncommitted dirty page may be written", "UNDO may be needed"],
            ["No-steal", "Uncommitted dirty pages stay in memory", "Avoids UNDO for those pages"],
            ["Force", "All changed pages are written at commit", "Avoids REDO for committed pages"],
            ["No-force", "Commit need not write every changed page", "REDO may be needed"],
          ],
        },
        paragraphs: [
          "Many practical systems use steal and no-force because they improve buffer use and commit speed. WAL then provides the information needed for both undo and redo.",
        ],
      },
      {
        title: "Immediate and Deferred Update",
        table: {
          headers: ["Immediate update", "Deferred update"],
          rows: [
            ["A data page may be written before transaction commit", "Database changes are postponed until commit"],
            ["May require UNDO and REDO", "Normally needs REDO but not UNDO for database pages"],
          ],
        },
        paragraphs: [
          "Deferred update postpones writing the transaction's changes to database pages until commit; the transaction can still calculate and log its changes before commit.",
          "The exact recovery action also depends on buffer policy. In exam problems, follow the method and assumptions stated in the question.",
        ],
      },
      {
        title: "Worked Log Numerical",
        paragraphs: [
          "Assume immediate update with WAL. The log on stable storage is shown below when the system crashes.",
        ],
        flow: [
          "<T1, START>",
          "<T1, A, 100, 80>",
          "<T2, START>",
          "<T2, B, 200, 240>",
          "<T1, COMMIT>",
          "CRASH",
        ],
        points: [
          "T1 is a winner because its COMMIT record is present. REDO T1 if its new value may be missing, so A becomes 80.",
          "T2 is a loser because it has no COMMIT record. UNDO T2 if its update may be on disk, so B returns to 200.",
          "The final recovered values are A = 80 and B = 200.",
        ],
      },
    ],
    mechanism: {
      title: "How to solve a log-recovery question",
      steps: [
        "Write the recovery method and assumptions.",
        "Mark every transaction that started.",
        "Mark transactions with a commit record as winners.",
        "Treat active uncommitted transactions at the crash as losers.",
        "Redo the required winner updates using new values.",
        "Undo loser updates in reverse order using old values.",
      ],
    },
    example: {
      title: "Why the log comes first",
      body: "The log is like keeping an eraser instruction before writing in permanent ink. If the system stops halfway, it still knows how to remove the unfinished change.",
    },
    misconception:
      "A COMMIT record does not guarantee that every changed data page was already written under no-force. This is why committed work can still require redo.",
  },
  revise: {
    definition:
      "WAL stores recovery information before changed data pages, allowing committed work to be redone and incomplete work to be undone.",
    sections: [
      {
        title: "Policy Map",
        points: ["Steal → may need UNDO", "No-force → may need REDO", "Winner → committed", "Loser → uncommitted at crash"],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Old value is used for undo; new value is used for redo.",
      "The log record must be stable before its dirty data page.",
      "Commit must be stable before success is reported.",
      "Undo normally follows a transaction's changes backward.",
    ],
    followUp: "Why can a committed transaction need REDO in a no-force system?",
  },
  lastMinute: {
    definition: "Log first, data later; redo winners and undo losers as required.",
    sections: [
      {
        title: "Remember",
        points: ["Old value → UNDO", "New value → REDO", "Steal → UNDO", "No-force → REDO"],
      },
    ],
    memoryLine: "WAL protects the instructions needed after a crash",
    cues: ["Stable log", "Winner", "Loser"],
    trap: "Do not undo a transaction merely because one of its data pages was not written; undo is for incomplete work.",
  },
};

export const checkpointsAndCrashRecovery: SubjectTopic = {
  slug: "checkpoints-and-crash-recovery",
  title: "Checkpoints and Crash Recovery",
  description: "Limit recovery work with checkpoints and understand the essential ARIES recovery phases.",
  readTime: "26 min",
  difficulty: "Advanced",
  tags: ["Checkpoints", "ARIES", "Crash Recovery"],
  learn: {
    opening:
      "A log can become very long. A checkpoint records a known recovery position so restart does not need to examine the entire history from the beginning.",
    sections: [
      {
        title: "Checkpoint Purpose",
        paragraphs: [
          "A checkpoint writes recovery metadata to the log, including transactions active at that time. It gives restart recovery a recent place from which to rebuild the required state.",
          "A checkpoint does not mean that every active transaction committed. Transactions listed as active must still be checked for a later commit or crash-time rollback.",
        ],
      },
      {
        title: "Sharp and Fuzzy Checkpoints",
        table: {
          headers: ["Sharp checkpoint", "Fuzzy checkpoint"],
          rows: [
            ["Pauses relevant update activity to make a clean point", "Allows transactions and page writes to continue"],
            ["Simpler but causes a pause", "Less disruption but needs richer recovery information"],
          ],
        },
        paragraphs: [
          "Modern systems commonly use fuzzy checkpoints so normal database work does not stop for a long flush.",
        ],
      },
      {
        title: "Simplified Checkpoint Numerical",
        paragraphs: [
          "Assume immediate update. The log contains: T1 starts and writes A; CHECKPOINT lists {T1}; T2 starts and writes B; T1 commits; T3 starts and writes C; T2 commits; CRASH.",
          "The checkpoint's active list matters: T1 started before the checkpoint but cannot be ignored because it was still active there.",
        ],
        dataTable: {
          headers: ["Transaction", "State at crash", "Simplified action"],
          rows: [
            ["T1", "Committed after checkpoint", "REDO if its update may be missing"],
            ["T2", "Started and committed after checkpoint", "REDO if its update may be missing"],
            ["T3", "Uncommitted", "UNDO its update"],
          ],
        },
      },
      {
        title: "ARIES Overview",
        paragraphs: [
          "ARIES is a widely taught recovery method designed for WAL with steal and no-force buffering. It uses log sequence numbers (LSNs) to order log records and track page progress.",
        ],
        dataTable: {
          headers: ["Phase", "Main job", "Simple meaning"],
          rows: [
            ["Analysis", "Rebuild transaction and dirty-page information", "Find what was active and what may need recovery"],
            ["Redo", "Repeat history from the required point", "Reapply logged actions that may be missing"],
            ["Undo", "Roll back loser transactions", "Remove incomplete work backward"],
          ],
        },
      },
      {
        title: "ARIES Essentials",
        paragraphs: [
          "The Transaction Table tracks active transactions, and the Dirty Page Table tracks pages that may not yet be on stable storage. Log sequence numbers (LSNs) connect log records with the latest action stored on a page.",
          "During undo, ARIES writes compensation log records (CLRs) so recovery itself can safely restart after another crash. For most exams and interviews, remember the purpose of these structures rather than low-level implementation fields.",
        ],
      },
      {
        title: "Backup and Media Recovery",
        paragraphs: [
          "Crash recovery cannot repair a physically lost storage device by itself. Media recovery restores a full or incremental backup and then applies archived log records created after that backup.",
          "Backups must be tested. A backup that cannot be restored does not provide recovery.",
        ],
      },
    ],
    mechanism: {
      title: "How to analyse crash recovery",
      steps: [
        "Locate the latest usable checkpoint.",
        "Include transactions active at that checkpoint.",
        "Scan later log records to identify winners and losers.",
        "Follow the exact algorithm stated: simplified undo/redo or ARIES phases.",
        "Use LSN or page-LSN information when it is supplied.",
        "Separate system-crash recovery from backup-based media recovery.",
      ],
    },
    example: {
      title: "Checkpoint meaning",
      body: "A checkpoint is like a saved progress marker, not the end of the work. It reduces how far recovery must look back, but unfinished transactions around that marker still need analysis.",
    },
    misconception:
      "A checkpoint does not automatically make every earlier transaction safe to ignore. Transactions active at the checkpoint can have relevant earlier log records.",
  },
  revise: {
    definition:
      "A checkpoint limits restart work; ARIES then analyses state, repeats required history, and undoes incomplete transactions.",
    sections: [
      {
        title: "ARIES Order",
        flow: ["Analysis", "Redo", "Undo"],
        points: ["CLRs record completed undo work.", "Page LSNs help avoid unnecessary redo."],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Fuzzy checkpoints allow normal work to continue.",
      "The checkpoint records active transactions and recovery metadata.",
      "The Dirty Page Table and Transaction Table rebuild recovery state.",
      "ARIES redo repeats required history before loser undo.",
      "CLRs record undo work so recovery can restart safely.",
    ],
    followUp: "Why must recovery examine a transaction that was active at the latest checkpoint?",
  },
  lastMinute: {
    definition: "Checkpoint shortens the search; ARIES runs analysis → redo → undo.",
    sections: [
      {
        title: "Crash vs Media",
        points: ["Crash → restart from log", "Lost storage → restore backup, then apply logs"],
      },
    ],
    memoryLine: "Find state • repeat history • remove losers",
    cues: ["Checkpoint", "LSN", "CLR"],
    trap: "ARIES performs redo before undo.",
  },
};

export const queryProcessingAndOptimization: SubjectTopic = {
  slug: "query-processing-and-optimization",
  title: "Query Processing and Optimization",
  description: "Follow a SQL query through parsing, planning, optimization, and execution, then compare plan costs.",
  readTime: "40 min",
  difficulty: "Advanced",
  tags: ["Query Plans", "Optimization", "Join Algorithms"],
  learn: {
    opening:
      "SQL describes the required result, not the exact execution steps. The optimizer compares valid physical plans and chooses one with a low estimated cost.",
    sections: [
      {
        title: "Query-Processing Pipeline",
        paragraphs: [
          "The parser checks syntax and names, then creates an internal representation. Logical optimization rewrites relational operations, and physical optimization chooses scans, join algorithms, and access order.",
          "The executor runs the selected physical plan and returns rows. EXPLAIN commonly shows the chosen plan; product-specific output differs.",
        ],
        visual: {
          src: "/notes/dbms/query-processing-pipeline.png",
          alt: "SQL query processing from parser to logical plan, optimizer, physical plan, executor, and result, with candidate plans compared by estimated cost.",
          width: 1536,
          height: 1024,
          caption: "The optimizer maps one logical request to a physical plan with a low estimated cost.",
        },
      },
      {
        title: "Logical and Physical Plans",
        table: {
          headers: ["Logical plan", "Physical plan"],
          rows: [
            ["Says which relational operations are required", "Says how each operation will run"],
            ["Selection, projection, join, grouping", "Table scan, index scan, hash join, sort-merge join"],
          ],
        },
        paragraphs: [
          "Different physical plans can return the same rows but have very different page I/O, CPU, and memory costs.",
        ],
      },
      {
        title: "Useful Logical Rewrites",
        points: [
          "Push selections close to base tables so fewer rows continue upward.",
          "Push projections when safe so unneeded columns do not occupy memory and temporary pages.",
          "Choose a join order that keeps intermediate results small.",
          "Replace a Cartesian product followed by a matching condition with a join.",
        ],
        paragraphs: [
          "A rewrite must preserve the query result. SQL NULLs, duplicates, outer joins, and aggregates can restrict which rewrites are safe.",
        ],
      },
      {
        title: "Statistics and Selectivity",
        paragraphs: [
          "The optimizer estimates row counts using table size, distinct-value counts, histograms, indexes, and other statistics. Selectivity is the estimated fraction of rows that pass a condition.",
          "A smaller selectivity fraction means fewer matching rows and therefore a more selective condition.",
        ],
        formulas: [
          {
            label: "Simple equality estimate",
            expression: "estimated rows = total rows / number of distinct values",
            note: "This assumes values are roughly uniform and no better statistics are available.",
          },
        ],
      },
      {
        title: "Selectivity Numerical",
        paragraphs: [
          "EMP has 100,000 rows and 100 distinct department values. Estimate rows for department = 20 using uniform distribution.",
          "Real data may be skewed, so a histogram can give a better estimate than the uniform assumption.",
        ],
        formulas: [
          { label: "Selectivity", expression: "1 / 100 = 0.01 = 1%" },
          { label: "Estimated rows", expression: "100000 × 0.01 = 1,000 rows" },
        ],
      },
      {
        title: "Table Scan and Index Scan",
        paragraphs: [],
        dataTable: {
          headers: ["Access path", "Main cost idea", "Good situation"],
          rows: [
            ["Sequential table scan", "Read the table's pages in order", "Large result or no useful index"],
            ["Index scan", "Read index path plus matching data pages", "Small selective result"],
            ["Index-only scan", "Required columns are available in the index", "Avoids many table-page visits"],
          ],
        },
      },
      {
        title: "Reading a Basic EXPLAIN Plan",
        paragraphs: [
          "EXPLAIN SELECT * FROM EMPLOYEE WHERE EmpId = 10; shows the plan chosen without teaching one product's exact output format. First check whether it uses a table scan or an index scan, then check the estimated rows and total estimated cost.",
          "If an equality condition on an indexed key still produces a table scan, possible reasons include a very small table, stale statistics, an unusable expression on the indexed column, or a large estimated result. EXPLAIN ANALYZE in products that support it also runs the query, so use it carefully with statements that change data.",
        ],
      },
      {
        title: "Join Algorithms",
        dataTable: {
          headers: ["Algorithm", "Basic idea", "Works well when"],
          rows: [
            ["Nested-loop join", "For rows or blocks of one input, search the other", "Outer input is small or inner side has a useful index"],
            ["Block nested-loop join", "Load several outer pages, then scan the inner input", "Memory can hold a useful outer block"],
            ["Hash join", "Partition both inputs, then build a hash table on the smaller input or partition", "Large equi-joins"],
            ["Sort-merge join", "Sort both inputs and merge matching keys", "Inputs are sorted or ordered output is useful"],
          ],
        },
        paragraphs: [
          "A basic hash join is for equality conditions. Sort-merge and nested-loop methods can support a wider set of conditions.",
        ],
      },
      {
        title: "Pipelining and Materialization",
        table: {
          headers: ["Pipelining", "Materialization"],
          rows: [
            ["Pass rows directly to the next operator", "Store an intermediate result before the next operator reads it"],
            ["Uses less temporary I/O and can return rows sooner", "Useful when a result is reused or an operator must finish first"],
          ],
        },
        paragraphs: [
          "Sorting is a blocking operator because it usually needs its input before producing ordered output. A simple filter can normally pipeline rows as it finds them.",
        ],
      },
      {
        title: "Block Nested-Loop Numerical",
        paragraphs: [
          "Relation R has 1,000 pages, S has 200 pages, and the buffer has M = 22 pages. Use R as the outer relation. Ignore final output-write cost.",
        ],
        formulas: [
          {
            label: "Outer blocks",
            expression: "ceil(bR / (M − 2)) = ceil(1000 / 20) = 50",
          },
          {
            label: "Cost",
            expression: "bR + outer blocks × bS = 1000 + 50 × 200 = 11,000 page reads",
          },
        ],
        points: [
          "If S is the outer relation: ceil(200/20) = 10 blocks, so cost = 200 + 10 × 1000 = 10,200 reads.",
          "Using the smaller input as outer is cheaper here.",
        ],
      },
      {
        title: "Hash-Join Cost Estimate",
        paragraphs: [
          "For a two-pass Grace hash join, a common simplified cost is about 3(bR + bS): partition reads and writes plus the build/probe pass. This assumes suitable uniform partitions and ignores output cost.",
          "With M buffers, the smaller input should satisfy bSmall ≤ (M − 1)(M − 2) under this simplified two-pass model. Here, 200 ≤ 21 × 20 = 420, so M = 22 is enough.",
          "Under these shared assumptions, 3,600 is much lower than the 10,200 block nested-loop cost, so the optimizer would favour the hash join for an equality condition.",
        ],
        formulas: [
          {
            label: "For R = 1,000 pages and S = 200 pages",
            expression: "3(1000 + 200) = 3,600 page I/Os",
          },
        ],
      },
      {
        title: "Why Estimates Can Be Wrong",
        points: [
          "Statistics may be old.",
          "Values may be skewed rather than uniform.",
          "Columns may be correlated even when the estimate treats them as independent.",
          "Memory, caching, and concurrent work may differ from the estimate.",
        ],
        paragraphs: [
          "The optimizer chooses the best estimated plan, not a guaranteed fastest plan. Actual execution measurements help explain a poor choice.",
        ],
      },
      {
        title: "Practice: Choose the Access Path",
        paragraphs: [
          "A table has 20,000 pages. A B+ tree has height 3, where height counts the root, any internal level, and the leaf page. A condition is expected to find five records on five different data pages.",
        ],
        points: [
          "Approximate index cost = 3 index-page reads + 5 data-page reads = 8 reads, if those pages are not buffered.",
          "A table scan costs about 20,000 page reads.",
          "The index plan is clearly cheaper for this selective lookup.",
          "If most rows matched, scattered data-page reads could remove that advantage.",
        ],
      },
    ],
    mechanism: {
      title: "How to compare query plans",
      steps: [
        "Write each relation's page count, row count, and available memory.",
        "Estimate rows after each selection using the stated statistics.",
        "Push safe filters down and consider smaller intermediate results.",
        "Calculate scan and join costs using one consistent cost model.",
        "Check whether the join condition supports hash or sort-merge access.",
        "Choose the lowest valid estimated cost and state all assumptions.",
      ],
    },
    example: {
      title: "Route planner analogy",
      body: "SQL states the destination. The optimizer compares routes using estimates, and the executor follows the selected route. Incorrect traffic information can still make the chosen route slower than expected.",
    },
    misconception:
      "The optimizer does not change the requested answer. It chooses an equivalent plan that is expected to produce that answer with less work.",
  },
  revise: {
    definition:
      "Query optimization chooses access paths, operation methods, and join order using estimated cost and statistics.",
    sections: [
      {
        title: "Cost Recall",
        points: [
          "Block nested loop: bOuter + ceil(bOuter/(M−2)) × bInner.",
          "Two-pass Grace hash join: about 3(bR+bS).",
          "Index nested loop: outer scan plus one inner index lookup per outer row.",
          "Sort-merge: sorting costs, if needed, plus one merge scan.",
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Logical plan says what; physical plan says how.",
      "Push selective filters early when semantics allow it.",
      "Hash join requires an equality join condition.",
      "Pipelining avoids storing some intermediate results.",
      "Bad cardinality estimates can cause a bad plan.",
    ],
    followUp: "Why can changing the join order reduce cost even when the final result is unchanged?",
  },
  lastMinute: {
    definition: "Parse → logical plan → optimize → physical plan → execute.",
    sections: [
      {
        title: "Plan Choice",
        points: ["Few rows → index", "Many rows → scan", "Large equi-join → hash often fits", "Ordered inputs → merge may fit"],
      },
    ],
    memoryLine: "Reduce rows early, then choose the cheapest valid operators",
    cues: ["Selectivity", "Join order", "Page I/O"],
    trap: "Estimated cost is not measured running time.",
  },
};
