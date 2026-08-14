import type { SubjectTopic } from "@/lib/subject-content";

export const treeOverfittingAndPruning: SubjectTopic = {
  slug: "tree-overfitting-stopping-and-pruning",
  title: "Tree Overfitting, Stopping Criteria, and Pruning",
  description:
    "Control decision-tree complexity using stopping rules, validation, and pruning.",
  readTime: "16 min",
  difficulty: "Intermediate",
  tags: ["Overfitting", "Pruning", "Bias-Variance"],
  learn: {
    opening: "An unrestricted tree can keep splitting until leaves contain very few rows. That can produce excellent training accuracy but unstable rules that fail on unseen data.",
    sections: [
      {
        title: "Why Deep Trees Overfit",
        paragraphs: [
          "Every extra split can reduce training impurity, even when it isolates noise or an unusual observation. Deep trees therefore have low bias but high variance.",
          "A shallow tree may miss real structure and underfit. Complexity control seeks the depth and leaf sizes that generalize best.",
        ],
        visual: {
          src: "/notes/machine-learning/tree-overfitting-pruning.png",
          alt: "Deep overfitted decision tree compared with a smaller pruned tree and validation performance",
          width: 1536,
          height: 1024,
          caption: "Pruning removes weak branches to trade a little training fit for better stability.",
        },
      },
      {
        title: "Pre-Pruning: Stop Growth Early",
        paragraphs: ["Pre-pruning applies limits while the tree is being built. The settings are hyperparameters and should be selected using validation data or cross-validation."],
        dataTable: {
          headers: ["Setting", "Effect when made stricter", "Risk if too strict"],
          rows: [
            ["Maximum depth", "Fewer split levels", "Misses interactions"],
            ["Minimum rows to split", "Small nodes cannot divide", "Stops useful local patterns"],
            ["Minimum rows per leaf", "Avoids tiny leaves", "Leaves may be too broad"],
            ["Minimum impurity decrease", "Requires stronger improvement", "Rejects small real gains"],
          ],
        },
      },
      {
        title: "Post-Pruning: Simplify a Grown Tree",
        paragraphs: [
          "Post-pruning first grows a larger tree and then removes branches whose extra complexity is not justified. Replacing a subtree with one leaf makes the model smaller.",
          "Cost-complexity pruning balances training error with the number of leaves. Larger α penalizes complexity more strongly and normally produces a smaller tree.",
          "Here, R(T) is the tree's training error and |leaves(T)| is its number of terminal leaves.",
        ],
        formulas: [{ label: "Cost-complexity objective", expression: "Rα(T) = R(T) + α|leaves(T)|" }],
      },
      {
        title: "Cost-Complexity Numerical",
        paragraphs: ["For a fixed α, calculate the penalized objective for every candidate subtree. A smaller value gives the better error–complexity balance."],
        problems: [
          {
            title: "Compare two pruned trees",
            prompt: "Tree A has training error R(T) = 0.12 and 8 leaves. Tree B has training error 0.15 and 4 leaves. For α = 0.01, which tree is preferred?",
            steps: [
              "Tree A: Rα(A) = 0.12 + 0.01(8) = 0.20.",
              "Tree B: Rα(B) = 0.15 + 0.01(4) = 0.19.",
              "Tree B has slightly higher training error but a smaller complexity penalty and lower total objective.",
            ],
            answer: "Choose Tree B because its cost-complexity objective, 0.19, is smaller than 0.20.",
          },
        ],
      },
      {
        title: "Validation Numerical",
        paragraphs: ["Training score alone cannot show whether additional growth will generalize, so compare candidate complexities on unseen validation data."],
        dataTable: {
          headers: ["Tree", "Depth", "Training accuracy", "Validation accuracy"],
          rows: [["A", "12", "95%", "78%"], ["B", "5", "90%", "86%"], ["C", "2", "82%", "80%"]],
        },
        problems: [{ title: "Choose the tree", prompt: "Which candidate should be selected from the table?", steps: ["Tree A has the best training accuracy but a large train–validation gap, suggesting overfitting.", "Tree C is small but has lower validation accuracy, suggesting underfitting.", "Tree B has the highest validation accuracy at 86%."], answer: "Choose Tree B based on validation performance, then evaluate the locked choice once on test data." }],
      },
      {
        title: "Bias–Variance View",
        table: {
          headers: ["Shallow tree", "Deep tree"],
          rows: [["Higher bias", "Lower training bias"], ["Lower variance", "Higher variance"], ["Can underfit", "Can overfit"], ["Simpler rules", "More specific rules"]],
        },
        paragraphs: ["Pruning generally raises bias and lowers variance. The desired point is not the smallest or largest tree, but the one with the best validated generalization."],
      },
      {
        title: "Signs and Responses",
        dataTable: {
          headers: ["Observation", "Likely issue", "Response"],
          rows: [["High train, low validation score", "Overfitting", "Reduce depth, enlarge leaves, or prune"], ["Low train and validation score", "Underfitting", "Allow more depth or weaker limits"], ["Large changes across samples", "High variance", "Stronger complexity control"], ["Many one-row leaves", "Memorization risk", "Increase minimum leaf size"]],
        },
        paragraphs: ["Change one family of controls deliberately and compare with cross-validation rather than choosing a depth from training accuracy."],
      },
      {
        title: "Data Leakage Warning",
        paragraphs: ["Do not choose depth, leaf size, or pruning strength using the test set. These are model-selection decisions. Lock them after validation, then use the test set once for the final estimate."],
      },
    ],
    mechanism: {
      title: "Complexity-control workflow",
      steps: ["Choose candidate depth, leaf-size, or pruning values.", "Train each candidate on training data.", "Compare them with validation or cross-validation.", "Select the candidate with the best validated performance; if scores are effectively tied, prefer the smaller tree.", "Lock the tree settings.", "Evaluate once on untouched test data."],
    },
    example: { title: "One-customer leaves", body: "A churn tree that creates leaves for single customers can memorize past outcomes. Requiring larger leaves forces each rule to be supported by more examples." },
    misconception: "Pruning does not aim to maximize training accuracy. It deliberately removes some training fit when simpler rules generalize better.",
  },
  revise: {
    definitionLabel: "Complexity Control",
    compactDefinition: true,
    definition: "Stopping rules and pruning restrict tree size to reduce high variance and improve unseen-data performance.",
    sections: [{ title: "Pre vs Post", table: { headers: ["Pre-pruning", "Post-pruning"], rows: [["Stops growth early", "Removes branches after growth"], ["Depth and leaf limits", "Complexity penalty"], ["Cheaper", "Can inspect a larger tree first"]] } }, { title: "Cost Complexity", formulas: [{ label: "Objective", expression: "R(T)+α|leaves(T)|" }] }],
    essentialsStyle: "plain",
    essentials: ["Deep trees tend toward low bias and high variance.", "Shallow trees can underfit.", "Larger α normally gives a smaller pruned tree.", "Select limits using validation, not test data.", "Training accuracy alone cannot choose complexity."],
    followUp: "Why can pruning improve validation accuracy while reducing training accuracy?",
  },
  lastMinute: {
    definition: "Control depth and leaf size, or remove weak branches after growth.",
    sections: [{ title: "Overfit", points: ["Train high, validation low", "Deep and tiny leaves", "Reduce complexity"] }, { title: "Underfit", points: ["Train and validation low", "Tree too restricted", "Allow more structure"] }],
    memoryLine: "Grow enough to learn; prune enough to generalize.",
    cues: ["Pre-pruning stops.", "Post-pruning removes.", "Validate hyperparameters."],
    trap: "Do not select the deepest tree because it has the highest training score.",
  },
};

