import type { SubjectTopic } from "@/lib/subject-content";

export const backpropagation: SubjectTopic = {
  slug: "backpropagation",
  title: "Backpropagation",
  description:
    "Calculate how sensitive the loss is to every weight and bias by moving gradients backward through the network.",
  readTime: "25 min",
  difficulty: "Intermediate",
  tags: ["Backpropagation", "Gradients", "Numericals"],
  learn: {
    opening:
      "Backpropagation applies the chain rule from the output layer to the input side. It efficiently calculates the gradient of one loss with respect to every trainable parameter.",
    sections: [
      {
        title: "Forward First, Backward Next",
        paragraphs: [
          "The forward pass calculates the prediction and loss. It also stores values such as layer inputs, pre-activations, and activations because the backward pass needs them.",
          "The backward pass starts at the loss. Each layer receives an upstream gradient, calculates its local gradients, and passes a new gradient to the previous layer.",
        ],
        visual: {
          src: "/notes/deep-learning/backpropagation-flow.png",
          alt: "Forward values moving through a neural network and gradients moving backward",
          width: 1536,
          height: 1024,
          caption:
            "Forward propagation produces and stores values; backpropagation sends gradients in the reverse direction.",
        },
      },
      {
        title: "Dense-Layer Gradient Formulas",
        paragraphs: [
          "For a batch-first dense layer, A⁽ℓ⁻¹⁾ contains the layer inputs, W⁽ℓ⁾ contains weights, and b⁽ℓ⁾ is broadcast to every row. Let dA⁽ℓ⁾ be the gradient arriving from the next operation.",
          "The standard dA, dZ, dW, and db notation means the derivative of loss with respect to that value. The activation derivative gives dZ. Matrix multiplication then gives the weight gradient, bias gradient, and gradient passed to the previous layer.",
        ],
        formulas: [
          { label: "Forward", expression: "Z⁽ℓ⁾ = A⁽ℓ⁻¹⁾W⁽ℓ⁾ + b⁽ℓ⁾" },
          { label: "Through activation", expression: "dZ⁽ℓ⁾ = dA⁽ℓ⁾ ⊙ f′(Z⁽ℓ⁾)" },
          { label: "Weight gradient", expression: "dW⁽ℓ⁾ = (A⁽ℓ⁻¹⁾)ᵀdZ⁽ℓ⁾" },
          { label: "Bias gradient", expression: "db⁽ℓ⁾ = sum_rows(dZ⁽ℓ⁾)" },
          { label: "Previous activation gradient", expression: "dA⁽ℓ⁻¹⁾ = dZ⁽ℓ⁾(W⁽ℓ⁾)ᵀ" },
          { label: "Softmax with CCE output", expression: "dZ⁽ᴸ⁾ = (P − Y)/B", note: "Use /B when the batch loss is a mean." },
        ],
      },
      {
        title: "Shapes Must Match",
        paragraphs: [
          "Suppose A⁽ℓ⁻¹⁾ has shape B × nᵢₙ, W has shape nᵢₙ × nₒᵤₜ, and Z has shape B × nₒᵤₜ. Then the weight gradient must have the same shape as W, and the bias gradient must have one value per output unit.",
          "If the batch loss is a mean, its factor 1/B normally enters the gradient near the loss. Do not divide by B again at every layer. Mathematics often writes the bias as 1 × nₒᵤₜ, while a library may store the same values as a one-dimensional vector of shape (nₒᵤₜ,).",
        ],
        dataTable: {
          headers: ["Quantity", "Shape"],
          rows: [
            ["A⁽ℓ⁻¹⁾", "B × nᵢₙ"],
            ["W and dW", "nᵢₙ × nₒᵤₜ"],
            ["Z, A, and dZ", "B × nₒᵤₜ"],
            ["b and db", "1 × nₒᵤₜ or (nₒᵤₜ,)"],
            ["dA⁽ℓ⁻¹⁾", "B × nᵢₙ"],
          ],
        },
      },
      {
        title: "Complete Scalar Numerical",
        paragraphs: [
          "Consider one input, one ReLU hidden neuron, and one linear output. Let x = 2, w₁ = 0.5, b₁ = 0, w₂ = 2, b₂ = 0, and target y = 1.",
        ],
        formulas: [
          { label: "Forward hidden", expression: "z₁ = xw₁ + b₁ = 1,  a₁ = ReLU(1) = 1" },
          { label: "Prediction and loss", expression: "ŷ = a₁w₂ + b₂ = 2,  L = ½(ŷ − y)² = 0.5" },
          { label: "Start backward", expression: "∂L/∂ŷ = ŷ − y = 1" },
          { label: "Output parameters", expression: "∂L/∂w₂ = 1,  ∂L/∂b₂ = 1" },
          { label: "Hidden signal", expression: "∂L/∂a₁ = 2,  ∂L/∂z₁ = 2 × ReLU′(1) = 2" },
          { label: "Hidden parameters", expression: "∂L/∂w₁ = 2 × x = 4,  ∂L/∂b₁ = 2" },
        ],
      },
      {
        title: "Gradient Checking",
        paragraphs: [
          "Gradient checking compares a backpropagation gradient with a numerical approximation. It is useful when implementing a new layer or debugging a suspicious derivative.",
          "Use a small positive ε and change one parameter slightly in both directions. Numerical checking is slow and affected by floating-point error, so it is a debugging test rather than the normal training method.",
        ],
        formulas: [
          {
            label: "Central-difference check",
            expression: "∂J/∂θ ≈ [J(θ + ε) − J(θ − ε)] / (2ε)",
            note: "A small ε such as 10⁻⁵ is a common starting point.",
          },
          {
            label: "Relative difference",
            expression: "difference = |ganalytical − gnumerical| / max(1, |ganalytical|, |gnumerical|)",
            note: "A very small difference supports the implementation; the acceptable value depends on numerical precision and the function.",
          },
        ],
      },
      {
        title: "Vanishing and Exploding Gradients",
        paragraphs: [
          "Backpropagation multiplies many local derivatives. If these factors are repeatedly much smaller than one, early-layer gradients can vanish. If they are repeatedly large, gradients can explode.",
          "Activation choice, careful initialization, normalization, residual connections, and gradient clipping can help. The exact solution depends on the network architecture.",
        ],
      },
      {
        title: "Practice",
        paragraphs: ["Work from the loss toward the input and keep every derivative's meaning and shape visible."],
        problems: [
          {
            title: "Linear output gradient",
            prompt: "For ŷ = aw + b and L = ½(ŷ − y)², find ∂L/∂w when a = 3, w = 2, b = 0, and y = 4.",
            steps: [
              "ŷ = 3 × 2 = 6.",
              "∂L/∂ŷ = ŷ − y = 2.",
              "∂ŷ/∂w = a = 3.",
              "∂L/∂w = 2 × 3 = 6.",
            ],
            answer: "∂L/∂w = 6.",
          },
          {
            title: "ReLU blocks a gradient",
            prompt: "An upstream gradient is 5 and the saved ReLU input is z = −2. Find the gradient with respect to z.",
            steps: ["ReLU′(z) = 0 when z < 0.", "∂L/∂z = 5 × 0 = 0."],
            answer: "The gradient with respect to z is 0.",
          },
          {
            title: "Dense-layer shapes",
            prompt: "A has shape 32 × 10 and W has shape 10 × 4. State the shapes of Z, dW, db, and dAprev.",
            steps: [
              "Z = AW + b has shape 32 × 4.",
              "dW = AᵀdZ has shape 10 × 4.",
              "db has one value per output unit: 1 × 4.",
              "dAprev = dZWᵀ has shape 32 × 10.",
            ],
            answer: "Z: 32 × 4, dW: 10 × 4, db: 1 × 4, dAprev: 32 × 10.",
          },
          {
            title: "Matrix weight gradient",
            prompt: "For one example, Aprev = [2, 3] and dZ = [4, −1]. Find dW = AprevᵀdZ and db.",
            steps: [
              "Aprevᵀ has shape 2 × 1 and dZ has shape 1 × 2.",
              "Take the outer product: [[2], [3]] [4, −1].",
              "dW = [[8, −2], [12, −3]].",
              "For one example, db is the row sum of dZ, so db = [4, −1].",
            ],
            answer: "dW = [[8, −2], [12, −3]] and db = [4, −1].",
          },
        ],
      },
    ],
    mechanism: {
      title: "Backpropagation order",
      steps: [
        "Run the forward pass and store the needed intermediate values.",
        "Differentiate the loss with respect to the network output.",
        "Move backward through the output layer.",
        "Apply each activation derivative and layer derivative.",
        "Accumulate gradients where one value affects multiple paths.",
        "Store one gradient for every trainable parameter.",
      ],
    },
    example: {
      title: "One weight's meaning",
      body: "If ∂L/∂w = 4, a small increase in w is expected to increase the loss. Gradient descent therefore moves w in the negative direction.",
    },
    misconception:
      "Backpropagation calculates gradients; it does not decide the learning rate or update the parameters. The optimizer performs the update.",
  },
  revise: {
    definition: "Backpropagation uses the chain rule in reverse graph order to calculate every parameter gradient.",
    sections: [
      {
        title: "Dense Layer",
        formulas: [
          { expression: "dZ = dA ⊙ f′(Z)" },
          { expression: "dW = AprevᵀdZ" },
          { expression: "db = sum_rows(dZ)" },
          { expression: "dAprev = dZWᵀ" },
        ],
      },
      { title: "Order", flow: ["Loss", "Output layer", "Hidden layers", "Parameter gradients"] },
    ],
    essentialsStyle: "plain",
    essentials: [
      "The forward pass stores values needed by derivatives.",
      "The backward pass begins at the scalar loss.",
      "Each parameter gradient has the same shape as its parameter.",
      "Gradients from branches are added.",
      "Gradient checking can verify a manual derivative.",
    ],
    followUp: "Why is the weight gradient AprevᵀdZ rather than dZAprevᵀ in batch-first notation?",
  },
  lastMinute: {
    definition: "Backprop = chain rule from loss to parameters.",
    sections: [
      { title: "Direction", flow: ["Forward: X → ŷ → L", "Backward: L → gradients"] , wide: true },
      { title: "Dense Layer", points: ["dW = AprevᵀdZ", "db = row sum", "dAprev = dZWᵀ"] },
    ],
    memoryLine: "Forward stores values; backward assigns responsibility for loss.",
    cues: ["Start at ∂L/∂ŷ.", "Multiply along a path; add across branches.", "Check gradient shapes."],
    trap: "Do not describe backpropagation as the parameter-update step.",
  },
};

