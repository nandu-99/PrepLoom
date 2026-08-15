import type { SubjectTopic } from "@/lib/subject-content";

export const rnnGradientProblems: SubjectTopic = {
  slug: "rnn-vanishing-and-exploding-gradients",
  title: "Vanishing and Exploding Gradients in RNNs",
  description:
    "Understand unstable temporal gradients, diagnose their effects, and apply the correct practical solutions.",
  readTime: "22 min",
  difficulty: "Intermediate",
  tags: ["Vanishing Gradient", "Exploding Gradient", "Clipping"],
  learn: {
    opening:
      "A basic RNN repeatedly multiplies derivatives while backpropagating through time. Long products can become extremely small or extremely large.",
    sections: [
      {
        title: "Why Recurrent Gradients Become Unstable",
        paragraphs: [
          "Each temporal step contributes a recurrent matrix and an activation derivative to the gradient path. The size of their repeated product controls whether information can travel across many steps.",
          "Tanh derivatives are at most 1 and become close to 0 when tanh is saturated. Sigmoid derivatives are at most 0.25. Repeated small factors commonly weaken long-range gradients.",
        ],
        formulas: [
          {
            label: "Hidden-to-hidden Jacobian",
            expression: "∂hₜ/∂hₜ₋₁ = diag(1 − hₜ²)Wₕₕ",
            note: "This form assumes a tanh basic RNN.",
          },
        ],
        visual: {
          src: "/notes/deep-learning/rnn-gradient-stability.png",
          alt: "Comparison of vanishing, stable, and exploding RNN gradient flow with gradient clipping",
          width: 1536,
          height: 1024,
          caption:
            "Long chains of local derivatives can shrink, remain controlled, or grow as gradients move backward.",
        },
      },
      {
        title: "Vanishing Gradients",
        paragraphs: [
          "A vanishing gradient becomes too small to produce a useful update in early time steps. The model then struggles to learn relationships between distant positions.",
          "Typical signs include weak performance on long dependencies and almost-zero gradient norms in earlier recurrent computations. Gradient clipping does not fix this problem because clipping only reduces gradients that are too large.",
        ],
      },
      {
        title: "Exploding Gradients",
        paragraphs: [
          "An exploding gradient becomes extremely large. It can cause unstable parameter updates, sudden loss spikes, infinities, or NaN values.",
          "Exploding gradients can occur even when the forward hidden values look bounded because tanh bounds activations, not every backward matrix product.",
        ],
      },
      {
        title: "Gradient Clipping Reminder",
        paragraphs: [
          "Module 3 introduced global-norm clipping. In an RNN it is used in exactly the same way: after BPTT, rescale the complete gradient only when its norm exceeds c. It limits exploding gradients and preserves direction, but it cannot restore a vanished gradient.",
        ],
        formulas: [
          {
            label: "Global-norm clipping",
            expression: "g ← g × min(1, c/‖g‖), for ‖g‖ > 0",
          },
        ],
      },
      {
        title: "Practical Solutions",
        paragraphs: [
          "Use LSTM or GRU cells when long-term gradient flow is important. Their gated additive paths make long dependencies easier to learn than with a basic RNN, although they do not guarantee perfect memory.",
          "Use gradient clipping for exploding gradients, careful initialization, reasonable learning rates, normalization when appropriate, and shorter BPTT windows when the task allows them. Monitor loss and gradient norms instead of guessing.",
        ],
        table: {
          headers: ["Problem", "Most direct responses"],
          rows: [
            [
              "Vanishing gradient",
              "LSTM or GRU, shorter paths, suitable initialization",
            ],
            [
              "Exploding gradient",
              "Global-norm clipping, lower learning rate, suitable initialization",
            ],
          ],
        },
      },
      {
        title: "Practice",
        paragraphs: ["Identify the problem before choosing the solution."],
        problems: [
          {
            title: "Vanishing product",
            prompt:
              "A simplified temporal gradient multiplies 0.6 at each of eight transitions. Find its multiplier.",
            steps: [
              "Multiplier = 0.6⁸.",
              "0.6⁸ = 0.01679616.",
              "Only about 1.68% of the original magnitude remains in this simplified path.",
            ],
            answer:
              "The multiplier is approximately 0.0168, showing strong gradient shrinkage.",
          },
          {
            title: "Choose the correction",
            prompt:
              "Training suddenly produces huge gradient norms and NaN loss. Which immediate protection is suitable: dropout, gradient clipping, or adding more time steps?",
            steps: [
              "Huge gradient norms indicate exploding gradients.",
              "Gradient clipping directly limits excessive gradient magnitude.",
            ],
            answer:
              "Use gradient clipping, then also inspect learning rate and numerical stability.",
          },
        ],
      },
    ],
    mechanism: {
      title: "How to handle unstable RNN gradients",
      steps: [
        "Monitor training loss and gradient norms.",
        "Decide whether gradients are shrinking or growing.",
        "Use clipping immediately for excessive gradients.",
        "Check learning rate and initialization.",
        "Use a gated recurrent cell for important long dependencies.",
        "Verify the result with new gradient and validation curves.",
      ],
    },
    example: {
      title: "Clipping preserves direction",
      body: "When every component is multiplied by the same positive clipping factor, the gradient direction stays unchanged while its norm becomes safe.",
    },
    misconception:
      "Gradient clipping is mainly a protection against exploding gradients. It cannot enlarge a gradient that has already vanished.",
  },
  revise: {
    definition:
      "Repeated temporal derivatives can shrink toward zero or grow without control during BPTT.",
    sections: [
      {
        title: "Comparison",
        table: {
          headers: ["Vanishing", "Exploding"],
          rows: [
            ["Gradient becomes tiny", "Gradient becomes huge"],
            [
              "Long dependencies are not learned",
              "Updates and loss become unstable",
            ],
          ],
        },
      },
      {
        title: "Clipping",
        formulas: [{ expression: "g ← g × min(1, c/‖g‖), ‖g‖ > 0" }],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Temporal gradients contain repeated products.",
      "Saturated tanh can create small derivatives.",
      "Clipping controls exploding gradients.",
      "Clipping does not repair vanishing gradients.",
      "LSTM and GRU improve long-range gradient flow.",
    ],
    followUp: "Why does global-norm clipping preserve gradient direction?",
  },
  lastMinute: {
    definition:
      "Small repeated factors vanish; large repeated factors explode.",
    sections: [
      {
        title: "Symptoms",
        points: [
          "Vanishing: near-zero gradients",
          "Exploding: spikes, infinity, or NaN",
        ],
      },
      {
        title: "Responses",
        points: [
          "Exploding → clip",
          "Long dependency → LSTM or GRU",
          "Both → check learning rate and initialization",
        ],
      },
    ],
    memoryLine: "Clip what is too large; use gated memory for what fades away.",
    cues: [
      "tanh bounds activations, not all gradients.",
      "Check gradient norms.",
      "Global norm keeps direction.",
    ],
    trap: "Do not say gradient clipping solves vanishing gradients.",
  },
};

export const lstmNetworks: SubjectTopic = {
  slug: "lstm-networks",
  title: "LSTM Networks",
  description:
    "Understand LSTM gates, calculate cell and hidden states, and count LSTM parameters.",
  readTime: "31 min",
  difficulty: "Advanced",
  tags: ["LSTM", "Gates", "Parameter Counting"],
  learn: {
    opening:
      "A Long Short-Term Memory network adds a cell state and learned gates. The gates decide what to keep, what to write, and what to expose as the hidden state.",
    sections: [
      {
        title: "Two States, Four Computations",
        paragraphs: [
          "An LSTM carries a cell state Cₜ and a hidden state hₜ. The cell state is the main memory path, while the hidden state is the exposed representation used by later computations.",
          "The forget, input, and output gates use sigmoid, so every gate value lies between 0 and 1. The candidate uses tanh and proposes new content between −1 and 1.",
        ],
        visual: {
          src: "/notes/deep-learning/lstm-cell-flow.png",
          alt: "An LSTM cell with forget, input, candidate, and output paths connected to cell and hidden states",
          width: 1536,
          height: 1024,
          caption:
            "The cell state uses an additive update: keep selected old memory and add selected candidate memory.",
        },
      },
      {
        title: "Gate Equations",
        paragraphs: [
          "The same current input xₜ and previous hidden state hₜ₋₁ are supplied to all four computations. The weight matrices are different because each gate learns a different decision.",
        ],
        formulas: [
          { label: "Combined input", expression: "qₜ = [hₜ₋₁, xₜ]" },
          { label: "Forget gate", expression: "fₜ = σ(Wf qₜ + bf)" },
          { label: "Input gate", expression: "iₜ = σ(Wi qₜ + bi)" },
          { label: "Candidate memory", expression: "gₜ = tanh(Wg qₜ + bg)" },
          { label: "Output gate", expression: "oₜ = σ(Wo qₜ + bo)" },
        ],
      },
      {
        title: "Cell-State and Hidden-State Updates",
        paragraphs: [
          "The forget gate scales old memory. The input gate scales candidate memory. Their elementwise results are added to form the new cell state.",
          "The output gate controls how much of the transformed cell state becomes the new hidden state. The symbol ⊙ means elementwise multiplication.",
        ],
        formulas: [
          { label: "New cell state", expression: "Cₜ = fₜ ⊙ Cₜ₋₁ + iₜ ⊙ gₜ" },
          { label: "New hidden state", expression: "hₜ = oₜ ⊙ tanh(Cₜ)" },
        ],
      },
      {
        title: "Why the Cell State Helps",
        paragraphs: [
          "The cell-state update contains addition and a gated path from Cₜ₋₁ to Cₜ. When the forget gate stays near 1, information and gradients can pass through many steps more directly than in a basic RNN.",
          "LSTM reduces the difficulty of learning long dependencies, but it does not provide unlimited memory. Data, training, sequence length, and gate values still matter.",
        ],
      },
      {
        title: "LSTM Parameter Counting",
        paragraphs: [
          "Each of the four computations has an H × D input matrix, an H × H recurrent matrix, and H biases. Count the four sets once, regardless of sequence length.",
          "The formula below assumes one effective bias vector per computation. Some libraries store separate input and recurrent biases, which changes the stored parameter count.",
        ],
        formulas: [
          { label: "One gate or candidate", expression: "H(D + H + 1)" },
          {
            label: "Complete LSTM cell",
            expression: "parameters = 4H(D + H + 1)",
          },
          { label: "Optional output layer", expression: "add O(H + 1)" },
        ],
      },
      {
        title: "Worked State Update",
        paragraphs: [
          "For one scalar unit, let Cₜ₋₁ = 0.4, fₜ = 0.8, iₜ = 0.3, gₜ = 0.5, and oₜ = 0.9.",
        ],
        formulas: [
          {
            label: "Cell state",
            expression: "Cₜ = 0.8×0.4 + 0.3×0.5 = 0.32 + 0.15 = 0.47",
          },
          {
            label: "Hidden state",
            expression: "hₜ = 0.9×tanh(0.47) ≈ 0.9×0.438 ≈ 0.394",
          },
        ],
      },
      {
        title: "Practice",
        paragraphs: ["Keep gate values and state values separate."],
        problems: [
          {
            title: "LSTM cell update",
            prompt:
              "For one unit, Cₜ₋₁ = 0.6, fₜ = 0.5, iₜ = 0.4, gₜ = −0.25, and oₜ = 0.8. Find Cₜ and hₜ.",
            steps: [
              "Retained memory = 0.5 × 0.6 = 0.3.",
              "Written memory = 0.4 × (−0.25) = −0.1.",
              "Cₜ = 0.3 − 0.1 = 0.2.",
              "hₜ = 0.8 × tanh(0.2) ≈ 0.8 × 0.197 = 0.158.",
            ],
            answer: "Cₜ = 0.2 and hₜ ≈ 0.158.",
          },
          {
            title: "LSTM parameter count",
            prompt:
              "An LSTM has input size D = 10 and hidden size H = 20. Find the cell parameter count including biases but excluding an output layer.",
            steps: [
              "One computation has H(D + H + 1) parameters.",
              "One computation: 20(10 + 20 + 1) = 620.",
              "There are four computations: 4 × 620.",
            ],
            answer: "The LSTM cell has 2,480 parameters.",
          },
          {
            title: "LSTM state shapes",
            prompt:
              "An LSTM uses batch size B = 32 and hidden size H = 128. Give the shapes of hₜ and Cₜ for one time step.",
            steps: [
              "Every example has H hidden values and H cell values.",
              "The batch axis comes first.",
            ],
            answer: "Both hₜ and Cₜ have shape 32 × 128.",
          },
        ],
      },
    ],
    mechanism: {
      title: "How one LSTM step works",
      steps: [
        "Combine xₜ and hₜ₋₁.",
        "Calculate forget, input, candidate, and output values.",
        "Scale old memory with the forget gate.",
        "Scale proposed memory with the input gate.",
        "Add both parts to obtain Cₜ.",
        "Expose oₜ ⊙ tanh(Cₜ) as hₜ.",
      ],
    },
    example: {
      title: "Keeping useful context",
      body: "An LSTM can keep a useful fact by making its forget value close to 1 and avoid writing irrelevant new content by making its input value close to 0.",
    },
    misconception:
      "The cell state and hidden state are not the same. An LSTM passes both Cₜ and hₜ to the next time step.",
  },
  revise: {
    definition:
      "An LSTM uses gated cell-state updates to keep, write, and expose sequence information.",
    sections: [
      {
        title: "State Updates",
        formulas: [
          { expression: "Cₜ = fₜ ⊙ Cₜ₋₁ + iₜ ⊙ gₜ" },
          { expression: "hₜ = oₜ ⊙ tanh(Cₜ)" },
        ],
      },
      {
        title: "Parameter Formula",
        formulas: [{ expression: "parameters = 4H(D + H + 1)" }],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "fₜ controls old memory.",
      "iₜ controls candidate writing.",
      "gₜ proposes new content.",
      "oₜ controls exposed hidden state.",
      "LSTM carries both Cₜ and hₜ.",
    ],
    followUp:
      "Why does the additive cell-state update help long-range gradient flow?",
  },
  lastMinute: {
    definition:
      "LSTM = cell state plus forget, input, candidate, and output computations.",
    sections: [
      {
        title: "Memory",
        flow: ["Keep old", "Write candidate", "Add into Cₜ", "Expose hₜ"],
        wide: true,
      },
      {
        title: "Count",
        points: ["Four weight sets", "Each: H(D+H+1)", "Total: 4H(D+H+1)"],
      },
    ],
    memoryLine: "Forget old, write new, expose what is needed.",
    cues: [
      "Sigmoid gates lie in 0 to 1.",
      "Candidate uses tanh.",
      "⊙ means elementwise multiplication.",
    ],
    trap: "Do not forget that LSTM has four parameter sets and two carried states.",
  },
};

export const gruAndPracticalSequenceModelling: SubjectTopic = {
  slug: "gru-and-practical-sequence-modelling",
  title: "GRU and Practical Sequence Modelling",
  description:
    "Understand GRU gates, compare recurrent cells, and handle padded variable-length sequences correctly.",
  readTime: "30 min",
  difficulty: "Advanced",
  tags: ["GRU", "Masking", "Sequence Modelling"],
  learn: {
    opening:
      "A Gated Recurrent Unit uses update and reset gates but carries only one hidden state. Practical batches also need correct padding, masking, and output selection.",
    sections: [
      {
        title: "GRU State and Gates",
        paragraphs: [
          "A GRU has no separate cell state. Its update gate zₜ controls the mixture of old state and candidate state, while its reset gate rₜ controls how much old state is used to build the candidate.",
          "The equations below use hₜ = (1 − zₜ)hₜ₋₁ + zₜh̃ₜ. Some references swap the roles of zₜ and 1 − zₜ. Both conventions are valid when their equations are internally consistent.",
        ],
        formulas: [
          { label: "Update gate", expression: "zₜ = σ(Wz[hₜ₋₁, xₜ] + bz)" },
          { label: "Reset gate", expression: "rₜ = σ(Wr[hₜ₋₁, xₜ] + br)" },
          {
            label: "Candidate state",
            expression: "h̃ₜ = tanh(Wh[rₜ ⊙ hₜ₋₁, xₜ] + bh)",
          },
          {
            label: "New hidden state",
            expression: "hₜ = (1 − zₜ) ⊙ hₜ₋₁ + zₜ ⊙ h̃ₜ",
          },
        ],
      },
      {
        title: "GRU Parameter Counting",
        paragraphs: [
          "A GRU has three parameter sets: update gate, reset gate, and candidate state. Each set receives D input values and H previous hidden values and produces H values.",
          "The formula below assumes one effective bias vector for each computation. A library with separate input and recurrent biases stores additional bias values.",
        ],
        formulas: [
          { label: "One GRU computation", expression: "H(D + H + 1)" },
          {
            label: "Complete GRU cell",
            expression: "parameters = 3H(D + H + 1)",
          },
          { label: "Optional output layer", expression: "add O(H + 1)" },
        ],
      },
      {
        title: "Basic RNN, LSTM, and GRU",
        paragraphs: [
          "A basic RNN is simplest but struggles most with long dependencies. LSTM has four computations and two states. GRU has three computations and one state, so it normally uses fewer parameters than an LSTM with the same D and H.",
          "There is no universal winner between LSTM and GRU. Validation performance, speed, memory, and the sequence task should decide.",
        ],
        dataTable: {
          headers: ["Cell", "Main structure", "Cell parameters"],
          rows: [
            ["Basic RNN", "One hidden update", "H(D + H + 1)"],
            ["GRU", "Update, reset, candidate", "3H(D + H + 1)"],
            ["LSTM", "Four computations, two states", "4H(D + H + 1)"],
          ],
        },
      },
      {
        title: "Padding and Masking",
        paragraphs: [
          "Sequences in one batch often have different lengths. Padding adds placeholder values so they share one tensor shape. A mask marks real positions with 1 and padded positions with 0.",
          "The model or loss must ignore padded positions. Otherwise padding can change hidden states, contribute false loss, and make metrics incorrect. Framework utilities may use explicit masks, sequence lengths, or packed sequences.",
        ],
        visual: {
          src: "/notes/deep-learning/sequence-padding-masking.png",
          alt: "Three variable-length sequences padded to five steps with matching binary masks",
          width: 1536,
          height: 1024,
          caption:
            "Padding creates equal tensor lengths; masks separate real time steps from placeholder positions.",
        },
      },
      {
        title: "Selecting the Correct Output",
        paragraphs: [
          "For sequence classification, use the final valid hidden state or a masked aggregation of valid states. Do not blindly select the last padded array position.",
          "For aligned sequence labelling, return an output at every time step and mask padded losses. A batch-first recurrent output commonly has shape B × T × H before the task-specific output layer.",
        ],
        table: {
          headers: ["Task", "Useful recurrent output"],
          rows: [
            [
              "Whole-sequence classification",
              "Final valid state or masked aggregation",
            ],
            ["Label every time step", "All valid states"],
            [
              "Predict next value at each step",
              "All required preceding states",
            ],
          ],
        },
      },
      {
        title: "Practice",
        paragraphs: [
          "Use one GRU convention consistently and exclude padding from learning.",
        ],
        problems: [
          {
            title: "GRU state mixture",
            prompt:
              "Using hₜ = (1−zₜ)hₜ₋₁ + zₜh̃ₜ, let hₜ₋₁ = 0.8, zₜ = 0.25, and h̃ₜ = −0.4. Find hₜ.",
            steps: [
              "Old-state part = (1 − 0.25) × 0.8 = 0.75 × 0.8 = 0.6.",
              "Candidate part = 0.25 × (−0.4) = −0.1.",
              "Add both parts: 0.6 − 0.1.",
            ],
            answer: "The new hidden state is 0.5.",
          },
          {
            title: "GRU parameter count",
            prompt:
              "A GRU has input size D = 10 and hidden size H = 20. Find its cell parameters including biases.",
            steps: [
              "One computation has H(D + H + 1) parameters.",
              "One computation: 20(10 + 20 + 1) = 620.",
              "A GRU has three computations: 3 × 620.",
            ],
            answer: "The GRU cell has 1,860 parameters.",
          },
          {
            title: "Build a padding mask",
            prompt:
              "Two sequences have valid lengths 4 and 2 and are padded to T = 5. Write their binary masks.",
            steps: [
              "Use 1 for each valid position.",
              "Use 0 for every padding position up to length 5.",
            ],
            answer: "The masks are [1, 1, 1, 1, 0] and [1, 1, 0, 0, 0].",
          },
          {
            title: "Choose the final state",
            prompt:
              "A sequence has valid length 3 but is padded to length 6. Which time-step state should be used as its final valid state?",
            steps: [
              "Valid positions are t = 1, 2, and 3.",
              "Positions t = 4, 5, and 6 contain padding.",
            ],
            answer: "Use h₃, not h₆.",
          },
        ],
      },
    ],
    mechanism: {
      title: "How to build a practical recurrent batch",
      steps: [
        "Create or record each sequence's valid length.",
        "Pad sequences to a common length.",
        "Create a mask or use a length-aware framework utility.",
        "Run the RNN, LSTM, or GRU.",
        "Select final valid states or all valid states for the task.",
        "Exclude padded positions from loss and metrics.",
      ],
    },
    example: {
      title: "GRU versus LSTM parameter count",
      body: "With the same input and hidden sizes, a GRU uses three recurrent parameter sets while an LSTM uses four. This makes the GRU smaller, but not automatically more accurate.",
    },
    misconception:
      "Padding values are not real sequence elements. Without masking or length-aware processing, they can incorrectly affect states, losses, and metrics.",
  },
  revise: {
    definition:
      "A GRU uses update and reset gates with one hidden state; practical batches use masks to ignore padding.",
    sections: [
      {
        title: "GRU Update",
        formulas: [{ expression: "hₜ = (1−zₜ) ⊙ hₜ₋₁ + zₜ ⊙ h̃ₜ" }],
      },
      {
        title: "Parameter Counts",
        points: ["Basic RNN: H(D+H+1)", "GRU: 3H(D+H+1)", "LSTM: 4H(D+H+1)"],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "GRU carries one hidden state and no separate cell state.",
      "Update gate mixes old and candidate states.",
      "Reset gate affects candidate construction.",
      "Masks mark valid and padded positions.",
      "Use the final valid state for padded sequence classification.",
    ],
    followUp:
      "Why does a GRU usually have fewer parameters than an LSTM with the same sizes?",
  },
  lastMinute: {
    definition:
      "GRU = update gate, reset gate, candidate state, and one carried hidden state.",
    sections: [
      {
        title: "Counts",
        points: ["RNN: 1 set", "GRU: 3 sets", "LSTM: 4 sets"],
      },
      {
        title: "Padding Rule",
        flow: [
          "Pad",
          "Create mask",
          "Run model",
          "Use valid outputs",
          "Mask loss",
        ],
        wide: true,
      },
    ],
    memoryLine: "Gate the state, mask the padding, select the last real step.",
    cues: [
      "GRU has no Cₜ.",
      "Mask: real = 1, pad = 0.",
      "All states: B × T × H.",
    ],
    trap: "Do not use the hidden state from the final padded position as the sequence summary.",
  },
};
