import type { InterviewQuestion } from "@/content/interview-questions/types";

export const htmlInterviewQuestions: InterviewQuestion[] = [
  {
    id: "what-is-html",
    question: "What is HTML, and why is it important?",
    answer:
      "HTML stands for HyperText Markup Language. It is a declarative markup language that gives web content structure and meaning so browsers and assistive technologies can interpret headings, links, forms, media, and other content. CSS controls presentation, while JavaScript adds programmable behavior.",
    code: "<h1>HTML basics</h1>\n<p>HTML structures web content.</p>",
  },
  {
    id: "doctype-purpose",
    question: "What is the purpose of <!DOCTYPE html> in an HTML document?",
    answer:
      "<!DOCTYPE html> is the required HTML preamble that triggers no-quirks mode. It does not select an HTML version. If it is missing or invalid, the browser can enter quirks mode and emulate legacy rendering behavior.",
    code: '<!DOCTYPE html>\n<html lang="en">\n</html>',
  },
  {
    id: "tags-and-attributes",
    question:
      "What is the difference between an HTML element, a tag, and an attribute?",
    answer:
      "An element is the document structure represented in the DOM. Tags are the source-code syntax that mark an element's start and end, while attributes appear in a start tag and configure or describe the element. Some elements are void and therefore have no end tag.",
    code: '<a href="https://example.com">Visit example</a>',
  },
  {
    id: "title-tag",
    question: "What makes a good <title> element?",
    answer:
      "A good <title> is unique, concise, and describes the page's purpose. Browsers use it for tabs and history, assistive technology uses it to identify the page, and search engines may use it as the result title. Put page-specific information before a repeated site name when practical.",
    code: "<title>HTML Interview Questions | PrepLoom</title>",
  },
  {
    id: "code-kbd-pre",
    question: "What are the <code>, <kbd>, and <pre> elements used for?",
    answer:
      "<code> identifies a fragment of computer code, <kbd> represents user input such as a keyboard shortcut, and <pre> preserves whitespace and line breaks for preformatted content.",
    code: "<code>const value = 5;</code>\n<kbd>Ctrl + S</kbd>\n<pre>Line 1\nLine 2</pre>",
  },
  {
    id: "absolute-relative-urls",
    question:
      "What is the difference between absolute and relative URLs in HTML?",
    answer:
      "An absolute URL is self-contained and includes a scheme, such as https:, mailto:, or data:. Depending on the scheme, it may also contain a host, port, path, query, and fragment; a domain is not required for every absolute URL. A relative URL reference has no scheme and is resolved against the current document URL or the URL set by the <base> element.",
    code: '<a href="https://example.com/page">Absolute</a>\n<a href="/page">Relative</a>',
  },
  {
    id: "html-entities",
    question: "What are HTML character references, and why are they used?",
    answer:
      "Character references represent reserved or hard-to-type characters in HTML. For example, &lt; displays a less-than sign and &amp; displays an ampersand without confusing them with markup.",
    code: "&lt;div&gt;\nFish &amp; chips",
  },
  {
    id: "page-landmarks",
    question:
      "What roles do <header>, <footer>, <nav>, and <main> play in page structure?",
    answer:
      "These elements identify meaningful page regions. <header> contains introductory content, <footer> contains information about its nearest section or page, <nav> identifies a major navigation block, and <main> contains the document's dominant content. A document must not contain more than one <main> element without the hidden attribute.",
    code: '<header>Page header</header>\n<nav aria-label="Primary">...</nav>\n<main>Main content</main>\n<footer>Footer information</footer>',
  },
  {
    id: "lang-attribute",
    question: "Why is the lang attribute important for accessibility?",
    answer:
      "The lang attribute declares the natural language of the document or a specific passage. It helps assistive technologies choose appropriate pronunciation rules and supports language-aware tools such as translation and spell checking. Set it on <html> and override it only where the language changes.",
    code: '<html lang="en">',
  },
  {
    id: "noscript",
    question: "What is progressive enhancement, and where can <noscript> help?",
    answer:
      "Progressive enhancement starts with usable HTML, then adds CSS and JavaScript without making essential content depend on them. <noscript> can provide instructions or fallback content when scripting is disabled, but it is not a substitute for building a resilient baseline experience.",
    code: "<noscript>This feature requires JavaScript.</noscript>",
  },
  {
    id: "link-element",
    question: "What is the difference between <link> and <a>?",
    answer:
      "<link> declares a relationship between the current document and another resource, commonly for stylesheets, icons, preloads, and canonical URLs. <a href> creates a hyperlink users can activate to navigate to a resource or location.",
    code: '<link rel="stylesheet" href="styles.css">\n<a href="/docs">Read the docs</a>',
  },
  {
    id: "tabindex",
    question: "What does the tabindex attribute do?",
    answer:
      'tabindex controls whether an element can receive focus and whether it participates in sequential keyboard navigation. Use native interactive elements whenever possible, tabindex="0" only when a custom focusable element is justified, and tabindex="-1" for programmatic focus. Avoid positive values because they override the natural order.',
    code: '<h2 tabindex="-1">Updated section</h2>',
  },
  {
    id: "head-element",
    question: "What belongs in the <head>, and why does it matter?",
    answer:
      "The <head> contains document metadata and resource relationships rather than the page's visible content. A useful baseline includes a character encoding, a descriptive title, viewport metadata for responsive layouts, and required resource links or scripts.",
    code: '<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>Website title</title>\n</head>',
  },
  {
    id: "semantic-non-semantic",
    question: "What is semantic HTML, and when is a <div> still appropriate?",
    answer:
      "Semantic HTML uses elements whose names communicate the role and structure of their content. This improves accessibility, maintainability, and machine understanding. Use <div> or <span> when no native element accurately expresses the intended meaning and a generic styling or scripting hook is needed.",
    code: '<article>Standalone content</article>\n<div class="layout-wrapper">Generic layout container</div>',
  },
  {
    id: "inline-block",
    question: "Are inline and block semantic HTML categories?",
    answer:
      "No. Inline and block describe CSS box behavior, not an element's semantic meaning. User-agent styles give elements default display values, but CSS can change them. Choose an HTML element for meaning first, then control its layout with CSS.",
    code: "<span>Inline content</span>\n<div>Block content</div>",
  },
  {
    id: "section-article",
    question: "What is the difference between <section> and <article>?",
    answer:
      "A <section> groups related content around a theme and usually has a heading. An <article> represents self-contained content that could stand on its own or be reused independently.",
    code: "<section>\n  <h2>Services</h2>\n</section>\n<article>\n  <h2>News item</h2>\n</article>",
  },
  {
    id: "heading-structure",
    question: "How should you structure headings on a page?",
    answer:
      "Use headings to represent the document hierarchy, not to achieve a visual size. Start with a heading that names the page's main topic, then nest subsections logically without choosing levels for styling. CSS can change appearance, while the heading level preserves structure for navigation and assistive technology.",
    code: "<h1>Account settings</h1>\n<section>\n  <h2>Security</h2>\n  <h3>Two-factor authentication</h3>\n</section>",
  },
  {
    id: "button-vs-link",
    question: "When should you use a <button> instead of an <a> element?",
    answer:
      "Use <a href> to navigate to a URL and <button> to perform an action in the current interface. Native elements provide the correct keyboard behavior and semantics automatically. A button associated with a form defaults to submission unless its type is set to button or reset.",
    code: '<a href="/settings">Open settings</a>\n<button type="button">Open menu</button>',
  },
  {
    id: "base-element",
    question: "What is the purpose of the <base> element?",
    answer:
      "The <base> element sets the URL used to resolve relative URLs and can define a default browsing-context target for links and forms. A document must contain no more than one <base> element, and changing it can affect every relative URL, including fragment links.",
    code: '<base href="https://example.com/docs/">',
  },
  {
    id: "iframe",
    question: "How would you embed third-party content with <iframe> safely?",
    answer:
      "An <iframe> embeds another document with its own browsing context. Give it a descriptive title, restrict capabilities with sandbox and allow, use a trusted source, and grant only the permissions the embed needs. Lazy loading can defer off-screen embeds.",
    code: '<iframe src="https://example.com/embed" title="Course preview" sandbox="allow-scripts" loading="lazy"></iframe>',
  },
  {
    id: "picture-source",
    question: "When would you use srcset and sizes instead of <picture>?",
    answer:
      "Use srcset and sizes when several files contain the same image at different resolutions and the browser should choose an efficient candidate. Use <picture> when the image content or crop must change by media condition, or when you need explicit format sources. The nested <img> remains required and provides the fallback and alternative text.",
    code: '<picture>\n  <source media="(min-width: 800px)" srcset="wide.jpg">\n  <img src="square.jpg" alt="Team reviewing a design" width="480" height="480">\n</picture>',
  },
  {
    id: "image-alt-text",
    question: "How do you write appropriate alt text for an image?",
    answer:
      'Treat alt text as a replacement for the image in its context, not as a generic visual description. Informative images need concise equivalent text, decorative images use alt="", and an image that is the only content of a link or button must describe that control\'s purpose. Nearby text should not be repeated unnecessarily.',
    code: '<img src="team.jpg" alt="The support team at the help desk">\n<img src="divider.svg" alt="">',
  },
  {
    id: "data-attributes",
    question: "How do data-* attributes work with JavaScript?",
    answer:
      "A data-* attribute stores application-specific information on an element. JavaScript can read and update it through the element's dataset property, which converts kebab-case names to camelCase properties.",
    code: '<div data-user-id="123">User</div>\n<script>\n  const id = document.querySelector("div").dataset.userId;\n</script>',
  },
  {
    id: "canvas",
    question: "When would you choose <canvas> instead of SVG?",
    answer:
      "<canvas> is a script-controlled bitmap surface suited to frequently redrawn, pixel-heavy scenes such as games or image processing. SVG keeps graphics as DOM elements and is often better for scalable diagrams, styling, and interaction. Canvas drawings do not automatically expose their visual content, so meaningful fallback or an accessible alternative is required.",
    code: '<canvas id="chart" width="200" height="100"></canvas>\n<script>\n  const context = document.querySelector("#chart").getContext("2d");\n  context.fillRect(50, 25, 100, 50);\n</script>',
  },
  {
    id: "fieldset-legend",
    question: "How do <fieldset> and <legend> improve form accessibility?",
    answer:
      "<fieldset> groups related form controls, and <legend> gives that group an accessible name. This is especially useful for radio buttons, checkboxes, and related personal-information fields.",
    code: '<fieldset>\n  <legend>Contact preference</legend>\n  <label><input type="radio" name="contact"> Email</label>\n</fieldset>',
  },
  {
    id: "form-element",
    question: "What data does a form submit, and what makes a form accessible?",
    answer:
      "A form submits successful controls that have names to the URL in action using its configured method and encoding. Give every control an accessible name, use suitable input types, associate instructions and errors with their controls, preserve keyboard operation, and always validate again on the server.",
    code: '<form action="/subscribe" method="post">\n  <label for="email">Email</label>\n  <input id="email" name="email" type="email" required>\n  <button>Subscribe</button>\n</form>',
  },
  {
    id: "get-vs-post",
    question: "When should an HTML form use GET versus POST?",
    answer:
      "Use GET for safe, repeatable retrieval such as search or filtering; its submitted data becomes part of the URL and can be bookmarked. Use POST when the submission creates or changes server state, sends sensitive values that should not appear in the URL, or carries a larger payload. HTTPS is still required because POST does not encrypt data by itself.",
    code: '<form action="/search" method="get">...</form>\n<form action="/orders" method="post">...</form>',
  },
  {
    id: "enctype",
    question: "What is the role of the enctype attribute in a form?",
    answer:
      "enctype defines how form data is encoded for submission. The default is application/x-www-form-urlencoded. Use multipart/form-data for file uploads and text/plain mainly for debugging, not normal production submissions.",
    code: '<form action="/upload" method="post" enctype="multipart/form-data">\n  <input type="file" name="file">\n</form>',
  },
  {
    id: "b-strong",
    question: "How do <b> and <strong> differ semantically?",
    answer:
      "<strong> marks content as important, serious, or urgent. <b> draws attention without implying extra importance, such as a keyword in a summary. Their default visual styling may be similar, but their meaning differs.",
    code: "<b>Keyword</b>\n<strong>Important warning</strong>",
  },
  {
    id: "css-properties-html-attributes",
    question: "How do CSS properties differ from HTML attributes?",
    answer:
      "HTML attributes configure an element's content, state, or behavior. CSS properties control presentation and layout. Some presentational HTML attributes exist, but CSS is generally the correct tool for styling.",
    code: '<input type="text" disabled>\n<p style="color: blue">Styled text</p>',
  },
  {
    id: "aria",
    question: "When should you use ARIA, and what can ARIA not do?",
    answer:
      "Use ARIA when native HTML cannot express a required role, state, property, or relationship. Prefer native elements first. ARIA changes information exposed to accessibility APIs, but it does not add keyboard behavior, focus management, or event handling; those must still be implemented correctly.",
    code: '<button aria-label="Close dialog">×</button>',
  },
  {
    id: "dom-structure",
    question: "How would you describe the DOM structure of an HTML document?",
    answer:
      "The DOM is the programming interface that represents the parsed document as a tree of nodes. Elements, text, comments, and the document itself have parent, child, and sibling relationships that JavaScript can inspect and modify.",
    code: "<html>\n  <body>\n    <div>Example</div>\n  </body>\n</html>",
  },
  {
    id: "async-defer",
    question: "How do normal, async, defer, and module scripts differ?",
    answer:
      "A parser-inserted classic script without async or defer blocks parsing while it is fetched and executed. async fetches in parallel and executes as soon as it is ready, so execution order is not guaranteed. defer fetches in parallel and executes after parsing in document order, before DOMContentLoaded. Module scripts are deferred by default; defer has no effect on them, while async makes them run as soon as their dependency graph is ready.",
    code: '<script src="legacy.js"></script>\n<script src="analytics.js" async></script>\n<script src="app.js" defer></script>\n<script type="module" src="main.js"></script>',
  },
  {
    id: "html-seo",
    question: "Which HTML decisions provide a strong technical SEO foundation?",
    answer:
      "Provide a unique descriptive title, useful main content, logical headings, crawlable links, meaningful link text, canonical URLs when duplicate URLs are possible, and structured data only when it accurately represents visible content. A meta description can influence the search snippet, but it does not replace useful page content.",
    code: '<meta name="description" content="A clear summary of this page">',
  },
  {
    id: "html-lists",
    question: "What types of lists are available in HTML?",
    answer: "HTML provides ordered, unordered, and description lists.",
    points: [
      "<ol> represents items whose sequence matters.",
      "<ul> represents items whose order does not matter.",
      "<dl> contains term and description pairs using <dt> and <dd>.",
    ],
    code: "<dl>\n  <dt>HTML</dt>\n  <dd>A markup language for the web.</dd>\n</dl>",
  },
  {
    id: "form-validation",
    question: "What is form validation, and how can HTML implement it?",
    answer:
      "Form validation checks whether submitted values meet expected constraints. HTML provides attributes such as required, minlength, maxlength, min, max, pattern, and specialized input types. Server-side validation is still required because client-side checks can be bypassed.",
    code: '<input type="email" name="email" required>',
  },
  {
    id: "id-class",
    question: "What is the difference between id and class attributes?",
    answer:
      "An id identifies one element and must be unique within the document. A class is reusable and can be applied to many elements. Both can be used by CSS and JavaScript, but classes are usually better for reusable styling.",
    code: '<div id="profile">Profile</div>\n<div class="card">First card</div>\n<div class="card">Second card</div>',
  },
  {
    id: "void-elements",
    question: "What are void elements in HTML?",
    answer:
      "Void elements cannot contain child content and do not have closing tags. Examples include <img>, <input>, <br>, <hr>, <meta>, and <link>. The slash in forms such as <br /> is optional in HTML and does not make an element self-closing in the XML sense.",
    code: '<img src="photo.jpg" alt="Team working together">\n<br>\n<input type="text">',
  },
  {
    id: "html5-features",
    question: "Is HTML5 still a separate version of HTML?",
    answer:
      "HTML5 is still widely used as an informal name for modern HTML, but HTML is now maintained as a Living Standard rather than shipped as occasional numbered versions. Features evolve individually, so support should be checked per feature instead of assuming an HTML5 compatibility level.",
    points: [
      "The modern platform includes semantic elements such as <article>, <nav>, and <main>.",
      "Native media, richer forms, and <canvas> became part of the modern HTML era.",
      "Many browser APIs commonly called HTML5 APIs are specified separately from HTML.",
    ],
  },
];
