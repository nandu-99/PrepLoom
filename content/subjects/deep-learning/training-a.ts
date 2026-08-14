import type { SubjectTopic } from "@/lib/subject-content";

export const predictionsTargetsAndLoss: SubjectTopic = {
  slug: "predictions-targets-and-loss",
  title: "Predictions, Targets, and Loss Functions",
  description:
    "Understand how a model prediction is compared with a target and turned into one training objective.",
  readTime: "17 min",
  difficulty: "Foundation",
  tags: ["Prediction", "Target", "Loss"],
  learn: {
    opening:
      "A neural network produces a prediction. A loss function compares that prediction with the correct target and returns a number that training tries to reduce.",
    sections: [
      {
        title: "Prediction and Target",
        paragraphs: [
          "The prediction, written ŷ, is the model's output. The target, written y, is the value the model should produce for that training example.",
          "For regression, both may be numerical values. For classification, the target identifies the correct class and the prediction usually contains probabilities or logits that represent class scores.",
        ],
        visual: {
          src: "/notes/deep-learning/prediction-target-loss.png",
          alt: "Input and target producing a loss that flows through backpropagation, gradients, and an optimizer before the parameter update",
          width: 1536,
          height: 1024,
          caption:
            "The target measures error; backpropagation calculates gradients and the optimizer uses them to update parameters.",
        },
        dataTable: {
          headers: ["Task", "Prediction ŷ", "Target y"],
          rows: [
            ["House-price regression", "Predicted price", "Observed price"],
            [
              "Binary classification",
              "Probability of positive class",
              "0 or 1",
            ],
            [
              "Single-label multiclass",
              "One probability per class",
              "Correct class",
            ],
          ],
        },
      },
      {
        title: "Error and Loss Are Related but Different",
        paragraphs: [
          "An error can mean a simple difference such as ŷ − y. A loss is the exact mathematical rule used by training. It converts the prediction and target into a value whose direction and size have a useful meaning for optimization.",
          "A loss is normally nonnegative, but that is a design property rather than the definition itself. Lower loss means the prediction is better according to that chosen rule.",
        ],
        formulas: [
          {
            label: "Signed error",
            expression: "e = ŷ − y",
          },
          {
            label: "Per-example loss",
            expression: "L = ℓ(ŷ, y)",
            note: "The symbol ℓ names the selected loss function.",
          },
        ],
      },
      {
        title: "Per-Example Loss and Batch Loss",
        paragraphs: [
          "A model usually processes several examples in a batch. The loss is calculated for every example and then reduced to one scalar, commonly by taking the mean.",
          "A mean keeps the usual loss scale more stable when batch size changes. A sum is also possible, but it makes gradient size grow with the number of examples unless another normalization is used.",
        ],
        formulas: [
          {
            label: "Mean batch loss",
            expression: "J = (1/B) Σᵢ₌₁ᴮ ℓ(ŷᵢ, yᵢ)",
            note: "B is batch size. J is the scalar objective for that batch.",
          },
        ],
      },
      {
        title: "Loss, Cost, and Objective",
        paragraphs: [
          "Books use these words differently. Loss may mean one example or a batch, cost often means an average, and objective may include regularization. Define the formula instead of relying only on the term.",
        ],
        formulas: [
          {
            label: "Regularized training objective",
            expression: "Jtotal = Jdata + λR(θ)",
            note: "R(θ) penalizes selected parameter patterns. Regularization is covered in Module 3.",
          },
        ],
      },
      {
        title: "Loss and Evaluation Metric",
        paragraphs: [
          "The training loss guides gradient-based updates. An evaluation metric communicates performance in a form that matters for the task, such as accuracy or mean absolute error.",
          "They can be different. Accuracy is useful to report, but its hard correct-or-incorrect output does not provide a smooth training signal. Cross-entropy is therefore commonly used to train a classifier while accuracy is reported as a metric.",
        ],
        table: {
          headers: ["Training loss", "Evaluation metric"],
          rows: [
            [
              "Must guide parameter updates",
              "Must communicate useful performance",
            ],
            [
              "Usually differentiable almost everywhere",
              "Does not have to be differentiable",
            ],
            ["Example: cross-entropy", "Example: accuracy"],
          ],
        },
      },
      {
        title: "Why Differentiability Matters",
        paragraphs: [
          "Backpropagation calculates derivatives of the loss with respect to model parameters. A useful training loss must therefore provide gradients at the values encountered during training.",
          "Some functions have a few nondifferentiable points, such as ReLU at zero, and still work because software uses a chosen subgradient convention. A completely flat metric such as accuracy gives almost no direction for a small parameter change.",
        ],
      },
      {
        title: "Practice",
        paragraphs: [
          "First identify the task, output meaning, and reduction rule. Then decide what quantity training should minimize.",
        ],
        problems: [
          {
            title: "Mean batch loss",
            prompt:
              "Four examples have individual losses [0.2, 0.5, 0.1, 0.4]. Find the mean batch loss.",
            steps: [
              "Add the individual losses: 0.2 + 0.5 + 0.1 + 0.4 = 1.2.",
              "Batch size B = 4.",
              "J = 1.2 / 4 = 0.3.",
            ],
            answer: "Mean batch loss J = 0.3.",
          },
          {
            title: "Loss or metric",
            prompt:
              "A classifier reports accuracy but trains with cross-entropy. State the job of each quantity.",
            steps: [
              "Cross-entropy changes smoothly with predicted probability and supplies gradients.",
              "Accuracy checks whether the selected class is correct.",
              "Training minimizes cross-entropy; evaluation can report accuracy.",
            ],
            answer:
              "Cross-entropy is the training loss; accuracy is the reporting metric.",
          },
          {
            title: "Target during inference",
            prompt:
              "Does a deployed classifier need the correct target y before it can make a prediction?",
            steps: [
              "The input X enters the trained model.",
              "The target is required to calculate supervised training or evaluation loss.",
              "A normal inference request produces ŷ before the true target is known.",
            ],
            answer:
              "No. Normal inference needs the input and trained parameters, not the correct target.",
          },
        ],
      },
    ],
    mechanism: {
      title: "How a loss becomes a training signal",
      steps: [
        "Pass input X through the network to obtain prediction ŷ.",
        "Read the correct target y for the training example.",
        "Apply the selected loss ℓ(ŷ, y).",
        "Average or otherwise reduce losses across the batch.",
        "Backpropagate the scalar objective to calculate gradients.",
        "Use an optimizer to update the parameters.",
      ],
    },
    example: {
      title: "Spam probability",
      body: "A model predicts ŷ = 0.9 for an email whose target is y = 1. The loss should be small because the correct class received high probability. If the same model predicted 0.1, the loss should be much larger.",
    },
    misconception:
      "The target does not normally become an extra model input. It is compared with the prediction to calculate supervised training or evaluation loss.",
  },
  revise: {
    definition:
      "A loss function converts prediction ŷ and target y into a scalar that training minimizes.",
    sections: [
      {
        title: "Core Flow",
        flow: [
          "Input X",
          "Prediction ŷ",
          "Compare with target y",
          "Loss J",
          "Gradients",
          "Update",
        ],
      },
      {
        title: "Batch Formula",
        formulas: [{ expression: "J = (1/B) Σᵢ ℓ(ŷᵢ, yᵢ)" }],
      },
      {
        title: "Loss vs Metric",
        table: {
          headers: ["Loss", "Metric"],
          rows: [
            ["Guides training", "Reports useful performance"],
            ["Needs gradients", "Need not be differentiable"],
          ],
        },
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "ŷ is prediction; y is target.",
      "Per-example losses are commonly averaged over a batch.",
      "Training minimizes the chosen objective, not every possible metric.",
      "Accuracy is usually a metric, not a useful gradient-based loss.",
      "Inference normally does not know the target.",
    ],
    followUp:
      "Why can cross-entropy train a classifier more effectively than accuracy?",
  },
  lastMinute: {
    definition: "Loss tells training how poor the current prediction is.",
    sections: [
      {
        title: "Symbols",
        points: [
          "X: input",
          "ŷ: prediction",
          "y: target",
          "J: batch objective",
        ],
      },
      {
        title: "Training Path",
        flow: [
          "Predict",
          "Measure loss",
          "Calculate gradients",
          "Update parameters",
        ],
        wide: true,
      },
    ],
    memoryLine: "Prediction plus target produces loss; loss starts learning.",
    cues: [
      "Mean reduction divides by batch size.",
      "Loss guides updates; metric reports performance.",
      "Lower loss is better only according to the selected rule.",
    ],
    trap: "Do not say that accuracy is normally differentiated to train a classifier or that the target enters the deployed model.",
  },
};

export const mseAndCrossEntropyLoss: SubjectTopic = {
  slug: "mse-and-cross-entropy-loss",
  title: "MSE and Cross-Entropy Loss",
  description:
    "Choose and calculate Mean Squared Error, Binary Cross-Entropy, and Categorical Cross-Entropy.",
  readTime: "24 min",
  difficulty: "Intermediate",
  tags: ["MSE", "Cross-Entropy", "Numericals"],
  learn: {
    opening:
      "Different tasks need different loss functions. MSE measures numerical distance, while cross-entropy measures how much probability a classifier gives to the correct answer.",
    sections: [
      {
        title: "Match the Loss to the Output",
        paragraphs: [
          "Regression predicts a numerical quantity, so Mean Squared Error is a common starting loss. Binary classification commonly uses one sigmoid probability with Binary Cross-Entropy. Single-label multiclass classification commonly uses softmax with Categorical Cross-Entropy.",
        ],
        visual: {
          src: "/notes/deep-learning/loss-functions-comparison.png",
          alt: "Comparison of Mean Squared Error, Binary Cross-Entropy, and Categorical Cross-Entropy",
          width: 1536,
          height: 1024,
          caption:
            "MSE measures squared numerical distance; cross-entropy penalizes probability placed away from the correct class.",
        },
        dataTable: {
          headers: ["Task", "Output", "Common loss"],
          rows: [
            ["Regression", "Linear numerical value", "Mean Squared Error"],
            [
              "Binary classification",
              "One sigmoid probability",
              "Binary Cross-Entropy",
            ],
            [
              "Multi-label classification",
              "One sigmoid per label",
              "Binary Cross-Entropy per label",
            ],
            [
              "Single-label multiclass",
              "Softmax distribution",
              "Categorical Cross-Entropy",
            ],
          ],
        },
      },
      {
        title: "Mean Squared Error",
        paragraphs: [
          "MSE squares each prediction error and takes the mean. Squaring removes the sign and makes large errors contribute much more than small errors.",
          "MSE is sensitive to large outliers. Whether that is helpful depends on whether large errors truly deserve a much larger penalty.",
        ],
        formulas: [
          {
            label: "MSE",
            expression: "MSE = (1/N) Σᵢ₌₁ᴺ (ŷᵢ − yᵢ)²",
          },
          {
            label: "Derivative for one prediction",
            expression: "∂MSE/∂ŷᵢ = (2/N)(ŷᵢ − yᵢ)",
          },
        ],
      },
      {
        title: "Binary Cross-Entropy",
        paragraphs: [
          "Binary Cross-Entropy, or BCE, is used when the target is 0 or 1 and the model produces a probability p for class 1.",
          "When y = 1, only −log(p) remains. When y = 0, only −log(1 − p) remains. A confident wrong prediction receives a very large loss.",
        ],
        formulas: [
          {
            label: "Binary Cross-Entropy",
            expression: "BCE = −[y log(p) + (1 − y) log(1 − p)]",
          },
          {
            label: "Positive target",
            expression: "y = 1  ⇒  BCE = −log(p)",
          },
          {
            label: "Negative target",
            expression: "y = 0  ⇒  BCE = −log(1 − p)",
          },
        ],
      },
      {
        title: "Categorical Cross-Entropy",
        paragraphs: [
          "For one correct class among C classes, softmax produces probabilities p₁ through pC. A one-hot target has 1 at the correct class and 0 elsewhere.",
          "Because only the correct-class target equals 1, categorical cross-entropy becomes the negative log of the correct-class probability.",
          "Sparse categorical cross-entropy uses the correct class index instead of a one-hot vector. For a single-label problem, it represents the same loss in a more compact target format.",
        ],
        formulas: [
          {
            label: "Categorical Cross-Entropy",
            expression: "CCE = −Σ꜀₌₁ᶜ y꜀ log(p꜀)",
          },
          {
            label: "One-hot simplification",
            expression: "CCE = −log(pcorrect)",
          },
          {
            label: "Mean classification loss",
            expression: "J = −(1/B) Σᵢ₌₁ᴮ log(pᵢ,correct)",
          },
        ],
      },
      {
        title: "Useful Output-Layer Gradients",
        paragraphs: [
          "When sigmoid is combined with BCE, or softmax is combined with CCE, the derivative with respect to the output logit becomes especially simple. This result is widely used in backpropagation.",
          "The subtraction is between the predicted probability and the target. For a mean batch loss, divide the batch gradient by B once.",
        ],
        formulas: [
          { label: "Sigmoid with BCE", expression: "∂L/∂z = p − y" },
          { label: "Softmax with CCE", expression: "∂L/∂z꜀ = p꜀ − y꜀" },
          { label: "Mean batch version", expression: "∂J/∂Z = (P − Y)/B" },
        ],
      },
      {
        title: "Why the Logarithm Is Useful",
        paragraphs: [
          "The negative logarithm is near zero when the correct-class probability is near 1. It grows quickly when that probability approaches 0.",
          "Cross-entropy therefore distinguishes between weak and confident mistakes even when both produce the same incorrect class choice.",
        ],
        dataTable: {
          headers: ["Correct-class probability", "Loss −log(p)"],
          rows: [
            ["0.9", "≈ 0.105"],
            ["0.5", "≈ 0.693"],
            ["0.1", "≈ 2.303"],
            ["0.01", "≈ 4.605"],
          ],
        },
      },
      {
        title: "Probabilities, Logits, and Numerical Stability",
        paragraphs: [
          "A log of zero is undefined. Direct probability formulas can also lose numerical precision near 0 or 1.",
          "Training libraries therefore provide stable operations that combine sigmoid with BCE or softmax with cross-entropy directly from logits. When an API expects logits, do not apply sigmoid or softmax first unless its documentation explicitly asks for probabilities.",
        ],
        points: [
          "Logit loss APIs perform stable internal calculations.",
          "Probability loss APIs expect values already inside the valid range.",
          "Applying an activation twice changes the loss and gradients.",
          "Always check whether the function expects logits or probabilities.",
        ],
      },
      {
        title: "Worked Loss Numericals",
        paragraphs: [
          "Use natural logarithms unless a question gives another base. Keep extra decimals until the final answer.",
        ],
        problems: [
          {
            title: "Mean Squared Error",
            prompt:
              "Targets are y = [3, 5, 2] and predictions are ŷ = [2, 7, 2]. Find MSE.",
            steps: [
              "Errors ŷ − y = [−1, 2, 0].",
              "Squared errors = [1, 4, 0].",
              "Sum = 5 and N = 3.",
              "MSE = 5/3 ≈ 1.667.",
            ],
            answer: "MSE ≈ 1.667.",
          },
          {
            title: "Binary Cross-Entropy for y = 1",
            prompt:
              "A binary classifier predicts p = 0.8 and the target is y = 1. Use ln(0.8) ≈ −0.223.",
            steps: [
              "For y = 1, BCE = −log(p).",
              "BCE = −log(0.8).",
              "BCE ≈ −(−0.223) = 0.223.",
            ],
            answer: "BCE ≈ 0.223.",
          },
          {
            title: "Binary Cross-Entropy for y = 0",
            prompt:
              "A binary classifier predicts p = 0.8 but the target is y = 0. Use ln(0.2) ≈ −1.609.",
            steps: [
              "For y = 0, BCE = −log(1 − p).",
              "1 − p = 0.2.",
              "BCE = −log(0.2) ≈ 1.609.",
            ],
            answer:
              "BCE ≈ 1.609, much larger because the prediction is confidently wrong.",
          },
          {
            title: "Categorical Cross-Entropy",
            prompt:
              "Softmax probabilities are [0.1, 0.7, 0.2], and the second class is correct. Use ln(0.7) ≈ −0.357.",
            steps: [
              "The one-hot target is [0, 1, 0].",
              "Only the correct second-class probability contributes.",
              "CCE = −log(0.7) ≈ 0.357.",
            ],
            answer: "CCE ≈ 0.357.",
          },
          {
            title: "Logits to softmax and cross-entropy",
            prompt:
              "The logits for three classes are z = [1, 2, 0], and class 2 is correct. Use e¹ ≈ 2.718, e² ≈ 7.389, and e⁰ = 1.",
            steps: [
              "Softmax denominator = 2.718 + 7.389 + 1 = 11.107.",
              "Probabilities ≈ [0.245, 0.665, 0.090].",
              "The correct-class probability is 0.665.",
              "CCE = −ln(0.665) ≈ 0.408.",
            ],
            answer: "Softmax ≈ [0.245, 0.665, 0.090] and CCE ≈ 0.408.",
          },
          {
            title: "Mean cross-entropy over a batch",
            prompt:
              "Three correct-class probabilities are [0.8, 0.5, 0.25]. Use losses [0.223, 0.693, 1.386]. Find the mean.",
            steps: [
              "Add losses: 0.223 + 0.693 + 1.386 = 2.302.",
              "Divide by batch size 3.",
              "Mean loss = 2.302/3 ≈ 0.767.",
            ],
            answer: "Mean cross-entropy ≈ 0.767.",
          },
        ],
      },
    ],
    mechanism: {
      title: "How to choose a basic loss",
      steps: [
        "Identify regression or classification.",
        "For classification, decide binary, multi-label, or single-label multiclass.",
        "Match the output activation to the target structure.",
        "Choose MSE, BCE, or CCE for the corresponding output.",
        "Check whether the software loss expects logits or probabilities.",
        "Apply the documented batch reduction.",
      ],
    },
    example: {
      title: "Two wrong classifiers",
      body: "If the correct class has probability 0.4, the prediction may be wrong but uncertain. If it has probability 0.001, the model is confidently wrong. Cross-entropy gives the second case a much larger penalty.",
    },
    misconception:
      "Cross-entropy does not simply count wrong predictions. It uses the probability assigned to the correct answer, so confidence matters.",
  },
  revise: {
    definition:
      "MSE measures squared numerical error; cross-entropy penalizes low probability for the correct class.",
    sections: [
      {
        title: "Loss Map",
        dataTable: {
          headers: ["Task", "Loss"],
          rows: [
            ["Regression", "MSE"],
            ["Binary or multi-label", "BCE"],
            ["Single-label multiclass", "CCE"],
          ],
        },
      },
      {
        title: "Core Formulas",
        formulas: [
          { expression: "MSE = (1/N)Σ(ŷ − y)²" },
          { expression: "BCE = −[y log(p) + (1 − y)log(1 − p)]" },
          { expression: "CCE = −Σ y꜀log(p꜀) = −log(pcorrect)" },
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "MSE makes large numerical errors contribute strongly.",
      "BCE uses one binary target or one independent loss per label.",
      "CCE uses one probability distribution over mutually exclusive classes.",
      "Confident wrong classification receives large cross-entropy.",
      "Check whether an API expects logits or probabilities.",
    ],
    followUp:
      "Why does cross-entropy distinguish between an uncertain mistake and a confident mistake?",
  },
  lastMinute: {
    definition: "Choose the loss from the target and output meaning.",
    sections: [
      {
        title: "Fast Choice",
        points: [
          "Number → MSE",
          "Binary or multi-label → BCE",
          "One of many classes → CCE",
        ],
      },
      {
        title: "Cross-Entropy Shortcut",
        points: [
          "Correct probability high → small loss",
          "Correct probability low → large loss",
          "One-hot CCE = −log(correct probability)",
        ],
      },
    ],
    memoryLine:
      "MSE measures distance; cross-entropy measures misplaced confidence.",
    cues: [
      "Natural log is normally used.",
      "Mean reduction divides by the number of examples.",
      "Use stable loss-from-logits operations when available.",
    ],
    trap: "Do not apply sigmoid or softmax before a loss function that already expects raw logits.",
  },
};

export const gradientsAndChainRule: SubjectTopic = {
  slug: "gradients-and-chain-rule",
  title: "Gradients and the Chain Rule",
  description:
    "Read derivatives as sensitivity, calculate partial derivatives, and pass gradients through a computational graph.",
  readTime: "25 min",
  difficulty: "Intermediate",
  tags: ["Derivatives", "Gradients", "Chain Rule"],
  learn: {
    opening:
      "A derivative measures how an output changes when one input changes slightly. A gradient collects this sensitivity for every parameter.",
    sections: [
      {
        title: "Derivative as Local Sensitivity",
        paragraphs: [
          "For a function y = f(x), the derivative dy/dx is the local slope. A positive derivative means a small increase in x tends to increase y. A negative derivative means it tends to decrease y.",
          "The derivative's magnitude measures local sensitivity. A value near zero means a small change in x has little immediate effect at that point.",
        ],
        formulas: [
          {
            label: "Basic derivative",
            expression: "y = x²  ⇒  dy/dx = 2x",
          },
          {
            label: "At x = 3",
            expression: "dy/dx = 2(3) = 6",
            note: "Near x = 3, a small increase Δx changes y by approximately 6Δx.",
          },
        ],
      },
      {
        title: "Partial Derivatives and Gradients",
        paragraphs: [
          "A neural-network loss depends on many parameters. A partial derivative changes one parameter while treating the others as fixed.",
          "The gradient is a vector or tensor containing all partial derivatives. It points toward the direction of steepest local increase, so gradient descent moves in the negative-gradient direction.",
        ],
        formulas: [
          {
            label: "Two-variable function",
            expression: "L(w₁, w₂) = w₁² + 3w₂",
          },
          {
            label: "Partial derivatives",
            expression: "∂L/∂w₁ = 2w₁,  ∂L/∂w₂ = 3",
          },
          {
            label: "Gradient",
            expression: "∇L = [∂L/∂w₁, ∂L/∂w₂]",
          },
        ],
      },
      {
        title: "The Chain Rule",
        paragraphs: [
          "A parameter affects the loss through a chain of intermediate values. The chain rule multiplies the local effects along that path.",
          "If x changes u, u changes v, and v changes L, then the effect of x on L is the product of those three local derivatives.",
        ],
        formulas: [
          {
            label: "Chain rule",
            expression: "dL/dx = (dL/dv)(dv/du)(du/dx)",
          },
        ],
        visual: {
          src: "/notes/deep-learning/computational-graph-chain-rule.png",
          alt: "Forward computational graph from x through u and v to loss, with gradients multiplying backward",
          width: 1536,
          height: 1024,
          caption:
            "Forward values move toward the loss; backward gradients multiply local derivatives in reverse order.",
        },
      },
      {
        title: "Computational Graphs",
        paragraphs: [
          "A computational graph breaks a formula into small operations. Each node stores a forward value, and each edge represents a dependency.",
          "During the backward pass, each operation receives an upstream gradient, multiplies it by its local derivative, and sends the result to earlier inputs. In a network, these values may be vectors or matrices, so the gradient must have the same shape as the value being differentiated.",
        ],
        dataTable: {
          headers: ["Quantity", "Meaning"],
          rows: [
            ["Forward value", "Result produced by an operation"],
            [
              "Local derivative",
              "Sensitivity of that operation's output to one input",
            ],
            [
              "Upstream gradient",
              "Sensitivity of final loss to the operation's output",
            ],
            [
              "Gradient passed backward",
              "Upstream gradient × local derivative",
            ],
          ],
        },
      },
      {
        title: "Branches Add Gradient Contributions",
        paragraphs: [
          "One value can affect the loss through more than one path. The total derivative is the sum of the gradient contribution from every path.",
          "This addition is essential in neural networks because one activation may connect to many units in the next layer.",
        ],
        formulas: [
          {
            label: "Two paths",
            expression: "dL/dx = (dL/du)(du/dx) + (dL/dv)(dv/dx)",
          },
        ],
      },
      {
        title: "Common Derivative Rules",
        paragraphs: [
          "These small rules are enough for many introductory backpropagation questions. Activation derivatives from Module 1 are used in exactly the same chain-rule process.",
        ],
        dataTable: {
          headers: ["Function", "Derivative"],
          rows: [
            ["c", "0"],
            ["x", "1"],
            ["xⁿ", "nxⁿ⁻¹"],
            ["u + v", "du/dx + dv/dx"],
            ["uv", "u(dv/dx) + v(du/dx)"],
            ["1/x", "−1/x²"],
            ["ln(x)", "1/x"],
            ["eˣ", "eˣ"],
            ["ReLU(z), z > 0", "1"],
            ["Sigmoid σ(z)", "σ(z)(1 − σ(z))"],
          ],
        },
      },
      {
        title: "Worked Chain-Rule Numericals",
        paragraphs: [
          "Write intermediate values first. Then move backward and multiply one local derivative at a time.",
        ],
        problems: [
          {
            title: "One chain",
            prompt: "Let u = 2x, v = u², and L = 3v. Find dL/dx at x = 2.",
            steps: [
              "Forward: x = 2, u = 4, v = 16, L = 48.",
              "Local derivatives: dL/dv = 3, dv/du = 2u = 8, du/dx = 2.",
              "Chain rule: dL/dx = 3 × 8 × 2.",
              "dL/dx = 48.",
            ],
            answer: "dL/dx = 48.",
          },
          {
            title: "Gradient of two parameters",
            prompt:
              "For L(w₁, w₂) = w₁² + 3w₂², find ∇L at w₁ = 2 and w₂ = −1.",
            steps: [
              "∂L/∂w₁ = 2w₁ = 4.",
              "∂L/∂w₂ = 6w₂ = −6.",
              "Collect the partial derivatives in parameter order.",
            ],
            answer: "∇L = [4, −6].",
          },
          {
            title: "Two gradient paths",
            prompt: "Let u = 2x, v = x², and L = u + v. Find dL/dx at x = 3.",
            steps: [
              "Path through u: dL/du × du/dx = 1 × 2 = 2.",
              "Path through v: dL/dv × dv/dx = 1 × 2x = 6.",
              "Add both path contributions: 2 + 6 = 8.",
            ],
            answer: "dL/dx = 8.",
          },
          {
            title: "Sigmoid local gradient",
            prompt:
              "A sigmoid output is a = 0.8 and the upstream gradient is ∂L/∂a = 5. Find ∂L/∂z.",
            steps: [
              "Sigmoid derivative: da/dz = a(1 − a).",
              "da/dz = 0.8 × 0.2 = 0.16.",
              "Chain rule: ∂L/∂z = (∂L/∂a)(da/dz).",
              "∂L/∂z = 5 × 0.16 = 0.8.",
            ],
            answer: "∂L/∂z = 0.8.",
          },
        ],
      },
    ],
    mechanism: {
      title: "How to differentiate a computational graph",
      steps: [
        "Break the expression into named intermediate values.",
        "Run forward to calculate and store every value.",
        "Start backward at the loss with gradient 1.",
        "At each operation, multiply the upstream gradient by the local derivative.",
        "Add contributions when one value reaches the loss through several paths.",
        "Stop when gradients for all required inputs or parameters are known.",
      ],
    },
    example: {
      title: "A weight affects loss through a neuron",
      body: "A weight changes z, z changes activation a, and a changes loss L. Backpropagation calculates ∂L/∂w by multiplying ∂L/∂a, ∂a/∂z, and ∂z/∂w.",
    },
    misconception:
      "A gradient is not the amount a parameter must change. It is the local slope of the loss; the optimizer and learning rate decide the update.",
  },
  revise: {
    definition:
      "A gradient contains the partial derivative of loss with respect to every parameter.",
    sections: [
      {
        title: "Chain Rule",
        formulas: [{ expression: "dL/dx = (dL/dv)(dv/du)(du/dx)" }],
      },
      {
        title: "Backward Rule",
        flow: [
          "Receive upstream gradient",
          "Find local derivative",
          "Multiply",
          "Send backward",
          "Add branch contributions",
        ],
      },
      {
        title: "Interpretation",
        points: [
          "Positive gradient: increasing parameter raises loss locally.",
          "Negative gradient: increasing parameter lowers loss locally.",
          "Large magnitude: stronger local sensitivity.",
          "Near zero: weak local sensitivity.",
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Derivative = local sensitivity.",
      "Partial derivative changes one input while others stay fixed.",
      "Gradient collects parameter partial derivatives.",
      "Chain paths multiply; separate branches add.",
      "Backward calculation starts with dL/dL = 1.",
    ],
    followUp:
      "Why are gradient contributions added when one value affects the loss through two branches?",
  },
  lastMinute: {
    definition:
      "Backpropagation is repeated chain rule over a computational graph.",
    sections: [
      {
        title: "Backward Pattern",
        flow: [
          "Start at loss with 1",
          "Upstream × local",
          "Move backward",
          "Add branches",
        ],
        wide: true,
      },
      {
        title: "Signs",
        points: [
          "Positive gradient → increasing value raises loss",
          "Negative gradient → increasing value lowers loss",
        ],
      },
    ],
    memoryLine: "Along a path multiply; where paths meet add.",
    cues: [
      "Store forward values because derivatives often need them.",
      "Gradient shape matches the differentiated tensor's shape.",
      "Optimizer uses the gradient; gradient alone is not the update.",
    ],
    trap: "Do not add derivatives along one chain or multiply independent branch contributions together.",
  },
};
