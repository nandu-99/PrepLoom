import type { SubjectTopic } from "@/lib/subject-content";

export const hackComputerPlatform: SubjectTopic = {
  slug: "hack-computer-platform",
  title: "Stored-Program Model and Hack Computer",
  description:
    "Understand the Hack platform, its separate instruction and data memories, and its memory-mapped devices.",
  readTime: "28 min",
  difficulty: "Foundation",
  tags: ["Hack Computer", "Harvard Architecture", "Memory Map"],
  learn: {
    opening:
      "Hack is a simple 16-bit computer designed to make every hardware and software step visible. It contains a CPU, instruction memory, data memory, a screen, and a keyboard.",
    sections: [
      {
        title: "Stored Programs and Machine Instructions",
        paragraphs: [
          "A stored program is a sequence of binary instructions kept in memory. The CPU repeatedly fetches one instruction, performs its operation, and selects the address of the next instruction.",
          "Every processor understands a defined machine language. Hack instructions are 16 bits wide and directly control its registers, ALU, memory writes, and program counter.",
        ],
        flow: ["PC supplies address", "Instruction memory returns instruction", "CPU executes", "PC selects next address"],
      },
      {
        title: "Hack Uses Separate Memories",
        paragraphs: [
          "Hack uses a ROM32K for instructions and a separate data-memory address space. This is a Harvard-style organization because instructions and data travel through separate memory paths.",
          "The separate paths allow the CPU to receive an instruction while also reading or writing data. A traditional von Neumann organization keeps instructions and data in one shared memory space.",
        ],
        visual: {
          src: "/notes/modern-computer-architecture/hack-computer-platform.svg",
          alt: "Hack platform with ROM32K supplying instructions to the CPU and a separate data-memory space containing RAM16K, screen, and keyboard.",
          width: 1536,
          height: 1024,
          caption: "Hack separates instruction memory from data memory and memory-mapped I/O.",
        },
        table: {
          headers: ["Von Neumann style", "Hack Harvard style"],
          rows: [
            ["Instructions and data share memory", "Instructions and data use separate memories"],
            ["One shared memory path may become a bottleneck", "Instruction and data paths are independent"],
            ["Code and data share one address space", "ROM and data memory have separate addressing roles"],
          ],
        },
      },
      {
        title: "Main Hack Components",
        paragraphs: [],
        dataTable: {
          headers: ["Component", "Main job"],
          rows: [
            ["CPU", "Decode and execute the current 16-bit instruction"],
            ["ROM32K", "Store up to 32K program instructions loaded before execution"],
            ["RAM16K", "Store working data"],
            ["Screen", "Display pixels through memory-mapped words"],
            ["Keyboard", "Provide the current key code through a memory-mapped word"],
            ["Clock", "Coordinate state changes"],
            ["Reset", "Restart instruction fetching from address 0"],
          ],
        },
        formulas: [
          { label: "Instruction-memory address count", expression: "32K = 2¹⁵ instruction addresses" },
          { label: "Instruction width", expression: "One Hack instruction = 16 bits" },
        ],
      },
      {
        title: "Hack Data-Memory Map",
        paragraphs: [
          "The CPU uses one data-memory address space for ordinary RAM and I/O devices. Reading or writing selected addresses communicates with the screen or keyboard instead of an ordinary RAM word.",
          "The screen is 512 pixels wide and 256 pixels high. Its 8192 memory words each control 16 horizontal pixels. The keyboard register is read-only: it contains 0 when no key is pressed and a key code while a key is pressed.",
        ],
        dataTable: {
          headers: ["Address range", "Meaning"],
          rows: [
            ["0 to 16383", "RAM16K"],
            ["16384 to 24575", "Screen memory map"],
            ["24576", "Keyboard register"],
          ],
        },
        formulas: [
          { label: "Screen base", expression: "SCREEN = 16384 = 0x4000" },
          { label: "Keyboard address", expression: "KBD = 24576 = 0x6000" },
          { label: "Screen size", expression: "512 × 256 pixels = 8192 words × 16 pixels" },
          { label: "Pixel word address", expression: "SCREEN + row × 32 + floor(column ÷ 16)" },
          { label: "Pixel bit", expression: "column mod 16" },
        ],
      },
      {
        title: "What Stored-Program Means in Hack",
        paragraphs: [
          "The program is stored as machine instructions in ROM32K before execution begins. The PC chooses which ROM instruction the CPU reads next.",
          "Hack follows the stored-program idea, but its running CPU cannot write new instructions into ROM. It can only write data through the data-memory interface.",
        ],
        table: {
          headers: ["Instruction side", "Data side"],
          rows: [
            ["PC addresses ROM32K", "A supplies the data-memory address"],
            ["Read by the CPU", "Read or written by the CPU"],
            ["Program loaded before execution", "Values change while the program runs"],
          ],
        },
      },
      {
        title: "Worked Problems",
        paragraphs: [],
        problems: [
          {
            title: "Find the ROM address width",
            prompt: "ROM32K stores 32K instructions. How many address bits are required?",
            steps: [
              "32K = 32 × 1024 = 32768 instructions.",
              "32768 = 2¹⁵.",
              "Fifteen bits create all instruction addresses from 0 through 32767.",
            ],
            answer: "ROM32K needs 15 address bits.",
          },
          {
            title: "Classify a memory access",
            prompt: "What does the Hack computer access at data-memory addresses 120, 17000, and 24576?",
            steps: [
              "120 is between 0 and 16383, so it selects RAM16K.",
              "17000 is between 16384 and 24575, so it selects screen memory.",
              "24576 is the keyboard register.",
            ],
            answer: "120: RAM; 17000: screen; 24576: keyboard",
          },
          {
            title: "Find a screen pixel location",
            prompt: "Which screen word and bit control the pixel at row 10, column 35? Rows and columns start at 0.",
            steps: [
              "Each row uses 512 ÷ 16 = 32 screen words.",
              "The word offset is 10 × 32 + floor(35 ÷ 16) = 320 + 2 = 322.",
              "The data-memory address is 16384 + 322 = 16706.",
              "The bit position is 35 mod 16 = 3.",
            ],
            answer: "The pixel is controlled by bit 3 of RAM[16706].",
          },
          {
            title: "Read the keyboard register",
            prompt: "What does RAM[24576] contain when no key is pressed, and how should a program test for a pressed key?",
            steps: [
              "Address 24576 is the predefined KBD register.",
              "It contains 0 when no key is pressed.",
              "A non-zero value represents the currently pressed key code.",
            ],
            answer: "Read KBD and test whether its value is zero or non-zero.",
          },
        ],
      },
    ],
    mechanism: {
      title: "How one Hack instruction cycle works",
      steps: [
        "The PC supplies an address to ROM32K.",
        "ROM32K outputs the 16-bit instruction stored at that address.",
        "The CPU interprets the instruction fields.",
        "Registers, the ALU, and data memory perform the requested work.",
        "The CPU increments the PC or loads a jump target.",
        "The next instruction is fetched from the selected ROM address.",
      ],
    },
    example: {
      title: "Writing to the screen",
      body: "A program places a screen-memory address in the A register and writes a 16-bit value to M. Because M means RAM[A], the memory system routes that write to the mapped screen word and the corresponding pixels change.",
    },
    misconception:
      "Hack's ROM32K and RAM16K are not one shared memory. The PC addresses instruction ROM, while the A register supplies addresses for data memory.",
  },
  revise: {
    definition:
      "Hack is a 16-bit Harvard-style teaching computer with separate instruction and data memories.",
    sections: [
      {
        title: "Platform Map",
        flow: ["PC", "ROM32K", "16-bit instruction", "CPU", "RAM / Screen / Keyboard"],
      },
      {
        title: "Important Addresses",
        table: {
          headers: ["Name", "Address"],
          rows: [
            ["RAM", "0 to 16383"],
            ["SCREEN", "16384 or 0x4000"],
            ["KBD", "24576 or 0x6000; 0 means no key"],
          ],
        },
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Hack instructions and data use separate memories.",
      "Every instruction is 16 bits.",
      "ROM32K has 2¹⁵ instruction locations.",
      "Screen and keyboard are accessed through memory addresses.",
      "The screen has 8192 words, with 16 pixels controlled by each word.",
      "The program is loaded into ROM before execution; the CPU cannot write ROM.",
      "Reset makes instruction fetching restart at address 0.",
    ],
    followUp: "Why can Hack fetch an instruction and access data memory through separate paths?",
  },
  lastMinute: {
    definition: "Hack = 16-bit CPU + ROM32K + RAM16K + screen + keyboard.",
    sections: [
      {
        title: "Address Recall",
        points: [
          "RAM: 0 to 16383.",
          "SCREEN: 16384.",
          "KBD: 24576; zero means no key.",
          "Screen word = SCREEN + row × 32 + floor(column ÷ 16).",
          "PC addresses ROM, A addresses data memory.",
        ],
      },
    ],
    memoryLine: "PC points to code; A points to data.",
    cues: ["16-bit", "ROM32K", "RAM16K", "8192 screen words", "KBD zero", "Memory-mapped I/O"],
    trap: "Do not say M is a third register. M means the data-memory word RAM[A].",
  },
};

export const hackCpuDatapath: SubjectTopic = {
  slug: "hack-cpu-datapath",
  title: "Hack CPU Datapath",
  description:
    "Follow instructions and data through the A register, D register, ALU, memory interface, and PC.",
  readTime: "35 min",
  difficulty: "Intermediate",
  tags: ["CPU Datapath", "A Register", "D Register"],
  learn: {
    opening:
      "The Hack CPU connects a small number of parts with carefully controlled paths. The instruction decides what the A and D registers store, what the ALU computes, whether memory is written, and whether the PC jumps.",
    sections: [
      {
        title: "A, D, and M",
        paragraphs: [
          "A is a 16-bit register with two jobs. It can hold a number used in a computation, or it can hold a data-memory address and a jump target.",
          "D is a 16-bit data register used for temporary values and ALU calculations. M is not a physical CPU register. M means the memory word at the address stored in A: RAM[A].",
        ],
        formulas: [
          { label: "Memory symbol", expression: "M = RAM[A]" },
          { label: "ALU X input", expression: "X = D" },
          { label: "ALU Y input", expression: "Y = A when a = 0; Y = M when a = 1" },
        ],
      },
      {
        title: "Inside the CPU",
        paragraphs: [
          "An A-instruction loads its 15-bit value into A. A C-instruction sends D and either A or M to the ALU, then uses destination bits to store the result.",
          "The ALU also reports whether its result is zero or negative. Jump logic combines these flags with the jump field and either increments the PC or loads it from A.",
        ],
        visual: {
          src: "/notes/modern-computer-architecture/hack-cpu-datapath.svg",
          alt: "Hack CPU datapath connecting the instruction, A and D registers, A-or-M selector, ALU, status flags, jump control, data-memory interface, and PC.",
          width: 1536,
          height: 1024,
          caption: "Instruction fields control the data path, storage destinations, and next PC.",
        },
      },
      {
        title: "Hack CPU Interface Signals",
        paragraphs: [
          "The CPU communicates with instruction memory and data memory through a small interface. Signal names follow the standard Hack hardware specification.",
        ],
        dataTable: {
          headers: ["Signal", "Direction", "Meaning"],
          rows: [
            ["instruction", "Input", "Current 16-bit instruction from ROM"],
            ["inM", "Input", "Current value of RAM[A]"],
            ["outM", "Output", "ALU result offered to data memory"],
            ["writeM", "Output", "Write outM into RAM[addressM] when 1"],
            ["addressM", "Output", "Lower 15 bits of the A-register output"],
            ["pc", "Output", "Address of the next instruction to fetch"],
            ["reset", "Input", "Reset PC to 0"],
          ],
        },
      },
      {
        title: "When Values Change",
        paragraphs: [
          "The ALU is combinational, so outM, writeM, zr, and ng respond to current inputs during the cycle. A, D, and PC are clocked registers and accept their selected next values at the clock edge.",
          "A memory write also uses the current A-register address. In an instruction such as AM=D, the memory destination refers to the address held in A before the clock edge while A receives its new value at the edge.",
        ],
        table: {
          headers: ["Combinational during cycle", "Stored at clock edge"],
          rows: [
            ["ALU result, zr, ng, outM, writeM", "A register, D register, PC, memory write"],
          ],
        },
      },
      {
        title: "Control Equations and PC Priority",
        paragraphs: [
          "Let isC be 1 for a C-instruction. The destination bits dA, dD, and dM only control writes when isC is 1. An A-instruction loads A directly, so loadA is also true when isC is 0.",
          "Reset has the highest PC priority. Without reset, a true jump loads the old A-register value into PC. Otherwise PC increments. If one C-instruction writes A and jumps, the jump still uses the A value that was present before the clock edge.",
        ],
        formulas: [
          { label: "A-register load", expression: "loadA = ¬isC ∨ dA" },
          { label: "D-register load", expression: "loadD = isC ∧ dD" },
          { label: "Memory write", expression: "writeM = isC ∧ dM" },
          { label: "Memory address", expression: "addressM = A[0..14]" },
          { label: "Memory output", expression: "outM = ALU output" },
          { label: "PC load", expression: "loadPC = isC ∧ jumpCondition" },
        ],
        flow: ["reset? PC = 0", "else jump? PC = old A", "else PC = PC + 1"],
      },
      {
        title: "Worked Problems",
        paragraphs: [],
        problems: [
          {
            title: "Trace register and memory values",
            prompt: "Trace @10, D=A, @20, M=D. Find final A, D, and RAM[20].",
            steps: [
              "@10 loads A = 10.",
              "D=A sends A through the ALU and stores the result in D, so D = 10.",
              "@20 loads A = 20 while D remains 10.",
              "M=D writes D into RAM[A], so RAM[20] = 10.",
            ],
            answer: "A = 20, D = 10, RAM[20] = 10",
          },
          {
            title: "Trace an ALU computation",
            prompt: "Trace @5, D=A, @3, D=D+A. Find the final D value.",
            steps: [
              "@5 loads A = 5.",
              "D=A stores 5 in D.",
              "@3 changes A to 3 while D remains 5.",
              "D=D+A computes 5 + 3 and stores 8 in D.",
            ],
            answer: "Final D = 8",
          },
          {
            title: "Choose the ALU Y source",
            prompt: "For D=D+M, A = 100, D = 7, and RAM[100] = 9. What enters the ALU and what is stored?",
            steps: [
              "The expression uses M, so the a bit selects RAM[A] for Y.",
              "X = D = 7 and Y = RAM[100] = 9.",
              "The ALU computes 7 + 9 = 16.",
              "The destination is D, so D receives 16.",
            ],
            answer: "ALU inputs are 7 and 9; final D = 16",
          },
          {
            title: "Trace a simultaneous A and memory destination",
            prompt: "Before AM=D executes, A = 20, D = 7, and RAM[20] = 3. What changes at the clock edge?",
            steps: [
              "The ALU result is the current D value, which is 7.",
              "M refers to RAM at the old A address, so the memory write targets RAM[20].",
              "Both destination bits are active, so RAM[20] receives 7 and A receives 7 at the same edge.",
              "After the edge, M refers to RAM[7] because A is now 7.",
            ],
            answer: "RAM[20] = 7 and A = 7; the write does not go to RAM[7].",
          },
          {
            title: "Trace a write-and-jump instruction",
            prompt: "Before A=D;JMP executes, A = 40 and D = 12. Which value enters A, and which address enters PC?",
            steps: [
              "The computation D produces 12.",
              "The A destination schedules A = 12 at the clock edge.",
              "JMP schedules PC to load the current A-register output.",
              "The current, or old, A value is 40 during this cycle.",
            ],
            answer: "A becomes 12, while PC jumps to ROM address 40.",
          },
        ],
      },
    ],
    mechanism: {
      title: "How a C-instruction moves through the CPU",
      steps: [
        "The instruction's a bit selects A or M for the ALU Y input.",
        "D supplies the ALU X input.",
        "The six computation bits configure the ALU.",
        "The ALU produces out plus zr and ng flags.",
        "Destination bits select A, D, and/or memory for the result.",
        "Jump bits and flags decide whether PC loads A or increments.",
      ],
    },
    example: {
      title: "Why @address usually comes before M",
      body: "Because M means RAM[A], a program normally uses an A-instruction to select a memory address before a C-instruction reads or writes M.",
    },
    misconception:
      "The value A and the value M are different. A is the address register value; M is the data stored in RAM at that address.",
  },
  revise: {
    definition:
      "The Hack datapath sends D and either A or M through the ALU, stores selected results, and updates the PC.",
    sections: [
      {
        title: "Register Roles",
        table: {
          headers: ["Name", "Role"],
          rows: [
            ["A", "Value, memory address, or jump target"],
            ["D", "Temporary data and ALU input"],
            ["M", "RAM[A], not a CPU register"],
            ["PC", "Instruction ROM address"],
          ],
        },
      },
      {
        title: "ALU Inputs",
        formulas: [
          { expression: "X = D" },
          { expression: "Y = A if a = 0; Y = RAM[A] if a = 1" },
        ],
      },
      {
        title: "Control Recall",
        formulas: [
          { expression: "loadA = ¬isC ∨ dA" },
          { expression: "loadD = isC ∧ dD" },
          { expression: "writeM = isC ∧ dM" },
          { expression: "addressM = A[0..14]" },
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "A-instruction always loads A.",
      "C-instruction computes, optionally stores, and optionally jumps.",
      "outM is the ALU output; writeM decides whether memory stores it.",
      "addressM comes from A.",
      "Reset wins over jump; a taken jump wins over PC increment.",
      "A simultaneous write or jump uses the old A address during the current cycle.",
      "zr and ng describe the ALU result used by the jump test.",
    ],
    followUp: "For D=M, which values supply the ALU inputs and where is the result stored?",
  },
  lastMinute: {
    definition: "D is data, A selects A or RAM[A], and PC selects the instruction.",
    sections: [
      {
        title: "Datapath Recall",
        points: [
          "X input is D.",
          "a = 0 selects A; a = 1 selects M.",
          "ddd writes A, D, and/or M.",
          "jjj plus zr/ng controls PC loading.",
          "PC priority: reset, then jump, then increment.",
          "Memory and jump use old A when the same instruction also writes A.",
        ],
      },
    ],
    memoryLine: "D and A-or-M enter the ALU; destinations and jump bits use its result.",
    cues: ["A address", "D data", "M RAM[A]", "outM", "zr ng", "PC"],
    trap: "Changing A changes which memory word M refers to.",
  },
};

export const hackInstructionFormats: SubjectTopic = {
  slug: "hack-instruction-formats",
  title: "Hack Instruction Formats",
  description:
    "Read and encode the exact 16-bit formats used by Hack A-instructions and C-instructions.",
  readTime: "31 min",
  difficulty: "Intermediate",
  tags: ["Machine Code", "A-Instruction", "C-Instruction"],
  learn: {
    opening:
      "Hack has two instruction formats. If the most significant bit is 0, the instruction loads a 15-bit value into A. If the first three bits are 111, the instruction is a C-instruction.",
    sections: [
      {
        title: "Two 16-Bit Formats",
        paragraphs: [
          "An A-instruction is written as @value or @symbol. In machine code it begins with 0 followed by a 15-bit non-negative value or resolved address.",
          "A C-instruction is written as dest=comp;jump. The destination and jump parts are optional, but the computation part is required.",
        ],
        visual: {
          src: "/notes/modern-computer-architecture/hack-instruction-formats.png",
          alt: "Hack A-instruction format with a leading zero and 15-bit value, plus C-instruction format 111 a cccccc ddd jjj.",
          width: 1536,
          height: 1024,
          caption: "The leading field distinguishes value loading from computation and control.",
        },
        formulas: [
          { label: "A-instruction", expression: "0 vvvvvvvvvvvvvvv" },
          { label: "C-instruction", expression: "111 a cccccc ddd jjj" },
          { label: "Assembly syntax", expression: "dest=comp;jump" },
        ],
      },
      {
        title: "A-Instruction",
        paragraphs: [
          "The 15-bit value range is 0 through 32767. The assembler replaces a symbol with a numeric address before creating the binary instruction.",
          "Loading A also changes what M means, because M always refers to RAM[A]. It also prepares the jump target used by a following jump instruction.",
        ],
        formulas: [
          { label: "Value range", expression: "0 to 2¹⁵ - 1 = 32767" },
          { label: "Example", expression: "@21 → 0000000000010101" },
        ],
      },
      {
        title: "C-Instruction Fields",
        paragraphs: [
          "The fixed 111 prefix identifies the format. The a bit chooses A or M for computations that use the Y input. The six c bits select an ALU function. The d bits select destinations, and the j bits select a jump condition.",
        ],
        dataTable: {
          headers: ["Field", "Width", "Purpose"],
          rows: [
            ["111", "3 bits", "C-instruction prefix"],
            ["a", "1 bit", "Use A or M as ALU Y source"],
            ["cccccc", "6 bits", "Select computation"],
            ["ddd", "3 bits", "Select A, D, and M destinations"],
            ["jjj", "3 bits", "Select jump condition"],
          ],
        },
      },
      {
        title: "Reading Assembly Syntax",
        paragraphs: [
          "The equals sign separates destination from computation. The semicolon separates computation from jump. A missing destination means do not store the result. A missing jump means continue to the next instruction.",
          "Hack accepts only the exact comp mnemonics in its specification. Two expressions may have the same mathematical meaning but different syntax: D+A is legal, while A+D is not a standard Hack mnemonic.",
        ],
        dataTable: {
          headers: ["Instruction", "Destination", "Computation", "Jump"],
          rows: [
            ["D=A", "D", "A", "None"],
            ["M=D+1", "M", "D+1", "None"],
            ["D;JGT", "None", "D", "JGT"],
            ["0;JMP", "None", "0", "JMP"],
            ["MD=D-1;JNE", "M and D", "D-1", "JNE"],
          ],
        },
      },
      {
        title: "Valid and Invalid Instruction Forms",
        paragraphs: [
          "A standard A-instruction begins with 0, and a standard C-instruction begins with 111. Words beginning with 100, 101, or 110 are not defined as normal Hack instructions.",
          "The assembler also checks the spelling and order of dest, comp, and jump. It does not rearrange an unsupported expression into a legal one.",
        ],
        dataTable: {
          headers: ["Form", "Status", "Reason"],
          rows: [
            ["@0", "Valid", "Smallest A value"],
            ["@32767", "Valid", "Largest 15-bit A value"],
            ["@32768", "Invalid", "Does not fit in 15 value bits"],
            ["D=D+A", "Valid", "D+A is an official comp mnemonic"],
            ["D=A+D", "Invalid", "A+D is not an official comp mnemonic"],
            ["MD=D-1;JNE", "Valid", "Destination, comp, and jump are all legal"],
          ],
        },
      },
      {
        title: "Worked Problems",
        paragraphs: [],
        problems: [
          {
            title: "Encode an A-instruction",
            prompt: "Encode @100 as a 16-bit Hack instruction.",
            steps: [
              "Convert 100 to 15-bit binary: 000000001100100.",
              "Place the A-instruction prefix 0 at the left.",
              "The complete word is 0 000000001100100.",
            ],
            answer: "@100 = 0000000001100100",
          },
          {
            title: "Decode an A-instruction",
            prompt: "Decode 0000000000010101.",
            steps: [
              "The first bit is 0, so this is an A-instruction.",
              "The remaining bits equal decimal 21.",
              "The instruction loads 21 into A.",
            ],
            answer: "@21",
          },
          {
            title: "Split a C-instruction",
            prompt: "Split 1111110000010000 into prefix, a, c, d, and j fields.",
            steps: [
              "Group the bits as 111 | 1 | 110000 | 010 | 000.",
              "a = 1 and c = 110000 select M.",
              "d = 010 selects D. j = 000 means no jump.",
            ],
            answer: "The instruction is D=M.",
          },
          {
            title: "Encode the A-instruction boundaries",
            prompt: "Encode the smallest and largest legal numeric A-instructions: @0 and @32767.",
            steps: [
              "The A prefix is 0.",
              "Zero uses fifteen 0 value bits.",
              "32767 = 2¹⁵ - 1, so it uses fifteen 1 value bits.",
            ],
            answer: "@0 = 0000000000000000; @32767 = 0111111111111111",
          },
        ],
      },
    ],
    mechanism: {
      title: "How to decode any Hack instruction",
      steps: [
        "Check the most significant bits.",
        "If bit 15 is 0, read the remaining 15 bits as the A value.",
        "If the prefix is 111, split the word as a | cccccc | ddd | jjj.",
        "Look up the computation field.",
        "Look up destination and jump fields.",
        "Rewrite the result as dest=comp;jump, omitting empty parts.",
      ],
    },
    example: {
      title: "Why an A-instruction has no destination field",
      body: "Its action is fixed: it always loads the A register. The fifteen remaining bits can therefore be used for the value or address.",
    },
    misconception:
      "A C-instruction does not require both an equals sign and a semicolon. Destination or jump may be absent, but comp must be present.",
  },
  revise: {
    definition:
      "A-instruction: 0 plus a 15-bit value. C-instruction: 111 a cccccc ddd jjj.",
    sections: [
      {
        title: "Field Map",
        table: {
          headers: ["Field", "Remember"],
          rows: [
            ["a + cccccc", "ALU source and operation"],
            ["ddd", "A, D, M destinations"],
            ["jjj", "Jump condition"],
          ],
        },
      },
      {
        title: "Syntax",
        formulas: [
          { expression: "@value" },
          { expression: "dest=comp;jump" },
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "All Hack instructions are 16 bits.",
      "Leading 0 means A-instruction.",
      "Prefix 111 means C-instruction.",
      "A-instruction values range from 0 through 32767.",
      "Prefixes 100, 101, and 110 are not standard Hack instruction forms.",
      "Use exact comp spellings: D+A is legal, but A+D is not.",
      "The assembler resolves symbols before producing binary output.",
    ],
    followUp: "How does the CPU distinguish @21 from a C-instruction without an opcode lookup table?",
  },
  lastMinute: {
    definition: "0 + value loads A; 111 + control fields computes, stores, and jumps.",
    sections: [
      {
        title: "Bit Order",
        points: [
          "A: 0 | 15-bit value.",
          "C: 111 | a | cccccc | ddd | jjj.",
          "Syntax: dest=comp;jump.",
          "Use only official comp mnemonics and exact operand order.",
        ],
      },
    ],
    memoryLine: "C means compute, destination, jump: c then d then j.",
    cues: ["16 bits", "0 value", "111 C", "a cccccc", "ddd", "jjj"],
    trap: "Do not count @value as two instructions, and do not rewrite D+A as A+D. Hack syntax is exact.",
  },
};

export const cInstructionControl: SubjectTopic = {
  slug: "c-instruction-control",
  title: "C-Instruction Control and Execution",
  description:
    "Use the exact comp, destination, and jump codes to encode and trace Hack C-instructions.",
  readTime: "43 min",
  difficulty: "Advanced",
  tags: ["ALU Control", "Destination Bits", "Jump Bits"],
  learn: {
    opening:
      "A Hack C-instruction does three jobs in one 16-bit word: it selects an ALU computation, chooses where to store the result, and optionally changes the PC according to the result.",
    sections: [
      {
        title: "From Fields to Hardware Actions",
        paragraphs: [
          "The a and c fields control the ALU. The d field controls write destinations. The j field and the ALU flags control whether the PC loads the address from A.",
        ],
        visual: {
          src: "/notes/modern-computer-architecture/hack-c-instruction-control.png",
          alt: "Hack C-instruction fields controlling ALU computation, A-D-M destinations, and a jump decision based on j bits plus zr and ng flags.",
          width: 1536,
          height: 1024,
          caption: "The computation creates a result; destination and jump fields decide how it is used.",
        },
      },
      {
        title: "Six Internal ALU Control Bits",
        paragraphs: [
          "The six c bits are named zx, nx, zy, ny, f, and no. They transform X and Y in a fixed order. The instruction table maps assembly expressions to these controls.",
        ],
        dataTable: {
          headers: ["Bit", "When the bit is 1"],
          rows: [
            ["zx", "Replace X with 0"],
            ["nx", "Invert X"],
            ["zy", "Replace Y with 0"],
            ["ny", "Invert Y"],
            ["f", "Add X + Y; when 0, use X AND Y"],
            ["no", "Invert the final output"],
          ],
        },
        flow: ["Zero X?", "Invert X?", "Zero Y?", "Invert Y?", "Add or AND", "Invert output?"],
      },
      {
        title: "Computation Codes",
        paragraphs: [
          "The a bit is shown separately from the six c bits. When a = 1, expressions use M instead of A for the Y input.",
        ],
        dataTable: {
          headers: ["comp", "a", "cccccc"],
          rows: [
            ["0", "0", "101010"], ["1", "0", "111111"], ["-1", "0", "111010"],
            ["D", "0", "001100"], ["A", "0", "110000"], ["!D", "0", "001101"],
            ["!A", "0", "110001"], ["-D", "0", "001111"], ["-A", "0", "110011"],
            ["D+1", "0", "011111"], ["A+1", "0", "110111"], ["D-1", "0", "001110"],
            ["A-1", "0", "110010"], ["D+A", "0", "000010"], ["D-A", "0", "010011"],
            ["A-D", "0", "000111"], ["D&A", "0", "000000"], ["D|A", "0", "010101"],
            ["M", "1", "110000"], ["!M", "1", "110001"], ["-M", "1", "110011"],
            ["M+1", "1", "110111"], ["M-1", "1", "110010"], ["D+M", "1", "000010"],
            ["D-M", "1", "010011"], ["M-D", "1", "000111"], ["D&M", "1", "000000"],
            ["D|M", "1", "010101"],
          ],
        },
      },
      {
        title: "Destination Codes",
        paragraphs: [
          "Destination bits are ordered A, D, M. More than one bit may be 1, so one result can be written to several destinations at the same clock edge.",
        ],
        dataTable: {
          headers: ["ddd", "Destination"],
          rows: [
            ["000", "None"], ["001", "M"], ["010", "D"], ["011", "MD"],
            ["100", "A"], ["101", "AM"], ["110", "AD"], ["111", "AMD"],
          ],
        },
      },
      {
        title: "Jump Codes and ALU Flags",
        paragraphs: [
          "zr = 1 means the ALU result is zero. ng = 1 means the 16-bit two's-complement result is negative. A positive result has zr = 0 and ng = 0.",
          "If the selected condition is true, the PC loads the address from A. Otherwise the PC increments. JMP is unconditional.",
        ],
        dataTable: {
          headers: ["jjj", "Mnemonic", "Jump when result is"],
          rows: [
            ["000", "None", "Never"], ["001", "JGT", "> 0"], ["010", "JEQ", "= 0"],
            ["011", "JGE", ">= 0"], ["100", "JLT", "< 0"], ["101", "JNE", "!= 0"],
            ["110", "JLE", "<= 0"], ["111", "JMP", "Always"],
          ],
        },
        formulas: [
          { label: "Positive result", expression: "positive = ¬zr ∧ ¬ng" },
          { label: "Zero result", expression: "zero = zr" },
          { label: "Negative result", expression: "negative = ng" },
        ],
      },
      {
        title: "Exact Jump Logic",
        paragraphs: [
          "Each conditional jump is a Boolean test on zr and ng. These flags describe the current ALU output, even when the instruction does not store that output.",
        ],
        dataTable: {
          headers: ["Jump", "Boolean condition", "Meaning"],
          rows: [
            ["JGT", "¬zr ∧ ¬ng", "Positive"],
            ["JEQ", "zr", "Zero"],
            ["JGE", "¬ng", "Positive or zero"],
            ["JLT", "ng", "Negative"],
            ["JNE", "¬zr", "Positive or negative"],
            ["JLE", "ng ∨ zr", "Negative or zero"],
            ["JMP", "1", "Always"],
          ],
        },
      },
      {
        title: "Signed Values and Overflow",
        paragraphs: [
          "Hack arithmetic uses 16-bit two's-complement values. The signed range is -32768 through 32767. The ALU keeps only the lower 16 result bits and provides no separate overflow flag.",
          "This means a positive addition can wrap into a negative bit pattern. Jump logic then tests the wrapped 16-bit result through zr and ng.",
        ],
        formulas: [
          { label: "Signed range", expression: "-2¹⁵ to 2¹⁵ - 1 = -32768 to 32767" },
          { label: "Overflow example", expression: "32767 + 1 = 1000000000000000₂ = -32768" },
          { label: "Stored result", expression: "result = arithmetic output mod 2¹⁶" },
        ],
      },
      {
        title: "Worked Problems",
        paragraphs: [],
        problems: [
          {
            title: "Encode D=M",
            prompt: "Encode the C-instruction D=M.",
            steps: [
              "Prefix = 111.",
              "M uses a = 1 and cccccc = 110000.",
              "Destination D uses ddd = 010.",
              "No jump uses jjj = 000.",
              "Join: 111 | 1 | 110000 | 010 | 000.",
            ],
            answer: "D=M → 1111110000010000",
          },
          {
            title: "Encode an unconditional jump",
            prompt: "Encode 0;JMP.",
            steps: [
              "Prefix = 111.",
              "comp 0 uses a = 0 and cccccc = 101010.",
              "No destination uses ddd = 000.",
              "JMP uses jjj = 111.",
            ],
            answer: "0;JMP → 1110101010000111",
          },
          {
            title: "Evaluate a jump",
            prompt: "A = 240, D = 5, and the instruction is D;JGT. What happens to the PC?",
            steps: [
              "The ALU result is D = 5.",
              "Five is positive, so zr = 0 and ng = 0.",
              "JGT is true for a positive result.",
              "The PC loads the target held in A.",
            ],
            answer: "The jump is taken and PC becomes 240.",
          },
          {
            title: "Decode a full C-instruction",
            prompt: "Decode 1110000010010000.",
            steps: [
              "Split: 111 | 0 | 000010 | 010 | 000.",
              "a = 0 and c = 000010 mean D+A.",
              "ddd = 010 selects D.",
              "jjj = 000 means no jump.",
            ],
            answer: "D=D+A",
          },
          {
            title: "Encode destination, computation, and jump together",
            prompt: "Encode MD=D-1;JNE.",
            steps: [
              "The fixed prefix is 111.",
              "D-1 uses a = 0 and cccccc = 001110.",
              "MD uses destination bits 011.",
              "JNE uses jump bits 101.",
              "Join the fields: 111 | 0 | 001110 | 011 | 101.",
            ],
            answer: "MD=D-1;JNE → 1110001110011101",
          },
          {
            title: "Evaluate signed overflow",
            prompt: "D contains 32767 and D=D+1 executes. What is the new D value, and would D;JLT jump next?",
            steps: [
              "32767 is 0111111111111111 in 16 bits.",
              "Adding 1 produces 1000000000000000.",
              "That bit pattern represents -32768 in two's complement, so ng = 1.",
              "JLT tests ng, so a following D;JLT would jump.",
            ],
            answer: "D becomes -32768, and a following D;JLT takes the jump.",
          },
        ],
      },
    ],
    mechanism: {
      title: "How to encode a C-instruction",
      steps: [
        "Write the fixed prefix 111.",
        "Find a and cccccc from the comp table.",
        "Find ddd from the destination table.",
        "Find jjj from the jump table.",
        "Join the fields without spaces.",
        "Check that the final instruction contains exactly 16 bits.",
      ],
    },
    example: {
      title: "One result, several destinations",
      body: "For AMD=D+1, the ALU computes D+1 once. Destination code 111 stores that same result into A, D, and RAM at the old A address at the clock edge.",
    },
    misconception:
      "Jump conditions test the ALU result of the current C-instruction, not the earlier value of D unless D itself is the selected computation.",
  },
  revise: {
    definition:
      "C-instruction fields choose ALU work, result destinations, and a jump condition.",
    sections: [
      {
        title: "Field Jobs",
        flow: ["a + cccccc: compute", "ddd: store", "jjj + zr/ng: jump", "PC loads A or increments"],
      },
      {
        title: "Destination Bit Order",
        formulas: [{ expression: "ddd = A D M" }],
      },
      {
        title: "Jump Groups",
        table: {
          headers: ["Result", "Mnemonics"],
          rows: [
            ["Positive / zero / negative", "JGT / JEQ / JLT"],
            ["Positive or zero", "JGE"],
            ["Positive or negative", "JNE"],
            ["Negative or zero", "JLE"],
            ["Always", "JMP"],
          ],
        },
      },
      {
        title: "Signed Recall",
        formulas: [
          { expression: "16-bit signed range = -32768 to 32767" },
          { expression: "32767 + 1 → -32768" },
          { expression: "Hack has zr and ng, but no overflow flag" },
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "a = 0 uses A; a = 1 uses M for relevant computations.",
      "ddd bit order is A, D, M.",
      "zr means zero and ng means negative.",
      "A taken jump loads PC from A.",
      "No jump means PC increments.",
      "JGE = ¬ng, JNE = ¬zr, and JLE = ng ∨ zr.",
      "Arithmetic wraps to 16 bits; Hack has no overflow flag.",
    ],
    followUp: "Why must @TARGET execute before 0;JMP?",
  },
  lastMinute: {
    definition: "C-instruction = compute, destination, jump.",
    sections: [
      {
        title: "Encoding Order",
        points: [
          "Start 111.",
          "Look up a + cccccc.",
          "Write ddd in A-D-M order.",
          "Look up jjj.",
          "Count 16 bits.",
          "Signed overflow wraps around; test the final 16-bit result.",
        ],
      },
    ],
    memoryLine: "Compute first; store the result; test the same result for jumping.",
    cues: ["zx nx zy ny f no", "A D M", "zr ng", "16-bit wrap", "PC loads A"],
    trap: "For M computations set a = 1. Keeping a = 0 selects A instead.",
  },
};

export const hackAssemblyProgramming: SubjectTopic = {
  slug: "hack-assembly-programming",
  title: "Hack Assembly Programming",
  description:
    "Write and trace Hack assembly using symbols, variables, memory operations, branches, and loops.",
  readTime: "52 min",
  difficulty: "Intermediate",
  tags: ["Assembly", "Symbols", "Loops"],
  learn: {
    opening:
      "Hack assembly gives readable names to the two binary instruction formats. An assembler removes labels, resolves symbols, and converts every real instruction into one 16-bit machine word.",
    sections: [
      {
        title: "Assembly Building Blocks",
        paragraphs: [
          "An A-instruction selects a number or address. A C-instruction computes, stores, or jumps. Comments begin with // and do not create machine instructions.",
        ],
        dataTable: {
          headers: ["Form", "Example", "Meaning"],
          rows: [
            ["A-instruction", "@21", "Load 21 into A"],
            ["Symbolic A-instruction", "@count", "Load the resolved address of count"],
            ["C-instruction", "D=M", "Read RAM[A] into D"],
            ["Label", "(LOOP)", "Name the address of the next real instruction"],
            ["Comment", "// repeat", "Explanation ignored by assembler"],
          ],
        },
        visual: {
          src: "/notes/modern-computer-architecture/hack-assembly-loop.svg",
          alt: "A Hack assembly loop showing how @count and D=M access data and how @LOOP followed by D;JGT can load the PC from A.",
          width: 1536,
          height: 1024,
          caption: "A selects an address; a C-instruction uses it for memory or control flow.",
        },
      },
      {
        title: "Predefined Symbols",
        paragraphs: [
          "Hack supplies useful names for registers, pointers, and memory-mapped devices. Symbol names are case-sensitive.",
        ],
        dataTable: {
          headers: ["Symbol", "Address or role"],
          rows: [
            ["R0 to R15", "RAM addresses 0 to 15"],
            ["SP", "RAM[0]"], ["LCL", "RAM[1]"], ["ARG", "RAM[2]"],
            ["THIS", "RAM[3]"], ["THAT", "RAM[4]"],
            ["SCREEN", "16384"], ["KBD", "24576"],
          ],
        },
      },
      {
        title: "Labels and Variables",
        paragraphs: [
          "A label such as (LOOP) refers to a ROM instruction address. The label itself creates no machine word. A variable such as @count refers to a RAM address.",
          "The standard assembler assigns new variable symbols from RAM address 16 upward in the order they first appear. A two-pass assembler first records labels, then translates instructions and allocates variables.",
          "A symbol may contain letters, digits, underscore, dot, dollar sign, and colon, but it cannot start with a digit. Numeric A values must remain between 0 and 32767. Duplicate labels and unknown C-instruction mnemonics should be reported as assembler errors.",
        ],
        flow: ["Pass 1: remove labels and record ROM addresses", "Pass 2: resolve A symbols", "Allocate variables from RAM[16]", "Encode C fields", "Write .hack file"],
      },
      {
        title: "Complete Two-Pass Assembler Example",
        paragraphs: [
          "In pass 1, only real A- and C-instructions increase the ROM counter. In pass 2, the assembler uses the completed symbol table and allocates each new variable once.",
        ],
        dataTable: {
          headers: ["Source line", "ROM address", "Symbol action", "Pass 2 value"],
          rows: [
            ["@2", "0", "None", "2"],
            ["D=A", "1", "None", "C-instruction"],
            ["(LOOP)", "No word", "LOOP = 2", "Removed"],
            ["@sum", "2", "Allocate sum", "16"],
            ["M=D", "3", "None", "C-instruction"],
            ["@LOOP", "4", "Use label", "2"],
            ["0;JMP", "5", "None", "C-instruction"],
          ],
        },
      },
      {
        title: "Common Code Patterns",
        paragraphs: [],
        dataTable: {
          headers: ["Goal", "Hack sequence"],
          rows: [
            ["Load constant 7 into D", "@7 then D=A"],
            ["Read RAM[20] into D", "@20 then D=M"],
            ["Write D into RAM[20]", "@20 then M=D"],
            ["Unconditional jump", "@TARGET then 0;JMP"],
            ["Jump if D is zero", "@TARGET then D;JEQ"],
            ["Decrease RAM[0]", "@R0 then M=M-1"],
          ],
        },
      },
      {
        title: "A Complete Countdown Loop",
        paragraphs: [
          "The following control flow repeatedly decreases R0 until it reaches zero. END then loops forever, which is a normal way to stop a bare Hack program.",
        ],
        flow: [
          "(LOOP)", "@R0", "D=M", "@END", "D;JEQ", "@R0", "M=M-1", "@LOOP", "0;JMP", "(END)", "@END", "0;JMP",
        ],
      },
      {
        title: "Keyboard-Controlled Screen Program",
        paragraphs: [
          "This complete loop makes the first 16 screen pixels black while a key is pressed and white when no key is pressed. KBD is read-only, while SCREEN can be written.",
        ],
        flow: [
          "(LOOP)", "@KBD", "D=M", "@WHITE", "D;JEQ", "@SCREEN", "M=-1", "@LOOP", "0;JMP",
          "(WHITE)", "@SCREEN", "M=0", "@LOOP", "0;JMP",
        ],
      },
      {
        title: "Array Traversal with a Pointer",
        paragraphs: [
          "This pattern adds RAM[100], RAM[101], and RAM[102]. The variable ptr stores the current address, count stores the remaining number of values, and sum stores the running total.",
        ],
        flow: [
          "@100", "D=A", "@ptr", "M=D", "@3", "D=A", "@count", "M=D", "@sum", "M=0",
          "(ARRAY_LOOP)", "@ptr", "A=M", "D=M", "@sum", "M=D+M", "@ptr", "M=M+1",
          "@count", "MD=M-1", "@ARRAY_LOOP", "D;JGT", "(ARRAY_END)", "@ARRAY_END", "0;JMP",
        ],
      },
      {
        title: "Multiplication by Repeated Addition",
        paragraphs: [
          "Hack has no multiply instruction. For non-negative RAM[1], this loop calculates RAM[0] × RAM[1] and stores the result in RAM[2]. It adds RAM[0] once for each count.",
        ],
        flow: [
          "@R2", "M=0", "@R1", "D=M", "@count", "M=D", "(MULT_LOOP)", "@count", "D=M",
          "@MULT_END", "D;JEQ", "@R0", "D=M", "@R2", "M=D+M", "@count", "M=M-1",
          "@MULT_LOOP", "0;JMP", "(MULT_END)", "@MULT_END", "0;JMP",
        ],
      },
      {
        title: "Instruction Trace Table",
        paragraphs: [
          "Assume D = 0 and RAM[20] = 0 before this short program. The PC shown is the next instruction address after each row executes.",
        ],
        dataTable: {
          headers: ["ROM", "Instruction", "A after", "D after", "RAM[20] after", "Next PC"],
          rows: [
            ["0", "@7", "7", "0", "0", "1"],
            ["1", "D=A", "7", "7", "0", "2"],
            ["2", "@20", "20", "7", "0", "3"],
            ["3", "M=D", "20", "7", "7", "4"],
            ["4", "D=M", "20", "7", "7", "5"],
          ],
        },
      },
      {
        title: "What Hack Assembly Does Not Provide Directly",
        paragraphs: [
          "The Hack instruction set has no direct multiply, divide, function-call, return, push, or pop instructions. Programs build these operations from A-instructions, ALU operations, memory accesses, labels, and jumps.",
          "There is also no instruction that loads an immediate constant straight into D. The usual sequence is @constant followed by D=A.",
        ],
        dataTable: {
          headers: ["Required operation", "How Hack builds it"],
          rows: [
            ["Multiplication", "Repeated addition and a loop"],
            ["Division", "Repeated subtraction or a longer algorithm"],
            ["Function call and return", "A software stack and saved return address"],
            ["Array access", "A RAM variable used as a pointer"],
            ["Immediate value in D", "@value followed by D=A"],
          ],
        },
      },
      {
        title: "Worked Problems",
        paragraphs: [],
        problems: [
          {
            title: "Store a constant in RAM",
            prompt: "Write the instruction sequence that stores decimal 7 in RAM[0].",
            steps: [
              "Use @7 to place the constant in A.",
              "Use D=A to copy the constant into D.",
              "Use @R0 to place address 0 in A.",
              "Use M=D to store D in RAM[A].",
            ],
            answer: "@7, D=A, @R0, M=D",
          },
          {
            title: "Add two RAM values",
            prompt: "Write Hack assembly steps that store RAM[0] + RAM[1] in RAM[2].",
            steps: [
              "@R0 then D=M loads RAM[0] into D.",
              "@R1 then D=D+M adds RAM[1].",
              "@R2 then M=D stores the sum.",
            ],
            answer: "@R0, D=M, @R1, D=D+M, @R2, M=D",
          },
          {
            title: "Resolve labels",
            prompt: "For instructions @1, D=A, (LOOP), @LOOP, 0;JMP, what ROM address does LOOP represent?",
            steps: [
              "@1 is ROM instruction 0.",
              "D=A is ROM instruction 1.",
              "The label creates no instruction.",
              "The next real instruction @LOOP is at ROM address 2.",
            ],
            answer: "LOOP = ROM address 2",
          },
          {
            title: "Allocate variables",
            prompt: "A program first uses @sum and later @count, with neither predefined. Which RAM addresses are assigned?",
            steps: [
              "New variables begin at RAM[16].",
              "sum appears first, so sum receives address 16.",
              "count appears next, so count receives address 17.",
            ],
            answer: "sum = RAM[16], count = RAM[17]",
          },
          {
            title: "Trace a conditional jump",
            prompt: "D = -3, A = 40, and the instruction D;JGE executes. Is the jump taken?",
            steps: [
              "The computed result is D = -3.",
              "JGE requires a result greater than or equal to zero.",
              "-3 does not satisfy the condition.",
              "The PC therefore continues to the following instruction.",
            ],
            answer: "No. The jump is not taken.",
          },
          {
            title: "Build a symbol table in two passes",
            prompt: "In @2, D=A, (LOOP), @sum, M=D, @LOOP, 0;JMP, find the values of LOOP and sum.",
            steps: [
              "@2 and D=A occupy ROM addresses 0 and 1.",
              "LOOP names the next real instruction, so LOOP = ROM address 2.",
              "sum is not predefined and is the first new variable.",
              "The assembler therefore assigns sum = RAM address 16.",
            ],
            answer: "LOOP = 2 and sum = 16.",
          },
          {
            title: "Explain pointer-based array access",
            prompt: "If ptr contains 101, what do @ptr, A=M, D=M do?",
            steps: [
              "@ptr loads the RAM address assigned to the variable ptr into A.",
              "A=M reads RAM[ptr] and places its value, 101, into A.",
              "D=M now reads RAM[101] into D.",
            ],
            answer: "The sequence follows the pointer and loads RAM[101] into D.",
          },
        ],
      },
    ],
    mechanism: {
      title: "How to design a small Hack program",
      steps: [
        "Choose which RAM words hold inputs, outputs, and temporary values.",
        "Use @address before every M access.",
        "Move a value into D before changing A when both are needed.",
        "Create labels for loop starts and exits.",
        "Place @TARGET immediately before a jump when A must hold that target.",
        "Trace A, D, M, and PC after each real instruction.",
      ],
    },
    example: {
      title: "Why D is useful",
      body: "A must change whenever the program selects another RAM word. D keeps a temporary value safe while A moves from the source address to the destination address.",
    },
    misconception:
      "A label such as (LOOP) does not occupy ROM. Counting it as an instruction shifts every following label and produces incorrect jumps.",
  },
  revise: {
    definition:
      "Hack assembly expresses A- and C-instructions symbolically; the assembler converts them into 16-bit machine words.",
    sections: [
      {
        title: "Symbol Types",
        table: {
          headers: ["Type", "Meaning"],
          rows: [
            ["Predefined", "R0-R15, SP, LCL, ARG, THIS, THAT, SCREEN, KBD"],
            ["Label", "ROM address of next real instruction"],
            ["Variable", "RAM address allocated from 16 upward"],
          ],
        },
      },
      {
        title: "Memory Pattern",
        flow: ["@source", "D=M", "@destination", "M=D"],
      },
      {
        title: "Program Patterns",
        table: {
          headers: ["Need", "Pattern"],
          rows: [
            ["Read keyboard", "@KBD then D=M; zero means no key"],
            ["Write screen", "@SCREEN or another mapped screen address, then M=value"],
            ["Follow pointer", "@ptr, then A=M, then use M"],
            ["Multiply", "Repeated addition loop"],
          ],
        },
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "@value loads A, not D or M.",
      "M always means RAM[A].",
      "Labels use parentheses and create no instruction.",
      "Variables begin at RAM[16].",
      "Hack assembly is case-sensitive.",
      "A jump target must be in A when the jump executes.",
      "New symbols cannot start with a digit, and numeric A values stop at 32767.",
      "Hack has no direct multiply, divide, call, return, push, or pop instruction.",
    ],
    followUp: "Why must a program copy a source value into D before changing A to the destination address?",
  },
  lastMinute: {
    definition: "@ selects; C-instruction computes, stores, or jumps.",
    sections: [
      {
        title: "Programming Checklist",
        points: [
          "Use @address before M.",
          "Use D to carry data between addresses.",
          "Labels are ROM addresses and use parentheses.",
          "Variables are RAM addresses from 16.",
          "Use @TARGET before a jump.",
          "Follow a pointer with @ptr, A=M, then use M.",
          "KBD is read-only; SCREEN is writable memory-mapped output.",
        ],
      },
    ],
    memoryLine: "A selects the place; D carries the value; M accesses RAM[A].",
    cues: ["@value", "dest=comp;jump", "R0-R15", "Labels no ROM word", "Variables from 16", "Pointers", "KBD SCREEN"],
    trap: "@x loads the address or value of x into A. It does not load RAM[x] into A.",
  },
};
