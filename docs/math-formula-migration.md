# Math formula rendering migration

Date: 2026-08-15

## Outcome

PrepLoom's structured subject formulas now render as typeset mathematics instead of raw monospace Unicode strings. The visual output uses KaTeX, while the generated MathML preserves mathematical semantics for assistive technology.

The readable source expression is still retained in the content model. It is used as the stable key, the migration input, a debugging attribute, and the fallback when rendering fails.

## Published corpus covered

| Subject                     |   Learn |  Revise |   Total |
| --------------------------- | ------: | ------: | ------: |
| Operating Systems           |       0 |       0 |       0 |
| Computer Architecture       |     133 |      42 |     175 |
| Object-Oriented Programming |       0 |       0 |       0 |
| Database Systems            |      21 |       0 |      21 |
| Computer Networks           |       0 |       0 |       0 |
| Machine Learning            |     146 |      93 |     239 |
| Deep Learning               |     231 |      56 |     287 |
| **Total**                   | **531** | **191** | **722** |

The 722 displayed entries contain 645 distinct source expressions. Repetition is intentional where a formula appears in both Learn and Revise modes.

## Rendering conventions

- Fractions use stacked numerator and denominator layout.
- Parentheses, brackets, floor, and ceiling marks size to their contents.
- Unicode subscript and superscript runs become semantic subscripts and superscripts.
- Summations, products, roots, gradients, partial derivatives, norms, arrows, and comparison operators use mathematical glyphs and spacing.
- Common functions such as `sin`, `log`, `exp`, `softmax`, and `ReLU` use upright function styling.
- Common multi-character metrics and identifiers use upright text instead of being interpreted as a product of single-letter variables.
- Existing formula labels are preserved. Unlabelled entries use `Key formula` so every figure has a caption.
- Existing formula notes are preserved and visually separated from the expression.
- Authored spaces inside prose-like formulas remain visible instead of collapsing in math mode.
- Wide expressions remain available through horizontal overflow on narrow screens instead of clipping the equation.
- Light and dark themes use the existing PrepLoom color hierarchy.

## Accessibility and safety

- KaTeX output mode is `htmlAndMathml`.
- Visual HTML is paired with semantic MathML.
- KaTeX trust is disabled, so source strings cannot enable URL, image, or raw HTML commands.
- The original readable expression is rendered as plain text if conversion or typesetting fails.
- Motion was not added to formula cards.

## Validation

Run:

```bash
npm run audit:math
```

The audit loads the same curated subject objects used by the published pages, converts every formula, and renders each one with strict KaTeX parsing. It exits with an error and prints the subject, topic, source expression, and parser message if any formula fails.

Migration result:

```text
Formula entries: 722
Distinct expressions: 645
KaTeX failures: 0
Spacing failures: 0
```

Additional checks completed during the migration:

- TypeScript typecheck passed.
- Server-rendered note markup contains both `.katex-html` and `.katex-mathml` output.
- The KaTeX stylesheet is loaded from the installed package in the root layout.

## Scope boundary

The count above covers fields explicitly authored as `SubjectFormula`. General paragraphs, code examples, mnemonics, IP prefixes, and prose that happen to contain characters such as `=`, `/`, or `<` are not automatically interpreted as mathematics. Converting those strings wholesale would incorrectly turn Java assignments, register names, CIDR notation, and conceptual comparisons into equations.

When genuine mathematics is found inside prose, move it into a `formulas` entry or add an explicit inline-math field in a future content-model migration. Do not infer inline mathematics from punctuation alone.

## Files introduced or changed

- `components/subjects/math-formula.tsx`: safe KaTeX and fallback renderer.
- `components/subjects/subject-workspace.tsx`: semantic formula figure layout.
- `lib/math-notation.ts`: Unicode notation to LaTeX normalization.
- `scripts/audit-math-formulas.mjs`: full published-corpus regression audit.
- `app/layout.tsx`: KaTeX stylesheet import.
- `package.json` and `package-lock.json`: KaTeX dependency and audit command.
