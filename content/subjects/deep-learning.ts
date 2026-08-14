import {
  artificialNeuronWeightsAndBias,
  introductionToDeepLearning,
  tensorsShapesAndBatches,
} from "@/content/subjects/deep-learning/foundations-a";
import {
  activationFunctions,
  forwardPropagationAndParameterCounting,
  layersAndFeedforwardNetworks,
} from "@/content/subjects/deep-learning/foundations-b";
import {
  gradientsAndChainRule,
  mseAndCrossEntropyLoss,
  predictionsTargetsAndLoss,
} from "@/content/subjects/deep-learning/training-a";
import {
  backpropagation,
  gradientDescentAndLearningRate,
  optimizersAndInitialization,
} from "@/content/subjects/deep-learning/training-b";
import {
  l1L2AndWeightDecay,
  trainingValidationAndTestSets,
  underfittingOverfittingAndLearningCurves,
} from "@/content/subjects/deep-learning/generalization-a";
import {
  dropoutAndEarlyStopping,
  normalization,
  stableTrainingAndHyperparameterTuning,
} from "@/content/subjects/deep-learning/generalization-b";
import {
  convolutionOperationAndFeatureMaps,
  imageTensorsAndCnnIntuition,
  paddingStrideAndOutputSize,
} from "@/content/subjects/deep-learning/cnn-a";
import {
  channelsFiltersAndParameterCounting,
  cnnArchitectureAndTransferLearning,
  poolingAndReceptiveFields,
} from "@/content/subjects/deep-learning/cnn-b";
import {
  backpropagationThroughTime,
  rnnForwardPropagation,
  sequentialDataAndRnnIntuition,
} from "@/content/subjects/deep-learning/rnn-a";
import {
  gruAndPracticalSequenceModelling,
  lstmNetworks,
  rnnGradientProblems,
} from "@/content/subjects/deep-learning/rnn-b";
import {
  scaledDotProductAttention,
  selfAndMultiHeadAttention,
  sequenceToSequenceAndAttentionIntuition,
} from "@/content/subjects/deep-learning/transformer-a";
import {
  positionalInformationAndMasks,
  transformerEncoderAndDecoder,
  transformerTrainingInferenceAndSelection,
} from "@/content/subjects/deep-learning/transformer-b";
import { curateTopicSections } from "@/content/subjects/curation";
import type { SubjectContent } from "@/lib/subject-content";

const conciseMseAndCrossEntropyLoss = curateTopicSections(
  mseAndCrossEntropyLoss,
  {
    readTime: "17 min",
    omitLearnSections: ["Mean Squared Error", "Binary Cross-Entropy"],
  },
);

const conciseGradientDescentAndLearningRate = curateTopicSections(
  gradientDescentAndLearningRate,
  {
    readTime: "16 min",
    omitLearnSections: ["The Update Rule", "What the Learning Rate Controls"],
  },
);

const conciseTrainingValidationAndTestSets = curateTopicSections(
  trainingValidationAndTestSets,
  {
    readTime: "12 min",
    omitLearnSections: [
      "Three Sets, Three Jobs",
      "Choosing Split Sizes",
      "Random, Stratified, Grouped, and Time-Based Splits",
    ],
  },
);

const conciseUnderfittingOverfittingAndLearningCurves = curateTopicSections(
  underfittingOverfittingAndLearningCurves,
  {
    readTime: "14 min",
    omitLearnSections: [
      "Generalization",
      "Underfitting, Good Fit, and Overfitting",
      "Bias and Variance",
    ],
  },
);

const conciseL1L2AndWeightDecay = curateTopicSections(l1L2AndWeightDecay, {
  readTime: "15 min",
  omitLearnSections: ["L1 Regularization", "L2 Regularization", "L1 versus L2"],
});

const conciseNormalization = curateTopicSections(normalization, {
  readTime: "20 min",
  omitLearnSections: ["Input Standardization"],
});

export const deepLearningContent: SubjectContent = {
  order: "07",
  slug: "deep-learning",
  title: "Deep Learning",
  shortTitle: "DL",
  eyebrow: "AI Foundations",
  description:
    "Understand how neural networks learn and generalize, then apply CNNs, recurrent networks, attention, and Transformers to spatial and sequential data.",
  estimatedTime: "14-15 hours",
  modules: [
    {
      order: "01",
      title: "Neural Network Foundations",
      description:
        "Deep-learning purpose, tensors, artificial neurons, activation functions, feedforward layers, forward propagation, and parameter-count numericals.",
      topics: [
        introductionToDeepLearning,
        tensorsShapesAndBatches,
        artificialNeuronWeightsAndBias,
        activationFunctions,
        layersAndFeedforwardNetworks,
        forwardPropagationAndParameterCounting,
      ],
    },
    {
      order: "02",
      title: "How Neural Networks Learn",
      description:
        "Predictions and loss functions, MSE and cross-entropy numericals, gradients, chain rule, backpropagation, gradient descent, optimizers, and initialization.",
      topics: [
        predictionsTargetsAndLoss,
        conciseMseAndCrossEntropyLoss,
        gradientsAndChainRule,
        backpropagation,
        conciseGradientDescentAndLearningRate,
        optimizersAndInitialization,
      ],
    },
    {
      order: "03",
      title: "Improving Training and Generalization",
      description:
        "Leakage-safe data splits, learning-curve diagnosis, L1 and L2 regularization, dropout, early stopping, normalization, gradient stability, and controlled hyperparameter tuning.",
      topics: [
        conciseTrainingValidationAndTestSets,
        conciseUnderfittingOverfittingAndLearningCurves,
        conciseL1L2AndWeightDecay,
        dropoutAndEarlyStopping,
        conciseNormalization,
        stableTrainingAndHyperparameterTuning,
      ],
    },
    {
      order: "04",
      title: "Convolutional Neural Networks",
      description:
        "Image tensors, convolution calculations, padding and stride numericals, multi-channel filters, parameter counting, pooling, receptive fields, CNN architecture, and transfer learning.",
      topics: [
        imageTensorsAndCnnIntuition,
        convolutionOperationAndFeatureMaps,
        paddingStrideAndOutputSize,
        channelsFiltersAndParameterCounting,
        poolingAndReceptiveFields,
        cnnArchitectureAndTransferLearning,
      ],
    },
    {
      order: "05",
      title: "Recurrent Neural Networks and Sequence Learning",
      description:
        "Sequential data, recurrent hidden states, forward calculations, parameter counting, BPTT, gradient stability, LSTM and GRU gates, padding, masking, and sequence numericals.",
      topics: [
        sequentialDataAndRnnIntuition,
        rnnForwardPropagation,
        backpropagationThroughTime,
        rnnGradientProblems,
        lstmNetworks,
        gruAndPracticalSequenceModelling,
      ],
    },
    {
      order: "06",
      title: "Attention and Transformers",
      description:
        "Encoder-decoder attention, Q-K-V calculations, scaled and multi-head attention, positional information, masks, Transformer blocks, parameter counting, teacher forcing, and architecture selection.",
      topics: [
        sequenceToSequenceAndAttentionIntuition,
        scaledDotProductAttention,
        selfAndMultiHeadAttention,
        positionalInformationAndMasks,
        transformerEncoderAndDecoder,
        transformerTrainingInferenceAndSelection,
      ],
    },
  ],
};
