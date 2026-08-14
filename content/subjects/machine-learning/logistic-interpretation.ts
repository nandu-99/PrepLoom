import type { SubjectTopic } from "@/lib/subject-content";

export const oddsLogOddsAndCoefficients: SubjectTopic = {
  slug: "odds-log-odds-and-coefficients",
  title: "Odds, Log-Odds, and Coefficient Interpretation",
  description:
    "Move between probability, odds, and log-odds, then interpret logistic-regression coefficients as odds ratios.",
  readTime: "16 min",
  difficulty: "Intermediate",
  tags: ["Odds", "Logit", "Odds Ratio"],
  learn: {
    opening:
      "Logistic regression is linear in log-odds. This makes its coefficients easier to interpret through odds ratios than through direct probability changes.",
    sections: [
      {
        title: "Probability and Odds",
        paragraphs: [
          "Probability compares the event with all possible outcomes. Odds compare the probability of the event with the probability that it does not happen.",
          "Odds greater than 1 favour the event, odds equal to 1 mean equal chances, and odds below 1 favour the non-event.",
        ],
        formulas: [
          { label: "Odds from probability", expression: "odds = p/(1 − p)" },
          { label: "Probability from odds", expression: "p = odds/(1 + odds)" },
        ],
        dataTable: {
          headers: ["Probability p", "Odds p/(1 − p)", "Reading"],
          rows: [
            ["0.20", "0.25", "1 to 4 against the event"],
            ["0.50", "1", "Equal odds"],
            ["0.75", "3", "3 to 1 in favour"],
            ["0.80", "4", "4 to 1 in favour"],
          ],
        },
      },
      {
        title: "Log-Odds and the Logit",
        paragraphs: [
          "Taking the natural logarithm of odds produces log-odds, also called the logit. Probability is restricted to 0–1, but log-odds can take any real value.",
          "This unrestricted scale is what logistic regression models as a linear equation.",
        ],
        formulas: [
          { label: "Logit", expression: "logit(p) = ln[p/(1 − p)]" },
          { label: "Logistic-regression model", expression: "ln[p/(1 − p)] = β₀ + β₁x₁ + … + βₚxₚ" },
        ],
      },
      {
        title: "Complete Conversion Numerical",
        paragraphs: [
          "Keep probability, odds, and log-odds as three different quantities.",
        ],
        problems: [
          {
            title: "Convert probability to odds and log-odds",
            prompt: "For p = 0.80, calculate the odds and log-odds.",
            steps: [
              "Odds = 0.80/(1 − 0.80) = 0.80/0.20 = 4.",
              "Log-odds = ln(4) ≈ 1.386.",
            ],
            answer: "The odds are 4 to 1 in favour, and the log-odds are approximately 1.386.",
          },
        ],
      },
      {
        title: "Interpret a Numerical-Feature Coefficient",
        paragraphs: [
          "For a one-unit increase in xⱼ, while other included features stay fixed, the log-odds increase by βⱼ and the odds are multiplied by eᵝʲ.",
          "The odds ratio is multiplicative. It is not a direct change in probability because the probability change depends on the starting probability.",
        ],
        formulas: [
          { label: "Odds ratio for one-unit increase", expression: "OR = eᵝʲ" },
          { label: "Odds ratio for k-unit increase", expression: "OR = eᵏᵝʲ" },
        ],
        problems: [
          {
            title: "Interpret an odds ratio",
            prompt: "A logistic model has β₁ = 0.40 for years of experience. Interpret it.",
            steps: [
              "OR = e⁰·⁴⁰ ≈ 1.492.",
              "A one-year increase multiplies the odds by about 1.492.",
              "Percentage change in odds = (1.492 − 1) × 100 ≈ 49.2%.",
            ],
            answer: "Holding other features fixed, each extra year is associated with about 49.2% higher odds of class 1.",
          },
        ],
      },
      {
        title: "The Same Odds Ratio Can Give Different Probability Changes",
        paragraphs: [
          "An odds ratio acts on odds, so its probability effect depends on the starting probability.",
        ],
        problems: [
          {
            title: "Compare two starting probabilities",
            prompt: "An odds ratio is 2. Compare its effect when the starting probability is 0.10 and when it is 0.50.",
            steps: [
              "From p = 0.10: starting odds = 0.10/0.90 = 1/9.",
              "New odds = 2/9, so new p = (2/9)/(1 + 2/9) = 2/11 ≈ 0.182. Increase ≈ 8.2 percentage points.",
              "From p = 0.50: starting odds = 1.",
              "New odds = 2, so new p = 2/(1 + 2) ≈ 0.667. Increase ≈ 16.7 percentage points.",
            ],
            answer: "The same OR = 2 produces different probability increases: about 8.2 and 16.7 percentage points.",
          },
        ],
      },
      {
        title: "Negative and Binary Coefficients",
        paragraphs: [
          "When βⱼ is negative, eᵝʲ is below 1 and the odds decrease. For a binary feature, the odds ratio compares indicator 1 with its reference value 0 while other features stay fixed.",
        ],
        problems: [
          {
            title: "Interpret a negative coefficient",
            prompt: "A coefficient is β = −0.70. Find and interpret its odds ratio.",
            steps: [
              "OR = e⁻⁰·⁷⁰ ≈ 0.497.",
              "The odds are multiplied by about 0.497.",
              "Percentage decrease = (1 − 0.497) × 100 ≈ 50.3%.",
            ],
            answer: "A one-unit increase is associated with approximately 50.3% lower odds, holding other features fixed.",
          },
        ],
      },
      {
        title: "Intercept Interpretation",
        paragraphs: [
          "β₀ is the log-odds when every feature equals zero. Its exponential eᵝ⁰ gives the baseline odds at those zero values.",
          "As in linear regression, the intercept may have little practical meaning when zero is outside the useful feature range.",
        ],
      },
      {
        title: "Why Odds Ratios Need Care",
        points: [
          "An odds ratio is not a probability ratio.",
          "A 50% increase in odds is not automatically a 50 percentage-point rise in probability.",
          "Coefficient interpretation assumes other included features are held fixed.",
          "Association in an observational model does not prove causation.",
        ],
        paragraphs: [
          "Always state the feature unit, reference group, and held-fixed condition when interpreting a coefficient.",
        ],
      },
    ],
    mechanism: {
      title: "How to interpret a logistic coefficient",
      steps: [
        "Identify the feature unit and any reference category.",
        "Read βⱼ as the change in log-odds for one feature unit.",
        "Calculate eᵝʲ to obtain the odds ratio.",
        "If OR > 1, odds increase; if OR < 1, odds decrease.",
        "State that other included features are held fixed.",
        "Do not translate the result directly into a constant probability change.",
      ],
    },
    example: {
      title: "Loan repayment",
      body: "If the odds ratio for stable employment is 1.8, the modeled repayment odds are 1.8 times those of the reference employment group, holding the other included features fixed.",
    },
    misconception:
      "A coefficient of 0.4 does not mean probability rises by 0.4. It raises log-odds by 0.4 and multiplies odds by e⁰·⁴.",
  },
  revise: {
    definitionLabel: "Interpretation Scale",
    compactDefinition: true,
    definition:
      "Logistic regression models log-odds linearly, and exponentiating a coefficient gives its odds ratio.",
    sections: [
      {
        title: "Essential Formulas",
        formulas: [
          { label: "Odds", expression: "p/(1 − p)" },
          { label: "Probability", expression: "odds/(1 + odds)" },
          { label: "Logit", expression: "ln[p/(1 − p)]" },
          { label: "Odds ratio", expression: "OR = eᵝʲ" },
        ],
      },
      {
        title: "Reading OR",
        points: ["OR > 1: higher odds", "OR = 1: unchanged odds", "OR < 1: lower odds"],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Probability and odds are not the same.",
      "The logit can take any real value.",
      "βⱼ changes log-odds; eᵝʲ multiplies odds.",
      "Probability change depends on the starting probability.",
      "Always hold other included features fixed.",
    ],
    followUp: "Why is an odds ratio not a constant probability change?",
  },
  lastMinute: {
    definition: "p → odds p/(1−p) → log-odds ln[p/(1−p)].",
    sections: [
      {
        title: "Coefficient Rule",
        flow: ["Coefficient β", "Calculate eᵝ", "Read odds multiplier", "State held-fixed condition"],
        wide: true,
      },
      {
        title: "OR Signs",
        points: ["β > 0 → OR > 1", "β = 0 → OR = 1", "β < 0 → OR < 1"],
      },
    ],
    memoryLine: "Exponentiate beta to move from log-odds change to odds multiplier.",
    cues: ["Odds = p/(1−p).", "Logit = ln(odds).", "State the feature unit and reference."],
    trap: "Do not say OR = 1.5 means probability rises by 50 percentage points.",
  },
};

export const thresholdAndDecisionBoundary: SubjectTopic = {
  slug: "threshold-and-decision-boundary",
  title: "Decision Threshold and Decision Boundary",
  description:
    "Choose a probability threshold, understand its error trade-off, and derive linear decision boundaries.",
  readTime: "15 min",
  difficulty: "Intermediate",
  tags: ["Threshold", "Decision Boundary", "Trade-Off"],
  learn: {
    opening:
      "The model estimates a probability; the threshold expresses how much evidence is required before predicting the positive class.",
    sections: [
      {
        title: "Threshold Rule",
        paragraphs: [
          "At threshold t, predict class 1 when p̂ ≥ t. The common value 0.5 is convenient but not always suitable.",
        ],
        formulas: [
          { label: "Class rule", expression: "ŷclass = 1 if p̂ ≥ t; otherwise 0" },
        ],
        dataTable: {
          headers: ["p̂", "Prediction at t = 0.5", "Prediction at t = 0.3"],
          rows: [
            ["0.20", "0", "0"],
            ["0.35", "0", "1"],
            ["0.48", "0", "1"],
            ["0.70", "1", "1"],
          ],
        },
      },
      {
        title: "Lowering or Raising the Threshold",
        paragraphs: [
          "Lowering the threshold predicts more positives. This usually finds more true positives but also creates more false positives. Raising it predicts fewer positives, usually reducing false positives but missing more true positives.",
        ],
        visual: {
          src: "/notes/machine-learning/threshold-tradeoff.png",
          alt: "Probability axis showing how low and high thresholds change false-positive and false-negative trade-offs",
          width: 1536,
          height: 1024,
          caption: "Threshold choice changes the predicted labels without retraining the probability model.",
        },
        dataTable: {
          headers: ["Change", "Usually increases", "Usually decreases"],
          rows: [
            ["Lower threshold", "Predicted positives and recall", "False negatives and specificity"],
            ["Higher threshold", "Predicted negatives and specificity", "False positives and recall"],
          ],
        },
      },
      {
        title: "Choose the Threshold From Costs",
        paragraphs: [
          "Choose a threshold using validation data and the real cost of mistakes. Missing disease may be worse than requesting another test, while blocking a legitimate payment may be very costly in another system.",
          "Do not tune the threshold on the final test set. That would leak test information into model selection.",
        ],
      },
      {
        title: "Boundary at Threshold 0.5",
        paragraphs: [
          "The sigmoid equals 0.5 exactly when z = 0. Therefore, the standard decision boundary is the set of points satisfying β₀ + β₁x₁ + … + βₚxₚ = 0.",
          "In the compact form βᵀx, x must include a first value of 1 so that β₀ is included.",
        ],
        formulas: [
          { label: "0.5 boundary", expression: "β₀ + β₁x₁ + … + βₚxₚ = 0" },
        ],
      },
      {
        title: "Boundary Numerical With Two Features",
        paragraphs: [
          "Solve the boundary equation for one feature to obtain its line equation.",
        ],
        problems: [
          {
            title: "Find and use the boundary",
            prompt: "For z = −4 + x₁ + 2x₂, find the t = 0.5 boundary and classify (x₁, x₂) = (3, 1).",
            steps: [
              "At t = 0.5, set z = 0: −4 + x₁ + 2x₂ = 0.",
              "Solve for x₂: x₂ = 2 − 0.5x₁.",
              "For (3,1), z = −4 + 3 + 2(1) = 1.",
              "p̂ = σ(1) ≈ 0.731, so predict class 1.",
            ],
            answer: "The boundary is x₂ = 2 − 0.5x₁, and point (3,1) is predicted as class 1.",
          },
        ],
      },
      {
        title: "Boundary at Any Threshold",
        paragraphs: [
          "For threshold t, the probability boundary p̂ = t corresponds to a log-odds score of ln[t/(1−t)]. Changing t shifts the boundary but keeps it linear for basic logistic regression.",
        ],
        formulas: [
          { label: "Boundary at threshold t", expression: "βᵀx = ln[t/(1 − t)]" },
        ],
        problems: [
          {
            title: "Score boundary for t = 0.8",
            prompt: "What linear score is required at a probability threshold of 0.8?",
            steps: ["z = ln[t/(1 − t)]", "z = ln(0.8/0.2) = ln(4)"],
            answer: "The boundary score is z ≈ 1.386.",
          },
        ],
      },
      {
        title: "Cost-Based Threshold Numerical",
        paragraphs: [
          "When probabilities are calibrated and false-positive and false-negative costs are constant, a basic minimum-cost threshold can be calculated directly.",
        ],
        formulas: [
          {
            label: "Basic cost threshold",
            expression: "t = C_FP / (C_FP + C_FN)",
            note: "Use only under the stated calibrated-probability and constant-cost assumptions.",
          },
        ],
        problems: [
          {
            title: "Choose a threshold from error costs",
            prompt: "A false positive costs 1 unit and a false negative costs 4 units. Find the basic cost threshold.",
            steps: [
              "t = C_FP/(C_FP + C_FN).",
              "t = 1/(1 + 4) = 0.20.",
              "The lower threshold reflects that a false negative is four times as costly.",
            ],
            answer: "Use t = 0.20 under the stated assumptions.",
          },
        ],
      },
      {
        title: "Threshold Does Not Fix Probability Quality",
        paragraphs: [
          "Changing the threshold changes class decisions but does not improve the underlying probability estimates. A poorly calibrated model may still produce unreliable probabilities at every threshold.",
        ],
      },
    ],
    mechanism: {
      title: "How to select and apply a threshold",
      steps: [
        "Train the probability model without using the test set.",
        "Define the costs of false positives and false negatives.",
        "Compare candidate thresholds on validation data.",
        "Choose the threshold that matches the required trade-off.",
        "Lock the threshold and evaluate once on the test set.",
        "Monitor the trade-off when real class frequencies or costs change.",
      ],
    },
    example: {
      title: "Fraud review queue",
      body: "A bank can lower the threshold to send more transactions for review when missing fraud is expensive, but the review team must be able to handle the extra false alarms.",
    },
    misconception:
      "A threshold of 0.5 is not universally optimal. It ignores class imbalance and the unequal cost of different mistakes.",
  },
  revise: {
    definitionLabel: "Decision Rule",
    compactDefinition: true,
    definition:
      "A threshold turns probability into a class and determines the location of the logistic-regression decision boundary.",
    sections: [
      {
        title: "Essential Formulas",
        formulas: [
          { label: "Class", expression: "1 if p̂ ≥ t; otherwise 0" },
          { label: "At t = 0.5", expression: "βᵀx = 0" },
          { label: "At any t", expression: "βᵀx = ln[t/(1 − t)]" },
          { label: "Cost-based t", expression: "C_FP/(C_FP + C_FN)" },
        ],
      },
      {
        title: "Trade-Off",
        points: [
          "Lower t: more positive predictions, usually higher recall.",
          "Higher t: fewer positive predictions, usually higher specificity.",
          "Choose t on validation data using real mistake costs.",
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Thresholding happens after probability estimation.",
      "Changing t does not require retraining the same probability model.",
      "At t = 0.5, the boundary score is zero.",
      "The compact βᵀx form includes β₀ only when x starts with 1.",
      "Basic logistic regression has a linear boundary in its supplied features.",
      "Never tune t on the final test set.",
    ],
    followUp: "What happens to false negatives when the threshold is lowered?",
  },
  lastMinute: {
    definition: "Lower threshold finds more positives; higher threshold demands stronger evidence.",
    sections: [
      {
        title: "Threshold Direction",
        points: ["Lower t → recall usually rises", "Higher t → specificity usually rises", "Costs decide the useful trade-off"],
      },
      {
        title: "Boundary",
        points: ["t = 0.5 → z = 0", "Any t → z = ln[t/(1−t)]", "Linear score gives a linear boundary"],
      },
    ],
    memoryLine: "Threshold moves the decision, not the learned probability curve.",
    cues: ["Use validation data.", "State the positive class.", "Consider FP and FN costs."],
    trap: "Do not assume 0.5 is always the best threshold.",
  },
};
