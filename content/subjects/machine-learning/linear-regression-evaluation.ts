import type { SubjectTopic } from "@/lib/subject-content";

export const ridgeAndLassoRegularization: SubjectTopic = {
  slug: "ridge-and-lasso-regularization",
  title: "Ridge and Lasso Regularization",
  description:
    "Control overfitting by penalizing large regression coefficients with L2 or L1 regularization.",
  readTime: "15 min",
  difficulty: "Intermediate",
  tags: ["Regularization", "Ridge", "Lasso"],
  learn: {
    opening:
      "Regularization adds a penalty to the training objective so that a regression model avoids relying on unnecessarily large coefficients.",
    sections: [
      {
        title: "Why Regularization Is Needed",
        paragraphs: [
          "A model can fit training noise, especially when it has many predictors, correlated predictors, or limited data. Its training error may be low while its error on unseen data is high.",
          "Regularization trades a small increase in bias for a possible reduction in variance. The goal is better generalization, not the smallest possible training error.",
        ],
      },
      {
        title: "Ridge Regression: L2 Penalty",
        paragraphs: [
          "Ridge adds the sum of squared coefficient values to the objective. It smoothly shrinks coefficients toward zero and is useful when many predictors contribute small amounts.",
          "Ridge usually does not make coefficients exactly zero, so it normally keeps all predictors in the model.",
        ],
        formulas: [
          {
            label: "Ridge objective",
            expression: "Jᵣᵢdɡₑ = MSE + λ Σⱼ₌₁ᵖ βⱼ²",
            note: "The intercept β₀ is usually not penalized.",
          },
        ],
      },
      {
        title: "Lasso Regression: L1 Penalty",
        paragraphs: [
          "Lasso adds the sum of absolute coefficient values. Its sharp L1 penalty can make some coefficients exactly zero, so it can perform feature selection.",
          "When predictors are strongly correlated, Lasso may keep one and remove another. That selected set can change when the sample changes, so zero coefficients should not be treated as universal proof that a feature is useless.",
        ],
        formulas: [
          {
            label: "Lasso objective",
            expression: "Jₗₐₛₛₒ = MSE + λ Σⱼ₌₁ᵖ |βⱼ|",
            note: "The intercept β₀ is usually not penalized.",
          },
        ],
      },
      {
        title: "How Ridge and Lasso Differ",
        paragraphs: [
          "The penalty shape changes how each method shrinks its fitted coefficients.",
        ],
        visual: {
          src: "/notes/machine-learning/ridge-vs-lasso.png",
          alt: "Side-by-side coefficient paths for Ridge and Lasso as regularization strength increases",
          width: 1536,
          height: 1024,
          caption: "Ridge smoothly shrinks coefficients; Lasso can shrink some coefficients exactly to zero.",
        },
        dataTable: {
          headers: ["Property", "Ridge (L2)", "Lasso (L1)"],
          rows: [
            ["Penalty", "Σβⱼ²", "Σ|βⱼ|"],
            ["Coefficient result", "Shrinks toward zero", "Can become exactly zero"],
            ["Feature selection", "No automatic removal", "Possible automatic selection"],
            ["Correlated features", "Often shares weight among them", "May choose one and suppress others"],
            ["Useful when", "Many features have small effects", "A smaller set of features may be enough"],
          ],
        },
      },
      {
        title: "Understanding λ",
        paragraphs: [
          "The hyperparameter λ controls penalty strength. When λ = 0, both methods reduce to ordinary linear regression. As λ grows, the coefficients are pushed more strongly toward zero.",
          "A very large λ can underfit. Select λ using validation data or cross-validation, then report the final performance on untouched test data.",
        ],
        table: {
          headers: ["λ value", "Effect"],
          rows: [
            ["0", "No regularization; ordinary least squares"],
            ["Moderate", "Balances fit and coefficient size"],
            ["Very large", "Strong shrinkage and possible underfitting"],
          ],
        },
      },
      {
        title: "Why Features Must Be Standardized",
        paragraphs: [
          "Penalties act directly on coefficient sizes. A feature measured in rupees may naturally need a much smaller coefficient than a feature measured in years. Without scaling, the penalty treats these coefficients unfairly.",
          "Standardize numerical predictors using means and standard deviations learned from the training set. Use those same training values for validation, test, and future inputs.",
        ],
        formulas: [
          { label: "Standardization", expression: "z = (x − μₜᵣₐᵢₙ) / σₜᵣₐᵢₙ" },
        ],
      },
      {
        title: "Penalty Numerical",
        paragraphs: [
          "Calculate the penalty and then add it to MSE to obtain the complete regularized objective.",
          "These values demonstrate the two penalty calculations. Do not choose Ridge or Lasso by directly comparing objective values from different penalty definitions; select the model and λ using validation performance.",
        ],
        problems: [
          {
            title: "Compare L1 and L2 penalties",
            prompt: "For β = [3, −2, 1], λ = 0.5, and MSE = 4, find the Ridge and Lasso objective values.",
            steps: [
              "L2 sum = 3² + (−2)² + 1² = 9 + 4 + 1 = 14.",
              "Ridge penalty = λ(L2 sum) = 0.5(14) = 7.",
              "Ridge objective = MSE + penalty = 4 + 7 = 11.",
              "L1 sum = |3| + |−2| + |1| = 3 + 2 + 1 = 6.",
              "Lasso penalty = λ(L1 sum) = 0.5(6) = 3.",
              "Lasso objective = MSE + penalty = 4 + 3 = 7.",
            ],
            answer: "The Ridge objective is 11 and the Lasso objective is 7. These are separate objectives, so 7 versus 11 does not prove that Lasso is the better predictive model.",
          },
        ],
      },
    ],
    mechanism: {
      title: "Regularized regression workflow",
      steps: [
        "Split the data before learning any preprocessing values.",
        "Standardize numerical predictors using the training set.",
        "Choose Ridge or Lasso based on the modelling need.",
        "Compare λ values using validation data or cross-validation.",
        "Refit with the selected setup and evaluate once on the test set.",
        "Use the same fitted scaler and model for future inputs.",
      ],
    },
    example: {
      title: "Correlated house features",
      body: "House area, number of rooms, and built-up area may overlap strongly. Ridge can distribute weight across them and stabilize their coefficients. Lasso may keep only part of that group.",
    },
    misconception:
      "Regularization does not guarantee a better training score. It deliberately restricts the model to improve performance on unseen data.",
  },
  revise: {
    definitionLabel: "Core Idea",
    compactDefinition: true,
    definition:
      "Ridge and Lasso add coefficient penalties to reduce overfitting and improve generalization.",
    sections: [
      {
        title: "Essential Formulas",
        formulas: [
          { label: "Ridge", expression: "MSE + λΣβⱼ²" },
          { label: "Lasso", expression: "MSE + λΣ|βⱼ|" },
        ],
      },
      {
        title: "Fast Comparison",
        points: [
          "Ridge: shrinks coefficients but usually keeps all features.",
          "Lasso: can set some coefficients exactly to zero.",
          "Larger λ means stronger shrinkage.",
          "Standardize before applying either penalty.",
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "λ = 0 gives ordinary linear regression.",
      "A very large λ can cause underfitting.",
      "The intercept is usually not penalized.",
      "Choose λ without looking at the test result.",
      "Ridge usually improves coefficient stability with correlated predictors; Lasso selection may vary.",
    ],
    followUp: "Why should features be standardized before Ridge or Lasso?",
  },
  lastMinute: {
    definition: "Ridge uses squared coefficients; Lasso uses absolute coefficients.",
    sections: [
      {
        title: "Ridge",
        points: ["L2 penalty", "Smooth shrinkage", "Usually no exact zeros", "Good with overlapping predictors"],
      },
      {
        title: "Lasso",
        points: ["L1 penalty", "Can create exact zeros", "Can select features", "May choose among correlated features"],
      },
    ],
    memoryLine: "Ridge reduces; Lasso can remove.",
    cues: [
      "Standardize predictors first.",
      "More λ means more shrinkage.",
      "Tune λ on validation data, not the test set.",
    ],
    trap: "Do not penalize the intercept in the usual formulation.",
  },
};

export const regressionEvaluation: SubjectTopic = {
  slug: "regression-evaluation",
  title: "Regression Evaluation",
  description:
    "Measure numerical prediction quality using MAE, MSE, RMSE, R², and adjusted R².",
  readTime: "16 min",
  difficulty: "Intermediate",
  tags: ["MAE", "RMSE", "R-Squared"],
  learn: {
    opening:
      "A regression metric turns prediction errors into a score. Different metrics emphasize different kinds of mistakes, so the metric must match the problem.",
    sections: [
      {
        title: "Start With Prediction Errors",
        paragraphs: [
          "For evaluation, an error may be written as y − ŷ. MAE ignores its sign, while MSE squares it. The sign convention does not change these two metrics because absolute values or squares are used.",
        ],
        formulas: [
          { label: "Error", expression: "eᵢ = yᵢ − ŷᵢ" },
          { label: "Mean Absolute Error", expression: "MAE = (1/n)Σ|yᵢ − ŷᵢ|" },
          { label: "Mean Squared Error", expression: "MSE = (1/n)Σ(yᵢ − ŷᵢ)²" },
          { label: "Root Mean Squared Error", expression: "RMSE = √MSE" },
        ],
      },
      {
        title: "MAE, MSE, and RMSE",
        paragraphs: [
          "These three metrics summarize the size of the same errors in different ways.",
        ],
        dataTable: {
          headers: ["Metric", "Units", "Effect of large errors", "Best use"],
          rows: [
            ["MAE", "Same as target", "Linear penalty", "Clear average error size; more robust to outliers"],
            ["MSE", "Squared target units", "Strong squared penalty", "Training and tasks where large misses are very costly"],
            ["RMSE", "Same as target", "Strong squared penalty", "Readable error size while emphasizing large misses"],
          ],
        },
        visual: {
          src: "/notes/machine-learning/regression-metrics.png",
          alt: "Common residuals feeding MAE, MSE, RMSE, and R-squared evaluation summaries",
          width: 1536,
          height: 1024,
          caption: "The same prediction errors are summarized differently by each regression metric.",
        },
      },
      {
        title: "R²: Improvement Over a Mean Baseline",
        paragraphs: [
          "R² compares the fitted model's squared error with a simple baseline that predicts the mean target for every observation. R² = 1 is a perfect fit. R² = 0 means no improvement over the mean baseline on that evaluated data.",
          "R² can be negative on unseen data when the model is worse than predicting the evaluation-set mean. It is not a percentage accuracy score.",
        ],
        formulas: [
          { label: "Residual sum of squares", expression: "SSE = Σ(yᵢ − ŷᵢ)²" },
          { label: "Total sum of squares", expression: "TSS = Σ(yᵢ − ȳ)²" },
          { label: "Coefficient of determination", expression: "R² = 1 − SSE/TSS" },
        ],
      },
      {
        title: "Complete Evaluation Numerical",
        paragraphs: [
          "Use the following three predictions to calculate each metric from the same error values.",
          "MAE and MSE both equal about 0.67 in this example only by coincidence. They are not generally equal.",
        ],
        dataTable: {
          headers: ["y", "ŷ", "e = y − ŷ", "|e|", "e²"],
          rows: [
            ["2", "3", "−1", "1", "1"],
            ["4", "4", "0", "0", "0"],
            ["6", "5", "1", "1", "1"],
            ["Total", "", "0", "2", "2"],
          ],
        },
        problems: [
          {
            title: "Find all main metrics",
            prompt: "For y = [2, 4, 6] and ŷ = [3, 4, 5], find MAE, MSE, RMSE, and R².",
            steps: [
              "MAE = (1 + 0 + 1) / 3 = 2/3 ≈ 0.67.",
              "MSE = (1 + 0 + 1) / 3 = 2/3 ≈ 0.67.",
              "RMSE = √(2/3) ≈ 0.82.",
              "ȳ = (2 + 4 + 6) / 3 = 4.",
              "TSS = (2 − 4)² + (4 − 4)² + (6 − 4)² = 8.",
              "R² = 1 − SSE/TSS = 1 − 2/8 = 0.75.",
            ],
            answer: "MAE ≈ 0.67, MSE ≈ 0.67, RMSE ≈ 0.82, and R² = 0.75.",
          },
        ],
      },
      {
        title: "Adjusted R²",
        paragraphs: [
          "For ordinary least squares with an intercept, training R² cannot decrease when another predictor is added and the same data is used. Adjusted R² adds a penalty for using more predictors, so it rises only when a new predictor improves the fit enough.",
          "Here n is the number of observations and p is the number of predictors, excluding the intercept.",
          "Adjusted R² helps compare fitted models, but it does not replace validation or test-set evaluation.",
        ],
        formulas: [
          {
            label: "Adjusted R-squared",
            expression: "Adjusted R² = 1 − [(1 − R²)(n − 1)/(n − p − 1)]",
          },
        ],
        problems: [
          {
            title: "Calculate adjusted R²",
            prompt: "A model has R² = 0.80, n = 20 observations, and p = 3 predictors. Find adjusted R².",
            steps: [
              "Adjusted R² = 1 − [(1 − 0.80)(20 − 1)/(20 − 3 − 1)].",
              "Adjusted R² = 1 − [(0.20)(19)/16].",
              "Adjusted R² = 1 − 0.2375 = 0.7625.",
            ],
            answer: "Adjusted R² = 0.7625.",
          },
        ],
      },
      {
        title: "Choosing and Reporting a Metric",
        paragraphs: [
          "Use MAE when a direct average miss is meaningful and a few extreme errors should not dominate. Use RMSE when large misses deserve extra weight. Use R² to describe improvement over the mean baseline, but pair it with an error metric in target units.",
          "Report performance on unseen test data and compare it with a simple baseline. Also state the target units and data split so the number can be interpreted correctly.",
        ],
        points: [
          "Lower MAE, MSE, and RMSE are better; their minimum is 0.",
          "Higher R² is usually better. It can be negative on unseen data, and it may also be negative for constrained models or models fitted without an intercept.",
          "Metrics from different datasets or target scales cannot be compared blindly.",
          "A strong training score does not prove good generalization.",
        ],
      },
    ],
    mechanism: {
      title: "How to evaluate a regression model",
      steps: [
        "Keep the test data outside training and model selection.",
        "Generate predictions for the test inputs.",
        "Calculate errors in a consistent direction.",
        "Compute a target-unit metric such as MAE or RMSE.",
        "Add R² when improvement over the mean baseline is useful.",
        "Compare with the baseline and interpret the result in the problem's units.",
      ],
    },
    example: {
      title: "Delivery-time errors",
      body: "An MAE of 4 minutes means predictions miss the actual delivery time by 4 minutes on average in absolute terms. It does not mean every prediction is exactly 4 minutes wrong.",
    },
    misconception:
      "R² = 0.80 does not mean predictions are 80% accurate. It means the model explains 80% of the target variation relative to the mean baseline on that evaluated dataset.",
  },
  revise: {
    definitionLabel: "Evaluation Goal",
    compactDefinition: true,
    definition:
      "Regression metrics summarize numerical prediction errors and improvement over a baseline.",
    sections: [
      {
        title: "Essential Formulas",
        formulas: [
          { label: "MAE", expression: "(1/n)Σ|y − ŷ|" },
          { label: "MSE", expression: "(1/n)Σ(y − ŷ)²" },
          { label: "RMSE", expression: "√MSE" },
          { label: "R²", expression: "1 − SSE/TSS" },
          { label: "Adjusted R²", expression: "1 − [(1 − R²)(n − 1)/(n − p − 1)]" },
        ],
      },
      {
        title: "Meaning",
        points: [
          "MAE: average absolute miss in target units.",
          "RMSE: target-unit error that emphasizes large misses.",
          "R²: improvement over predicting the mean.",
          "Adjusted R²: R² with a predictor-count penalty.",
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "MAE and RMSE use the target's units; MSE uses squared units.",
      "Large errors affect MSE and RMSE more strongly than MAE.",
      "R² can be negative on unseen data.",
      "Adjusted R² uses p predictors, excluding the intercept.",
      "Adjusted R² supports model comparison but does not replace test evaluation.",
      "Always compare test performance with a baseline.",
    ],
    followUp: "When would RMSE be more suitable than MAE?",
  },
  lastMinute: {
    definition: "Error metrics measure misses; R² compares the model with the mean baseline.",
    sections: [
      {
        title: "Error Metrics",
        points: ["MAE: absolute errors", "MSE: squared errors", "RMSE: square root of MSE", "Lower is better"],
      },
      {
        title: "Fit Metrics",
        points: ["R² = 1 − SSE/TSS", "Can be negative", "Adjusted R² penalizes extra predictors"],
      },
    ],
    memoryLine: "MAE is direct, RMSE punishes large misses, R² beats the mean.",
    cues: [
      "Use test data for the final report.",
      "State the units and baseline.",
      "Do not call R² an accuracy percentage.",
    ],
    trap: "RMSE is √MSE, not MSE squared.",
  },
};
