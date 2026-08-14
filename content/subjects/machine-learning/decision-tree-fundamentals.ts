import type { SubjectTopic } from "@/lib/subject-content";

export const decisionTreeFundamentals: SubjectTopic = {
  slug: "decision-tree-fundamentals",
  title: "Decision Tree Fundamentals",
  description:
    "Understand nodes, branches, recursive splits, prediction paths, and the strengths and limits of decision trees.",
  readTime: "15 min",
  difficulty: "Foundation",
  tags: ["Decision Tree", "Nodes", "Splits"],
  learn: {
    opening:
      "A decision tree predicts by asking a sequence of feature-based questions. Each answer follows a branch until a leaf produces the final prediction.",
    sections: [
      {
        title: "Tree Anatomy",
        paragraphs: [
          "The root contains all training examples. An internal node asks a question, a branch represents an answer, and a leaf stores the prediction for examples that reach it.",
          "These notes count the root split as depth 1. Some libraries label the root node as depth 0, so state the convention when depth is asked in an exam.",
        ],
        visual: {
          src: "/notes/machine-learning/decision-tree-anatomy.png",
          alt: "Decision tree showing root node, internal nodes, branches, and leaf predictions",
          width: 1536,
          height: 1024,
          caption: "A prediction follows one path from the root to exactly one leaf.",
        },
        dataTable: {
          headers: ["Part", "Meaning", "Example"],
          rows: [
            ["Root", "First node containing all training rows", "Income ≤ 50k?"],
            ["Internal node", "Another feature test", "Age ≤ 30?"],
            ["Branch", "Outcome of a test", "Yes or No"],
            ["Leaf", "Final output", "Approve"],
            ["Depth", "Number of split levels on a path", "Root split has depth 1"],
          ],
        },
      },
      {
        title: "How a Tree Learns",
        paragraphs: [
          "Training considers candidate feature splits and selects one that makes the child groups purer than the parent. The same process is repeated inside each child, so tree construction is recursive.",
          "Classification trees prefer leaves dominated by one class. Regression trees prefer leaves whose numerical targets are close to their leaf mean.",
        ],
        flow: ["Start with all rows", "Try candidate splits", "Choose best impurity reduction", "Repeat in each child", "Stop and create leaves"],
      },
      {
        title: "Numerical and Categorical Splits",
        paragraphs: [
          "A numerical split commonly asks whether x is at most a threshold. A categorical split asks whether a category belongs to a selected group. The trained split must also define how future values are routed.",
          "Some tree implementations support category groups directly, while others require categorical values to be encoded first.",
        ],
        table: {
          headers: ["Numerical feature", "Categorical feature"],
          rows: [
            ["Age ≤ 30", "Weather = Sunny"],
            ["Ordered threshold", "Category membership"],
            ["Two intervals", "Two category groups"],
          ],
        },
      },
      {
        title: "Making a Prediction",
        paragraphs: [
          "Prediction does not compare every leaf. It evaluates only the questions on one root-to-leaf path.",
          "Therefore, prediction work is roughly proportional to the depth of the reached leaf.",
        ],
        problems: [
          {
            title: "Follow a classification path",
            prompt: "A tree asks Income ≤ 50k. If Yes, it asks Credit score ≤ 650. The leaves are: No → Approve; Yes and score ≤ 650 → Reject; Yes and score > 650 → Approve. Predict for income 45k and score 700.",
            steps: [
              "45k ≤ 50k, so follow the Yes branch.",
              "700 ≤ 650 is false, so follow the score > 650 branch.",
            ],
            answer: "The prediction is Approve.",
          },
        ],
      },
      {
        title: "What a Classification Leaf Stores",
        paragraphs: [
          "A leaf usually predicts its majority class. It may also report class proportions from the training rows in that leaf as estimated probabilities.",
          "For a leaf with 8 positive and 2 negative rows, the class prediction is positive and the training proportion for the positive class is 8/10 = 0.8.",
        ],
        formulas: [
          { label: "Leaf class probability", expression: "P̂(class k | leaf) = rows of class k / rows in leaf" },
        ],
      },
      {
        title: "Key Strengths",
        points: [
          "Easy to explain as a sequence of rules.",
          "Captures nonlinear relationships and feature interactions.",
          "Usually does not require feature standardization.",
          "Works with numerical and encoded categorical information.",
        ],
        paragraphs: [
          "Scaling does not change the ordering of a numerical feature, so it normally does not change threshold choices.",
        ],
      },
      {
        title: "Key Limitations",
        points: [
          "A deep tree can memorize training noise and overfit.",
          "Small data changes can produce a different tree structure.",
          "Axis-aligned splits can require many nodes for some boundaries.",
          "Greedy split choices do not guarantee the globally best possible tree.",
        ],
        paragraphs: [
          "These limits make depth control and validation essential.",
        ],
      },
    ],
    mechanism: {
      title: "Decision-tree prediction flow",
      steps: [
        "Start at the root node.",
        "Evaluate the node's feature condition.",
        "Follow the branch matching the result.",
        "Repeat until a leaf is reached.",
        "Return the leaf's class or numerical value.",
      ],
    },
    example: {
      title: "Loan decision",
      body: "A loan tree may first split on payment history, then use debt ratio only for one branch. This is an interaction: debt ratio matters differently depending on the earlier result.",
    },
    misconception:
      "A decision tree does not test every feature during every prediction. It evaluates only the nodes on the selected path.",
  },
  revise: {
    definitionLabel: "Core Model",
    compactDefinition: true,
    definition:
      "A decision tree recursively splits examples using feature questions and predicts from the leaf reached by one path.",
    sections: [
      {
        title: "Tree Parts",
        points: ["Root: first split", "Internal node: another test", "Branch: test outcome", "Leaf: prediction", "Depth: split levels"],
      },
      {
        title: "Training Flow",
        flow: ["Try splits", "Measure child purity", "Choose best split", "Repeat", "Stop at leaves"],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Classification leaves predict classes; regression leaves predict numbers.",
      "Numerical splits usually compare with a threshold.",
      "Trees normally do not need feature scaling.",
      "Deep trees can overfit.",
      "Greedy construction finds a strong local split, not guaranteed global optimum.",
    ],
    followUp: "Why can two similar training samples produce different tree structures?",
  },
  lastMinute: {
    definition: "Ask feature questions from root to leaf; the leaf gives the prediction.",
    sections: [
      { title: "Path", flow: ["Root", "Condition", "Branch", "Next node", "Leaf"], wide: true },
      { title: "Remember", points: ["No scaling usually needed", "Handles interactions", "Deep tree can overfit", "Greedy splits"] },
    ],
    memoryLine: "Root asks first; branch chooses direction; leaf answers.",
    cues: ["One prediction follows one path.", "Leaf probability comes from class proportions.", "Depth counts split levels."],
    trap: "Do not call every node a leaf; only terminal nodes are leaves.",
  },
};

export const entropyAndInformationGain: SubjectTopic = {
  slug: "entropy-and-information-gain",
  title: "Entropy and Information Gain",
  description:
    "Measure class uncertainty with entropy and select splits using weighted information gain.",
  readTime: "17 min",
  difficulty: "Intermediate",
  tags: ["Entropy", "Information Gain", "Split Criterion"],
  learn: {
    opening:
      "Entropy measures class uncertainty. Information gain measures how much a candidate split reduces that uncertainty.",
    sections: [
      {
        title: "Entropy",
        paragraphs: [
          "For a node with class proportions p₁ through pK, entropy adds −pₖlog₂pₖ across classes. A pure node has entropy 0. A balanced binary node has maximum entropy 1.",
          "Use the convention 0log₂0 = 0, because a missing class contributes no uncertainty.",
        ],
        formulas: [
          { label: "Entropy", expression: "H(S) = −Σₖ pₖ log₂(pₖ)" },
          { label: "Binary entropy", expression: "H(S) = −p log₂p − (1−p)log₂(1−p)" },
        ],
        dataTable: {
          headers: ["Binary class proportions", "Entropy", "Meaning"],
          rows: [
            ["1 and 0", "0", "Pure"],
            ["0.75 and 0.25", "≈ 0.811", "Mixed"],
            ["0.5 and 0.5", "1", "Maximum binary uncertainty"],
          ],
        },
      },
      {
        title: "Weighted Child Entropy",
        paragraphs: [
          "A split may create children of different sizes. Therefore, child entropy must be weighted by the fraction of parent rows entering each child.",
        ],
        formulas: [
          { label: "Weighted child entropy", expression: "Hchildren = Σⱼ (|Sⱼ|/|S|)H(Sⱼ)" },
        ],
      },
      {
        title: "Information Gain",
        paragraphs: [
          "Information gain is parent entropy minus weighted child entropy. A larger value means the split makes the children purer.",
        ],
        formulas: [
          { label: "Information gain", expression: "IG = H(parent) − Hchildren" },
        ],
        visual: {
          src: "/notes/machine-learning/entropy-information-gain.png",
          alt: "Parent node split into weighted child nodes with entropy and information gain calculation",
          width: 1536,
          height: 1024,
          caption: "Always weight each child by its share of the parent rows.",
        },
      },
      {
        title: "Complete Information-Gain Numerical",
        paragraphs: [
          "The parent has 10 rows: 6 Yes and 4 No. A candidate split creates left child 4 Yes, 0 No and right child 2 Yes, 4 No.",
        ],
        problems: [
          {
            title: "Calculate information gain",
            prompt: "Find the parent entropy, weighted child entropy, and information gain for the split.",
            steps: [
              "H(parent) = −0.6log₂0.6 − 0.4log₂0.4 ≈ 0.971.",
              "H(left) = 0 because the left child is pure.",
              "Right proportions are 2/6 and 4/6, so H(right) = −(2/6)log₂(2/6) − (4/6)log₂(4/6) ≈ 0.918.",
              "Hchildren = (4/10)(0) + (6/10)(0.918) ≈ 0.551.",
              "IG = 0.971 − 0.551 = 0.420.",
            ],
            answer: "The information gain is approximately 0.420 bits.",
          },
        ],
      },
      {
        title: "Comparing Candidate Splits",
        paragraphs: [
          "Calculate information gain for each allowed candidate and choose the largest positive value. A zero gain does not reduce uncertainty. The earlier worked example shows the complete calculation, so repeat the same steps for other candidates.",
          "This choice is greedy: the algorithm selects the best current split, then repeats inside each child instead of searching every possible complete tree.",
        ],
      },
      {
        title: "Common Numerical Mistakes",
        points: [
          "Using class counts directly instead of class proportions.",
          "Forgetting the negative sign in entropy.",
          "Forgetting to weight children by their sizes.",
          "Subtracting in the wrong direction.",
          "Mixing logarithm bases inside one calculation.",
        ],
        paragraphs: [
          "Base 2 gives entropy in bits. A consistent natural logarithm gives a different scale but the same split ranking.",
        ],
      },
    ],
    mechanism: {
      title: "How to score a split with entropy",
      steps: [
        "Count each class in the parent and calculate its entropy.",
        "Apply the candidate split.",
        "Calculate class proportions and entropy for every child.",
        "Weight each child entropy by child size divided by parent size.",
        "Subtract weighted child entropy from parent entropy.",
        "Prefer the candidate with the largest information gain.",
      ],
    },
    example: {
      title: "Pure child, mixed child",
      body: "A split can still be useful when only one child is pure. Its value depends on the weighted uncertainty across all children, not on the best-looking child alone.",
    },
    misconception:
      "Do not average child entropies equally unless the children have equal sizes. Information gain requires size-weighted entropy.",
  },
  revise: {
    definitionLabel: "Split Measure",
    compactDefinition: true,
    definition:
      "Entropy measures uncertainty; information gain is the parent entropy minus the size-weighted child entropy.",
    sections: [
      {
        title: "Essential Formulas",
        formulas: [
          { label: "Entropy", expression: "−Σpₖlog₂pₖ" },
          { label: "Weighted children", expression: "Σ(|Sⱼ|/|S|)H(Sⱼ)" },
          { label: "Information gain", expression: "H(parent) − Hchildren" },
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Pure node entropy = 0.",
      "Balanced binary node entropy = 1.",
      "Use class proportions, not counts, inside the logarithm.",
      "Weight children by size.",
      "Larger information gain is better.",
    ],
    followUp: "Why can an unweighted average of child entropies select the wrong split?",
  },
  lastMinute: {
    definition: "Information gain = uncertainty before split − weighted uncertainty after split.",
    sections: [
      { title: "Order", flow: ["Parent H", "Child H values", "Weight children", "Subtract", "Choose largest IG"], wide: true },
      { title: "Anchors", points: ["Pure → H = 0", "50–50 binary → H = 1", "IG ≥ 0 for an accepted useful split"] },
    ],
    memoryLine: "Parent minus weighted children gives information gain.",
    cues: ["Use log base 2 for bits.", "0 log 0 contributes 0.", "Greedy means best current split."],
    trap: "Do not forget the child-size weights.",
  },
};
