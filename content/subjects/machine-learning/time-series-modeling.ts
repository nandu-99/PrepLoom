import type { SubjectTopic } from "@/lib/subject-content";

export const autocorrelationAcfAndPacf: SubjectTopic = {
  slug: "autocorrelation-acf-and-pacf",
  title: "Autocorrelation, ACF, and PACF",
  description:
    "Measure dependence across lags and use ACF and PACF plots to understand time-series structure.",
  readTime: "18 min",
  difficulty: "Intermediate",
  tags: ["Autocorrelation", "ACF", "PACF"],
  learn: {
    opening:
      "Autocorrelation measures how strongly a series is related to a lagged copy of itself. A lag of k compares yₜ with yₜ₋ₖ.",
    sections: [
      {
        title: "Lag and Autocorrelation",
        paragraphs: [
          "Positive autocorrelation means high values tend to follow high values and low values tend to follow low values at that lag. Negative autocorrelation means values tend to alternate.",
          "Autocorrelation is correlation, not proof that an earlier value causes a later one.",
        ],
        formulas: [
          {
            label: "Sample autocorrelation at lag k",
            expression: "rₖ = Σₜ₌ₖ₊₁ⁿ(yₜ−ȳ)(yₜ₋ₖ−ȳ) / Σₜ₌₁ⁿ(yₜ−ȳ)²",
          },
        ],
        visual: {
          src: "/notes/machine-learning/acf-pacf-reading.png",
          alt: "Time series with ACF and PACF stem plots explaining lag dependence",
          width: 1536,
          height: 1024,
          caption:
            "ACF includes direct and indirect lag relationships; PACF isolates the direct relationship at each lag.",
        },
      },
      {
        title: "ACF",
        paragraphs: [
          "The autocorrelation function plots autocorrelation over several lags. Slowly decaying ACF values can indicate trend or non-stationarity. Repeated peaks at seasonal lags can indicate seasonality.",
        ],
      },
      {
        title: "PACF",
        paragraphs: [
          "Partial autocorrelation at lag k measures the relationship between yₜ and yₜ₋ₖ after removing the linear effects of the shorter lags 1 through k−1.",
          "ACF and PACF are diagnostic guides. Finite samples are noisy, so model orders should also be checked using validated forecast performance and residual behaviour.",
        ],
      },
      {
        title: "Lag-Pair Numerical",
        paragraphs: ["At lag k, the first k observations have no aligned earlier partner."],
        problems: [
          {
            title: "Count usable pairs",
            prompt:
              "A series contains 20 observations. How many aligned pairs are available for autocorrelation at lag 3?",
            steps: [
              "Lag 3 pairs y₄ with y₁, y₅ with y₂, and so on.",
              "The first three observations have no value three steps earlier.",
              "Usable pairs = 20−3.",
            ],
            answer: "There are 17 aligned lag-3 pairs.",
          },
        ],
      },
    ],
    mechanism: {
      title: "Reading dependence plots",
      steps: [
        "Make the series reasonably stationary.",
        "Plot ACF and PACF across justified lags.",
        "Look for decay, cutoffs, and seasonal peaks.",
        "Use the pattern to propose a small set of model orders.",
        "Validate the candidates and inspect residual autocorrelation.",
      ],
    },
    example: {
      title: "Weekly demand",
      body: "A daily series with strong ACF peaks near lags 7, 14, and 21 contains evidence of a weekly repeating dependence pattern.",
    },
    misconception:
      "A spike outside a confidence band is evidence to investigate, not automatic proof that one exact ARIMA order is correct.",
  },
  revise: {
    definitionLabel: "Lag Dependence",
    compactDefinition: true,
    definition:
      "ACF measures total correlation at each lag; PACF measures the direct lag relationship after shorter lags are controlled.",
    sections: [
      {
        title: "Read",
        points: ["Slow ACF decay: check stationarity", "Seasonal peaks: repeating dependence", "PACF: direct lag effect"],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Lag k compares values k time steps apart.",
      "ACF includes indirect effects through shorter lags.",
      "PACF removes shorter-lag linear effects.",
      "Use plots to propose, not prove, model orders.",
    ],
    followUp: "How does PACF differ from ACF at lag k?",
  },
  lastMinute: {
    definition: "ACF shows total lag correlation; PACF isolates direct lag correlation.",
    sections: [
      { title: "Signals", points: ["Slow decay → non-stationarity warning", "Repeated peaks → seasonal pattern"] },
    ],
    memoryLine: "ACF sees the full lag relationship; PACF removes the shorter paths.",
    cues: ["Lag 0 correlation is 1.", "Inspect residual ACF after fitting."],
    trap: "Do not choose an order from one noisy spike alone.",
  },
};

export const arMaArimaAndSeasonalModels: SubjectTopic = {
  slug: "ar-ma-arima-and-seasonal-models",
  title: "AR, MA, ARIMA, and Seasonal Models",
  description:
    "Understand autoregressive, moving-average, differencing, seasonal, and exogenous time-series models.",
  readTime: "20 min",
  difficulty: "Intermediate",
  tags: ["ARIMA", "SARIMA", "Forecasting"],
  learn: {
    opening:
      "Classical time-series models describe a current value using earlier values, earlier forecast errors, and differencing needed for stationarity.",
    sections: [
      {
        title: "Autoregressive Model",
        paragraphs: [
          "An AR(p) model predicts the current value from p earlier values. The coefficients describe how those lags contribute after the other included lags are considered.",
        ],
        formulas: [
          { label: "AR(p)", expression: "yₜ = c + φ₁yₜ₋₁ + … + φₚyₜ₋ₚ + εₜ" },
        ],
        visual: {
          src: "/notes/machine-learning/arima-components.png",
          alt: "ARIMA p d q components showing lagged values, differencing, and lagged forecast errors",
          width: 1536,
          height: 1024,
          caption:
            "ARIMA combines autoregressive lags, differencing, and moving-average error terms.",
        },
      },
      {
        title: "Moving-Average Model",
        paragraphs: [
          "An MA(q) model uses the current random shock and q earlier forecast errors. Here, moving average is a model of lagged errors, not the rolling-average smoothing operation.",
        ],
        formulas: [
          { label: "MA(q)", expression: "yₜ = c + εₜ + θ₁εₜ₋₁ + … + θqεₜ₋q" },
        ],
      },
      {
        title: "ARIMA(p,d,q)",
        dataTable: {
          headers: ["Order", "Meaning"],
          rows: [
            ["p", "Number of autoregressive lag terms"],
            ["d", "Number of differences used"],
            ["q", "Number of lagged forecast-error terms"],
          ],
        },
        paragraphs: [
          "ARIMA first differences the series d times and then models the transformed series with AR and MA terms. Orders should remain as small as the evidence supports.",
        ],
      },
      {
        title: "Seasonal and Exogenous Extensions",
        dataTable: {
          headers: ["Model", "Use"],
          rows: [
            ["SARIMA", "Adds seasonal AR, differencing, and MA terms"],
            ["ARIMAX or SARIMAX", "Adds external predictors such as price or weather"],
            ["VAR", "Models several related time series together"],
          ],
        },
        paragraphs: [
          "External predictors must be available for the forecast horizon. A future weather measurement cannot be used unless a valid weather forecast or planned value is available.",
        ],
      },
      {
        title: "AR Numerical",
        paragraphs: ["Substitute the known lagged values and preserve the sign of every coefficient."],
        problems: [
          {
            title: "Make one AR(2) prediction",
            prompt:
              "Use ŷₜ=2+0.6yₜ₋₁−0.2yₜ₋₂ with yₜ₋₁=10 and yₜ₋₂=8.",
            steps: ["ŷₜ=2+0.6(10)−0.2(8)", "ŷₜ=2+6−1.6"],
            answer: "The one-step prediction is 6.4.",
          },
        ],
      },
    ],
    mechanism: {
      title: "Selecting a classical time-series model",
      steps: [
        "Define the frequency and forecast horizon.",
        "Transform the series only as needed for stable behaviour.",
        "Use ACF and PACF to propose small candidate orders.",
        "Fit candidates only on past observations.",
        "Compare rolling validation forecasts and inspect residual autocorrelation.",
      ],
    },
    example: {
      title: "Monthly demand",
      body: "A monthly series with annual repetition may need a seasonal period of 12. A promotion variable may be included only when its future value is known or planned.",
    },
    misconception:
      "The MA part of ARIMA refers to lagged forecast errors, not simply averaging the last few observed values.",
  },
  revise: {
    definitionLabel: "Model Orders",
    compactDefinition: true,
    definition:
      "ARIMA(p,d,q) combines lagged values, differencing, and lagged forecast errors.",
    sections: [
      {
        title: "Orders",
        points: ["p: AR lags", "d: differences", "q: error lags"],
      },
      {
        title: "Extensions",
        points: ["SARIMA: seasonal terms", "SARIMAX: seasonal plus external inputs", "VAR: several series"],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "AR uses past values.",
      "MA uses past forecast errors.",
      "ARIMA models a differenced series.",
      "Future exogenous values must genuinely be available.",
    ],
    followUp: "What do p, d, and q mean in ARIMA?",
  },
  lastMinute: {
    definition: "ARIMA = past values + differencing + past errors.",
    sections: [
      { title: "Remember", points: ["p → AR", "d → difference", "q → MA"] },
    ],
    memoryLine: "p looks back at values; q looks back at errors.",
    cues: ["Seasonal pattern → SARIMA.", "External inputs → X."],
    trap: "Do not confuse MA error terms with rolling-average smoothing.",
  },
};

export const timeSeriesValidationAndForecastEvaluation: SubjectTopic = {
  slug: "time-series-validation-and-forecast-evaluation",
  title: "Time-Series Validation and Forecast Evaluation",
  description:
    "Evaluate forecasts chronologically using rolling validation, error metrics, residual checks, and seasonal comparisons.",
  readTime: "18 min",
  difficulty: "Intermediate",
  tags: ["Forecast Evaluation", "Rolling Validation", "ANOVA"],
  learn: {
    opening:
      "A forecasting experiment must reproduce the real direction of time. Training uses the past and evaluation uses later observations.",
    sections: [
      {
        title: "Chronological Validation",
        paragraphs: [
          "Random K-fold splitting can leak future information into training. Use a fixed chronological holdout or rolling-origin evaluation, where the training window moves or expands forward through time.",
        ],
        visual: {
          src: "/notes/machine-learning/time-series-rolling-validation.png",
          alt: "Rolling-origin time-series validation with expanding training windows and later validation windows",
          width: 1536,
          height: 1024,
          caption:
            "Every validation window occurs after its training window; the final test period remains untouched.",
        },
      },
      {
        title: "Forecast Error Metrics",
        formulas: [
          { label: "MAE", expression: "MAE=(1/n)Σ|yₜ−ŷₜ|" },
          { label: "MSE", expression: "MSE=(1/n)Σ(yₜ−ŷₜ)²" },
          { label: "RMSE", expression: "RMSE=√MSE" },
        ],
        paragraphs: [
          "MAE gives a direct average absolute miss. RMSE gives extra weight to large misses. Always compare the model with a simple forecast baseline, such as the last observed value or the value from the previous seasonal cycle.",
        ],
      },
      {
        title: "Complete Forecast Numerical",
        paragraphs: ["Use the same forecast errors for every metric so the comparison remains consistent."],
        problems: [
          {
            title: "Calculate MAE and RMSE",
            prompt: "For actual values [10,12,14] and forecasts [9,13,12], find MAE and RMSE.",
            steps: [
              "Errors are [1,−1,2] using actual minus forecast.",
              "MAE=(1+1+2)/3=4/3≈1.33.",
              "MSE=(1²+(−1)²+2²)/3=6/3=2.",
              "RMSE=√2≈1.41.",
            ],
            answer: "MAE≈1.33 and RMSE≈1.41.",
          },
        ],
      },
      {
        title: "Residual Checks",
        paragraphs: [
          "Forecast residuals should have no useful remaining pattern. Residual ACF spikes suggest that the model has left predictable lag structure unused.",
          "Residuals that are approximately white noise have mean near zero, stable variance, and no meaningful autocorrelation. This is a diagnostic goal, not proof that the model is perfect.",
          "Also inspect whether errors change over time, become larger at a particular season, or are dominated by a few unusual events.",
        ],
      },
      {
        title: "ANOVA for Seasonal Group Differences",
        paragraphs: [
          "One-way ANOVA can test whether mean values differ across several seasonal groups, such as months or weekdays. It is supporting evidence, not a complete time-series model, because ordinary ANOVA does not itself model temporal dependence.",
        ],
        formulas: [
          { label: "F statistic", expression: "F = MSbetween / MSwithin" },
        ],
        points: [
          "Large F means between-group variation is large relative to within-group variation.",
          "A significance decision also needs the degrees of freedom and p-value or critical value.",
          "Check independence and variance assumptions before trusting ordinary ANOVA inference.",
        ],
      },
    ],
    mechanism: {
      title: "Reliable forecast evaluation",
      steps: [
        "Choose an evaluation horizon matching real use.",
        "Create chronological training and validation windows.",
        "Fit every transformation and model only on the past window.",
        "Compare forecasts with a simple baseline using MAE or RMSE.",
        "Inspect residuals and their ACF.",
        "Use the latest untouched period once for the final report.",
      ],
    },
    example: {
      title: "Weekly sales forecast",
      body: "A model predicting four weeks ahead should be validated repeatedly on later four-week windows, not on randomly selected individual days.",
    },
    misconception:
      "A low random-split error is not reliable evidence for forecasting when the split allowed future observations to influence training.",
  },
  revise: {
    definitionLabel: "Evaluation Rule",
    compactDefinition: true,
    definition:
      "Train on earlier observations, validate on later windows, compare with a baseline, and inspect residual dependence.",
    sections: [
      {
        title: "Metrics",
        formulas: [
          { label: "MAE", expression: "mean |y−ŷ|" },
          { label: "RMSE", expression: "√mean(y−ŷ)²" },
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Preserve chronological order.",
      "Match validation horizon to deployment.",
      "Compare against a naive or seasonal baseline.",
      "Residual autocorrelation means structure remains.",
      "ANOVA group differences do not replace a forecasting model.",
    ],
    followUp: "Why is random K-fold validation unsafe for ordinary forecasting?",
  },
  lastMinute: {
    definition: "Past trains; later windows validate; latest untouched period tests.",
    sections: [
      {
        title: "Checklist",
        points: ["Chronological split", "Baseline", "MAE/RMSE", "Residual ACF"],
      },
    ],
    memoryLine: "Forecast evaluation must move in the same direction as time.",
    cues: ["No future leakage.", "Use the real forecast horizon."],
    trap: "Do not shuffle a time series for ordinary forecast validation.",
  },
};
