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
  title: "Converso",
  description: "Real-time AI Teaching Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  const isBrowser = typeof window !== "undefined";
  const shouldUseClerk = publishableKey && isBrowser;

  return (
    <html lang="en">
      <body className={`${bricolage.variable} antialiased`}>
        {publishableKey ? (
          <ClerkProvider
            publishableKey={publishableKey}
            appearance={{ variables: { colorPrimary: "#fe5933" } }}
          >
            <Navbar />
            {children}
          </ClerkProvider>
        ) : (
          <>
            <Navbar />
            {children}
          </>
        )}
      </body>
    </html>
  );
}
