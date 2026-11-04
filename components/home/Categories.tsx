import type { ReactNode } from "react";
import {
  BriefcaseIcon,
  BuildingIcon,
  GraduationIcon,
  LaptopIcon,
} from "@/components/icons";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Category = {
  id: string;
  title: string;
  audience: string;
  description: string;
  icon: ReactNode;
};

const categories: Category[] = [
  {
    id: "jobs",
    title: "Candidates",
    audience: "Looking for jobs",
    description:
      "Explore full-time and part-time roles that match your skills, experience, and career direction.",
    icon: <BriefcaseIcon className="h-6 w-6" />,
  },
  {
    id: "students",
    title: "Students",
    audience: "Internships & fresher roles",
    description:
      "Find internships and entry-level opportunities designed to help you start your professional journey.",
    icon: <GraduationIcon className="h-6 w-6" />,
  },
  {
    id: "freelance",
    title: "Freelancers",
    audience: "Looking for projects",
    description:
      "Discover freelance work and project-based engagements with companies that need specialized skills.",
    icon: <LaptopIcon className="h-6 w-6" />,
  },
  {
    id: "companies",
    title: "Companies",
    audience: "Hiring global talent",
    description:
      "Source candidates, interns, and freelancers from a worldwide pool and hire with confidence.",
    icon: <BuildingIcon className="h-6 w-6" />,
  },
];

export function Categories() {
  return (
    <section className="border-t border-navy/8 bg-slate-50 py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Who we serve"
          title="One platform for four career paths"
          description="Whether you are applying, learning, freelancing, or hiring, SkillBridge Global is built around the way global work actually happens."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <article
              key={category.id}
              id={category.id}
              className="scroll-mt-24 rounded-2xl border border-navy/8 bg-white p-6 shadow-[0_12px_30px_-20px_rgba(11,31,58,0.35)] transition-transform hover:-translate-y-0.5"
            >
              <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
                {category.icon}
              </div>
              <h3 className="text-lg font-semibold text-navy">{category.title}</h3>
              <p className="mt-1 text-sm font-medium text-brand">{category.audience}</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">{category.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
