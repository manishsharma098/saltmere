import type { Metadata, Viewport } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/site";

const OG_IMAGE = "/images/fishing/hero-sunset-run.jpg";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Saltmere | Fishing Charter in Dubai", template: "%s | Saltmere" },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "fishing charter Dubai",
    "Dubai fishing boat",
    "deep sea fishing Dubai",
    "Dubai Marina fishing",
    "sportfishing charter",
    "Jumeirah fishing harbour",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: "/",
    siteName: SITE_NAME,
    title: "Saltmere | Fishing Charter in Dubai",
    description: SITE_DESCRIPTION,
    images: [{ url: OG_IMAGE, width: 1600, height: 1067, alt: "A sportfishing boat running out across the Gulf at sunset" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Saltmere | Fishing Charter in Dubai",
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
};

const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  image: absoluteUrl(OG_IMAGE),
  telephone: "+971500000000",
  email: "hello@saltmere.example",
  priceRange: "AED",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Berth 14, Dubai Marina",
    addressLocality: "Dubai",
    addressCountry: "AE",
  },
  areaServed: { "@type": "City", name: "Dubai" },
  makesOffer: {
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: "Skippered fishing charter",
      areaServed: "Dubai",
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#050c16",
};

// Applies the saved theme before paint (default: dark, like the reference).
const themeScript = `try{var t=localStorage.getItem("saltmere-theme");document.documentElement.dataset.theme=t==="light"?"light":"dark"}catch(e){document.documentElement.dataset.theme="dark"}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@400,500,700,800&f[]=satoshi@400,500,700&display=swap"
        />
      </head>
      <body className="flex min-h-screen flex-col antialiased">
        <JsonLd data={businessJsonLd} />
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[80] focus:rounded-xl focus:bg-accent focus:px-4 focus:py-3 focus:font-sans focus:text-[15px] focus:font-bold focus:text-on-accent"
        >
          Skip to content
        </a>
        <Nav />
        <main id="content" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
