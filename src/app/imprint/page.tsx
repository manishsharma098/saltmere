import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: { absolute: "Imprint | Saltmere fishing charter" },
  description: "Company details, address and contact for Saltmere fishing charter in Dubai Marina.",
  alternates: { canonical: "/imprint" },
};

export default function ImprintPage() {
  return (
    <LegalPage
      contained={false}
      title="Imprint"
      lead="Company details of Saltmere Charter, fishing charter in Dubai."
      sections={[
        { heading: "Company", lines: ["Saltmere Charter LLC", "Berth 14, Dubai Marina, Dubai"] },
        { heading: "Contact", lines: ["hello@saltmere.example", "+971 50 000 0000"] },
        {
          heading: "Register and tax",
          lines: ["Trade licence: replace with your number", "Tax registration: replace with your number"],
        },
        { heading: "Responsible for content", lines: ["Replace with the name of the managing person."] },
      ]}
    />
  );
}
