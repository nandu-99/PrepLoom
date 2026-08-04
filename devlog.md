# PrepLoom Development Log

This file records the important product and implementation decisions made while
building PrepLoom. Keep entries concise and focused on decisions, trade-offs,
and verification.

## 2026-07-30 - Navigation foundation

### Product direction

- Treated `PREPLOOM_USERJOURNEY.md` as the source of truth for navigation.
- Kept the experience guest-first. Removed permanent login and paid-access
  actions from the initial navbar because the documented first version does not
  require authentication or onboarding.
- Desktop information architecture:
  `Subjects → Roadmaps → WebDev → DSA → Search → Theme`.
- Mobile information architecture:
  top bar for brand, Search, and Menu; fixed bottom navigation for Home,
  Subjects, Quiz, and More.
- The mobile More menu contains Roadmaps, WebDev, DSA, Feedback, and Theme.
- Quiz and AI remain contextual actions rather than permanent desktop links.

### Visual system

- Used a compact 64px navigation bar.
- Navbar typeface is Inter. Navigation labels use the regular weight.
- Navigation labels use `#7C7C7C`, becoming high contrast on hover or focus.
- Light mode uses a white navigation surface; dark mode uses exact `#000000`.
- Search, menus, borders, focus states, and the mobile bottom bar follow the
  active theme.
- Theme preference is stored under `preploom-theme` in `localStorage`.

### Responsive and accessibility behavior

- Full desktop navigation starts at 1280px.
- Smaller layouts use Search and Menu controls without squeezing desktop links.
- The mobile bottom bar reserves page space so it cannot obscure content.
- Menus close on Escape, outside press, link selection, or transition to the
  desktop breakpoint.
- Interactive controls include keyboard focus states and accessible labels.

## 2026-07-30 - Global command search

### Decision

- Built search as an accessible modal command palette rather than an expanding
  navbar input or a bespoke keyboard-navigation system.
- Used the already-installed Base UI Dialog for the modal shell, focus trapping,
  outside dismissal, Escape behavior, portal rendering, and scroll locking.
- Added `cmdk` for command filtering, result ranking, arrow-key navigation,
  Enter selection, grouping, and empty-state behavior.
- Kept all presentation and search content custom to PrepLoom.

### Interaction model

- Search opens from the desktop search control, mobile Search control,
  `Command + K` on macOS, or `Ctrl + K` on Windows/Linux.
- Repeating the keyboard shortcut toggles the palette.
- The input receives focus when the palette opens.
- Users navigate results with arrow keys, open with Enter, and close with
  Escape, the close button, or an outside press.
- Selecting a result closes the palette and uses Next.js client navigation.

### Initial search index

- Results are grouped into Start here, Popular topics, Interview questions, and
  WebDev and DSA.
- Search values include titles, descriptions, and hidden keywords.
- Initial destinations cover subjects, quick quiz, roadmaps, Deadlocks, ACID,
  Process vs Thread, TCP vs UDP, OOP Principles, interview questions, WebDev,
  project ideas, and DSA.
- This is intentionally a small client-side index for the initial version. The
  dialog UI can later consume an API, full-text database search, Algolia, or
  Meilisearch without changing its interaction model.

### Files

- `components/site-navbar.tsx` - navigation and search triggers.
- `components/command-search.tsx` - modal, command behavior, and initial index.
- `app/layout.tsx` - fonts and theme initialization.
- `app/page.tsx` - mobile-navigation content clearance.

### Follow-up

- Replace provisional search records with the real content catalog when subject
  and topic data is introduced.
- Add returning-user sections from `localStorage` once the progress and recent
  activity schemas are defined.

## 2026-07-30 - Command-search visual refinement

- Reduced the command palette width from 680px to 600px.
- Reduced the maximum results viewport from 480px to 400px.
- Replaced high-contrast inverted selection states with restrained gray
  surfaces in both themes.
- Kept selected-item text and icons aligned with the active theme instead of
  turning the complete row solid white or black.

## 2026-07-30 - Homepage hero

### Content hierarchy

- Designed the hero around the three questions in the user journey: what
  PrepLoom is, what a visitor can study, and what they should do first.
- Selected the primary message:
  “Prepare smarter for your next technical interview.”
- Used a concise supporting statement covering structured notes, revision,
  interview questions, quizzes, and grounded AI assistance.
