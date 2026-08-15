import type { SubjectTopic } from "@/lib/subject-content";

export const lossFunctionAndGradientDescent: SubjectTopic = {
  slug: "loss-function-and-gradient-descent",
  title: "Loss Function and Gradient Descent",
  description:
    "Measure regression error and update the intercept and coefficients step by step using gradient descent.",
  readTime: "16 min",
  difficulty: "Intermediate",
  tags: ["Loss Function", "Gradient Descent", "Learning Rate"],
  learn: {
    opening:
      "Training a linear-regression model means finding coefficient values that make its predictions close to the observed targets.",
    sections: [
      {
        title: "From Residuals to a Loss Function",
        paragraphs: [
          "For each example, the residual is the observed target minus the prediction. A loss function combines the errors from all examples into one number that training can minimize.",
          "SSE is the total squared error. MSE divides it by the number of examples, so it represents the average squared error. Both have the same minimum for a fixed dataset.",
        ],
        formulas: [
          { label: "Residual", expression: "eᵢ = yᵢ − ŷᵢ" },
          {
            label: "Sum of squared errors",
            expression: "SSE = Σᵢ₌₁ⁿ (yᵢ − ŷᵢ)²",
          },
          {
            label: "Mean squared error",
            expression: "MSE = (1/n) Σᵢ₌₁ⁿ (yᵢ − ŷᵢ)²",
          },
        ],
      },
      {
        title: "The Cost Used for Gradient Descent",
        paragraphs: [
          "For a candidate line ŷ = β₀ + β₁x during optimization, a common cost is half the MSE. The factor 1/2 cancels the 2 produced when the square is differentiated. It changes the scale of the cost, but not the location of its minimum. After optimization, the fitted values are written β̂₀ and β̂₁.",
        ],
        formulas: [
          {
            label: "Linear-regression cost",
            expression: "J(β₀, β₁) = (1/2n) Σᵢ₌₁ⁿ (ŷᵢ − yᵢ)²",
          },
        ],
      },
      {
        title: "What Gradient Descent Does",
        paragraphs: [
          "The gradient gives the direction of the steepest increase in cost. Gradient descent moves the parameters in the opposite direction, toward a lower cost.",
          "Linear regression with squared error has a convex cost surface, so every local minimum is global. The minimum is unique when the design matrix has full column rank; dependent columns can produce several parameter solutions with the same minimum cost.",
        ],
        visual: {
          src: "/notes/machine-learning/gradient-descent-path.png",
          alt: "Gradient descent steps moving down a convex loss surface toward its minimum",
          width: 1536,
          height: 1024,
          caption:
            "Each update follows the negative gradient toward a lower value of the cost function.",
        },
      },
      {
        title: "Gradients and Parameter Updates",
        paragraphs: [
          "Calculate each derivative using the current predictions, then update all parameters together. The same idea extends to multiple regression: each coefficient receives its own gradient.",
        ],
        formulas: [
          {
            label: "Intercept gradient",
            expression: "∂J/∂β₀ = (1/n) Σᵢ₌₁ⁿ (ŷᵢ − yᵢ)",
          },
          {
            label: "Slope gradient",
            expression: "∂J/∂β₁ = (1/n) Σᵢ₌₁ⁿ (ŷᵢ − yᵢ)xᵢ",
          },
          { label: "Update rule", expression: "βⱼ := βⱼ − α(∂J/∂βⱼ)" },
          {
            label: "Multiple-regression matrix gradient",
            expression: "∇J(β) = (1/n)Xᵀ(Xβ − y)",
          },
        ],
      },
      {
        title: "One Complete Gradient-Descent Step",
        paragraphs: [
          "Use two examples and begin with β₀ = 0 and β₁ = 0. The learning rate is α = 0.1.",
        ],
        dataTable: {
          headers: ["x", "y", "Initial ŷ", "ŷ − y", "(ŷ − y)x"],
          rows: [
            ["1", "2", "0", "−2", "−2"],
            ["2", "4", "0", "−4", "−8"],
            ["Total", "", "", "−6", "−10"],
          ],
        },
        problems: [
          {
            title: "Update β₀ and β₁ once",
            prompt:
              "For (1,2) and (2,4), start with β₀ = β₁ = 0 and use α = 0.1. Find the parameters after one batch update.",
            steps: [
              "Initial predictions are 0, so prediction errors ŷ − y are −2 and −4.",
              "∂J/∂β₀ = (−2 − 4) / 2 = −3.",
              "∂J/∂β₁ = [−2(1) + −4(2)] / 2 = −5.",
              "β₀ := 0 − 0.1(−3) = 0.3.",
              "β₁ := 0 − 0.1(−5) = 0.5.",
            ],
            answer: "After one update, β₀ = 0.3 and β₁ = 0.5.",
          },
        ],
      },
      {
        title: "Choosing the Learning Rate",
        paragraphs: [
          "The learning rate α controls the step size. A very small value learns slowly. A very large value may jump across the minimum, make the loss oscillate, or make it increase.",
          "Track the cost across iterations. It should generally fall and then become nearly stable. If it grows or becomes invalid, reduce the learning rate and check feature scaling.",
          "A stopping rule can end training when the cost improvement or gradient size falls below a small chosen tolerance, or when a maximum number of iterations is reached.",
        ],
        table: {
          headers: ["Learning rate", "Typical result"],
          rows: [
            ["Too small", "Stable but unnecessarily slow progress"],
            ["Suitable", "Cost falls smoothly toward the minimum"],
            ["Too large", "Overshooting, oscillation, or divergence"],
          ],
        },
      },
      {
        title: "Why Feature Scaling Helps",
        paragraphs: [
          "If one feature ranges from 0 to 1 and another from 0 to 100,000, their gradients can have very different sizes. Standardizing features makes the cost surface easier to move across and usually speeds up gradient descent.",
          "Scaling changes the numerical coefficient values, not the model's basic ability to represent a linear relationship. Apply scaling parameters learned from the training set to validation, test, and future data.",
        ],
      },
      {
        title: "Closed-Form Solution or Gradient Descent?",
        paragraphs: [
          "Both methods minimize the same ordinary least-squares objective, but they reach the solution differently.",
        ],
        table: {
          headers: ["Closed-form OLS", "Gradient descent"],
          rows: [
            [
              "Directly calculates the optimum",
              "Approaches the optimum through repeated updates",
            ],
            [
              "Convenient for smaller feature sets",
              "Useful when direct matrix operations are expensive",
            ],
            ["No learning rate", "Needs a learning rate and stopping rule"],
            [
              "Can struggle with a singular matrix",
              "Works without inverting XᵀX",
            ],
          ],
        },
      },
    ],
    mechanism: {
      title: "Batch gradient-descent cycle",
      steps: [
        "Initialize the intercept and coefficients.",
        "Predict every training target using the current parameters.",
        "Calculate the cost and every parameter gradient.",
        "Update all parameters together using the learning rate.",
        "Repeat until the cost changes very little or the iteration limit is reached.",
      ],
    },
    example: {
      title: "Reading a training curve",
      body: "If MSE falls quickly and then levels off, training is approaching the minimum. If MSE alternates between large values, the learning rate is probably too high.",
    },
    misconception:
      "The gradient is not the parameter update itself. Gradient descent subtracts the learning rate multiplied by the gradient.",
  },
  revise: {
    definitionLabel: "Training Idea",
    compactDefinition: true,
    definition:
      "Gradient descent repeatedly moves regression parameters opposite the cost gradient to reduce squared prediction error.",
    sections: [
      {
        title: "Essential Formulas",
        formulas: [
          { label: "Cost", expression: "J = (1/2n)Σ(ŷᵢ − yᵢ)²" },
          {
            label: "Intercept gradient",
            expression: "∂J/∂β₀ = (1/n)Σ(ŷᵢ − yᵢ)",
          },
          { label: "Slope gradient", expression: "∂J/∂β₁ = (1/n)Σ(ŷᵢ − yᵢ)xᵢ" },
          { label: "Matrix gradient", expression: "∇J(β) = (1/n)Xᵀ(Xβ − y)" },
          { label: "Update", expression: "βⱼ := βⱼ − α(∂J/∂βⱼ)" },
        ],
      },
      {
        title: "Learning Rate",
        points: [
          "Too small means slow learning.",
          "Too large can overshoot and diverge.",
          "Feature scaling usually makes convergence easier.",
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Squared-error loss is convex; its minimum is unique when X has full column rank.",
      "Use ŷ − y in the gradient formulas shown here.",
      "Update every parameter together after calculating the batch gradients.",
      "Watch the cost to check convergence.",
      "Gradient descent avoids matrix inversion.",
    ],
    followUp: "Why can a large learning rate make the cost increase?",
  },
  lastMinute: {
    definition:
      "Predict, find gradients, update against the gradient, and repeat.",
    sections: [
      {
        title: "Training Loop",
        flow: [
          "Initialize β",
          "Predict ŷ",
          "Calculate cost",
          "Find gradients",
          "Update β",
          "Repeat",
        ],
        wide: true,
      },
      {
        title: "Learning Rate Check",
        points: [
          "Slow fall: α may be small",
          "Oscillation or rising cost: α may be large",
          "Different feature scales: standardize",
        ],
      },
    ],
    memoryLine: "Gradient points uphill, so gradient descent subtracts it.",
    cues: [
      "The factor 1/2 only simplifies differentiation.",
      "All batch gradients use the current parameter values.",
      "Stop when improvement becomes negligible or a set limit is reached.",
    ],
    trap: "Do not add the gradient; subtract α times the gradient.",
  },
};

export const regressionAssumptionsAndDiagnostics: SubjectTopic = {
  slug: "regression-assumptions-and-diagnostics",
  title: "Regression Assumptions and Diagnostics",
  description:
    "Check when linear-regression estimates are trustworthy by reading residual plots, VIF, and influential observations.",
  readTime: "17 min",
  difficulty: "Intermediate",
  tags: ["Assumptions", "Residuals", "VIF"],
  learn: {
    opening:
      "A fitted equation can produce predictions even when its assumptions are poor. Diagnostics help us discover when its coefficients, uncertainty, or predictions may be misleading.",
    sections: [
      {
        title: "Main Regression Assumptions",
        paragraphs: [
          "Check these conditions before trusting coefficient interpretations, standard errors, or formal tests.",
        ],
        dataTable: {
          headers: ["Assumption", "Simple meaning", "Why it matters"],
          rows: [
            [
              "Linearity",
              "The expected target is a linear combination of the features",
              "A missed curve leaves a pattern in residuals",
            ],
            [
              "Independent errors",
              "One error does not predict another",
              "Related errors distort uncertainty estimates",
            ],
            [
              "Constant error variance",
              "Residual spread is roughly constant",
              "Changing spread makes standard errors unreliable",
            ],
            [
              "Zero conditional mean",
              "After the features are fixed, the average error is zero",
              "Omitted relevant factors can bias coefficients",
            ],
            [
              "No perfect multicollinearity",
              "No feature is an exact linear copy of others",
              "Separate coefficients must be identifiable",
            ],
            [
              "Approximately normal errors",
              "Errors are roughly normal when formal small-sample inference needs it",
              "Helps confidence intervals and hypothesis tests",
            ],
          ],
        },
      },
      {
        title: "Important Note About Normality",
        paragraphs: [
          "Normal residuals are not required just to calculate OLS coefficients or point predictions. Normality is mainly used for exact confidence intervals and significance tests, especially with small samples.",
          "Do not confuse normal errors with normal features. Linear regression does not require every input feature to follow a normal distribution.",
          "A Q–Q plot compares residual quantiles with theoretical normal quantiles. Points close to the reference line support approximate normality; strong curves or extreme departures are warning signs.",
        ],
      },
      {
        title: "Residual Plots",
        paragraphs: [
          "Plot residuals against fitted values. A healthy plot has points scattered around zero without a clear curve or a steadily widening spread.",
        ],
        visual: {
          src: "/notes/machine-learning/regression-diagnostics.png",
          alt: "Regression diagnostic panels showing random residuals, curvature, a funnel, an influential point, and a normal Q-Q plot",
          width: 1536,
          height: 1024,
          caption:
            "Residual patterns reveal model problems, while a Q–Q plot checks approximate residual normality.",
        },
        dataTable: {
          headers: ["Residual pattern", "Possible problem", "Useful response"],
          rows: [
            [
              "Random cloud around zero",
              "No obvious pattern",
              "Continue checking other assumptions",
            ],
            [
              "Curve",
              "Relationship is not adequately linear",
              "Reconsider features or the model form",
            ],
            [
              "Funnel shape",
              "Heteroscedasticity: error variance changes",
              "Transform the target or use suitable robust inference",
            ],
            [
              "Separated extreme point",
              "Outlier or influential observation",
              "Verify the record and compare results with care",
            ],
          ],
        },
      },
      {
        title: "Independence of Errors",
        paragraphs: [
          "Independence can fail in time-series data, repeated measurements from the same person, or observations from the same group. A residual-versus-time plot can reveal runs or cycles.",
          "Randomly shuffling a split does not magically make dependent observations independent. The data collection structure must guide the split and model choice.",
        ],
      },
      {
        title: "Multicollinearity and VIF",
        paragraphs: [
          "Multicollinearity occurs when predictors carry strongly overlapping information. Predictions may remain reasonable, but individual coefficients can become unstable, change sign, or have large standard errors.",
          "For feature j, regress it on the other features and call that result Rⱼ². Variance Inflation Factor measures how much its coefficient variance is inflated. A large VIF is a warning to investigate, not an automatic delete rule.",
        ],
        formulas: [
          {
            label: "Variance Inflation Factor",
            expression: "VIFⱼ = 1 / (1 − Rⱼ²)",
          },
        ],
        problems: [
          {
            title: "Calculate VIF",
            prompt:
              "A feature can be predicted from the other features with Rⱼ² = 0.80. Find its VIF.",
            steps: [
              "VIFⱼ = 1 / (1 − Rⱼ²)",
              "VIFⱼ = 1 / (1 − 0.80)",
              "VIFⱼ = 1 / 0.20 = 5",
            ],
            answer:
              "VIF = 5. The coefficient variance is inflated, so inspect the overlapping predictors.",
          },
        ],
      },
      {
        title: "Which Result Each Problem Affects",
        paragraphs: [
          "Different assumption problems affect different parts of the analysis, so the correction should match the problem.",
        ],
        dataTable: {
          headers: ["Problem", "Main consequence", "What to inspect"],
          rows: [
            [
              "Nonlinearity",
              "Biased pattern and weak predictions",
              "Residuals against fitted values and features",
            ],
            [
              "Dependent errors",
              "Unreliable standard errors and repeated patterns",
              "Residual order, time, and groups",
            ],
            [
              "Heteroscedasticity",
              "Unreliable usual standard errors",
              "Residual spread and robust inference",
            ],
            [
              "Omitted relevant variables",
              "Potentially biased coefficients",
              "Study design and domain knowledge",
            ],
            [
              "Multicollinearity",
              "Unstable individual coefficients",
              "Predictor relationships and VIF",
            ],
          ],
        },
      },
      {
        title: "Outliers, Leverage, and Influence",
        dataTable: {
          headers: ["Term", "Meaning"],
          rows: [
            ["Outlier", "An observation with an unusually large residual"],
            ["High leverage", "An observation with unusual feature values"],
            [
              "Influential point",
              "An observation that noticeably changes the fitted model",
            ],
          ],
        },
        paragraphs: [
          "A point can have high leverage without a large residual, and an outlier is not always influential. Cook's distance summarizes how much the fitted model changes when one observation is removed. It should be combined with plots and domain knowledge.",
          "Never remove an observation only because it looks inconvenient. First check data-entry errors, whether it belongs to the target population, and how conclusions change with and without it.",
        ],
      },
      {
        title: "Assumptions Do Not Prove Causation",
        paragraphs: [
          "Even a model with clean residual plots describes conditional associations. Causal conclusions require a suitable study design and stronger reasoning about confounding, selection, and intervention.",
          "Residual diagnostics cannot prove the zero-conditional-mean assumption. An omitted variable may still be related to both a feature and the target even when the residual plot looks clean.",
        ],
      },
    ],
    mechanism: {
      title: "A practical diagnostic order",
      steps: [
        "Confirm that rows, units, and target values are correct.",
        "Plot residuals against fitted values and against important features.",
        "Check residual order when time, groups, or repeated measurements exist.",
        "Inspect predictor relationships and calculate VIF where needed.",
        "Examine outliers, leverage, and influence without deleting points automatically.",
        "Choose a correction that matches the discovered problem, then validate again.",
      ],
    },
    example: {
      title: "Funnel-shaped residuals",
      body: "If house-price residuals are narrow for cheap homes and wide for expensive homes, the error variance is not constant. A target transformation or an inference method robust to unequal variance may be more suitable.",
    },
    misconception:
      "A high R² does not confirm that regression assumptions hold. Always inspect residual behavior and the data structure.",
  },
  revise: {
    definitionLabel: "Purpose",
    compactDefinition: true,
    definition:
      "Regression diagnostics check whether residual behavior and predictor relationships support reliable interpretation and inference.",
    sections: [
      {
        title: "Assumption Signals",
        dataTable: {
          headers: ["Signal", "Concern"],
          rows: [
            ["Curved residual pattern", "Nonlinearity"],
            ["Funnel-shaped residuals", "Non-constant variance"],
            ["Runs or cycles over time", "Dependent errors"],
            ["Strong Q–Q plot departures", "Non-normal errors"],
            ["Large VIF", "Multicollinearity"],
            ["One point changes the line strongly", "Influential observation"],
          ],
        },
      },
      {
        title: "VIF",
        formulas: [
          { label: "For predictor j", expression: "VIFⱼ = 1/(1 − Rⱼ²)" },
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Residuals should be centered around zero without a systematic shape.",
      "Normality mainly supports confidence intervals and tests.",
      "Features themselves do not need to be normally distributed.",
      "Multicollinearity mainly harms coefficient stability and interpretation.",
      "Outlier, leverage, and influence are different ideas.",
      "Cook's distance summarizes how strongly one observation changes the fitted model.",
      "Diagnostics do not prove causation.",
    ],
    followUp: "What does a funnel shape in a residual plot suggest?",
  },
  lastMinute: {
    definition:
      "Good regression needs more than a fitted line: check the errors and predictors.",
    sections: [
      {
        title: "Residual Plot",
        points: [
          "Random around zero: good sign",
          "Curve: nonlinearity",
          "Funnel: unequal variance",
          "Pattern over time: dependence",
        ],
      },
      {
        title: "Unusual Data",
        points: [
          "Outlier: unusual y error",
          "Leverage: unusual x values",
          "Influence: changes the fit",
        ],
      },
    ],
    memoryLine:
      "Curve, funnel, cycle, or dominant point: investigate before trusting the fit.",
    cues: [
      "VIF = 1/(1 − R² from predicting one feature with the others).",
      "Normal residuals matter mainly for formal inference.",
      "Never remove a point without a defensible reason.",
    ],
    trap: "Normality of errors does not mean every feature must be normal.",
  },
};
