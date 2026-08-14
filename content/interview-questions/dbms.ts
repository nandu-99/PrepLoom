import type { DbmsQuestion } from "@/content/interview-questions/types";

export const dbmsInterviewQuestions: DbmsQuestion[] = [
  {
    id: "what-is-dbms",
    category: "DBMS foundations and architecture",
    question: "What is a DBMS, and why do applications use one?",
    answer:
      "A DBMS is software that stores, retrieves, and manages data in a controlled way. Applications use it for consistent updates, concurrent access, security, recovery, and efficient querying. It also gives the application a stable data layer instead of making every feature manage files directly.",
  },
  {
    id: "dbms-vs-file-system",
    category: "DBMS foundations and architecture",
    question: "How is a DBMS better than storing data directly in files?",
    answer:
      "Files can work for simple data, but the application must handle searching, concurrent writes, permissions, consistency, and recovery itself. A DBMS provides those capabilities centrally. It also reduces duplication and lets different parts of a system query the same structured data safely.",
  },
  {
    id: "schema-vs-instance",
    category: "DBMS foundations and architecture",
    question: "What is the difference between a database schema and a database instance?",
    answer:
      "The schema is the database structure: tables, columns, relationships, constraints, and other definitions. An instance is the actual data stored at a particular moment. The schema changes occasionally through migrations, while the instance changes whenever rows are inserted, updated, or deleted.",
  },
  {
    id: "three-schema-architecture",
    category: "DBMS foundations and architecture",
    question: "What does the three-schema architecture try to achieve?",
    answer:
      "It separates user views, the logical database design, and physical storage. This separation gives data independence. A storage change should not affect the logical model, and a logical change should have limited impact on application views when their contracts can remain the same.",
  },
  {
    id: "dbms-vs-rdbms",
    category: "DBMS foundations and architecture",
    question: "What makes a relational DBMS different from a general DBMS?",
    answer:
      "A relational DBMS represents data as relations, usually tables, and connects them through keys. It supports relational operations, constraints, and typically SQL. DBMS is the broader term and can also include document, graph, key-value, and other database models.",
  },

  {
    id: "relation-tuple-attribute-domain",
    category: "Relational model, keys and constraints",
    question: "What do relation, tuple, attribute, and domain mean in the relational model?",
    answer:
      "A relation is a table-like set of records. A tuple is one row, an attribute is one named column, and a domain defines the valid kind of values for that attribute. These terms describe the logical relational model rather than a database's physical storage format.",
  },
  {
    id: "super-candidate-primary-key",
    category: "Relational model, keys and constraints",
    question: "How do a super key, candidate key, and primary key differ?",
    answer:
      "A super key is any attribute set that uniquely identifies a row, even if it contains unnecessary attributes. A candidate key is a minimal super key. The primary key is the candidate key chosen as the main row identifier; the remaining candidate keys are alternate keys.",
  },
  {
    id: "primary-key-vs-unique",
    category: "Relational model, keys and constraints",
    question: "What is the difference between a primary key and a UNIQUE constraint?",
    answer:
      "Both enforce uniqueness, but a table has one primary key and it also rejects NULL values. A table can have multiple UNIQUE constraints. NULL behaviour under UNIQUE can vary by database, so I check the engine's rules rather than assuming every system treats NULLs identically.",
  },
  {
    id: "foreign-key",
    category: "Relational model, keys and constraints",
    question: "What does a foreign key guarantee?",
    answer:
      "A foreign key enforces referential integrity between tables. A referencing value must match an allowed key in the parent table, unless the foreign key is nullable. The database can also define what happens to dependent rows when a parent is updated or deleted.",
  },
  {
    id: "database-constraints",
    category: "Relational model, keys and constraints",
    question: "Why should important validation also exist as database constraints?",
    answer:
      "Application validation improves the user experience, but it can be bypassed by another service, script, or race condition. Database constraints protect the rule for every writer. I use NOT NULL, CHECK, UNIQUE, and foreign keys for invariants that must always hold.",
  },
  {
    id: "null-three-valued-logic",
    category: "Relational model, keys and constraints",
    question: "Why can NULL produce unexpected SQL results?",
    answer:
      "NULL represents a missing or unknown value, so comparisons such as `column = NULL` do not return true or false; they return unknown. SQL therefore uses three-valued logic. I test NULL with `IS NULL` or `IS NOT NULL` and consider it explicitly in filters.",
  },

  {
    id: "er-model-basics",
    category: "ER modelling and schema design",
    question: "What are entities, attributes, and relationships in an ER model?",
    answer:
      "An entity represents a distinguishable business object, such as a customer. Attributes describe it, such as name or email. Relationships show how entities are associated, such as a customer placing an order. The model helps clarify the domain before tables are created.",
  },
  {
    id: "cardinality-vs-participation",
    category: "ER modelling and schema design",
    question: "What is the difference between cardinality and participation?",
    answer:
      "Cardinality describes how many instances can be related, such as one-to-many. Participation describes whether the relationship is optional or mandatory for an entity. For example, one customer can have many orders, while every order may be required to belong to a customer.",
  },
  {
    id: "weak-entity",
    category: "ER modelling and schema design",
    question: "What is a weak entity, and how would you model it?",
    answer:
      "A weak entity cannot be uniquely identified without its owner. An order item is a common example: its line number is unique only within an order. I would store the owner's key and the partial key together, often using them as a composite primary key.",
  },
  {
    id: "many-to-many-mapping",
    category: "ER modelling and schema design",
    question: "How do you represent a many-to-many relationship in a relational database?",
    answer:
      "I introduce a junction table containing foreign keys to both related tables. Those keys can form its primary key, or it can use a separate identifier with a UNIQUE constraint on the pair. Relationship-specific data, such as quantity or enrollment date, also belongs there.",
  },
  {
    id: "natural-vs-surrogate-key",
    category: "ER modelling and schema design",
    question: "When would you choose a surrogate key over a natural key?",
    answer:
      "I prefer a surrogate key when the natural identifier is large, mutable, sensitive, or not reliably unique. I still add a UNIQUE constraint for the real business identifier. A stable natural key can be a good primary key when its meaning and uniqueness are genuinely durable.",
  },

  {
    id: "where-vs-having",
    category: "SQL filtering, grouping and aggregation",
    question: "What is the difference between WHERE and HAVING?",
    answer:
      "WHERE filters individual rows before grouping and aggregation. HAVING filters the grouped results afterward, so it can use aggregate conditions such as `COUNT(*) > 5`. I use WHERE whenever a row can be removed early, then HAVING only for conditions on the groups.",
  },
  {
    id: "group-by-rule",
    category: "SQL filtering, grouping and aggregation",
    question: "What rule do you follow when writing a GROUP BY query?",
    answer:
      "Every selected expression should either be aggregated or be valid for the grouping according to the database's rules. Conceptually, one result row is produced per group. If I select an unrelated column, the database cannot determine which row's value should represent that group.",
  },
  {
    id: "count-star-vs-column",
    category: "SQL filtering, grouping and aggregation",
    question: "How do COUNT(*) and COUNT(column) differ?",
    answer:
      "`COUNT(*)` counts rows, regardless of whether individual columns contain NULL. `COUNT(column)` counts only rows where that particular expression is not NULL. This matters when I measure all records versus only records that have a value for a specific field.",
  },
  {
    id: "find-duplicate-values",
    category: "SQL filtering, grouping and aggregation",
    question: "How would you find duplicate email addresses in a users table?",
    answer:
      "I would group rows by email and keep only groups whose count is greater than one. Before running it, I would decide whether NULL values and letter casing should count as duplicates because those are business rules, not just SQL details.",
    code: "SELECT email, COUNT(*) AS occurrences\nFROM users\nGROUP BY email\nHAVING COUNT(*) > 1;",
  },
  {
    id: "second-highest-salary",
    category: "SQL filtering, grouping and aggregation",
    question: "How would you find the second-highest distinct salary?",
    answer:
      "I can take the maximum salary below the overall maximum. This handles repeated top salaries because it looks for the next distinct value. It returns NULL if no lower salary exists. For the nth highest value, a ranking window function is usually clearer.",
    code: "SELECT MAX(salary) AS second_highest\nFROM employees\nWHERE salary < (SELECT MAX(salary) FROM employees);",
  },
  {
    id: "conditional-aggregation",
    category: "SQL filtering, grouping and aggregation",
    question: "How would you count completed and pending orders in one query?",
    answer:
      "I would use conditional aggregation so the table is grouped once and each condition contributes to its own count. `SUM` with a `CASE` expression is portable and also works when I later group the result by customer, day, or another dimension.",
    code: "SELECT\n  SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) AS completed,\n  SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) AS pending\nFROM orders;",
  },
  {
    id: "delete-truncate-drop",
    category: "SQL filtering, grouping and aggregation",
    question: "What is the difference between DELETE, TRUNCATE, and DROP?",
    answer:
      "DELETE removes selected rows and can use a WHERE clause. TRUNCATE removes all rows while keeping the table structure, usually through a faster database-specific operation. DROP removes the database object itself. Logging, trigger, identity, and rollback behaviour can vary by engine.",
  },

  {
    id: "join-types",
    category: "Joins, subqueries, views and CTEs",
    question: "How do INNER, LEFT, RIGHT, and FULL joins differ?",
    answer:
      "INNER JOIN returns only matching row combinations. LEFT and RIGHT joins preserve every row from one chosen side and fill missing matches with NULL. FULL JOIN preserves unmatched rows from both sides. I choose the join based on which records the result must retain.",
  },
  {
    id: "outer-join-on-vs-where",
    category: "Joins, subqueries, views and CTEs",
    question: "Why can moving a condition from ON to WHERE change a LEFT JOIN result?",
    answer:
      "A condition in ON controls which right-side rows match while still preserving every left row. A WHERE condition runs after the join and may reject rows whose right-side values are NULL. That can unintentionally make the result behave like an inner join.",
  },
  {
    id: "self-join-manager",
    category: "Joins, subqueries, views and CTEs",
    question: "How would you show each employee with their manager's name?",
    answer:
      "I would join the employees table to itself using separate aliases. A LEFT JOIN keeps top-level employees whose manager ID is NULL. The aliases make it clear that one reference represents the employee and the other represents the manager.",
    code: "SELECT e.name AS employee, m.name AS manager\nFROM employees AS e\nLEFT JOIN employees AS m ON m.id = e.manager_id;",
  },
  {
    id: "correlated-subquery",
    category: "Joins, subqueries, views and CTEs",
    question: "What is a correlated subquery?",
    answer:
      "A correlated subquery refers to values from the outer query, so its result depends on the current outer row. It is useful for row-specific checks, but it can be harder to optimize or read. I compare it with a join, aggregation, or window function when performance matters.",
  },
  {
    id: "exists-vs-in",
    category: "Joins, subqueries, views and CTEs",
    question: "When would you use EXISTS instead of IN?",
    answer:
      "I use EXISTS when I only need to know whether a matching row exists, especially in a correlated check. IN compares against a set of values and is often equally clear for a small subquery. I am careful with `NOT IN` if the subquery can return NULL.",
  },
  {
    id: "customers-without-orders",
    category: "Joins, subqueries, views and CTEs",
    question: "How would you find customers who have never placed an order?",
    answer:
      "I would use NOT EXISTS and correlate the order to the current customer. It directly expresses the requirement and avoids the NULL behaviour that can make `NOT IN` surprising. A LEFT JOIN with an `IS NULL` check is another valid approach.",
    code: "SELECT c.id, c.name\nFROM customers AS c\nWHERE NOT EXISTS (\n  SELECT 1\n  FROM orders AS o\n  WHERE o.customer_id = c.id\n);",
  },
  {
    id: "employees-above-department-average",
    category: "Joins, subqueries, views and CTEs",
    question: "How would you find employees earning above their department average?",
    answer:
      "A correlated subquery can calculate the average for the current employee's department and compare the employee's salary with it. On a large dataset, I would also consider pre-aggregating department averages and joining them, then compare both plans with the database's optimizer output.",
    code: "SELECT e.id, e.name, e.salary\nFROM employees AS e\nWHERE e.salary > (\n  SELECT AVG(d.salary)\n  FROM employees AS d\n  WHERE d.department_id = e.department_id\n);",
  },
  {
    id: "cte-view-materialized-view",
    category: "Joins, subqueries, views and CTEs",
    question: "How do a CTE, a view, and a materialized view differ?",
    answer:
      "A CTE names a result within one statement. A regular view stores a reusable query definition and normally reads current base data. A materialized view stores the query result and must be refreshed. Optimization and refresh behaviour vary by database, so I check the target engine.",
  },

  {
    id: "functional-dependency",
    category: "Functional dependencies and normalization",
    question: "What is a functional dependency?",
    answer:
      "A functional dependency `X -> Y` means that if two rows agree on X, they must also agree on Y. It describes a rule in the data, not just a pattern in the current rows. Candidate keys and normalization are identified from these dependencies.",
  },
  {
    id: "data-anomalies",
    category: "Functional dependencies and normalization",
    question: "What problems does normalization try to prevent?",
    answer:
      "Normalization reduces repeated facts that can cause update, insertion, and deletion anomalies. For example, storing a department name in every employee row makes one department rename require many updates. Separating the fact gives it one authoritative place while relationships preserve access.",
  },
  {
    id: "first-normal-form",
    category: "Functional dependencies and normalization",
    question: "What does First Normal Form require?",
    answer:
      "First Normal Form requires each row and column intersection to hold a single value from its domain, without repeating groups such as `phone1`, `phone2`, and `phone3`. Multiple phone numbers would normally move into a related table with one number per row.",
  },
  {
    id: "second-normal-form",
    category: "Functional dependencies and normalization",
    question: "When does a table violate Second Normal Form?",
    answer:
      "A table in First Normal Form violates Second Normal Form when a non-key attribute depends on only part of a composite candidate key. The partial dependency should move to another table. If every candidate key has one attribute, this specific violation cannot occur.",
  },
  {
    id: "third-normal-form-vs-bcnf",
    category: "Functional dependencies and normalization",
    question: "How would you explain the difference between 3NF and BCNF?",
    answer:
      "Both reduce dependencies that create redundancy. BCNF requires the determinant of every non-trivial functional dependency to be a super key. 3NF allows a limited exception when the dependent attribute is prime. BCNF is stricter, but a BCNF decomposition may not preserve every dependency.",
  },
  {
    id: "lossless-dependency-preserving",
    category: "Functional dependencies and normalization",
    question: "What do lossless join and dependency preservation mean?",
    answer:
      "A lossless decomposition lets us join the decomposed tables and recover exactly the original relation without spurious rows. Dependency preservation means the original functional dependencies can be enforced on individual decomposed tables without joining them. A good design aims for both when possible.",
  },
  {
    id: "when-denormalize",
    category: "Functional dependencies and normalization",
    question: "When would you intentionally denormalize a schema?",
    answer:
      "I would denormalize only after measurements show that repeated joins or aggregations are a real bottleneck and the read benefit is worth the consistency cost. I would define one source of truth, automate synchronization, and monitor drift rather than duplicating data casually.",
  },

  {
    id: "what-is-transaction",
    category: "Transactions, ACID and isolation levels",
    question: "What is a database transaction?",
    answer:
      "A transaction groups related database operations into one logical unit of work. It either commits its changes together or rolls them back when something fails. For example, creating an order and reserving its inventory may need one transaction so partial state is not exposed.",
  },
  {
    id: "acid-properties",
    category: "Transactions, ACID and isolation levels",
    question: "Can you explain the ACID properties with practical meaning?",
    answer:
      "Atomicity gives all-or-nothing execution. Consistency preserves declared rules. Isolation controls interference between concurrent transactions. Durability keeps committed changes despite a crash. ACID does not automatically make business logic correct; the application and schema still need to define the right transaction boundaries and constraints.",
  },
  {
    id: "atomicity-vs-durability",
    category: "Transactions, ACID and isolation levels",
    question: "What is the difference between atomicity and durability?",
    answer:
      "Atomicity is about whether a transaction's operations take effect as one unit. Durability is about whether a committed result survives a later failure. Rollback mechanisms support atomicity, while logs, stable storage, replication, and recovery mechanisms can contribute to durability.",
  },
  {
    id: "isolation-anomalies",
    category: "Transactions, ACID and isolation levels",
    question: "What are dirty reads, non-repeatable reads, and phantom reads?",
    answer:
      "A dirty read sees uncommitted data. A non-repeatable read gets a different value when the same row is read again. A phantom occurs when repeating a range query returns a changed set of rows. Isolation levels decide which effects a transaction may observe.",
  },
  {
    id: "isolation-levels",
    category: "Transactions, ACID and isolation levels",
    question: "How do you choose a transaction isolation level?",
    answer:
      "I choose the weakest level that still protects the workflow's invariants, because stronger isolation can reduce concurrency or cause more retries. I identify the harmful anomaly first, check the database's exact implementation, and test concurrent cases rather than relying only on the standard level name.",
  },
  {
    id: "mvcc",
    category: "Transactions, ACID and isolation levels",
    question: "What is MVCC, and does it remove the need for locks?",
    answer:
      "MVCC keeps multiple row versions so readers can often see a consistent snapshot without blocking writers. It improves read and write concurrency, but it does not remove locks. Conflicting writes, schema changes, and explicit locking can still block or require conflict handling.",
  },
  {
    id: "transaction-boundary",
    category: "Transactions, ACID and isolation levels",
    question: "How do you decide where a transaction should begin and end?",
    answer:
      "I keep all database changes that must succeed or fail together in one transaction, but avoid holding it open during user input, network calls, or slow unrelated work. Short boundaries reduce lock time. External side effects need patterns such as an outbox because a database rollback cannot undo an email.",
  },

  {
    id: "shared-exclusive-locks",
    category: "Concurrency, locking and deadlocks",
    question: "What is the difference between shared and exclusive locks?",
    answer:
      "A shared lock allows compatible readers but blocks an incompatible writer. An exclusive lock protects a write and conflicts with other access according to the database's lock rules. Real systems can lock rows, pages, tables, or key ranges, so the exact behaviour is engine-specific.",
  },
  {
    id: "two-phase-locking",
    category: "Concurrency, locking and deadlocks",
    question: "What is two-phase locking, and what does strict 2PL add?",
    answer:
      "Two-phase locking has a growing phase where locks are acquired and a shrinking phase where they are released. Strict 2PL holds exclusive write locks until commit or rollback. That prevents other transactions from seeing or depending on uncommitted writes and simplifies recovery.",
  },
  {
    id: "database-deadlock",
    category: "Concurrency, locking and deadlocks",
    question: "How does a database deadlock happen, and how should an application handle it?",
    answer:
      "A deadlock happens when transactions wait on each other's locks in a cycle. The database usually detects it and aborts one transaction. I reduce the risk by locking resources in a consistent order, keeping transactions short, and retrying the chosen victim safely.",
  },
  {
    id: "optimistic-vs-pessimistic-locking",
    category: "Concurrency, locking and deadlocks",
    question: "When would you use optimistic versus pessimistic locking?",
    answer:
      "Optimistic locking works well when conflicts are rare; an update checks a version and retries or reports a conflict if it changed. Pessimistic locking reserves the row before modifying it and suits short, high-contention workflows where conflicts are expected and waiting is acceptable.",
  },
  {
    id: "prevent-lost-update",
    category: "Concurrency, locking and deadlocks",
    question: "How would you prevent two requests from overwriting each other's update?",
    answer:
      "I could use an atomic SQL update, lock the row inside a transaction, or include a version in the UPDATE condition. The best option depends on the invariant and contention. I also check the affected row count so an optimistic conflict is detected instead of silently ignored.",
    code: "UPDATE products\nSET stock = stock - 1, version = version + 1\nWHERE id = 42 AND stock > 0 AND version = 7;",
  },

  {
    id: "what-is-index",
    category: "Indexing, storage and query optimization",
    question: "What is an index, and why not index every column?",
    answer:
      "An index is an additional data structure that helps the database locate rows without scanning all table data. It consumes storage and adds work to inserts, updates, and deletes. I add indexes for important access patterns, then verify that queries actually use them effectively.",
  },
  {
    id: "btree-vs-hash-index",
    category: "Indexing, storage and query optimization",
    question: "When is a B-tree index more useful than a hash index?",
    answer:
      "A B-tree supports equality, ordered traversal, and range conditions, so it is a strong general-purpose choice. A hash index is mainly useful for equality lookups. Exact capabilities, durability, and optimizer support depend on the database, so I choose based on the target engine and query pattern.",
  },
  {
    id: "clustered-vs-nonclustered-index",
    category: "Indexing, storage and query optimization",
    question: "What is the difference between clustered and nonclustered indexes?",
    answer:
      "A clustered organization determines or closely controls how table rows are stored around an index order, so a table typically has only one. A nonclustered index is a separate structure that points to rows. These terms differ across database engines, so I explain them using the specific system.",
  },
  {
    id: "composite-index-order",
    category: "Indexing, storage and query optimization",
    question: "Why does column order matter in a composite index?",
    answer:
      "The leading columns determine which query prefixes the index can search efficiently. An index on `(customer_id, created_at)` is useful for one customer's orders and their date range, but usually not as useful for filtering only by `created_at`. I order columns around real filters, joins, and sorting.",
  },
  {
    id: "index-selectivity-tradeoff",
    category: "Indexing, storage and query optimization",
    question: "Why might the optimizer ignore an available index?",
    answer:
      "If a condition returns a large portion of the table, random index lookups may cost more than a sequential scan. Stale statistics, functions on indexed columns, type mismatches, or an unsuitable column order can also matter. An unused index is not automatically an optimizer mistake.",
  },
  {
    id: "explain-query-plan",
    category: "Indexing, storage and query optimization",
    question: "How do you use an execution plan to improve a query?",
    answer:
      "I inspect scan types, join order and algorithms, row estimates, filters, sorts, and expensive operations. With an execution mode such as EXPLAIN ANALYZE, I compare estimated and actual work carefully. Then I change one likely cause, such as an index or query shape, and measure again.",
  },

  {
    id: "debug-slow-query",
    category: "Recovery and practical scenarios",
    question: "A query became slow in production. How would you investigate it?",
    answer:
      "I would capture the exact query and parameters, compare timing and row volume, inspect its execution plan, and check locks, resource pressure, statistics, and recent schema or data changes. I would reproduce safely, fix the measured bottleneck, and verify the improvement under realistic load.",
  },
  {
    id: "partial-order-workflow",
    category: "Recovery and practical scenarios",
    question: "An order was created but inventory was not reserved. How would you prevent that state?",
    answer:
      "If both changes are in one database, I would place them in a single transaction with the required constraints and rollback on failure. Across services, I would use an idempotent workflow such as a saga or transactional outbox, with explicit compensation and monitoring for incomplete steps.",
  },
  {
    id: "wal-and-checkpoints",
    category: "Recovery and practical scenarios",
    question: "How do write-ahead logging and checkpoints help crash recovery?",
    answer:
      "Write-ahead logging records the change in durable log form before the related data page is written. After a crash, the database can replay committed changes and handle incomplete work according to its recovery design. Checkpoints limit how far back recovery normally needs to process the log.",
  },
  {
    id: "large-table-pagination",
    category: "Recovery and practical scenarios",
    question: "How would you paginate a very large, frequently changing table?",
    answer:
      "For deep pages, I prefer keyset pagination using a stable, indexed ordering key instead of a large OFFSET. The next request continues after the last seen key. It scales better and avoids many duplicate or skipped results, though direct jumps to an arbitrary page become harder.",
    code: "SELECT id, created_at, title\nFROM posts\nWHERE (created_at, id) < (:last_created_at, :last_id)\nORDER BY created_at DESC, id DESC\nLIMIT 20;",
  },
];
