import { operatingSystemsContent as baseOperatingSystemsContent } from "@/content/subjects/operating-systems-base";
import {
  advancedSchedulingDetailed,
  cpuSchedulingDetailed,
  schedulingAlgorithmsDetailed,
  schedulingNumerical,
} from "@/content/subjects/operating-systems/cpu-scheduling";
import {
  deadlockDetectionRecoveryDetailed,
  deadlockFundamentalsDetailed,
  deadlockPreventionAvoidanceDetailed,
} from "@/content/subjects/operating-systems/deadlocks";
import { deadlockNumericals } from "@/content/subjects/operating-systems/deadlock-numericals";
import {
  introductionToOperatingSystems,
  kernelModesAndInterrupts,
  systemCallsDetailed,
} from "@/content/subjects/operating-systems/fundamentals";
import {
  processesDetailed,
  threadsDetailed,
} from "@/content/subjects/operating-systems/processes-and-threads";
import { ioSystemsDetailed } from "@/content/subjects/operating-systems/io-systems";
import {
  contiguousMemoryAllocation,
  memoryManagementFundamentals,
} from "@/content/subjects/operating-systems/memory-management";
import { pagingAndAddressTranslation } from "@/content/subjects/operating-systems/paging";
import { pageTableStructures } from "@/content/subjects/operating-systems/page-table-structures";
import { frameAllocationThrashing } from "@/content/subjects/operating-systems/frame-allocation-thrashing";
import { pageReplacementAlgorithms } from "@/content/subjects/operating-systems/page-replacement-algorithms";
import { segmentationDetailed } from "@/content/subjects/operating-systems/segmentation";
import { virtualMemoryDemandPagingDetailed } from "@/content/subjects/operating-systems/virtual-memory-demand-paging";
import {
  hardwareBasedSynchronizationDetailed,
  locksMutexesSpinlocksDetailed,
  processSynchronizationDetailed,
  softwareBasedSynchronizationDetailed,
} from "@/content/subjects/operating-systems/synchronization-foundations";
import {
  diningPhilosophersDetailed,
  monitorsConditionVariablesDetailed,
  producerConsumerDetailed,
  readersWritersDetailed,
  semaphoresDetailed,
} from "@/content/subjects/operating-systems/synchronization-primitives";
import type { SubjectContent } from "@/lib/subject-content";

export const operatingSystemsContent: SubjectContent = {
  ...baseOperatingSystemsContent,
  slug: "operating-systems",
  modules: [
    ...baseOperatingSystemsContent.modules.flatMap((module, index) => {
    const topics = module.topics
      .filter(
        (topic) =>
          (index !== 0 || topic.slug !== "what-is-an-operating-system") &&
          topic.slug !== "process-states",
      )
      .map((topic) =>
        topic.slug === "system-calls"
          ? systemCallsDetailed
          : topic.slug === "program-vs-process"
            ? processesDetailed
            : topic.slug === "process-vs-thread"
              ? threadsDetailed
              : topic.slug === "cpu-scheduling"
                ? cpuSchedulingDetailed
                : topic.slug === "scheduling-algorithms"
                  ? schedulingAlgorithmsDetailed
                  : topic.slug === "paging"
                    ? pagingAndAddressTranslation
                    : topic.slug === "virtual-memory"
                      ? virtualMemoryDemandPagingDetailed
            : topic,
      );

    const currentModule = {
      ...module,
      order: index > 3 ? String(index + 2).padStart(2, "0") : module.order,
      title:
        index === 0
          ? "OS Fundamentals"
          : module.title === "Concurrency"
            ? "Synchronization"
            : module.title === "Memory"
              ? "Memory Management"
            : module.title,
      description:
        module.title === "Concurrency"
          ? "Shared data, race conditions, critical sections, and safe coordination between concurrent tasks."
          : module.description,
      topics:
        index === 0
          ? [
              introductionToOperatingSystems,
              kernelModesAndInterrupts,
              ...topics,
            ]
          : module.title === "CPU Scheduling"
            ? [...topics, schedulingNumerical, advancedSchedulingDetailed]
          : module.title === "Concurrency"
              ? [
                  processSynchronizationDetailed,
                  softwareBasedSynchronizationDetailed,
                  hardwareBasedSynchronizationDetailed,
                  locksMutexesSpinlocksDetailed,
                  semaphoresDetailed,
                  monitorsConditionVariablesDetailed,
                  producerConsumerDetailed,
                  readersWritersDetailed,
                  diningPhilosophersDetailed,
                ]
            : module.title === "Memory"
              ? [
                  memoryManagementFundamentals,
                  contiguousMemoryAllocation,
                  ...topics.flatMap((topic) =>
                    topic.slug === "paging"
                      ? [topic, pageTableStructures, segmentationDetailed]
                      : topic.slug === "virtual-memory"
                        ? [
                            topic,
                            pageReplacementAlgorithms,
                            frameAllocationThrashing,
                          ]
                      : [topic],
                  ),
                ]
            : topics,
    };

    if (module.title !== "Concurrency") {
      return [currentModule];
    }

    return [
      currentModule,
      {
        order: "05",
        title: "Deadlocks",
        description:
          "Resource waiting, Coffman conditions, prevention, avoidance, detection, and recovery.",
        topics: [
          deadlockFundamentalsDetailed,
          deadlockPreventionAvoidanceDetailed,
          deadlockDetectionRecoveryDetailed,
          deadlockNumericals,
        ],
      },
    ];
    }),
    {
      order: "07",
      title: "I/O Systems",
      description:
        "Device communication, Polling, Interrupts, DMA, and efficient data transfer.",
      topics: [ioSystemsDetailed],
    },
  ],
};
