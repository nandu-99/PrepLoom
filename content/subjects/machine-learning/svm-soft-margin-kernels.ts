import type { SubjectTopic } from "@/lib/subject-content";

export const softMarginHingeLossAndC: SubjectTopic = {
  slug: "soft-margin-hinge-loss-and-c",
  title: "Soft Margin, Hinge Loss, and C",
  description:
    "Allow controlled margin violations using slack variables, hinge loss, and the regularization parameter C.",
  readTime: "18 min",
  difficulty: "Intermediate",
  tags: ["Soft Margin", "Hinge Loss", "C"],
  learn: {
    opening:
      "Real classes often overlap. Soft-margin SVM allows some points to enter the margin or cross the boundary while still trying to keep the margin wide.",
    sections: [
      {
        title: "Slack Variables",
        paragraphs: [
          "Each slack variable ξᵢ measures how much example i violates its required margin. ξᵢ=0 means no violation, 0<ξᵢ<1 means the point is inside the margin but still correctly classified, ξᵢ=1 places it on the decision boundary, and ξᵢ>1 means it is misclassified.",
        ],
        formulas: [
          { label: "Soft-margin constraint", expression: "yᵢ(wᵀxᵢ+b) ≥ 1−ξᵢ" },
          { label: "Slack condition", expression: "ξᵢ ≥ 0" },
        ],
        dataTable: {
          headers: ["Functional margin yᵢf(xᵢ)", "Slack needed", "Meaning"],
          rows: [
            ["≥ 1", "0", "Correct and outside/on margin"],
            ["Between 0 and 1", "Between 0 and 1", "Correct but inside margin"],
            ["< 0", "> 1", "Misclassified"],
            ["= 0", "At least 1", "On boundary; class tie depends on implementation"],
          ],
        },
      },
      {
        title: "Hinge Loss",
        paragraphs: [
          "Hinge loss is zero only when a point is correctly classified with functional margin at least 1. It increases linearly for margin violations and misclassifications.",
        ],
        formulas: [{ label: "Hinge loss", expression: "Lhinge = max(0, 1−y f(x))" }],
        visual: {
          src: "/notes/machine-learning/svm-soft-margin-hinge-loss.png",
          alt: "Soft-margin SVM showing correctly classified points, margin violations, misclassification, and hinge loss",
          width: 1536,
          height: 1024,
          caption: "Hinge loss is zero beyond the correct margin and positive for points that violate it.",
        },
      },
      {
        title: "Hinge-Loss Numerical",
        paragraphs: ["First multiply the true label by the score, then compare the result with the required margin value 1."],
        problems: [
          {
            title: "Calculate three losses",
            prompt: "Find hinge loss for: A has y=+1, f(x)=1.3; B has y=+1, f(x)=0.4; C has y=−1, f(x)=0.5.",
            steps: [
              "A: yf(x)=1(1.3)=1.3, so loss=max(0,1−1.3)=0.",
              "B: yf(x)=1(0.4)=0.4, so loss=max(0,1−0.4)=0.6.",
              "C: yf(x)=(−1)(0.5)=−0.5, so loss=max(0,1−(−0.5))=1.5.",
            ],
            answer: "The hinge losses are A=0, B=0.6, and C=1.5.",
          },
        ],
      },
      {
        title: "The Soft-Margin Objective",
        paragraphs: [
          "Training balances two goals: keep ||w|| small for a wide margin and keep the total violation penalty small. C controls the importance of the violations relative to margin width.",
        ],
        formulas: [
          { label: "Slack-variable form", expression: "min (1/2)||w||² + CΣᵢξᵢ" },
          { label: "Hinge-loss form", expression: "min (1/2)||w||² + CΣᵢmax(0,1−yᵢf(xᵢ))" },
        ],
      },
      {
        title: "Effect of C",
        table: {
          headers: ["Smaller C", "Larger C"],
          rows: [
            ["Weaker violation penalty", "Stronger violation penalty"],
            ["More margin violations allowed", "Fewer violations preferred"],
            ["Often wider, smoother margin", "Often narrower, more fitted margin"],
            ["Can underfit", "Can overfit or react to outliers"],
          ],
        },
        paragraphs: [
          "C is an inverse regularization-strength parameter: larger C means weaker regularization of complexity through the margin term relative to training violations. Select it with validation or cross-validation.",
        ],
      },
      {
        title: "Hard Margin vs Soft Margin",
        paragraphs: ["Soft margin is normally preferred for real datasets because perfect separation is rare."],
        dataTable: {
          headers: ["Property", "Hard margin", "Soft margin"],
          rows: [
            ["Violations", "Not allowed", "Penalized but allowed"],
            ["Suitable data", "Perfectly separable", "Overlapping/noisy"],
            ["Outlier sensitivity", "Very high", "Controlled using C"],
            ["Practical use", "Limited", "Common"],
          ],
        },
      },
    ],
    mechanism: {
      title: "Soft-margin trade-off",
      steps: [
        "Calculate each functional margin yᵢf(xᵢ).",
        "Assign zero loss when it is at least 1.",
        "Penalize points inside or across the margin.",
        "Combine the violation penalty with the margin-width objective.",
        "Use C to control the trade-off.",
      ],
    },
    example: {
      title: "Noisy measurements",
      body: "A mislabeled or unusual medical record should not force the separator to twist around one point. A validated soft-margin setting can accept that violation while preserving a useful boundary.",
    },
    misconception:
      "A correctly classified point can still have positive hinge loss when it lies inside the required margin.",
  },
  revise: {
    definitionLabel: "Controlled Violations",
    compactDefinition: true,
    definition:
      "Soft-margin SVM allows penalized violations; hinge loss measures them and C controls their importance.",
    sections: [
      {
        title: "Essential Formulas",
        formulas: [
          { label: "Constraint", expression: "yᵢf(xᵢ)≥1−ξᵢ" },
          { label: "Hinge loss", expression: "max(0,1−yᵢf(xᵢ))" },
          { label: "Objective", expression: "(1/2)||w||²+CΣξᵢ" },
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "ξ=0 means no margin violation.",
      "0<ξ<1 means correct but inside the margin.",
      "ξ>1 means misclassified.",
      "Larger C penalizes violations more strongly.",
      "Tune C using validation, not test data.",
    ],
    followUp: "Why can a smaller C improve test performance on noisy data?",
  },
  lastMinute: {
    definition: "Allow violations, penalize them, and balance them against margin width.",
    sections: [
      { title: "Loss", flow: ["Compute yf", "1−yf", "Take max with 0"], wide: true },
      { title: "C", points: ["Small C: tolerate more", "Large C: penalize more", "Validate C"] },
    ],
    memoryLine: "Hinge measures the violation; C prices the violation.",
    cues: ["Loss zero only when yf≥1.", "Soft margin handles overlap.", "Large C is not always better."],
    trap: "Do not use sign correctness alone when calculating hinge loss.",
  },
};

export const kernelTrickAndNonlinearSvm: SubjectTopic = {
  slug: "kernel-trick-and-nonlinear-svm",
  title: "Kernel Trick and Nonlinear SVM",
  description:
    "Create nonlinear boundaries by evaluating feature-space similarities without explicitly building every mapped feature.",
  readTime: "17 min",
  difficulty: "Intermediate",
  tags: ["Kernel Trick", "Feature Mapping", "Nonlinear SVM"],
  learn: {
    opening:
      "A straight boundary cannot separate every dataset. A kernel SVM acts like a linear separator in a transformed feature space, which becomes a nonlinear boundary in the original space.",
    sections: [
      {
        title: "From Input Space to Feature Space",
        paragraphs: [
          "A feature map φ(x) creates new coordinates from the original input. Data that overlaps under a straight line in the input space may become linearly separable after this transformation.",
          "When the separator is mapped back to the original space, it can appear curved or form closed regions.",
        ],
        visual: {
          src: "/notes/machine-learning/svm-kernel-feature-map.png",
          alt: "Nonlinearly arranged input points mapped to a higher-dimensional feature space where a hyperplane separates them",
          width: 1536,
          height: 1024,
          caption: "A nonlinear boundary in input space can correspond to a linear hyperplane in feature space.",
        },
      },
      {
        title: "The Kernel Function",
        paragraphs: [
          "SVM training can be written using dot products between examples. A kernel replaces the ordinary dot product with the dot product of their mapped representations.",
        ],
        formulas: [{ label: "Kernel identity", expression: "K(x,z) = φ(x)ᵀφ(z)" }],
      },
      {
        title: "Why It Is Called a Trick",
        paragraphs: [
          "The kernel directly calculates the required feature-space similarity. The algorithm can use that value without explicitly constructing every coordinate of φ(x).",
          "This can make a very large or even conceptually infinite feature mapping practical, but kernel training can still be expensive when the number of training examples is large.",
        ],
      },
      {
        title: "Feature-Map Numerical",
        paragraphs: ["A small explicit mapping can verify what a kernel value represents."],
        problems: [
          {
            title: "Verify a simple kernel",
            prompt: "Let φ(x)=[x,x²]. For x=−2 and z=3, calculate φ(x)ᵀφ(z). Then verify K(x,z)=xz+(xz)².",
            steps: [
              "φ(−2)=[−2,4] and φ(3)=[3,9].",
              "φ(−2)ᵀφ(3)=(−2)(3)+(4)(9)=−6+36=30.",
              "xz=(−2)(3)=−6, so K(x,z)=−6+(−6)²=−6+36=30.",
            ],
            answer: "Both calculations give 30, so the kernel reproduces the mapped-space dot product.",
          },
        ],
      },
      {
        title: "Kernel Matrix",
        paragraphs: [
          "For n training examples, the kernel matrix stores pairwise similarities K(xᵢ,xⱼ). It is symmetric for the standard kernels used by SVMs.",
          "Storing many pairwise values can require memory proportional to n², which is one reason nonlinear kernel SVMs can struggle on very large datasets.",
        ],
        formulas: [{ label: "Kernel matrix entry", expression: "Kᵢⱼ = K(xᵢ,xⱼ)" }],
      },
      {
        title: "Linear vs Kernel SVM",
        paragraphs: ["Use nonlinear flexibility only when validation shows that it is needed."],
        table: {
          headers: ["Linear SVM", "Kernel SVM"],
          rows: [
            ["Straight hyperplane in input features", "Nonlinear boundary in input space"],
            ["Often suitable for high-dimensional sparse data", "Useful when nonlinear structure is real"],
            ["Usually scales better with samples", "Can require large kernel matrix"],
            ["Fewer major hyperparameters", "Kernel-specific hyperparameters"],
          ],
        },
      },
    ],
    mechanism: {
      title: "Kernel-SVM idea",
      steps: [
        "Choose a kernel K.",
        "Calculate similarities between training examples.",
        "Learn a maximum-margin separator using those similarities.",
        "Evaluate similarities between support vectors and a new input.",
        "Produce a nonlinear decision boundary in the original space.",
      ],
    },
    example: {
      title: "Concentric classes",
      body: "A straight line cannot separate a central cluster from a surrounding ring. A suitable nonlinear feature mapping can make radius information available and allow linear separation in feature space.",
    },
    misconception:
      "The kernel trick does not make training free. It avoids explicit feature construction, but pairwise kernel computation can still be costly.",
  },
  revise: {
    definitionLabel: "Kernel Trick",
    compactDefinition: true,
    definition:
      "A kernel computes φ(x)ᵀφ(z) directly, allowing an SVM to learn nonlinear input-space boundaries.",
    sections: [
      {
        title: "Core Relationship",
        formulas: [{ label: "Kernel", expression: "K(x,z)=φ(x)ᵀφ(z)" }],
      },
      {
        title: "Spaces",
        table: {
          headers: ["Input space", "Feature space"],
          rows: [["May not be linearly separable", "May be linearly separable"], ["Boundary appears nonlinear", "Separator is a hyperplane"]],
        },
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Kernel values act as mapped-space dot products.",
      "The explicit mapping need not be constructed.",
      "A linear feature-space separator can look nonlinear in input space.",
      "Kernel choice changes the allowed boundary shape.",
      "Kernel matrices can be costly for large n.",
    ],
    followUp: "Why can a kernel SVM create a curved boundary without explicitly adding curved features?",
  },
  lastMinute: {
    definition: "Compute feature-space similarity directly and separate there.",
    sections: [
      { title: "Flow", flow: ["Input x", "Kernel K", "Feature-space similarity", "Linear separator", "Nonlinear boundary"], wide: true },
      { title: "Cost", points: ["Avoid explicit φ", "Pairwise values remain", "Large n can be slow"] },
    ],
    memoryLine: "Kernel computes the mapped dot product without showing the map.",
    cues: ["K(x,z)=φ(x)ᵀφ(z).", "Nonlinear outside, linear inside.", "Scale still matters."],
    trap: "Do not say the kernel explicitly converts and stores every higher-dimensional feature.",
  },
};
