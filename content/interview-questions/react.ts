import type { InterviewQuestion } from "@/content/interview-questions/types";

export const reactInterviewQuestions: InterviewQuestion[] = [
  {
    id: "what-is-react",
    question: "What is React, and why is it used?",
    answer:
      "React is a JavaScript library for building user interfaces from reusable components. It uses a declarative model: you describe what the UI should look like for the current props and state, and React updates the screen when that data changes. React can be used for small widgets, full web applications, and native apps.",
  },
  {
    id: "jsx-vs-html",
    question: "What is JSX, and how is it different from HTML?",
    answer:
      "JSX is a syntax extension that lets you write HTML-like markup inside JavaScript. It is transformed into React element descriptions. JSX can contain JavaScript expressions inside braces, uses JavaScript-style property names such as className, and requires every tag to be closed. Unlike HTML, JSX is not a string and is not sent directly to the browser.",
    code: "const name = \"Maya\";\nconst heading = <h1 className=\"title\">Hello, {name}</h1>;",
  },
  {
    id: "components-function-vs-class",
    question: "What is the difference between function and class components?",
    answer:
      "Both can render UI and manage state. Function components use Hooks and are the standard choice for new React code. Class components use this, this.state, and lifecycle methods. Classes are still supported, but they are mainly seen in older code and in error boundaries.",
  },
  {
    id: "props-vs-state",
    question: "What is the difference between props and state?",
    answer:
      "Props are inputs passed to a component by its parent. A component should not change its props. State is data owned by a component and updated through a state setter or reducer. Changing props or state can cause React to render the component again.",
  },
  {
    id: "state-snapshot",
    question: "What does it mean that state is a snapshot?",
    answer:
      "Each render receives a snapshot of state for that render. Calling a state setter requests a future render, but it does not change the state variable inside the code that is already running. Event handlers created during a render keep seeing that render's snapshot.",
    code: "function handleClick() {\n  setCount(count + 1);\n  console.log(count); // Still the value from this render\n}",
  },
  {
    id: "use-state",
    question: "What does useState do?",
    answer:
      "useState adds state to a function component. It returns the current state and a setter function. Calling the setter queues another render. If the initial value is expensive to calculate, you can pass an initializer function so React calls it only during initialization.",
    code: "const [count, setCount] = useState(0);\nconst [items] = useState(() => createInitialItems());",
  },
  {
    id: "functional-state-update",
    question: "When should you use a functional state update?",
    answer:
      "Use a functional update when the next state depends on the previous state. React passes the latest queued state to the updater, so several updates in one event work correctly and the code does not depend on an old render snapshot.",
    code: "setCount((current) => current + 1);\nsetCount((current) => current + 1); // Adds 2 in total",
  },
  {
    id: "state-immutability",
    question: "Why should React state be treated as immutable?",
    answer:
      "Do not change an existing state object or array directly. Create a new value and pass it to the setter. React uses object identity when deciding whether state changed, and old render snapshots must stay unchanged. Copy every changed level when updating nested data.",
    code: "setUser((user) => ({\n  ...user,\n  address: { ...user.address, city: \"Pune\" },\n}));",
  },
  {
    id: "lifting-state-up",
    question: "What does lifting state up mean?",
    answer:
      "Lifting state up means moving shared state to the closest common parent of the components that need it. The parent passes the value and update callbacks down through props. This gives the shared data one source of truth.",
  },
  {
    id: "one-way-data-flow",
    question: "How does data flow in React?",
    answer:
      "React uses one-way data flow. A parent passes data to children through props. A child cannot change those props, but it can call a callback supplied by the parent to request an update. The new data then flows down again.",
  },
  {
    id: "react-events",
    question: "How does event handling work in React?",
    answer:
      "React event props use camelCase names such as onClick and receive a function, not a string. React provides event objects with a consistent interface across browsers. You can call preventDefault() to stop a default browser action and stopPropagation() to stop propagation through the React tree.",
    code: "function SaveButton() {\n  function handleClick(event) {\n    event.preventDefault();\n    saveForm();\n  }\n\n  return <button onClick={handleClick}>Save</button>;\n}",
  },
  {
    id: "conditional-rendering",
    question: "How do you render UI conditionally in React?",
    answer:
      "Use normal JavaScript such as if statements, ternary expressions, or the && operator to choose JSX. Return null when a component should render nothing. Be careful with numbers and && because zero is rendered as text.",
    code: "return isLoading ? <Spinner /> : <Profile user={user} />;\n\nreturn count > 0 && <p>{count} items</p>;",
  },
  {
    id: "list-keys",
    question: "Why are keys important when rendering lists?",
    answer:
      "Keys tell React which item each component represents between renders. Stable keys help React preserve the correct state when items are inserted, removed, or reordered. Use a stable ID from the data. Avoid array indexes when the list can change, and never generate keys during rendering.",
    code: "items.map((item) => <Todo key={item.id} item={item} />);",
  },
  {
    id: "fragments",
    question: "What is a React Fragment?",
    answer:
      "A Fragment groups sibling elements without adding an extra DOM element. The short syntax is <>...</>. Use <Fragment key={id}> when a fragment inside a list needs a key because the short syntax cannot accept one.",
    code: "return (\n  <>\n    <Header />\n    <Main />\n  </>\n);",
  },
  {
    id: "controlled-vs-uncontrolled",
    question: "What is the difference between controlled and uncontrolled inputs?",
    answer:
      "A controlled input gets its current value from React state and updates that state in onChange. An uncontrolled input keeps its current value in the DOM and is usually read with a ref or FormData. Controlled inputs are useful when the UI must react to every change. Uncontrolled inputs can be simpler for basic forms.",
  },
  {
    id: "form-validation",
    question: "How should form validation be handled in React?",
    answer:
      "Use built-in HTML validation where it is enough, then add React logic for rules that depend on application data. Validate at a useful time, show a clear error near the field, and validate again on the server. A form library can help with large forms, but it is not required.",
  },
  {
    id: "use-ref",
    question: "What does useRef do?",
    answer:
      "useRef returns the same mutable object on every render. Its current property can store a DOM node or a value that is not needed for rendering, such as a timer ID. Changing ref.current does not cause a render, so state should be used for information shown on the screen.",
    code: "const inputRef = useRef(null);\n\nfunction focusInput() {\n  inputRef.current?.focus();\n}\n\nreturn <input ref={inputRef} />;",
  },
  {
    id: "ref-prop-forward-ref",
    question: "How do refs reach a child component in React 19?",
    answer:
      "In React 19, a function component can receive ref as a prop and pass it to a DOM element. forwardRef is still available for older React code, but it is no longer needed for new React 19 function components. Expose a ref only when the parent needs an imperative action such as focus or selection.",
    code: "function SearchInput({ ref, ...props }) {\n  return <input ref={ref} {...props} />;\n}",
    note: "Libraries that support React 18 and older may still use forwardRef for compatibility.",
  },
  {
    id: "hooks-and-rules",
    question: "What are Hooks, and what rules must they follow?",
    answer:
      "Hooks are functions that let components use React features such as state, context, refs, and effects. Call Hooks only at the top level of a function component or custom Hook. Do not call them inside loops, conditions, event handlers, or regular JavaScript functions.",
  },
  {
    id: "use-effect",
    question: "What is useEffect used for?",
    answer:
      "useEffect synchronizes a component with an external system after React commits an update. Examples include subscriptions, browser APIs, timers, and third-party widgets. It should not be used just to calculate a value that can be derived during rendering or to handle a user action that already has an event handler.",
  },
  {
    id: "effect-cleanup",
    question: "How does cleanup work in useEffect?",
    answer:
      "An effect can return a cleanup function. React runs cleanup before running that effect again with changed dependencies and when the component is removed. Cleanup should undo the setup, such as removing a listener, clearing a timer, disconnecting a subscription, or aborting a request.",
    code: "useEffect(() => {\n  const controller = new AbortController();\n  loadUser(userId, controller.signal);\n\n  return () => controller.abort();\n}, [userId]);",
  },
  {
    id: "effect-dependencies-stale-closures",
    question: "What causes a stale closure in a React Hook?",
    answer:
      "A callback closes over the props and state from the render that created it. If an effect or memo leaves out a reactive dependency, it may keep using old values. Include every reactive value used by the Hook, restructure the code when needed, and use the Hooks linter instead of hiding dependency warnings.",
  },
  {
    id: "use-layout-effect",
    question: "How is useLayoutEffect different from useEffect?",
    answer:
      "useLayoutEffect runs after DOM changes but before the browser repaints, so it can measure layout and update the UI without a visible flicker. It blocks painting and can hurt performance. Prefer useEffect unless the work must happen before paint, such as measuring a tooltip position.",
  },
  {
    id: "custom-hooks",
    question: "What is a custom Hook?",
    answer:
      "A custom Hook is a function whose name starts with use and that reuses stateful logic by calling other Hooks. It shares logic, not one state value: each call has its own state. Custom Hooks should describe a clear purpose, such as useOnlineStatus or useChatRoom.",
  },
  {
    id: "use-reducer",
    question: "When is useReducer better than useState?",
    answer:
      "useReducer is useful when state has many related transitions or when update rules should live in one pure reducer function. The component dispatches an action, and the reducer returns the next state. useState is usually simpler for a few independent values.",
    code: "const [state, dispatch] = useReducer(reducer, initialState);\ndispatch({ type: \"item_added\", item });",
  },
  {
    id: "context-and-prop-drilling",
    question: "What are Context and prop drilling?",
    answer:
      "Prop drilling means passing data through components that do not need it only to reach a deeper child. Context lets a parent provide a value to any descendant that reads that context. It is useful for data such as theme or the current user, but it does not replace all state management and can make reuse harder when overused.",
    code: "const ThemeContext = createContext(\"light\");\n\nfunction App() {\n  return <ThemeContext value=\"dark\"><Page /></ThemeContext>;\n}\n\nconst theme = useContext(ThemeContext);",
  },
  {
    id: "memoization-apis",
    question: "What is the difference between memo, useMemo, and useCallback?",
    answer:
      "memo can skip rendering a component when its props are unchanged. useMemo caches a calculation result, and useCallback caches a function reference. They are performance tools, not correctness tools. Use them only when profiling or a specific reference-stability requirement shows a benefit.",
  },
  {
    id: "state-batching",
    question: "What is state update batching?",
    answer:
      "React groups multiple state updates and processes them together to avoid unnecessary renders. Modern React automatically batches updates in common cases, including many asynchronous callbacks. An update is still based on its render snapshot, so use updater functions when several updates depend on previous state.",
  },
  {
    id: "render-and-commit",
    question: "What happens during React's render and commit phases?",
    answer:
      "During render, React calls components to calculate the next UI. Rendering must stay pure because React may run, pause, or repeat it. During commit, React applies the needed changes to the DOM and runs layout effects. Regular effects run after the commit.",
  },
  {
    id: "reconciliation",
    question: "What is reconciliation?",
    answer:
      "Reconciliation is how React compares the previous element tree with the next one and decides what must change. Element types and keys help React match old and new children. React then commits only the required host changes, but this does not mean every render always produces a DOM update.",
  },
  {
    id: "virtual-dom",
    question: "What does the term virtual DOM mean in React?",
    answer:
      "The virtual DOM is an informal name for the in-memory element tree React uses to describe the UI. React compares element trees before updating the real DOM. This model supports declarative code and efficient updates, but it does not automatically make every application fast.",
  },
  {
    id: "preserving-resetting-state",
    question: "When does React preserve or reset component state?",
    answer:
      "React preserves state while the same component stays at the same position in the tree. State resets when the component type changes, it is removed, or its key changes. A key can intentionally reset a form or switch between separate component instances.",
    code: "<ProfileForm key={userId} userId={userId} />",
  },
  {
    id: "strict-mode",
    question: "What does StrictMode do?",
    answer:
      "StrictMode enables extra development-only checks. React may render components an extra time and run an extra setup and cleanup cycle for effects to reveal impure rendering and missing cleanup. It does not change production behavior or render extra visible UI.",
  },
  {
    id: "error-boundaries",
    question: "What is an error boundary, and what does it catch?",
    answer:
      "An error boundary shows fallback UI when a descendant throws during rendering or a React lifecycle. It does not normally catch errors in event handlers, asynchronous callbacks, server rendering, or the boundary itself. Error boundaries are currently written as classes or provided by a library.",
  },
  {
    id: "portals",
    question: "What is a portal?",
    answer:
      "A portal renders part of a React tree into a different DOM node. It is useful for modals, tooltips, and overlays that must escape clipping or stacking containers. Context and React event propagation still follow the React tree, not the DOM placement.",
    code: "return createPortal(<ModalContent />, document.body);",
  },
  {
    id: "lazy-and-suspense",
    question: "How do React.lazy and Suspense support code splitting?",
    answer:
      "lazy loads a component module only when React first tries to render it. While the code is loading, the nearest Suspense boundary displays its fallback. This reduces the initial JavaScript bundle when the split is placed around code that is not needed immediately.",
    code: "const Settings = lazy(() => import(\"./Settings.js\"));\n\n<Suspense fallback={<SettingsSkeleton />}>\n  <Settings />\n</Suspense>",
  },
  {
    id: "suspense-data",
    question: "Does Suspense automatically handle every data request?",
    answer:
      "No. Suspense works with Suspense-enabled data sources, frameworks, lazy component loading, and cached Promises read with use. A request started inside useEffect does not automatically activate a Suspense fallback. In production apps, use the data-loading approach recommended by the framework.",
  },
  {
    id: "transitions",
    question: "What are transitions in React?",
    answer:
      "A transition marks a non-urgent state update. React can keep urgent interactions responsive while it prepares the slower UI in the background. useTransition also provides an isPending value. Transition updates should not control text inputs because typing must update immediately.",
    code: "const [isPending, startTransition] = useTransition();\n\nstartTransition(() => {\n  setSelectedTab(nextTab);\n});",
  },
  {
    id: "use-deferred-value",
    question: "What does useDeferredValue do?",
    answer:
      "useDeferredValue lets a slow part of the UI receive a delayed version of a value while urgent updates, such as typing, stay responsive. React first renders with the old deferred value and then tries the new value in the background. It does not reduce network requests by itself.",
  },
  {
    id: "api-requests",
    question: "How should an API request be handled in a React app?",
    answer:
      "The best place depends on the framework. A framework loader or Server Component can often fetch before rendering. For client-only synchronization, an effect can fetch when a dependency changes, but it should handle loading, errors, cleanup, race conditions, and caching. Event-driven requests belong in event handlers.",
  },
  {
    id: "routing",
    question: "How is routing added to a React application?",
    answer:
      "React itself does not include a router. Use the router provided by a framework such as Next.js or a current routing library such as React Router. Routes map URLs to UI and commonly support nested layouts, route parameters, navigation, loading states, and data loading.",
  },
  {
    id: "create-root-hydrate-root",
    question: "What are createRoot and hydrateRoot used for?",
    answer:
      "createRoot mounts a client-rendered React application into a DOM node. hydrateRoot attaches React to HTML that was already produced on the server. The older ReactDOM.render and ReactDOM.hydrate APIs were removed in React 19 and should not be used in new code.",
    code: "const root = createRoot(document.getElementById(\"root\"));\nroot.render(<App />);\n\n// For server-rendered HTML:\nhydrateRoot(document.getElementById(\"root\"), <App />);",
  },
  {
    id: "hydration-mismatch",
    question: "What is a hydration mismatch?",
    answer:
      "A hydration mismatch happens when the first client render does not match the server-rendered HTML. Common causes include reading browser-only values during rendering, using changing values such as Date.now(), invalid HTML nesting, or rendering different data on the server and client. Fix the source instead of hiding the warning.",
  },
  {
    id: "csr-ssr",
    question: "What is the difference between client-side and server-side rendering?",
    answer:
      "Client-side rendering builds most of the UI in the browser after JavaScript loads. Server-side rendering sends HTML created on the server, then hydrates it for interaction. Server rendering can improve the first display and content discovery, but it adds server work and requires matching server and client output.",
  },
  {
    id: "server-components",
    question: "What are React Server Components?",
    answer:
      "Server Components render on the server and do not send their component code to the browser. They can access server-side data directly and pass serializable props to Client Components. They cannot use client Hooks such as useState or browser event handlers. A framework provides the build and routing support needed to use them.",
  },
  {
    id: "children-api-clone-element",
    question: "What do Children and cloneElement do?",
    answer:
      "Children provides utilities for working with the opaque children prop, such as mapping or counting its direct nodes. cloneElement creates a new element based on an existing one and can replace props or children. Both APIs can make data flow harder to follow, so composition, context, or explicit props are often clearer.",
  },
  {
    id: "component-reuse-patterns",
    question: "How do higher-order components, render props, and compound components differ?",
    answer:
      "A higher-order component is a function that returns an enhanced component. A render prop passes a function that decides what UI to render. Compound components are related components designed to work together, often sharing context. Hooks now replace many HOC and render-prop uses, while compound components remain useful for flexible UI APIs.",
  },
  {
    id: "default-props-and-prop-types",
    question: "What should be used instead of defaultProps and PropTypes in modern function components?",
    answer:
      "Use JavaScript default parameters for default prop values. React 19 removed defaultProps support for function components, although class components still support it. React 19 also ignores propTypes on components, so use TypeScript or another build-time type system for new applications. Runtime validation is still needed for untrusted external data.",
    code: "type AvatarProps = { size?: number };\n\nfunction Avatar({ size = 40 }: AvatarProps) {\n  return <img width={size} height={size} alt=\"\" />;\n}",
  },
  {
    id: "class-lifecycle",
    question: "What are the main lifecycle methods in a class component?",
    answer:
      "render returns the UI and must stay pure. componentDidMount runs after the first commit, componentDidUpdate runs after later commits, and componentWillUnmount performs cleanup. Modern function components usually express external synchronization with effects instead.",
  },
  {
    id: "pure-component",
    question: "What is React.PureComponent?",
    answer:
      "PureComponent is a class component base that shallowly compares props and state to skip some renders. It works only when values are updated immutably. The function-component counterpart is memo, but neither should be added everywhere without a measured reason.",
  },
  {
    id: "fiber",
    question: "What is React Fiber?",
    answer:
      "Fiber is React's internal architecture for representing component work as units. It lets React prioritize, pause, continue, or discard rendering work before a commit. This supports features such as concurrent rendering. Application code normally does not interact with Fiber directly.",
  },
  {
    id: "use-id",
    question: "What is useId used for?",
    answer:
      "useId creates a stable ID that can connect accessibility attributes such as a label and an input across server and client rendering. It should not be used to generate list keys. Keys must come from the list's data.",
    code: "const helpId = useId();\nreturn (\n  <>\n    <input aria-describedby={helpId} />\n    <p id={helpId}>Use at least 8 characters.</p>\n  </>\n);",
  },
  {
    id: "actions-and-optimistic-ui",
    question: "What are Actions and optimistic updates in modern React?",
    answer:
      "An Action is a function used in a transition to perform work and update state, often through a form. useActionState can track an Action's result and pending state. useOptimistic can show an expected result immediately while the real operation finishes, then React keeps or replaces it based on the actual result.",
  },
  {
    id: "testing-react-components",
    question: "How should React components be tested?",
    answer:
      "Test behavior that a user can observe: rendered text, accessible controls, interactions, loading states, and errors. Prefer queries based on roles and labels instead of component internals. Mock network or browser boundaries when needed, but avoid mocking so much that the test no longer checks real behavior.",
  },
  {
    id: "performance-optimization",
    question: "How do you optimize a React application's performance?",
    answer:
      "Measure first with browser tools and the React Profiler. Common fixes include keeping state close to where it is used, avoiding unnecessary effects, virtualizing very long lists, splitting code, caching data, and memoizing proven hot paths. Stable keys and immutable updates also prevent incorrect or wasteful work.",
  },
  {
    id: "react-seo",
    question: "How can a React application support SEO?",
    answer:
      "Use meaningful HTML, accessible links, unique metadata, fast pages, and content that crawlers can receive reliably. A React framework can provide static generation or server rendering so important content is available before client JavaScript runs. SEO is not solved by React alone.",
  },
];
