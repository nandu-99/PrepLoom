import type { SubjectTopic } from "@/lib/subject-content";

export const polymorphism: SubjectTopic = {
  slug: "polymorphism",
  title: "Polymorphism",
  description:
    "Understand how one common type can work with objects that behave differently.",
  readTime: "11 min",
  difficulty: "Intermediate",
  tags: ["Polymorphism", "Subtyping", "Dispatch"],
  learn: {
    opening:
      "Polymorphism means one name or common contract can have multiple valid forms. In OOP, the most important form lets the actual object decide which overridden behaviour runs.",
    sections: [
      {
        title: "Start With Repeated Decisions",
        paragraphs: [
          "Imagine a notification service that can send Email, SMS, and Push notifications. Without polymorphism, the service may contain a long chain of if or switch statements that checks every notification type.",
          "With polymorphism, every notification type follows a common send operation. The service calls send, and each object performs its own version.",
        ],
      },
      {
        title: "What Polymorphism Means",
        paragraphs: [
          "The word means many forms. In OOP, one parent type or interface can represent objects of several child classes.",
          "For example, a Notification reference can point to an EmailNotification, SmsNotification, or PushNotification object. The same send() call can then behave differently for each object.",
        ],
        visual: {
          src: "/notes/oop/polymorphic-dispatch.png",
          alt: "A Notification reference can point to any one Email, SMS, or Push object at a time, and the same send call reaches that object's own implementation.",
          width: 1536,
          height: 1024,
          caption:
            "A common reference can point to any one compatible object at a time, and the actual object supplies the behaviour.",
        },
      },
      {
        title: "Two Common Forms",
        table: {
          headers: ["Compile-time polymorphism", "Runtime polymorphism"],
          rows: [
            ["Usually method or constructor overloading", "Method overriding through a parent type or interface"],
            ["Compiler selects a matching parameter list", "Runtime dispatch selects the most specific override"],
            ["Also called static or early binding in basic notes", "Also called dynamic or late binding"],
          ],
        },
        paragraphs: [
          "These names are common in exams. More precisely, overloading is a form of ad-hoc polymorphism resolved by the compiler. Programming languages have other forms, but overloading and overriding are the required OOP forms here.",
        ],
      },
      {
        title: "Reference Type and Object Type",
        paragraphs: [
          "In 'Notification item = new EmailNotification()', Notification is the reference's compile-time type and EmailNotification is the runtime object's class.",
          "The reference type controls which members the compiler allows through item. For an overridden instance method, the runtime object's class controls which implementation runs.",
        ],
        points: [
          "item.send() can run EmailNotification.send().",
          "A method that exists only in EmailNotification is not directly available through a Notification reference.",
          "The object has not changed into a Notification; only the reference view is more general.",
        ],
      },
      {
        title: "What Runtime Dispatch Applies To",
        paragraphs: [
          "In Java, runtime polymorphism applies to overridden instance methods. It does not dynamically select fields, constructors, static methods, or overloaded parameter lists.",
          "Java instance methods that can be overridden use dynamic dispatch automatically. In C++, the base method must be virtual for calls through a base pointer or reference to dispatch to an override.",
          "Avoid calling an overridable method from a constructor. Runtime dispatch may reach a child override before the child fields are fully initialized.",
        ],
      },
      {
        title: "Why It Is Useful",
        points: [
          "Common code can work with many implementations.",
          "A new child implementation can often be added without changing the caller.",
          "Large type-checking condition chains can be reduced.",
          "Tests can provide a simpler implementation of the same contract.",
        ],
        paragraphs: [
          "Polymorphism works well only when every implementation respects the common contract. Different behaviour is allowed; broken promises are not.",
        ],
      },
      {
        title: "Simple Analogy",
        paragraphs: [
          "Think of a play button in different media apps. The command is the same, but a music player starts a song and a video player starts a video.",
          "The caller uses one clear command while each receiver knows how to perform it.",
        ],
      },
    ],
    mechanism: {
      title: "How runtime polymorphism works",
      steps: [
        "Define a common parent type or interface with an operation.",
        "Child classes provide valid implementations of that operation.",
        "Store a child object in a parent-type reference.",
        "Call the operation through the common reference.",
        "Runtime dispatch selects the most specific override for the actual object.",
      ],
    },
    example: {
      title: "Sending different notifications",
      body: "A Java list can be created as 'List<Notification> notifications = List.of(new EmailNotification(), new SmsNotification())'. A loop calls notification.send() for every item. Each object sends through its own channel without the loop checking its concrete class.",
    },
    misconception:
      "Polymorphism does not mean every member is selected at runtime. In Java, dynamic dispatch applies to overridden instance methods, not fields, static methods, constructors, or overload selection.",
  },
  revise: {
    definitionLabel: "Overview",
    compactDefinition: true,
    definition:
      "Polymorphism lets one common type represent different objects whose shared operation has different implementations.",
    sections: [
      {
        title: "Main Forms",
        table: {
          headers: ["Compile time", "Runtime"],
          rows: [
            ["Overloading", "Overriding"],
            ["Chosen from argument types", "Chosen from runtime object"],
            ["Static or early binding", "Dynamic or late binding"],
          ],
        },
      },
      {
        title: "Dispatch Rule",
        flow: ["Parent reference", "Child object", "Call shared method", "Child override runs"],
      },
      {
        title: "Java Boundary",
        points: [
          "Overridden instance methods use runtime dispatch.",
          "Fields and static methods follow compile-time rules.",
          "The reference type controls which members can be called.",
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "One interface can support many implementations.",
      "The child object must respect the parent contract.",
      "Polymorphism can remove repeated type checks.",
      "Java dispatches overridable instance methods dynamically; C++ needs virtual.",
    ],
    followUp: "Why can the same send() call run different implementations?",
  },
  lastMinute: {
    definition:
      "Polymorphism = one common operation, many valid implementations.",
    sections: [
      {
        title: "Two Forms",
        points: ["Overloading: compile time", "Overriding: runtime"],
      },
      {
        title: "Runtime Flow",
        flow: ["Parent reference", "Child object", "Method call", "Child override"],
        wide: true,
      },
    ],
    memoryLine: "Reference decides what is callable; runtime object decides which override runs.",
    cues: ["One contract", "Many implementations", "Java instance-method dispatch"],
    trap:
      "Do not say fields or static methods use runtime polymorphism in Java.",
  },
};

export const overloadingVsOverriding: SubjectTopic = {
  slug: "method-overloading-vs-method-overriding",
  title: "Method Overloading vs Method Overriding",
  description:
    "Separate compile-time overload selection from runtime method overriding.",
  readTime: "13 min",
  difficulty: "Intermediate",
  tags: ["Overloading", "Overriding", "Methods"],
  learn: {
    opening:
      "Overloading gives one method name several parameter lists. Overriding gives an inherited instance method a new implementation in a child class.",
    sections: [
      {
        title: "Method Overloading",
        paragraphs: [
          "Methods are overloaded when they have the same name but different parameter lists. The difference must involve the number, types, or order of parameters.",
          "The compiler selects an applicable overload using the compile-time types of the arguments. Constructors can also be overloaded.",
        ],
        points: [
          "print(int value) and print(String value) are overloads.",
          "add(int a, int b) and add(int a, int b, int c) are overloads.",
          "Changing only parameter names does not create an overload.",
          "Changing only the return type does not create a valid Java overload.",
        ],
      },
      {
        title: "Method Overriding",
        paragraphs: [
          "A child class overrides an inherited instance method by providing a compatible method declaration. The method keeps the same contract but supplies child-specific behaviour.",
          "In Java, runtime dispatch selects the override from the actual object's class. Use @Override so the compiler checks that overriding really occurs.",
        ],
        points: [
          "The overriding method cannot reduce access.",
          "Its reference return type may be more specific, called a covariant return type.",
          "It cannot declare broader checked exceptions than the parent method permits.",
          "A final method cannot be overridden.",
          "A private method is not inherited and therefore is not overridden.",
          "A static method is hidden, not overridden.",
        ],
      },
      {
        title: "Side-by-Side Difference",
        paragraphs: [
          "The key difference is when the decision is made and whether the parameter list or inherited behaviour changes.",
        ],
        visual: {
          src: "/notes/oop/overloading-vs-overriding.png",
          alt: "Balanced comparison showing compile-time method overloading on one side and runtime method overriding on the other.",
          width: 1536,
          height: 1024,
          caption:
            "Overloading changes the parameter list; overriding changes inherited behaviour.",
        },
        dataTable: {
          headers: ["Point", "Overloading", "Overriding"],
          rows: [
            ["Meaning", "Same name, different parameters", "Compatible inherited instance method"],
            ["Classes", "Can be in one class or across inheritance", "Requires a subtype relationship"],
            ["Decision", "Compile time", "Runtime object"],
            ["Return type", "Alone cannot distinguish overloads", "Same or covariant reference type"],
            ["Binding", "Static or early", "Dynamic or late"],
          ],
        },
      },
      {
        title: "When Both Rules Work Together",
        paragraphs: [
          "A method name can be both overloaded and overridden. Java first selects the overload at compile time using the reference and argument types. If the selected method is an overridden instance method, runtime dispatch then chooses its most specific implementation.",
          "This order explains many interview questions: overload first, override second.",
        ],
      },
      {
        title: "Common Overloading Traps",
        paragraphs: [
          "Automatic numeric conversion, boxing, varargs, and null can make overload selection less obvious. The compiler reports an error if no single overload is most specific.",
          "Java checks fixed-arity overloads in applicability phases before using a variable-arity method. Avoid memorizing one oversimplified priority list; the most-specific applicable method must still be unique.",
        ],
        points: [
          "show(String) and show(Integer) make show(null) ambiguous because neither parameter type is more specific than the other.",
          "process(List<String>) and process(List<Integer>) cannot be overloaded in Java because type erasure gives them the same erased signature.",
          "Prefer overloads whose meaning is clear instead of creating many surprising combinations.",
        ],
      },
      {
        title: "C++ Note",
        paragraphs: [
          "In C++, runtime overriding requires a virtual base method. Writing override on the child method is recommended because the compiler checks the intended override.",
          "A child declaration can also hide same-named overloads from its base class. A using declaration can bring the required base overloads into the child scope.",
        ],
      },
      {
        title: "Simple Analogy",
        paragraphs: [
          "Overloading is like one help desk accepting requests by phone, email, or chat: the same service name accepts different inputs.",
          "Overriding is like each regional help desk following the same support contract but answering in its own appropriate way.",
        ],
      },
    ],
    mechanism: {
      title: "How Java chooses a call",
      steps: [
        "Read the method name and the compile-time types of the reference and arguments.",
        "At compile time, select the single most specific applicable overload.",
        "If the chosen declaration is static, private, or otherwise not overridable, use its compile-time rule.",
        "If it is an overridden instance method, inspect the runtime object's class.",
        "Run the most specific override for that object.",
      ],
    },
    example: {
      title: "A call using both rules",
      body: "Suppose Printer has overloaded print(String) and print(Object) methods, and ColorPrinter overrides print(String). For a Printer reference holding a ColorPrinter object, print(\"Hi\") selects print(String) at compile time and then runs ColorPrinter's override at runtime.",
    },
    misconception:
      "A different return type alone is not overloading, and a same-named static or private child method is not overriding.",
  },
  revise: {
    definitionLabel: "Overview",
    compactDefinition: true,
    definition:
      "Overloading changes parameters and is selected at compile time; overriding replaces inherited instance behaviour and dispatches at runtime.",
    sections: [
      {
        title: "Compare",
        dataTable: {
          headers: ["Rule", "Overloading", "Overriding"],
          rows: [
            ["Parameters", "Must differ", "Same signature or valid subsignature"],
            ["Inheritance", "Not required", "Required"],
            ["Selection", "Compile time", "Runtime"],
            ["Return type", "Not enough alone", "Same or covariant"],
          ],
        },
      },
      {
        title: "Java Override Rules",
        points: [
          "Do not reduce access.",
          "Do not broaden checked exceptions.",
          "private is not overridden; static is hidden.",
          "final blocks overriding.",
          "Use @Override.",
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Overload = same name, different parameter list.",
      "Override = compatible inherited instance method.",
      "Return type alone cannot overload a Java method.",
      "When both apply: select overload first, dispatch override second.",
    ],
    followUp: "What happens first when a method is both overloaded and overridden?",
  },
  lastMinute: {
    definition:
      "Overloading changes inputs; overriding changes inherited behaviour.",
    sections: [
      {
        title: "Fast Compare",
        points: [
          "Overloading: different parameters, compile time",
          "Overriding: compatible inherited method, runtime",
          "Return type alone: not an overload",
        ],
      },
      {
        title: "Order",
        flow: ["Select overload at compile time", "Dispatch override at runtime"],
        wide: true,
      },
    ],
    memoryLine: "Overload first; override second.",
    cues: ["private: not overridden", "static: hidden", "final: cannot override"],
    trap:
      "Do not decide an overload from the runtime argument object; Java uses compile-time argument types.",
  },
};

export const dynamicBindingAndCasting: SubjectTopic = {
  slug: "dynamic-binding-and-type-casting",
  title: "Dynamic Binding and Type Casting",
  description:
    "Follow method binding, safe upcasting, checked downcasting, and reference visibility.",
  readTime: "13 min",
  difficulty: "Intermediate",
  tags: ["Binding", "Upcasting", "Downcasting"],
  learn: {
    opening:
      "Binding connects a method call to an implementation. Casting changes the type through which a reference is viewed; it does not change the actual object.",
    sections: [
      {
        title: "Static and Dynamic Binding",
        paragraphs: [
          "Static or early binding makes a decision using compile-time information. Java uses compile-time rules for overload selection, fields, static methods, private methods, and constructors.",
          "Dynamic or late binding selects an overridden instance method using the runtime object's class. This is the mechanism behind runtime polymorphism.",
        ],
      },
      {
        title: "Upcasting",
        paragraphs: [
          "Upcasting treats a child object as one of its parent types or implemented interfaces. In Java it is normally safe and implicit because every valid child object is also an instance of its parent type.",
          "After upcasting, the reference exposes only members allowed by its compile-time type, but overridden instance methods still dispatch to the actual object.",
        ],
        points: [
          "Dog dog = new Dog();",
          "Animal animal = dog; // implicit upcast",
          "animal.sound() can run Dog.sound().",
          "animal.fetch() is unavailable if fetch exists only in Dog.",
        ],
      },
      {
        title: "Downcasting",
        paragraphs: [
          "Downcasting asks to view a parent-type reference as a more specific child type. Java requires an explicit cast because the reference may not actually point to that child class.",
          "Java first checks whether the requested cast could legally be possible. If it is allowed, Java checks a non-null object at runtime. The cast succeeds only when the runtime object is compatible with the target type; otherwise it throws ClassCastException.",
        ],
        points: [
          "Dog dog = (Dog) animal; // valid only if animal refers to a Dog",
          "Casting does not create a Dog or change an Animal into one.",
          "Do not downcast to call an overridden method; runtime dispatch already selects the child override.",
          "Frequent downcasting can mean the common interface is missing a needed operation.",
        ],
      },
      {
        title: "Check Before Downcasting",
        paragraphs: [
          "Use instanceof when the program truly needs type-specific behaviour. Modern Java can test and create the child variable together: 'if (animal instanceof Dog dog)'.",
          "If the reference is null, instanceof returns false. Casting null to a reference type produces null, but calling a method through that null reference throws NullPointerException.",
        ],
        visual: {
          src: "/notes/oop/upcasting-and-downcasting.png",
          alt: "A Dog object is safely viewed through an Animal reference, while checked downcasting uses instanceof and an incompatible direct cast leads to ClassCastException.",
          width: 1536,
          height: 1024,
          caption:
            "Upcasting is general and safe; downcasting must match the runtime object.",
        },
      },
      {
        title: "Reference Type vs Runtime Object",
        paragraphs: [
          "Use this table to separate the compile-time checks from the decisions made at runtime.",
        ],
        dataTable: {
          headers: ["Question", "What decides it?", "Example"],
          rows: [
            ["Can this member be called?", "Compile-time reference type", "Animal may expose sound()"],
            ["Which override runs?", "Runtime object's class", "Dog.sound()"],
            ["Is a downcast valid?", "Runtime object compatibility", "Animal reference must hold a Dog"],
            ["Which overload is selected?", "Compile-time argument types", "print(Animal) or print(Dog)"],
          ],
        },
      },
      {
        title: "Java and C++ Difference",
        paragraphs: [
          "Java checks ordinary narrowing reference casts at runtime and throws ClassCastException when a non-null object is incompatible. Because generic type arguments are erased, some generic casts cannot be fully checked and produce an unchecked warning.",
          "For example, Java can check that an object is a List at runtime, but it cannot fully check whether it is a List<String>. Reading a wrongly typed element later may cause ClassCastException.",
          "In C++, safe runtime downcasting commonly uses dynamic_cast with a polymorphic base class. A failed pointer dynamic_cast returns nullptr, while a failed reference dynamic_cast throws std::bad_cast.",
        ],
      },
      {
        title: "Simple Analogy",
        paragraphs: [
          "A hospital ID can show that a person is a StaffMember without showing a specialist role. Treating a Surgeon as StaffMember is like upcasting.",
          "Claiming that an unknown StaffMember is a Surgeon is like downcasting: it is valid only after the actual role is checked.",
        ],
      },
    ],
    mechanism: {
      title: "Following a Java method call",
      steps: [
        "Use the reference type to check whether the method is available.",
        "Use compile-time argument types to select an overload.",
        "If the selected method is an overridable instance method, inspect the runtime object.",
        "Run the most specific override for that object.",
        "For a downcast, first confirm that the runtime object matches the target type.",
      ],
    },
    example: {
      title: "Animal reference holding a Dog",
      body: "Animal animal = new Dog() is an upcast. animal.sound() runs Dog.sound() when sound is overridden. Dog-only behaviour is not visible through animal. After 'if (animal instanceof Dog dog)', code may safely call dog.fetch().",
    },
    misconception:
      "A cast changes only the reference view. It does not change the object, add child data, or force runtime dispatch for fields and static methods.",
  },
  revise: {
    definitionLabel: "Overview",
    compactDefinition: true,
    definition:
      "Dynamic binding chooses an override from the runtime object; casting changes the reference view without changing the object.",
    sections: [
      {
        title: "Binding",
        table: {
          headers: ["Static binding", "Dynamic binding"],
          rows: [
            ["Compile-time decision", "Runtime decision"],
            ["Overloads, fields, static and private methods", "Overridden instance methods"],
          ],
        },
      },
      {
        title: "Casting",
        table: {
          headers: ["Upcasting", "Downcasting"],
          rows: [
            ["Child to parent", "Parent reference to child type"],
            ["Normally implicit and safe", "Explicit and runtime-checked"],
            ["Type-safe but narrows visible interface", "Can expose child-specific members"],
          ],
        },
      },
      {
        title: "Safe Downcast",
        flow: ["Parent reference", "instanceof target type", "Pattern variable", "Use child operation"],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Reference type decides what can be called.",
      "Runtime object decides which override runs.",
      "Upcasting is normally implicit; downcasting is explicit.",
      "A cast must first be legal at compile time.",
      "An incompatible Java downcast throws ClassCastException.",
      "Casting does not change the actual object.",
    ],
    followUp: "Why can animal.sound() work while animal.fetch() does not compile?",
  },
  lastMinute: {
    definition:
      "Binding chooses an implementation; casting changes the reference view.",
    sections: [
      {
        title: "Casting Flow",
        flow: ["Dog object", "Upcast to Animal", "Check instanceof", "Downcast to Dog"],
        wide: true,
      },
      {
        title: "Remember",
        points: [
          "Upcast: implicit, type-safe, narrower view",
          "Downcast: explicit and checked",
          "Wrong Java downcast: ClassCastException",
          "null instanceof Type: false",
        ],
      },
    ],
    memoryLine: "Reference type controls access; runtime object controls overrides.",
    cues: ["Cast changes the view, not object", "Check before downcast", "Overload before override"],
    trap:
      "Do not downcast only to force a different override; overridden methods already use runtime dispatch.",
  },
};