- Made global search the focal interaction because searching or choosing a
  subject is the first meaningful step in the documented journey.
- Added Explore Subjects and Take a Quick Quiz as the two primary next steps.
- Added direct links to Deadlocks, ACID Properties, TCP vs UDP, and OOP
  Principles as popular starting points.
- Included the preparation loop:
  `Learn → Revise → Recall → Explain → Test → Improve`.

### Visual direction

- Used `components/ui/grid-pattern.tsx` as the hero background.
- Combined a 48px grid, selectively filled cells, a centered radial treatment,
  and a bottom fade to create depth without adding image assets.
- Preserved the restrained neutral visual system in both light and dark modes.
- Used fluid headline sizing, a centered content column, and responsive CTA
  stacking for narrow screens.

### Search architecture

- Moved command-search state and the global keyboard shortcut into
  `CommandSearchProvider`.
- The provider renders one command-search modal for the application.
- Navbar and hero triggers now share the same modal state, avoiding duplicated
  dialogs and keyboard listeners.
- Added a dedicated `HeroSearchTrigger` client component so the rest of the hero
  can remain server-rendered.

## 2026-07-30 - Editorial hero refinement

- Shifted the hero from a centered composition to a left-aligned editorial
  split layout inspired by tactile stationery and technical notebooks.
- Changed the headline to a large system-serif treatment while retaining Inter
  for controls, labels, and supporting content.
- Reduced decorative density by keeping only one supporting visual and omitting
  the inspiration reference's additional feature strip.
- Converted popular-topic links into restrained neutral pills.
- Built the right-side visual entirely in HTML and CSS:
  a rotated grid sheet, layered paper, tape, binding holes, and the six-step
  preparation loop with icons.
- Reused `GridPattern` for both the page background and the paper's underlying
  graph sheet.
- Hide the paper composition below the desktop breakpoint so mobile remains
  focused on the headline, search, actions, and popular topics.
- Preserved full light/dark theme support without introducing image assets.

## 2026-07-30 - Hero design correction

- Rejected the oversized serif headline and stationery collage after visual
  review; they felt decorative, unbalanced, and disconnected from the actual
  product.
- Established a restrained two-sans type system: Geist for display headings and
  Inter for interface controls, labels, and supporting copy.
- Reduced the maximum headline size and softened its tracking so it reads as a
  confident product statement rather than a poster.
- Replaced the paper metaphor with a single product-like “Today's study plan”
  preview showing readiness, a focused sequence of activities, and local
  progress behavior.
- Removed rotations, tape, binding holes, heavy grid contrast, and ornamental
  popular-topic pills.
- Kept the grid as low-contrast environmental texture rather than a dominant
  visual motif.
- The intended first impression is now calm, structured, credible, and focused
  on beginning a study session.

## 2026-07-30 - Focus-session hero refinement

- Added a project writing rule: use hyphens instead of em dashes in all product
  copy and development notes.
- Simplified the hero search trigger by removing its oversized icon tile,
  reducing height and shadow, and explicitly applying Inter to the placeholder.
- Reduced the action hierarchy to one compact primary button and one quiet text
  action.
- Replaced the large generic readiness dashboard with a compact focus-session
  preview centered on one real topic.
- The preview now communicates a believable study flow:
  Learn, Recall, Quiz, topic progress, and Continue Session.
- Removed the artificial readiness percentage and oversized activity rows.
- Updated the headline to focus on PrepLoom's core promise:
  understanding a concept and recalling it during an interview.

## 2026-07-30 - Hero copy restoration

- Kept the refined focus-session visual design unchanged.
- Restored the earlier left-side eyebrow, headline, supporting description, and
  Popular label after copy review.
- Visual design changes should not imply copy changes unless both are requested.

## 2026-07-30 - Hero illustration integration

- Replaced the right-side focus-session UI preview with the provided
  `public/hero.png` preparation-loop illustration.
- Kept the current left-side wording and controls unchanged.
- Rendered the asset with `next/image` using its intrinsic 521 × 479 dimensions
  to avoid layout shift.
- Added responsive image sizing and a restrained theme-aware drop shadow.
- Kept the right-side illustration hidden below the desktop breakpoint to
  preserve the focused mobile composition.

## 2026-07-30 - Hero illustration scale

- Increased the right-side illustration container to 560px.
- Added controlled desktop scaling so the image has stronger visual presence
  without changing the left-side content or mobile layout.

