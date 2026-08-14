import {
  dataPreparation,
  featuresLabelsAndDatasets,
  introductionToMachineLearning,
  modelGeneralization,
  trainValidationAndTestData,
  typesOfMachineLearning,
} from "@/content/subjects/machine-learning/foundations";
import {
  multipleLinearRegression,
  simpleLinearRegression,
} from "@/content/subjects/machine-learning/linear-regression-basics";
import {
  regressionEvaluation,
  ridgeAndLassoRegularization,
} from "@/content/subjects/machine-learning/linear-regression-evaluation";
import {
  lossFunctionAndGradientDescent,
  regressionAssumptionsAndDiagnostics,
} from "@/content/subjects/machine-learning/linear-regression-training";
import {
  classificationFundamentals,
  logisticRegressionAndSigmoid,
} from "@/content/subjects/machine-learning/classification-basics";
import {
  binaryCrossEntropyAndTraining,
  classificationEvaluation,
} from "@/content/subjects/machine-learning/classification-training-evaluation";
import {
  oddsLogOddsAndCoefficients,
  thresholdAndDecisionBoundary,
} from "@/content/subjects/machine-learning/logistic-interpretation";
import {
  decisionTreeFundamentals,
  entropyAndInformationGain,
} from "@/content/subjects/machine-learning/decision-tree-fundamentals";
import {
  buildingClassificationTree,
  giniImpurityAndBestSplit,
} from "@/content/subjects/machine-learning/decision-tree-splitting";
import {
  regressionTrees,
  treeOverfittingAndPruning,
} from "@/content/subjects/machine-learning/decision-tree-control-regression";
import {
  boostingFundamentals,
  ensembleLearningAndBagging,
  randomForest,
} from "@/content/subjects/machine-learning/ensemble-learning";
import {
  maximumMarginAndSupportVectors,
  svmFundamentalsAndHyperplanes,
} from "@/content/subjects/machine-learning/svm-foundations-margin";
import {
  commonSvmKernels,
  svmTrainingTuningAndEvaluation,
} from "@/content/subjects/machine-learning/svm-kernels-training";
import {
  kernelTrickAndNonlinearSvm,
  softMarginHingeLossAndC,
} from "@/content/subjects/machine-learning/svm-soft-margin-kernels";
import {
  clusteringAndKMeansRecap,
  gaussianDistributionFoundations,
} from "@/content/subjects/machine-learning/gmm-clustering-gaussian";
import {
  gaussianMixtureModelFundamentals,
  likelihoodLatentVariablesAndResponsibilities,
} from "@/content/subjects/machine-learning/gmm-fundamentals-likelihood";
import {
  expectationMaximizationAlgorithm,
  selectingComponentsAndGmmLimitations,
} from "@/content/subjects/machine-learning/gmm-em-selection";
import {
  stationarityAndTransformations,
  timeSeriesComponentsAndDecomposition,
} from "@/content/subjects/machine-learning/time-series-foundations";
import {
  arMaArimaAndSeasonalModels,
  autocorrelationAcfAndPacf,
  timeSeriesValidationAndForecastEvaluation,
} from "@/content/subjects/machine-learning/time-series-modeling";
import type { SubjectContent } from "@/lib/subject-content";

export const machineLearningContent: SubjectContent = {
  order: "06",
  slug: "machine-learning",
  title: "Machine Learning",
  shortTitle: "ML",
  eyebrow: "AI Foundations",
  description:
    "Learn how data becomes a reliable model through clear concepts, careful evaluation, and practical problem solving.",
  estimatedTime: "14-15 hours",
  modules: [
    {
      order: "01",
      title: "Machine Learning Foundations",
      description:
        "Core terminology, learning tasks, datasets, preprocessing, evaluation splits, and model generalization.",
      topics: [
        introductionToMachineLearning,
        typesOfMachineLearning,
        featuresLabelsAndDatasets,
        dataPreparation,
        trainValidationAndTestData,
        modelGeneralization,
      ],
    },
    {
      order: "02",
      title: "Linear Regression",
      description:
        "Best-fit lines, multiple features, gradient descent, assumptions, regularization, evaluation, and worked numericals.",
      topics: [
        simpleLinearRegression,
        multipleLinearRegression,
        lossFunctionAndGradientDescent,
        regressionAssumptionsAndDiagnostics,
        ridgeAndLassoRegularization,
        regressionEvaluation,
      ],
    },
    {
      order: "03",
      title: "Logistic Regression and Classification",
      description:
        "Binary classification, sigmoid probabilities, odds interpretation, thresholds, log loss, evaluation metrics, and worked numericals.",
      topics: [
        classificationFundamentals,
        logisticRegressionAndSigmoid,
        oddsLogOddsAndCoefficients,
        thresholdAndDecisionBoundary,
        binaryCrossEntropyAndTraining,
        classificationEvaluation,
      ],
    },
    {
      order: "04",
      title: "Decision Trees",
      description:
        "Tree structure, entropy, Gini impurity, recursive construction, pruning, regression trees, and worked numericals.",
      topics: [
        decisionTreeFundamentals,
        entropyAndInformationGain,
        giniImpurityAndBestSplit,
        buildingClassificationTree,
        treeOverfittingAndPruning,
        regressionTrees,
      ],
    },
    {
      order: "05",
      title: "Ensemble Learning",
      description:
        "Bagging, Random Forest, boosting, variance reduction, model diversity, and worked prediction numericals.",
      topics: [ensembleLearningAndBagging, randomForest, boostingFundamentals],
    },
    {
      order: "06",
      title: "Support Vector Machines",
      description:
        "Hyperplanes, maximum margin, support vectors, soft margin, hinge loss, kernels, tuning, and worked numericals.",
      topics: [
        svmFundamentalsAndHyperplanes,
        maximumMarginAndSupportVectors,
        softMarginHingeLossAndC,
        kernelTrickAndNonlinearSvm,
        commonSvmKernels,
        svmTrainingTuningAndEvaluation,
      ],
    },
    {
      order: "07",
      title: "Gaussian Mixture Models and EM",
      description:
        "Hard and soft clustering, Gaussian density, GMM responsibilities, EM updates, AIC, BIC, and worked numericals.",
      topics: [
        clusteringAndKMeansRecap,
        gaussianDistributionFoundations,
        gaussianMixtureModelFundamentals,
        likelihoodLatentVariablesAndResponsibilities,
        expectationMaximizationAlgorithm,
        selectingComponentsAndGmmLimitations,
      ],
    },
    {
      order: "08",
      title: "Time Series and Forecasting",
      description:
        "Time-series components, stationarity, ACF, PACF, ARIMA models, chronological validation, and forecast numericals.",
      topics: [
        timeSeriesComponentsAndDecomposition,
        stationarityAndTransformations,
        autocorrelationAcfAndPacf,
        arMaArimaAndSeasonalModels,
        timeSeriesValidationAndForecastEvaluation,
      ],
    },
  ],
};
