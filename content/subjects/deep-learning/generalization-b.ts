import type { SubjectTopic } from "@/lib/subject-content";

export const dropoutAndEarlyStopping: SubjectTopic = {
  slug: "dropout-and-early-stopping",
  title: "Dropout and Early Stopping",
  description:
    "Reduce co-adaptation during training and stop at the checkpoint with the best validation behaviour.",
  readTime: "22 min",
  difficulty: "Intermediate",
  tags: ["Dropout", "Early Stopping", "Generalization"],
  learn: {
    opening:
      "Dropout changes the network used during training, while early stopping controls how long training continues. Both can reduce overfitting.",
    sections: [
      {
        title: "How Dropout Works",
        paragraphs: [
          "During training, dropout independently removes selected activations using a random binary mask. The removed units contribute zero for that forward and backward pass.",
          "A new mask is sampled across training steps. This prevents units from depending too strongly on particular other units and encourages more distributed representations.",
        ],
        visual: {
          src: "/notes/deep-learning/dropout-early-stopping.png",
          alt: "Dropout during training compared with full inference network and early stopping at minimum validation loss",
          width: 1536,
          height: 1024,
          caption:
            "Dropout is active only during training; early stopping restores the checkpoint with the best monitored validation result.",
        },
      },
      {
        title: "Drop Probability and Keep Probability",
        paragraphs: [
          "Let p be the probability of dropping a unit and q = 1 − p be the probability of keeping it. Larger p means stronger dropout.",
          "Dropout that is too strong removes too much useful capacity and can cause underfitting. The value is a hyperparameter selected with validation data.",
        ],
        formulas: [
          { label: "Keep probability", expression: "q = 1 − p" },
          { label: "Binary mask", expression: "mᵢ ~ Bernoulli(q)" },
        ],
      },
      {
        title: "Inverted Dropout",
        paragraphs: [
          "Modern implementations usually use inverted dropout. Kept activations are divided by q during training so that their expected scale stays approximately unchanged.",
          "At inference, dropout is disabled and no extra scaling is needed. Evaluation must place the model in inference mode.",
        ],
        formulas: [
          { label: "Training", expression: "ã = (m ⊙ a)/q" },
          { label: "Inference", expression: "ã = a" },
          { label: "Expected training activation", expression: "E[ã] = a" },
        ],
      },
      {
        title: "Where Dropout Is Applied",
        paragraphs: [
          "Dropout is commonly applied to hidden activations rather than directly to the final prediction. The same mask must be used consistently for the corresponding forward and backward computation.",
          "Dropout is not automatically useful in every architecture. Add it when validation evidence shows a need for regularization rather than assuming more dropout is always better.",
        ],
      },
      {
        title: "Early Stopping",
        paragraphs: [
          "Early stopping monitors a validation quantity after each evaluation. When that quantity stops improving for a chosen patience, training stops and the best checkpoint is restored.",
          "Patience allows normal noise without stopping immediately. The monitored direction matters: validation loss is minimized, while a metric such as accuracy is maximized.",
        ],
        dataTable: {
          headers: ["Term", "Meaning"],
          rows: [
            ["Monitor", "Validation loss or selected validation metric"],
            ["Best checkpoint", "Parameters at the best monitored value"],
            ["Patience", "Allowed evaluations without improvement"],
            ["Minimum change", "Smallest change counted as improvement"],
          ],
        },
      },
      {
        title: "Practice",
        paragraphs: [
          "For dropout, distinguish p from q. For early stopping, track the best epoch separately from the stopping epoch.",
        ],
        problems: [
          {
            title: "Inverted dropout calculation",
            prompt:
              "Activations are a = [2, 4, 6, 8], dropout probability p = 0.5, and mask m = [1, 0, 1, 0]. Find the training output.",
            steps: [
              "Keep probability q = 1 − 0.5 = 0.5.",
              "Apply the mask: m ⊙ a = [2, 0, 6, 0].",
              "Divide kept values by q: [2, 0, 6, 0]/0.5.",
            ],
            answer: "The inverted-dropout output is [4, 0, 12, 0].",
          },
          {
            title: "Expected active units",
            prompt:
              "A hidden layer has 200 units and dropout probability p = 0.25. How many units are expected to remain active in one training pass?",
            steps: [
              "q = 1 − p = 0.75.",
              "Expected active count = 200 × 0.75 = 150.",
              "The actual count can vary because masks are random.",
            ],
            answer: "The expected active count is 150 units.",
          },
          {
            title: "Patience and checkpoint",
            prompt:
              "Validation losses for epochs 1–5 are [0.50, 0.40, 0.35, 0.36, 0.37]. With patience 2 and no minimum-change threshold, when does training stop and which checkpoint is restored?",
            steps: [
              "The best loss is 0.35 at epoch 3.",
              "Epochs 4 and 5 give two consecutive evaluations without improvement.",
              "Patience is exhausted after epoch 5.",
            ],
            answer: "Stop after epoch 5 and restore the epoch 3 checkpoint.",
          },
        ],
      },
    ],
    mechanism: {
      title: "Using dropout with early stopping",
      steps: [
        "Choose dropout probability p using validation evidence.",
        "Sample masks and apply inverted dropout during training only.",
        "Disable dropout for validation and inference.",
        "Evaluate the chosen validation quantity regularly.",
        "Save a checkpoint whenever that quantity improves.",
        "Stop after patience is exhausted and restore the best checkpoint.",
      ],
    },
    example: {
      title: "Best epoch differs from stop epoch",
      body: "With patience 3, the model may stop three evaluations after its best validation result. The final deployed parameters should come from the best checkpoint, not automatically from the last epoch.",
    },
    misconception:
      "Dropout is not active in normal inference, and early stopping does not mean keeping the parameters from the final attempted epoch.",
  },
  revise: {
    definition:
      "Dropout randomly masks training activations; early stopping restores the best validation checkpoint.",
    sections: [
      {
        title: "Inverted Dropout",
        formulas: [
          { expression: "q = 1 − p" },
          { expression: "train: ã = (m ⊙ a)/q" },
          { expression: "inference: ã = a" },
        ],
      },
      {
        title: "Early Stopping Flow",
        flow: [
          "Evaluate validation",
          "Save improvement",
          "Count no-improvement",
          "Stop",
          "Restore best",
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "p is drop probability; q is keep probability.",
      "A fresh mask is used during training.",
      "Inverted dropout preserves expected activation scale.",
      "Disable dropout for validation and inference.",
      "Patience controls when to stop, not which checkpoint is best.",
    ],
    followUp:
      "Why does inverted dropout divide kept activations by the keep probability?",
  },
  lastMinute: {
    definition: "Train with random masks; infer with the full network.",
    sections: [
      {
        title: "Dropout",
        points: [
          "q = 1 − p",
          "Training: mask and divide by q",
          "Inference: no mask",
        ],
      },
      {
        title: "Early Stop",
        flow: [
          "Monitor validation",
          "Save best",
          "Wait patience",
          "Restore best",
        ],
      },
    ],
    memoryLine:
      "Dropout changes training passes; early stopping chooses training duration.",
    cues: [
      "More dropout is not always better.",
      "Best epoch can be earlier than stop epoch.",
      "Validation runs in inference mode.",
    ],
    trap: "Do not apply inverted-dropout scaling again during inference.",
  },
};

export const normalization: SubjectTopic = {
  slug: "normalization",
  title: "Input Normalization and Batch Normalization",
  description:
    "Standardize inputs safely and understand Batch Normalization during training and inference.",
  readTime: "26 min",
  difficulty: "Intermediate",
  tags: ["Normalization", "BatchNorm", "Numericals"],
  learn: {
    opening:
      "Normalization keeps numerical scales controlled. Input normalization prepares data before the model, while Batch Normalization operates inside the network.",
    sections: [
      {
        title: "Input Standardization",
        paragraphs: [
          "Features with very different scales can make optimization harder. Standardization subtracts a training-set feature mean and divides by its training-set standard deviation.",
          "Fit μ and σ using training data only. Reuse those fixed training statistics for validation, test, and inference to avoid leakage and keep the transformation consistent.",
        ],
        formulas: [
          {
            label: "Standardization",
            expression: "xstandard = (x − μtrain)/√(σtrain² + ε)",
          },
        ],
      },
      {
        title: "Batch Normalization Steps",
        paragraphs: [
          "Batch Normalization, or BatchNorm, normalizes each selected feature using mini-batch statistics. A small ε prevents division by zero.",
          "Learnable scale γ and shift β follow normalization. They allow the layer to choose a useful output scale and offset instead of forcing every output to stay at zero mean and unit variance.",
          "A common ordering is affine or convolution operation, then BatchNorm, then activation. Because BatchNorm adds β, the preceding layer's bias is often unnecessary.",
        ],
        visual: {
          src: "/notes/deep-learning/batch-normalization.png",
          alt: "Batch Normalization pipeline from batch statistics through normalization, scale, shift, and output",
          width: 1536,
          height: 1024,
          caption:
            "BatchNorm normalizes with batch statistics during training, then applies learnable γ and β.",
        },
        formulas: [
          { label: "Batch mean", expression: "μᴮ = (1/m)Σᵢxᵢ" },
          { label: "Batch variance", expression: "σᴮ² = (1/m)Σᵢ(xᵢ − μᴮ)²" },
          { label: "Normalize", expression: "x̂ᵢ = (xᵢ − μᴮ)/√(σᴮ² + ε)" },
          { label: "Scale and shift", expression: "yᵢ = γx̂ᵢ + β" },
        ],
      },
      {
        title: "Training and Inference Differ",
        paragraphs: [
          "During training, BatchNorm uses current mini-batch mean and variance and updates running statistics. During inference, it uses the stored running mean and variance so that one prediction does not depend on other examples in a temporary batch.",
          "The model must switch to inference mode for validation, testing, and deployment. Otherwise dropout and BatchNorm behave incorrectly.",
        ],
        table: {
          headers: ["Training", "Inference"],
          rows: [
            ["Current mini-batch statistics", "Stored running statistics"],
            ["Update running values", "Do not update running values"],
            ["γ and β are learned", "Use learned γ and β"],
          ],
        },
      },
      {
        title: "Features, Channels, and Parameters",
        paragraphs: [
          "For a dense layer, normalization statistics are usually calculated separately for each feature across the batch. For a convolutional feature map, BatchNorm commonly calculates one set per channel across batch and spatial positions.",
          "A BatchNorm layer with d normalized features has d trainable γ values and d trainable β values, giving 2d trainable parameters. Running mean and variance are stored state, not trainable parameters.",
        ],
        formulas: [
          {
            label: "Trainable BatchNorm parameters",
            expression: "parameters = d γ-values + d β-values = 2d",
          },
        ],
      },
      {
        title: "Benefits and Limits",
        paragraphs: [
          "BatchNorm often improves optimization by keeping internal scales controlled and can allow larger learning rates. Its batch noise may also have a mild regularizing effect.",
          "Very small batches give noisy statistics, and train/inference mode mistakes can produce poor results. BatchNorm does not replace correct input preprocessing or solve every training problem.",
        ],
      },
      {
        title: "Practice",
        paragraphs: [
          "Calculate mean, variance, normalized values, and the γ/β transformation in that order.",
        ],
        problems: [
          {
            title: "Input standardization",
            prompt:
              "A feature has training mean μ = 50 and standard deviation σ = 10. Standardize x = 65, ignoring ε.",
            steps: [
              "xstandard = (x − μ)/σ.",
              "xstandard = (65 − 50)/10 = 1.5.",
            ],
            answer: "The standardized value is 1.5.",
          },
          {
            title: "Complete BatchNorm numerical",
            prompt:
              "For one feature, a batch contains [1, 3]. Use population variance, ε = 0 for hand calculation, γ = 2, and β = 0.5.",
            steps: [
              "Mean μᴮ = (1 + 3)/2 = 2.",
              "Variance σᴮ² = [(1 − 2)² + (3 − 2)²]/2 = 1.",
              "Normalized values x̂ = [−1, 1].",
              "Output y = 2x̂ + 0.5 = [−1.5, 2.5].",
            ],
            answer:
              "BatchNorm output is [−1.5, 2.5]. Real implementations use positive ε.",
          },
          {
            title: "Parameter count",
            prompt:
              "A dense layer output has 128 features followed by BatchNorm. How many trainable BatchNorm parameters are added?",
            steps: [
              "There is one γ per feature: 128.",
              "There is one β per feature: 128.",
              "Running mean and variance are not trainable parameters.",
            ],
            answer: "BatchNorm adds 128 + 128 = 256 trainable parameters.",
          },
        ],
      },
    ],
    mechanism: {
      title: "BatchNorm training flow",
      steps: [
        "Receive activations for the mini-batch.",
        "Calculate mean and variance for each normalized feature or channel.",
        "Normalize using the batch statistics and ε.",
        "Apply learned scale γ and shift β.",
        "Backpropagate through every operation.",
        "Update running statistics for later inference.",
      ],
    },
    example: {
      title: "Single prediction at deployment",
      body: "A deployed model may receive one example at a time. Stored running statistics make its BatchNorm output stable instead of depending on whichever other examples happen to arrive together.",
    },
    misconception:
      "BatchNorm is not identical during training and inference. Training uses batch statistics; inference uses stored running statistics.",
  },
  revise: {
    definition:
      "BatchNorm normalizes internal values, then learns a scale γ and shift β.",
    sections: [
      {
        title: "Formula",
        formulas: [
          { expression: "x̂ = (x − μᴮ)/√(σᴮ² + ε)" },
          { expression: "y = γx̂ + β" },
        ],
      },
      {
        title: "Modes",
        table: {
          headers: ["Train", "Inference"],
          rows: [
            ["Batch statistics", "Running statistics"],
            ["Update running state", "Fixed running state"],
          ],
        },
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Fit input-normalization statistics on training data only.",
      "ε prevents division by zero.",
      "γ and β are trainable.",
      "Running mean and variance are not trainable.",
      "A d-feature BatchNorm layer adds 2d trainable parameters.",
    ],
    followUp:
      "Why should BatchNorm use running statistics instead of the current batch during inference?",
  },
  lastMinute: {
    definition: "Normalize, then scale with γ and shift with β.",
    sections: [
      {
        title: "Pipeline",
        flow: ["Batch values", "μ and σ²", "x̂", "γx̂ + β"],
        wide: true,
      },
      {
        title: "Modes",
        points: [
          "Training → batch stats",
          "Inference → running stats",
          "Parameters → 2d",
        ],
      },
    ],
    memoryLine: "Batch statistics train; running statistics serve.",
    cues: [
      "Standardize inputs with train-only statistics.",
      "Keep ε inside the square root.",
      "Small batches give noisy BatchNorm estimates.",
    ],
    trap: "Do not update BatchNorm running statistics during validation or inference.",
  },
};

export const stableTrainingAndHyperparameterTuning: SubjectTopic = {
  slug: "stable-training-and-hyperparameter-tuning",
  title: "Stable Training and Hyperparameter Tuning",
  description:
    "Recognize unstable gradients, clip them correctly, and tune essential training choices in a controlled order.",
  readTime: "27 min",
  difficulty: "Intermediate",
  tags: ["Gradient Clipping", "Diagnostics", "Tuning"],
  learn: {
    opening:
      "Good training depends on measurement. Loss curves, gradient norms, and activation values help identify the cause before hyperparameters are changed.",
    sections: [
      {
        title: "Vanishing and Exploding Gradients",
        paragraphs: [
          "Deep backpropagation multiplies many local derivatives. Repeated small factors can make early-layer gradients nearly zero; repeated large factors can make them extremely large.",
          "Vanishing gradients slow or stop learning in early layers. Exploding gradients cause unstable updates, sudden loss spikes, infinity, or NaN values.",
        ],
        dataTable: {
          headers: ["Problem", "Common evidence"],
          rows: [
            ["Vanishing", "Early-layer gradient norms near zero"],
            ["Exploding", "Very large gradient norms or loss spikes"],
            [
              "Numerical failure",
              "NaN or infinity in loss, activations, or parameters",
            ],
          ],
        },
      },
      {
        title: "Stabilization Tools",
        paragraphs: [
          "Suitable activations and Xavier or He initialization help preserve signal scale. Normalization controls internal values, and residual connections provide shorter gradient paths in deep networks.",
          "A smaller learning rate can reduce unstable updates. Gradient clipping directly limits excessive gradients, but it does not fix the underlying cause of every instability.",
        ],
      },
      {
        title: "Gradient Clipping by Global Norm",
        paragraphs: [
          "Global-norm clipping treats all parameter gradients as one combined vector. If its norm exceeds threshold c, every gradient is multiplied by the same factor so direction is preserved and the new norm equals c.",
          "If the norm is already at or below c, gradients remain unchanged. Clip after backpropagation and before the optimizer update.",
        ],
        visual: {
          src: "/notes/deep-learning/gradient-clipping-diagnostics.png",
          alt: "Oversized gradient clipped to a norm threshold beside a loss and hyperparameter diagnostic loop",
          width: 1536,
          height: 1024,
          caption:
            "Clipping limits an excessive gradient; diagnosis still determines which training choice should change.",
        },
        formulas: [
          { label: "Global norm", expression: "‖g‖₂ = √(Σⱼgⱼ²)" },
          {
            label: "Clipped gradient",
            expression: "gclip = g × min(1, c/‖g‖₂), for ‖g‖₂ > 0",
          },
        ],
      },
      {
        title: "What to Monitor",
        paragraphs: [
          "Track training and validation loss, the chosen task metric, learning rate, and gradient norm. When debugging, also inspect activation and parameter ranges.",
          "Check the data pipeline first when values are impossible or labels are wrong. Optimization cannot repair corrupted inputs, incorrect targets, or leakage.",
        ],
        dataTable: {
          headers: ["Observation", "First checks"],
          rows: [
            ["Loss never improves", "Data, labels, gradients, learning rate"],
            [
              "Loss becomes NaN",
              "Learning rate, division/log inputs, gradient norm",
            ],
            [
              "Train improves; validation worsens",
              "Overfitting and data mismatch",
            ],
            [
              "Both improve very slowly",
              "Learning rate, normalization, capacity",
            ],
          ],
        },
      },
      {
        title: "Parameters and Hyperparameters",
        paragraphs: [
          "Parameters such as weights and biases are learned through gradients. Hyperparameters are chosen outside that learning process, such as learning rate, batch size, model capacity, dropout probability, and regularization strength.",
          "Hyperparameters must be chosen using validation results, not test results. Record each experiment so comparisons remain fair.",
        ],
        table: {
          headers: ["Parameters", "Hyperparameters"],
          rows: [
            ["Weights and biases", "Learning rate and schedule"],
            ["Learned by optimizer", "Selected through experiments"],
            ["Millions may exist", "Usually a smaller set of choices"],
          ],
        },
      },
      {
        title: "A Practical Tuning Order",
        paragraphs: [
          "Begin with a small trusted baseline and verify that it can overfit a tiny training subset. This checks whether the pipeline, loss, and gradients can learn at all.",
          "Then tune learning rate and schedule, choose a feasible batch size, confirm enough model capacity, and finally tune regularization using the validation set. Change one major factor at a time when possible.",
        ],
        flow: [
          "Verify data and tiny-subset learning",
          "Tune learning rate",
          "Choose batch size",
          "Check capacity",
          "Tune regularization",
          "Confirm on test once",
        ],
      },
      {
        title: "Practice",
        paragraphs: [
          "Calculate clipping from the complete gradient norm and choose changes from evidence rather than guessing.",
        ],
        problems: [
          {
            title: "Global-norm clipping",
            prompt:
              "A gradient vector is g = [6, 8] and the clipping threshold is c = 5. Ignore ε and find the clipped gradient.",
            steps: [
              "‖g‖₂ = √(6² + 8²) = √100 = 10.",
              "Scale factor = min(1, 5/10) = 0.5.",
              "gclip = [6, 8] × 0.5 = [3, 4].",
              "The new norm is √(3² + 4²) = 5.",
            ],
            answer: "The clipped gradient is [3, 4].",
          },
          {
            title: "No clipping needed",
            prompt:
              "A gradient has global norm 2.4 and threshold c = 5. What scale factor is used?",
            steps: [
              "c/‖g‖ = 5/2.4 > 1.",
              "min(1, 5/2.4) = 1.",
              "The gradient remains unchanged.",
            ],
            answer: "Scale factor 1; no clipping is applied.",
          },
          {
            title: "Diagnose before tuning",
            prompt:
              "Training loss becomes NaN immediately after increasing the learning rate tenfold. What should be checked first?",
            steps: [
              "The failure began immediately after a large learning-rate change.",
              "Inspect gradient norms and parameter or activation values for explosion.",
              "Return to a stable learning rate and confirm that the loss remains finite.",
            ],
            answer:
              "Check for exploding updates caused by the new learning rate before changing model capacity or regularization.",
          },
          {
            title: "Parameter or hyperparameter",
            prompt:
              "Classify weight W, bias b, learning rate η, batch size B, and dropout probability p.",
            steps: [
              "W and b are updated from gradients.",
              "η, B, and p are selected outside the gradient update.",
            ],
            answer: "W and b are parameters; η, B, and p are hyperparameters.",
          },
        ],
      },
    ],
    mechanism: {
      title: "Evidence-based training diagnosis",
      steps: [
        "Verify inputs, targets, preprocessing, and loss calculation.",
        "Confirm the model can learn a tiny subset.",
        "Monitor train and validation curves plus gradient norms.",
        "Identify optimization, generalization, or data problems.",
        "Change the most relevant hyperparameter or component.",
        "Record the result and compare on the same validation setup.",
      ],
    },
    example: {
      title: "Tiny-subset test",
      body: "If a network cannot drive loss very low on a handful of correctly labelled examples, suspect an implementation, data, loss, or optimization problem before adding regularization.",
    },
    misconception:
      "Gradient clipping prevents a single update from becoming too large; it does not guarantee good learning or repair incorrect data and formulas.",
  },
  revise: {
    definition:
      "Stable training uses diagnostics to control gradient scale and select hyperparameters from validation evidence.",
    sections: [
      {
        title: "Global-Norm Clip",
        formulas: [
          { expression: "‖g‖₂ = √Σg²" },
          { expression: "gclip = g × min(1, c/‖g‖₂), for ‖g‖₂ > 0" },
        ],
      },
      {
        title: "Tuning Order",
        flow: [
          "Data",
          "Tiny subset",
          "Learning rate",
          "Batch size",
          "Capacity",
          "Regularization",
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Near-zero early-layer gradients can indicate vanishing gradients.",
      "Huge norms, spikes, infinity, or NaN can indicate exploding gradients.",
      "Clip after backward and before the optimizer step.",
      "Parameters are learned; hyperparameters are selected.",
      "Use validation, not test, for tuning.",
    ],
    followUp:
      "Why does global-norm clipping preserve gradient direction when the threshold is exceeded?",
  },
  lastMinute: {
    definition:
      "Measure first, identify the failure, then tune the relevant choice.",
    sections: [
      {
        title: "Gradient Evidence",
        points: [
          "Near zero → vanishing",
          "Huge or NaN → exploding",
          "Clip norm before update",
        ],
      },
      {
        title: "Order",
        flow: [
          "Data",
          "Tiny-set test",
          "η",
          "Batch",
          "Capacity",
          "Regularization",
        ],
        wide: true,
      },
    ],
    memoryLine:
      "Diagnostics choose the fix; tuning measures whether it worked.",
    cues: [
      "Clipping rescales, not repairs.",
      "Track validation and gradient norms.",
      "Record experiments and change controlled factors.",
    ],
    trap: "Do not tune on the test set or add regularization before confirming the model can learn.",
  },
};
