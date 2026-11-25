import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: { absolute: "Privacy policy | Saltmere fishing charter" },
  description:
    "How Saltmere handles your data: what we collect, why, and how to ask for access, correction or deletion.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy"
      lead="How Saltmere Charter handles personal data when you browse the site and request a fishing trip."
      sections={[
        {
          heading: "What we store",
          lines: [
            "The request forms send what visitors type (name, email, date, anglers, message) to the site owner by email. The choice of light or dark theme is saved in the browser only.",
          ],
        },
        {
          heading: "Booking requests",
          lines: [
            "We use the details from your request only to answer it and plan your fishing trip. Requests are kept for twelve months and then deleted. Framer B.V. hosts this site and processes form entries on our behalf.",
          ],
        },
        { heading: "Cookies and analytics", lines: ["This site uses no analytics or advertising cookies."] },
        {
          heading: "Your rights",
          lines: [
            "You can ask for access, correction or deletion of your data at any time. Write to privacy@saltmere.example.",
          ],
        },
      ]}
    />
  );
}