export const gradientDescentAndLearningRate: SubjectTopic = {
  slug: "gradient-descent-and-learning-rate",
  title: "Gradient Descent and Learning Rate",
  description: "Use gradients to update parameters and understand how the learning rate changes training behaviour.",
  readTime: "22 min",
  difficulty: "Intermediate",
  tags: ["Gradient Descent", "Learning Rate", "Numericals"],
  learn: {
    opening: "A gradient points toward the fastest local increase in loss. Gradient descent moves parameters in the opposite direction to reduce that loss.",
    sections: [
      {
        title: "The Update Rule",
        paragraphs: [
          "Let θ represent all trainable weights and biases. After backpropagation calculates ∇θJ, gradient descent subtracts a scaled version of that gradient.",
          "A positive gradient makes the parameter smaller; a negative gradient makes it larger. A zero gradient produces no first-order change.",
        ],
        formulas: [
          { label: "Gradient-descent update", expression: "θnew = θold − η∇θJ", note: "η > 0 is the learning rate." },
        ],
      },
      {
        title: "What the Learning Rate Controls",
        paragraphs: [
          "The learning rate controls step size, not gradient direction. A very small value learns slowly. A suitable value supports stable overall progress, although individual mini-batch losses can still fluctuate. A very large value can jump across a useful region, oscillate, or make the loss diverge.",
        ],
        visual: {
          src: "/notes/deep-learning/learning-rate-behaviour.png",
          alt: "Loss curves comparing learning rates that are too small, suitable, and too large",
          width: 1536,
          height: 1024,
          caption: "Learning-rate choice changes the speed and stability of optimization.",
        },
        dataTable: {
          headers: ["Observation", "Likely meaning"],
          rows: [
            ["Loss falls very slowly", "Learning rate may be too small"],
            ["Loss falls smoothly", "Learning rate may be suitable"],
            ["Loss jumps up and down", "Learning rate may be too large"],
            ["Loss becomes NaN or infinity", "Updates or numerical values may have exploded"],
          ],
        },
      },
      {
        title: "Batch, Stochastic, and Mini-Batch Updates",
        paragraphs: [
          "Batch gradient descent uses the entire training set for one update. Stochastic gradient descent uses one example. Mini-batch gradient descent uses a small group and is the normal choice for modern neural networks.",
          "Mini-batches use hardware efficiently and introduce useful noise while giving a more stable estimate than one example.",
        ],
        dataTable: {
          headers: ["Method", "Examples per update", "Main property"],
          rows: [
            ["Batch", "Entire training set", "Stable but expensive updates"],
            ["Stochastic", "1", "Noisy, frequent updates"],
            ["Mini-batch", "Usually tens to hundreds", "Practical balance"],
          ],
        },
      },
      {
        title: "Epochs, Steps, and Schedules",
        paragraphs: [
          "One epoch means that training has processed the whole training set once. One step or iteration means one parameter update. With N examples and batch size B, an epoch has ⌈N/B⌉ steps when the final incomplete batch is kept, or ⌊N/B⌋ when it is dropped.",
          "A learning-rate schedule changes η during training. Step decay lowers it at chosen points, cosine decay lowers it along a cosine-shaped curve, and reduce-on-plateau lowers it when a monitored value stops improving. Warm-up may begin with a small rate and raise it gradually during early steps.",
        ],
        formulas: [
          { label: "Keep final batch", expression: "steps = ⌈N / B⌉" },
          { label: "Drop final batch", expression: "steps = ⌊N / B⌋" },
        ],
      },
      {
        title: "Loss Surfaces",
        paragraphs: [
          "Training moves across a high-dimensional loss surface containing minima, flat regions, and saddle points. The practical goal is not a guaranteed global minimum, but parameters with low loss and good performance on unseen data.",
        ],
      },
      {
        title: "One Full Update",
        paragraphs: ["Use the gradients from the earlier scalar backpropagation example and η = 0.01."],
        formulas: [
          { label: "Updated parameters", expression: "w₁ = 0.5 − 0.01(4) = 0.46,  b₁ = 0 − 0.01(2) = −0.02" },
          { label: "Updated output layer", expression: "w₂ = 2 − 0.01(1) = 1.99,  b₂ = 0 − 0.01(1) = −0.01" },
          { label: "New forward pass", expression: "z₁ = 2(0.46) − 0.02 = 0.9,  ŷ = 0.9(1.99) − 0.01 = 1.781" },
          { label: "New loss", expression: "L = ½(1.781 − 1)² ≈ 0.305" },
        ],
      },
      {
        title: "Practice",
        paragraphs: ["Write the update formula first, substitute signs carefully, and update all parameters from the same old parameter state."],
        problems: [
          {
            title: "Single parameter",
            prompt: "A parameter is θ = 3, its gradient is −0.4, and η = 0.1. Find the new value.",
            steps: ["θnew = θold − ηg.", "θnew = 3 − 0.1(−0.4) = 3.04."],
            answer: "θnew = 3.04.",
          },
          {
            title: "Vector update",
            prompt: "Let θ = [2, −1], gradient g = [0.5, −0.2], and η = 0.1. Find the updated vector.",
            steps: ["ηg = [0.05, −0.02].", "θnew = [2, −1] − [0.05, −0.02]."],
            answer: "θnew = [1.95, −0.98].",
          },
          {
            title: "Steps per epoch",
            prompt: "A dataset has 1,000 examples and batch size 64. How many update steps are in one epoch if the final smaller batch is kept?",
            steps: ["1000 / 64 = 15.625.", "Round upward because the remaining examples form a final batch."],
            answer: "⌈1000/64⌉ = 16 steps.",
          },
        ],
      },
    ],
    mechanism: {
      title: "One training step",
      steps: ["Select a mini-batch.", "Run forward propagation.", "Calculate mean batch loss.", "Run backpropagation.", "Apply the optimizer update.", "Repeat with the next mini-batch."],
    },
    example: { title: "Negative gradient", body: "If g = −0.4 and η = 0.1, subtracting ηg adds 0.04. The parameter grows because increasing it is locally expected to reduce the loss." },
    misconception: "Gradient descent does not always make every individual mini-batch loss lower. Noisy batches can cause short-term increases even when overall training improves.",
  },
  revise: {
    definition: "Gradient descent updates parameters opposite to the loss gradient: θnew = θold − η∇θJ.",
    sections: [
      { title: "Learning Rate", table: { headers: ["η", "Behaviour"], rows: [["Too small", "Slow"], ["Suitable", "Stable progress"], ["Too large", "Oscillation or divergence"]] } },
      { title: "Training Counts", formulas: [{ expression: "keep last batch: ⌈N/B⌉" }, { expression: "drop last batch: ⌊N/B⌋" }] },
    ],
    essentialsStyle: "plain",
    essentials: ["Gradient gives direction; learning rate gives step size.", "Mini-batch training is the common practical form.", "One step is one update; one epoch processes the dataset once.", "Schedules change the learning rate over time.", "Use old parameter values when forming one simultaneous update."],
    followUp: "Why can a large learning rate increase the loss even when the gradient direction is correct?",
  },
  lastMinute: {
    definition: "Move parameters opposite to the gradient.",
    sections: [
      { title: "Update", points: ["θnew = θold − ηg", "g > 0: θ decreases", "g < 0: θ increases"] },
      { title: "Loop", flow: ["Mini-batch", "Forward", "Loss", "Backward", "Update"], wide: true },
    ],
    memoryLine: "Gradient chooses the direction; η chooses the distance.",
    cues: ["Mini-batch = practical balance.", "Epoch ≠ step.", "Large η can overshoot."],
    trap: "Do not reverse the minus sign when the gradient itself is negative.",
  },
};

