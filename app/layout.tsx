import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Navbar from "../components/NavBar";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VMP Academy",
  description: "Empowering students through personalized education",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bricolage.variable} antialiased`}>
        <ClerkProvider   publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
     redirectUrl="/admin/dashboard" appearance={{ variables: { colorPrimary: '#fe5933' }} }>
          <Navbar />
          {children}

        </ClerkProvider>
      </body>
    </html>
  );
}
