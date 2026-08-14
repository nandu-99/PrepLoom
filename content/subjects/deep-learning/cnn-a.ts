import type { SubjectTopic } from "@/lib/subject-content";

export const imageTensorsAndCnnIntuition: SubjectTopic = {
  slug: "image-tensors-and-cnn-intuition",
  title: "Image Tensors and CNN Intuition",
  description:
    "Understand image shapes, local connectivity, weight sharing, and why CNNs suit spatial data.",
  readTime: "20 min",
  difficulty: "Foundation",
  tags: ["CNN", "Image Tensor", "Weight Sharing"],
  learn: {
    opening:
      "An image is a structured tensor: nearby pixels are related, and the same visual pattern can appear in many positions. A Convolutional Neural Network uses these two facts directly.",
    sections: [
      {
        title: "Images as Tensors",
        paragraphs: [
          "A grayscale image usually has one channel, while an RGB image has three channels. Its unbatched shape can be written H × W × C, where H is height, W is width, and C is channel count.",
          "Libraries commonly store a batch as B × H × W × C, called channels-last, or B × C × H × W, called channels-first. The numbers represent the same data in a different axis order.",
        ],
        dataTable: {
          headers: ["Tensor", "Example shape"],
          rows: [
            ["One grayscale image", "28 × 28 × 1"],
            ["One RGB image", "224 × 224 × 3"],
            ["Batch, channels-last", "32 × 224 × 224 × 3"],
            ["Batch, channels-first", "32 × 3 × 224 × 224"],
          ],
        },
      },
      {
        title: "Local Connectivity",
        paragraphs: [
          "A dense neuron connects to every input value. A convolution output connects only to a small local window such as 3 × 3. This local region is its immediate receptive field.",
          "Local connectivity preserves nearby structure and reduces the number of connections. It is a useful assumption for images because edges, corners, and textures are built from nearby pixels.",
        ],
        visual: {
          src: "/notes/deep-learning/cnn-spatial-weight-sharing.png",
          alt: "Image tensor with local windows using the same shared filter to create a feature map",
          width: 1536,
          height: 1024,
          caption:
            "One local filter is reused across the image, producing one spatial feature map.",
        },
      },
      {
        title: "Weight Sharing",
        paragraphs: [
          "The same filter weights are applied at every valid spatial position. This is weight sharing. The filter can detect the same pattern wherever that pattern appears.",
          "Sharing greatly reduces parameter count compared with learning a separate detector at every position. A filter's parameters depend on kernel size and channel depth, not on how many spatial positions it visits.",
        ],
      },
      {
        title: "Feature Maps and Feature Hierarchies",
        paragraphs: [
          "Sliding one filter over an image produces one feature map. A high value at a location means the local input strongly matches the pattern represented by that filter.",
          "Early CNN layers often respond to simple patterns such as edges. Deeper layers combine earlier maps into textures, parts, and task-specific structures. These interpretations are common intuition, not a fixed rule for every learned filter.",
        ],
      },
      {
        title: "Equivariance, Not Automatic Invariance",
        paragraphs: [
          "A convolution is translation equivariant: when an input pattern shifts, its feature response also shifts, apart from boundary and sampling effects.",
          "Equivariance is not the same as invariance. An invariant output stays unchanged after a transformation. Pooling, aggregation, training data, and later layers can make final predictions less sensitive to small shifts, but convolution alone does not guarantee complete invariance.",
        ],
        table: {
          headers: ["Equivariance", "Invariance"],
          rows: [
            ["Output moves when input moves", "Output stays unchanged"],
            ["Convolution approximately provides it", "Requires aggregation or learned robustness"],
          ],
        },
      },
      {
        title: "Practice",
        paragraphs: [
          "Read the axis order before interpreting any tensor shape.",
        ],
        problems: [
          {
            title: "Image batch shape",
            prompt:
              "A batch contains 64 RGB images of height 128 and width 96. Give channels-last and channels-first shapes.",
            steps: [
              "Batch size B = 64, H = 128, W = 96, and C = 3.",
              "Channels-last order is B × H × W × C.",
              "Channels-first order is B × C × H × W.",
            ],
            answer: "Channels-last: 64 × 128 × 96 × 3. Channels-first: 64 × 3 × 128 × 96.",
          },
          {
            title: "Number of image values",
            prompt: "How many scalar pixel-channel values are in one 32 × 32 RGB image?",
            steps: ["RGB gives C = 3.", "Values = H × W × C = 32 × 32 × 3."],
            answer: "The image contains 3,072 scalar values.",
          },
          {
            title: "Equivariance or invariance",
            prompt:
              "An edge moves five pixels to the right and the corresponding feature-map response also moves right. Is this equivariance or invariance?",
            steps: [
              "The output did not stay at the same location.",
              "It transformed in a matching way with the input shift.",
            ],
            answer: "This is translation equivariance.",
          },
        ],
      },
    ],
    mechanism: {
      title: "How a CNN uses image structure",
      steps: [
        "Receive an image tensor with spatial and channel axes.",
        "Read a small local window.",
        "Apply one shared filter to that window.",
        "Move the filter across spatial positions.",
        "Store the responses as a feature map.",
        "Stack layers so later features combine earlier local patterns.",
      ],
    },
    example: {
      title: "One edge detector",
      body: "A filter that responds to a vertical edge can reuse the same weights near the left, center, or right side of an image. It does not need a separate edge detector for each location.",
    },
    misconception:
      "A CNN does not ignore spatial position. Its feature maps preserve position, and convolution gives equivariance rather than guaranteed invariance.",
  },
  revise: {
    definition:
      "A CNN applies shared filters to local image regions and stores responses in feature maps.",
    sections: [
      {
        title: "Shapes",
        points: ["Image: H × W × C", "NHWC: B × H × W × C", "NCHW: B × C × H × W"],
      },
      {
        title: "Core Ideas",
        flow: ["Local window", "Shared filter", "Feature map", "Deeper features"],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Local connectivity uses nearby values.",
      "Weight sharing reuses one detector across positions.",
      "One filter creates one feature map.",
      "CNN parameters do not grow with every spatial location.",
      "Convolution is translation equivariant, not automatically invariant.",
    ],
    followUp:
      "Why does sharing one filter across positions reduce parameters and help detect translated patterns?",
  },
  lastMinute: {
    definition: "CNN = local connections plus shared weights.",
    sections: [
      {
        title: "Tensor",
        points: ["H: height", "W: width", "C: channels", "B: batch"],
      },
      {
        title: "Flow",
        flow: ["Image", "Local filter", "Feature map", "Feature hierarchy"],
        wide: true,
      },
    ],
    memoryLine: "The same small detector searches every spatial position.",
    cues: [
      "RGB has three input channels.",
      "Axis order differs across libraries.",
      "Shifted input → shifted feature response.",
    ],
    trap: "Do not call convolution completely translation invariant.",
  },
};

export const convolutionOperationAndFeatureMaps: SubjectTopic = {
  slug: "convolution-operation-and-feature-maps",
  title: "Convolution Operation and Feature Maps",
  description:
    "Slide a kernel over local patches, calculate responses, and build a complete feature map.",
  readTime: "25 min",
  difficulty: "Intermediate",
  tags: ["Convolution", "Kernel", "Numericals"],
  learn: {
    opening:
      "At each position, convolution multiplies a local input patch by a filter, adds the products, and usually adds one filter bias.",
    sections: [
      {
        title: "Kernel, Filter, and Local Patch",
        paragraphs: [
          "Kernel and filter are often used as the same word. A filter is a small trainable tensor whose spatial size might be 3 × 3. Its depth must match the input channel count.",
          "At one location, the filter and local input patch have matching shapes. Their corresponding values are multiplied and summed, then the filter bias is added.",
          "In the formula below, Xpad means the input after the stated padding has been added. Positions outside the original image therefore read the padding value, commonly zero.",
        ],
        formulas: [
          {
            label: "One output position",
            expression: "Z[i,j,f] = ΣᵤΣᵥΣ꜀ Xpad[iSₕ+uDₕ, jS𝓌+vD𝓌, c]W[u,v,c,f] + b[f]",
          },
        ],
        visual: {
          src: "/notes/deep-learning/convolution-calculation.png",
          alt: "Exact elementwise convolution calculation for a two by two patch, kernel, bias, and output",
          width: 1536,
          height: 1024,
          caption:
            "Multiply corresponding patch and kernel values, sum them, and add the filter bias.",
        },
      },
      {
        title: "What Libraries Call Convolution",
        paragraphs: [
          "Mathematical convolution flips the kernel before sliding. Deep-learning libraries normally do not flip it; they calculate cross-correlation but call the operation convolution.",
          "Because the kernel values are learned, this naming difference does not reduce the model's ability to learn useful patterns. For hand calculations, follow the convention stated in the question.",
        ],
      },
      {
        title: "Sliding Creates a Feature Map",
        paragraphs: [
          "After calculating one response, the filter moves horizontally and vertically. Every legal location contributes one value to the feature map.",
          "The output before activation is commonly written Z. An activation such as ReLU is then applied elementwise to produce A. Convolution is the affine operation; ReLU is a separate operation.",
        ],
        formulas: [
          { label: "Activation after convolution", expression: "A = f(Z)" },
        ],
      },
      {
        title: "Complete Single-Channel Numerical",
        paragraphs: [
          "Use cross-correlation, stride 1, no padding, and bias 0. The 3 × 3 input and 2 × 2 kernel produce a 2 × 2 feature map.",
        ],
        formulas: [
          { label: "Input", expression: "X = [[1, 2, 0], [3, 1, 2], [0, 1, 3]]" },
          { label: "Kernel", expression: "K = [[1, 0], [0, −1]]" },
          { label: "Top-left", expression: "1(1) + 2(0) + 3(0) + 1(−1) = 0" },
          { label: "Top-right", expression: "2(1) + 0(0) + 1(0) + 2(−1) = 0" },
          { label: "Bottom-left", expression: "3(1) + 1(0) + 0(0) + 1(−1) = 2" },
          { label: "Bottom-right", expression: "1(1) + 2(0) + 1(0) + 3(−1) = −2" },
          { label: "Feature map", expression: "Z = [[0, 0], [2, −2]]" },
        ],
      },
      {
        title: "Learned Filters and Backpropagation",
        paragraphs: [
          "Filters are normally learned rather than manually chosen. Backpropagation calculates how every shared filter value affects the loss at all positions where it was used.",
          "Because one weight is reused, its total gradient adds contributions from all relevant spatial positions and all examples in the batch.",
        ],
      },
      {
        title: "Practice",
        paragraphs: [
          "At each output position, write the local patch first and keep the multiplication order aligned.",
        ],
        problems: [
          {
            title: "One convolution response",
            prompt:
              "Patch X = [[2, 1], [0, 3]], kernel K = [[1, −1], [2, 0]], and bias b = 0.5. Find the output.",
            steps: [
              "Elementwise products are [2, −1, 0, 0].",
              "Product sum = 2 − 1 + 0 + 0 = 1.",
              "Add bias: 1 + 0.5 = 1.5.",
            ],
            answer: "The output value is 1.5.",
          },
          {
            title: "Apply ReLU",
            prompt: "A pre-activation feature map is Z = [[−2, 0], [3, −1]]. Find ReLU(Z).",
            steps: ["Replace negative values with zero.", "Keep zero and positive values unchanged."],
            answer: "ReLU(Z) = [[0, 0], [3, 0]].",
          },
          {
            title: "Output locations",
            prompt:
              "A 4 × 4 single-channel input uses a 2 × 2 kernel, stride 1, and no padding. How many output values are calculated?",
            steps: [
              "The kernel has 3 legal horizontal positions and 3 legal vertical positions.",
              "Feature-map shape = 3 × 3.",
              "Total values = 3 × 3 = 9.",
            ],
            answer: "Nine output values are calculated.",
          },
        ],
      },
    ],
    mechanism: {
      title: "How one feature map is produced",
      steps: [
        "Select a local input patch matching the filter shape.",
        "Multiply corresponding input and filter values.",
        "Sum all products across height, width, and input channels.",
        "Add the filter bias.",
        "Move by the chosen stride and repeat.",
        "Apply the activation to the completed pre-activation map.",
      ],
    },
    example: {
      title: "Positive and negative response",
      body: "A learned filter may produce a strong positive value for one orientation and a negative value for the opposite pattern. A following ReLU keeps only positive evidence.",
    },
    misconception:
      "The kernel does not perform ordinary matrix multiplication with the whole image. It uses elementwise products on one matching local patch at a time.",
  },
  revise: {
    definition:
      "Convolution forms each output value from an elementwise patch-filter product, a sum, and a bias.",
    sections: [
      {
        title: "One Position",
        flow: ["Local patch", "Elementwise multiply", "Sum", "Add bias", "Output value"],
      },
      {
        title: "Convention",
        points: [
          "Deep-learning convolution normally means cross-correlation.",
          "Convolution output Z and activation A are separate.",
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Filter depth matches input depth.",
      "One filter visits every legal spatial position.",
      "One filter produces one pre-activation feature map.",
      "The same bias is used at every position of that filter's map.",
      "Shared-weight gradients add across positions.",
    ],
    followUp:
      "Why are gradient contributions from all spatial uses added for one shared filter weight?",
  },
  lastMinute: {
    definition: "Patch ⊙ filter → sum → bias → feature value.",
    sections: [
      {
        title: "Map Construction",
        flow: ["Calculate one position", "Move filter", "Repeat", "Apply activation"],
        wide: true,
      },
      {
        title: "Remember",
        points: ["Libraries usually do not flip the kernel", "Filter is learned", "Bias is one per filter"],
      },
    ],
    memoryLine: "One shared local dot product fills a spatial response map.",
    cues: [
      "Align patch and kernel values.",
      "Sum across every input channel.",
      "ReLU is applied after the affine convolution.",
    ],
    trap: "Do not flip the kernel unless the question explicitly uses mathematical convolution.",
  },
};

export const paddingStrideAndOutputSize: SubjectTopic = {
  slug: "padding-stride-and-output-size",
  title: "Padding, Stride, and Output Size",
  description:
    "Control feature-map dimensions and solve convolution output-shape numericals.",
  readTime: "25 min",
  difficulty: "Intermediate",
  tags: ["Padding", "Stride", "Output Shape"],
  learn: {
    opening:
      "Padding controls boundary access, stride controls movement distance, and together they determine a convolution's spatial output size.",
    sections: [
      {
        title: "Padding",
        paragraphs: [
          "Padding adds values around the input boundary, commonly zeros. Valid convolution uses no padding and normally shrinks the spatial dimensions.",
          "Same padding aims to preserve spatial size when stride is 1. For an odd kernel K with dilation 1, symmetric padding P = (K − 1)/2 preserves that dimension.",
        ],
        formulas: [
          { label: "Odd kernel, stride 1", expression: "Psame = (K − 1)/2" },
        ],
      },
      {
        title: "Stride",
        paragraphs: [
          "Stride S is the number of input positions moved between neighbouring outputs. Stride 1 checks adjacent locations; stride 2 skips one position and downsamples more strongly.",
          "A larger stride reduces spatial size and computation, but it can discard fine location information.",
        ],
        visual: {
          src: "/notes/deep-learning/padding-stride-output-size.png",
          alt: "Conceptual comparison of valid padding, same padding, and stride two with exact output dimensions",
          width: 1536,
          height: 1024,
          caption:
            "For a 5 × 5 input and 3 × 3 kernel: valid gives 3 × 3, same gives 5 × 5, and stride 2 valid gives 2 × 2.",
        },
      },
      {
        title: "General Output Formula",
        paragraphs: [
          "Calculate height and width separately. The floor means a final partial window is not used unless additional padding makes it legal.",
          "Dilation D spaces kernel elements apart. Its effective kernel size is D(K − 1) + 1. Normal convolution has D = 1.",
        ],
        formulas: [
          { label: "Effective kernel", expression: "Keff = D(K − 1) + 1" },
          {
            label: "One spatial dimension",
            expression: "Nout = ⌊(N + 2P − D(K − 1) − 1)/S⌋ + 1",
          },
          {
            label: "No dilation shortcut",
            expression: "Nout = ⌊(N + 2P − K)/S⌋ + 1",
          },
        ],
      },
      {
        title: "Height and Width May Differ",
        paragraphs: [
          "For a rectangular input, calculate height and width independently, including a separate dilation for each axis when needed.",
          "The number of output channels is not decided by this spatial formula. It equals the number of filters and is covered in the next topic.",
        ],
        formulas: [
          { label: "Output height", expression: "Hout = ⌊(H + 2Pₕ − Dₕ(Kₕ − 1) − 1)/Sₕ⌋ + 1" },
          { label: "Output width", expression: "Wout = ⌊(W + 2P𝓌 − D𝓌(K𝓌 − 1) − 1)/S𝓌⌋ + 1" },
        ],
      },
      {
        title: "Same Padding with Stride Greater Than One",
        paragraphs: [
          "Many libraries define same padding with output size ⌈N/S⌉. The total required padding can be uneven, so one side may receive one more padded value than the other.",
          "Do not automatically use P = (K − 1)/2 when stride is greater than one. Use the library definition or calculate the required total padding.",
        ],
        formulas: [
          { label: "Common same-padding target", expression: "Nout = ⌈N/S⌉" },
        ],
      },
      {
        title: "Practice",
        paragraphs: [
          "Substitute values into the numerator first, divide by stride, apply floor, and add 1.",
        ],
        problems: [
          {
            title: "Same spatial size",
            prompt: "Input N = 32, kernel K = 5, padding P = 2, stride S = 1, dilation D = 1. Find Nout.",
            steps: [
              "Nout = ⌊(32 + 2(2) − 5)/1⌋ + 1.",
              "Nout = 31 + 1 = 32.",
            ],
            answer: "The output size is 32.",
          },
          {
            title: "Floor with stride",
            prompt: "Input N = 28, kernel K = 3, padding P = 0, and stride S = 2. Find Nout.",
            steps: [
              "Nout = ⌊(28 − 3)/2⌋ + 1.",
              "25/2 = 12.5, so floor gives 12.",
              "Nout = 12 + 1 = 13.",
            ],
            answer: "The output size is 13.",
          },
          {
            title: "Rectangular output",
            prompt:
              "An input is 20 × 30. A 3 × 5 kernel uses no padding and stride 1. Find Hout × Wout.",
            steps: [
              "Hout = (20 − 3) + 1 = 18.",
              "Wout = (30 − 5) + 1 = 26.",
            ],
            answer: "The spatial output is 18 × 26.",
          },
          {
            title: "Dilated kernel",
            prompt: "Input N = 15, kernel K = 3, dilation D = 2, padding P = 0, and stride S = 1. Find the effective kernel and output size.",
            steps: [
              "Keff = 2(3 − 1) + 1 = 5.",
              "Nout = (15 − 5)/1 + 1 = 11.",
            ],
            answer: "Effective kernel size is 5 and output size is 11.",
          },
        ],
      },
    ],
    mechanism: {
      title: "How to solve an output-shape question",
      steps: [
        "Write input, kernel, padding, stride, and dilation for each axis.",
        "Calculate effective kernel size if dilation is present.",
        "Substitute into the output formula.",
        "Apply floor before adding 1.",
        "Repeat separately for height and width.",
        "Append the output channel count from the number of filters.",
      ],
    },
    example: {
      title: "Why floor appears",
      body: "If the final movement would place part of the kernel outside the padded input, that partial position is excluded. Floor counts only complete legal positions.",
    },
    misconception:
      "Same padding does not always mean symmetric P = (K − 1)/2. That shortcut is safest for odd kernels, stride 1, and dilation 1.",
  },
  revise: {
    definition:
      "Padding changes the usable boundary; stride changes movement; both control spatial output size.",
    sections: [
      {
        title: "Formula",
        formulas: [
          { expression: "Keff = D(K − 1) + 1" },
          { expression: "Nout = ⌊(N + 2P − Keff)/S⌋ + 1" },
        ],
      },
      {
        title: "Effects",
        table: {
          headers: ["Choice", "Effect"],
          rows: [
            ["More padding", "Preserves more boundary size"],
            ["Larger stride", "Smaller output"],
            ["Larger dilation", "Larger effective kernel"],
          ],
        },
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Valid normally means P = 0.",
      "Odd-K same padding at S = 1 uses P = (K − 1)/2.",
      "Apply floor before adding 1.",
      "Calculate height and width separately.",
      "Same padding with S > 1 may be asymmetric.",
    ],
    followUp:
      "Why can same padding require different amounts on the two sides when stride is greater than one?",
  },
  lastMinute: {
    definition: "Output size comes from input, effective kernel, padding, and stride.",
    sections: [
      {
        title: "Formula",
        points: ["Keff = D(K − 1) + 1", "Nout = floor((N + 2P − Keff)/S) + 1"],
      },
      {
        title: "Fast Effects",
        points: ["Padding preserves", "Stride downsamples", "Dilation expands coverage"],
      },
    ],
    memoryLine: "Effective input space minus effective kernel, step by stride, then add one.",
    cues: [
      "Use floor.",
      "Solve H and W independently.",
      "Output depth comes from filter count.",
    ],
    trap: "Do not forget the final +1 or assume every same-padding case uses symmetric padding.",
  },
};
