import type { SubjectTopic } from "@/lib/subject-content";

export const ensembleLearningAndBagging: SubjectTopic = {
  slug: "ensemble-learning-and-bagging",
  title: "Ensemble Learning and Bagging",
  description:
    "Combine several models and understand how bootstrap aggregation reduces the variance of unstable learners.",
  readTime: "16 min",
  difficulty: "Intermediate",
  tags: ["Ensemble Learning", "Bagging", "Bootstrap"],
  learn: {
    opening:
      "An ensemble combines predictions from several models. The models should make useful but not identical errors, so their combined prediction is more stable than one model alone.",
    sections: [
      {
        title: "Why Combine Models?",
        paragraphs: [
          "A deep decision tree can change greatly when its training sample changes. If several such trees are trained on different samples, averaging or voting can cancel part of this instability.",
          "An ensemble is useful only when its members contain real signal and make sufficiently different errors. Combining many identical weak models does not create new information.",
        ],
        visual: {
          src: "/notes/machine-learning/ensemble-bagging-workflow.png",
          alt: "Bagging workflow using bootstrap samples, parallel models, and an aggregated prediction",
          width: 1536,
          height: 1024,
          caption:
            "Bagging trains models independently on bootstrap samples and combines their outputs.",
        },
      },
      {
        title: "Voting and Averaging",
        paragraphs: [
          "For classification, hard voting selects the class predicted by most models. Soft voting averages class probabilities and then chooses the largest average, but it requires meaningful probability outputs.",
          "For regression, the usual ensemble prediction is the average of the individual numerical predictions.",
        ],
        formulas: [
          {
            label: "Regression average",
            expression: "ŷensemble = (1/B)Σᵦ₌₁ᴮ ŷᵦ",
          },
        ],
      },
      {
        title: "Bootstrap Sampling",
        paragraphs: [
          "A bootstrap sample is created by drawing n rows from a training set of n rows with replacement. A row may appear several times, while some rows are not selected.",
          "Bagging trains one model on each bootstrap sample. The models are trained independently and their predictions are combined.",
        ],
        dataTable: {
          headers: ["Property", "Bagging"],
          rows: [
            ["Training sets", "Bootstrap samples"],
            ["Model training", "Independent and parallel"],
            ["Main effect", "Reduces variance"],
            ["Typical base model", "Decision tree"],
          ],
        },
      },
      {
        title: "Voting Numerical",
        paragraphs: ["Combine individual predictions using the aggregation rule chosen for the task."],
        problems: [
          {
            title: "Combine five classifiers",
            prompt:
              "Five classifiers predict [Yes, No, Yes, Yes, No]. Find the hard-voting result.",
            steps: [
              "Yes receives three votes.",
              "No receives two votes.",
              "Choose the class with the larger vote count.",
            ],
            answer: "The ensemble predicts Yes.",
          },
          {
            title: "Average three regressors",
            prompt: "Three regressors predict 18, 21, and 24. Find the ensemble prediction.",
            steps: ["Average = (18 + 21 + 24)/3", "Average = 63/3"],
            answer: "The ensemble prediction is 21.",
          },
        ],
      },
      {
        title: "Bias and Variance",
        paragraphs: [
          "Bagging mainly reduces variance. It is therefore most useful with unstable learners such as deep decision trees. It usually does not repair a base model that has strong systematic bias.",
        ],
      },
    ],
    mechanism: {
      title: "Bagging workflow",
      steps: [
        "Create several bootstrap samples from the training data.",
        "Train one base model on each sample.",
        "Generate a prediction from every model.",
        "Use majority voting for classes or averaging for numbers.",
      ],
    },
    example: {
      title: "Unstable decision trees",
      body: "Several deep trees may choose different early splits. Their majority vote is usually less sensitive to one unusual training sample than one tree alone.",
    },
    misconception:
      "Bagging does not train models one after another to repair previous mistakes. Its models are trained independently; sequential correction belongs to boosting.",
  },
  revise: {
    definitionLabel: "Core Idea",
    compactDefinition: true,
    definition:
      "Bagging trains models independently on bootstrap samples and combines their predictions to reduce variance.",
    sections: [
      {
        title: "Combine",
        points: [
          "Classification: majority vote or probability average",
          "Regression: numerical average",
          "Bootstrap: sample with replacement",
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Diversity between model errors is important.",
      "Bagging models can be trained in parallel.",
      "Its main benefit is lower variance.",
      "Deep trees are common base learners.",
    ],
    followUp: "Why does bagging help a high-variance decision tree?",
  },
  lastMinute: {
    definition: "Bootstrap, train in parallel, then vote or average.",
    sections: [
      {
        title: "Flow",
        flow: ["Training data", "Bootstrap samples", "Independent models", "Combine"],
        wide: true,
      },
    ],
    memoryLine: "Bagging reduces variance by averaging different fitted models.",
    cues: ["Sampling is with replacement.", "Classification votes.", "Regression averages."],
    trap: "Do not confuse parallel bagging with sequential boosting.",
  },
};

export const randomForest: SubjectTopic = {
  slug: "random-forest",
  title: "Random Forest",
  description:
    "Build a diverse collection of decision trees using bootstrap rows and random feature subsets.",
  readTime: "18 min",
  difficulty: "Intermediate",
  tags: ["Random Forest", "Decision Trees", "Feature Sampling"],
  learn: {
    opening:
      "Random Forest is a bagged ensemble of decision trees with an additional source of randomness: every split considers only a random subset of features.",
    sections: [
      {
        title: "Two Sources of Randomness",
        paragraphs: [
          "Each tree usually receives a bootstrap sample of training rows. At each node, it searches for the best split using only a randomly selected subset of features.",
          "Feature sampling prevents one very strong feature from forcing most trees to look nearly identical. Lower correlation between trees makes averaging more effective.",
        ],
        visual: {
          src: "/notes/machine-learning/random-forest-workflow.png",
          alt: "Random Forest using bootstrap row samples and random feature subsets to build diverse trees",
          width: 1536,
          height: 1024,
          caption:
            "Bootstrap rows create different datasets; random feature subsets create different split choices.",
        },
      },
      {
        title: "Training and Prediction",
        flow: [
          "Bootstrap rows for each tree",
          "Choose random candidate features at every split",
          "Grow each tree",
          "Vote or average all trees",
        ],
        paragraphs: [
          "Classification forests use voting or averaged class probabilities. Regression forests average leaf predictions from all trees.",
        ],
      },
      {
        title: "Out-of-Bag Evaluation",
        paragraphs: [
          "A bootstrap sample leaves some training rows out. For a given row, trees that did not train on that row can predict it. Combining those predictions gives an out-of-bag, or OOB, estimate.",
          "OOB evaluation is useful, but an untouched test set is still needed for the final performance report after all choices are complete.",
        ],
      },
      {
        title: "Vote and Probability Numerical",
        paragraphs: ["A classification forest can average tree probabilities before applying the chosen threshold."],
        problems: [
          {
            title: "Combine tree probabilities",
            prompt:
              "Three trees return positive-class probabilities 0.70, 0.40, and 0.80. Find the forest probability and class at threshold 0.5.",
            steps: [
              "Average probability = (0.70 + 0.40 + 0.80)/3.",
              "Average probability = 1.90/3 ≈ 0.633.",
              "0.633 ≥ 0.5, so predict class 1.",
            ],
            answer: "The forest probability is approximately 0.633 and the predicted class is 1.",
          },
        ],
      },
      {
        title: "Important Hyperparameters",
        paragraphs: ["Tune only settings that materially affect diversity and individual-tree complexity."],
        dataTable: {
          headers: ["Setting", "Main effect"],
          rows: [
            ["Number of trees", "More stability but more computation"],
            ["Features per split", "Controls tree diversity"],
            ["Maximum depth", "Controls individual-tree complexity"],
            ["Minimum leaf size", "Prevents very small leaves"],
          ],
        },
      },
      {
        title: "Strengths and Limits",
        paragraphs: ["Random Forest is a strong tabular baseline, but it still requires honest validation."],
        points: [
          "Strong default for many tabular classification and regression tasks.",
          "Captures nonlinear relationships and feature interactions.",
          "Usually more stable than one decision tree.",
          "Less interpretable and larger than one tree.",
          "Does not naturally extrapolate trends in regression.",
        ],
      },
    ],
    mechanism: {
      title: "How a Random Forest is built",
      steps: [
        "Draw one bootstrap row sample per tree.",
        "At each node, draw a random feature subset.",
        "Choose the best split only from that subset.",
        "Repeat for many trees.",
        "Aggregate their predictions.",
      ],
    },
    example: {
      title: "Loan-risk forest",
      body: "Different trees may focus on repayment history, income, or debt ratio. Their combined vote is less dependent on one particular sample and one particular tree structure.",
    },
    misconception:
      "Random Forest does not use one fixed random feature subset for an entire tree. A new candidate subset is normally selected at every split.",
  },
  revise: {
    definitionLabel: "Core Model",
    compactDefinition: true,
    definition:
      "Random Forest bags decision trees and samples candidate features at every split to reduce correlation and variance.",
    sections: [
      {
        title: "Randomness",
        points: ["Bootstrap rows per tree", "Random candidate features per split"],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Classification votes; regression averages.",
      "Feature sampling makes trees less similar.",
      "OOB rows were not used by a particular tree.",
      "Tune tree size and features per split with validation.",
    ],
    followUp: "Why does Random Forest sample features at every node?",
  },
  lastMinute: {
    definition: "Bagged trees plus random candidate features at each split.",
    sections: [
      {
        title: "Two Random Choices",
        points: ["Rows: bootstrap sample", "Features: random subset per node"],
      },
    ],
    memoryLine: "Different rows and different split choices create a diverse forest.",
    cues: ["Many trees.", "Vote or average.", "OOB gives an internal estimate."],
    trap: "Do not describe Random Forest as one large decision tree.",
  },
};

export const boostingFundamentals: SubjectTopic = {
  slug: "boosting-fundamentals",
  title: "Boosting Fundamentals",
  description:
    "Build models sequentially so each new learner focuses on errors left by the current ensemble.",
  readTime: "16 min",
  difficulty: "Intermediate",
  tags: ["Boosting", "Sequential Learning", "Weak Learner"],
  learn: {
    opening:
      "Boosting creates an ensemble sequentially. Each new learner is added to improve the mistakes of the current combined model.",
    sections: [
      {
        title: "Sequential Correction",
        paragraphs: [
          "Bagging trains independent models in parallel. Boosting trains one learner after another. Later learners pay more attention to observations or residuals that the current ensemble handles poorly.",
          "Small decision trees are common weak learners. Each one may be simple, but their weighted sum can represent a strong nonlinear model.",
        ],
        visual: {
          src: "/notes/machine-learning/boosting-sequential-correction.png",
          alt: "Boosting sequence where successive weak learners correct errors from the current ensemble",
          width: 1536,
          height: 1024,
          caption:
            "Boosting adds learners one at a time; each addition improves the current ensemble.",
        },
      },
      {
        title: "Bagging vs Boosting",
        paragraphs: ["The main difference is whether learners are fitted independently or added in a dependent sequence."],
        table: {
          headers: ["Bagging", "Boosting"],
          rows: [
            ["Models train independently", "Models train sequentially"],
            ["Bootstrap samples", "Focus changes with current errors"],
            ["Mainly reduces variance", "Can reduce bias and build complex fits"],
            ["Easy to parallelize", "Order matters"],
          ],
        },
      },
      {
        title: "Weighted Prediction",
        paragraphs: [
          "Boosting combines learners using weights. A learner with greater assigned influence contributes more to the final score.",
        ],
        formulas: [
          {
            label: "Weighted ensemble score",
            expression: "F(x) = Σₘ αₘhₘ(x)",
            note: "hₘ is learner m and αₘ is its contribution weight.",
          },
        ],
        problems: [
          {
            title: "Calculate a boosted score",
            prompt:
              "Three learners return h(x)=[+1,−1,+1] with weights α=[0.5,0.2,0.3]. Find the final sign.",
            steps: [
              "F(x)=0.5(+1)+0.2(−1)+0.3(+1).",
              "F(x)=0.5−0.2+0.3=0.6.",
              "The score is positive.",
            ],
            answer: "The ensemble predicts class +1.",
          },
        ],
      },
      {
        title: "Control Overfitting",
        paragraphs: ["Control learner complexity and the number of correction steps using validation."],
        points: [
          "Use a small learning rate so every new learner makes a limited correction.",
          "Control tree depth so individual learners remain suitably simple.",
          "Choose the number of learners using validation or cross-validation.",
          "Noisy labels and outliers can attract excessive attention.",
        ],
      },
    ],
    mechanism: {
      title: "Boosting workflow",
      steps: [
        "Start with a simple prediction.",
        "Measure current mistakes or residuals.",
        "Train a weak learner to improve those mistakes.",
        "Add its weighted prediction to the ensemble.",
        "Repeat for a validated number of learners.",
      ],
    },
    example: {
      title: "Successive corrections",
      body: "The first small tree captures the broad pattern. Later trees focus on remaining errors, and their weighted contributions refine the final prediction.",
    },
    misconception:
      "Boosting is not automatically immune to overfitting. Excessive depth, too many learners, or noisy labels can still produce a poor model.",
  },
  revise: {
    definitionLabel: "Core Idea",
    compactDefinition: true,
    definition:
      "Boosting adds weak learners sequentially so each new learner improves the errors of the current ensemble.",
    sections: [
      {
        title: "Flow",
        flow: ["Current model", "Find errors", "Train next learner", "Add weighted correction", "Repeat"],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Training is sequential.",
      "Order matters.",
      "Final prediction is a weighted combination.",
      "Learning rate, learner depth, and learner count control complexity.",
    ],
    followUp: "What is the main training difference between bagging and boosting?",
  },
  lastMinute: {
    definition: "Add simple learners one by one to correct current errors.",
    sections: [
      {
        title: "Control",
        points: ["Small learners", "Learning rate", "Number of learners", "Validate"],
      },
    ],
    memoryLine: "Bagging builds independently; boosting corrects sequentially.",
    cues: ["Weighted combination.", "Later learners depend on earlier errors."],
    trap: "Do not say boosting models train independently in parallel.",
  },
};
