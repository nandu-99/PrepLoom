import type { SubjectTopic } from "@/lib/subject-content";

export const introductionToDatabasesAndDbms: SubjectTopic = {
  slug: "introduction-to-databases-and-dbms",
  title: "Introduction to Databases and DBMS",
  description:
    "Understand databases, DBMS software, metadata, and the main work a DBMS performs.",
  readTime: "10 min",
  difficulty: "Foundation",
  tags: ["Database", "DBMS", "Metadata"],
  learn: {
    opening:
      "A database stores related data in an organized form. A Database Management System, or DBMS, is the software that lets applications store, find, change, protect, and recover that data.",
    sections: [
      {
        title: "Data and a Database",
        paragraphs: [
          "Data means recorded facts. A student's name, roll number, course, and marks are data.",
          "A database is an organized collection of related data. It is normally persistent, which means the data remains stored after an application closes. A college database may keep students, teachers, courses, and marks together because these facts belong to the same system.",
        ],
      },
      {
        title: "What Is a DBMS?",
        paragraphs: [
          "A DBMS is software placed between applications or users and the stored database. Applications send requests to the DBMS instead of changing stored files directly.",
          "MySQL, PostgreSQL, Oracle Database, and Microsoft SQL Server are examples of DBMS products. The product is the DBMS; the organized data managed by it is the database.",
          "Applications, administration tools, and database users can send requests to a DBMS. SQL is the common language used to send many requests to a relational DBMS.",
        ],
        visual: {
          src: "/notes/dbms/dbms-middle-layer.png",
          alt: "Banking, store, and college applications send requests through a DBMS to one database. The DBMS stores, finds, protects, and recovers data.",
          width: 1536,
          height: 1024,
          caption:
            "Applications ask the DBMS to work with the stored database.",
        },
      },
      {
        title: "The Main Work of a DBMS",
        paragraphs: [
          "A DBMS does more than save rows. It controls how data is described, used, and protected.",
        ],
        points: [
          "Define structure: create tables, fields, relationships, and rules.",
          "Store and retrieve data: add records and answer queries.",
          "Update data: change or remove records while following rules.",
          "Control access: allow only approved users and actions.",
          "Handle concurrent work: coordinate users who access the same data together.",
          "Support backup and recovery: restore correct data after a failure.",
        ],
      },
      {
        title: "What Is Metadata?",
        paragraphs: [
          "Metadata is data that describes other data. It tells the DBMS what the database looks like.",
          "For a Student table, metadata can say that RollNumber is an integer, Name is text, RollNumber must be unique, and CourseId refers to another table. The student rows are data; these descriptions and rules are metadata.",
          "The DBMS keeps metadata in a system catalog, also called a data dictionary.",
        ],
      },
      {
        title: "DBMS and RDBMS",
        paragraphs: [
          "DBMS is the broad name for software that manages databases. An RDBMS is a DBMS based on the relational model, where data is organized as related tables.",
          "MySQL, PostgreSQL, Oracle Database, and Microsoft SQL Server are relational DBMS products. The relational model is explained properly in the next module.",
        ],
      },
    ],
    mechanism: {
      title: "How a simple database request works",
      steps: [
        "A user performs an action in an application.",
        "The application sends a request to the DBMS.",
        "The DBMS checks the request, permissions, and database rules.",
        "The DBMS reads or changes the stored data.",
        "The DBMS returns a result or reports an error.",
      ],
    },
    example: {
      title: "Checking a bank balance",
      body: "A banking app asks the DBMS for the balance of one approved account. The DBMS checks access, finds the account record, and returns the balance. The app displays it; the app does not search the storage files itself.",
    },
    misconception:
      "A database and a DBMS are not the same. The database is the organized data; the DBMS is the software that manages it.",
  },
  revise: {
    definitionLabel: "Core idea",
    compactDefinition: true,
    definition:
      "A database is an organized collection of related data. A DBMS is software that defines, stores, retrieves, updates, protects, and recovers that data.",
    sections: [
      {
        title: "Important Terms",
        table: {
          headers: ["Term", "Meaning"],
          rows: [
            ["Data", "Recorded facts"],
            ["Database", "Organized collection of related data"],
            ["DBMS", "Software that manages a database"],
            ["Metadata", "Description and rules of stored data"],
          ],
        },
      },
      {
        title: "Request Flow",
        flow: ["User", "Application", "DBMS", "Database", "Result"],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Applications normally access stored data through the DBMS.",
      "A DBMS controls structure, queries, updates, access, concurrent work, and recovery.",
      "Metadata is stored in the system catalog or data dictionary.",
      "An RDBMS is a DBMS that organizes data using the relational model.",
      "DBMS means the managing software, not the stored data itself.",
    ],
    followUp:
      "Why should an application use a DBMS instead of editing database files directly?",
  },
  lastMinute: {
    definition:
      "Database = organized related data. DBMS = software that manages it. Metadata = description of the data.",
    sections: [
      {
        title: "DBMS Jobs",
        points: [
          "Define the structure.",
          "Store, find, change, and remove data.",
          "Protect concurrent access.",
          "Support backup and recovery.",
        ],
      },
    ],
    memoryLine: "Application → DBMS → Database",
    cues: [
      "Database stores",
      "DBMS manages",
      "RDBMS uses tables",
      "Metadata describes",
    ],
    trap: "Do not use database and DBMS as if they mean the same thing.",
  },
};

export const fileSystemVsDbms: SubjectTopic = {
  slug: "file-system-vs-dbms",
  title: "File System vs DBMS",
  description:
    "See why shared, growing data is difficult to manage with separate application files.",
  readTime: "11 min",
  difficulty: "Foundation",
  tags: ["File System", "Redundancy", "Consistency"],
  learn: {
    opening:
      "A file system stores files and folders. It is useful for documents and simple data. A DBMS adds structure and controls for shared data that many users or applications must use safely.",
    sections: [
      {
        title: "The Basic Difference",
        paragraphs: [
          "With file-based storage, each application decides its own file format and code for reading or changing data. The file system stores the bytes but does not understand rules such as every student ID must be unique.",
          "With a DBMS, applications use data managed through a common system. The DBMS understands the structure, checks rules, coordinates users, and recovers from failures. The data may still be stored across several files or machines.",
        ],
        visual: {
          src: "/notes/dbms/file-system-vs-dbms.png",
          alt: "A file system keeps scattered copies in separate files, while a DBMS connects applications to one shared database.",
          width: 1536,
          height: 1024,
          caption:
            "A DBMS gives applications controlled access to shared data.",
        },
      },
      {
        title: "Problems With Separate Files",
        paragraphs: [],
        points: [
          "Redundancy: the same fact is stored in several files.",
          "Inconsistency: copies of the same fact contain different values.",
          "Data isolation: related data is split across files and formats.",
          "Program-data dependence: changing a file format may require changes in every program that reads it.",
          "Integrity problems: important rules are repeated in application code and may be missed.",
          "Concurrent-access problems: two updates can overwrite each other.",
          "Security and recovery problems: permissions and failure handling must be built separately.",
        ],
      },
      {
        title: "Redundancy Can Cause Inconsistency",
        paragraphs: [
          "Suppose a college stores a student's phone number in admission.txt, fees.txt, and library.txt. This is redundancy.",
          "If the student changes the number and only two files are updated, the three copies disagree. This is inconsistency. Redundancy increases storage and creates more places that must be kept correct.",
        ],
      },
      {
        title: "What the DBMS Adds",
        paragraphs: [],
        table: {
          headers: ["File-based approach", "DBMS approach"],
          rows: [
            [
              "Applications manage their own formats",
              "A defined schema describes shared data",
            ],
            [
              "File changes can require program changes",
              "The DBMS separates programs from many storage details",
            ],
            [
              "Duplicate copies are common",
              "Central structure can reduce unnecessary copies",
            ],
            [
              "Rules stay in separate programs",
              "Constraints are checked by the DBMS",
            ],
            [
              "Programs coordinate updates",
              "Transactions control concurrent updates",
            ],
            [
              "Recovery is application work",
              "Logging and recovery are built-in services",
            ],
          ],
        },
      },
      {
        title: "A DBMS Also Has a Cost",
        paragraphs: [
          "A DBMS needs setup, memory, storage, administration, and learning. It is not automatically the best choice for every task.",
          "A plain file can be enough for a personal note, an exported image, or a small configuration that one program reads. A DBMS becomes valuable when data is structured, shared, frequently queried, or must stay correct during updates and failures.",
        ],
      },
    ],
    mechanism: {
      title: "How inconsistency appears in separate files",
      steps: [
        "Several applications store their own copy of the same fact.",
        "The real-world fact changes.",
        "One application updates only its own file.",
        "Other files keep the old value.",
        "The system now gives different answers for the same fact.",
      ],
    },
    example: {
      title: "One seat, two bookings",
      body: "Two users read a file and both see that seat A1 is free. Each writes a booking using the old file state. Without controlled concurrent access, one write may replace the other or both users may receive confirmation. A DBMS transaction can make the check and booking act as one controlled operation.",
    },
    misconception:
      "A file system is not useless or always slower. It solves a different problem. A DBMS is chosen when structured data needs shared rules, queries, safe updates, and recovery.",
  },
  revise: {
    definition:
      "A file system stores files; a DBMS manages structured, shared data with rules, transactions, security, and recovery.",
    sections: [
      {
        title: "Why File-Based Data Becomes Difficult",
        points: [
          "Redundancy can create inconsistency.",
          "Separate formats cause data isolation.",
          "Programs depend directly on file formats.",
          "Rules, security, concurrency, and recovery must be handled by applications.",
        ],
      },
      {
        title: "File System vs DBMS",
        table: {
          headers: ["File System", "DBMS"],
          rows: [
            ["Stores general files", "Manages structured database data"],
            [
              "Understands bytes and file permissions",
              "Understands schemas, constraints, and queries",
            ],
            [
              "Limited coordination between applications",
              "Transactions coordinate concurrent work",
            ],
            [
              "Suitable for simple independent files",
              "Suitable for shared data that must stay correct",
            ],
          ],
        },
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Redundancy means unnecessary repeated data.",
      "Inconsistency means copies of the same fact disagree.",
      "A DBMS centralizes structure and data-management rules.",
      "A DBMS reduces program-data dependence by hiding many storage details.",
      "Use a DBMS when data is shared, queried, updated, and must survive failures.",
    ],
    followUp: "How can data redundancy lead to data inconsistency?",
  },
  lastMinute: {
    definition:
      "DBMS adds schema, constraints, queries, transactions, access control, and recovery to structured data management.",
    sections: [
      {
        title: "Main File-System Problems",
        points: [
          "Redundancy and inconsistency",
          "Data isolation",
          "Program-data dependence and limited sharing",
          "Weak rule enforcement",
          "Concurrent-update and recovery problems",
        ],
      },
    ],
    memoryLine: "Repeated copy → missed update → inconsistent data",
    cues: ["Shared data", "Central rules", "Safe updates", "Recovery"],
    trap: "Do not claim that every file should be replaced by a database.",
  },
};

export const dataModelsSchemasAndInstances: SubjectTopic = {
  slug: "data-models-schemas-and-instances",
  title: "Data Models, Schemas, and Instances",
  description:
    "Separate the rules for organizing data, the database design, and the current stored values.",
  readTime: "10 min",
  difficulty: "Foundation",
  tags: ["Data Model", "Schema", "Instance"],
  learn: {
    opening:
      "A data model gives the ideas and rules used to organize data. A schema is the design created with those rules. An instance is the actual data stored at one moment.",
    sections: [
      {
        title: "Data Model: Rules for Structure",
        paragraphs: [
          "A data model describes how data can be structured, connected, and operated on.",
          "The relational model represents data as relations, commonly shown as tables. Rows represent records, columns represent attributes, and foreign keys commonly connect related tables. PrepLoom's later DBMS modules mainly use this model because it is the standard base for SQL databases.",
        ],
      },
      {
        title: "Main Categories of Data Models",
        paragraphs: [
          "Data models can describe a database at different levels. Only the basic classification is needed here.",
        ],
        dataTable: {
          headers: ["Category", "What it describes", "Example"],
          rows: [
            ["Conceptual", "Real-world entities and relationships", "ER model"],
            [
              "Logical",
              "Database structure without storage details",
              "Relational model",
            ],
            [
              "Physical",
              "How records are stored and accessed",
              "Files, pages, and indexes",
            ],
          ],
        },
      },
      {
        title: "Common Logical Models",
        paragraphs: [
          "The relational model stores data in tables. Older hierarchical models arrange records like a tree, while network models allow records to have several connections.",
          "These models only need recognition at this stage. The rest of the notes focus on the relational model because it is the foundation of SQL databases.",
        ],
      },
      {
        title: "Schema: The Database Design",
        paragraphs: [
          "A schema describes the planned structure of a database. It includes items such as table names, column names, data types, keys, relationships, and constraints.",
          "For example, Student(RollNumber, Name, CourseId) is part of a schema. It says what a Student record contains, not which students currently exist.",
        ],
      },
      {
        title: "Instance: The Data Right Now",
        paragraphs: [
          "A database instance, also called a database state, is the actual data stored at a particular time.",
          "When a student is added or a mark changes, the instance changes. The schema normally stays the same because the structure has not changed.",
        ],
        visual: {
          src: "/notes/dbms/data-model-schema-instance.png",
          alt: "A data model provides rules for structure, a schema defines the database design, and an instance contains the data at the current time.",
          width: 1536,
          height: 1024,
          caption:
            "Model gives the rules, schema gives the design, and instance gives the current values.",
        },
      },
      {
        title: "Schema and Instance Side by Side",
        paragraphs: [],
        table: {
          headers: ["Schema", "Instance"],
          rows: [
            ["Database design", "Current database data"],
            [
              "Changes less often",
              "Changes whenever data is inserted, updated, or deleted",
            ],
            [
              "Defines allowed structure and rules",
              "Must follow that structure and those rules",
            ],
            [
              "Also called intension",
              "Also called extension or database state",
            ],
          ],
        },
      },
    ],
    mechanism: {
      title: "From model to stored data",
      steps: [
        "Choose a data model, such as the relational model.",
        "Create a schema using the model's structures and rules.",
        "Create the database and insert data that follows the schema.",
        "Data updates change the instance; design changes alter the schema.",
      ],
    },
    example: {
      title: "A Student table",
      body: "The relational model allows a table. Student(RollNumber integer, Name text) is the schema. Rows such as (101, 'Asha') and (102, 'Ravi') form one instance. Adding (103, 'Meera') changes the instance, not the schema.",
    },
    misconception:
      "A schema is not a screenshot of the current rows. It describes the structure that valid rows must follow.",
  },
  revise: {
    definition:
      "Data model = organizing rules. Schema = database design. Instance = current stored data.",
    sections: [
      {
        title: "One Example",
        dataTable: {
          headers: ["Level", "Example"],
          rows: [
            ["Data model", "Relational model"],
            ["Schema", "Student(RollNumber, Name)"],
            ["Instance", "(101, Asha), (102, Ravi)"],
          ],
        },
      },
      {
        title: "Schema vs Instance",
        table: {
          headers: ["Schema", "Instance"],
          rows: [
            ["Structure and rules", "Actual values"],
            ["Relatively stable", "Changes often"],
            ["Intension", "Extension or state"],
          ],
        },
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "The relational model organizes data as relations or tables.",
      "Conceptual models describe the real world, logical models describe database structure, and physical models describe storage.",
      "A schema contains tables, columns, types, keys, relationships, and constraints.",
      "An instance is a valid snapshot of the data at one time.",
      "Changing rows changes the instance; changing structure changes the schema.",
    ],
    followUp:
      "Does inserting a new row change the schema or the instance, and why?",
  },
  lastMinute: {
    definition: "Model = rules. Schema = design. Instance = data now.",
    sections: [
      {
        title: "Fast Comparison",
        points: [
          "Relational model: data as tables.",
          "Schema: Student(RollNumber, Name).",
          "Instance: the Student rows stored now.",
        ],
      },
    ],
    memoryLine: "Rules → Design → Current values",
    cues: ["Model", "Schema or intension", "Instance or extension"],
    trap: "An INSERT changes the instance, not the schema.",
  },
};

export const threeSchemaArchitectureAndDataIndependence: SubjectTopic = {
  slug: "three-schema-architecture-and-data-independence",
  title: "Three-Schema Architecture and Data Independence",
  description:
    "Understand user views, the complete logical design, physical storage, and why these levels are separated.",
  readTime: "13 min",
  difficulty: "Foundation",
  tags: ["Three-Schema", "Data Independence", "Architecture"],
  learn: {
    opening:
      "The three-schema architecture separates what users see, what the whole database means, and how the data is physically stored. This separation lets one level change with less effect on the levels above it.",
    sections: [
      {
        title: "Why Use Levels?",
        paragraphs: [
          "Different users do not need the same data. A teacher may need names and marks, while an accounts employee needs names and fee status. Neither user needs to know which disk page stores a record.",
          "Separating views, logical design, and physical storage hides unnecessary detail and reduces the effect of change. These are also called the view, logical, and physical levels of data abstraction.",
        ],
      },
      {
        title: "External Level: View Level",
        paragraphs: [
          "The external level contains the views seen by users or applications. Each external schema shows only the required part of the database and may use names or formats suited to that user.",
          "A database can have many external schemas. Limiting a view can also help hide sensitive data.",
        ],
      },
      {
        title: "Conceptual Level: Logical Level",
        paragraphs: [
          "The conceptual level describes the complete logical structure of the database for the whole organization.",
          "It contains entities or tables, attributes, relationships, and constraints. It does not describe exact files, disk blocks, or index placement. A database normally has one conceptual schema.",
        ],
      },
      {
        title: "Internal Level: Physical Level",
        paragraphs: [
          "The internal level describes how data is stored and accessed. It includes record layouts, files, pages, indexes, and other storage details.",
          "A database normally has one internal schema. The DBMS maps logical requests to these physical structures.",
        ],
        visual: {
          src: "/notes/dbms/three-schema-architecture.png",
          alt: "Three-schema architecture with multiple user views at the external level, one logical database design at the conceptual level, and files and indexes at the internal level.",
          width: 1536,
          height: 1024,
          caption:
            "External views sit above the complete logical design, which sits above physical storage.",
        },
      },
      {
        title: "Mappings Connect the Levels",
        paragraphs: [
          "An external-conceptual mapping connects each user view to the conceptual schema. A conceptual-internal mapping connects the logical design to physical storage.",
          "These mappings let the DBMS translate a request from a user view into operations on stored data and then return the result in the required view.",
        ],
      },
      {
        title: "Physical Data Independence",
        paragraphs: [
          "Physical data independence means changing internal storage without requiring a change to the conceptual schema or application views.",
          "For example, an administrator may add an index or move a table to different storage to improve performance. The Student table still looks the same to applications.",
        ],
      },
      {
        title: "Logical Data Independence",
        paragraphs: [
          "Logical data independence means changing the conceptual schema without requiring changes to external schemas or application programs that do not depend on the changed part.",
          "For example, a large Student table may be split into Student and StudentContact tables while the DBMS preserves an existing external view containing RollNumber, Name, and Phone. Programs using that view can continue to work.",
          "Logical data independence is usually harder to achieve than physical data independence because applications often depend on the logical structure.",
        ],
      },
      {
        title: "Do All DBMS Products Use Three Separate Schemas?",
        paragraphs: [
          "The three-schema architecture is a conceptual model used to understand separation. A real DBMS may not expose three literal schema files.",
          "The important idea is that user views, logical structure, and physical storage can be separated through mappings.",
        ],
      },
    ],
    mechanism: {
      title: "How a request crosses the three levels",
      steps: [
        "A user sends a request through an external view.",
        "The external-conceptual mapping connects the view to the logical database structure.",
        "The conceptual-internal mapping selects the required physical structures.",
        "The DBMS reads or changes the stored data.",
        "The result is mapped back to the user's external view.",
      ],
    },
    example: {
      title: "Adding an index",
      body: "Student records are slow to search, so the DBA adds an index on RollNumber. This changes the internal level. The conceptual Student table and the applications using it remain unchanged. This is physical data independence.",
    },
    misconception:
      "Logical data independence does not mean every logical change is invisible. A removed or renamed field still affects an application that directly uses it.",
  },
  revise: {
    definition:
      "Three-schema architecture separates external user views, the conceptual logical design, and internal physical storage.",
    sections: [
      {
        title: "The Three Levels",
        dataTable: {
          headers: ["Level", "Describes", "How many"],
          rows: [
            ["External or view", "User or application views", "Many"],
            [
              "Conceptual or logical",
              "Complete logical database design",
              "One",
            ],
            [
              "Internal or physical",
              "Physical storage and access structures",
              "One",
            ],
          ],
        },
      },
      {
        title: "Two Types of Data Independence",
        table: {
          headers: ["Physical", "Logical"],
          rows: [
            ["Internal level changes", "Conceptual level changes"],
            [
              "Conceptual and external levels stay stable",
              "Unaffected external views stay stable",
            ],
            [
              "Example: add an index",
              "Example: split a table while preserving its view",
            ],
            ["Usually easier", "Usually harder"],
          ],
        },
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "External level answers: what does this user see?",
      "Conceptual level answers: what is the complete logical design?",
      "Internal level answers: how is the data physically stored?",
      "Physical independence hides storage changes from higher levels.",
      "Logical independence protects unaffected views from logical design changes.",
    ],
    followUp:
      "Why is adding an index an example of physical data independence?",
  },
  lastMinute: {
    definition:
      "External = views, Conceptual = logical design, Internal = physical storage.",
    sections: [
      {
        title: "Independence",
        points: [
          "Physical: change storage without changing the logical schema.",
          "Logical: change logical design without changing unaffected views.",
          "Logical independence is generally harder.",
        ],
      },
    ],
    memoryLine: "Views → Logical design → Physical storage",
    cues: ["Many external", "One conceptual", "One internal", "Mappings"],
    trap: "Physical independence is about storage changes, not changes to user-visible columns.",
  },
};
