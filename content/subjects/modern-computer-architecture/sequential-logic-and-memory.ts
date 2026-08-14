import type { SubjectTopic } from "@/lib/subject-content";

export const sequentialLogicAndState: SubjectTopic = {
  slug: "sequential-logic-and-state",
  title: "Sequential Logic and State",
  description:
    "Understand stored state, feedback, clocks, and the difference between combinational and sequential circuits.",
  readTime: "24 min",
  difficulty: "Foundation",
  tags: ["Sequential Logic", "State", "Clock"],
  learn: {
    opening:
      "A combinational circuit uses only its current inputs. A sequential circuit also remembers an earlier value called its state. This memory lets hardware count, follow steps, and store data.",
    sections: [
      {
        title: "Combinational vs Sequential Logic",
        paragraphs: [
          "A combinational output changes when its current inputs change. An adder and a multiplexer are combinational because they do not need to remember an earlier result.",
          "A sequential circuit uses stored state when producing its next state or output. Depending on the design, an output may use only the stored state or both the state and current inputs.",
        ],
        table: {
          headers: ["Combinational logic", "Sequential logic"],
          rows: [
            ["Uses current inputs only", "Uses stored state; may also use current inputs"],
            ["No memory element", "Contains latches, flip-flops, or registers"],
            ["Examples: adder, MUX, decoder", "Examples: register, counter, RAM"],
            ["No clock is required", "Often coordinated by a clock"],
          ],
        },
      },
      {
        title: "Current State and Next State",
        paragraphs: [
          "The current state is the value stored now. Next-state logic uses the current state and inputs to calculate the value that should be stored next.",
          "At the active clock edge, the storage element accepts the next state. Its output then becomes the new current state for the following cycle.",
        ],
        visual: {
          src: "/notes/modern-computer-architecture/sequential-logic-state.svg",
          alt: "Current state enters next-state logic, the result is stored in a register at a clock event, and register output feeds back as state.",
          width: 1536,
          height: 1024,
          caption: "Feedback carries stored state into the next calculation.",
        },
        formulas: [
          {
            label: "General next-state model",
            expression: "State(next) = f(State(current), Inputs)",
          },
          {
            label: "Output model",
            expression: "Output = g(State(current), Inputs)",
          },
        ],
      },
      {
        title: "Synchronous and Asynchronous Circuits",
        paragraphs: [
          "A synchronous circuit coordinates most state changes with a shared clock. This gives designers predictable update points and is the common approach in processors and registers.",
          "An asynchronous circuit can change state when inputs change, without waiting for a shared clock. It can respond quickly but is harder to design because signal delays and ordering matter more.",
        ],
        table: {
          headers: ["Synchronous", "Asynchronous"],
          rows: [
            ["State changes at controlled clock events", "State can change when inputs change"],
            ["Easier timing model", "Timing depends strongly on signal delays"],
            ["Common in CPUs and registers", "Used in specialized control and interfaces"],
          ],
        },
      },
      {
        title: "Moore and Mealy Outputs",
        paragraphs: [
          "A Moore machine calculates output from the stored state only. Its output normally changes after the state changes.",
          "A Mealy machine calculates output from the stored state and current inputs. It may react to an input before the next state update, so it often needs fewer states but requires careful timing.",
        ],
        formulas: [
          { label: "Moore output", expression: "Output = g(State(current))" },
          { label: "Mealy output", expression: "Output = g(State(current), Inputs)" },
        ],
      },
      {
        title: "Why Feedback Creates Memory",
        paragraphs: [
          "Feedback sends a stored output back toward the circuit input. Because an earlier output participates in the next calculation, the circuit can keep information after an external input changes.",
          "Feedback must be controlled carefully. A clocked storage element provides a clear moment for accepting a new state and prevents uncontrolled repeated changes.",
        ],
        flow: ["Stored output", "Feedback path", "Next-state logic", "Clock event", "New stored output"],
      },
      {
        title: "Clock and Timing Terms",
        paragraphs: [
          "A clock is a repeating signal that changes between 0 and 1. A rising edge is a 0-to-1 change. A falling edge is a 1-to-0 change.",
          "An edge-triggered flip-flop samples its input near one chosen edge. The input must be stable for a short time before and after that edge.",
        ],
        visual: {
          src: "/notes/modern-computer-architecture/edge-triggered-timing.png",
          alt: "Aligned clock, D, and Q waveforms showing setup time before a rising edge, hold time after it, and clock-to-Q delay.",
          width: 1536,
          height: 1024,
          caption: "A D flip-flop needs stable input around the active clock edge.",
        },
        dataTable: {
          headers: ["Term", "Simple meaning"],
          rows: [
            ["Clock period, T", "Time for one complete clock cycle"],
            ["Frequency, f", "Number of clock cycles each second"],
            ["Setup time", "Input must be stable before the active edge"],
            ["Hold time", "Input must remain stable after the active edge"],
            ["Propagation delay", "Time for the output to respond"],
          ],
        },
        formulas: [
          { label: "Clock relation", expression: "f = 1 / T" },
          { label: "Clock period", expression: "T = 1 / f" },
          {
            label: "Basic register-to-register timing",
            expression: "T(min) ≥ t(clock-to-Q) + t(logic) + t(setup)",
            note: "Clock uncertainty and wiring delay are added in a more complete design.",
          },
        ],
      },
      {
        title: "Metastability",
        paragraphs: [
          "If an input changes too close to the active edge, setup or hold time can be violated. The flip-flop may briefly stay between a clear 0 and 1. This unstable condition is called metastability.",
          "Designers cannot remove the physical possibility completely, but they reduce its risk with correct timing and synchronizer flip-flops when an external or unrelated clock-domain signal enters the circuit.",
        ],
        points: [
          "Meet setup and hold requirements for normal synchronous paths.",
          "Use a synchronizer for a one-bit asynchronous input.",
          "Do not treat a synchronizer as a replacement for a proper multi-bit clock-domain crossing design.",
        ],
      },
      {
        title: "Worked Problems",
        paragraphs: [],
        problems: [
          {
            title: "Find a clock period",
            prompt: "A circuit uses a 250 MHz clock. Find one clock period.",
            steps: [
              "Use T = 1 / f.",
              "f = 250 MHz = 250 × 10⁶ Hz.",
              "T = 1 / (250 × 10⁶) seconds.",
              "T = 4 × 10⁻⁹ seconds.",
            ],
            answer: "T = 4 ns",
          },
          {
            title: "Trace a next-state rule",
            prompt: "A one-bit state follows State(next) = State(current) ⊕ X. The current state is 0. Trace X = 1, 0, 1 across three clock edges.",
            steps: [
              "Edge 1: 0 ⊕ 1 = 1, so the new state is 1.",
              "Edge 2: 1 ⊕ 0 = 1, so the state remains 1.",
              "Edge 3: 1 ⊕ 1 = 0, so the new state is 0.",
            ],
            answer: "State sequence after the edges: 1, 1, 0",
          },
          {
            title: "Find a safe maximum clock frequency",
            prompt: "A path has clock-to-Q delay 1 ns, combinational delay 6 ns, and setup time 1 ns. Ignore clock uncertainty. Find the minimum period and maximum frequency.",
            steps: [
              "T(min) = 1 ns + 6 ns + 1 ns = 8 ns.",
              "f(max) = 1 / T(min).",
              "f(max) = 1 / (8 × 10⁻⁹) Hz = 125 × 10⁶ Hz.",
            ],
            answer: "Minimum period = 8 ns; maximum frequency = 125 MHz",
          },
        ],
      },
    ],
    mechanism: {
      title: "How one clocked state update works",
      steps: [
        "A register holds the current state.",
        "Combinational logic reads that state and the current inputs.",
        "The logic calculates a next-state value.",
        "The next-state value waits at the storage input.",
        "At the active clock edge, the storage element accepts it.",
        "The accepted value becomes the new current state.",
      ],
    },
    example: {
      title: "A traffic-light controller",
      body: "The current state may be Green, Yellow, or Red. A timer input and the stored current state decide the next state. The clock moves the controller to that next state at a controlled moment.",
    },
    misconception:
      "A clock does not perform the calculation. Combinational logic calculates the next value; the clock controls when that value is stored.",
  },
  revise: {
    definition:
      "Sequential logic uses stored state and may also use current inputs. A clock commonly controls when the state changes.",
    sections: [
      {
        title: "Core Model",
        flow: ["Current state + inputs", "Next-state logic", "Storage at clock edge", "New state"],
        formulas: [
          { expression: "State(next) = f(State(current), Inputs)" },
          { expression: "f = 1 / T" },
          { expression: "T(min) ≥ t(clock-to-Q) + t(logic) + t(setup)" },
        ],
      },
      {
        title: "Timing Words",
        table: {
          headers: ["Term", "Remember"],
          rows: [
            ["Setup", "Stable before edge"],
            ["Hold", "Stable after edge"],
            ["Propagation", "Output response delay"],
          ],
        },
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Combinational logic has no stored state.",
      "Sequential logic remembers earlier information.",
      "Feedback carries stored state into a later calculation.",
      "A flip-flop usually updates at one clock edge.",
      "Frequency and period are reciprocals.",
      "The current state becomes the next cycle's stored starting point.",
    ],
    followUp: "Why does a sequential circuit need both next-state logic and a storage element?",
  },
  lastMinute: {
    definition: "Sequential logic remembers state; an output may use state alone or state plus input.",
    sections: [
      {
        title: "Timing Recall",
        points: [
          "Rising edge: 0 to 1.",
          "Falling edge: 1 to 0.",
          "Setup is before the edge; hold is after it.",
          "f = 1 / T.",
        ],
      },
    ],
    memoryLine: "Logic decides the next state; the clock stores it.",
    cues: ["Input + state", "Feedback", "Clock edge", "Setup before", "Hold after"],
    trap: "Do not describe a register as combinational logic. It stores state.",
  },
};

export const latchesAndFlipFlops: SubjectTopic = {
  slug: "latches-and-flip-flops",
  title: "Latches and Flip-Flops",
  description:
    "Learn SR, D, JK, and T storage elements using truth tables, characteristic equations, and state tracing.",
  readTime: "36 min",
  difficulty: "Intermediate",
  tags: ["Latch", "Flip-Flop", "State Table"],
  learn: {
    opening:
      "A latch or flip-flop stores one bit. A latch is level-sensitive, while an edge-triggered flip-flop normally changes only at its active clock edge.",
    sections: [
      {
        title: "Latch vs Flip-Flop",
        paragraphs: [
          "A latch can respond while its enable level is active. When enable becomes inactive, it keeps its last value.",
          "A flip-flop samples inputs at a clock edge and keeps its output until another active edge. This makes large synchronous circuits easier to coordinate.",
        ],
        table: {
          headers: ["Latch", "Flip-flop"],
          rows: [
            ["Level-sensitive", "Edge-triggered"],
            ["May change throughout an active enable level", "Changes only near the active clock edge"],
            ["Often simpler", "Common in synchronous registers"],
          ],
        },
        visual: {
          src: "/notes/modern-computer-architecture/latches-flip-flops.svg",
          alt: "Simple block symbols for SR, D, JK, and T one-bit storage elements with their main behavior.",
          width: 1536,
          height: 1024,
          caption: "Different input rules control how one stored bit changes.",
        },
      },
      {
        title: "Active-High SR Latch",
        paragraphs: [
          "S means set and R means reset. Set makes Q equal to 1. Reset makes Q equal to 0. When both inputs are 0, the latch keeps its earlier output.",
          "For a basic active-high NOR SR latch, S = 1 and R = 1 is invalid because set and reset are requested together. NAND-based active-low latches use different input rules, so always check the circuit type.",
        ],
        dataTable: {
          headers: ["S", "R", "Q(next)", "Action"],
          rows: [
            ["0", "0", "Q(current)", "Hold"],
            ["0", "1", "0", "Reset"],
            ["1", "0", "1", "Set"],
            ["1", "1", "Invalid", "Forbidden for NOR latch"],
          ],
        },
      },
      {
        title: "D Latch and D Flip-Flop",
        paragraphs: [
          "The D input removes the invalid SR combination. An active-high D latch follows D while Enable = 1 and holds its earlier output while Enable = 0.",
          "A D flip-flop is different: the value present at D at the active clock edge becomes the new Q. Between active edges, Q keeps its stored value.",
        ],
        formulas: [
          { label: "D flip-flop", expression: "Q(next) = D" },
        ],
        dataTable: {
          headers: ["Device", "Control", "D", "Q(next)"],
          rows: [
            ["D latch", "Enable = 0", "X", "Q(current)"],
            ["D latch", "Enable = 1", "0", "0"],
            ["D latch", "Enable = 1", "1", "1"],
            ["D flip-flop", "No active edge", "X", "Q(current)"],
            ["D flip-flop", "Active edge", "0", "0"],
            ["D flip-flop", "Active edge", "1", "1"],
          ],
        },
      },
      {
        title: "Asynchronous Preset and Clear",
        paragraphs: [
          "Some flip-flops have preset and clear inputs that work without waiting for the clock. Preset forces Q = 1, and clear forces Q = 0.",
          "These inputs are useful for initialization and reset. They may be active-high or active-low, so a bubble or bar on the symbol must be checked. Activating preset and clear together is normally forbidden.",
        ],
        dataTable: {
          headers: ["Preset", "Clear", "Q", "Meaning"],
          rows: [
            ["0", "0", "Normal clocked behavior", "Neither active in this active-high example"],
            ["1", "0", "1", "Asynchronous set"],
            ["0", "1", "0", "Asynchronous reset"],
            ["1", "1", "Invalid", "Do not request both"],
          ],
        },
      },
      {
        title: "JK Flip-Flop",
        paragraphs: [
          "The JK flip-flop improves the SR design. J acts like set, K acts like reset, and J = K = 1 toggles the stored bit instead of creating an invalid state.",
        ],
        formulas: [
          {
            label: "JK characteristic equation",
            expression: "Q(next) = J¬Q(current) ∨ ¬KQ(current)",
          },
        ],
        dataTable: {
          headers: ["J", "K", "Q(next)", "Action"],
          rows: [
            ["0", "0", "Q(current)", "Hold"],
            ["0", "1", "0", "Reset"],
            ["1", "0", "1", "Set"],
            ["1", "1", "¬Q(current)", "Toggle"],
          ],
        },
      },
      {
        title: "JK Race-Around Condition",
        paragraphs: [
          "In a level-triggered JK circuit, J = K = 1 requests toggle. If the active clock level lasts longer than the internal propagation delay, Q may toggle repeatedly before the clock becomes inactive. The final value then becomes uncertain. This is called race-around.",
          "An edge-triggered JK flip-flop limits the update to one edge. A master-slave JK design uses two stages on opposite clock phases so only one final toggle reaches the output per clock cycle.",
        ],
        table: {
          headers: ["Problem", "Common solution"],
          rows: [
            ["Repeated toggling while clock level is active", "Use edge-triggered JK"],
            ["Input and output active in the same level", "Use master-slave stages"],
          ],
        },
      },
      {
        title: "T Flip-Flop",
        paragraphs: [
          "T means toggle. When T = 0, the flip-flop holds its value. When T = 1, it changes 0 to 1 or 1 to 0 at each active clock edge.",
          "Because it can divide a clock frequency by two, the T flip-flop is useful in counters.",
        ],
        formulas: [
          { label: "T characteristic equation", expression: "Q(next) = T ⊕ Q(current)" },
          { label: "Frequency division", expression: "f(Q) = f(clock) / 2 when T = 1" },
        ],
        dataTable: {
          headers: ["T", "Q(next)", "Action"],
          rows: [
            ["0", "Q(current)", "Hold"],
            ["1", "¬Q(current)", "Toggle"],
          ],
        },
      },
      {
        title: "Excitation Table",
        paragraphs: [
          "A characteristic table asks what next state an input produces. An excitation table works backward: it asks which input is needed for a required state change. X means either 0 or 1 is acceptable.",
        ],
        dataTable: {
          headers: ["Q(current)", "Q(next)", "S", "R", "D", "J", "K", "T"],
          rows: [
            ["0", "0", "0", "X", "0", "0", "X", "0"],
            ["0", "1", "1", "0", "1", "1", "X", "1"],
            ["1", "0", "0", "1", "0", "X", "1", "1"],
            ["1", "1", "X", "0", "1", "X", "0", "0"],
          ],
        },
      },
      {
        title: "Worked Problems",
        paragraphs: [],
        problems: [
          {
            title: "Trace a JK flip-flop",
            prompt: "A JK flip-flop starts with Q = 0. Trace input pairs JK = 10, 11, 01, 00 across four active edges.",
            steps: [
              "Edge 1, JK = 10: set, so Q = 1.",
              "Edge 2, JK = 11: toggle, so Q = 0.",
              "Edge 3, JK = 01: reset, so Q = 0.",
              "Edge 4, JK = 00: hold, so Q remains 0.",
            ],
            answer: "Q after each edge: 1, 0, 0, 0",
          },
          {
            title: "Find required flip-flop inputs",
            prompt: "A stored bit must change from 1 to 0. Find suitable D, T, and JK inputs.",
            steps: [
              "For D, Q(next) = D, so choose D = 0.",
              "For T, a change requires toggle, so choose T = 1.",
              "For JK with current Q = 1, reset requires K = 1 while J can be either value.",
            ],
            answer: "D = 0, T = 1, JK = X1",
          },
          {
            title: "Use a T flip-flop as a divider",
            prompt: "A T flip-flop has T = 1 and receives a 20 MHz clock. What is the Q frequency?",
            steps: [
              "With T = 1, Q toggles at every active clock edge.",
              "One complete Q cycle needs two clock edges.",
              "f(Q) = 20 MHz / 2.",
            ],
            answer: "f(Q) = 10 MHz",
          },
          {
            title: "Read D from a timing sequence",
            prompt: "A rising-edge D flip-flop starts at Q = 0. D is 1 at the first rising edge, changes to 0 between edges, and is 0 at the second rising edge. Find Q after each rising edge.",
            steps: [
              "At the first rising edge, D = 1, so Q becomes 1 after clock-to-Q delay.",
              "D changes between edges, but the edge-triggered Q holds its stored value.",
              "At the second rising edge, D = 0, so Q becomes 0 after clock-to-Q delay.",
            ],
            answer: "Q after the two rising edges: 1, then 0",
          },
        ],
      },
    ],
    mechanism: {
      title: "How to trace any flip-flop",
      steps: [
        "Write the initial value of Q.",
        "Read the inputs at the first active clock edge.",
        "Use the correct characteristic table to find Q(next).",
        "Make that result the current Q for the next edge.",
        "Repeat once per active edge.",
        "Do not change Q between edges for an edge-triggered flip-flop.",
      ],
    },
    example: {
      title: "Why D flip-flops build registers",
      body: "Each D flip-flop stores one chosen data bit at the same clock edge. Placing eight D flip-flops side by side creates an eight-bit register that captures one byte together.",
    },
    misconception:
      "The SR invalid input depends on the latch implementation. S = R = 1 is invalid for an active-high NOR latch, while an active-low NAND latch uses different active levels.",
  },
  revise: {
    definition:
      "A latch is level-sensitive. A flip-flop is normally edge-triggered and stores one bit.",
    sections: [
      {
        title: "Behavior Map",
        table: {
          headers: ["Element", "Key rule"],
          rows: [
            ["SR", "Set, reset, hold, and one forbidden combination"],
            ["D", "Q(next) = D"],
            ["JK", "11 toggles"],
            ["T", "1 toggles; 0 holds"],
          ],
        },
      },
      {
        title: "Characteristic Equations",
        formulas: [
          { expression: "D: Q(next) = D" },
          { expression: "JK: Q(next) = J¬Q ∨ ¬KQ" },
          { expression: "T: Q(next) = T ⊕ Q" },
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "A D flip-flop copies D only at its active edge.",
      "JK removes the invalid SR condition by toggling at 11.",
      "T = 1 toggles and can divide frequency by two.",
      "A D latch follows D while enabled; a D flip-flop samples D at an edge.",
    ],
    followUp: "Why does a JK flip-flop not have the same forbidden combination as an SR latch?",
  },
  lastMinute: {
    definition: "One flip-flop stores one bit at a clock edge.",
    sections: [
      {
        title: "Instant Recall",
        points: [
          "D copies.",
          "JK = 00 hold, 01 reset, 10 set, 11 toggle.",
          "T = 0 hold, T = 1 toggle.",
          "NOR SR uses 11 as invalid.",
        ],
      },
    ],
    memoryLine: "D copies, JK controls, T toggles.",
    cues: ["One stored bit", "Active edge", "D next equals D", "JK 11 toggle", "T divide by 2"],
    trap: "Do not update an edge-triggered output every time an input changes between clock edges.",
  },
};

export const registersAndShiftRegisters: SubjectTopic = {
  slug: "registers-and-shift-registers",
  title: "Registers and Shift Registers",
  description:
    "Combine flip-flops into multi-bit registers and trace parallel loading and serial shifting.",
  readTime: "40 min",
  difficulty: "Intermediate",
  tags: ["Register", "Shift Register", "Enable"],
  learn: {
    opening:
      "A register is a group of flip-flops that stores a multi-bit word. All flip-flops normally share one clock so the complete word updates together.",
    sections: [
      {
        title: "Building an n-Bit Register",
        paragraphs: [
          "One D flip-flop stores one bit, so an n-bit register needs n D flip-flops. An eight-bit register stores one byte and uses eight storage elements.",
          "A load or enable signal chooses whether the register accepts new data or keeps its current value. A clear or reset input places the register in a known starting state, commonly all 0s.",
        ],
        formulas: [
          { label: "Storage elements", expression: "D flip-flops required = register width" },
          {
            label: "Register with load control",
            expression: "Q(next) = Load ? D : Q(current)",
            note: "If Load = 1, store D. If Load = 0, hold Q.",
          },
          {
            label: "Example control priority",
            expression: "Clear > Load or Shift > Hold",
          },
        ],
      },
      {
        title: "Register Input and Output Styles",
        paragraphs: [
          "Serial means one bit moves on one data line per clock. Parallel means all bits move together on separate lines.",
        ],
        dataTable: {
          headers: ["Type", "Input", "Output", "Typical use"],
          rows: [
            ["SISO", "Serial", "Serial", "Delay a bit stream"],
            ["SIPO", "Serial", "Parallel", "Serial-to-parallel conversion"],
            ["PISO", "Parallel", "Serial", "Parallel-to-serial conversion"],
            ["PIPO", "Parallel", "Parallel", "Store and transfer a word"],
          ],
        },
      },
      {
        title: "Four-Bit Shift Register",
        paragraphs: [
          "A shift register connects the Q output of one flip-flop to the D input of the next. At every active clock edge, all stored bits move one position together.",
          "A right shift discards the rightmost bit unless it is captured as serial output. A new serial input enters at the left side.",
        ],
        visual: {
          src: "/notes/modern-computer-architecture/shift-register.png",
          alt: "Four D flip-flops connected as a right-shift register with serial input, shared clock, and serial output.",
          width: 1536,
          height: 1024,
          caption: "One active edge shifts every stored bit by one position.",
        },
        formulas: [
          {
            label: "Right-shift update",
            expression: "Q₃Q₂Q₁Q₀(next) = SerialIn, Q₃, Q₂, Q₁",
          },
        ],
      },
      {
        title: "Universal Shift Register",
        paragraphs: [
          "A universal shift register can hold, shift right, shift left, or load parallel data. Multiplexers before the D inputs select the required source for the next clock edge.",
        ],
        dataTable: {
          headers: ["S₁", "S₀", "Example operation"],
          rows: [
            ["0", "0", "Hold"],
            ["0", "1", "Shift right"],
            ["1", "0", "Shift left"],
            ["1", "1", "Parallel load"],
          ],
        },
      },
      {
        title: "Shift, Rotate, and Clear",
        paragraphs: [
          "A shift discards one end bit and inserts a new bit at the other end. A rotate returns the outgoing bit to the opposite end, so no stored bit is lost.",
          "A clear operation overrides ordinary loading or shifting in many teaching designs. Always follow the priority specified by the circuit rather than assuming every register uses the same order.",
        ],
        dataTable: {
          headers: ["Operation on 1011", "Result", "What enters"],
          rows: [
            ["Logical right shift", "0101", "0 enters left"],
            ["Rotate right", "1101", "Old rightmost 1 enters left"],
            ["Logical left shift", "0110", "0 enters right"],
            ["Rotate left", "0111", "Old leftmost 1 enters right"],
            ["Clear", "0000", "Reset value"],
          ],
        },
      },
      {
        title: "Ring and Johnson Counters",
        paragraphs: [
          "A ring counter is a shift register whose last output feeds the first input. With one stored 1 circulating, an n-bit ring counter has n useful states.",
          "A Johnson counter feeds the inverted last output into the first input. An n-bit Johnson counter produces 2n useful states and is also called a twisted-ring counter.",
        ],
        formulas: [
          { label: "Ring counter states", expression: "Useful states = n" },
          { label: "Johnson counter states", expression: "Useful states = 2n" },
        ],
        table: {
          headers: ["Ring counter", "Johnson counter"],
          rows: [
            ["Feeds back the last bit", "Feeds back the inverted last bit"],
            ["n useful states", "2n useful states"],
            ["Needs a valid one-hot start", "Moves through runs of 1s and 0s"],
          ],
        },
      },
      {
        title: "Worked Problems",
        paragraphs: [],
        problems: [
          {
            title: "Trace a right shift",
            prompt: "A 4-bit register starts at 1011. It shifts right twice with serial inputs 0 and then 1. Find the state after each edge.",
            steps: [
              "Start: Q₃Q₂Q₁Q₀ = 1011.",
              "Edge 1 inserts 0 on the left and shifts right: 0101.",
              "Edge 2 inserts 1 on the left and shifts right: 1010.",
            ],
            answer: "States after the edges: 0101, then 1010",
          },
          {
            title: "Count storage elements",
            prompt: "How many D flip-flops are needed for twelve 16-bit registers?",
            steps: [
              "Each 16-bit register needs 16 D flip-flops.",
              "There are 12 registers.",
              "Total = 12 × 16.",
            ],
            answer: "192 D flip-flops",
          },
          {
            title: "Trace load and hold",
            prompt: "A 4-bit register contains 0110. At the next edge D = 1101 and Load = 0. At the following edge Load becomes 1 with the same D. Find both states.",
            steps: [
              "First edge: Load = 0, so the register holds 0110.",
              "Second edge: Load = 1, so the register stores D = 1101.",
            ],
            answer: "States: 0110, then 1101",
          },
          {
            title: "Trace bidirectional shifting",
            prompt: "A 4-bit universal register starts at 1010. First shift left with serial input 1, then shift right with serial input 0. Find both states.",
            steps: [
              "Left shift moves Q₂Q₁Q₀ toward Q₃Q₂Q₁ and inserts 1 at Q₀.",
              "1010 shifted left with input 1 becomes 0101.",
              "Right shift inserts 0 at Q₃ and moves the other bits right.",
              "0101 shifted right with input 0 becomes 0010.",
            ],
            answer: "States: 0101, then 0010",
          },
          {
            title: "Count Johnson states",
            prompt: "How many useful states does a 5-bit Johnson counter have?",
            steps: [
              "A Johnson counter with n flip-flops has 2n useful states.",
              "Substitute n = 5.",
              "Useful states = 2 × 5.",
            ],
            answer: "10 useful states",
          },
        ],
      },
    ],
    mechanism: {
      title: "How a controlled register updates",
      steps: [
        "Current Q values remain available at the outputs.",
        "Control logic chooses hold, load, or shift data for each D input.",
        "The selected next values wait at the D inputs.",
        "At the active clock edge, all flip-flops capture together.",
        "The complete new word appears at the register outputs.",
      ],
    },
    example: {
      title: "Serial input from a device",
      body: "A SIPO register can receive one bit per clock from a serial device. After enough clock edges, the complete word is available on parallel outputs for the processor to use.",
    },
    misconception:
      "Shifting is not the same as rotating. A shift introduces a new bit and discards an old bit; a rotate sends the discarded bit back to the other end.",
  },
  revise: {
    definition:
      "A register stores a multi-bit word. A shift register also moves stored bits left or right at clock edges.",
    sections: [
      {
        title: "Register Types",
        table: {
          headers: ["Name", "Meaning"],
          rows: [
            ["SISO", "Serial in, serial out"],
            ["SIPO", "Serial in, parallel out"],
            ["PISO", "Parallel in, serial out"],
            ["PIPO", "Parallel in, parallel out"],
          ],
        },
      },
      {
        title: "Key Rules",
        formulas: [
          { expression: "n-bit register = n flip-flops" },
          { expression: "Load = 0: hold; Load = 1: store D" },
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "All bits usually update on the same clock edge.",
      "Serial moves one bit per clock; parallel moves a whole word.",
      "A right shift inserts at the left and discards from the right.",
      "Multiplexers choose the source for each next bit.",
      "Clear normally places every bit in a known reset state.",
    ],
    followUp: "Why does an eight-bit parallel register need eight flip-flops but only one shared clock?",
  },
  lastMinute: {
    definition: "Register stores a word; shift register stores and moves it.",
    sections: [
      {
        title: "Fast Recall",
        points: [
          "n bits need n flip-flops.",
          "S = serial, P = parallel.",
          "Load 0 holds; Load 1 stores.",
          "Shift and rotate are different.",
          "Clear commonly has highest control priority.",
        ],
      },
    ],
    memoryLine: "One flip-flop per bit; one clock updates the word.",
    cues: ["SISO", "SIPO", "PISO", "PIPO", "Hold shift load"],
    trap: "For a right shift, write every old bit one position to the right before inserting the new left bit.",
  },
};

export const memoryOrganization: SubjectTopic = {
  slug: "memory-organization",
  title: "Memory Organization",
  description:
    "Understand words, addresses, RAM and ROM operations, capacity calculations, and chip expansion.",
  readTime: "30 min",
  difficulty: "Intermediate",
  tags: ["RAM", "ROM", "Addressing"],
  learn: {
    opening:
      "A memory stores many words. An address selects one word, and the data width tells how many bits that word contains. The notation N × M means N words with M bits in each word.",
    sections: [
      {
        title: "Words, Addresses, and Capacity",
        paragraphs: [
          "An 8 × 4 memory contains eight separately addressable words, each four bits wide. It stores 8 × 4 = 32 bits in total.",
          "To select N words, the minimum address width is the ceiling of log₂(N). Ceiling means round upward to the next whole number. When N is a power of two, this is exactly log₂(N). Three address bits form eight patterns, so they select one of eight words.",
        ],
        visual: {
          src: "/notes/modern-computer-architecture/memory-organization.png",
          alt: "Three address lines enter a 3-to-8 decoder to select one row of an eight-word by four-bit memory.",
          width: 1536,
          height: 1024,
          caption: "Address width selects a word; data width selects the number of bits in that word.",
        },
        formulas: [
          { label: "Address bits", expression: "Address bits = ⌈log₂(number of words)⌉" },
          { label: "Capacity", expression: "Capacity in bits = words × bits per word" },
          { label: "Bytes", expression: "Capacity in bytes = capacity in bits / 8" },
        ],
      },
      {
        title: "Read and Write Operations",
        paragraphs: [
          "For a read, the address chooses one word and the stored word appears on the data output. Reading normally does not change the stored value.",
          "For a write, the address chooses one word, data inputs provide the new word, and a write-enable signal allows storage at the active control event.",
        ],
        dataTable: {
          headers: ["Operation", "Address", "Data bus", "Control"],
          rows: [
            ["Read", "Selects source word", "Memory drives output data", "Read enabled"],
            ["Write", "Selects destination word", "External circuit provides input data", "Write enabled"],
          ],
        },
        flow: ["Address selects word", "Control chooses read or write", "Data moves", "Memory or receiver accepts result"],
      },
      {
        title: "Common Memory Control Signals",
        paragraphs: [
          "Chip Select, or CS, enables the memory chip. Output Enable, or OE, allows a selected chip to drive read data onto the bus. Write Enable, or WE, tells the selected chip to store input data.",
          "Signal names may be active-low and written with a bar or a leading slash, such as /CS or /WE. Active-low means the function is requested with logic 0.",
        ],
        dataTable: {
          headers: ["CS", "OE", "WE", "Typical action"],
          rows: [
            ["0", "X", "X", "Chip disabled in this active-high example"],
            ["1", "1", "0", "Read selected word"],
            ["1", "X", "1", "Write selected word"],
          ],
        },
      },
      {
        title: "RAM and ROM",
        paragraphs: [
          "RAM supports normal reading and writing while a system runs. It is commonly volatile, meaning its contents disappear when power is removed.",
          "ROM is intended to keep fixed or rarely changed information. It is non-volatile and can store firmware or startup code. Real ROM families differ in how they are programmed or erased.",
        ],
        table: {
          headers: ["RAM", "ROM"],
          rows: [
            ["Read and write during normal operation", "Mainly read during normal operation"],
            ["Usually volatile", "Non-volatile"],
            ["Working data and active programs", "Firmware and fixed tables"],
          ],
        },
      },
      {
        title: "SRAM and DRAM",
        paragraphs: [
          "SRAM stores each bit in a latch-like cell. It is fast and does not need refresh while power remains, but its cells use more hardware and cost more per bit.",
          "DRAM stores a bit as charge in a capacitor. The charge leaks, so the memory controller must refresh it. DRAM is denser and cheaper per bit, which makes it suitable for main memory.",
        ],
        table: {
          headers: ["SRAM", "DRAM"],
          rows: [
            ["Faster", "Slower than SRAM"],
            ["No refresh while powered", "Requires periodic refresh"],
            ["Lower density and higher cost per bit", "Higher density and lower cost per bit"],
            ["Commonly used for cache", "Commonly used for main memory"],
          ],
        },
      },
      {
        title: "ROM Families",
        paragraphs: [
          "ROM families differ mainly in how stored contents can be programmed or erased.",
        ],
        dataTable: {
          headers: ["Type", "Programming and erasing"],
          rows: [
            ["Mask ROM", "Written during manufacturing"],
            ["PROM", "Programmed once by the user"],
            ["EPROM", "Erased using ultraviolet light and reprogrammed"],
            ["EEPROM", "Electrically erased and reprogrammed"],
            ["Flash", "EEPROM family erased in blocks"],
          ],
        },
      },
      {
        title: "Byte-Addressable and Word-Addressable Memory",
        paragraphs: [
          "In byte-addressable memory, each address selects one byte. A four-byte word therefore occupies four consecutive addresses.",
          "In word-addressable memory, each address selects one complete word. Address calculations must use the architecture's addressable unit, not just the physical data-bus width.",
        ],
        table: {
          headers: ["Byte-addressable", "Word-addressable"],
          rows: [
            ["One address selects one byte", "One address selects one word"],
            ["32-bit word uses four byte addresses", "32-bit word uses one word address"],
          ],
        },
      },
      {
        title: "Building Larger Memory",
        paragraphs: [
          "Width expansion places chips in parallel so each chip supplies part of one wider word. The chips share address lines but connect to different data-bit positions.",
          "Depth expansion creates more words. Higher address bits select one chip group, while lower address bits select a word inside the chosen chip.",
        ],
        visual: {
          src: "/notes/modern-computer-architecture/memory-chip-expansion.svg",
          alt: "Four banks containing two 1K by 8 chips each combine depth and width to create a 4K by 16 memory.",
          width: 1536,
          height: 1024,
          caption: "Four banks increase depth; two parallel chips increase word width.",
        },
        formulas: [
          {
            label: "Chip count",
            expression: "Chips = depth factor × width factor",
          },
          {
            label: "Expansion factors",
            expression: "Depth factor = required words / chip words; width factor = required width / chip width",
          },
        ],
      },
      {
        title: "Worked Problems",
        paragraphs: [],
        problems: [
          {
            title: "Find address lines and capacity",
            prompt: "A memory is organized as 512 × 8. Find its address lines and total capacity.",
            steps: [
              "512 = 2⁹, so nine address bits select 512 words.",
              "Capacity = 512 words × 8 bits per word = 4096 bits.",
              "4096 / 8 = 512 bytes.",
            ],
            answer: "9 address lines; 4096 bits = 512 bytes",
          },
          {
            title: "Build a larger memory from chips",
            prompt: "How many 1K × 8 chips are required to build a 4K × 16 memory?",
            steps: [
              "Depth factor = 4K / 1K = 4.",
              "Width factor = 16 / 8 = 2.",
              "Total chips = 4 × 2 = 8.",
              "Two chips work in parallel for each 16-bit word, and four such groups provide 4K words.",
            ],
            answer: "8 memory chips",
          },
          {
            title: "Find the address range",
            prompt: "A word-addressable memory has 12 address lines. How many word locations and what address range does it have?",
            steps: [
              "Twelve address bits create 2¹² = 4096 addresses.",
              "Counting starts at 0, so the decimal range is 0 to 4095.",
              "In hexadecimal, 0 is 000 and 4095 is FFF.",
            ],
            answer: "4096 words, addresses 0x000 to 0xFFF",
          },
          {
            title: "Count ideal register storage",
            prompt: "If a teaching design builds a 32 × 16 memory entirely from D flip-flops, how many flip-flops are required?",
            steps: [
              "The memory has 32 words.",
              "Each word contains 16 bits.",
              "One D flip-flop stores one bit in this teaching design.",
              "Total = 32 × 16.",
            ],
            answer: "512 D flip-flops",
          },
          {
            title: "Address a non-power-of-two memory",
            prompt: "What is the minimum number of address bits for 1000 words, and how many address patterns remain unused?",
            steps: [
              "2⁹ = 512, which is not enough for 1000 words.",
              "2¹⁰ = 1024, so ten address bits are required.",
              "Unused patterns = 1024 - 1000.",
            ],
            answer: "10 address bits; 24 address patterns are unused",
          },
        ],
      },
    ],
    mechanism: {
      title: "How a memory read works",
      steps: [
        "The processor places an address on the address bus.",
        "A decoder activates the selected word line.",
        "The selected cells place their stored bits on internal bit lines.",
        "Output circuits drive the word onto the data bus.",
        "The requesting circuit receives the data.",
      ],
    },
    example: {
      title: "Meaning of 1K × 8",
      body: "1K means 1024 separately addressed words, and × 8 means each word contains eight bits. The memory needs ten address bits because 2¹⁰ = 1024, and it stores 8192 bits or 1024 bytes.",
    },
    misconception:
      "Memory size notation is words × bits per word, not address bits × data bits. A 1K × 8 chip has 1024 words, not 10 words.",
  },
  revise: {
    definition:
      "An N × M memory contains N addressable words with M bits in each word.",
    sections: [
      {
        title: "Core Formulas",
        formulas: [
          { expression: "Address bits = ⌈log₂(words)⌉" },
          { expression: "Capacity bits = words × word width" },
          { expression: "Capacity bytes = capacity bits / 8" },
          { expression: "Chips = depth factor × width factor" },
        ],
      },
      {
        title: "Expansion",
        table: {
          headers: ["Need", "Method"],
          rows: [
            ["More bits per word", "Place chips in parallel"],
            ["More words", "Use higher address bits to select chip groups"],
          ],
        },
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "N words require log₂(N) address bits when N is a power of two.",
      "The data-bus width normally matches the word width.",
      "A read should not change the stored word.",
      "RAM is normally volatile; ROM is non-volatile.",
      "Increase width in parallel and depth through selection.",
      "CS selects the chip, OE controls read output, and WE controls writing.",
    ],
    followUp: "Why does a 2K × 16 memory need eleven address lines but sixteen data lines?",
  },
  lastMinute: {
    definition: "N × M means N words, M bits per word.",
    sections: [
      {
        title: "Numerical Checklist",
        points: [
          "Address bits = ⌈log₂(words)⌉.",
          "Total bits = words × width.",
          "Divide bits by 8 for bytes.",
          "Chip count = depth factor × width factor.",
        ],
      },
    ],
    memoryLine: "Address chooses the word; data lines carry the word.",
    cues: ["Words × width", "Ceiling log₂", "CS OE WE", "Width in parallel", "Depth by selection"],
    trap: "Do not use total capacity to find address lines. Address lines select words, not individual bits, unless the memory is bit-addressable.",
  },
};

export const programCounter: SubjectTopic = {
  slug: "program-counter",
  title: "Program Counter",
  description:
    "Understand how the PC selects instruction addresses using hold, increment, load, and reset controls.",
  readTime: "32 min",
  difficulty: "Intermediate",
  tags: ["Program Counter", "Instruction Fetch", "Control"],
  learn: {
    opening:
      "The program counter, or PC, is a register that holds the address used for instruction fetch. During a fetch it is the current instruction address. After the clocked update, it becomes the address used by the next fetch.",
    sections: [
      {
        title: "Why the CPU Needs a PC",
        paragraphs: [
          "Instruction memory contains many instructions. The PC output selects the instruction address for the current fetch.",
          "After a normal instruction, the PC advances by the instruction size. A teaching word-addressed architecture with one instruction per word may use PC + 1. A byte-addressed architecture with fixed four-byte instructions commonly uses PC + 4.",
          "For a jump, taken branch, function call, return, or reset, control logic can select a different address.",
        ],
        visual: {
          src: "/notes/modern-computer-architecture/program-counter.svg",
          alt: "Program counter with load value, reset, load, increment, clock, and current instruction-address output.",
          width: 1536,
          height: 1024,
          caption: "Control selects whether the PC resets, loads, increments, or holds.",
        },
        flow: ["PC address", "Instruction memory", "Fetched instruction", "Control decision", "Next PC value"],
      },
      {
        title: "PC Operations",
        paragraphs: [
          "The simple teaching PC in these notes uses one addressed word per instruction, so Increment means PC + 1. Hold keeps the same address. Load accepts a supplied target. Reset returns to the starting address, commonly 0.",
          "In a real instruction set, replace +1 with the number of addressable units occupied by the instruction.",
        ],
        dataTable: {
          headers: ["Reset", "Load", "Increment", "PC(next)"],
          rows: [
            ["1", "X", "X", "0"],
            ["0", "1", "X", "Input address"],
            ["0", "0", "1", "PC(current) + 1"],
            ["0", "0", "0", "PC(current)"],
          ],
        },
        formulas: [
          {
            label: "Priority rule",
            expression: "Reset > Load > Increment > Hold",
          },
        ],
      },
      {
        title: "Selecting the Next PC",
        paragraphs: [
          "Next-PC logic calculates possible addresses and a multiplexer selects one. The ordinary path uses PC plus instruction size. A branch adds a signed offset. A jump supplies a target, and reset supplies the architecture's reset address.",
          "The selected address waits at the PC input and is stored at the active clock edge.",
        ],
        visual: {
          src: "/notes/modern-computer-architecture/next-pc-selection.png",
          alt: "A next-PC multiplexer selecting between sequential, branch, jump, and reset addresses before the program-counter register.",
          width: 1536,
          height: 1024,
          caption: "PC control selects one candidate address for the next clock edge.",
        },
        formulas: [
          {
            label: "Sequential address",
            expression: "PC(sequential) = PC(current) + instruction size",
          },
          {
            label: "PC-relative branch",
            expression: "Branch target = PC(current) + instruction size + signed offset",
          },
        ],
      },
      {
        title: "Branches, Jumps, Calls, and Returns",
        paragraphs: [
          "A conditional branch selects its target only when its condition is true. If the condition is false, execution follows the sequential address.",
          "A jump selects a target without using a true-or-false condition. A function call also saves a return address, normally the sequential address after the call. A later return loads that saved address into the PC.",
        ],
        dataTable: {
          headers: ["Control transfer", "Next-PC source"],
          rows: [
            ["Normal instruction", "PC + instruction size"],
            ["Branch not taken", "PC + instruction size"],
            ["Branch taken", "PC + instruction size + signed offset"],
            ["Jump", "Jump target"],
            ["Function return", "Saved return address"],
          ],
        },
      },
      {
        title: "Control Priority",
        paragraphs: [
          "Several control inputs can accidentally be 1 together. A priority rule gives one clear next value. In this module's teaching PC, reset has highest priority, then load, then increment, and hold is the default.",
          "A real processor may use different signal names or internal logic, but its PC must still choose exactly one next address.",
        ],
        flow: ["Reset?", "Else load?", "Else increment?", "Else hold", "Store at clock edge"],
      },
      {
        title: "PC Width and Address Range",
        paragraphs: [
          "A k-bit PC can represent 2ᵏ different instruction addresses. If the PC increments beyond its maximum unsigned value, fixed-width arithmetic wraps to 0 unless the architecture handles the event differently.",
        ],
        formulas: [
          { label: "Address count", expression: "Instruction addresses = 2ᵏ" },
          { label: "Unsigned PC range", expression: "0 to 2ᵏ - 1" },
        ],
      },
      {
        title: "Worked Problems",
        paragraphs: [],
        problems: [
          {
            title: "Trace PC controls",
            prompt: "A PC starts at 20. Across four clock edges the controls are: increment; load 80; increment; reset. Find the PC after each edge.",
            steps: [
              "Edge 1, increment: 20 + 1 = 21.",
              "Edge 2, load: PC becomes 80.",
              "Edge 3, increment: 80 + 1 = 81.",
              "Edge 4, reset: PC becomes 0.",
            ],
            answer: "PC sequence: 21, 80, 81, 0",
          },
          {
            title: "Apply control priority",
            prompt: "PC = 45, input address = 120, and Reset = 0, Load = 1, Increment = 1. Find PC(next).",
            steps: [
              "Reset is 0, so reset is not selected.",
              "Load is 1 and has priority over increment.",
              "The PC accepts the input address 120.",
            ],
            answer: "PC(next) = 120",
          },
          {
            title: "Find PC width",
            prompt: "A processor can address 64K instruction locations. What is the minimum PC width?",
            steps: [
              "64K = 64 × 1024 = 65,536 locations.",
              "65,536 = 2¹⁶.",
              "Sixteen bits create all required address patterns.",
            ],
            answer: "Minimum PC width = 16 bits",
          },
          {
            title: "Trace wraparound",
            prompt: "An 8-bit PC contains 11111111 and receives Increment = 1. What is the next value?",
            steps: [
              "11111111₂ is the maximum 8-bit value, 255.",
              "Adding 1 gives 1 00000000.",
              "The PC keeps eight bits, so the carry is discarded.",
            ],
            answer: "PC(next) = 00000000₂, assuming normal fixed-width wraparound",
          },
          {
            title: "Calculate a PC-relative branch target",
            prompt: "A byte-addressed processor uses four-byte instructions. The current PC is 1000 and a taken branch has signed offset -24. Find the branch target.",
            steps: [
              "Find the sequential address: 1000 + 4 = 1004.",
              "Add the signed offset: 1004 + (-24).",
              "1004 - 24 = 980.",
            ],
            answer: "Branch target = 980",
          },
          {
            title: "Find a function return address",
            prompt: "A four-byte call instruction is fetched at address 400. Which return address should be saved?",
            steps: [
              "The return should continue after the call instruction.",
              "Sequential address = current PC + instruction size.",
              "Return address = 400 + 4.",
            ],
            answer: "Save return address 404",
          },
        ],
      },
    ],
    mechanism: {
      title: "How the PC supports instruction fetch",
      steps: [
        "The PC outputs the current instruction address.",
        "Instruction memory returns the instruction at that address.",
        "The control unit examines the instruction and branch conditions.",
        "Next-PC logic chooses hold, increment, load target, or reset.",
        "At the active clock edge, the PC stores the chosen address.",
        "The next fetch begins from the new PC value.",
      ],
    },
    example: {
      title: "Jumping over instructions",
      body: "In the teaching word-addressed design, if the PC is 30, normal execution continues at 31. A taken jump can load 100 instead, so the next fetched instruction comes from address 100.",
    },
    misconception:
      "The PC normally stores an instruction address, not the instruction itself. Instruction memory uses the PC value to find the instruction.",
  },
  revise: {
    definition:
      "The PC is a clocked register containing the address of the instruction to fetch.",
    sections: [
      {
        title: "Priority Table",
        table: {
          headers: ["First true action", "PC(next)"],
          rows: [
            ["Reset", "0"],
            ["Load", "Target address"],
            ["Increment", "PC + instruction size; PC + 1 in this teaching design"],
            ["None", "Hold PC"],
          ],
        },
      },
      {
        title: "Range",
        formulas: [
          { expression: "k-bit PC has 2ᵏ addresses" },
          { expression: "Range = 0 to 2ᵏ - 1" },
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "PC output selects an instruction-memory address.",
      "Increment continues sequential execution.",
      "Load supports jumps and taken branches.",
      "Reset returns to the defined start address.",
      "Only the chosen value is stored at the clock edge.",
    ],
    followUp: "Why must load have priority over increment when a jump is taken?",
  },
  lastMinute: {
    definition: "During fetch, PC holds the current instruction address; after update, it holds the next fetch address.",
    sections: [
      {
        title: "Action Order",
        points: [
          "Reset to 0.",
          "Else load target.",
          "Else advance by instruction size; +1 in the teaching word-addressed design.",
          "Else hold.",
        ],
      },
    ],
    memoryLine: "Reset, load, increment, hold: first true action wins.",
    cues: ["Instruction address", "PC + instruction size", "Load a target", "Reset to start", "k bits give 2ᵏ addresses"],
    trap: "Do not say the PC stores the current instruction data. It stores an address.",
  },
};
