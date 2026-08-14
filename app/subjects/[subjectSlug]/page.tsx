import { ComingSoonPage } from "@/components/coming-soon-page";
import ComputerNetworksPage from "@/components/subjects/computer-networks/computer-networks-page";
import DbmsPage from "@/components/subjects/dbms/dbms-page";
import DeepLearningPage from "@/components/subjects/deep-learning/deep-learning-page";
import MachineLearningPage from "@/components/subjects/machine-learning/machine-learning-page";
import ModernComputerArchitecturePage from "@/components/subjects/modern-computer-architecture/modern-computer-architecture-page";
import OopPage from "@/components/subjects/oop/oop-page";
import OperatingSystemsPage from "@/components/subjects/operating-systems/operating-systems-page";
import { isAvailable } from "@/lib/release-status";
import { subjects } from "@/lib/subjects";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type SubjectPageProps = {
  params: Promise<{ subjectSlug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return subjects.map((subject) => ({ subjectSlug: subject.slug }));
}

export async function generateMetadata({
  params,
}: SubjectPageProps): Promise<Metadata> {
  const { subjectSlug } = await params;
  const subject = subjects.find((item) => item.slug === subjectSlug);

  if (!subject) return {};

  if (isAvailable(subject.availability)) {
    return {
      title: `${subject.name} | PrepLoom`,
      description: `Learn ${subject.name} with detailed notes, quick review, recall cues, and flexible reading layouts.`,
    };
  }

  return {
    title: `${subject.name} Notes Coming Soon | PrepLoom`,
    description: `${subject.name} notes are coming soon to PrepLoom. Study Operating Systems while new subjects are being prepared.`,
  };
}

export default async function SubjectPage({ params }: SubjectPageProps) {
  const { subjectSlug } = await params;
  const subject = subjects.find((item) => item.slug === subjectSlug);

  if (!subject) notFound();

  if (
    subject.slug === "operating-systems" &&
    isAvailable(subject.availability)
  ) {
    return <OperatingSystemsPage />;
  }

  if (subject.slug === "oop" && isAvailable(subject.availability)) {
    return <OopPage />;
  }

  if (subject.slug === "dbms" && isAvailable(subject.availability)) {
    return <DbmsPage />;
  }

  if (
    subject.slug === "computer-networks" &&
    isAvailable(subject.availability)
  ) {
    return <ComputerNetworksPage />;
  }

  if (
    subject.slug === "machine-learning" &&
    isAvailable(subject.availability)
  ) {
    return <MachineLearningPage />;
  }

  if (subject.slug === "deep-learning" && isAvailable(subject.availability)) {
    return <DeepLearningPage />;
  }

  if (
    subject.slug === "modern-computer-architecture" &&
    isAvailable(subject.availability)
  ) {
    return <ModernComputerArchitecturePage />;
  }

  return (
    <ComingSoonPage
      title={`${subject.name} notes`}
      description={`${subject.name} notes are being prepared. You can study Operating Systems now and return here when this subject is released.`}
    />
  );
}
