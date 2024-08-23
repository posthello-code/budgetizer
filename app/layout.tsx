import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import RecoilContextProvider from "./services/recoil";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Budgetizer",
  description: "A budgeting app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html style={{ minHeight: "100vh" }} lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
      </head>
      <body style={{ minHeight: "100vh" }} className={inter.className}>
        <main>
          <RecoilContextProvider>{children}</RecoilContextProvider>
        </main>
      </body>
    </html>
  );
}
