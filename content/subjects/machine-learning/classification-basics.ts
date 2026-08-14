import type { SubjectTopic } from "@/lib/subject-content";

export const classificationFundamentals: SubjectTopic = {
  slug: "classification-fundamentals",
  title: "Classification Fundamentals",
  description:
    "Understand class labels, probability predictions, binary classification, and decision boundaries.",
  readTime: "14 min",
  difficulty: "Foundation",
  tags: ["Classification", "Probability", "Decision Boundary"],
  learn: {
    opening:
      "Classification predicts which category an example belongs to. Binary classification chooses between two classes, such as spam and not spam.",
    sections: [
      {
        title: "Regression and Classification",
        paragraphs: [
          "Regression predicts a numerical quantity, such as price. Classification predicts a category, such as whether a loan will default.",
          "A binary classifier often estimates the probability of the positive class first and then converts that probability into a class label using a threshold.",
        ],
        dataTable: {
          headers: ["Property", "Regression", "Classification"],
          rows: [
            ["Output", "Continuous number", "Class or class probability"],
            ["Example", "House price", "Spam or not spam"],
            ["Typical question", "How much?", "Which category?"],
            ["Common metric", "MAE or RMSE", "Precision, recall, or F1"],
          ],
        },
      },
      {
        title: "Binary Classes and Labels",
        paragraphs: [
          "Binary classification uses two labels, commonly encoded as 0 and 1. Class 1 is called the positive class and class 0 the negative class. Positive does not mean good; it means the event we chose to detect.",
        ],
        dataTable: {
          headers: ["Problem", "Positive class y = 1", "Negative class y = 0"],
          rows: [
            ["Spam detection", "Spam", "Not spam"],
            ["Disease screening", "Disease present", "Disease absent"],
            ["Loan risk", "Defaults", "Does not default"],
          ],
        },
      },
      {
        title: "Probability Before the Final Class",
        paragraphs: [
          "A probabilistic classifier returns a value between 0 and 1. In binary classification, p̂ means the estimated probability that y = 1 for the supplied features.",
          "The two class probabilities add to 1. If P̂(y = 1 | x) = 0.72, then P̂(y = 0 | x) = 0.28.",
        ],
        formulas: [
          {
            label: "Positive-class probability",
            expression: "p̂ = P̂(y = 1 | x)",
          },
          {
            label: "Negative-class probability",
            expression: "P̂(y = 0 | x) = 1 − p̂",
          },
        ],
        problems: [
          {
            title: "Read a probability prediction",
            prompt:
              "A model gives p̂ = 0.82 for fraud. What are the two class probabilities?",
            steps: [
              "The positive class is fraud, so P̂(fraud) = 0.82.",
              "P̂(not fraud) = 1 − 0.82 = 0.18.",
            ],
            answer:
              "The estimated probabilities are 82% fraud and 18% not fraud.",
          },
        ],
      },
      {
        title: "From Probability to Class Label",
        paragraphs: [
          "A threshold converts probability into a class label. The common value 0.5 is only a starting choice; the dedicated threshold topic explains how error costs can justify changing it.",
        ],
        formulas: [
          {
            label: "Classification rule at threshold t",
            expression: "ŷclass = 1 if p̂ ≥ t; otherwise 0",
          },
        ],
      },
      {
        title: "Decision Boundary",
        paragraphs: [
          "A decision boundary is the set of feature values where the predicted class changes. For logistic regression with threshold 0.5, it occurs where the model's linear score equals zero.",
          "With two features, a basic logistic-regression boundary is a straight line. The probability changes smoothly on either side of that line.",
        ],
        visual: {
          src: "/notes/machine-learning/classification-boundary.png",
          alt: "Two binary classes separated by a linear decision boundary with probability regions",
          width: 1536,
          height: 1024,
          caption:
            "The boundary separates predicted classes; probability changes continuously across it.",
        },
      },
      {
        title: "Why Linear Regression Is Poor for Classification",
        paragraphs: [
          "A linear-regression output is unbounded, so it can predict values below 0 or above 1. It also treats changes in the score as constant even near the probability limits.",
          "Logistic regression solves this by passing a linear score through the sigmoid function, which always produces a value between 0 and 1.",
        ],
      },
      {
        title: "Class Imbalance",
        paragraphs: [
          "A dataset is imbalanced when one class is much more common than the other. A model that always predicts the majority class can have high accuracy while completely missing the class we care about.",
          "Therefore, classification requires a confusion matrix and class-sensitive metrics, not accuracy alone.",
        ],
        problems: [
          {
            title: "Misleading accuracy",
            prompt:
              "Only 10 of 1,000 transactions are fraudulent. A model predicts every transaction as not fraud. Find its accuracy.",
            steps: [
              "The model correctly labels the 990 non-fraud transactions.",
              "Accuracy = 990 / 1,000 = 0.99.",
              "It detects 0 of the 10 fraud cases.",
            ],
            answer:
              "Accuracy is 99%, but the model is useless for detecting fraud.",
          },
        ],
        points: [
          "Use stratified splits so each split keeps a similar class ratio.",
          "Use precision, recall, F1, or PR-AUC instead of accuracy alone.",
          "Consider class weights when errors on the rare class need more importance.",
          "Choose the decision threshold using validation data and mistake costs.",
        ],
      },
    ],
    mechanism: {
      title: "Binary-classification flow",
      steps: [
        "Choose which event is positive class 1.",
        "Give the model an example's feature values.",
        "Estimate the positive-class probability p̂.",
        "Compare p̂ with the chosen threshold.",
        "Return class 1 or class 0.",
        "Evaluate both kinds of mistakes using a confusion matrix.",
      ],
    },
    example: {
      title: "Medical screening",
      body: "A screening model may return a disease probability of 0.34. A low threshold may still classify the patient as positive because missing a true disease case can be more costly than requesting another test.",
    },
    misconception:
      "A probability of 0.80 does not mean the prediction is certainly correct. Across comparable predictions near 0.80, calibration asks whether the event happens about 80% of the time.",
  },
  revise: {
    definitionLabel: "Core Task",
    compactDefinition: true,
    definition:
      "Binary classification estimates the probability of class 1 and uses a threshold to choose between labels 0 and 1.",
    sections: [
      {
        title: "Essential Rules",
        formulas: [
          { label: "Probability", expression: "p̂ = P̂(y = 1 | x)" },
          { label: "Other class", expression: "P̂(y = 0 | x) = 1 − p̂" },
          { label: "Decision", expression: "ŷclass = 1 if p̂ ≥ t; otherwise 0" },
        ],
      },
      {
        title: "Regression vs Classification",
        points: [
          "Regression predicts a continuous value.",
          "Classification predicts a class or class probability.",
          "The positive class is the event being detected, not necessarily a good event.",
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Binary classification has two classes.",
      "Probabilities lie between 0 and 1.",
      "A threshold converts probability into a label.",
      "The decision boundary is where the predicted label changes.",
      "Accuracy alone can hide failure on an imbalanced dataset.",
    ],
    followUp: "Why might a medical classifier use a threshold below 0.5?",
  },
  lastMinute: {
    definition:
      "Estimate P(y = 1 | x), compare it with a threshold, and predict 0 or 1.",
    sections: [
      {
        title: "Flow",
        flow: ["Features x", "Probability p̂", "Threshold t", "Class 0 or 1"],
        wide: true,
      },
      {
        title: "Core Differences",
        points: [
          "Regression: how much",
          "Classification: which class",
          "Boundary: where class changes",
        ],
      },
    ],
    memoryLine: "Probability first, threshold second, class last.",
    cues: [
      "Positive class means the selected event.",
      "P(y = 0) = 1 − P(y = 1).",
      "Check class imbalance before trusting accuracy.",
    ],
    trap: "Do not treat 0 and 1 as ordinary continuous targets and trust unbounded linear predictions.",
  },
};

export const logisticRegressionAndSigmoid: SubjectTopic = {
  slug: "logistic-regression-and-sigmoid",
  title: "Logistic Regression and the Sigmoid Function",
  description:
    "Convert a linear score into a valid probability using the sigmoid function and solve prediction numericals.",
  readTime: "15 min",
  difficulty: "Intermediate",
  tags: ["Logistic Regression", "Sigmoid", "Probability"],
  learn: {
    opening:
      "Logistic regression is a classification model. It applies the sigmoid function to a linear score so the output stays between 0 and 1.",
    sections: [
      {
        title: "Linear Score",
        paragraphs: [
          "First, the model combines the features using an intercept and coefficients. This value z can be any real number and is not yet a probability.",
          "The compact form βᵀx includes the intercept only when x is augmented with a first value of 1 and β begins with β₀.",
        ],
        formulas: [
          { label: "One feature", expression: "z = β₀ + β₁x" },
          {
            label: "Several features",
            expression: "z = β₀ + β₁x₁ + … + βₚxₚ = βᵀx",
          },
        ],
      },
      {
        title: "Sigmoid Function",
        paragraphs: [
          "The sigmoid maps every real score to a number strictly between 0 and 1. A large positive score gives a probability near 1, a large negative score gives a probability near 0, and z = 0 gives 0.5.",
        ],
        formulas: [
          { label: "Sigmoid", expression: "σ(z) = 1 / (1 + e⁻ᶻ)" },
          { label: "Sigmoid derivative", expression: "σ′(z) = σ(z)[1 − σ(z)]" },
          {
            label: "Logistic-regression probability",
            expression: "p̂ = σ(βᵀx)",
          },
        ],
        visual: {
          src: "/notes/machine-learning/sigmoid-function.png",
          alt: "S-shaped sigmoid curve mapping a linear score to a probability",
          width: 1536,
          height: 1024,
          caption:
            "The sigmoid turns any real-valued score into a probability between 0 and 1.",
        },
        points: [
          "The derivative is largest at z = 0, where σ(z) = 0.5.",
          "The derivative helps connect changes in the score to changes in probability during gradient calculation.",
        ],
      },
      {
        title: "Important Sigmoid Values",
        paragraphs: [
          "These anchor values help estimate whether a calculated probability is reasonable.",
        ],
        dataTable: {
          headers: ["Score z", "σ(z), approximately", "Meaning"],
          rows: [
            ["−2", "0.119", "Evidence toward class 0"],
            ["−1", "0.269", "Probability below 0.5"],
            ["0", "0.500", "Threshold point at t = 0.5"],
            ["1", "0.731", "Probability above 0.5"],
            ["2", "0.881", "Evidence toward class 1"],
          ],
        },
      },
      {
        title: "Complete Probability Numerical",
        problems: [
          {
            title: "Calculate a logistic prediction",
            prompt:
              "For z = −1 + 0.8x and x = 2, calculate p̂ and predict the class at threshold 0.5.",
            steps: [
              "z = −1 + 0.8(2) = 0.6.",
              "p̂ = 1 / (1 + e⁻⁰·⁶).",
              "e⁻⁰·⁶ ≈ 0.5488, so p̂ ≈ 1 / 1.5488 ≈ 0.646.",
              "Because 0.646 ≥ 0.5, predict class 1.",
            ],
            answer:
              "The positive-class probability is approximately 0.646 and the predicted class is 1.",
          },
        ],
        paragraphs: [
          "Keep the linear-score calculation and the sigmoid calculation as separate steps to avoid sign mistakes.",
        ],
      },
      {
        title: "Several Features",
        problems: [
          {
            title: "Prediction with two features",
            prompt:
              "Use z = −3 + 0.04(age) + 1.2(smoker) for age = 50 and smoker = 1.",
            steps: [
              "z = −3 + 0.04(50) + 1.2(1) = −3 + 2 + 1.2 = 0.2.",
              "p̂ = σ(0.2) = 1 / (1 + e⁻⁰·²) ≈ 0.550.",
              "At threshold 0.5, predict class 1.",
            ],
            answer: "p̂ ≈ 0.550, so the predicted class is 1 at threshold 0.5.",
          },
        ],
        paragraphs: [
          "Each coefficient changes the linear score. The effect on probability is not constant because the sigmoid is curved.",
        ],
      },
      {
        title: "Why It Is Called Regression",
        paragraphs: [
          "Logistic regression is used for classification, but it models the log-odds as a linear function of the features. The word regression refers to this linear relationship, not to a continuous final label.",
        ],
      },
      {
        title: "Probability Is Nonlinear, Boundary Is Linear",
        paragraphs: [
          "The sigmoid probability is nonlinear in the score. However, with threshold 0.5 the boundary satisfies βᵀx = 0, which is linear in the original features.",
        ],
      },
    ],
    mechanism: {
      title: "How logistic regression predicts",
      steps: [
        "Multiply each feature by its coefficient.",
        "Add the contributions and intercept to obtain z.",
        "Calculate p̂ = 1/(1 + e⁻ᶻ).",
        "Interpret p̂ as the estimated probability of class 1.",
        "Compare p̂ with the chosen threshold to obtain a class label.",
      ],
    },
    example: {
      title: "Spam probability",
      body: "Words, links, and sender signals create a linear score. The sigmoid maps that score to the estimated probability that the email is spam.",
    },
    misconception:
      "Logistic regression is not ordinary linear regression followed by clipping. It is trained as a probabilistic classification model using a suitable classification loss.",
  },
  revise: {
    definitionLabel: "Core Model",
    compactDefinition: true,
    definition:
      "Logistic regression applies the sigmoid function to a linear score to estimate P(y = 1 | x).",
    sections: [
      {
        title: "Essential Formulas",
        formulas: [
          { label: "Score", expression: "z = βᵀx" },
          { label: "Sigmoid", expression: "σ(z) = 1/(1 + e⁻ᶻ)" },
          { label: "Derivative", expression: "σ′(z) = σ(z)[1 − σ(z)]" },
          { label: "Probability", expression: "p̂ = σ(βᵀx)" },
        ],
      },
      {
        title: "Anchor Values",
        points: [
          "σ(0) = 0.5",
          "σ(z) approaches 1 as z grows",
          "σ(z) approaches 0 as z becomes negative",
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "The linear score z is unbounded.",
      "In βᵀx notation, an augmented first feature x₀ = 1 includes the intercept β₀.",
      "The sigmoid output lies strictly between 0 and 1.",
      "At threshold 0.5, z ≥ 0 predicts class 1.",
      "Coefficient effects are linear in log-odds, not probability.",
      "Logistic regression is a classification algorithm.",
    ],
    followUp: "Why does z = 0 correspond to probability 0.5?",
  },
  lastMinute: {
    definition: "Linear score → sigmoid → probability → threshold → class.",
    sections: [
      {
        title: "Prediction Flow",
        flow: [
          "z = βᵀx",
          "p̂ = 1/(1 + e⁻ᶻ)",
          "Compare with t",
          "Predict 0 or 1",
        ],
        wide: true,
      },
      {
        title: "Sigmoid Anchors",
        points: ["z = 0 → p̂ = 0.5", "z > 0 → p̂ > 0.5", "z < 0 → p̂ < 0.5"],
      },
    ],
    memoryLine:
      "The score can be anything; the sigmoid keeps probability between zero and one.",
    cues: [
      "Calculate z before calculating p̂.",
      "p̂ represents class 1.",
      "A curved probability function can still have a linear boundary.",
    ],
    trap: "Do not forget the negative sign in e⁻ᶻ.",
  },
};
