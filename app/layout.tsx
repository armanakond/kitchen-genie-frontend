//root layout - wraps every page in app
//imports global.css and sets kg-body for consistent styling across pages

import type { Metadata } from "next";
import "./globals.css";

//page metadata shown in browser tab and search engines
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
      {/* kg-body applies dark purple background and base font styles*/}
      <body className="kg-body">
        {children}
      </body>
    </html>
  );
}


