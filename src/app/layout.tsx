import type { Metadata } from "next";
import {Poppins} from "next/font/google";
import "./globals.css";
import SideBar from "@/components/SideBar";
import {AuthProvider} from "@/contexts/authContext";

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
      <body className={poppins.className}>
        <main className="flex min-h-[100dvh] flex-col md:flex-row overflow-x-hidden">
          <AuthProvider>
          <SideBar />
          <div className="flex-auto">
              {children}
          </div>
          </AuthProvider>
        </main>
      </body>
    </html>
  );
}
