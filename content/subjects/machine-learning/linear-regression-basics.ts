import type { SubjectTopic } from "@/lib/subject-content";

export const simpleLinearRegression: SubjectTopic = {
  slug: "simple-linear-regression",
  title: "Simple Linear Regression",
  description:
    "Fit a straight line using one input feature, interpret its slope and intercept, and solve prediction numericals.",
  readTime: "16 min",
  difficulty: "Foundation",
  tags: ["Regression", "Best-Fit Line", "OLS"],
  learn: {
    opening:
      "Simple linear regression models the relationship between one numerical input and one numerical target using a straight line.",
    sections: [
      {
        title: "The Problem Linear Regression Solves",
        paragraphs: [
          "Suppose we know how many hours several students studied and the marks they received. We want to estimate the mark for a new number of study hours.",
          "The observations will not usually lie on one perfect line. Linear regression finds the line that keeps the total squared prediction error as small as possible.",
        ],
      },
      {
        title: "The Regression Equation",
        paragraphs: [
          "The model receives one feature x and produces a numerical prediction ŷ. The line is controlled by an intercept and a slope.",
          "β₀ and β₁ represent the unknown population parameters. After learning from sample data, β̂₀ and β̂₁ are their estimated values in the fitted line.",
        ],
        formulas: [
          {
            label: "Simple linear regression",
            expression: "ŷ = β₀ + β₁x",
            note: "β₀ is the intercept, β₁ is the slope, x is the input, and ŷ is the prediction.",
          },
        ],
        dataTable: {
          headers: ["Symbol", "Meaning", "Example"],
          rows: [
            ["x", "Input feature", "Study hours"],
            ["y", "Observed target", "Actual mark"],
            ["ŷ", "Predicted target", "Predicted mark"],
            ["β₀", "Prediction when x = 0", "Starting mark"],
            [
              "β₁",
              "Change in prediction for one-unit rise in x",
              "Marks per extra hour",
            ],
          ],
        },
      },
      {
        title: "Slope and Intercept",
        paragraphs: [
          "The slope β₁ tells us how much the predicted target changes when x increases by one unit. A positive slope means the prediction rises; a negative slope means it falls.",
          "The intercept β₀ is the predicted value when x equals zero. It may be mathematically necessary even when x = 0 has little real meaning. Do not force a practical interpretation when zero lies outside the observed data range.",
        ],
        problems: [
          {
            title: "Interpret a fitted equation",
            prompt:
              "A model predicts marks using ŷ = 28 + 6x, where x is study hours.",
            steps: [
              "β₀ = 28, so the predicted mark at x = 0 is 28.",
              "β₁ = 6, so one additional study hour raises the predicted mark by 6.",
              "For x = 5: ŷ = 28 + 6(5) = 58.",
            ],
            answer: "The five-hour prediction is 58 marks.",
          },
        ],
      },
      {
        title: "Best-Fit Line and Residuals",
        paragraphs: [
          "A residual is the vertical difference between an observed target and the model's prediction. A positive residual means the point lies above the line; a negative residual means it lies below.",
          "Ordinary Least Squares, or OLS, chooses the line that minimizes the sum of squared residuals. Squaring prevents positive and negative residuals from cancelling and gives larger errors more influence.",
        ],
        formulas: [
          {
            label: "Residual for example i",
            expression: "eᵢ = yᵢ − ŷᵢ",
          },
          {
            label: "Sum of squared errors",
            expression: "SSE = Σᵢ₌₁ⁿ (yᵢ − ŷᵢ)²",
          },
        ],
        visual: {
          src: "/notes/machine-learning/linear-regression-best-fit.png",
          alt: "Scatter plot with a best-fit regression line and labelled residual distances",
          width: 1536,
          height: 1024,
          caption:
            "Residuals are measured vertically from observed points to the prediction line.",
        },
      },
      {
        title: "Closed-Form OLS Formulas",
        paragraphs: [
          "For one feature, we can calculate the OLS slope and intercept directly. The slope compares how x and y move together with how much x varies around its mean.",
          "With an intercept in the model, the fitted OLS line passes through (x̄, ȳ). Substituting x̄ gives ŷ = β̂₀ + β̂₁x̄ = ȳ.",
        ],
        formulas: [
          {
            label: "Slope",
            expression: "β̂₁ = Σ(xᵢ − x̄)(yᵢ − ȳ) / Σ(xᵢ − x̄)²",
          },
          {
            label: "Intercept",
            expression: "β̂₀ = ȳ − β̂₁x̄",
          },
        ],
      },
      {
        title: "Complete OLS Numerical",
        paragraphs: [
          "Use the three observations below. The small dataset keeps every calculation visible.",
        ],
        dataTable: {
          headers: ["x", "y", "x − x̄", "y − ȳ", "Product", "(x − x̄)²"],
          rows: [
            ["1", "2", "−1", "−4/3", "4/3", "1"],
            ["2", "3", "0", "−1/3", "0", "0"],
            ["3", "5", "1", "5/3", "5/3", "1"],
            ["Total", "", "", "", "3", "2"],
          ],
        },
        problems: [
          {
            title: "Fit the regression line",
            prompt:
              "For points (1,2), (2,3), and (3,5), find β̂₁, β̂₀, and the prediction at x = 4.",
            steps: [
              "x̄ = (1 + 2 + 3) / 3 = 2",
              "ȳ = (2 + 3 + 5) / 3 = 10/3",
              "β̂₁ = 3 / 2 = 1.5",
              "β̂₀ = 10/3 − 1.5(2) = 1/3",
              "Fitted line: ŷ = 1/3 + 1.5x",
              "At x = 4: ŷ = 1/3 + 6 = 19/3",
              "The observed x range is 1 to 3, so x = 4 is an extrapolation.",
            ],
            answer:
              "β̂₁ = 1.5, β̂₀ = 1/3, and ŷ(4) = 19/3 ≈ 6.33. Treat this extrapolated prediction carefully.",
          },
          {
            title: "Calculate one residual",
            prompt:
              "Using the fitted line, calculate the residual for the observed point (3,5).",
            steps: [
              "ŷ = 1/3 + 1.5(3) = 29/6 ≈ 4.83",
              "e = y − ŷ = 5 − 29/6",
              "e = 1/6",
            ],
            answer:
              "The residual is 1/6 ≈ 0.17, so the point lies slightly above the line.",
          },
        ],
      },
      {
        title: "Interpolation and Extrapolation",
        paragraphs: [
          "Interpolation predicts inside the observed x range. Extrapolation predicts outside it. Extrapolation is risky because the straight-line relationship may not continue beyond the data we saw.",
        ],
        table: {
          headers: ["Interpolation", "Extrapolation"],
          rows: [
            [
              "Prediction inside the training range",
              "Prediction outside the training range",
            ],
            [
              "Usually safer when data coverage is good",
              "Depends on an untested continuation of the line",
            ],
          ],
        },
      },
      {
        title: "Correlation Is Not Causation",
        paragraphs: [
          "A fitted slope describes an association in the available data. It does not by itself prove that changing x causes y to change. A third variable, selection effect, or reverse direction may explain the relationship.",
        ],
      },
    ],
    mechanism: {
      title: "How to solve a simple linear-regression numerical",
      steps: [
        "Write the observed x and y values.",
        "Calculate x̄ and ȳ.",
        "Create the deviation, product, and squared-deviation columns.",
        "Calculate β̂₁ from the two column totals.",
        "Calculate β̂₀ = ȳ − β̂₁x̄.",
        "Write the fitted equation and substitute the requested x value.",
        "If asked for a residual, use observed y minus predicted ŷ.",
      ],
    },
    example: {
      title: "Estimating electricity use",
      body: "A fitted slope of 2.4 kWh per hour means the predicted electricity use rises by 2.4 kWh for each additional hour of machine operation. It describes the fitted association; it does not prove that operating time is the only cause.",
    },
    misconception:
      "The best-fit line does not need to pass through every point. OLS minimizes the total squared residuals across all observations.",
  },
  revise: {
    definitionLabel: "Core Model",
    compactDefinition: true,
    definition:
      "Simple linear regression predicts a numerical target from one feature using the OLS best-fit line.",
    sections: [
      {
        title: "Essential Formulas",
        formulas: [
          { label: "Prediction", expression: "ŷ = β₀ + β₁x" },
          { label: "Residual", expression: "eᵢ = yᵢ − ŷᵢ" },
          { label: "Slope", expression: "β̂₁ = Σ(xᵢ − x̄)(yᵢ − ȳ) / Σ(xᵢ − x̄)²" },
          { label: "Intercept", expression: "β̂₀ = ȳ − β̂₁x̄" },
        ],
      },
      {
        title: "Interpretation",
        points: [
          "β₁ is predicted change in y for one-unit increase in x.",
          "β₀ is the prediction at x = 0.",
          "A positive residual lies above the fitted line.",
          "OLS minimizes squared residuals.",
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "One feature and one numerical target.",
      "β denotes an unknown parameter; β̂ denotes its estimate from sample data.",
      "The line passes through (x̄, ȳ).",
      "Residual = observed − predicted.",
      "Extrapolation is less reliable than interpolation.",
      "A slope shows association, not automatic causation.",
    ],
    followUp: "Why does OLS square residuals instead of simply adding them?",
  },
  lastMinute: {
    definition: "Fit one straight line: ŷ = β₀ + β₁x.",
    sections: [
      {
        title: "Formula Order",
        flow: [
          "Find x̄ and ȳ",
          "Find β̂₁",
          "Find β̂₀",
          "Write the line",
          "Predict or find residual",
        ],
        wide: true,
      },
      {
        title: "Signs",
        points: [
          "β₁ > 0: rising line",
          "β₁ < 0: falling line",
          "e > 0: point above line",
          "e < 0: point below line",
        ],
      },
    ],
    memoryLine:
      "Slope gives the change; intercept gives the start; residual gives the miss.",
    cues: [
      "OLS minimizes squared residuals.",
      "The intercept may lack practical meaning outside the data range.",
      "Do not claim causation from a fitted line alone.",
    ],
    trap: "Residual is y − ŷ, not ŷ − y.",
  },
};

export const multipleLinearRegression: SubjectTopic = {
  slug: "multiple-linear-regression",
  title: "Multiple Linear Regression",
  description:
    "Use several features in one regression equation and interpret each coefficient while holding the others fixed.",
  readTime: "15 min",
  difficulty: "Intermediate",
  tags: ["Multiple Regression", "Coefficients", "Matrix Form"],
  learn: {
    opening:
      "Multiple linear regression predicts one numerical target using two or more input features.",
    sections: [
      {
        title: "Why One Feature May Not Be Enough",
        paragraphs: [
          "House price depends on more than area. Bedrooms, age, location, and other features may also contain useful information. A one-feature model may mix these effects into one slope.",
          "Multiple linear regression gives each included feature its own coefficient inside one shared equation.",
        ],
      },
      {
        title: "The Multiple-Regression Equation",
        paragraphs: [
          "For p features, the prediction is an intercept plus one coefficient multiplied by each feature.",
        ],
        formulas: [
          {
            label: "Multiple linear regression",
            expression: "ŷ = β₀ + β₁x₁ + β₂x₂ + … + βₚxₚ",
          },
          {
            label: "Matrix form",
            expression: "ŷ = Xβ",
            note: "When X includes a first column of ones, β includes the intercept.",
          },
        ],
        visual: {
          src: "/notes/machine-learning/multiple-regression-plane.png",
          alt: "Multiple linear regression plane using two input features to predict one numerical target",
          width: 1536,
          height: 1024,
          caption:
            "With two features the fitted surface is a plane; with more features it is a hyperplane.",
        },
        dataTable: {
          headers: ["Quantity", "Dimensions", "Meaning"],
          rows: [
            [
              "X",
              "n × (p + 1)",
              "Design matrix, including the intercept column",
            ],
            ["β", "(p + 1) × 1", "Intercept and p coefficients"],
            ["y", "n × 1", "Observed targets"],
            ["ŷ", "n × 1", "Predicted targets"],
          ],
        },
      },
      {
        title: "Interpret One Coefficient at a Time",
        paragraphs: [
          "βⱼ is the predicted change in y for a one-unit increase in xⱼ while all other included features are held fixed. The phrase holding other features fixed is essential.",
          "A coefficient's unit is target units per feature unit. Coefficients cannot be compared fairly when their features use very different units unless the features are standardized.",
        ],
        problems: [
          {
            title: "Interpret two coefficients",
            prompt:
              "A price model in lakh rupees is ŷ = 12 + 0.045(area) + 4(bedrooms). Area is measured in square feet.",
            steps: [
              "The area coefficient is 0.045 lakh per square foot while bedrooms stay fixed.",
              "An extra 100 square feet changes the prediction by 0.045 × 100 = 4.5 lakh.",
              "The bedroom coefficient is 4 lakh while area stays fixed.",
            ],
            answer:
              "Holding the other feature fixed: +100 sq ft adds 4.5 lakh, and +1 bedroom adds 4 lakh.",
          },
        ],
      },
      {
        title: "Numerical Prediction",
        paragraphs: [
          "Substitute every supplied feature into the same fitted equation. Keep units consistent with the units used during training.",
        ],
        problems: [
          {
            title: "Predict a house price",
            prompt:
              "Use ŷ = 12 + 0.045(area) + 4(bedrooms) for a 1,000 sq ft house with 3 bedrooms.",
            steps: [
              "Area contribution = 0.045 × 1,000 = 45",
              "Bedroom contribution = 4 × 3 = 12",
              "ŷ = 12 + 45 + 12",
            ],
            answer: "Predicted price = 69 lakh rupees.",
          },
        ],
      },
      {
        title: "Categorical Features in the Equation",
        paragraphs: [
          "An encoded binary feature can enter the equation like any other number. Its coefficient compares the represented category with a reference category while the other features stay fixed.",
          "If every category indicator and an intercept are included together, one column becomes perfectly determined by the others. Leave one category as the reference level to avoid this dummy-variable trap.",
        ],
        formulas: [
          {
            label: "Example with a binary indicator",
            expression: "ŷ = β₀ + β₁(area) + β₂(is_city_center)",
            note: "is_city_center is 1 for city centre and 0 for the reference location.",
          },
        ],
      },
      {
        title: "Ordinary Least Squares in Matrix Form",
        paragraphs: [
          "OLS still chooses coefficients that minimize the sum of squared residuals. When the required inverse exists, the coefficients have a closed-form matrix solution.",
          "If columns are perfectly dependent, XᵀX is not invertible. This is one reason perfect multicollinearity must be avoided.",
        ],
        formulas: [
          {
            label: "OLS coefficient solution",
            expression: "β̂ = (XᵀX)⁻¹Xᵀy",
            note: "This form requires an invertible XᵀX; software often uses numerically safer equivalent methods.",
          },
        ],
        problems: [
          {
            title: "Calculate coefficients with the normal equation",
            prompt:
              "For X = [[1, 1], [1, 2]] and y = [2, 3]ᵀ, calculate β̂. The first column of X represents the intercept.",
            steps: [
              "XᵀX = [[2, 3], [3, 5]].",
              "(XᵀX)⁻¹ = [[5, −3], [−3, 2]] because the determinant is 1.",
              "Xᵀy = [5, 8]ᵀ.",
              "β̂ = [[5, −3], [−3, 2]][5, 8]ᵀ = [1, 1]ᵀ.",
              "Therefore, β̂₀ = 1 and β̂₁ = 1.",
            ],
            answer: "The fitted equation is ŷ = 1 + x.",
          },
        ],
      },
      {
        title: "Coefficient Interpretation Has Limits",
        paragraphs: [
          "A coefficient describes the model after controlling for the other included features. It does not prove causation, and its value can change when an important feature is added or removed.",
          "Strongly correlated predictors can make individual coefficients unstable even when overall predictions remain useful. Multicollinearity diagnostics are covered later in this module.",
          "Perfect multicollinearity prevents a unique OLS solution. Strong but imperfect multicollinearity may still allow a solution, but its estimated coefficients can be unstable.",
        ],
      },
      {
        title: "Practice: Build and Read the Equation",
        paragraphs: [
          "Keep the interpretation tied to units and to the phrase holding other features fixed.",
        ],
        problems: [
          {
            title: "Prediction with three features",
            prompt:
              "A salary model is ŷ = 3 + 0.8(experience) + 0.5(skills) + 1.2(postgraduate), measured in lakh rupees. Predict for 5 years of experience, 6 skills, and postgraduate = 1.",
            steps: [
              "Experience contribution = 0.8 × 5 = 4",
              "Skills contribution = 0.5 × 6 = 3",
              "Postgraduate contribution = 1.2 × 1 = 1.2",
              "ŷ = 3 + 4 + 3 + 1.2",
            ],
            answer: "Predicted salary = 11.2 lakh rupees.",
          },
          {
            title: "Interpret a binary coefficient",
            prompt:
              "In the same model, what does β = 1.2 for postgraduate mean?",
            steps: [
              "Compare postgraduate = 1 with the reference postgraduate = 0.",
              "Hold experience and skills fixed.",
              "The predicted difference is 1.2 lakh.",
            ],
            answer:
              "The model predicts 1.2 lakh more for postgraduate = 1, holding the other included features fixed.",
          },
        ],
      },
    ],
    mechanism: {
      title: "How to read a multiple-regression model",
      steps: [
        "Identify the target and every feature with its unit.",
        "Check how categorical features were encoded and identify the reference category.",
        "Read β₀ as the prediction when every numerical feature and indicator equals zero.",
        "Read each βⱼ as change per one unit of xⱼ while other features stay fixed.",
        "For a prediction, substitute all feature values using the training units.",
        "Check for impossible extrapolation, missing important features, and strong predictor correlation.",
      ],
    },
    example: {
      title: "Area and bedrooms",
      body: "A positive bedroom coefficient does not mean adding a bedroom while keeping area fixed is physically easy. It means that among rows with the same modeled area, the equation assigns a different prediction when the bedroom count changes.",
    },
    misconception:
      "A larger raw coefficient does not automatically mean a feature is more important. Coefficient size depends on feature units and correlation with other predictors.",
  },
  revise: {
    definitionLabel: "Core Model",
    compactDefinition: true,
    definition:
      "Multiple linear regression predicts one numerical target using a weighted sum of several features.",
    sections: [
      {
        title: "Essential Formulas",
        formulas: [
          { label: "Scalar form", expression: "ŷ = β₀ + β₁x₁ + … + βₚxₚ" },
          { label: "Matrix form", expression: "ŷ = Xβ" },
          { label: "Closed-form OLS", expression: "β̂ = (XᵀX)⁻¹Xᵀy" },
        ],
      },
      {
        title: "Coefficient Rule",
        points: [
          "Interpret one coefficient while holding other included features fixed.",
          "Always state the target unit per feature unit.",
          "A binary coefficient compares with its reference category.",
          "Raw coefficient size is not a reliable feature-importance ranking.",
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Several features, one numerical target.",
      "For n rows and p features with an intercept, X has n × (p + 1) dimensions.",
      "With two features the fitted surface is a plane.",
      "Leave one category as reference when using an intercept.",
      "Perfect multicollinearity prevents a unique OLS inverse solution.",
      "Association after adjustment is still not proof of causation.",
    ],
    followUp:
      "Why must we say holding other features fixed when interpreting a coefficient?",
  },
  lastMinute: {
    definition:
      "One prediction equals an intercept plus one weighted term per feature.",
    sections: [
      {
        title: "Equation",
        points: ["ŷ = β₀ + β₁x₁ + … + βₚxₚ", "Matrix form: ŷ = Xβ"],
      },
      {
        title: "Interpret Carefully",
        points: [
          "State units",
          "Hold other features fixed",
          "Know the reference category",
          "Do not claim causation",
        ],
      },
    ],
    memoryLine:
      "Each coefficient changes one feature while the others stay fixed.",
    cues: [
      "Several features can explain one numerical target.",
      "Dummy-variable trap means perfect dependence between encoded columns.",
      "Different feature units create differently scaled coefficients.",
    ],
    trap: "Do not compare raw coefficient magnitudes without considering feature units.",
  },
};
