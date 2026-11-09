
import type { Metadata } from "next";
import Link from "next/link";
import styles from "./privacy.module.css";

export const metadata: Metadata = {
  title: "Privacy Policy | YourEhome",
  description:
    "Learn how YourEhome collects, uses, and protects personal information.",
};

const sections = [
  {
    title: "Information We Collect",
    content:
      "When you use YourEhome, we may collect your name, email address, phone number, property preferences, and messages submitted through inquiry or consultation forms.",
  },
  {
    title: "How We Use Your Information",
    content:
      "We use your information to respond to inquiries, provide property information, improve our services, maintain security, and comply with applicable legal requirements.",
  },
  {
    title: "Information Sharing",
    content:
      "We may share information with service providers involved in operating the platform or relevant property representatives when necessary to respond to inquiries. We do not sell personal information as part of the intended operation of the service.",
  },
  {
    title: "Data Storage and Security",
    content:
      "YourEhome uses secure connections and reasonable technical measures to help protect personal information. Data may be processed through our application, hosting providers, and database infrastructure.",
  },
  {
    title: "Favorites and Local Storage",
    content:
      "Saved properties may be stored locally in your browser or Android device. You can remove locally stored favorites through the application or device storage controls.",
  },
  {
    title: "Data Retention",
    content:
      "We retain information for as long as reasonably necessary to respond to requests, operate our services, meet legal obligations, and resolve disputes.",
  },
  {
    title: "Your Privacy Rights",
    content:
      "Depending on applicable law, you may request access to, correction of, or deletion of your personal information. Contact us to submit a privacy-related request.",
  },
  {
    title: "Children's Privacy",
    content:
      "YourEhome is not directed toward children under 13. We do not knowingly seek to collect personal information from children under 13.",
  },
  {
    title: "Third-Party Services",
    content:
      "Our platform may use hosting, database, and other infrastructure providers. External websites and services may maintain their own privacy policies.",
  },
  {
    title: "Changes to This Policy",
    content:
      "We may update this policy to reflect changes in our services or legal requirements. Any updates will be published on this page.",
  },
];

export default function PrivacyPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <Link href="/" className={styles.back}>
            ← Back to Home
          </Link>

          <div className={styles.eyebrow}>
            YOUR EHOME · PREMIUM REAL ESTATE
          </div>

          <h1>Privacy Policy</h1>

          <p>
            Your privacy matters. Learn how YourEhome handles
            personal information across our website and
            Android application.
          </p>

          <div className={styles.updated}>
            Last updated: November 9, 2026
          </div>
        </div>
      </section>

      <section className={styles.contentArea}>
        <div className={styles.layout}>
          <aside className={styles.sidebar}>
            <h3>On This Page</h3>

            <nav aria-label="Privacy policy sections">
              {sections.map((section, index) => (
                <a
                  key={section.title}
                  href={`#section-${index + 1}`}
                >
                  {index + 1}. {section.title}
                </a>
              ))}

              <a href="#contact">11. Contact Us</a>
            </nav>
          </aside>

          <article className={styles.policyCard}>
            <div className={styles.intro}>
              <span className={styles.introIcon}>◆</span>

              <div>
                <h2>Our Commitment to Your Privacy</h2>
                <p>
                  YourEhome is committed to handling personal
                  information responsibly and providing a
                  transparent property discovery experience.
                </p>
              </div>
            </div>

            {sections.map((section, index) => (
              <section
                key={section.title}
                id={`section-${index + 1}`}
                className={styles.policySection}
              >
                <div className={styles.sectionNumber}>
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div>
                  <h2>{section.title}</h2>
                  <p>{section.content}</p>
                </div>
              </section>
            ))}

            <section
              id="contact"
              className={styles.contactSection}
            >
              <h2>11. Contact Us</h2>

              <p>
                For privacy questions, data requests, or concerns,
                please contact the YourEhome team.
              </p>

              <Link
                href="/contact"
                className={styles.contactButton}
              >
                Contact YourEhome →
              </Link>
            </section>
          </article>
        </div>
      </section>

      <section className={styles.cta}>
        <h2>Find a Place to Call Home</h2>
        <p>
          Explore beautiful properties and discover your next home.
        </p>

        <Link href="/listings">
          Explore Properties →
        </Link>
      </section>
    </main>
  );
}
