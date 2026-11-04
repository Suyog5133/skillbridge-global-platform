import Link from "next/link";
import { LogoMark } from "@/components/icons";
import { Container } from "@/components/ui/Container";

const footerLinks = [
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
  { href: "#terms", label: "Terms of Service" },
  { href: "#privacy", label: "Privacy Policy" },
];

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div id="about" className="scroll-mt-24 max-w-lg">
            <div className="flex items-center gap-2.5">
              <LogoMark variant="light" className="h-8 w-8" />
              <span className="text-base font-semibold tracking-tight">SkillBridge Global</span>
            </div>
            <p className="mt-4 text-sm leading-6 text-white/70">
              SkillBridge Global connects candidates, students, freelancers, and
              companies on one worldwide career and freelance platform. We help
              people discover opportunities and help organizations hire talent
              across borders.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <p className="text-sm font-semibold">Platform</p>
              <ul className="mt-4 space-y-2.5 text-sm text-white/70">
                <li>
                  <Link href="#jobs" className="hover:text-white">
                    Find Jobs
                  </Link>
                </li>
                <li>
                  <Link href="#talent" className="hover:text-white">
                    Find Talent
                  </Link>
                </li>
                <li>
                  <Link href="#freelance" className="hover:text-white">
                    Freelance Projects
                  </Link>
                </li>
                <li>
                  <Link href="#companies" className="hover:text-white">
                    For Companies
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold">Company</p>
              <ul className="mt-4 space-y-2.5 text-sm text-white/70">
                {footerLinks.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-12 grid gap-6 border-t border-white/10 pt-8 text-sm text-white/60 sm:grid-cols-2">
          <p id="contact" className="scroll-mt-24">
            Contact: hello@skillbridge.global
          </p>
          <p className="sm:text-right">
            © 2026 SkillBridge Global. All rights reserved.
          </p>
        </div>
        <div className="mt-6 grid gap-4 text-xs leading-5 text-white/50 sm:grid-cols-2">
          <p id="terms" className="scroll-mt-24">
            Terms of Service will be published before accounts, applications, and
            hiring workflows go live.
          </p>
          <p id="privacy" className="scroll-mt-24">
            Privacy Policy will outline how profile, application, and hiring data
            is collected and protected.
          </p>
        </div>
      </Container>
      <div id="login" className="sr-only">
        Login
      </div>
    </footer>
  );
}
