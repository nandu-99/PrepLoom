import type { SubjectTopic } from "@/lib/subject-content";

export const binaryCrossEntropyAndTraining: SubjectTopic = {
  slug: "binary-cross-entropy-and-training",
  title: "Binary Cross-Entropy and Model Training",
  description:
    "Measure probability error with log loss and train logistic regression using maximum likelihood and gradient descent.",
  readTime: "16 min",
  difficulty: "Intermediate",
  tags: ["Binary Cross-Entropy", "Log Loss", "Training"],
  learn: {
    opening:
      "Logistic regression is trained to give high probability to the correct class. Binary cross-entropy measures how well each predicted probability matches its label.",
    sections: [
      {
        title: "Loss for One Binary Example",
        paragraphs: [
          "When y = 1, only ln(p̂) remains, so a small predicted probability is punished strongly. When y = 0, only ln(1−p̂) remains, so a large positive-class probability is punished strongly.",
        ],
        formulas: [
          {
            label: "Binary cross-entropy for one example",
            expression: "L(y, p̂) = −[y ln(p̂) + (1 − y)ln(1 − p̂)]",
          },
          { label: "If y = 1", expression: "L = −ln(p̂)" },
          { label: "If y = 0", expression: "L = −ln(1 − p̂)" },
        ],
      },
      {
        title: "Loss Behaviour",
        paragraphs: [
          "A correct and confident prediction has loss near zero. A confident wrong prediction has very large loss. This encourages honest probability estimates and strongly discourages confident mistakes.",
        ],
        visual: {
          src: "/notes/machine-learning/binary-cross-entropy.png",
          alt: "Binary cross-entropy curves for positive and negative labels across predicted probability",
          width: 1536,
          height: 1024,
          caption: "Log loss grows sharply when the model gives high confidence to the wrong class.",
        },
        dataTable: {
          headers: ["True y", "Predicted p̂", "Loss", "Meaning"],
          rows: [
            ["1", "0.90", "−ln(0.90) ≈ 0.105", "Correct and confident"],
            ["1", "0.10", "−ln(0.10) ≈ 2.303", "Wrong and confident"],
            ["0", "0.10", "−ln(0.90) ≈ 0.105", "Correct and confident"],
            ["0", "0.90", "−ln(0.10) ≈ 2.303", "Wrong and confident"],
          ],
        },
      },
      {
        title: "Average Dataset Loss",
        paragraphs: [
          "Training minimizes the mean binary cross-entropy over the dataset. In computation, probabilities are kept away from exact 0 and 1 to avoid taking ln(0).",
        ],
        formulas: [
          {
            label: "Mean binary cross-entropy",
            expression: "J(β) = −(1/n)Σ[yᵢln(p̂ᵢ) + (1−yᵢ)ln(1−p̂ᵢ)]",
          },
        ],
      },
      {
        title: "Complete Loss Numerical",
        paragraphs: [
          "Use natural logarithms and calculate one loss per example before averaging.",
        ],
        problems: [
          {
            title: "Calculate mean BCE",
            prompt: "For y = [1, 0] and p̂ = [0.8, 0.3], calculate mean binary cross-entropy.",
            steps: [
              "For y₁ = 1: L₁ = −ln(0.8) ≈ 0.2231.",
              "For y₂ = 0: L₂ = −ln(1 − 0.3) = −ln(0.7) ≈ 0.3567.",
              "Mean BCE = (0.2231 + 0.3567)/2 ≈ 0.2899.",
            ],
            answer: "The mean binary cross-entropy is approximately 0.290.",
          },
        ],
      },
      {
        title: "Maximum Likelihood Connection",
        paragraphs: [
          "Logistic regression assumes each binary target follows a Bernoulli distribution with probability p̂ᵢ. Maximum likelihood chooses parameters that make the observed labels most probable.",
          "Minimizing binary cross-entropy is the same as minimizing the negative log-likelihood. The logarithm converts a product of probabilities into an easier sum.",
          "The product form assumes the observations are conditionally independent given their features.",
        ],
        formulas: [
          { label: "Bernoulli likelihood", expression: "ℒ(β) = ∏ᵢ p̂ᵢ^(yᵢ)(1 − p̂ᵢ)^(1 − yᵢ)" },
          { label: "Training equivalence", expression: "minimize BCE ⇔ maximize likelihood" },
        ],
      },
      {
        title: "Gradient Descent Update",
        paragraphs: [
          "For unregularized logistic regression, the matrix gradient has the same compact error-times-feature form as linear regression. Here p̂ = σ(Xβ), not Xβ.",
          "Calculate predictions and gradients with the current parameters, then update all parameters together.",
          "The sigmoid derivative is σ′(z) = σ(z)[1−σ(z)]. Applying the chain rule to BCE simplifies the score derivative to p̂−y, which produces the compact matrix gradient below.",
        ],
        formulas: [
          { label: "Sigmoid derivative", expression: "σ′(z) = σ(z)[1 − σ(z)]" },
          { label: "One-example score derivative", expression: "∂L/∂z = p̂ − y" },
          { label: "Gradient", expression: "∇J(β) = (1/n)Xᵀ(p̂ − y)" },
          { label: "Update", expression: "β := β − α∇J(β)" },
        ],
      },
      {
        title: "One Gradient Step",
        problems: [
          {
            title: "Update one coefficient",
            prompt: "One example has x = 2, y = 1, β = 0, no intercept, and α = 0.1. Perform one update.",
            steps: [
              "z = βx = 0, so p̂ = σ(0) = 0.5.",
              "Gradient = (p̂ − y)x = (0.5 − 1)(2) = −1.",
              "β := 0 − 0.1(−1) = 0.1.",
            ],
            answer: "After one update, β = 0.1. The positive example pushes its score upward.",
          },
        ],
        paragraphs: [
          "This tiny numerical isolates the update. Real training averages gradients over many examples and normally includes an intercept.",
        ],
      },
      {
        title: "Why Not Use Squared Error?",
        paragraphs: [
          "Binary cross-entropy matches the Bernoulli probability model and gives a convex objective for ordinary logistic regression. It also produces strong gradients for confident wrong predictions.",
          "Squared error with a sigmoid is not the standard maximum-likelihood objective and can produce less convenient optimization behaviour.",
        ],
      },
      {
        title: "Regularization and Complete Separation",
        paragraphs: [
          "Logistic regression can add an L2 penalty to shrink coefficients or an L1 penalty to shrink some coefficients to zero. As in linear regression, standardize numerical features and choose the penalty strength using validation data.",
          "With complete separation, one boundary classifies every training example perfectly. Unregularized maximum likelihood may then keep increasing coefficient sizes instead of reaching a finite solution. Regularization gives a finite, more stable fit.",
        ],
        formulas: [
          { label: "L2-regularized objective", expression: "BCE + λΣⱼ₌₁ᵖ βⱼ²" },
          { label: "L1-regularized objective", expression: "BCE + λΣⱼ₌₁ᵖ |βⱼ|" },
        ],
      },
    ],
    mechanism: {
      title: "Logistic-regression training loop",
      steps: [
        "Initialize the intercept and coefficients.",
        "Calculate scores z = Xβ.",
        "Apply sigmoid to obtain probabilities p̂.",
        "Calculate mean binary cross-entropy.",
        "Calculate Xᵀ(p̂−y)/n and update all parameters.",
        "Repeat until the loss or gradient changes very little, then validate the model.",
      ],
    },
    example: {
      title: "Confident mistake",
      body: "For a positive case, p̂ = 0.01 gives loss −ln(0.01) ≈ 4.605, while p̂ = 0.9 gives only about 0.105. The loss strongly discourages confident errors.",
    },
    misconception:
      "Cross-entropy is calculated from probabilities and true labels. It is not calculated from the final thresholded class labels.",
  },
  revise: {
    definitionLabel: "Training Objective",
    compactDefinition: true,
    definition:
      "Binary cross-entropy measures probability error and is the negative log-likelihood used to train logistic regression.",
    sections: [
      {
        title: "Essential Formulas",
        formulas: [
          { label: "One example", expression: "−[yln(p̂)+(1−y)ln(1−p̂)]" },
          { label: "Sigmoid derivative", expression: "σ′(z) = σ(z)[1−σ(z)]" },
          { label: "Score derivative", expression: "∂L/∂z = p̂−y" },
          { label: "Gradient", expression: "(1/n)Xᵀ(p̂−y)" },
          { label: "Update", expression: "β := β − α∇J" },
        ],
      },
      {
        title: "Label Cases",
        points: ["y = 1 → loss = −ln(p̂)", "y = 0 → loss = −ln(1−p̂)", "Confident wrong → very large loss"],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Use probabilities before thresholding.",
      "Perfect correct probability gives loss approaching zero.",
      "Avoid exact ln(0) in computation.",
      "Minimizing BCE equals maximizing Bernoulli likelihood.",
      "For logistic regression, p̂ = σ(Xβ).",
      "L1 or L2 regularization can stabilize logistic coefficients.",
      "Complete separation can prevent an unregularized finite maximum-likelihood solution.",
    ],
    followUp: "Why does a confident wrong prediction receive very large log loss?",
  },
  lastMinute: {
    definition: "BCE rewards probability on the true class and punishes confident mistakes.",
    sections: [
      {
        title: "Cases",
        points: ["y = 1: −ln(p̂)", "y = 0: −ln(1−p̂)", "Average all example losses"],
      },
      {
        title: "Training",
        flow: ["z = Xβ", "p̂ = σ(z)", "BCE", "Gradient", "Update β"],
        wide: true,
      },
    ],
    memoryLine: "Wrong with confidence costs the most.",
    cues: ["Natural logarithm.", "BCE = negative log-likelihood.", "Gradient = Xᵀ(p̂−y)/n."],
    trap: "Do not compute BCE after converting probabilities into 0 and 1 predictions.",
  },
};

export const classificationEvaluation: SubjectTopic = {
  slug: "classification-evaluation",
  title: "Classification Evaluation",
  description:
    "Evaluate binary classifiers using a confusion matrix, precision, recall, specificity, F1-score, ROC, and AUC.",
  readTime: "19 min",
  difficulty: "Intermediate",
  tags: ["Confusion Matrix", "F1-Score", "ROC-AUC"],
  learn: {
    opening:
      "Classification evaluation must count both kinds of correct decision and both kinds of mistake. The right metric depends on which mistake matters more.",
    sections: [
      {
        title: "Confusion Matrix",
        paragraphs: [
          "A confusion matrix compares actual labels with predicted labels at one chosen threshold. Positive and negative refer to class 1 and class 0.",
        ],
        visual: {
          src: "/notes/machine-learning/confusion-matrix.png",
          alt: "Binary confusion matrix with true positive, false positive, false negative, and true negative cells",
          width: 1536,
          height: 1024,
          caption: "Every binary prediction belongs to exactly one of the four confusion-matrix cells.",
        },
        dataTable: {
          headers: ["Term", "Actual", "Predicted", "Meaning"],
          rows: [
            ["TP", "Positive", "Positive", "Correctly detected event"],
            ["TN", "Negative", "Negative", "Correctly rejected non-event"],
            ["FP", "Negative", "Positive", "False alarm"],
            ["FN", "Positive", "Negative", "Missed event"],
          ],
        },
      },
      {
        title: "Accuracy, Precision, Recall, and Specificity",
        formulas: [
          { label: "Accuracy", expression: "(TP + TN)/(TP + TN + FP + FN)" },
          { label: "Precision", expression: "TP/(TP + FP)" },
          { label: "Recall or sensitivity", expression: "TP/(TP + FN)" },
          { label: "Specificity", expression: "TN/(TN + FP)" },
        ],
        paragraphs: [
          "Precision asks: among predicted positives, how many were correct? Recall asks: among actual positives, how many were found? Specificity asks: among actual negatives, how many were correctly rejected?",
        ],
      },
      {
        title: "F1-Score",
        paragraphs: [
          "F1 is the harmonic mean of precision and recall. It becomes high only when both are high and is useful when one combined score is required for an imbalanced problem.",
          "F1 ignores true negatives, so it should not be used automatically when correct negative decisions are important.",
        ],
        formulas: [
          { label: "F1-score", expression: "F1 = 2(PR)/(P + R) = 2TP/(2TP + FP + FN)" },
        ],
      },
      {
        title: "Complete Confusion-Matrix Numerical",
        paragraphs: [
          "Start by finding the total number of examples, then substitute the four counts carefully.",
        ],
        problems: [
          {
            title: "Construct a confusion matrix from labels",
            prompt: "For actual y = [1, 0, 1, 1, 0, 0] and predicted ŷ = [1, 1, 0, 1, 0, 0], find TP, TN, FP, and FN.",
            steps: [
              "Compare the pairs: (1,1), (0,1), (1,0), (1,1), (0,0), (0,0).",
              "The two (1,1) pairs give TP = 2.",
              "The two (0,0) pairs give TN = 2.",
              "The one (0,1) pair gives FP = 1.",
              "The one (1,0) pair gives FN = 1.",
            ],
            answer: "TP = 2, TN = 2, FP = 1, and FN = 1.",
          },
          {
            title: "Calculate all main metrics",
            prompt: "Given TP = 40, TN = 50, FP = 10, and FN = 5, calculate accuracy, precision, recall, specificity, and F1.",
            steps: [
              "Total = 40 + 50 + 10 + 5 = 105.",
              "Accuracy = (40 + 50)/105 = 90/105 ≈ 0.857.",
              "Precision = 40/(40 + 10) = 40/50 = 0.800.",
              "Recall = 40/(40 + 5) = 40/45 ≈ 0.889.",
              "Specificity = 50/(50 + 10) = 50/60 ≈ 0.833.",
              "F1 = 2(0.800)(0.889)/(0.800 + 0.889) ≈ 0.842.",
            ],
            answer: "Accuracy ≈ 0.857, precision = 0.800, recall ≈ 0.889, specificity ≈ 0.833, and F1 ≈ 0.842.",
          },
        ],
      },
      {
        title: "Which Metric Should You Use?",
        dataTable: {
          headers: ["Priority", "Useful metric", "Example"],
          rows: [
            ["Avoid false alarms", "Precision", "Do not wrongly block legitimate email"],
            ["Find most positives", "Recall", "Disease screening"],
            ["Reject most negatives", "Specificity", "Confirm healthy cases"],
            ["Balance precision and recall", "F1", "Rare positive class"],
            ["Overall correctness with balanced costs", "Accuracy", "Classes and errors are reasonably balanced"],
          ],
        },
        paragraphs: [
          "Metric choice comes from the problem cost, not from whichever score looks highest.",
          "If a denominator is zero, the corresponding metric is undefined. For example, precision is undefined when the model predicts no positives; software may report a configured fallback such as 0, which should be stated.",
        ],
      },
      {
        title: "ROC Curve",
        paragraphs: [
          "The ROC curve evaluates many thresholds. For every threshold it plots true-positive rate, which equals recall, against false-positive rate.",
          "Moving the threshold changes both rates. The diagonal line represents random ranking; curves closer to the top-left indicate stronger separation.",
        ],
        formulas: [
          { label: "True-positive rate", expression: "TPR = TP/(TP + FN) = recall" },
          { label: "False-positive rate", expression: "FPR = FP/(FP + TN) = 1 − specificity" },
        ],
        visual: {
          src: "/notes/machine-learning/roc-auc.png",
          alt: "ROC and precision-recall curves showing threshold-independent classification evaluation",
          width: 1536,
          height: 1024,
          caption: "ROC compares TPR with FPR; a precision–recall curve is often more informative for a rare positive class.",
        },
      },
      {
        title: "Precision–Recall Curve and PR-AUC",
        paragraphs: [
          "A precision–recall curve plots precision against recall across thresholds. It focuses on positive-class performance and does not use the number of true negatives directly.",
          "PR-AUC summarizes this curve. It is often more informative than ROC-AUC when the positive class is rare, because many true negatives can make the ROC false-positive rate look small.",
          "The no-skill precision baseline is the positive-class prevalence. Therefore, PR-AUC values should be interpreted together with the class ratio.",
        ],
        formulas: [
          { label: "Precision", expression: "TP/(TP + FP)" },
          { label: "Recall", expression: "TP/(TP + FN)" },
          { label: "PR baseline", expression: "positive examples / all examples" },
        ],
        dataTable: {
          headers: ["Curve", "Axes", "Especially useful when"],
          rows: [
            ["ROC", "FPR versus TPR", "Overall ranking across both classes"],
            ["Precision–Recall", "Recall versus precision", "Positive class is rare"],
          ],
        },
      },
      {
        title: "AUC Interpretation",
        paragraphs: [
          "AUC is the area under the ROC curve. AUC = 1 means perfect ranking and 0.5 means random ranking. A value below 0.5 means worse-than-random ranking on the evaluated data; if this happens consistently, the score direction may be reversed.",
          "AUC equals P(score⁺ > score⁻) + 0.5P(score⁺ = score⁻): ties receive half credit.",
          "AUC does not select an operating threshold and does not tell us whether predicted probabilities are calibrated.",
        ],
        problems: [
          {
            title: "Calculate ROC-AUC with trapezoids",
            prompt: "An ROC curve passes through (FPR,TPR) = (0,0), (0.2,0.6), (0.5,0.8), and (1,1). Estimate AUC with the trapezoidal rule.",
            steps: [
              "From 0 to 0.2: area = 0.2(0 + 0.6)/2 = 0.06.",
              "From 0.2 to 0.5: area = 0.3(0.6 + 0.8)/2 = 0.21.",
              "From 0.5 to 1: area = 0.5(0.8 + 1)/2 = 0.45.",
              "AUC = 0.06 + 0.21 + 0.45 = 0.72.",
            ],
            answer: "The estimated ROC-AUC is 0.72.",
          },
        ],
      },
      {
        title: "Evaluation Rules",
        points: [
          "State which class is positive before reporting metrics.",
          "Report the threshold for confusion-matrix metrics.",
          "Use validation data to choose model settings and threshold.",
          "Use untouched test data for the final report.",
          "Compare with a simple baseline and show raw confusion-matrix counts.",
        ],
        paragraphs: [
          "A single score hides important information. Good reporting combines the metric, threshold, class definition, dataset, and confusion matrix.",
        ],
      },
    ],
    mechanism: {
      title: "How to evaluate a binary classifier",
      steps: [
        "Define the positive class and the business cost of FP and FN.",
        "Choose a threshold using validation data.",
        "Build the confusion matrix on unseen data.",
        "Calculate precision, recall, specificity, and F1 as needed.",
        "Use ROC-AUC when ranking across thresholds matters.",
        "Report the final test results with threshold and raw counts.",
      ],
    },
    example: {
      title: "Cancer screening",
      body: "Recall is important because a false negative misses a patient who may need treatment. Specificity and precision still matter because too many false alarms create unnecessary tests and anxiety.",
    },
    misconception:
      "High accuracy does not guarantee a useful classifier, especially when one class is rare or the two errors have very different costs.",
  },
  revise: {
    definitionLabel: "Evaluation Core",
    compactDefinition: true,
    definition:
      "A confusion matrix counts TP, TN, FP, and FN; classification metrics summarize different parts of those counts.",
    sections: [
      {
        title: "Essential Formulas",
        formulas: [
          { label: "Precision", expression: "TP/(TP+FP)" },
          { label: "Recall", expression: "TP/(TP+FN)" },
          { label: "Specificity", expression: "TN/(TN+FP)" },
          { label: "F1", expression: "2PR/(P+R)" },
          { label: "FPR", expression: "FP/(FP+TN)" },
          { label: "PR baseline", expression: "positives/all examples" },
        ],
      },
      {
        title: "Metric Questions",
        points: [
          "Precision: were predicted positives correct?",
          "Recall: were actual positives found?",
          "Specificity: were actual negatives rejected?",
          "ROC: how does TPR trade against FPR across thresholds?",
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "TP and TN are correct; FP and FN are mistakes.",
      "Accuracy can mislead on imbalanced data.",
      "F1 balances precision and recall but ignores TN.",
      "AUC measures ranking across thresholds, not calibration.",
      "PR-AUC is usually more informative when the positive class is rare.",
      "A zero denominator makes a metric undefined unless a fallback is explicitly chosen.",
      "Always report the positive class and threshold.",
    ],
    followUp: "Why can a classifier have high accuracy but zero recall?",
  },
  lastMinute: {
    definition: "Count TP, TN, FP, FN first; choose the metric from the cost of mistakes.",
    sections: [
      {
        title: "Denominators",
        points: ["Precision: predicted positives", "Recall: actual positives", "Specificity: actual negatives", "Accuracy: all examples"],
      },
      {
        title: "ROC-AUC",
        points: ["ROC: TPR vs FPR", "PR: precision vs recall", "PR is useful for rare positives", "AUC summarizes ranking"],
      },
    ],
    memoryLine: "Precision checks alarms; recall checks positives; specificity checks negatives.",
    cues: ["FPR = 1 − specificity.", "PR baseline = positive prevalence.", "Show raw counts and threshold."],
    trap: "Do not calculate precision with TP + FN; that denominator belongs to recall.",
  },
};
