import type { SubjectTopic } from "@/lib/subject-content";

export const positionalInformationAndMasks: SubjectTopic = {
  slug: "positional-information-and-attention-masks",
  title: "Positional Information and Attention Masks",
  description:
    "Add token order to Transformer inputs and construct padding and causal attention masks correctly.",
  readTime: "25 min",
  difficulty: "Intermediate",
  tags: ["Positional Encoding", "Causal Mask", "Padding Mask"],
  learn: {
    opening:
      "Self-attention does not know token order by itself. Positional information represents order, while masks control which positions are allowed to receive attention.",
    sections: [
      {
        title: "Why Position Must Be Added",
        paragraphs: [
          "Without positional information, self-attention treats the input as a set of token representations. Reordering the tokens reorders the outputs, but the layer has no direct signal that one position came before another.",
          "Before this step, each token ID selects one row from a trainable vocabulary embedding table with shape V × dmodel. Token IDs shaped (B, T) become vectors shaped (B, T, dmodel).",
          "A position vector with the same width dmodel is commonly added to each token embedding before the first Transformer block.",
        ],
        formulas: [
          { label: "Token-embedding parameters", expression: "V × dmodel" },
          {
            label: "Transformer input",
            expression: "Xpositioned = Xtoken + Xposition",
          },
        ],
        visual: {
          src: "/notes/deep-learning/position-and-attention-masks.png",
          alt: "Token and position embeddings added together beside lower-triangular causal and padding masks",
          width: 1536,
          height: 1024,
          caption:
            "Position changes representations; masks change which attention scores are allowed.",
        },
      },
      {
        title: "Learned and Sinusoidal Positions",
        paragraphs: [
          "Learned positional embeddings store a trainable vector for every supported position. They are simple but usually have a fixed configured maximum length.",
          "Sinusoidal encodings use fixed sine and cosine waves at different frequencies. They add no trainable position parameters and give different dimensions different position patterns.",
        ],
        formulas: [
          {
            label: "Even dimension",
            expression: "PE(pos,2i) = sin(pos / 10000^(2i/dmodel))",
          },
          {
            label: "Odd dimension",
            expression: "PE(pos,2i+1) = cos(pos / 10000^(2i/dmodel))",
          },
        ],
        table: {
          headers: ["Learned", "Sinusoidal"],
          rows: [
            ["Trainable vectors", "Fixed functions"],
            ["Adds position parameters", "Adds no position parameters"],
            [
              "Configured position table",
              "Can be calculated for new positions",
            ],
          ],
        },
      },
      {
        title: "Padding Masks",
        paragraphs: [
          "Padding creates equal sequence lengths inside a batch. A padding mask blocks padded key positions so real queries do not use placeholder values.",
          "The loss must also ignore padded targets. Attention masking and loss masking solve related but different problems.",
        ],
      },
      {
        title: "Causal Masks",
        paragraphs: [
          "A causal mask prevents position t from reading positions after t. It may attend to itself and all earlier positions. This rule is required when predicting the next token without seeing the answer.",
          "With rows as queries and columns as keys, allowed entries form the lower triangle including the diagonal. Future entries above the diagonal are blocked.",
        ],
        formulas: [
          {
            label: "Four-position additive causal mask",
            expression: "[[0,−∞,−∞,−∞],[0,0,−∞,−∞],[0,0,0,−∞],[0,0,0,0]]",
          },
        ],
      },
      {
        title: "Mask Broadcasting",
        paragraphs: [
          "Attention scores commonly have shape B × h × Tq × Tk. A padding mask may begin as B × Tk and be reshaped so it broadcasts across heads and query positions.",
          "Mask conventions differ: some APIs use true for allowed positions, while others use true for blocked positions. Always check the framework contract instead of assuming.",
        ],
      },
      {
        title: "Practice",
        paragraphs: [
          "State whether 1 means allowed or blocked before reading a binary mask.",
        ],
        problems: [
          {
            title: "Allowed causal positions",
            prompt:
              "In a length-5 causal sequence, which key positions may query position t = 3 attend to?",
            steps: [
              "Causal attention allows the current and earlier positions.",
              "Future positions 4 and 5 are blocked.",
            ],
            answer: "Position 3 may attend to keys 1, 2, and 3.",
          },
          {
            title: "Padding mask",
            prompt:
              "A sequence has valid length 3 and is padded to length 5. Use 1 for valid and 0 for padding.",
            steps: [
              "Mark the first three positions valid.",
              "Mark the last two positions padded.",
            ],
            answer: "The mask is [1, 1, 1, 0, 0].",
          },
          {
            title: "Learned position parameters",
            prompt:
              "A learned position table supports 512 positions with dmodel = 256. How many parameters does it contain?",
            steps: [
              "Every position stores one vector of width 256.",
              "Parameters = 512 × 256.",
            ],
            answer: "The position table has 131,072 parameters.",
          },
        ],
      },
    ],
    mechanism: {
      title: "How position and masks enter attention",
      steps: [
        "Convert tokens to dmodel-wide embeddings.",
        "Add a matching position representation.",
        "Project the positioned inputs into Q, K, and V.",
        "Create padding and causal masks as required.",
        "Add blocked values to the score matrix before softmax.",
        "Exclude padded targets from the loss as well.",
      ],
    },
    example: {
      title: "Position 2 during causal training",
      body: "The query at position 2 may use keys at positions 1 and 2, but the causal mask blocks keys at positions 3 and later.",
    },
    misconception:
      "A padding mask does not tell the model token order, and a positional embedding does not block padding. They perform different jobs.",
  },
  revise: {
    definition:
      "Position representations add order; masks block invalid attention connections before softmax.",
    sections: [
      {
        title: "Position",
        points: [
          "Token and position widths must match",
          "Learned or sinusoidal",
          "Usually added before blocks",
        ],
      },
      {
        title: "Masks",
        points: [
          "Padding: block placeholders",
          "Causal: block future keys",
          "Apply before softmax",
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Self-attention needs an order signal.",
      "Causal allowed cells form a lower triangle.",
      "Padding masks block padded keys.",
      "Loss masking still remains necessary.",
      "Framework boolean-mask meanings can differ.",
    ],
    followUp:
      "Why are positional vectors added rather than concatenated in the standard Transformer input?",
  },
  lastMinute: {
    definition: "Position says where; mask says whether attention is allowed.",
    sections: [
      {
        title: "Causal Rule",
        points: [
          "Query t sees keys ≤ t",
          "Future scores → −∞",
          "Diagonal is allowed",
        ],
      },
      {
        title: "Padding Rule",
        points: [
          "Block pad keys",
          "Also mask padded loss",
          "Check API convention",
        ],
      },
    ],
    memoryLine: "Add position to embeddings; add masks to scores.",
    cues: [
      "Same dmodel width.",
      "Mask before softmax.",
      "Lower triangle means causal access.",
    ],
    trap: "Do not use a causal mask that blocks the current position itself unless the task explicitly requires it.",
  },
};

export const transformerEncoderAndDecoder: SubjectTopic = {
  slug: "transformer-encoder-and-decoder",
  title: "Transformer Encoder and Decoder",
  description:
    "Understand Transformer blocks, residual and normalization paths, feedforward layers, cross-attention, and parameters.",
  readTime: "31 min",
  difficulty: "Advanced",
  tags: ["Transformer Block", "Encoder", "Decoder"],
  learn: {
    opening:
      "A Transformer block combines attention with a position-wise feedforward network. Residual connections and LayerNorm support stable information and gradient flow.",
    sections: [
      {
        title: "Encoder Block",
        paragraphs: [
          "An encoder block contains unmasked self-attention followed by a feedforward network. Each token can normally attend to every valid input token.",
          "The block keeps shape B × T × dmodel. Attention mixes information across positions, while the feedforward network transforms each position independently using shared weights.",
        ],
        visual: {
          src: "/notes/deep-learning/transformer-encoder-decoder.png",
          alt: "Transformer encoder and decoder stacks with self-attention, cross-attention, feedforward layers, residual normalization, and encoder memory",
          width: 1536,
          height: 1024,
          caption:
            "The decoder uses masked self-attention, reads encoder memory through cross-attention, and projects final states to vocabulary probabilities.",
        },
      },
      {
        title: "Decoder Block",
        paragraphs: [
          "A sequence-to-sequence decoder block contains masked self-attention, cross-attention, and a feedforward network. Its causal mask prevents future output tokens from leaking into the current prediction.",
          "In cross-attention, decoder states create queries. Encoder memory creates keys and values. This lets every decoder position retrieve relevant input information.",
        ],
      },
      {
        title: "Position-Wise Feedforward Network",
        paragraphs: [
          "The same two-layer network is applied independently to every position. Its inner width dff is usually larger than dmodel, but the second projection returns to dmodel for the residual connection.",
        ],
        formulas: [
          {
            label: "Feedforward layer",
            expression: "FFN(x) = φ(xW₁ + b₁)W₂ + b₂",
          },
          { label: "Shapes", expression: "dmodel → dff → dmodel" },
          { label: "Parameters", expression: "2dmodeldff + dff + dmodel" },
        ],
      },
      {
        title: "Residual Connections and LayerNorm",
        paragraphs: [
          "A residual path adds a sublayer's input to its output, so both tensors must have the same shape. It gives information and gradients a direct path around the sublayer.",
          "LayerNorm normalizes each token independently across its dmodel feature values, then applies a learned scale γ and shift β. Unlike BatchNorm, it does not use statistics from other examples in the batch.",
          "The original Transformer uses post-normalization, commonly written LayerNorm(x + Sublayer(x)). Many modern implementations use pre-normalization, x + Sublayer(LayerNorm(x)). State the chosen convention because both exist.",
        ],
        formulas: [
          {
            label: "LayerNorm",
            expression: "LN(x) = γ ⊙ (x − μfeature)/√(σfeature² + ε) + β",
          },
          { label: "One LayerNorm", expression: "parameters = 2dmodel" },
          { label: "Post-norm", expression: "y = LayerNorm(x + Sublayer(x))" },
          { label: "Pre-norm", expression: "y = x + Sublayer(LayerNorm(x))" },
        ],
      },
      {
        title: "Encoder and Decoder Block Parameter Counts",
        paragraphs: [
          "For standard biased MHA, count 4dmodel² + 4dmodel. Add the feedforward parameters and two LayerNorms. Each LayerNorm has one scale and one shift per model dimension.",
          "A sequence-to-sequence decoder has two MHA sublayers and three LayerNorms. These totals assume biased linear projections and do not include embeddings or the vocabulary output head.",
        ],
        formulas: [
          { label: "Two LayerNorms", expression: "4dmodel parameters" },
          {
            label: "Encoder block total",
            expression: "4dmodel² + 2dmodeldff + dff + 9dmodel",
          },
          {
            label: "Decoder block total",
            expression: "8dmodel² + 2dmodeldff + dff + 15dmodel",
          },
        ],
      },
      {
        title: "Practice",
        paragraphs: [
          "Do not include embeddings unless the question asks for the complete model.",
        ],
        problems: [
          {
            title: "Feedforward parameters",
            prompt:
              "dmodel = 256 and dff = 1024. Count FFN parameters including biases.",
            steps: [
              "First layer: 256×1024 weights + 1024 biases.",
              "Second layer: 1024×256 weights + 256 biases.",
              "Total = 2×256×1024 + 1024 + 256.",
            ],
            answer: "The FFN has 525,568 parameters.",
          },
          {
            title: "Small encoder block",
            prompt:
              "Use dmodel = 4 and dff = 8. Count one encoder block with biased MHA and two LayerNorms.",
            steps: [
              "MHA = 4×4² + 4×4 = 80.",
              "FFN = 2×4×8 + 8 + 4 = 76.",
              "Two LayerNorms = 4×4 = 16.",
              "Total = 80 + 76 + 16.",
            ],
            answer: "The encoder block has 172 parameters.",
          },
          {
            title: "Small decoder block",
            prompt:
              "Use dmodel = 4 and dff = 8. Count one biased encoder-decoder Transformer decoder block with two MHA sublayers and three LayerNorms.",
            steps: [
              "Two MHA sublayers = 2×80 = 160.",
              "FFN = 76.",
              "Three LayerNorms = 3×(2×4) = 24.",
              "Total = 160 + 76 + 24.",
            ],
            answer: "The decoder block has 260 parameters.",
          },
          {
            title: "Cross-attention sources",
            prompt:
              "In a Transformer decoder, identify the sources of Q, K, and V for cross-attention.",
            steps: [
              "The decoder asks for input information.",
              "The encoder memory contains that information.",
            ],
            answer:
              "Q comes from the decoder; K and V come from encoder memory.",
          },
        ],
      },
    ],
    mechanism: {
      title: "How an encoder-decoder Transformer flows",
      steps: [
        "Add token and position representations.",
        "Encode the input with self-attention and feedforward blocks.",
        "Treat final encoder states as memory.",
        "Process shifted outputs with masked decoder self-attention.",
        "Use decoder queries to cross-attend to encoder memory.",
        "Map decoder states to output logits.",
      ],
    },
    example: {
      title: "Why the FFN returns to dmodel",
      body: "The inner layer can expand from dmodel to dff, but the second projection returns to dmodel so its result can be added to the residual input.",
    },
    misconception:
      "Attention is not the entire Transformer block. Feedforward layers, residual paths, normalization, embeddings, and masks are also essential.",
  },
  revise: {
    definition:
      "A Transformer block combines attention, a position-wise FFN, residual connections, and LayerNorm.",
    sections: [
      {
        title: "Encoder",
        flow: ["Self-attention", "Add/Norm", "FFN", "Add/Norm"],
      },
      {
        title: "Decoder",
        flow: ["Masked self-attention", "Cross-attention", "FFN", "Output"],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Encoder self-attention reads valid input positions.",
      "Decoder self-attention is causal.",
      "Cross-attention uses decoder Q and encoder K,V.",
      "FFN is shared across positions.",
      "Pre-norm and post-norm are different valid layouts.",
    ],
    followUp:
      "Why must a Transformer sublayer output normally keep width dmodel?",
  },
  lastMinute: {
    definition:
      "Transformer block = attention + FFN + residual paths + LayerNorm.",
    sections: [
      {
        title: "Encoder",
        points: ["Self-attention", "Two sublayers", "Two LayerNorms"],
      },
      {
        title: "Decoder Extra",
        points: ["Causal self-attention", "Cross-attention", "Encoder memory"],
      },
    ],
    memoryLine: "Attention mixes positions; FFN transforms each position.",
    cues: [
      "Residual shapes must match.",
      "FFN: dmodel→dff→dmodel.",
      "Decoder cross-attention adds a third sublayer.",
    ],
    trap: "Do not say the encoder uses a causal mask for ordinary bidirectional input understanding.",
  },
};

export const transformerTrainingInferenceAndSelection: SubjectTopic = {
  slug: "transformer-training-inference-and-selection",
  title: "Transformer Training, Inference, and Architecture Selection",
  description:
    "Train with shifted targets, generate autoregressively, and choose encoder-only, decoder-only, or encoder-decoder designs.",
  readTime: "28 min",
  difficulty: "Advanced",
  tags: ["Teacher Forcing", "Autoregressive", "Architectures"],
  learn: {
    opening:
      "Transformer architecture and masking must match the task. Training can process many target positions in parallel, while autoregressive inference produces one new token at a time.",
    sections: [
      {
        title: "Teacher Forcing with Shifted Targets",
        paragraphs: [
          "During training, the decoder receives the correct target sequence shifted right. A start token comes first, and the model predicts the next target at every position.",
          "The causal mask prevents a position from seeing later correct targets. Without it, training would leak answers from the future.",
        ],
        formulas: [
          { label: "Decoder input", expression: "[START, y₁, y₂, …, yT₋₁]" },
          { label: "Training targets", expression: "[y₁, y₂, y₃, …, yT]" },
        ],
      },
      {
        title: "Autoregressive Inference",
        paragraphs: [
          "At inference time, the correct future targets are unavailable. The model predicts one token, appends the selected token to its input, and repeats until a stop condition.",
          "Generation is sequential even though attention inside one step is parallel across the available prefix. Caching earlier keys and values avoids recomputing every earlier projection at every step.",
        ],
        flow: [
          "Start token",
          "Predict token",
          "Append",
          "Predict next",
          "Stop token or limit",
        ],
      },
      {
        title: "Three Main Transformer Families",
        paragraphs: [
          "Encoder-only models use bidirectional self-attention and suit tasks that require understanding a complete input. Decoder-only models use causal attention and suit next-token generation.",
          "Encoder-decoder models encode one sequence and autoregressively decode another. They suit sequence-to-sequence tasks where input and output play different roles.",
        ],
        visual: {
          src: "/notes/deep-learning/transformer-architectures.png",
          alt: "Comparison of encoder-only bidirectional, decoder-only causal, and encoder-decoder sequence-to-sequence Transformers",
          width: 1536,
          height: 1024,
          caption:
            "Choose the attention direction and architecture from the required input-output behaviour.",
        },
        dataTable: {
          headers: ["Architecture", "Best fit"],
          rows: [
            ["Encoder-only", "Classification and token-level understanding"],
            ["Decoder-only", "Autoregressive continuation and generation"],
            ["Encoder-decoder", "Input-sequence to output-sequence mapping"],
          ],
        },
      },
      {
        title: "Output Projection and Training Loss",
        paragraphs: [
          "Each decoder state is projected to one logit per vocabulary item. Softmax and cross-entropy then train the probability of the correct next token. Padding targets are excluded from the loss.",
          "The output matrix is large when vocabulary size V is large. Some models tie it to the token-embedding matrix when their shapes are compatible, reducing separate parameters.",
        ],
        formulas: [
          { label: "Vocabulary logits", expression: "zₜ = hₜWvocab + bvocab" },
          { label: "Untied output-head parameters", expression: "Vdmodel + V" },
        ],
      },
      {
        title: "Advantages and Limitations",
        paragraphs: [
          "Transformers create direct content-dependent connections between positions and parallelize training across sequence positions better than recurrence.",
          "Full attention uses quadratic score memory in sequence length, needs explicit position information, and can be expensive for long inputs. Larger models also require substantial data and computation.",
        ],
      },
      {
        title: "Practice",
        paragraphs: [
          "Choose the architecture from information access and output behaviour.",
        ],
        problems: [
          {
            title: "Shift the target",
            prompt:
              "The target tokens are [A, B, C, END]. Write the teacher-forced decoder input and prediction targets.",
            steps: [
              "Place START before the target prefix.",
              "Shift the expected sequence one position left relative to decoder input.",
            ],
            answer: "Decoder input: [START, A, B, C]. Targets: [A, B, C, END].",
          },
          {
            title: "Output-head parameters",
            prompt:
              "Vocabulary size V = 10,000 and dmodel = 256. Count an untied biased output projection.",
            steps: [
              "Weights = 10,000 × 256 = 2,560,000.",
              "Biases = 10,000.",
              "Add both counts.",
            ],
            answer: "The output head has 2,570,000 parameters.",
          },
          {
            title: "Choose an architecture",
            prompt:
              "A task reads a complete sequence and assigns one category without generating text. Which Transformer family is the natural starting point?",
            steps: [
              "The complete input is available.",
              "The task needs understanding and one label, not causal generation.",
            ],
            answer: "Use an encoder-only Transformer.",
          },
          {
            title: "Attention growth",
            prompt:
              "Sequence length grows from 1,000 to 2,000. By what factor does the full T × T score count grow?",
            steps: [
              "The length doubles.",
              "The score matrix grows quadratically: 2².",
            ],
            answer: "The score count grows by a factor of 4.",
          },
        ],
      },
    ],
    mechanism: {
      title: "How autoregressive training differs from inference",
      steps: [
        "Shift correct targets right for training input.",
        "Apply a causal mask to prevent future leakage.",
        "Predict every next-token target and calculate masked loss.",
        "At inference, begin with available context or a start token.",
        "Select one predicted token and append it.",
        "Repeat without access to future correct targets.",
      ],
    },
    example: {
      title: "Parallel training, sequential generation",
      body: "A causal mask lets training calculate losses at many positions together because all earlier correct tokens are available. During generation, the next token must exist before it can become context for the following step.",
    },
    misconception:
      "Teacher forcing alone does not prevent future leakage. Shifted decoder inputs and a correct causal mask restrict every position to earlier target tokens.",
  },
  revise: {
    definition:
      "Training uses shifted correct targets with causal masking; inference repeatedly feeds back generated tokens.",
    sections: [
      {
        title: "Architecture Choice",
        points: [
          "Encoder-only: understand",
          "Decoder-only: generate",
          "Encoder-decoder: transform sequences",
        ],
      },
      {
        title: "Generation",
        flow: ["Context", "Next-token logits", "Select", "Append", "Repeat"],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Teacher forcing uses correct previous target tokens.",
      "Causal masking prevents answer leakage.",
      "Inference has no correct future targets.",
      "Output projection creates vocabulary logits.",
      "Full attention score size is quadratic in length.",
    ],
    followUp:
      "Why can causal Transformer training process target positions together while inference remains sequential?",
  },
  lastMinute: {
    definition:
      "Train on shifted targets; generate by appending one prediction at a time.",
    sections: [
      {
        title: "Choose",
        points: [
          "Understand → encoder",
          "Generate → decoder",
          "Map sequences → encoder-decoder",
        ],
      },
      {
        title: "Loss",
        points: [
          "Vocabulary logits",
          "Cross-entropy",
          "Ignore padding",
          "No future leakage",
        ],
      },
    ],
    memoryLine:
      "Training knows the shifted past; inference must create the past it will use next.",
    cues: [
      "Cache earlier K and V during generation.",
      "Output head: Vdmodel+V.",
      "Double length → 4× scores.",
    ],
    trap: "Do not feed the unshifted target into the decoder as its own input.",
  },
};
