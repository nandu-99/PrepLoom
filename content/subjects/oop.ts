import type { SubjectContent, SubjectTopic } from "@/lib/subject-content";
import { curateTopicSections } from "@/content/subjects/curation";
import {
  abstractClassesAndInterfaces,
  abstraction,
  accessModifiers,
  encapsulation,
} from "@/content/subjects/oop/encapsulation-and-abstraction";
import {
  inheritance,
  isAAndHasA,
  objectRelationships,
  typesOfInheritance,
} from "@/content/subjects/oop/inheritance-and-relationships";
import {
  dynamicBindingAndCasting,
  overloadingVsOverriding,
  polymorphism,
} from "@/content/subjects/oop/polymorphism-and-binding";
import {
  identityEqualityAndCopying,
  immutability,
  staticVsInstanceMembers,
  thisSuperAndObjectContext,
} from "@/content/subjects/oop/important-class-concepts";
import {
  couplingCohesionAndComposition,
  factoryAndStrategyPatterns,
  observerAndSingletonPatterns,
  solidPrinciples,
} from "@/content/subjects/oop/good-design-and-patterns";

const introductionToOop: SubjectTopic = {
  slug: "introduction-to-oop",
  title: "Introduction to Object-Oriented Programming",
  description:
    "Start with a simple idea: OOP keeps the data and actions for one thing together.",
  readTime: "8 min",
  difficulty: "Foundation",
  tags: ["OOP", "Objects", "Design"],
  learn: {
    opening:
      "Object-Oriented Programming, or OOP, is a way to organize a program. It keeps the data and actions related to one thing together inside an object.",
    sections: [
      {
        title: "Start With a Simple Program",
        paragraphs: [
          "Every program has data and actions. A music app stores song details and plays songs. A shopping app stores product details and adds products to a cart.",
          "In a very small program, we can keep this data in variables and write a few functions. That works well at first.",
        ],
      },
      {
        title: "What Happens When the Program Grows?",
        paragraphs: [
          "Now imagine that the shopping app has thousands of lines of code. It has customer names, product prices, cart items, payments, and orders. It also has many functions that use this data.",
          "If everything is kept together, it becomes difficult to know which function should use which data. A small change in one place may accidentally affect another part of the program.",
        ],
        points: [
          "Related data can become scattered across many files.",
          "Any function may change data in the wrong way.",
          "The same logic may be written again in several places.",
          "Finding and fixing bugs becomes harder.",
        ],
      },
      {
        title: "How OOP Helps",
        paragraphs: [
          "OOP divides a large program into smaller, meaningful objects. Each object keeps the information it needs and provides actions that work with that information.",
          "For example, a Cart object keeps cart items and provides actions such as addItem, removeItem, and calculateTotal. Other parts of the program ask the Cart object to do this work.",
        ],
        points: [
          "Related data and actions stay in one place.",
          "Each object gets a clear responsibility.",
          "The rest of the program uses the object through its allowed actions.",
          "A change is easier to understand because it often stays inside one object.",
        ],
      },
      {
        title: "What Is an Object?",
        paragraphs: [
          "An object represents one thing inside a program. That thing can be a real item, such as a Car, or an idea used by the software, such as an Order or Payment.",
          "An object represents a responsibility and may contain related data, behaviour, or both.",
        ],
        points: [
          "Data tells us what the object knows. A Contact knows its name and phone number.",
          "Actions tell us what the object can do. A Contact can be called, edited, or deleted.",
        ],
      },
      {
        title: "A Familiar Example: Phone Contacts",
        paragraphs: [
          "Open the Contacts app on a phone. Every saved contact keeps related data such as a name, phone number, and email address. The application uses that contact for actions such as call, message, edit, and delete.",
          "We can think of every saved contact as an object. Vivek's contact and Anu's contact store different values. The application can use those values to start a call or message and can ask the Contact object to update its own details.",
        ],
      },
      {
        title: "A Simple Analogy",
        paragraphs: [
          "Imagine a school office with one huge table. Student records, teacher records, fee receipts, and exam papers are all mixed together. Anyone can pick up and change anything. The office may work when the school is small, but it becomes confusing as the school grows.",
          "Now give each department its own records and duties. The accounts department manages fees, the exam department manages marks, and the admissions department manages new students. They can still work together, but each department is responsible for its own information.",
          "OOP organizes a program in a similar way. Objects keep related information and work together through clear actions.",
        ],
      },
      {
        title: "Before OOP and With OOP",
        paragraphs: [
          "OOP is one way to organize code. It does not add new abilities to the computer; it gives developers a clearer structure for building larger programs.",
        ],
        table: {
          headers: ["Without clear object structure", "With OOP structure"],
          rows: [
            [
              "Data and functions may be scattered",
              "Related data and actions stay together",
            ],
            [
              "Many parts may change the same data",
              "An object controls how its data is used",
            ],
            [
              "Responsibilities can become unclear",
              "Each object has a clear job",
            ],
            [
              "Large code can be harder to change",
              "Changes are easier to keep in one place",
            ],
          ],
        },
      },
      {
        title: "The Same Cart, Organized in Two Ways",
        paragraphs: [
          "The following two approaches can produce the same result. OOP changes how the code is grouped, not what the computer is able to do.",
        ],
        table: {
          headers: ["Separate data and functions", "Object-oriented grouping"],
          rows: [
            ["cartItems stores the data", "A Cart object stores the items"],
            [
              "addItem(cartItems, product) changes it",
              "cart.addItem(product) asks the Cart to change itself",
            ],
            [
              "calculateTotal(cartItems) reads it",
              "cart.calculateTotal() asks the Cart for its total",
            ],
          ],
        },
      },
      {
        title: "The Basic Words You Need",
        paragraphs: [
          "For now, remember only two words. The next topic explains both in detail.",
        ],
        points: [
          "Class: A definition that describes what a type of object should contain and do.",
          "Object: One actual item created from that class, with its own data.",
        ],
      },
      {
        title: "Do We Always Need OOP?",
        paragraphs: [
          "No. A small calculation, a short script, or a simple sequence of steps may be clearer with normal variables and functions.",
          "OOP is most useful when a program has many related things, rules, and interactions. Shopping systems, banking applications, games, and large user interfaces are common examples.",
          "Procedural and functional programs can also be organized well. OOP is a useful design approach, not an automatic guarantee of clean code. Poorly designed classes can still make a program difficult to understand.",
        ],
      },
    ],
    mechanism: {
      title: "The basic OOP thinking flow",
      steps: [
        "Look at the problem and find the important things. In a shopping app, these may be Product, Cart, Customer, and Order.",
        "For each thing, decide what information it must remember.",
        "Decide what actions belong to that thing.",
        "Keep that data and those actions together in one class.",
        "Create objects from the classes and let the objects work together.",
      ],
    },
    example: {
      title: "Adding a product to a shopping cart",
      body: "The Product object keeps the product name and price. The Cart object keeps the selected items and knows how to calculate their total. When the user adds a product, the app asks the Cart object to add that Product. Each object handles a clear part of the task.",
    },
    misconception:
      "OOP is not simply writing code with classes. The main goal is to give each object related data, useful actions, and a clear responsibility.",
  },
  revise: {
    definitionLabel: "Overview",
    compactDefinition: true,
    definition:
      "OOP organizes a program into objects. Each object keeps related data and actions together.",
    sections: [
      {
        title: "The Problem",
        points: [
          "Large programs contain a lot of connected data and logic.",
          "If everything is mixed together, changes and bugs become harder to manage.",
        ],
      },
      {
        title: "The OOP Solution",
        points: [
          "Find the important things in the problem.",
          "Represent each thing as an object.",
          "Keep its related data and actions together.",
          "Give every object a clear responsibility.",
        ],
      },
      {
        title: "Simple Example",
        points: [
          "Contact data: name, phone number, and email.",
          "Contact actions: call, message, edit, and delete.",
          "Every saved contact is a separate object.",
        ],
      },
      {
        title: "Without Structure vs With OOP",
        table: {
          headers: ["Without clear structure", "With OOP"],
          rows: [
            [
              "Data and functions may be scattered",
              "Related data and actions stay together",
            ],
            ["Responsibilities can be unclear", "Each object has a clear job"],
          ],
        },
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Object = related data + related actions.",
      "Class = definition used to create objects.",
      "OOP helps organize large programs into smaller responsibilities.",
      "OOP is useful for many large systems, but it is not needed for every small task.",
    ],
    followUp:
      "Why does keeping related data and actions together make a program easier to manage?",
  },
  lastMinute: {
    definition: "OOP keeps related data and actions together inside objects.",
    sections: [
      {
        title: "Why We Need It",
        points: [
          "Organizes growing code",
          "Separates responsibilities",
          "Makes changes easier to manage",
        ],
      },
      {
        title: "Two Basic Words",
        points: [
          "Class: definition",
          "Object: actual item created from a class",
        ],
      },
      {
        title: "Basic Flow",
        flow: [
          "Find a thing",
          "Group its data and actions",
          "Create an object",
          "Objects work together",
        ],
        wide: true,
      },
    ],
    memoryLine: "OOP = keep the data and actions for one thing together.",
    cues: [
      "Large mixed code is difficult to manage.",
      "Objects divide the program into clear parts.",
      "Example: one Contact object keeps contact details and contact actions.",
    ],
    trap: "OOP is not required for every program. Small tasks may be clearer with simple variables and functions.",
  },
};

const classesAndObjects: SubjectTopic = {
  slug: "classes-and-objects",
  title: "Classes and Objects",
  description:
    "Understand classes and objects through simple examples such as phone contacts and student forms.",
  readTime: "10 min",
  difficulty: "Foundation",
  tags: ["Class", "Object", "Instance"],
  learn: {
    opening:
      "A class is a common definition. An object is one actual item created from that definition.",
    sections: [
      {
        title: "Start With a Simple Problem",
        paragraphs: [
          "Imagine building a Contacts app. Every contact needs a name and phone number. Every contact can also be called or edited.",
          "We could write these details separately for every person, but we would repeat the same structure again and again. We need one common definition for all contacts.",
        ],
      },
      {
        title: "Class: The Common Definition",
        paragraphs: [
          "A class describes what a particular type of object should know and what it should be able to do.",
          "A Contact class can say that every contact has a name and phone number, and that every contact can be edited. The class definition does not store each object's separate instance values. A class can also declare static data that is shared at the class level; static members are covered later.",
        ],
        points: [
          "It gives a name to a type, such as Contact or Car.",
          "It lists the data that objects of that type need.",
          "It lists the actions those objects can perform.",
        ],
      },
      {
        title: "Object: One Actual Item",
        paragraphs: [
          "An object is one actual item created from a class. If Contact is the class, then Vivek's saved contact is one object and Anu's saved contact is another object.",
          "Creating an object from a class is called instantiation. The word sounds difficult, but it simply means making an object using a class definition.",
        ],
        points: [
          "Class: Contact",
          "Object 1: name Vivek, phone 9876",
          "Object 2: name Anu, phone 6543",
        ],
      },
      {
        title: "Many Objects Can Be Created From One Class",
        paragraphs: [
          "All objects created from one class follow the same basic structure, but each object stores its own values.",
          "The Car class may define color and speed. car1 can be Silver with speed 0, while car2 can be Gray with speed 60. Changing a normal instance field in car1 does not change the same field in car2. Static fields and mutable objects referenced by both cars can be shared.",
        ],
        visual: {
          src: "/notes/oop/class-and-objects.png",
          alt: "Diagram showing one Car class defining color, speed, start, and brake, with arrows to three car objects that have separate color and speed values.",
          width: 1536,
          height: 1024,
          caption:
            "The class gives every Car object the same structure, while each object keeps its own state.",
        },
      },
      {
        title: "Class and Object Side by Side",
        paragraphs: [
          "The easiest way to remember the difference is that a class describes, while an object exists while the program runs.",
        ],
        table: {
          headers: ["Class", "Object"],
          rows: [
            ["Defines a type", "Is an instance of that type"],
            ["Describes common data and actions", "Stores actual values"],
            ["Example: Contact", "Example: Vivek's contact"],
            ["Can be used many times", "Is one separate item"],
          ],
        },
      },
      {
        title: "What Does an Object Have?",
        paragraphs: [
          "We can understand an object using three simple ideas. You will see the first two often in OOP.",
        ],
        points: [
          "State: The object's current data, such as a car's color and speed.",
          "Behaviour: The actions it can perform, such as start and brake.",
          "Identity: The object is separate from other objects, even if their values are the same.",
        ],
      },
      {
        title: "Simple Analogy",
        paragraphs: [
          "Think of a blank student admission form. The form decides which details every student must provide, such as name, roll number, and course. It is like a class.",
          "Each completed form is like an object. All completed forms use the same structure, but every form contains a different student's details.",
        ],
      },
      {
        title: "A Small Java-Style Example",
        paragraphs: [
          "The new keyword asks the program to create an object from the Contact class. Each variable then refers to a different Contact object.",
        ],
        points: [
          'Contact vivek = new Contact("Vivek", "9876");',
          'Contact anu = new Contact("Anu", "6543");',
          "vivek and anu use the same Contact class but store different values.",
        ],
      },
      {
        title: "Do Objects Copy Every Method?",
        paragraphs: [
          "Objects normally keep separate instance data. The method instructions are usually shared by the class or runtime rather than copied separately into every object.",
          "When vivek.call() runs, the shared call behaviour works with the data of the vivek object. The exact memory arrangement depends on the language and runtime.",
        ],
      },
      {
        title: "Object References",
        paragraphs: [
          "A program usually accesses an object through a reference. Think of a reference as a way to reach that object.",
          "Two variables can sometimes refer to the same object. If the object changes through one variable, the other variable sees the same change because both lead to one object.",
          "This explanation matches Java and similar languages. C++ can use references and pointers, but it can also store and copy objects directly as values.",
        ],
      },
    ],
    mechanism: {
      title: "How a class becomes an object",
      steps: [
        "The programmer defines a class, such as Contact.",
        "The program requests a new Contact object.",
        "Memory is prepared for that object's data.",
        "Starting values such as name and phone number are added.",
        "The program receives a reference and can use the new object.",
      ],
    },
    example: {
      title: "Two student objects",
      body: "Student is the class. student1 stores Ravi's name and roll number, while student2 stores Meera's details. Both objects follow the Student definition, but each keeps separate values.",
    },
    misconception:
      "A class and an object are not the same. The class is the common definition; an object is one actual instance with its own values.",
  },
  revise: {
    definitionLabel: "Overview",
    compactDefinition: true,
    definition:
      "A class is a common definition. An object is one actual instance created from it.",
    sections: [
      {
        title: "Class",
        points: [
          "Describes common data and actions.",
          "Example: Contact.",
          "One class can be used to create many objects.",
        ],
      },
      {
        title: "Object",
        points: [
          "Is an instance of a class.",
          "Stores actual values.",
          "Example: one saved contact.",
        ],
      },
      {
        title: "Class vs Object",
        table: {
          headers: ["Class", "Object"],
          rows: [
            ["Definition or blueprint", "Real runtime instance"],
            ["Describes common structure", "Stores actual state"],
            ["One definition", "Many possible instances"],
          ],
        },
      },
      {
        title: "Creation Flow",
        steps: [
          "Read the class definition.",
          "Prepare memory for a new object.",
          "Add its starting values.",
          "Return a reference to it.",
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Instantiation means creating an object from a class.",
      "Objects from the same class use the same structure.",
      "Each object normally keeps separate values.",
      "Static fields and shared referenced objects are exceptions to completely separate state.",
      "In Java, a reference gives the program a way to reach an object.",
    ],
    followUp:
      "How can many objects use one class but still keep different values?",
  },
  lastMinute: {
    definition:
      "Class = common definition. Object = one actual item created from it.",
    sections: [
      {
        title: "Class",
        points: ["Defines data", "Defines actions", "Used to create objects"],
      },
      {
        title: "Object",
        points: [
          "Has actual values",
          "Has separate identity",
          "Follows the class definition",
        ],
      },
      {
        title: "Creation Flow",
        flow: ["Class definition", "Create", "Add values", "Object"],
        wide: true,
      },
    ],
    memoryLine: "Class describes; object exists.",
    cues: [
      "Creating an object is called instantiation.",
      "Many objects can be created from one class.",
      "Each object normally keeps its own values.",
    ],
    trap: "Do not use class and object as if they mean the same thing.",
  },
};

const fieldsMethodsAndInteraction: SubjectTopic = {
  slug: "fields-methods-and-object-interaction",
  title: "Fields, Methods, and Object Interaction",
  description:
    "Learn what an object remembers, what it can do, and how it asks other objects for help.",
  readTime: "10 min",
  difficulty: "Foundation",
  tags: ["Fields", "Methods", "Messages"],
  learn: {
    opening:
      "An object needs to remember information and perform actions. Fields store the information, and methods define the actions.",
    sections: [
      {
        title: "What Does an Object Need?",
        paragraphs: [
          "Think again about a Contact object. It must remember a name and phone number. It must also perform actions such as call or edit.",
          "OOP gives two common names to these parts: fields for the information and methods for the actions.",
        ],
      },
      {
        title: "Fields: What an Object Knows",
        paragraphs: [
          "A field is a variable that belongs to a class or an object. It stores one piece of information.",
          "A Product object may have name, price, and stock fields. The values inside those fields describe that particular product right now.",
        ],
        points: [
          "Product name: Keyboard",
          "Product price: 1,500",
          "Product stock: 12",
        ],
      },
      {
        title: "Every Object Keeps Its Own Field Values",
        paragraphs: [
          "Two Product objects can have the same fields but different values. A Keyboard product may cost 1,500, while a Mouse product may cost 700.",
          "These are called instance fields because every object instance keeps its own values. Different languages may also call them attributes, properties, or data members.",
        ],
      },
      {
        title: "Field vs Local Variable",
        paragraphs: [
          "A field belongs to an object or class and stores part of its state. A local variable belongs only to the method or block where it is declared.",
          "For example, balance can be a BankAccount field because the account must remember it. A temporary fee calculated inside withdraw can be a local variable because it is needed only while that method runs.",
        ],
        table: {
          headers: ["Field", "Local variable"],
          rows: [
            ["Belongs to an object or class", "Belongs to a method or block"],
            ["Stores object or class state", "Stores temporary working data"],
            [
              "Usually lives with its object or class",
              "Exists only while its scope is active",
            ],
          ],
        },
      },
      {
        title: "Methods: What an Object Can Do",
        paragraphs: [
          "A method is a function that belongs to a class. It describes an action an object can perform or a question it can answer.",
          "A BankAccount object may have deposit, withdraw, and getBalance methods. These methods work with that account's own balance.",
        ],
        points: [
          "deposit adds money to the balance.",
          "withdraw removes money after checking the rules.",
          "getBalance returns the current balance.",
        ],
      },
      {
        title: "Inputs and Results",
        paragraphs: [
          "A method may need input to do its work. A parameter is the input variable written in the method definition. An argument is the actual value supplied when the method is called.",
          "A method may also send an answer back. This is called a return value. For example, getBalance returns the current balance.",
        ],
        points: [
          "In withdraw(double amount), amount is the parameter.",
          "In account.withdraw(500), 500 is the argument.",
          "The method can return success, failure, a balance, or another result.",
        ],
        flow: [
          "Call withdraw",
          "Pass amount: 500",
          "Method checks and updates balance",
          "Return success or failure",
        ],
      },
      {
        title: "Instance and Static Members",
        paragraphs: [
          "The fields and methods in this topic are mainly instance members. They work with one particular object.",
          "A static field or method belongs to the class itself instead of one object. Static members are covered properly in a later module.",
        ],
      },
      {
        title: "Why Use Methods Instead of Changing Data Directly?",
        paragraphs: [
          "Methods can protect the rules connected to an object's data. A withdraw method can reject a negative amount and stop a withdrawal when the balance is too low.",
          "If any part of the program changes balance directly, it can easily create an invalid value. A method gives the object one safe place to check the rules.",
        ],
      },
      {
        title: "How Objects Work Together",
        paragraphs: [
          "One object cannot do every job. Objects work together by calling each other's methods.",
          "In a shopping app, a Customer asks a Cart to add a product. The Cart later asks a PaymentService to process the payment. Each object handles its own part.",
        ],
        flow: [
          "Customer calls Cart.checkout()",
          "Cart calculates the total",
          "Cart calls PaymentService.pay(total)",
          "PaymentService returns the result",
        ],
      },
      {
        title: "Method Call and Message Passing",
        paragraphs: [
          "When one object calls another object's method, it sends a request for some work. In OOP, this is sometimes called message passing.",
          "It does not mean that a real text message is sent. It simply means that one object asks another object to perform an available action.",
        ],
      },
      {
        title: "Two Useful Types of Methods",
        paragraphs: [
          "Some methods change something, while others only return information.",
        ],
        table: {
          headers: ["Command", "Query"],
          rows: [
            [
              "Asks the object to do something and may change state",
              "Returns information without changing observable state",
            ],
            ["Example: cart.addItem(product)", "Example: cart.getTotal()"],
          ],
        },
      },
      {
        title: "Method Signature",
        paragraphs: [
          "A method signature identifies a method for calls and overloading. In Java, it contains the method name and parameter types in order. The return type is not part of a Java method signature.",
          "Other languages may define a signature differently, so use the rule for the language named in the question.",
        ],
        points: [
          "withdraw(double) and withdraw(double, String) have different Java signatures.",
          "Changing only the return type does not create a valid Java overload.",
        ],
      },
      {
        title: "Simple Analogy",
        paragraphs: [
          "Think of a restaurant. The kitchen keeps its ingredients and knows how to prepare food. The waiter does not enter the kitchen and move every ingredient directly.",
          "The waiter gives the kitchen an order. The kitchen follows its own process and returns the finished food. In the same way, one object calls another object's method and lets that object handle its own work.",
        ],
      },
    ],
    mechanism: {
      title: "How a method call works",
      steps: [
        "One object chooses an available method on another object.",
        "It calls the method and passes any required input.",
        "The receiving object runs the method using its own fields.",
        "The method checks any rules and may update the fields.",
        "The method finishes or returns a result to the caller.",
      ],
    },
    example: {
      title: "Placing a food order",
      body: "An Order object keeps the selected items. It asks a Restaurant object to prepare them and a Payment object to collect the money. These objects work together, but each object manages its own data and task.",
    },
    misconception:
      "A method does not always change an object. A method such as getBalance can read state and return information without changing anything.",
  },
  revise: {
    definitionLabel: "Overview",
    compactDefinition: true,
    definition:
      "Fields store what an object knows. Methods define what it can do. Method calls let objects work together.",
    sections: [
      {
        title: "Fields",
        points: [
          "Store the data an object must remember.",
          "Instance fields can have different values in different objects.",
          "Also called attributes, properties, or data members.",
          "A local variable is temporary data inside a method or block.",
        ],
      },
      {
        title: "Methods",
        points: [
          "Perform actions or answer questions.",
          "A parameter is declared by the method; an argument is passed by the caller.",
          "Return values provide results.",
          "Can protect rules before changing state.",
        ],
      },
      {
        title: "Object Interaction",
        flow: [
          "Object A",
          "Calls a method",
          "Object B does the work",
          "Result returns",
        ],
      },
      {
        title: "Command vs Query",
        table: {
          headers: ["Command", "Query"],
          rows: [
            ["May change state", "Should not change observable state"],
            ["addItem()", "getTotal()"],
          ],
        },
      },
      {
        title: "Java Method Signature",
        points: [
          "Method name + parameter types in order.",
          "Return type is not part of the signature.",
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Fields describe what an object knows.",
      "Methods describe what an object can do.",
      "Fields store state; local variables store temporary working data.",
      "Methods can check rules before changing fields.",
      "Objects collaborate through method calls.",
    ],
    followUp:
      "Why is changing an object's fields through methods safer than changing them directly?",
  },
  lastMinute: {
    definition:
      "Fields = information. Methods = actions. Method calls = objects working together.",
    sections: [
      {
        title: "Remember",
        points: [
          "Field: stored state",
          "Local variable: temporary data",
          "Parameter: declared input",
          "Argument: supplied value",
          "Return value: method result",
        ],
      },
      {
        title: "Interaction",
        flow: ["Object A", "Calls a method", "Object B", "Returns a result"],
        wide: true,
      },
    ],
    memoryLine: "Fields = what an object knows. Methods = what an object does.",
    cues: [
      "Instance fields belong to individual objects.",
      "Commands change; queries answer.",
      "A method can enforce rules before changing state.",
    ],
    trap: "Do not say every method changes object state. Some methods only return information.",
  },
};

const constructorsAndLifecycle: SubjectTopic = {
  slug: "constructors-and-object-lifecycle",
  title: "Constructors and Object Lifecycle",
  description:
    "Understand how a new object gets valid starting data, how it is used, and how its life ends.",
  readTime: "11 min",
  difficulty: "Foundation",
  tags: ["Constructor", "Initialization", "Lifecycle"],
  learn: {
    opening:
      "A new object needs correct starting data before we use it. A constructor performs this initial setup.",
    sections: [
      {
        title: "Why Does a New Object Need Setup?",
        paragraphs: [
          "Imagine creating a BankAccount object without an account number or a Customer object without a name. The object exists, but it is incomplete and may cause errors later.",
          "We need one place that collects the required starting values, checks them, and prepares the object before normal work begins.",
        ],
      },
      {
        title: "Constructor: The Initial Setup",
        paragraphs: [
          "A constructor is special code that runs when a new object is created. Its main job is to give the object a valid starting state.",
          "For a BankAccount, the constructor may receive an account number and opening balance. It checks those values and stores them in the new object.",
        ],
        points: [
          "Receive required starting data.",
          "Check whether the data is valid.",
          "Store the values in the object's fields.",
          "Leave the object ready to use.",
        ],
      },
      {
        title: "Two Common Constructor Forms",
        paragraphs: [
          "A constructor may use default values, or it may receive values from the caller.",
        ],
        table: {
          headers: ["No-argument constructor", "Parameterized constructor"],
          rows: [
            ["Takes no arguments", "Takes one or more arguments"],
            ["Uses prepared default values", "Uses values given by the caller"],
            [
              "Example: Cart starts empty",
              "Example: User starts with a name and email",
            ],
          ],
        },
      },
      {
        title: "No-Argument vs Default Constructor",
        paragraphs: [
          "A no-argument constructor is any constructor that takes no arguments. A default constructor has a more specific meaning in languages such as Java.",
          "In Java, if a class declares no constructor, the compiler supplies a no-argument constructor. This compiler-provided constructor is called the default constructor. If you write any constructor yourself, Java does not automatically add that default constructor.",
        ],
      },
      {
        title: "Constructor Overloading",
        paragraphs: [
          "Some languages allow one class to provide more than one constructor. Each constructor accepts a different set of inputs. This is called constructor overloading.",
          "For example, a User may be created with only a name, or with both a name and email. Both options must still create a valid User object.",
        ],
      },
      {
        title: "Common Constructor Rules",
        paragraphs: [
          "Constructor syntax and rules depend on the language. The following rules are commonly expected in Java interviews and exams; the C++ difference is explained below.",
        ],
        points: [
          "A constructor runs automatically as part of object creation.",
          "Its name matches the class name in Java and C++.",
          "It does not declare a return type, not even void.",
          "Constructors can be overloaded using different parameter lists.",
          "Java constructors are not inherited and cannot be overridden.",
          "One constructor can call another constructor. This is called constructor chaining.",
        ],
      },
      {
        title: "Constructor Chaining and C++ Difference",
        paragraphs: [
          "In Java, a constructor chains to another constructor in the same class with this(...) or to a superclass constructor with super(...). If neither is written, Java tries to insert super() automatically. Traditional Java syntax places an explicit constructor call first; newer Java versions allow a restricted prologue before it.",
          "Constructors cannot be overridden. Java constructors are not inherited. Modern C++ is different: a derived class can make selected base constructors available with a using declaration, which is called inheriting constructors.",
        ],
      },
      {
        title: "Why Validation Belongs Here",
        paragraphs: [
          "If an object starts with bad data, every method that uses it may fail later. The constructor can stop this problem at the beginning.",
          "For example, it can reject a negative opening balance or an empty account number instead of creating a broken BankAccount object.",
        ],
      },
      {
        title: "An Object Also Has a Lifetime",
        paragraphs: [
          "An object does not exist forever. Its lifecycle starts when it is created, continues while the program uses it, and ends when it is no longer needed.",
        ],
        flow: [
          "Create the object",
          "Constructor adds valid starting data",
          "Methods use or change the object",
          "The object is no longer needed",
          "Memory and resources are cleaned up",
        ],
      },
      {
        title: "What Happens at the End?",
        paragraphs: [
          "Programming languages clean up objects in different ways. Java and JavaScript use garbage collection. It finds objects the program can no longer reach and later reclaims their memory.",
          "C++ supports destructors. A destructor runs when an object's lifetime ends and can release resources owned by that object.",
          "Memory is not the only resource. Files, database connections, and network connections often need to be closed clearly, even in a language with garbage collection.",
        ],
      },
      {
        title: "Simple Analogy",
        paragraphs: [
          "A constructor is like hotel check-in. Before giving a room to a guest, the hotel checks the booking, records the guest's details, and assigns a room.",
          "Only after this setup is complete can the stay begin. In the same way, an object should receive valid starting data before the program uses it.",
          "Checkout is like cleanup. The stay ends, the room is released, and any open bill or key must be handled properly.",
        ],
      },
    ],
    mechanism: {
      title: "The life of a BankAccount object",
      steps: [
        "The program requests a BankAccount with an account number and opening balance.",
        "Memory is prepared for the new object.",
        "The constructor checks the starting values.",
        "Valid values are stored in the object's fields.",
        "The program uses deposit, withdraw, and other methods.",
        "When the object is no longer needed, the language reclaims its memory and the program closes any external resources.",
      ],
    },
    example: {
      title: "Creating a student",
      body: "A Student constructor receives a name and roll number. It rejects an empty name or invalid roll number, then stores the valid values. The rest of the program receives a Student object that is ready to use.",
    },
    misconception:
      "A constructor is not a normal method that you call at any time. It is part of object creation and prepares the new object for use.",
  },
  revise: {
    definitionLabel: "Overview",
    compactDefinition: true,
    definition:
      "A constructor runs during object creation and gives the new object valid starting data.",
    sections: [
      {
        title: "Constructor Responsibilities",
        points: [
          "Receive starting values.",
          "Check the values.",
          "Store them in fields.",
          "Make the object ready to use.",
        ],
      },
      {
        title: "Constructor Types",
        table: {
          headers: ["No-argument", "Parameterized"],
          rows: [
            ["No arguments", "Receives arguments"],
            ["Uses default values", "Uses caller values"],
          ],
        },
      },
      {
        title: "Java Default Constructor",
        points: [
          "Provided by the compiler only when the class declares no constructor.",
          "Takes no arguments.",
          "Writing any constructor stops Java from adding it automatically.",
        ],
      },
      {
        title: "Common Rules",
        points: [
          "Runs automatically during object creation.",
          "Has the class name in Java and C++.",
          "Has no declared return type.",
          "Can be overloaded but not overridden.",
          "Java constructors are not inherited; modern C++ supports inheriting constructors with using.",
          "Java uses this(...) or super(...) for constructor chaining.",
        ],
      },
      {
        title: "Lifecycle",
        flow: [
          "Create",
          "Constructor setup",
          "Use",
          "No longer needed",
          "Clean up",
        ],
      },
      {
        title: "Language Difference",
        points: [
          "Java and JavaScript use garbage collection for unreachable objects.",
          "C++ supports destructors when an object's lifetime ends.",
          "Files and connections may still need to be closed explicitly.",
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "A constructor is part of creating an object.",
      "It should leave the object in a valid state.",
      "No-argument constructor and default constructor are not always the same term.",
      "Constructor overloading gives different creation options.",
      "Java constructors chain to another constructor in the same class or to a superclass constructor.",
      "Garbage collection handles memory, but external resources may need explicit closing.",
    ],
    followUp:
      "What problem can happen if a constructor allows an invalid object to be created?",
  },
  lastMinute: {
    definition:
      "A constructor gives a new object valid starting data before it is used.",
    sections: [
      {
        title: "Constructor",
        points: [
          "Runs during creation",
          "Checks starting data",
          "Initializes fields",
        ],
      },
      {
        title: "Important Rules",
        points: [
          "No declared return type",
          "Can be overloaded",
          "Cannot be overridden",
          "Java constructors are not inherited",
          "Java adds a default constructor only when none is written",
        ],
      },
      {
        title: "Lifecycle",
        flow: ["Create", "Constructor setup", "Use", "Clean up"],
        wide: true,
      },
      {
        title: "Cleanup",
        points: [
          "Garbage collection handles unreachable memory.",
          "Destructors provide deterministic cleanup in languages such as C++.",
          "Files and connections may need explicit closing.",
        ],
      },
    ],
    memoryLine: "Constructor = safe beginning. Cleanup = safe ending.",
    cues: [
      "No-argument constructor: takes no arguments.",
      "Java default constructor: compiler-provided when none is written.",
      "Parameterized constructor: caller provides values.",
      "Overloading: several constructor parameter lists.",
    ],
    trap: "Do not say garbage collection automatically closes every file, socket, or database connection.",
  },
};

const conciseFieldsMethodsAndInteraction = curateTopicSections(
  fieldsMethodsAndInteraction,
  {
    readTime: "9 min",
    omitLearnSections: ["Method Signature"],
    omitReviseSections: ["Java Method Signature"],
  },
);

const conciseAbstraction = curateTopicSections(abstraction, {
  readTime: "9 min",
  omitLearnSections: ["How Abstraction Is Created"],
  omitReviseSections: ["How It Is Created"],
});

const conciseIsAAndHasA = curateTopicSections(isAAndHasA, {
  readTime: "9 min",
  omitLearnSections: ["Composition Over Inheritance"],
});

const concisePolymorphism = curateTopicSections(polymorphism, {
  readTime: "8 min",
  omitLearnSections: [
    "Two Common Forms",
    "Reference Type and Object Type",
    "What Runtime Dispatch Applies To",
  ],
  omitReviseSections: ["Main Forms", "Dispatch Rule", "Java Boundary"],
  omitLastMinuteSections: ["Two Forms", "Runtime Flow"],
});

export const oopContent: SubjectContent = {
  order: "03",
  slug: "oop",
  title: "Object-Oriented Programming",
  shortTitle: "OOP",
  eyebrow: "CS Core",
  description:
    "Learn how classes and objects organize data, behaviour, and responsibilities in a program.",
  estimatedTime: "5–5.5 hours",
  modules: [
    {
      order: "01",
      title: "OOP Foundations",
      description:
        "The object-oriented model, classes, objects, behaviour, and object creation.",
      topics: [
        introductionToOop,
        classesAndObjects,
        conciseFieldsMethodsAndInteraction,
        constructorsAndLifecycle,
      ],
    },
    {
      order: "02",
      title: "Encapsulation and Abstraction",
      description:
        "Controlled object boundaries, access levels, simple interfaces, and shared contracts.",
      topics: [
        encapsulation,
        accessModifiers,
        conciseAbstraction,
        abstractClassesAndInterfaces,
      ],
    },
    {
      order: "03",
      title: "Inheritance and Object Relationships",
      description:
        "Parent-child types, inheritance structures, composition choices, ownership, and lifecycle.",
      topics: [
        inheritance,
        typesOfInheritance,
        conciseIsAAndHasA,
        objectRelationships,
      ],
    },
    {
      order: "04",
      title: "Polymorphism and Binding",
      description:
        "Common interfaces, compile-time overload selection, runtime dispatch, and safe reference casting.",
      topics: [
        concisePolymorphism,
        overloadingVsOverriding,
        dynamicBindingAndCasting,
      ],
    },
    {
      order: "05",
      title: "Important Class and Object Concepts",
      description:
        "Object context, class-level members, equality, copying, and safe immutable values.",
      topics: [
        thisSuperAndObjectContext,
        staticVsInstanceMembers,
        identityEqualityAndCopying,
        immutability,
      ],
    },
    {
      order: "06",
      title: "Good OOP Design and Essential Patterns",
      description:
        "Focused responsibilities, change-friendly principles, and a small set of practical design patterns.",
      topics: [
        couplingCohesionAndComposition,
        solidPrinciples,
        factoryAndStrategyPatterns,
        observerAndSingletonPatterns,
      ],
    },
  ],
};
