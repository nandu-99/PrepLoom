import type { SubjectTopic } from "@/lib/subject-content";

const semaphoresMonitorsDetailed: SubjectTopic = {
  slug: "semaphores-monitors",
  title: "Semaphores and Monitors",
  description:
    "Use Semaphores to manage permits and signals, and Monitors to combine shared data, mutual exclusion, and condition waiting.",
  readTime: "Detailed note",
  difficulty: "Intermediate",
  tags: ["Semaphore", "Monitor", "Condition Variable"],
  learn: {
    opening:
      "Semaphores and Monitors coordinate concurrent tasks when a simple one-owner lock is not enough.",
    sections: [
      {
        title: "Overview",
        paragraphs: [
          "Locks and Mutexes are useful when one thread should enter a Critical Section at a time. Some problems need more flexible coordination.",
          "A system may need to allow several tasks to use a limited resource, make one task wait for an event, or coordinate producers and consumers.",
          "Semaphores provide counters and signals. Monitors provide a higher-level structure that combines shared data, protected methods, and condition waiting.",
        ],
        points: [
          "Allow up to N tasks to use a resource.",
          "Wait until another task reports that an event happened.",
          "Coordinate producers and consumers safely.",
        ],
      },
      {
        title: "Why it Matters",
        paragraphs: [
          "Imagine a parking lot with 10 spaces. Ten cars may enter, but the next car must wait until a space becomes free.",
          "A Mutex represents one owner, so it does not naturally represent 10 available permits. A Counting Semaphore can track the number of free spaces.",
          "A Monitor helps organize more complex shared state by keeping the data and allowed operations together under one synchronization rule.",
        ],
      },
      {
        title: "Core Concept",
        paragraphs: [
          "A Semaphore controls permits through an atomic counter. A Monitor controls entry to protected methods and uses Condition Variables when a thread must wait for a state change.",
        ],
        visual: {
          src: "/notes/operating-systems/semaphore-monitor-overview.png",
          alt: "Side-by-side overview showing a Semaphore controlling several permits and a Monitor allowing one active thread while other threads wait on conditions.",
          width: 1536,
          height: 1024,
          caption:
            "A Semaphore counts permits; a Monitor groups protected state, operations, and condition waiting.",
        },
      },
      {
        title: "Semaphore",
        paragraphs: [
          "A Semaphore is a synchronization primitive that manages an integer count of available permits or represents an event signal.",
          "A task must successfully perform wait before using a permit and perform signal when the permit is returned or an event is announced.",
          "Semaphore operations are atomic, so concurrent updates cannot corrupt the counter.",
        ],
      },
      {
        title: "Semaphore Operations",
        paragraphs: [
          "The traditional names are P and V. Many APIs use wait and signal, while others use acquire and release.",
        ],
        table: {
          headers: ["Operation", "Meaning"],
          rows: [
            [
              "wait() / P / acquire",
              "Take one permit; block if none is available",
            ],
            [
              "signal() / V / release",
              "Return one permit or wake an eligible waiter",
            ],
          ],
        },
      },
      {
        title: "How a Counting Semaphore Works",
        paragraphs: [
          "Suppose a Semaphore starts at 3. This means three permits are available.",
          "The first three successful wait operations take the three permits. A fourth task cannot continue until another task performs signal.",
          "An implementation may give the released permit directly to a waiting task, so the visible counter does not always need to become 1 first.",
        ],
        points: [
          "Thread 1 calls wait: one permit remains for two other threads.",
          "Thread 2 calls wait: one permit remains.",
          "Thread 3 calls wait: no permit remains.",
          "Thread 4 calls wait: it blocks.",
          "A holder calls signal: an eligible waiter may continue.",
        ],
        visual: {
          src: "/notes/operating-systems/counting-semaphore-permits.png",
          alt: "Counting Semaphore with three permits where three threads proceed, a fourth thread waits, and a released permit lets the waiting thread continue.",
          width: 1536,
          height: 1024,
          caption:
            "At most three permit holders proceed at the same time; the next requester waits.",
        },
      },
      {
        title: "Semaphore Counter and Wait Queue",
        paragraphs: [
          "A Semaphore can be understood as two main parts: a permit count and a wait queue.",
          "The count tells how many permits are available. When no permit is available, a task that calls wait is placed in the wait queue instead of continuing.",
          "When another task calls signal, the implementation can make one eligible waiter ready to run.",
          "The exact stored counter value differs between implementations, so a negative value should not be treated as a universal Semaphore rule.",
        ],
        points: [
          "Permit count: Tracks available resource units.",
          "Wait queue: Holds tasks blocked for a permit or signal.",
          "Atomic update: Protects the count and queue from concurrent changes.",
        ],
        visual: {
          src: "/notes/operating-systems/semaphore-count-wait-queue.png",
          alt: "Semaphore with two permits where two threads proceed, later threads enter a FIFO wait queue, and signal wakes the oldest waiting thread.",
          width: 1536,
          height: 1024,
          caption:
            "The count tracks available permits, while the wait queue holds tasks that cannot continue yet.",
        },
      },
      {
        title: "Semaphore Fairness",
        paragraphs: [
          "A Semaphore must decide which waiting task may continue after signal.",
          "A FIFO policy usually wakes the oldest waiter and helps prevent starvation. A priority-based policy may wake the highest-priority waiter first, which can delay lower-priority tasks.",
          "Semaphore operations alone do not automatically guarantee fairness. The result depends on the queue and scheduling policy.",
        ],
      },
      {
        title: "Types of Semaphores",
        table: {
          headers: ["Binary Semaphore", "Counting Semaphore"],
          rows: [
            [
              "Represents 0 or 1 available permit",
              "Represents zero or more available permits",
            ],
            [
              "Can provide exclusion or signalling",
              "Controls a pool of N resources",
            ],
            ["Does not have Mutex ownership", "Does not have one strict owner"],
            [
              "Example: event or one shared permit",
              "Example: database connection pool",
            ],
          ],
        },
        paragraphs: [
          "A Binary Semaphore can look like a Mutex, but they are not identical. A Mutex has ownership and should be unlocked by its owner. A Semaphore can be signalled by a different task.",
        ],
      },
      {
        title: "Semaphores for Resource Counting and Signalling",
        paragraphs: [
          "A Counting Semaphore controls how many tasks may use a limited resource at once.",
          "A Binary Semaphore can also signal that an event happened. One task waits, and another task signals after completing the required work.",
        ],
        points: [
          "Resource counting: Available connections, buffers, or device slots.",
          "Event signalling: Notify a task that work or data is ready.",
          "Ordering: Prevent one stage from running before another stage completes.",
        ],
      },
      {
        title: "Common Semaphore Mistakes",
        paragraphs: [
          "Semaphores are powerful but easy to misuse because the counter and operations do not express ownership clearly.",
        ],
        points: [
          "Forgetting signal, which can block future tasks forever.",
          "Calling signal too many times and creating extra permits.",
          "Starting with the wrong initial count.",
          "Waiting on several Semaphores in inconsistent orders, which can cause Deadlock.",
          "Using a Semaphore where a Mutex would express ownership more clearly.",
        ],
      },
      {
        title: "Monitor",
        paragraphs: [
          "A Monitor is a high-level synchronization construct that groups shared data with the methods that are allowed to access it.",
          "Monitor methods run with built-in Mutual Exclusion, so only one thread executes inside the Monitor at a time unless it waits on a condition.",
          "The language, runtime, or library manages the underlying lock. The programmer still defines the correct state rules and waiting conditions.",
        ],
        points: [
          "Shared data",
          "Protected methods",
          "Automatic Mutual Exclusion",
          "One or more Condition Variables",
        ],
      },
      {
        title: "How a Monitor Works",
        paragraphs: [
          "A thread calls a Monitor method. If no other thread is active inside, it enters and works with the protected state.",
          "If another thread is active, the caller waits in the Monitor entry queue.",
          "When the active thread exits or waits on a Condition Variable, another eligible thread may enter.",
        ],
        points: [
          "Call a Monitor method.",
          "Enter when the Monitor becomes available.",
          "Read or change the protected shared state.",
          "Exit, or wait on a Condition Variable if the required state is not ready.",
        ],
      },
      {
        title: "Condition Variables",
        paragraphs: [
          "A Condition Variable lets a thread sleep until a condition over the protected state may have changed.",
          "The condition itself is a rule in the program, such as buffer is not empty. The Condition Variable does not store that rule or remember the state for the program.",
        ],
        table: {
          headers: ["Operation", "Meaning"],
          rows: [
            [
              "wait()",
              "Atomically release the Monitor lock, sleep, then reacquire before returning",
            ],
            ["signal() / notify()", "Wake one eligible waiter, if one exists"],
          ],
        },
        visual: {
          src: "/notes/operating-systems/monitor-condition-variable.png",
          alt: "Monitor flow where a consumer checks a predicate, waits while releasing the Monitor lock, a producer changes the state and signals, and the consumer reacquires the lock before continuing.",
          width: 1536,
          height: 1024,
          caption:
            "Condition wait releases the Monitor lock while sleeping and reacquires it before the method continues.",
        },
      },
      {
        title: "Counter, Queue, and Fairness",
        paragraphs: [
          "A Semaphore needs both permit tracking and a policy for blocked tasks.",
        ],
        points: [
          "The counter tracks available permits.",
          "A wait queue holds tasks blocked when no permit is available.",
          "signal makes an eligible waiter ready when one exists.",
          "FIFO waking reduces starvation; other policies may prefer priority instead.",
          "Fairness depends on the implementation and scheduler.",
        ],
      },
      {
        title: "Why Condition Checks Use a While Loop",
        paragraphs: [
          "A woken thread does not automatically know that the condition is still true when it runs.",
          "Another thread may change the state before the waiter reacquires the Monitor lock, and some systems allow spurious wake-ups.",
          "For this reason, a thread should check the condition in a while loop, not a single if statement.",
        ],
        flow: [
          "Lock Monitor",
          "Check Predicate",
          "Wait While False",
          "Wake and Reacquire",
          "Check Again",
        ],
      },
      {
        title: "Signal Does Not Transfer Control Immediately",
        paragraphs: [
          "In many common Monitor systems, signal makes a waiter ready, but the signalling thread continues until it exits or waits.",
          "The woken thread later reacquires the Monitor lock and checks the condition again.",
          "If no thread is waiting, a Condition Variable signal is usually not saved for a future waiter.",
        ],
      },
      {
        title: "Producer-Consumer with a Monitor",
        paragraphs: [
          "A producer waits while the buffer is full. A consumer waits while the buffer is empty.",
          "The Monitor lock protects the buffer. Condition Variables let producers and consumers sleep until the buffer state changes.",
        ],
        points: [
          "Producer: Wait for not full, add an item, signal not empty.",
          "Consumer: Wait for not empty, remove an item, signal not full.",
        ],
      },
      {
        title: "Semaphore vs Monitor",
        paragraphs: [
          "A Semaphore exposes permits directly. A Monitor provides a structured place for protected state and operations.",
        ],
        dataTable: {
          headers: ["Feature", "Semaphore", "Monitor"],
          rows: [
            ["Level", "Lower-level primitive", "Higher-level construct"],
            [
              "Main idea",
              "Counter or event signal",
              "Protected data and methods",
            ],
            [
              "Mutual Exclusion",
              "Programmer builds the protocol",
              "Built into Monitor entry",
            ],
            ["Waiting", "wait on permits or events", "Condition Variables"],
            [
              "Ownership",
              "No strict owner",
              "Underlying Monitor lock controls entry",
            ],
            [
              "Common use",
              "OS resources and coordination",
              "Language and application synchronization",
            ],
          ],
        },
      },
      {
        title: "Real-World Analogies",
        table: {
          headers: ["Semaphore", "Monitor"],
          rows: [
            [
              "Parking lot with a fixed number of permits",
              "Service room with protected state and controlled entry",
            ],
            [
              "Entering takes one permit",
              "Only one active user changes the protected state",
            ],
            [
              "Leaving returns one permit",
              "Users may wait for a required condition",
            ],
          ],
        },
        paragraphs: [
          "Analogies help remember the roles, but real implementations still depend on atomic operations, waiting queues, and correct program rules.",
        ],
      },
      {
        title: "Benefits and Limitations",
        paragraphs: [
          "Both tools can coordinate complex concurrent work, but incorrect protocols can still fail.",
        ],
        table: {
          headers: ["Benefits", "Limitations"],
          rows: [
            [
              "Semaphore controls several permits",
              "Incorrect counts can allow too much or too little access",
            ],
            [
              "Semaphore can signal between tasks",
              "Missing operations can cause Deadlock",
            ],
            [
              "Monitor organizes shared state and methods",
              "Requires language or library support",
            ],
            [
              "Condition Variables avoid Busy Waiting",
              "Predicates and signals must still be used correctly",
            ],
          ],
        },
      },
      {
        title: "Key Points",
        paragraphs: ["Use the tool that best expresses the coordination rule."],
        points: [
          "Semaphore = Atomic counter of permits or event signal.",
          "wait takes a permit or blocks; signal returns a permit or wakes an eligible waiter.",
          "Binary Semaphore has no Mutex ownership rule.",
          "Counting Semaphore allows up to N permit holders.",
          "Monitor = Protected shared data + methods + automatic Mutual Exclusion.",
          "Condition wait releases the Monitor lock and reacquires it before returning.",
          "Always check a Condition Variable predicate in a while loop.",
        ],
      },
    ],
    mechanism: {
      title: "Waiting on a Monitor condition",
      steps: [
        "Enter the Monitor and hold its lock.",
        "Check the predicate over protected shared state.",
        "If it is false, condition wait atomically releases the lock and sleeps.",
        "Another thread changes the state and signals the Condition Variable.",
        "The waiter wakes, reacquires the Monitor lock, and checks the predicate again.",
      ],
    },
    example: {
      title: "Parking spaces",
      body: "A Counting Semaphore starts at 10. Each entering car performs wait and takes one permit. When no permit remains, the next car blocks. Each leaving car performs signal so an eligible waiting car can enter.",
    },
    misconception:
      "A Binary Semaphore is not simply a Mutex. A Mutex has ownership; a Semaphore may be signalled by a different task.",
  },
  revise: {
    definitionLabel: "Overview",
    compactDefinition: true,
    definition:
      "Semaphores and Monitors coordinate concurrent processes or threads and protect shared resources safely.",
    sections: [
      {
        title: "Main Idea",
        paragraphs: [
          "Semaphore: Counter-based synchronization for permits or event signals.",
          "Monitor: High-level synchronization with protected state, methods, and built-in Mutual Exclusion.",
        ],
      },
      {
        title: "Why it Matters",
        paragraphs: [
          "Some resources allow several tasks to use them at once, such as a pool of database connections. Other shared state allows only one active task at a time.",
          "Semaphores manage the number of permits, while Monitors organize exclusive access and condition-based waiting.",
        ],
      },
      {
        title: "Core Concept",
        paragraphs: [
          "A Semaphore controls access using an atomic counter. A Monitor allows one active thread inside its protected methods at a time.",
        ],
        visual: {
          src: "/notes/operating-systems/semaphore-monitor-overview.png",
          alt: "Semaphore controlling three permits beside a Monitor containing protected state, methods, an entry queue, and condition waiting.",
          width: 1536,
          height: 1024,
          caption:
            "A Semaphore counts permits; a Monitor organizes protected data and methods.",
        },
      },
      {
        title: "Semaphore Working",
        steps: [
          "A thread calls wait or acquire.",
          "If a permit is available, it atomically takes one and continues.",
          "If no permit is available, the thread blocks.",
          "After finishing, a holder calls signal or release.",
          "The returned permit lets an eligible waiting thread continue.",
        ],
      },
      {
        title: "Types of Semaphores",
        table: {
          headers: ["Binary Semaphore", "Counting Semaphore"],
          rows: [
            ["Zero or one permit", "Zero or more permits"],
            ["Exclusion or event signalling", "Controls a pool of resources"],
            ["No Mutex ownership rule", "Allows up to N permit holders"],
          ],
        },
      },
      {
        title: "Monitor Working",
        steps: [
          "A thread calls a Monitor method.",
          "It enters when no other thread is active inside.",
          "If another thread is active, the caller waits.",
          "The active thread changes the protected state and exits or waits on a condition.",
          "Another eligible thread may then enter.",
        ],
      },
      {
        title: "Condition Variables",
        paragraphs: [
          "Monitors use Condition Variables when a thread must wait for protected state to change.",
        ],
        points: [
          "condition.wait(): Releases the Monitor lock, sleeps, and reacquires the lock before returning.",
          "condition.signal(): Wakes one eligible waiter, if one exists.",
          "The waiting condition must be checked in a while loop.",
        ],
      },
      {
        title: "Benefits and Limitations",
        table: {
          headers: ["Benefits", "Limitations"],
          rows: [
            [
              "Coordinates safe resource sharing",
              "Incorrect Semaphore usage can cause Deadlock",
            ],
            [
              "Counting Semaphore supports several permits",
              "Semaphore protocols can be difficult to debug",
            ],
            [
              "Monitor provides built-in Mutual Exclusion",
              "Requires language, runtime, or library support",
            ],
            [
              "Condition Variables avoid Busy Waiting",
              "Incorrect predicates or signals can still cause bugs",
            ],
          ],
        },
      },
      {
        title: "Semaphore vs Monitor",
        dataTable: {
          headers: ["Feature", "Semaphore", "Monitor"],
          rows: [
            [
              "Main idea",
              "Counter or event signal",
              "Protected state and methods",
            ],
            [
              "Synchronization",
              "Manual wait and signal protocol",
              "Built-in Mutual Exclusion",
            ],
            [
              "Concurrent access",
              "Can provide N permits",
              "One active thread inside",
            ],
            ["Waiting", "Wait for a permit or event", "Condition Variables"],
            ["Ease of use", "More error-prone", "More structured"],
          ],
        },
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Semaphore = Atomic counter of permits or an event signal.",
      "wait takes a permit or blocks; signal returns a permit or wakes a waiter.",
      "Binary Semaphore = 0 or 1 permit, but no Mutex ownership.",
      "Counting Semaphore = Allows up to N permit holders.",
      "A Semaphore uses a permit count and may keep blocked tasks in a wait queue.",
      "Fairness depends on how waiting tasks are selected.",
      "Monitor = Protected state + methods + built-in Mutual Exclusion.",
      "Condition wait releases the Monitor lock and reacquires it before returning.",
      "Always check a Condition Variable predicate in a while loop.",
    ],
    followUp: "",
  },
  lastMinute: {
    definition:
      "Semaphores and Monitors safely coordinate concurrent processes or threads that use shared resources.",
    sections: [
      {
        title: "Main Idea",
        points: [
          "Semaphore: Counter-based synchronization for permits or event signals.",
          "Monitor: High-level synchronization with protected state and built-in Mutual Exclusion.",
        ],
      },
      {
        title: "Working",
        flow: [
          "Thread",
          "Semaphore / Monitor",
          "Protected Work",
          "Release or Exit",
        ],
        wide: true,
      },
      {
        title: "Remember This",
        points: [
          "Semaphore: Uses an integer counter. wait takes a permit or blocks; signal returns a permit or wakes a waiter.",
          "Binary Semaphore: Zero or one permit and no Mutex ownership rule.",
          "Counting Semaphore: Controls multiple permits and allows up to N permit holders.",
          "A Semaphore tracks permits and may place blocked tasks in a wait queue.",
          "FIFO waking reduces starvation, but fairness depends on the implementation.",
          "Monitor: Allows one active thread inside its protected methods at a time.",
          "Condition Variables: Let Monitor threads wait and signal when protected state changes.",
        ],
        wide: true,
      },
    ],
    cuesLabel: "Key Points",
    cues: [
      "Semaphore = Atomic counter of permits or an event signal.",
      "Binary Semaphore = Zero or one permit; no strict owner.",
      "Counting Semaphore = Allows up to N permit holders.",
      "Wait Queue = Holds tasks blocked when no permit is available.",
      "Semaphore Fairness = Depends on the waiting and scheduling policy.",
      "Monitor = Protected state + methods + built-in Mutual Exclusion.",
      "Semaphore synchronization uses an explicit wait and signal protocol.",
      "Monitor Condition Variables provide condition-based waiting and signalling.",
      "Condition wait releases the Monitor lock and reacquires it before returning.",
    ],
    memoryLineLabel: "Remember This",
    memoryLine: "Semaphore counts. Monitor protects. Condition Variable waits.",
    memoryLineAtEnd: true,
    trap: "Check a Condition Variable predicate in a while loop, not a single if statement.",
  },
};

const classicalSynchronizationProblemsDetailed: SubjectTopic = {
  slug: "classical-synchronization-problems",
  title: "Classical Synchronization Problems",
  description:
    "Apply Mutexes, Semaphores, and Monitors to Producer-Consumer, Readers-Writers, and Dining Philosophers.",
  readTime: "Detailed note",
  difficulty: "Intermediate",
  tags: ["Producer-Consumer", "Readers-Writers", "Dining Philosophers"],
  learn: {
    opening:
      "Classical Synchronization Problems show how synchronization tools solve common patterns of shared-resource coordination.",
    sections: [
      {
        title: "Overview",
        paragraphs: [
          "After learning Mutexes, Semaphores, and Monitors, the next step is seeing how they solve realistic coordination problems.",
          "Operating Systems commonly use three standard problems: Producer-Consumer, Readers-Writers, and Dining Philosophers.",
          "Each problem highlights a different risk, including full or empty resources, shared reading with exclusive writing, Deadlock, and Starvation.",
        ],
        points: ["Producer-Consumer", "Readers-Writers", "Dining Philosophers"],
      },
      {
        title: "Why it Matters",
        paragraphs: [
          "Real systems constantly coordinate tasks that share queues, files, databases, devices, and memory.",
          "Without a correct protocol, shared data may become inconsistent, tasks may wait forever, or the entire group may stop making progress.",
          "These problems help evaluate whether a synchronization solution is safe, live, and fair.",
        ],
        points: [
          "Safety: Shared state never becomes invalid.",
          "Liveness: Some waiting task can eventually make progress.",
          "Fairness: One task is not postponed forever.",
        ],
      },
      {
        title: "Core Concept",
        paragraphs: [
          "Each classical problem represents a different resource-sharing rule. The synchronization mechanism must protect the rule, not only a single line of code.",
        ],
        dataTable: {
          headers: ["Problem", "Shared Resource", "Main Risk"],
          rows: [
            ["Producer-Consumer", "Bounded Buffer", "Full or empty buffer"],
            [
              "Readers-Writers",
              "Shared data",
              "Read concurrency vs exclusive write",
            ],
            [
              "Dining Philosophers",
              "Neighbouring forks",
              "Deadlock and Starvation",
            ],
          ],
        },
      },
      {
        title: "Producer-Consumer Problem",
        paragraphs: [
          "The Producer creates items and places them into a shared buffer. The Consumer removes and uses those items.",
          "A bounded buffer has limited space, so the Producer must wait when it is full and the Consumer must wait when it is empty.",
          "The buffer itself must also be protected so two tasks do not update it at the same time.",
        ],
        visual: {
          src: "/notes/operating-systems/producer-consumer-illustration.png",
          alt: "Producer placing items into a bounded shared buffer while a Consumer removes them, with full and empty conditions controlling when each side waits.",
          width: 1536,
          height: 1024,
          caption:
            "The Producer waits for an empty slot; the Consumer waits for a filled slot.",
        },
      },
      {
        title: "Producer-Consumer Semaphore Solution",
        paragraphs: [
          "For a buffer of size N, the standard solution uses two Counting Semaphores and one Mutex.",
        ],
        points: [
          "empty = N: Number of empty buffer slots.",
          "full = 0: Number of filled buffer slots.",
          "mutex = 1: Protects the buffer data structure.",
        ],
        dataTable: {
          headers: ["Producer", "Consumer"],
          rows: [
            ["wait(empty)", "wait(full)"],
            ["wait(mutex)", "wait(mutex)"],
            ["Add item", "Remove item"],
            ["signal(mutex)", "signal(mutex)"],
            ["signal(full)", "signal(empty)"],
          ],
        },
      },
      {
        title: "Why the Producer-Consumer Order Matters",
        paragraphs: [
          "A Producer waits for an empty slot before locking the buffer. A Consumer waits for a filled slot before locking the buffer.",
          "If a task locks the buffer first and then waits for a missing slot or item, it may sleep while holding the Mutex. The other task would then be unable to enter and change the buffer state, causing Deadlock.",
          "The Mutex is released before the task signals the new full or empty count.",
        ],
      },
      {
        title: "Producer-Consumer with a Monitor",
        paragraphs: [
          "A Monitor can keep the buffer, count, and operations together.",
          "The Producer waits on notFull while the buffer is full. The Consumer waits on notEmpty while the buffer is empty.",
        ],
        points: [
          "Producer: while full, wait on notFull; add item; signal notEmpty.",
          "Consumer: while empty, wait on notEmpty; remove item; signal notFull.",
        ],
      },
      {
        title: "Producer-Consumer Example",
        paragraphs: [
          "Think of a restaurant, a pickup shelf, and a delivery partner.",
        ],
        points: [
          "Restaurant: Producer",
          "Pickup shelf: Bounded Buffer",
          "Delivery partner: Consumer",
          "The restaurant waits when the shelf is full; the delivery partner waits when it is empty.",
        ],
      },
      {
        title: "Readers-Writers Problem",
        paragraphs: [
          "Readers only inspect shared data. Writers change it.",
          "Several Readers may safely read together when no Writer is active. A Writer needs exclusive access, so no Reader or other Writer may access the data at the same time.",
        ],
        points: [
          "Reader + Reader: Allowed.",
          "Reader + Writer: Not allowed.",
          "Writer + Writer: Not allowed.",
        ],
        visual: {
          src: "/notes/operating-systems/readers-writers-illustration.png",
          alt: "Shared database allowing several Readers together while a Writer receives exclusive access and all Readers wait.",
          width: 1536,
          height: 1024,
          caption: "Readers may share access, but a Writer must be alone.",
        },
      },
      {
        title: "Readers-Writers Synchronization",
        paragraphs: [
          "A basic solution tracks the number of active Readers and uses synchronization to protect that count and the shared resource.",
          "The first Reader blocks Writers. Additional Readers may join. The last Reader allows a waiting Writer to continue.",
          "Modern systems often provide a Read-Write Lock that implements this policy directly.",
        ],
        points: [
          "readCount: Number of active Readers.",
          "Mutex: Protects updates to readCount.",
          "Resource lock or Semaphore: Gives Writers exclusive access.",
        ],
      },
      {
        title: "Readers-Writers Semaphore Solution",
        paragraphs: [
          "A common reader-preference solution uses readCount, a Mutex for that count, and a resource Semaphore for the shared data.",
          "The first Reader locks the shared resource so Writers cannot enter. Other Readers may then join. The last Reader releases the resource for a waiting Writer.",
        ],
        dataTable: {
          headers: ["Reader", "Writer"],
          rows: [
            ["Lock the readCount Mutex", "Wait for the resource Semaphore"],
            ["Increase readCount", "Write alone"],
            [
              "If first Reader, wait for the resource",
              "Signal the resource Semaphore",
            ],
            ["Unlock the readCount Mutex", ""],
            ["Read", ""],
            ["Lock the readCount Mutex", ""],
            ["Decrease readCount", ""],
            ["If last Reader, signal the resource", ""],
            ["Unlock the readCount Mutex", ""],
          ],
        },
        points: [
          "The readCount Mutex protects only the Reader count.",
          "The resource Semaphore protects the actual shared data.",
          "Several Readers may read together after the first Reader locks out Writers.",
          "This reader-preference solution can starve Writers if Readers keep arriving.",
        ],
      },
      {
        title: "Readers-Writers Policy Variants",
        paragraphs: [
          "There is no single fairness policy for every Readers-Writers solution.",
        ],
        table: {
          headers: ["Policy", "Trade-Off"],
          rows: [
            [
              "Reader Preference",
              "Readers enter quickly, but Writers may starve",
            ],
            [
              "Writer Preference",
              "Writers enter sooner, but Readers may starve",
            ],
            [
              "Fair or FIFO",
              "Limits starvation but adds queueing and coordination",
            ],
          ],
        },
      },
      {
        title: "Readers-Writers Example",
        paragraphs: ["Think of a shared document or database record."],
        points: [
          "Many users may view the current value together.",
          "An update needs exclusive access so nobody reads a half-finished change.",
        ],
      },
      {
        title: "Dining Philosophers Problem",
        paragraphs: [
          "Five Philosophers sit around a circular table with one Fork between each pair.",
          "Each Philosopher alternates between Thinking and Eating. To eat, one Philosopher needs both neighbouring Forks.",
          "If every Philosopher takes one Fork and waits for the second, each holds one resource while waiting for another. Nobody can continue, so the system is deadlocked.",
        ],
        visual: {
          src: "/notes/operating-systems/dining-philosophers-illustration.png",
          alt: "Five Philosophers around a circular table, each holding one neighbouring Fork and waiting for the other, creating a circular Deadlock.",
          width: 1536,
          height: 1024,
          caption:
            "If everyone holds one Fork and waits for the next, the circular wait causes Deadlock.",
        },
      },
      {
        title: "Dining Philosophers and Coffman Conditions",
        paragraphs: [
          "This Deadlock is possible because Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait are all present.",
          "These are the four Coffman Conditions. A solution prevents Deadlock by breaking at least one of them. The Deadlocks module will explain each condition in detail.",
        ],
      },
      {
        title: "Dining Philosophers Solutions",
        paragraphs: [
          "A correct solution must break at least one condition that allows the circular wait.",
        ],
        points: [
          "Limit entry: Allow at most four Philosophers to compete for Forks at once.",
          "Resource ordering: Number the Forks and always acquire the lower-numbered Fork first.",
          "Waiter or Monitor: Ask a central coordinator for permission to acquire both Forks.",
          "Atomic pair: Acquire both Forks together or acquire neither.",
        ],
      },
      {
        title: "Deadlock-Free Does Not Always Mean Fair",
        paragraphs: [
          "A solution may prevent Deadlock but still allow one Philosopher to lose every competition for Forks.",
          "Preventing Starvation needs an additional fairness rule, such as FIFO waiting, bounded overtaking, or a fair waiter.",
          "This distinction between progress for the group and progress for every individual task is interview-important.",
        ],
      },
      {
        title: "Dining Philosophers Example",
        paragraphs: [
          "The same pattern appears when several tasks need two shared resources before any task can finish.",
          "If each task holds one resource while waiting for the second, a circular wait can stop the whole system.",
        ],
      },
      {
        title: "Comparison",
        paragraphs: [
          "Each problem tests a different part of synchronization design.",
        ],
        dataTable: {
          headers: [
            "Problem",
            "Shared Resource",
            "Main Challenge",
            "Typical Tools",
          ],
          rows: [
            [
              "Producer-Consumer",
              "Bounded Buffer",
              "Full and empty states",
              "Counting Semaphores + Mutex or Monitor",
            ],
            [
              "Readers-Writers",
              "File or database",
              "Concurrent reads, exclusive writes",
              "Read-Write Lock, Semaphore, or Mutex",
            ],
            [
              "Dining Philosophers",
              "Neighbouring Forks",
              "Deadlock and Starvation",
              "Semaphore, Mutex, or Monitor",
            ],
          ],
        },
      },
      {
        title: "Benefits and Limitations",
        paragraphs: [
          "Classical problems make synchronization rules easier to study, but real systems may require stronger fairness, cancellation, timeout, and failure handling.",
        ],
        table: {
          headers: ["Benefits", "Limitations"],
          rows: [
            [
              "Shows practical use of synchronization tools",
              "Solutions can become complex",
            ],
            [
              "Explains Deadlock and Starvation clearly",
              "One policy may favour one task group",
            ],
            [
              "Common in Operating Systems interviews",
              "Incorrect operation order can still Deadlock",
            ],
            [
              "Builds reusable coordination patterns",
              "Real systems need additional error handling",
            ],
          ],
        },
      },
      {
        title: "Key Points",
        paragraphs: [
          "Remember the shared resource, the waiting rule, and the main failure for each problem.",
        ],
        points: [
          "Producer-Consumer: Producer waits when full; Consumer waits when empty.",
          "Bounded Buffer solution: empty + full + mutex, in the correct order.",
          "Readers-Writers: Multiple Readers together; one Writer alone.",
          "Reader, Writer, or fair preference changes who may starve.",
          "Dining Philosophers: Each needs two neighbouring Forks.",
          "Acquiring one Fork each can create circular wait and Deadlock.",
          "Deadlock prevention does not automatically guarantee freedom from Starvation.",
        ],
      },
    ],
    mechanism: {
      title: "Bounded Buffer coordination",
      steps: [
        "Producer waits for an empty slot before locking the buffer.",
        "Producer locks the buffer, adds one item, and unlocks it.",
        "Producer signals that one more filled slot exists.",
        "Consumer waits for a filled slot before locking the buffer.",
        "Consumer locks the buffer, removes one item, and unlocks it.",
        "Consumer signals that one more empty slot exists.",
      ],
    },
    example: {
      title: "A shared job queue",
      body: "Worker requests produce jobs and place them in a bounded queue. Processing threads consume those jobs. Producers wait when the queue is full, consumers wait when it is empty, and a Mutex protects changes to the queue itself.",
    },
    misconception:
      "Preventing Deadlock does not automatically prevent Starvation. The system may keep moving while one task waits forever.",
  },
  revise: {
    definitionLabel: "Overview",
    compactDefinition: true,
    definition:
      "Classical Synchronization Problems show how concurrent tasks coordinate safely while sharing resources.",
    sections: [
      {
        title: "Main Problems",
        paragraphs: [
          "These standard problems demonstrate the practical use of Mutexes, Semaphores, Monitors, and Read-Write Locks.",
        ],
        points: ["Producer-Consumer", "Readers-Writers", "Dining Philosophers"],
      },
      {
        title: "Why it Matters",
        paragraphs: [
          "The problems show how incorrect synchronization can cause Race Conditions, Deadlocks, Starvation, and inconsistent data.",
        ],
      },
      {
        title: "Core Concept",
        paragraphs: [
          "Each problem represents a different shared-resource rule that synchronization must protect.",
        ],
        dataTable: {
          headers: ["Problem", "Shared Resource", "Main Rule"],
          rows: [
            ["Producer-Consumer", "Bounded Buffer", "Wait when full or empty"],
            [
              "Readers-Writers",
              "Shared data",
              "Readers share; Writer is exclusive",
            ],
            [
              "Dining Philosophers",
              "Neighbouring Forks",
              "Avoid circular wait",
            ],
          ],
        },
      },
      {
        title: "Producer-Consumer",
        steps: [
          "The Producer creates an item.",
          "It waits if the bounded buffer is full.",
          "It safely adds the item to the shared buffer.",
          "The Consumer waits if the buffer is empty.",
          "The Consumer safely removes and uses an item.",
        ],
        points: [
          "Typical solution: empty Semaphore + full Semaphore + Mutex.",
          "The Semaphore wait happens before locking the buffer Mutex.",
        ],
      },
      {
        title: "Readers-Writers",
        points: [
          "Several Readers may access the data together.",
          "A Writer needs exclusive access.",
          "No Reader may read while a Writer is active.",
          "Reader preference may starve Writers.",
          "Writer preference may starve Readers.",
          "A fair policy limits Starvation for both groups.",
        ],
      },
      {
        title: "Readers-Writers Solution",
        points: [
          "A Mutex protects readCount.",
          "The first Reader locks the shared resource against Writers.",
          "Other Readers may read at the same time.",
          "The last Reader releases the shared resource.",
          "A Writer locks the resource, writes alone, and releases it.",
          "Reader preference may starve Writers.",
        ],
      },
      {
        title: "Dining Philosophers",
        steps: [
          "Each Philosopher alternates between Thinking and Eating.",
          "Eating requires both neighbouring Forks.",
          "If everyone holds one Fork and waits for the next, circular wait causes Deadlock.",
          "A correct protocol breaks the circular wait.",
        ],
        points: [
          "Common solutions: Limit entry, order the Forks, or use a waiter or Monitor.",
          "A fair allocation rule is still needed to prevent Starvation.",
        ],
      },
      {
        title: "Benefits and Limitations",
        table: {
          headers: ["Benefits", "Limitations"],
          rows: [
            [
              "Explains practical synchronization patterns",
              "Correct solutions can be complex",
            ],
            [
              "Shows Semaphore and Mutex usage",
              "Wrong operation order may Deadlock",
            ],
            [
              "Makes Deadlock and Starvation easier to understand",
              "Some policies may cause Starvation",
            ],
            [
              "Common Operating Systems interview topic",
              "Real systems need more error handling",
            ],
          ],
        },
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Producer-Consumer = Shared bounded buffer; Producer waits when full, Consumer waits when empty.",
      "Producer-Consumer is commonly solved using Semaphores and a Mutex.",
      "Readers-Writers = Multiple Readers together; one Writer alone.",
      "Dining Philosophers = Two neighbouring Forks are required to eat.",
      "Circular resource waiting can cause Deadlock.",
      "Deadlock prevention does not automatically guarantee fairness or prevent Starvation.",
    ],
    followUp: "",
  },
  lastMinute: {
    definition:
      "Classical Synchronization Problems show how concurrent processes or threads safely share resources using synchronization techniques.",
    sections: [
      {
        title: "Three Main Problems",
        points: ["Producer-Consumer", "Readers-Writers", "Dining Philosophers"],
      },
      {
        title: "Remember This",
        points: [
          "Producer-Consumer: Uses a shared buffer. Producer waits when it is full; Consumer waits when it is empty.",
          "Readers-Writers: Multiple Readers may read together. A Writer needs exclusive access.",
          "Dining Philosophers: Each Philosopher needs two neighbouring Forks. Circular waiting can cause Deadlock.",
          "Preventing both Deadlock and Starvation requires a safe protocol with a fairness rule.",
        ],
        wide: true,
      },
    ],
    cuesLabel: "Key Points",
    cues: [
      "Producer-Consumer = Synchronizes access to a shared bounded buffer.",
      "Producer-Consumer tools = empty Semaphore + full Semaphore + Mutex.",
      "Readers-Writers = Multiple Readers together; one Writer alone.",
      "Dining Philosophers = Resource allocation + circular wait + Deadlock + Starvation.",
      "Common tools = Mutex, Semaphore, Monitor, and Read-Write Lock.",
      "Deadlock-free does not automatically mean Starvation-free.",
    ],
    memoryLineLabel: "Remember This",
    memoryLine:
      "Buffer: full or empty. Data: Readers or Writer. Forks: circular wait.",
    memoryLineAtEnd: true,
    trap: "Never wait for a buffer slot while already holding the buffer Mutex.",
  },
};

const semaphoresDetailed: SubjectTopic = {
  ...semaphoresMonitorsDetailed,
  slug: "semaphores",
  title: "Semaphores",
  description:
    "Use permit counts, waiting queues, and signals to coordinate shared resources safely.",
  tags: ["Semaphore", "Permits", "Wait Queue"],
  learn: {
    ...semaphoresMonitorsDetailed.learn,
    opening:
      "A Semaphore uses permits and waiting to control limited resources or coordinate events between concurrent tasks.",
    sections: [
      ...semaphoresMonitorsDetailed.learn.sections.filter((section) =>
        [
          "Semaphore",
          "Semaphore Operations",
          "How a Counting Semaphore Works",
          "Semaphore Counter and Wait Queue",
          "Semaphore Fairness",
          "Types of Semaphores",
          "Semaphores for Resource Counting and Signalling",
          "Common Semaphore Mistakes",
        ].includes(section.title),
      ),
      {
        title: "Mutex vs Semaphore vs Monitor",
        paragraphs: [
          "These tools can all coordinate concurrent work, but they express different rules.",
        ],
        dataTable: {
          headers: ["Feature", "Mutex", "Semaphore", "Monitor"],
          rows: [
            [
              "Main idea",
              "One-owner lock",
              "Permit counter or event signal",
              "Protected state and methods",
            ],
            [
              "Ownership",
              "Only the owner should unlock",
              "No strict owner",
              "Entry controlled by the Monitor lock",
            ],
            [
              "Concurrent access",
              "One owner",
              "Can allow up to N permit holders",
              "One active thread inside",
            ],
            [
              "Waiting",
              "Usually blocks when busy",
              "Blocks when no permit is available",
              "Entry queue or Condition Variable",
            ],
            [
              "Best use",
              "Protect one Critical Section",
              "Resource pools, signalling, and ordering",
              "Structured state-based synchronization",
            ],
          ],
        },
      },
    ],
    mechanism: {
      title: "Taking and returning a permit",
      steps: [
        "A task calls wait or acquire.",
        "If a permit is available, the task atomically takes one and continues.",
        "If no permit is available, the task joins a wait queue and blocks.",
        "Another task calls signal or release.",
        "An eligible waiter receives the permit and becomes ready to run.",
      ],
    },
    example: {
      title: "Parking spaces",
      body: "A Counting Semaphore starts at 10. Each entering car takes one permit. When no permits remain, another car waits. A leaving car returns a permit so an eligible waiter can enter.",
    },
    misconception:
      "A Binary Semaphore is not the same as a Mutex. A Mutex has ownership, while a Semaphore may be signalled by a different task.",
  },
  revise: {
    ...semaphoresMonitorsDetailed.revise,
    definition:
      "A Semaphore uses an atomic permit count and a waiting policy to coordinate concurrent tasks.",
    sections: [
      ...(semaphoresMonitorsDetailed.revise.sections ?? []).filter((section) =>
        [
          "Semaphore Working",
          "Types of Semaphores",
          "Counter, Queue, and Fairness",
        ].includes(section.title),
      ),
      {
        title: "Mutex vs Semaphore vs Monitor",
        dataTable: {
          headers: ["Mutex", "Semaphore", "Monitor"],
          rows: [
            [
              "One-owner lock",
              "Counter or signal",
              "Protected state and methods",
            ],
            ["One owner", "Can provide N permits", "One active thread inside"],
            [
              "Protects a Critical Section",
              "Manages resources or ordering",
              "Supports condition-based waiting",
            ],
          ],
        },
      },
    ],
    essentials: [
      "wait takes a permit or blocks; signal returns a permit or wakes a waiter.",
      "Binary Semaphore = Zero or one permit, without Mutex ownership.",
      "Counting Semaphore = Allows up to N permit holders.",
      "The counter tracks permits; the wait queue holds blocked tasks.",
      "FIFO waking reduces starvation, but fairness depends on the implementation.",
      "Missing or extra signal operations can break the synchronization rule.",
    ],
  },
  lastMinute: {
    definition:
      "A Semaphore uses an atomic counter to manage permits or signal events between concurrent tasks.",
    sections: [
      {
        title: "Remember This",
        points: [
          "wait: Take a permit or block when none is available.",
          "signal: Return a permit or wake an eligible waiter.",
          "Binary Semaphore: Zero or one permit.",
          "Counting Semaphore: Controls a pool of N permits.",
          "Wait Queue: Holds tasks blocked for a permit.",
        ],
        wide: true,
      },
      {
        title: "Choose the Tool",
        points: [
          "Mutex: One owner protects one Critical Section.",
          "Semaphore: Counts permits or signals an event; no strict owner.",
          "Monitor: Protects shared state and methods with built-in Mutual Exclusion.",
        ],
      },
    ],
    cuesLabel: "Key Points",
    cues: [
      "Semaphore = Atomic permit counter or event signal.",
      "Counter = Available permits.",
      "Wait Queue = Blocked tasks.",
      "FIFO selection reduces starvation; fairness is implementation-dependent.",
      "A Binary Semaphore does not have Mutex ownership.",
    ],
    memoryLineLabel: "Remember This",
    memoryLine: "wait takes. signal returns. The queue holds blocked tasks.",
    memoryLineAtEnd: true,
    trap: "Do not treat a negative Semaphore value as a universal implementation rule.",
  },
};

const monitorsConditionVariablesDetailed: SubjectTopic = {
  ...semaphoresMonitorsDetailed,
  slug: "monitors-condition-variables",
  title: "Monitors and Condition Variables",
  description:
    "Organize protected state and let threads wait safely until a required condition changes.",
  tags: ["Monitor", "Condition Variable", "Mutual Exclusion"],
  learn: {
    ...semaphoresMonitorsDetailed.learn,
    opening:
      "A Monitor keeps shared data and its allowed operations together, while Condition Variables provide safe condition-based waiting.",
    sections: semaphoresMonitorsDetailed.learn.sections.filter((section) =>
      [
        "Monitor",
        "How a Monitor Works",
        "Condition Variables",
        "Why Condition Checks Use a While Loop",
        "Signal Does Not Transfer Control Immediately",
        "Producer-Consumer with a Monitor",
      ].includes(section.title),
    ),
    mechanism: {
      title: "Waiting for protected state to change",
      steps: [
        "Enter the Monitor and hold its lock.",
        "Check the condition over the protected state.",
        "If it is false, wait atomically releases the lock and sleeps.",
        "Another thread changes the state and signals.",
        "The waiter wakes, reacquires the lock, and checks the condition again.",
      ],
    },
    example: {
      title: "Waiting for a non-empty buffer",
      body: "A consumer waits while the buffer is empty. A producer enters the Monitor, adds an item, and signals the condition. The consumer later reacquires the Monitor lock and checks the buffer again.",
    },
    misconception:
      "A signal does not prove that the condition is still true. The awakened thread must check the condition again in a while loop.",
  },
  revise: {
    ...semaphoresMonitorsDetailed.revise,
    definition:
      "A Monitor protects shared state and methods. Condition Variables let threads wait until that state may have changed.",
    sections: (semaphoresMonitorsDetailed.revise.sections ?? []).filter(
      (section) =>
        ["Monitor Working", "Condition Variables"].includes(section.title),
    ),
    essentials: [
      "Monitor = Protected state + methods + built-in Mutual Exclusion.",
      "Only one thread is active inside the Monitor at a time unless it waits.",
      "Condition wait releases the Monitor lock and reacquires it before returning.",
      "signal wakes an eligible waiter but usually does not immediately transfer control.",
      "Always check the protected condition in a while loop.",
    ],
  },
  lastMinute: {
    definition:
      "A Monitor protects shared state and methods. Condition Variables provide safe waiting for state changes.",
    sections: [
      {
        title: "Remember This",
        points: [
          "Monitor: Built-in Mutual Exclusion around protected state and methods.",
          "Condition wait: Release the Monitor lock, sleep, and reacquire it before returning.",
          "signal: Wake one eligible waiter, if one exists.",
          "The awakened thread must check the condition again.",
        ],
        wide: true,
      },
    ],
    cuesLabel: "Key Points",
    cues: [
      "Monitor = Protected state + methods + controlled entry.",
      "Condition Variable = Wait for protected state to change.",
      "wait releases and later reacquires the Monitor lock.",
      "Use while, not if, when checking the condition.",
    ],
    memoryLineLabel: "Remember This",
    memoryLine:
      "Monitor protects. Condition Variable waits. Always check again.",
    memoryLineAtEnd: true,
    trap: "A signal is not saved forever and does not guarantee that the condition remains true.",
  },
};

const producerConsumerDetailed: SubjectTopic = {
  ...classicalSynchronizationProblemsDetailed,
  slug: "producer-consumer-problem",
  title: "Producer-Consumer Problem",
  description:
    "Coordinate producers and consumers that share a bounded buffer without overflow, underflow, or races.",
  tags: ["Producer-Consumer", "Bounded Buffer", "Semaphore"],
  learn: {
    ...classicalSynchronizationProblemsDetailed.learn,
    opening:
      "The Producer-Consumer Problem coordinates tasks that add items to and remove items from a shared bounded buffer.",
    sections: classicalSynchronizationProblemsDetailed.learn.sections.filter(
      (section) => section.title.startsWith("Producer-Consumer"),
    ),
    mechanism: {
      title: "Bounded buffer coordination",
      steps: [
        "The Producer waits for an empty slot.",
        "It locks the buffer, adds an item, and unlocks the buffer.",
        "It signals that one more full slot exists.",
        "The Consumer waits for a full slot.",
        "It locks the buffer, removes an item, and unlocks the buffer.",
        "It signals that one more empty slot exists.",
      ],
    },
    example: classicalSynchronizationProblemsDetailed.learn.example,
    misconception:
      "A Mutex alone prevents simultaneous buffer changes, but it does not make a Producer wait when the buffer is full or a Consumer wait when it is empty.",
  },
  revise: {
    ...classicalSynchronizationProblemsDetailed.revise,
    definition:
      "The Producer-Consumer Problem coordinates tasks that share a bounded buffer.",
    sections: [
      ...(
        classicalSynchronizationProblemsDetailed.revise.sections ?? []
      ).filter((section) => section.title === "Producer-Consumer"),
      {
        title: "Standard Semaphore Setup",
        dataTable: {
          headers: ["Value", "Starts at", "Purpose"],
          rows: [
            ["empty", "N", "Counts free buffer slots"],
            ["full", "0", "Counts stored items"],
            ["mutex", "1", "Protects the buffer data structure"],
          ],
        },
        points: [
          "Producer: wait(empty) → wait(mutex) → add → signal(mutex) → signal(full).",
          "Consumer: wait(full) → wait(mutex) → remove → signal(mutex) → signal(empty).",
        ],
      },
    ],
    essentials: [
      "Producer waits when the buffer is full.",
      "Consumer waits when the buffer is empty.",
      "empty counts free slots; full counts stored items; Mutex protects the buffer.",
      "Wait on the counting Semaphore before locking the buffer Mutex.",
    ],
  },
  lastMinute: {
    definition:
      "Producer-Consumer coordinates tasks that add items to and remove items from a shared bounded buffer.",
    sections: [
      {
        title: "Remember This",
        points: [
          "Producer waits if the buffer is full.",
          "Consumer waits if the buffer is empty.",
          "empty Semaphore counts free slots.",
          "full Semaphore counts available items.",
          "Mutex protects the shared buffer.",
        ],
        wide: true,
      },
    ],
    cuesLabel: "Key Points",
    cues: [
      "Producer-Consumer = Shared bounded buffer.",
      "Tools = empty Semaphore + full Semaphore + Mutex.",
      "Counting wait must happen before locking the buffer Mutex.",
    ],
    memoryLineLabel: "Remember This",
    memoryLine:
      "empty tracks space. full tracks items. Mutex protects the buffer.",
    memoryLineAtEnd: true,
    trap: "Never wait for a buffer slot while already holding the buffer Mutex.",
  },
};

const readersWritersDetailed: SubjectTopic = {
  ...classicalSynchronizationProblemsDetailed,
  slug: "readers-writers-problem",
  title: "Readers-Writers Problem",
  description:
    "Allow concurrent reading while giving writers safe exclusive access to shared data.",
  tags: ["Readers-Writers", "Read-Write Lock", "Fairness"],
  learn: {
    ...classicalSynchronizationProblemsDetailed.learn,
    opening:
      "The Readers-Writers Problem allows multiple readers to share data while requiring exclusive access for a writer.",
    sections: classicalSynchronizationProblemsDetailed.learn.sections.filter(
      (section) => section.title.startsWith("Readers-Writers"),
    ),
    mechanism: {
      title: "Shared reads and exclusive writes",
      steps: [
        "A Reader requests read access.",
        "It may enter with other Readers when no Writer is active.",
        "A Writer requests write access.",
        "The Writer waits until existing Readers and Writers leave.",
        "The Writer enters alone and releases exclusive access when finished.",
      ],
    },
    example: {
      title: "Shared configuration data",
      body: "Many threads may read a configuration at the same time. An update must wait for current Readers to finish and then run alone so nobody sees a partly updated value.",
    },
    misconception:
      "Allowing concurrent Readers does not automatically provide fairness. Reader preference can starve Writers, and Writer preference can delay Readers.",
  },
  revise: {
    ...classicalSynchronizationProblemsDetailed.revise,
    definition:
      "The Readers-Writers Problem allows several Readers together but gives a Writer exclusive access.",
    sections: (
      classicalSynchronizationProblemsDetailed.revise.sections ?? []
    ).filter((section) => section.title.startsWith("Readers-Writers")),
    essentials: [
      "Multiple Readers may read together.",
      "Only one Writer may write at a time.",
      "No Reader may read while a Writer is active.",
      "Reader preference may starve Writers; Writer preference may delay Readers.",
      "A fair policy limits starvation for both groups.",
    ],
  },
  lastMinute: {
    definition:
      "Readers-Writers allows concurrent Readers but requires exclusive access for a Writer.",
    sections: [
      {
        title: "Remember This",
        points: [
          "Many Readers may access the data together.",
          "One Writer accesses the data alone.",
          "Reader and Writer access cannot overlap.",
          "The selected preference policy affects fairness and starvation.",
          "The first Reader locks the resource; the last Reader releases it.",
          "A Writer locks the resource and writes alone.",
        ],
        wide: true,
      },
    ],
    cuesLabel: "Key Points",
    cues: [
      "Readers share. A Writer is exclusive.",
      "Reader preference may starve Writers.",
      "Writer preference may delay Readers.",
      "Fair or FIFO policies limit starvation.",
    ],
    memoryLineLabel: "Remember This",
    memoryLine: "Many Readers together. One Writer alone.",
    memoryLineAtEnd: true,
    trap: "Deadlock-free access is not automatically fair access.",
  },
};

const diningPhilosophersDetailed: SubjectTopic = {
  ...classicalSynchronizationProblemsDetailed,
  slug: "dining-philosophers-problem",
  title: "Dining Philosophers Problem",
  description:
    "Understand circular waiting, deadlock prevention, and fair allocation of shared resources.",
  tags: ["Dining Philosophers", "Deadlock", "Starvation"],
  learn: {
    ...classicalSynchronizationProblemsDetailed.learn,
    opening:
      "The Dining Philosophers Problem shows how tasks can deadlock when each holds one resource while waiting for another.",
    sections: classicalSynchronizationProblemsDetailed.learn.sections.filter(
      (section) =>
        section.title.startsWith("Dining Philosophers") ||
        section.title === "Deadlock-Free Does Not Always Mean Fair",
    ),
    mechanism: {
      title: "How circular waiting appears",
      steps: [
        "Every Philosopher takes one neighbouring Fork.",
        "Each Philosopher waits for the second Fork.",
        "Every needed Fork is already held by a neighbour.",
        "Nobody can eat, release a Fork, or continue.",
        "A correct solution breaks this circular waiting pattern.",
      ],
    },
    example: {
      title: "Two resources per task",
      body: "Several tasks each hold one resource and wait for another resource held by the next task. Ordering resources or limiting entry breaks the circular wait.",
    },
    misconception:
      "Preventing Deadlock does not automatically prevent Starvation. A separate fairness rule may still be needed.",
  },
  revise: {
    ...classicalSynchronizationProblemsDetailed.revise,
    definition:
      "The Dining Philosophers Problem shows how competing for multiple resources can cause circular waiting and Deadlock.",
    sections: (
      classicalSynchronizationProblemsDetailed.revise.sections ?? []
    ).filter((section) => section.title === "Dining Philosophers"),
    essentials: [
      "Each Philosopher needs both neighbouring Forks to eat.",
      "If everyone holds one Fork and waits for another, circular waiting causes Deadlock.",
      "Common solutions limit entry, order resources, or use a waiter or Monitor.",
      "A fairness rule is still needed to prevent Starvation.",
      "The complete Coffman Conditions belong in the Deadlocks module.",
    ],
  },
  lastMinute: {
    definition:
      "Dining Philosophers demonstrates circular waiting, Deadlock, and Starvation during shared-resource allocation.",
    sections: [
      {
        title: "Remember This",
        points: [
          "Each Philosopher needs two neighbouring Forks.",
          "Taking one Fork each can create circular waiting and Deadlock.",
          "Break the cycle by limiting entry, ordering Forks, or using a waiter or Monitor.",
          "Deadlock-free does not automatically mean Starvation-free.",
        ],
        wide: true,
      },
    ],
    cuesLabel: "Key Points",
    cues: [
      "Dining Philosophers = Multiple tasks need overlapping resources.",
      "Circular waiting can cause Deadlock.",
      "Resource ordering breaks the circular wait.",
      "Fairness is required to prevent Starvation.",
    ],
    memoryLineLabel: "Remember This",
    memoryLine: "Break the circular wait, then check fairness.",
    memoryLineAtEnd: true,
    trap: "A Deadlock-free solution may still let one Philosopher starve.",
  },
};

export {
  semaphoresDetailed,
  monitorsConditionVariablesDetailed,
  producerConsumerDetailed,
  readersWritersDetailed,
  diningPhilosophersDetailed,
};
