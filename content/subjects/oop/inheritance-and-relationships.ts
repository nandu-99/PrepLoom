import type { SubjectTopic } from "@/lib/subject-content";

export const inheritance: SubjectTopic = {
  slug: "inheritance",
  title: "Inheritance",
  description:
    "Learn how a child class extends a parent class and when that relationship is useful.",
  readTime: "11 min",
  difficulty: "Foundation",
  tags: ["Inheritance", "Parent", "Child"],
  learn: {
    opening:
      "Inheritance lets a child class build on a parent class. The child inherits accessible members according to the language's rules and can add or specialize behaviour.",
    sections: [
      {
        title: "Start With Repeated Classes",
        paragraphs: [
          "Imagine separate Car and Bike classes. Both may store speed and provide start and stop operations. Repeating the same general vehicle behaviour in both classes makes future changes harder.",
          "If Car and Bike are both true kinds of Vehicle, a Vehicle parent class can hold their common behaviour.",
        ],
      },
      {
        title: "Parent and Child",
        paragraphs: [
          "The parent class defines common state or behaviour. The child class extends it and represents a more specific type.",
          "Java commonly uses the words superclass and subclass. C++ often uses base class and derived class. These pairs describe the same direction of relationship.",
        ],
        points: [
          "Vehicle: parent, superclass, or base class.",
          "Car: child, subclass, or derived class.",
          "Car IS-A Vehicle, so a Car can be used where a Vehicle is expected when the design obeys the parent contract.",
        ],
        visual: {
          src: "/notes/oop/inheritance-hierarchy.png",
          alt: "UML-style hierarchy with Car and Bike inheriting from Vehicle and ElectricCar inheriting from Car, using hollow triangles that point to each parent.",
          width: 1536,
          height: 1024,
          caption:
            "In UML, the hollow inheritance triangle points from the child toward the parent.",
        },
      },
      {
        title: "What the Child Receives",
        paragraphs: [
          "A child object contains the parent part of its state and can use members inherited according to the language's access rules. It can also declare new fields, methods, and nested types.",
          "In Java, private parent members are not inherited by the child class, but private parent fields can still be part of the child object's parent state. The child cannot access them directly and must use an allowed parent method. Constructors are not inherited, although construction calls a parent constructor.",
        ],
      },
      {
        title: "Adding and Overriding Behaviour",
        paragraphs: [
          "A child can add behaviour that the parent does not have. It can also override an inherited instance method by providing a compatible implementation.",
          "At runtime, a call through a parent reference can run the actual child's overridden method. This is runtime polymorphism and is covered in detail in the next module.",
        ],
        points: [
          "Add: ElectricCar introduces charge().",
          "Override: ElectricCar provides its own start() behaviour.",
          "A Java overriding method cannot reduce the parent's access level.",
          "It may return a more specific compatible reference type, called a covariant return type.",
          "It cannot add broader checked exceptions than the overridden method allows.",
          "Use @Override in Java so the compiler can detect an accidental mismatch.",
          "Java static methods are hidden, not overridden.",
          "Java final methods cannot be overridden, and a final class cannot be extended.",
        ],
      },
      {
        title: "Inheritance Is More Than Code Reuse",
        paragraphs: [
          "Reuse alone is not a good reason for inheritance. The child should be a valid specialized form of the parent and should respect the behaviour promised by the parent.",
          "If a child changes the meaning of parent operations or cannot support them, the hierarchy is probably wrong. This idea leads to the Liskov Substitution Principle, covered later.",
        ],
      },
      {
        title: "Simple Analogy",
        paragraphs: [
          "Think of a general employee policy followed by every employee. A Developer is still an Employee and follows the common policy, but also has developer-specific responsibilities.",
          "The analogy works only while the specialized role can still be treated as an employee. Inheritance should follow the same rule.",
        ],
      },
      {
        title: "Benefits and Risks",
        table: {
          headers: ["Possible benefit", "Possible risk"],
          rows: [
            ["Shares common behaviour", "Creates tight parent-child coupling"],
            ["Supports substitutable types", "A parent change can affect many children"],
            ["Allows specialization", "Deep hierarchies become difficult to follow"],
            ["Removes some duplication", "Wrong IS-A relationships create fragile designs"],
          ],
        },
        paragraphs: [
          "Keep hierarchies shallow and based on a stable relationship. Prefer composition when an object only needs another object's service.",
        ],
      },
    ],
    mechanism: {
      title: "How a child object is created and used",
      steps: [
        "Memory is allocated, and Java instance fields first receive default values such as 0, false, or null.",
        "The constructor chain reaches the required parent constructor and initializes the parent part.",
        "The current class's field initializers and instance initializers run.",
        "The remaining child constructor body runs.",
        "A call to an overridden instance method selects the most specific implementation for the runtime object's class.",
      ],
    },
    example: {
      title: "Vehicle and ElectricCar in Java",
      body: "Car can be declared with 'class Car extends Vehicle'. ElectricCar can extend Car, call 'super(...)' from its constructor, mark its specialized start method with '@Override', and add charge(). The hierarchy is sensible only if every ElectricCar can still be treated as a Car and Vehicle.",
    },
    misconception:
      "Inheritance does not copy every parent member into the child source code. It creates a language-defined parent-child relationship with access, construction, and method-dispatch rules.",
  },
  revise: {
    definitionLabel: "Overview",
    compactDefinition: true,
    definition:
      "Inheritance lets a child class extend a parent class and represent a more specific type.",
    sections: [
      {
        title: "Terms",
        table: {
          headers: ["Parent", "Child"],
          rows: [
            ["Superclass or base class", "Subclass or derived class"],
            ["General type", "Specialized type"],
          ],
        },
      },
      {
        title: "Java Rules",
        points: [
          "Use extends for class inheritance.",
          "Private parent members are not directly accessible in the child.",
          "Constructors are not inherited, but construction chains to the parent.",
          "An override keeps the same contract, cannot reduce access, and follows checked-exception rules.",
          "Instance methods can be overridden; static methods are hidden.",
          "final prevents method overriding or class extension.",
        ],
      },
      {
        title: "Design Check",
        flow: ["Is the child truly a parent type?", "Can it respect the parent contract?", "Use inheritance only if both are true"],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Inheritance models an IS-A relationship.",
      "A child can add or override behaviour.",
      "Reuse alone does not justify inheritance.",
      "Deep hierarchies increase coupling and complexity.",
    ],
    followUp: "Why is code reuse alone a weak reason to use inheritance?",
  },
  lastMinute: {
    definition:
      "Inheritance creates a specialized child type from a parent type.",
    sections: [
      {
        title: "Flow",
        flow: ["Parent", "Child extends parent", "Child adds or overrides"],
        wide: true,
      },
      {
        title: "Java Traps",
        points: ["Private is not directly accessible", "Constructors are not inherited", "Static methods are hidden", "final blocks extension or overriding"],
      },
    ],
    memoryLine: "Inheritance = a true IS-A relationship, not only reused code.",
    cues: ["Parent is general", "Child is specialized", "Triangle points to parent in UML"],
    trap:
      "Do not say a child directly accesses every parent member; access modifiers still apply.",
  },
};

export const typesOfInheritance: SubjectTopic = {
  slug: "types-of-inheritance",
  title: "Types of Inheritance",
  description:
    "Understand single, multilevel, hierarchical, multiple, and hybrid inheritance across languages.",
  readTime: "11 min",
  difficulty: "Intermediate",
  tags: ["Hierarchy", "Multiple Inheritance", "Diamond"],
  learn: {
    opening:
      "Inheritance structures are named by how parent and child classes are connected. Language support differs, especially for multiple inheritance.",
    sections: [
      {
        title: "Single Inheritance",
        paragraphs: [
          "One child extends one direct parent. For example, Car extends Vehicle. Java and C++ both support this form.",
        ],
        flow: ["Vehicle", "Car"],
      },
      {
        title: "Multilevel Inheritance",
        paragraphs: [
          "A child becomes the parent of another class. For example, Vehicle is extended by Car, and Car is extended by ElectricCar.",
          "The lowest class inherits accessible members through the chain, subject to the language's rules. Very deep chains are difficult to understand and change.",
        ],
        flow: ["Vehicle", "Car", "ElectricCar"],
      },
      {
        title: "Hierarchical Inheritance",
        paragraphs: [
          "Several children extend the same parent. Car and Bike can both extend Vehicle while providing their own specialized behaviour.",
        ],
      },
      {
        title: "Multiple Inheritance",
        paragraphs: [
          "A class has more than one direct parent class. C++ supports multiple class inheritance. Java does not allow a class to extend more than one class.",
          "Java does allow one class to implement several interfaces. This provides multiple contracts without multiple class state and constructor chains.",
        ],
      },
      {
        title: "Hybrid Inheritance",
        paragraphs: [
          "Hybrid inheritance combines two or more inheritance shapes, such as hierarchical and multiple inheritance. It is a description of the overall structure, not a separate language feature.",
          "Whether a hybrid structure is possible depends on the language's class and interface rules.",
        ],
      },
      {
        title: "The C++ Diamond Problem",
        paragraphs: [
          "Suppose B and C both inherit from A, and D inherits from both B and C. Without virtual inheritance, D normally contains two separate A base subobjects, one through each path.",
          "This can make access to A members ambiguous and can duplicate A state. C++ virtual inheritance can make B and C share one A base subobject inside D.",
        ],
        visual: {
          src: "/notes/oop/cpp-diamond-problem.png",
          alt: "C++ diamond inheritance diagram where B and C inherit from A and D inherits from both B and C, creating two paths from D to A.",
          width: 1536,
          height: 1024,
          caption:
            "Without C++ virtual inheritance, D normally contains an A base subobject through both inheritance paths.",
        },
      },
      {
        title: "Java Interface Diamond",
        paragraphs: [
          "Java avoids multiple class inheritance, but unrelated interfaces can provide conflicting default methods. If no class method or more specific interface method resolves the conflict, the implementing class must override the method.",
          "This is a method-conflict problem, not duplicated parent object state like the C++ class diamond.",
        ],
      },
      {
        title: "Simple Analogy",
        paragraphs: [
          "A family tree can show one parent line, several generations, or several children from one parent. It helps visualize the shapes, but software inheritance is based on type contracts rather than biological family rules.",
        ],
      },
    ],
    mechanism: {
      title: "How to identify an inheritance type",
      steps: [
        "Draw every class as a separate node.",
        "Draw each child-to-parent inheritance line.",
        "One child and one parent is single inheritance.",
        "A chain is multilevel; siblings under one parent are hierarchical.",
        "More than one direct parent is multiple inheritance; combined shapes are hybrid.",
      ],
    },
    example: {
      title: "Java and C++ structures",
      body: "In Java, 'class SmartPrinter extends Machine implements Printable, Scannable' gives one superclass and several interface contracts. In a C++ diamond, B and C can use 'virtual public A', and D can inherit from B and C so D contains one shared virtual A base subobject.",
    },
    misconception:
      "Java does not support multiple inheritance of classes. Implementing several interfaces is multiple interface inheritance of type, not multiple class inheritance with several parent object states.",
  },
  revise: {
    definitionLabel: "Overview",
    compactDefinition: true,
    definition:
      "Inheritance types describe the shape made by parent-child class relationships.",
    sections: [
      {
        title: "Main Types",
        points: [
          "Single: one direct parent.",
          "Multilevel: parent-child chain.",
          "Hierarchical: several children share one parent.",
          "Multiple: one child has several direct parents.",
          "Hybrid: combination of inheritance shapes.",
        ],
      },
      {
        title: "Language Rules",
        table: {
          headers: ["Java", "C++"],
          rows: [
            ["Except Object, one direct superclass, explicit or implicit", "Several direct base classes allowed"],
            ["Several interfaces allowed", "Virtual inheritance prevents duplicate virtual-base subobjects"],
          ],
        },
      },
      {
        title: "Diamond Difference",
        points: [
          "C++ class diamond: possible duplicate base subobjects and ambiguous access.",
          "Java interface diamond: possible conflicting default methods.",
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Java has no multiple class inheritance.",
      "C++ supports multiple class inheritance.",
      "C++ virtual inheritance can provide one shared virtual base, but multiple inheritance can still be complex.",
      "Java requires an override only when interface default-method conflicts remain unresolved.",
    ],
    followUp: "How does Java's interface diamond differ from the C++ class diamond?",
  },
  lastMinute: {
    definition:
      "Single, multilevel, hierarchical, multiple, and hybrid describe inheritance shapes.",
    sections: [
      {
        title: "Types",
        points: ["Single: one parent", "Multilevel: chain", "Hierarchical: siblings", "Multiple: many parents", "Hybrid: combined shapes"],
      },
      {
        title: "Diamond",
        flow: ["A", "B and C", "D receives A by two paths"],
        wide: true,
      },
    ],
    memoryLine: "Java: one parent class, many interfaces. C++: multiple parent classes allowed.",
    cues: ["C++ solution: virtual inheritance", "Java conflict: override default method", "Hybrid is a combined shape"],
    trap:
      "Do not say Java supports multiple class inheritance because a class implements several interfaces.",
  },
};

export const isAAndHasA: SubjectTopic = {
  slug: "is-a-and-has-a",
  title: "IS-A and HAS-A Relationships",
  description:
    "Choose between inheritance and composition by testing the real relationship between types.",
  readTime: "10 min",
  difficulty: "Intermediate",
  tags: ["IS-A", "HAS-A", "Composition"],
  learn: {
    opening:
      "IS-A describes a subtype relationship and can come from class inheritance or interface implementation. HAS-A points to association, aggregation, or composition.",
    sections: [
      {
        title: "Why This Choice Matters",
        paragraphs: [
          "Two classes may share code without having the same type relationship. Choosing inheritance only to reuse code can create a child that does not behave like its parent.",
          "Before using extends, ask whether every child object can honestly be used wherever the parent type is expected.",
        ],
      },
      {
        title: "IS-A",
        paragraphs: [
          "IS-A describes specialization. A Dog IS-A Animal, and a SavingsAccount IS-A BankAccount when each child respects the parent contract.",
          "IS-A supports substitutability: code expecting the parent should be able to use the child without surprising broken behaviour.",
          "If a child must reject a normal parent operation, for example by throwing UnsupportedOperationException, check whether the hierarchy is wrong.",
        ],
        points: ["Car IS-A Vehicle", "Circle IS-A Shape", "Manager IS-A Employee"],
      },
      {
        title: "HAS-A",
        paragraphs: [
          "HAS-A broadly describes one object being linked to, grouping, or owning another object. A Car HAS-A Engine, and an Order HAS-A list of OrderItems.",
          "One object delegates work to the other instead of becoming that object's type. This is commonly represented with a field, but the exact relationship depends on ownership and lifecycle.",
        ],
        points: ["Car HAS-A Engine", "Computer HAS-A Keyboard", "Order HAS-A PaymentMethod"],
      },
      {
        title: "The Sentence Test",
        paragraphs: [
          "Use these questions before choosing inheritance only because two classes look similar.",
        ],
        table: {
          headers: ["Question", "Likely design"],
          rows: [
            ["Can I truthfully say Child IS-A Parent?", "Consider inheritance"],
            ["Does one object contain or use another?", "Consider composition or association"],
            ["Does the child obey every parent promise?", "Inheritance may be valid"],
            ["Do I only want to reuse some code?", "Prefer delegation or composition"],
          ],
        },
      },
      {
        title: "A Common Wrong Design",
        paragraphs: [
          "A Car should not extend Engine just because it needs engine behaviour. A Car is not an Engine; it has an Engine.",
          "With composition, Car can call engine.start() and can later use a different Engine implementation without changing what a Car is.",
        ],
      },
      {
        title: "Composition Over Inheritance",
        paragraphs: [
          "This guideline means: prefer assembling behaviour from contained objects when a true, stable IS-A relationship is missing. It does not mean inheritance is always bad.",
          "Composition is often more flexible because the collaborating object can be changed, configured, or replaced with a test implementation. Inheritance is useful when the type relationship and contract are genuine.",
        ],
      },
      {
        title: "Simple Analogy",
        paragraphs: [
          "A chef IS-A employee, but a chef HAS-A knife. Making Chef extend Knife would be wrong even if the chef needs knife-related work.",
          "The grammar is not a complete proof, but it quickly exposes many incorrect hierarchies.",
        ],
      },
    ],
    mechanism: {
      title: "Choosing the relationship",
      steps: [
        "Write the proposed types as a sentence.",
        "Check whether the child is truly a specialized parent.",
        "Check whether it can respect every important parent behaviour.",
        "If not, check whether one object simply has or uses the other.",
        "Choose inheritance for valid substitutability; otherwise prefer composition or association.",
      ],
    },
    example: {
      title: "Payment behaviour",
      body: "An Order is not a CardPayment. It is associated with a PaymentMethod and delegates payment work to it. Keeping PaymentMethod as a field lets the Order work with card, UPI, or wallet payment without changing the Order's type.",
    },
    misconception:
      "The words IS-A and HAS-A are useful checks, not automatic proof. The behaviour contract and object lifetime must also match the design.",
  },
  revise: {
    definitionLabel: "Overview",
    compactDefinition: true,
    definition:
      "IS-A models a subtype through inheritance or interface implementation; HAS-A models association, aggregation, or composition.",
    sections: [
      {
        title: "Compare",
        table: {
          headers: ["IS-A", "HAS-A"],
          rows: [
            ["Inheritance or interface implementation", "Association, aggregation, or composition"],
            ["Car IS-A Vehicle", "Car HAS-A Engine"],
            ["Child must respect parent contract", "Container delegates to another object"],
          ],
        },
      },
      {
        title: "Decision",
        flow: ["True specialization?", "Substitutable?", "Use inheritance", "Otherwise use composition or association"],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Reuse alone is not an IS-A relationship.",
      "Composition delegates work to a contained object.",
      "Prefer composition when behaviour must be replaceable.",
      "Use inheritance when the child is genuinely a parent type.",
    ],
    followUp: "Why should Car contain Engine instead of extending Engine?",
  },
  lastMinute: {
    definition:
      "IS-A = subtype. HAS-A = association, aggregation, or composition.",
    sections: [
      { title: "Test", flow: ["Say the relationship", "Check substitutability", "Choose IS-A or HAS-A"], wide: true },
    ],
    memoryLine: "Car IS-A Vehicle; Car HAS-A Engine.",
    cues: ["Inheritance changes type", "Composition delegates", "Prefer flexibility when IS-A is weak"],
    trap:
      "Do not use inheritance only because two classes share some code.",
  },
};

export const objectRelationships: SubjectTopic = {
  slug: "association-aggregation-and-composition",
  title: "Association, Aggregation, and Composition",
  description:
    "Compare general object links, shared parts, and strongly owned parts using lifecycle and ownership.",
  readTime: "12 min",
  difficulty: "Intermediate",
  tags: ["Association", "Aggregation", "Composition"],
  learn: {
    opening:
      "Association is a general connection. Aggregation and composition are whole-part associations with different ownership strength.",
    sections: [
      {
        title: "Why Relationships Need Names",
        paragraphs: [
          "Objects rarely work alone. A Doctor treats Patients, a Team groups Players, and an Order owns OrderLines.",
          "The relationship name tells us whether objects merely know one another or whether one object is responsible for a part's lifecycle.",
        ],
      },
      {
        title: "Association",
        paragraphs: [
          "Association is a structural relationship in which objects keep a meaningful link with each other. Neither side automatically owns the other.",
          "A Doctor and Patient can exist independently while the system records their connection. If one object only receives another temporarily, such as through a method parameter, that may be a dependency instead of an association.",
        ],
      },
      {
        title: "Aggregation",
        paragraphs: [
          "Aggregation is a weak whole-part relationship. The parts usually have an independent lifecycle, but the system must define whether they can be shared or moved.",
          "A Team may aggregate Players when the model treats players as independent objects. Removing the Team then does not mean the Player objects stop existing.",
        ],
      },
      {
        title: "Composition",
        paragraphs: [
          "Composition is a strong whole-part relationship. The whole is responsible for the part's logical lifecycle, and a composite part belongs to at most one composite whole at a time.",
          "An Order may compose OrderLines. An OrderLine has meaning as part of its Order, and deleting the Order normally removes its lines from the model. A model may allow a part to be detached or transferred before deletion, so the lifecycle rule should be stated clearly.",
        ],
      },
      {
        title: "Visual Comparison",
        paragraphs: [
          "UML uses a plain line for association, a hollow diamond at the whole for aggregation, and a filled diamond at the whole for composition.",
        ],
        visual: {
          src: "/notes/oop/object-relationships.png",
          alt: "UML comparison of Doctor and Patient association, Team and Player aggregation with a hollow diamond at Team, and House and Room composition with a filled diamond at House.",
          width: 1536,
          height: 1024,
          caption:
            "The diamond is placed at the whole: hollow for aggregation and filled for composition.",
        },
      },
      {
        title: "Compare Ownership and Lifetime",
        paragraphs: [
          "Aggregation and composition are specialized whole-part associations. Composition adds stronger lifecycle responsibility than shared aggregation.",
        ],
        dataTable: {
          headers: ["Relationship", "Ownership", "Part independent?", "UML"],
          rows: [
            ["Association", "No whole-part ownership required", "Yes", "Plain line"],
            ["Aggregation", "Weak or shared whole-part", "Usually; model defines the rule", "Hollow diamond at whole"],
            ["Composition", "Strong lifecycle responsibility", "At most one composite owner at a time", "Filled diamond at whole"],
          ],
        },
      },
      {
        title: "Lifecycle Does Not Always Mean Memory",
        paragraphs: [
          "In garbage-collected languages, removing a whole does not instantly destroy part objects in memory if something else still references them. Composition describes model ownership and lifecycle responsibility, not a promise about the exact moment memory is freed.",
          "The code must enforce the intended relationship. Drawing a filled diamond does not automatically create ownership behaviour.",
        ],
      },
      {
        title: "Multiplicity and Direction",
        paragraphs: [
          "UML can also show how many objects participate, such as one Order containing many OrderLines. Navigability can show which object knows about the other.",
          "These details are separate from whether the relationship is association, aggregation, or composition.",
        ],
        points: ["1 means exactly one", "0..1 means zero or one", "* or 0..* means zero or more", "1..* means one or more"],
      },
      {
        title: "Simple Analogy",
        paragraphs: [
          "A teacher knows a student: association. A playlist groups songs that still exist outside it: aggregation. A completed order owns its order lines: composition.",
          "Real-world examples depend on the model. The same nouns can have different relationships in a different system.",
        ],
      },
    ],
    mechanism: {
      title: "How to classify an object relationship",
      steps: [
        "Check whether the objects only know or use each other.",
        "If there is a whole-part meaning, ask whether the part exists independently.",
        "Independent or shareable parts suggest aggregation.",
        "A part whose logical lifecycle belongs to one whole suggests composition.",
        "Record multiplicity and navigation separately when the design needs them.",
      ],
    },
    example: {
      title: "University model",
      body: "A Professor is associated with Students, a Department aggregates Professors who can move departments, and a CourseOffering may compose Section records that exist only inside that offering. The exact choice depends on the system's lifecycle rules.",
    },
    misconception:
      "Aggregation and composition are not decided only by words such as has. The model's ownership, sharing, and lifecycle rules decide the relationship; a temporary use may be only a dependency.",
  },
  revise: {
    definitionLabel: "Overview",
    compactDefinition: true,
    definition:
      "Association is a general link; aggregation is a weak whole-part link; composition is strong whole-part ownership.",
    sections: [
      {
        title: "Compare",
        dataTable: {
          headers: ["Type", "Meaning", "Lifecycle", "UML"],
          rows: [
            ["Association", "Structural link", "No ownership required", "Plain line"],
            ["Aggregation", "Weak whole-part", "Part usually independent", "Hollow diamond"],
            ["Composition", "Strong whole-part", "Whole controls logical lifecycle", "Filled diamond"],
          ],
        },
      },
      {
        title: "UML Rule",
        points: ["The diamond touches the whole.", "Hollow means aggregation.", "Filled means composition.", "* means zero or more.", "Multiplicity is a separate detail."],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Association does not require ownership.",
      "Aggregated parts usually have an independent lifecycle; exact rules depend on the model.",
      "A composed part belongs to at most one composite whole at a time.",
      "Temporary use may be a dependency rather than an association.",
      "Composition describes model lifecycle, not exact memory-deallocation time.",
    ],
    followUp: "Why is a playlist and song usually aggregation rather than composition?",
  },
  lastMinute: {
    definition:
      "Association links; aggregation groups; composition owns.",
    sections: [
      {
        title: "Strength",
        flow: ["Association", "Aggregation", "Composition"],
        wide: true,
      },
      {
        title: "Symbols",
        points: ["Association: line", "Aggregation: hollow diamond", "Composition: filled diamond", "Diamond stays at whole"],
      },
    ],
    memoryLine: "Know → group → own.",
    cues: ["Doctor-Patient", "Team-Player", "Order-OrderLine"],
    trap:
      "Do not define composition as immediate memory destruction; it describes ownership in the model.",
  },
};
