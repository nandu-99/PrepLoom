import type { SubjectTopic } from "@/lib/subject-content";

export const relationalAlgebraFundamentals: SubjectTopic = {
  slug: "relational-algebra-fundamentals",
  title: "Relational Algebra Fundamentals",
  description:
    "Learn the core operations used to select, reshape, combine, and rename relations.",
  readTime: "26 min",
  difficulty: "Intermediate",
  tags: ["Relational Algebra", "Selection", "Projection"],
  learn: {
    opening:
      "Relational algebra is a formal query language for the relational model. Every operation takes one or more relations as input and produces a new relation as output.",
    sections: [
      {
        title: "Why Relational Algebra Matters",
        paragraphs: [
          "Relational algebra explains what a query does without depending on one SQL product. DBMS query optimizers also use algebra-like operations when creating execution plans.",
          "Because the result of every operation is another relation, operations can be combined into larger expressions. This property is called closure.",
        ],
        visual: {
          src: "/notes/dbms/relational-algebra-operators.png",
          alt: "Relational algebra operators grouped into operations on one relation, set operations, and operations that combine relations.",
          width: 1536,
          height: 1024,
          caption:
            "Relational algebra transforms one or more input relations into a new relation.",
        },
      },
      {
        title: "Basic and Derived Operators",
        paragraphs: [
          "Selection, projection, union, set difference, Cartesian product, and rename are commonly treated as the basic operators. They are enough to express the other standard operations.",
          "Intersection, joins, and division are derived operators because they can be written using combinations of basic operators. Some textbooks group the operators differently, but the operation meanings do not change.",
        ],
      },
      {
        title: "Selection",
        paragraphs: [
          "Selection chooses tuples that satisfy a condition. It is written as σcondition(R). Selection filters rows but keeps all attributes.",
          "Example: σDepartment = 'CSE'(STUDENT) returns only CSE students.",
        ],
        points: [
          "Input: one relation.",
          "Output degree: same as the input degree.",
          "Output cardinality: from 0 up to the input cardinality.",
          "SQL equivalent: WHERE.",
        ],
      },
      {
        title: "Projection",
        paragraphs: [
          "Projection chooses attributes. It is written as πattributes(R). Projection removes unrequested columns and also removes duplicate result tuples in formal relational algebra.",
          "Example: πDepartment(STUDENT) returns the departments that appear in STUDENT, with each department listed once.",
        ],
        points: [
          "Input: one relation.",
          "Output degree: number of projected attributes.",
          "Output cardinality: no greater than the input cardinality.",
          "SQL normally needs DISTINCT to match duplicate-removing projection.",
        ],
      },
      {
        title: "Rename",
        paragraphs: [
          "Rename changes a relation name, attribute names, or both. It is written using ρ. Renaming is useful when the same relation appears more than once, such as in a self join.",
          "Example: ρS(Sid, Sname, Dept)(STUDENT) renames the relation to S and its three attributes to Sid, Sname, and Dept.",
        ],
      },
      {
        title: "Set Operations",
        paragraphs: [
          "Union, intersection, and difference treat relations as sets of tuples. Their inputs must be union-compatible: they must have the same degree, and corresponding attributes in the same positions must have compatible domains.",
          "If matching attributes appear in a different order, use projection or rename first so that the two schemas align.",
        ],
        dataTable: {
          headers: ["Operation", "Meaning", "Expression"],
          rows: [
            ["Union", "Tuples in R or S or both", "R ∪ S"],
            ["Intersection", "Tuples present in both", "R ∩ S"],
            ["Difference", "Tuples in R but not in S", "R − S"],
          ],
        },
      },
      {
        title: "Cartesian Product",
        paragraphs: [
          "The Cartesian product pairs every tuple of R with every tuple of S. It is written R × S.",
          "If R has m tuples and S has n tuples, R × S has m × n tuples. Its degree is degree(R) + degree(S). Rename same-named attributes when needed to avoid ambiguity.",
        ],
      },
      {
        title: "Writing Combined Expressions",
        paragraphs: [
          "Read an expression from the inside outward. First create the inner result, then apply the outer operation.",
          "Example: πName(σDepartment = 'CSE'(STUDENT)) first selects CSE students and then keeps only Name. The matching SQL idea is SELECT Name FROM STUDENT WHERE Department = 'CSE'.",
        ],
      },
      {
        title: "Worked Operations on One Relation",
        paragraphs: [
          "Let STUDENT contain (1, Asha, CSE), (2, Ravi, ECE), and (3, Asha, CSE), with attributes StudentId, Name, and Department.",
        ],
        dataTable: {
          headers: ["Expression", "Result", "Reason"],
          rows: [
            ["σDepartment = 'CSE'(STUDENT)", "(1, Asha, CSE), (3, Asha, CSE)", "Keeps matching tuples"],
            ["πName(STUDENT)", "(Asha), (Ravi)", "Keeps Name and removes duplicate Asha"],
            ["πName(σDepartment = 'ECE'(STUDENT))", "(Ravi)", "Selects first, then projects"],
          ],
        },
      },
      {
        title: "Practice: Result Size",
        paragraphs: [
          "R(A, B) has 20 tuples and S(C, D, E) has 5 tuples. Assume no other information is given.",
        ],
        points: [
          "R × S has 20 × 5 = 100 tuples.",
          "R × S has degree 2 + 3 = 5.",
          "σA > 10(R) can contain from 0 to 20 tuples.",
          "πA(R) can contain from 1 to 20 tuples when R is non-empty.",
        ],
      },
    ],
    mechanism: {
      title: "How to solve a relational algebra expression",
      steps: [
        "Write the input relation schemas.",
        "Start with the innermost operation.",
        "Track which tuples and attributes remain after each operation.",
        "Check union compatibility before a set operation.",
        "Write the final schema and remove duplicates where relational algebra requires it.",
      ],
    },
    example: {
      title: "Students with high marks",
      body: "To return the names of students whose Marks exceed 80, use πName(σMarks > 80(STUDENT)). Selection removes unwanted rows first; projection then keeps only Name.",
    },
    misconception:
      "Selection chooses rows, while projection chooses columns. Their everyday English meanings can make students swap them.",
  },
  revise: {
    definition:
      "Relational algebra is a closed collection of operations that transforms relations into new relations.",
    sections: [
      {
        title: "Core Operators",
        dataTable: {
          headers: ["Symbol", "Operation", "Main effect"],
          rows: [
            ["σ", "Selection", "Filters tuples"],
            ["π", "Projection", "Chooses attributes"],
            ["ρ", "Rename", "Changes names"],
            ["∪", "Union", "Combines compatible tuples"],
            ["−", "Difference", "Keeps tuples only in the first relation"],
            ["×", "Cartesian product", "Creates every tuple pair"],
          ],
        },
      },
      {
        title: "Size Rules",
        points: [
          "|σ(R)| ≤ |R|.",
          "|π(R)| ≤ |R|.",
          "|R × S| = |R| × |S|.",
          "degree(R × S) = degree(R) + degree(S).",
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Every operation returns a relation.",
      "Selection keeps attributes; projection may reduce attributes and tuples.",
          "Union, intersection, and difference need union-compatible relations.",
          "Basic operators can be combined to express joins, intersection, and division.",
      "Evaluate nested expressions from the inside outward.",
    ],
    followUp: "Why can projection reduce cardinality even though it mainly chooses columns?",
  },
  lastMinute: {
    definition:
      "σ filters rows, π chooses columns, ρ renames, set operations compare tuples, and × creates all tuple pairs.",
    sections: [
      {
        title: "Fast Formula Check",
        points: [
          "Selection: same degree.",
          "Projection: requested degree.",
          "Product cardinality: multiply.",
          "Product degree: add.",
        ],
      },
    ],
    memoryLine: "Select rows → project columns → combine results",
    cues: ["Closure", "Union-compatible", "Inside outward"],
    trap: "Formal projection removes duplicate result tuples; plain SQL SELECT does not.",
  },
};

export const joinsAndDivisionInRelationalAlgebra: SubjectTopic = {
  slug: "joins-and-division-in-relational-algebra",
  title: "Joins and Division in Relational Algebra",
  description:
    "Combine related tuples with joins and answer for-all questions using division.",
  readTime: "28 min",
  difficulty: "Intermediate",
  tags: ["Join", "Outer Join", "Division"],
  learn: {
    opening:
      "A join combines related tuples from two relations. It is usually a Cartesian product followed by a condition, but it avoids keeping unrelated pairs in the final result.",
    sections: [
      {
        title: "Theta Join",
        paragraphs: [
          "A theta join uses any comparison condition such as =, <, >, ≤, or ≥. It is written R ⋈condition S and is equivalent to σcondition(R × S).",
          "Example: EMPLOYEE ⋈EMPLOYEE.DeptId = DEPARTMENT.DeptId DEPARTMENT pairs each employee with the matching department.",
        ],
      },
      {
        title: "Equi Join and Natural Join",
        paragraphs: [
          "An equi join is a theta join whose condition uses only equality. It normally keeps both copies of the compared join attributes.",
          "A natural join automatically compares every same-named attribute and keeps one copy of each common attribute. It is convenient only when those shared names truly represent the intended relationship.",
        ],
        table: {
          headers: ["Equi join", "Natural join"],
          rows: [
            ["Condition is written explicitly", "Uses all same-named attributes automatically"],
            ["Keeps both join columns", "Keeps one copy of common columns"],
            ["Safer when names differ or several names match", "Shorter when names match correctly"],
          ],
        },
      },
      {
        title: "Worked Natural Join",
        paragraphs: [
          "EMPLOYEE(EmpId, Name, DeptId) contains (1, Asha, 10) and (2, Ravi, 20). DEPARTMENT(DeptId, DeptName) contains (10, CSE), (20, ECE), and (30, ME).",
        ],
        dataTable: {
          headers: ["EmpId", "Name", "DeptId", "DeptName"],
          rows: [
            ["1", "Asha", "10", "CSE"],
            ["2", "Ravi", "20", "ECE"],
          ],
        },
      },
      {
        title: "Inner and Outer Joins",
        paragraphs: [
          "An inner join keeps only matching tuple combinations. An outer join also keeps specified non-matching tuples and fills missing attributes with NULL in practical database systems.",
          "Common relational algebra symbols are ⟕ for left outer join, ⟖ for right outer join, and ⟗ for full outer join.",
        ],
        dataTable: {
          headers: ["Join", "Rows kept"],
          rows: [
            ["Inner", "Only matching rows"],
            ["Left outer", "All left rows and matching right rows"],
            ["Right outer", "All right rows and matching left rows"],
            ["Full outer", "All rows from both sides"],
          ],
        },
      },
      {
        title: "Self Join",
        paragraphs: [
          "A self join joins a relation with another renamed copy of itself. Renaming is necessary so the two roles are clear.",
          "For EMPLOYEE(EmpId, Name, ManagerId), rename one copy as E and another as M, then match E.ManagerId = M.EmpId to find each employee's manager.",
        ],
      },
      {
        title: "Division",
        paragraphs: [
          "Division answers queries containing the idea 'for every' or 'all'. If R(X, Y) is divided by S(Y), the result contains X values related to every Y value in S.",
          "If ENROLMENT(StudentId, CourseId) is divided by REQUIRED(CourseId), the result contains students enrolled in every required course.",
        ],
      },
      {
        title: "Worked Division Example",
        paragraphs: [
          "ENROLMENT contains (S1, DBMS), (S1, OS), (S2, DBMS), and (S3, DBMS), (S3, OS). REQUIRED contains (DBMS) and (OS).",
        ],
        dataTable: {
          headers: ["Student", "Has DBMS?", "Has OS?", "In the result?"],
          rows: [
            ["S1", "Yes", "Yes", "Yes"],
            ["S2", "Yes", "No", "No"],
            ["S3", "Yes", "Yes", "Yes"],
          ],
        },
      },
      {
        title: "Practice: Join Cardinality",
        paragraphs: [
          "EMPLOYEE has 6 tuples and DEPARTMENT has 3 tuples. Their Cartesian product has 18 tuple pairs. If each employee matches exactly one department, the matching inner join has 6 tuples.",
          "Without stronger facts, an inner join can contain from 0 to |R| × |S| tuples. If every child foreign key matches exactly one parent key, the join contains one result for each child tuple.",
          "For an equi join, both join attributes remain, so the degrees add. A natural join removes one duplicate copy of every common join attribute.",
        ],
      },
      {
        title: "Practice: Outer Join Result",
        paragraphs: [
          "CUSTOMER has customer IDs 1, 2, and 3. ORDER has orders only for customers 1 and 2. A left outer join from CUSTOMER to ORDER still keeps customer 3, with NULL values for the ORDER attributes.",
        ],
      },
    ],
    mechanism: {
      title: "How to choose a join operation",
      steps: [
        "Identify the relations and the attributes that connect them.",
        "Use an inner join when only matches are required.",
        "Use the required outer join when unmatched rows must remain.",
        "Rename relation copies for a self join.",
        "Look for 'all' or 'every' before considering division.",
      ],
    },
    example: {
      title: "Employees and department names",
      body: "EMPLOYEE ⋈EMPLOYEE.DeptId = DEPARTMENT.DeptId DEPARTMENT connects each employee to the matching department. A later projection can keep only EmployeeName and DepartmentName.",
    },
    misconception:
      "A natural join does not join on whichever condition you intended. It automatically uses every attribute name shared by both inputs.",
  },
  revise: {
    definition:
      "Joins combine related tuples; division returns values related to every value in another relation.",
    sections: [
      {
        title: "Join Recall",
        points: [
          "Theta join: any comparison condition.",
          "Equi join: equality condition.",
          "Natural join: equality on all same-named attributes.",
          "Outer join: also keeps requested unmatched rows.",
          "Self join: relation joined with a renamed copy.",
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "R ⋈condition S is selection over R × S.",
      "The exact join size depends on matches unless stronger facts are given.",
      "Outer joins introduce NULL for missing-side attributes.",
      "Division is the common operator for all/every questions.",
      "Natural join keeps one copy of each common join attribute.",
    ],
    followUp: "Why can a natural join produce the wrong result when two unrelated attributes share a name?",
  },
  lastMinute: {
    definition:
      "Inner keeps matches; outer also preserves unmatched rows; division answers for-all queries.",
    sections: [
      {
        title: "Join Choice",
        points: [
          "Explicit condition → theta or equi join.",
          "Matching names → natural join, but verify every common name.",
          "Keep missing left/right rows → outer join.",
          "Same relation twice → rename and self join.",
        ],
      },
    ],
    memoryLine: "Match → join | keep unmatched → outer | every → division",
    cues: ["Condition", "Unmatched rows", "For every"],
    trap: "Do not assume a join has the same cardinality as either input without key information.",
  },
};

export const sqlFoundations: SubjectTopic = {
  slug: "sql-foundations",
  title: "SQL Foundations",
  description:
    "Learn essential SQL command groups, table creation, data changes, constraints, and transactions.",
  readTime: "30 min",
  difficulty: "Foundation",
  tags: ["SQL", "DDL", "DML"],
  learn: {
    opening:
      "SQL is the standard language used to define relational structures, read data, change data, control permissions, and manage transactions.",
    sections: [
      {
        title: "SQL Command Groups",
        dataTable: {
          headers: ["Group", "Purpose", "Common commands"],
          rows: [
            ["DDL", "Define database objects", "CREATE, ALTER, DROP, TRUNCATE"],
            ["DML", "Insert or change rows", "INSERT, UPDATE, DELETE"],
            ["DQL", "Read data", "SELECT"],
            ["DCL", "Control permissions", "GRANT, REVOKE"],
            ["TCL", "Control transactions", "COMMIT, ROLLBACK, SAVEPOINT"],
          ],
        },
        paragraphs: [
          "These labels are common in exams. Some references classify SELECT under DML instead of using DQL, so follow the terminology used by the question or syllabus.",
        ],
      },
      {
        title: "Common Data Types",
        paragraphs: [
          "Exact names and limits differ between DBMS products, but the main data families are similar.",
        ],
        points: [
          "INTEGER or INT: whole numbers.",
          "DECIMAL(p, s): exact numeric values with precision p and scale s.",
          "CHAR(n): fixed-length text; VARCHAR(n): variable-length text.",
          "DATE, TIME, and TIMESTAMP: date and time values.",
          "BOOLEAN: true or false where supported.",
        ],
      },
      {
        title: "Creating Related Tables",
        paragraphs: [
          "Example: CREATE TABLE DEPARTMENT (DeptId INT PRIMARY KEY, DeptName VARCHAR(50) UNIQUE NOT NULL);",
          "Example: CREATE TABLE EMPLOYEE (EmpId INT PRIMARY KEY, Name VARCHAR(60) NOT NULL, Salary DECIMAL(10,2) CHECK (Salary >= 0), Status VARCHAR(10) DEFAULT 'Active', DeptId INT, FOREIGN KEY (DeptId) REFERENCES DEPARTMENT(DeptId));",
          "A composite key is written at table level. Example: CREATE TABLE WORKS_ON (EmpId INT, ProjectId INT, Hours INT, PRIMARY KEY (EmpId, ProjectId));",
          "Create the referenced parent table before the child table unless the DBMS-specific workflow adds the foreign key later.",
        ],
      },
      {
        title: "Changing a Table Definition",
        paragraphs: [
          "ALTER TABLE changes an existing table. Common operations add, modify, rename, or remove columns and constraints. Exact syntax varies between database products.",
          "Example: ALTER TABLE EMPLOYEE ADD Email VARCHAR(100);",
          "ALTER changes the table definition. UPDATE changes values stored in existing rows.",
        ],
      },
      {
        title: "Inserting and Changing Rows",
        dataTable: {
          headers: ["Task", "Example"],
          rows: [
            ["Insert", "INSERT INTO DEPARTMENT (DeptId, DeptName) VALUES (10, 'CSE');"],
            ["Update", "UPDATE EMPLOYEE SET Salary = 60000 WHERE EmpId = 1;"],
            ["Delete", "DELETE FROM EMPLOYEE WHERE EmpId = 1;"],
          ],
        },
        paragraphs: [
          "Always check the WHERE condition before UPDATE or DELETE. Without WHERE, every row in the target table may be changed or deleted.",
        ],
      },
      {
        title: "DELETE vs TRUNCATE vs DROP",
        dataTable: {
          headers: ["Command", "Removes", "Structure remains?", "WHERE allowed?"],
          rows: [
            ["DELETE", "Selected or all rows", "Yes", "Yes"],
            ["TRUNCATE", "All rows", "Yes", "No"],
            ["DROP", "The database object", "No", "No"],
          ],
        },
        paragraphs: [
          "Transaction and rollback behavior for DDL commands differs between DBMS products. Do not memorize one product's behavior as a universal SQL rule.",
        ],
      },
      {
        title: "Transactions and Permissions",
        paragraphs: [
          "COMMIT makes the current transaction's changes permanent. ROLLBACK cancels uncommitted changes. SAVEPOINT marks a position to which part of a transaction may be rolled back.",
          "GRANT gives a privilege and REVOKE removes it. For example, a user may receive SELECT permission without receiving UPDATE permission.",
        ],
      },
      {
        title: "Practice: Choose the Command",
        paragraphs: [],
        dataTable: {
          headers: ["Requirement", "Command"],
          rows: [
            ["Add a Phone column", "ALTER TABLE"],
            ["Remove employees with Status = 'Left'", "DELETE with WHERE"],
            ["Remove the EMPLOYEE table itself", "DROP TABLE"],
            ["Undo uncommitted updates", "ROLLBACK"],
            ["Give a user read permission", "GRANT SELECT"],
          ],
        },
      },
      {
        title: "Practice: Accept or Reject",
        paragraphs: [
          "Assume department 10 exists. The shown values are (EmpId, Name, Salary, DeptId). EmpId is the primary key, Salary must be non-negative, Name is NOT NULL, and DeptId is a foreign key.",
        ],
        dataTable: {
          headers: ["Insert", "Decision", "Reason"],
          rows: [
            ["(1, 'Asha', 50000, 10)", "Accept", "All constraints hold"],
            ["Another row with EmpId 1", "Reject", "Duplicate primary key"],
            ["(2, NULL, 50000, 10)", "Reject", "Name is NOT NULL"],
            ["(3, 'Ravi', -100, 10)", "Reject", "CHECK fails"],
            ["(4, 'Mina', 45000, 99)", "Reject", "Department 99 does not exist"],
          ],
        },
      },
    ],
    mechanism: {
      title: "How to write a safe data-changing statement",
      steps: [
        "Identify the exact table and columns.",
        "Check data types and constraints.",
        "For UPDATE or DELETE, write and verify the WHERE condition.",
        "Consider affected foreign-key references.",
        "Use the transaction controls supported by the target DBMS.",
      ],
    },
    example: {
      title: "Giving one department a raise",
      body: "UPDATE EMPLOYEE SET Salary = Salary * 1.10 WHERE DeptId = 10 increases only department 10 salaries by 10%. Omitting WHERE would increase every employee's salary.",
    },
    misconception:
      "DELETE removes rows, while DROP removes the table definition itself. They are not interchangeable.",
  },
  revise: {
    definition:
      "SQL defines database objects, reads and changes rows, manages permissions, and controls transactions.",
    sections: [
      {
        title: "Command Families",
        points: [
          "DDL: CREATE, ALTER, DROP, TRUNCATE.",
          "DML: INSERT, UPDATE, DELETE.",
          "DQL: SELECT in syllabi that use this category.",
          "DCL: GRANT, REVOKE.",
          "TCL: COMMIT, ROLLBACK, SAVEPOINT.",
        ],
      },
      {
        title: "Removal Commands",
        table: {
          headers: ["Rows only", "Object itself"],
          rows: [
            ["DELETE or TRUNCATE", "DROP"],
            ["DELETE may use WHERE", "DROP removes the definition"],
          ],
        },
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "List columns explicitly in INSERT when possible.",
      "UPDATE and DELETE without WHERE can affect every row.",
      "Foreign keys require a valid parent value unless NULL is allowed.",
      "DEFAULT supplies a value only when an insert does not provide one.",
      "Product-specific syntax and DDL transaction behavior can differ.",
    ],
    followUp: "What is the difference between DELETE, TRUNCATE, and DROP?",
  },
  lastMinute: {
    definition:
      "DDL defines, DML changes, SELECT reads, DCL controls access, and TCL controls transactions.",
    sections: [
      {
        title: "Safety Check",
        points: [
          "Verify WHERE before UPDATE or DELETE.",
          "Create referenced parent tables first.",
          "Use exact data types for the target DBMS.",
          "COMMIT saves; ROLLBACK cancels uncommitted work.",
        ],
      },
    ],
    memoryLine: "Define → change → query → permit → commit",
    cues: ["DDL", "DML", "DCL", "TCL"],
    trap: "TRUNCATE keeps the table structure; DROP does not.",
  },
};

export const sqlFilteringSortingAndAggregation: SubjectTopic = {
  slug: "sql-filtering-sorting-and-aggregation",
  title: "SQL Filtering, Sorting, and Aggregation",
  description:
    "Write SELECT queries that filter rows, handle NULL, form groups, and calculate summaries.",
  readTime: "32 min",
  difficulty: "Intermediate",
  tags: ["SELECT", "GROUP BY", "Aggregation"],
  learn: {
    opening:
      "A SELECT query can choose columns, filter rows, remove duplicates, sort results, and summarize groups. Correct results depend on understanding the order in which these steps logically occur.",
    sections: [
      {
        title: "Basic SELECT Query",
        paragraphs: [
          "The common written order is SELECT, FROM, WHERE, GROUP BY, HAVING, ORDER BY, and then a product-specific row limit such as LIMIT, TOP, or FETCH.",
          "Example: SELECT Name, Salary FROM EMPLOYEE WHERE DeptId = 10 ORDER BY Salary DESC;",
        ],
      },
      {
        title: "Filtering Rows",
        points: [
          "Comparison: =, <>, <, <=, >, >=.",
          "Range: Salary BETWEEN 40000 AND 70000 includes both boundary values.",
          "List: DeptId IN (10, 20, 30).",
          "Pattern: Name LIKE 'A%' means names starting with A.",
          "Logic: AND, OR, and NOT; use parentheses when conditions mix.",
        ],
        paragraphs: [
          "SQL strings use single quotes. The wildcard % matches any sequence of characters, while _ matches exactly one character.",
        ],
      },
      {
        title: "NULL and Three-Valued Logic",
        paragraphs: [
          "A comparison with NULL does not become TRUE or FALSE; it becomes UNKNOWN. WHERE keeps only rows for which its condition is TRUE.",
          "Use IS NULL or IS NOT NULL. The condition Salary = NULL is incorrect because it evaluates to UNKNOWN, even when Salary is NULL.",
        ],
        dataTable: {
          headers: ["Expression", "Result"],
          rows: [
            ["TRUE AND UNKNOWN", "UNKNOWN"],
            ["FALSE AND UNKNOWN", "FALSE"],
            ["TRUE OR UNKNOWN", "TRUE"],
            ["FALSE OR UNKNOWN", "UNKNOWN"],
            ["NOT UNKNOWN", "UNKNOWN"],
          ],
        },
      },
      {
        title: "DISTINCT and Sorting",
        paragraphs: [
          "DISTINCT removes duplicate result rows. ORDER BY sorts the final result using ASC or DESC. ASC is normally the default.",
          "Example: SELECT DISTINCT DeptId FROM EMPLOYEE ORDER BY DeptId;",
          "Without ORDER BY, SQL does not guarantee row order. A row limit should normally be paired with ORDER BY when the required rows are based on rank, such as the highest salaries.",
          "Row-limit syntax varies: MySQL and PostgreSQL commonly use LIMIT, SQL Server uses TOP, and standard-style syntax uses FETCH FIRST.",
        ],
      },
      {
        title: "Aggregate Functions",
        paragraphs: [],
        dataTable: {
          headers: ["Function", "Purpose", "NULL behavior"],
          rows: [
            ["COUNT(*)", "Counts rows", "Counts rows even when columns contain NULL"],
            ["COUNT(column)", "Counts non-NULL values", "Ignores NULL"],
            ["SUM(column)", "Adds values", "Ignores NULL"],
            ["AVG(column)", "Averages non-NULL values", "Ignores NULL"],
            ["MIN / MAX", "Finds smallest / largest value", "Ignores NULL"],
          ],
        },
      },
      {
        title: "GROUP BY and HAVING",
        paragraphs: [
          "GROUP BY creates one group for each distinct combination of its grouping columns. Aggregate functions then calculate one result per group.",
          "WHERE filters individual rows before grouping. HAVING filters groups after aggregation.",
          "Example: SELECT DeptId, AVG(Salary) FROM EMPLOYEE WHERE Salary IS NOT NULL GROUP BY DeptId HAVING AVG(Salary) > 60000;",
        ],
        points: [
          "Selected non-aggregate columns normally must appear in GROUP BY.",
          "Use WHERE for row conditions such as Status = 'Active'.",
          "Use HAVING for aggregate conditions such as COUNT(*) >= 5.",
          "GROUP BY treats all NULL values in one grouping column as one group.",
        ],
      },
      {
        title: "Multiple Groups and Aliases",
        paragraphs: [
          "GROUP BY may use several columns. SELECT DeptId, Status, COUNT(*) FROM EMPLOYEE GROUP BY DeptId, Status returns one count for each department-and-status combination.",
          "An alias names a result expression, such as COUNT(*) AS EmployeeCount. Because WHERE is logically processed before SELECT, a SELECT alias is normally unavailable in WHERE. It is commonly available in ORDER BY, which is processed later.",
        ],
      },
      {
        title: "Logical Processing Order",
        paragraphs: [
          "SQL is not logically processed in the order in which it is written. Knowing the logical order explains why a SELECT alias is usually unavailable in WHERE and why WHERE cannot directly filter an aggregate result.",
          "The final row-limit syntax is product-specific. LIMIT, OFFSET, FETCH, and TOP are not interchangeable and do not all appear in the same written position.",
        ],
        visual: {
          src: "/notes/dbms/logical-sql-processing-order.png",
          alt: "Logical SQL processing order from FROM and JOIN through WHERE, grouping, selection, sorting, and row limiting.",
          width: 1536,
          height: 1024,
          caption:
            "The logical order explains which values and aliases are available to each clause.",
        },
      },
      {
        title: "Practice: COUNT and AVG",
        paragraphs: [
          "A department has three employee rows with Salary values 50000, 70000, and NULL.",
        ],
        points: [
          "COUNT(*) returns 3 because there are three rows.",
          "COUNT(Salary) returns 2 because one Salary is NULL.",
          "SUM(Salary) returns 120000.",
          "AVG(Salary) returns 60000 because it divides by the two non-NULL salaries.",
        ],
      },
    ],
    mechanism: {
      title: "How to build an aggregate query",
      steps: [
        "Choose the source tables in FROM and JOIN.",
        "Filter individual rows in WHERE.",
        "Create the required groups with GROUP BY.",
        "Filter calculated groups with HAVING.",
        "Choose the final columns and aggregates in SELECT.",
        "Sort and limit the final result when required.",
      ],
    },
    example: {
      title: "Departments with at least five employees",
      body: "SELECT DeptId, COUNT(*) AS EmployeeCount FROM EMPLOYEE GROUP BY DeptId HAVING COUNT(*) >= 5; returns one row per qualifying department. HAVING is required because the condition uses an aggregate.",
    },
    misconception:
      "COUNT(*) and COUNT(column) are different when the column contains NULL. COUNT(*) counts rows; COUNT(column) counts non-NULL values.",
  },
  revise: {
    definition:
      "SELECT reads data; WHERE filters rows; GROUP BY forms groups; HAVING filters groups; ORDER BY sorts the result.",
    sections: [
      {
        title: "Clause Choice",
        table: {
          headers: ["Need", "Use"],
          rows: [
            ["Filter rows", "WHERE"],
            ["Filter groups", "HAVING"],
            ["Remove duplicate results", "DISTINCT"],
            ["Guarantee result order", "ORDER BY"],
          ],
        },
      },
      {
        title: "Logical Order",
        flow: [
          "FROM / JOIN",
          "WHERE",
          "GROUP BY",
          "HAVING",
          "SELECT",
          "DISTINCT",
          "ORDER BY",
          "Row limit (product-specific)",
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "BETWEEN includes both boundaries.",
      "Use IS NULL, not = NULL.",
      "Most aggregate functions ignore NULL; COUNT(*) counts rows.",
      "Several NULL grouping values form one group.",
      "Without ORDER BY, result order is not guaranteed.",
    ],
    followUp: "Why must an aggregate condition normally be placed in HAVING instead of WHERE?",
  },
  lastMinute: {
    definition:
      "Filter rows before grouping, filter groups after aggregation, then sort the final result.",
    sections: [
      {
        title: "Fast Checks",
        points: [
          "NULL check → IS NULL or IS NOT NULL.",
          "Row condition → WHERE.",
          "Aggregate condition → HAVING.",
          "Top or bottom result → ORDER BY plus a row limit.",
        ],
      },
    ],
    memoryLine: "FROM → WHERE → GROUP → HAVING → SELECT → ORDER",
    cues: ["NULL", "Aggregate", "Logical order"],
    trap: "Do not use HAVING as a replacement for every WHERE condition.",
  },
};

export const sqlJoinsSubqueriesSetOperationsAndViews: SubjectTopic = {
  slug: "sql-joins-subqueries-set-operations-and-views",
  title: "SQL Joins, Subqueries, Set Operations, and Views",
  description:
    "Combine tables, nest queries, compare result sets, and save reusable queries as views.",
  readTime: "38 min",
  difficulty: "Intermediate",
  tags: ["SQL Joins", "Subqueries", "Views"],
  learn: {
    opening:
      "Real queries often need more than one table or more than one query step. Joins combine related rows, subqueries use one query inside another, set operations combine complete results, and views save a query behind a name.",
    sections: [
      {
        title: "SQL Join Syntax",
        paragraphs: [
          "Example: SELECT E.Name, D.DeptName FROM EMPLOYEE E INNER JOIN DEPARTMENT D ON E.DeptId = D.DeptId;",
          "Aliases such as E and D make qualified column names shorter. Qualify a column whenever its name could be ambiguous.",
        ],
        dataTable: {
          headers: ["Join", "Result"],
          rows: [
            ["INNER JOIN", "Only rows satisfying ON"],
            ["LEFT JOIN", "All left rows plus right matches"],
            ["RIGHT JOIN", "All right rows plus left matches"],
            ["FULL OUTER JOIN", "All matched and unmatched rows from both sides"],
            ["CROSS JOIN", "Every left-right row pair"],
          ],
        },
      },
      {
        title: "ON vs WHERE in an Outer Join",
        paragraphs: [
          "ON decides how rows match during the join. WHERE filters the joined result afterward.",
          "In a LEFT JOIN, placing a right-table condition in WHERE can remove the NULL-extended unmatched rows and make the result behave like an inner join. Place the condition in ON when unmatched left rows must remain.",
        ],
      },
      {
        title: "Self Join in SQL",
        paragraphs: [
          "Use two aliases for the same table. Example: SELECT E.Name AS Employee, M.Name AS Manager FROM EMPLOYEE E LEFT JOIN EMPLOYEE M ON E.ManagerId = M.EmpId;",
          "LEFT JOIN keeps employees who have no manager, such as the highest-level manager.",
        ],
      },
      {
        title: "Subquery Types",
        paragraphs: [
          "A scalar subquery must provide one column and at most one row where one value is expected. No row normally gives NULL; more than one row causes an error.",
        ],
        dataTable: {
          headers: ["Type", "Returns", "Common use"],
          rows: [
            ["Scalar", "One value", "Salary > (SELECT AVG(Salary) ...)"],
            ["Single-row", "One row", "Comparison with one known result"],
            ["Multi-row", "Several rows", "IN, ANY, ALL, or EXISTS"],
            ["Correlated", "Depends on the outer row", "Per-row existence or comparison"],
          ],
        },
      },
      {
        title: "Where Subqueries Can Appear",
        paragraphs: [
          "A subquery may appear in WHERE or HAVING as a condition, in SELECT as a scalar value, or in FROM as a temporary derived table.",
          "SELECT example: SELECT Name, (SELECT AVG(Salary) FROM EMPLOYEE) AS CompanyAverage FROM EMPLOYEE;",
          "FROM example: SELECT X.DeptId, X.AvgSalary FROM (SELECT DeptId, AVG(Salary) AS AvgSalary FROM EMPLOYEE GROUP BY DeptId) X; A derived table normally needs an alias such as X.",
        ],
      },
      {
        title: "IN, EXISTS, ANY, and ALL",
        points: [
          "IN checks whether a value belongs to a returned set.",
          "EXISTS is TRUE when the subquery returns at least one row.",
          "> ANY means greater than at least one returned value.",
          "> ALL means greater than every returned value.",
        ],
        paragraphs: [
          "Be careful with NOT IN when the subquery may return NULL. UNKNOWN can prevent expected rows from appearing. A correctly correlated NOT EXISTS is often safer for an absence check.",
          "IN compares a value with a returned set. EXISTS only checks whether a matching row exists and is often the clearer choice for presence tests. The optimizer may transform either form, so do not assume one is always faster.",
        ],
      },
      {
        title: "Correlated Subquery",
        paragraphs: [
          "A correlated subquery refers to a row from the outer query. Conceptually, it is checked for each outer row, although the optimizer may execute an equivalent plan differently.",
          "Example: SELECT E.Name FROM EMPLOYEE E WHERE Salary > (SELECT AVG(E2.Salary) FROM EMPLOYEE E2 WHERE E2.DeptId = E.DeptId); returns employees earning above their own department's average.",
        ],
      },
      {
        title: "SQL Set Operations",
        dataTable: {
          headers: ["Operation", "Meaning", "Duplicates"],
          rows: [
            ["UNION", "Rows from either result", "Removed"],
            ["UNION ALL", "Rows from either result", "Kept"],
            ["INTERSECT", "Rows in both results", "Normally removed"],
            ["EXCEPT", "Rows only in the first result", "Normally removed"],
          ],
        },
        paragraphs: [
          "The two query results need the same number of columns with compatible data types. Some DBMS products use MINUS instead of EXCEPT.",
          "ORDER BY normally appears once, after the complete set-operation expression, because it sorts the final combined result.",
          "The final column names normally come from the first SELECT.",
        ],
      },
      {
        title: "Worked Set-Operation Output",
        paragraphs: [
          "Suppose query A returns (CSE), (ECE), (ECE), while query B returns (ECE), (ME).",
        ],
        dataTable: {
          headers: ["Operation", "Result"],
          rows: [
            ["A UNION B", "CSE, ECE, ME"],
            ["A UNION ALL B", "CSE, ECE, ECE, ECE, ME"],
            ["A INTERSECT B", "ECE"],
            ["A EXCEPT B", "CSE"],
          ],
        },
      },
      {
        title: "Views",
        paragraphs: [
          "A view is a named query that behaves like a virtual table. Example: CREATE VIEW ACTIVE_EMPLOYEES AS SELECT EmpId, Name, DeptId FROM EMPLOYEE WHERE Status = 'Active';",
          "A normal view stores its query definition, not a separate copy of all result rows. It can simplify repeated queries and restrict which rows or columns users see.",
          "Whether a view can be updated depends on its definition and the DBMS. Joins, grouping, aggregates, and DISTINCT commonly make updates restricted or impossible.",
        ],
      },
      {
        title: "Practice: Customers Without Orders",
        paragraphs: [
          "One clear answer is: SELECT C.CustomerId FROM CUSTOMER C WHERE NOT EXISTS (SELECT 1 FROM ORDERS O WHERE O.CustomerId = C.CustomerId);",
          "A LEFT JOIN solution is also possible: join orders, then keep rows where the joined order key IS NULL.",
        ],
      },
    ],
    mechanism: {
      title: "How to choose a multi-table query form",
      steps: [
        "Use a join when columns from related rows are needed together.",
        "Use EXISTS or NOT EXISTS for presence or absence checks.",
        "Use a scalar subquery when one calculated value is needed.",
        "Use a set operation when complete compatible query results must be combined.",
        "Use a view when the same safe query interface should be reused.",
      ],
    },
    example: {
      title: "Departments with no employees",
      body: "SELECT D.DeptId FROM DEPARTMENT D WHERE NOT EXISTS (SELECT 1 FROM EMPLOYEE E WHERE E.DeptId = D.DeptId); checks each department and keeps it only when no matching employee exists.",
    },
    misconception:
      "A LEFT JOIN does not always keep every left row after the full query. A right-table condition in WHERE may remove the unmatched rows.",
  },
  revise: {
    definition:
      "Joins combine rows, subqueries provide nested results, set operations combine compatible result sets, and views name reusable queries.",
    sections: [
      {
        title: "Choose the Tool",
        dataTable: {
          headers: ["Requirement", "Likely tool"],
          rows: [
            ["Columns from related tables", "JOIN"],
            ["At least one related row exists", "EXISTS"],
            ["No related row exists", "NOT EXISTS"],
            ["Combine complete query results", "Set operation"],
            ["Reuse or restrict a query", "VIEW"],
          ],
        },
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Use ON for matching and WHERE for final filtering.",
      "Correlated subqueries refer to the current outer row.",
      "A scalar subquery returning several rows causes an error.",
      "UNION removes duplicates; UNION ALL keeps them.",
      "Set-operation inputs need compatible columns.",
      "View updatability depends on its definition and DBMS rules.",
    ],
    followUp: "How can a WHERE condition accidentally change the effect of a LEFT JOIN?",
  },
  lastMinute: {
    definition:
      "JOIN connects rows, EXISTS checks presence, set operations combine results, and views save query definitions.",
    sections: [
      {
        title: "Fast Warnings",
        points: [
          "Qualify ambiguous column names.",
          "Check NULL before using NOT IN.",
          "UNION and UNION ALL are not the same.",
          "Do not assume every view is updatable.",
        ],
      },
    ],
    memoryLine: "Related rows → JOIN | presence → EXISTS | results → UNION",
    cues: ["ON vs WHERE", "Correlated", "Compatible results"],
    trap: "A CROSS JOIN has no matching condition and produces every pair.",
  },
};

export const sqlQueryPractice: SubjectTopic = {
  slug: "sql-query-practice",
  title: "SQL Query Practice",
  description:
    "Apply SQL to common interview and exam patterns using one small, consistent schema.",
  readTime: "34 min",
  difficulty: "Intermediate",
  tags: ["SQL Practice", "Window Functions", "Interview"],
  learn: {
    opening:
      "SQL becomes easier when a requirement is translated in small steps. The following practice uses one schema so that the focus stays on query logic.",
    sections: [
      {
        title: "Practice Schema",
        paragraphs: [],
        dataTable: {
          headers: ["Relation", "Attributes"],
          rows: [
            ["DEPARTMENT", "DeptId (PK), DeptName"],
            ["EMPLOYEE", "EmpId (PK), Name, Salary, DeptId (FK), ManagerId (FK), Status"],
            ["PROJECT", "ProjectId (PK), ProjectName, DeptId (FK)"],
            ["WORKS_ON", "EmpId (FK), ProjectId (FK), Hours; PK(EmpId, ProjectId)"],
          ],
        },
      },
      {
        title: "Practice Data",
        paragraphs: [
          "Use these rows for the independent questions. NULL means that no value is currently stored.",
        ],
        dataTable: {
          headers: ["Relation", "Rows"],
          rows: [
            ["DEPARTMENT", "(10, CSE), (20, ECE), (30, ME)"],
            ["EMPLOYEE", "(1, Asha, 70000, 10, NULL, Active), (2, Ravi, 50000, 10, 1, Active), (3, Mina, 60000, 20, NULL, Active), (4, Kiran, NULL, 20, 3, Left), (5, Noor, 70000, NULL, 1, Active)"],
            ["PROJECT", "(101, DB Core, 10), (102, OS Lab, 10), (103, Circuits, 20)"],
            ["WORKS_ON", "(1, 101, 5), (1, 102, 4), (2, 101, 3), (3, 103, 6)"],
          ],
        },
      },
      {
        title: "Try These Before Reading the Answers",
        paragraphs: [
          "Write each query and predict its result using the practice data.",
        ],
        points: [
          "List employees in department 10 from highest to lowest salary.",
          "Find departments that have no employees.",
          "Find employees who work on no project.",
          "Count projects in every department, including departments with zero projects.",
          "Find employees earning above their own department's average.",
          "Find the second-highest distinct salary.",
          "Find employees who work on every project owned by department 10.",
        ],
      },
      {
        title: "Maximum and Second-Highest Salary",
        paragraphs: [
          "Highest salary: SELECT MAX(Salary) FROM EMPLOYEE;",
          "Second-highest distinct salary: SELECT MAX(Salary) FROM EMPLOYEE WHERE Salary < (SELECT MAX(Salary) FROM EMPLOYEE);",
          "The second query returns the next lower distinct salary. It returns NULL when no second distinct salary exists. If the requirement is the second employee after sorting, ties need a clearly stated ranking rule.",
        ],
      },
      {
        title: "For-All Question",
        paragraphs: [
          "Requirement: find employees who work on every project owned by department 10.",
          "Answer pattern: SELECT E.EmpId FROM EMPLOYEE E WHERE NOT EXISTS (SELECT 1 FROM PROJECT P WHERE P.DeptId = 10 AND NOT EXISTS (SELECT 1 FROM WORKS_ON W WHERE W.EmpId = E.EmpId AND W.ProjectId = P.ProjectId));",
          "Read it as: there must not exist a required project for which the employee has no WORKS_ON row. This double NOT EXISTS expresses 'for every'.",
          "If department 10 has no projects, this condition is true for every employee. This is called vacuous truth, so confirm whether the question wants that behavior.",
        ],
      },
      {
        title: "Essential Window Functions",
        paragraphs: [
          "A window function calculates across related rows without combining them into one row per group. Its OVER clause defines the window.",
          "PARTITION BY creates independent groups inside the result, while ORDER BY defines the order used by the window calculation.",
        ],
        dataTable: {
          headers: ["Function", "Tie handling for values 90, 80, 80, 70"],
          rows: [
            ["ROW_NUMBER", "1, 2, 3, 4; every row gets a different number"],
            ["RANK", "1, 2, 2, 4; leaves a gap after a tie"],
            ["DENSE_RANK", "1, 2, 2, 3; no gap after a tie"],
          ],
        },
      },
      {
        title: "Top N per Group with a CTE",
        paragraphs: [
          "A common table expression, or CTE, gives a temporary name to one query so that the next query is easier to read. It starts with WITH and exists only for that statement.",
          "Top two salaries per department: WITH Ranked AS (SELECT EmpId, Name, DeptId, Salary, DENSE_RANK() OVER (PARTITION BY DeptId ORDER BY Salary DESC) AS SalaryRank FROM EMPLOYEE WHERE Salary IS NOT NULL) SELECT EmpId, Name, DeptId, Salary FROM Ranked WHERE SalaryRank <= 2;",
          "Use ROW_NUMBER when exactly N rows are required. Use RANK or DENSE_RANK when tied values should share a position; the required tie rule decides which one is correct.",
        ],
      },
      {
        title: "Independent Practice: Answer Check",
        paragraphs: [
          "Compare these results only after attempting the questions. Equivalent correct SQL is acceptable.",
        ],
        dataTable: {
          headers: ["Question", "Answer pattern", "Expected result"],
          rows: [
            ["Department 10 salaries", "SELECT Name, Salary FROM EMPLOYEE WHERE DeptId = 10 ORDER BY Salary DESC;", "Asha 70000, Ravi 50000"],
            ["Departments with no employees", "SELECT D.DeptName FROM DEPARTMENT D WHERE NOT EXISTS (SELECT 1 FROM EMPLOYEE E WHERE E.DeptId = D.DeptId);", "ME"],
            ["Employees on no project", "SELECT E.Name FROM EMPLOYEE E WHERE NOT EXISTS (SELECT 1 FROM WORKS_ON W WHERE W.EmpId = E.EmpId);", "Kiran, Noor"],
            ["Project count including zero", "SELECT D.DeptName, COUNT(P.ProjectId) FROM DEPARTMENT D LEFT JOIN PROJECT P ON P.DeptId = D.DeptId GROUP BY D.DeptId, D.DeptName;", "CSE 2, ECE 1, ME 0"],
            ["Above own department average", "SELECT E.Name FROM EMPLOYEE E WHERE E.Salary > (SELECT AVG(E2.Salary) FROM EMPLOYEE E2 WHERE E2.DeptId = E.DeptId);", "Asha"],
            ["Second-highest distinct salary", "SELECT MAX(Salary) FROM EMPLOYEE WHERE Salary < (SELECT MAX(Salary) FROM EMPLOYEE);", "60000"],
            ["Works on every department 10 project", "Use the double NOT EXISTS pattern explained above.", "Asha"],
          ],
        },
      },
      {
        title: "Practice: Predict the Output",
        paragraphs: [
          "EMPLOYEE contains salaries 50000, 70000, 70000, and NULL. Predict each result before reading the answers.",
        ],
        dataTable: {
          headers: ["Expression", "Result", "Reason"],
          rows: [
            ["COUNT(*)", "4", "Counts every row"],
            ["COUNT(Salary)", "3", "Ignores the NULL salary"],
            ["COUNT(DISTINCT Salary)", "2", "Distinct non-NULL values are 50000 and 70000"],
            ["AVG(Salary)", "63333.33...", "190000 divided by 3 non-NULL values"],
            ["MAX(Salary)", "70000", "Largest non-NULL value"],
          ],
        },
      },
      {
        title: "Common Query Mistakes",
        paragraphs: [],
        points: [
          "Using = NULL instead of IS NULL.",
          "Forgetting a join condition and creating a Cartesian product.",
          "Using WHERE for an aggregate condition.",
          "Selecting a non-aggregate column that is not grouped.",
          "Using UNION when duplicates must remain.",
          "Using NOT IN without checking whether the subquery can return NULL.",
          "Using a row limit without ORDER BY for a top-N requirement.",
          "Forgetting that duplicate highest salaries affect the meaning of second highest.",
        ],
      },
    ],
    mechanism: {
      title: "How to solve an SQL question",
      steps: [
        "Write the required output columns.",
        "Identify the tables and join conditions.",
        "Separate row conditions from aggregate conditions.",
        "Add grouping, subqueries, or existence checks only when the requirement needs them.",
        "Check NULL, duplicates, ties, and unmatched rows.",
        "Test the query mentally with a small example before finalizing it.",
      ],
    },
    example: {
      title: "Translate one requirement",
      body: "For 'departments whose average salary exceeds 60000', the output is DeptId, rows are grouped by DeptId, AVG calculates each group, and HAVING AVG(Salary) > 60000 keeps the qualifying groups.",
    },
    misconception:
      "A query that works for one sample dataset is not necessarily correct. Test empty groups, NULL values, duplicate values, ties, and missing relationships.",
  },
  revise: {
    definition:
      "Translate the required output, relationships, filters, groups, and edge cases into SQL in that order.",
    sections: [
      {
        title: "Pattern Recall",
        dataTable: {
          headers: ["Question phrase", "Common pattern"],
          rows: [
            ["Per department", "GROUP BY DeptId"],
            ["At least five", "HAVING COUNT(*) >= 5"],
            ["Above average", "Scalar aggregate subquery"],
            ["Has at least one", "EXISTS"],
            ["Has none", "NOT EXISTS"],
            ["Every required item", "Double NOT EXISTS or division"],
          ],
        },
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "State whether duplicates should remain.",
      "State how ties should be handled in ranking questions.",
      "Use LEFT JOIN when unmatched left rows must remain.",
      "Test aggregate behavior with NULL values.",
      "Qualify columns in multi-table queries.",
      "Use window functions when rows need ranks without being grouped away.",
    ],
    followUp: "How would you test whether a second-highest-salary query handles duplicate highest salaries correctly?",
  },
  lastMinute: {
    definition:
      "Output → tables → joins → row filters → groups → group filters → sorting.",
    sections: [
      {
        title: "Final Query Checklist",
        points: [
          "Correct join keys?",
          "WHERE or HAVING?",
          "NULL handled?",
          "Duplicates and ties handled?",
          "ORDER BY present when order matters?",
          "Ranking tie rule stated?",
        ],
      },
    ],
    memoryLine: "Build the query, then attack it with edge cases",
    cues: ["Output", "Relationship", "Edge cases"],
    trap: "Never assume natural row order or ignore duplicate values in ranking questions.",
  },
};
