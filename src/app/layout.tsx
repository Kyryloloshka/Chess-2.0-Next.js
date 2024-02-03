import type { Metadata } from "next";
import {Inter, Poppins} from "next/font/google";
import "./globals.css";

const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "600"] });

export const metadata: Metadata = {
  title: "Chessmate",
  description: "Simple chess game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  );
}