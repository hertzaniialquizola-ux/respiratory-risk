import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Respiratory Risk Assessment",
  description:
    "Data-driven respiratory risk assessment for Philippine LGU health officers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bricolage.variable} ${inter.variable}`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-on-background font-body-md antialiased min-h-screen flex flex-col">
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
