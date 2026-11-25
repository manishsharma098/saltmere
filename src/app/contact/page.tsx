import type { Metadata } from "next";
import ContactPage from "@/components/contact/ContactPage";

export const metadata: Metadata = {
  title: { absolute: "Request a fishing trip | Saltmere, Dubai Marina" },
  description: "Chat, call or send a request for your day of fishing. We reply within the hour.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Request a fishing trip | Saltmere, Dubai Marina",
    description: "Chat, call or send a request for your day of fishing. We reply within the hour.",
    url: "/contact",
  },
};

export default function Page() {
  return <ContactPage />;
}