## 2026-07-30 - Theme-specific hero illustrations

- Use `hero-light.png` in light mode.
- Keep the current `hero1.png` illustration in dark mode.
- Use each asset's correct intrinsic dimensions while preserving identical
  responsive sizing.

## 2026-07-30 - Site footer

- Used the spacious structure of the supplied footer reference while mapping
  navigation to the PrepLoom user journey.
- Added Learn, Resources, Product, and Legal groups.
- Reused the PrepLoom mark and the Geist plus Inter type system.
- Avoided unconfirmed social links and fake operational-status messaging.
- Added a guest-first note explaining that progress stays on the current
  browser.
- Used a restrained dashed divider, neutral surfaces, and theme-aware borders.
- Responsive behavior uses two navigation columns on small screens, four on
  wider screens, and a five-column brand plus navigation layout on desktop.

## 2026-07-30 - Subject Explorer

- Built the first post-hero product section around the primary journey action:
  selecting a subject.
- Used Tailark's shared-frame and divider approach so the catalog reads as one
  product module rather than seven unrelated cards.
- Adapted Aceternity's card-hover concept into one subtle motion surface that
  follows the currently hovered subject.
- Used a 4 plus 3 grid on large screens, two columns on tablets, and one column
  on mobile.
- Avoided invented module counts, study times, and availability claims.
- Added short topic previews to help users understand each subject before
  opening it.
- Kept the section free of colorful icons, gradients, and floating-card
  shadows.
- Stored subject definitions in `lib/subjects.ts` for reuse by future subject
  pages and search indexing.
- Replaced overlapping tablet and desktop divider selectors with explicit
  breakpoint assignments so the 02/03 and 06/07 dividers render correctly.

## 2026-07-30 - Hero illustration scale increase

- Increased the illustration container from 560px to 640px.
- Increased desktop scaling to 116% and extra-large scaling to 125%.
- Kept the left-side content and mobile layout unchanged.

## 2026-07-30 - Mobile hero spacing

- Removed the viewport-height constraint from the mobile and tablet hero so it
  follows the content height without creating large empty areas.
- Top-aligned the mobile hero and reduced its vertical padding to 48px.
- Preserved the full-height, vertically centered composition from the desktop
  breakpoint onward.

## 2026-07-30 - Animated theme transition

- Replaced the navbar's static theme button with the shared
  `AnimatedThemeToggler`.
- Used its circular view transition from the toggle position with a 450ms
  duration.
- Integrated the component in controlled mode so PrepLoom continues to use the
  existing `preploom-theme` storage key, root data attribute, and browser color
  scheme.

## 2026-07-30 - Three preparation modes section plan

- Place the section directly after Choose a subject so it explains what happens
  after a visitor opens a topic.
- Present one interactive topic workspace instead of three disconnected feature
  cards.
- Use ACID Properties as the stable example across Learn, Revise, and
  Last-minute modes.
- On desktop, use a vertical mode selector beside one shared content preview.
  On mobile, place a compact three-option selector above the preview.
- Learn mode will demonstrate context, explanation, examples, and trade-offs.
- Revise mode will demonstrate essential concepts, comparisons, and likely
  follow-up questions.
- Last-minute mode will demonstrate a one-minute recap, memory cues, and common
  traps.
- Keep the section monochrome with one bordered frame, internal dividers,
  restrained active states, and no floating-card shadows.
- Use Geist for headings and Inter for controls and reading content.
- Add a subtle crossfade or shared-layout transition when the mode changes and
  respect reduced-motion preferences.
- Include one contextual action to open the example topic, with no competing
  calls to action.
- Stack controls and content cleanly at narrow widths, keep all modes keyboard
  accessible, and prevent labels or technical content from clipping at 320px.
- Use Aceternity Animated Tabs as the interaction reference for the moving
  active state and content transition.
- Use Tailark's single-feature-block composition as the structural reference,
  giving the preparation workflow one large product preview rather than a grid
  of promotional cards.
- Do not add a separate Magic UI effect because the section already has one
  purposeful motion system and should remain visually restrained.

## 2026-07-30 - Three preparation modes implementation

- Added the section directly after the subject explorer.
- Built one ACID Properties workspace with Learn, Revise, and Last-minute
  content states rather than three promotional cards.
- Added an Aceternity-inspired animated active tab surface and restrained
  content crossfade using the existing Motion dependency.
