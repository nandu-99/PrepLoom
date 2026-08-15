import type { SubjectTopic } from "@/lib/subject-content";

export const clusteringAndKMeansRecap: SubjectTopic = {
  slug: "clustering-and-k-means-recap",
  title: "Clustering and K-Means Recap",
  description:
    "Review hard clustering, centroid updates, within-cluster error, and the limitations that motivate GMM.",
  readTime: "15 min",
  difficulty: "Foundation",
  tags: ["Clustering", "K-Means", "Centroids"],
  learn: {
    opening:
      "Clustering groups examples without supplied class labels. K-Means gives every example to exactly one cluster and represents each cluster by a centroid.",
    sections: [
      {
        title: "Hard Clustering",
        paragraphs: [
          "K-Means is a hard-clustering algorithm: each example receives one cluster ID, not a probability distribution over clusters.",
          "The number of clusters K must be selected before training. Cluster numbers are identifiers only; cluster 1 is not inherently better than cluster 2.",
        ],
        visual: {
          src: "/notes/machine-learning/kmeans-hard-clustering.png",
          alt: "K-Means assignment and centroid update for two clusters",
          width: 1536,
          height: 1024,
          caption:
            "K-Means alternates between assigning each point to one centroid and recomputing centroid means.",
        },
      },
      {
        title: "K-Means Objective",
        paragraphs: [
          "K-Means tries to reduce the total squared distance from every example to the centroid of its assigned cluster. This is called within-cluster sum of squares or inertia.",
        ],
        formulas: [
          {
            label: "K-Means objective",
            expression: "J = Σᵢ ||xᵢ − centroid assigned to xᵢ||²",
            note: "The assigned centroid is also written μ_(cᵢ), where cᵢ is the cluster assigned to example i.",
          },
        ],
      },
      {
        title: "Assignment and Update Steps",
        paragraphs: [
          "Training repeatedly performs two operations until assignments or centroids stop changing enough.",
        ],
        dataTable: {
          headers: ["Step", "Operation", "Result"],
          rows: [
            [
              "Assignment",
              "Choose nearest centroid",
              "One cluster per example",
            ],
            [
              "Update",
              "Average examples in each cluster",
              "New centroid positions",
            ],
          ],
        },
      },
      {
        title: "Complete One-Dimensional Numerical",
        paragraphs: [
          "A small example shows one complete assignment and centroid update.",
        ],
        problems: [
          {
            title: "Perform one K-Means iteration",
            prompt:
              "For points [1,2,8,9], use K=2 with initial centroids μ₁=1 and μ₂=8. Assign points, update centroids, and calculate the final SSE.",
            steps: [
              "Points 1 and 2 are nearer μ₁; points 8 and 9 are nearer μ₂.",
              "New μ₁=(1+2)/2=1.5.",
              "New μ₂=(8+9)/2=8.5.",
              "SSE=(1−1.5)²+(2−1.5)²+(8−8.5)²+(9−8.5)².",
              "SSE=0.25+0.25+0.25+0.25=1.",
            ],
            answer:
              "The clusters are [1,2] and [8,9], the updated centroids are 1.5 and 8.5, and SSE is 1.",
          },
        ],
      },
      {
        title: "Why Scaling Matters",
        paragraphs: [
          "K-Means uses distances, so a feature with a large numerical range can dominate assignments. Fit scaling on the permitted training data before clustering when feature units are not naturally comparable.",
        ],
      },
      {
        title: "Important Limitations",
        points: [
          "Every example receives only one cluster.",
          "Clusters are represented only by their means.",
          "Euclidean distance favours roughly spherical, similarly sized groups.",
          "Outliers can pull centroids away from dense regions.",
          "Different initial centroids can produce different local solutions.",
        ],
        paragraphs: [
          "These limits motivate Gaussian Mixture Models, which describe cluster shape using covariance and return soft membership probabilities.",
        ],
      },
    ],
    mechanism: {
      title: "K-Means training cycle",
      steps: [
        "Choose K initial centroids.",
        "Assign each example to its nearest centroid.",
        "Replace each centroid with its cluster mean.",
        "Repeat assignment and update.",
        "Stop when the solution changes very little.",
      ],
    },
    example: {
      title: "Customer groups",
      body: "K-Means can group customers by spending and visit frequency, but a customer near two groups must still receive only one cluster ID.",
    },
    misconception:
      "K-Means does not discover the one universally correct value of K. K is selected using evidence and domain usefulness.",
  },
  revise: {
    definitionLabel: "Hard Clustering",
    compactDefinition: true,
    definition:
      "K-Means assigns each example to one nearest centroid and updates each centroid to its cluster mean.",
    sections: [
      {
        title: "Cycle",
        flow: ["Initialize", "Assign", "Average", "Repeat", "Stop"],
      },
      {
        title: "Objective",
        formulas: [
          {
            label: "SSE",
            expression: "Σ||xᵢ − centroid assigned to xᵢ||²",
          },
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "K is chosen before training.",
      "Membership is hard: one point, one cluster.",
      "Centroid is the cluster mean.",
      "Scaling changes distance-based assignments.",
      "Initialization can change the final solution.",
    ],
    followUp: "Why can K-Means struggle when two clusters overlap strongly?",
  },
  lastMinute: {
    definition: "Assign to the nearest mean, recompute means, and repeat.",
    sections: [
      {
        title: "Two Steps",
        points: ["Assignment: nearest centroid", "Update: cluster mean"],
      },
      {
        title: "Limits",
        points: [
          "Hard membership",
          "Spherical bias",
          "Initialization-sensitive",
        ],
      },
    ],
    memoryLine: "K-Means assigns hard labels around means.",
    cues: [
      "Minimize within-cluster SSE.",
      "Scale distance features.",
      "K must be selected.",
    ],
    trap: "Do not report K-Means distance as a cluster-membership probability.",
  },
};

export const gaussianDistributionFoundations: SubjectTopic = {
  slug: "gaussian-distribution-foundations",
  title: "Gaussian Distribution Foundations",
  description:
    "Understand univariate and multivariate Gaussian distributions, covariance, and probability density.",
  readTime: "18 min",
  difficulty: "Intermediate",
  tags: ["Gaussian Distribution", "Covariance", "Density"],
  learn: {
    opening:
      "A Gaussian distribution describes where values are concentrated around a mean and how widely they vary. GMM uses one Gaussian distribution for each mixture component.",
    sections: [
      {
        title: "Univariate Gaussian",
        paragraphs: [
          "For one numerical variable, μ sets the centre and σ² sets the variance. The probability density is largest near μ and decreases as x moves away.",
          "A density value is not the probability of one exact continuous value. Probabilities come from the area under the density curve over an interval.",
        ],
        formulas: [
          {
            label: "Gaussian density",
            expression: "N(x|μ,σ²) = [1/(√(2π)σ)] exp(−(x−μ)²/(2σ²))",
          },
        ],
        visual: {
          src: "/notes/machine-learning/gaussian-univariate-multivariate.png",
          alt: "Univariate Gaussian bell curve and multivariate Gaussian covariance ellipses",
          width: 1536,
          height: 1024,
          caption:
            "Mean controls location; variance and covariance control spread, direction, and shape.",
        },
      },
      {
        title: "Mean, Variance, and Standard Deviation",
        dataTable: {
          headers: ["Quantity", "Meaning", "Effect"],
          rows: [
            ["μ", "Mean", "Moves the centre"],
            ["σ²", "Variance", "Controls squared spread"],
            ["σ", "Standard deviation", "Controls spread in original units"],
          ],
        },
        paragraphs: [
          "A larger variance produces a wider and lower density curve because the total area must remain 1.",
        ],
      },
      {
        title: "Density Numerical",
        paragraphs: [
          "Substitute the mean, standard deviation, and observed value carefully into the density formula.",
        ],
        problems: [
          {
            title: "Calculate a Gaussian density",
            prompt: "Find N(x|μ,σ²) for x=12, μ=10, and σ=2.",
            steps: [
              "(x−μ)²=(12−10)²=4 and 2σ²=2(4)=8.",
              "Exponent = −4/8 = −0.5.",
              "Coefficient = 1/(√(2π)·2) ≈ 0.1995.",
              "Density = 0.1995e⁻⁰·⁵ ≈ 0.1995(0.6065) ≈ 0.1210.",
            ],
            answer: "The Gaussian density at x=12 is approximately 0.1210.",
          },
        ],
      },
      {
        title: "Multivariate Gaussian",
        paragraphs: [
          "For d features, the mean becomes a vector μ and the variance becomes a covariance matrix Σ. The covariance matrix records the spread of every feature and how pairs of features vary together.",
          "The equation below is the multidimensional version of the one-variable bell curve. Its quadratic term measures covariance-adjusted distance, while the denominator rescales the density for the number and spread of the features.",
        ],
        formulas: [
          {
            label: "Multivariate density",
            expression:
              "N(x|μ,Σ) = exp[−(1/2)(x−μ)ᵀΣ⁻¹(x−μ)] / [(2π)^(d/2)|Σ|^(1/2)]",
          },
        ],
      },
      {
        title: "Covariance Controls Shape",
        table: {
          headers: ["Covariance structure", "Possible shape"],
          rows: [
            ["Equal variance, no covariance", "Circular or spherical"],
            ["Different feature variances", "Axis-aligned ellipse"],
            ["Non-zero cross-covariance", "Rotated ellipse"],
          ],
        },
        paragraphs: [
          "This ability to represent elliptical and rotated groups is an important difference from basic K-Means.",
        ],
      },
      {
        title: "Mahalanobis Distance",
        paragraphs: [
          "The quadratic term inside the multivariate Gaussian measures distance after accounting for covariance. It treats movement along a high-variance direction as less surprising than the same Euclidean movement along a low-variance direction.",
        ],
        formulas: [
          {
            label: "Squared Mahalanobis distance",
            expression: "D² = (x−μ)ᵀΣ⁻¹(x−μ)",
          },
        ],
      },
    ],
    mechanism: {
      title: "How Gaussian parameters shape density",
      steps: [
        "Use μ to locate the centre.",
        "Use variance or Σ to describe spread.",
        "Measure covariance-aware distance from x to μ.",
        "Convert that distance into a density value.",
      ],
    },
    example: {
      title: "Height and weight",
      body: "A two-feature Gaussian can model a tilted height–weight group because taller people may also tend to weigh more, creating positive covariance.",
    },
    misconception:
      "A probability density can be greater than 1 for a very narrow continuous distribution; only total area must equal 1.",
  },
  revise: {
    definitionLabel: "Gaussian Component",
    compactDefinition: true,
    definition:
      "A Gaussian uses a mean for location and variance or covariance for spread and shape.",
    sections: [
      {
        title: "Parameters",
        table: {
          headers: ["One variable", "Many variables"],
          rows: [
            ["Mean μ", "Mean vector μ"],
            ["Variance σ²", "Covariance matrix Σ"],
          ],
        },
      },
      {
        title: "Distance",
        formulas: [{ label: "Mahalanobis", expression: "(x−μ)ᵀΣ⁻¹(x−μ)" }],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Mean controls centre.",
      "Variance controls one-dimensional spread.",
      "Covariance controls multivariate spread and direction.",
      "Gaussian output is density, not direct point probability.",
      "Multivariate Gaussian clusters can be elliptical.",
    ],
    followUp: "How can covariance rotate the shape of a Gaussian component?",
  },
  lastMinute: {
    definition:
      "Gaussian density falls as covariance-aware distance from the mean grows.",
    sections: [
      {
        title: "1D",
        points: ["μ: centre", "σ²: spread", "Bell-shaped density"],
      },
      {
        title: "Multi-D",
        points: ["μ: vector", "Σ: covariance matrix", "Elliptical contours"],
      },
    ],
    memoryLine: "Mean places the Gaussian; covariance shapes it.",
    cues: [
      "Density is not point probability.",
      "Σ must describe valid spread.",
      "Mahalanobis uses Σ⁻¹.",
    ],
    trap: "Do not use σ where the formula asks for variance σ².",
  },
};
