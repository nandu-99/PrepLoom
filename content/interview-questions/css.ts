import type { InterviewQuestion } from "@/content/interview-questions/types";

export const cssInterviewQuestions: InterviewQuestion[] = [
  {
    id: "what-is-css",
    question: "What is CSS, and how can it be applied to HTML?",
    answer:
      "CSS stands for Cascading Style Sheets. It controls the presentation and layout of structured documents. Styles can be written in a style attribute, inside a <style> element, or in an external stylesheet. External stylesheets are usually preferred for reuse and maintenance.",
    code: '<link rel="stylesheet" href="styles.css">\n\n/* styles.css */\np {\n  color: navy;\n}',
  },
  {
    id: "cascade-and-inheritance",
    question: "What are the cascade and inheritance in CSS?",
    answer:
      "The cascade chooses one value when several declarations target the same property. It considers origin and importance, cascade layers, specificity, scope proximity, and source order. Inheritance lets some computed values, such as color and font-family, pass from a parent to its children. Not every property inherits.",
    code: "body {\n  color: #333;\n}\n\np {\n  color: navy;\n}",
  },
  {
    id: "specificity",
    question: "How does CSS specificity work?",
    answer:
      "Specificity compares selectors only after higher cascade rules such as origin, importance, and layer order are resolved. IDs have more weight than classes, attributes, and pseudo-classes, which have more weight than type selectors and pseudo-elements. :where() always adds zero specificity. If specificity ties, scoped declarations are compared by scoping proximity. Source order decides only when the declarations remain tied after that step.",
    code: ".card p { color: navy; }\n#summary { color: maroon; }\n:where(.panel) p { margin: 0; }",
    note: "Avoid increasing specificity to fix every conflict. Prefer clear source order, small selectors, and cascade layers where useful.",
  },
  {
    id: "box-model",
    question: "What is the CSS box model?",
    answer:
      "CSS lays out an element as a content box surrounded by padding, a border, and margin. Padding adds space inside the border. Margin adds space outside it. Understanding these areas is necessary when calculating size, spacing, and overflow.",
    code: ".card {\n  width: 240px;\n  padding: 16px;\n  border: 1px solid #aaa;\n  margin: 24px;\n}",
  },
  {
    id: "box-sizing",
    question: "What does box-sizing: border-box change?",
    answer:
      "With the default content-box value, a declared width applies only to the content box, so padding and borders increase the rendered size. With border-box, the declared width includes the content, padding, and border. Margin is always outside that width.",
    code: "*,\n*::before,\n*::after {\n  box-sizing: border-box;\n}",
  },
  {
    id: "margin-vs-padding",
    question: "What is the difference between margin and padding?",
    answer:
      "Padding creates space between content and its border, and the element's background extends through it. Margin creates transparent space outside the border. Vertical margins between block boxes can collapse in some normal-flow layouts, while padding never collapses.",
    code: ".card {\n  padding: 16px;\n  margin-block: 24px;\n}",
  },
  {
    id: "display-values",
    question: "How do block, inline, and inline-block differ?",
    answer:
      "A block box normally starts on a new line and fills the available inline size. An inline box flows with text, and normal width and height declarations do not size it in the same way. inline-block flows inline while accepting width and height like a block container.",
    code: ".tag {\n  display: inline-block;\n  padding: 4px 8px;\n}",
  },
  {
    id: "hiding-elements",
    question:
      "How do display: none, visibility: hidden, and opacity: 0 differ?",
    answer:
      "display: none removes the element's box from layout. visibility: hidden keeps its layout space but hides it and prevents interaction. opacity: 0 makes the element transparent while it still takes space and can remain interactive and exposed to assistive technology unless handled separately.",
    code: ".removed { display: none; }\n.hidden { visibility: hidden; }\n.transparent { opacity: 0; }",
  },
  {
    id: "position-values",
    question:
      "How do static, relative, absolute, fixed, and sticky positioning differ?",
    answer:
      "static uses normal layout. relative keeps its original space but can be visually offset. absolute leaves normal flow and uses a containing block. fixed usually attaches to the viewport. sticky behaves like relative until a scroll boundary and inset cause it to stay in view within its scroll container.",
    code: ".toolbar {\n  position: sticky;\n  top: 0;\n}",
  },
  {
    id: "absolute-containing-block",
    question:
      "What determines the containing block of an absolutely positioned element?",
    answer:
      "An absolutely positioned element is placed relative to its containing block. This is commonly established by the nearest ancestor whose position is not static, although transforms and some other properties can also establish one. If no ancestor qualifies, the initial containing block is used.",
    code: ".card { position: relative; }\n.badge {\n  position: absolute;\n  inset: 8px 8px auto auto;\n}",
  },
  {
    id: "z-index-stacking-context",
    question:
      "Why does a large z-index sometimes not bring an element to the front?",
    answer:
      "z-index orders boxes inside a stacking context. A child cannot escape its parent's stacking context, so a very large value can still appear behind an element in another context. Positioning with z-index, opacity below 1, transforms, and several other properties can create stacking contexts.",
    code: ".modal-layer {\n  position: fixed;\n  z-index: 20;\n}",
  },
  {
    id: "css-units",
    question: "How do px, em, rem, and percentage units differ?",
    answer:
      "px is a CSS pixel and is an absolute length unit. rem is based on the root element's font size. em usually uses the current element's font size, but on font-size it uses the inherited font size. A percentage is relative to a reference defined by the property, often a containing block rather than simply the parent.",
    code: ":root { font-size: 16px; }\n.card {\n  padding: 1rem;\n  width: 75%;\n}",
  },
  {
    id: "min-max-sizing",
    question:
      "How do min-width, max-width, min-height, and max-height affect sizing?",
    answer:
      "The min properties set lower bounds and the max properties set upper bounds on the used size. They are useful for flexible layouts because an element can grow or shrink within limits instead of being locked to one fixed size.",
    code: ".content {\n  width: 100%;\n  max-width: 70rem;\n  min-height: 20rem;\n}",
  },
  {
    id: "css-math-functions",
    question: "When would you use calc(), min(), max(), or clamp()?",
    answer:
      "These functions calculate responsive numeric values. calc() combines arithmetic and compatible units. min() chooses the smallest result, max() chooses the largest, and clamp() keeps a preferred value between a minimum and maximum.",
    code: ".page { width: calc(100% - 2rem); }\nh1 { font-size: clamp(2rem, 5vw, 4rem); }",
  },
  {
    id: "custom-properties",
    question: "How do CSS custom properties work?",
    answer:
      "Custom properties have names beginning with two hyphens and are read with var(). They participate in the cascade and inherit by default, which makes them useful for design tokens and local overrides. var() can provide a fallback when the requested custom property is not defined.",
    code: ":root { --brand-color: #315c8c; }\n.button { color: var(--brand-color, navy); }",
  },
  {
    id: "overflow",
    question: "What does the overflow property control?",
    answer:
      "overflow controls how content outside a box is displayed. visible allows it to paint outside, hidden clips it, auto adds scrolling when needed, and scroll always creates a scrolling mechanism. clip also clips overflow but does not create a scroll container.",
    code: ".panel {\n  max-height: 20rem;\n  overflow: auto;\n}",
  },
  {
    id: "pseudo-class-vs-element",
    question:
      "What is the difference between a pseudo-class and a pseudo-element?",
    answer:
      "A pseudo-class selects an existing element in a state or relationship, such as :hover, :focus-visible, or :nth-child(). A pseudo-element targets a generated or conceptual part of an element, such as ::before, ::after, or ::first-line.",
    code: 'button:focus-visible { outline: 2px solid currentColor; }\n.note::before { content: "Note: "; }',
  },
  {
    id: "nth-child-vs-type",
    question: "How do :nth-child() and :nth-of-type() differ?",
    answer:
      ":nth-child() checks an element's position among all siblings. :nth-of-type() checks its position among siblings with the same element type. The selector before the pseudo-class must still match the element.",
    code: "li:nth-child(2) { font-weight: 600; }\np:nth-of-type(2) { color: #555; }",
  },
  {
    id: "combinators",
    question: "What are CSS combinators?",
    answer:
      "Combinators describe relationships between selectors. A space selects descendants, > selects direct children, + selects the next sibling, and ~ selects later siblings that share the same parent.",
    code: ".card p { color: #333; }\n.card > h2 { margin-top: 0; }\nh2 + p { margin-top: 0; }\nh2 ~ p { line-height: 1.6; }",
  },
  {
    id: "flexbox-axes",
    question: "How do the main and cross axes control Flexbox alignment?",
    answer:
      "flex-direction defines the main axis, so it may be horizontal or vertical. justify-content distributes items along the main axis. align-items aligns items along the cross axis. This is why those properties should not be described only as horizontal and vertical alignment.",
    code: ".toolbar {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n}",
  },
  {
    id: "flex-sizing",
    question: "What do flex-grow, flex-shrink, and flex-basis control?",
    answer:
      "flex-basis supplies an item's starting size on the main axis. flex-grow controls how positive free space is shared, and flex-shrink controls how items shrink when space is insufficient. The flex shorthand is usually safer because it resets all three values together.",
    code: ".main { flex: 1 1 30rem; }\n.sidebar { flex: 0 1 18rem; }",
  },
  {
    id: "grid-vs-flexbox",
    question: "When should you use Grid instead of Flexbox?",
    answer:
      "Use Grid when rows and columns should be controlled together or items need explicit two-dimensional placement. Use Flexbox when layout mainly follows one axis and content distribution drives the result. They can be combined in the same page.",
    code: ".layout {\n  display: grid;\n  grid-template-columns: 2fr 1fr;\n}",
  },
  {
    id: "responsive-grid",
    question:
      "How can Grid create responsive columns without many media queries?",
    answer:
      "repeat(), auto-fit or auto-fill, and minmax() can let the browser create as many columns as fit. auto-fit collapses empty tracks, while auto-fill keeps the track slots. Each item can keep a useful minimum and share remaining space.",
    code: ".cards {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));\n  gap: 1rem;\n}",
  },
  {
    id: "gap",
    question: "What do gap, row-gap, and column-gap do?",
    answer:
      "These properties add gutters between rows and columns in Grid, Flexbox, and multi-column layout. gap is the shorthand. Unlike margins on children, gaps appear only between layout tracks or items, not around the outer edge of the container.",
    code: ".list {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 12px 20px;\n}",
  },
  {
    id: "media-vs-container-queries",
    question:
      "What is the difference between media queries and container queries?",
    answer:
      "Media queries respond to the user agent or viewport, including width and preferences such as reduced motion. Container queries respond to an ancestor container's size or styles, so a reusable component can adapt to the space where it is placed.",
    code: ".card-shell { container-type: inline-size; }\n@container (width > 36rem) {\n  .card { grid-template-columns: 12rem 1fr; }\n}",
  },
  {
    id: "transition-vs-animation",
    question:
      "What is the difference between a CSS transition and an animation?",
    answer:
      "A transition interpolates a property when its value changes and needs a before and after state. An animation uses @keyframes and can run through several stages without a state change. Prefer transform and opacity for smooth motion when they achieve the required effect.",
    code: ".button { transition: transform 180ms ease; }\n.button:hover { transform: translateY(-2px); }",
  },
  {
    id: "keyframes-reduced-motion",
    question:
      "How do you create a keyframe animation while respecting reduced-motion preferences?",
    answer:
      "Define stages with @keyframes and apply them with animation properties. Put non-essential motion inside a prefers-reduced-motion: no-preference query, or provide a reduced version for users who request less motion.",
    code: "@media (prefers-reduced-motion: no-preference) {\n  .notice { animation: enter 300ms ease-out; }\n}\n@keyframes enter {\n  from { opacity: 0; transform: translateY(8px); }\n  to { opacity: 1; transform: translateY(0); }\n}",
  },
  {
    id: "opacity-vs-alpha",
    question: "How does opacity differ from an alpha color?",
    answer:
      "opacity affects the entire element after it is rendered, including its children. An alpha channel in a color affects only that color value, such as a background, while child content can remain fully opaque.",
    code: ".faded-card { opacity: 0.5; }\n.soft-background { background: rgb(20 40 80 / 50%); }",
  },
  {
    id: "filter",
    question: "What does the CSS filter property do?",
    answer:
      "filter applies graphical effects such as blur, brightness, contrast, or grayscale to an element's rendered result. Filters can be useful for visual states, but strong blur and large filtered areas may be expensive to render.",
    code: ".thumbnail { filter: grayscale(100%); }\n.thumbnail:hover { filter: none; }",
  },
  {
    id: "logical-properties",
    question:
      "Why use logical properties such as margin-inline and padding-block?",
    answer:
      "Logical properties describe directions using the writing mode instead of fixed physical sides. inline maps to the text direction and block maps to the direction in which lines are stacked. This makes layouts work more naturally across left-to-right, right-to-left, and vertical writing modes.",
    code: ".card {\n  margin-inline: auto;\n  padding-block: 1rem;\n}",
  },
  {
    id: "preprocessors",
    question: "What is a CSS preprocessor, and is one always necessary?",
    answer:
      "A preprocessor such as Sass converts its own syntax into CSS and can provide mixins, functions, modules, and build-time logic. It is not always necessary because modern CSS includes custom properties, nesting, math functions, and other features. Use one when its build-time tools solve a real project need.",
    code: "$brand-color: #315c8c;\n.button {\n  color: $brand-color;\n}",
    note: "This example uses Sass syntax and must be compiled to CSS.",
  },
];
