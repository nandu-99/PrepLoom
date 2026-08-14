import type { SubjectContent, SubjectTopic } from "@/lib/subject-content";

type TopicScope = {
  readTime: string;
  title?: string;
  description?: string;
  tags?: string[];
  omitSections?: string[];
  omitReviseSections?: string[];
  omitLastMinuteCues?: string[];
  problemLimit?: number;
};

// Publish only the assessed, must-know material from the supplied course notes.
// Extra authoring material can stay in the topic files without inflating the
// student-facing syllabus.
const topicScope: Record<string, TopicScope> = {
  "binary-numbers-and-place-value": { readTime: "18 min" },
  "signed-binary-and-twos-complement": { readTime: "20 min" },
  "boolean-algebra-and-logic-gates": { readTime: "22 min" },
  "combinational-circuits": {
    readTime: "23 min",
    omitSections: ["Encoder and Priority Encoder", "Comparator"],
  },
  "alu-foundations-and-control": { readTime: "17 min" },
  "sequential-logic-and-state": {
    readTime: "18 min",
    omitSections: [
      "Synchronous and Asynchronous Circuits",
      "Moore and Mealy Outputs",
      "Metastability",
    ],
  },
  "latches-and-flip-flops": {
    readTime: "24 min",
    omitSections: [
      "Asynchronous Preset and Clear",
      "JK Race-Around Condition",
      "Excitation Table",
    ],
    omitReviseSections: ["Characteristic Equations"],
  },
  "registers-and-shift-registers": {
    readTime: "24 min",
    omitSections: ["Universal Shift Register", "Ring and Johnson Counters"],
  },
  "memory-organization": {
    readTime: "23 min",
    omitSections: [
      "SRAM and DRAM",
      "ROM Families",
      "Byte-Addressable and Word-Addressable Memory",
    ],
  },
  "program-counter": {
    readTime: "20 min",
    omitSections: ["Branches, Jumps, Calls, and Returns"],
  },
  "hack-computer-platform": { readTime: "23 min" },
  "hack-cpu-datapath": { readTime: "28 min" },
  "hack-instruction-formats": { readTime: "24 min" },
  "c-instruction-control": { readTime: "30 min" },
  "hack-assembly-programming": {
    readTime: "32 min",
    omitSections: [
      "Complete Two-Pass Assembler Example",
      "Keyboard-Controlled Screen Program",
      "Array Traversal with a Pointer",
      "Multiplication by Repeated Addition",
      "Instruction Trace Table",
    ],
  },
  "cpu-limitations-and-performance": {
    readTime: "28 min",
    omitSections: [
      "Memory Stalls and Effective CPI",
      "Amdahl's Law, Benchmarks, and Power",
    ],
  },
  "polling-and-interrupts": {
    readTime: "23 min",
    omitSections: [
      "Interrupt Terms and Safety",
      "Important Interrupt Types",
      "Nested Interrupts and ISR Safety",
      "Polling versus Interrupts",
      "Direct Memory Access",
    ],
    omitReviseSections: ["Type Recall"],
  },
  "risc-cisc-and-isa": {
    readTime: "27 min",
    omitSections: [
      "Performance and Code Density",
      "Compiler and ISA Interaction",
    ],
  },
  "mips-architecture-and-assembly": {
    readTime: "42 min",
    problemLimit: 4,
    omitSections: [
      "Endianness and Aligned Memory",
      "Multiplication, Division, HI, and LO",
      "Assembler Pseudoinstructions and SPIM",
      "Complete SPIM Hello Program",
    ],
  },
  "stack-function-calls-and-recursion": {
    readTime: "34 min",
    omitSections: [
      "ISA, ABI, and Calling Convention",
      "Extra Arguments and Large Return Values",
      "Recursive Factorial Pattern",
      "Stack Overflow",
    ],
  },
  "single-cycle-and-multi-cycle-processors": { readTime: "27 min" },
  "five-stage-instruction-pipeline": { readTime: "30 min" },
  "data-hazards-and-forwarding": {
    readTime: "29 min",
    omitSections: ["Compiler Instruction Scheduling"],
  },
  "control-and-structural-hazards": { readTime: "30 min" },
  "superscalar-and-out-of-order-execution": { readTime: "32 min" },
  "memory-hierarchy-and-cache": {
    readTime: "34 min",
    title: "Memory Hierarchy and Cache",
    description:
      "Use locality, cache mapping, replacement policies, and AMAT to reason about memory performance.",
    tags: ["Cache", "AMAT", "Locality"],
    problemLimit: 4,
    omitSections: ["Virtual Memory and Address Translation"],
    omitLastMinuteCues: ["TLB = translation cache", "Page fault = not in RAM"],
  },
  "simd-simt-and-gpu-architecture": { readTime: "30 min" },
};

function curateTopic(topic: SubjectTopic): SubjectTopic {
  const scope = topicScope[topic.slug];
  if (!scope) return topic;

  const omitted = new Set(scope.omitSections ?? []);
  const problemLimit = scope.problemLimit ?? 3;

  return {
    ...topic,
    readTime: scope.readTime,
    title: scope.title ?? topic.title,
    description: scope.description ?? topic.description,
    tags: scope.tags ?? topic.tags,
    learn: {
      ...topic.learn,
      sections: topic.learn.sections
        .filter((section) => !omitted.has(section.title))
        .map((section) =>
          section.problems
            ? { ...section, problems: section.problems.slice(0, problemLimit) }
            : section,
        ),
    },
    revise: {
      ...topic.revise,
      sections: topic.revise.sections?.filter(
        (section) => !(scope.omitReviseSections ?? []).includes(section.title),
      ),
      essentials: topic.revise.essentials.slice(0, 7),
    },
    lastMinute: {
      ...topic.lastMinute,
      cues: topic.lastMinute.cues
        .filter((cue) => !(scope.omitLastMinuteCues ?? []).includes(cue))
        .slice(0, 5),
    },
  };
}

export function curateMcaCourse(content: SubjectContent): SubjectContent {
  return {
    ...content,
    modules: content.modules.map((module) => ({
      ...module,
      topics: module.topics.map(curateTopic),
    })),
  };
}
