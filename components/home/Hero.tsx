import { ArrowRightIcon } from "@/components/icons";
import { OpportunitySearch } from "@/components/home/OpportunitySearch";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 right-[-8%] h-80 w-80 rounded-full bg-brand/10 blur-3xl" />
        <div className="absolute bottom-[-20%] left-[-6%] h-72 w-72 rounded-full bg-navy/8 blur-3xl" />
      </div>
      <Container className="relative py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-5 inline-flex items-center rounded-full border border-navy/10 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-navy">
            Global career & freelance platform
          </p>
          <h1 className="text-4xl font-semibold leading-[1.12] tracking-tight text-navy sm:text-5xl lg:text-[3.5rem]">
            Connect Skills. Discover Opportunities. Build Your Future.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            SkillBridge Global brings candidates, students, freelancers, and companies
            onto one worldwide platform. Search roles, internships, and freelance
            projects, or hire talent across borders with a clear, professional
            matching experience.
          </p>
          <OpportunitySearch />
          <div id="get-started" className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="#opportunities" size="lg">
              Explore Opportunities
              <ArrowRightIcon />
            </Button>
            <Button href="#companies" variant="outline" size="lg">
              Hire Talent
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
