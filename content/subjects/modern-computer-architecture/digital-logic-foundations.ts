import type { SubjectTopic } from "@/lib/subject-content";

export const binaryNumbersAndPlaceValue: SubjectTopic = {
  slug: "binary-numbers-and-place-value",
  title: "Binary Numbers and Place Value",
  description:
    "Learn how computers represent unsigned values using bits, place values, and powers of two.",
  readTime: "23 min",
  difficulty: "Foundation",
  tags: ["Binary", "Bits", "Number Systems"],
  learn: {
    opening:
      "A computer stores information using two stable states. We write these states as 0 and 1. One binary digit is called a bit, and a group of eight bits is called a byte.",
    sections: [
      {
        title: "Why Binary Uses Powers of Two",
        paragraphs: [
          "Decimal has ten digits, so its place values are powers of 10. Binary has only two digits, so its place values are powers of 2.",
          "Starting from the right, the binary place values are 1, 2, 4, 8, 16, 32, and so on. A 1 means the place value is included. A 0 means it is not included.",
        ],
        visual: {
          src: "/notes/modern-computer-architecture/binary-place-value.png",
          alt: "Binary place-value diagram converting 10110101 into decimal 181 by adding the active powers of two.",
          width: 1536,
          height: 1024,
          caption: "Each bit either includes or excludes its place value.",
        },
      },
      {
        title: "Binary to Decimal",
        paragraphs: [
          "Multiply each bit by its place value and add the results. For 10110101, the active places are 128, 32, 16, 4, and 1.",
          "The symbol Σ means add all the terms. In the positional formula, bitᵢ is either 0 or 1, and 2ⁱ is the place value at position i.",
        ],
        formulas: [
          {
            label: "Positional value",
            expression: "Value = Σ(bitᵢ × 2ⁱ)",
            note: "The rightmost bit uses i = 0.",
          },
          {
            label: "Example",
            expression: "10110101₂ = 128 + 32 + 16 + 4 + 1 = 181₁₀",
          },
        ],
        dataTable: {
          headers: ["Bit position", "7", "6", "5", "4", "3", "2", "1", "0"],
          rows: [
            ["Place value", "128", "64", "32", "16", "8", "4", "2", "1"],
            ["Bit in 10110101", "1", "0", "1", "1", "0", "1", "0", "1"],
          ],
        },
      },
      {
        title: "Decimal to Binary",
        paragraphs: [
          "Repeatedly divide the decimal number by 2. Record each remainder. Read the remainders from bottom to top.",
        ],
        flow: [
          "Divide by 2",
          "Record remainder",
          "Use the quotient again",
          "Stop at quotient 0",
          "Read upward",
        ],
      },
      {
        title: "Unsigned Range and Bit Width",
        paragraphs: [
          "An unsigned value uses every bit for magnitude. With n bits, there are 2ⁿ different patterns. The smallest pattern is all 0s and the largest is all 1s.",
        ],
        formulas: [
          {
            label: "Number of patterns",
            expression: "Patterns = 2ⁿ",
          },
          {
            label: "Unsigned n-bit range",
            expression: "0 to 2ⁿ - 1",
          },
        ],
        table: {
          headers: ["Bit width", "Unsigned range"],
          rows: [
            ["4 bits", "0 to 15"],
            ["8 bits", "0 to 255"],
            ["16 bits", "0 to 65,535"],
          ],
        },
      },
      {
        title: "Worked Problems",
        paragraphs: [
          "Write the place values or division steps. This makes the method easy to check and earns method marks in an exam.",
        ],
        problems: [
          {
            title: "Convert binary to decimal",
            prompt: "Convert 110101₂ to decimal.",
            steps: [
              "Write place values: 32, 16, 8, 4, 2, 1.",
              "Keep the places whose bit is 1: 32, 16, 4, 1.",
              "Add them: 32 + 16 + 4 + 1 = 53.",
            ],
            answer: "110101₂ = 53₁₀",
          },
          {
            title: "Convert decimal to binary",
            prompt: "Convert 45₁₀ to binary.",
            steps: [
              "45 ÷ 2 = 22 remainder 1",
              "22 ÷ 2 = 11 remainder 0",
              "11 ÷ 2 = 5 remainder 1",
              "5 ÷ 2 = 2 remainder 1",
              "2 ÷ 2 = 1 remainder 0",
              "1 ÷ 2 = 0 remainder 1",
              "Read the remainders from bottom to top: 101101.",
            ],
            answer: "45₁₀ = 101101₂",
          },
          {
            title: "Convert a larger value and check it",
            prompt: "Convert 173₁₀ to 8-bit binary and verify the result.",
            steps: [
              "Choose the largest place not above 173: 128. Remainder = 45.",
              "Skip 64. Use 32, leaving 13. Use 8, leaving 5. Use 4, leaving 1. Skip 2 and use 1.",
              "Write the bits under 128, 64, 32, 16, 8, 4, 2, 1: 10101101.",
              "Check: 128 + 32 + 8 + 4 + 1 = 173.",
            ],
            answer: "173₁₀ = 10101101₂",
          },
        ],
      },
    ],
    mechanism: {
      title: "How to read an unsigned binary number",
      steps: [
        "Write powers of two above the bits, starting with 2⁰ on the right.",
        "Select every place whose bit is 1.",
        "Add the selected place values.",
        "Check that the answer is inside the range for the bit width.",
      ],
    },
    example: {
      title: "Why 8 bits stop at 255",
      body: "Eight bits create 2⁸ = 256 patterns. Because counting starts at 0, the values are 0 through 255, not 1 through 256.",
    },
    misconception:
      "The leftmost bit is not always a sign bit. It is a sign bit only when the chosen representation is signed.",
  },
  revise: {
    definition:
      "Binary is base 2. Each position has value 2ⁱ, starting with 2⁰ at the rightmost bit.",
    sections: [
      {
        title: "Core Formulas",
        formulas: [
          { expression: "Value = Σ(bitᵢ × 2ⁱ)" },
          { expression: "n-bit patterns = 2ⁿ" },
          { expression: "Unsigned range = 0 to 2ⁿ - 1" },
        ],
      },
      {
        title: "Fast Conversion",
        table: {
          headers: ["Direction", "Method"],
          rows: [
            ["Binary to decimal", "Add active powers of two"],
            ["Decimal to binary", "Divide by 2 and read remainders upward"],
          ],
        },
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Bit = one binary digit; byte = eight bits.",
      "Rightmost place is 2⁰ = 1.",
      "Leading zeros do not change an unsigned value.",
      "Eight unsigned bits store 0 to 255.",
    ],
    followUp:
      "Why does an unsigned n-bit number have a maximum value of 2ⁿ - 1?",
  },
  lastMinute: {
    definition:
      "Binary uses 0 and 1, with place values 1, 2, 4, 8, 16, and so on.",
    sections: [
      {
        title: "Do This",
        points: [
          "Binary to decimal: add places containing 1.",
          "Decimal to binary: divide by 2, record remainders, read upward.",
          "Unsigned n-bit range: 0 to 2ⁿ - 1.",
        ],
      },
    ],
    memoryLine: "Rightmost bit is 2⁰; every step left doubles the place value.",
    cues: ["Base 2", "2⁰ on right", "2ⁿ patterns", "Maximum 2ⁿ - 1"],
    trap: "Do not say 8 unsigned bits store up to 256. They store 256 values, ending at 255.",
  },
};

export const signedBinaryAndTwosComplement: SubjectTopic = {
  slug: "signed-binary-and-twos-complement",
  title: "Signed Binary and Two's Complement",
  description:
    "Represent negative integers, find signed ranges, and perform binary addition safely.",
  readTime: "23 min",
  difficulty: "Foundation",
  tags: ["Signed Binary", "Two's Complement", "Overflow"],
  learn: {
    opening:
      "Two's complement is the standard way to store signed integers. It gives one representation for zero and lets the same binary adder handle positive and negative values.",
    sections: [
      {
        title: "Reading a Signed Pattern",
        paragraphs: [
          "For an n-bit two's-complement number, the leftmost bit has weight -(2^(n - 1)). The remaining bits have their normal positive weights.",
          "A leading 0 means the value is non-negative. A leading 1 means the value is negative, but the bit is not simply a minus sign.",
        ],
        formulas: [
          {
            label: "Signed n-bit range",
            expression: "-(2^(n - 1)) to 2^(n - 1) - 1",
          },
          {
            label: "8-bit signed range",
            expression: "-128 to +127",
          },
        ],
      },
      {
        title: "Other Signed Representations",
        paragraphs: [
          "Older systems and exam questions may also use sign magnitude or one's complement. Two's complement is preferred because it has only one zero and works naturally with binary addition.",
        ],
        dataTable: {
          headers: [
            "Representation",
            "How -5 looks in 4 bits",
            "Important point",
          ],
          rows: [
            ["Sign magnitude", "1101", "First bit stores sign; has +0 and -0"],
            ["One's complement", "1010", "Invert +5; has +0 and -0"],
            ["Two's complement", "1011", "Invert +5 and add 1; one zero"],
          ],
        },
      },
      {
        title: "Making a Negative Value",
        paragraphs: [
          "Write the positive value using the required width. Invert every bit, then add 1. Keep only the chosen number of bits.",
        ],
        visual: {
          src: "/notes/modern-computer-architecture/twos-complement.png",
          alt: "Eight-bit two's-complement conversion from positive 18 to negative 18 by inverting the bits and adding one.",
          width: 1536,
          height: 1024,
          caption: "Negation in two's complement: invert all bits, then add 1.",
        },
      },
      {
        title: "Binary Addition",
        paragraphs: [
          "Add from right to left. The basic rules are 0 + 0 = 0, 0 + 1 = 1, 1 + 1 = 10, and 1 + 1 + 1 = 11. The left digit of 10 or 11 is carried to the next column.",
          "For fixed-width two's-complement arithmetic, discard a carry that leaves the most significant bit. Then check for signed overflow.",
        ],
        dataTable: {
          headers: ["A", "B", "Carry in", "Sum", "Carry out"],
          rows: [
            ["0", "0", "0", "0", "0"],
            ["0", "1", "0", "1", "0"],
            ["1", "1", "0", "0", "1"],
            ["1", "1", "1", "1", "1"],
          ],
        },
      },
      {
        title: "Carry and Overflow Are Different",
        paragraphs: [
          "Carry out matters for unsigned arithmetic. Signed overflow means the true signed answer does not fit in the available width.",
          "For addition, signed overflow happens when two operands have the same sign but the result has the opposite sign.",
        ],
        points: [
          "Positive + positive gives a negative bit pattern: overflow.",
          "Negative + negative gives a non-negative bit pattern: overflow.",
          "Operands with different signs cannot overflow during addition.",
        ],
      },
      {
        title: "Sign Extension",
        paragraphs: [
          "Sign extension increases the width of a signed two's-complement value without changing its meaning. Copy the sign bit into every new position on the left.",
          "For a positive value, add leading 0s. For a negative value, add leading 1s. For example, 11110110 is -10 in 8 bits and becomes 11111111 11110110 in 16 bits.",
        ],
        formulas: [
          {
            label: "Positive example",
            expression: "00101101 → 00000000 00101101",
          },
          {
            label: "Negative example",
            expression: "11110110 → 11111111 11110110",
          },
        ],
      },
      {
        title: "Worked Problems",
        paragraphs: [],
        problems: [
          {
            title: "Find a negative representation",
            prompt: "Write -37 in 8-bit two's complement.",
            steps: [
              "+37 = 00100101",
              "Invert every bit: 11011010",
              "Add 1: 11011010 + 1 = 11011011",
            ],
            answer: "-37₁₀ = 11011011₂ in 8-bit two's complement",
          },
          {
            title: "Detect signed overflow",
            prompt: "Add 100₁₀ and 50₁₀ using 8-bit signed arithmetic.",
            steps: [
              "100 = 01100100",
              "50 = 00110010",
              "01100100 + 00110010 = 10010110",
              "Both inputs are positive, but the result starts with 1 and appears negative.",
            ],
            answer:
              "Signed overflow occurs because 150 is outside the 8-bit signed range -128 to 127.",
          },
          {
            title: "Negative plus negative overflow",
            prompt: "Add -90 and -50 using 8-bit signed arithmetic.",
            steps: [
              "-90 = 10100110 and -50 = 11001110.",
              "10100110 + 11001110 = 1 01110100. Keep the lower eight bits: 01110100.",
              "Both inputs are negative, but the stored result starts with 0 and appears positive.",
              "The true result -140 is below the minimum value -128.",
            ],
            answer:
              "Signed overflow occurs. The 8-bit pattern cannot represent -140.",
          },
          {
            title: "Subtract with two's complement",
            prompt: "Calculate 23 - 9 using 8-bit binary arithmetic.",
            steps: [
              "23 = 00010111 and 9 = 00001001.",
              "Invert 9: 11110110. Add 1: 11110111, which represents -9.",
              "00010111 + 11110111 = 1 00001110.",
              "Discard the carry beyond eight bits.",
            ],
            answer: "00001110₂ = 14₁₀",
          },
        ],
      },
    ],
    mechanism: {
      title: "How to decode a negative two's-complement number",
      steps: [
        "Confirm the bit width and notice that the leftmost bit is 1.",
        "Invert all bits.",
        "Add 1 to find the magnitude.",
        "Attach a negative sign to that magnitude.",
      ],
    },
    example: {
      title: "Decode 11110110",
      body: "Invert to get 00001001, then add 1 to get 00001010 = 10. Therefore 11110110 represents -10 in 8-bit two's complement.",
    },
    misconception:
      "A carry out does not automatically mean signed overflow. Carry is mainly an unsigned signal; overflow depends on the operand and result signs.",
  },
  revise: {
    definition:
      "Two's complement stores signed integers. To negate a fixed-width pattern, invert every bit and add 1.",
    sections: [
      {
        title: "Essential Formulas",
        formulas: [
          { expression: "Signed range = -(2^(n - 1)) to 2^(n - 1) - 1" },
          { expression: "-X = invert(X) + 1" },
        ],
      },
      {
        title: "Overflow Check",
        table: {
          headers: ["Addition", "Overflow?"],
          rows: [
            ["Positive + positive gives negative", "Yes"],
            ["Negative + negative gives non-negative", "Yes"],
            ["Different signs", "No"],
          ],
        },
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Leading 0 is non-negative; leading 1 is negative.",
      "Eight signed bits store -128 to +127.",
      "Discard a carry beyond the fixed width.",
      "Carry out and signed overflow answer different questions.",
      "When increasing width, copy the sign bit into the new left positions.",
    ],
    followUp:
      "Why can adding two positive 8-bit numbers produce a pattern that looks negative?",
  },
  lastMinute: {
    definition: "Two's complement: invert all bits and add 1.",
    sections: [
      {
        title: "Signed Checklist",
        points: [
          "Fix the bit width first.",
          "Range: -(2^(n - 1)) to 2^(n - 1) - 1.",
          "Same-sign inputs and opposite-sign result means overflow.",
          "Sign extension copies the leftmost bit.",
        ],
      },
    ],
    memoryLine: "Invert, add one, keep the width.",
    cues: ["MSB shows sign", "One zero", "Same adder", "Carry is not overflow"],
    trap: "Do not forget leading zeros before taking the two's complement.",
  },
};

export const booleanAlgebraAndLogicGates: SubjectTopic = {
  slug: "boolean-algebra-and-logic-gates",
  title: "Boolean Algebra and Logic Gates",
  description:
    "Use Boolean operators, truth tables, identities, and gates to describe digital decisions.",
  readTime: "25 min",
  difficulty: "Foundation",
  tags: ["Boolean Algebra", "Logic Gates", "Truth Tables"],
  learn: {
    opening:
      "Boolean algebra works with two values: 0 and 1. In digital circuits, these values describe low and high logic levels. Logic gates physically perform Boolean operations.",
    sections: [
      {
        title: "The Core Logic Operations",
        paragraphs: [
          "AND gives 1 only when both inputs are 1. OR gives 1 when at least one input is 1. NOT reverses one input. XOR gives 1 when its two inputs are different. XNOR gives 1 when its two inputs are equal.",
        ],
        visual: {
          src: "/notes/modern-computer-architecture/logic-operations.png",
          alt: "Symbols and meanings of the AND, OR, NOT, and XOR logic operations.",
          width: 1536,
          height: 1024,
          caption:
            "Boolean expressions and gate symbols describe the same operations.",
        },
        formulas: [
          { label: "AND", expression: "Y = A ∧ B" },
          { label: "OR", expression: "Y = A ∨ B" },
          { label: "NOT", expression: "Y = ¬A" },
          { label: "XOR", expression: "Y = A ⊕ B" },
          { label: "XNOR", expression: "Y = ¬(A ⊕ B)" },
        ],
      },
      {
        title: "Truth Tables",
        paragraphs: [
          "A truth table lists every possible input combination and its output. Two inputs produce 2² = 4 rows; three inputs produce 2³ = 8 rows.",
        ],
        dataTable: {
          headers: ["A", "B", "AND", "OR", "XOR", "XNOR"],
          rows: [
            ["0", "0", "0", "0", "0", "1"],
            ["0", "1", "0", "1", "1", "0"],
            ["1", "0", "0", "1", "1", "0"],
            ["1", "1", "1", "1", "0", "1"],
          ],
        },
      },
      {
        title: "Important Boolean Laws",
        paragraphs: [
          "Boolean laws simplify expressions and reduce the number of gates needed in a circuit.",
        ],
        formulas: [
          { label: "Identity", expression: "A ∧ 1 = A; A ∨ 0 = A" },
          { label: "Null", expression: "A ∧ 0 = 0; A ∨ 1 = 1" },
          { label: "Idempotent", expression: "A ∧ A = A; A ∨ A = A" },
          { label: "Complement", expression: "A ∧ ¬A = 0; A ∨ ¬A = 1" },
          { label: "Absorption", expression: "A ∨ (A ∧ B) = A" },
          {
            label: "Distributive AND",
            expression: "A ∧ (B ∨ C) = (A ∧ B) ∨ (A ∧ C)",
          },
          {
            label: "Distributive OR",
            expression: "A ∨ (B ∧ C) = (A ∨ B) ∧ (A ∨ C)",
          },
          { label: "De Morgan 1", expression: "¬(A ∧ B) = ¬A ∨ ¬B" },
          { label: "De Morgan 2", expression: "¬(A ∨ B) = ¬A ∧ ¬B" },
        ],
      },
      {
        title: "Universal Gates",
        paragraphs: [
          "NAND is NOT-AND, and NOR is NOT-OR. Either NAND alone or NOR alone can build every Boolean function, so both are called universal gates.",
          "To build NOT with NAND, connect the same input to both NAND inputs. To build AND, NAND the inputs and then NAND the result with itself. This proves that NAND can reproduce simpler gates.",
        ],
        formulas: [
          { label: "NAND", expression: "A NAND B = ¬(A ∧ B)" },
          { label: "NOR", expression: "A NOR B = ¬(A ∨ B)" },
          { label: "NOT using NAND", expression: "¬A = A NAND A" },
          {
            label: "AND using NAND",
            expression: "A ∧ B = (A NAND B) NAND (A NAND B)",
          },
          {
            label: "OR using NAND",
            expression: "A ∨ B = (A NAND A) NAND (B NAND B)",
          },
        ],
      },
      {
        title: "From Expression to Circuit",
        paragraphs: [
          "Break an expression into small operations. For F = (A ∧ B) ∨ ¬C, first connect A and B to an AND gate, send C through a NOT gate, and connect those two results to an OR gate.",
          "To read a circuit as an expression, label the output of each gate and work from the inputs toward the final output.",
        ],
        flow: [
          "Inputs A and B",
          "AND gate",
          "Combine with ¬C",
          "OR gate",
          "Output F",
        ],
      },
      {
        title: "Worked Problems",
        paragraphs: [],
        problems: [
          {
            title: "Simplify an expression",
            prompt: "Simplify F = A ∨ (A ∧ B).",
            steps: [
              "Recognize the form A ∨ (A ∧ B).",
              "Apply the absorption law.",
              "The extra term A ∧ B cannot make the output 1 when A is 0.",
            ],
            answer: "F = A",
          },
          {
            title: "Evaluate a Boolean function",
            prompt: "Find F = (A ∧ B) ∨ ¬C when A = 1, B = 0, C = 0.",
            steps: ["A ∧ B = 1 ∧ 0 = 0", "¬C = ¬0 = 1", "F = 0 ∨ 1 = 1"],
            answer: "F = 1",
          },
          {
            title: "Simplify a three-variable expression",
            prompt: "Simplify F = A ∧ (A ∨ B) ∨ (A ∧ B ∧ C).",
            steps: [
              "Use absorption: A ∧ (A ∨ B) = A.",
              "Now F = A ∨ (A ∧ B ∧ C).",
              "Use absorption again: A ∨ (A ∧ X) = A, where X = B ∧ C.",
            ],
            answer: "F = A",
          },
          {
            title: "Read a small logic circuit",
            prompt:
              "A and B enter an XOR gate. Its output and C enter an AND gate. Find F for A = 1, B = 0, C = 1.",
            steps: [
              "Write the expression: F = (A ⊕ B) ∧ C.",
              "A ⊕ B = 1 ⊕ 0 = 1.",
              "F = 1 ∧ 1 = 1.",
            ],
            answer: "F = 1",
          },
        ],
      },
    ],
    mechanism: {
      title: "How to create a truth table",
      steps: [
        "Count the input variables. Use 2ⁿ rows for n inputs.",
        "List every input combination in binary order.",
        "Evaluate NOT operations first.",
        "Evaluate the inner operations, then the final output.",
        "Check that no input combination is missing or repeated.",
      ],
    },
    example: {
      title: "A simple safety rule",
      body: "If a machine runs only when Power = 1 and GuardClosed = 1, then Run = Power ∧ GuardClosed. An AND gate implements the rule directly.",
    },
    misconception:
      "Boolean OR is not the same as exclusive OR. OR is also 1 when both inputs are 1; XOR is 0 in that case.",
  },
  revise: {
    definition:
      "Boolean algebra describes 0 and 1 using operations such as AND, OR, NOT, and XOR. Gates implement these operations in hardware.",
    sections: [
      {
        title: "Gate Meanings",
        table: {
          headers: ["Gate", "Output is 1 when"],
          rows: [
            ["AND", "Both inputs are 1"],
            ["OR", "At least one input is 1"],
            ["XOR", "Inputs are different"],
            ["XNOR", "Inputs are equal"],
            ["NOT", "Its input is 0"],
          ],
        },
      },
      {
        title: "Must-Know Laws",
        formulas: [
          { expression: "A ∨ (A ∧ B) = A" },
          { expression: "A ∧ (B ∨ C) = (A ∧ B) ∨ (A ∧ C)" },
          { expression: "¬(A ∧ B) = ¬A ∨ ¬B" },
          { expression: "¬(A ∨ B) = ¬A ∧ ¬B" },
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "n inputs need 2ⁿ truth-table rows.",
      "NAND and NOR are universal gates.",
      "A bubble on a gate symbol means inversion.",
      "XOR means different, not simply OR.",
      "XNOR means equal.",
      "NAND alone can create NOT, AND, and OR.",
    ],
    followUp:
      "How do De Morgan's laws change an AND into an OR and an OR into an AND?",
  },
  lastMinute: {
    definition:
      "AND: both. OR: any. NOT: reverse. XOR: different. XNOR: equal.",
    sections: [
      {
        title: "Recall",
        points: [
          "Truth-table rows = 2ⁿ.",
          "NAND = NOT of AND; NOR = NOT of OR.",
          "De Morgan: complement each input and swap AND with OR.",
          "NAND-only NOT: A NAND A.",
        ],
      },
    ],
    memoryLine: "AND both, OR any, XOR different, XNOR equal, NOT flips.",
    cues: [
      "0 and 1",
      "2ⁿ rows",
      "NAND universal",
      "De Morgan swaps",
      "XNOR equal",
    ],
    trap: "For A = 1 and B = 1, OR is 1 but XOR is 0.",
  },
};

export const combinationalCircuits: SubjectTopic = {
  slug: "combinational-circuits",
  title: "Combinational Circuits",
  description:
    "Build useful hardware blocks from gates: multiplexers, decoders, adders, and comparators.",
  readTime: "30 min",
  difficulty: "Intermediate",
  tags: ["Multiplexer", "Adder", "Comparator"],
  learn: {
    opening:
      "A combinational circuit produces an output from its current inputs only. It has no memory of an earlier input. Multiplexers, decoders, adders, and comparators are common examples.",
    sections: [
      {
        title: "Multiplexer: Many Inputs, One Output",
        paragraphs: [
          "A multiplexer, or MUX, selects one data input and sends it to one output. Select bits tell the MUX which input to choose.",
          "A 4-to-1 MUX has four data inputs, two select inputs, and one output because two select bits create four choices.",
        ],
        visual: {
          src: "/notes/modern-computer-architecture/multiplexer.png",
          alt: "A 4-to-1 multiplexer with four data inputs, two select lines, one output, and the select mapping.",
          width: 1536,
          height: 1024,
          caption: "Two select bits choose one of four inputs.",
        },
        formulas: [
          {
            label: "4-to-1 MUX",
            expression: "Y = I₀¬S₁¬S₀ ∨ I₁¬S₁S₀ ∨ I₂S₁¬S₀ ∨ I₃S₁S₀",
          },
          {
            label: "Select bits for N inputs",
            expression: "k = log₂(N), when N is a power of 2",
          },
        ],
      },
      {
        title: "Decoder and Demultiplexer",
        paragraphs: [
          "A decoder activates one of many outputs according to a binary input code. A 2-to-4 decoder has two input bits and four output lines.",
          "A demultiplexer, or DEMUX, sends one data input to one selected output. A decoder selects a line; a DEMUX routes data to that line.",
        ],
        table: {
          headers: ["Circuit", "Main job"],
          rows: [
            ["Multiplexer", "Choose one of many inputs"],
            ["Demultiplexer", "Send one input to one selected output"],
            ["Decoder", "Activate one output from a binary code"],
          ],
        },
        dataTable: {
          headers: ["A₁", "A₀", "Y₀", "Y₁", "Y₂", "Y₃"],
          rows: [
            ["0", "0", "1", "0", "0", "0"],
            ["0", "1", "0", "1", "0", "0"],
            ["1", "0", "0", "0", "1", "0"],
            ["1", "1", "0", "0", "0", "1"],
          ],
        },
      },
      {
        title: "Encoder and Priority Encoder",
        paragraphs: [
          "An encoder performs the reverse job of a decoder. It receives one active input and produces the binary code of that input.",
          "A normal encoder assumes only one input is active. A priority encoder can accept several active inputs and returns the code of the highest-priority input.",
        ],
        table: {
          headers: ["Circuit", "Direction"],
          rows: [
            ["Decoder", "Binary code to one active output"],
            ["Encoder", "One active input to binary code"],
            [
              "Priority encoder",
              "Highest-priority active input to binary code",
            ],
          ],
        },
      },
      {
        title: "Half-Adder Truth Table",
        paragraphs: [
          "A half adder has two inputs and no carry input. XOR creates the sum bit and AND creates the carry bit.",
        ],
        dataTable: {
          headers: ["A", "B", "Sum", "Carry"],
          rows: [
            ["0", "0", "0", "0"],
            ["0", "1", "1", "0"],
            ["1", "0", "1", "0"],
            ["1", "1", "0", "1"],
          ],
        },
      },
      {
        title: "Half Adder and Full Adder",
        paragraphs: [
          "A half adder adds two one-bit inputs. A full adder also accepts a carry from the previous bit position. Multi-bit adders connect full adders from the least significant bit toward the most significant bit.",
          "In a ripple-carry adder, each stage must wait for the carry from the stage on its right. A wider adder may therefore take longer because the carry can travel through many stages.",
        ],
        formulas: [
          { label: "Half-adder sum", expression: "Sum = A ⊕ B" },
          { label: "Half-adder carry", expression: "Carry = A ∧ B" },
          { label: "Full-adder sum", expression: "Sum = A ⊕ B ⊕ Cᵢₙ" },
          {
            label: "Full-adder carry",
            expression: "Cₒᵤₜ = (A ∧ B) ∨ (Cᵢₙ ∧ (A ⊕ B))",
          },
        ],
        dataTable: {
          headers: ["A", "B", "Cᵢₙ", "Sum", "Cₒᵤₜ"],
          rows: [
            ["0", "0", "0", "0", "0"],
            ["0", "0", "1", "1", "0"],
            ["0", "1", "0", "1", "0"],
            ["0", "1", "1", "0", "1"],
            ["1", "0", "0", "1", "0"],
            ["1", "0", "1", "0", "1"],
            ["1", "1", "0", "0", "1"],
            ["1", "1", "1", "1", "1"],
          ],
        },
      },
      {
        title: "Comparator",
        paragraphs: [
          "A comparator reports whether one binary value is equal to, greater than, or less than another. For equality, corresponding bits must match.",
        ],
        formulas: [
          { label: "One-bit equality", expression: "Equal = ¬(A ⊕ B)" },
          {
            label: "Two-bit equality",
            expression: "Equal = ¬(A₁ ⊕ B₁) ∧ ¬(A₀ ⊕ B₀)",
          },
        ],
      },
      {
        title: "Worked Problems",
        paragraphs: [],
        problems: [
          {
            title: "Trace a multiplexer",
            prompt:
              "For a 4-to-1 MUX, I₀ = 0, I₁ = 1, I₂ = 1, I₃ = 0, and S₁S₀ = 10. Find Y.",
            steps: [
              "Select code 10 chooses input I₂.",
              "I₂ contains 1.",
              "The other inputs do not affect the output for this select code.",
            ],
            answer: "Y = I₂ = 1",
          },
          {
            title: "Use a full adder",
            prompt: "Find the outputs when A = 1, B = 0, and Cᵢₙ = 1.",
            steps: [
              "Sum = 1 ⊕ 0 ⊕ 1 = 0",
              "Cₒᵤₜ = (1 ∧ 0) ∨ (1 ∧ (1 ⊕ 0))",
              "Cₒᵤₜ = 0 ∨ 1 = 1",
            ],
            answer: "Sum = 0 and Cₒᵤₜ = 1, which represents binary 10.",
          },
          {
            title: "Implement a function using a MUX",
            prompt:
              "Use a 4-to-1 MUX to implement F(A, B) = A ⊕ B. A and B are the select inputs.",
            steps: [
              "List XOR outputs in select order AB = 00, 01, 10, 11.",
              "The outputs are 0, 1, 1, 0.",
              "Connect I₀ = 0, I₁ = 1, I₂ = 1, and I₃ = 0.",
              "Use S₁ = A and S₀ = B.",
            ],
            answer: "The MUX output follows 0, 1, 1, 0, so Y = A ⊕ B.",
          },
          {
            title: "Trace a demultiplexer",
            prompt:
              "A 1-to-4 DEMUX receives D = 1 and select code S₁S₀ = 11. Find its outputs.",
            steps: [
              "Select code 11 chooses output Y₃.",
              "Send D = 1 to Y₃.",
              "All unselected outputs remain 0.",
            ],
            answer: "Y₀Y₁Y₂Y₃ = 0001",
          },
        ],
      },
    ],
    mechanism: {
      title: "How a ripple-carry adder works",
      steps: [
        "The first full adder receives the least significant bits and an initial carry of 0.",
        "It produces a sum bit and a carry out.",
        "That carry becomes the carry in of the next full adder.",
        "The process continues through every bit position.",
        "The final carry may extend an unsigned result. It does not by itself detect two's-complement signed overflow; compare the operand and result signs instead.",
      ],
    },
    example: {
      title: "Why a MUX appears inside a processor",
      body: "Several units may produce possible values for a register. A control signal tells a multiplexer which value should continue along the data path during the current operation.",
    },
    misconception:
      "A multiplexer does not combine all its data inputs. It forwards exactly one selected input at a time.",
  },
  revise: {
    definition:
      "A combinational circuit depends only on current inputs. It performs selection, decoding, arithmetic, or comparison without storing state.",
    sections: [
      {
        title: "Circuit Map",
        table: {
          headers: ["Block", "Purpose"],
          rows: [
            ["MUX", "Many inputs to one selected output"],
            ["DEMUX", "One input to one selected output"],
            ["Decoder", "Binary code activates one line"],
            ["Encoder", "Active line produces a binary code"],
            ["Adder", "Produces sum and carry"],
            ["Comparator", "Reports equal, greater, or less"],
          ],
        },
      },
      {
        title: "Adder Formulas",
        formulas: [
          { expression: "Half adder: S = A ⊕ B; C = A ∧ B" },
          { expression: "Full adder: S = A ⊕ B ⊕ Cᵢₙ" },
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "A 2ᵏ-to-1 MUX needs k select bits.",
      "A half adder has no carry input; a full adder has one.",
      "Full adders can be chained for multi-bit addition.",
      "Ripple-carry delay grows because each stage waits for the earlier carry.",
      "Equality uses XNOR behavior on corresponding bits.",
    ],
    followUp: "Why does a 16-to-1 multiplexer need four select bits?",
  },
  lastMinute: {
    definition: "Combinational output depends only on current input.",
    sections: [
      {
        title: "Block Jobs",
        points: [
          "MUX selects an input.",
          "DEMUX routes an input.",
          "Decoder activates a line.",
          "Encoder produces a binary code.",
          "Adder makes sum and carry.",
          "Comparator checks relation.",
        ],
      },
    ],
    memoryLine:
      "MUX chooses, decoder activates, adder calculates, comparator decides.",
    cues: [
      "No memory",
      "2ᵏ choices",
      "XOR gives sum",
      "AND gives half-adder carry",
      "Full adder has 8 rows",
    ],
    trap: "Do not confuse a decoder with a DEMUX: a DEMUX also has a data input.",
  },
};

export const aluFoundationsAndControl: SubjectTopic = {
  slug: "alu-foundations-and-control",
  title: "ALU Foundations and Control",
  description:
    "Connect binary arithmetic and logic gates to the processor's arithmetic logic unit.",
  readTime: "17 min",
  difficulty: "Intermediate",
  tags: ["ALU", "Control", "Status Flags"],
  learn: {
    opening:
      "The Arithmetic Logic Unit, or ALU, is the processor block that performs arithmetic and Boolean operations. Control signals select an operation, and status flags describe important properties of the result.",
    sections: [
      {
        title: "Inputs, Operation, Result",
        paragraphs: [
          "The ALU usually receives two fixed-width operands from registers. A control code selects an operation such as add, subtract, AND, OR, or XOR. The result returns to a register or continues through the data path.",
        ],
        visual: {
          src: "/notes/modern-computer-architecture/simple-alu.png",
          alt: "A simple ALU receiving operands A and B plus an operation control, and producing a result with zero and carry flags.",
          width: 1536,
          height: 1024,
          caption:
            "The operation control chooses what the ALU does with its operands.",
        },
      },
      {
        title: "Common ALU Operations",
        paragraphs: [
          "Real ALUs support different operation sets, but the following groups are common. The meaning of each control code depends on the processor design.",
        ],
        table: {
          headers: ["Group", "Examples"],
          rows: [
            ["Arithmetic", "Add, subtract, increment, decrement"],
            ["Logic", "AND, OR, XOR, NOT"],
            ["Shift", "Logical left, logical right, arithmetic right"],
            ["Compare", "Set flags or produce a comparison result"],
          ],
        },
        dataTable: {
          headers: ["Example control", "Selected operation"],
          rows: [
            ["00", "AND"],
            ["01", "OR"],
            ["10", "ADD"],
            ["11", "SUBTRACT"],
          ],
        },
      },
      {
        title: "Inside a One-Bit ALU Slice",
        paragraphs: [
          "A simple one-bit ALU can calculate several candidate results at the same time. An AND gate produces a logic result, an OR gate produces another result, and a full adder produces an arithmetic result. A multiplexer uses the control code to select one candidate as the final output bit.",
          "A multi-bit ALU repeats this slice for every bit position. Carry connects the adder in one slice to the adder in the next slice.",
        ],
        flow: [
          "Inputs Aᵢ and Bᵢ",
          "Logic gates and full adder",
          "Candidate results",
          "Control-driven MUX",
          "Result bit Rᵢ",
        ],
      },
      {
        title: "Subtraction Through Addition",
        paragraphs: [
          "An ALU can subtract B from A by adding the two's complement of B. Hardware can invert B and set the first carry input to 1.",
        ],
        formulas: [
          {
            label: "Two's-complement subtraction",
            expression: "A - B = A + ¬B + 1",
          },
        ],
        flow: ["Input B", "Invert B", "Set carry in to 1", "Add to A", "A - B"],
      },
      {
        title: "Shift Operations",
        paragraphs: [
          "A logical left shift moves every bit left and inserts 0 on the right. For unsigned values, one left shift usually multiplies by 2 when no important bit is lost.",
          "A logical right shift moves every bit right and inserts 0 on the left. An arithmetic right shift copies the sign bit into the new left position, helping preserve a signed negative value.",
        ],
        dataTable: {
          headers: ["Operation on 8-bit 10110100", "Result", "Main use"],
          rows: [
            [
              "Logical left by 1",
              "01101000",
              "Unsigned multiply by 2 if no overflow",
            ],
            ["Logical right by 1", "01011010", "Unsigned divide by 2"],
            [
              "Arithmetic right by 1",
              "11011010",
              "Signed divide by 2 approximately",
            ],
          ],
        },
      },
      {
        title: "Status Flags",
        paragraphs: [
          "Flags are one-bit summaries of the result. Later instructions can use them for decisions such as branch if equal or branch if negative.",
        ],
        dataTable: {
          headers: ["Flag", "Typical meaning"],
          rows: [
            ["Zero, Z", "The result is all zeros"],
            [
              "Negative, N",
              "For two's complement, the result's most significant bit is 1",
            ],
            ["Carry, C", "Unsigned carry leaves the most significant bit"],
            ["Overflow, V", "The signed result does not fit"],
          ],
        },
        formulas: [
          { label: "Zero flag", expression: "Z = 1 when result = 0" },
          {
            label: "Addition overflow",
            expression:
              "V = 1 when same-sign inputs produce an opposite-sign result",
          },
        ],
      },
      {
        title: "Worked Problems",
        paragraphs: [],
        problems: [
          {
            title: "Trace an ALU operation",
            prompt:
              "A 4-bit ALU receives A = 0101, B = 0011, and control ADD. Find the result and Z, N, C, V flags.",
            steps: [
              "0101₂ = 5 and 0011₂ = 3.",
              "0101 + 0011 = 1000.",
              "The result is not zero, so Z = 0.",
              "The result's most significant bit is 1, so N = 1.",
              "No carry leaves the four-bit width, so C = 0.",
              "Two positive signed inputs produced a negative-looking result, so V = 1. The true value 8 is outside the 4-bit signed range -8 to 7.",
            ],
            answer: "Result = 1000, Z = 0, N = 1, C = 0, V = 1",
          },
          {
            title: "Use addition for subtraction",
            prompt: "Calculate 7 - 3 using 4-bit two's-complement addition.",
            steps: [
              "A = 0111 and B = 0011.",
              "Invert B: 1100. Add 1: 1101, which represents -3.",
              "0111 + 1101 = 1 0100.",
              "Discard the carry beyond four bits.",
            ],
            answer: "Result = 0100₂ = 4₁₀",
          },
          {
            title: "Carry without signed overflow",
            prompt: "A 4-bit ALU adds 1111 and 0001. Find C and V.",
            steps: [
              "1111 + 0001 = 1 0000.",
              "A carry leaves the four-bit width, so C = 1.",
              "As signed values, 1111 is -1 and 0001 is +1. Their sum is 0.",
              "The operands have different signs, so signed overflow cannot occur.",
            ],
            answer: "Result = 0000, C = 1, V = 0",
          },
        ],
      },
    ],
    mechanism: {
      title: "How one ALU operation moves through the data path",
      steps: [
        "Registers place operands A and B on input buses.",
        "The control unit sends an operation code.",
        "The ALU's arithmetic or logic circuit calculates candidate values.",
        "Internal selection logic chooses the requested value.",
        "The ALU outputs the result and updates status flags.",
        "The result can be written into a destination register.",
      ],
    },
    example: {
      title: "Comparison without a separate subtraction instruction",
      body: "To test whether A equals B, a processor can calculate A - B without saving the arithmetic result. If the zero flag becomes 1, the values are equal.",
    },
    misconception:
      "The ALU does not decide which instruction to execute. The control unit decodes the instruction and tells the ALU which operation to perform.",
  },
  revise: {
    definition:
      "An ALU takes operands and an operation code, produces a fixed-width result, and sets status flags.",
    sections: [
      {
        title: "ALU Flow",
        flow: [
          "Registers",
          "Operands A and B",
          "ALU + control",
          "Result",
          "Destination register",
        ],
      },
      {
        title: "Flags",
        table: {
          headers: ["Flag", "Remember"],
          rows: [
            ["Z", "Result equals zero"],
            ["N", "Result MSB is 1"],
            ["C", "Unsigned carry out"],
            ["V", "Signed result out of range"],
          ],
        },
      },
      {
        title: "Subtraction",
        formulas: [{ expression: "A - B = A + ¬B + 1" }],
      },
      {
        title: "Shift Reminder",
        table: {
          headers: ["Shift", "New left bit"],
          rows: [
            ["Logical right", "0"],
            ["Arithmetic right", "Original sign bit"],
          ],
        },
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Control selects add, subtract, logic, shift, or compare behavior.",
      "The result width normally matches the operand width.",
      "Flags describe the result for later control decisions.",
      "The control unit commands the ALU; the ALU performs the operation.",
      "A MUX inside the ALU selects the requested candidate result.",
    ],
    followUp:
      "How can a processor test A = B by using subtraction and the zero flag?",
  },
  lastMinute: {
    definition: "ALU = operands + operation code → result + flags.",
    sections: [
      {
        title: "Flag Meanings",
        points: [
          "Z: result is zero.",
          "N: result starts with 1.",
          "C: unsigned carry out.",
          "V: signed overflow.",
          "Logical right inserts 0; arithmetic right copies the sign bit.",
        ],
      },
    ],
    memoryLine: "Control chooses; ALU calculates; flags describe.",
    cues: ["Two operands", "Fixed width", "A - B = A + ¬B + 1", "Z N C V"],
    trap: "Do not treat carry and signed overflow as the same flag.",
  },
};
