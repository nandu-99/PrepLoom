import type { SubjectTopic } from "@/lib/subject-content";

export const activationFunctions: SubjectTopic = {
  slug: "activation-functions",
  title: "Activation Functions: ReLU, Sigmoid, Tanh, and Softmax",
  description:
    "Understand why neural networks need nonlinear activations and calculate the outputs of the four essential functions.",
  readTime: "22 min",
  difficulty: "Foundation",
  tags: ["Activations", "ReLU", "Softmax"],
  learn: {
    opening:
      "An activation function transforms a neuron's weighted result. Nonlinear activations allow a network to learn relationships that one straight line cannot represent.",
    sections: [
      {
        title: "Why Activation Functions Are Necessary",
        paragraphs: [
          "A dense layer first performs a linear transformation. If every layer uses only a linear transformation, several layers can be combined into one equivalent linear layer.",
          "A nonlinear activation between layers breaks this collapse. It allows the network to build curved boundaries and more complex relationships.",
        ],
        formulas: [
          {
            label: "Two linear layers",
            expression: "y = W₂(W₁x + b₁) + b₂",
          },
          {
            label: "Equivalent single linear layer",
            expression: "y = (W₂W₁)x + (W₂b₁ + b₂)",
            note: "Depth adds no extra nonlinear power when activations are missing.",
          },
        ],
        visual: {
          src: "/notes/deep-learning/activation-functions.png",
          alt: "Comparison of ReLU, sigmoid, tanh, and softmax activation behaviour",
          width: 1536,
          height: 1024,
          caption:
            "ReLU, sigmoid, and tanh transform individual values; softmax transforms a vector of scores into a probability distribution.",
        },
      },
      {
        title: "ReLU",
        paragraphs: [
          "The Rectified Linear Unit keeps positive values and replaces negative values with zero. It is a common default for hidden layers because it is simple and usually trains more easily than sigmoid or tanh in deep feedforward networks.",
          "A ReLU neuron can become inactive when it receives only negative z values and its gradient remains zero. This is sometimes called a dead ReLU.",
        ],
        formulas: [
          {
            label: "ReLU",
            expression: "ReLU(z) = max(0, z)",
          },
          {
            label: "Examples",
            expression: "ReLU(−3) = 0,  ReLU(0) = 0,  ReLU(2.5) = 2.5",
          },
        ],
      },
      {
        title: "Leaky ReLU and Dead Units",
        paragraphs: [
          "A ReLU unit can stop changing when it stays in the negative region, where its output and gradient are zero. Leaky ReLU keeps a small negative slope so some gradient can still pass through that region.",
          "Leaky ReLU is a useful alternative, not an automatic replacement for every ReLU layer.",
        ],
        formulas: [
          {
            label: "Leaky ReLU",
            expression: "f(z) = max(αz, z),  where α is a small positive value",
          },
        ],
      },
      {
        title: "Sigmoid",
        paragraphs: [
          "Sigmoid maps any real number to a value strictly between 0 and 1. It is useful for the output of binary classification because that output can be interpreted as the model's estimated probability for the positive class.",
          "For very large positive or negative inputs, sigmoid becomes almost flat. Its gradient becomes very small, so sigmoid is usually not the first choice for deep hidden layers.",
        ],
        formulas: [
          {
            label: "Sigmoid",
            expression: "σ(z) = 1 / (1 + e⁻ᶻ)",
          },
          {
            label: "Important value",
            expression: "σ(0) = 1 / (1 + 1) = 0.5",
          },
        ],
      },
      {
        title: "Tanh",
        paragraphs: [
          "The hyperbolic tangent maps a value to the interval from −1 to 1. Its outputs are centred around zero, which can be useful in recurrent networks and some hidden-state calculations.",
          "Like sigmoid, tanh becomes flat for large magnitudes and can contribute to vanishing gradients in deep networks.",
        ],
        formulas: [
          {
            label: "Tanh",
            expression: "tanh(z) = (eᶻ − e⁻ᶻ) / (eᶻ + e⁻ᶻ)",
          },
          {
            label: "Important values",
            expression: "tanh(0) = 0,  tanh(z) ∈ (−1, 1)",
          },
        ],
      },
      {
        title: "Softmax",
        paragraphs: [
          "Softmax acts on a vector of scores called logits. It converts them into positive values that add to 1. This makes softmax suitable for a single-label multiclass output, where exactly one class should be correct.",
          "Every softmax probability depends on all logits. Raising one class score changes the complete distribution.",
        ],
        formulas: [
          {
            label: "Softmax for class i",
            expression: "pᵢ = eᶻⁱ / Σⱼ eᶻʲ",
          },
          {
            label: "Probability rule",
            expression: "0 < pᵢ < 1  and  Σᵢ pᵢ = 1",
          },
          {
            label: "Numerically stable form",
            expression: "softmax(z) = softmax(z − max(z))",
            note: "Subtracting the largest logit avoids unnecessarily large exponentials and does not change the probabilities.",
          },
        ],
      },
      {
        title: "Essential Activation Derivatives",
        paragraphs: [
          "Backpropagation uses derivatives to measure how an activation output changes when z changes. Module 2 will use these derivatives during gradient calculations.",
          "ReLU is not differentiable at exactly z = 0. Software chooses a fixed convention there, commonly zero. This single point does not prevent practical gradient-based training.",
        ],
        formulas: [
          {
            label: "ReLU derivative",
            expression: "ReLU′(z) = 0 for z < 0;  1 for z > 0",
            note: "At z = 0 the mathematical derivative is undefined; implementations choose a convention.",
          },
          {
            label: "Sigmoid derivative",
            expression: "σ′(z) = σ(z)(1 − σ(z))",
          },
          {
            label: "Tanh derivative",
            expression: "tanh′(z) = 1 − tanh²(z)",
          },
          {
            label: "Linear derivative",
            expression: "f(z) = z  ⇒  f′(z) = 1",
          },
        ],
      },
      {
        title: "Choose the Activation by Its Job",
        paragraphs: [
          "Hidden-layer and output-layer activations have different jobs. Hidden layers build representations. The output layer must match the meaning of the target and the chosen loss function.",
        ],
        dataTable: {
          headers: ["Location or task", "Common activation", "Output meaning"],
          rows: [
            [
              "Hidden dense or convolution layer",
              "ReLU",
              "Nonnegative feature values",
            ],
            [
              "Binary classification output",
              "Sigmoid",
              "One positive-class probability",
            ],
            [
              "Multi-label classification output",
              "Independent sigmoid per label",
              "Several labels may be true together",
            ],
            [
              "Single-label multiclass output",
              "Softmax",
              "Class probabilities that sum to 1",
            ],
            [
              "Regression output",
              "Linear or no activation",
              "Unrestricted numerical value",
            ],
            ["Some recurrent hidden states", "Tanh", "Values between −1 and 1"],
          ],
        },
      },
      {
        title: "Worked Activation Numericals",
        paragraphs: [
          "Keep enough decimal places during the calculation and round only the final answer unless a question says otherwise.",
        ],
        problems: [
          {
            title: "Apply ReLU to a vector",
            prompt: "Find ReLU(z) for z = [−2, 0, 1.5, 4].",
            steps: [
              "Replace every negative value with 0.",
              "Keep zero and every positive value unchanged.",
              "ReLU(z) = [0, 0, 1.5, 4].",
            ],
            answer: "[0, 0, 1.5, 4]",
          },
          {
            title: "Calculate sigmoid",
            prompt: "Calculate σ(1) to three decimal places. Use e⁻¹ ≈ 0.3679.",
            steps: [
              "σ(1) = 1 / (1 + e⁻¹).",
              "σ(1) = 1 / (1 + 0.3679).",
              "σ(1) = 1 / 1.3679 ≈ 0.731.",
            ],
            answer: "σ(1) ≈ 0.731.",
          },
          {
            title: "Calculate softmax",
            prompt:
              "Find softmax probabilities for logits z = [2, 1, 0]. Use e² ≈ 7.389 and e¹ ≈ 2.718.",
            steps: [
              "Exponentials = [e², e¹, e⁰] = [7.389, 2.718, 1].",
              "Denominator = 7.389 + 2.718 + 1 = 11.107.",
              "p₁ = 7.389 / 11.107 ≈ 0.665.",
              "p₂ = 2.718 / 11.107 ≈ 0.245; p₃ = 1 / 11.107 ≈ 0.090.",
              "Check: 0.665 + 0.245 + 0.090 = 1.000.",
            ],
            answer: "softmax(z) ≈ [0.665, 0.245, 0.090].",
          },
          {
            title: "Select an output activation",
            prompt:
              "A model must choose exactly one of five animal classes. Which output activation is suitable, and how many output units are needed?",
            steps: [
              "The classes are mutually exclusive: exactly one class is correct.",
              "The network needs one score for each class, so it needs five output units.",
              "Softmax converts the five logits into probabilities that sum to 1.",
            ],
            answer: "Use five output units with softmax.",
          },
          {
            title: "Calculate an activation derivative",
            prompt:
              "A sigmoid neuron has output σ(z) = 0.8. Find the local derivative σ′(z).",
            steps: [
              "Use σ′(z) = σ(z)(1 − σ(z)).",
              "σ′(z) = 0.8(1 − 0.8).",
              "σ′(z) = 0.8 × 0.2 = 0.16.",
            ],
            answer: "σ′(z) = 0.16.",
          },
        ],
      },
    ],
    mechanism: {
      title: "How to choose an activation",
      steps: [
        "Decide whether the layer is hidden or output.",
        "For a standard hidden layer, begin with ReLU unless the architecture gives a reason to use another function.",
        "For an output layer, identify regression, binary classification, or multiclass classification.",
        "Match the output range to the target meaning.",
        "Match the activation with the corresponding loss function.",
        "Check for saturation, dead units, or unstable outputs during training.",
      ],
    },
    example: {
      title: "Email classification",
      body: "For spam versus not spam, one sigmoid output can estimate P(spam). For exactly one folder among Primary, Social, Promotions, and Spam, four softmax outputs form one probability distribution.",
    },
    misconception:
      "Softmax is not four separate sigmoid calculations. Softmax couples all class scores through one shared denominator, so its outputs add to 1.",
  },
  revise: {
    definition:
      "An activation function transforms a neuron's weighted result and usually adds nonlinearity.",
    sections: [
      {
        title: "Fast Comparison",
        dataTable: {
          headers: ["Function", "Range", "Common use"],
          rows: [
            ["ReLU", "[0, ∞)", "Hidden layers"],
            ["Sigmoid", "(0, 1)", "Binary output"],
            ["Tanh", "(−1, 1)", "Some recurrent states"],
            [
              "Softmax",
              "Each (0, 1), sum = 1",
              "Single-label multiclass output",
            ],
          ],
        },
      },
      {
        title: "Core Formulas",
        formulas: [
          { expression: "ReLU(z) = max(0, z)" },
          { expression: "σ(z) = 1 / (1 + e⁻ᶻ)" },
          { expression: "pᵢ = eᶻⁱ / Σⱼ eᶻʲ" },
          { expression: "σ′(z) = σ(z)(1 − σ(z))" },
          { expression: "tanh′(z) = 1 − tanh²(z)" },
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Without nonlinear activations, stacked dense layers remain one linear transformation.",
      "ReLU is a common hidden-layer default.",
      "Sigmoid produces one binary probability.",
      "Softmax probabilities compete and add to 1.",
      "Independent sigmoid outputs support labels that may be true together.",
      "Regression commonly uses a linear output.",
    ],
    followUp:
      "Why do several dense layers without nonlinear activations behave like one dense layer?",
  },
  lastMinute: {
    definition:
      "Activation functions decide how z becomes the neuron output a.",
    sections: [
      {
        title: "Selection Map",
        points: [
          "Hidden layer → ReLU",
          "Binary output → Sigmoid",
          "Several independent labels → Sigmoid per label",
          "One of many classes → Softmax",
          "Regression → Linear output",
        ],
      },
      {
        title: "Anchor Values",
        points: [
          "ReLU(negative) = 0",
          "Sigmoid(0) = 0.5",
          "Tanh(0) = 0",
          "Softmax probabilities sum to 1",
        ],
      },
    ],
    memoryLine: "Hidden ReLU, binary sigmoid, one-of-many softmax.",
    cues: [
      "Sigmoid and tanh saturate at large magnitudes.",
      "Softmax accepts a vector of logits.",
      "Activation choice must match target and loss.",
    ],
    trap: "Do not use softmax for unrelated labels that may all be true; softmax forces one shared distribution.",
  },
};

export const layersAndFeedforwardNetworks: SubjectTopic = {
  slug: "layers-and-feedforward-neural-networks",
  title: "Layers and Feedforward Neural Networks",
  description:
    "Connect neurons into dense layers and track information through a complete feedforward network.",
  readTime: "18 min",
  difficulty: "Foundation",
  tags: ["Layers", "Dense Network", "MLP"],
  learn: {
    opening:
      "A neural-network layer processes many values together. A feedforward network sends information from input to output without sending it back to an earlier layer.",
    sections: [
      {
        title: "From One Neuron to a Layer",
        paragraphs: [
          "One neuron produces one output value. A dense layer contains several neurons, so it produces a vector of outputs.",
          "Every neuron in a dense or fully connected layer receives every value from the previous layer. Each neuron has its own weight vector and bias.",
        ],
        formulas: [
          {
            label: "Dense layer",
            expression: "Z = XW + b",
          },
          {
            label: "Activated output",
            expression: "A = f(Z)",
          },
        ],
      },
      {
        title: "The Three Layer Roles",
        paragraphs: [
          "The input layer represents the supplied features. Hidden layers create learned intermediate representations. The output layer produces values that match the task.",
        ],
        visual: {
          src: "/notes/deep-learning/feedforward-network-v2.png",
          alt: "Fully connected feedforward network with an input layer, two hidden layers, and an output layer",
          width: 1536,
          height: 1024,
          caption:
            "Information moves through adjacent layers in the forward direction; training later adjusts the connection parameters.",
        },
        dataTable: {
          headers: ["Layer", "Job", "Has learned parameters?"],
          rows: [
            ["Input", "Holds one example's features", "No"],
            ["Hidden", "Builds an internal representation", "Usually yes"],
            [
              "Output",
              "Produces task-specific scores or values",
              "Usually yes",
            ],
          ],
        },
      },
      {
        title: "Feedforward Means One Direction",
        paragraphs: [
          "During a forward pass, each layer uses only values that are already available from an earlier layer. There is no loop that sends the current output back into the same feedforward calculation.",
          "This does not mean training has no backward computation. Backpropagation later sends gradient information backward, but the model's prediction path is still feedforward.",
        ],
        flow: ["Input x", "Hidden layer 1", "Hidden layer 2", "Output ŷ"],
      },
      {
        title: "Layer Dimensions",
        paragraphs: [
          "With PrepLoom's batch-first row convention, a layer maps X:(B, D) through W:(D, U) and b:(U) to Z:(B, U). Some books use column vectors and transpose these shapes. The next topic handles full shape and parameter-count numericals.",
        ],
        formulas: [
          {
            label: "Batch dense layer",
            expression: "X(B × D) · W(D × U) + b(U) = Z(B × U)",
          },
        ],
      },
      {
        title: "What Does Hidden-Layer Width Mean?",
        paragraphs: [
          "Width is the number of units in a layer. More units give the network room to learn more features, but they also add parameters, memory use, and overfitting risk.",
          "Depth is the number of parameterized transformations. In PrepLoom, depth includes the output layer but does not include the input layer. Other sources may state their counting convention differently.",
          "Neither greater width nor greater depth guarantees a better model. Architecture must be validated for the task.",
        ],
      },
      {
        title: "Multilayer Perceptron",
        paragraphs: [
          "A feedforward network built from dense layers is commonly called a Multilayer Perceptron, or MLP. Despite the name, modern MLP units usually use activations such as ReLU rather than the original hard-threshold perceptron rule.",
          "An architecture written as 4-5-3-2 means four input features, hidden layers with five and three units, and two output units.",
          "Dense layers connect every previous value to every unit. Later modules introduce layers with different connection patterns: convolutional layers use local shared filters, while recurrent layers reuse connections across sequence steps.",
        ],
      },
      {
        title: "Architecture and Shape Practice",
        paragraphs: [
          "Track the batch axis separately. Dense layers change the feature width, not the number of examples.",
        ],
        problems: [
          {
            title: "Read an architecture",
            prompt:
              "Interpret the architecture 8-6-4-1. How many hidden layers does it have, and how many units are in each?",
            steps: [
              "The first value 8 is the number of input features.",
              "The middle values 6 and 4 describe hidden layers.",
              "The final value 1 describes the output layer.",
            ],
            answer: "Two hidden layers with 6 and 4 units; one output unit.",
          },
          {
            title: "Track batch shapes",
            prompt:
              "A batch X has shape (64, 20). It passes through dense layers with 12, 5, and 2 units. Find the output shape after each layer.",
            steps: [
              "The batch size 64 stays unchanged.",
              "After 12 units: (64, 12).",
              "After 5 units: (64, 5).",
              "After 2 units: (64, 2).",
            ],
            answer: "(64, 12) → (64, 5) → (64, 2).",
          },
          {
            title: "Find weight shapes",
            prompt:
              "For architecture 10-7-3, use XW + b convention and find both weight-matrix shapes.",
            steps: [
              "First layer maps 10 input values to 7 units, so W¹ has shape (10, 7).",
              "Second layer maps 7 values to 3 units, so W² has shape (7, 3).",
              "The matching bias shapes are (7) and (3).",
            ],
            answer: "W¹: (10, 7); W²: (7, 3).",
          },
        ],
      },
    ],
    mechanism: {
      title: "How to read a feedforward architecture",
      steps: [
        "Read the input width as the number of supplied features.",
        "Treat middle widths as hidden-layer unit counts.",
        "Read the final width as the number of task outputs.",
        "Count parameterized layers for depth; do not count the input layer.",
        "Check that each weight matrix maps one layer width to the next.",
        "Check that the final activation matches the prediction task.",
      ],
    },
    example: {
      title: "Student-result network",
      body: "Four input features enter a hidden layer with six units. Those six learned values enter a hidden layer with three units. One sigmoid output then estimates the probability of passing. The architecture is 4-6-3-1.",
    },
    misconception:
      "The input layer is not normally counted as a learned layer because it only represents supplied values and has no weights or biases of its own.",
  },
  revise: {
    definition:
      "A feedforward neural network sends values through input, hidden, and output layers without prediction-time loops.",
    sections: [
      {
        title: "Dense-Layer Shape",
        formulas: [{ expression: "X(B × D) · W(D × U) + b(U) = Z(B × U)" }],
      },
      {
        title: "Layer Roles",
        flow: ["Input features", "Hidden representations", "Output prediction"],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "One neuron produces one value; U neurons produce U values.",
      "Dense means each unit connects to every previous-layer value.",
      "An MLP is a feedforward network made mainly from dense layers.",
      "Width is units per layer; PrepLoom depth counts parameterized layers but not input.",
      "PrepLoom uses the batch-first Z = XW + b convention.",
      "Dense layers preserve batch size and change feature width.",
    ],
    followUp:
      "For input shape (32, 10) and a dense layer with 4 units, why is the output shape (32, 4)?",
  },
  lastMinute: {
    definition:
      "Feedforward network: values move from input to hidden layers to output.",
    sections: [
      {
        title: "Shape Rule",
        points: [
          "Input: (B, D)",
          "Weights: (D, U)",
          "Bias: (U)",
          "Output: (B, U)",
        ],
      },
      {
        title: "Architecture",
        flow: ["4 inputs", "6 hidden", "3 hidden", "1 output"],
        wide: true,
      },
    ],
    memoryLine: "Each dense layer keeps B and replaces D with U.",
    cues: [
      "Input layer has no learned parameters.",
      "Hidden layers build representations.",
      "Output size matches the task.",
    ],
    trap: "Do not count the input layer as a parameterized transformation, and do not change the batch size when tracking a dense layer.",
  },
};

export const forwardPropagationAndParameterCounting: SubjectTopic = {
  slug: "forward-propagation-and-parameter-counting",
  title: "Forward Propagation and Parameter Counting",
  description:
    "Complete a forward pass through a small network and calculate every trainable weight and bias.",
  readTime: "24 min",
  difficulty: "Intermediate",
  tags: ["Forward Pass", "Parameters", "Numericals"],
  learn: {
    opening:
      "Forward propagation uses the current parameters to turn input values into a prediction. Parameter counting tells us how many values the network must learn.",
    sections: [
      {
        title: "Forward Propagation",
        paragraphs: [
          "A forward pass evaluates one layer after another. Each layer receives the previous activation, calculates a weighted result, and applies its activation function.",
          "Superscripts identify layers. The original input batch is A⁽⁰⁾ = X. For layer ℓ, the output activation is A⁽ℓ⁾. We continue using the batch-first row convention introduced in the previous topic.",
        ],
        formulas: [
          {
            label: "Layer ℓ weighted result",
            expression: "Z⁽ℓ⁾ = A⁽ℓ⁻¹⁾W⁽ℓ⁾ + b⁽ℓ⁾",
          },
          {
            label: "Layer ℓ activation",
            expression: "A⁽ℓ⁾ = f⁽ℓ⁾(Z⁽ℓ⁾)",
          },
          {
            label: "Network input",
            expression: "A⁽⁰⁾ = X",
          },
        ],
      },
      {
        title: "Parameter Counting in a Dense Layer",
        paragraphs: [
          "A dense layer with D inputs and U units needs D weights for each unit. It also needs one bias for each unit.",
        ],
        formulas: [
          {
            label: "Weights",
            expression: "Number of weights = D × U",
          },
          {
            label: "Biases",
            expression: "Number of biases = U",
          },
          {
            label: "Dense-layer parameters",
            expression: "Parameters = D × U + U = (D + 1)U",
          },
        ],
        visual: {
          src: "/notes/deep-learning/forward-parameter-count.png",
          alt: "Parameter count for a dense network with three inputs, four hidden units, and two outputs",
          width: 1536,
          height: 1024,
          caption:
            "Count every connection weight and one bias for each non-input unit.",
        },
      },
      {
        title: "Do Not Count Activations as Parameters",
        paragraphs: [
          "Weights and biases are trainable parameters. Inputs, intermediate activations, and predictions are values produced for particular examples; they are not learned parameters.",
          "Standard ReLU, sigmoid, tanh, and softmax functions have no trainable parameters. Some other layers can have their own trainable values, but they will be counted explicitly when introduced.",
        ],
        table: {
          headers: ["Count as trainable parameter", "Do not count"],
          rows: [
            ["Dense weights", "Input features"],
            ["Dense biases", "Neuron outputs"],
            ["Any explicitly learned layer value", "ReLU or sigmoid function"],
          ],
        },
      },
      {
        title: "Worked Parameter-Count Numerical",
        paragraphs: [
          "Consider architecture 5-4-3. Count layer by layer so no connection or bias is missed. This differs from the architecture in the diagram and gives one more example to practise.",
        ],
        formulas: [
          {
            label: "Input to hidden",
            expression: "5 × 4 weights + 4 biases = 24",
          },
          {
            label: "Hidden to output",
            expression: "4 × 3 weights + 3 biases = 15",
          },
          {
            label: "Total",
            expression: "24 + 15 = 39 trainable parameters",
          },
        ],
      },
      {
        title: "Complete Forward-Pass Numerical",
        paragraphs: [
          "The following network has two inputs, two ReLU hidden units, and one sigmoid output. The single example is written as one row so it follows the same XW + b convention used throughout the module.",
        ],
        formulas: [
          {
            label: "Given input",
            expression: "X = [1, 2]",
          },
          {
            label: "Hidden parameters",
            expression: "W⁽¹⁾ = [[1, 0.5], [−1, 1]],  b⁽¹⁾ = [0, −1]",
          },
          {
            label: "Hidden weighted result",
            expression: "Z⁽¹⁾ = XW⁽¹⁾ + b⁽¹⁾ = [−1, 1.5]",
          },
          {
            label: "Hidden activation",
            expression: "A⁽¹⁾ = ReLU(Z⁽¹⁾) = [0, 1.5]",
          },
          {
            label: "Output parameters",
            expression: "W⁽²⁾ = [[2], [−1]],  b⁽²⁾ = [0.5]",
          },
          {
            label: "Output logit",
            expression: "Z⁽²⁾ = A⁽¹⁾W⁽²⁾ + b⁽²⁾ = −1",
          },
          {
            label: "Prediction",
            expression: "ŷ = σ(−1) = 1 / (1 + e¹) ≈ 0.269",
          },
        ],
      },
      {
        title: "Shape Check for the Same Network",
        paragraphs: [
          "Shape checking catches many forward-pass mistakes before arithmetic begins. In the batch-first row convention, a layer with n₍in₎ inputs and n₍out₎ units uses a weight matrix of shape (n₍in₎, n₍out₎).",
        ],
        dataTable: {
          headers: ["Tensor", "Shape", "Result"],
          rows: [
            ["X", "(1, 2)", "One example with two input values"],
            ["W⁽¹⁾", "(2, 2)", "Two hidden units from two inputs"],
            ["b⁽¹⁾", "(2)", "One bias per hidden unit"],
            ["A⁽¹⁾", "(1, 2)", "Two hidden activations for one example"],
            ["W⁽²⁾", "(2, 1)", "One output from two hidden values"],
            ["ŷ", "(1, 1)", "One prediction for one example"],
          ],
        },
      },
      {
        title: "Forward Pass, Loss, Backward Pass, and Update",
        paragraphs: [
          "These are four different stages. Module 1 calculates the forward pass. Module 2 will explain the loss, gradients, backward pass, and parameter update in detail.",
        ],
        dataTable: {
          headers: ["Stage", "Job"],
          rows: [
            ["Forward pass", "Produce a prediction using current parameters"],
            ["Loss", "Measure how far the prediction is from the target"],
            ["Backward pass", "Calculate gradients for the parameters"],
            ["Update", "Change parameters to reduce future loss"],
          ],
        },
      },
      {
        title: "Worked Batch Forward Pass",
        paragraphs: [
          "A complete batch calculation connects tensor shapes with real matrix values. Two examples with three features pass through a dense layer with two ReLU units.",
        ],
        formulas: [
          {
            label: "Given",
            expression: "X = [[1, 2, 0], [0, 1, 3]]",
          },
          {
            label: "Parameters",
            expression: "W = [[1, 0], [2, −1], [0.5, 1]],  b = [1, −2]",
          },
          {
            label: "Weighted result",
            expression: "Z = XW + b = [[6, −4], [4.5, 0]]",
          },
          {
            label: "ReLU output",
            expression: "A = ReLU(Z) = [[6, 0], [4.5, 0]]",
          },
          {
            label: "Shape check",
            expression: "(2 × 3)(3 × 2) + (2) = (2 × 2)",
          },
        ],
      },
      {
        title: "Numerical Practice",
        paragraphs: [
          "For parameter counts, count weights and biases layer by layer. For forward passes, finish one full layer before moving to the next.",
        ],
        problems: [
          {
            title: "Count an MLP's parameters",
            prompt:
              "Find the total trainable parameters in architecture 5-8-4-1. Every non-input layer is dense and has a bias.",
            steps: [
              "Layer 1: 5 × 8 + 8 = 48.",
              "Layer 2: 8 × 4 + 4 = 36.",
              "Output layer: 4 × 1 + 1 = 5.",
              "Total = 48 + 36 + 5 = 89.",
            ],
            answer: "89 trainable parameters.",
          },
          {
            title: "One-layer forward pass",
            prompt:
              "For X = [2, −1], W = [[1, −2], [3, 1]], b = [0, 2], calculate Z = XW + b and A = ReLU(Z).",
            steps: [
              "First unit: z₁ = (1)(2) + (3)(−1) + 0 = −1.",
              "Second unit: z₂ = (−2)(2) + (1)(−1) + 2 = −3.",
              "z = [−1, −3].",
              "ReLU replaces both negative values with zero.",
            ],
            answer: "z = [−1, −3] and a = [0, 0].",
          },
          {
            title: "Find the missing layer width",
            prompt:
              "A dense layer receives 10 inputs and has 66 trainable parameters including biases. How many units U does it contain?",
            steps: [
              "Dense parameters = (D + 1)U.",
              "66 = (10 + 1)U.",
              "66 = 11U.",
              "U = 6.",
            ],
            answer: "The layer contains 6 units.",
          },
          {
            title: "Batch forward shape",
            prompt:
              "A batch has shape (128, 30). It passes through dense layers with 16 and 4 units. Find activation shapes and the total parameter count.",
            steps: [
              "First activation shape = (128, 16).",
              "Second activation shape = (128, 4).",
              "First layer parameters = 30 × 16 + 16 = 496.",
              "Second layer parameters = 16 × 4 + 4 = 68.",
              "Total parameters = 496 + 68 = 564.",
            ],
            answer: "Shapes: (128, 16), (128, 4); total parameters: 564.",
          },
        ],
      },
    ],
    mechanism: {
      title: "How to solve a forward-pass numerical",
      steps: [
        "Write the input, parameter, and expected output shapes.",
        "Calculate z for the first layer.",
        "Apply that layer's activation to obtain a.",
        "Use a as the next layer's input.",
        "Repeat until the final prediction is produced.",
        "Check output range, dimensions, and arithmetic.",
      ],
    },
    example: {
      title: "One prediction, many calculations",
      body: "A 20-10-3 classifier first turns 20 features into 10 hidden activations. The output layer turns those 10 values into three logits. Softmax converts the logits into three probabilities. This entire input-to-probability calculation is one forward pass.",
    },
    misconception:
      "A batch does not create a new copy of the model's parameters for every example. All examples in the batch use the same weights and biases.",
  },
  revise: {
    definition:
      "Forward propagation evaluates the network from input to prediction using its current parameters.",
    sections: [
      {
        title: "Layer Equations",
        formulas: [
          { expression: "Z⁽ℓ⁾ = A⁽ℓ⁻¹⁾W⁽ℓ⁾ + b⁽ℓ⁾" },
          { expression: "A⁽ℓ⁾ = f⁽ℓ⁾(Z⁽ℓ⁾)" },
        ],
      },
      {
        title: "Parameter Formula",
        formulas: [{ expression: "Dense parameters = D × U + U = (D + 1)U" }],
      },
      {
        title: "What to Count",
        points: [
          "Count every weight.",
          "Count one bias for every dense unit.",
          "Do not count inputs, activations, or ordinary activation functions.",
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Finish weighted sum before applying activation.",
      "The previous layer's activation becomes the next layer's input.",
      "Count parameters layer by layer.",
      "Batch size changes computation volume, not parameter count.",
      "Check matrix shapes before doing arithmetic.",
    ],
    followUp:
      "Why does changing batch size from 32 to 64 not change a dense layer's parameter count?",
  },
  lastMinute: {
    definition:
      "Forward pass: calculate z, activate, and repeat until the prediction.",
    sections: [
      {
        title: "Two Formulas",
        points: [
          "Layer: Z = AW + b, then A = f(Z)",
          "Dense parameters: inputs × units + units",
        ],
      },
      {
        title: "Numerical Order",
        flow: [
          "Check shapes",
          "Multiply and add",
          "Activate",
          "Next layer",
          "Verify output",
        ],
        wide: true,
      },
    ],
    memoryLine: "Shapes first; z then a; weights plus biases.",
    cues: [
      "One bias per non-input dense unit.",
      "Batch size does not multiply parameter count.",
      "Output range should match its activation.",
    ],
    trap: "Do not count connections into the input layer, do not omit biases, and do not apply the next layer before activating the current one.",
  },
};
