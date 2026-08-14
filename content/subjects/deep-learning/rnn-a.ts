import type { SubjectTopic } from "@/lib/subject-content";

export const sequentialDataAndRnnIntuition: SubjectTopic = {
  slug: "sequential-data-and-rnn-intuition",
  title: "Sequential Data and RNN Intuition",
  description:
    "Understand ordered data, recurrent memory, shared weights, and common sequence input-output patterns.",
  readTime: "21 min",
  difficulty: "Foundation",
  tags: ["Sequences", "RNN", "Hidden State"],
  learn: {
    opening:
      "In sequential data, order carries meaning. A Recurrent Neural Network processes one time step at a time and passes a hidden state forward as a summary of earlier information.",
    sections: [
      {
        title: "What Makes Data Sequential?",
        paragraphs: [
          "A sequence contains ordered elements. Examples include words in a sentence, daily temperatures, audio samples, and sensor readings. Changing the order can change the meaning or pattern.",
          "Sequence length is commonly written T. At time step t, the model receives xₜ. If each element has D features, one sequence can be stored as T × D and a batch as B × T × D when the time axis comes second.",
        ],
        dataTable: {
          headers: ["Data", "One time step"],
          rows: [
            ["Sentence", "One word or token representation"],
            ["Weather series", "Measurements from one time"],
            ["Audio", "One sample or short frame"],
            ["Video", "One frame or frame representation"],
          ],
        },
      },
      {
        title: "Why a Feedforward Network Is Not Enough",
        paragraphs: [
          "A normal feedforward layer treats each fixed input independently. It has no built-in state that carries earlier information to the next position.",
          "An RNN adds a recurrent connection. The new hidden state hₜ depends on the current input xₜ and the previous hidden state hₜ₋₁. This lets earlier information influence later predictions.",
        ],
      },
      {
        title: "Hidden State as Working Memory",
        paragraphs: [
          "The hidden state is a learned vector, not a human-readable storage box. It compresses information that the model finds useful for its task.",
          "A basic RNN has limited memory in practice. Information from far-away steps may become weak during training, which leads to the vanishing-gradient problem covered later in this module.",
        ],
        visual: {
          src: "/notes/deep-learning/rnn-sequence-unrolled.png",
          alt: "A recurrent neural network shown as one recurrent cell and as three unrolled time steps with shared weights",
          width: 1536,
          height: 1024,
          caption:
            "Unrolling shows the same recurrent cell used at every time step, with hidden state moving forward.",
        },
      },
      {
        title: "Unrolling and Shared Parameters",
        paragraphs: [
          "An RNN diagram is often unrolled across time. The repeated cells are not separate layers with separate weights. They are repeated uses of the same cell.",
          "The same input-to-hidden, hidden-to-hidden, and hidden-to-output parameters are reused at every time step. Therefore, increasing sequence length increases computation and stored activations, but it does not increase the RNN cell's parameter count.",
        ],
      },
      {
        title: "Common Input-Output Patterns",
        paragraphs: [
          "The required output depends on the task. A model may use only the final useful state, or it may produce an output at every time step.",
        ],
        dataTable: {
          headers: ["Pattern", "Example"],
          rows: [
            ["One-to-many", "Generate a sequence from one context vector"],
            ["Many-to-one", "Classify an entire sentence or time series"],
            ["Many-to-many, aligned", "Label every word or time step"],
            ["Many-to-many, different lengths", "Map one sequence to another sequence"],
          ],
        },
      },
      {
        title: "Practice",
        paragraphs: ["Track batch, time, and feature axes separately."],
        problems: [
          {
            title: "Sequence batch shape",
            prompt:
              "A batch contains 32 sequences. Every sequence has 50 time steps and 12 features per step. Give the batch-first shape.",
            steps: [
              "Batch size B = 32.",
              "Sequence length T = 50.",
              "Input features D = 12.",
              "Batch-first order is B × T × D.",
            ],
            answer: "The input shape is 32 × 50 × 12.",
          },
          {
            title: "Choose the sequence pattern",
            prompt:
              "A model reads all words in a review and predicts one positive-or-negative label. Which input-output pattern is used?",
            steps: [
              "The input contains many ordered words.",
              "The model produces one label for the complete review.",
            ],
            answer: "It is a many-to-one task.",
          },
          {
            title: "Shared weights",
            prompt:
              "The same RNN cell processes a sequence of length 20 and another of length 100. Does the cell have more parameters for the longer sequence?",
            steps: [
              "The same weights are reused at every time step.",
              "A longer sequence causes more cell applications, not new weights.",
            ],
            answer: "No. The parameter count stays the same, but computation and activation memory increase.",
          },
        ],
      },
    ],
    mechanism: {
      title: "How an RNN reads a sequence",
      steps: [
        "Start with an initial hidden state, commonly zeros.",
        "Read the current input xₜ.",
        "Combine xₜ with the previous hidden state hₜ₋₁.",
        "Produce the new hidden state hₜ.",
        "Optionally produce an output for this time step.",
        "Reuse the same parameters at the next time step.",
      ],
    },
    example: {
      title: "Reading a sentence",
      body: "While reading 'the movie was not good', the hidden state after 'not' can affect how the model interprets 'good'. Order and earlier context both matter.",
    },
    misconception:
      "Unrolled RNN cells do not have different weights. Unrolling only shows repeated use of one shared cell across time.",
  },
  revise: {
    definition:
      "An RNN processes an ordered sequence and passes a hidden state from one time step to the next.",
    sections: [
      {
        title: "Main Shapes",
        points: ["One sequence: T × D", "Batch first: B × T × D", "Hidden state: B × H"],
      },
      {
        title: "Sequence Flow",
        flow: ["xₜ", "Combine with hₜ₋₁", "New hₜ", "Next time step"],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Sequence order matters.",
      "The hidden state carries learned context.",
      "The same RNN parameters are reused across time.",
      "Longer sequences increase computation, not parameter count.",
      "Tasks can need one output or an output at every step.",
    ],
    followUp: "Why does an RNN use the same weights at every time step?",
  },
  lastMinute: {
    definition: "RNN = current input plus previous hidden state.",
    sections: [
      {
        title: "Symbols",
        points: ["T: time steps", "D: input features", "H: hidden size", "B: batch size"],
      },
      {
        title: "Core Flow",
        flow: ["xₜ", "RNN cell", "hₜ", "Next step"],
        wide: true,
      },
    ],
    memoryLine: "The hidden state carries context; the weights stay shared.",
    cues: [
      "Batch-first input: B × T × D.",
      "Many-to-one gives one sequence label.",
      "Many-to-many gives multiple outputs.",
    ],
    trap: "Do not count a new set of parameters for every time step.",
  },
};

export const rnnForwardPropagation: SubjectTopic = {
  slug: "rnn-forward-propagation",
  title: "RNN Forward Propagation",
  description:
    "Calculate hidden states and outputs, track tensor shapes, and count the parameters of a basic RNN.",
  readTime: "28 min",
  difficulty: "Intermediate",
  tags: ["RNN", "Forward Propagation", "Numericals"],
  learn: {
    opening:
      "At each time step, a basic RNN combines the current input with the previous hidden state, applies a nonlinear activation, and optionally calculates an output.",
    sections: [
      {
        title: "One RNN Time Step",
        paragraphs: [
          "Let the input size be D, hidden size be H, and output size be O. The hidden-state equation uses one matrix for the current input and another for the previous state.",
          "Tanh is common in a basic RNN because it keeps hidden values between −1 and 1. Other cell designs can use different operations.",
        ],
        formulas: [
          {
            label: "Hidden state",
            expression: "hₜ = tanh(Wₓₕxₜ + Wₕₕhₜ₋₁ + bₕ)",
          },
          {
            label: "Output logits or values",
            expression: "zₜ = Wₕᵧhₜ + bᵧ",
          },
          {
            label: "Prediction",
            expression: "ŷₜ = g(zₜ)",
            note: "Choose g for the task, such as softmax for one class among many.",
          },
        ],
        visual: {
          src: "/notes/deep-learning/rnn-forward-step.png",
          alt: "One RNN time step combining the previous state and current input to produce a new state and prediction",
          width: 1536,
          height: 1024,
          caption:
            "The new hidden state carries information forward and can also produce the current prediction.",
        },
      },
      {
        title: "Matrix Shapes",
        paragraphs: [
          "For one example, treat xₜ as D × 1 and hₜ as H × 1. Matrix dimensions must make both contributions to the hidden state H × 1.",
        ],
        dataTable: {
          headers: ["Quantity", "Shape"],
          rows: [
            ["xₜ", "D × 1"],
            ["hₜ and hₜ₋₁", "H × 1"],
            ["Wₓₕ", "H × D"],
            ["Wₕₕ", "H × H"],
            ["bₕ", "H × 1"],
            ["Wₕᵧ", "O × H"],
            ["bᵧ", "O × 1"],
          ],
        },
      },
      {
        title: "Complete Scalar Forward Numerical",
        paragraphs: [
          "Consider a scalar RNN with x₁ = 1, x₂ = 0, h₀ = 0, Wₓₕ = 0.5, Wₕₕ = 0.8, bₕ = 0, Wₕᵧ = 2, and bᵧ = 0.",
        ],
        formulas: [
          { label: "First hidden state", expression: "h₁ = tanh(0.5×1 + 0.8×0) = tanh(0.5) ≈ 0.462" },
          { label: "Second hidden state", expression: "h₂ = tanh(0.5×0 + 0.8×0.462) = tanh(0.370) ≈ 0.354" },
          { label: "Second linear output", expression: "z₂ = 2×0.354 = 0.708" },
        ],
      },
      {
        title: "RNN Parameter Counting",
        paragraphs: [
          "Count the input-to-hidden weights, recurrent weights, hidden bias, output weights, and output bias once. Do not multiply by sequence length or batch size.",
          "The formula below uses one effective hidden-bias vector. Some libraries store separate input and recurrent bias vectors, so always follow the convention stated by the framework or exam question.",
        ],
        formulas: [
          { label: "RNN cell", expression: "cell parameters = HD + H² + H = H(D + H + 1)" },
          { label: "Output layer", expression: "output parameters = OH + O = O(H + 1)" },
          { label: "Total with output layer", expression: "H(D + H + 1) + O(H + 1)" },
        ],
      },
      {
        title: "Outputs and Initial State",
        paragraphs: [
          "The initial hidden state h₀ is usually a zero vector, but it can also be learned or supplied from another model. Its shape for a batch is B × H.",
          "Returning every state gives shape B × T × H in batch-first form. Returning only the final state gives B × H. For padded batches, 'final' must mean the last valid time step, not the last padding position.",
        ],
      },
      {
        title: "Practice",
        paragraphs: ["Write matrix shapes before multiplying values."],
        problems: [
          {
            title: "Hidden-state calculation",
            prompt:
              "A scalar RNN has xₜ = 2, hₜ₋₁ = 0.5, Wₓₕ = 0.4, Wₕₕ = 0.6, and bₕ = −0.1. Find hₜ using tanh.",
            steps: [
              "Input contribution = 0.4 × 2 = 0.8.",
              "Recurrent contribution = 0.6 × 0.5 = 0.3.",
              "Pre-activation = 0.8 + 0.3 − 0.1 = 1.",
              "hₜ = tanh(1) ≈ 0.762.",
            ],
            answer: "The new hidden state is approximately 0.762.",
          },
          {
            title: "RNN parameter count",
            prompt:
              "An RNN has input size D = 3, hidden size H = 4, and output size O = 2. Count all parameters including both biases.",
            steps: [
              "Cell parameters = H(D + H + 1) = 4(3 + 4 + 1) = 32.",
              "Output parameters = O(H + 1) = 2(4 + 1) = 10.",
              "Total = 32 + 10.",
            ],
            answer: "The RNN and output layer have 42 parameters.",
          },
          {
            title: "Sequence output shape",
            prompt:
              "A batch-first RNN receives B = 16 sequences of T = 25 steps and has hidden size H = 64. Give the shapes of all hidden outputs and the final hidden state.",
            steps: [
              "There is one H-dimensional state for every sequence and time step.",
              "All states use B × T × H.",
              "The final state uses B × H.",
            ],
            answer: "All states: 16 × 25 × 64. Final state: 16 × 64.",
          },
        ],
      },
    ],
    mechanism: {
      title: "How to solve an RNN forward pass",
      steps: [
        "Write xₜ and hₜ₋₁.",
        "Calculate Wₓₕxₜ.",
        "Calculate Wₕₕhₜ₋₁.",
        "Add the hidden bias.",
        "Apply tanh to obtain hₜ.",
        "Apply the output layer only when an output is required.",
      ],
    },
    example: {
      title: "Why hₜ affects two paths",
      body: "The current hidden state can produce a prediction now and also become the previous hidden state for the next time step.",
    },
    misconception:
      "Sequence length T is not part of the RNN parameter formula because every time step reuses the same matrices and biases.",
  },
  revise: {
    definition:
      "A basic RNN calculates hₜ from xₜ and hₜ₋₁, then optionally maps hₜ to an output.",
    sections: [
      {
        title: "Core Equations",
        formulas: [
          { expression: "hₜ = tanh(Wₓₕxₜ + Wₕₕhₜ₋₁ + bₕ)" },
          { expression: "zₜ = Wₕᵧhₜ + bᵧ" },
        ],
      },
      {
        title: "Parameter Formula",
        formulas: [{ expression: "total = H(D + H + 1) + O(H + 1)" }],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Wₓₕ has shape H × D.",
      "Wₕₕ has shape H × H.",
      "Hidden state has H values per example.",
      "All batch-first states have shape B × T × H.",
      "Count shared parameters only once.",
    ],
    followUp: "Why is Wₕₕ square in a basic RNN?",
  },
  lastMinute: {
    definition: "Hidden = tanh(input contribution + previous-state contribution + bias).",
    sections: [
      {
        title: "Shapes",
        points: ["Wₓₕ: H × D", "Wₕₕ: H × H", "Wₕᵧ: O × H"],
      },
      {
        title: "Count",
        points: ["Cell: H(D+H+1)", "Output: O(H+1)", "Never multiply by T"],
      },
    ],
    memoryLine: "Current input and previous state meet inside the same shared cell.",
    cues: ["h₀ is commonly zero.", "tanh output lies between −1 and 1.", "Final state shape is B × H."],
    trap: "Do not forget the recurrent matrix Wₕₕ or count it once per time step.",
  },
};

export const backpropagationThroughTime: SubjectTopic = {
  slug: "backpropagation-through-time",
  title: "Backpropagation Through Time",
  description:
    "Unroll an RNN, send gradients backward through time, and understand truncated BPTT.",
  readTime: "25 min",
  difficulty: "Intermediate",
  tags: ["BPTT", "Gradients", "RNN Training"],
  learn: {
    opening:
      "Backpropagation Through Time is ordinary backpropagation applied to an RNN after its repeated computations are unrolled across time.",
    sections: [
      {
        title: "From Forward Sequence to Total Loss",
        paragraphs: [
          "During the forward pass, each hidden state depends on the previous hidden state. A task may create a loss only at the final step or a separate loss at every valid step.",
          "When losses exist at several steps, training commonly sums or averages them. Padding positions must be masked so that they do not contribute fake loss.",
        ],
        formulas: [
          { label: "Sum of time-step losses", expression: "L = Σₜ Lₜ" },
          { label: "Mean over valid steps", expression: "L = (1/Nvalid) Σvalid t Lₜ" },
        ],
        visual: {
          src: "/notes/deep-learning/bptt-gradient-flow.png",
          alt: "An RNN unrolled through time with forward states, backward gradients, and truncated BPTT windows",
          width: 1536,
          height: 1024,
          caption:
            "BPTT follows every dependency backward; truncated BPTT limits how many time steps one backward pass crosses.",
        },
      },
      {
        title: "Why Gradients Travel Through Time",
        paragraphs: [
          "A later loss depends on an earlier state through every intermediate recurrent step. The chain rule therefore multiplies local derivatives while moving backward through the hidden-state chain.",
          "An earlier hidden state can influence several later losses. Its total gradient is the sum of all valid gradient paths that reach it.",
        ],
        formulas: [
          {
            label: "One long gradient path",
            expression: "∂Lₜ/∂hₖ = (∂Lₜ/∂hₜ)(∂hₜ/∂hₜ₋₁)…(∂hₖ₊₁/∂hₖ),  k < t",
          },
        ],
      },
      {
        title: "Shared Weights Accumulate Gradients",
        paragraphs: [
          "The same recurrent matrix is used at every time step. Each use contributes a gradient to that one matrix, and the contributions are added before the optimizer update.",
          "This is similar to a convolution filter receiving gradient contributions from every spatial position where it was reused.",
        ],
        formulas: [
          { label: "Shared-parameter gradient", expression: "∂L/∂Wₕₕ = Σₜ (gradient contribution from step t)" },
        ],
      },
      {
        title: "Full and Truncated BPTT",
        paragraphs: [
          "Full BPTT stores the computation graph and backpropagates through the complete sequence. This can use large memory and create very long gradient paths.",
          "Truncated BPTT processes or backpropagates through shorter windows. The hidden state can be carried into the next window, but its old computation graph is detached at the boundary. This reduces cost but prevents gradients from directly crossing that boundary.",
        ],
        table: {
          headers: ["Full BPTT", "Truncated BPTT"],
          rows: [
            ["Backpropagates through the complete sequence", "Backpropagates through limited windows"],
            ["Higher memory cost", "Lower memory cost"],
            ["Keeps every direct temporal gradient path", "Cuts direct paths at window boundaries"],
          ],
        },
      },
      {
        title: "Gradient Product Intuition",
        paragraphs: [
          "Suppose the local derivative along each recurrent step is 0.5. Across four steps, the temporal part of the gradient becomes 0.5⁴ = 0.0625. Repeating small factors makes the signal vanish.",
          "If the repeated factor were 2, four steps would give 2⁴ = 16. Repeating large factors can make the gradient explode.",
        ],
        formulas: [
          { label: "Four factors below one", expression: "0.5⁴ = 0.0625" },
          { label: "Four factors above one", expression: "2⁴ = 16" },
        ],
      },
      {
        title: "Practice",
        paragraphs: ["Count recurrent transitions, not just visible state boxes."],
        problems: [
          {
            title: "Repeated gradient factor",
            prompt:
              "A gradient path crosses six recurrent transitions, each with scalar derivative 0.8. Find the temporal multiplier.",
            steps: [
              "Multiply the six local factors.",
              "Temporal multiplier = 0.8⁶.",
              "0.8⁶ = 0.262144.",
            ],
            answer: "The multiplier is approximately 0.262, so the gradient becomes smaller along this path.",
          },
          {
            title: "Shared gradient contributions",
            prompt:
              "Three time steps contribute 0.4, −0.1, and 0.3 to the same recurrent weight. What gradient is used before the optimizer update?",
            steps: [
              "The weight is shared across all three uses.",
              "Add the contributions: 0.4 − 0.1 + 0.3.",
            ],
            answer: "The total gradient is 0.6.",
          },
          {
            title: "Truncated windows",
            prompt:
              "A sequence has 100 steps and truncated BPTT uses non-overlapping windows of 20 steps. How many windows are processed? Can a direct gradient cross a detached boundary?",
            steps: [
              "Number of windows = 100 ÷ 20 = 5.",
              "Detaching the state removes the older computation graph.",
            ],
            answer: "Five windows are processed. No direct gradient crosses a detached boundary.",
          },
        ],
      },
    ],
    mechanism: {
      title: "How BPTT trains shared recurrent weights",
      steps: [
        "Run the RNN forward across valid time steps.",
        "Calculate the required time-step or final loss.",
        "Start gradients from the loss positions.",
        "Follow hidden-state dependencies backward through time.",
        "Add contributions for every use of each shared parameter.",
        "Apply one optimizer update to the shared parameters.",
      ],
    },
    example: {
      title: "An early word affects a later loss",
      body: "If a sentence label is calculated after the final word, the loss can still send a gradient toward the RNN computations for earlier words through the hidden-state chain.",
    },
    misconception:
      "Truncated BPTT can carry hidden values forward, but a detached window boundary does not carry gradients backward into the older graph.",
  },
  revise: {
    definition:
      "BPTT unrolls recurrent computation and applies the chain rule backward through its time dependencies.",
    sections: [
      {
        title: "Training Flow",
        flow: ["Forward through time", "Calculate loss", "Backward through time", "Sum shared gradients", "Update"],
      },
      {
        title: "Repeated Product",
        formulas: [{ expression: "temporal gradient contains products of ∂hⱼ/∂hⱼ₋₁" }],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Later losses can affect earlier states.",
      "Shared-weight gradient contributions are added.",
      "Full BPTT keeps the complete temporal graph.",
      "Truncated BPTT limits memory and gradient-path length.",
      "Detached boundaries stop direct gradients.",
    ],
    followUp: "Why are recurrent-weight gradients summed across time steps?",
  },
  lastMinute: {
    definition: "BPTT = backpropagation on an RNN unrolled across time.",
    sections: [
      {
        title: "Flow",
        flow: ["Loss", "Later state", "Earlier state", "Shared weights"],
        wide: true,
      },
      {
        title: "Truncation",
        points: ["Shorter graph", "Lower memory", "Detached boundaries", "Less long-range gradient"],
      },
    ],
    memoryLine: "Forward carries state; backward carries credit through the same time chain.",
    cues: ["Losses may be summed or averaged.", "Masks remove padded loss.", "Repeated derivatives control gradient size."],
    trap: "Do not create separate parameter updates for separate time steps.",
  },
};
