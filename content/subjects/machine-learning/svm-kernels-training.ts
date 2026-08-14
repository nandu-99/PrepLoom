import type { SubjectTopic } from "@/lib/subject-content";

export const commonSvmKernels: SubjectTopic = {
  slug: "common-svm-kernels",
  title: "Linear, Polynomial, and RBF Kernels",
  description:
    "Compare the essential SVM kernels and understand gamma, degree, similarity, and boundary complexity.",
  readTime: "18 min",
  difficulty: "Intermediate",
  tags: ["Linear Kernel", "Polynomial Kernel", "RBF Kernel"],
  learn: {
    opening:
      "The kernel defines what similarity means to the SVM and therefore which decision-boundary shapes it can learn. Linear, polynomial, and RBF are the essential choices.",
    sections: [
      {
        title: "Linear Kernel",
        paragraphs: [
          "The linear kernel is the ordinary dot product. It is a strong starting point when the data is approximately linearly separable or has many sparse features, such as word counts.",
        ],
        formulas: [{ label: "Linear kernel", expression: "K(x,z)=xᵀz" }],
      },
      {
        title: "Polynomial Kernel",
        paragraphs: [
          "The polynomial kernel represents interactions up to a selected degree. Higher degree allows more curved boundaries but increases the risk of fitting noise.",
        ],
        formulas: [
          { label: "Polynomial kernel", expression: "K(x,z)=(γxᵀz+r)ᵈ" },
        ],
        dataTable: {
          headers: ["Parameter", "Role"],
          rows: [
            ["d", "Polynomial degree"],
            ["γ", "Scale applied to the dot product"],
            ["r", "Independent offset"],
          ],
        },
      },
      {
        title: "RBF or Gaussian Kernel",
        paragraphs: [
          "The RBF kernel gives high similarity to nearby points and similarity approaching zero as squared distance grows. It can create flexible local boundaries and is a common nonlinear default.",
        ],
        formulas: [
          { label: "RBF kernel", expression: "K(x,z)=exp(−γ||x−z||²)" },
        ],
        visual: {
          src: "/notes/machine-learning/svm-kernel-comparison.png",
          alt: "Linear, polynomial, and RBF SVM kernels compared through their formulas and boundary shapes",
          width: 1536,
          height: 1024,
          caption:
            "Kernel choice and its hyperparameters control the complexity and shape of the SVM boundary.",
        },
      },
      {
        title: "Kernel Numerical",
        paragraphs: [
          "The three kernels can return very different similarity values for the same pair of inputs.",
        ],
        problems: [
          {
            title: "Calculate three kernel values",
            prompt:
              "For x=[1,2] and z=[2,0], calculate the linear kernel; polynomial kernel with γ=1, r=1, d=2; and RBF kernel with γ=1.",
            steps: [
              "xᵀz=1(2)+2(0)=2, so Klinear=2.",
              "Kpoly=(1·2+1)²=3²=9.",
              "||x−z||²=(1−2)²+(2−0)²=1+4=5.",
              "KRBF=exp(−1·5)=e⁻⁵≈0.0067.",
            ],
            answer:
              "The kernel values are linear=2, polynomial=9, and RBF≈0.0067.",
          },
        ],
      },
      {
        title: "Effect of Gamma in RBF",
        table: {
          headers: ["Smaller γ", "Larger γ"],
          rows: [
            [
              "Each point influences a wider region",
              "Each point influences a narrow region",
            ],
            ["Smoother boundary", "More local, complex boundary"],
            ["Can underfit", "Can overfit"],
          ],
        },
        paragraphs: [
          "Gamma and C interact. A flexible high-gamma boundary combined with a strong violation penalty can fit training details very closely, so tune them together using validation.",
        ],
      },
      {
        title: "Choosing a Kernel",
        dataTable: {
          headers: ["Situation", "Reasonable starting point"],
          rows: [
            ["Many sparse features", "Linear"],
            ["Known interaction degree", "Polynomial"],
            ["Nonlinear boundary with no specific shape", "RBF"],
          ],
        },
        paragraphs: [
          "Do not select a kernel from training accuracy alone. Compare a small justified set using cross-validation, with all scaling fitted inside each training fold.",
        ],
      },
    ],
    mechanism: {
      title: "Kernel-selection reasoning",
      steps: [
        "Scale the input features.",
        "Start with the simplest justified kernel.",
        "Choose candidate C and kernel-specific settings.",
        "Compare candidates with cross-validation.",
        "Lock the chosen configuration before final testing.",
      ],
    },
    example: {
      title: "Text versus concentric groups",
      body: "A linear SVM often works well for sparse word vectors. An RBF SVM is more suitable when two numerical classes form compact nonlinear regions.",
    },
    misconception:
      "RBF is not automatically better than linear. Extra flexibility can increase cost and overfitting without improving validation performance.",
  },
  revise: {
    definitionLabel: "Kernel Choices",
    compactDefinition: true,
    definition:
      "Linear uses a dot product, polynomial models degree-based interactions, and RBF measures local distance-based similarity.",
    sections: [
      {
        title: "Essential Formulas",
        formulas: [
          { label: "Linear", expression: "xᵀz" },
          { label: "Polynomial", expression: "(γxᵀz+r)ᵈ" },
          { label: "RBF", expression: "exp(−γ||x−z||²)" },
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Linear is simple and effective for many sparse features.",
      "Degree controls polynomial complexity.",
      "RBF similarity decreases with distance.",
      "Large γ makes influence more local.",
      "Tune C and γ together for RBF.",
    ],
    followUp: "Why can a very large RBF gamma cause overfitting?",
  },
  lastMinute: {
    definition:
      "The kernel controls similarity and the allowed boundary shape.",
    sections: [
      {
        title: "Match",
        points: ["Linear: dot product", "Polynomial: degree", "RBF: distance"],
      },
      {
        title: "RBF γ",
        points: ["Small: broad and smooth", "Large: local and complex"],
      },
    ],
    memoryLine: "Linear compares direction; RBF compares closeness.",
    cues: [
      "RBF uses squared distance.",
      "Degree belongs to polynomial.",
      "Validate kernel settings.",
    ],
    trap: "Do not interpret a larger gamma as stronger regularization.",
  },
};

export const svmTrainingTuningAndEvaluation: SubjectTopic = {
  slug: "svm-training-tuning-and-evaluation",
  title: "SVM Training, Tuning, and Evaluation",
  description:
    "Build a leakage-safe SVM workflow, tune essential hyperparameters, handle multiple classes, and understand practical trade-offs.",
  readTime: "18 min",
  difficulty: "Intermediate",
  tags: ["SVM Workflow", "Hyperparameters", "Evaluation"],
  learn: {
    opening:
      "A correct SVM formula is not enough. Reliable performance depends on leakage-safe scaling, justified hyperparameter tuning, suitable evaluation metrics, and awareness of computational limits.",
    sections: [
      {
        title: "Leakage-Safe Training Workflow",
        paragraphs: [
          "Split the data before fitting a scaler. During cross-validation, the scaler must be fitted separately on each training fold and then applied to that fold's validation portion.",
          "A pipeline keeps scaling and the SVM together so the same learned transformation is used during validation, testing, and future prediction.",
        ],
        visual: {
          src: "/notes/machine-learning/svm-training-workflow.png",
          alt: "Leakage-safe SVM workflow with training split, scaling, cross-validation, tuning, and final test evaluation",
          width: 1536,
          height: 1024,
          caption:
            "Fit preprocessing only on training data inside every validation fold.",
        },
      },
      {
        title: "Essential Hyperparameters",
        dataTable: {
          headers: ["Hyperparameter", "Where used", "Main effect"],
          rows: [
            ["C", "All soft-margin SVMs", "Penalty for margin violations"],
            ["kernel", "Kernel SVM", "Allowed similarity and boundary shape"],
            [
              "γ",
              "RBF and polynomial",
              "Similarity reach or dot-product scale",
            ],
            ["degree", "Polynomial", "Polynomial interaction degree"],
          ],
        },
        paragraphs: [
          "Tune only parameters that belong to the selected kernel. For example, polynomial degree is irrelevant to a linear or RBF kernel.",
        ],
      },
      {
        title: "Model-Selection Numerical",
        paragraphs: [
          "Compare hyperparameter candidates using the chosen validation metric, not training performance.",
        ],
        dataTable: {
          headers: ["Candidate", "Kernel", "C", "γ", "Mean validation F1"],
          rows: [
            ["A", "Linear", "1", "—", "0.84"],
            ["B", "RBF", "1", "0.1", "0.88"],
            ["C", "RBF", "100", "10", "0.79"],
          ],
        },
        problems: [
          {
            title: "Choose the validated SVM",
            prompt:
              "Which candidate should be selected from the table, and what does Candidate C suggest?",
            steps: [
              "Candidate B has the highest mean validation F1, 0.88.",
              "Candidate C uses large C and large γ but performs worse on validation data.",
              "Its flexible local boundary and strong violation penalty may be fitting training details too closely.",
            ],
            answer:
              "Choose Candidate B, lock its settings, and evaluate it once on the untouched test set.",
          },
        ],
      },
      {
        title: "Multiple Classes",
        paragraphs: [
          "The basic SVM formulation is binary. Libraries extend it to multiple classes by combining several binary classifiers, commonly one-vs-rest or one-vs-one.",
        ],
        table: {
          headers: ["One-vs-rest", "One-vs-one"],
          rows: [
            ["One classifier per class", "One classifier per class pair"],
            ["Class against all others", "Pairwise class comparison"],
            ["Choose strongest class score", "Combine pairwise votes"],
          ],
        },
      },
      {
        title: "Evaluation",
        paragraphs: [
          "Use the same classification metrics introduced earlier: confusion matrix, precision, recall, F1-score, ROC-AUC when appropriate, and class-aware averaging for multiclass data.",
          "Choose the main metric before tuning. Accuracy can hide poor minority-class performance when the dataset is imbalanced.",
        ],
      },
      {
        title: "Strengths and Limitations",
        dataTable: {
          headers: ["Strengths", "Limitations"],
          rows: [
            ["Strong margin-based classifier", "Sensitive to scaling"],
            [
              "Effective in high-dimensional spaces",
              "C, kernel, and γ require tuning",
            ],
            [
              "Linear SVM works well with sparse features",
              "Nonlinear kernel training scales poorly with many rows",
            ],
            [
              "Uses support vectors for the boundary",
              "Raw scores are not probabilities",
            ],
          ],
        },
        paragraphs: [
          "Prediction cost for a kernel SVM depends on how many support vectors must be compared with the new input. A model with many support vectors can be slower at prediction time.",
        ],
      },
      {
        title: "When SVM Is a Good Choice",
        points: [
          "The dataset has a moderate number of rows and a clear margin structure.",
          "There are many useful features, including sparse text features.",
          "A validated nonlinear kernel materially improves over a linear boundary.",
        ],
        paragraphs: [
          "For millions of rows, a nonlinear kernel SVM is often too expensive. A linear model or another scalable algorithm may be more practical.",
        ],
      },
    ],
    mechanism: {
      title: "Reliable SVM workflow",
      steps: [
        "Choose the evaluation metric and split the data.",
        "Fit scaling inside each training fold.",
        "Tune C and only the relevant kernel parameters.",
        "Select using validation or cross-validation.",
        "Refit the locked pipeline on allowed training data.",
        "Evaluate once on untouched test data.",
      ],
    },
    example: {
      title: "Document classification",
      body: "For thousands of sparse word features, start with a scaled or appropriately normalized linear SVM. Use cross-validation before adding a more expensive nonlinear kernel.",
    },
    misconception:
      "The configuration with the largest C or most flexible kernel is not automatically best. Hyperparameters are selected by validation performance.",
  },
  revise: {
    definitionLabel: "Practical Workflow",
    compactDefinition: true,
    definition:
      "Scale without leakage, tune only relevant SVM parameters using validation, and evaluate the locked model once on test data.",
    sections: [
      {
        title: "Tune",
        table: {
          headers: ["Parameter", "Remember"],
          rows: [
            ["C", "Violation penalty"],
            ["γ", "RBF locality"],
            ["degree", "Polynomial only"],
            ["kernel", "Boundary family"],
          ],
        },
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Fit scaling inside each training fold.",
      "Select the main metric before tuning.",
      "Basic SVM is binary; multiclass combines binary models.",
      "Kernel SVM can be expensive for large sample counts.",
      "Many support vectors can slow prediction.",
    ],
    followUp:
      "Why must the scaler be fitted separately inside every cross-validation fold?",
  },
  lastMinute: {
    definition:
      "Scale, validate C and kernel settings, lock them, then test once.",
    sections: [
      {
        title: "Pipeline",
        flow: ["Split", "Scale in fold", "Tune", "Lock", "Test once"],
        wide: true,
      },
      {
        title: "Limits",
        points: [
          "Large n can be slow",
          "Scaling required",
          "No native probability",
        ],
      },
    ],
    memoryLine: "Scale inside the fold; tune before the final test.",
    cues: [
      "C applies to soft margin.",
      "Gamma belongs to RBF/poly.",
      "OvR or OvO handles multiclass.",
    ],
    trap: "Do not fit the scaler on the full dataset before cross-validation.",
  },
};
