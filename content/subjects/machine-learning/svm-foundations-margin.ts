import type { SubjectTopic } from "@/lib/subject-content";

export const svmFundamentalsAndHyperplanes: SubjectTopic = {
  slug: "svm-fundamentals-and-hyperplanes",
  title: "SVM Fundamentals and Hyperplanes",
  description:
    "Understand binary SVM classification, decision scores, hyperplanes, class labels, and prediction.",
  readTime: "16 min",
  difficulty: "Intermediate",
  tags: ["SVM", "Hyperplane", "Decision Function"],
  learn: {
    opening:
      "A Support Vector Machine separates classes with a decision boundary. It does not choose just any separating boundary: training later searches for one with a large safety gap between the classes.",
    sections: [
      {
        title: "Binary Classification Setup",
        paragraphs: [
          "For the standard SVM formulation, each training row has features xᵢ and a label yᵢ in {−1,+1}. The model learns a weight vector w and bias b.",
          "The sign of the decision score gives the predicted class. The size of the score indicates which side of the boundary the point lies on, but it is not automatically a probability.",
        ],
        formulas: [
          { label: "Decision score", expression: "f(x) = wᵀx + b" },
          { label: "Class prediction", expression: "ŷ = sign(f(x))" },
        ],
      },
      {
        title: "The Separating Hyperplane",
        paragraphs: [
          "The decision boundary contains every point whose score is zero. In two dimensions it is a line, in three dimensions it is a plane, and in more dimensions it is called a hyperplane.",
          "The vector w is perpendicular to the hyperplane. Changing b shifts the boundary without changing its orientation.",
        ],
        formulas: [{ label: "Decision boundary", expression: "wᵀx + b = 0" }],
        visual: {
          src: "/notes/machine-learning/svm-hyperplane-prediction.png",
          alt: "Two SVM classes separated by a hyperplane with positive and negative decision regions",
          width: 1536,
          height: 1024,
          caption: "The sign of wᵀx+b selects the side of the hyperplane and therefore the predicted class.",
        },
      },
      {
        title: "Prediction Numerical",
        paragraphs: ["Apply the learned score directly to a new, already transformed input."],
        problems: [
          {
            title: "Calculate the SVM class",
            prompt: "An SVM has w = [2,−1], b = −1, and input x = [3,2]. Find the decision score and predicted class.",
            steps: [
              "f(x) = wᵀx + b.",
              "f(x) = 2(3) + (−1)(2) − 1 = 6 − 2 − 1 = 3.",
              "The score is positive, so sign(3) = +1.",
            ],
            answer: "The decision score is 3 and the predicted class is +1.",
          },
        ],
      },
      {
        title: "What the Score Means",
        dataTable: {
          headers: ["Decision score", "Location", "Prediction"],
          rows: [
            ["f(x) > 0", "Positive side", "+1"],
            ["f(x) < 0", "Negative side", "−1"],
            ["f(x) = 0", "On the boundary", "Tie handled by implementation"],
          ],
        },
        paragraphs: [
          "A raw score farther from zero usually means the point is farther from the boundary after accounting for the scale of w. To obtain actual geometric distance, divide the absolute score by ||w||.",
        ],
      },
      {
        title: "Why Feature Scaling Matters",
        paragraphs: [
          "SVM geometry uses dot products and distances. A feature measured in very large units can dominate a feature with a small numerical range.",
          "Fit the scaler only on training data and apply the same fitted transformation to validation, test, and future inputs. This prevents leakage and keeps prediction consistent.",
        ],
        table: {
          headers: ["Before scaling", "After scaling"],
          rows: [
            ["Income: 0 to 1,000,000", "Comparable numerical range"],
            ["Debt ratio: 0 to 1", "Comparable numerical range"],
            ["Income can dominate geometry", "Both features can influence the boundary"],
          ],
        },
      },
      {
        title: "SVM Terminology",
        paragraphs: ["These terms describe the same classifier from algebraic and geometric viewpoints."],
        dataTable: {
          headers: ["Term", "Meaning"],
          rows: [
            ["Hyperplane", "Decision boundary wᵀx+b=0"],
            ["Decision score", "Signed value wᵀx+b"],
            ["Normal vector", "w, perpendicular to the boundary"],
            ["Bias", "b, shifts the boundary"],
            ["Support vectors", "Closest influential training points"],
          ],
        },
      },
    ],
    mechanism: {
      title: "SVM prediction flow",
      steps: [
        "Apply the fitted feature transformation.",
        "Calculate wᵀx+b for a linear SVM.",
        "Check the sign of the score.",
        "Return +1 for a positive score or −1 for a negative score.",
      ],
    },
    example: {
      title: "Spam classification",
      body: "A linear SVM can combine word-frequency features into one score. A positive score may predict spam and a negative score may predict not spam.",
    },
    misconception:
      "The raw SVM decision score is not a probability. Probability estimates require an additional calibration step.",
  },
  revise: {
    definitionLabel: "Core Classifier",
    compactDefinition: true,
    definition:
      "An SVM predicts from the sign of wᵀx+b, whose zero set forms the separating hyperplane.",
    sections: [
      {
        title: "Essential Formulas",
        formulas: [
          { label: "Score", expression: "f(x)=wᵀx+b" },
          { label: "Boundary", expression: "wᵀx+b=0" },
          { label: "Prediction", expression: "sign(f(x))" },
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Standard binary labels are −1 and +1.",
      "w controls boundary orientation; b shifts it.",
      "Positive and negative scores lie on opposite sides.",
      "The raw score is not a probability.",
      "Scale features using training-data statistics.",
    ],
    followUp: "Why does changing the scale of one feature change an SVM boundary?",
  },
  lastMinute: {
    definition: "SVM uses the sign of a hyperplane score to classify a point.",
    sections: [
      { title: "Prediction", flow: ["Scale x", "Compute wᵀx+b", "Check sign", "Return class"], wide: true },
      { title: "Signs", points: ["Positive → +1", "Negative → −1", "Zero → boundary"] },
    ],
    memoryLine: "Score gives the side; the side gives the class.",
    cues: ["Boundary score is zero.", "w is normal to the hyperplane.", "Score is not probability."],
    trap: "Do not skip feature scaling for distance-based SVM geometry.",
  },
};

export const maximumMarginAndSupportVectors: SubjectTopic = {
  slug: "maximum-margin-and-support-vectors",
  title: "Maximum Margin and Support Vectors",
  description:
    "Understand margin geometry, support vectors, canonical boundaries, and the maximum-margin objective.",
  readTime: "17 min",
  difficulty: "Intermediate",
  tags: ["Maximum Margin", "Support Vectors", "Geometry"],
  learn: {
    opening:
      "Many hyperplanes may separate the training classes. A hard-margin SVM chooses the one with the largest distance to the nearest examples from both classes.",
    sections: [
      {
        title: "Why Maximize the Margin?",
        paragraphs: [
          "The margin is the empty band around the decision boundary. A wider margin gives the closest training examples more room before a small change would move them across the boundary.",
          "Maximizing this margin often improves generalization, but only when the data and chosen SVM assumptions are suitable.",
        ],
        visual: {
          src: "/notes/machine-learning/svm-margin-support-vectors.png",
          alt: "Maximum-margin SVM showing decision boundary, two margin boundaries, and support vectors",
          width: 1536,
          height: 1024,
          caption: "Support vectors touch the margin boundaries and determine the maximum-margin separator.",
        },
      },
      {
        title: "Canonical Margin Boundaries",
        paragraphs: [
          "The model can be scaled so the nearest positive examples satisfy wᵀx+b=+1 and the nearest negative examples satisfy wᵀx+b=−1. The central decision boundary is wᵀx+b=0.",
          "Under this scaling, the distance from the central boundary to either margin boundary is 1/||w||, so the full margin width is 2/||w||.",
        ],
        formulas: [
          { label: "Class constraints", expression: "yᵢ(wᵀxᵢ+b) ≥ 1" },
          { label: "One-sided margin", expression: "1/||w||" },
          { label: "Full margin width", expression: "2/||w||" },
        ],
      },
      {
        title: "Support Vectors",
        paragraphs: [
          "Support vectors are the closest influential training examples. In the ideal hard-margin case they lie on one of the two margin boundaries and satisfy yᵢ(wᵀxᵢ+b)=1.",
          "Points well outside the margin usually do not change the optimal separator. Moving or removing a support vector can change the learned boundary.",
          "In a soft-margin SVM, points on or inside the margin—including misclassified points—can also be support vectors.",
        ],
      },
      {
        title: "Margin and Distance Numerical",
        paragraphs: ["The norm of w converts functional scores into geometric distances."],
        problems: [
          {
            title: "Calculate margin width and point distance",
            prompt: "For w=[3,4] and b=−10, find ||w||, the canonical full margin width, and the distance of x=[2,2] from the decision boundary.",
            steps: [
              "||w|| = √(3²+4²) = 5.",
              "Full canonical margin width = 2/||w|| = 2/5 = 0.4.",
              "f(x) = 3(2)+4(2)−10 = 4.",
              "Distance to the hyperplane = |f(x)|/||w|| = 4/5 = 0.8.",
            ],
            answer: "The norm is 5, the full margin width is 0.4, and the point is 0.8 units from the boundary.",
          },
        ],
        formulas: [{ label: "Point-to-hyperplane distance", expression: "distance = |wᵀx+b|/||w||" }],
      },
      {
        title: "Hard-Margin Optimization",
        paragraphs: [
          "Maximizing 2/||w|| is equivalent to minimizing (1/2)||w||² while requiring every training example to remain on the correct side of its margin boundary.",
        ],
        formulas: [
          { label: "Hard-margin objective", expression: "min (1/2)||w||²" },
          { label: "Subject to", expression: "yᵢ(wᵀxᵢ+b) ≥ 1 for every i" },
        ],
      },
      {
        title: "When Hard Margin Fails",
        paragraphs: [
          "A hard-margin separator requires perfectly linearly separable training data. One overlapping point or outlier can make the constraints impossible or produce an unhelpful narrow margin.",
          "Soft-margin SVM handles this by allowing controlled violations and penalizing them during training.",
        ],
      },
    ],
    mechanism: {
      title: "Maximum-margin idea",
      steps: [
        "Find candidate separating hyperplanes.",
        "Locate the closest example on each side.",
        "Measure the gap between the margin boundaries.",
        "Choose the feasible hyperplane with the widest gap.",
        "The closest influential examples become support vectors.",
      ],
    },
    example: {
      title: "Stable separator",
      body: "If two lines classify the training points correctly, the line with more space to the nearest points is less likely to change its prediction after a small measurement error.",
    },
    misconception:
      "The margin is not the distance between the average members of the classes. It is controlled by the closest influential training points.",
  },
  revise: {
    definitionLabel: "Maximum Margin",
    compactDefinition: true,
    definition:
      "An SVM chooses a separator whose nearest class points are as far from the boundary as possible.",
    sections: [
      {
        title: "Essential Formulas",
        formulas: [
          { label: "Constraint", expression: "yᵢ(wᵀxᵢ+b)≥1" },
          { label: "Margin width", expression: "2/||w||" },
          { label: "Distance", expression: "|wᵀx+b|/||w||" },
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Central boundary has score 0.",
      "Canonical margin boundaries have scores −1 and +1.",
      "Support vectors are the closest influential points.",
      "Smaller ||w|| means a wider canonical margin.",
      "Hard margin requires perfect linear separation.",
    ],
    followUp: "Why do distant training points usually not determine the SVM boundary?",
  },
  lastMinute: {
    definition: "Choose the separating hyperplane with the widest nearest-point gap.",
    sections: [
      { title: "Geometry", flow: ["−1 margin", "Boundary 0", "+1 margin"], wide: true },
      { title: "Anchors", points: ["Width = 2/||w||", "Support vectors touch margins", "Hard margin: no violations"] },
    ],
    memoryLine: "Nearest points support the widest safe boundary.",
    cues: ["w is perpendicular.", "Minimize ||w||².", "Distance divides by ||w||."],
    trap: "Do not call every training point a support vector.",
  },
};
