import type { SubjectTopic } from "@/lib/subject-content";

export const functionalDependencies: SubjectTopic = {
  slug: "functional-dependencies",
  title: "Functional Dependencies",
  description:
    "Understand determinants, dependency types, and the inference rules used in normalization.",
  readTime: "24 min",
  difficulty: "Intermediate",
  tags: ["Functional Dependency", "Armstrong Axioms", "Inference"],
  learn: {
    opening:
      "A functional dependency describes a rule between attributes. It tells us when one set of attribute values must determine another set.",
    sections: [
      {
        title: "Meaning of X → Y",
        paragraphs: [
          "The dependency X → Y means that whenever two valid tuples have the same X values, they must also have the same Y values. X is called the determinant, and Y is functionally dependent on X.",
          "In STUDENT(StudentId, Name, Department), StudentId → Name means one StudentId cannot identify two different student names in any valid relation instance.",
          "An FD is based on the meaning and rules of the data, not only on values that happen to be unique in the current rows.",
          "X does not have to be a key. It is a super key only when X determines every attribute of the relation.",
        ],
      },
      {
        title: "FD Set Closure",
        paragraphs: [
          "The closure F+ of an FD set F is the set of every functional dependency logically implied by F. It normally contains many trivial and derived dependencies, so we rarely list all of it.",
          "Attribute closure answers a focused question: X+ contains the attributes determined by one set X. It lets us test whether a particular X → Y belongs to F+.",
        ],
      },
      {
        title: "When a Table Violates an FD",
        paragraphs: [
          "If StudentId → Name should hold, two tuples with the same StudentId cannot contain different names.",
        ],
        dataTable: {
          headers: ["StudentId", "Name", "Valid?"],
          rows: [
            ["101", "Asha", "First tuple"],
            ["101", "Mina", "Violation: same StudentId, different Name"],
          ],
        },
      },
      {
        title: "Trivial and Non-Trivial Dependencies",
        dataTable: {
          headers: ["Type", "Condition", "Example"],
          rows: [
            ["Trivial", "Y is a subset of X", "{A, B} → A"],
            ["Non-trivial", "Y is not a subset of X", "A → B"],
            ["Completely non-trivial", "X and Y have no common attribute", "{A, B} → {C, D}"],
          ],
        },
        paragraphs: [
          "Trivial dependencies always hold because the right side is already present on the left side.",
        ],
      },
      {
        title: "Full and Partial Dependency",
        paragraphs: [
          "Y is fully dependent on a composite determinant X when no proper subset of X can determine Y.",
          "Y is partially dependent on X when some proper subset of X already determines Y.",
          "If {StudentId, CourseId} → Grade and neither StudentId nor CourseId alone determines Grade, the dependency is full. If StudentId → StudentName, then StudentName is partially dependent on the composite key {StudentId, CourseId}.",
        ],
      },
      {
        title: "Transitive Dependency",
        paragraphs: [
          "A transitive dependency occurs when X determines Y and Y determines Z, so X also determines Z through Y.",
          "For EMPLOYEE(EmpId, DeptId, DeptName), EmpId → DeptId and DeptId → DeptName imply EmpId → DeptName. This chain can create repeated department names.",
        ],
      },
      {
        title: "Armstrong's Axioms",
        dataTable: {
          headers: ["Axiom", "Rule", "Simple meaning"],
          rows: [
            ["Reflexivity", "If Y ⊆ X, then X → Y", "A set determines its own subsets"],
            ["Augmentation", "If X → Y, then XZ → YZ", "Add the same attributes to both sides"],
            ["Transitivity", "If X → Y and Y → Z, then X → Z", "Follow the dependency chain"],
          ],
        },
        paragraphs: [
          "These rules are sound and complete: they derive only valid consequences, and every logically implied FD can be derived from them.",
        ],
      },
      {
        title: "Useful Derived Rules",
        paragraphs: [],
        dataTable: {
          headers: ["Rule", "Form"],
          rows: [
            ["Union", "X → Y and X → Z imply X → YZ"],
            ["Decomposition", "X → YZ implies X → Y and X → Z"],
            ["Pseudotransitivity", "X → Y and WY → Z imply WX → Z"],
          ],
        },
      },
      {
        title: "Practice: Infer the Dependencies",
        paragraphs: [
          "Given A → B, B → C, and CD → E:",
        ],
        points: [
          "A → C follows by transitivity.",
          "A → BC follows from A → B and A → C using union.",
          "AD → BD follows from A → B using augmentation.",
          "AD → E follows because A → C gives AD → CD, and CD → E completes the chain.",
          "AB → A is trivial because A is a subset of AB.",
        ],
      },
    ],
    mechanism: {
      title: "How to check whether an FD is implied",
      steps: [
        "Start with the given FD set.",
        "Apply reflexivity, augmentation, and transitivity as needed.",
        "Use union and decomposition to manage multi-attribute right sides.",
        "Alternatively, calculate the determinant's closure.",
        "The FD X → Y is implied when every attribute of Y appears in X+.",
      ],
    },
    example: {
      title: "Department details",
      body: "If EmpId → DeptId and DeptId → DeptName, then EmpId → DeptName follows by transitivity. Storing DeptName in every employee tuple can therefore repeat the same fact.",
    },
    misconception:
      "An attribute that is unique in today's sample rows does not automatically create an FD. The dependency must hold for every valid database state.",
  },
  revise: {
    definition:
      "X → Y means equal X values must always have equal Y values in every valid relation instance.",
    sections: [
      {
        title: "Dependency Types",
        points: [
          "Trivial: right side is contained in the left side.",
          "Full: every determinant attribute is necessary.",
          "Partial: a proper subset already determines the right side.",
          "Transitive: a dependency follows through another determinant.",
        ],
      },
      {
        title: "Armstrong Recall",
        points: [
          "Reflexivity: take a subset.",
          "Augmentation: add the same attributes.",
          "Transitivity: follow the chain.",
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "FDs describe semantic rules, not accidental sample uniqueness.",
      "The left side is the determinant.",
      "F+ means every FD implied by F; X+ means every attribute determined by X.",
      "Armstrong's axioms are sound and complete.",
      "X → Y is implied exactly when Y is contained in X+.",
    ],
    followUp: "Given A → B and BC → D, what can be inferred after augmenting A → B with C?",
  },
  lastMinute: {
    definition:
      "A functional dependency states that one attribute set determines another.",
    sections: [
      {
        title: "Fast Rules",
        points: [
          "Subset on right → trivial.",
          "Same extra attributes on both sides → augmentation.",
          "X → Y and Y → Z → X → Z.",
        ],
      },
    ],
    memoryLine: "Same determinant values → same dependent values",
    cues: ["Determinant", "Full or partial", "Inference"],
    trap: "Do not derive an FD only by inspecting a small sample table.",
  },
};

export const attributeClosureAndCandidateKeys: SubjectTopic = {
  slug: "attribute-closure-and-candidate-keys",
  title: "Attribute Closure and Candidate Keys",
  description:
    "Calculate closures, test super keys, and find every minimal candidate key from functional dependencies.",
  readTime: "24 min",
  difficulty: "Intermediate",
  tags: ["Attribute Closure", "Candidate Key", "Numericals"],
  learn: {
    opening:
      "The closure X+ is the set of all attributes that X can determine using a given FD set. Closure is the main tool for checking implied dependencies and finding keys.",
    sections: [
      {
        title: "Closure Algorithm",
        paragraphs: [
          "To calculate X+, begin with every attribute already in X. Repeatedly apply any FD whose entire left side is present, adding its right-side attributes. Stop when no new attribute can be added.",
        ],
        flow: [
          "Start: X+ = X",
          "Find an FD whose left side is in X+",
          "Add its right side to X+",
          "Repeat until X+ stops changing",
        ],
      },
      {
        title: "Worked Closure",
        paragraphs: [
          "For R(A, B, C, D, E), let F = {A → B, B → C, CD → E, E → A}.",
        ],
        dataTable: {
          headers: ["Step", "Reason", "AD+"],
          rows: [
            ["Start", "Attributes given", "{A, D}"],
            ["1", "A → B", "{A, B, D}"],
            ["2", "B → C", "{A, B, C, D}"],
            ["3", "CD → E", "{A, B, C, D, E}"],
          ],
        },
      },
      {
        title: "Super Key and Candidate Key Tests",
        paragraphs: [
          "X is a super key when X+ contains every attribute of the relation. It is a candidate key only when it is also minimal: removing any attribute must stop it from being a super key.",
          "In the worked example, AD+ contains every attribute. A+ misses D and D+ contains only D, so AD is a candidate key.",
        ],
      },
      {
        title: "Useful Starting Shortcut",
        paragraphs: [
          "An attribute that never appears on the right side of any non-trivial FD cannot be derived from other attributes. It must therefore appear in every candidate key.",
          "This is only a starting shortcut. Attributes that do appear on a right side may still be needed in some candidate keys.",
        ],
      },
      {
        title: "Classify Attributes Before Searching",
        paragraphs: [
          "Classifying attributes reduces unnecessary combinations. Use only non-trivial FDs for this shortcut.",
        ],
        dataTable: {
          headers: ["Class", "Key-search use"],
          rows: [
            ["Only on left or in no FD", "Cannot be derived, so include in every candidate key"],
            ["Only on right", "Usually do not add initially because another attribute derives them"],
            ["On both sides", "May be needed in some candidate keys"],
          ],
        },
      },
      {
        title: "Finding All Candidate Keys",
        paragraphs: [
          "In F = {A → B, B → C, CD → E, E → A}, D never appears on a right side, so every candidate key contains D.",
        ],
        dataTable: {
          headers: ["Set", "Closure", "Candidate key?"],
          rows: [
            ["AD", "ABCDE", "Yes"],
            ["BD", "ABCDE", "Yes"],
            ["CD", "ABCDE", "Yes"],
            ["DE", "ABCDE", "Yes"],
            ["D", "D", "No"],
          ],
        },
      },
      {
        title: "Closure for FD Testing",
        paragraphs: [
          "To test whether X → Y follows from F, calculate X+. If every attribute of Y appears in X+, the dependency is implied.",
          "For the worked FDs, A+ = {A, B, C}. Therefore A → C is implied, but A → D is not.",
        ],
      },
      {
        title: "Practice: Two Compulsory Attributes",
        paragraphs: [
          "For R(A, B, C, D, E) with F = {A → B, B → C, CD → E}, attributes A and D never appear on a right side. Both must be in every candidate key.",
        ],
        dataTable: {
          headers: ["Test", "Closure", "Meaning"],
          rows: [
            ["AD+", "ABCDE", "AD is a super key"],
            ["A+", "ABC", "Removing D loses D and E"],
            ["D+", "D", "Removing A loses A, B, C, and E"],
            ["Conclusion", "AD", "AD is minimal and is the only candidate key"],
          ],
        },
      },
    ],
    mechanism: {
      title: "How to find candidate keys",
      steps: [
        "List attributes that never appear on a non-trivial FD right side; include them in every starting set.",
        "Calculate the starting set's closure.",
        "If attributes are missing, add possible attributes and recalculate.",
        "When the closure becomes the full schema, test minimality by removing attributes one at a time.",
        "Continue with other combinations to find every candidate key.",
      ],
    },
    example: {
      title: "Why minimality matters",
      body: "If AD is a candidate key, ADE is also a super key because it contains AD. ADE is not a candidate key because E can be removed without losing the ability to determine every attribute.",
    },
    misconception:
      "Finding one candidate key does not prove that it is the only candidate key. Search other minimal attribute combinations when the question asks for all keys.",
  },
  revise: {
    definition:
      "X+ contains every attribute that X can determine under the given functional dependencies.",
    sections: [
      {
        title: "Key Conditions",
        table: {
          headers: ["Super key", "Candidate key"],
          rows: [
            ["Closure is the full schema", "Closure is full and the set is minimal"],
            ["May contain extra attributes", "Contains no removable attribute"],
          ],
        },
      },
      {
        title: "Closure Steps",
        points: [
          "Start with X itself.",
          "Apply every usable FD repeatedly.",
          "Stop only when no attribute is added.",
          "Compare the result with the full schema.",
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Full closure means super key, not automatically candidate key.",
      "Minimality must be tested separately.",
      "Attributes absent from all non-trivial right sides must be in every key.",
      "Classify attributes first to reduce the candidate-key search.",
      "Closure also tests whether an FD is implied.",
    ],
    followUp: "Why must D appear in every candidate key when no FD can derive D?",
  },
  lastMinute: {
    definition:
      "Start with X, apply FDs until nothing changes, then compare X+ with the relation schema.",
    sections: [
      {
        title: "Key Checklist",
        points: [
          "All attributes reached? Super key.",
          "Every attribute necessary? Candidate key.",
          "Question asks all keys? Continue searching.",
        ],
      },
    ],
    memoryLine: "Closure proves reachability; removal proves minimality",
    cues: ["Start set", "Repeat FDs", "Remove attributes"],
    trap: "Do not stop the closure calculation after using each FD only once; a later result may enable an earlier FD.",
  },
};

export const minimalCover: SubjectTopic = {
  slug: "minimal-cover",
  title: "Minimal Cover",
  description:
    "Reduce a functional-dependency set without changing the dependencies it implies.",
  readTime: "26 min",
  difficulty: "Intermediate",
  tags: ["Minimal Cover", "Canonical Cover", "FD Reduction"],
  learn: {
    opening:
      "A minimal cover is an equivalent FD set with simple right sides, no unnecessary left-side attributes, and no redundant dependencies.",
    sections: [
      {
        title: "Conditions of a Minimal Cover",
        points: [
          "Every FD has exactly one attribute on its right side.",
          "No left-side attribute is extraneous.",
          "No FD can be removed while keeping an equivalent set.",
        ],
        paragraphs: [
          "Different correct minimal covers may sometimes exist, but they must imply the same dependencies as the original set.",
        ],
      },
      {
        title: "Step 1: Split Right Sides",
        paragraphs: [
          "Replace X → YZ with X → Y and X → Z. Do not split the left side.",
          "Example: A → BC becomes A → B and A → C.",
        ],
      },
      {
        title: "Step 2: Remove Extraneous Left Attributes",
        paragraphs: [
          "For an FD XY → A, test whether X or Y can be removed. An attribute is extraneous if the smaller left side still determines A using the FD set.",
          "If AB → C and B → C already holds, A is extraneous in AB → C because B alone determines C.",
          "For a precise test of A in AB → C, calculate B+ under the current FD set. If C appears in B+, replace AB → C with B → C. Test B similarly by calculating A+.",
        ],
      },
      {
        title: "Step 3: Remove Redundant FDs",
        paragraphs: [
          "Temporarily remove one FD X → A. Calculate X+ using the remaining FDs. If A is still in X+, the removed FD is redundant.",
          "Test one FD at a time using the current reduced set.",
        ],
      },
      {
        title: "Worked Minimal Cover",
        paragraphs: [
          "Let F = {A → BC, B → C, A → B, AB → C}.",
        ],
        dataTable: {
          headers: ["Step", "FD set"],
          rows: [
            ["Split A → BC", "A → B, A → C, B → C, A → B, AB → C"],
            ["Remove duplicate", "A → B, A → C, B → C, AB → C"],
            ["Remove A → C", "A → B and B → C already imply it"],
            ["Remove AB → C", "B → C already implies it; A is unnecessary"],
            ["Minimal cover", "{A → B, B → C}"],
          ],
        },
      },
      {
        title: "Check Equivalence",
        paragraphs: [
          "The reduced set must imply every original FD, and the original set must imply every reduced FD. Since the reduced FDs came from valid simplifications, the main final check is usually that every original dependency follows from the result.",
          "From {A → B, B → C}, transitivity gives A → C and union gives A → BC. Augmentation and B → C also give AB → C.",
        ],
      },
      {
        title: "Practice",
        paragraphs: [
          "Reduce F = {A → BC, B → C, A → B}.",
        ],
        points: [
          "Split A → BC into A → B and A → C.",
          "Remove the duplicate A → B.",
          "A → C is redundant because A → B and B → C imply it.",
          "Minimal cover: {A → B, B → C}.",
        ],
      },
      {
        title: "Harder Practice: Composite Left Side",
        paragraphs: [
          "Reduce F = {AB → C, A → B, B → D, C → E, AD → E}.",
        ],
        dataTable: {
          headers: ["Test", "Result"],
          rows: [
            ["Is B extraneous in AB → C?", "A+ contains B using A → B, then AB → C adds C; replace AB → C with A → C"],
            ["Is D extraneous in AD → E?", "A+ gives B, then C using A → C, then E using C → E; replace AD → E with A → E"],
            ["Is A → E redundant?", "Yes; A → C and C → E already imply it"],
            ["Minimal cover", "{A → B, A → C, B → D, C → E}"],
          ],
        },
      },
      {
        title: "Minimal vs Canonical Cover",
        paragraphs: [
          "Many books use minimal cover and canonical cover as the same term. Some books call the singleton-right-side form minimal, then combine dependencies with the same left side for the final canonical cover.",
          "For example, A → B and A → C may remain separate in a minimal cover or be written as A → BC in a combined canonical cover. Follow the convention stated in the exam.",
        ],
      },
    ],
    mechanism: {
      title: "How to calculate a minimal cover",
      steps: [
        "Split every multi-attribute right side.",
        "Remove duplicate dependencies.",
        "Test each attribute in every composite left side for extraneousness.",
        "Test each complete FD for redundancy using closure without that FD.",
        "Verify that the final set implies the original dependencies.",
      ],
    },
    example: {
      title: "Redundancy test",
      body: "To test whether A → C is redundant in {A → B, B → C, A → C}, remove A → C and calculate A+. The remaining dependencies still produce A, B, and C, so A → C is redundant.",
    },
    misconception:
      "Minimal does not mean the FD set with the fewest written characters. It means no allowed component can be removed without changing the closure of the set.",
  },
  revise: {
    definition:
      "A minimal cover is a simple, non-redundant FD set equivalent to the original set.",
    sections: [
      {
        title: "Three Tests",
        flow: [
          "One attribute on each right side",
          "No extraneous left-side attribute",
          "No redundant FD",
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Split right sides, not left sides.",
      "Use closure to test extraneous attributes and redundant FDs.",
      "Remove only one candidate FD while testing it.",
      "The final cover must remain equivalent to the original set.",
      "Equivalent minimal covers may look different when more than one valid reduction order exists.",
    ],
    followUp: "How do you test whether A → C is redundant in an FD set?",
  },
  lastMinute: {
    definition:
      "Singleton right sides, minimal left sides, and no removable dependency.",
    sections: [
      {
        title: "Order",
        points: [
          "Split RHS.",
          "Remove extra LHS attributes.",
          "Remove redundant FDs.",
          "Check equivalence.",
        ],
      },
    ],
    memoryLine: "Split → shrink → remove → verify",
    cues: ["Singleton RHS", "Extraneous", "Redundant"],
    trap: "Do not use the FD being tested when checking whether that same FD is redundant.",
  },
};

export const normalizationAndAnomalies: SubjectTopic = {
  slug: "normalization-and-anomalies",
  title: "Normalization, Anomalies, 1NF, and 2NF",
  description:
    "Understand redundancy problems and remove repeating groups and partial dependencies.",
  readTime: "28 min",
  difficulty: "Intermediate",
  tags: ["Normalization", "1NF", "2NF"],
  learn: {
    opening:
      "Normalization organizes attributes into well-structured relations. Its goal is to reduce unnecessary repetition and prevent incorrect insert, update, and delete behaviour.",
    sections: [
      {
        title: "Why Redundancy Is a Problem",
        paragraphs: [
          "Consider ENROLMENT(StudentId, StudentName, CourseId, CourseName, Instructor) with candidate key {StudentId, CourseId}.",
          "If one student takes several courses, StudentName repeats. If many students take one course, CourseName and Instructor repeat. The repeated facts create anomalies.",
        ],
        dataTable: {
          headers: ["StudentId", "StudentName", "CourseId", "CourseName", "Instructor"],
          rows: [
            ["S1", "Asha", "C1", "DBMS", "Rao"],
            ["S1", "Asha", "C2", "OS", "Mina"],
            ["S2", "Ravi", "C1", "DBMS", "Rao"],
          ],
        },
      },
      {
        title: "Three Anomalies",
        paragraphs: [],
        dataTable: {
          headers: ["Anomaly", "Problem in the ENROLMENT relation"],
          rows: [
            ["Insertion", "A new course cannot be stored until some student enrols, unless unwanted NULL values are used"],
            ["Update", "Changing one course instructor requires updating several tuples"],
            ["Deletion", "Deleting the last enrolment for a course can also remove the only stored course details"],
          ],
        },
      },
      {
        title: "First Normal Form",
        paragraphs: [
          "A relation is in First Normal Form, or 1NF, when every attribute value is atomic for that relation and there are no repeating groups inside one tuple.",
          "Atomicity depends on the intended domain and operations. A full postal code can be one atomic value when the system always treats it as a whole, even though its characters could physically be split.",
          "A column such as PhoneNumbers containing '9876, 6543' stores several phone values together. Move the values into separate tuples, usually in a separate STUDENT_PHONE(StudentId, PhoneNumber) relation.",
          "1NF controls the shape of values. It does not by itself remove partial or transitive dependencies.",
        ],
      },
      {
        title: "Second Normal Form",
        paragraphs: [
          "A relation is in 2NF when it is in 1NF and no non-prime attribute is partially dependent on any candidate key.",
          "A partial dependency needs a composite candidate key. Therefore, a relation whose candidate keys all contain one attribute is automatically in 2NF once it is in 1NF.",
        ],
      },
      {
        title: "Finding the 2NF Violations",
        paragraphs: [
          "For ENROLMENT, assume {StudentId, CourseId} is the candidate key and the FDs are StudentId → StudentName and CourseId → CourseName, Instructor.",
        ],
        dataTable: {
          headers: ["Dependency", "Why it violates 2NF"],
          rows: [
            ["StudentId → StudentName", "StudentId is only part of the composite candidate key"],
            ["CourseId → CourseName", "CourseId is only part of the composite candidate key"],
            ["CourseId → Instructor", "CourseId is only part of the composite candidate key"],
          ],
        },
      },
      {
        title: "Decompose into 2NF",
        paragraphs: [
          "Move each partial dependency into a relation where its determinant becomes a key.",
        ],
        points: [
          "STUDENT(StudentId, StudentName).",
          "COURSE(CourseId, CourseName, Instructor).",
          "ENROLMENT(StudentId, CourseId).",
          "The ENROLMENT key remains {StudentId, CourseId}; its attributes also reference STUDENT and COURSE.",
          "The split is lossless: ENROLMENT joins with STUDENT on StudentId, which is the key of STUDENT, and with COURSE on CourseId, which is the key of COURSE.",
        ],
      },
      {
        title: "Normalization Path",
        paragraphs: [
          "Each normal form adds a stronger condition. Test candidate keys and FDs at every stage rather than judging only from column names.",
        ],
        visual: {
          src: "/notes/dbms/normalization-path.png",
          alt: "Normalization path from atomic values and no repeating groups in 1NF to the stricter dependency rules of 2NF, 3NF, and BCNF.",
          width: 1536,
          height: 1024,
          caption:
            "Each normal form adds a stricter condition and helps reduce avoidable redundancy.",
        },
      },
      {
        title: "Normalization Is a Design Choice",
        paragraphs: [
          "Normalization reduces avoidable duplication and update anomalies. It does not mean that every database must always be decomposed as far as possible.",
          "A system may deliberately duplicate a small amount of derived data to speed up important reads. This is denormalization. Use it only after measuring a real need, and define how every copy will stay consistent.",
        ],
      },
      {
        title: "Practice: Is It in 2NF?",
        paragraphs: [
          "R(A, B, C) has candidate key {A, B} and FD A → C. R is in 1NF.",
        ],
        points: [
          "C is non-prime because it belongs to no candidate key.",
          "A is a proper subset of candidate key {A, B}.",
          "A → C is a partial dependency.",
          "Therefore, R is not in 2NF.",
        ],
      },
      {
        title: "Practice: Multiple Candidate Keys",
        paragraphs: [
          "R(A, B, C, D) has F = {B → C, C → B, B → D}. The candidate keys are {A, B} and {A, C}; therefore A, B, and C are prime, while D is non-prime.",
        ],
        points: [
          "B is a proper subset of candidate key {A, B}.",
          "B → D makes non-prime D partially dependent on {A, B}.",
          "C → B and B → D imply C → D, so D is also partially dependent on {A, C}.",
          "The relation is not in 2NF even if one of those candidate keys was not selected as the primary key.",
        ],
      },
    ],
    mechanism: {
      title: "How to check 1NF and 2NF",
      steps: [
        "Check that each attribute stores one atomic value and that repeating groups are absent.",
        "Find every candidate key and mark prime and non-prime attributes.",
        "Look for non-prime attributes determined by a proper subset of any candidate key.",
        "Move each partial dependency into its own relation.",
        "Keep the necessary keys as references so the original information can be reconstructed.",
      ],
    },
    example: {
      title: "Single-attribute key",
      body: "If EmpId is the only candidate key of EMPLOYEE(EmpId, Name, DeptId), a partial dependency on EmpId is impossible because EmpId has no non-empty proper subset. If the relation is in 1NF, it is therefore already in 2NF.",
    },
    misconception:
      "2NF is not simply 'a table with a primary key'. It requires checking partial dependencies against every candidate key, not only the selected primary key.",
  },
  revise: {
    definition:
      "Normalization reduces redundancy and anomalies by organizing attributes according to their dependencies.",
    sections: [
      {
        title: "Normal Forms",
        table: {
          headers: ["1NF", "2NF"],
          rows: [
            ["Atomic values and no repeating groups", "1NF plus no partial dependency of a non-prime attribute"],
            ["Controls value structure", "Depends on candidate keys and FDs"],
          ],
        },
      },
      {
        title: "Anomalies",
        points: [
          "Insertion: cannot store one fact independently.",
          "Update: the same fact must change in several places.",
          "Deletion: removing one fact accidentally removes another.",
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "1NF does not guarantee 2NF.",
      "Only non-prime attributes matter for a 2NF violation.",
      "Partial dependency uses a proper subset of a candidate key.",
      "Check every candidate key, not only the primary key.",
      "Denormalize only for a measured need and keep duplicated values consistent.",
    ],
    followUp: "Why is a 1NF relation with only single-attribute candidate keys automatically in 2NF?",
  },
  lastMinute: {
    definition:
      "1NF makes values atomic; 2NF removes partial dependency of non-prime attributes.",
    sections: [
      {
        title: "Fast Test",
        points: [
          "Repeating or multi-valued cell? Not 1NF.",
          "Composite candidate key? Check partial dependencies.",
          "Non-prime attribute depends on part of a key? Not 2NF.",
        ],
      },
    ],
    memoryLine: "Atomic first; then remove dependency on part of a key",
    cues: ["Anomalies", "Atomic", "Partial dependency"],
    trap: "A composite primary key is not itself a 2NF violation; the partial dependency is the violation.",
  },
};

export const thirdNormalFormAndBcnf: SubjectTopic = {
  slug: "third-normal-form-and-bcnf",
  title: "Third Normal Form and BCNF",
  description:
    "Remove transitive redundancy and compare the formal rules of 3NF and BCNF.",
  readTime: "26 min",
  difficulty: "Advanced",
  tags: ["3NF", "BCNF", "Prime Attribute"],
  learn: {
    opening:
      "Third Normal Form removes important transitive redundancy, while BCNF applies a stricter rule to every determinant.",
    sections: [
      {
        title: "Formal 3NF Condition",
        paragraphs: [
          "A relation is in 3NF when it is in 2NF and, for every non-trivial FD X → A, at least one condition holds: X is a super key, or A is a prime attribute.",
          "The common transitive-dependency wording is only a shortcut. Use the formal condition as the main exam test, especially when candidate keys overlap.",
        ],
      },
      {
        title: "Removing a Transitive Dependency",
        paragraphs: [
          "EMPLOYEE(EmpId, DeptId, DeptName) has EmpId → DeptId and DeptId → DeptName. EmpId is the candidate key.",
          "DeptId is not a super key and DeptName is non-prime, so DeptId → DeptName violates 3NF.",
        ],
        points: [
          "Create EMPLOYEE(EmpId, DeptId).",
          "Create DEPARTMENT(DeptId, DeptName).",
          "DeptId becomes a foreign key in EMPLOYEE.",
        ],
      },
      {
        title: "BCNF Condition",
        paragraphs: [
          "A relation is in Boyce-Codd Normal Form when, for every non-trivial FD X → Y, X is a super key.",
          "BCNF does not provide the prime-attribute exception allowed by 3NF. Therefore, every BCNF relation is in 3NF, but a 3NF relation may fail BCNF.",
        ],
      },
      {
        title: "A Relation Already in BCNF",
        paragraphs: [
          "R(A, B, C) has F = {A → B, A → C}. A+ = ABC, so A is a candidate key.",
          "Every listed non-trivial FD has determinant A, which is a super key. Therefore, R is in BCNF and needs no FD-based decomposition.",
        ],
      },
      {
        title: "3NF vs BCNF",
        paragraphs: [],
        table: {
          headers: ["3NF", "BCNF"],
          rows: [
            ["X is a super key or the right-side attribute is prime", "X must be a super key"],
            ["May allow limited redundancy", "Stricter control of FD-based redundancy"],
            ["Can always achieve lossless, dependency-preserving synthesis", "Lossless decomposition is possible, but dependencies may not all be preserved"],
          ],
        },
      },
      {
        title: "A Relation in 3NF but Not BCNF",
        paragraphs: [
          "Let R(Student, Course, Instructor) have FDs {Student, Course} → Instructor and Instructor → Course.",
          "The candidate keys are {Student, Course} and {Student, Instructor}. Therefore, Student, Course, and Instructor are all prime attributes.",
          "Instructor → Course satisfies 3NF because Course is prime. It violates BCNF because Instructor alone is not a super key.",
        ],
      },
      {
        title: "BCNF Decomposition of the Example",
        paragraphs: [
          "Decompose on the violating FD Instructor → Course.",
        ],
        points: [
          "R1(Instructor, Course).",
          "R2(Student, Instructor).",
          "The decomposition is lossless because the common attribute Instructor determines R1.",
          "The original dependency {Student, Course} → Instructor is not directly enforceable inside either relation, so dependency preservation is lost.",
        ],
        dataTable: {
          headers: ["Relation", "Projected FD", "Candidate key"],
          rows: [
            ["R1(Instructor, Course)", "Instructor → Course", "Instructor"],
            ["R2(Student, Instructor)", "No non-trivial projected FD from the given set", "{Student, Instructor}"],
          ],
        },
      },
      {
        title: "Practice: Overlapping Candidate Keys",
        paragraphs: [
          "R(A, B, C) has F = {AB → C, C → B}. The candidate keys are {A, B} and {A, C}, so every attribute is prime.",
        ],
        points: [
          "AB → C satisfies BCNF because AB is a candidate key.",
          "C → B satisfies 3NF because B is prime.",
          "C → B violates BCNF because C+ = {B, C}, so C is not a super key.",
          "The highest normal form is 3NF.",
        ],
      },
    ],
    mechanism: {
      title: "How to find the highest normal form",
      steps: [
        "Find every candidate key and mark all prime attributes.",
        "Check 1NF value structure.",
        "Check partial dependencies for 2NF.",
        "For each non-trivial FD, apply the formal 3NF test.",
        "For BCNF, require every determinant to be a super key.",
        "The first failed condition determines the highest satisfied normal form.",
      ],
    },
    example: {
      title: "Prime-attribute exception",
      body: "An FD with a non-super-key determinant can still satisfy 3NF when its right-side attribute is prime. The same FD always violates BCNF because BCNF has no such exception.",
    },
    misconception:
      "3NF does not simply mean 'no transitive dependency at all'. Use the formal super-key-or-prime condition when candidate keys overlap.",
  },
  revise: {
    definition:
      "3NF allows X → A when X is a super key or A is prime; BCNF requires X to be a super key.",
    sections: [
      {
        title: "Formal Tests",
        dataTable: {
          headers: ["Normal form", "For every non-trivial X → A"],
          rows: [
            ["3NF", "X is a super key, or A is prime"],
            ["BCNF", "X is a super key"],
          ],
        },
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Prime means belonging to at least one candidate key.",
      "Every BCNF relation is in 3NF.",
      "A 3NF relation can fail BCNF because of the prime-attribute exception.",
      "BCNF decomposition may lose dependency preservation.",
    ],
    followUp: "How can Instructor → Course satisfy 3NF but violate BCNF in the worked example?",
  },
  lastMinute: {
    definition:
      "3NF: super-key determinant or prime right side. BCNF: super-key determinant only.",
    sections: [
      {
        title: "Fast Order",
        points: [
          "Find keys first.",
          "Mark prime attributes.",
          "Test every non-trivial FD.",
          "State the first violated normal form.",
        ],
      },
    ],
    memoryLine: "3NF has an OR; BCNF demands the determinant key",
    cues: ["Super key", "Prime attribute", "Strictness"],
    trap: "Do not test normal forms using only the selected primary key.",
  },
};

export const decompositionAndNormalizationPractice: SubjectTopic = {
  slug: "decomposition-and-normalization-practice",
  title: "Decomposition and Normalization Practice",
  description:
    "Test lossless joins and dependency preservation, then solve complete normalization problems.",
  readTime: "28 min",
  difficulty: "Advanced",
  tags: ["Decomposition", "Lossless Join", "Practice"],
  learn: {
    opening:
      "Decomposition replaces one relation with smaller relations. A good decomposition must reconstruct the original information and should allow dependencies to be checked without expensive joins.",
    sections: [
      {
        title: "Lossless-Join Decomposition",
        paragraphs: [
          "A decomposition is lossless under the given functional dependencies when naturally joining the decomposed relations recreates exactly each valid original relation. It must not lose tuples or create false, or spurious, tuples.",
          "For a binary decomposition of R into R1 and R2, it is lossless under F when the common attributes R1 ∩ R2 functionally determine all attributes of R1 or all attributes of R2.",
        ],
      },
      {
        title: "Dependency Preservation",
        paragraphs: [
          "A decomposition is dependency preserving when all original FDs can be enforced by checking the individual relations, without joining them first.",
          "Project the relevant FDs onto each smaller relation. If the union of those projected dependencies implies every original FD, the decomposition preserves dependencies.",
        ],
      },
      {
        title: "Two Different Requirements",
        paragraphs: [],
        table: {
          headers: ["Lossless join", "Dependency preservation"],
          rows: [
            ["Protects information", "Protects local constraint checking"],
            ["Avoids missing or spurious tuples", "Avoids joining relations to verify every FD"],
            ["Essential for a correct decomposition", "Highly desirable but may be lost in BCNF"],
          ],
        },
      },
      {
        title: "Worked Good Decomposition",
        paragraphs: [
          "For R(A, B, C) with F = {A → B, B → C}, decompose into R1(A, B) and R2(B, C).",
        ],
        visual: {
          src: "/notes/dbms/good-decomposition.png",
          alt: "Relation R with dependencies A determines B and B determines C decomposed into R1 and R2 with lossless join and dependency preservation.",
          width: 1536,
          height: 1024,
          caption:
            "The common attribute B determines R2, and each original FD can be checked in one smaller relation.",
        },
        points: [
          "R1 ∩ R2 = {B}.",
          "B → BC, so the common attribute determines R2; the decomposition is lossless.",
          "A → B is enforceable in R1 and B → C is enforceable in R2.",
          "Therefore, the decomposition is dependency preserving.",
        ],
      },
      {
        title: "A Lossy Binary Decomposition",
        paragraphs: [
          "Let R(A, B, C) have only B → C, and decompose it into R1(A, B) and R2(A, C). The common attribute is A.",
          "A does not determine AB or AC under the given FDs. The binary lossless condition fails, so the decomposition may create spurious tuples.",
        ],
        dataTable: {
          headers: ["Stage", "Tuples"],
          rows: [
            ["Original R", "(a1, b1, c1), (a1, b2, c2)"],
            ["R1(A, B)", "(a1, b1), (a1, b2)"],
            ["R2(A, C)", "(a1, c1), (a1, c2)"],
            ["R1 ⋈ R2", "Original two tuples plus false tuples (a1, b1, c2), (a1, b2, c1)"],
          ],
        },
      },
      {
        title: "3NF Synthesis",
        paragraphs: [
          "Start with a minimal cover. For each FD X → A, create a relation containing X ∪ {A}. Remove any relation contained completely inside another relation.",
          "If none of the created relations contains a candidate key of the original schema, add one relation containing a candidate key.",
          "This method produces a dependency-preserving 3NF decomposition and, with the key relation when needed, a lossless join.",
        ],
      },
      {
        title: "Worked 3NF Synthesis",
        paragraphs: [
          "Let R(A, B, C, D) have minimal cover F = {A → B, B → C}. Attribute D cannot be derived, so AD is the candidate key.",
        ],
        dataTable: {
          headers: ["Step", "Result"],
          rows: [
            ["Create from A → B", "R1(A, B)"],
            ["Create from B → C", "R2(B, C)"],
            ["Check for an original candidate key", "Neither relation contains AD"],
            ["Add key relation", "R3(A, D)"],
            ["Final keys", "A in R1, B in R2, and AD in R3"],
          ],
        },
        points: [
          "The decomposition preserves A → B and B → C locally.",
          "Adding R3(A, D) ensures the synthesis has a lossless join.",
          "R1, R2, and R3 are all in BCNF for their projected dependencies.",
        ],
      },
      {
        title: "BCNF Decomposition",
        paragraphs: [
          "Find a non-trivial FD X → Y that violates BCNF. Replace the current relation with R1 = X ∪ Y and R2 = R − (Y − X). Repeat until every relation satisfies BCNF.",
          "Each binary step is lossless because X is the common determinant, but the final decomposition may not preserve every original dependency.",
        ],
      },
      {
        title: "Try Before Checking",
        paragraphs: [
          "For R(P, Q, R, S) with F = {P → Q, Q → R, PR → S}, find all candidate keys, the highest normal form, and a lossless dependency-preserving decomposition.",
        ],
        points: [
          "Calculate P+ step by step.",
          "Mark prime and non-prime attributes.",
          "Apply the formal 3NF and BCNF tests.",
          "State the keys and references in the final relations.",
        ],
      },
      {
        title: "Answer Check",
        paragraphs: [
          "Read this only after attempting the previous problem.",
        ],
        points: [
          "Start P+ = {P}. P → Q adds Q, Q → R adds R, and then PR → S adds S. Therefore P+ = {P, Q, R, S}, and P is the only candidate key.",
          "The relation is in 2NF because its only candidate key contains one attribute. Q → R violates 3NF because Q is not a super key and R is non-prime.",
          "A valid decomposition is R1(P, Q, S) with primary key P and R2(Q, R) with primary key Q. Q in R1 is a foreign key to R2.",
          "It is lossless because the common attribute Q determines R2.",
          "It preserves Q → R in R2. In R1, P → Q and P → S hold; P → S follows from P → Q, Q → R, and PR → S. The projected dependencies therefore imply the originals, including PR → S by augmentation of P → S.",
        ],
      },
      {
        title: "Dependency Preservation Failure",
        paragraphs: [
          "For R(Student, Course, Instructor), decompose into R1(Instructor, Course) and R2(Student, Instructor) using Instructor → Course.",
        ],
        points: [
          "R1 preserves Instructor → Course.",
          "R2 has no non-trivial projected FD from the original set.",
          "The union of projected FDs cannot derive {Student, Course} → Instructor.",
          "The decomposition is lossless but not dependency preserving; checking the lost FD requires joining R1 and R2.",
        ],
      },
    ],
    mechanism: {
      title: "How to solve a full normalization problem",
      steps: [
        "Write the schema and split FDs into simple right sides.",
        "Find every candidate key using closure.",
        "Mark prime and non-prime attributes.",
        "Find the highest normal form using the formal conditions.",
        "Decompose on the violating dependencies.",
        "Check losslessness and dependency preservation separately.",
        "State the keys and foreign-key links of the final relations.",
      ],
    },
    example: {
      title: "Why both checks matter",
      body: "A decomposition can be lossless but not dependency preserving. It can reconstruct all information correctly while still requiring a join to verify one of the original dependencies.",
    },
    misconception:
      "Smaller relations are not automatically a good decomposition. The split must be justified using lossless-join and dependency-preservation tests.",
  },
  revise: {
    definition:
      "A decomposition should reconstruct the original relation without spurious tuples and should preserve dependencies when possible.",
    sections: [
      {
        title: "Binary Lossless Test",
        points: [
          "Find R1 ∩ R2.",
          "Calculate whether the intersection determines R1 or R2.",
          "If it determines either side, the binary decomposition is lossless.",
        ],
      },
      {
        title: "3NF and BCNF Methods",
        table: {
          headers: ["3NF synthesis", "BCNF decomposition"],
          rows: [
            ["Starts from a minimal cover", "Starts from a violating FD"],
            ["Preserves dependencies", "May lose dependency preservation"],
            ["Ensure a relation contains a candidate key", "Each decomposition step is lossless"],
          ],
        },
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Lossless join and dependency preservation are separate properties.",
      "The binary lossless test uses the common attributes.",
      "3NF synthesis is designed to preserve dependencies.",
      "BCNF is stricter but may sacrifice dependency preservation.",
    ],
    followUp: "Why is R1(A, B), R2(B, C) lossless when B → C holds?",
  },
  lastMinute: {
    definition:
      "Lossless protects information; dependency preservation protects local FD checks.",
    sections: [
      {
        title: "Final Checklist",
        points: [
          "Keys found with closure?",
          "Prime attributes marked?",
          "Highest normal form justified?",
          "Intersection passes the lossless test?",
          "Every original FD still enforceable?",
        ],
      },
    ],
    memoryLine: "Find keys → test form → decompose → verify both properties",
    cues: ["Intersection", "Projected FDs", "Spurious tuples"],
    trap: "A BCNF decomposition is lossless when performed correctly, but it is not guaranteed to preserve every dependency.",
  },
};
