import type { SubjectTopic } from "@/lib/subject-content";

export const expectationMaximizationAlgorithm: SubjectTopic = {
  slug: "expectation-maximization-algorithm",
  title: "Expectation-Maximization Algorithm",
  description:
    "Fit a GMM by alternating responsibility estimation with weighted parameter updates.",
  readTime: "20 min",
  difficulty: "Advanced",
  tags: ["EM Algorithm", "E-Step", "M-Step"],
  learn: {
    opening:
      "GMM cannot directly maximize its likelihood easily because component labels are hidden. Expectation-Maximization alternates between estimating those labels probabilistically and updating the parameters.",
    sections: [
      {
        title: "Why Alternation Is Needed",
        paragraphs: [
          "If parameters were known, responsibilities could be calculated. If responsibilities were known, weighted parameter updates would be straightforward. EM alternates between these two easier problems.",
        ],
        visual: {
          src: "/notes/machine-learning/em-algorithm-cycle.png",
          alt: "Expectation-Maximization cycle showing initialization, E-step, M-step, likelihood check, and convergence",
          width: 1536,
          height: 1024,
          caption: "E-step estimates soft assignments; M-step updates parameters; the cycle repeats until convergence.",
        },
      },
      {
        title: "Initialization",
        paragraphs: [
          "Start with valid mixing weights, means, and covariances. K-Means-based means or multiple random initializations are common because different starts can reach different local optima.",
        ],
      },
      {
        title: "E-Step: Expectation",
        paragraphs: [
          "Keep the current parameters fixed and calculate every responsibility γᵢₖ. This produces a soft assignment table with one row per example and one column per component.",
        ],
        formulas: [{ label: "E-step", expression: "γᵢₖ = πₖN(xᵢ|μₖ,Σₖ) / ΣⱼπⱼN(xᵢ|μⱼ,Σⱼ)" }],
      },
      {
        title: "M-Step: Maximization",
        paragraphs: [
          "Keep responsibilities fixed and update every component using weighted summaries. Nₖ is the effective number of examples assigned to component k.",
        ],
        formulas: [
          { label: "Effective count", expression: "Nₖ = Σᵢγᵢₖ" },
          { label: "Mixing weight", expression: "πₖ = Nₖ/n" },
          { label: "Mean", expression: "μₖ = [Σᵢγᵢₖxᵢ]/Nₖ" },
          { label: "Covariance", expression: "Σₖ = [Σᵢγᵢₖ(xᵢ−μₖ)(xᵢ−μₖ)ᵀ]/Nₖ" },
        ],
      },
      {
        title: "Complete M-Step Numerical",
        paragraphs: ["Use fixed responsibilities to perform one complete one-dimensional M-step."],
        dataTable: {
          headers: ["xᵢ", "γᵢ1", "γᵢ2"],
          rows: [
            ["1", "0.9", "0.1"],
            ["2", "0.8", "0.2"],
            ["8", "0.2", "0.8"],
            ["9", "0.1", "0.9"],
          ],
        },
        problems: [
          {
            title: "Update weights, means, and variances",
            prompt: "Using the table, calculate N₁, N₂, π₁, π₂, μ₁, μ₂, and the one-dimensional component variances.",
            steps: [
              "N₁=0.9+0.8+0.2+0.1=2 and N₂=0.1+0.2+0.8+0.9=2.",
              "π₁=N₁/4=0.5 and π₂=N₂/4=0.5.",
              "μ₁=[0.9(1)+0.8(2)+0.2(8)+0.1(9)]/2=5/2=2.5.",
              "μ₂=[0.1(1)+0.2(2)+0.8(8)+0.9(9)]/2=15/2=7.5.",
              "Variance 1=[0.9(1−2.5)²+0.8(2−2.5)²+0.2(8−2.5)²+0.1(9−2.5)²]/2=12.5/2=6.25.",
              "Variance 2 is symmetric and also equals 6.25.",
            ],
            answer: "The updated weights are 0.5 and 0.5, means are 2.5 and 7.5, and both variances are 6.25.",
          },
        ],
      },
      {
        title: "Convergence",
        paragraphs: [
          "After each M-step, calculate log-likelihood. EM normally does not decrease the training log-likelihood, but it can converge to a local optimum rather than the global best solution.",
          "Stop when log-likelihood improvement becomes smaller than a chosen tolerance or a maximum iteration limit is reached.",
        ],
      },
    ],
    mechanism: {
      title: "Full EM cycle",
      steps: [
        "Initialize π, μ, and Σ.",
        "E-step: calculate responsibilities.",
        "M-step: update effective counts, weights, means, and covariances.",
        "Calculate the new log-likelihood.",
        "Repeat until the convergence rule is met.",
      ],
    },
    example: {
      title: "Iterative refinement",
      body: "A point near Component 1 raises that component's responsibility during the E-step. During the M-step, it then pulls Component 1's mean and covariance in proportion to that responsibility.",
    },
    misconception:
      "EM is not one E-step followed by one M-step. It repeats both steps until the chosen convergence condition is met.",
  },
  revise: {
    definitionLabel: "Alternating Optimization",
    compactDefinition: true,
    definition:
      "EM alternates soft-assignment estimation with weighted parameter updates to increase GMM likelihood.",
    sections: [
      { title: "Cycle", flow: ["Initialize", "E-step", "M-step", "Log-likelihood", "Repeat"] },
      {
        title: "M-Step",
        formulas: [
          { label: "Count", expression: "Nₖ=Σγᵢₖ" },
          { label: "Weight", expression: "πₖ=Nₖ/n" },
          { label: "Mean", expression: "μₖ=Σγᵢₖxᵢ/Nₖ" },
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "E-step updates responsibilities.",
      "M-step updates π, μ, and Σ.",
      "Nₖ is the effective component count.",
      "Training log-likelihood normally does not decrease.",
      "Different initializations can reach different local optima.",
    ],
    followUp: "Why does EM need both an E-step and an M-step?",
  },
  lastMinute: {
    definition: "Estimate memberships, update parameters, and repeat.",
    sections: [
      { title: "E-Step", points: ["Parameters fixed", "Calculate γ"] },
      { title: "M-Step", points: ["γ fixed", "Update π, μ, Σ"] },
    ],
    memoryLine: "E estimates hidden membership; M maximizes parameter fit.",
    cues: ["Responsibilities first.", "Weighted summaries second.", "Check log-likelihood."],
    trap: "Do not update a component mean using unweighted examples.",
  },
};

export const selectingComponentsAndGmmLimitations: SubjectTopic = {
  slug: "selecting-components-and-gmm-limitations",
  title: "Selecting Components and GMM Limitations",
  description:
    "Choose the number of components with AIC and BIC and handle convergence, initialization, and covariance risks.",
  readTime: "18 min",
  difficulty: "Intermediate",
  tags: ["AIC", "BIC", "Model Selection"],
  learn: {
    opening:
      "Adding Gaussian components usually improves training likelihood, but too many components can model noise. AIC and BIC balance fit against parameter count.",
    sections: [
      {
        title: "Why Likelihood Alone Is Not Enough",
        paragraphs: [
          "A more complex GMM can often achieve a higher training likelihood. Model selection therefore needs a complexity penalty rather than simply choosing the largest likelihood or largest K.",
        ],
      },
      {
        title: "AIC and BIC",
        paragraphs: [
          "Both criteria use the maximized log-likelihood ℓ, parameter count p, and a complexity penalty. Lower values are better. BIC penalizes additional parameters more strongly as sample size n grows.",
          "AIC and BIC are relative criteria: compare candidates fitted to the same observations and target representation. One value by itself is not an absolute quality score.",
        ],
        formulas: [
          { label: "AIC", expression: "AIC = 2p − 2ℓ" },
          { label: "BIC", expression: "BIC = p ln(n) − 2ℓ" },
        ],
        visual: {
          src: "/notes/machine-learning/gmm-aic-bic-selection.png",
          alt: "GMM candidates with different component counts compared using AIC and BIC",
          width: 1536,
          height: 1024,
          caption: "AIC and BIC prefer a strong fit only when its added complexity is justified.",
        },
      },
      {
        title: "Complete AIC and BIC Numerical",
        paragraphs: [
          "For a one-dimensional GMM with K components, p=K means + K variances + (K−1) free weights = 3K−1.",
          "In more dimensions, p also depends on the feature dimension and covariance form, such as spherical, diagonal, tied, or full covariance.",
        ],
        dataTable: {
          headers: ["K", "p", "Log-likelihood ℓ", "AIC", "BIC for n=100"],
          rows: [
            ["2", "5", "−140", "290", "≈303.03"],
            ["3", "8", "−130", "276", "≈296.84"],
            ["4", "11", "−127", "276", "≈304.66"],
          ],
        },
        problems: [
          {
            title: "Select K",
            prompt: "Verify the criteria and choose among K=2, 3, and 4 using n=100 and the table values.",
            steps: [
              "For K=2: AIC=2(5)−2(−140)=290; BIC=5ln100+280≈303.03.",
              "For K=3: AIC=2(8)+260=276; BIC=8ln100+260≈296.84.",
              "For K=4: AIC=2(11)+254=276; BIC=11ln100+254≈304.66.",
              "AIC ties K=3 and K=4; choose the simpler tied candidate K=3.",
              "BIC is also smallest for K=3.",
            ],
            answer: "Choose K=3 because it has the lowest BIC and ties for lowest AIC with a simpler model than K=4.",
          },
        ],
      },
      {
        title: "Underfitting and Overfitting",
        table: {
          headers: ["Too few components", "Too many components"],
          rows: [
            ["Distinct groups are merged", "Noise may receive its own component"],
            ["High bias", "High variance"],
            ["Poor density fit", "Unstable or tiny components"],
          ],
        },
        paragraphs: ["AIC, BIC, repeated fitting, and domain usefulness should be considered together rather than treating one plotted curve as unquestionable truth."],
      },
      {
        title: "Initialization and Local Optima",
        paragraphs: [
          "EM can converge to different local optima from different starting parameters. Fit several initializations and keep the converged solution with the best valid log-likelihood before comparing model-selection criteria.",
        ],
      },
      {
        title: "Covariance Degeneracy",
        paragraphs: [
          "A component can collapse around very few examples and drive its covariance toward zero, producing an unstable extremely high density. Minimum covariance regularization helps prevent singular covariance matrices.",
        ],
      },
      {
        title: "Final Limitations",
        points: [
          "K must be chosen.",
          "Gaussian component shapes may not match real clusters.",
          "EM can stop at a local optimum.",
          "Results are sensitive to initialization and feature scaling.",
          "Full covariance models need enough data and can be expensive in many dimensions.",
        ],
        paragraphs: [
          "Component labels can swap between runs without changing the fitted density. Interpret components by their learned parameters, not by the arbitrary numbers 1, 2, and 3.",
        ],
      },
    ],
    mechanism: {
      title: "Selecting a GMM",
      steps: [
        "Choose a small justified set of K values and covariance forms.",
        "Run multiple initializations for each candidate.",
        "Keep a valid converged fit for each configuration.",
        "Compare AIC and BIC; lower is better.",
        "Inspect stability and domain usefulness.",
        "Select the simplest well-supported model.",
      ],
    },
    example: {
      title: "Too many components",
      body: "A GMM with ten components may split one real customer segment into several tiny Gaussians. Better training likelihood does not justify those extra groups when BIC and stability become worse.",
    },
    misconception:
      "The best GMM is not automatically the candidate with the highest training likelihood or the largest number of components.",
  },
  revise: {
    definitionLabel: "Component Selection",
    compactDefinition: true,
    definition:
      "AIC and BIC compare GMM fit with complexity; choose lower values after obtaining valid converged candidates.",
    sections: [
      {
        title: "Criteria",
        formulas: [
          { label: "AIC", expression: "2p−2ℓ" },
          { label: "BIC", expression: "p ln(n)−2ℓ" },
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Lower AIC and BIC are better.",
      "Likelihood alone rewards extra complexity.",
      "BIC penalty grows with ln(n).",
      "Use multiple initializations.",
      "Regularize covariance to avoid collapse.",
    ],
    followUp: "Why can training likelihood improve while BIC becomes worse?",
  },
  lastMinute: {
    definition: "Balance likelihood improvement against the number of fitted parameters.",
    sections: [
      { title: "Choose", flow: ["Fit candidates", "Check convergence", "AIC/BIC", "Lower wins", "Inspect stability"], wide: true },
      { title: "Risks", points: ["Local optimum", "Covariance collapse", "Too many tiny components"] },
    ],
    memoryLine: "Better fit must earn its extra parameters.",
    cues: ["AIC=2p−2ℓ.", "BIC=p ln n−2ℓ.", "Labels are arbitrary."],
    trap: "Do not select the largest K from training likelihood alone.",
  },
};
