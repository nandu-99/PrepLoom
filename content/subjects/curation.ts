import type { SubjectTopic } from "@/lib/subject-content";

type TopicCuration = {
  readTime?: string;
  omitLearnSections?: string[];
  omitReviseSections?: string[];
  omitLastMinuteSections?: string[];
  omitLastMinuteCues?: string[];
};

export function curateTopicSections(
  topic: SubjectTopic,
  curation: TopicCuration,
): SubjectTopic {
  const omittedLearnSections = new Set(curation.omitLearnSections ?? []);
  const omittedReviseSections = new Set(curation.omitReviseSections ?? []);
  const omittedLastMinuteSections = new Set(
    curation.omitLastMinuteSections ?? [],
  );

  return {
    ...topic,
    readTime: curation.readTime ?? topic.readTime,
    learn: {
      ...topic.learn,
      sections: topic.learn.sections.filter(
        (section) => !omittedLearnSections.has(section.title),
      ),
    },
    revise: {
      ...topic.revise,
      sections: topic.revise.sections?.filter(
        (section) => !omittedReviseSections.has(section.title),
      ),
    },
    lastMinute: {
      ...topic.lastMinute,
      sections: topic.lastMinute.sections?.filter(
        (section) => !omittedLastMinuteSections.has(section.title),
      ),
      cues: topic.lastMinute.cues.filter(
        (cue) => !(curation.omitLastMinuteCues ?? []).includes(cue),
      ),
    },
  };
}
