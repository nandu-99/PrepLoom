import type { OopQuestion } from "@/content/interview-questions/types";

export const oopInterviewQuestions: OopQuestion[] = [
  {
    id: "what-is-oop",
    category: "OOP foundations",
    question: "What is object-oriented programming, in your own words?",
    answer:
      "OOP organizes software around objects that combine related state and behaviour. Each object has a responsibility and interacts with other objects through a defined interface. The goal is not simply to use classes, but to make a growing system easier to understand, change, and test.",
  },
  {
    id: "class-and-object",
    category: "OOP foundations",
    question:
      "How would you explain the difference between a class and an object?",
    answer:
      "A class defines the structure and behaviour of a type. An object is one runtime instance created from that definition, with its own identity and field values. For example, `BankAccount` can be a class, while two customer accounts are separate objects of that class.",
  },
  {
    id: "fields-and-methods",
    category: "OOP foundations",
    question: "What roles do fields and methods play inside a class?",
    answer:
      "Fields hold the state an object needs to remember, while methods define the operations it can perform. Good methods protect the object's rules instead of exposing every field for direct modification. Together they give the object both data and meaningful behaviour.",
  },
  {
    id: "constructor-purpose",
    category: "OOP foundations",
    question: "What should a constructor be responsible for?",
    answer:
      "A constructor should create a valid, usable object. It initializes required state, checks important invariants, and establishes dependencies the object needs. It should avoid unrelated work such as network calls or large workflows because that makes object creation slow, surprising, and difficult to test.",
  },
  {
    id: "default-no-argument-constructor",
    category: "OOP foundations",
    question: "Is a default constructor the same as a no-argument constructor?",
    answer:
      "Not exactly. A no-argument constructor is any constructor that accepts no arguments. In Java, a default constructor is the no-argument constructor the compiler provides only when the class declares no constructor. Once a constructor is written explicitly, that automatic constructor is no longer generated.",
  },
  {
    id: "constructor-overloading-chaining",
    category: "OOP foundations",
    question: "Why would you overload or chain constructors?",
    answer:
      "Overloading provides different valid ways to create an object. Chaining lets those constructors reuse one main initialization path instead of duplicating validation and assignments. This keeps every construction route consistent and reduces the chance that one constructor forgets to initialize an important field.",
  },
  {
    id: "object-reference",
    category: "OOP foundations",
    question:
      "What is stored when one object variable is assigned to another in Java?",
    answer:
      "For an object type, the reference value is copied, not the object itself. Both variables then refer to the same object, so a mutation through one reference is visible through the other. Creating an independent object requires an explicit copy strategy.",
  },

  {
    id: "encapsulation",
    category: "Encapsulation and abstraction",
    question: "What does encapsulation actually protect?",
    answer:
      "Encapsulation keeps an object's state and rules behind a controlled interface. Other code asks the object to perform meaningful operations instead of changing its internals freely. That protects invariants and allows the implementation to change without forcing every caller to change with it.",
  },
  {
    id: "getters-setters-encapsulation",
    category: "Encapsulation and abstraction",
    question:
      "Why are getters and setters not automatically good encapsulation?",
    answer:
      "If every field has an unrestricted getter and setter, callers can still control the object like a data container and may create invalid states. Good encapsulation exposes operations that express business intent. For example, `withdraw(amount)` can validate balance rules better than `setBalance(value)`.",
  },
  {
    id: "abstraction-vs-encapsulation",
    category: "Encapsulation and abstraction",
    question: "How do abstraction and encapsulation differ?",
    answer:
      "Abstraction presents the essential capability while hiding unnecessary detail, so callers focus on what an object does. Encapsulation controls access to an object's state and implementation so its rules remain protected. They often work together, but they solve different design problems.",
  },
  {
    id: "access-modifiers",
    category: "Encapsulation and abstraction",
    question:
      "How do you decide whether a member should be public, protected, or private?",
    answer:
      "I start with the narrowest access the design needs. Public members form the supported API, private members are implementation details, and protected members are extension points for subclasses. Making too much public increases coupling because callers can begin depending on details that should be free to change.",
  },
  {
    id: "information-hiding",
    category: "Encapsulation and abstraction",
    question: "What is information hiding, and why does it matter?",
    answer:
      "Information hiding means concealing design decisions that are likely to change, such as storage format or calculation details. Callers depend on stable behaviour rather than those choices. As a result, the internal implementation can evolve with less risk of breaking the rest of the system.",
  },
  {
    id: "protect-class-invariant",
    category: "Encapsulation and abstraction",
    question: "How would you stop an object from entering an invalid state?",
    answer:
      "I would validate required values during construction, keep sensitive fields private, and allow changes only through methods that enforce the rules. If a bank balance must not cross a limit, every operation that changes it should check that invariant inside the object rather than relying on callers.",
  },

  {
    id: "inheritance",
    category: "Inheritance and relationships",
    question: "What problem is inheritance meant to solve?",
    answer:
      "Inheritance lets a subtype reuse and specialize behaviour from a more general type while preserving an is-a relationship. It is most useful when the subtype can safely be used wherever the parent type is expected. Reusing code alone is not enough reason to create an inheritance hierarchy.",
  },
  {
    id: "is-a-has-a",
    category: "Inheritance and relationships",
    question: "How do is-a and has-a relationships influence your design?",
    answer:
      "An is-a relationship suggests substitutability and may justify inheritance, such as `SavingsAccount` being an `Account`. A has-a relationship suggests composition, such as an `Order` having a `PaymentMethod`. I choose based on the domain relationship, not just on which option shares more code.",
  },
  {
    id: "composition-over-inheritance",
    category: "Inheritance and relationships",
    question: "Why is composition often preferred over inheritance?",
    answer:
      "Composition keeps classes less dependent because an object delegates work to a collaborator through a small interface. The collaborator can be replaced without changing the object's identity or hierarchy. Inheritance is still useful for a genuine subtype, but deep hierarchies can make behaviour difficult to predict.",
  },
  {
    id: "multiple-inheritance-diamond",
    category: "Inheritance and relationships",
    question: "What is the diamond problem in multiple inheritance?",
    answer:
      "It occurs when a class inherits through two paths from the same base class. The language must decide whether the final class contains one or multiple base instances and which inherited implementation wins. Java avoids multiple inheritance of classes, while C++ provides explicit rules such as virtual inheritance.",
  },
  {
    id: "association-aggregation-composition",
    category: "Inheritance and relationships",
    question: "Can you distinguish association, aggregation, and composition?",
    answer:
      "Association is a general relationship between independent objects. Aggregation describes a whole-part relationship where the part can still exist independently. Composition is stronger ownership, where the whole controls the part's lifecycle. In real code, ownership and lifecycle matter more than memorizing diagram symbols.",
  },
  {
    id: "superclass-constructor",
    category: "Inheritance and relationships",
    question:
      "How does constructor chaining work between a superclass and subclass in modern Java?",
    answer:
      "Each constructor invokes another constructor in the same class or the direct superclass, either explicitly or implicitly. Java 25 allows a restricted prologue before an explicit invocation. In that early-construction context, code may initialize instance fields declared by the current class, but it cannot read instance state, invoke instance methods, or allow the partially constructed object to escape. Superclass construction completes before the remaining subclass initialization and constructor body.",
  },
  {
    id: "fragile-base-class",
    category: "Inheritance and relationships",
    question: "What is the fragile base class problem?",
    answer:
      "A subclass can depend on implementation details or call patterns of its parent. A seemingly safe change in the base class may then alter or break subclass behaviour. Keeping inheritance contracts small, avoiding overridable calls during construction, and preferring composition can reduce this risk.",
  },

  {
    id: "polymorphism",
    category: "Polymorphism and binding",
    question: "What does polymorphism give us in practical code?",
    answer:
      "Polymorphism lets the same operation work with objects of different concrete types through a shared contract. The caller depends on the abstraction and each object supplies its own behaviour. This removes repeated type checks and makes new implementations easier to add.",
  },
  {
    id: "overloading-vs-overriding",
    category: "Polymorphism and binding",
    question:
      "What is the difference between method overloading and method overriding?",
    answer:
      "Overloading uses the same method name with different parameter lists, and the compiler selects a compatible signature. Overriding replaces inherited instance behaviour in a subtype, and runtime dispatch selects the implementation based on the actual object. Return type alone cannot create a Java overload.",
  },
  {
    id: "static-dynamic-binding",
    category: "Polymorphism and binding",
    question: "What do static binding and dynamic binding mean?",
    answer:
      "Static binding resolves a call using compile-time information, as with Java overload selection and static methods. Dynamic binding resolves an overridden instance method using the runtime object's type. Dynamic dispatch is what allows a parent reference to invoke child-specific overridden behaviour.",
  },
  {
    id: "parent-reference-child-object",
    category: "Polymorphism and binding",
    question:
      "A parent reference points to a child object. Which methods and fields are accessible?",
    answer:
      "The reference type controls which members the compiler allows the code to access. For an overridden instance method, the runtime object decides which implementation executes. Java field access is not polymorphic, so a hidden field is selected from the reference type rather than the runtime object.",
  },
  {
    id: "upcasting-downcasting",
    category: "Polymorphism and binding",
    question: "Why is upcasting usually safe while downcasting can fail?",
    answer:
      "Upcasting treats a subtype object as one of its parent types, which is valid because the object supports that contract. Downcasting claims that a general reference holds a particular subtype. If the runtime object is not that subtype, Java throws `ClassCastException`, so the design should avoid unnecessary downcasts.",
  },
  {
    id: "cannot-override-java",
    category: "Polymorphism and binding",
    question: "Which Java methods cannot participate in normal overriding?",
    answer:
      "A final method cannot be overridden, a private method is not inherited as an overridable member, and a static method is hidden rather than dynamically overridden. Constructors are also not inherited. An overriding method cannot reduce access and may use only a compatible covariant return type.",
  },
  {
    id: "covariant-return-type",
    category: "Polymorphism and binding",
    question: "What is a covariant return type?",
    answer:
      "It allows an overriding method to return a more specific reference type than the parent method. If a parent method returns `Document`, a child override may return `PdfDocument`. This keeps the override compatible while giving callers of the subtype a more precise result.",
  },

  {
    id: "abstract-class-vs-interface",
    category: "Interfaces and abstract classes",
    question:
      "When would you choose an abstract class instead of an interface?",
    answer:
      "I would use an abstract class when related subclasses need shared state, protected helpers, or a common construction process. I would use an interface when different kinds of classes only need to promise a capability. Interfaces keep the contract separate from one inheritance hierarchy.",
  },
  {
    id: "interface-multiple-inheritance",
    category: "Interfaces and abstract classes",
    question:
      "Why can a Java class implement multiple interfaces but extend only one class?",
    answer:
      "Multiple class inheritance can create conflicting state, constructors, and inherited implementations. Interfaces primarily describe contracts, so implementing several of them lets a class support multiple roles without inheriting several object layouts. Java still has rules to resolve conflicts between inherited default methods.",
  },
  {
    id: "abstract-class-constructor",
    category: "Interfaces and abstract classes",
    question:
      "Why can an abstract class have a constructor if it cannot be instantiated directly?",
    answer:
      "The constructor initializes the abstract portion of a concrete subclass object. Every subclass instance still contains the state inherited from the abstract class, so that state must be established consistently. The subclass constructor invokes it as part of the normal construction chain.",
  },
  {
    id: "default-interface-method",
    category: "Interfaces and abstract classes",
    question: "Why were default methods added to Java interfaces?",
    answer:
      "They allow an interface to gain a method implementation without immediately breaking every existing implementing class. This helps interfaces evolve while retaining compatibility. If inherited defaults conflict, the implementing class must resolve the ambiguity explicitly.",
  },
  {
    id: "depend-on-interface",
    category: "Interfaces and abstract classes",
    question:
      "Why do we often depend on an interface rather than a concrete class?",
    answer:
      "An interface keeps the caller focused on required behaviour instead of one implementation. That makes it easier to replace a database, payment provider, or test double without changing the caller. The interface should represent a real stable role, not be added mechanically around every class.",
  },

  {
    id: "identity-vs-equality",
    category: "Equality, copying, and immutability",
    question:
      "What is the difference between object identity and logical equality?",
    answer:
      "Identity asks whether two references point to the exact same object. Logical equality asks whether two objects should be considered equivalent based on their values or domain meaning. In Java, `==` checks reference identity for objects, while `equals` is used for logical equality.",
  },
  {
    id: "equals-hashcode-contract",
    category: "Equality, copying, and immutability",
    question: "Why must equals and hashCode agree in Java?",
    answer:
      "Hash-based collections use the hash code to choose a bucket and then use equality to find a matching key. If two equal objects return different hash codes, a lookup may search the wrong bucket and fail. Equal objects must share a hash code, though unequal objects may still collide.",
  },
  {
    id: "shallow-vs-deep-copy",
    category: "Equality, copying, and immutability",
    question: "How would you distinguish a shallow copy from a deep copy?",
    answer:
      "A shallow copy creates a new outer object but keeps references to the same nested mutable objects. A deep copy also duplicates the relevant nested state, so changes do not leak between copies. The correct choice depends on ownership, mutability, cost, and the meaning of independence in the domain.",
  },
  {
    id: "assignment-not-copy",
    category: "Equality, copying, and immutability",
    question:
      "Why is assigning an object reference not considered copying the object?",
    answer:
      "Assignment only copies the reference value, so both variables still reach the same object. No constructor runs and no new object state is created. A real copy requires an explicit approach such as a copy constructor, factory method, or domain-specific conversion.",
  },
  {
    id: "design-immutable-class",
    category: "Equality, copying, and immutability",
    question: "How would you design an immutable Java class?",
    answer:
      "I would prevent state changes after construction, keep fields private and final, validate them in the constructor, and provide no mutating methods. Mutable inputs and outputs need defensive copies or immutable wrappers. The class should also prevent subclass behaviour from exposing mutation, often by being final.",
  },
  {
    id: "immutability-benefits-costs",
    category: "Equality, copying, and immutability",
    question: "What do we gain and lose by making objects immutable?",
    answer:
      "Immutable objects are easier to reason about, safe to share, and naturally resistant to many concurrency bugs. They also work well as keys when equality is stable. The trade-off is creating new objects for changes, which can be inefficient for large structures or mutation-heavy algorithms.",
  },

  {
    id: "this-and-super",
    category: "Object context and lifecycle",
    question: "What is the difference between this and super in Java?",
    answer:
      "`this` refers to the current object or another constructor in the same class, while `super` accesses the parent-class portion or a parent constructor. Since Java 25, safe prologue statements may appear before an explicit constructor invocation, but early construction rules restrict access to the object being created.",
  },
  {
    id: "static-vs-instance",
    category: "Object context and lifecycle",
    question: "When should a member be static rather than instance-based?",
    answer:
      "A static member belongs to the class and should not depend on one object's state. Constants, stateless utility operations, and carefully controlled shared data are common uses. Behaviour that depends on an object's fields or supports polymorphism should normally remain an instance member.",
  },
  {
    id: "static-method-polymorphism",
    category: "Object context and lifecycle",
    question: "Are static methods polymorphic in Java?",
    answer:
      "No. A subclass can declare a static method with the same signature, but that is method hiding rather than overriding. The compiler selects it from the reference or class name used in the call. Runtime object type does not dynamically dispatch a static method.",
  },
  {
    id: "object-lifecycle",
    category: "Object context and lifecycle",
    question: "What stages does an object go through during its lifecycle?",
    answer:
      "An object is allocated, initialized by its construction chain, used while reachable, and eventually becomes unreachable. In a garbage-collected language such as Java, the runtime later reclaims its memory. External resources should still be closed explicitly because garbage collection timing is not deterministic.",
  },
  {
    id: "object-and-memory",
    category: "Object context and lifecycle",
    question:
      "Are Java objects always on the heap and local variables always on the stack?",
    answer:
      "That is a useful beginner model but not a strict language guarantee. Local variables have method scope, while objects have independent lifetimes based on reachability. The JVM may optimize allocation or even eliminate an object, so code should rely on language semantics rather than physical placement assumptions.",
  },

  {
    id: "coupling-and-cohesion",
    category: "SOLID and good design",
    question: "What do low coupling and high cohesion look like in a design?",
    answer:
      "High cohesion means a class contains closely related responsibilities. Low coupling means it knows as little as practical about other classes and their implementations. Together they make changes more local: a class has a clear reason to change and fewer unrelated consumers break when it does.",
  },
  {
    id: "single-responsibility",
    category: "SOLID and good design",
    question: "How do you interpret the Single Responsibility Principle?",
    answer:
      "A class should have one coherent reason to change, usually tied to one responsibility or stakeholder. It does not mean every class should contain only one method. A report class that calculates data, formats HTML, and sends email mixes separate reasons for change and should probably be split.",
  },
  {
    id: "open-closed",
    category: "SOLID and good design",
    question: "What does the Open-Closed Principle mean in practice?",
    answer:
      "Stable code should allow new behaviour to be added through extension points without repeatedly editing a central conditional. For example, new discount policies can implement a shared strategy interface. It does not mean existing code can never change; it means likely variation should be isolated behind a suitable abstraction.",
  },
  {
    id: "liskov-substitution",
    category: "SOLID and good design",
    question: "How can a subclass violate the Liskov Substitution Principle?",
    answer:
      "It violates substitution when code expecting the parent receives the child and valid assumptions stop working. A subtype should not require stronger inputs, promise weaker outputs, or break parent invariants. A classic warning sign is a subclass that throws for a normal operation defined by the parent contract.",
  },
  {
    id: "interface-segregation",
    category: "SOLID and good design",
    question:
      "Why is one large interface often worse than several focused interfaces?",
    answer:
      "A large interface forces clients to depend on methods they do not use and makes implementations provide irrelevant behaviour. Focused interfaces describe smaller roles, so changes affect fewer consumers. The split should follow real client needs rather than producing many tiny interfaces without meaning.",
  },
  {
    id: "dependency-inversion",
    category: "SOLID and good design",
    question: "What is Dependency Inversion trying to achieve?",
    answer:
      "High-level business policy should not be tied directly to low-level details such as one database or email provider. Both depend on an abstraction owned around the business need. Dependencies can then be supplied from outside, making infrastructure replaceable and the core logic easier to test.",
  },
  {
    id: "avoid-overengineering",
    category: "SOLID and good design",
    question: "Can applying SOLID principles ever make a design worse?",
    answer:
      "Yes. Adding interfaces, factories, and layers before there is real variation can make simple code harder to follow. I use the principles to respond to clear responsibilities and change pressure, not as a requirement to maximize abstraction. The simplest design that preserves important boundaries is usually better.",
  },

  {
    id: "factory-pattern",
    category: "Design patterns",
    question:
      "When is a factory more useful than calling a constructor directly?",
    answer:
      "A factory is useful when creation involves selecting an implementation, applying validation, caching instances, or hiding a complex construction process. The caller asks for the required abstraction without knowing the concrete class. For straightforward construction, a normal constructor is clearer.",
  },
  {
    id: "strategy-pattern",
    category: "Design patterns",
    question: "What problem does the Strategy pattern solve?",
    answer:
      "Strategy places interchangeable algorithms behind one contract. A context delegates the operation instead of containing a growing conditional for every variation. It works well for payment methods, pricing policies, or sorting rules, especially when the choice may change at runtime.",
  },
  {
    id: "observer-pattern",
    category: "Design patterns",
    question: "What trade-off comes with the Observer pattern?",
    answer:
      "Observer lets a publisher notify subscribers without depending on their concrete types, which is useful for events and UI updates. The trade-off is less visible control flow. Poor subscription management can cause unexpected update chains, memory leaks, ordering issues, or slow publishers.",
  },
  {
    id: "singleton-pattern",
    category: "Design patterns",
    question: "Why is Singleton often criticized?",
    answer:
      "A Singleton guarantees one globally accessible instance, but that global access hides dependencies and introduces shared state. Tests can interfere with one another, and lifecycle or concurrency becomes harder to control. A single application-scoped instance provided through dependency injection is often easier to manage.",
  },

  {
    id: "design-notification-system",
    category: "Practical design scenarios",
    question:
      "How would you design a notification service that supports email, SMS, and push?",
    answer:
      "I would define a small notification channel interface and create one implementation per delivery method. The service would choose or receive the required channel and delegate sending to it. This uses strategy-style polymorphism, keeps provider details separate, and allows another channel without editing one large conditional.",
  },
  {
    id: "design-payment-system",
    category: "Practical design scenarios",
    question:
      "A checkout must support several payment providers. How would you structure it?",
    answer:
      "I would keep checkout logic dependent on a payment interface that represents operations the business actually needs. Provider adapters would translate that contract to Stripe, Razorpay, or another API. A factory or configuration layer can select the provider, while the checkout remains independent of provider-specific request formats.",
  },
  {
    id: "refactor-god-class",
    category: "Practical design scenarios",
    question:
      "A class validates orders, stores them, charges customers, and sends emails. What would you change?",
    answer:
      "The class has several reasons to change, so I would separate validation, persistence, payment, and notification behind clear collaborators. An order service can coordinate the workflow without owning every implementation. I would refactor gradually around tested behaviour rather than splitting files only for appearance.",
  },
  {
    id: "rectangle-square-problem",
    category: "Practical design scenarios",
    question:
      "Why can making Square inherit from Rectangle cause design problems?",
    answer:
      "A mutable rectangle usually allows width and height to change independently, while a square must keep them equal. A square subtype would either break that invariant or surprise code using the rectangle contract. Separate immutable shapes or a shared area interface often models the domain more honestly.",
  },
  {
    id: "role-permission-design",
    category: "Practical design scenarios",
    question:
      "How would you model users, roles, and permissions without filling User with conditionals?",
    answer:
      "I would model roles and permissions as separate domain concepts and let an authorization policy answer whether an action is allowed. The user holds assigned roles rather than implementing every rule itself. This keeps changing access policy separate from user identity and profile behaviour.",
  },
  {
    id: "when-not-to-use-oop",
    category: "Practical design scenarios",
    question: "When would you decide not to use an object-oriented design?",
    answer:
      "For a small transformation, calculation pipeline, or stateless script, plain functions and data may be clearer. I use objects when identity, lifecycle, invariants, or collaborating responsibilities add value. OOP is one design tool, so adding classes without those needs can create ceremony rather than structure.",
  },
];
