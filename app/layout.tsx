import type { Metadata } from "next";
import { LangProvider } from "@/lib/langContext";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://arabesque-by-mimo.com"),
  title: {
    default: "Arabesque by Mimo | Authentic Egyptian Cuisine — California",
    template: "%s | Arabesque by Mimo",
  },
  description:
    "When Authentic Egyptian Flavors Meet Nostalgia. Arabesque by Mimo brings the bold, soulful tastes of Egypt to California — Shawarma, Koshari, Hawawshi, Macarona Béchamel, and more. Halal certified.",
  keywords: [
    "Egyptian restaurant California",
    "Arabesque by Mimo",
    "halal restaurant",
    "Egyptian food",
    "shawarma",
    "koshari",
    "Middle Eastern restaurant",
    "Egyptian cuisine Sherman Oaks",
  ],
  authors: [{ name: "Arabesque by Mimo" }],
  creator: "Arabesque by Mimo",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://arabesque-by-mimo.com",
    siteName: "Arabesque by Mimo",
    title: "Arabesque by Mimo | Authentic Egyptian Cuisine — California",
    description:
      "When Authentic Egyptian Flavors Meet Nostalgia. Bold, soulful Egyptian food — Halal certified — now in California.",
    images: [
      {
        url: "/images/brand-poster.jpg",
        width: 1200,
        height: 630,
        alt: "Arabesque by Mimo — Authentic Egyptian Restaurant",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arabesque by Mimo | Authentic Egyptian Cuisine",
    description:
      "When Authentic Egyptian Flavors Meet Nostalgia. Halal certified Egyptian food in California.",
    images: ["/images/brand-poster.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "https://arabesque-by-mimo.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=Inter:wght@300;400;500;600&family=Cinzel:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              name: "Arabesque by Mimo",
              description:
                "Authentic Egyptian cuisine — When Egyptian Flavors Meet Nostalgia",
              url: "https://arabesque-by-mimo.com",
              telephone: "+18185550142",
              address: {
                "@type": "PostalAddress",
                streetAddress: "1234 Ventura Blvd",
                addressLocality: "Sherman Oaks",
                addressRegion: "CA",
                postalCode: "91423",
                addressCountry: "US",
              },
              servesCuisine: ["Egyptian", "Middle Eastern", "Halal"],
              priceRange: "$$",
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
                  opens: "11:00",
                  closes: "22:00",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Friday", "Saturday"],
                  opens: "11:00",
                  closes: "23:00",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Sunday"],
                  opens: "12:00",
                  closes: "21:00",
                },
              ],
              hasMenu: "https://arabesque-by-mimo.com/menu",
              acceptsReservations: false,
              image: "https://arabesque-by-mimo.com/images/brand-poster.jpg",
            }),
          }}
        />
      </head>
      <body className="page-enter"><LangProvider>{children}</LangProvider></body>
    </html>
  );
}
