import type { SubjectTopic } from "@/lib/subject-content";

export const transactionsAndAcidProperties: SubjectTopic = {
  slug: "transactions-and-acid-properties",
  title: "Transactions and ACID Properties",
  description:
    "Understand transaction boundaries, ACID guarantees, and transaction states.",
  readTime: "24 min",
  difficulty: "Foundation",
  tags: ["Transactions", "ACID", "Transaction States"],
  learn: {
    opening:
      "A transaction is one logical unit of database work. It must either complete correctly or leave the database as though it never happened.",
    sections: [
      {
        title: "Transaction Basics",
        paragraphs: [
          "A transaction contains one or more read and write operations. BEGIN starts a transaction, COMMIT accepts its changes, and ROLLBACK cancels its uncommitted changes.",
          "A bank transfer is one transaction: subtract money from account A and add it to account B. Completing only one step would leave incorrect data.",
        ],
      },
      {
        title: "ACID Properties",
        dataTable: {
          headers: ["Property", "Meaning", "Transfer example"],
          rows: [
            [
              "Atomicity",
              "All operations happen or none happen",
              "Both debit and credit complete",
            ],
            [
              "Consistency",
              "A valid state changes into another valid state",
              "Constraints and balance rules remain valid",
            ],
            [
              "Isolation",
              "Concurrent transactions behave according to the chosen isolation guarantee",
              "Other work does not see unsafe intermediate transfer data",
            ],
            [
              "Durability",
              "Committed changes survive later failure",
              "The completed transfer remains after restart",
            ],
          ],
        },
        paragraphs: [
          "Consistency depends on correct transactions, constraints, and DBMS enforcement. The DBMS alone cannot fix an incorrect business rule written by the application.",
          "Atomicity handles incomplete transactions, isolation handles interference between concurrent transactions, and durability handles failure after a transaction commits.",
        ],
      },
      {
        title: "Transaction Boundaries and Autocommit",
        paragraphs: [
          "Many SQL systems use autocommit by default, so each standalone statement becomes its own transaction. An explicit transaction groups several statements under one COMMIT or ROLLBACK.",
          "SAVEPOINT marks a position for partial rollback inside a transaction. Exact commands and autocommit settings differ between DBMS products.",
        ],
      },
      {
        title: "Transaction Operations",
        points: [
          "r1(X): transaction T1 reads item X.",
          "w1(X): transaction T1 writes item X.",
          "c1: T1 commits.",
          "a1: T1 aborts.",
        ],
        paragraphs: [
          "This short notation is commonly used in schedule numericals. The subscript identifies the transaction.",
        ],
      },
      {
        title: "Transaction States",
        paragraphs: [
          "A transaction moves through states as it executes, commits, fails, aborts, or finishes.",
          "Committed and aborted transactions both reach the same Terminated state. An aborted transaction may instead restart as a new execution attempt.",
        ],
        visual: {
          src: "/notes/dbms/transaction-states.png",
          alt: "Transaction states showing normal commit, failure, abort, restart, and termination paths.",
          width: 1536,
          height: 1024,
          caption:
            "Partially committed work can still fail before its commit becomes durable.",
        },
        dataTable: {
          headers: ["State", "Meaning"],
          rows: [
            ["Active", "Instructions are executing"],
            [
              "Partially committed",
              "Last statement finished, but commit is not yet guaranteed durable",
            ],
            ["Committed", "Successful completion is recorded"],
            ["Failed", "The transaction cannot continue"],
            ["Aborted", "Its effects have been undone"],
            ["Terminated", "The transaction has left the system"],
          ],
        },
      },
      {
        title: "Why Transactions Fail",
        paragraphs: [],
        points: [
          "Logical error, such as insufficient balance.",
          "Constraint violation or invalid input.",
          "Deadlock victim selection.",
          "System crash, power loss, or storage failure.",
        ],
      },
      {
        title: "Practice: Transfer Failure",
        paragraphs: [
          "T1 subtracts 500 from A, but the system fails before adding 500 to B. Atomicity requires the debit to be undone. After T1 commits, durability requires both changes to survive a later restart.",
          "The DBMS commonly uses log records and stable storage to support atomicity and durability. Recovery logging is explained in Module 6.",
        ],
      },
    ],
    mechanism: {
      title: "How to analyse a transaction scenario",
      steps: [
        "Identify the logical unit of work.",
        "Mark its reads, writes, commit, or abort.",
        "Find any visible intermediate state.",
        "Connect the problem to atomicity, consistency, isolation, or durability.",
        "State whether rollback or committed-data recovery is required.",
      ],
    },
    example: {
      title: "Online order",
      body: "Creating an order and reducing stock should be one transaction. If payment validation fails, both changes should roll back rather than leaving an order without the correct stock update.",
    },
    misconception:
      "ACID does not mean every transaction runs alone. Concurrency is allowed when the chosen control method preserves the required correctness.",
  },
  revise: {
    definition:
      "A transaction is a logical unit of work that commits completely or aborts without leaving partial effects.",
    sections: [
      {
        title: "ACID Recall",
        points: [
          "Atomicity: all or nothing.",
          "Consistency: valid state to valid state.",
          "Isolation: controlled concurrent visibility.",
          "Durability: committed means persistent.",
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "COMMIT accepts changes; ROLLBACK cancels uncommitted changes.",
      "Partially committed is not yet safely committed.",
      "An aborted transaction may restart or terminate.",
      "Consistency also depends on correct application logic.",
    ],
    followUp:
      "Which ACID property is violated when only the debit part of a transfer remains?",
  },
  lastMinute: {
    definition: "Transaction = one complete logical database action.",
    sections: [
      {
        title: "State Path",
        points: [
          "Normal: active → partially committed → committed.",
          "Failure: active or partially committed → failed → aborted.",
        ],
      },
    ],
    memoryLine: "All or nothing • valid • isolated • permanent",
    cues: ["BEGIN", "COMMIT", "ROLLBACK"],
    trap: "Partially committed does not mean durable.",
  },
};

export const schedulesAndSerializability: SubjectTopic = {
  slug: "schedules-and-serializability",
  title: "Schedules and Serializability",
  description:
    "Analyse concurrent schedules using conflicts and precedence graphs.",
  readTime: "32 min",
  difficulty: "Advanced",
  tags: ["Schedules", "Serializability", "Precedence Graph"],
  learn: {
    opening:
      "A schedule is the order in which operations from transactions execute. It preserves the internal order of every individual transaction.",
    sections: [
      {
        title: "Serial and Non-Serial Schedules",
        table: {
          headers: ["Serial", "Non-serial"],
          rows: [
            [
              "One transaction finishes before another starts",
              "Operations from transactions are interleaved",
            ],
            [
              "Simple and safe but less concurrent",
              "Higher concurrency but needs correctness checks",
            ],
          ],
        },
        paragraphs: [
          "A serializable non-serial schedule has the same relevant effect as some serial order.",
        ],
      },
      {
        title: "When Two Operations Conflict",
        paragraphs: [
          "Two operations conflict when they belong to different transactions, access the same item, and at least one is a write.",
        ],
        dataTable: {
          headers: ["Pair", "Conflict?", "Reason"],
          rows: [
            ["r1(X), r2(X)", "No", "Neither writes"],
            ["r1(X), w2(X)", "Yes", "Read-write on X"],
            ["w1(X), r2(X)", "Yes", "Write-read on X"],
            ["w1(X), w2(X)", "Yes", "Write-write on X"],
            ["w1(X), r2(Y)", "No", "Different items"],
          ],
        },
      },
      {
        title: "Conflict Equivalence and Serializability",
        paragraphs: [
          "Two schedules are conflict equivalent when they contain the same operations and preserve the relative order of every conflicting pair.",
          "A schedule is conflict serializable when it is conflict equivalent to some serial schedule.",
        ],
      },
      {
        title: "Precedence Graph Algorithm",
        points: [
          "Create one node for each transaction.",
          "For each conflicting pair on the same item, draw Ti → Tj when Ti's operation appears first.",
          "Ignore read-read pairs and operations on different items.",
          "No directed cycle means conflict serializable.",
          "A topological ordering gives an equivalent serial order.",
          "Several conflicts between the same two transactions need only one edge in the same direction.",
        ],
        paragraphs: [],
      },
      {
        title: "Worked Acyclic Graph",
        paragraphs: [
          "The schedule creates T1 → T2 from X and T2 → T3 from Y. Its only topological order is T1, T2, T3.",
        ],
        visual: {
          src: "/notes/dbms/precedence-graph.png",
          alt: "An acyclic precedence graph for three transactions with serial order T1, T2, T3.",
          width: 1536,
          height: 1024,
          caption:
            "An acyclic precedence graph proves conflict serializability.",
        },
      },
      {
        title: "Practice: Cyclic Schedule",
        paragraphs: ["Consider S = r1(X), r2(X), w1(X), w2(X)."],
        points: [
          "r2(X) occurs before w1(X), giving T2 → T1.",
          "w1(X) occurs before w2(X), giving T1 → T2.",
          "The graph contains a cycle T1 ↔ T2.",
          "Therefore, S is not conflict serializable.",
        ],
      },
      {
        title: "Worked Conflict Table",
        paragraphs: [
          "For S = r1(X), w1(X), r2(X), w2(Y), r3(Y), list conflicts before drawing the graph.",
        ],
        dataTable: {
          headers: ["Earlier operation", "Later operation", "Edge"],
          rows: [
            ["w1(X)", "r2(X)", "T1 → T2"],
            ["w2(Y)", "r3(Y)", "T2 → T3"],
            ["r1(X)", "r2(X)", "No edge; read-read"],
          ],
        },
      },
      {
        title: "Practice: Three Transactions",
        paragraphs: [
          "For S = w1(X), r2(X), w2(Y), r3(Y), w3(Z), r1(Z), find the graph.",
        ],
        points: [
          "X creates T1 → T2.",
          "Y creates T2 → T3.",
          "Z creates T3 → T1.",
          "The graph has a cycle, so the schedule is not conflict serializable.",
        ],
      },
      {
        title: "View Serializability",
        paragraphs: [
          "View serializability is broader than conflict serializability. It preserves who reads each value and which transaction performs the final write.",
          "Every conflict-serializable schedule is view serializable, but a schedule with blind writes can be view serializable without being conflict serializable. Testing general view serializability is harder, so precedence graphs test only conflict serializability.",
          "View equivalence preserves transactions that read initial values, each read-from relationship, and the transaction performing the final write on every item.",
        ],
      },
      {
        title: "Blind-Write Example",
        paragraphs: [
          "Consider S = w1(X), w2(X), w1(X). Both transactions perform blind writes because neither reads X first.",
          "The conflicts create T1 → T2 and T2 → T1, so S is not conflict serializable. It is view equivalent to serial order T2, T1 because there are no reads to preserve and T1 performs the final write in both schedules.",
        ],
      },
    ],
    mechanism: {
      title: "How to solve a serializability numerical",
      steps: [
        "Write one graph node per transaction.",
        "Compare operations on each data item.",
        "Add an edge for every ordered cross-transaction conflict.",
        "Check the completed graph for a directed cycle.",
        "If acyclic, write one topological order as the serial order.",
      ],
    },
    example: {
      title: "Several valid serial orders",
      body: "If a graph contains only T1 → T3 and T2 → T3, both T1,T2,T3 and T2,T1,T3 are valid serial orders because T1 and T2 have no required order between them.",
    },
    misconception:
      "A non-serial schedule is not automatically incorrect. It may still be serializable.",
  },
  revise: {
    definition:
      "Conflict serializability means preserving the order of conflicting operations from some serial schedule.",
    sections: [
      {
        title: "Graph Test",
        flow: [
          "Find conflicts",
          "Draw earlier → later edges",
          "Check for cycle",
          "Topologically sort if acyclic",
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Same item, different transactions, and at least one write creates a conflict.",
      "Acyclic graph means conflict serializable.",
      "A cycle means not conflict serializable.",
      "Topological orders are equivalent serial orders.",
    ],
    followUp: "Which edge is created when w2(X) occurs before r1(X)?",
  },
  lastMinute: {
    definition:
      "Precedence graph: transaction nodes and earlier-to-later conflict edges.",
    sections: [
      {
        title: "Fast Conflict Check",
        points: [
          "Read-read: no.",
          "Read-write: yes.",
          "Write-read: yes.",
          "Write-write: yes.",
        ],
      },
    ],
    memoryLine: "No cycle → serializable → topological order",
    cues: ["Same item", "At least one write", "Cycle"],
    trap: "Do not draw edges for operations on different data items.",
  },
};

export const recoverabilityOfSchedules: SubjectTopic = {
  slug: "recoverability-of-schedules",
  title: "Recoverability of Schedules",
  description:
    "Distinguish recoverable, cascadeless, and strict schedules using read-from relationships.",
  readTime: "26 min",
  difficulty: "Intermediate",
  tags: ["Recoverability", "Dirty Read", "Strict Schedule"],
  learn: {
    opening:
      "Serializability controls the logical result of concurrent work. Recoverability controls whether commits and aborts can be handled safely.",
    sections: [
      {
        title: "Reading From Another Transaction",
        paragraphs: [
          "If T1 writes X and T2 later reads that value, T2 reads from T1. The commit order now matters if T1 has not committed yet.",
        ],
      },
      {
        title: "Recoverable Schedule",
        paragraphs: [
          "A schedule is recoverable when a transaction that reads from another transaction commits only after the writer commits.",
          "w1(X), r2(X), c1, c2 is recoverable. w1(X), r2(X), c2, a1 is unrecoverable because T2 committed using a value that T1 later aborted.",
        ],
      },
      {
        title: "Cascadeless Schedule",
        paragraphs: [
          "A schedule is cascadeless when a transaction reads a value only after the transaction that wrote it commits.",
          "This prevents dirty reads and cascading rollback. Example: w1(X), c1, r2(X), c2.",
        ],
      },
      {
        title: "Strict Schedule",
        paragraphs: [
          "A schedule is strict when no other transaction may read or write an item written by an uncommitted transaction. It waits until that writer commits or aborts.",
          "Strictness prevents dirty reads and dirty writes and makes recovery simpler.",
        ],
      },
      {
        title: "Strength Relationship",
        flow: ["Strict", "Cascadeless", "Recoverable"],
        paragraphs: [
          "Every strict schedule is cascadeless, and every cascadeless schedule is recoverable. The reverse implications do not always hold.",
        ],
      },
      {
        title: "Practice: Classify Schedules",
        paragraphs: [],
        dataTable: {
          headers: ["Schedule", "Classification", "Reason"],
          rows: [
            [
              "w1(X), r2(X), c1, c2",
              "Recoverable, not cascadeless",
              "T2 reads dirty data but commits later",
            ],
            [
              "w1(X), c1, r2(X), c2",
              "Cascadeless and recoverable",
              "Read occurs after writer commits",
            ],
            [
              "w1(X), w2(X), c1, c2",
              "Cascadeless and recoverable, not strict",
              "No reads occur, but T2 overwrites uncommitted X",
            ],
            [
              "w1(X), r2(X), c2, a1",
              "Unrecoverable",
              "Reader commits before writer aborts",
            ],
          ],
        },
      },
      {
        title: "Cascading Rollback",
        paragraphs: [
          "If T2 reads an uncommitted value from T1 and T3 reads an uncommitted value from T2, aborting T1 may force T2 and T3 to abort. Cascadeless schedules prevent this chain.",
        ],
      },
      {
        title: "Practice: Track the Actual Writer",
        paragraphs: [
          "Consider w1(X), w2(X), r3(X), c2, c3, c1. The read by T3 obtains the latest value, written by T2, not the older value from T1.",
        ],
        points: [
          "T3 reads from T2.",
          "T3 commits after T2, so that read-from relationship is recoverable.",
          "T3 reads before T2 commits, so the schedule is not cascadeless.",
          "T2 writes X before T1 commits, so the schedule is also not strict.",
        ],
      },
    ],
    mechanism: {
      title: "How to classify a schedule",
      steps: [
        "Mark which write produced every read value.",
        "Check whether each reader commits after its writer for recoverability.",
        "Check whether every read waits for the writer's commit for cascadelessness.",
        "Check whether both reads and writes wait after an uncommitted write for strictness.",
        "State the strongest property satisfied.",
      ],
    },
    example: {
      title: "Recoverable but not cascadeless",
      body: "In w1(X), r2(X), c1, c2, T2 reads uncommitted X, so the schedule is not cascadeless. T2 waits to commit until after T1 commits, so it is recoverable.",
    },
    misconception:
      "A recoverable schedule may still allow dirty reads. Cascadelessness is the stronger condition that prevents them.",
  },
  revise: {
    definition:
      "Recoverability restricts commit order after read-from dependencies.",
    sections: [
      {
        title: "Three Levels",
        dataTable: {
          headers: ["Property", "Required wait"],
          rows: [
            ["Recoverable", "Reader's commit waits for writer's commit"],
            ["Cascadeless", "Read waits for writer's commit"],
            ["Strict", "Read and write wait after an uncommitted write"],
          ],
        },
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Strict ⇒ cascadeless ⇒ recoverable.",
      "Dirty read means reading an uncommitted write.",
      "Dirty write means overwriting an uncommitted write.",
      "Commit order alone does not make a schedule cascadeless.",
    ],
    followUp: "Why is w1(X), r2(X), c1, c2 recoverable but not cascadeless?",
  },
  lastMinute: {
    definition:
      "Recoverable protects commit order; cascadeless protects reads; strict protects reads and writes.",
    sections: [
      {
        title: "Fast Order",
        points: [
          "Strict is strongest.",
          "Uncommitted read breaks cascadelessness.",
          "Reader commit before writer commit breaks recoverability.",
        ],
      },
    ],
    memoryLine: "Commit waits → read waits → read and write wait",
    cues: ["Reads-from", "Commit order", "Dirty data"],
    trap: "Serializability and recoverability are different schedule properties.",
  },
};

export const concurrencyProblemsAndLocking: SubjectTopic = {
  slug: "concurrency-problems-and-locking",
  title: "Concurrency Problems and Locking",
  description:
    "Recognize concurrency anomalies and use shared and exclusive locks correctly.",
  readTime: "26 min",
  difficulty: "Intermediate",
  tags: ["Concurrency", "Locks", "Isolation Levels"],
  learn: {
    opening:
      "Concurrent transactions improve throughput, but uncontrolled interleaving can expose partial work or produce incorrect results.",
    sections: [
      {
        title: "Common Concurrency Problems",
        paragraphs: [],
        dataTable: {
          headers: ["Problem", "What happens", "Short example"],
          rows: [
            [
              "Lost update",
              "One write overwrites another update",
              "T1 and T2 both read 100, then write 110 and 120",
            ],
            [
              "Dirty read",
              "A transaction reads uncommitted data",
              "T2 reads T1's value before T1 aborts",
            ],
            [
              "Non-repeatable read",
              "The same row gives different committed values",
              "T1 reads X, T2 updates and commits, T1 reads X again",
            ],
            [
              "Phantom read",
              "A repeated condition query returns a changed row set",
              "T2 inserts a matching row between T1's two queries",
            ],
          ],
        },
      },
      {
        title: "Lost Update Numerical",
        paragraphs: [
          "X starts at 100. T1 adds 10 and T2 adds 20 using the same old value.",
          "The correct serial result is 130, but T2's later write overwrites T1's update and leaves 120.",
        ],
        dataTable: {
          headers: ["Step", "T1", "T2", "Stored X"],
          rows: [
            ["1", "read X = 100", "", "100"],
            ["2", "", "read X = 100", "100"],
            ["3", "write 110", "", "110"],
            ["4", "", "write 120", "120"],
          ],
        },
      },
      {
        title: "Shared and Exclusive Locks",
        paragraphs: [
          "A shared lock, S, is used for reading. Several transactions may hold S locks on the same item. An exclusive lock, X, is used for writing and excludes every other S or X lock on that item.",
          "The compatibility table compares locks requested by different transactions. A transaction does not conflict with a lock it already owns, although changing its lock mode may require an upgrade.",
        ],
        dataTable: {
          headers: ["Held / requested", "S requested", "X requested"],
          rows: [
            ["No lock", "Grant", "Grant"],
            ["S lock", "Grant", "Wait"],
            ["X lock", "Wait", "Wait"],
          ],
        },
      },
      {
        title: "Lock Conversion",
        paragraphs: [
          "Upgrading changes S to X when a reader later needs to write. The upgrade waits until no incompatible lock remains.",
          "Downgrading changes X to S when writing is finished. Under 2PL, upgrades belong to the growing phase and downgrades belong to the shrinking phase.",
        ],
      },
      {
        title: "Lock Granularity",
        paragraphs: [
          "A DBMS can lock a database, table, page, row, or another logical range. Coarse locks cover more data and need less lock-management work, but they reduce concurrency. Fine locks allow more concurrency but require more locks.",
          "Lock escalation replaces many fine-grained locks with a larger lock when managing the smaller locks becomes expensive.",
        ],
      },
      {
        title: "Intention Locks",
        paragraphs: [
          "In hierarchical locking, an intention lock on a table announces that a transaction holds or plans lower-level locks, such as row locks. This lets the DBMS safely check a table-level request without inspecting every row lock.",
          "IS means intention shared, IX means intention exclusive, and SIX means shared on the larger object with intention exclusive below. The full compatibility matrix is advanced implementation detail.",
        ],
      },
      {
        title: "Isolation Levels",
        paragraphs: [
          "SQL isolation levels describe which anomalies must be prevented. Exact implementation may use locks, multiversion concurrency control, or both.",
          "With multiversion concurrency control (MVCC), the DBMS keeps row versions so readers can use a consistent snapshot without blocking many writers. Snapshot isolation is useful, but it is not automatically the same as full serializability and can still allow anomalies such as write skew.",
          "DBMS products can provide stronger behaviour than the minimum shown here. Use the named product's documentation for product-specific questions.",
          "The standard table focuses on dirty reads, non-repeatable reads, and phantoms. Lost-update behaviour also depends on the DBMS implementation and how the update is written.",
        ],
        dataTable: {
          headers: ["Level", "Dirty read", "Non-repeatable read", "Phantom"],
          rows: [
            ["Read Uncommitted", "May occur", "May occur", "May occur"],
            ["Read Committed", "Prevented", "May occur", "May occur"],
            [
              "Repeatable Read",
              "Prevented",
              "Prevented",
              "May occur by the standard",
            ],
            ["Serializable", "Prevented", "Prevented", "Prevented"],
          ],
        },
      },
      {
        title: "Practice: Lock Requests",
        paragraphs: ["T1 holds S(X), and T2 holds S(X)."],
        points: [
          "T3 may receive another S(X).",
          "T1 cannot immediately upgrade to X(X) while T2 still holds S(X).",
          "A new X(X) request must wait until every shared lock is released.",
        ],
      },
      {
        title: "Worked Lock Sequence",
        paragraphs: [
          "Process the requests in order. Locks belong to different transactions.",
        ],
        dataTable: {
          headers: ["Request", "Decision", "Lock state"],
          rows: [
            ["T1 requests S(A)", "Grant", "T1:S(A)"],
            ["T2 requests S(A)", "Grant", "T1:S(A), T2:S(A)"],
            ["T3 requests X(A)", "Wait", "T1 and T2 still hold S(A)"],
            ["T1 releases S(A)", "T3 still waits", "T2:S(A)"],
            ["T2 releases S(A)", "Grant T3", "T3:X(A)"],
            ["T4 requests S(A)", "Wait", "T3 holds X(A)"],
          ],
        },
      },
      {
        title: "Preventing Phantoms",
        paragraphs: [
          "Locking only the rows currently returned by a condition may not stop another transaction from inserting a new matching row.",
          "Serializable locking can protect the searched key range or predicate, preventing inserts that would create phantoms until the transaction ends.",
        ],
      },
    ],
    mechanism: {
      title: "How to analyse a lock sequence",
      steps: [
        "Track the current lock holders for each item.",
        "Use the compatibility table for every new request.",
        "Grant compatible requests and queue incompatible requests.",
        "Track upgrades and releases in their correct 2PL phase.",
        "Check waiting transactions for deadlock when waits form a cycle.",
      ],
    },
    example: {
      title: "Two readers and one writer",
      body: "T1 and T2 may both hold S(X). If T3 requests X(X), it waits until both readers release their shared locks.",
    },
    misconception:
      "Repeatable Read and Serializable are not always implemented with the same locks in every DBMS. The required isolation guarantee matters more than one implementation detail.",
  },
  revise: {
    definition:
      "Concurrency control prevents harmful interaction while allowing safe overlap between transactions.",
    sections: [
      {
        title: "Lock Compatibility",
        table: {
          headers: ["Shared lock", "Exclusive lock"],
          rows: [
            ["Compatible with shared", "Compatible with no other lock"],
            ["Used for reading", "Required for writing"],
          ],
        },
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Lost update overwrites completed work.",
      "Dirty read uses uncommitted data.",
      "Non-repeatable read changes one row; phantom changes a qualifying row set.",
      "Serializable prevents the listed standard anomalies.",
    ],
    followUp:
      "Why can two transactions share S(X) while an X(X) request must wait?",
  },
  lastMinute: {
    definition: "S reads and shares; X writes and excludes.",
    sections: [
      {
        title: "Anomaly Recall",
        points: [
          "Overwrite → lost update.",
          "Uncommitted value → dirty read.",
          "Changed row → non-repeatable read.",
          "Changed result set → phantom.",
        ],
      },
    ],
    memoryLine: "Many readers or one writer",
    cues: ["S lock", "X lock", "Isolation level"],
    trap: "A phantom is about a changed set of matching rows, not merely a changed value in one known row.",
  },
};

export const twoPhaseLockingAndDeadlocks: SubjectTopic = {
  slug: "two-phase-locking-and-deadlocks",
  title: "Two-Phase Locking and Deadlocks",
  description:
    "Use 2PL variants and wait-for graphs to reason about serializability and deadlocks.",
  readTime: "26 min",
  difficulty: "Advanced",
  tags: ["2PL", "Deadlock", "Wait-For Graph"],
  learn: {
    opening:
      "Two-Phase Locking controls when transactions acquire and release locks. It guarantees conflict serializability, but ordinary 2PL can still allow deadlocks and cascading rollback.",
    sections: [
      {
        title: "Basic Two-Phase Locking",
        dataTable: {
          headers: ["Phase", "Allowed"],
          rows: [
            ["Growing", "Acquire locks and upgrade; release none"],
            ["Shrinking", "Release locks and downgrade; acquire no new lock"],
          ],
        },
        paragraphs: [
          "The point at which a transaction obtains its final lock is called its lock point. Serial order can be related to lock-point order.",
        ],
      },
      {
        title: "Legal and Illegal 2PL Sequences",
        dataTable: {
          headers: ["Sequence", "Decision", "Reason"],
          rows: [
            [
              "lock-S(A), lock-X(B), unlock(A), unlock(B)",
              "Legal",
              "All acquisitions occur before the first unlock",
            ],
            [
              "lock-S(A), unlock(A), lock-X(B)",
              "Illegal",
              "A new lock is requested after shrinking starts",
            ],
            [
              "lock-S(A), upgrade A to X, unlock(A)",
              "Legal",
              "The upgrade occurs in the growing phase",
            ],
            [
              "lock-X(A), downgrade A to S, lock-S(B)",
              "Illegal",
              "A downgrade starts shrinking before the new lock",
            ],
          ],
        },
        paragraphs: [
          "If T1's lock point comes before T2's lock point, the 2PL schedule is equivalent to a serial order that places T1 before T2 when their operations conflict.",
        ],
      },
      {
        title: "2PL Variants",
        paragraphs: [],
        dataTable: {
          headers: ["Protocol", "Rule", "Main effect"],
          rows: [
            [
              "Basic 2PL",
              "No new lock after the first unlock",
              "Conflict serializable",
            ],
            [
              "Conservative 2PL",
              "Acquire all required locks together before execution; start only if all are granted",
              "Deadlock-free but lower concurrency",
            ],
            [
              "Strict 2PL",
              "Hold all X locks until commit or abort",
              "Strict schedules and simpler recovery",
            ],
            [
              "Rigorous 2PL",
              "Hold all S and X locks until commit or abort",
              "Commit order matches serialization order",
            ],
          ],
        },
      },
      {
        title: "Deadlock Conditions",
        paragraphs: [
          "A deadlock can occur when all four Coffman conditions hold together.",
        ],
        points: [
          "Mutual exclusion: a resource cannot be shared in the requested mode.",
          "Hold and wait: a transaction holds one resource while waiting for another.",
          "No preemption: a held resource is not forcibly taken away normally.",
          "Circular wait: transactions form a waiting cycle.",
        ],
      },
      {
        title: "Wait-For Graph",
        paragraphs: [
          "Create a node for each active transaction. Draw Ti → Tj when Ti waits for a lock held by Tj. A directed cycle means deadlock for single-instance database locks.",
        ],
        visual: {
          src: "/notes/dbms/wait-for-graph-deadlock.png",
          alt: "Two-transaction wait-for graph cycle in which each transaction waits for a lock held by the other.",
          width: 1536,
          height: 1024,
          caption:
            "The two directed waits form a cycle, so one victim must be rolled back.",
        },
      },
      {
        title: "Deadlock Handling",
        paragraphs: [],
        dataTable: {
          headers: ["Approach", "How it works"],
          rows: [
            [
              "Prevention",
              "Break a deadlock condition using ordering or conservative locking",
            ],
            [
              "Detection",
              "Allow waits, find a wait-for cycle, and abort a victim",
            ],
            [
              "Timeout",
              "Abort a transaction that waits too long; simple but may abort without a true deadlock",
            ],
          ],
        },
      },
      {
        title: "Practice: Find the Cycle",
        paragraphs: ["T1 waits for T2, T2 waits for T3, and T3 waits for T1."],
        points: [
          "Edges: T1 → T2, T2 → T3, T3 → T1.",
          "The directed cycle proves deadlock.",
          "The DBMS chooses a victim using factors such as rollback cost, work completed, and resources held.",
        ],
      },
      {
        title: "Victim Rollback and Starvation",
        paragraphs: [
          "A victim may be rolled back completely or to a safe checkpoint when partial rollback is supported. Its locks are released so other transactions can continue.",
          "Repeatedly selecting the same transaction can cause starvation. The DBMS can include rollback count or waiting age in victim cost so an often-aborted transaction eventually receives priority.",
        ],
      },
    ],
    mechanism: {
      title: "How to solve a deadlock problem",
      steps: [
        "List each held lock and pending request.",
        "Draw waiter → holder edges.",
        "Search the completed graph for a directed cycle.",
        "State which transaction waits or aborts and whether a deadlock remains possible.",
      ],
    },
    example: {
      title: "Strict 2PL does not prevent deadlock",
      body: "T1 may hold X(X) and wait for Y while T2 holds X(Y) and waits for X. Holding exclusive locks until commit makes recovery safer, but the circular wait still creates deadlock.",
    },
    misconception:
      "2PL guarantees conflict serializability, not deadlock freedom. Conservative 2PL is the deadlock-preventing variant listed here.",
  },
  revise: {
    definition:
      "2PL has a growing lock-acquisition phase followed by a shrinking release phase.",
    sections: [
      {
        title: "Variant Recall",
        points: [
          "Basic: serializable.",
          "Conservative: all locks first.",
          "Strict: X locks until end.",
          "Rigorous: all locks until end.",
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "A wait-for edge points from waiter to holder.",
      "A wait-for cycle means deadlock.",
      "Detection needs victim rollback.",
      "Strict 2PL improves recovery but does not prevent deadlock.",
    ],
    followUp:
      "Why can strict 2PL still deadlock even though it produces strict schedules?",
  },
  lastMinute: {
    definition:
      "Grow locks, then shrink; never acquire after releasing under 2PL.",
    sections: [
      {
        title: "Deadlock Check",
        points: [
          "Build waiter → holder graph.",
          "Cycle? Deadlock.",
          "Break it by aborting a victim.",
        ],
      },
    ],
    memoryLine: "2PL serializes; strict simplifies recovery; cycle deadlocks",
    cues: ["Growing", "Shrinking", "Waiter → holder"],
    trap: "Strict 2PL holds X locks, while rigorous 2PL holds both S and X locks until the end.",
  },
};

export const timestampAndOptimisticConcurrencyControl: SubjectTopic = {
  slug: "timestamp-and-optimistic-concurrency-control",
  title: "Timestamp and Optimistic Concurrency Control",
  description:
    "Order conflicting operations with timestamps and validate low-conflict transactions optimistically.",
  readTime: "20 min",
  difficulty: "Advanced",
  tags: ["Timestamp Ordering", "Optimistic Control"],
  learn: {
    opening:
      "Timestamp ordering uses transaction ages instead of locks. Optimistic control allows work to proceed privately and checks for conflicts before writing shared data.",
    sections: [
      {
        title: "Timestamp Ordering Basics",
        paragraphs: [
          "Each transaction Ti receives a unique timestamp TS(Ti). A smaller timestamp means an older transaction.",
          "Each item X stores read_TS(X), the largest timestamp of a transaction that successfully read X, and write_TS(X), the largest timestamp of a transaction that successfully wrote X.",
        ],
      },
      {
        title: "Basic Read Rule",
        paragraphs: [
          "For read_i(X), if TS(Ti) < write_TS(X), Ti is trying to read a value written by a newer transaction. Reject and restart Ti. Otherwise allow the read and set read_TS(X) = max(read_TS(X), TS(Ti)).",
        ],
      },
      {
        title: "Basic Write Rule",
        paragraphs: [
          "For write_i(X), reject and restart Ti if TS(Ti) < read_TS(X), because a newer transaction already read the old value.",
          "Also reject and restart under basic timestamp ordering if TS(Ti) < write_TS(X), because a newer write already occurred. Otherwise write X and set write_TS(X) = TS(Ti).",
        ],
      },
      {
        title: "Worked Timestamp Numerical",
        paragraphs: [
          "Let TS(T1) = 5, TS(T2) = 10, and initially read_TS(X) = write_TS(X) = 0.",
          "The rejected w1(X) changes neither X nor its timestamps. Restarted T1 receives a new transaction instance according to the protocol used by the DBMS.",
        ],
        dataTable: {
          headers: ["Operation", "Check", "Result and timestamps"],
          rows: [
            ["r2(X)", "10 < 0 is false", "Allow; read_TS(X) = 10"],
            ["w1(X)", "5 < read_TS(X)=10", "Reject and restart T1"],
            [
              "w2(X)",
              "10 is not less than either timestamp",
              "Allow; write_TS(X) = 10",
            ],
          ],
        },
      },
      {
        title: "Properties of Timestamp Ordering",
        paragraphs: [],
        points: [
          "Conflicting operations follow timestamp order.",
          "Transactions do not wait for locks, so deadlocks do not occur.",
          "Repeated restarts can cause starvation.",
          "Basic timestamp ordering may allow cascading rollback unless a stricter variant is used.",
        ],
      },
      {
        title: "Strict Timestamp Ordering",
        paragraphs: [
          "Basic timestamp ordering can expose a value written by an uncommitted transaction. Strict timestamp ordering still applies the timestamp tests, but delays an operation that would access X while X contains a value written by an uncommitted transaction.",
          "This produces strict schedules and avoids cascading rollback while keeping timestamp order for conflicts.",
        ],
      },
      {
        title: "Optimistic Concurrency Control",
        paragraphs: [
          "Optimistic control assumes conflicts are uncommon. Transactions work without holding long-lived data locks, then validate before making writes visible.",
        ],
        dataTable: {
          headers: ["Phase", "Work"],
          rows: [
            [
              "Read",
              "Read database values and make tentative changes privately",
            ],
            [
              "Validation",
              "Check whether overlapping transactions create a forbidden conflict",
            ],
            [
              "Write",
              "Publish changes if validation succeeds; otherwise restart",
            ],
          ],
        },
      },
      {
        title: "When Optimistic Control Fits",
        points: [
          "Good when conflicts are rare and transactions are short.",
          "Avoids lock waiting and deadlock.",
          "Performs poorly under heavy contention because validation failures waste completed work.",
        ],
        paragraphs: [],
      },
    ],
    mechanism: {
      title: "How to solve a timestamp-ordering problem",
      steps: [
        "Write each transaction timestamp and each item's read_TS and write_TS.",
        "For a read, compare the transaction timestamp with write_TS.",
        "For a write, compare it with read_TS first and then write_TS.",
        "After an allowed operation, update the correct timestamp.",
      ],
    },
    example: {
      title: "Locks vs timestamps",
      body: "Locking may make a transaction wait, which can lead to deadlock. Basic timestamp ordering normally aborts a transaction instead of waiting when an operation violates timestamp order, so it avoids deadlock but may cause more restarts.",
    },
    misconception:
      "A larger timestamp means a newer transaction. It does not automatically mean that every operation from that transaction is allowed; apply the read and write rules to the specific item.",
  },
  revise: {
    definition:
      "Timestamp ordering forces conflicting operations to respect transaction timestamp order.",
    sections: [
      {
        title: "Rules",
        dataTable: {
          headers: ["Operation", "Reject when"],
          rows: [
            ["read_i(X)", "TS(Ti) < write_TS(X)"],
            ["write_i(X)", "TS(Ti) < read_TS(X) or TS(Ti) < write_TS(X)"],
          ],
        },
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Smaller timestamp means older transaction.",
      "Allowed reads update read_TS.",
      "Allowed writes update write_TS.",
      "Timestamp ordering avoids deadlock but can restart transactions.",
    ],
    followUp:
      "Why must an old write still abort when a newer transaction has already read the old value?",
  },
  lastMinute: {
    definition:
      "Compare TS(Ti) with read_TS(X) and write_TS(X) before each operation.",
    sections: [
      {
        title: "Fast Rule",
        points: [
          "Old read after newer write → abort.",
          "Old write after newer read → abort.",
          "Old write after newer write → abort under basic timestamp ordering.",
        ],
      },
    ],
    memoryLine: "Older work cannot move behind newer conflicting work",
    cues: ["TS", "read_TS", "write_TS"],
    trap: "Update read_TS or write_TS only after the operation is allowed.",
  },
};
