import {
  dataModelsSchemasAndInstances,
  fileSystemVsDbms,
  introductionToDatabasesAndDbms,
  threeSchemaArchitectureAndDataIndependence,
} from "@/content/subjects/dbms/foundations";
import {
  databaseKeys,
  erModelAndRelationalMapping,
  integrityConstraints,
  relationalModelFundamentals,
} from "@/content/subjects/dbms/relational-model-and-er-design";
import {
  joinsAndDivisionInRelationalAlgebra,
  relationalAlgebraFundamentals,
  sqlFilteringSortingAndAggregation,
  sqlFoundations,
  sqlJoinsSubqueriesSetOperationsAndViews,
  sqlQueryPractice,
} from "@/content/subjects/dbms/relational-algebra-and-sql";
import {
  attributeClosureAndCandidateKeys,
  decompositionAndNormalizationPractice,
  functionalDependencies,
  minimalCover,
  normalizationAndAnomalies,
  thirdNormalFormAndBcnf,
} from "@/content/subjects/dbms/functional-dependencies-and-normalization";
import {
  concurrencyProblemsAndLocking,
  recoverabilityOfSchedules,
  schedulesAndSerializability,
  timestampAndOptimisticConcurrencyControl,
  transactionsAndAcidProperties,
  twoPhaseLockingAndDeadlocks,
} from "@/content/subjects/dbms/transactions-and-concurrency-control";
import {
  bTreesBPlusTreesAndHashing,
  checkpointsAndCrashRecovery,
  indexingFundamentals,
  logBasedRecoveryAndWal,
  queryProcessingAndOptimization,
  storageAndFileOrganization,
} from "@/content/subjects/dbms/recovery-indexing-and-query-processing";
import { curateTopicSections } from "@/content/subjects/curation";
import type { SubjectContent } from "@/lib/subject-content";

const focusedAttributeClosureAndCandidateKeys = curateTopicSections(
  attributeClosureAndCandidateKeys,
  {
    readTime: "22 min",
    omitReviseSections: ["Key Conditions"],
  },
);

export const dbmsContent: SubjectContent = {
  order: "04",
  slug: "dbms",
  title: "Database Management Systems",
  shortTitle: "DBMS",
  eyebrow: "CS Core",
  description:
    "Learn how databases organize, protect, and provide reliable access to shared data.",
  estimatedTime: "15–16 hours",
  modules: [
    {
      order: "01",
      title: "DBMS Foundations and Architecture",
      description:
        "Databases, DBMS responsibilities, file-system limits, schemas, instances, architecture, and data independence.",
      topics: [
        introductionToDatabasesAndDbms,
        fileSystemVsDbms,
        dataModelsSchemasAndInstances,
        threeSchemaArchitectureAndDataIndependence,
      ],
    },
    {
      order: "02",
      title: "Relational Model and ER Design",
      description:
        "Relations, keys, integrity rules, ER diagrams, cardinality, participation, and conversion into relational tables.",
      topics: [
        relationalModelFundamentals,
        databaseKeys,
        integrityConstraints,
        erModelAndRelationalMapping,
      ],
    },
    {
      order: "03",
      title: "Relational Algebra and SQL",
      description:
        "Relational operations, joins, SQL commands, filtering, grouping, subqueries, set operations, views, and query practice.",
      topics: [
        relationalAlgebraFundamentals,
        joinsAndDivisionInRelationalAlgebra,
        sqlFoundations,
        sqlFilteringSortingAndAggregation,
        sqlJoinsSubqueriesSetOperationsAndViews,
        sqlQueryPractice,
      ],
    },
    {
      order: "04",
      title: "Functional Dependencies and Normalization",
      description:
        "Functional dependencies, closure, candidate keys, minimal covers, normal forms, decomposition properties, and worked normalization problems.",
      topics: [
        functionalDependencies,
        focusedAttributeClosureAndCandidateKeys,
        minimalCover,
        normalizationAndAnomalies,
        thirdNormalFormAndBcnf,
        decompositionAndNormalizationPractice,
      ],
    },
    {
      order: "05",
      title: "Transactions and Concurrency Control",
      description:
        "ACID transactions, schedules, serializability, recoverability, locks, deadlocks, timestamps, and optimistic control.",
      topics: [
        transactionsAndAcidProperties,
        schedulesAndSerializability,
        recoverabilityOfSchedules,
        concurrencyProblemsAndLocking,
        twoPhaseLockingAndDeadlocks,
        timestampAndOptimisticConcurrencyControl,
      ],
    },
    {
      order: "06",
      title: "Recovery, Indexing, and Query Processing",
      description:
        "Storage pages, file organization, indexes, B+ trees, hashing, logging, checkpoints, crash recovery, and query optimization.",
      topics: [
        storageAndFileOrganization,
        indexingFundamentals,
        bTreesBPlusTreesAndHashing,
        logBasedRecoveryAndWal,
        checkpointsAndCrashRecovery,
        queryProcessingAndOptimization,
      ],
    },
  ],
};
