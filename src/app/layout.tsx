import type { Metadata } from "next";
import {Poppins} from "next/font/google";
import "./globals.css";
import SideBar from "@/components/SideBar";

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
      <body className="w-[100vw]">
        <main className="flex w-[100vw]">
          <SideBar />
          <div className="flex-auto">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
