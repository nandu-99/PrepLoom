import {
  aluFoundationsAndControl,
  binaryNumbersAndPlaceValue,
  booleanAlgebraAndLogicGates,
  combinationalCircuits,
  signedBinaryAndTwosComplement,
} from "@/content/subjects/modern-computer-architecture/digital-logic-foundations";
import type { SubjectContent } from "@/lib/subject-content";
import {
  latchesAndFlipFlops,
  memoryOrganization,
  programCounter,
  registersAndShiftRegisters,
  sequentialLogicAndState,
} from "@/content/subjects/modern-computer-architecture/sequential-logic-and-memory";
import {
  cInstructionControl,
  hackAssemblyProgramming,
  hackComputerPlatform,
  hackCpuDatapath,
  hackInstructionFormats,
} from "@/content/subjects/modern-computer-architecture/hack-cpu-instructions-and-assembly";
import {
  cpuLimitationsAndPerformance,
  mipsArchitectureAndAssembly,
  pollingAndInterrupts,
  riscCiscAndIsa,
  stackFunctionCallsAndRecursion,
} from "@/content/subjects/modern-computer-architecture/modern-cpu-and-isa";
import {
  fiveStageInstructionPipeline,
  memoryHierarchyAndCache,
  pipelineControlAndStructuralHazards,
  pipelineDataHazards,
  processorExecutionModels,
  simdSimtAndGpu,
  superscalarAndOutOfOrder,
} from "@/content/subjects/modern-computer-architecture/pipelining-memory-parallelism";
import { curateMcaCourse } from "@/content/subjects/modern-computer-architecture/curriculum";

const completeModernComputerArchitectureContent: SubjectContent = {
  order: "02",
  slug: "modern-computer-architecture",
  title: "Computer Architecture",
  shortTitle: "MCA",
  eyebrow: "CS Core",
  description:
    "Learn how binary logic becomes arithmetic circuits and processor operations.",
  estimatedTime: "12-14 hours",
  modules: [
    {
      order: "01",
      title: "Digital Logic Foundations",
      description:
        "Binary representation, signed arithmetic, Boolean logic, combinational circuits, and the arithmetic logic unit.",
      topics: [
        binaryNumbersAndPlaceValue,
        signedBinaryAndTwosComplement,
        booleanAlgebraAndLogicGates,
        combinationalCircuits,
        aluFoundationsAndControl,
      ],
    },
    {
      order: "02",
      title: "Sequential Logic, Registers, and Memory",
      description:
        "Stored state, clocked logic, flip-flops, registers, memory organization, and program-counter control.",
      topics: [
        sequentialLogicAndState,
        latchesAndFlipFlops,
        registersAndShiftRegisters,
        memoryOrganization,
        programCounter,
      ],
    },
    {
      order: "03",
      title: "Hack CPU, Instructions, and Assembly",
      description:
        "Hack computer organization, CPU datapath, 16-bit instruction formats, control fields, and assembly programming.",
      topics: [
        hackComputerPlatform,
        hackCpuDatapath,
        hackInstructionFormats,
        cInstructionControl,
        hackAssemblyProgramming,
      ],
    },
    {
      order: "04",
      title: "Modern CPU Design and Instruction Set Architecture",
      description:
        "CPU performance, interrupt-driven I/O, call stacks, ISA design choices, and classic MIPS assembly.",
      topics: [
        cpuLimitationsAndPerformance,
        pollingAndInterrupts,
        riscCiscAndIsa,
        mipsArchitectureAndAssembly,
        stackFunctionCallsAndRecursion,
      ],
    },
    {
      order: "05",
      title: "Pipelining, Memory Hierarchy, and Parallel Processors",
      description:
        "Processor execution models, instruction pipelines, hazards, out-of-order execution, cache organization, and GPU parallelism.",
      topics: [
        processorExecutionModels,
        fiveStageInstructionPipeline,
        pipelineDataHazards,
        pipelineControlAndStructuralHazards,
        superscalarAndOutOfOrder,
        memoryHierarchyAndCache,
        simdSimtAndGpu,
      ],
    },
  ],
};

export const modernComputerArchitectureContent = curateMcaCourse(
  completeModernComputerArchitectureContent,
);
