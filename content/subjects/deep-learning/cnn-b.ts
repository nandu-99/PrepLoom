import type { SubjectTopic } from "@/lib/subject-content";

export const channelsFiltersAndParameterCounting: SubjectTopic = {
  slug: "channels-filters-and-parameter-counting",
  title: "Channels, Filters, and Parameter Counting",
  description:
    "Track convolution depth and calculate trainable parameters independently of spatial size and batch size.",
  readTime: "24 min",
  difficulty: "Intermediate",
  tags: ["Channels", "Filters", "Parameters"],
  learn: {
    opening:
      "A convolution filter spans every input channel. Each filter produces one output channel, so filter count determines output depth.",
    sections: [
      {
        title: "Input and Filter Depth",
        paragraphs: [
          "If an input has Cᵢₙ channels, every standard convolution filter has depth Cᵢₙ. A 3 × 3 filter on an RGB input therefore contains 3 × 3 × 3 weights before its bias.",
          "The filter combines information across all input channels at every spatial position. It does not independently create three outputs from the three RGB channels.",
        ],
        formulas: [
          { label: "One filter shape", expression: "Kₕ × K𝓌 × Cᵢₙ" },
        ],
        visual: {
          src: "/notes/deep-learning/multi-channel-convolution.png",
          alt: "Three-channel input processed by depth-matching filters to produce multiple output feature maps",
          width: 1536,
          height: 1024,
          caption:
            "Each filter spans all input channels and produces one output feature map.",
        },
      },
      {
        title: "Filter Count Sets Output Channels",
        paragraphs: [
          "A layer with Cₒᵤₜ filters produces Cₒᵤₜ feature maps. Stacking those maps gives output shape Hₒᵤₜ × Wₒᵤₜ × Cₒᵤₜ in channels-last notation.",
          "The next convolution receives Cₒᵤₜ as its input-channel count. Spatial dimensions and channel depth therefore change for different reasons.",
        ],
        formulas: [
          { label: "Channels-last output", expression: "Hout × Wout × Cout" },
          { label: "Batch output", expression: "B × Hout × Wout × Cout" },
        ],
      },
      {
        title: "Standard Convolution Parameter Formula",
        paragraphs: [
          "Each of the Cₒᵤₜ filters owns KₕK𝓌Cᵢₙ weights and usually one bias. Parameters are shared across spatial positions, so Hₒᵤₜ, Wₒᵤₜ, and batch size do not appear in the parameter formula.",
          "If the layer disables bias, remove the +1. A preceding convolution bias is often disabled when BatchNorm immediately follows it.",
        ],
        formulas: [
          {
            label: "With one bias per filter",
            expression: "parameters = (KₕK𝓌Cᵢₙ + 1)Cₒᵤₜ",
          },
          {
            label: "Without bias",
            expression: "parameters = KₕK𝓌CᵢₙCₒᵤₜ",
          },
        ],
      },
      {
        title: "Parameters and Activations Are Different",
        paragraphs: [
          "Parameters are learned weights and biases stored by the model. Activations are values produced for the current input. Activation count depends on output height, width, channels, and batch size.",
          "A layer can have few parameters but many activation values when it processes a large image. Training memory also stores values needed for backpropagation.",
        ],
        formulas: [
          { label: "One-example output activations", expression: "activations = HoutWoutCout" },
        ],
        table: {
          headers: ["Parameters", "Activations"],
          rows: [
            ["Learned and saved", "Produced from an input"],
            ["Independent of batch and spatial positions", "Grow with batch and output size"],
          ],
        },
      },
      {
        title: "Worked Layer Example",
        paragraphs: [
          "An input 32 × 32 × 3 uses sixteen 3 × 3 filters, stride 1, valid padding, and one bias per filter.",
        ],
        formulas: [
          { label: "Spatial output", expression: "Hout = Wout = (32 − 3) + 1 = 30" },
          { label: "Output tensor", expression: "30 × 30 × 16" },
          { label: "Parameters", expression: "(3×3×3 + 1)×16 = 448" },
          { label: "Output activations", expression: "30×30×16 = 14,400" },
        ],
      },
      {
        title: "Practice",
        paragraphs: [
          "Find Cᵢₙ from the input, Cₒᵤₜ from the filter count, and include bias only when stated.",
        ],
        problems: [
          {
            title: "Second convolution layer",
            prompt:
              "A same-padded 3 × 3 convolution receives 16 channels and uses 32 filters with bias. Find its parameters.",
            steps: [
              "Each filter has 3 × 3 × 16 = 144 weights.",
              "Add one bias: 145 parameters per filter.",
              "Multiply by 32 filters: 145 × 32 = 4,640.",
            ],
            answer: "The layer has 4,640 trainable parameters.",
          },
          {
            title: "No-bias layer",
            prompt:
              "A 5 × 5 convolution has Cᵢₙ = 8 and Cₒᵤₜ = 20 with bias disabled. Find its parameter count.",
            steps: [
              "Weights per filter = 5 × 5 × 8 = 200.",
              "There are 20 filters and no biases.",
              "Parameters = 200 × 20 = 4,000.",
            ],
            answer: "The layer has 4,000 parameters.",
          },
          {
            title: "Batch output shape",
            prompt:
              "A batch of 64 inputs produces spatial size 28 × 28 from a layer with 48 filters. Give NHWC and NCHW output shapes.",
            steps: [
              "Output channel count equals filter count: 48.",
              "NHWC order is B × H × W × C.",
              "NCHW order is B × C × H × W.",
            ],
            answer: "NHWC: 64 × 28 × 28 × 48. NCHW: 64 × 48 × 28 × 28.",
          },
          {
            title: "Parameter independence",
            prompt:
              "The same 3 × 3, 3-input-channel, 16-filter convolution is applied to 32 × 32 images and 128 × 128 images. Does its parameter count change?",
            steps: [
              "Filter shape and filter count remain unchanged.",
              "Spatial size changes the number of filter applications, not the shared weights.",
            ],
            answer: "No. With bias, the layer still has 448 parameters.",
          },
        ],
      },
    ],
    mechanism: {
      title: "How to count a convolution layer",
      steps: [
        "Read the kernel height and width.",
        "Read input channels Cᵢₙ.",
        "Multiply to get weights in one filter.",
        "Add one bias if enabled.",
        "Multiply by output filters Cₒᵤₜ.",
        "Keep parameter count separate from activation count.",
      ],
    },
    example: {
      title: "Why image size is absent",
      body: "A 3 × 3 filter contains the same learned values whether it slides across a small image or a large one. The large image causes more computation, not more filter parameters.",
    },
    misconception:
      "Input channels do not equal output channels automatically. Input depth sets each filter's depth; the number of filters sets output depth.",
  },
  revise: {
    definition:
      "Every standard filter spans Cᵢₙ channels, and Cₒᵤₜ filters produce Cₒᵤₜ output channels.",
    sections: [
      {
        title: "Parameter Formula",
        formulas: [{ expression: "parameters = (KₕK𝓌Cᵢₙ + 1)Cₒᵤₜ" }],
      },
      {
        title: "Shape Rule",
        flow: ["Input depth Cᵢₙ", "Filter depth Cᵢₙ", "Cₒᵤₜ filters", "Output depth Cₒᵤₜ"],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "One filter produces one output channel.",
      "One bias is normally used per output filter.",
      "Batch size does not change parameters.",
      "Input height and width do not change parameters.",
      "Activations and parameters are different counts.",
    ],
    followUp:
      "Why does doubling image width increase computation but not convolution parameter count?",
  },
  lastMinute: {
    definition: "Filter depth = Cᵢₙ; filter count = Cₒᵤₜ.",
    sections: [
      {
        title: "Formula",
        points: ["Weights/filter = KₕK𝓌Cᵢₙ", "+1 if bias", "Multiply by Cₒᵤₜ"],
      },
      {
        title: "Do Not Include",
        points: ["Batch size", "Output H", "Output W"],
      },
    ],
    memoryLine: "Count values inside one filter, then multiply by the number of filters.",
    cues: [
      "Output channels = number of filters.",
      "Bias can be disabled.",
      "Spatial size changes activations, not shared weights.",
    ],
    trap: "Do not multiply parameter count by the number of output positions.",
  },
};

export const poolingAndReceptiveFields: SubjectTopic = {
  slug: "pooling-and-receptive-fields",
  title: "Pooling and Receptive Fields",
  description:
    "Downsample feature maps and calculate how much of the original input influences deeper units.",
  readTime: "25 min",
  difficulty: "Intermediate",
  tags: ["Pooling", "Receptive Field", "Numericals"],
  learn: {
    opening:
      "Pooling summarizes local regions without learned weights. Receptive field describes the input region that can influence one feature value.",
    sections: [
      {
        title: "Max and Average Pooling",
        paragraphs: [
          "Max pooling keeps the largest value in each window. Average pooling keeps the mean. Both operate separately on each channel and normally do not mix channels.",
          "A common 2 × 2 pooling layer with stride 2 halves height and width when dimensions divide evenly. Pooling has no trainable weights or biases.",
        ],
        visual: {
          src: "/notes/deep-learning/pooling-receptive-field.png",
          alt: "Max pooling example and growth from three by three to five by five receptive field",
          width: 1536,
          height: 1024,
          caption:
            "Pooling reduces spatial size; stacked local layers make each deeper unit depend on a larger input region.",
        },
        table: {
          headers: ["Max pooling", "Average pooling"],
          rows: [
            ["Keeps strongest local value", "Keeps local mean"],
            ["Gradient returns through selected maximum", "Gradient is shared across the window"],
          ],
        },
      },
      {
        title: "Pooling Output Size",
        paragraphs: [
          "Pooling uses the same spatial output formula as convolution. With dilation D, first use the effective window Keff = D(K − 1) + 1. Most basic pooling questions use D = 1. There is no output-filter count because each channel is pooled independently.",
        ],
        formulas: [
          { label: "Effective pool window", expression: "Keff = D(K − 1) + 1" },
          { label: "One dimension", expression: "Nout = ⌊(N + 2P − Keff)/S⌋ + 1" },
        ],
      },
      {
        title: "Pooling Backpropagation",
        paragraphs: [
          "For max pooling, the forward pass stores which input held the maximum. During backward propagation, the upstream gradient goes to that selected position; other positions in the window receive zero from that output.",
          "For average pooling over M values, each input receives 1/M of the upstream gradient. Overlapping windows can add several gradient contributions to one input.",
        ],
      },
      {
        title: "Receptive Field and Jump",
        paragraphs: [
          "The receptive field r tells how many original input positions can affect one current value. The jump j tells the spacing, in original-input coordinates, between neighbouring current values.",
          "Start at the input with r₀ = 1 and j₀ = 1. For layer ℓ, let Kℓ,eff = Dℓ(Kℓ − 1) + 1. Update receptive field using this effective kernel and the previous jump, then update the jump.",
        ],
        formulas: [
          { label: "Receptive field", expression: "rℓ = rℓ₋₁ + (Kℓ,eff − 1)jℓ₋₁" },
          { label: "Jump", expression: "jℓ = jℓ₋₁Sℓ" },
        ],
      },
      {
        title: "Worked Receptive-Field Numerical",
        paragraphs: [
          "Consider a 3 × 3 convolution with stride 1, then 2 × 2 pooling with stride 2, then another 3 × 3 convolution with stride 1. Padding does not change receptive-field size for interior outputs.",
        ],
        formulas: [
          { label: "Start", expression: "r₀ = 1, j₀ = 1" },
          { label: "After conv 3, S1", expression: "r₁ = 1 + 2(1) = 3, j₁ = 1" },
          { label: "After pool 2, S2", expression: "r₂ = 3 + 1(1) = 4, j₂ = 2" },
          { label: "After conv 3, S1", expression: "r₃ = 4 + 2(2) = 8, j₃ = 2" },
        ],
      },
      {
        title: "Pooling Tradeoffs",
        paragraphs: [
          "Downsampling reduces computation and makes later units cover more input, but it loses precise spatial detail. Classification often tolerates this better than tasks requiring exact locations.",
          "A strided convolution can also downsample while learning its weights. Pooling remains important to understand because it appears in many architectures and exam questions.",
        ],
      },
      {
        title: "Practice",
        paragraphs: [
          "For pooling, solve output size per axis. For receptive field, track both r and j after every layer.",
        ],
        problems: [
          {
            title: "Max pooling values",
            prompt:
              "Apply non-overlapping 2 × 2 max pooling to X = [[1, 5, 2, 0], [3, 4, 1, 7], [2, 0, 6, 1], [1, 3, 2, 4]].",
            steps: [
              "Top-left maximum of [1, 5; 3, 4] is 5.",
              "Top-right maximum of [2, 0; 1, 7] is 7.",
              "Bottom-left maximum of [2, 0; 1, 3] is 3.",
              "Bottom-right maximum of [6, 1; 2, 4] is 6.",
            ],
            answer: "Pooled output = [[5, 7], [3, 6]].",
          },
          {
            title: "Pooling output shape",
            prompt:
              "Input shape is 28 × 28 × 16. Apply 2 × 2 pooling with stride 2 and no padding. Find the output shape and trainable parameters.",
            steps: [
              "Spatial size: (28 − 2)/2 + 1 = 14.",
              "Pooling operates independently on all 16 channels.",
              "Pooling owns no trainable weights or biases.",
            ],
            answer: "Output shape is 14 × 14 × 16 with 0 trainable parameters.",
          },
          {
            title: "Two stride-one convolutions",
            prompt:
              "Starting with r₀ = 1 and j₀ = 1, find the receptive field after two 3 × 3, stride-1 convolutions.",
            steps: [
              "After layer 1: r₁ = 1 + 2(1) = 3 and j₁ = 1.",
              "After layer 2: r₂ = 3 + 2(1) = 5 and j₂ = 1.",
            ],
            answer: "The receptive field is 5 × 5.",
          },
          {
            title: "Max-pool backward",
            prompt:
              "A max-pool window is [1, 5; 2, 4] and its upstream gradient is 3. Give the input gradients, assuming one unique maximum.",
            steps: [
              "The maximum value 5 is at the top-right position.",
              "Send the full upstream gradient 3 to that position.",
              "All other positions receive zero from this pooled output.",
            ],
            answer: "Input-gradient window = [[0, 3], [0, 0]].",
          },
        ],
      },
    ],
    mechanism: {
      title: "How downsampling changes representation",
      steps: [
        "Choose a local pooling window.",
        "Take its maximum or average independently per channel.",
        "Move by the pooling stride.",
        "Produce a smaller spatial map.",
        "Track jump growth caused by stride.",
        "Use jump to calculate deeper receptive-field growth.",
      ],
    },
    example: {
      title: "Why a deeper unit sees more",
      body: "A second 3 × 3 convolution combines neighbouring values that already summarize 3 × 3 input regions. Its effective view of the original input therefore becomes 5 × 5, not merely 3 × 3.",
    },
    misconception:
      "Pooling normally reduces height and width but keeps channel count. It does not add one output channel per pooling window.",
  },
  revise: {
    definition:
      "Pooling downsamples each channel; receptive field measures one unit's coverage in the original input.",
    sections: [
      {
        title: "Pooling",
        formulas: [{ expression: "Nout = floor((N + 2P − K)/S) + 1" }],
      },
      {
        title: "Receptive Field",
        formulas: [
          { expression: "rnew = rold + (Keff − 1)jold" },
          { expression: "jnew = joldS" },
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Max pooling takes the maximum; average pooling takes the mean.",
      "Pooling normally has zero trainable parameters.",
      "Channel count is normally unchanged.",
      "Max-pool gradient goes through the stored maximum.",
      "Stride increases the jump and accelerates receptive-field growth.",
    ],
    followUp:
      "Why must receptive-field calculation track jump as well as kernel size?",
  },
  lastMinute: {
    definition: "Pool to downsample; track r and j to measure coverage.",
    sections: [
      {
        title: "Backward",
        points: ["Max: gradient to argmax", "Average: divide gradient across window"],
      },
      {
        title: "Receptive Field",
        points: ["rnew = rold + (Keff − 1)jold", "jnew = joldS"],
      },
    ],
    memoryLine: "Stride spreads neighbouring outputs apart and makes later coverage grow faster.",
    cues: [
      "Pool per channel.",
      "No trainable pool weights.",
      "Two 3 × 3 stride-1 convolutions see 5 × 5.",
    ],
    trap: "Do not reset receptive field to the current kernel size at every layer.",
  },
};

export const cnnArchitectureAndTransferLearning: SubjectTopic = {
  slug: "cnn-architecture-and-transfer-learning",
  title: "CNN Architecture and Transfer Learning",
  description:
    "Assemble a classification CNN, compare flattening with global pooling, and reuse pretrained features safely.",
  readTime: "28 min",
  difficulty: "Intermediate",
  tags: ["CNN Architecture", "Global Pooling", "Transfer Learning"],
  learn: {
    opening:
      "A classification CNN transforms spatial pixels into feature maps, compresses those maps into a feature vector, and maps that vector to class predictions.",
    sections: [
      {
        title: "A Standard CNN Classification Flow",
        paragraphs: [
          "A convolution block commonly contains convolution, optional BatchNorm, and an activation such as ReLU. Downsampling is performed by pooling or a strided convolution.",
          "As the network becomes deeper, spatial dimensions commonly decrease while channel depth increases. A classification head then produces the required output classes.",
          "A residual or skip connection adds a block's input to its output when their shapes match. This direct path helps information and gradients travel through deep CNNs; a projection is used when the shapes must be changed.",
        ],
        visual: {
          src: "/notes/deep-learning/cnn-transfer-learning.png",
          alt: "CNN image-classification pipeline and transfer learning with frozen then partially unfrozen backbone",
          width: 1536,
          height: 1024,
          caption:
            "A CNN backbone extracts features; transfer learning first trains a new head, then optionally fine-tunes upper feature layers with a small learning rate.",
        },
        flow: [
          "Image",
          "Convolution blocks",
          "Downsampling",
          "Global pooling or flatten",
          "Dense output",
          "Prediction",
        ],
      },
      {
        title: "Flatten versus Global Average Pooling",
        paragraphs: [
          "Flatten reshapes H × W × C into a vector of length HWC. A following dense layer can therefore create many parameters.",
          "Global Average Pooling, or GAP, averages each feature map across all H × W positions and produces a vector of length C. GAP has no trainable parameters and preserves one summary value per channel.",
        ],
        formulas: [
          { label: "Flatten length", expression: "features = HWC" },
          { label: "GAP output", expression: "g[c] = (1/HW)ΣᵢΣⱼA[i, j, c]" },
          { label: "GAP length", expression: "features = C" },
        ],
        table: {
          headers: ["Flatten", "Global Average Pooling"],
          rows: [
            ["Vector length HWC", "Vector length C"],
            ["May create a large dense head", "Usually creates a smaller head"],
            ["Keeps every location as a separate value", "Averages spatial positions"],
          ],
        },
      },
      {
        title: "Output Layer and Loss",
        paragraphs: [
          "Single-label C-class classification normally uses C logits followed by softmax conceptually and categorical cross-entropy. Binary classification can use one logit with sigmoid and BCE.",
          "Multi-label classification uses one independent sigmoid logit per label and BCE per label. Stable library losses often expect raw logits, as explained in Module 2.",
        ],
        dataTable: {
          headers: ["Task", "Output", "Loss"],
          rows: [
            ["Binary", "1 logit", "BCE from logits"],
            ["Single-label C-class", "C logits", "Cross-entropy from logits"],
            ["Multi-label with C labels", "C independent logits", "BCE from logits"],
          ],
        },
      },
      {
        title: "Complete Architecture Numerical",
        paragraphs: [
          "Assume biases are enabled, convolutions use 3 × 3 same padding and stride 1, pooling is 2 × 2 with stride 2, and there is no BatchNorm.",
        ],
        dataTable: {
          headers: ["Stage", "Output shape", "Parameters"],
          rows: [
            ["Input", "32 × 32 × 3", "0"],
            ["Conv, 16 filters", "32 × 32 × 16", "(3×3×3+1)16 = 448"],
            ["MaxPool", "16 × 16 × 16", "0"],
            ["Conv, 32 filters", "16 × 16 × 32", "(3×3×16+1)32 = 4,640"],
            ["GAP", "32", "0"],
            ["Dense, 10 outputs", "10", "32×10+10 = 330"],
          ],
        },
        formulas: [
          { label: "Total trainable parameters", expression: "448 + 4,640 + 330 = 5,418" },
        ],
      },
      {
        title: "Transfer Learning",
        paragraphs: [
          "Transfer learning starts from a model pretrained on a large source dataset. Its convolutional backbone already contains broadly useful visual features.",
          "Replace the original classification head with a new head matching the target classes. First freeze the backbone and train the new head. Then, if validation evidence supports it, unfreeze selected upper layers and fine-tune them with a smaller learning rate.",
        ],
      },
      {
        title: "Transfer-Learning Rules",
        paragraphs: [
          "Use the input size and normalization expected by the pretrained backbone. A mismatch in preprocessing can damage otherwise useful pretrained features.",
          "Fine-tuning too many layers with a large learning rate can overwrite useful features, called catastrophic forgetting. A target domain very different from the source may require more layers to adapt.",
          "Apply data augmentation only when it preserves the label. Small crops or horizontal flips may suit ordinary object photos, but a flip can be wrong for text, directional signs, or medically meaningful left-right orientation.",
        ],
        points: [
          "Match input channels, size, and normalization.",
          "Train the new head before broad fine-tuning.",
          "Use validation data to choose how many layers to unfreeze.",
          "Use a smaller learning rate for pretrained weights.",
          "Keep training and inference modes correct for BatchNorm and dropout.",
          "Use only label-preserving augmentation and validate its effect.",
        ],
      },
      {
        title: "Practice",
        paragraphs: [
          "Track shapes from left to right and count only parameters belonging to trainable layers.",
        ],
        problems: [
          {
            title: "Flatten versus GAP",
            prompt:
              "A final feature tensor is 7 × 7 × 512. Find the vector length after flattening and after GAP.",
            steps: [
              "Flatten length = 7 × 7 × 512 = 25,088.",
              "GAP returns one mean per channel.",
              "GAP length = 512.",
            ],
            answer: "Flatten: 25,088 features. GAP: 512 features.",
          },
          {
            title: "Dense-head parameter difference",
            prompt:
              "Using the previous tensor, a classifier has 10 outputs. Compare dense parameters after flattening and after GAP, including bias.",
            steps: [
              "Flatten head = 25,088 × 10 + 10 = 250,890.",
              "GAP head = 512 × 10 + 10 = 5,130.",
              "GAP greatly reduces the dense-head parameter count.",
            ],
            answer: "Flatten head: 250,890 parameters. GAP head: 5,130 parameters.",
          },
          {
            title: "Frozen trainable count",
            prompt:
              "A pretrained backbone has 1,200,000 parameters and a new head has 5,130. If the backbone is frozen, how many parameters are trainable? If a 200,000-parameter upper block is later unfrozen, what is the new trainable count?",
            steps: [
              "Frozen backbone contributes zero trainable parameters.",
              "Head-only training has 5,130 trainable parameters.",
              "After unfreezing: 200,000 + 5,130 = 205,130.",
            ],
            answer: "Initially 5,130; after unfreezing the block, 205,130 trainable parameters.",
          },
          {
            title: "Choose the output",
            prompt:
              "A task assigns any number of 12 tags to each image. What output structure and loss should be used?",
            steps: [
              "The labels are not mutually exclusive.",
              "Use one independent output logit for every tag.",
              "Train with BCE from logits across the 12 labels.",
            ],
            answer: "Use 12 sigmoid-style logits and multi-label BCE from logits.",
          },
        ],
      },
    ],
    mechanism: {
      title: "How to build and adapt a classifier",
      steps: [
        "Define input shape and target type.",
        "Stack convolution blocks while tracking H, W, and C.",
        "Downsample enough to control computation.",
        "Use GAP or flatten to form the classifier input.",
        "Match output logits and loss to the target.",
        "For transfer learning, train a new head before careful fine-tuning.",
      ],
    },
    example: {
      title: "Small labelled dataset",
      body: "When only a modest number of labelled images are available, a pretrained backbone with a small new head often generalizes better and trains faster than learning every visual filter from random initialization.",
    },
    misconception:
      "Freezing a pretrained backbone does not stop all training. The new classification head remains trainable, and selected backbone layers can be unfrozen later.",
  },
  revise: {
    definition:
      "A CNN backbone extracts spatial features; a classification head converts them to task outputs.",
    sections: [
      {
        title: "Architecture",
        flow: ["Image", "Conv blocks", "Downsample", "GAP/flatten", "Dense logits"],
      },
      {
        title: "Transfer",
        flow: ["Load pretrained backbone", "Replace head", "Freeze and train head", "Fine-tune upper layers"],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Spatial size commonly falls while channel count grows.",
      "Flatten length is HWC; GAP length is C.",
      "GAP has no trainable parameters.",
      "Match output logits and loss to the target type.",
      "Fine-tune pretrained weights with a smaller learning rate.",
    ],
    followUp:
      "Why can GAP greatly reduce overfitting risk compared with flattening before a dense classifier?",
  },
  lastMinute: {
    definition: "Backbone extracts; head predicts.",
    sections: [
      {
        title: "CNN Flow",
        flow: ["Image", "Conv", "Downsample", "GAP", "Logits"],
        wide: true,
      },
      {
        title: "Transfer Order",
        points: ["Match preprocessing", "Freeze backbone", "Train head", "Unfreeze upper layers", "Use small η"],
      },
    ],
    memoryLine: "Reuse general visual features, then adapt only as much as the target needs.",
    cues: [
      "Single-label → softmax-style logits and CE.",
      "Multi-label → independent logits and BCE.",
      "Trainable count excludes frozen parameters.",
    ],
    trap: "Do not fine-tune a pretrained backbone immediately with the same large learning rate used for a new head.",
  },
};