export const regressionTrees: SubjectTopic = {
  slug: "regression-trees",
  title: "Regression Trees",
  description:
    "Predict numerical targets using leaf means and choose splits by reducing squared error.",
  readTime: "17 min",
  difficulty: "Intermediate",
  tags: ["Regression Tree", "Squared Error", "Leaf Mean"],
  learn: {
    opening: "A regression tree uses the same branching structure as a classification tree, but each leaf predicts a numerical value rather than a class.",
    sections: [
      {
        title: "Leaf Prediction",
        paragraphs: ["Under squared-error loss, the best constant prediction for a leaf is the mean target of the training rows in that leaf."],
        formulas: [
          { label: "Leaf prediction", expression: "ŷleaf = (1/m)Σᵢ∈leaf yᵢ" },
          { label: "Leaf squared error", expression: "SSEleaf = Σᵢ∈leaf(yᵢ − ȳleaf)²" },
        ],
        problems: [{ title: "Predict from a leaf", prompt: "A leaf contains targets [12, 15, 18]. Find its prediction and SSE.", steps: ["Leaf mean = (12 + 15 + 18)/3 = 15.", "SSE = (12−15)² + (15−15)² + (18−15)² = 9 + 0 + 9 = 18."], answer: "The leaf predicts 15 and has SSE 18." }],
      },
      {
        title: "Choosing a Regression Split",
        paragraphs: ["For each candidate threshold, calculate the target mean inside each child and add their SSE values. Choose the split with the smallest child SSE or largest reduction from the parent SSE. For one fixed parent, these two rules always select the same split."],
        formulas: [
          { label: "Split SSE", expression: "SSEsplit = SSEleft + SSEright" },
          { label: "Squared-error reduction", expression: "Reduction = SSEparent − SSEsplit" },
        ],
        visual: {
          src: "/notes/machine-learning/regression-tree-split.png",
          alt: "Regression tree threshold dividing numerical targets into two leaves with mean predictions and SSE reduction",
          width: 1536,
          height: 1024,
          caption: "A strong split groups nearby target values so each leaf has small squared error.",
        },
      },
      {
        title: "Complete Split Numerical",
        paragraphs: ["Use x = [1,2,3,4] with targets y = [2,3,10,11]. Candidate midpoint thresholds are 1.5, 2.5, and 3.5."],
        problems: [
          {
            title: "Find the best threshold",
            prompt: "Calculate parent SSE and compare the three candidate thresholds.",
            steps: [
              "Parent mean = (2+3+10+11)/4 = 6.5; parent SSE = 20.25+12.25+12.25+20.25 = 65.",
              "At t = 1.5: left [2] has SSE 0; right [3,10,11] has mean 8 and SSE 25+4+9 = 38. Total = 38.",
              "At t = 2.5: left [2,3] has mean 2.5 and SSE 0.5; right [10,11] has mean 10.5 and SSE 0.5. Total = 1.",
              "At t = 3.5: left [2,3,10] has mean 5 and SSE 9+4+25 = 38; right [11] has SSE 0. Total = 38.",
              "The reduction at 2.5 is 65−1 = 64, the largest reduction.",
            ],
            answer: "Choose x ≤ 2.5. The left leaf predicts 2.5 and the right leaf predicts 10.5.",
          },
        ],
      },
      {
        title: "Piecewise-Constant Predictions",
        paragraphs: ["All inputs reaching the same leaf receive the same mean prediction. The fitted function therefore changes in steps rather than along a smooth line."],
      },
      {
        title: "Classification Tree vs Regression Tree",
        dataTable: {
          headers: ["Property", "Classification tree", "Regression tree"],
          rows: [["Target", "Category", "Number"], ["Leaf output", "Majority class or proportions", "Mean target"], ["Typical split score", "Gini or entropy", "Squared-error reduction"], ["Evaluation", "Classification metrics", "MAE, RMSE, or R²"]],
        },
        paragraphs: ["Both recursively partition the feature space and both require complexity control."],
      },
      {
        title: "Extrapolation Limitation",
        paragraphs: ["A regression tree predicts stored leaf values. Beyond the training feature range, it still returns an outer leaf mean rather than extending a trend. It therefore cannot naturally extrapolate a rising or falling line."],
      },
      {
        title: "Overfitting in Regression Trees",
        paragraphs: ["Very small leaves can match individual targets and drive training SSE toward zero. Their mean predictions are also unstable because they are based on very few examples. Maximum depth, minimum leaf size, and pruning must be validated just as in classification trees."],
      },
    ],
    mechanism: {
      title: "How a regression tree selects a split",
      steps: ["Calculate parent target mean and SSE.", "Create candidate thresholds.", "For each candidate, calculate each child mean.", "Add child SSE values.", "Choose the smallest split SSE or largest reduction.", "Repeat recursively until a stopping rule creates leaves."],
    },
    example: { title: "Delivery time", body: "A regression tree can split short and long routes into different leaves, then split busy-hour routes again. Every final group predicts its own average delivery time." },
    misconception: "A regression tree does not fit a separate sloped line inside each ordinary leaf. Its standard leaf prediction is a constant mean.",
  },
  revise: {
    definitionLabel: "Regression Tree",
    compactDefinition: true,
    definition: "A regression tree recursively splits features to reduce target SSE and predicts the mean target in each leaf.",
    sections: [{ title: "Essential Formulas", formulas: [{ label: "Leaf mean", expression: "(1/m)Σyᵢ" }, { label: "Leaf SSE", expression: "Σ(yᵢ−ȳleaf)²" }, { label: "Reduction", expression: "SSEparent−SSEchildren" }] }, { title: "Shape", points: ["One constant prediction per leaf", "Step-shaped fitted function", "No natural trend extrapolation"] }],
    essentialsStyle: "plain",
    essentials: ["Numerical target.", "Leaf predicts mean under squared error.", "Choose smallest child SSE.", "Equivalent choice: largest SSE reduction.", "Control depth and leaf size."],
    followUp: "Why does a standard regression tree produce step-shaped predictions?",
  },
  lastMinute: {
    definition: "Split numerical targets into groups; predict each group's mean.",
    sections: [{ title: "Split Numerical", flow: ["Parent SSE", "Candidate t", "Child means", "Child SSE", "Choose minimum"], wide: true }, { title: "Output", points: ["Constant per leaf", "Step function", "Cannot extend a trend"] }],
    memoryLine: "Classification leaves vote; regression leaves average.",
    cues: ["Parent mean first.", "Add left and right SSE.", "Largest reduction = smallest child SSE."],
    trap: "Do not use Gini impurity for a numerical regression target.",
  },
};
