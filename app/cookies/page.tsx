export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-white text-gray-800">
      <section className="bg-[#0B1F3A] px-6 py-16 text-center text-white">
        <h1 className="text-4xl font-bold">Cookie Policy</h1>
        <p className="mt-4 text-gray-300">
          Understanding how cookies may be used on our platform.
        </p>
        <p className="mt-2 text-sm text-gray-400">
          Last Updated: November 2026
        </p>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-12">
        <div className="mb-10 rounded-xl border border-yellow-300 bg-yellow-50 p-5">
          <h2 className="mb-2 font-bold text-yellow-900">
            Important Notice
          </h2>
          <p className="text-sm leading-7 text-yellow-900">
            This is a draft Cookie Policy for the planned SkillBridge Global
            platform. Actual cookie practices and consent tools must be
            implemented and reviewed before launch.
          </p>
        </div>

        <div className="space-y-9 leading-7">
          <section>
            <h2 className="mb-3 text-2xl font-bold text-[#0B1F3A]">
              1. What Are Cookies?
            </h2>
            <p>
              Cookies are small text files stored on your device when you
              visit a website. They help websites remember certain
              information and support different website functions.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-[#0B1F3A]">
              2. Why We May Use Cookies
            </h2>
            <p>
              SkillBridge Global may use cookies and similar technologies
              to support website functionality, account security, user
              preferences, and platform performance.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-[#0B1F3A]">
              3. Types of Cookies
            </h2>

            <div className="space-y-4">
              <div className="rounded-lg border p-5">
                <h3 className="font-bold text-lg">Essential Cookies</h3>
                <p className="mt-2">
                  These may be required for basic website functions,
                  security, and account sessions.
                </p>
              </div>

              <div className="rounded-lg border p-5">
                <h3 className="font-bold text-lg">Preference Cookies</h3>
                <p className="mt-2">
                  These may remember settings such as language or user
                  preferences.
                </p>
              </div>

              <div className="rounded-lg border p-5">
                <h3 className="font-bold text-lg">Analytics Cookies</h3>
                <p className="mt-2">
                  These may help us understand how visitors use the platform
                  and identify areas for improvement.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-[#0B1F3A]">
              4. Third-Party Cookies
            </h2>
            <p>
              If we use third-party services such as analytics, security,
              or embedded content providers, those services may use their
              own cookies according to their respective policies. Details
              will be disclosed when such services are introduced.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-[#0B1F3A]">
              5. Managing Cookies
            </h2>
            <p>
              You can manage or delete cookies through your browser settings.
              Blocking certain cookies may affect some website functions.
              Where legally required, we will provide appropriate consent
              controls before using non-essential cookies.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-[#0B1F3A]">
              6. Data and Privacy
            </h2>
            <p>
              Information collected through cookies may be handled according
              to our Privacy Policy and applicable privacy laws.
            </p>
            <a
              href="/privacy"
              className="mt-3 inline-block font-semibold text-blue-600 hover:underline"
            >
              Read Privacy Policy →
            </a>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-[#0B1F3A]">
              7. Policy Updates
            </h2>
            <p>
              We may update this Cookie Policy when our website features
              or legal requirements change. The latest version will be
              available on this page.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-[#0B1F3A]">
              8. Contact Us
            </h2>
            <p>
              For questions about cookies or privacy, contact us through
              our Contact Us page.
            </p>
            <a
              href="/contact"
              className="mt-4 inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Contact Us
            </a>
          </section>
        </div>
      </section>
    </main>
  );
}