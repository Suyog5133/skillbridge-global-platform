import type { ReactNode } from "react";
import { CompassIcon, ConnectIcon, GrowthIcon, ProfileIcon } from "@/components/icons";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Step = {
  title: string;
  description: string;
  icon: ReactNode;
};

const steps: Step[] = [
  {
    title: "Create Profile",
    description:
      "Share your skills, experience, and goals so the right opportunities can find you.",
    icon: <ProfileIcon />,
  },
  {
    title: "Discover Opportunities",
    description:
      "Browse jobs, internships, and freelance projects across industries and regions.",
    icon: <CompassIcon />,
  },
  {
    title: "Connect Globally",
    description:
      "Engage with companies and talent worldwide through a professional matching flow.",
    icon: <ConnectIcon />,
  },
  {
    title: "Grow",
    description:
      "Build your career, complete projects, or scale hiring with stronger global connections.",
    icon: <GrowthIcon />,
  },
];

export function HowItWorks() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="How it works"
          title="A clear path from profile to progress"
          description="Four simple steps to connect skills with opportunity, whether you are looking for work or looking to hire."
        />
        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li key={step.title} className="relative rounded-2xl border border-navy/8 bg-white p-6">
              <span className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-navy text-sm font-semibold text-white">
                {index + 1}
              </span>
              <div className="mb-3 text-brand">{step.icon}</div>
              <h3 className="text-lg font-semibold text-navy">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{step.description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
