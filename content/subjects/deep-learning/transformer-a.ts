import type { SubjectTopic } from "@/lib/subject-content";

export const sequenceToSequenceAndAttentionIntuition: SubjectTopic = {
  slug: "sequence-to-sequence-and-attention-intuition",
  title: "Sequence-to-Sequence Models and Attention Intuition",
  description:
    "Understand encoder-decoder learning, attention scores, normalized weights, and context vectors.",
  readTime: "24 min",
  difficulty: "Intermediate",
  tags: ["Attention", "Encoder-Decoder", "Context Vector"],
  learn: {
    opening:
      "A sequence-to-sequence model maps an input sequence to an output sequence. Attention lets each output step build a context from all encoder states instead of depending on one fixed summary.",
    sections: [
      {
        title: "Basic Encoder-Decoder Model",
        paragraphs: [
          "The encoder reads input elements and produces hidden states h₁ through hₙ. A basic model may compress them into one final state, which the decoder uses to produce the output sequence.",
          "A single fixed vector can become a bottleneck for long or information-rich inputs. Attention gives the decoder direct weighted access to all encoder states at every output step.",
        ],
      },
      {
        title: "Score, Weight, and Context",
        paragraphs: [
          "At decoder step t, the decoder query is compared with every encoder key. The comparison produces one score per input position. Softmax changes these scores into non-negative weights that sum to 1.",
          "The context vector is the weighted sum of the encoder value vectors. A larger weight gives that input position more influence on the current decoder step.",
        ],
        formulas: [
          { label: "Score", expression: "eₜᵢ = score(qₜ, kᵢ)" },
          { label: "Attention weight", expression: "αₜᵢ = exp(eₜᵢ) / Σⱼ exp(eₜⱼ)" },
          { label: "Context vector", expression: "cₜ = Σᵢ αₜᵢvᵢ" },
          { label: "Weight rule", expression: "Σᵢ αₜᵢ = 1" },
        ],
        visual: {
          src: "/notes/deep-learning/attention-encoder-context.png",
          alt: "A decoder query scoring encoder states and combining them with attention weights into one context vector",
          width: 1536,
          height: 1024,
          caption:
            "Scores pass through softmax before the resulting weights form a context vector.",
        },
      },
      {
        title: "Queries, Keys, and Values",
        paragraphs: [
          "A query represents what the current position is looking for. A key represents what each available position can be matched by. A value contains the information that will be combined.",
          "In encoder-decoder attention, the decoder supplies queries while encoder outputs supply keys and values. In self-attention, queries, keys, and values are projected from the same input sequence.",
        ],
        table: {
          headers: ["Part", "Simple meaning"],
          rows: [
            ["Query", "What information is needed?"],
            ["Key", "What information does this position match?"],
            ["Value", "What information should this position contribute?"],
          ],
        },
      },
      {
        title: "Worked Attention Numerical",
        paragraphs: [
          "Suppose two positions receive scores [1, 2] and have values v₁ = [1, 0] and v₂ = [0, 2].",
        ],
        formulas: [
          { label: "Softmax denominator", expression: "e¹ + e² ≈ 2.718 + 7.389 = 10.107" },
          { label: "Weights", expression: "α ≈ [0.269, 0.731]" },
          { label: "Context", expression: "c = 0.269[1,0] + 0.731[0,2] = [0.269, 1.462]" },
        ],
      },
      {
        title: "What Attention Does and Does Not Mean",
        paragraphs: [
          "Attention creates content-dependent connections and short gradient paths between positions. Unlike a basic recurrent path, distant positions do not need to pass information through every intermediate time step.",
          "An attention weight shows influence inside a specific calculation. It is not automatically a complete explanation of the model's decision and does not prove causation.",
        ],
      },
      {
        title: "Practice",
        paragraphs: ["Normalize scores before combining values."],
        problems: [
          {
            title: "Uniform attention",
            prompt: "Three positions have equal scores [0, 0, 0]. Find their softmax weights.",
            steps: ["Each exponential is e⁰ = 1.", "The denominator is 3.", "Every weight is 1/3."],
            answer: "The weights are [1/3, 1/3, 1/3].",
          },
          {
            title: "Weighted context",
            prompt: "Weights are [0.25, 0.75] and scalar values are [4, 8]. Find the context value.",
            steps: ["Multiply each value by its weight.", "c = 0.25×4 + 0.75×8 = 1 + 6."],
            answer: "The context value is 7.",
          },
          {
            title: "Identify the sources",
            prompt: "In encoder-decoder attention, which component normally supplies queries and which supplies keys and values?",
            steps: ["The decoder is deciding what it needs now.", "Encoder states contain input information."],
            answer: "The decoder supplies queries; encoder outputs supply keys and values.",
          },
        ],
      },
    ],
    mechanism: {
      title: "How one attention context is created",
      steps: [
        "Create the current query.",
        "Compare it with every available key.",
        "Apply softmax across the resulting scores.",
        "Multiply each value by its attention weight.",
        "Add the weighted values into one context.",
        "Use that context in the current prediction.",
      ],
    },
    example: {
      title: "Different output steps need different input parts",
      body: "While producing a multi-word output, one decoder step may focus strongly on the first input position while a later step focuses on a different position.",
    },
    misconception:
      "Attention does not simply select one position. Standard soft attention forms a weighted combination of all unmasked values.",
  },
  revise: {
    definition:
      "Attention scores available positions, normalizes the scores, and forms a weighted sum of their values.",
    sections: [
      {
        title: "Core Flow",
        flow: ["Query-key scores", "Softmax weights", "Weighted values", "Context"],
      },
      {
        title: "Equations",
        formulas: [
          { expression: "αₜᵢ = softmax(eₜᵢ)" },
          { expression: "cₜ = Σᵢ αₜᵢvᵢ" },
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Queries ask; keys match; values contribute.",
      "Softmax weights are non-negative and sum to 1.",
      "A context vector is a weighted sum.",
      "Each decoder step can use different weights.",
      "Attention weights are not guaranteed explanations.",
    ],
    followUp: "Why does attention reduce the fixed-context bottleneck?",
  },
  lastMinute: {
    definition: "Attention = score, softmax, weighted sum.",
    sections: [
      { title: "Roles", points: ["Query: request", "Key: match", "Value: content"] },
      { title: "Flow", flow: ["Scores", "Weights", "Context", "Prediction"], wide: true },
    ],
    memoryLine: "Match the query to keys, then mix the values.",
    cues: ["Weights sum to 1.", "Context has the value dimension.", "Masked positions must receive zero weight."],
    trap: "Do not multiply raw scores directly by values before softmax.",
  },
};

export const scaledDotProductAttention: SubjectTopic = {
  slug: "scaled-dot-product-attention",
  title: "Queries, Keys, Values, and Scaled Dot-Product Attention",
  description:
    "Calculate attention matrices, track Q-K-V shapes, apply scaling, softmax, masks, and weighted values.",
  readTime: "30 min",
  difficulty: "Advanced",
  tags: ["QKV", "Scaled Dot Product", "Numericals"],
  learn: {
    opening:
      "Scaled dot-product attention compares every query with keys using dot products, scales the scores, applies masking and softmax, then combines the values.",
    sections: [
      {
        title: "The Attention Equation",
        paragraphs: [
          "Let Q contain n_q queries, K contain n_k keys, and V contain n_k values. Keys and values must describe the same available positions.",
          "The score matrix has one row per query and one column per key. Softmax is applied across each row so every query receives its own distribution over keys.",
        ],
        formulas: [
          { label: "Scaled dot-product attention", expression: "Attention(Q,K,V) = softmax(QKᵀ / √dₖ)V" },
        ],
        dataTable: {
          headers: ["Matrix", "Shape"],
          rows: [
            ["Q", "nq × dₖ"],
            ["K", "nk × dₖ"],
            ["V", "nk × dv"],
            ["QKᵀ", "nq × nk"],
            ["Attention output", "nq × dv"],
          ],
        },
        visual: {
          src: "/notes/deep-learning/scaled-dot-product-attention.png",
          alt: "Scaled dot-product attention pipeline from Q and K transpose through scaling and softmax to multiplication with V",
          width: 1536,
          height: 1024,
          caption: "The operation order is score, scale, mask, softmax, and weighted-value multiplication.",
        },
      },
      {
        title: "Why Divide by the Square Root of dₖ?",
        paragraphs: [
          "When query and key components have roughly unit variance, their dot product variance grows with dₖ. Large scores can make softmax almost one-hot and produce very small gradients.",
          "Dividing by √dₖ keeps score magnitude more controlled. It does not change the matrix shape.",
        ],
      },
      {
        title: "Masks Are Added Before Softmax",
        paragraphs: [
          "A blocked score receives a very large negative value, conceptually −∞, before softmax. Its exponential becomes zero, so the final attention weight is zero.",
          "Padding masks block placeholder positions. Causal masks block future positions. Several masks can be combined when both rules are required.",
        ],
        formulas: [
          { label: "Masked attention", expression: "softmax(QKᵀ/√dₖ + M)V" },
          { label: "Mask entries", expression: "Mᵢⱼ = 0 if allowed;  Mᵢⱼ = −∞ if blocked" },
        ],
      },
      {
        title: "Complete Numerical",
        paragraphs: [
          "Use one query q = [1, 0], keys k₁ = [1, 0], k₂ = [0, 1], values v₁ = [2, 0], v₂ = [0, 4], and dₖ = 2.",
        ],
        formulas: [
          { label: "Dot products", expression: "qKᵀ = [1, 0]" },
          { label: "Scaled scores", expression: "[1,0]/√2 ≈ [0.707,0]" },
          { label: "Softmax weights", expression: "softmax([0.707,0]) ≈ [0.670,0.330]" },
          { label: "Output", expression: "0.670[2,0] + 0.330[0,4] = [1.340,1.320]" },
        ],
      },
      {
        title: "Self-Attention and Cross-Attention Shapes",
        paragraphs: [
          "In self-attention, Q, K, and V come from the same sequence, so n_q = n_k = T and the score matrix is T × T.",
          "In cross-attention, queries and key-value positions may have different lengths. If the decoder length is T_y and encoder length is T_x, scores have shape T_y × T_x.",
        ],
      },
      {
        title: "Practice",
        paragraphs: ["Check inner matrix dimensions before calculating values."],
        problems: [
          {
            title: "Attention shapes",
            prompt: "Q is 5 × 8, K is 7 × 8, and V is 7 × 12. Find the score and output shapes.",
            steps: ["QKᵀ multiplies 5 × 8 by 8 × 7.", "Scores are 5 × 7.", "A 5 × 7 weight matrix multiplies V of shape 7 × 12."],
            answer: "Score shape: 5 × 7. Output shape: 5 × 12.",
          },
          {
            title: "Uniform dot products",
            prompt: "One query has scaled scores [2, 2] and scalar values [3, 9]. Find the output.",
            steps: ["Equal scores give weights [0.5, 0.5].", "Output = 0.5×3 + 0.5×9."],
            answer: "The attention output is 6.",
          },
          {
            title: "Masked position",
            prompt: "Scores are [1, 3] but the second position is masked. What are the final attention weights?",
            steps: ["Replace the second score with −∞.", "Softmax is applied to [1, −∞]."],
            answer: "The weights are [1, 0].",
          },
        ],
      },
    ],
    mechanism: {
      title: "How to solve scaled attention",
      steps: [
        "Multiply Q by Kᵀ.",
        "Divide every score by √dₖ.",
        "Add padding or causal masks.",
        "Apply row-wise softmax.",
        "Multiply the weight matrix by V.",
        "Verify that the output is nq × dv.",
      ],
    },
    example: {
      title: "One query, many keys",
      body: "A single query creates one score row. After softmax, that row tells the model how to combine every available value into one output vector.",
    },
    misconception:
      "The softmax is row-wise over keys for each query. It is not normally applied over every element of the complete score matrix at once.",
  },
  revise: {
    definition:
      "Scaled dot-product attention applies row-wise softmax to scaled query-key scores and uses the weights to combine values.",
    sections: [
      { title: "Equation", formulas: [{ expression: "softmax(QKᵀ/√dₖ + M)V" }] },
      { title: "Shapes", points: ["Scores: nq × nk", "Weights: nq × nk", "Output: nq × dv"] },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Q and K must share dₖ.",
      "K and V must share position count nₖ.",
      "Scale before softmax.",
      "Add masks before softmax.",
      "Each softmax row sums to 1.",
    ],
    followUp: "Why does the attention output use the value dimension rather than the key dimension?",
  },
  lastMinute: {
    definition: "QKᵀ gives scores; softmax gives weights; weights times V gives output.",
    sections: [
      { title: "Order", flow: ["QKᵀ", "÷√dₖ", "+ mask", "softmax", "×V"], wide: true },
      { title: "Shapes", points: ["Q: nq×dₖ", "K: nk×dₖ", "V: nk×dv", "Output: nq×dv"] },
    ],
    memoryLine: "Match with keys, then collect from values.",
    cues: ["Softmax is row-wise.", "Blocked score becomes −∞.", "Self-attention scores are T × T."],
    trap: "Do not apply the mask after softmax.",
  },
};

export const selfAndMultiHeadAttention: SubjectTopic = {
  slug: "self-and-multi-head-attention",
  title: "Self-Attention and Multi-Head Attention",
  description:
    "Project multiple attention heads, track their tensors, count parameters, and understand quadratic attention cost.",
  readTime: "28 min",
  difficulty: "Advanced",
  tags: ["Self-Attention", "Multi-Head", "Parameters"],
  learn: {
    opening:
      "Multi-head attention runs several learned attention projections in parallel, concatenates their outputs, and applies one output projection.",
    sections: [
      {
        title: "From Input to Q, K, and V",
        paragraphs: [
          "For self-attention, an input X of shape B × T × dmodel is projected into Q, K, and V. These are learned linear transformations, not three independent copies with unchanged values.",
          "With h heads, a common choice is dₖ = dv = dmodel/h. Therefore dmodel must be divisible by h in this standard arrangement.",
        ],
        formulas: [
          { label: "Projections", expression: "Q = XWQ,  K = XWK,  V = XWV" },
          { label: "One head", expression: "headᵢ = Attention(Qᵢ,Kᵢ,Vᵢ)" },
          { label: "Multi-head output", expression: "MHA = Concat(head₁,…,headₕ)WO" },
        ],
        visual: {
          src: "/notes/deep-learning/multi-head-self-attention.png",
          alt: "An input sequence feeding four parallel Q-K-V attention heads followed by concatenation and output projection",
          width: 1536,
          height: 1024,
          caption: "Each head has learned projections; concatenation restores the total model width before output projection.",
        },
      },
      {
        title: "Important Tensor Shapes",
        paragraphs: [
          "Implementations often reshape projected tensors to place the head axis separately. After all heads finish, their dv dimensions are concatenated.",
        ],
        dataTable: {
          headers: ["Tensor", "Typical batch-first shape"],
          rows: [
            ["Input X", "B × T × dmodel"],
            ["Q, K, V after head split", "B × h × T × dₖ"],
            ["Attention scores", "B × h × T × T"],
            ["Concatenated heads", "B × T × dmodel"],
            ["Final MHA output", "B × T × dmodel"],
          ],
        },
      },
      {
        title: "Parameter Counting",
        paragraphs: [
          "When the total Q, K, V, and output widths all equal dmodel, the four projection matrices are each dmodel × dmodel. Head count changes the reshaping, not this total parameter count.",
          "The formula below assumes four bias vectors of length dmodel. Remove 4dmodel when projection biases are disabled.",
        ],
        formulas: [
          { label: "With projection biases", expression: "parameters = 4dmodel² + 4dmodel" },
          { label: "Without biases", expression: "parameters = 4dmodel²" },
        ],
      },
      {
        title: "Why Use Several Heads?",
        paragraphs: [
          "Different learned projections let the layer represent several attention patterns in parallel. One head may become useful for a local relation while another captures a longer relation.",
          "This specialization is useful intuition, not a guarantee that every head learns a clean human-readable role. Some heads can be redundant.",
        ],
      },
      {
        title: "Computation and Memory",
        paragraphs: [
          "Full self-attention creates T × T scores for each head. Its attention computation grows approximately as O(T²dmodel), while the score storage grows as O(T²) per layer when other dimensions are treated as fixed.",
          "Doubling sequence length makes an attention score matrix four times larger. This is a main limitation for very long sequences.",
        ],
      },
      {
        title: "Practice",
        paragraphs: ["Separate head dimension from total model dimension."],
        problems: [
          {
            title: "Head dimension",
            prompt: "dmodel = 512 and h = 8. Find dₖ when heads divide the model width equally.",
            steps: ["dₖ = dmodel/h.", "dₖ = 512/8."],
            answer: "Each head has key dimension 64.",
          },
          {
            title: "MHA parameter count",
            prompt: "Find multi-head attention parameters for dmodel = 512 with all projection biases disabled.",
            steps: ["There are four 512 × 512 projection matrices.", "Parameters = 4 × 512²."],
            answer: "The layer has 1,048,576 projection weights.",
          },
          {
            title: "Score tensor shape",
            prompt: "B = 16, h = 8, and T = 100. What is the self-attention score tensor shape?",
            steps: ["Every batch and head creates a T × T score matrix.", "Use B × h × T × T."],
            answer: "The score tensor shape is 16 × 8 × 100 × 100.",
          },
          {
            title: "Length growth",
            prompt: "If sequence length increases from 256 to 512, by what factor does the T × T score count grow?",
            steps: ["Length doubles.", "Quadratic size changes by 2²."],
            answer: "The score count becomes 4 times larger.",
          },
        ],
      },
    ],
    mechanism: {
      title: "How multi-head attention works",
      steps: [
        "Project the input into Q, K, and V.",
        "Split their total widths across h heads.",
        "Run scaled attention independently in every head.",
        "Concatenate all head outputs.",
        "Apply the output projection.",
        "Return a tensor with width dmodel.",
      ],
    },
    example: {
      title: "Eight heads do not multiply total width by eight",
      body: "With dmodel = 512 and eight equal heads, each head commonly uses width 64. Concatenating eight 64-wide outputs restores width 512.",
    },
    misconception:
      "Under the standard equal-total-width setup, adding heads does not automatically multiply the Q-K-V parameter count. It divides the same total projected width.",
  },
  revise: {
    definition:
      "Multi-head attention performs several projected attention calculations in parallel, concatenates them, and projects the result.",
    sections: [
      { title: "Flow", flow: ["Project QKV", "Split heads", "Attend", "Concatenate", "Output projection"] },
      { title: "Count", formulas: [{ expression: "MHA parameters = 4dmodel² + 4dmodel" }] },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Standard head width is dmodel/h.",
      "Each head has its own projected Q, K, and V slices.",
      "Concatenation restores dmodel.",
      "Self-attention scores are B × h × T × T.",
      "Full attention cost is quadratic in sequence length.",
    ],
    followUp: "Why can head count change without changing the standard total projection parameter count?",
  },
  lastMinute: {
    definition: "MHA = parallel attention heads, concat, output projection.",
    sections: [
      { title: "Shapes", points: ["Head width: dmodel/h", "Scores: B×h×T×T", "Output: B×T×dmodel"] },
      { title: "Cost", points: ["Parameters: about 4dmodel²", "Attention: O(T²dmodel)", "Double T → 4× scores"] },
    ],
    memoryLine: "Split the width, attend in parallel, join the heads.",
    cues: ["Q, K, V are learned projections.", "Every head reaches concat.", "WO mixes head outputs."],
    trap: "Do not multiply 4dmodel² by the head count in the standard setup.",
  },
};
