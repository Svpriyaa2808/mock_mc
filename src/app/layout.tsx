import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MotoERP — Motorcycle Dealer Management",
  description: "ERP system for motorcycle dealer — Suzuki, Honda, Kawasaki, Vogue, Royal Enfield, Indian",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