export const optimizersAndInitialization: SubjectTopic = {
  slug: "optimizers-and-initialization",
  title: "SGD, Momentum, Adam, and Initialization",
  description: "Compare common optimizers and initialize weights so that useful signals and gradients can flow.",
  readTime: "27 min",
  difficulty: "Intermediate",
  tags: ["SGD", "Adam", "Initialization"],
  learn: {
    opening: "An optimizer turns gradients into parameter updates. Initialization chooses the parameter values from which that optimization begins.",
    sections: [
      {
        title: "Plain SGD",
        paragraphs: [
          "In deep-learning practice, SGD usually means gradient descent using mini-batches. It uses the current mini-batch gradient directly and has little extra memory.",
          "Its main hyperparameter is the learning rate. The noisy path can help exploration, but progress may zigzag in narrow regions.",
        ],
        formulas: [{ label: "SGD update", expression: "θₜ = θₜ₋₁ − ηgₜ" }],
        visual: {
          src: "/notes/deep-learning/optimizer-paths.png",
          alt: "Conceptual optimization paths for SGD, Momentum, and Adam on a loss surface",
          width: 1536,
          height: 1024,
          caption: "Optimizer paths are conceptual: momentum smooths repeated direction, while Adam also adapts scale per parameter.",
        },
      },
      {
        title: "Momentum",
        paragraphs: [
          "Momentum keeps an exponential moving average of recent gradients. Consistent directions build speed, while changing directions partly cancel. This often reduces zigzagging.",
          "Two common conventions are shown below. The notes and numerical use the EMA convention with (1 − β). The classical convention omits that factor, so its velocity scale and learning-rate interpretation differ.",
        ],
        formulas: [
          { label: "EMA convention used here", expression: "vₜ = βvₜ₋₁ + (1 − β)gₜ" },
          { label: "Classical convention", expression: "vₜ = βvₜ₋₁ + gₜ" },
          { label: "Parameter update", expression: "θₜ = θₜ₋₁ − ηvₜ" },
        ],
      },
      {
        title: "Adam",
        paragraphs: [
          "Adam tracks a moving average of gradients and a moving average of squared gradients. The first estimates direction; the second adapts the step scale separately for each parameter.",
          "Both averages start at zero, so early values are biased toward zero. Bias correction compensates for this start-up effect. Common starting values are β₁ = 0.9, β₂ = 0.999, and ε = 10⁻⁸, while the learning rate still needs tuning.",
          "The symbol v means velocity in the Momentum section but squared-gradient average in Adam. This reuse is common, so read the formula before interpreting it.",
        ],
        formulas: [
          { label: "First moment", expression: "mₜ = β₁mₜ₋₁ + (1 − β₁)gₜ" },
          { label: "Second moment", expression: "vₜ = β₂vₜ₋₁ + (1 − β₂)gₜ²" },
          { label: "Bias correction", expression: "m̂ₜ = mₜ/(1 − β₁ᵗ),  v̂ₜ = vₜ/(1 − β₂ᵗ)" },
          { label: "Adam update", expression: "θₜ = θₜ₋₁ − ηm̂ₜ/(√v̂ₜ + ε)" },
        ],
      },
      {
        title: "Optimizer Comparison",
        paragraphs: ["No optimizer is best for every problem. Learning rate, schedule, model, data, and regularization can matter as much as the optimizer name."],
        dataTable: {
          headers: ["Optimizer", "Main idea", "Extra state"],
          rows: [
            ["SGD", "Use current gradient", "None"],
            ["Momentum", "Smooth gradients over time", "One velocity per parameter"],
            ["Adam", "Momentum plus adaptive scale", "First and second moments"],
          ],
        },
      },
      {
        title: "Why Initialization Matters",
        paragraphs: [
          "If all neurons in the same hidden layer start with identical weights, they receive identical gradients and remain identical. This symmetry prevents them from learning different features. Random weight initialization breaks that symmetry.",
          "Weights that are far too small can shrink signals and gradients. Weights that are far too large can make activations or gradients explode. Biases can usually start at zero because random weights have already separated the neurons.",
        ],
      },
      {
        title: "Xavier and He Initialization",
        paragraphs: [
          "Xavier, also called Glorot, balances fan-in and fan-out and is commonly paired with tanh or sigmoid-like activations. He initialization uses a larger variance designed for ReLU-family activations.",
          "fan_in is the number of inputs to a neuron and fan_out is the number of its outputs. The formulas below are the normal-distribution variants. Their standard deviation is the square root of the stated variance.",
        ],
        formulas: [
          { label: "Xavier normal variance", expression: "Var(W) = 2/(fan_in + fan_out)" },
          { label: "He normal variance", expression: "Var(W) = 2/fan_in" },
          { label: "Standard deviation", expression: "std(W) = √Var(W)" },
        ],
        dataTable: {
          headers: ["Initialization", "Common activation", "Goal"],
          rows: [["Xavier/Glorot", "tanh or sigmoid", "Balance forward and backward variance"], ["He/Kaiming", "ReLU family", "Account for inactive ReLU values"]],
        },
      },
      {
        title: "Practice",
        paragraphs: ["State the optimizer convention before calculating and distinguish variance from standard deviation."],
        problems: [
          {
            title: "Two momentum steps",
            prompt: "Let θ₀ = 2, v₀ = 0, β = 0.9, η = 0.1, g₁ = 0.5, and g₂ = 0.2. Use vₜ = βvₜ₋₁ + (1 − β)gₜ.",
            steps: ["v₁ = 0.9(0) + 0.1(0.5) = 0.05; θ₁ = 2 − 0.1(0.05) = 1.995.", "v₂ = 0.9(0.05) + 0.1(0.2) = 0.065.", "θ₂ = 1.995 − 0.1(0.065) = 1.9885."],
            answer: "v₂ = 0.065 and θ₂ = 1.9885.",
          },
          {
            title: "First Adam step",
            prompt: "At t = 1, m₀ = v₀ = 0 and g₁ > 0. Ignore ε. What do bias-corrected m̂₁ and v̂₁ become?",
            steps: ["m₁ = (1 − β₁)g₁, so m̂₁ = g₁.", "v₁ = (1 − β₂)g₁², so v̂₁ = g₁².", "m̂₁/√v̂₁ = g₁/|g₁| = 1 because g₁ > 0."],
            answer: "m̂₁ = g₁, v̂₁ = g₁², and the first update has size approximately η in the negative direction.",
          },
          {
            title: "Initialization scale",
            prompt: "A layer has fan_in = 100 and fan_out = 50. Find Xavier and He normal variances and approximate standard deviations.",
            steps: ["Xavier variance = 2/(100 + 50) = 0.01333; std ≈ √0.01333 = 0.1155.", "He variance = 2/100 = 0.02; std ≈ √0.02 = 0.1414."],
            answer: "Xavier: variance 0.01333, std 0.1155. He: variance 0.02, std 0.1414.",
          },
          {
            title: "Identify fan-in and fan-out",
            prompt: "A dense layer maps 64 input features to 32 output neurons. Find fan_in and fan_out, then state the preferred initialization for ReLU.",
            steps: [
              "Each output neuron receives 64 inputs, so fan_in = 64.",
              "The layer produces 32 outputs, so fan_out = 32.",
              "ReLU commonly uses He initialization with Var(W) = 2/64 = 0.03125.",
            ],
            answer: "fan_in = 64, fan_out = 32, and He normal variance = 0.03125.",
          },
        ],
      },
    ],
    mechanism: {
      title: "Choosing the training setup",
      steps: ["Choose initialization to match the activation.", "Run forward and backward propagation.", "Let the optimizer transform gradients into updates.", "Monitor training and validation behaviour.", "Tune the learning rate and schedule first.", "Change optimizer or other settings when evidence supports it."],
    },
    example: { title: "ReLU network", body: "For a dense ReLU network, He initialization is a sensible starting choice. Adam may provide a strong baseline, while SGD with momentum is also common when carefully tuned." },
    misconception: "Adam does not remove the need to choose a learning rate, and zero initialization is not safe for all weights in a hidden layer.",
  },
  revise: {
    definition: "Optimizers define parameter updates; initialization defines the starting parameter scale and symmetry.",
    sections: [
      { title: "Optimizer Core", dataTable: { headers: ["Method", "Memory"], rows: [["SGD", "Current gradient"], ["Momentum", "Gradient average"], ["Adam", "Gradient and squared-gradient averages"]] } },
      { title: "Initialization", formulas: [{ label: "Xavier", expression: "Var(W) = 2/(fan_in + fan_out)" }, { label: "He", expression: "Var(W) = 2/fan_in" }] },
    ],
    essentialsStyle: "plain",
    essentials: ["Momentum smooths recent gradients.", "Adam uses first and second moments plus bias correction.", "Common Adam defaults are β₁ = 0.9, β₂ = 0.999, and ε = 10⁻⁸.", "Momentum formulas use different conventions; state yours.", "Random weights break symmetry.", "Xavier commonly fits tanh; He commonly fits ReLU.", "Biases can normally start at zero."],
    followUp: "Why do zero hidden-layer weights cause a symmetry problem while zero biases normally do not?",
  },
  lastMinute: {
    definition: "SGD uses g; Momentum smooths g; Adam smooths g and g².",
    sections: [
      { title: "Match", points: ["tanh/sigmoid → Xavier", "ReLU family → He", "Biases → usually zero"] },
      { title: "Adam", points: ["m: direction average", "v: squared-gradient average", "Defaults: β₁ 0.9, β₂ 0.999, ε 10⁻⁸", "Bias correction matters early"] },
    ],
    memoryLine: "Initialize signal scale, backpropagate gradients, then let the optimizer update.",
    cues: ["Weights must break symmetry.", "He variance = 2/fan_in.", "Adam still needs η."],
    trap: "Do not confuse variance with standard deviation or assume every optimizer uses the same momentum convention.",
  },
};
