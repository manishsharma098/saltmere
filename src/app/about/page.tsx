import type { Metadata } from "next";
import AboutPage from "@/components/about/AboutPage";

export const metadata: Metadata = {
  title: { absolute: "About Saltmere | Fishing charter in Dubai" },
  description: "A small fleet, rigged right. Meet the crew and see how we work.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Saltmere | Fishing charter in Dubai",
    description: "A small fleet, rigged right. Meet the crew and see how we work.",
    url: "/about",
    images: [{ url: "/images/fishing/about-marina-golden.jpg", alt: "Dubai Marina at golden hour from the wake of a fishing boat" }],
  },
};

export default function Page() {
  return <AboutPage />;
}
