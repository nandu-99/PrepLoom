import type { InterviewQuestion } from "@/content/interview-questions/types";

export const javascriptInterviewQuestions: InterviewQuestion[] = [
  {
    id: "what-is-javascript",
    question: "What is JavaScript?",
    answer:
      "JavaScript is a high-level, dynamically typed programming language. It is used in browsers to add behavior to web pages and also runs outside browsers in environments such as Node.js. Modern engines usually compile JavaScript at runtime instead of only interpreting it line by line.",
  },
  {
    id: "let-const-var",
    question: "What is the difference between let, const, and var?",
    answer:
      "let and const are block-scoped. let can be reassigned, while const cannot be reassigned and must be initialized when declared. A const object can still have its properties changed. var is function-scoped, can be redeclared in the same scope, and is initialized with undefined during hoisting.",
    code: "let score = 10;\nscore = 11;\n\nconst user = { name: \"Asha\" };\nuser.name = \"Ravi\";\n\nvar active = true;",
    note: "Use const by default, and use let when the variable must be reassigned. Avoid var in modern application code unless its behavior is intentional.",
  },
  {
    id: "hoisting-and-tdz",
    question: "What is hoisting, and what is the temporal dead zone?",
    answer:
      "Before executing a scope, JavaScript creates bindings for its declarations. Function declarations can be called before their source position. var exists and contains undefined before its declaration runs. let and const also exist, but accessing them before initialization throws a ReferenceError. That period is called the temporal dead zone.",
    code: "sayHello(); // Works\nfunction sayHello() {\n  console.log(\"Hello\");\n}\n\nconsole.log(total); // undefined\nvar total = 3;\n\nconsole.log(name); // ReferenceError\nlet name = \"Mira\";",
  },
  {
    id: "lexical-scope",
    question: "What is lexical scope?",
    answer:
      "Lexical scope means variable access is determined by where functions and blocks are written in the source code. An inner function can read bindings from its own scope and its outer scopes, but an outer function cannot read bindings declared only inside the inner function.",
    code: "const label = \"outer\";\n\nfunction showLabel() {\n  console.log(label);\n}\n\nshowLabel(); // outer",
  },
  {
    id: "scope-types",
    question: "How do global, function, and block scope differ?",
    answer:
      "A global binding is available throughout its script or module. A function-scoped binding is available only inside that function. A block-scoped binding declared with let, const, or class is limited to its nearest block, such as an if statement or loop.",
    code: "function example() {\n  var functionValue = 1;\n  if (true) {\n    const blockValue = 2;\n  }\n  console.log(functionValue);\n  // blockValue is not available here\n}",
  },
  {
    id: "variable-shadowing",
    question: "What is variable shadowing?",
    answer:
      "Shadowing happens when an inner scope declares a binding with the same name as one in an outer scope. References inside the inner scope use the inner binding, while the outer binding remains unchanged.",
    code: "const status = \"global\";\n\nfunction check() {\n  const status = \"local\";\n  console.log(status); // local\n}",
  },
  {
    id: "equality-operators",
    question: "What is the difference between == and ===?",
    answer:
      "The == operator performs type coercion before comparing many values, which can produce surprising results. The === operator compares without coercing the operands, so both type and value must match. Prefer === unless loose equality behavior is specifically required.",
    code: "0 == false;  // true\n0 === false; // false\n\nnull == undefined;  // true\nnull === undefined; // false",
  },
  {
    id: "null-vs-undefined",
    question: "What is the difference between null and undefined?",
    answer:
      "undefined usually means a value has not been assigned or a property does not exist. null is an explicit value commonly used to represent an intentional absence. They are different primitive values, although loose equality treats them as equal.",
  },
  {
    id: "mutable-and-immutable-values",
    question: "Which JavaScript values are mutable and immutable?",
    answer:
      "Primitive values such as strings, numbers, booleans, bigint, symbols, null, and undefined are immutable. Objects, including arrays and functions, are mutable. Reassigning a variable is different from mutating the object stored in that variable.",
    code: "const items = [1, 2];\nitems.push(3); // The array changes\n\nlet title = \"Hi\";\ntitle = title + \"!\"; // A new string value is assigned",
  },
  {
    id: "arrow-functions",
    question: "How do arrow functions differ from regular functions?",
    answer:
      "Arrow functions use shorter syntax and capture this from the surrounding scope. They do not have their own arguments object, cannot be used with new, and do not have a prototype property for construction. Regular functions receive this from how they are called and can be constructors when constructable.",
    code: "const add = (a, b) => a + b;\n\nconst counter = {\n  value: 1,\n  read() {\n    const getValue = () => this.value;\n    return getValue();\n  },\n};",
  },
  {
    id: "spread-and-rest",
    question: "What is the difference between spread and rest syntax?",
    answer:
      "Both use three dots, but their jobs depend on position. Spread expands an iterable into arguments or array elements, or copies enumerable own properties into an object. Rest collects remaining function arguments, array elements, or object properties into a new value.",
    code: "const values = [2, 3];\nconst all = [1, ...values];\n\nfunction sum(...numbers) {\n  return numbers.reduce((total, value) => total + value, 0);\n}",
    note: "Array and object spread create shallow copies, not deep copies.",
  },
  {
    id: "destructuring",
    question: "What is destructuring assignment?",
    answer:
      "Destructuring extracts array elements or object properties into variables. It supports default values, renamed bindings, nested patterns, and rest elements.",
    code: "const [first, second = 0] = [10];\nconst { name: displayName, ...details } = {\n  name: \"Nila\",\n  role: \"Developer\",\n};",
  },
  {
    id: "map-filter-reduce",
    question: "How do map(), filter(), and reduce() differ?",
    answer:
      "map() creates a new array by transforming every element. filter() creates a new array containing only elements that pass a test. reduce() combines the elements into one accumulated result, which can be a number, object, array, or another value.",
    code: "const values = [1, 2, 3];\n\nvalues.map((value) => value * 2);       // [2, 4, 6]\nvalues.filter((value) => value > 1);    // [2, 3]\nvalues.reduce((sum, value) => sum + value, 0); // 6",
  },
  {
    id: "sync-vs-async",
    question: "What is the difference between synchronous and asynchronous code?",
    answer:
      "Synchronous code completes one operation before moving to the next statement. Asynchronous operations can finish later, allowing JavaScript to continue other work in the meantime. Asynchronous does not automatically mean parallel; the host environment and runtime decide where the underlying work happens.",
  },
  {
    id: "execution-context-call-stack",
    question: "What are an execution context and the call stack?",
    answer:
      "An execution context stores the information needed to run global code or a function, including its bindings, outer scope reference, and this value. The call stack tracks active execution contexts. Calling a function pushes a context onto the stack, and returning removes it.",
  },
  {
    id: "event-loop",
    question: "How does the JavaScript event loop work?",
    answer:
      "JavaScript runs synchronous work on the call stack. The host queues callbacks when timers, network operations, or events are ready. After the current stack is empty, the event loop lets queued work run. Promise reactions use the microtask queue, which is drained before the next regular task such as a timer callback.",
    code: "console.log(\"A\");\nsetTimeout(() => console.log(\"B\"), 0);\nPromise.resolve().then(() => console.log(\"C\"));\nconsole.log(\"D\");\n\n// A, D, C, B",
  },
  {
    id: "set-timeout",
    question: "Does setTimeout() run a callback after the exact delay?",
    answer:
      "No. The delay is the minimum time before the callback becomes eligible to run. It must still wait for the call stack and earlier queued work. Even a delay of zero runs later, after the current synchronous code and pending microtasks.",
  },
  {
    id: "promises",
    question: "What is a Promise?",
    answer:
      "A Promise represents the eventual result of an asynchronous operation. It starts pending and becomes fulfilled with a value or rejected with a reason. then(), catch(), and finally() return new promises, which allows operations and error handling to be chained.",
    code: "fetch(\"/api/profile\")\n  .then((response) => response.json())\n  .then((profile) => console.log(profile))\n  .catch((error) => console.error(error));",
  },
  {
    id: "async-await",
    question: "How do async and await work?",
    answer:
      "An async function always returns a Promise. await pauses only that async function until the supplied value settles, so it does not block the main thread. A fulfilled Promise produces its value, while a rejected Promise throws at the await expression and can be handled with try and catch.",
    code: "async function loadProfile() {\n  try {\n    const response = await fetch(\"/api/profile\");\n    return await response.json();\n  } catch (error) {\n    console.error(error);\n    throw error;\n  }\n}",
  },
  {
    id: "promise-all-race",
    question: "What is the difference between Promise.all() and Promise.race()?",
    answer:
      "Promise.all() fulfills when every input fulfills and preserves the input order of results. It rejects as soon as any input rejects. Promise.race() settles as soon as the first input settles, whether that result is a fulfillment or rejection.",
    code: "const [user, posts] = await Promise.all([\n  fetchUser(),\n  fetchPosts(),\n]);\n\nconst firstResult = await Promise.race([requestA(), requestB()]);",
  },
  {
    id: "closures",
    question: "What is a closure?",
    answer:
      "A closure is a function together with access to the lexical environment where it was created. It can keep using outer variables even after the outer function has returned. Closures are useful for private state, callbacks, and function factories.",
    code: "function createCounter() {\n  let count = 0;\n  return () => ++count;\n}\n\nconst next = createCounter();\nnext(); // 1\nnext(); // 2",
  },
  {
    id: "this-keyword",
    question: "How is the value of this determined in JavaScript?",
    answer:
      "For a regular function, this usually depends on how the function is called. A method call uses the object before the dot, call(), apply(), or bind() can set it explicitly, and new creates a new instance. A plain strict-mode function call uses undefined. Arrow functions capture this from their surrounding scope.",
    code: "const user = {\n  name: \"Ira\",\n  showName() {\n    return this.name;\n  },\n};\n\nuser.showName(); // Ira",
  },
  {
    id: "call-apply-bind",
    question: "What is the difference between call(), apply(), and bind()?",
    answer:
      "call() invokes a function immediately with an explicit this value and separate arguments. apply() also invokes it immediately but accepts the arguments as an array-like value. bind() returns a new function with this and optional leading arguments fixed for later calls.",
    code: "function greet(greeting, punctuation) {\n  return `${greeting}, ${this.name}${punctuation}`;\n}\n\nconst person = { name: \"Dev\" };\ngreet.call(person, \"Hello\", \"!\");\ngreet.apply(person, [\"Hello\", \"!\"]);\nconst greetDev = greet.bind(person, \"Hello\");",
  },
  {
    id: "iife",
    question: "What is an IIFE, and when is it useful?",
    answer:
      "An Immediately Invoked Function Expression is a function expression that runs as soon as it is created. It was commonly used to create private scope before let, const, and ES modules. It can still be useful for one-time initialization or an isolated async block, but modules and block scope often replace it.",
    code: "(() => {\n  const privateValue = 42;\n  console.log(privateValue);\n})();",
  },
  {
    id: "browser-events",
    question: "What is an event in JavaScript?",
    answer:
      "An event is a notification that something happened, such as a click, key press, form submission, network state change, or completed resource load. Code can respond by registering an event listener on an EventTarget.",
    code: "const button = document.querySelector(\"button\");\nbutton.addEventListener(\"click\", (event) => {\n  console.log(event.target);\n});",
  },
  {
    id: "event-phases",
    question: "What are event capturing and event bubbling?",
    answer:
      "A DOM event first travels from the document toward the target during the capture phase. It reaches the target, then usually travels back through ancestors during the bubble phase. Listeners use the bubble phase by default and can opt into capture with the capture option.",
    code: "parent.addEventListener(\"click\", handleCapture, { capture: true });\nparent.addEventListener(\"click\", handleBubble);",
  },
  {
    id: "event-delegation",
    question: "What is event delegation?",
    answer:
      "Event delegation attaches one listener to a shared ancestor and uses event bubbling to handle events from its descendants. It reduces the number of listeners and also works for matching children added later. Use closest() and confirm the matched element belongs to the intended container.",
    code: "list.addEventListener(\"click\", (event) => {\n  const button = event.target.closest(\"button[data-id]\");\n  if (!button || !list.contains(button)) return;\n  console.log(button.dataset.id);\n});",
  },
  {
    id: "web-storage",
    question: "How do localStorage and sessionStorage differ?",
    answer:
      "Both store string key-value pairs for one origin and provide synchronous APIs. localStorage persists across browser sessions until it is cleared. sessionStorage is limited to a page session, usually one tab, and is cleared when that session ends. Neither should store secrets, and large or frequent writes can block the main thread.",
    code: "localStorage.setItem(\"theme\", \"dark\");\nconst theme = localStorage.getItem(\"theme\");\n\nsessionStorage.setItem(\"draft\", \"In progress\");",
  },
  {
    id: "json-parse-stringify",
    question: "What do JSON.parse() and JSON.stringify() do?",
    answer:
      "JSON.parse() converts valid JSON text into a JavaScript value and throws a SyntaxError for invalid JSON. JSON.stringify() converts a supported JavaScript value into JSON text. Functions, undefined, and symbols are omitted from objects, and circular references cause an error unless handled separately.",
    code: "const text = JSON.stringify({ name: \"Ari\", active: true });\nconst value = JSON.parse(text);",
  },
  {
    id: "javascript-modules",
    question: "What are JavaScript modules?",
    answer:
      "Modules split code into files with explicit imports and exports. ES modules have their own top-level scope, run in strict mode, and are evaluated once per module instance. Static imports also let tools analyze dependencies before execution.",
    code: "// math.js\nexport const add = (a, b) => a + b;\n\n// app.js\nimport { add } from \"./math.js\";",
  },
  {
    id: "prototype-inheritance",
    question: "How does prototypal inheritance work?",
    answer:
      "Every ordinary object can have another object as its prototype. When a property is not found directly on an object, JavaScript follows the prototype chain until it finds the property or reaches null. Class syntax is built on this prototype system.",
    code: "const animal = { speak: () => \"sound\" };\nconst dog = Object.create(animal);\n\ndog.speak(); // Found through the prototype chain",
  },
  {
    id: "object-create",
    question: "What does Object.create() do?",
    answer:
      "Object.create() creates a new object with the supplied object as its prototype. It can also define own properties through property descriptors. Passing null creates an object with no Object.prototype in its chain.",
    code: "const dictionary = Object.create(null);\ndictionary.answer = 42;\n\nconst base = { enabled: true };\nconst item = Object.create(base);",
  },
  {
    id: "shallow-vs-deep-copy",
    question: "What is the difference between a shallow copy and a deep copy?",
    answer:
      "A shallow copy creates a new outer object but keeps references to nested objects. A deep copy also creates independent copies of nested supported values. Spread syntax and Object.assign() are shallow. structuredClone() can deeply clone many built-in data types, but it cannot clone every JavaScript value, such as functions.",
    code: "const original = { profile: { name: \"Sam\" } };\nconst shallow = { ...original };\nshallow.profile.name = \"Lee\"; // Also changes original.profile\n\nconst deep = structuredClone(original);",
  },
  {
    id: "error-handling",
    question: "How do try, catch, finally, and throw work?",
    answer:
      "Code in try is monitored for exceptions. catch handles an exception thrown while that code runs. finally runs after try and catch whether an exception occurred or not, which makes it useful for cleanup. throw creates an exception, and any JavaScript value can be thrown, although Error objects provide better debugging information.",
    code: "try {\n  if (!response.ok) {\n    throw new Error(\"Request failed\");\n  }\n} catch (error) {\n  console.error(error);\n} finally {\n  hideLoadingState();\n}",
  },
  {
    id: "garbage-collection",
    question: "How does JavaScript manage memory?",
    answer:
      "JavaScript engines allocate memory for values and automatically reclaim objects that are no longer reachable. Developers do not free memory manually, but reachable objects can still cause leaks. Common causes include forgotten event listeners, timers, caches, and closures that retain large object graphs.",
  },
  {
    id: "map-vs-weakmap",
    question: "What is the difference between Map and WeakMap?",
    answer:
      "Map accepts keys of any type, is iterable, exposes its size, and keeps strong references to its keys. WeakMap accepts objects or non-registered symbols as keys, is not iterable, and does not prevent an object key from being garbage collected. WeakMap is useful for metadata tied to an object's lifetime.",
  },
  {
    id: "proxy",
    question: "What is a Proxy object?",
    answer:
      "A Proxy wraps an object or function and intercepts operations through traps. Traps can customize property reads, writes, deletion, function calls, construction, and other internal operations. A Proxy should preserve JavaScript's required object invariants.",
    code: "const settings = new Proxy({}, {\n  get(target, property) {\n    return property in target ? target[property] : \"default\";\n  },\n});",
  },
  {
    id: "generators",
    question: "What are generator functions and yield?",
    answer:
      "A generator function returns an iterator and can pause at each yield expression. Calling next() resumes execution until the next yield or return. Generators are useful for lazy sequences, custom iteration, and controlled workflows.",
    code: "function* ids() {\n  yield 1;\n  yield 2;\n}\n\nconst iterator = ids();\niterator.next(); // { value: 1, done: false }",
  },
  {
    id: "symbols",
    question: "What is a Symbol?",
    answer:
      "A Symbol is a unique primitive value. Symbols are often used as property keys that avoid name collisions. Well-known symbols, such as Symbol.iterator, let objects participate in built-in JavaScript protocols.",
    code: "const id = Symbol(\"id\");\nconst user = { [id]: 123 };\n\nuser[id]; // 123",
  },
  {
    id: "currying",
    question: "What is function currying?",
    answer:
      "Currying transforms a function that accepts several arguments into a sequence of functions that each accept one argument. It can help create specialized reusable functions, although it should be used only when it makes the code clearer.",
    code: "const add = (a) => (b) => a + b;\nconst addFive = add(5);\naddFive(3); // 8",
  },
  {
    id: "debounce-vs-throttle",
    question: "What is the difference between debouncing and throttling?",
    answer:
      "Debouncing waits until calls stop for a chosen period before running, which is useful for search input or validation. Throttling limits execution to at most once during each interval, which is useful for frequent events such as pointer movement or resizing. Both reduce unnecessary work, but they preserve different timing behavior.",
  },
];
