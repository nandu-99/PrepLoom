import type { SubjectTopic } from "@/lib/subject-content";

export const trainingValidationAndTestSets: SubjectTopic = {
  slug: "training-validation-and-test-sets",
  title: "Training, Validation, and Test Sets",
  description:
    "Split data correctly, give each subset one clear job, and prevent data leakage.",
  readTime: "20 min",
  difficulty: "Foundation",
  tags: ["Data Split", "Validation", "Leakage"],
  learn: {
    opening:
      "A model must be evaluated on examples that did not guide its learning or tuning. Training, validation, and test sets separate these jobs.",
    sections: [
      {
        title: "Three Sets, Three Jobs",
        paragraphs: [
          "The training set is used to calculate gradients and learn weights and biases. The validation set is used to compare model choices, tune hyperparameters, select a checkpoint, and diagnose overfitting.",
          "The test set is used only after the model and its settings are finalized. It estimates how the finished system may perform on similar unseen data.",
        ],
        visual: {
          src: "/notes/deep-learning/data-splits.png",
          alt: "Dataset separated into training, validation, and locked test sets with the purpose of each set",
          width: 1536,
          height: 1024,
          caption:
            "Parameters learn from training data, choices use validation data, and the untouched test set provides the final check.",
        },
        dataTable: {
          headers: ["Subset", "Used for", "Must not be used for"],
          rows: [
            [
              "Training",
              "Gradients and parameter learning",
              "Final unbiased reporting",
            ],
            [
              "Validation",
              "Tuning, comparison, early stopping",
              "Gradient-based parameter updates",
            ],
            [
              "Test",
              "One final evaluation",
              "Repeated tuning or model selection",
            ],
          ],
        },
      },
      {
        title: "Choosing Split Sizes",
        paragraphs: [
          "There is no universal split ratio. A common starting point is 70/15/15 or 80/10/10, but the correct choice depends on dataset size and how much reliable evaluation data is needed.",
          "Very large datasets may use a smaller percentage for validation and test while still providing many examples. Each subset must remain representative of the real task.",
        ],
        formulas: [
          {
            label: "Subset count",
            expression: "count = total examples × split fraction",
          },
        ],
      },
      {
        title: "Random, Stratified, Grouped, and Time-Based Splits",
        paragraphs: [
          "A random split works when examples are independent and similarly distributed. Stratification keeps important class proportions similar across subsets, which is useful for classification with uneven class counts.",
          "Related examples must stay together. Images from the same patient, person, machine, or document should not be divided across subsets. Time-dependent data must usually be split chronologically so training does not see the future.",
        ],
        dataTable: {
          headers: ["Data situation", "Suitable split"],
          rows: [
            ["Independent examples", "Random"],
            ["Uneven class frequencies", "Stratified"],
            ["Several examples per person or device", "Grouped"],
            ["Forecasting or changing time sequence", "Chronological"],
          ],
        },
      },
      {
        title: "Data Leakage",
        paragraphs: [
          "Data leakage occurs when information unavailable in real use influences training or model selection. It produces performance estimates that are better than the model's true ability.",
          "Split the data before fitting preprocessing operations. Calculate normalization statistics, vocabulary, feature selection, and resampling rules from the training set only, then apply the learned transformation to validation and test data.",
        ],
        points: [
          "Do not normalize using the full dataset's mean and variance.",
          "Do not place near-duplicate examples in different subsets.",
          "Do not tune hyperparameters after repeatedly checking test results.",
          "Do not let future information enter a time-based training example.",
        ],
      },
      {
        title: "Distribution and Reproducibility",
        paragraphs: [
          "Validation and test data should represent the environment where the model will be used. A high score on an unrepresentative test set can still be misleading.",
          "Record the split rule and random seed so that results can be reproduced. The seed does not fix a poor split; it only makes the same split repeatable.",
        ],
      },
      {
        title: "Practice",
        paragraphs: [
          "First decide the role of each subset. Then calculate counts and check whether information crosses a boundary.",
        ],
        problems: [
          {
            title: "Split counts",
            prompt:
              "A dataset contains 20,000 examples. Use a 70/15/15 split. Find the number of training, validation, and test examples.",
            steps: [
              "Training count = 20,000 × 0.70 = 14,000.",
              "Validation count = 20,000 × 0.15 = 3,000.",
              "Test count = 20,000 × 0.15 = 3,000.",
              "Check: 14,000 + 3,000 + 3,000 = 20,000.",
            ],
            answer: "Training: 14,000, validation: 3,000, test: 3,000.",
          },
          {
            title: "Stratified class count",
            prompt:
              "A binary dataset has 1,000 examples, including 200 positive examples. If an 80/20 stratified split is used, approximately how many positive examples enter each subset?",
            steps: [
              "Training positives = 200 × 0.80 = 160.",
              "Test positives = 200 × 0.20 = 40.",
              "Both subsets keep the original 20% positive proportion.",
            ],
            answer:
              "Approximately 160 training positives and 40 test positives.",
          },
          {
            title: "Find the leakage",
            prompt:
              "A team calculates feature means using the full dataset, normalizes every example, and then creates train and test sets. Is this valid?",
            steps: [
              "The full-dataset means contain information from future test examples.",
              "Those test values therefore influence the training representation.",
              "Split first, fit means on training data, and reuse those means on test data.",
            ],
            answer: "No. This is preprocessing leakage.",
          },
        ],
      },
    ],
    mechanism: {
      title: "A leakage-safe evaluation workflow",
      steps: [
        "Define the real prediction unit and deployment setting.",
        "Create independent, stratified, grouped, or chronological splits as required.",
        "Fit preprocessing and model parameters using training data only.",
        "Use validation data for tuning and checkpoint selection.",
        "Freeze every choice.",
        "Evaluate once on the untouched test set and report the result.",
      ],
    },
    example: {
      title: "Patient-image split",
      body: "If one patient has several scans, place all of that patient's scans in the same subset. Otherwise the model may recognize patient-specific patterns rather than general disease patterns.",
    },
    misconception:
      "Validation data is unseen by gradient descent, but it is not fully untouched: repeated model choices can overfit to it. The test set protects the final estimate.",
  },
  revise: {
    definition:
      "Training learns parameters, validation selects choices, and test measures the finalized model.",
    sections: [
      {
        title: "Roles",
        dataTable: {
          headers: ["Set", "Job"],
          rows: [
            ["Train", "Learn weights and biases"],
            ["Validation", "Tune and select"],
            ["Test", "Final unbiased check"],
          ],
        },
      },
      {
        title: "Split Choice",
        points: [
          "Uneven classes → stratify",
          "Related examples → group",
          "Future prediction → chronological split",
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Split before fitting preprocessing.",
      "Learn transformations from training data only.",
      "Do not tune repeatedly on the test set.",
      "Keep duplicates and related samples in one subset.",
      "Every subset should represent its intended use.",
    ],
    followUp:
      "Why does using the test set to choose a learning rate make its final score unreliable?",
  },
  lastMinute: {
    definition: "Train learns, validation chooses, test reports.",
    sections: [
      {
        title: "Safe Order",
        flow: [
          "Split",
          "Fit preprocessing on train",
          "Train",
          "Tune on validation",
          "Test once",
        ],
        wide: true,
      },
      {
        title: "Special Splits",
        points: [
          "Class imbalance: stratify",
          "Shared identity: group",
          "Time data: chronological",
        ],
      },
    ],
    memoryLine: "The test set must not help build the model it judges.",
    cues: [
      "Ratios are guidelines, not laws.",
      "Preprocessing can leak information.",
      "A seed gives repeatability, not correctness.",
    ],
    trap: "Do not call validation and test sets interchangeable; model selection uses validation, not test.",
  },
};

export const underfittingOverfittingAndLearningCurves: SubjectTopic = {
  slug: "underfitting-overfitting-and-learning-curves",
  title: "Underfitting, Overfitting, and Learning Curves",
  description:
    "Diagnose whether a model has learned too little, generalized well, or memorized training patterns.",
  readTime: "22 min",
  difficulty: "Intermediate",
  tags: ["Overfitting", "Learning Curves", "Bias-Variance"],
  learn: {
    opening:
      "Training performance alone cannot show whether a model will generalize. Compare training and validation behaviour to identify underfitting and overfitting.",
    sections: [
      {
        title: "Generalization",
        paragraphs: [
          "Generalization is the ability to perform well on unseen examples from the target distribution. A useful model learns patterns that continue beyond its training examples.",
          "The generalization gap is the difference between validation and training performance. A small gap is desirable only when both performances are good; two poor scores with a small gap still indicate a weak model.",
        ],
        formulas: [
          {
            label: "Loss-based generalization gap",
            expression: "gap = validation loss − training loss",
          },
        ],
      },
      {
        title: "Underfitting, Good Fit, and Overfitting",
        paragraphs: [
          "Underfitting means the model has not captured enough useful structure. Training and validation losses are both high. This is commonly linked with high bias.",
          "Overfitting means training performance becomes very strong while validation performance is much worse. This is commonly linked with high variance. A good fit has useful performance on both sets with a controlled gap.",
        ],
        visual: {
          src: "/notes/deep-learning/learning-curves.png",
          alt: "Training and validation loss curves for underfitting, good fit, and overfitting",
          width: 1536,
          height: 1024,
          caption:
            "Underfitting keeps both losses high; overfitting creates a growing validation gap while training loss continues to fall.",
        },
        dataTable: {
          headers: ["Pattern", "Training result", "Validation result"],
          rows: [
            ["Underfitting", "Poor", "Poor and often similar"],
            ["Good fit", "Good", "Good with manageable gap"],
            ["Overfitting", "Very good", "Clearly worse"],
          ],
        },
      },
      {
        title: "Reading Learning Curves",
        paragraphs: [
          "A learning curve plots a metric such as loss against epochs or training-set size. Use the same loss definition when comparing training and validation curves.",
          "If validation loss first falls and later rises while training loss continues downward, overfitting has begun. The lowest validation loss is a useful checkpoint candidate.",
        ],
        points: [
          "Both losses high: capacity, features, optimization, or training time may be insufficient.",
          "Training low and validation much higher: investigate overfitting or distribution mismatch.",
          "Both losses improve and remain close: training is generalizing reasonably.",
          "Sudden unstable jumps: inspect learning rate, batches, numerical values, and data pipeline.",
        ],
      },
      {
        title: "Bias and Variance",
        paragraphs: [
          "Bias is error caused by assumptions that are too simple to represent the important pattern. Variance is sensitivity to the particular training examples.",
          "The labels high bias and high variance are diagnostic ideas, not perfect measurements from one number. Always examine both training and validation behaviour.",
        ],
        table: {
          headers: ["High bias", "High variance"],
          rows: [
            ["Often underfits", "Often overfits"],
            [
              "Training performance is weak",
              "Training is strong but validation is weaker",
            ],
            [
              "May need more capacity or better optimization",
              "May need more data or regularization",
            ],
          ],
        },
      },
      {
        title: "Choosing a Response",
        paragraphs: [
          "For underfitting, check the data and optimization first. Then consider training longer, improving features, reducing excessive regularization, or using a model with enough capacity.",
          "For overfitting, collect more representative data when possible, use data augmentation where valid, reduce unnecessary capacity, or apply regularization, dropout, and early stopping.",
        ],
        dataTable: {
          headers: ["Diagnosis", "Common useful response"],
          rows: [
            [
              "Underfitting",
              "Improve optimization or increase useful capacity",
            ],
            ["Overfitting", "More data or stronger regularization"],
            ["Distribution mismatch", "Make evaluation data match deployment"],
            [
              "Unstable optimization",
              "Fix learning rate or numerical instability",
            ],
          ],
        },
      },
      {
        title: "Practice",
        paragraphs: [
          "Compare both sets before choosing a remedy. A single training score is not enough.",
        ],
        problems: [
          {
            title: "Calculate a generalization gap",
            prompt:
              "A model has training loss 0.18 and validation loss 0.31. Find the loss gap.",
            steps: [
              "gap = validation loss − training loss.",
              "gap = 0.31 − 0.18 = 0.13.",
              "Interpret the number together with the absolute loss values and a baseline.",
            ],
            answer: "The validation-to-training loss gap is 0.13.",
          },
          {
            title: "Diagnose two models",
            prompt:
              "Model A has training accuracy 62% and validation accuracy 60%. Model B has training accuracy 99% and validation accuracy 78%. Identify the likely issue in each.",
            steps: [
              "Model A performs poorly on both sets with a small gap.",
              "Model A is likely underfitting.",
              "Model B has a large training-validation gap.",
              "Model B is likely overfitting.",
            ],
            answer: "Model A likely underfits; Model B likely overfits.",
          },
          {
            title: "Choose a checkpoint",
            prompt:
              "Validation losses at epochs 1 through 5 are [0.50, 0.39, 0.32, 0.34, 0.38]. Which epoch is the best checkpoint by validation loss?",
            steps: [
              "Find the smallest validation loss.",
              "The minimum value 0.32 occurs at epoch 3.",
              "Later values rise even if training loss may continue falling.",
            ],
            answer: "Choose the checkpoint from epoch 3.",
          },
        ],
      },
    ],
    mechanism: {
      title: "How to diagnose model fit",
      steps: [
        "Confirm that train and validation metrics are calculated consistently.",
        "Compare training performance with an appropriate baseline.",
        "Compare validation performance with training performance.",
        "Inspect how both curves change over time.",
        "Classify the main issue as underfitting, overfitting, mismatch, or instability.",
        "Change one relevant part and measure again.",
      ],
    },
    example: {
      title: "Memorized training images",
      body: "A classifier reaches 100% training accuracy but only 72% validation accuracy. The large gap suggests that it learned details specific to the training images instead of only reusable class patterns.",
    },
    misconception:
      "A small train-validation gap does not prove a good model. If both results are poor, the model is probably underfitting.",
  },
  revise: {
    definition:
      "Underfitting gives poor train and validation results; overfitting gives a strong train result but a weaker validation result.",
    sections: [
      {
        title: "Fast Diagnosis",
        dataTable: {
          headers: ["Curves", "Likely issue"],
          rows: [
            ["Train high loss, validation high loss", "Underfitting"],
            ["Train low loss, validation much higher", "Overfitting"],
            ["Both low and close", "Good fit"],
          ],
        },
      },
      {
        title: "Gap",
        formulas: [{ expression: "gap = validation loss − training loss" }],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Generalization means useful performance on unseen data.",
      "High bias is commonly connected to underfitting.",
      "High variance is commonly connected to overfitting.",
      "Choose checkpoints using validation performance.",
      "Diagnose before applying a remedy.",
    ],
    followUp:
      "Why can a model with a very small generalization gap still be unsuitable?",
  },
  lastMinute: {
    definition:
      "Compare training and validation; never diagnose from training alone.",
    sections: [
      {
        title: "Patterns",
        points: [
          "Both poor → underfitting",
          "Train strong, validation weak → overfitting",
          "Both strong and close → good fit",
        ],
      },
      {
        title: "Responses",
        points: [
          "Underfit → improve optimization or capacity",
          "Overfit → data or regularization",
        ],
      },
    ],
    memoryLine:
      "Bias fails to learn enough; variance learns training details too closely.",
    cues: [
      "Lowest validation loss suggests the checkpoint.",
      "A widening gap signals overfitting.",
      "Sudden jumps may be optimization, not overfitting.",
    ],
    trap: "Do not call every poor validation score overfitting; check training performance first.",
  },
};

export const l1L2AndWeightDecay: SubjectTopic = {
  slug: "l1-l2-and-weight-decay",
  title: "L1, L2, and Weight Decay",
  description:
    "Penalize unnecessary weight magnitude and calculate how regularization changes the objective and update.",
  readTime: "25 min",
  difficulty: "Intermediate",
  tags: ["L1", "L2", "Weight Decay"],
  learn: {
    opening:
      "Regularization adds a preference beyond fitting the training data. L1 and L2 discourage unnecessarily large weights and can reduce overfitting.",
    sections: [
      {
        title: "Regularized Objective",
        paragraphs: [
          "The complete objective combines data loss with a penalty on selected parameters. The coefficient λ controls the penalty strength.",
          "If λ is too small, regularization may have little effect. If λ is too large, the model can underfit. Biases and normalization scale or shift parameters are commonly excluded from weight penalties.",
        ],
        formulas: [
          { label: "General form", expression: "Jtotal = Jdata + λR(W)" },
        ],
        visual: {
          src: "/notes/deep-learning/regularization-l1-l2.png",
          alt: "Comparison of no regularization, sparse L1 weights, and smoothly smaller L2 weights",
          width: 1536,
          height: 1024,
          caption:
            "L1 can drive weights to zero; L2 smoothly discourages large weight magnitude.",
        },
      },
      {
        title: "L1 Regularization",
        paragraphs: [
          "L1 adds the sum of absolute weight values. Its subgradient has nearly constant magnitude away from zero, so it can push some weights exactly to zero and create sparse parameters.",
          "At w = 0, the ordinary derivative is not unique. Optimization software uses a valid subgradient rule.",
        ],
        formulas: [
          { label: "L1 objective", expression: "Jtotal = Jdata + λΣⱼ|wⱼ|" },
          {
            label: "L1 contribution for w ≠ 0",
            expression: "∂Jreg/∂w = λ sign(w)",
          },
        ],
      },
      {
        title: "L2 Regularization",
        paragraphs: [
          "L2 penalizes squared weights. Larger weights receive a stronger penalty gradient, so weights are smoothly pulled toward zero but are not usually made exactly zero.",
          "The factor ½ is a mathematical convenience: it cancels the 2 produced by differentiation. Always use the derivative that matches the stated objective.",
        ],
        formulas: [
          {
            label: "L2 objective used here",
            expression: "Jtotal = Jdata + (λ/2)Σⱼwⱼ²",
          },
          { label: "L2 gradient", expression: "∂Jtotal/∂W = ∂Jdata/∂W + λW" },
        ],
      },
      {
        title: "L1 versus L2",
        paragraphs: [
          "Both methods restrict parameter magnitude, but their effects differ. L1 is useful when sparse weights are wanted. L2 is the more common smooth default for neural-network weights.",
        ],
        table: {
          headers: ["L1", "L2"],
          rows: [
            ["Penalty uses |w|", "Penalty uses w²"],
            ["Can create exact zeros", "Usually creates small nonzero weights"],
            ["Nondifferentiable at zero", "Smooth everywhere"],
          ],
        },
      },
      {
        title: "Weight Decay",
        paragraphs: [
          "With plain SGD, L2 regularization produces a multiplicative shrinkage term in the weight update. This is commonly called weight decay.",
          "For adaptive optimizers such as Adam, adding an L2 gradient and directly decaying the weight are not generally the same operation. Decoupled weight decay applies shrinkage separately from the adaptive gradient update.",
        ],
        formulas: [
          {
            label: "SGD with L2",
            expression: "Wnew = (1 − ηλ)Wold − η∂Jdata/∂W",
          },
        ],
      },
      {
        title: "Practice",
        paragraphs: [
          "Check whether the objective uses λ or λ/2 before differentiating.",
        ],
        problems: [
          {
            title: "L2 objective value",
            prompt:
              "Data loss is 0.8, weights are [2, −1], and λ = 0.1. Use Jtotal = Jdata + (λ/2)Σw².",
            steps: [
              "Σw² = 2² + (−1)² = 5.",
              "Penalty = (0.1/2) × 5 = 0.25.",
              "Jtotal = 0.8 + 0.25 = 1.05.",
            ],
            answer: "The regularized objective is 1.05.",
          },
          {
            title: "L2 gradient and update",
            prompt:
              "A weight is w = 2, its data-loss gradient is 0.4, λ = 0.1, and η = 0.01. Use the L2 convention above.",
            steps: [
              "Regularization gradient = λw = 0.1 × 2 = 0.2.",
              "Total gradient = 0.4 + 0.2 = 0.6.",
              "wnew = 2 − 0.01(0.6) = 1.994.",
            ],
            answer:
              "The total gradient is 0.6 and the updated weight is 1.994.",
          },
          {
            title: "L1 contribution",
            prompt:
              "For λ = 0.05, find the L1 penalty-gradient contribution for w₁ = 3 and w₂ = −2.",
            steps: [
              "sign(3) = 1, so the contribution for w₁ is 0.05.",
              "sign(−2) = −1, so the contribution for w₂ is −0.05.",
              "These terms are added to the corresponding data-loss gradients.",
            ],
            answer: "The L1 contributions are [0.05, −0.05].",
          },
        ],
      },
    ],
    mechanism: {
      title: "How parameter regularization acts",
      steps: [
        "Calculate data loss on the mini-batch.",
        "Calculate the chosen penalty on selected weights.",
        "Add both parts to form the training objective.",
        "Backpropagate the data and penalty gradients.",
        "Update parameters with the optimizer.",
        "Use validation performance to select λ.",
      ],
    },
    example: {
      title: "Why λ needs validation",
      body: "A larger λ may reduce a large training-validation gap, but an excessive value can raise both losses by preventing the model from fitting useful patterns.",
    },
    misconception:
      "Regularization is not a guaranteed improvement. It trades some freedom to fit training data for a chance of better generalization.",
  },
  revise: {
    definition:
      "L1 and L2 add weight penalties to the data loss; λ controls their strength.",
    sections: [
      {
        title: "Core Formulas",
        formulas: [
          { label: "L1", expression: "J = Jdata + λΣ|w|" },
          { label: "L2", expression: "J = Jdata + (λ/2)Σw²" },
          { label: "L2 gradient", expression: "dWtotal = dWdata + λW" },
        ],
      },
      {
        title: "Effect",
        table: {
          headers: ["L1", "L2"],
          rows: [
            ["Sparse, exact zeros possible", "Smoothly smaller weights"],
            ["sign(w) gradient", "λw gradient with λ/2 convention"],
          ],
        },
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Use the derivative matching the exact penalty formula.",
      "L1 can create sparse weights.",
      "L2 is a common smooth neural-network regularizer.",
      "Plain-SGD L2 appears as weight decay.",
      "Tune λ using validation data.",
    ],
    followUp:
      "Why does writing an L2 penalty with λ/2 make its gradient simpler?",
  },
  lastMinute: {
    definition: "Regularization adds a cost for unnecessary weight magnitude.",
    sections: [
      {
        title: "Match",
        points: [
          "L1 → λΣ|w| → sparse",
          "L2 → (λ/2)Σw² → smooth shrinkage",
          "Large λ → possible underfitting",
        ],
      },
      {
        title: "L2 Update",
        points: ["dWtotal = dWdata + λW", "Wnew = (1 − ηλ)W − ηdWdata"],
      },
    ],
    memoryLine: "L1 selects with zeros; L2 shrinks smoothly.",
    cues: [
      "Regularize selected weights, usually not biases.",
      "λ controls strength.",
      "Adam weight decay and L2 are not always identical.",
    ],
    trap: "Do not use a 2λw gradient when the stated penalty is (λ/2)w².",
  },
};
