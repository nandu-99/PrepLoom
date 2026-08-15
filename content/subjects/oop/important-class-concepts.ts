import type { SubjectTopic } from "@/lib/subject-content";

export const thisSuperAndObjectContext: SubjectTopic = {
  slug: "this-super-and-object-context",
  title: "this, super, and Object Context",
  description:
    "Understand the current object, the parent part, and how member names are resolved.",
  readTime: "12 min",
  difficulty: "Intermediate",
  tags: ["this", "super", "Object Context"],
  learn: {
    opening:
      "In Java, this refers to the current object. super refers to the parent part of that same object.",
    sections: [
      {
        title: "Why Object Context Matters",
        paragraphs: [
          "When an instance method runs, it runs for one particular object. That object supplies the instance fields and other instance methods used by the call.",
          "Java makes this current-object reference available as this. It helps us say clearly which object's member we mean.",
        ],
      },
      {
        title: "Using this",
        paragraphs: [
          "Use this.member to access a member of the current object. It is especially useful when a parameter has the same name as a field.",
        ],
        points: [
          "this.name = name assigns the parameter name to the current object's field.",
          "this.calculateTotal() explicitly calls another instance method on the same object.",
          "A method may return this to support controlled method chaining.",
          "this cannot be used in a Java static context because no current instance is supplied.",
        ],
      },
      {
        title: "Using super",
        paragraphs: [
          "Use super to refer to accessible members of the direct parent class. It is useful when a child has overridden a method or hidden a field but still needs the parent implementation.",
        ],
        points: [
          "super.start() calls the direct parent's implementation of start().",
          "super.name accesses an accessible parent field hidden by a child field.",
          "super cannot bypass private access; a private parent member is still inaccessible to the child.",
          "super cannot be used in a Java static context.",
        ],
      },
      {
        title: "Constructor Chaining",
        paragraphs: [
          "A constructor can delegate to another constructor in the same class with this(...), or invoke a direct parent constructor with super(...). A constructor cannot perform both as its explicit constructor invocation.",
          "In older Java versions, this(...) or super(...) had to be the first constructor statement. Java 25 and later allow a restricted prologue before it, but that code cannot use the object being constructed before the parent constructor has run.",
        ],
        points: [
          "this(...) reduces repeated setup between constructors in one class.",
          "super(...) supplies the data required by the parent constructor.",
          "If no explicit constructor invocation is written, Java normally inserts super().",
          "Construction fails to compile if that inserted super() cannot reach a matching no-argument parent constructor.",
        ],
      },
      {
        title: "One Object, Two Views",
        paragraphs: [
          "this and super do not represent two separate objects. They provide two ways to select behaviour or state within one child object.",
        ],
        visual: {
          src: "/notes/oop/this-vs-super.png",
          alt: "One child object shown with this selecting the current class members and super selecting accessible direct-parent members.",
          width: 1536,
          height: 1024,
          caption:
            "this selects the current-object view; super selects the accessible direct-parent view.",
        },
      },
      {
        title: "Java and C++ Difference",
        paragraphs: [
          "In Java, this is a reference-like expression and super is a keyword for the direct parent view.",
          "In C++, this is a pointer to the current object. C++ has no super keyword; code normally qualifies a base member with a base-class name, such as Base::start().",
        ],
      },
      {
        title: "Simple Analogy",
        paragraphs: [
          "Imagine a manager who is also an employee. Saying this means the complete current manager object. Saying super means use the employee-level rule inherited from the parent role.",
          "It is still one person, viewed through two levels of responsibility.",
        ],
      },
    ],
    mechanism: {
      title: "Resolving a member inside a Java object",
      steps: [
        "Use this.member when you mean the current object's member.",
        "If a local variable or parameter has the same name, this.member selects the field.",
        "Use super.member when an accessible direct-parent member is intentionally required.",
        "For constructors, use this(...) for same-class delegation or super(...) for parent construction.",
        "Remember that neither this nor super is available without an instance context.",
      ],
    },
    example: {
      title: "Employee and Manager",
      body: "Manager can store its own bonus with 'this.bonus = bonus'. If Manager overrides describe(), it can call super.describe() and then add manager-specific details. Both calls work on the same Manager object.",
    },
    misconception:
      "super is not a separate parent object stored beside the child. It is a Java expression that selects accessible direct-parent members of the current object.",
  },
  revise: {
    definitionLabel: "Overview",
    compactDefinition: true,
    definition:
      "this refers to the current object; super selects accessible members and constructors from its direct parent class.",
    sections: [
      {
        title: "Compare",
        table: {
          headers: ["this", "super"],
          rows: [
            ["Current-object view", "Direct-parent view"],
            ["this.field or this.method()", "super.field or super.method()"],
            [
              "this(...) delegates in same class",
              "super(...) invokes parent constructor",
            ],
          ],
        },
      },
      {
        title: "Java Rules",
        points: [
          "Neither keyword is available in a static context.",
          "super cannot access private parent members.",
          "Only one explicit constructor invocation can be used.",
          "Java 25+ permits a restricted safe prologue before constructor invocation.",
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "this.field resolves field-parameter name clashes.",
      "super.method() deliberately calls the direct-parent implementation.",
      "this and super still operate on one object.",
      "C++ uses this as a pointer and Base::member instead of super.",
    ],
    followUp: "Why can this not be used inside a static method?",
  },
  lastMinute: {
    definition: "this = current object; super = accessible direct-parent view.",
    sections: [
      {
        title: "Uses",
        points: [
          "this.field: current field",
          "this(...): same-class constructor",
          "super.method(): parent implementation",
          "super(...): parent constructor",
        ],
      },
    ],
    memoryLine: "One object, two views: this is current; super is parent.",
    cues: ["No static context", "No private bypass", "Constructor chaining"],
    trap: "Do not describe super as a separate object or as a way to access private parent members.",
  },
};

export const staticVsInstanceMembers: SubjectTopic = {
  slug: "static-vs-instance-members",
  title: "Static vs Instance Members",
  description:
    "Separate per-object state and behaviour from members shared through the class.",
  readTime: "12 min",
  difficulty: "Intermediate",
  tags: ["static", "Instance", "Class Members"],
  learn: {
    opening:
      "An instance member belongs to an object. A static member belongs to the class rather than to one particular object.",
    sections: [
      {
        title: "Instance Members",
        paragraphs: [
          "Each object has its own instance-field values. Instance methods run with a current object and can directly use both instance and static members.",
        ],
        points: [
          "Each BankAccount object has its own balance.",
          "account.deposit(500) changes that particular account.",
          "An instance method can use this because it receives an object context.",
        ],
      },
      {
        title: "Static Members",
        paragraphs: [
          "A static field represents class-level state shared by that class's objects in the same class-loading context. A static method can be called without creating an object.",
          "Use the class name, such as BankAccount.getAccountCount(), to make class ownership clear. Java allows some static access through an object expression, but that style is misleading and should be avoided.",
        ],
        points: [
          "A static counter can track how many accounts were created.",
          "A static factory method can create and return an object.",
          "A static constant can represent one class-wide fixed value.",
        ],
      },
      {
        title: "What a Static Method Can Access",
        paragraphs: [
          "A static method has no automatic current object, so it cannot directly use this, super, or an instance member.",
          "It may still use instance members through an explicit object reference passed to it or created inside it.",
        ],
        table: {
          headers: ["Instance method", "Static method"],
          rows: [
            [
              "Directly uses instance and static members",
              "Directly uses only static members",
            ],
            ["Has this object context", "Has no this object context"],
            [
              "Usually called through an object",
              "Prefer calling through the class",
            ],
          ],
        },
      },
      {
        title: "Shared vs Per Object",
        paragraphs: [
          "The important question is whether the value describes one object or the class as a whole.",
        ],
        visual: {
          src: "/notes/oop/static-vs-instance.png",
          alt: "Three BankAccount objects each have a separate balance while all share one static account count through the class.",
          width: 1536,
          height: 1024,
          caption:
            "Instance balance is per object; static accountCount is shared at class level.",
        },
      },
      {
        title: "Static Methods and Inheritance",
        paragraphs: [
          "In Java, a child can inherit an accessible static method, but a same-signature child static method hides it rather than overrides it. The selected static method follows the compile-time type or the class name used in the call.",
          "Static methods do not participate in runtime polymorphic dispatch.",
        ],
      },
      {
        title: "Nested Class Note",
        paragraphs: [
          "A Java static nested class does not need an instance of its enclosing class. A non-static inner class is connected to an enclosing instance.",
          "Static nested does not mean every member inside that nested class must also be static; its objects can still have normal instance members.",
        ],
      },
      {
        title: "Risks of Mutable Static State",
        paragraphs: [
          "Mutable static fields act like shared global state. Many objects or threads may change the same value, making tests, reasoning, and concurrency harder.",
          "Use class-wide mutable state only when the ownership and synchronization rules are clear.",
        ],
      },
      {
        title: "Simple Analogy",
        paragraphs: [
          "Every student has an individual roll number and marks: instance data. The school has one official name shared by all students: class-level data.",
          "Changing one student's marks should not change every student's marks, but changing the school name affects the shared value.",
        ],
      },
    ],
    mechanism: {
      title: "Choosing static or instance",
      steps: [
        "Ask whether the value or operation needs one particular object.",
        "If it describes each object separately, use an instance member.",
        "If it belongs to the class-wide concept, consider a static member.",
        "Call static members through the class name for clarity.",
        "Avoid mutable static state unless its lifecycle and concurrency are controlled.",
      ],
    },
    example: {
      title: "Bank accounts",
      body: "Every BankAccount has its own instance balance. BankAccount can keep one private static accountCount that its constructors increment. getBalance() needs an account object, while BankAccount.getAccountCount() does not.",
    },
    misconception:
      "static does not mean constant, private, or automatically thread-safe. It means the member is associated with the class instead of one object.",
  },
  revise: {
    definitionLabel: "Overview",
    compactDefinition: true,
    definition:
      "Instance members are per object; static members are associated with the class.",
    sections: [
      {
        title: "Compare",
        table: {
          headers: ["Instance", "Static"],
          rows: [
            [
              "One value per object",
              "One class-level value per loading context",
            ],
            ["Has object context", "No automatic object context"],
            [
              "Can directly use instance state",
              "Needs an object reference for instance state",
            ],
          ],
        },
      },
      {
        title: "Java Rules",
        points: [
          "Prefer ClassName.member for static access.",
          "A static method cannot directly use this or super.",
          "Static methods are hidden, not overridden.",
          "A static nested class needs no enclosing instance.",
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Use instance state for object-specific values.",
      "Use static only for a genuine class-level responsibility.",
      "static and final are different ideas.",
      "Mutable static state may require synchronization.",
    ],
    followUp: "Why can a static method not directly read an instance field?",
  },
  lastMinute: {
    definition: "Instance = per object. Static = class level.",
    sections: [
      {
        title: "Fast Compare",
        points: [
          "Instance method: has this",
          "Static method: no this",
          "Static call: prefer ClassName.method()",
          "Static child method: hiding, not overriding",
        ],
      },
    ],
    memoryLine: "Object-specific? Instance. Class-wide? Consider static.",
    cues: [
      "balance: instance",
      "accountCount: static",
      "Shared state needs care",
    ],
    trap: "Do not say every static field is immutable or safe for concurrent access.",
  },
};

export const identityEqualityAndCopying: SubjectTopic = {
  slug: "identity-equality-and-copying",
  title: "Identity, Equality, and Copying",
  description:
    "Tell apart the same object, equal values, aliases, shallow copies, and deep copies.",
  readTime: "15 min",
  difficulty: "Intermediate",
  tags: ["Identity", "Equality", "Copying"],
  learn: {
    opening:
      "Identity asks whether two references reach the same object. Equality asks whether two objects should count as equal by value or meaning.",
    sections: [
      {
        title: "Identity in Java",
        paragraphs: [
          "For reference values, Java's == operator checks whether two references are both null or refer to the same object. It does not normally compare the objects' contents.",
          "For primitive values, == compares the primitive values themselves. This difference is important in interview questions.",
        ],
      },
      {
        title: "Logical Equality",
        paragraphs: [
          "The equals method expresses logical equality. Two different Money objects may be equal when they have the same amount and currency.",
          "Object.equals uses identity by default. A class that needs value equality must override equals correctly.",
        ],
        points: [
          "Reflexive: x equals itself.",
          "Symmetric: if x equals y, y equals x.",
          "Transitive: if x equals y and y equals z, x equals z.",
          "Consistent: unchanged objects give the same result repeatedly.",
          "For every non-null x, x.equals(null) is false.",
        ],
      },
      {
        title: "equals and hashCode",
        paragraphs: [
          "Equal Java objects must produce the same hashCode. Unequal objects may still have the same hash code, called a collision.",
          "HashMap and HashSet use both hashCode and equals. If equals is overridden without a matching hashCode, logically equal keys can behave incorrectly in hash-based collections.",
        ],
      },
      {
        title: "Assignment Is Not a Copy",
        paragraphs: [
          "In Java, assigning one object reference to another variable copies the reference value, not the object. Both variables then refer to the same object; this is aliasing.",
          "A change made through either alias is visible through the other because there is still only one mutable object.",
        ],
      },
      {
        title: "Shallow and Deep Copy",
        paragraphs: [
          "A shallow copy creates a new outer object but keeps references to the same nested mutable objects. Changing shared nested state can therefore affect both outer objects.",
          "A deep copy also copies the required nested mutable state. What counts as deep depends on the object graph and design; shared immutable objects normally do not need copying.",
        ],
        visual: {
          src: "/notes/oop/identity-and-copying.png",
          alt: "Comparison of aliasing with one shared object, shallow copying with separate outer objects sharing a nested address, and deep copying with separate outer and nested objects.",
          width: 1536,
          height: 1024,
          caption:
            "Reference assignment aliases; shallow copy shares nested state; deep copy separates required mutable state.",
        },
      },
      {
        title: "Ways to Copy Safely",
        paragraphs: [
          "Java has no universal automatic deep-copy operation. A class can provide a copy constructor, a static copy factory, or a domain-specific copy method.",
          "Object.clone performs a field-by-field shallow copy when cloning is supported. A class must explicitly copy required nested mutable objects, and many designs prefer clearer copy constructors or factories.",
        ],
      },
      {
        title: "Common Java Traps",
        paragraphs: [
          "These cases often look correct in small examples but fail when identity, mutability, or hashing changes.",
        ],
        points: [
          "Use equals for String contents; == checks String reference identity even though string interning can sometimes make == appear to work.",
          "Arrays inherit identity-based equals from Object; use Arrays.equals for element comparison and Arrays.deepEquals for suitable nested arrays.",
          "If fields used by equals or hashCode change while an object is a HashSet element or HashMap key, lookup may fail.",
        ],
      },
      {
        title: "Java and C++ Difference",
        paragraphs: [
          "Java variables of class type normally hold references, so assignment aliases the object. C++ object variables commonly have value semantics, so ordinary copy construction or copy assignment creates or updates a separate object according to that type's copy operations.",
          "C++ pointers and references can still alias, and a compiler-generated C++ copy is member-wise, which may be shallow for pointer-owning designs. Always follow the language and type's ownership rules.",
        ],
      },
      {
        title: "Simple Analogy",
        paragraphs: [
          "Two people can hold the same house key: two references, one house, so identity is the same. Two separate houses can have the same design: different identity but equal features.",
          "Photocopying only a folder cover while sharing the original papers is shallow copying. Copying the required papers too is a deeper copy.",
        ],
      },
    ],
    mechanism: {
      title: "Choosing the correct comparison or copy",
      steps: [
        "Ask whether you need the exact same object or the same logical value.",
        "Use Java reference == only for identity checks; use a correct equals for logical equality.",
        "Keep equals and hashCode consistent for hash-based collections.",
        "Decide whether aliasing is intended before assigning a mutable reference.",
        "When copying, identify which nested mutable objects must also be independent.",
      ],
    },
    example: {
      title: "Customer addresses",
      body: "Two Customer references may point to the same Customer object, which is aliasing. A shallow Customer copy may still share one mutable Address. A deep-enough copy for this model creates a new Customer and a new Address, while safely sharing immutable values such as Strings.",
    },
    misconception:
      "A new reference variable is not a new object, and a new outer object is not automatically a deep copy of its complete object graph.",
  },
  revise: {
    definitionLabel: "Overview",
    compactDefinition: true,
    definition:
      "Identity means the same object; equality means the same logical value; copying decides which object state remains shared.",
    sections: [
      {
        title: "Compare",
        dataTable: {
          headers: ["Concept", "Objects created", "Nested mutable state"],
          rows: [
            ["Reference assignment", "No new object", "Everything shared"],
            ["Shallow copy", "New outer object", "References still shared"],
            [
              "Deep copy",
              "New required mutable objects",
              "Required state independent",
            ],
          ],
        },
      },
      {
        title: "Java Equality",
        points: [
          "Reference == checks identity.",
          "equals checks logical equality when correctly overridden.",
          "Equal objects must have equal hash codes.",
          "Unequal objects may share a hash code.",
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Object.equals is identity-based unless overridden.",
      "Reference assignment creates an alias, not an object copy.",
      "Deep copy depth depends on the model.",
      "Java clone is not an automatic universal deep copy.",
      "Java reference assignment and C++ value copying behave differently.",
    ],
    followUp:
      "Why can a shallow copy still change when the original object's address changes?",
  },
  lastMinute: {
    definition:
      "Identity = same object. Equality = same meaning. Copying = decide what stays shared.",
    sections: [
      {
        title: "Java Checks",
        points: [
          "Reference ==: identity",
          "equals: logical value",
          "Equal objects: same hashCode",
          "String content: use equals",
        ],
      },
      {
        title: "Copying",
        flow: [
          "Assignment: alias",
          "Shallow: new outer",
          "Deep: copy required mutable state",
        ],
        wide: true,
      },
    ],
    memoryLine:
      "Same reference, same value, or separate state? Ask which one you need.",
    cues: [
      "Aliasing shares all",
      "Shallow shares nested",
      "Deep follows the model",
    ],
    trap: "Do not use == for Java String content or assume assignment copies an object.",
  },
};

export const immutability: SubjectTopic = {
  slug: "immutability",
  title: "Immutability",
  description:
    "Create objects whose observable state cannot change after construction.",
  readTime: "13 min",
  difficulty: "Intermediate",
  tags: ["Immutability", "Defensive Copy", "Value Objects"],
  learn: {
    opening:
      "An immutable object cannot change its observable state after it has been created.",
    sections: [
      {
        title: "Why Immutability Helps",
        paragraphs: [
          "Mutable objects can change through any alias that has permission to modify them. This makes behaviour harder to predict when an object is shared.",
          "An immutable value stays stable, so it is easier to reason about, share, cache, and use as a key in a hash-based collection.",
        ],
      },
      {
        title: "Common Java Design Steps",
        paragraphs: [
          "The following steps are common ways to build an immutable class. The real requirement is that callers cannot observe its state changing after construction.",
        ],
        points: [
          "Make fields private and normally final.",
          "Initialize and validate all required state during construction.",
          "Provide no mutating setters or methods.",
          "Prevent unsafe subclass changes, often with a final class or controlled constructors.",
          "Defensively copy mutable inputs and outputs.",
          "Return a new object when an operation represents a changed value.",
        ],
      },
      {
        title: "final Is Not Enough",
        paragraphs: [
          "A final reference cannot be reassigned after initialization, but the object it refers to may still be mutable.",
          "For example, a private final List field can still change if the class stores a caller's mutable list or returns that internal list directly.",
        ],
      },
      {
        title: "Defensive Copying",
        paragraphs: [
          "When a constructor receives mutable data, copy the required data before storing it. When a method returns internal data, return an immutable snapshot, read-only result, or defensive copy that cannot modify the object.",
          "An unmodifiable view is not always an immutable snapshot. If another alias changes the underlying collection, the view may show that change.",
        ],
      },
      {
        title: "Shallow and Deep Immutability",
        paragraphs: [
          "Shallow immutability prevents changing the object's own field references but may still expose mutable nested objects. Deep immutability also prevents observable changes through the reachable state that represents the value.",
          "Immutable nested values can be shared safely. Mutable nested values require copying or a carefully controlled boundary.",
        ],
      },
      {
        title: "Operations Return New Values",
        paragraphs: [
          "An immutable object does not update itself. An operation that represents a change returns a new value and leaves the original unchanged.",
        ],
        flow: [
          "Original value",
          "Operation",
          "New value",
          "Original unchanged",
        ],
      },
      {
        title: "Thread-Safety Qualification",
        paragraphs: [
          "Deeply immutable state is naturally safe from data races caused by later mutation. The object must still be constructed and published safely so other threads see a fully initialized value.",
          "Immutability does not automatically make external operations, mutable collaborators, or lazy caches thread-safe.",
        ],
      },
      {
        title: "Common Java Examples and Traps",
        paragraphs: [
          "Familiar Java types show why final fields, records, and read-only wrappers must not be confused with deep immutability.",
        ],
        points: [
          "String and LocalDate are immutable: operations return new values.",
          "A record is not automatically deeply immutable; a record component may refer to a mutable object.",
          "Collections.unmodifiableList blocks changes through that view but may reflect changes made through another alias.",
          "Mutable fields used in equals or hashCode are risky when objects become HashMap keys or HashSet elements.",
        ],
      },
      {
        title: "When Mutation May Be Better",
        paragraphs: [
          "Immutability can create extra objects when a large value changes repeatedly. A controlled mutable object or builder may be clearer and more efficient during construction.",
          "Choose based on ownership and usage. The goal is predictable state, not making every class immutable at any cost.",
        ],
      },
      {
        title: "Simple Analogy",
        paragraphs: [
          "Think of a printed train ticket. Changing the journey does not edit the printed ticket; a new ticket is issued while the old one remains unchanged.",
          "An immutable object follows the same idea: a changed value is represented by another object.",
        ],
      },
    ],
    mechanism: {
      title: "Creating an immutable Java value",
      steps: [
        "Validate all required constructor inputs.",
        "Copy mutable input state before storing it.",
        "Keep representation fields private and controlled.",
        "Expose no operation that mutates observable state.",
        "Return new values for changes and protect mutable output state.",
      ],
    },
    example: {
      title: "Immutable Money",
      body: "Money stores a final amount and immutable currency value. add(other) validates the currency and returns a new Money result instead of changing either input. Because its equality fields never change, Money is stable as a value and collection key.",
    },
    misconception:
      "A class is not immutable only because its fields are private and final. Mutable objects reachable through those fields must also be protected from observable change.",
  },
  revise: {
    definitionLabel: "Overview",
    compactDefinition: true,
    definition:
      "An immutable object cannot change its observable state after construction.",
    sections: [
      {
        title: "Java Checklist",
        points: [
          "Private, normally final fields.",
          "Valid state created in constructor.",
          "No mutating operations.",
          "Defensive copies for mutable input and output.",
          "Prevent unsafe subclass mutation.",
          "Return new values for changes.",
        ],
      },
      {
        title: "Important Differences",
        table: {
          headers: ["Looks safe", "Actual rule"],
          rows: [
            ["final reference", "Referenced object may still mutate"],
            ["Unmodifiable view", "Underlying object may still change"],
            ["Java record", "May contain mutable components"],
          ],
        },
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Protect the complete observable value, not only field references.",
      "Immutable nested objects may be shared.",
      "Deep immutability reduces mutation-related concurrency problems.",
      "Safe construction and publication still matter.",
      "Builders can provide controlled mutation during construction.",
    ],
    followUp: "Why is a private final List field not automatically immutable?",
  },
  lastMinute: {
    definition:
      "Immutable = observable state never changes after construction.",
    sections: [
      {
        title: "Flow",
        flow: [
          "Validate",
          "Copy mutable input",
          "Store safely",
          "Return new value for change",
        ],
        wide: true,
      },
      {
        title: "Traps",
        points: [
          "final reference ≠ immutable object",
          "Unmodifiable view ≠ immutable snapshot",
          "record ≠ deep immutability",
          "Protect mutable nested state",
        ],
      },
    ],
    memoryLine: "No observable mutation; changes create new values.",
    cues: ["Defensive copy", "No setters", "Safe sharing", "Stable hash key"],
    trap: "Do not call a class immutable while callers can mutate an internal list, date, array, or other nested object.",
  },
};
