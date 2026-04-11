import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kitchen Genie",
  description: "Master the kitchen one card at a time",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="kg-body">
        {children}
      </body>
    </html>
  );
}


