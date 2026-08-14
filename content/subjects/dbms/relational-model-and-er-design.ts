import type { SubjectTopic } from "@/lib/subject-content";

export const relationalModelFundamentals: SubjectTopic = {
  slug: "relational-model-fundamentals",
  title: "Relational Model Fundamentals",
  description:
    "Learn how the relational model organizes data into relations, attributes, tuples, and domains.",
  readTime: "14 min",
  difficulty: "Foundation",
  tags: ["Relation", "Tuple", "Attribute"],
  learn: {
    opening:
      "The relational model organizes data as relations. A relation is commonly shown as a table, where each row describes one record and each column describes one property.",
    sections: [
      {
        title: "The Relational Model",
        paragraphs: [
          "The relational model was created to represent data using simple structures called relations. Relations can be connected through common values and keys.",
          "In everyday DBMS work, a relation is shown as a table. The formal words are still important because they appear in exams and interviews.",
        ],
      },
      {
        title: "The Main Terms",
        paragraphs: [
          "Consider a relation named STUDENT with the attributes RollNo, Name, and Course.",
        ],
        points: [
          "Relation: the complete table-like structure.",
          "Attribute: a named column, such as Name.",
          "Tuple: one complete row, such as (101, Asha, CSE).",
          "Domain: the allowed set of values for an attribute.",
        ],
        visual: {
          src: "/notes/dbms/relational-table-anatomy.png",
          alt: "A Student relation showing attributes, one highlighted tuple, the separate allowed Course domain, degree three, and cardinality three.",
          width: 1536,
          height: 1024,
          caption:
            "A relation contains attributes and tuples; each attribute takes values from a domain.",
        },
      },
      {
        title: "Domain Means More Than a Data Type",
        paragraphs: [
          "A domain describes the valid values an attribute may contain. It can include a data type, size, format, and allowed range.",
          "For example, the domain of Marks may be whole numbers from 0 to 100. The value 85 belongs to this domain, while 120 does not.",
        ],
      },
      {
        title: "Degree and Cardinality",
        paragraphs: [
          "The degree, also called arity, of a relation is its number of attributes. The cardinality of a relation is its number of tuples at a particular time.",
          "A table with three columns and five rows has degree 3 and cardinality 5. The degree usually changes only when the schema changes. Cardinality changes when rows are inserted or deleted.",
        ],
        table: {
          headers: ["Degree", "Cardinality"],
          rows: [
            ["Number of attributes", "Number of tuples"],
            ["Counts columns", "Counts rows"],
            ["Usually changes with schema", "Changes as data changes"],
          ],
        },
      },
      {
        title: "Relation Schema and Relation Instance",
        paragraphs: [
          "A relation schema gives the relation name and attributes. STUDENT(RollNo, Name, Course) is a relation schema.",
          "A relation instance is the set of tuples stored in that relation at one moment. Inserting a student changes the instance but not the schema.",
        ],
      },
      {
        title: "Important Properties of a Relation",
        points: [
          "Every attribute has a distinct name within the relation.",
          "Every cell contains one atomic value from the attribute's domain. Atomic means the value is treated as one indivisible value in that relation.",
          "Duplicate tuples are not allowed in the formal relational model.",
          "The order of tuples has no meaning unless a query explicitly requests an order.",
          "The order of attributes is not part of the mathematical meaning of a relation.",
        ],
        paragraphs: [
          "A real SQL table can behave differently in some details, such as allowing duplicate rows unless a constraint prevents them. Keep the formal relational model and a product's SQL behavior separate.",
        ],
      },
      {
        title: "NULL",
        paragraphs: [
          "NULL represents missing, unknown, or not-applicable information. It is not zero, false, or an empty string.",
          "For example, MiddleName may be NULL when a student has no middle name or when it has not been recorded. NULL needs special handling in queries, which is explained with SQL later.",
          "NULL is used in practical database systems such as SQL. It was not part of the original pure relational model, so formal relational theory and SQL may describe it differently.",
        ],
      },
      {
        title: "Quick Practice",
        paragraphs: [
          "EMPLOYEE(EmpId, Name, Department, Salary) currently contains 12 rows.",
        ],
        points: [
          "Relation name: EMPLOYEE.",
          "Attributes: EmpId, Name, Department, Salary.",
          "Degree: 4.",
          "Cardinality: 12.",
          "One complete employee row is a tuple.",
          "A row with Salary = 'high' is invalid if Salary's domain allows only numbers.",
        ],
      },
    ],
    mechanism: {
      title: "How to read a relation question",
      steps: [
        "Find the relation name.",
        "Count attributes to get the degree.",
        "Count current tuples to get the cardinality.",
        "Use the schema for structure and the instance for current values.",
        "Check that every value belongs to its attribute's domain.",
      ],
    },
    example: {
      title: "Checking a domain",
      body: "Suppose COURSE(CourseId, Title, Credits) allows Credits from 1 to 6. The tuple (CS101, Databases, 4) is valid, but (CS102, Networks, 9) violates the Credits domain.",
    },
    misconception:
      "Cardinality does not mean the number of columns in the relational model. Degree counts columns; cardinality counts rows.",
  },
  revise: {
    definition:
      "A relation contains tuples and attributes. Each attribute draws values from a domain.",
    sections: [
      {
        title: "Formal and Common Words",
        table: {
          headers: ["Relational term", "Common representation"],
          rows: [
            ["Relation", "Table"],
            ["Tuple", "Row"],
            ["Attribute", "Column"],
            ["Domain", "Allowed values"],
          ],
        },
      },
      {
        title: "Degree and Cardinality",
        points: [
          "Degree = number of attributes.",
          "Cardinality = number of current tuples.",
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "A relation schema describes structure; a relation instance contains current tuples.",
      "Values in one attribute come from the same domain.",
      "NULL is not zero or an empty string.",
      "Tuple order has no meaning unless a query requests an order.",
    ],
    followUp:
      "A relation has six attributes and 40 tuples. What are its degree and cardinality?",
  },
  lastMinute: {
    definition:
      "Relation = table-like structure, tuple = row, attribute = column, domain = allowed values.",
    sections: [
      {
        title: "Fast Recall",
        points: [
          "Degree counts attributes.",
          "Cardinality counts tuples.",
          "Schema is structure; instance is current data.",
          "NULL means missing, unknown, or not applicable.",
        ],
      },
    ],
    memoryLine: "Columns → Degree | Rows → Cardinality",
    cues: ["Relation", "Tuple", "Attribute", "Domain"],
    trap: "Do not swap degree and cardinality.",
  },
};

export const databaseKeys: SubjectTopic = {
  slug: "database-keys",
  title: "Database Keys",
  description:
    "Understand how super, candidate, primary, alternate, composite, and foreign keys identify and connect records.",
  readTime: "17 min",
  difficulty: "Foundation",
  tags: ["Keys", "Primary Key", "Foreign Key"],
  learn: {
    opening:
      "A key is one attribute or a group of attributes used to identify tuples or connect related relations. The two main ideas are uniqueness and minimality.",
    sections: [
      {
        title: "Super Key",
        paragraphs: [
          "A super key is any set of one or more attributes that uniquely identifies every tuple in a relation.",
          "If StudentId is unique, then {StudentId}, {StudentId, Name}, and {StudentId, Name, CourseId} are all super keys. Extra attributes do not remove uniqueness, but they may be unnecessary.",
        ],
      },
      {
        title: "Candidate Key",
        paragraphs: [
          "A candidate key is a minimal super key. It is unique, and no attribute can be removed from it without losing uniqueness.",
          "Minimal does not mean the smallest value or shortest text. It means that the key contains no unnecessary attribute.",
        ],
      },
      {
        title: "Primary and Alternate Keys",
        paragraphs: [
          "A relation may have several candidate keys. The designer selects one candidate key as the primary key. Every remaining candidate key is an alternate key.",
          "A primary key must be unique and cannot be NULL. A table has only one primary key, although that key may contain several attributes.",
        ],
        visual: {
          src: "/notes/dbms/database-key-types.png",
          alt: "Super keys contain candidate keys, from which a primary key is selected and remaining keys become alternate keys. A foreign key connects Student and Course tables.",
          width: 1536,
          height: 1024,
          caption:
            "Candidate keys are minimal super keys; one becomes primary and the rest become alternate keys.",
        },
      },
      {
        title: "Composite Key",
        paragraphs: [
          "A composite key contains two or more attributes. The attributes work together to provide uniqueness.",
          "In ENROLMENT(StudentId, CourseId, Semester), one student can take several courses and one course can contain several students. A suitable key may be {StudentId, CourseId, Semester} when the same course can be taken in different semesters.",
        ],
      },
      {
        title: "Foreign Key",
        paragraphs: [
          "A foreign key is an attribute or group of attributes in one relation that refers to a candidate key in another relation, or sometimes the same relation.",
          "STUDENT.CourseId may refer to COURSE.CourseId. This connection lets the DBMS check that a student's course exists.",
        ],
      },
      {
        title: "Prime and Non-Prime Attributes",
        paragraphs: [
          "A prime attribute belongs to at least one candidate key. A non-prime attribute belongs to no candidate key.",
          "If {StudentId} and {Email} are candidate keys, both StudentId and Email are prime. Name is non-prime if it belongs to neither candidate key.",
        ],
      },
      {
        title: "Primary Key vs UNIQUE",
        table: {
          headers: ["Primary key", "UNIQUE constraint"],
          rows: [
            ["One per table", "Several may exist in one table"],
            ["Cannot contain NULL", "NULL behavior depends on the DBMS"],
            [
              "Main selected identifier",
              "Also prevents duplicate non-NULL values",
            ],
            ["May be composite", "May also cover several attributes"],
          ],
        },
        paragraphs: [
          "Both enforce uniqueness, but they are not identical. Always follow the named DBMS when a question asks about NULL behavior under UNIQUE.",
        ],
      },
      {
        title: "Practice: Identify the Keys",
        paragraphs: [
          "Consider STUDENT(StudentId, Email, Name, CourseId). StudentId and Email are each guaranteed unique. CourseId refers to COURSE.",
        ],
        points: [
          "Candidate keys: {StudentId} and {Email}.",
          "If StudentId is selected, it is the primary key.",
          "Email then becomes an alternate key.",
          "CourseId is a foreign key.",
          "StudentId and Email are prime attributes; Name and CourseId are non-prime.",
        ],
      },
      {
        title: "Practice: Count Simple Super Keys",
        paragraphs: [
          "R(A, B, C, D) has only one candidate key: {A}. Every super key must contain A, while B, C, and D may be included or excluded.",
          "There are 2³ = 8 super keys: {A}, {A,B}, {A,C}, {A,D}, {A,B,C}, {A,B,D}, {A,C,D}, and {A,B,C,D}.",
          "In general, if a relation has n attributes and exactly one candidate key containing k attributes, the number of super keys is 2^(n-k). Each non-key attribute may be included or excluded.",
          "This shortcut applies directly when the question gives one candidate key. With several candidate keys, overlapping super-key sets must not be counted twice.",
        ],
      },
    ],
    mechanism: {
      title: "How to classify a key",
      steps: [
        "Check whether the attribute set always identifies one tuple.",
        "If it is unique, it is a super key.",
        "Remove attributes one at a time. If no attribute can be removed, it is a candidate key.",
        "The selected candidate key is primary; the remaining candidate keys are alternate.",
        "If the attributes refer to a key in another relation, they form a foreign key.",
      ],
    },
    example: {
      title: "Identifying an enrolment",
      body: "StudentId alone is not unique in ENROLMENT because one student can take several courses. CourseId alone is also not unique. If each student takes a course only once, {StudentId, CourseId} together form a composite candidate key.",
    },
    misconception:
      "Values that happen to be unique in the current rows are not automatically a candidate key. A key is a rule that must remain true for every valid instance.",
  },
  revise: {
    definition:
      "Keys identify tuples and connect relations. Candidate keys are minimal super keys.",
    sections: [
      {
        title: "Key Types",
        dataTable: {
          headers: ["Key", "Meaning"],
          rows: [
            ["Super", "Any attribute set that uniquely identifies tuples"],
            ["Candidate", "Minimal super key"],
            ["Primary", "Selected candidate key"],
            ["Alternate", "Candidate key not selected as primary"],
            ["Composite", "Key containing several attributes"],
            ["Foreign", "Attributes referring to a candidate key"],
          ],
        },
      },
      {
        title: "Two Conditions",
        points: [
          "Uniqueness: no two valid tuples share the key value.",
          "Minimality: no attribute can be removed from a candidate key.",
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Every candidate key is a super key, but not every super key is a candidate key.",
      "A table has one primary key but may have several candidate keys.",
      "Prime attributes belong to candidate keys.",
      "A foreign key may refer to a candidate key, not only the primary key.",
    ],
    followUp:
      "Why is {StudentId, Name} a super key but not a candidate key when StudentId is already unique?",
  },
  lastMinute: {
    definition:
      "Super = unique. Candidate = unique and minimal. Primary = selected candidate. Alternate = remaining candidate.",
    sections: [
      {
        title: "Other Keys",
        points: [
          "Composite: several attributes form one key.",
          "Foreign: refers to a candidate key.",
          "Prime: belongs to at least one candidate key.",
        ],
      },
    ],
    memoryLine: "Super → minimal Candidate → selected Primary",
    cues: ["Uniqueness", "Minimality", "Reference"],
    trap: "Do not find keys only by looking at the current rows.",
  },
};

export const integrityConstraints: SubjectTopic = {
  slug: "integrity-constraints",
  title: "Integrity Constraints",
  description:
    "Learn the rules that keep attribute values, keys, entities, and relationships valid.",
  readTime: "16 min",
  difficulty: "Foundation",
  tags: ["Constraints", "Integrity", "Foreign Key"],
  learn: {
    opening:
      "Integrity constraints are rules that prevent invalid database states. The DBMS validates them before a data-changing statement or transaction is accepted. Some constraints may be deferred until commit when the DBMS supports it.",
    sections: [
      {
        title: "Domain Constraint",
        paragraphs: [
          "A domain constraint requires an attribute value to come from its allowed domain. The domain can control data type, size, format, range, or permitted values.",
          "Marks may allow integers from 0 to 100. Inserting 120 violates the domain constraint.",
        ],
      },
      {
        title: "Key Constraint",
        paragraphs: [
          "A key constraint requires candidate-key values to identify tuples uniquely. Two students cannot have the same StudentId when StudentId is a candidate key.",
        ],
      },
      {
        title: "Entity Integrity",
        paragraphs: [
          "Entity integrity says that no part of a primary key can be NULL. Otherwise, the DBMS could not reliably identify the tuple.",
          "For a composite primary key, every component must be non-NULL.",
        ],
      },
      {
        title: "Referential Integrity",
        paragraphs: [
          "Referential integrity controls foreign keys. A non-NULL foreign-key value must match an existing value of the referenced candidate key.",
          "If STUDENT.CourseId contains CS101, the referenced COURSE relation must contain CS101. A foreign key may be NULL when the schema allows NULL, meaning that no relationship is currently recorded.",
        ],
        visual: {
          src: "/notes/dbms/integrity-constraints.png",
          alt: "Four cards show a valid domain value, unique key values, an invalid NULL primary key, and a valid foreign-key reference to an existing parent.",
          width: 1536,
          height: 1024,
          caption:
            "Constraints reject invalid values, duplicate keys, unidentified entities, and broken references.",
        },
      },
      {
        title: "Common SQL Constraint Names",
        paragraphs: [
          "SQL uses named constraints to enforce these rules. Their syntax is taught in the SQL module.",
        ],
        points: [
          "NOT NULL prevents a missing value in an attribute.",
          "UNIQUE prevents duplicate values in the constrained attributes.",
          "PRIMARY KEY combines uniqueness with non-NULL identification.",
          "FOREIGN KEY creates a checked reference.",
          "CHECK requires a condition such as Marks BETWEEN 0 AND 100.",
        ],
      },
      {
        title: "What Happens When a Parent Row Changes?",
        paragraphs: [
          "Suppose COURSE is the parent relation and STUDENT.CourseId is a foreign key. Deleting or changing a referenced course needs a defined action.",
        ],
        dataTable: {
          headers: ["Action", "Result"],
          rows: [
            [
              "RESTRICT or NO ACTION",
              "Reject the parent change when dependent rows exist",
            ],
            ["CASCADE", "Apply the delete or key update to dependent rows"],
            [
              "SET NULL",
              "Set child foreign-key columns to NULL; those columns must allow NULL",
            ],
          ],
        },
      },
      {
        title: "Practice: Accept or Reject",
        paragraphs: [
          "Assume COURSE contains CS101 and CS102. STUDENT has primary key StudentId, Marks must be 0–100, and CourseId is a nullable foreign key.",
        ],
        dataTable: {
          headers: ["Operation", "Decision", "Reason"],
          rows: [
            ["Insert (1, 85, CS101)", "Accept", "All constraints hold"],
            ["Insert another StudentId 1", "Reject", "Key constraint"],
            ["Insert (2, 120, CS101)", "Reject", "Domain constraint"],
            ["Insert (3, 70, CS999)", "Reject", "Referential integrity"],
            ["Insert (4, 70, NULL)", "Accept", "Foreign key is nullable"],
            ["Insert (NULL, 70, CS101)", "Reject", "Entity integrity"],
          ],
        },
      },
      {
        title: "Practice: Parent Deletion",
        paragraphs: [
          "If students currently refer to CS101, deleting CS101 is rejected under RESTRICT. Under CASCADE, the dependent rows are deleted. Under SET NULL, their CourseId becomes NULL if the column allows it.",
          "RESTRICT and NO ACTION both reject invalid references in this basic explanation. Their exact checking time can differ between DBMS products.",
        ],
      },
    ],
    mechanism: {
      title: "How to solve a constraint question",
      steps: [
        "Write the relevant domain, key, and NULL rules.",
        "For a foreign key, inspect the referenced parent values.",
        "Apply the requested insert, update, or delete mentally.",
        "Check the resulting state before the statement or transaction is accepted.",
        "Accept the change only if every required constraint holds.",
      ],
    },
    example: {
      title: "Updating a parent key",
      body: "Suppose COURSE.CourseId changes from CS101 to CS201. With ON UPDATE CASCADE, matching STUDENT.CourseId values also change to CS201. With RESTRICT or NO ACTION, the update is rejected while dependent rows exist.",
    },
    misconception:
      "A foreign key does not have to be unique. Many child tuples may refer to the same parent tuple.",
  },
  revise: {
    definition:
      "Integrity constraints keep database values, identifiers, and references valid.",
    sections: [
      {
        title: "Four Main Rules",
        dataTable: {
          headers: ["Constraint", "Rule"],
          rows: [
            ["Domain", "Values must belong to the allowed domain"],
            ["Key", "Candidate-key values must be unique"],
            ["Entity integrity", "Primary-key attributes cannot be NULL"],
            [
              "Referential integrity",
              "Non-NULL foreign keys must match a parent key",
            ],
          ],
        },
      },
      {
        title: "Parent Actions",
        points: [
          "RESTRICT or NO ACTION: reject the parent change.",
          "CASCADE: apply the change to child rows.",
          "SET NULL: set child foreign-key columns to NULL only when those columns allow NULL.",
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "The DBMS validates constraints before a statement or transaction is accepted.",
      "A composite primary key cannot contain NULL in any component.",
      "A nullable foreign key may be NULL.",
      "A non-NULL foreign key must match a referenced candidate-key value.",
    ],
    followUp: "Why may a foreign key contain NULL while a primary key cannot?",
  },
  lastMinute: {
    definition:
      "Domain controls values, key controls uniqueness, entity integrity protects primary keys, and referential integrity protects references.",
    sections: [
      {
        title: "Delete Actions",
        points: [
          "RESTRICT: reject.",
          "CASCADE: pass the change to children.",
          "SET NULL: keep children but remove the reference.",
        ],
      },
    ],
    memoryLine: "Valid value → unique key → known entity → existing parent",
    cues: ["Domain", "Key", "Entity", "Reference"],
    trap: "A foreign key is not automatically UNIQUE or NOT NULL.",
  },
};

export const erModelAndRelationalMapping: SubjectTopic = {
  slug: "er-model-and-relational-mapping",
  title: "ER Model and Relational Mapping",
  description:
    "Model entities, attributes, relationships, cardinality, and participation, then convert the design into relations.",
  readTime: "24 min",
  difficulty: "Intermediate",
  tags: ["ER Model", "Cardinality", "Mapping"],
  learn: {
    opening:
      "The Entity-Relationship model describes a database before tables are created. It identifies important things, their properties, and the relationships between them.",
    sections: [
      {
        title: "Entities and Entity Sets",
        paragraphs: [
          "An entity is one distinguishable real-world object, such as one student or one course. An entity set is a collection of similar entities, such as all students.",
          "In an ER diagram, a rectangle represents an entity set. Entity names are normally written as singular nouns such as STUDENT or COURSE.",
        ],
      },
      {
        title: "Attributes",
        paragraphs: [
          "An attribute describes an entity or relationship. In Chen notation, an oval represents an attribute.",
        ],
        dataTable: {
          headers: ["Attribute type", "Meaning", "Example"],
          rows: [
            ["Simple", "Cannot be usefully divided", "Salary"],
            ["Composite", "Contains smaller parts", "Name → First, Last"],
            ["Single-valued", "One value for each entity", "DateOfBirth"],
            ["Multivalued", "Several values may exist", "PhoneNumber"],
            ["Derived", "Calculated from other data", "Age from DateOfBirth"],
            ["Key", "Uniquely identifies an entity", "StudentId"],
          ],
        },
      },
      {
        title: "Relationships and Their Degree",
        paragraphs: [
          "A relationship describes an association between entity sets. A diamond represents a relationship in Chen notation.",
          "A unary relationship involves one entity set, a binary relationship involves two, and a ternary relationship involves three. Most basic designs use binary relationships.",
        ],
      },
      {
        title: "Cardinality",
        paragraphs: [
          "Cardinality tells us the maximum number of entities that may participate across a relationship.",
          "Context matters: relation cardinality means the number of tuples, while relationship cardinality means 1:1, 1:N, or M:N.",
        ],
        points: [
          "1:1: one entity on each side can match at most one on the other side.",
          "1:N: one entity on the first side can match many on the second side.",
          "M:N: many entities on both sides can match each other.",
        ],
      },
      {
        title: "Participation",
        paragraphs: [
          "Participation tells us the minimum requirement. Total participation means every entity in the set must take part in the relationship. Partial participation means participation is optional for some entities.",
          "Chen notation uses a double line for total participation and a single line for partial participation.",
        ],
        visual: {
          src: "/notes/dbms/er-notation-cardinality.png",
          alt: "ER notation for entities, simple, key, multivalued and derived attributes, relationships, cardinality, and participation.",
          width: 1536,
          height: 1024,
          caption:
            "ER notation describes entity properties and the rules of their relationships.",
        },
      },
      {
        title: "Strong and Weak Entities",
        paragraphs: [
          "A strong entity has its own candidate key. A weak entity cannot be uniquely identified by its own attributes alone and depends on an owner entity.",
          "A weak entity has a partial key that distinguishes it only within one owner. Its full key combines the owner's primary key with the weak entity's partial key.",
          "Chen notation uses a double rectangle for a weak entity and a double diamond for its identifying relationship.",
        ],
      },
      {
        title: "Mapping Entities and Attributes",
        points: [
          "Strong entity: create one relation and choose its key as the primary key.",
          "Composite attribute: store its useful simple components.",
          "Multivalued attribute: create a separate relation containing the owner's key and the attribute value.",
          "Derived attribute: normally calculate it instead of storing it.",
          "Weak entity: create a relation containing its attributes and the owner's primary key; combine the owner key with the partial key.",
        ],
        paragraphs: [],
      },
      {
        title: "Mapping Relationships",
        paragraphs: [
          "A foreign key enforces the reference. UNIQUE enforces the maximum of one match in a 1:1 relationship, while NOT NULL enforces total participation on the side that stores the foreign key.",
        ],
        dataTable: {
          headers: ["Relationship", "Relational mapping"],
          rows: [
            [
              "1:1",
              "Place a UNIQUE foreign key on a suitable side, usually the total-participation side",
            ],
            [
              "1:N",
              "Place the 1-side primary key as a foreign key on the N side; use NOT NULL when N-side participation is total",
            ],
            ["M:N", "Create a new relation containing keys from both sides"],
          ],
        },
      },
      {
        title: "Where Relationship Attributes Go",
        paragraphs: [
          "An attribute that describes a relationship must be stored with the mapped relationship.",
          "For a 1:1 relationship, it normally goes on the relation that stores the foreign key. For a 1:N relationship, it normally goes on the N-side relation with the foreign key. For an M:N relationship, it goes in the new bridge relation.",
        ],
      },
      {
        title: "Mapping a Ternary Relationship",
        paragraphs: [
          "A ternary relationship connects three entity sets. Create a separate relation containing the participating entity keys and any relationship attributes.",
          "Choose its primary key from the relationship's cardinality and business rule. Do not automatically assume that all three foreign keys are always required in the primary key.",
        ],
      },
      {
        title: "M:N Mapping Example",
        paragraphs: [
          "STUDENT and COURSE have an M:N ENROLLED_IN relationship with attribute Semester. Create STUDENT and COURSE relations, then create ENROLMENT containing StudentId, CourseId, and Semester.",
          "The diagram assumes that a student takes each course only once, so {StudentId, CourseId} is the primary key. The referenced keys also become foreign keys in ENROLMENT. If a student can take the same course again in another semester, Semester must also be part of the primary key.",
        ],
        visual: {
          src: "/notes/dbms/er-to-relational-mapping.png",
          alt: "A many-to-many Enrolled In relationship between Student and Course is converted into Student, Course, and Enrolment relations.",
          width: 1536,
          height: 1024,
          caption:
            "An M:N relationship becomes a bridge relation containing keys from both entities and its own attributes.",
        },
      },
      {
        title: "Practice: Read the Requirement",
        paragraphs: [
          "A department has many employees. Every employee belongs to exactly one department, while a new department may temporarily have no employees.",
        ],
        points: [
          "Entities: DEPARTMENT and EMPLOYEE.",
          "Relationship: DEPARTMENT 1:N EMPLOYEE.",
          "EMPLOYEE has total participation because every employee must belong to a department.",
          "DEPARTMENT has partial participation because a department may have no employees.",
          "Mapping: place DepartmentId as a non-NULL foreign key in EMPLOYEE.",
        ],
      },
      {
        title: "Practice: Map a Multivalued Attribute",
        paragraphs: [
          "A STUDENT may have several PhoneNumber values. Keep STUDENT(StudentId, Name) and create STUDENT_PHONE(StudentId, PhoneNumber). StudentId is a foreign key, and {StudentId, PhoneNumber} can form the primary key.",
        ],
      },
    ],
    mechanism: {
      title: "How to convert an ER design into relations",
      steps: [
        "Create relations for strong entities and choose their primary keys.",
        "Split composite attributes and move multivalued attributes to separate relations.",
        "Map weak entities with their owner keys.",
        "Place foreign keys or create a relationship relation according to the cardinality.",
        "Store relationship attributes with the mapped relationship.",
        "Check primary keys, foreign keys, NULL rules, and participation requirements.",
      ],
    },
    example: {
      title: "Customer and passport",
      body: "If each CUSTOMER may have at most one PASSPORT and every PASSPORT belongs to exactly one CUSTOMER, the relationship is 1:1. A CustomerId foreign key can be placed in PASSPORT and marked UNIQUE. If every passport must have an owner, CustomerId is also NOT NULL.",
    },
    misconception:
      "Cardinality and participation answer different questions. Cardinality gives the maximum number of matches; participation gives the minimum requirement.",
  },
  revise: {
    definition:
      "An ER model describes entities, attributes, relationships, cardinality, and participation before they are mapped to relations.",
    sections: [
      {
        title: "Core Notation",
        dataTable: {
          headers: ["Concept", "Chen notation"],
          rows: [
            ["Entity", "Rectangle"],
            ["Weak entity", "Double rectangle"],
            ["Relationship", "Diamond"],
            ["Attribute", "Oval"],
            ["Multivalued attribute", "Double oval"],
            ["Derived attribute", "Dashed oval"],
            ["Key attribute", "Underlined"],
          ],
        },
      },
      {
        title: "Mapping Rules",
        points: [
          "1:1 → UNIQUE foreign key on a suitable side.",
          "1:N → foreign key on the N side; use NOT NULL for total N-side participation.",
          "M:N → new bridge relation.",
          "Ternary → new relation with the three entity keys and relationship attributes.",
          "Multivalued attribute → separate relation.",
          "Weak entity → owner key + partial key.",
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Entity is one object; entity set is a collection of similar entities.",
      "Cardinality gives a maximum; participation gives a minimum.",
      "Total participation is mandatory; partial participation is optional.",
      "Relationship attributes follow the mapped relationship.",
    ],
    followUp: "Why does an M:N relationship need a separate relation?",
  },
  lastMinute: {
    definition:
      "ER design finds things, their properties, and their relationships before tables are created.",
    sections: [
      {
        title: "Fast Mapping",
        points: [
          "Strong entity → relation.",
          "1:1 → UNIQUE foreign key on a suitable side.",
          "1:N → key moves to N side; NOT NULL can enforce total participation.",
          "M:N → bridge relation.",
          "Ternary → separate relationship relation.",
          "Multivalued attribute → separate relation.",
          "Weak entity → owner key + partial key.",
        ],
      },
    ],
    memoryLine: "Entity → table | Relationship → foreign key or bridge",
    cues: ["Entity", "Attribute", "Cardinality", "Participation", "Mapping"],
    trap: "Do not confuse total participation with the many side of a relationship.",
  },
};
