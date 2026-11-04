export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white text-gray-800">
      <section className="bg-[#0B1F3A] px-6 py-16 text-center text-white">
        <h1 className="text-4xl font-bold">Privacy Policy</h1>
        <p className="mt-4 text-gray-300">
          Your privacy and trust matter to us.
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
            This Privacy Policy is a draft for the planned SkillBridge Global
            platform. It describes our intended privacy practices. Before
            launch, it must be reviewed and updated to reflect the platform&apos;s
            actual features, data processing practices, and applicable laws.
          </p>
        </div>

        <div className="space-y-9 leading-7">
          <section>
            <h2 className="mb-3 text-2xl font-bold text-[#0B1F3A]">
              1. Introduction
            </h2>
            <p>
              SkillBridge Global aims to connect candidates, students,
              freelancers, and companies worldwide. This policy explains how
              we intend to collect, use, store, and protect personal
              information when users access our platform.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-[#0B1F3A]">
              2. Information We May Collect
            </h2>
            <ul className="list-disc space-y-2 pl-6">
              <li>Account details such as name, email, and password.</li>
              <li>Profile details, skills, education, and work experience.</li>
              <li>Resumes, portfolios, and professional information.</li>
              <li>Job applications and project proposals.</li>
              <li>Company details and hiring information.</li>
              <li>Messages and support requests.</li>
              <li>Technical information such as browser and device details.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-[#0B1F3A]">
              3. How We May Use Information
            </h2>
            <ul className="list-disc space-y-2 pl-6">
              <li>Create and manage user accounts.</li>
              <li>Connect candidates with relevant opportunities.</li>
              <li>Help companies discover suitable talent.</li>
              <li>Support job, internship, and freelance applications.</li>
              <li>Improve platform performance and user experience.</li>
              <li>Prevent fraud, misuse, and unauthorized access.</li>
              <li>Respond to questions and provide customer support.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-[#0B1F3A]">
              4. Information Sharing
            </h2>
            <p>
              We intend to share information only when necessary to provide
              platform services, such as sharing a candidate&apos;s application
              with the relevant company. Information may also be shared with
              service providers who help operate the platform or when
              disclosure is required by law. We do not intend to sell users&apos;
              personal information.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-[#0B1F3A]">
              5. Data Security
            </h2>
            <p>
              We plan to use reasonable technical and organizational
              safeguards to protect user information. However, no online
              platform or storage system can guarantee complete security.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-[#0B1F3A]">
              6. Data Retention and Deletion
            </h2>
            <p>
              Information will be retained only for as long as reasonably
              necessary for the purposes described in this policy or as
              required by applicable law. Users may be able to request access,
              correction, or deletion of their information, subject to legal
              and operational requirements.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-[#0B1F3A]">
              7. International Data Transfers
            </h2>
            <p>
              SkillBridge Global is planned as an international platform.
              Depending on where users and service providers are located,
              information may be processed in different countries. We intend
              to apply appropriate safeguards where required by law.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-[#0B1F3A]">
              8. Cookies and Similar Technologies
            </h2>
            <p>
              The platform may use essential cookies to support basic
              functionality and account security. Any additional analytics
              or preference technologies will be disclosed appropriately
              before use, where required.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-[#0B1F3A]">
              9. Children&apos;s Privacy
            </h2>
            <p>
              The platform is not designed for children under 18. We do not
              knowingly intend to collect personal information from children
              in violation of applicable law. Where local law permits younger
              users, any required parental or guardian consent must be
              obtained.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-[#0B1F3A]">
              10. Your Privacy Rights
            </h2>
            <p>
              Depending on your location and applicable law, you may have
              rights to access, correct, delete, or restrict the use of your
              personal information, object to certain processing, or withdraw
              consent. Requests will be handled in accordance with applicable
              privacy laws.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-[#0B1F3A]">
              11. Changes to This Policy
            </h2>
            <p>
              We may update this policy as the platform develops. Any updated
              version will be published on this page with a revised update
              date.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-[#0B1F3A]">
              12. Contact Us
            </h2>
            <p>
              If you have questions or privacy-related requests, please
              contact us through our Contact Us page.
            </p>
            <a
              href="/contact"
              className="mt-4 inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Contact SkillBridge Global
            </a>
          </section>
        </div>
      </section>
    </main>
  );
}