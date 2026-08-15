import type { SubjectTopic } from "@/lib/subject-content";

export const encapsulation: SubjectTopic = {
  slug: "encapsulation",
  title: "Encapsulation",
  description:
    "Learn how an object protects its data and allows changes through controlled methods.",
  readTime: "10 min",
  difficulty: "Foundation",
  tags: ["Encapsulation", "Data Hiding", "Invariants"],
  learn: {
    opening:
      "Encapsulation keeps related data and methods together and controls how code outside the object can use that data.",
    sections: [
      {
        title: "Start With a Bank Account",
        paragraphs: [
          "A BankAccount object stores a balance. If every part of the program can change balance directly, one line could set it to a negative value or replace it by mistake.",
          "The account needs a safe boundary. Other code should request deposit or withdrawal operations, and the account should decide whether each request is valid.",
        ],
      },
      {
        title: "What Encapsulation Means",
        paragraphs: [
          "Encapsulation places related data and the methods that use it inside one class. It also limits direct access to the internal data.",
          "The object exposes a small public interface, such as deposit, withdraw, and getBalance. Its balance and validation rules remain controlled inside the class.",
        ],
        points: [
          "Keep related data and behaviour in one unit.",
          "Hide internal data that should not be changed freely.",
          "Provide controlled methods for valid operations.",
          "Keep the object in a valid state.",
        ],
        visual: {
          src: "/notes/oop/encapsulation-boundary.png",
          alt: "Diagram showing a BankAccount with a private balance protected behind deposit, withdraw, and getBalance methods while direct balance changes are blocked.",
          width: 1536,
          height: 1024,
          caption:
            "The BankAccount controls its balance through methods instead of allowing direct changes.",
        },
      },
      {
        title: "A Valid State and Its Rules",
        paragraphs: [
          "An invariant is a rule that should remain true while an object is valid. For a BankAccount, one rule may be that the balance cannot go below the allowed limit.",
          "Because all balance changes pass through deposit and withdraw, those methods can enforce the rule in one place.",
        ],
        points: [
          "deposit rejects a negative amount.",
          "withdraw checks whether enough money is available.",
          "getBalance returns the balance without allowing the caller to replace it.",
        ],
      },
      {
        title: "Encapsulation Is More Than Private Fields",
        paragraphs: [
          "Making every field private is a useful starting point, but it is not enough by itself. A class is well encapsulated only when its public methods protect meaningful rules.",
          "A setter that accepts every possible value can expose the same problem under a different name. For example, setBalance(-5000) still allows invalid state if it performs no checks.",
        ],
      },
      {
        title: "Getters and Setters",
        paragraphs: [
          "A getter returns information, and a setter changes a value. They are useful when callers genuinely need those operations.",
          "A class does not need a getter and setter for every field. Sometimes a meaningful method such as changePassword or withdraw is safer and clearer than a general setter.",
          "A getter can also weaken encapsulation if it returns a direct reference to a mutable internal object. When necessary, return an immutable view, a defensive copy, or a safe read-only result instead.",
        ],
        table: {
          headers: ["Weak design", "Better controlled operation"],
          rows: [
            ["setBalance(value)", "deposit(amount) or withdraw(amount)"],
            ["setPassword(value)", "changePassword(oldPassword, newPassword)"],
            ["setOrderStatus(value)", "pay(), ship(), or cancel()"],
          ],
        },
      },
      {
        title: "Encapsulation vs Data Hiding",
        paragraphs: [
          "The terms are closely related, but they are not exactly the same.",
        ],
        table: {
          headers: ["Encapsulation", "Data hiding"],
          rows: [
            [
              "Groups data and related methods",
              "Restricts direct access to internal details",
            ],
            [
              "Creates a controlled object boundary",
              "Is one technique used inside that boundary",
            ],
            [
              "Focuses on design and responsibility",
              "Focuses on access and visibility",
            ],
          ],
        },
      },
      {
        title: "Simple Analogy",
        paragraphs: [
          "Think of an ATM. You cannot open the bank database and type a new balance. You choose an allowed operation such as deposit, withdraw, or check balance.",
          "The ATM checks your request and the bank's rules before changing anything. Encapsulation gives an object a similar controlled entry point.",
        ],
      },
      {
        title: "Benefits and Trade-Off",
        paragraphs: [
          "Encapsulation makes changes safer because internal details can change without forcing every caller to change. It also keeps validation close to the data it protects.",
          "Too many tiny getters, setters, and wrapper methods can add unnecessary code. The goal is a clear boundary with useful operations, not hiding everything without a reason.",
          "Encapsulation controls access, but it does not automatically make an object thread-safe. Concurrent updates may still need synchronization or another concurrency design.",
        ],
      },
    ],
    mechanism: {
      title: "How a withdrawal stays safe",
      steps: [
        "Another object calls account.withdraw(500).",
        "The BankAccount checks that 500 is a valid positive amount.",
        "It checks that the withdrawal follows the balance rule.",
        "Only the BankAccount changes its private balance.",
        "The method returns success or a clear failure result.",
      ],
    },
    example: {
      title: "Changing an order status",
      body: "Instead of allowing any code to set an Order status directly, the Order provides pay, ship, and cancel methods. Each method checks whether that change is allowed. A cancelled order cannot accidentally move to shipped.",
    },
    misconception:
      "Encapsulation does not mean adding getters and setters to every private field. It means exposing safe operations that protect the object's rules.",
  },
  revise: {
    definitionLabel: "Overview",
    compactDefinition: true,
    definition:
      "Encapsulation keeps related data and methods together and controls access to the object's internal state.",
    sections: [
      {
        title: "Why We Need It",
        points: [
          "Stops uncontrolled changes to object data.",
          "Keeps validation close to the data.",
          "Protects invariants, which are rules for valid state.",
          "Allows internal implementation to change more safely.",
        ],
      },
      {
        title: "How It Is Applied",
        flow: [
          "Private state",
          "Public method",
          "Validate request",
          "Safe state change",
        ],
      },
      {
        title: "Encapsulation vs Data Hiding",
        table: {
          headers: ["Encapsulation", "Data hiding"],
          rows: [
            ["Groups data and behaviour", "Restricts direct access"],
            ["A design boundary", "A supporting technique"],
          ],
        },
      },
      {
        title: "Getter and Setter Rule",
        points: [
          "Add them only when the operation is needed.",
          "Validate values before changing state.",
          "Prefer meaningful methods such as withdraw or changePassword.",
          "Do not return a mutable internal object directly.",
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Encapsulation = bundle related data and methods + control access.",
      "Private fields alone do not guarantee good encapsulation.",
      "Public methods should protect object rules.",
      "An invariant is a condition that must remain true for valid state.",
      "Mutable internal objects may need defensive copies or read-only views.",
    ],
    followUp:
      "Why is a private field with an unrestricted setter still weak encapsulation?",
  },
  lastMinute: {
    definition:
      "Encapsulation protects object state behind controlled operations.",
    sections: [
      {
        title: "Core Flow",
        flow: ["Request", "Public method", "Validation", "Private state"],
        wide: true,
      },
      {
        title: "Remember",
        points: [
          "Bundle data and behaviour.",
          "Limit direct access.",
          "Protect invariants.",
          "Expose meaningful operations.",
        ],
      },
    ],
    memoryLine: "Do not expose the data; expose safe ways to use it.",
    cues: [
      "Private balance, public withdraw().",
      "Getter reads; setter changes.",
      "Not every field needs both.",
    ],
    trap: "Private fields plus unrestricted setters are not strong encapsulation.",
  },
};

export const accessModifiers: SubjectTopic = {
  slug: "access-modifiers",
  title: "Access Modifiers",
  description:
    "Understand who can access a class member and how Java's four access levels differ.",
  readTime: "10 min",
  difficulty: "Foundation",
  tags: ["public", "private", "protected"],
  learn: {
    opening:
      "Access modifiers are keywords that control where a class, field, constructor, or method can be used.",
    sections: [
      {
        title: "Why Access Control Is Needed",
        paragraphs: [
          "Not every part of a class should be available everywhere. A BankAccount may allow anyone with the object to call getBalance, but only the class itself should change the balance field directly.",
          "Access modifiers create this boundary. They help the compiler stop code from using members in places where they should not be used.",
        ],
      },
      {
        title: "Java's Four Access Levels",
        paragraphs: [
          "Java provides public, protected, package-private, and private access. Package-private has no keyword; it is used when no access modifier is written.",
        ],
        dataTable: {
          headers: [
            "Modifier",
            "Same class",
            "Same package",
            "Subclass outside package",
            "Unrelated code outside package",
          ],
          rows: [
            ["private", "Yes", "No", "No", "No"],
            ["package-private", "Yes", "Yes", "No", "No"],
            ["protected", "Yes", "Yes", "Yes, through inheritance", "No"],
            ["public", "Yes", "Yes", "Yes", "Yes"],
          ],
        },
      },
      {
        title: "private",
        paragraphs: [
          "For normal unrelated classes, a private member can be accessed only inside the class that declares it. It is the strongest normal access restriction in Java.",
          "Private is commonly used for fields because the class should control how its state changes.",
          "Java has a nested-class exception: nested classes and their enclosing class can access one another's private members under Java's nestmate access rules.",
        ],
      },
      {
        title: "Package-Private",
        paragraphs: [
          "When no modifier is written in Java, the member is package-private. Code in the same package can access it, but code in other packages cannot.",
          "Package-private is useful when several closely related classes cooperate inside one package without exposing a member to the whole application.",
        ],
      },
      {
        title: "protected",
        paragraphs: [
          "A protected member is available to classes in the same package. It is also available to subclasses outside the package through inheritance.",
          "Outside the package, a subclass can use the inherited protected member through this, super, or a reference whose type is that subclass or one of its subclasses. It cannot use the member through an arbitrary object of the superclass.",
        ],
      },
      {
        title: "public",
        paragraphs: [
          "A public member can be accessed wherever the declaring type is visible. Public methods form the main interface that other code uses.",
          "Public does not mean that a method should accept every request. A public withdraw method must still validate its input.",
        ],
      },
      {
        title: "Top-Level Classes in Java",
        paragraphs: [
          "A top-level Java class can be public or package-private. It cannot be private or protected.",
          "Nested classes can use all four access levels because they are members of another class.",
          "Local variables do not use public, protected, package-private, or private. These modifiers apply to types and members such as fields, methods, constructors, and nested classes, subject to Java's rules for each declaration.",
        ],
      },
      {
        title: "Choose the Smallest Useful Access",
        paragraphs: [
          "Start with the narrowest access that allows the design to work. Increase access only when another part of the program truly needs it.",
          "This reduces accidental dependencies and makes future changes easier.",
        ],
        flow: [
          "Try private",
          "Need package access?",
          "Need subclass access?",
          "Use public only when part of the external interface",
        ],
      },
      {
        title: "Language Differences",
        paragraphs: [
          "Access rules are language-specific. C++ has public, protected, and private, with different defaults for class and struct. JavaScript supports private fields using a # prefix, while modules and closures also help limit access.",
          "Always answer access-modifier questions for the language named by the interviewer or exam.",
        ],
      },
      {
        title: "Simple Analogy",
        paragraphs: [
          "Think of rooms in an office. A public reception area is open to visitors. A staff room is for people in the organization. A manager's private cabinet is accessible only to the manager.",
          "Access modifiers create similar levels of visibility in code.",
        ],
      },
    ],
    mechanism: {
      title: "How the compiler checks access",
      steps: [
        "Code tries to use a class member.",
        "The compiler reads the member's access modifier.",
        "It checks the caller's class, package, and inheritance relationship.",
        "The access is allowed when the rule matches.",
        "Otherwise, compilation fails with an access error.",
      ],
    },
    example: {
      title: "Employee salary",
      body: "An Employee keeps salary private. A public getSalary method may return it to allowed application code, while a controlled updateSalary method validates changes. Other classes cannot directly write employee.salary.",
    },
    misconception:
      "The Java default access level is package-private, not public. It is used by writing no access modifier.",
  },
  revise: {
    definitionLabel: "Overview",
    compactDefinition: true,
    definition:
      "Access modifiers control where classes and members can be used.",
    sections: [
      {
        title: "Java Access Table",
        dataTable: {
          headers: [
            "Modifier",
            "Class",
            "Package",
            "Outside subclass",
            "Everywhere",
          ],
          rows: [
            ["private", "Yes", "No", "No", "No"],
            ["package-private", "Yes", "Yes", "No", "No"],
            ["protected", "Yes", "Yes", "Yes, inherited access", "No"],
            ["public", "Yes", "Yes", "Yes", "Yes"],
          ],
        },
      },
      {
        title: "Important Rules",
        points: [
          "No keyword means package-private in Java.",
          "Top-level Java classes can be public or package-private.",
          "Nested classes can use all four levels.",
          "Enclosing and nested classes can access one another's private members.",
          "Local variables do not use access modifiers.",
          "Use the narrowest access that the design needs.",
        ],
      },
      {
        title: "Common Use",
        points: [
          "private for internal fields and helper methods.",
          "package-private for related classes in one package.",
          "protected for carefully designed subclass access.",
          "public for the supported external interface.",
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "private blocks access from unrelated classes.",
      "Java nested classes and their enclosing class are a special case for private access.",
      "Outside its package, protected access must happen through the subclass relationship.",
      "public access does not remove the need for validation.",
      "Access rules vary between Java, C++, JavaScript, and other languages.",
    ],
    followUp:
      "What is the difference between protected and package-private access in Java?",
  },
  lastMinute: {
    definition:
      "Access modifiers decide who is allowed to use a class or member.",
    sections: [
      {
        title: "From Narrow to Wide",
        flow: ["private", "package-private", "protected", "public"],
        wide: true,
      },
      {
        title: "Java Rules",
        points: [
          "private: declaring class, with Java nestmate access for enclosing and nested classes",
          "No modifier: same package",
          "protected: package + controlled inherited access outside the package",
          "public: everywhere the type is visible",
        ],
      },
    ],
    memoryLine: "Expose only what other code truly needs.",
    cues: [
      "Default means package-private in Java.",
      "Top-level class: public or package-private.",
      "Outside-package protected access is not allowed through any superclass object.",
      "Access control supports encapsulation.",
    ],
    trap: "Do not say protected means subclasses only; Java also allows same-package access.",
  },
};

export const abstraction: SubjectTopic = {
  slug: "abstraction",
  title: "Abstraction",
  description:
    "Learn how software shows a simple operation while hiding details the caller does not need.",
  readTime: "10 min",
  difficulty: "Foundation",
  tags: ["Abstraction", "Interface", "Complexity"],
  learn: {
    opening:
      "Abstraction shows what something can do while hiding the unnecessary details of how it does it.",
    sections: [
      {
        title: "Start With a Payment",
        paragraphs: [
          "When a user clicks Pay, the application may validate the order, create a secure request, contact a bank, handle a response, and create a receipt.",
          "The user does not need to control every step. The user needs one clear operation: pay the amount.",
        ],
      },
      {
        title: "What Abstraction Means",
        paragraphs: [
          "Abstraction gives the caller a simple view of a more complex system. The caller uses a clear operation and depends on its promised result, not every internal step.",
          "A PaymentService may expose pay(amount). Its validation, bank communication, retries, and receipt creation remain implementation details.",
          "A useful contract describes more than a method name. It also explains valid inputs, expected behaviour, returned results, and possible failures.",
        ],
        visual: {
          src: "/notes/oop/abstraction-hidden-implementation.png",
          alt: "Diagram showing a user calling pay on a PaymentService while validation, bank communication, and receipt creation remain hidden implementation steps.",
          width: 1536,
          height: 1024,
          caption:
            "The caller uses one simple operation without managing every payment step.",
        },
      },
      {
        title: "What vs How",
        paragraphs: [
          "The abstraction exposes the useful request while the implementation owns the detailed steps.",
          "For example, code using a List abstraction can call add without depending on whether the concrete implementation uses a resizable array or linked nodes.",
        ],
        table: {
          headers: ["What the caller sees", "How it is implemented"],
          rows: [
            ["pay(amount)", "Validation, bank request, retry, and receipt"],
            ["list.add(item)", "Array resizing or node linking"],
            ["car.start()", "Fuel, ignition, sensors, and engine control"],
          ],
        },
      },
      {
        title: "Why Abstraction Helps",
        points: [
          "Reduces the number of details a caller must understand.",
          "Lets internal code change while the public operation remains stable.",
          "Makes important operations easier to discover and use.",
          "Allows different implementations to follow one common contract.",
        ],
        paragraphs: [
          "For example, CardPayment and UpiPayment can both provide pay(amount). Checkout can use the common operation without knowing every provider-specific step.",
        ],
      },
      {
        title: "How Abstraction Is Created",
        paragraphs: [
          "Abstraction is a design idea, not one keyword. Regular methods, classes, interfaces, abstract classes, modules, and APIs can all create useful abstractions.",
          "An interface or abstract class is helpful when several implementations need a shared contract, but a well-named method can also hide complexity.",
        ],
      },
      {
        title: "Abstraction vs Encapsulation",
        paragraphs: [
          "These ideas often work together, but they answer different questions.",
        ],
        table: {
          headers: ["Abstraction", "Encapsulation"],
          rows: [
            [
              "What should the caller see?",
              "How should internal state be protected?",
            ],
            [
              "Hides unnecessary complexity",
              "Controls access to data and behaviour",
            ],
            [
              "Focuses on a simple useful view",
              "Focuses on a safe object boundary",
            ],
            ["Example: pay(amount)", "Example: private balance"],
          ],
        },
      },
      {
        title: "A Good Abstraction",
        paragraphs: [
          "A good abstraction is small, clear, and stable. Its name describes the user's goal, and it does not leak details the caller should not manage.",
        ],
        points: [
          "Prefer checkout() over a long sequence of low-level payment calls.",
          "Return useful results and clear errors.",
          "Do not hide details that callers genuinely need to make a decision.",
          "Keep the contract stable when internal implementation changes.",
        ],
      },
      {
        title: "Simple Analogy",
        paragraphs: [
          "A driver uses a steering wheel, pedals, and gear controls. The driver does not directly control fuel injection or every engine part.",
          "The controls form a useful abstraction. They show what the driver can do and hide the machinery required to do it.",
        ],
      },
      {
        title: "The Trade-Off",
        paragraphs: [
          "Too little abstraction exposes confusing details. Too much abstraction can hide useful control or create layers that are difficult to follow.",
          "A good design hides details that may change while keeping important choices visible to the caller.",
        ],
      },
    ],
    mechanism: {
      title: "What happens behind pay(amount)",
      steps: [
        "Checkout calls paymentService.pay(amount).",
        "The service validates the amount and payment details.",
        "It sends the request to the selected bank or provider.",
        "It converts the provider response into a simple success or failure result.",
        "Checkout uses that result without depending on the hidden provider steps.",
      ],
    },
    example: {
      title: "Using a collection",
      body: "Code calls list.add(item). It does not need to know whether the list grows an array or links a new node. The collection provides a simple operation and owns the internal storage details.",
    },
    misconception:
      "Abstraction does not mean hiding all information. It hides details the caller does not need while exposing the choices and results the caller does need.",
  },
  revise: {
    definitionLabel: "Overview",
    compactDefinition: true,
    definition:
      "Abstraction exposes a simple useful operation and hides unnecessary implementation details.",
    sections: [
      {
        title: "Core Question",
        table: {
          headers: ["Visible to caller", "Hidden inside"],
          rows: [
            ["What the operation does", "How every step works"],
            ["Required inputs", "Internal algorithms and helpers"],
            ["Result or error", "Provider-specific details"],
          ],
        },
      },
      {
        title: "How It Is Created",
        points: [
          "Well-named methods and classes",
          "Interfaces and abstract classes",
          "Modules and APIs",
          "Stable contracts with replaceable implementations",
        ],
      },
      {
        title: "Abstraction vs Encapsulation",
        table: {
          headers: ["Abstraction", "Encapsulation"],
          rows: [
            ["Hides complexity", "Protects internal state"],
            ["Shows a useful view", "Controls access"],
          ],
        },
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Abstraction = what, not every detail of how.",
      "It is a design idea, not only an abstract keyword.",
      "Callers depend on the contract rather than the implementation.",
      "A contract includes behaviour, valid inputs, results, and possible failures.",
      "Good abstraction hides changeable details without hiding necessary choices.",
    ],
    followUp: "Can abstraction exist without an interface or abstract class?",
  },
  lastMinute: {
    definition:
      "Abstraction shows the useful operation and hides unnecessary complexity.",
    sections: [
      {
        title: "Core Flow",
        flow: ["Simple operation", "Hidden implementation", "Useful result"],
        wide: true,
      },
      {
        title: "Examples",
        points: ["pay(amount)", "list.add(item)", "car.start()"],
      },
    ],
    memoryLine: "Abstraction = show what; hide unnecessary how.",
    cues: [
      "Reduces complexity for callers.",
      "Supports replaceable implementations.",
      "Methods and APIs can also provide abstraction.",
    ],
    trap: "Do not say abstraction is possible only through interfaces or abstract classes.",
  },
};

export const abstractClassesAndInterfaces: SubjectTopic = {
  slug: "abstract-classes-and-interfaces",
  title: "Abstract Classes and Interfaces",
  description:
    "Compare Java abstract classes and interfaces and learn when each one fits.",
  readTime: "12 min",
  difficulty: "Intermediate",
  tags: ["Abstract Class", "Interface", "Java"],
  learn: {
    opening:
      "An abstract class shares a base with closely related classes. An interface defines a capability or contract that different classes can promise to follow.",
    sections: [
      {
        title: "Why Do We Need a Common Contract?",
        paragraphs: [
          "A checkout system may support CardPayment, UpiPayment, and WalletPayment. Each type performs payment differently, but Checkout needs one common operation: pay(amount).",
          "A shared contract lets Checkout use any supported payment type without depending on its internal steps.",
        ],
      },
      {
        title: "Abstract Class",
        paragraphs: [
          "An abstract class is a class that cannot be instantiated directly. It is designed to be extended by subclasses.",
          "It can provide shared state and working methods while leaving some methods unfinished for subclasses to implement.",
        ],
        points: [
          "Can contain instance fields.",
          "Can have constructors.",
          "Can contain abstract methods without a body.",
          "Can contain concrete methods with a body.",
          "Can use normal access modifiers.",
        ],
      },
      {
        title: "Abstract Method",
        paragraphs: [
          "An abstract method declares what operation is required but provides no method body in the abstract class.",
          "A concrete subclass must implement inherited abstract methods unless that subclass is also declared abstract.",
        ],
        points: [
          "abstract class Shape",
          "abstract double area()",
          "Circle and Rectangle provide their own area implementations.",
          "In Java, an abstract method cannot be private, static, or final.",
          "An abstract class may still contain private, static, and final concrete members.",
        ],
      },
      {
        title: "Interface",
        paragraphs: [
          "A Java interface defines a contract. A class that implements the interface promises to provide its required behaviour.",
          "Interfaces are useful for capabilities that can be shared by otherwise unrelated classes, such as Payable, Comparable, or Printable.",
        ],
        points: [
          "A class uses implements to follow an interface.",
          "A class can implement more than one interface.",
          "An interface can extend more than one interface.",
          "An interface cannot be instantiated directly.",
        ],
      },
      {
        title: "Modern Java Interface Rules",
        paragraphs: [
          "Traditional interface methods are public and abstract. Modern Java interfaces can also contain default and static methods, and private helper methods in supported Java versions.",
          "Interface fields are constants: they are implicitly public, static, and final. Every interface field must be initialized when it is declared. Interfaces do not keep separate instance state for each implementing object.",
          "If two implemented interfaces provide conflicting default methods, the class must resolve the conflict by overriding that method.",
        ],
      },
      {
        title: "Abstract Class vs Interface",
        paragraphs: [
          "This comparison uses Java rules. Other languages may use these terms differently.",
        ],
        visual: {
          src: "/notes/oop/abstract-class-vs-interface.png",
          alt: "Java comparison showing that abstract classes can keep instance state, have constructors, and contain abstract and concrete methods, while interfaces define behaviour contracts and can be implemented many at a time.",
          width: 1536,
          height: 1024,
          caption:
            "Use an abstract class for a shared base and an interface for a shared capability or contract.",
        },
        table: {
          headers: ["Abstract class", "Interface"],
          rows: [
            ["Represents a shared base", "Represents a capability or contract"],
            ["Can keep instance state", "Has no per-object instance state"],
            ["Can have constructors", "Has no constructors"],
            [
              "Can have abstract and concrete methods",
              "Can have abstract, default, static, and private methods",
            ],
            [
              "A class extends one class",
              "A class can implement many interfaces",
            ],
          ],
        },
      },
      {
        title: "When to Use an Abstract Class",
        points: [
          "The subclasses are closely related.",
          "They need shared instance fields or constructor setup.",
          "They share part of an implementation.",
          "The base needs protected helper methods.",
        ],
        paragraphs: [
          "For example, Circle and Rectangle may extend an abstract Shape class that stores a color and provides shared display behaviour.",
        ],
      },
      {
        title: "When to Use an Interface",
        points: [
          "Different classes need the same capability.",
          "Callers should depend on a contract rather than one class family.",
          "A class must support several independent capabilities.",
          "Implementations should be easy to replace or test.",
        ],
        paragraphs: [
          "For example, CardPayment and UpiPayment can both implement PaymentMethod even if they do not share useful instance state.",
        ],
      },
      {
        title: "Simple Analogies",
        paragraphs: [
          "An abstract class is like a partly completed application form for one family of cases. Some common fields and instructions are already provided, while each specific case completes the missing parts.",
          "An interface is like a charging standard. Different devices can be built in different ways, but every compatible device must follow the same connection contract.",
        ],
      },
      {
        title: "Important Interview Traps",
        paragraphs: [
          "These details are commonly used to test whether you know modern Java rules.",
        ],
        points: [
          "An abstract class can have no abstract methods and still be abstract.",
          "An abstract class can have a constructor, even though it cannot be instantiated directly.",
          "An interface can contain implemented methods through default, static, and private methods.",
          "Interface fields are initialized constants, not per-object mutable state.",
          "Conflicting interface default methods must be resolved by the implementing class.",
          "A Java abstract method cannot be private, static, or final.",
          "Use an interface for a contract; do not choose it only because Java allows several interfaces.",
        ],
      },
    ],
    mechanism: {
      title: "Using a PaymentMethod contract",
      steps: [
        "Define PaymentMethod with the required pay(amount) operation.",
        "CardPayment and UpiPayment implement the contract differently.",
        "Checkout receives a PaymentMethod instead of one concrete payment class.",
        "Checkout calls pay(amount) through the common contract.",
        "The actual object's implementation runs at runtime.",
      ],
    },
    example: {
      title: "Shape and Drawable",
      body: "Circle can extend the abstract Shape class to reuse shared color and position state. It can also implement the Drawable interface to promise a draw operation. The abstract class gives it a family base; the interface gives it a capability.",
    },
    misconception:
      "An interface is not simply an abstract class with no fields. It represents a contract and follows different inheritance, state, constructor, and method rules.",
  },
  revise: {
    definitionLabel: "Overview",
    compactDefinition: true,
    definition:
      "An abstract class provides a shared base; an interface defines a capability or contract.",
    sections: [
      {
        title: "Java Comparison",
        table: {
          headers: ["Abstract class", "Interface"],
          rows: [
            ["Shared class family", "Shared capability"],
            ["Instance fields allowed", "No per-object instance state"],
            ["Constructors allowed", "No constructors"],
            ["Extend one class", "Implement many interfaces"],
          ],
        },
      },
      {
        title: "Abstract Class Can Have",
        points: [
          "Fields and constructors",
          "Abstract methods",
          "Concrete methods",
          "Any normal access modifier",
        ],
      },
      {
        title: "Java Interface Can Have",
        points: [
          "Public abstract methods",
          "Default and static methods",
          "Private helper methods in modern Java",
          "Initialized public static final constants",
        ],
      },
      {
        title: "Choose By Need",
        points: [
          "Shared state and base implementation: abstract class.",
          "Common contract across different types: interface.",
          "A class may extend one class and implement several interfaces.",
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Neither an abstract class nor an interface can be instantiated directly.",
      "A concrete subclass must implement inherited abstract methods.",
      "Java abstract methods cannot be private, static, or final.",
      "Interface fields are initialized constants in Java.",
      "Modern interfaces are not limited to abstract methods.",
      "A class must override conflicting interface default methods.",
    ],
    followUp:
      "When would you choose an abstract class instead of an interface?",
  },
  lastMinute: {
    definition:
      "Abstract class = shared base. Interface = shared contract or capability.",
    sections: [
      {
        title: "Abstract Class",
        points: [
          "Instance state",
          "Constructor",
          "Abstract + concrete methods",
          "Extend one class",
        ],
      },
      {
        title: "Interface",
        points: [
          "Behaviour contract",
          "No per-object state",
          "Initialized constants",
          "Default methods possible",
          "Implement many",
        ],
      },
    ],
    memoryLine:
      "Need shared state? Consider an abstract class. Need a contract? Consider an interface.",
    cues: [
      "Both support abstraction.",
      "Neither can be instantiated directly.",
      "Java class: one superclass, many interfaces.",
      "Default-method conflict: implementing class overrides.",
    ],
    trap: "Do not say interfaces contain only abstract methods; modern Java also supports default, static, and private methods.",
  },
};
