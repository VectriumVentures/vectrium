import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Vectrium Ventures | Innovative IT Solutions for Your Digital Growth",
  description:
    "Vectrium Ventures delivers tailored IT solutions that elevate your brand and streamline digital operations. We specialize in design, development, and marketing to drive innovation and growth.",
  keywords: [
    "Vectrium Ventures",
    "IT Solutions",
    "Web Development",
    "Digital Marketing",
    "UI/UX Design",
    "Software Development",
    "Tech Consulting",
    "Startup Solutions",
    "Enterprise IT Services"
  ],
  authors: [{ name: "Vectrium Ventures", url: "https://vectriumventures.in" }],
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    title: "Vectrium Ventures | Innovative IT Solutions for Your Digital Growth",
    description:
      "Empowering businesses through cutting-edge IT solutions. From design to development and marketing, Vectrium Ventures brings innovation to every step.",
    url: "https://vectriumventures.in",
    siteName: "Vectrium Ventures",
    images: [
      {
        url: "https://vectriumventures.in/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Vectrium Ventures - IT Solutions",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vectrium Ventures | Innovative IT Solutions for Your Digital Growth",
    description:
      "Tailored IT services in design, development, and marketing by Vectrium Ventures. Elevate your brand with our expert solutions.",
    images: ["https://vectriumventures.in/images/logo.png"],
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
