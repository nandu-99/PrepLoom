import type { SubjectTopic } from "@/lib/subject-content";

export const introductionToDeepLearning: SubjectTopic = {
  slug: "introduction-to-deep-learning",
  title: "Introduction to Deep Learning",
  description:
    "Understand what deep learning is, how it relates to machine learning, and why stacked layers can learn useful representations.",
  readTime: "11 min",
  difficulty: "Foundation",
  tags: ["Deep Learning", "Neural Networks", "Representations"],
  learn: {
    opening:
      "Deep learning is a part of machine learning that uses neural networks with several layers. These layers learn useful patterns directly from examples.",
    sections: [
      {
        title: "Start With the Main Idea",
        paragraphs: [
          "A machine-learning model learns a relationship between input data and a target. Deep learning does the same job, but it uses a layered neural network to build the relationship.",
          "The word deep refers to the number of learned layers between the input and output. It does not mean that the model thinks like a person or understands the world in the human sense.",
        ],
        visual: {
          src: "/notes/deep-learning/deep-learning-representations.png",
          alt: "Deep learning pipeline where input pixels become simple patterns, useful features, and a final house prediction",
          width: 1536,
          height: 1024,
          caption:
            "Deeper layers combine simpler patterns into representations that are useful for the final prediction.",
        },
      },
      {
        title: "AI, Machine Learning, and Deep Learning",
        paragraphs: [
          "Artificial Intelligence is the broad goal of making computers perform tasks that appear intelligent. Machine Learning is one way to reach that goal by learning patterns from data. Deep Learning is a family of machine-learning methods based on layered neural networks.",
          "A deep-learning model is therefore also a machine-learning model. The terms are related, but they are not interchangeable.",
        ],
        dataTable: {
          headers: ["Area", "Main idea", "Example"],
          rows: [
            ["Artificial Intelligence", "Broad field of intelligent computer behaviour", "A system that plans a route"],
            ["Machine Learning", "Learns a pattern from examples", "A model that predicts house prices"],
            ["Deep Learning", "Uses layered neural networks", "A network that recognizes objects in images"],
          ],
        },
      },
      {
        title: "Traditional Machine Learning and Deep Learning",
        paragraphs: [
          "In many traditional machine-learning systems, people decide which useful features to calculate before training. A deep network can learn several levels of features from the supplied numerical input.",
          "This is a difference in approach, not a strict rule. Traditional models can also learn representations, and deep-learning projects still require people to prepare data and choose a useful objective.",
        ],
        dataTable: {
          headers: ["Question", "Traditional ML", "Deep Learning"],
          rows: [
            ["Features", "Often designed or selected by people", "Many features learned through layers"],
            ["Common data", "Structured tables", "Images, text, audio, and other complex data"],
            ["Model depth", "Usually fewer learned transformations", "Usually several learned transformations"],
          ],
        },
      },
      {
        title: "What Is a Learned Representation?",
        paragraphs: [
          "Raw data is often not in the most useful form for a prediction. A representation is a useful internal description of that data.",
          "For an image, early layers may respond to edges. Later layers may combine edges into shapes. Deeper layers can combine shapes into object parts. The final layer uses these learned features to make a prediction.",
          "The important point is that the programmer does not manually write every feature rule. Training adjusts the network so that useful features emerge from the data and the learning objective.",
        ],
      },
      {
        title: "When Deep Learning Is Useful",
        paragraphs: [
          "Deep learning is especially useful when the data has complex structure and enough useful examples are available. Images, audio, text, and long sequences are common cases.",
          "It is not automatically the best choice. A small structured table may be handled well by linear models or tree-based models. These models can train faster and may be easier to explain.",
        ],
        table: {
          headers: ["Deep learning is often useful", "A simpler model may be better"],
          rows: [
            ["Large image, audio, or text dataset", "Small tabular dataset"],
            ["Complex patterns must be learned", "A clear simple relationship is enough"],
            ["Compute and training time are available", "Fast training and explanation are priorities"],
          ],
        },
      },
      {
        title: "Training and Inference Are Different Stages",
        paragraphs: [
          "During training, the network makes predictions, measures error, and adjusts its parameters. During inference, the trained parameters stay fixed while the network produces an output for a new input.",
          "Validation and test examples check whether the learned pattern works on data that did not update the parameters. A good training score alone is not enough.",
        ],
        table: {
          headers: ["Training", "Inference"],
          rows: [
            ["Uses labelled or otherwise prepared examples", "Uses a new input"],
            ["Calculates error and updates parameters", "Does not normally update parameters"],
            ["Can take many repeated passes", "Usually produces one requested result"],
          ],
        },
      },
      {
        title: "Important Limitations",
        paragraphs: [
          "A neural network learns statistical patterns in its training data. It can repeat bias, use accidental shortcuts, and become confident for unfamiliar inputs.",
          "A high test score also does not prove that a model is safe for every situation. The test data must represent the real task, and important failures must be studied separately.",
        ],
        points: [
          "Training can require a large amount of data and computation.",
          "The learned reasoning can be difficult to explain.",
          "Biased or incorrect data can produce harmful predictions.",
          "Inputs that differ from training data can cause unreliable outputs.",
        ],
      },
      {
        title: "Practice: Choose the Right Starting Point",
        paragraphs: [
          "The goal is not to choose the most complicated model. The goal is to choose a model that fits the data and task.",
        ],
        problems: [
          {
            title: "Small tabular dataset",
            prompt:
              "A bank has 1,200 rows with ten clearly defined numerical features and needs an explainable baseline. Should it begin with a deep neural network?",
            steps: [
              "Identify the data: a small structured table.",
              "Identify the requirement: the result should be explainable.",
              "Compare the cost: a deep model adds complexity without a clear need.",
            ],
            answer:
              "No. Begin with a simpler baseline such as logistic regression or a tree-based model, then compare alternatives honestly.",
          },
          {
            title: "Large image collection",
            prompt:
              "A factory has hundreds of thousands of labelled product images and wants to recognize visual defects. Is deep learning a reasonable choice?",
            steps: [
              "The input is unstructured image data.",
              "Visual defects may require many learned patterns.",
              "A large labelled dataset is available.",
            ],
            answer:
              "Yes. A deep vision model is a reasonable candidate, but it must still be compared with a baseline and tested on realistic images.",
          },
        ],
      },
    ],
    mechanism: {
      title: "How a deep-learning system learns",
      steps: [
        "Convert each example into numerical input values.",
        "Pass the values through a stack of layers to produce a prediction.",
        "Compare the prediction with the correct target using a loss function.",
        "Calculate how each parameter affected the loss.",
        "Adjust the parameters to reduce future error.",
        "Repeat over many examples and validate on data not used for updates.",
      ],
    },
    example: {
      title: "Recognizing a handwritten digit",
      body: "The input layer receives pixel values. Early layers learn small strokes and edges. Later layers combine them into loops and digit shapes. The output gives a score or probability for each digit from 0 to 9.",
    },
    misconception:
      "Deep learning does not remove the need for data preparation, evaluation, or human judgment. It learns useful features, but only from the data and objective it is given.",
  },
  revise: {
    definition:
      "Deep learning is machine learning with layered neural networks that learn representations from data.",
    sections: [
      {
        title: "Core Relationship",
        flow: ["Artificial Intelligence", "Machine Learning", "Deep Learning"],
      },
      {
        title: "Why Layers Matter",
        points: [
          "Early layers learn simple patterns.",
          "Later layers combine them into useful features.",
          "The output layer turns the final representation into a prediction.",
        ],
      },
      {
        title: "Use It Carefully",
        points: [
          "Strong for complex image, text, audio, and sequence data.",
          "Not automatically best for a small structured dataset.",
          "Quality depends on data, objective, evaluation, and monitoring.",
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Deep means several learned layers, not human-like depth of thought.",
      "A representation is a useful internal description of the input.",
      "Layers build complex features from simpler patterns.",
      "Deep learning is a part of machine learning.",
      "Training updates parameters; inference uses fixed trained parameters.",
      "Always compare against a suitable baseline.",
    ],
    followUp:
      "Why can several learned layers handle a complex image better than one manually written rule?",
  },
  lastMinute: {
    definition:
      "Deep learning uses layered neural networks to learn useful features and predictions from examples.",
    sections: [
      {
        title: "Learning Path",
        flow: ["Input", "Simple patterns", "Useful features", "Prediction"],
        wide: true,
      },
      {
        title: "Remember",
        points: [
          "DL is inside ML.",
          "Deep refers to learned layers.",
          "More complexity is useful only when the task needs it.",
        ],
      },
    ],
    memoryLine:
      "Deep learning builds useful representations one layer at a time.",
    cues: [
      "Complex unstructured data is a common use case.",
      "Training learns parameters and representations.",
      "Validation checks whether learning transfers to unseen examples.",
    ],
    trap:
      "Do not write that every machine-learning problem needs deep learning or that a deep network understands like a human.",
  },
};

export const tensorsShapesAndBatches: SubjectTopic = {
  slug: "tensors-shapes-and-batches",
  title: "Tensors, Shapes, and Batches",
  description:
    "Read tensor shapes, understand axes, and calculate how data moves through a neural network.",
  readTime: "17 min",
  difficulty: "Foundation",
  tags: ["Tensors", "Shapes", "Batches"],
  learn: {
    opening:
      "A tensor is a rectangular collection of numbers. Neural networks store inputs, parameters, and intermediate results as tensors.",
    sections: [
      {
        title: "From One Number to Many Axes",
        paragraphs: [
          "A scalar contains one value. A vector is a one-dimensional list. A matrix is a two-dimensional grid. The general word tensor includes all of these and also arrays with three or more axes.",
          "Rank tells us the number of axes. Shape tells us the size along each axis.",
        ],
        visual: {
          src: "/notes/deep-learning/tensors-and-batches.png",
          alt: "Scalar, vector, matrix, higher-rank tensor, and a batch shown as grouped tensor examples",
          width: 1536,
          height: 1024,
          caption:
            "Tensor rank counts axes; tensor shape records the size of every axis.",
        },
        dataTable: {
          headers: ["Object", "Example shape", "Rank", "Meaning"],
          rows: [
            ["Scalar", "()", "0", "One number"],
            ["Vector", "(5)", "1", "Five numbers"],
            ["Matrix", "(3, 4)", "2", "Three rows and four columns"],
            ["Image tensor", "(28, 28, 1)", "3", "Height, width, channels"],
            ["Image batch", "(32, 28, 28, 1)", "4", "32 images"],
          ],
        },
      },
      {
        title: "Shape and Number of Elements",
        paragraphs: [
          "A shape is written as an ordered list of axis sizes. The order matters because each position has a meaning.",
          "The total number of stored values is the product of all dimensions. This check is useful when reshaping data.",
        ],
        formulas: [
          {
            label: "Element count",
            expression: "N = d₁ × d₂ × ⋯ × dᵣ",
            note: "For a rank-r tensor, multiply the size of every axis.",
          },
          {
            label: "Example",
            expression: "shape (4, 3, 2)  ⇒  N = 4 × 3 × 2 = 24",
          },
        ],
      },
      {
        title: "Axes Have Meaning",
        paragraphs: [
          "The same numbers can mean different things when the axes are arranged differently. An image may be stored as height × width × channels or channels × height × width, depending on the software convention.",
          "Always state the convention before calculating shapes. Never guess an axis meaning from its size alone.",
        ],
        table: {
          headers: ["Shape", "Possible meaning"],
          rows: [
            ["(32, 64)", "32 examples, 64 features"],
            ["(64, 32)", "64 examples, 32 features"],
            ["(224, 224, 3)", "One RGB image in channels-last form"],
            ["(3, 224, 224)", "One RGB image in channels-first form"],
          ],
        },
      },
      {
        title: "What Is a Batch?",
        paragraphs: [
          "A batch is a group of examples processed together. The batch axis is usually placed first, but the convention must be checked.",
          "If one example has shape (64), a batch of 32 examples usually has shape (32, 64). The network applies the same learned operation to every example in the batch.",
        ],
        formulas: [
          {
            label: "Dense-layer batch input",
            expression: "X ∈ ℝᴮˣᴰ",
            note: "B is batch size and D is the number of input features.",
          },
        ],
      },
      {
        title: "Images, Text, and Other Data",
        paragraphs: [
          "Different data types use different axes, but the same shape rules apply. A model needs fixed numerical arrays even when the original data is an image or sentence.",
          "Text normally begins as integer token IDs. Each ID selects one row from a trainable embedding table Etable ∈ ℝV×E, where V is vocabulary size and E is embedding width. IDs with shape (B, T) therefore become embeddings with shape (B, T, E).",
        ],
        formulas: [
          { label: "Embedding parameters", expression: "parameters = V × E" },
          { label: "Embedding lookup", expression: "IDs:(B, T) → vectors:(B, T, E)" },
        ],
        dataTable: {
          headers: ["Data", "Typical batch shape", "Axis meaning"],
          rows: [
            ["Tabular", "(B, F)", "batch, features"],
            ["Grayscale images", "(B, H, W, 1)", "batch, height, width, channel"],
            ["RGB images", "(B, H, W, 3)", "batch, height, width, channels"],
            ["Token sequences", "(B, T)", "batch, time or token position"],
            ["Token embeddings", "(B, T, E)", "batch, position, embedding size"],
          ],
        },
      },
      {
        title: "Reshape, Transpose, and Broadcast",
        paragraphs: [
          "Reshape changes the grouping of axes while keeping the same number of values. Transpose changes axis order. They are different operations.",
          "Broadcasting allows a smaller compatible tensor to act across a larger tensor. For example, one bias vector of shape (4) can be added to every row of an output batch with shape (32, 4).",
        ],
        points: [
          "Reshape must preserve the total element count.",
          "Transpose changes where an axis appears.",
          "Broadcasting does not create a separate learned bias for each example.",
          "Incompatible shapes cause an operation to fail.",
        ],
      },
      {
        title: "Values, Indices, and Matrix Compatibility",
        paragraphs: [
          "A tensor stores values with a data type. Neural-network calculations commonly use floating-point values, while token identifiers and class labels may use integers.",
          "An index selects a position. For a matrix X, X[i, j] means the value at row i and column j. Libraries may start position numbers at zero even when a written mathematical example starts at one.",
          "For matrix multiplication, the inner dimensions must match. A matrix with shape (B, D) can multiply a weight matrix with shape (D, U), producing shape (B, U).",
        ],
        formulas: [
          {
            label: "Matrix-shape rule",
            expression: "(B × D)(D × U) = B × U",
            note: "The two D dimensions match and disappear from the output shape.",
          },
          {
            label: "Bias broadcasting",
            expression: "XW:(B, U) + b:(U) = Z:(B, U)",
            note: "The same bias vector is added to every example in the batch.",
          },
        ],
      },
      {
        title: "Worked Shape Numericals",
        paragraphs: [
          "Write the meaning of every axis first. Then calculate the required size or check compatibility.",
        ],
        problems: [
          {
            title: "Image batch element count",
            prompt:
              "A batch contains 16 RGB images. Each image is 64 × 64 pixels. Use channels-last order and find the tensor shape and total number of values.",
            steps: [
              "Batch axis B = 16; height H = 64; width W = 64; channels C = 3.",
              "Shape = (B, H, W, C) = (16, 64, 64, 3).",
              "N = 16 × 64 × 64 × 3.",
              "N = 196,608 values.",
            ],
            answer: "Shape = (16, 64, 64, 3); total values = 196,608.",
          },
          {
            title: "Valid reshape",
            prompt:
              "Can a tensor with shape (8, 6) be reshaped to (4, 12)? Can it be reshaped to (5, 10)?",
            steps: [
              "Original element count = 8 × 6 = 48.",
              "First target count = 4 × 12 = 48, so it is valid.",
              "Second target count = 5 × 10 = 50, so it is invalid.",
            ],
            answer: "(4, 12) is valid; (5, 10) is invalid.",
          },
          {
            title: "Dense-layer output shape",
            prompt:
              "Input X has shape (32, 10). A dense layer has 6 output units. What is the output shape?",
            steps: [
              "There are B = 32 examples and D = 10 input features.",
              "The same layer produces 6 values for every example.",
              "The batch size stays unchanged and the feature axis becomes 6.",
            ],
            answer: "Output shape = (32, 6).",
          },
          {
            title: "Broadcast one bias vector",
            prompt:
              "A dense-layer result Z has shape (32, 4), and its bias b has shape (4). Can the bias be added, and what is the final shape?",
            steps: [
              "Z contains four unit values for each of 32 examples.",
              "b contains one bias for each of the same four units.",
              "Broadcasting adds b to every row of Z.",
              "The operation changes values but not the tensor shape.",
            ],
            answer: "Yes. The bias broadcasts across all 32 rows; the result remains (32, 4).",
          },
        ],
      },
    ],
    mechanism: {
      title: "How to solve any basic tensor-shape question",
      steps: [
        "Write the tensor shape.",
        "Name the meaning of every axis.",
        "Check the convention, especially channel and batch position.",
        "Apply the operation while preserving unaffected axes.",
        "Multiply dimensions when the total element count is needed.",
        "Check that the final shape matches the meaning of the result.",
      ],
    },
    example: {
      title: "A batch of student records",
      body: "If each student has 12 numerical features, one student is a vector of shape (12). A batch of 50 students is a matrix of shape (50, 12). A dense layer with 4 outputs produces a tensor of shape (50, 4).",
    },
    misconception:
      "A tensor is not automatically three-dimensional. Scalars, vectors, and matrices are all tensors with rank 0, 1, and 2.",
  },
  revise: {
    definition:
      "A tensor is a numerical array. Rank counts axes, and shape gives the size of each axis.",
    sections: [
      {
        title: "Essential Vocabulary",
        dataTable: {
          headers: ["Term", "Meaning"],
          rows: [
            ["Rank", "Number of axes"],
            ["Shape", "Size along every axis"],
            ["Batch", "Examples processed together"],
            ["Reshape", "Regroup axes without changing element count"],
            ["Transpose", "Change axis order"],
          ],
        },
      },
      {
        title: "Two Checks",
        formulas: [
          { expression: "Total values = product of all dimensions" },
          { expression: "Dense input (B, D) → dense output (B, U)" },
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Shape order matters.",
      "State what every axis means.",
      "A batch normally adds one axis for examples.",
      "Reshaping preserves the number of values.",
      "Matrix multiplication requires matching inner dimensions.",
      "The batch size usually remains unchanged through a dense layer.",
      "A V × E token table maps IDs (B, T) to embeddings (B, T, E).",
    ],
    followUp:
      "What is the difference between the rank of a tensor and its shape?",
  },
  lastMinute: {
    definition:
      "Rank = number of axes. Shape = size of each axis.",
    sections: [
      {
        title: "Common Shapes",
        points: [
          "Vector: (D)",
          "Batch of vectors: (B, D)",
          "RGB image: (H, W, 3)",
          "Image batch: (B, H, W, 3)",
        ],
      },
      {
        title: "Fast Numerical Rule",
        flow: ["Name axes", "Apply operation", "Check element count", "Verify meaning"],
        wide: true,
      },
    ],
    memoryLine: "Shape is not decoration; every position describes an axis.",
    cues: [
      "Multiply dimensions for the number of values.",
      "Reshape keeps element count; transpose changes axis order.",
      "Dense layer: only the final feature size becomes the number of units.",
    ],
    trap:
      "Do not call shape (32, 64) a 64-dimensional tensor. Its rank is 2; 64 is only one axis size.",
  },
};

export const artificialNeuronWeightsAndBias: SubjectTopic = {
  slug: "artificial-neuron-weights-and-bias",
  title: "Artificial Neuron: Inputs, Weights, and Bias",
  description:
    "Calculate a neuron's weighted sum and understand the separate jobs of inputs, weights, bias, and activation.",
  readTime: "18 min",
  difficulty: "Foundation",
  tags: ["Neuron", "Weights", "Bias"],
  learn: {
    opening:
      "An artificial neuron combines input values, weights, and a bias. It then passes the result through an activation function.",
    sections: [
      {
        title: "The Four Parts of a Neuron",
        paragraphs: [
          "Inputs carry information from the data or previous layer. Each weight controls how strongly one input affects the neuron. The bias shifts the neuron's response. The activation function transforms the weighted result.",
          "The input comes from an example or an earlier layer. Training learns the weights and bias; they are then reused for every example processed by that neuron.",
        ],
        visual: {
          src: "/notes/deep-learning/artificial-neuron.png",
          alt: "Three inputs and weights entering a weighted sum with bias, followed by an activation and neuron output",
          width: 1536,
          height: 1024,
          caption:
            "A neuron first computes z, then applies an activation function to produce a.",
        },
      },
      {
        title: "Weighted Sum",
        paragraphs: [
          "The neuron multiplies each input by its matching weight, adds the products, and then adds the bias. The result before activation is commonly called z.",
        ],
        formulas: [
          {
            label: "Scalar form",
            expression: "z = w₁x₁ + w₂x₂ + ⋯ + wₙxₙ + b",
          },
          {
            label: "Vector form",
            expression: "z = wᵀx + b",
            note: "wᵀx is the dot product of weights and inputs.",
          },
          {
            label: "Neuron output",
            expression: "a = f(z)",
            note: "f is the activation function and a is the output.",
          },
        ],
      },
      {
        title: "Neuron, Perceptron, and Logit",
        paragraphs: [
          "A perceptron is an early artificial-neuron model that applies a hard threshold to a weighted sum. Modern neural networks commonly use activations that work better with gradient-based training, such as ReLU, sigmoid, and tanh.",
          "When z is a score before a sigmoid or softmax output, it is commonly called a logit. A logit is not yet a probability; the output activation performs that conversion.",
        ],
        dataTable: {
          headers: ["Term", "Meaning"],
          rows: [
            ["Weighted result z", "Score before activation"],
            ["Logit", "An output score before sigmoid or softmax"],
            ["Perceptron", "Weighted sum followed by a hard threshold"],
            ["Modern neuron", "Weighted sum followed by the chosen activation"],
          ],
        },
      },
      {
        title: "What a Weight Means",
        paragraphs: [
          "A positive weight makes a larger input push z upward. A negative weight makes a larger input push z downward. A weight near zero gives that input little direct influence on this neuron.",
          "The size of a weight cannot always be compared directly when input features use very different scales. Data scaling and the surrounding network also affect interpretation.",
        ],
        dataTable: {
          headers: ["Weight", "Immediate effect when input increases"],
          rows: [
            ["Positive", "Pushes z upward"],
            ["Negative", "Pushes z downward"],
            ["Zero", "No contribution from that input"],
            ["Large magnitude", "Stronger direct contribution, all else equal"],
          ],
        },
      },
      {
        title: "Why the Bias Is Needed",
        paragraphs: [
          "Without a bias, z is zero whenever every input is zero. The model's boundary is also forced through the origin in a simple linear case.",
          "A bias gives the neuron a separate adjustable offset. It is similar to the intercept in a linear equation.",
        ],
        formulas: [
          {
            label: "Without bias",
            expression: "z = wᵀx",
            note: "When x = 0, z must equal 0.",
          },
          {
            label: "With bias",
            expression: "z = wᵀx + b",
            note: "When x = 0, z can equal the learned offset b.",
          },
        ],
      },
      {
        title: "One Neuron Is a Linear Score Before Activation",
        paragraphs: [
          "The weighted sum is linear in the inputs. If no nonlinear activation is used, stacking dense layers still collapses into one linear transformation.",
          "The activation function is therefore important: it allows a network to represent relationships that a single straight line or plane cannot capture.",
          "For a threshold classifier, the equation wᵀx + b = 0 marks the decision boundary. It is a line for two input features, a plane for three, and a hyperplane in higher dimensions.",
        ],
        formulas: [
          {
            label: "Decision boundary",
            expression: "wᵀx + b = 0",
          },
          {
            label: "Two-feature form",
            expression: "w₁x₁ + w₂x₂ + b = 0",
          },
        ],
      },
      {
        title: "Worked Neuron Numerical",
        paragraphs: [
          "Use a fixed order: multiply, add, include the bias, and then apply the activation.",
        ],
        formulas: [
          {
            label: "Given",
            expression: "x = [2, 3],  w = [0.5, −1],  b = 1",
          },
          {
            label: "Weighted sum",
            expression: "z = (0.5)(2) + (−1)(3) + 1 = −1",
          },
          {
            label: "ReLU output",
            expression: "a = max(0, −1) = 0",
          },
        ],
      },
      {
        title: "Practice Numericals",
        paragraphs: [
          "Keep the sign of every value visible. Most mistakes come from dropping a negative sign or forgetting the bias.",
        ],
        problems: [
          {
            title: "Weighted sum and ReLU",
            prompt:
              "Given x = [1, 2, −1], w = [2, −1, 0.5], b = 1, calculate z and the ReLU output.",
            steps: [
              "z = (2)(1) + (−1)(2) + (0.5)(−1) + 1",
              "z = 2 − 2 − 0.5 + 1",
              "z = 0.5",
              "ReLU(0.5) = max(0, 0.5) = 0.5",
            ],
            answer: "z = 0.5 and a = 0.5.",
          },
          {
            title: "Find the required bias",
            prompt:
              "A neuron has x = [2, 1] and w = [3, −2]. What bias makes z = 5?",
            steps: [
              "Start with z = w₁x₁ + w₂x₂ + b.",
              "5 = (3)(2) + (−2)(1) + b.",
              "5 = 6 − 2 + b = 4 + b.",
              "b = 1.",
            ],
            answer: "The required bias is b = 1.",
          },
          {
            title: "Batch of two examples",
            prompt:
              "Use w = [1, −2] and b = 0.5. Find z for x⁽¹⁾ = [3, 1] and x⁽²⁾ = [0, 2].",
            steps: [
              "For x⁽¹⁾: z⁽¹⁾ = (1)(3) + (−2)(1) + 0.5 = 1.5.",
              "For x⁽²⁾: z⁽²⁾ = (1)(0) + (−2)(2) + 0.5 = −3.5.",
              "The same weights and bias are used for both examples.",
            ],
            answer: "The batch outputs before activation are [1.5, −3.5].",
          },
        ],
      },
    ],
    mechanism: {
      title: "How one neuron produces an output",
      steps: [
        "Pair each input xᵢ with its weight wᵢ.",
        "Multiply every pair to obtain wᵢxᵢ.",
        "Add all products.",
        "Add the bias b to obtain z.",
        "Apply the activation function f.",
        "Send output a to the next layer or final prediction.",
      ],
    },
    example: {
      title: "A simple study-score neuron",
      body: "A neuron can combine normalized hours studied and hours slept. Training decides the two weights and bias. A positive study weight may raise the score, while the complete model decides how all signals interact.",
    },
    misconception:
      "An artificial neuron is a mathematical unit inspired by a very simplified idea of a biological neuron. It is not a realistic simulation of a brain cell.",
  },
  revise: {
    definition:
      "A neuron computes a weighted sum plus bias and then applies an activation function.",
    sections: [
      {
        title: "Two-Step Calculation",
        formulas: [
          { expression: "z = wᵀx + b" },
          { expression: "a = f(z)" },
        ],
      },
      {
        title: "Jobs of the Parts",
        dataTable: {
          headers: ["Part", "Job"],
          rows: [
            ["Input x", "Carries data"],
            ["Weight w", "Controls input influence"],
            ["Bias b", "Adds an adjustable offset"],
            ["Activation f", "Transforms z, usually nonlinearly"],
          ],
        },
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Match every input with its weight.",
      "Add the bias after the weighted products.",
      "A positive and negative weight push z in opposite directions.",
      "The same neuron parameters are reused for every example in a batch.",
      "The activation output is a, not z.",
      "An output score before sigmoid or softmax is called a logit.",
      "The threshold decision boundary is wᵀx + b = 0.",
    ],
    followUp:
      "What can a neuron do with a bias that it cannot do when the bias is fixed at zero?",
  },
  lastMinute: {
    definition: "Neuron = weighted sum + bias + activation.",
    sections: [
      {
        title: "Formula",
        flow: ["Inputs x", "z = wᵀx + b", "a = f(z)", "Output a"],
        wide: true,
      },
      {
        title: "Signs",
        points: [
          "Positive weight pushes z up as its input grows.",
          "Negative weight pushes z down as its input grows.",
          "Bias shifts the whole response.",
        ],
      },
    ],
    memoryLine: "Multiply, add, add bias, activate.",
    cues: [
      "z is before activation.",
      "a is after activation.",
      "wᵀx means the dot product.",
    ],
    trap:
      "Do not apply the activation before adding the bias, and do not forget negative signs in the weighted sum.",
  },
};
