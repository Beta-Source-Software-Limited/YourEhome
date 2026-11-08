import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: { default: "YourEhome | Find Your Dream Property", template: "%s | YourEhome" },
  description: "YourEhome connects you with outstanding properties, trusted advisors, and a better real estate experience.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><Header/><main>{children}</main><Footer/></body></html>;
}
