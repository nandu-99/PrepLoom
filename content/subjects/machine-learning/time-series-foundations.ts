import type { SubjectTopic } from "@/lib/subject-content";

export const timeSeriesComponentsAndDecomposition: SubjectTopic = {
  slug: "time-series-components-and-decomposition",
  title: "Time Series Components and Decomposition",
  description:
    "Read time-ordered data and separate trend, seasonality, and irregular noise using decomposition.",
  readTime: "17 min",
  difficulty: "Foundation",
  tags: ["Time Series", "Trend", "Seasonality"],
  learn: {
    opening:
      "A time series is a sequence of observations recorded in time order. The order and spacing of observations contain information, so the rows cannot be treated as freely interchangeable.",
    sections: [
      {
        title: "What Makes Time-Series Data Different?",
        paragraphs: [
          "A value may depend on earlier values, and future observations must not be used to predict the past. Examples include daily temperature, monthly sales, and hourly network traffic.",
          "Frequency describes how often observations are recorded. A clearly defined and usually regular frequency makes lags, seasonal cycles, and forecast horizons meaningful.",
        ],
        visual: {
          src: "/notes/machine-learning/time-series-components.png",
          alt: "Time series decomposed into trend, seasonality, and irregular remainder",
          width: 1536,
          height: 1024,
          caption:
            "Decomposition separates long-term movement, repeating cycles, and the remaining irregular variation.",
        },
      },
      {
        title: "Essential Components",
        paragraphs: [
          "These notes show cyclical movement separately from trend so the component list and decomposition formulas remain consistent.",
        ],
        dataTable: {
          headers: ["Component", "Meaning", "Example"],
          rows: [
            [
              "Level",
              "Typical value around which the series varies",
              "Average daily demand",
            ],
            [
              "Trend",
              "Long-term increase or decrease",
              "Demand growing each year",
            ],
            [
              "Seasonality",
              "Pattern repeating at a known period",
              "Higher weekend traffic",
            ],
            [
              "Cycle",
              "Broad rise and fall without a fixed seasonal period",
              "Multi-year business cycle",
            ],
            [
              "Remainder",
              "Variation not explained by the other components",
              "Unexpected event",
            ],
          ],
        },
      },
      {
        title: "Additive and Multiplicative Decomposition",
        paragraphs: [
          "Use an additive view when seasonal variation has roughly the same size across the series. Use a multiplicative view when seasonal variation grows or shrinks with the level.",
        ],
        formulas: [
          { label: "Additive", expression: "yₜ = Tₜ + Sₜ + Cₜ + Rₜ" },
          { label: "Multiplicative", expression: "yₜ = Tₜ × Sₜ × Cₜ × Rₜ" },
        ],
        table: {
          headers: ["Additive", "Multiplicative"],
          rows: [
            [
              "Seasonal size roughly constant",
              "Seasonal size proportional to level",
            ],
            ["Components add", "Components multiply"],
          ],
        },
      },
      {
        title: "Identify the Components",
        paragraphs: [
          "Use the time plot and the scale of recurring variation before selecting a decomposition.",
        ],
        problems: [
          {
            title: "Choose a decomposition",
            prompt:
              "Monthly sales rise over time, and the seasonal swings grow from about 100 units to about 500 units. Which decomposition is more suitable?",
            steps: [
              "The seasonal variation does not remain constant.",
              "Its size grows with the series level.",
            ],
            answer:
              "A multiplicative decomposition is the more suitable starting point.",
          },
        ],
      },
    ],
    mechanism: {
      title: "How to inspect a time series",
      steps: [
        "Confirm the timestamp, frequency, forecast horizon, and missing time points.",
        "If spacing is irregular, resample to a justified frequency; interpolate only when the meaning of the data supports it.",
        "Plot the values in chronological order.",
        "Look for level, trend, repeating seasonality, and unusual events.",
        "Choose additive or multiplicative decomposition from the seasonal scale.",
      ],
    },
    example: {
      title: "Electricity demand",
      body: "Hourly demand may contain a long-term trend, a daily cycle, a weekly cycle, and irregular changes caused by weather or events.",
    },
    misconception:
      "Seasonality is a repeating pattern with a meaningful period. Any random rise and fall is not automatically seasonal.",
  },
  revise: {
    definitionLabel: "Time-Ordered Data",
    compactDefinition: true,
    definition:
      "A time series preserves temporal order and may contain level, trend, seasonality, and irregular remainder.",
    sections: [
      {
        title: "Decomposition",
        formulas: [
          { label: "Additive", expression: "yₜ=Tₜ+Sₜ+Cₜ+Rₜ" },
          { label: "Multiplicative", expression: "yₜ=Tₜ×Sₜ×Cₜ×Rₜ" },
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Order and frequency matter.",
      "Trend is long-term movement.",
      "Seasonality repeats at a known period.",
      "A cycle is broader and has no fixed seasonal period.",
      "Use multiplicative decomposition when seasonal size changes with level.",
    ],
    followUp:
      "How does seasonal amplitude distinguish additive and multiplicative decomposition?",
  },
  lastMinute: {
    definition:
      "Time order can contain trend, repeating seasonality, and remainder.",
    sections: [
      {
        title: "Choose",
        points: [
          "Constant seasonal size → additive",
          "Proportional seasonal size → multiplicative",
        ],
      },
    ],
    memoryLine: "Plot in time order before choosing a model.",
    cues: ["Know the frequency.", "Do not shuffle time."],
    trap: "Do not call irregular noise seasonality.",
  },
};

export const stationarityAndTransformations: SubjectTopic = {
  slug: "stationarity-and-transformations",
  title: "Stationarity and Transformations",
  description:
    "Understand stable time-series behaviour and use differencing or log transformation when necessary.",
  readTime: "17 min",
  difficulty: "Intermediate",
  tags: ["Stationarity", "Differencing", "Transformation"],
  learn: {
    opening:
      "Many classical forecasting models assume that the statistical behaviour of a series remains reasonably stable over time.",
    sections: [
      {
        title: "Weak Stationarity",
        paragraphs: [
          "A weakly stationary series has a constant mean, constant finite variance, and autocovariance that depends on the lag rather than the calendar time.",
          "A trend or a deterministic seasonal mean is evidence against stationarity. Changing seasonal amplitude also changes variance. A flat-looking plot alone does not prove stationarity.",
        ],
        visual: {
          src: "/notes/machine-learning/stationarity-transformations.png",
          alt: "Non-stationary trending series transformed by differencing into a stable stationary series",
          width: 1536,
          height: 1024,
          caption:
            "Differencing removes changes in level; a log transform can stabilize variation that grows with the level.",
        },
        dataTable: {
          headers: ["Property", "Stationary requirement"],
          rows: [
            ["Mean", "Stable over time"],
            ["Variance", "Stable over time"],
            ["Dependence", "Depends on lag, not absolute time"],
          ],
        },
      },
      {
        title: "First Differencing",
        paragraphs: [
          "First differencing replaces each value with its change from the previous value. It can remove a changing level or a simple trend.",
          "Differencing too many times can create unnecessary noise and dependence. Use only the amount supported by the data and model checks.",
        ],
        formulas: [
          { label: "First difference", expression: "Δyₜ = yₜ − yₜ₋₁" },
        ],
        problems: [
          {
            title: "Calculate first differences",
            prompt: "For y=[10,13,15,20], find the first-differenced series.",
            steps: ["13−10=3", "15−13=2", "20−15=5"],
            answer: "The first differences are [3,2,5].",
          },
        ],
      },
      {
        title: "Seasonal Differencing",
        paragraphs: [
          "Seasonal differencing subtracts the value from the same position in the previous cycle. Use it only when a repeating seasonal pattern remains.",
        ],
        formulas: [
          { label: "Seasonal difference", expression: "Δₛyₜ = yₜ − yₜ₋ₛ" },
        ],
      },
      {
        title: "Log Transformation",
        paragraphs: [
          "A logarithm can reduce variation that grows with the series level and turn some multiplicative patterns into approximately additive ones.",
          "A direct log requires positive values. Zeros or negative values need a justified alternative rather than blindly applying the formula.",
        ],
        formulas: [{ label: "Log transform", expression: "zₜ = ln(yₜ)" }],
      },
      {
        title: "Order of Operations",
        paragraphs: [
          "A common workflow is to stabilize changing variance first and then difference if a trend remains. The correct transformation depends on the observed series; it is not a compulsory fixed recipe.",
        ],
        flow: [
          "Plot series",
          "Stabilize variance if needed",
          "Difference if needed",
          "Recheck behaviour",
        ],
      },
    ],
    mechanism: {
      title: "Preparing a series for a classical model",
      steps: [
        "Plot the original series.",
        "Check whether mean and variance visibly change.",
        "Apply only a justified log, ordinary difference, or seasonal difference.",
        "Replot the transformed series and inspect its dependence structure.",
      ],
    },
    example: {
      title: "Growing seasonal sales",
      body: "Taking logs can stabilize expanding seasonal swings; differencing the transformed series can then remove a remaining trend.",
    },
    misconception:
      "Stationarity does not mean every value is constant. A stationary series can fluctuate strongly while keeping stable statistical behaviour.",
  },
  revise: {
    definitionLabel: "Stable Behaviour",
    compactDefinition: true,
    definition:
      "Weak stationarity requires stable mean and variance, with dependence determined by lag rather than calendar time.",
    sections: [
      {
        title: "Transforms",
        points: [
          "Difference: remove changing level",
          "Seasonal difference: remove a repeating seasonal mean",
          "Log: stabilize growing spread",
        ],
        formulas: [
          { label: "Difference", expression: "Δyₜ=yₜ−yₜ₋₁" },
          { label: "Seasonal difference", expression: "Δₛyₜ=yₜ−yₜ₋ₛ" },
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Trend usually breaks stationarity.",
      "Changing variance usually breaks stationarity.",
      "Avoid unnecessary repeated differencing.",
      "Recheck the series after transformation.",
    ],
    followUp: "What problem does first differencing try to remove?",
  },
  lastMinute: {
    definition:
      "Stationary behaviour is stable over time, not flat or motionless.",
    sections: [
      {
        title: "Tools",
        points: [
          "Δyₜ=yₜ−yₜ₋₁",
          "Δₛyₜ=yₜ−yₜ₋ₛ",
          "Log for spread that grows with level",
        ],
      },
    ],
    memoryLine: "Transform only when the series shows a reason.",
    cues: ["Stable mean.", "Stable variance.", "Lag-based dependence."],
    trap: "Do not keep differencing until the plot merely looks noisy.",
  },
};
