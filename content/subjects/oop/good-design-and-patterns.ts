import type { SubjectTopic } from "@/lib/subject-content";

export const couplingCohesionAndComposition: SubjectTopic = {
  slug: "coupling-cohesion-and-composition",
  title: "Coupling, Cohesion, and Composition",
  description:
    "Design focused classes with fewer fragile dependencies and flexible collaboration.",
  readTime: "13 min",
  difficulty: "Intermediate",
  tags: ["Coupling", "Cohesion", "Composition"],
  learn: {
    opening:
      "Good OOP design gives each class a focused purpose and keeps its knowledge of other classes as small and stable as possible.",
    sections: [
      {
        title: "Coupling",
        paragraphs: [
          "Coupling describes how strongly one part of a program depends on another. A tightly coupled class knows many concrete details, so changing one class can force changes elsewhere.",
          "Lower coupling usually comes from small contracts, dependency injection, encapsulation, and avoiding unnecessary knowledge. Zero coupling is neither possible nor desirable because collaborating objects must depend on some contract.",
        ],
      },
      {
        title: "Cohesion",
        paragraphs: [
          "Cohesion describes how closely a class's responsibilities belong together. A highly cohesive class has a clear purpose, and its data and methods support that purpose.",
          "A class is not cohesive merely because it is small. A two-method class can still mix unrelated jobs, while a larger class can remain cohesive when every operation supports one clear responsibility.",
        ],
      },
      {
        title: "The Design Goal",
        paragraphs: [
          "A useful goal is high cohesion and low unnecessary coupling. This keeps changes local without removing the collaborations the system genuinely needs.",
        ],
        visual: {
          src: "/notes/oop/coupling-and-cohesion.png",
          alt: "A focused OrderService with related responsibilities and a small PaymentGateway contract contrasted with a mixed-responsibility service tied to several concrete details.",
          width: 1536,
          height: 1024,
          caption:
            "Keep responsibilities together and depend on the smallest stable contracts.",
        },
      },
      {
        title: "Composition Over Inheritance",
        paragraphs: [
          "Composition means building a class from other objects that it owns or receives. It usually represents a HAS-A relationship: an OrderService has a PaymentGateway.",
          "Prefer composition when a class needs another object's behaviour but is not truly a subtype of it. The class stores or receives a collaborator and delegates work through a contract.",
          "Composition often allows behaviour to be replaced at construction time or runtime. Inheritance remains appropriate for a genuine, stable IS-A relationship that respects substitutability.",
        ],
      },
      {
        title: "Dependency Injection",
        paragraphs: [
          "Dependency injection means a class receives a required collaborator from outside instead of constructing that concrete collaborator itself. Constructor injection makes required dependencies visible and helps keep an object valid.",
          "Dependency injection is a technique. It is not the same thing as the Dependency Inversion Principle, and it does not require a framework or container.",
        ],
        points: [
          "Tight: OrderService creates a specific CardGateway internally.",
          "Looser: OrderService receives a PaymentGateway through its constructor.",
          "Tests can provide a small fake PaymentGateway without changing OrderService.",
        ],
      },
      {
        title: "Small Java Shape",
        paragraphs: [
          "The important part is that OrderService accepts the contract. The composition root creates the concrete gateway and connects the objects.",
        ],
        points: [
          "Contract: interface PaymentGateway { void pay(Order order); }",
          "Injection: OrderService(PaymentGateway gateway) { this.gateway = gateway; }",
          "Assembly: new OrderService(new CardGateway())",
        ],
      },
      {
        title: "Signs of Weak Design",
        points: [
          "One class changes for unrelated reasons.",
          "A class reaches through several objects to get one value.",
          "Business logic depends directly on database, network, or UI details.",
          "A small change requires editing many classes.",
          "Inheritance is used only to reuse a few methods.",
        ],
        paragraphs: [
          "These are warning signs, not automatic proof. Refactor only when the design and expected changes justify it.",
        ],
      },
      {
        title: "Simple Analogy",
        paragraphs: [
          "A focused restaurant kitchen station performs related work: the baking station handles baking. That is cohesion.",
          "The station requests ingredients through a clear supply process instead of depending on one specific delivery driver. That reduces unnecessary coupling.",
        ],
      },
    ],
    mechanism: {
      title: "Improving a class design",
      steps: [
        "State the class's main responsibility in one clear sentence.",
        "Move unrelated work to the object that owns that responsibility.",
        "List the collaborators the class truly needs.",
        "Depend on small stable contracts where variation is expected.",
        "Inject required collaborators and prefer composition when there is no true IS-A relationship.",
      ],
    },
    example: {
      title: "Checkout service",
      body: "CheckoutService coordinates the checkout process and delegates payment through a PaymentGateway supplied to its constructor. CardGateway and UpiGateway implement that contract. CheckoutService stays focused on checkout and does not know each gateway's network details.",
    },
    misconception:
      "Low coupling does not mean no dependencies, and high cohesion does not mean every class must be tiny. The goal is focused responsibility and necessary, stable collaboration.",
  },
  revise: {
    definitionLabel: "Overview",
    compactDefinition: true,
    definition:
      "Cohesion keeps related responsibility together; coupling measures dependency between parts.",
    sections: [
      {
        title: "Goal",
        table: {
          headers: ["High cohesion", "Low unnecessary coupling"],
          rows: [
            ["One focused purpose", "Few concrete details known"],
            ["Related data and methods", "Small stable contracts"],
            ["Changes stay local", "Collaborators can be replaced"],
          ],
        },
      },
      {
        title: "Composition",
        flow: ["Receive collaborator", "Call its contract", "Replace implementation without changing type"],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Prefer composition when IS-A is not genuine.",
      "Constructor injection exposes required dependencies.",
      "Dependency injection is not the same as Dependency Inversion.",
      "Do not add abstractions where no useful variation exists.",
    ],
    followUp: "Why is low coupling not the same as having no dependencies?",
  },
  lastMinute: {
    definition:
      "Good design = focused responsibility + small stable dependencies.",
    sections: [
      {
        title: "Remember",
        points: ["High cohesion", "Low unnecessary coupling", "Composition for HAS-A", "Inject required collaborators"],
      },
    ],
    memoryLine: "Keep related work together; keep dependency knowledge small.",
    cues: ["One reason to change", "Depend on contracts", "Composition over false inheritance"],
    trap:
      "Do not create an interface for every class only to claim low coupling.",
  },
};

export const solidPrinciples: SubjectTopic = {
  slug: "solid-principles",
  title: "SOLID Principles",
  description:
    "Use five design principles to keep object-oriented code easier to change and extend.",
  readTime: "17 min",
  difficulty: "Advanced",
  tags: ["SOLID", "Design", "Maintainability"],
  learn: {
    opening:
      "SOLID is a set of five design principles. They guide decisions; they are not rules that require extra classes in every program.",
    sections: [
      {
        title: "S — Single Responsibility Principle",
        paragraphs: [
          "A module or class should be responsible to one actor or one closely related group of stakeholders that requests the same kind of change. This is the meaning of having one reason to change; it does not mean one method per class.",
          "If Invoice both calculates totals, formats PDFs, saves database records, and sends email, unrelated changes can affect the same class. Separate those responsibilities when they truly change independently.",
        ],
      },
      {
        title: "O — Open/Closed Principle",
        paragraphs: [
          "Software entities should be open for extension but closed for modification. In practice, new behaviour should often be addable through a stable contract without repeatedly editing tested core logic.",
          "It does not mean old code can never change. Fixes, refactoring, and changed requirements still require modification. Add extension points only where change is reasonably expected.",
        ],
      },
      {
        title: "L — Liskov Substitution Principle",
        paragraphs: [
          "A subtype should work anywhere its parent type is expected without breaking the parent's meaningful promises. A child may specialize behaviour, but it must preserve valid expectations.",
          "A subtype should not demand stronger preconditions, provide weaker promised results, reject normal parent operations, or break the parent's invariants and expected failure behaviour. A hierarchy that requires those changes is probably wrong.",
        ],
      },
      {
        title: "I — Interface Segregation Principle",
        paragraphs: [
          "Clients should not be forced to depend on operations they do not use. Prefer focused role interfaces over one large interface containing unrelated operations.",
          "This does not mean every interface should contain one method. Group operations that form one meaningful client-facing role.",
        ],
      },
      {
        title: "D — Dependency Inversion Principle",
        paragraphs: [
          "High-level policy should not depend directly on low-level details; both should depend on suitable abstractions. Abstractions should not depend on details; details should depend on abstractions.",
          "The abstraction should be shaped by the stable business need, not copied from one concrete technical detail.",
          "Dependency injection can supply an implementation of that abstraction, but injection is only one technique. DIP is the design direction; DI is a way to connect objects.",
        ],
      },
      {
        title: "One Checkout Example",
        dataTable: {
          headers: ["Principle", "Applied to checkout", "Common mistake"],
          rows: [
            ["SRP", "Separate payment, receipt, and persistence jobs", "One giant service"],
            ["OCP", "Add a new PaymentMethod implementation", "Edit a growing type switch"],
            ["LSP", "Every method honours the payment contract", "Child rejects required operations"],
            ["ISP", "Small payment and refund roles", "One huge gateway interface"],
            ["DIP", "Checkout depends on PaymentGateway", "Checkout constructs one vendor SDK"],
          ],
        },
        paragraphs: [
          "The principles support one another, but one design does not need to demonstrate all five at once.",
        ],
      },
      {
        title: "Avoid Overengineering",
        paragraphs: [
          "Applying SOLID blindly can produce many tiny interfaces, layers, and factories that make simple code harder to follow. Start with clear responsibilities and real change pressure.",
          "A principle should solve a concrete design problem. Simpler direct code is often better when there is no genuine variation or maintenance cost.",
        ],
      },
      {
        title: "Simple Analogy",
        paragraphs: [
          "Think of adaptable power connections. A device depends on a stable socket contract rather than the internal wiring of one power station.",
          "The analogy explains dependency direction, but software contracts must also describe behaviour, failures, and valid results.",
        ],
      },
    ],
    mechanism: {
      title: "Using SOLID during a design review",
      steps: [
        "Find responsibilities that change for unrelated reasons.",
        "Identify variation that deserves a stable extension contract.",
        "Check that every subtype preserves the parent behaviour promises.",
        "Give each client only the operations required by its role.",
        "Keep business policy independent from replaceable technical details.",
      ],
    },
    example: {
      title: "Report delivery",
      body: "ReportService creates report data and depends on a ReportSender contract. EmailSender and CloudSender can implement that contract. Each implementation must preserve the promised send result and failure behaviour, while unrelated formatting and storage responsibilities remain separate.",
    },
    misconception:
      "SOLID does not mean more classes are always better. The principles help manage real responsibility, substitution, and change boundaries.",
  },
  revise: {
    definitionLabel: "Overview",
    compactDefinition: true,
    definition:
      "SOLID guides responsibility, extension, substitution, interface size, and dependency direction.",
    sections: [
      {
        title: "Five Principles",
        points: [
          "SRP: one actor or closely related stakeholder group requests its changes.",
          "OCP: extend expected variation without repeatedly changing stable logic.",
          "LSP: subtypes preserve the parent contract.",
          "ISP: clients depend only on relevant role operations.",
          "DIP: policy and details depend on suitable abstractions.",
        ],
      },
      {
        title: "Do Not Confuse",
        points: [
          "SRP is not one method per class.",
          "OCP is not never modify code.",
          "ISP is not one method per interface.",
          "DIP and dependency injection are related but different.",
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Use principles where change pressure justifies them.",
      "Substitution is about behaviour, not only matching method signatures.",
      "Abstractions should express stable needs.",
      "Avoid speculative layers and interfaces.",
    ],
    followUp: "How is Dependency Inversion different from dependency injection?",
  },
  lastMinute: {
    definition:
      "SOLID = responsibility, extension, substitution, focused interfaces, inverted dependencies.",
    sections: [
      {
        title: "Letters",
        points: ["S: one reason to change", "O: extend stable design", "L: safe substitution", "I: focused client roles", "D: depend on abstractions"],
      },
    ],
    memoryLine: "SOLID guides change; it does not demand extra layers everywhere.",
    cues: ["Contracts", "Expected variation", "Business policy over details"],
    trap:
      "Do not call a hierarchy valid only because its methods have matching signatures; behaviour must remain substitutable.",
  },
};

export const factoryAndStrategyPatterns: SubjectTopic = {
  slug: "factory-and-strategy-patterns",
  title: "Factory and Strategy Patterns",
  description:
    "Separate object creation with factories and replaceable behaviour with strategies.",
  readTime: "15 min",
  difficulty: "Advanced",
  tags: ["Factory", "Strategy", "Patterns"],
  learn: {
    opening:
      "A factory answers which object should be created. A strategy answers which interchangeable behaviour should be used.",
    sections: [
      {
        title: "Why Factories Help",
        paragraphs: [
          "Object creation may require validation, configuration, caching, or selection of a concrete implementation. Repeating that logic across callers increases coupling.",
          "A factory moves creation decisions behind a method or object and can return a common product abstraction. Simple construction does not need a factory.",
        ],
      },
      {
        title: "Factory Terms",
        paragraphs: [
          "Factory is also a general design idea, so names are often mixed. Keep these meanings separate.",
        ],
        points: [
          "Simple factory: one helper chooses and creates a product; useful, but not the original GoF Factory Method pattern.",
          "Factory Method: a creator defines a method for creating an object and lets subclasses decide which concrete product to create.",
          "Abstract Factory: one contract creates a family of related products without naming concrete product classes to the client.",
          "Static factory method: a named static creation method such as of(...) or valueOf(...); not automatically the Factory Method pattern.",
        ],
      },
      {
        title: "Strategy Pattern",
        paragraphs: [
          "Strategy defines a family of interchangeable behaviours behind one contract. A context receives or selects a strategy and delegates the operation to it.",
          "For example, Checkout can use StandardDiscount, FestivalDiscount, or NoDiscount without becoming those types. Each strategy must honour the same calculation contract.",
        ],
      },
      {
        title: "Factory vs Strategy",
        paragraphs: [
          "The patterns often work together: a factory can create or select a strategy, and the context then uses that strategy.",
        ],
        visual: {
          src: "/notes/oop/factory-vs-strategy.png",
          alt: "Factory chooses which PaymentMethod object to create, while Checkout delegates calculate work to one interchangeable DiscountStrategy.",
          width: 1536,
          height: 1024,
          caption:
            "Factory separates creation; Strategy separates replaceable behaviour.",
        },
        table: {
          headers: ["Factory", "Strategy"],
          rows: [
            ["Focuses on object creation", "Focuses on interchangeable behaviour"],
            ["Returns a suitable product", "Context delegates to selected algorithm"],
            ["Hides construction details", "Avoids behaviour condition chains"],
          ],
        },
      },
      {
        title: "When to Use Them",
        points: [
          "Use a factory when creation details vary or should be centralized.",
          "Use Strategy when several behaviours share a meaningful contract and must be replaceable.",
          "Pass a strategy directly when creation logic is simple; a factory is not always needed.",
          "A small switch inside one factory can be acceptable; moving the same switch across many callers is the larger problem.",
        ],
        paragraphs: [
          "Patterns add indirection. Use them when they make expected change clearer, not merely because their names sound advanced.",
        ],
      },
      {
        title: "Small Java Shape",
        paragraphs: [
          "The context talks to the Strategy contract. A factory may separately create the required product.",
        ],
        points: [
          "Strategy contract: interface DiscountStrategy { double calculate(Order order); }",
          "Context injection: Checkout(DiscountStrategy strategy) { this.strategy = strategy; }",
          "Factory method call: PaymentMethod method = factory.create(type);",
        ],
      },
      {
        title: "Simple Analogy",
        paragraphs: [
          "A travel desk chooses and issues the correct ticket: factory. The chosen route-planning method decides fastest, cheapest, or shortest travel: strategy.",
          "One creates the needed object; the other performs replaceable work.",
        ],
      },
    ],
    mechanism: {
      title: "Using Factory with Strategy",
      steps: [
        "Define the behaviour contract required by the context.",
        "Create strategy implementations that preserve that contract.",
        "Let a factory or composition root choose a suitable implementation when creation varies.",
        "Give the strategy to the context.",
        "The context delegates without checking every concrete strategy type.",
      ],
    },
    example: {
      title: "Payment and discount",
      body: "PaymentMethodFactory can create CardPayment or UpiPayment from validated configuration. Checkout separately receives a DiscountStrategy and calls calculate(order). Creation choice and pricing behaviour remain independent concerns.",
    },
    misconception:
      "A factory is not required for every new expression, and Strategy is not merely renaming a large switch without creating a stable behaviour contract.",
  },
  revise: {
    definitionLabel: "Overview",
    compactDefinition: true,
    definition:
      "Factory hides varying creation; Strategy provides replaceable behaviour through one contract.",
    sections: [
      {
        title: "Compare",
        table: {
          headers: ["Factory", "Strategy"],
          rows: [
            ["Which object to create?", "Which behaviour to use?"],
            ["Returns product abstraction", "Implements behaviour abstraction"],
            ["Creation varies", "Algorithm varies"],
          ],
        },
      },
      {
        title: "Factory Names",
        points: ["Simple Factory", "Factory Method", "Abstract Factory", "Static factory method is a separate creation idiom"],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Factory and Strategy solve different problems.",
      "They can be used together but do not require each other.",
      "Every product or strategy must respect its common contract.",
      "Do not add pattern indirection to trivial construction or behaviour.",
    ],
    followUp: "Why is a static factory method not automatically the Factory Method pattern?",
  },
  lastMinute: {
    definition:
      "Factory creates or returns the required object; Strategy performs replaceable behaviour.",
    sections: [
      {
        title: "Flow",
        flow: ["Factory selects object", "Context receives strategy", "Context delegates behaviour"],
        wide: true,
      },
    ],
    memoryLine: "Factory = create or return a product. Strategy = interchangeable algorithm.",
    cues: ["Common product", "Common behaviour", "Avoid repeated concrete checks"],
    trap:
      "Do not call every static creation helper the GoF Factory Method pattern.",
  },
};

export const observerAndSingletonPatterns: SubjectTopic = {
  slug: "observer-and-singleton-patterns",
  title: "Observer and Singleton Patterns",
  description:
    "Understand event subscribers and the trade-offs of controlled single-instance access.",
  readTime: "16 min",
  difficulty: "Advanced",
  tags: ["Observer", "Singleton", "Events"],
  learn: {
    opening:
      "Observer distributes event notifications to registered subscribers. Singleton ensures one instance within a defined runtime scope and provides a controlled access point to it.",
    sections: [
      {
        title: "Observer Pattern",
        paragraphs: [
          "A subject or publisher keeps a collection of observers or subscribers. Subscribers register interest, and the publisher notifies them when a relevant event occurs.",
          "The publisher depends on a subscriber contract rather than every concrete listener. Subscribers can be added or removed without placing all reactions inside the publisher.",
        ],
      },
      {
        title: "Observer Flow",
        paragraphs: [
          "A notification may push event data to subscribers or let subscribers pull more data from the subject. The contract should make the chosen behaviour clear.",
        ],
        visual: {
          src: "/notes/oop/observer-flow.png",
          alt: "Email, Inventory, and Analytics subscribers register with an Order publisher, which sends one OrderPlaced event to all three.",
          width: 1536,
          height: 1024,
          caption:
            "Subscribers register with the publisher; one event can notify several independent reactions.",
        },
      },
      {
        title: "Observer Is Not Automatically Asynchronous",
        paragraphs: [
          "The pattern describes dependency and notification structure, not thread or delivery behaviour. Notifications may be synchronous or asynchronous depending on the implementation.",
          "A classic direct Observer implementation commonly calls subscribers synchronously. An event bus or message broker may deliver notifications asynchronously, but that is an additional implementation or architectural choice.",
          "Ordering, retries, error isolation, duplicate delivery, and thread safety must be designed separately when the system needs them.",
        ],
      },
      {
        title: "Observer Risks",
        points: [
          "A subscriber that is never removed may stay reachable and cause a memory leak.",
          "Long notification chains can make control flow difficult to trace.",
          "One failing synchronous subscriber may interrupt later notifications unless errors are isolated.",
          "Subscribers should avoid creating uncontrolled event loops.",
        ],
        paragraphs: [
          "Use clear subscription lifecycles and document delivery semantics.",
        ],
      },
      {
        title: "Singleton Pattern",
        paragraphs: [
          "Singleton ensures that a class has one instance within a defined scope and provides a controlled access point to it. It normally restricts construction so callers cannot freely create more instances.",
          "One instance in one JVM class loader is not the same as one instance across several class loaders, processes, servers, or machines. Distributed uniqueness needs an external coordination mechanism.",
        ],
      },
      {
        title: "Creating a Java Singleton Safely",
        paragraphs: [
          "Eager initialization is simple and thread-safe through Java class initialization. Lazy initialization needs correct synchronization or another safe holder technique.",
          "A one-constant Java enum is often a robust singleton implementation because enum construction and serialization preserve the defined constant. It cannot extend another class and may not fit every design.",
        ],
        points: [
          "Define the scope and reason for uniqueness.",
          "Keep construction controlled.",
          "Make initialization thread-safe.",
          "Do not allow serialization or cloning to silently create another ordinary-class instance.",
        ],
      },
      {
        title: "Small Java Shape",
        paragraphs: [
          "A one-constant enum is the shortest robust Java form. It protects enum construction and preserves the same named constant during serialization, but callers can still misuse it as global state.",
        ],
        points: [
          "Declaration: enum AppConfig { INSTANCE; }",
          "Access: AppConfig config = AppConfig.INSTANCE;",
          "An ordinary class-based Singleton must also consider reflection, serialization, cloning, and thread-safe publication.",
        ],
      },
      {
        title: "Singleton Trade-offs",
        paragraphs: [
          "A singleton can hide dependencies and become mutable global state. That makes tests interfere with one another and couples callers to a global access point.",
          "Prefer normal dependency injection when an object merely needs one shared service. Use Singleton only when the one-instance rule is a real requirement, not only a convenient access shortcut.",
        ],
        table: {
          headers: ["Possible benefit", "Common cost"],
          rows: [
            ["Controlled instance creation", "Hidden global dependency"],
            ["Shared expensive resource", "Harder test isolation"],
            ["Single access point", "Mutable global state risk"],
          ],
        },
      },
      {
        title: "Simple Analogy",
        paragraphs: [
          "Observer is like subscribing to an exam-result alert: one published result reaches every registered channel.",
          "Singleton is like one official registry for one office. The analogy stops at that office boundary; another office or process can have its own registry.",
        ],
      },
    ],
    mechanism: {
      title: "Choosing Observer or Singleton",
      steps: [
        "Use Observer when one event has independent, changing subscribers.",
        "Define subscription, unsubscription, event data, and delivery behaviour.",
        "Use Singleton only when one instance is a genuine invariant in a named scope.",
        "Choose a thread-safe initialization approach for that scope.",
        "Prefer explicit dependency injection when global access is not required.",
      ],
    },
    example: {
      title: "Order events and configuration",
      body: "OrderService publishes OrderPlaced to registered InventoryListener and EmailListener implementations. A process-wide immutable configuration may have one controlled instance, but services should still receive it explicitly so their dependency remains visible.",
    },
    misconception:
      "Observer does not guarantee asynchronous reliable delivery, and Singleton does not guarantee one object across an entire distributed system.",
  },
  revise: {
    definitionLabel: "Overview",
    compactDefinition: true,
    definition:
      "Observer notifies registered subscribers; Singleton controls one instance within a defined scope.",
    sections: [
      {
        title: "Observer",
        points: ["Subscribe", "Publish event", "Notify subscribers", "Unsubscribe when required", "Define sync or async separately"],
      },
      {
        title: "Singleton",
        points: ["Controlled construction", "One scoped instance", "Thread-safe initialization", "Global-state and testing risks"],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Observer separates publishers from concrete reactions.",
      "Observer delivery guarantees are implementation choices.",
      "Singleton scope may be one class loader or process, not every machine.",
      "Java enum singleton is robust but still creates global access if used globally.",
      "Dependency injection often makes shared services easier to test.",
    ],
    followUp: "Why does Observer not automatically mean asynchronous event delivery?",
  },
  lastMinute: {
    definition:
      "Observer = a publisher can notify zero or more registered subscribers. Singleton = one controlled instance in a stated scope.",
    sections: [
      {
        title: "Observer Flow",
        flow: ["Subscribe", "Event", "Notify", "Independent reactions"],
        wide: true,
      },
      {
        title: "Singleton Checks",
        points: ["Real uniqueness need?", "What scope?", "Thread-safe creation?", "Can dependency be injected instead?"],
      },
    ],
    memoryLine: "Observer distributes change; Singleton restricts creation.",
    cues: ["Unsubscribe", "Sync/async is separate", "Beware global state"],
    trap:
      "Do not claim a Singleton automatically creates one instance across multiple processes or servers.",
  },
};
