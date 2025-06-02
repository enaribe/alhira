import type { Metadata } from "next";
import { Geist_Mono, Open_Sans,  } from "next/font/google";
import "./globals.css";



const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap"
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Al Hira",
  description: "Institut Al Hira - Excellence dans les sciences islamiques",
  icons: {
    icon: "/images/logohira.png",
    shortcut: "/images/logohira.png",
    apple: "/images/logohira.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistMono.variable} ${openSans.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
