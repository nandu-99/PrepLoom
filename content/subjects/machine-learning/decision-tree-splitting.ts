import type { SubjectTopic } from "@/lib/subject-content";

export const giniImpurityAndBestSplit: SubjectTopic = {
  slug: "gini-impurity-and-best-split",
  title: "Gini Impurity and the Best Split",
  description:
    "Calculate Gini impurity, weight child nodes, and compare candidate classification splits.",
  readTime: "16 min",
  difficulty: "Intermediate",
  tags: ["Gini Impurity", "Best Split", "Classification Tree"],
  learn: {
    opening:
      "Gini impurity measures how mixed the classes are in a node. A classification tree can choose the split with the lowest weighted child Gini or largest Gini reduction.",
    sections: [
      {
        title: "Gini Impurity",
        paragraphs: [
          "Gini is 0 when all rows belong to one class. For two equally common classes it reaches 0.5. With K classes, its maximum is 1−1/K when all classes are equally common.",
        ],
        formulas: [
          { label: "Gini impurity", expression: "Gini(S) = 1 − Σₖ pₖ²" },
          {
            label: "Binary Gini",
            expression: "Gini = 1 − p² − (1−p)² = 2p(1−p)",
          },
        ],
        dataTable: {
          headers: ["Binary proportions", "Gini", "Meaning"],
          rows: [
            ["1 and 0", "0", "Pure"],
            ["0.8 and 0.2", "0.32", "Mostly one class"],
            ["0.5 and 0.5", "0.5", "Most mixed binary node"],
          ],
        },
      },
      {
        title: "Weighted Gini and Reduction",
        paragraphs: [
          "As with entropy, children must be weighted by their sizes. Lower weighted child impurity is better. Gini reduction expresses the same comparison as an improvement from the parent.",
        ],
        formulas: [
          {
            label: "Weighted child Gini",
            expression: "Gchildren = Σⱼ(|Sⱼ|/|S|)Gini(Sⱼ)",
          },
          {
            label: "Gini reduction",
            expression: "ΔGini = Gini(parent) − Gchildren",
          },
        ],
      },
      {
        title: "Compare Two Candidate Splits",
        visual: {
          src: "/notes/machine-learning/gini-best-split.png",
          alt: "Two candidate decision-tree splits compared using weighted Gini impurity",
          width: 1536,
          height: 1024,
          caption:
            "The best candidate has the smallest weighted child impurity.",
        },
        paragraphs: [
          "The parent contains 5 Yes and 5 No rows, so its Gini is 0.5. Compare the candidates below.",
        ],
        dataTable: {
          headers: [
            "Candidate",
            "Left child",
            "Right child",
            "Weighted child Gini",
          ],
          rows: [
            ["A", "4 Yes, 1 No", "1 Yes, 4 No", "0.32"],
            ["B", "3 Yes, 2 No", "2 Yes, 3 No", "0.48"],
          ],
        },
        problems: [
          {
            title: "Select the better split",
            prompt: "Calculate the Gini reduction for candidates A and B.",
            steps: [
              "Candidate A left Gini = 1 − (4/5)² − (1/5)² = 0.32; right Gini is also 0.32.",
              "A weighted Gini = (5/10)(0.32) + (5/10)(0.32) = 0.32.",
              "A reduction = 0.50 − 0.32 = 0.18.",
              "Candidate B child Gini = 1 − (3/5)² − (2/5)² = 0.48 for both children.",
              "B weighted Gini = 0.48, so B reduction = 0.50 − 0.48 = 0.02.",
            ],
            answer:
              "Choose candidate A because its reduction 0.18 is larger and its weighted impurity 0.32 is lower.",
          },
        ],
      },
      {
        title: "Numerical Threshold Candidates",
        paragraphs: [
          "For a numerical feature, first sort the rows by that feature. Consider midpoint thresholds between consecutive distinct values, then score the left and right children created by every threshold.",
          "Implementations may skip a midpoint when it would create the same partition as another candidate.",
        ],
        formulas: [
          { label: "Midpoint threshold", expression: "t = (x(i) + x(i+1))/2" },
        ],
        problems: [
          {
            title: "Find and score every threshold",
            prompt:
              "The sorted rows are (2, No), (4, No), (7, Yes), and (9, Yes). Use Gini reduction to find the best threshold.",
            steps: [
              "Candidate midpoints are 3, 5.5, and 8.",
              "The parent has 2 Yes and 2 No, so Gini(parent) = 0.5.",
              "At t = 3: left [No] has Gini 0; right [No, Yes, Yes] has Gini 4/9 ≈ 0.444. Weighted Gini = (1/4)(0) + (3/4)(0.444) ≈ 0.333; reduction ≈ 0.167.",
              "At t = 5.5: left [No, No] and right [Yes, Yes] are pure. Weighted Gini = 0; reduction = 0.5.",
              "At t = 8: left [No, No, Yes] has Gini 4/9 ≈ 0.444; right [Yes] has Gini 0. Weighted Gini ≈ 0.333; reduction ≈ 0.167.",
            ],
            answer:
              "Choose t = 5.5 because it has the smallest weighted Gini, 0, and the largest reduction, 0.5.",
          },
        ],
      },
      {
        title: "Gini and Entropy",
        paragraphs: [
          "Both are 0 for a pure node and usually rank useful splits similarly. Gini uses squared proportions; entropy uses logarithms. The tree should use one configured criterion consistently when comparing candidates at a node.",
        ],
        table: {
          headers: ["Gini", "Entropy"],
          rows: [
            ["1 − Σp²", "−Σp log₂p"],
            ["No logarithms", "Measured in bits with log₂"],
            ["Minimize weighted child Gini", "Maximize information gain"],
          ],
        },
      },
      {
        title: "Common Mistakes",
        points: [
          "Choosing the largest weighted impurity instead of the smallest.",
          "Forgetting child-size weights.",
          "Using counts instead of proportions in 1−Σp².",
          "Comparing Gini reduction from one criterion with entropy gain from another as if their values share a scale.",
        ],
        paragraphs: [
          "State whether the question asks for weighted impurity or impurity reduction; both identify the same best split when the parent is fixed.",
        ],
      },
    ],
    mechanism: {
      title: "How to choose a split using Gini",
      steps: [
        "Calculate the parent Gini.",
        "Apply one candidate split.",
        "Calculate class proportions and Gini in each child.",
        "Weight child Gini values by child sizes.",
        "Subtract from parent Gini if reduction is requested.",
        "Choose the smallest weighted Gini or largest reduction.",
      ],
    },
    example: {
      title: "Same decision, two forms",
      body: "For one parent node, minimizing weighted child Gini and maximizing Gini reduction always choose the same candidate because the parent Gini is constant.",
    },
    misconception:
      "A large Gini value does not mean a good split. The desired child impurity is small; only Gini reduction should be large.",
  },
  revise: {
    definitionLabel: "Split Measure",
    compactDefinition: true,
    definition:
      "Gini impurity is 1−Σp²; a good split produces a low size-weighted child Gini.",
    sections: [
      {
        title: "Essential Formulas",
        formulas: [
          { label: "Node Gini", expression: "1−Σpₖ²" },
          { label: "Weighted children", expression: "Σ(|Sⱼ|/|S|)Gini(Sⱼ)" },
          { label: "Reduction", expression: "Gini(parent)−Gchildren" },
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Pure node Gini = 0.",
      "Balanced binary Gini = 0.5.",
      "Weight children by size.",
      "Small weighted child Gini is good.",
      "Large Gini reduction is good.",
    ],
    followUp:
      "Why do minimizing child Gini and maximizing Gini reduction choose the same split?",
  },
  lastMinute: {
    definition:
      "Gini measures class mixing: zero is pure, larger is more mixed.",
    sections: [
      {
        title: "Split Order",
        flow: ["Parent Gini", "Child Gini", "Weight", "Reduce", "Choose best"],
        wide: true,
      },
      {
        title: "Direction",
        points: [
          "Weighted impurity: smaller",
          "Reduction: larger",
          "Pure child: zero",
        ],
      },
    ],
    memoryLine: "Small child Gini, large Gini reduction.",
    cues: [
      "Binary maximum is 0.5.",
      "Use proportions.",
      "Midpoints give numerical thresholds.",
    ],
    trap: "Do not choose the candidate with the largest weighted child Gini.",
  },
};

export const buildingClassificationTree: SubjectTopic = {
  slug: "building-and-using-a-classification-tree",
  title: "Building and Using a Classification Tree",
  description:
    "Build a tree recursively, choose splits, form leaves, and make class and probability predictions.",
  readTime: "17 min",
  difficulty: "Intermediate",
  tags: ["Tree Construction", "Classification", "Prediction"],
  learn: {
    opening:
      "A classification tree repeats the same local decision: find the best allowed split for the rows currently at a node, then continue inside its children.",
    sections: [
      {
        title: "Recursive Construction",
        paragraphs: [
          "Begin with all training rows at the root. Generate candidate splits, score them with Gini or entropy, choose the best, and send rows to the resulting children. Repeat until a stopping condition is met.",
        ],
        visual: {
          src: "/notes/machine-learning/classification-tree-construction.png",
          alt: "Classification dataset recursively split into purer child nodes and prediction leaves",
          width: 1536,
          height: 1024,
          caption:
            "Each node uses only the rows that reached it when selecting its next split.",
        },
      },
      {
        title: "Complete Small Tree Numerical",
        paragraphs: [
          "A training set records whether six students pass. Use the table to build a simple tree.",
        ],
        dataTable: {
          headers: ["Row", "Study ≥ 2h", "Attendance ≥ 75%", "Pass"],
          rows: [
            ["1", "No", "No", "No"],
            ["2", "No", "Yes", "No"],
            ["3", "No", "Yes", "No"],
            ["4", "Yes", "No", "No"],
            ["5", "Yes", "Yes", "Yes"],
            ["6", "Yes", "Yes", "Yes"],
          ],
        },
        problems: [
          {
            title: "Build the two-level tree",
            prompt:
              "Using Gini reduction, choose the root from Study ≥ 2h and Attendance ≥ 75%, then complete the tree and state its leaves.",
            steps: [
              "The root has 2 Yes and 4 No, so Gini(root) = 1 − (2/6)² − (4/6)² ≈ 0.444.",
              "Study split: Study = No has Gini 0; Study = Yes has Gini 4/9 ≈ 0.444. Weighted Gini ≈ (3/6)(0) + (3/6)(0.444) = 0.222; reduction = 0.222.",
              "Attendance split at the root: Attendance = No is pure; Attendance = Yes has 2 Yes and 2 No, so its Gini is 0.5. Weighted Gini = (2/6)(0) + (4/6)(0.5) ≈ 0.333; reduction ≈ 0.111.",
              "Choose Study ≥ 2h because 0.222 is the larger root reduction. Study = No becomes a pure No leaf.",
              "Study = Yes contains rows 4–6: one No and two Yes. Splitting this child on Attendance makes both children pure, reducing its Gini from 0.444 to 0.",
              "Attendance = No contains row 4, so predict No. Attendance = Yes contains rows 5–6, so predict Yes.",
            ],
            answer:
              "If Study = No, predict No. If Study = Yes and Attendance = No, predict No. If both are Yes, predict Yes.",
          },
        ],
      },
      {
        title: "Ties and Reusing Features",
        paragraphs: [
          "If candidate splits have exactly the same score, the tie-breaking rule depends on the implementation. The model may use feature order or another deterministic rule.",
          "A feature may be used again later with a different numerical threshold if the implementation permits it.",
        ],
      },
      {
        title: "Leaf Class and Probability",
        paragraphs: [
          "A leaf predicts its majority class. Its class proportions can be reported as probabilities, although very small leaves give unstable estimates.",
        ],
        problems: [
          {
            title: "Read a mixed leaf",
            prompt:
              "A leaf contains 7 Yes and 3 No training rows. What class and probability does it report?",
            steps: [
              "Majority class is Yes.",
              "P̂(Yes | leaf) = 7/10 = 0.70.",
              "P̂(No | leaf) = 3/10 = 0.30.",
            ],
            answer: "Predict Yes with leaf proportions 0.70 Yes and 0.30 No.",
          },
        ],
      },
      {
        title: "Stopping Conditions",
        paragraphs: [
          "A node becomes a leaf when it is pure, no valid split improves the criterion, or a configured limit is reached. Limits such as maximum depth and minimum leaf size help control complexity.",
        ],
        points: [
          "Pure node",
          "No positive impurity reduction",
          "Maximum depth reached",
          "Too few rows to split",
          "A child would be smaller than the minimum leaf size",
        ],
      },
      {
        title: "Training and Prediction Are Different",
        table: {
          headers: ["Training", "Prediction"],
          rows: [
            ["Searches many candidate splits", "Follows one stored path"],
            ["Uses labels to measure impurity", "Does not need the true label"],
            ["Builds the tree", "Keeps tree structure fixed"],
          ],
        },
        paragraphs: [
          "Training is more expensive because it evaluates alternatives. Prediction is usually fast because it checks at most one node per depth level.",
        ],
      },
    ],
    mechanism: {
      title: "Classification-tree training cycle",
      steps: [
        "Place current rows in a node.",
        "Generate allowed feature splits.",
        "Score each split with one criterion.",
        "Choose the best valid improvement.",
        "Recurse into children.",
        "Stop and store majority class and proportions at leaves.",
      ],
    },
    example: {
      title: "Support ticket priority",
      body: "A tree may first split on service outage, then split only non-outage tickets by customer tier. Each child is trained using only tickets routed into it.",
    },
    misconception:
      "A tree does not select every level using the full dataset. After the root, each node evaluates only its own subset of rows.",
  },
  revise: {
    definitionLabel: "Construction",
    compactDefinition: true,
    definition:
      "At each node, a classification tree chooses the valid split with the best impurity improvement and recursively repeats inside each child.",
    sections: [
      {
        title: "Build",
        flow: [
          "Current rows",
          "Candidate splits",
          "Score",
          "Choose",
          "Recurse or stop",
        ],
      },
      {
        title: "Leaf",
        points: [
          "Majority class gives prediction",
          "Class proportions give probabilities",
          "Small leaves are unstable",
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Use one configured split criterion consistently.",
      "Each child sees only its routed rows.",
      "A feature can appear again in a later node.",
      "Stopping conditions create leaves.",
      "Prediction follows one stored path.",
    ],
    followUp:
      "Why can the same numerical feature appear at more than one level?",
  },
  lastMinute: {
    definition:
      "Choose the best current split, route rows, and repeat until stopping.",
    sections: [
      {
        title: "Training",
        flow: ["Try", "Score", "Split", "Recurse", "Leaf"],
        wide: true,
      },
      {
        title: "Leaf Output",
        points: ["Majority class", "Class proportions", "No further split"],
      },
    ],
    memoryLine: "Every node learns only from the rows that reach it.",
    cues: [
      "Training searches; prediction follows.",
      "Pure nodes need no split.",
      "Validate stopping limits.",
    ],
    trap: "Do not use the full root dataset again when scoring a deeper node.",
  },
};
