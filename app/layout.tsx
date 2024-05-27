import "@radix-ui/themes/styles.css";
import "./theme-config.css";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "./navBar";
import { Theme, ThemePanel } from "@radix-ui/themes";
import ReactQueryProvider from "@/utils/reactQueryProvider";
import AuthProvider from "./auth/provider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Task pulse",
  description: "Build by Didacus Odhiambo",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <AuthProvider>
          <Theme>
            <NavBar />
            <main className="p-4">
              <ReactQueryProvider>{children}</ReactQueryProvider>
            </main>
            <ThemePanel />
          </Theme>
        </AuthProvider>
      </body>
    </html>
  );
}
