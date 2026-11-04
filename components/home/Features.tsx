import type { ReactNode } from "react";
import {
  BriefcaseIcon,
  GraduationIcon,
  LaptopIcon,
  UsersIcon,
} from "@/components/icons";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Feature = {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
};

const features: Feature[] = [
  {
    id: "opportunities",
    title: "Global Jobs",
    description:
      "Search roles across markets and skill areas, then apply through a consistent, professional experience.",
    icon: <BriefcaseIcon />,
  },
  {
    id: "internships",
    title: "Internships",
    description:
      "Open doors for students and freshers with structured internship and early-career opportunities.",
    icon: <GraduationIcon />,
  },
  {
    id: "projects",
    title: "Freelance Projects",
    description:
      "Match independent professionals with project work that needs specialized, on-demand skills.",
    icon: <LaptopIcon />,
  },
  {
    id: "talent",
    title: "Talent Hiring",
    description:
      "Help companies find the right people globally for full-time roles, internships, and contract work.",
    icon: <UsersIcon />,
  },
];

export function Features() {
  return (
    <section className="border-t border-navy/8 bg-slate-50 py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Platform features"
          title="Built for global work"
          description="SkillBridge Global is designed around the four core ways people and companies connect: jobs, internships, freelance projects, and hiring."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {features.map((feature) => (
            <article
              key={feature.id}
              id={feature.id}
              className="scroll-mt-24 flex gap-4 rounded-2xl border border-navy/8 bg-white p-6 sm:p-7"
            >
              <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy text-white">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-navy">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{feature.description}</p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