- Used a Tailark-inspired single feature frame with one border, internal
  dividers, and a contextual topic action.
- Added arrow-key, Home, and End navigation with semantic tab and tabpanel
  roles.
- Used a horizontal compact selector on mobile and a descriptive vertical
  selector on desktop.
- Kept all content theme-aware, monochrome, and readable at narrow viewport
  widths.

## 2026-07-30 - Preparation modes content correction

- Replaced the interactive ACID Properties lesson preview with a direct
  explanation of what PrepLoom provides in each preparation mode.
- Made Learn, Revise, and Last-minute visible simultaneously so visitors can
  compare them without operating tabs or reading topic content.
- Defined each mode through one outcome, a short purpose statement, and four
  concrete product capabilities.
- Removed the topic breadcrumb, lesson definitions, tab controls, content
  animation, and topic CTA.
- Retained the premium shared frame, internal dividers, monochrome system, and
  subtle gray hover treatment.
- Added one closing statement explaining that users can change preparation
  depth without losing their topic or context.

## 2026-07-30 - Brand logo assets

- Replaced the custom SVG mark plus text lockups in the navbar and footer with
  the provided horizontal PrepLoom logo assets.
- Use `light-logo.png` on light surfaces and `dark-logo.png` on dark surfaces.
- Added one shared `PrepLoomLogo` component so brand sizing and theme switching
  remain consistent.
- Kept textual PrepLoom references in metadata, search labels, copyright, and
  accessible names because those are interface copy rather than visual logo
  lockups.

## 2026-07-30 - Preparation modes reference alignment

- Expanded the section frame to 1540px on wide screens to match the supplied
  spacious three-column composition.
- Increased the desktop heading, mode titles, descriptions, icon containers,
  and feature labels for stronger hierarchy.
- Added a solid divider above every feature list.
- Converted feature checks into bordered circular indicators and separated
  each feature row with a restrained dashed rule.
- Increased card depth and internal padding on wide screens while retaining
  compact, stacked cards on mobile.
- Strengthened the shared footer row so the relationship between the three
  modes reads as part of one system.

## 2026-07-30 - Preparation modes scale correction

- Restored PrepLoom's established 1240px content width, section spacing,
  typography scale, card height, padding, and compact icon treatment.
- Kept only the useful structural details from the supplied reference: a list
  divider, circular check indicators, and subtle dashed row separators.
- Avoided carrying the reference image's oversized presentation into the
  website so the section remains consistent with the hero and subject explorer.

## 2026-07-30 - Roadmap section design plan

- Break the repeated full-width heading plus divided-card pattern with a
  two-column roadmap navigator.
- Place editorial copy and three text-based roadmap choices on the left.
- Show one connected subject path on the right, with CS Core selected by
  default and Backend or Frontend available on demand.
- Use Magic UI Animated Beam as the reference for the route connection, but
  replace its colorful integration styling with one restrained neutral pulse.
- Use Tailark's How It Works guidance for concise step labels, visible
  sequencing, and one clear action.
- Do not use Aceternity Tracing Beam because a scroll-bound presentation would
  make this homepage section too tall and interaction-heavy.
- On mobile, stack the roadmap selector above a vertical static route and avoid
  horizontal overflow.
- Respect reduced-motion preferences by rendering solid connectors without a
  travelling beam.
- Keep the section at PrepLoom's established 1240px width and use one inset
  route canvas rather than another grid of cards.

## 2026-07-30 - Roadmap section implementation

- Added the roadmap navigator after the preparation modes section.
- Used an asymmetric selector plus visualization layout rather than another
  equal-column card grid.
- Added CS Core, Backend, and Frontend roadmap choices with concise purpose
  statements.
- Added a local neutral adaptation of Magic UI Animated Beam to connect five
  stages and animate once when a roadmap changes.
- Used the existing grid pattern only inside the route canvas to give the
  diagram technical structure without repeating the hero treatment.
- Added a static vertical route for mobile and a static connector fallback for
  reduced-motion preferences.
- Added accessible pressed states, a polite selected-path announcement, and
  clear links to the selected roadmap or complete roadmap catalog.

## 2026-07-30 - Roadmap section removal

- Removed the roadmap section from the homepage after visual review.
- Deleted the section implementation and its dedicated animated beam component.
- Restored the homepage sequence to Hero, Subject Explorer, Preparation Modes,
  and Footer so a different roadmap direction can be explored later.
